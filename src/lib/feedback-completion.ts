export type FeedbackCompletion = { event_id: string; submitted: boolean; manual: boolean };

export function mergeFeedbackCompletion(rows: FeedbackCompletion[]) {
  const result: Record<string, FeedbackCompletion> = {};
  for (const row of rows) {
    const previous = result[row.event_id];
    result[row.event_id] = {
      event_id: row.event_id,
      submitted: row.submitted || previous?.submitted || false,
      manual: row.manual || previous?.manual || false,
    };
  }
  return result;
}

export function isFeedbackComplete(row?: FeedbackCompletion) {
  return !!(row?.submitted || row?.manual);
}