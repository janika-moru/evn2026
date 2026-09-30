import { queryOptions, useQuery } from "@tanstack/react-query";
import { getAllAvailableSpots } from "@/lib/availability.functions";

/** Ühine vabade kohtade päring — Kava eellaeb selle, kaardid/detail loevad vahemälust. */
export const availabilityQueryOptions = queryOptions({
  queryKey: ["event-availability-all"],
  staleTime: 60_000,
  queryFn: () => getAllAvailableSpots(),
});

export function useEventAvailability(fientaEventId?: string) {
  const query = useQuery(availabilityQueryOptions);
  const availableSpots =
    fientaEventId && query.data && fientaEventId in query.data ? query.data[fientaEventId] : null;
  return { availableSpots, query };
}
