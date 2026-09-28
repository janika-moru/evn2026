import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/hooks/use-my-registrations";
import { EVENTS, dayLabel, displayTime, getEventByFientaId } from "@/lib/events";
import { importRegistrations } from "@/lib/admin.functions";
import { adminSyncFienta } from "@/lib/sync.functions";
import { FeedbackAdmin } from "@/components/FeedbackAdmin";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Studio MindZ 2026" },
      { name: "description", content: "Korraldaja debug- ja importvaade." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Admin — Studio MindZ 2026" },
      { property: "og:description", content: "Korraldaja debug- ja importvaade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { session, ready } = useSession();
  const roleQ = useQuery({
    queryKey: ["is-admin", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data } = await supabase.rpc("has_role", {
        _user_id: session!.user.id,
        _role: "admin",
      });
      return !!data;
    },
  });

  if (!ready || (session && roleQ.isLoading))
    return <main className="px-4 pt-8 text-sm text-muted-foreground">Laen…</main>;
  if (!session || !roleQ.data)
    return (
      <main className="px-4 pt-8">
        <h1 className="text-2xl font-bold">Admin</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          See leht on ainult korraldajatele. Logi sisse Minu kava lehel admin-kontoga.
        </p>
      </main>
    );

  return (
    <main className="space-y-8 px-4 pt-8">
      <h1 className="text-2xl font-bold">Admin</h1>
      <FeedbackAdmin />
      <WebhookLogs />
      <CsvImport />
    </main>
  );
}

