import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getEvent } from "@/lib/events";
import { mergeFeedbackCompletion } from "./feedback-completion";

export const getMyFeedbackCompletion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("my_feedback_completion");
    if (error) throw new Error("Tagasiside oleku laadimine ebaõnnestus.");
    return mergeFeedbackCompletion(data ?? []);
  });

export const setMyManualFeedbackCompletion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ eventId: z.string().max(100), manual: z.boolean() }).parse(input))
  .handler(async ({ context, data }) => {
    const event = getEvent(data.eventId);
    if (!event?.fientaEventId) throw new Error("Koolitust ei leitud.");
    const { error } = await context.supabase.rpc("set_manual_feedback_completion", {
      _event_id: event.fientaEventId, _manual: data.manual,
    });
    if (error) throw new Error("Märke salvestamine ebaõnnestus.");
    return { ok: true };
  });