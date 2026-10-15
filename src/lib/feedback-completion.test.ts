import { describe, expect, it } from "vitest";
import { isFeedbackComplete, mergeFeedbackCompletion } from "./feedback-completion";

describe("personal feedback completion", () => {
  it("does not complete a different training by the same speaker", () => {
    const result = mergeFeedbackCompletion([{ event_id: "202940", submitted: true, manual: false }]);
    expect(isFeedbackComplete(result["202940"])).toBe(true);
    expect(isFeedbackComplete(result["202965"])).toBe(false);
  });
  it("combines historical submissions with manual flags without losing submission", () => {
    const result = mergeFeedbackCompletion([
      { event_id: "202933", submitted: false, manual: true },
      { event_id: "202933", submitted: true, manual: false },
    ]);
    expect(result["202933"]).toEqual({ event_id: "202933", submitted: true, manual: true });
  });
  it("undoing a manual mark restores incomplete state", () => {
    expect(isFeedbackComplete({ event_id: "202933", submitted: false, manual: false })).toBe(false);
    expect(isFeedbackComplete({ event_id: "202933", submitted: false, manual: true })).toBe(true);
  });
});