function WebhookLogs() {
  const [open, setOpen] = useState<string | null>(null);
  const q = useQuery({
    queryKey: ["webhook-logs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("webhook_logs")
        .select("*")
        .order("received_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data;
    },
  });
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Viimased webhookid</h2>
        <div className="flex gap-3">
          <SyncButton onDone={() => q.refetch()} />
          <button onClick={() => q.refetch()} className="text-sm font-semibold text-primary">
            Värskenda
          </button>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {(q.data ?? []).length === 0 && (
          <p className="text-sm text-muted-foreground">Ühtegi webhooki pole veel saabunud.</p>
        )}
        {(q.data ?? []).map((l) => (
          <div key={l.id} className="rounded-xl border border-border bg-card p-3 text-xs">
            <p className="font-semibold">
              {new Date(l.received_at).toLocaleString("et-EE")} · {l.source}
            </p>
            <p>Event ID: {l.fienta_event_id ?? "—"} · sündmus leitud: {l.event_found ? "jah" : "ei"}</p>
            <p>E-post: {l.email_normalized ?? "—"}</p>
            {l.error && <p className="text-destructive">Viga: {l.error}</p>}
            <button
              onClick={() => setOpen(open === l.id ? null : l.id)}
              className="mt-1 font-semibold text-primary"
            >
              {open === l.id ? "Peida payload" : "Näita payload"}
            </button>
            {open === l.id && (
              <pre className="mt-2 max-h-80 overflow-auto rounded bg-muted p-2">
                {JSON.stringify(l.raw_payload, null, 2)}
              </pre>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function parseCsv(text: string): string[][] {
  const delim = (text.split("\n")[0] ?? "").includes(";") ? ";" : ",";
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i]!;
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === delim) { row.push(cell); cell = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(cell); cell = "";
      if (row.some((x) => x.trim())) rows.push(row);
      row = [];
    } else cell += c;
  }
  row.push(cell);
  if (row.some((x) => x.trim())) rows.push(row);
  return rows;
}

const findCol = (h: string[], re: RegExp) => h.findIndex((x) => re.test(x.trim().toLowerCase()));

function CsvImport() {
  const importFn = useServerFn(importRegistrations);
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [fallbackEvent, setFallbackEvent] = useState("");
  const [result, setResult] = useState<string>("");
  const [busy, setBusy] = useState(false);

  const cols = {
    event: findCol(headers, /^(event[ _]?id|ürituse id|sündmuse id)$/),
    email: findCol(headers, /e-?mail|e-post/),
    name: findCol(headers, /^(nimi|name|full name|attendee|osaleja)/),
    order: findCol(headers, /order|tellimus/),
    ticket: findCol(headers, /ticket|pilet|code|kood/),
  };
  const cell = (r: string[], i: number) => (i >= 0 ? r[i]?.trim() || null : null);
  const mapped = rows.map((r) => ({
    fienta_event_id: cell(r, cols.event) ?? fallbackEvent,
    email: cell(r, cols.email) ?? "",
    attendee_name: cell(r, cols.name),
    fienta_order_id: cell(r, cols.order),
    fienta_ticket_id: cell(r, cols.ticket),
    raw: Object.fromEntries(headers.map((h, i) => [h, r[i] ?? ""])),
  }));

  async function onFile(f: File) {
    const all = parseCsv(await f.text());
    setHeaders(all[0] ?? []);
    setRows(all.slice(1));
    setResult("");
  }

  async function doImport() {
    setBusy(true);
    try {
      const res = await importFn({ data: { rows: mapped.filter((m) => m.fienta_event_id && m.email) } });
      setResult(`Imporditud ${res.ok} rida.${res.errors.length ? " Vead: " + res.errors.join("; ") : ""}`);
    } catch (e) {
      setResult("Import ebaõnnestus: " + (e as Error).message);
    }
    setBusy(false);
  }

  return (
    <section>
      <h2 className="text-lg font-semibold">Olemasolevate registreeringute CSV import</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Ühekordseks kasutamiseks. Kui CSV-s pole event ID veergu, vali sündmus allpool.
      </p>
      <input
        type="file"
        accept=".csv,text/csv"
        onChange={(e) => e.target.files?.[0] && onFile(e.target.files[0])}
        className="mt-3 block text-sm"
      />
      {headers.length > 0 && (
        <>
          <p className="mt-3 text-xs text-muted-foreground">
            Tuvastatud veerud — event: {headers[cols.event] ?? "puudub"}, e-post:{" "}
            {headers[cols.email] ?? "PUUDUB"}, nimi: {headers[cols.name] ?? "—"}, tellimus:{" "}
            {headers[cols.order] ?? "—"}, pilet: {headers[cols.ticket] ?? "—"}
          </p>
          {cols.event < 0 && (
            <select
              value={fallbackEvent}
              onChange={(e) => setFallbackEvent(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm"
            >
              <option value="">Vali sündmus…</option>
              {EVENTS.map((e) => (
                <option key={e.id} value={e.fientaEventId}>
                  {dayLabel(e.date)} {displayTime(e.startTime)} {e.title}
                </option>
              ))}
            </select>
          )}
          <div className="mt-3 max-h-72 overflow-auto rounded-xl border border-border text-xs">
            <table className="w-full">
              <thead className="bg-muted text-left">
                <tr><th className="p-2">Event</th><th className="p-2">E-post</th><th className="p-2">Nimi</th><th className="p-2">Pilet</th></tr>
              </thead>
              <tbody>
                {mapped.slice(0, 100).map((m, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-2">
                      {m.fienta_event_id || "—"}
                      {m.fienta_event_id && !getEventByFientaId(m.fienta_event_id) && " ⚠"}
                    </td>
                    <td className="p-2">{m.email}</td>
                    <td className="p-2">{m.attendee_name}</td>
                    <td className="p-2">{m.fienta_ticket_id}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">{mapped.length} rida</p>
          <button
            onClick={doImport}
            disabled={busy || cols.email < 0}
            className="mt-3 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
          >
            {busy ? "Impordin…" : "Impordi"}
          </button>
          {result && <p className="mt-2 text-sm">{result}</p>}
        </>
      )}
    </section>
  );
}

function SyncButton({ onDone }: { onDone: () => void }) {
  const fn = useServerFn(adminSyncFienta);
  const [msg, setMsg] = useState("");
  return (
    <button
      onClick={async () => {
        setMsg("Sünkroniseerin…");
        try {
          const r = await fn();
          setMsg(`${r.upserted} piletit${r.errors.length ? `, ${r.errors.length} viga` : ""}`);
          onDone();
        } catch {
          setMsg("Viga");
        }
      }}
      className="text-sm font-semibold text-primary"
    >
      {msg || "Sünk Fientast"}
    </button>
  );
}
