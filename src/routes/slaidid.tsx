import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/slaidid")({
  head: () => ({
    meta: [
      { title: "Koolitusmaterjalid — Studio MindZ 2026" },
      { name: "description", content: "Registreerunud osaleja koolitusmaterjalid asuvad Minu kavas." },
      { property: "og:title", content: "Koolitusmaterjalid — Studio MindZ 2026" },
      { property: "og:description", content: "Registreerunud osaleja koolitusmaterjalid asuvad Minu kavas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  beforeLoad: () => { throw redirect({ to: "/minu-kava", statusCode: 301 }); },
});
