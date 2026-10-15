import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getMyFeedbackCompletion } from "@/lib/feedback-completion.functions";

export const feedbackCompletionKey = ["my-feedback-completion"];

export function useFeedbackCompletion(userId: string) {
  const read = useServerFn(getMyFeedbackCompletion);
  return useQuery({
    queryKey: [...feedbackCompletionKey, userId],
    queryFn: () => read(),
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
}