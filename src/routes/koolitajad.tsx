import { createFileRoute, Link } from "@tanstack/react-router";
import {
  speakersInListOrder,
  speakerEventRows,
  isTeamSpeaker,
  dayLabel,
  displayTime,
} from "@/lib/events";

export const Route = createFileRoute("/koolitajad")({
  head: () => ({
    meta: [
      { title: "Koolitajad & materjalid — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Studio MindZi ettevõtlusnädala koolitajate kontaktid, sündmused ja koolitusmaterjalid.",
      },
      { property: "og:title", content: "Koolitajad & materjalid — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Koolitajate kontaktid, sündmused ja materjalid ühes kohas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/koolitajad" },
    ],
    links: [{ rel: "canonical", href: "/koolitajad" }],
  }),
  component: SpeakersPage,
});

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");
}

const contactLink =
  "text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground";

function SpeakersPage() {
  return (
    <main className="px-4 pt-8">
      <h1 className="text-2xl font-bold">Koolitajad &amp; materjalid</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Kontaktid ja materjalid leiad siit ka pärast koolitust.
      </p>

      <div className="mt-5 space-y-4">
        {speakersInListOrder().map((s) => {
          const rows = speakerEventRows(s);
          return (
            <article id={s.id} key={s.id} className="scroll-mt-6 rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                {s.imageUrl ? (
                  <img
                    src={s.imageUrl}
                    alt={s.name}
                    className="size-16 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex size-16 shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-semibold">
                    {initials(s.name)}
                  </div>
                )}
                <div className="min-w-0">
                  <h2 className="text-base font-semibold leading-snug">{s.name}</h2>
                  {s.role && <p className="text-sm text-muted-foreground">{s.role}</p>}
                </div>
              </div>

              {s.bio && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.bio}</p>
              )}

              {rows.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {rows.map((row) =>
                    row.kind === "series" ? (
                      <li key={row.url}>
                        <a
                          href={row.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-primary underline underline-offset-2"
                        >
                          {row.title}
                        </a>
                        <span className="block text-xs text-muted-foreground">
                          {row.events.length} hommikust sessiooni · kell{" "}
                          {row.events[0] ? displayTime(row.events[0].startTime) : ""}
                        </span>
                      </li>
                    ) : (
                      <li key={row.event.id}>
                        <Link
                          to="/sundmus/$id"
                          params={{ id: row.event.id }}
                          className="text-sm font-medium text-primary underline underline-offset-2"
                        >
                          {row.event.title}
                        </Link>
                        <span className="block text-xs text-muted-foreground">
                          {dayLabel(row.event.date)} {displayTime(row.event.startTime)}
                        </span>
                      </li>
                    ),
                  )}
                </ul>
              )}

              {(s.websiteUrl || s.linkedinUrl || s.facebookUrl || s.instagramUrl) && (
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                  {s.websiteUrl && (
                    <a href={s.websiteUrl} target="_blank" rel="noreferrer" className={contactLink}>
                      Koduleht
                    </a>
                  )}
                  {s.linkedinUrl && (
                    <a href={s.linkedinUrl} target="_blank" rel="noreferrer" className={contactLink}>
                      LinkedIn
                    </a>
                  )}
                  {s.facebookUrl && (
                    <a href={s.facebookUrl} target="_blank" rel="noreferrer" className={contactLink}>
                      Facebook
                    </a>
                  )}
                  {s.instagramUrl && (
                    <a href={s.instagramUrl} target="_blank" rel="noreferrer" className={contactLink}>
                      Instagram
                    </a>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </main>
  );
}
