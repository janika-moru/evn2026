import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText, Linkedin, Mail } from "lucide-react";
import { SPEAKERS, getEvent } from "@/lib/events";

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

function SpeakersPage() {
  return (
    <main className="px-4 pt-8">
      <h1 className="text-2xl font-bold">Koolitajad &amp; materjalid</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Kontaktid ja materjalid leiad siit ka pärast koolitust.
      </p>

      <div className="mt-5 space-y-4">
        {SPEAKERS.map((s) => {
          const events = s.eventIds.map(getEvent).filter(Boolean);
          return (
            <article key={s.id} className="rounded-2xl border border-border bg-card p-4">
              <div className="flex items-center gap-3">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-full bg-secondary text-lg font-semibold">
                  {initials(s.name)}
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-semibold leading-snug">{s.name}</h2>
                  {s.role && <p className="text-sm text-muted-foreground">{s.role}</p>}
                </div>
              </div>

              {s.bio && (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.bio}</p>
              )}

              {events.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {events.map((e) => (
                    <li key={e!.id}>
                      <Link
                        to="/sundmus/$id"
                        params={{ id: e!.id }}
                        className="text-sm font-medium text-primary underline underline-offset-2"
                      >
                        {e!.title}
                      </Link>
                      {(e!.slidesUrl || e!.materialsUrl) && (
                        <span className="mt-1 flex gap-3">
                          {e!.slidesUrl && (
                            <a href={e!.slidesUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold">
                              <FileText className="size-3.5" /> Vaata slaide
                            </a>
                          )}
                          {e!.materialsUrl && (
                            <a href={e!.materialsUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold">
                              <FileText className="size-3.5" /> Materjalid
                            </a>
                          )}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                {s.email && (
                  <a
                    href={`mailto:${s.email}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-semibold"
                  >
                    <Mail className="size-4" /> Kirjuta
                  </a>
                )}
                {s.linkedinUrl && (
                  <a
                    href={s.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-sm font-semibold"
                  >
                    <Linkedin className="size-4" /> LinkedIn
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}
