import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAvailableSpots } from "@/lib/availability.functions";

export function useEventAvailability(fientaEventId?: string) {
  const fetchSpots = useServerFn(getAvailableSpots);
  const query = useQuery({
    queryKey: ["event-availability", fientaEventId],
    enabled: Boolean(fientaEventId),
    staleTime: 60_000,
    queryFn: async () => {
      if (!fientaEventId) return null;
      return fetchSpots({ data: { id: fientaEventId } });
    },
  });

  return { availableSpots: query.data ?? null, query };
}
