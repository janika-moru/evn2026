import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Sisseloginud kasutaja: värskenda registreeringud Fientast (max kord minutis). */
export const syncMyRegistrations = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { syncFromFientaApi } = await import("@/lib/registrations.server");
    const r = await syncFromFientaApi(supabaseAdmin, 60_000);
    return { skipped: r.skipped, upserted: r.upserted, failed: r.errors.length };
  });

/** Admin: sunnitud täissünk. */
export const adminSyncFienta = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { syncFromFientaApi } = await import("@/lib/registrations.server");
    return syncFromFientaApi(supabaseAdmin, 0);
  });
