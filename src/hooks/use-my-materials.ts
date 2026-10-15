import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyMaterials } from "@/lib/materials.functions";
import { useSession } from "./use-my-registrations";

export function useMyMaterials() {
  const { session } = useSession();
  const fetchMaterials = useServerFn(getMyMaterials);
  return useQuery({
    queryKey: ["my-materials", session?.user.id],
    enabled: Boolean(session),
    queryFn: () => fetchMaterials(),
    staleTime: 0,
  });
}