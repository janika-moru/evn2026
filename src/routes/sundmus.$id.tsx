import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, CalendarPlus, Clock, MapPin, MessageSquareHeart, FileText, ExternalLink } from "lucide-react";
import { StatusBadge } from "@/components/EventCard";
import { getEvent, longDate, dayLabel, type EventItem } from "@/lib/events";

export const Route = createFileRoute("/sundmus/$id")({
  loader: ({ params }) => {
    const event = getEvent(params.id);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Sündmus — Studio MindZ 2026" }] };
    }
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} — Studio MindZ 2026` },
        { name: "description", content: event.shortDescription },
        { property: "og:title", content: `${event.title} — Studio MindZ 2026` },
        { property: "og:description", content: event.shortDescription },
        { property: "og:url", content: `/sundmus/${event.id}` },
      ],
      links: [{ rel: "canonical", href: `/sundmus/${event.id}` }],
    };
  },
  component: EventDetailPage,
});

function icsHref(event: EventItem): string {
  const dt = (date: string, time: string) =>
    `${date.replaceAll("-", "")}T${time.replace(":", "")}00`;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Studio MindZ 2026//ET",
    "BEGIN:VEVENT",
    `UID:${event.id}@studiomindz2026`,
    `DTSTART:${dt(event.date, event.startTime)}`,
    `DTEND:${dt(event.date, event.endTime)}`,
    `SUMMARY:${event.title}`,
    `LOCATION:${event.venue}`,
    `DESCRIPTION:${event.speaker} — ${event.shortDescription}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`;
}

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  const open = event.registrationStatus === "open";

  return (
    <main className="px-4 pt-6">
      <Link
        to="/kava"
        search={{}}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> Tagasi kava juurde
      </Link>

      <p className="mt-5 text-sm font-semibold text-primary">
        {dayLabel(event.date)} · {longDate(event.date)}
      </p>
      <h1 className="mt-1 text-2xl font-bold leading-tight">{event.title}</h1>
      <p className="mt-2 text-base text-muted-foreground">{event.speaker}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">
          <Clock className="size-4" /> {event.startTime}–{event.endTime}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">
          <MapPin className="size-4" /> {event.venue}
        </span>
      </div>

      <div className="mt-4">
        <StatusBadge status={event.registrationStatus} />
      </div>

      <p className="mt-5 whitespace-pre-line leading-relaxed text-foreground/90">{event.description}</p>

      <div className="mt-6 space-y-3">
        {open && (
          <a
            href={event.registrationUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground"
          >
            Registreeru Fientas <ExternalLink className="size-4" />
          </a>
        )}
        {event.registrationStatus === "registered" && (
          <p className="rounded-2xl border border-primary/40 bg-secondary/40 p-4 text-center text-sm font-semibold text-primary">
            Oled sellele sündmusele registreerunud ✓
          </p>
        )}
        <a
          href={icsHref(event)}
          download={`${event.id}.ics`}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold"
        >
          <CalendarPlus className="size-4" /> Lisa kalendrisse
        </a>
        <Link
          to="/tagasiside"
          search={{ sundmus: event.id }}
          className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold"
        >
          <MessageSquareHeart className="size-4" /> Anna tagasisidet
        </Link>
        {event.slidesUrl && (
          <a
            href={event.slidesUrl}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold"
          >
            <FileText className="size-4" /> Vaata slaide
          </a>
        )}
      </div>
    </main>
  );
}
