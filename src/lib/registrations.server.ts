// Serveripoolne Fienta registreeringute parser + upsert.
// Parser on teadlikult kaitsev: päris Fienta payloadi väljad kinnitatakse pärast esimest test-webhooki.
import type { SupabaseClient } from "@supabase/supabase-js";
import { getEventByFientaId } from "@/lib/events";

export function normalizeEmail(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const e = v.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e) ? e : null;
}

type Json = unknown;

/** Otsib payloadist esimese väärtuse, mille võti vastab mõnele kandidaadile (sügavuti). */
function findKey(obj: Json, keys: string[], depth = 0): unknown {
  if (!obj || typeof obj !== "object" || depth > 6) return undefined;
  const rec = obj as Record<string, unknown>;
  for (const k of keys) {
    const v = rec[k];
    if (v !== undefined && v !== null && v !== "" && typeof v !== "object") return v;
  }
  for (const v of Object.values(rec)) {
    const found = findKey(v, keys, depth + 1);
    if (found !== undefined) return found;
  }
  return undefined;
}

const str = (v: unknown) => (v === undefined || v === null || v === "" ? null : String(v));

export interface ParsedRegistration {
  fienta_event_id: string | null;
  email_normalized: string | null;
  attendee_name: string | null;
  fienta_order_id: string | null;
  fienta_ticket_id: string | null;
  status: string;
}

export function parseFientaPayload(p: Json): ParsedRegistration {
  const eventObj = p && typeof p === "object" ? (p as Record<string, unknown>)["event"] : undefined;
  const orderObj = p && typeof p === "object" ? (p as Record<string, unknown>)["order"] : undefined;
  const first = str(findKey(p, ["first_name", "firstname"]));
  const last = str(findKey(p, ["last_name", "lastname"]));
  return {
    fienta_event_id: str(
      findKey(p, ["event_id", "eventId", "event"]) ?? findKey(eventObj, ["id"]),
    ),
    email_normalized: normalizeEmail(
      findKey(p, ["email", "attendee_email", "buyer_email", "customer_email", "contact_email"]),
    ),
    attendee_name:
      str(findKey(p, ["attendee_name", "full_name", "name"])) ??
      ([first, last].filter(Boolean).join(" ") || null),
    fienta_order_id: str(findKey(p, ["order_id", "orderId"]) ?? findKey(orderObj, ["id"])),
    fienta_ticket_id: str(findKey(p, ["ticket_id", "ticketId", "ticket_code", "code"])),
    status: str(findKey(p, ["status", "order_status", "ticket_status"])) ?? "active",
  };
}

export function dedupeKey(r: ParsedRegistration): string {
  if (r.fienta_ticket_id) return `ticket:${r.fienta_ticket_id}`;
  if (r.fienta_order_id) return `order:${r.fienta_order_id}:${r.fienta_event_id}:${r.email_normalized}`;
  return `event:${r.fienta_event_id}:${r.email_normalized}`;
}

/** Upsert + logi. Ei viska kunagi — tagastab vea teksti. */
export async function upsertRegistration(
  admin: SupabaseClient,
  r: ParsedRegistration,
  raw: Json,
  source: "webhook" | "csv",
): Promise<{ ok: boolean; error?: string }> {
  let error: string | null = null;
  if (!r.fienta_event_id) error = "Fienta event ID puudub payloadis";
  else if (!r.email_normalized) error = "E-post puudub või on vigane";

  if (!error) {
    const { error: dbErr } = await admin.from("registrations").upsert(
      {
        dedupe_key: dedupeKey(r),
        fienta_event_id: r.fienta_event_id!,
        email_normalized: r.email_normalized!,
        attendee_name: r.attendee_name,
        fienta_order_id: r.fienta_order_id,
        fienta_ticket_id: r.fienta_ticket_id,
        status: r.status,
        source,
        raw_payload: raw as never,
      },
      { onConflict: "dedupe_key" },
    );
    if (dbErr) error = `DB viga: ${dbErr.message}`;
  }

  await admin.from("webhook_logs").insert({
    source,
    fienta_event_id: r.fienta_event_id,
    email_normalized: r.email_normalized,
    event_found: r.fienta_event_id ? !!getEventByFientaId(r.fienta_event_id) : false,
    error,
    raw_payload: raw as never,
  });
  if (error) console.error("[fienta]", error);
  return error ? { ok: false, error } : { ok: true };
}
