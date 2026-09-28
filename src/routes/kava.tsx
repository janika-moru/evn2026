import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { EventCard } from "@/components/EventCard";
import yldineBanner from "@/assets/yldine-nadala-banner.png.asset.json";
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
      <img
        src={yldineBanner.url}
        alt="Tartu Ettevõtlusnädal 5.–9. oktoober Studio MindZis, Lutsu 3 — 5 päeva, 22 koolitajat, 26 üritust"
        className="w-full rounded-2xl"
      />
      <h1 className="mt-4 text-2xl font-bold">Kava</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Studio MindZi programm · 5.–9. oktoober
      </p>

      <div role="tablist" aria-label="Vali päev" className="mt-4 grid grid-cols-5 gap-1.5">
        {EVENT_DAYS.map((d) => {
          const active = d.date === selected;
          return (
            <button
              key={d.date}
              role="tab"
              aria-selected={active}
              onClick={() => selectDay(d.date)}
              className={`rounded-2xl px-1 py-2.5 text-center transition-all duration-150 active:scale-95 ${
                active
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary text-secondary-foreground"
              }`}
            >
              <span className="block text-[13px] font-semibold leading-tight">{d.label}</span>
            </button>
          );
        })}
      </div>

      <div ref={dayStartRef} className="mt-5 scroll-mt-3">
        <h2 className="text-lg font-semibold first-letter:uppercase">{longDate(selected)}</h2>
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

      <img
        src={ruumidBanner.url}
        alt="Studio MindZi ruumid — registreerimine Fienta.com/studiomindz"
        className="mt-8 w-full rounded-2xl"
      />
    </main>
  );
}
