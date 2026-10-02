import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { getEvent, dayLabel, displayTime } from "@/lib/events";

export const requestWithdrawal = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ eventId: z.string().max(100) }).parse(d))
  .handler(async ({ data, context }) => {
    const email = String((context.claims as Record<string, unknown>)["email"] ?? "")
      .trim()
      .toLowerCase();
    const ev = getEvent(data.eventId);
    if (!email || !ev?.fientaEventId) return { ok: false as const };

    const { data: regs } = await context.supabase
      .from("registrations")
      .select("status")
      .eq("email_normalized", email)
      .eq("fienta_event_id", ev.fientaEventId);
    const active = (regs ?? []).some((r) => !/cancel|refund|tühist/i.test(r.status));
    if (!active) return { ok: false as const };

    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    await sendTemplateEmail("withdrawal-notification", "info@mindz.ee", {
      templateData: {
        email,
        eventTitle: ev.title,
        eventWhen: `${dayLabel(ev.date)} ${displayTime(ev.startTime)}`,
      },
      idempotencyKey: `withdrawal-${context.userId}-${ev.id}`,
    });
    return { ok: true as const };
  });
