import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Materjalid ja tagasiside — Studio MindZ 2026" },
      { name: "description", content: "Oma koolituste materjalid ja tagasiside Studio MindZi ettevõtlusnädala osalejatele." },
      { property: "og:title", content: "Materjalid ja tagasiside — Studio MindZ 2026" },
      { property: "og:description", content: "Oma koolituste materjalid ja tagasiside Studio MindZi ettevõtlusnädala osalejatele." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: () => {
    throw redirect({ to: "/minu-kava" });
  },
});
