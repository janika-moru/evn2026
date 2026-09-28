import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Studio MindZ 2026" },
      { name: "description", content: "Studio MindZi Tartu ettevõtlusnädala programm 5.–9. oktoobril 2026." },
      { property: "og:title", content: "Studio MindZ 2026" },
      { property: "og:description", content: "Studio MindZi Tartu ettevõtlusnädala programm 5.–9. oktoobril 2026." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/kava", search: {} });
  },
});
