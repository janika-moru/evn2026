import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import { EVENT_DAYS, eventsForDate, longDate, nextEvent, todayEventDate } from "@/lib/events";

const validateSearch = (search: Record<string, unknown>): { paev?: string } =>
  typeof search["paev"] === "string" ? { paev: search["paev"] as string } : {};

export const Route = createFileRoute("/kava")({
  validateSearch,
  head: () => ({
    meta: [
      { title: "Kava — Studio MindZ 2026" },
      {
        name: "description",
        content: "Studio MindZi programm päevade kaupa, 5.–9. oktoober 2026 Tartus.",
      },
      { property: "og:title", content: "Kava — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Studio MindZi programm päevade kaupa, 5.–9. oktoober 2026 Tartus.",
      },
      { property: "og:url", content: "/kava" },
    ],
    links: [{ rel: "canonical", href: "/kava" }],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  const { paev } = Route.useSearch();
  const navigate = useNavigate();
  const selected = EVENT_DAYS.some((d) => d.date === paev) ? paev! : todayEventDate();
  const events = eventsForDate(selected);
  const next = nextEvent();

  return (
    <main className="px-4 pt-8">
      <h1 className="text-2xl font-bold">Kava</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Studio MindZi programm · 5.–9. oktoober
      </p>

      {next && (
        <section className="mt-5 rounded-2xl bg-secondary p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Järgmine sündmus
          </p>
          <p className="mt-1 text-lg font-semibold leading-snug">{next.title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {longDate(next.date)} · {next.startTime}–{next.endTime} · {next.speaker}
          </p>
          <Link
            to="/sundmus/$id"
            params={{ id: next.id }}
            className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            Vaata detaili <ArrowRight className="size-4" />
          </Link>
        </section>
      )}

      <div
        role="tablist"
        aria-label="Vali päev"
        className="no-scrollbar -mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1"
      >
        {EVENT_DAYS.map((d) => {
          const active = d.date === selected;
          return (
            <button
              key={d.date}
              role="tab"
              aria-selected={active}
              onClick={() =>
                navigate({ to: "/kava", search: { paev: d.date }, replace: true })
              }
              className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              {d.label}
            </button>
          );
        })}
      </div>

      <div className="mt-4 space-y-3">
        {events.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
            Sellel päeval sündmusi ei ole.
          </p>
        ) : (
          events.map((e) => <EventCard key={e.id} event={e} />)
        )}
      </div>
    </main>
  );
}
