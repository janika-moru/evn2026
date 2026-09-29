import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Avalik: ühe Fienta sündmuse vabade kohtade arv (ainult see number). */
export const getAvailableSpots = createServerFn({ method: "GET" })
  .inputValidator((d) => z.object({ id: z.string().min(1).max(50) }).parse(d))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("event_availability")
      .select("available_spots")
      .eq("fienta_event_id", data.id)
      .maybeSingle();
    if (error) throw new Error("availability lookup failed");
    return row?.available_spots ?? null;
  });
