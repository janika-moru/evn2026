import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export function useEventAvailability(fientaEventId?: string) {
  const query = useQuery({
    queryKey: ["event-availability", fientaEventId],
    enabled: Boolean(fientaEventId),
    staleTime: 60_000,
    queryFn: async () => {
      if (!fientaEventId) return null;
      const { data, error } = await supabase
        .from("event_availability")
        .select("available_spots")
        .eq("fienta_event_id", fientaEventId)
        .maybeSingle();
      if (error) throw error;
      return data?.available_spots ?? null;
    },
  });

  return { availableSpots: query.data ?? null, query };
}