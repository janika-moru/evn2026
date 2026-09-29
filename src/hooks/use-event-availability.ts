import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAllAvailableSpots } from "@/lib/availability.functions";

export function useEventAvailability(fientaEventId?: string) {
  const fetchAll = useServerFn(getAllAvailableSpots);
  const query = useQuery({
    queryKey: ["event-availability-all"],
    staleTime: 60_000,
    queryFn: () => fetchAll(),
  });
  const availableSpots =
    fientaEventId && query.data && fientaEventId in query.data ? query.data[fientaEventId] : null;
  return { availableSpots, query };
}
