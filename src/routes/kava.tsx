import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { EventCard } from "@/components/EventCard";
import { EVENT_DAYS, eventsForDate, longDate, todayEventDate } from "@/lib/events";

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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/kava" },
    ],
    links: [{ rel: "canonical", href: "/kava" }],
  }),
  component: SchedulePage,
});

function countLabel(n: number): string {
  return `${n} ${n === 1 ? "koolitus" : "koolitust"}`;
}

function SchedulePage() {
  const { paev } = Route.useSearch();
  const navigate = useNavigate();
  const selected = EVENT_DAYS.some((d) => d.date === paev) ? paev! : todayEventDate();
  const events = eventsForDate(selected);
  const dayStartRef = useRef<HTMLDivElement>(null);

  function selectDay(date: string) {
    if (date !== selected) {
      navigate({ to: "/kava", search: { paev: date }, replace: true });
    }
    // Toome valitud päeva pealkirja ja nimekirja kohe nähtavale,
    // et päevale vajutamine oleks selgelt tajutav.
    requestAnimationFrame(() => {
      dayStartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <main className="px-4 pt-8">
      <h1 className="text-2xl font-bold">Kava</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Studio MindZi programm · 5.–9. oktoober
      </p>

      <div role="tablist" aria-label="Vali päev" className="mt-4 grid grid-cols-5 gap-1.5">
        {EVENT_DAYS.map((d) => {
          const active = d.date === selected;
          const count = eventsForDate(d.date).length;
          return (
            <button
              key={d.date}
              role="tab"
              aria-selected={active}
              onClick={() => selectDay(d.date)}
              className={`rounded-2xl px-1 py-2 text-center transition-all duration-150 active:scale-95 ${
                active
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <span className="block text-[13px] font-semibold leading-tight">{d.label}</span>
              <span
                className={`mt-0.5 block text-[10px] leading-tight ${
                  active ? "text-primary-foreground/85" : "text-muted-foreground"
                }`}
              >
                {countLabel(count)}
              </span>
            </button>
          );
        })}
      </div>

      <div ref={dayStartRef} className="mt-5 scroll-mt-3">
        <h2 className="text-lg font-semibold first-letter:uppercase">{longDate(selected)}</h2>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {events.length === 0 ? "Sündmusi ei ole" : countLabel(events.length)}
        </p>
      </div>

      <div key={selected} className="day-in mt-3 space-y-3">
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
