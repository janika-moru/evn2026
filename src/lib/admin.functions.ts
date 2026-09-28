import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const rowSchema = z.object({
  fienta_event_id: z.string().min(1).max(50),
  email: z.string().min(3).max(320),
  attendee_name: z.string().max(300).nullable(),
  fienta_order_id: z.string().max(100).nullable(),
  fienta_ticket_id: z.string().max(100).nullable(),
  raw: z.record(z.string(), z.string()),
});

export const importRegistrations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ rows: z.array(rowSchema).max(5000) }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { normalizeEmail, upsertRegistration } = await import("@/lib/registrations.server");
    let ok = 0;
    const errors: string[] = [];
    for (const r of data.rows) {
      const res = await upsertRegistration(
        supabaseAdmin,
        {
          fienta_event_id: r.fienta_event_id,
          email_normalized: normalizeEmail(r.email),
          attendee_name: r.attendee_name,
          fienta_order_id: r.fienta_order_id,
          fienta_ticket_id: r.fienta_ticket_id,
          status: "active",
        },
        r.raw,
        "csv",
      );
      if (res.ok) ok++;
      else errors.push(`${r.email}: ${res.error}`);
    }
    return { ok, errors: errors.slice(0, 50) };
  });
