import { createFileRoute } from "@tanstack/react-router";
import { dayLabel, displayTime, slidesPageRows } from "@/lib/events";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {slidesPageRows().map((row) => (
          <article
            key={row.event.id}
            className="flex flex-col rounded-2xl border border-border bg-card p-4"
          >
            {row.speakerImageUrl && (
              <img
                src={row.speakerImageUrl}
                alt={row.speakerName}
                loading="lazy"
                className="h-16 w-16 rounded-full object-cover"
              />
            )}
            <h2 className="mt-2 text-base font-semibold leading-snug">
              {row.speakerName}
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {row.event.title}
            </p>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {dayLabel(row.event.date)} kell {displayTime(row.event.startTime)}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3">
              {row.cancelled ? (
                <span className={missingMark}>Koolitus jäi ära</span>
              ) : row.letter ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <button type="button" className={slidesLink}>
                      Loe koolitajate kirja
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[85vh] w-[calc(100vw-2rem)] overflow-y-auto md:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Kiri koolitajatelt</DialogTitle>
                      <DialogDescription className="sr-only">
                        {row.event.title}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="whitespace-pre-line text-base leading-relaxed">
                      {row.letter
                        .trim()
                        .split(/(https?:\/\/\S+)/g)
                        .map((part, i) =>
                          /^https?:\/\//.test(part) ? (
                            <a
                              key={i}
                              href={part}
                              target="_blank"
                              rel="noreferrer"
                              className="underline underline-offset-2"
                            >
                              {part}
                            </a>
                          ) : (
                            part
                          ),
                        )}
                    </div>
                  </DialogContent>
                </Dialog>
              ) : row.slidesUrl ? (
                <a
                  href={row.slidesUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={slidesLink}
                >
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
