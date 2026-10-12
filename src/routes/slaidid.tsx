import { createFileRoute } from "@tanstack/react-router";
import { dayLabel, displayTime, slidesPageRows } from "@/lib/events";

export const Route = createFileRoute("/slaidid")({
  head: () => ({
    meta: [
      { title: "Slaidid — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Kõikide Tartu Ettevõtlusnädala koolituste slaidid ja materjalid ühes kohas.",
      },
      { property: "og:title", content: "Slaidid — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Koolituste slaidid ja materjalid ühes kohas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/slaidid" }],
  }),
  component: SlidesPage,
});

const slidesLink =
  "text-sm font-medium text-primary underline underline-offset-2 transition-colors hover:opacity-80";
const missingMark = "text-sm text-muted-foreground/45";

function SlidesPage() {
  return (
    <main className="px-4 pt-8">
      <h1 className="text-2xl font-bold">Slaidid</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Kõikide koolituste slaidid ja materjalid ühes kohas.
      </p>

      <div className="mt-5 space-y-3">
        {slidesPageRows().map((row) => (
          <article key={row.event.id} className="rounded-2xl border border-border bg-card p-4">
            <h2 className="text-base font-semibold leading-snug">{row.speakerName}</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">{row.event.title}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {dayLabel(row.event.date)} kell {displayTime(row.event.startTime)}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
              {row.cancelled ? (
                <span className={missingMark}>Koolitus jäi ära</span>
              ) : row.slidesUrl ? (
                <a href={row.slidesUrl} target="_blank" rel="noreferrer" className={slidesLink}>
                  Vaata slaide
                </a>
              ) : (
                <span className={missingMark}>Slaide pole</span>
              )}
              {row.materials && !row.cancelled && (
                <a
                  href={row.materials.url}
                  target="_blank"
                  rel="noreferrer"
                  className={slidesLink}
                >
                  {row.materials.label}
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
