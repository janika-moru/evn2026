import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, CalendarCheck, MapPin, MessageSquareHeart } from "lucide-react";
import { EventCard } from "@/components/EventCard";
import {
  eventsForDate,
  nextEventOn,
  registeredEvents,
  todayEventDate,
  longDate,
} from "@/lib/events";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tartu ettevõtlusnädal Studio MindZis 2026" },
      {
        name: "description",
        content:
          "Studio MindZi programm 5.–9. oktoober 2026: kava, registreeringud, kohale tuleku info ja tagasiside — kõik telefonis.",
      },
      { property: "og:title", content: "Tartu ettevõtlusnädal Studio MindZis 2026" },
      {
        property: "og:description",
        content:
          "Studio MindZi programm 5.–9. oktoober 2026: kava, registreeringud, kohale tuleku info ja tagasiside — kõik telefonis.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: TodayPage,
});

function TodayPage() {
  const today = todayEventDate();
  const todaysEvents = eventsForDate(today);
  const next = nextEventOn(today);
  const myToday = registeredEvents().filter((e) => e.date === today);

  return (
    <main className="px-4 pt-8">
      <header>
        <p className="text-sm font-medium text-primary">Tartu ettevõtlusnädal</p>
        <h1 className="mt-1 text-3xl font-bold leading-tight">Studio MindZis 2026</h1>
        <p className="mt-1 text-sm text-muted-foreground">5.–9. oktoober · Lutsu 3, Tartu</p>
      </header>

      {next && (
        <section className="mt-6 rounded-2xl bg-secondary p-4">
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

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Täna · {longDate(today)}</h2>
        <div className="mt-3 space-y-3">
          {todaysEvents.map((e) => (
            <EventCard key={e.id} event={e} />
          ))}
        </div>
      </section>

      {myToday.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold">Minu tänased registreeringud</h2>
          <ul className="mt-3 space-y-2">
            {myToday.map((e) => (
              <li
                key={e.id}
                className="flex items-center gap-3 rounded-2xl border border-primary/40 bg-secondary/40 p-3"
              >
                <CalendarCheck className="size-5 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{e.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {e.startTime}–{e.endTime}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="mt-8 grid grid-cols-2 gap-3">
        <QuickLink to="/minu-kava" icon={CalendarCheck} label="Minu kava" />
        <QuickLink to="/kava" icon={CalendarDays} label="Vaata kogu kava" />
        <QuickLink to="/tagasiside" icon={MessageSquareHeart} label="Anna tagasisidet" />
        <QuickLink to="/info" icon={MapPin} label="Kohale tulek" />
      </section>

      <section className="mt-8 rounded-2xl border border-border bg-card p-4">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Tartu ettevõtlusnädal koondab üheks nädalaks ettevõtlusega seotud sündmused
          üle linna. Siin äpis näed <strong className="text-foreground">Studio MindZis</strong>{" "}
          toimuvat programmi.
        </p>
        <a
          href="https://www.tartu.ee/et/ettevotlusnadal#uldinfo"
          target="_blank"
          rel="noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
        >
          Vaata kogu Tartu ettevõtlusnädala programmi <ArrowRight className="size-4" />
        </a>
      </section>
    </main>
  );
}

function QuickLink({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: typeof CalendarDays;
  label: string;
}) {
  return (
    <Link
      to={to}
      className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-4 transition-colors active:bg-secondary/60"
    >
      <Icon className="size-6 text-primary" />
      <span className="text-sm font-semibold leading-tight">{label}</span>
    </Link>
  );
}
