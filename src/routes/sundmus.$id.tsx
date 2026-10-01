import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import { StatusBadge, SoldOutPill } from "@/components/EventCard";
import { RegisteredEventActions } from "@/components/RegisteredEventActions";
import { SpeakerLinks } from "@/components/SpeakerLinks";
import { useMyRegistrations, effectiveStatus } from "@/hooks/use-my-registrations";
import { useEventAvailability } from "@/hooks/use-event-availability";
import { getEvent, longDate, dayLabel, displayTime } from "@/lib/events";

export const Route = createFileRoute("/sundmus/$id")({
  loader: ({ params }) => {
    const event = getEvent(params.id);
    if (!event) throw notFound();
    return { event };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Sündmus — Studio MindZ 2026" },
          { name: "description", content: "Studio MindZi sündmuse info." },
          { property: "og:title", content: "Sündmus — Studio MindZ 2026" },
          { property: "og:description", content: "Studio MindZi sündmuse info." },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      };
    }
    const { event } = loaderData;
    return {
      meta: [
        { title: `${event.title} — Studio MindZ 2026` },
        { name: "description", content: event.shortDescription },
        { property: "og:title", content: `${event.title} — Studio MindZ 2026` },
        { property: "og:description", content: event.shortDescription },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary" },
        { property: "og:url", content: `/sundmus/${event.id}` },
      ],
      links: [{ rel: "canonical", href: `/sundmus/${event.id}` }],
    };
  },
  component: EventDetailPage,
});

function EventDetailPage() {
  const { event } = Route.useLoaderData();
  const { ids } = useMyRegistrations();
  const { availableSpots } = useEventAvailability(event.fientaEventId);
  const status = effectiveStatus(event, ids);
  const displayStatus = status === "open" && availableSpots === 0 ? "full" : status;
  const open = displayStatus === "open";

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
      <div className="mt-2">
        <SpeakerLinks eventId={event.id} fallback={event.speaker} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">
          <Clock className="size-4" /> {displayTime(event.startTime)}–{displayTime(event.endTime)}
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm font-medium">
          <MapPin className="size-4" /> {event.venue}
        </span>
      </div>

      {displayStatus !== "full" && (
        <div className="mt-4">
          <StatusBadge status={displayStatus} />
        </div>
      )}

      <p className="mt-5 whitespace-pre-line leading-relaxed text-foreground/90">{event.description}</p>

      <div className="mt-6 space-y-3">
        {open && (
          <div className="flex items-center gap-3">
            <a
              href={event.seriesUrl ?? event.registrationUrl}
              className="flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground"
            >
              Registreeru
            </a>
            {availableSpots !== null && (
              <span className="shrink-0 text-sm text-primary">Vabu kohti: {availableSpots}</span>
            )}
          </div>
        )}
        {displayStatus === "full" && <SoldOutPill className="w-full py-3.5 text-base" />}
        {status === "registered" && (
          <>
            <p className="text-sm font-semibold text-primary">
              Oled sellele sündmusele registreerunud ✓
            </p>
            <RegisteredEventActions event={event} />
          </>
        )}
      </div>
    </main>
  );
}
