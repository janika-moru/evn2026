import { createServerFn } from "@tanstack/react-start";

/** Avalik: kõigi sündmuste vabade kohtade arvud ühe päringuga (ainult id → number). */
export const getAllAvailableSpots = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("event_availability")
    .select("fienta_event_id, available_spots");
  if (error) throw new Error("availability lookup failed");
  const map: Record<string, number> = {};
  for (const r of data ?? []) map[r.fienta_event_id] = r.available_spots;
  return map;
});
