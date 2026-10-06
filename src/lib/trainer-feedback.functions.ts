import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { createHash, timingSafeEqual } from "node:crypto";
import { QUESTION_SLUGS } from "@/lib/questions";
import { trainingSpeakerForEvent } from "@/lib/events";

const MAX_FAILS = 10; // 15 minuti jooksul ühe koolitaja kohta
const WINDOW_MIN = 15;

export type TrainerFeedbackItem = {
  id: string;
  rating: number | null;
  message: string | null;
  name: string | null;
  field: string | null;
  createdAt: string;
};

export type TrainerFeedbackResult =
  | { ok: true; speakerName: string; items: TrainerFeedbackItem[] }
  | { ok: false; reason: "wrong" | "locked" | "notfound" };

function same(a: string, b: string) {
  const x = createHash("sha256").update(a).digest();
  const y = createHash("sha256").update(b).digest();
  return timingSafeEqual(x, y);
}

export const getTrainerFeedback = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ slug: z.string().max(40), code: z.string().trim().max(20) }).parse(d),
  )
  .handler(async ({ data }): Promise<TrainerFeedbackResult> => {
    const eventId = QUESTION_SLUGS[data.slug.toLowerCase()];
    const speaker = eventId ? trainingSpeakerForEvent(eventId) : undefined;
    if (!speaker) return { ok: false, reason: "notfound" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - WINDOW_MIN * 60_000).toISOString();
    const { count } = await supabaseAdmin
      .from("trainer_code_attempts")
      .select("id", { count: "exact", head: true })
      .eq("speaker_id", speaker.id)
      .gte("created_at", since);
    if ((count ?? 0) >= MAX_FAILS) return { ok: false, reason: "locked" };

    const { data: row } = await supabaseAdmin
      .from("trainer_codes")
      .select("code")
      .eq("speaker_id", speaker.id)
      .maybeSingle();
    if (!row || !same(data.code.toUpperCase(), row.code)) {
      await supabaseAdmin.from("trainer_code_attempts").insert({ speaker_id: speaker.id });
      return { ok: false, reason: "wrong" };
    }

    const { data: rows } = await supabaseAdmin
      .from("feedback")
      .select("id, rating, message, respondent_name, respondent_field, created_at")
      .eq("feedback_type", "training")
      .in("event_id", speaker.eventIds)
      .order("created_at", { ascending: false });

    return {
      ok: true,
      speakerName: speaker.name,
      items: (rows ?? []).map((r) => ({
        id: r.id,
        rating: r.rating,
        message: r.message,
        name: r.respondent_name,
        field: r.respondent_field,
        createdAt: r.created_at,
      })),
    };
  });
