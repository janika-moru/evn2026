import { createServerFn } from "@tanstack/react-start";

export type WeekFeedbackRow = {
  id: string;
  type: string;
  eventId: string | null;
  rating: number | null;
  message: string | null;
  name: string | null;
  field: string | null;
  createdAt: string;
};

/** Kogu nädala tagasiside koondvaade stuudio tiimile. Kontakt- ja fotoväljad ei tule kaasa. */
export const getWeekFeedback = createServerFn({ method: "GET" }).handler(
  async (): Promise<WeekFeedbackRow[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data } = await supabaseAdmin
      .from("feedback")
      .select(
        "id, feedback_type, event_id, rating, message, comment, keep_text, change_text, respondent_name, respondent_field, created_at",
      )
      .gte("created_at", "2026-10-04T21:00:00Z")
      .order("created_at", { ascending: false })
      .limit(2000);
    return (data ?? []).map((r) => ({
      id: r.id,
      type: r.feedback_type,
      eventId: r.event_id,
      rating: r.rating,
      message:
        [r.message ?? r.comment, r.keep_text, r.change_text].filter((t) => t?.trim()).join("\n\n") ||
        null,
      name: r.respondent_name,
      field: r.respondent_field,
      createdAt: r.created_at,
    }));
  },
);
