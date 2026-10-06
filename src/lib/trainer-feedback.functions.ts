import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { QUESTION_SLUGS } from "@/lib/questions";
import { trainingSpeakerForEvent } from "@/lib/events";

export type TrainerFeedbackItem = {
  id: string;
  rating: number | null;
  message: string | null;
  name: string | null;
  field: string | null;
  publishConsent: boolean;
  createdAt: string;
};

export type TrainerFeedbackResult =
  | { ok: true; speakerName: string; items: TrainerFeedbackItem[] }
  | { ok: false; reason: "notfound" };

export const getTrainerFeedback = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ slug: z.string().max(40) }).parse(d),
  )
  .handler(async ({ data }): Promise<TrainerFeedbackResult> => {
    const eventId = QUESTION_SLUGS[data.slug.toLowerCase()];
    const speaker = eventId ? trainingSpeakerForEvent(eventId) : undefined;
    if (!speaker) return { ok: false, reason: "notfound" };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
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
        publishConsent: r.publish_consent === true,
        createdAt: r.created_at,
      })),
    };
  });
