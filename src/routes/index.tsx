import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Studio MindZ 2026" }],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/kava", search: {} });
  },
});
