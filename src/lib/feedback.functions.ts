import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const text = (max: number) => z.string().trim().max(max).nullish();

const schema = z.object({
  feedback_type: z.enum(["training", "keep", "change"]),
  event_id: z.string().max(100).nullish(),
  speaker_id: z.string().max(100).nullish(),
  rating: z.number().int().min(1).max(10).nullish(),
  message: text(5000),
  keep_text: text(5000),
  change_text: text(5000),
  respondent_name: text(200),
  respondent_field: text(200),
  contact: text(320),
  contact_requested: z.boolean().default(false),
  photo_promise: z.boolean().default(false),
  // Foto on üles laaditud kasutaja oma kausta: <uuid>/<uuid>.<ext>
  attachment_url: z
    .string()
    .regex(/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.[a-z0-9]{1,5}$/)
    .nullish(),
});

// Salvestab tagasiside ja saadab teavituse info@mindz.ee postkasti.
export const submitFeedback = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => schema.parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("feedback")
      .insert({
        feedback_type: data.feedback_type,
        event_id: data.event_id ?? null,
        rating: data.rating ?? null,
        message: data.message || null,
        keep_text: data.keep_text || null,
        change_text: data.change_text || null,
        respondent_name: data.respondent_name || null,
        respondent_field: data.respondent_field || null,
        contact: data.contact || null,
        contact_requested: data.contact_requested,
        photo_promise: data.photo_promise,
        attachment_url: data.attachment_url ?? null,
        needs_help: false,
        status: "new",
      })
      .select("id")
      .single();
    if (error || !row) {
      console.error("feedback insert failed", error);
      return { ok: false as const };
    }

    // Teavituskiri — ebaõnnestumine ei tohi osaleja jaoks tagasisidet katki teha
    try {
      const { getEvent, speakersForEvent, SPEAKERS, dayLabel, displayTime } = await import("@/lib/events");
      const ev = data.event_id ? getEvent(data.event_id) : undefined;
      const speaker =
        (data.speaker_id && SPEAKERS.find((s) => s.id === data.speaker_id)) ||
        (ev ? speakersForEvent(ev.id)[0] : undefined);
      let photoUrl: string | null = null;
      if (data.attachment_url) {
        const { data: signed } = await supabaseAdmin.storage
          .from("feedback")
          .createSignedUrl(data.attachment_url, 60 * 60 * 24 * 7);
        photoUrl = signed?.signedUrl ?? null;
      }
      const contact = data.contact || null;
      const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
      await sendTemplateEmail("feedback-notification", "info@mindz.ee", {
        idempotencyKey: `feedback-notification-${row.id}`,
        ...(contact && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) ? { replyTo: contact } : {}),
        templateData: {
          kind: data.feedback_type,
          speakerName: speaker?.name,
          eventTitle: ev?.title,
          eventWhen: ev ? `${dayLabel(ev.date)} ${displayTime(ev.startTime)}` : undefined,
          rating: data.rating ?? null,
          message: data.message || null,
          keepText: data.keep_text || null,
          changeText: data.change_text || null,
          name: data.respondent_name || null,
          field: data.respondent_field || null,
          contact,
          contactRequested: data.contact_requested,
          photoPromise: data.photo_promise,
          photoUrl,
        },
      });
    } catch (e) {
      console.error("feedback email failed", e);
    }
    return { ok: true as const };
  });
