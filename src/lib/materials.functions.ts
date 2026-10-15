import { createServerFn } from "@tanstack/react-start";
import { setResponseHeader } from "@tanstack/react-start/server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { registeredMaterials } from "./materials";

export const getMyMaterials = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    setResponseHeader("Cache-Control", "private, no-store");
    const email = typeof context.claims.email === "string" ? context.claims.email.trim().toLowerCase() : "";
    if (!email) throw new Error("Palun logi sisse.");
    const { data, error } = await context.supabase.from("registrations")
      .select("fienta_event_id, status").eq("email_normalized", email);
    if (error) throw new Error("Materjalide laadimine ebaõnnestus.");
    const { EVENT_MATERIALS } = await import("./materials.server");
    return registeredMaterials(EVENT_MATERIALS, data ?? []);
  });