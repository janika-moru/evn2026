import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Clock, CheckCircle2 } from "lucide-react";
import type { EventItem } from "@/lib/events";
import { displayTime, statusLabel, longDate } from "@/lib/events";
import { useMyRegistrations, effectiveStatus } from "@/hooks/use-my-registrations";
import { useEventAvailability } from "@/hooks/use-event-availability";
import { SpeakerLinks } from "@/components/SpeakerLinks";

/** Kohad on otsas — brändi roosas toonis, registreerumise nupu asemel. */
export function SoldOutPill({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground ${className}`}
    >
      Välja müüdud
    </span>
  );
}

export function StatusBadge({ status }: { status: EventItem["registrationStatus"] }) {
  if (status === "registered") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
        <CheckCircle2 className="size-3.5" />
        {statusLabel(status)}
      </span>
    );
  }
  if (status === "closed") {
    return (
      <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
        {statusLabel(status)}
      </span>
    );
  }
  // "full" kuvatakse SoldOutPill-ina, "open" ei vaja eraldi märki.
  return null;
}

/**
 * Kaart nagu Kavas. showDate lisab kellaaja ette kuupäeva (Minu kava jaoks,
 * kus päevi eraldi ei rühmitata). actions renderdatakse kaardi allsammas,
 * linki kõrval — nupud jäävad lingi sisse pesastamata.
 * hideRegisteredBadge jätab "Oled registreerunud" märgi välja (Minu kava,
 * kus iga rida on niigi registreering).
 */
export function EventCard({
  event,
  showDate = false,
  actions,
  hideRegisteredBadge = false,
}: {
  event: EventItem;
  showDate?: boolean;
  actions?: ReactNode;
  hideRegisteredBadge?: boolean;
}) {
  const { session, ids } = useMyRegistrations();
  const { availableSpots } = useEventAvailability(event.fientaEventId);
  const status = effectiveStatus(event, ids);
  const displayStatus = status === "open" && availableSpots === 0 ? "full" : status;
  const registered = displayStatus === "registered";

  const eventLink =
    "block rounded-xl transition-colors active:bg-secondary/60";

  return (
    <div
      className={`rounded-2xl border border-border p-4 ${
        registered ? "bg-mindz-pink" : "bg-card"
      }`}
    >
      <Link to="/sundmus/$id" params={{ id: event.id }} className={eventLink}>
        <p className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <Clock className="size-4 shrink-0" />
          {showDate && <span className="uppercase">{longDate(event.date)}</span>}
          {displayTime(event.startTime)}–{displayTime(event.endTime)}
        </p>
        <h3 className="mt-1 text-base font-semibold leading-snug">{event.title}</h3>
      </Link>

      <SpeakerLinks eventId={event.id} fallback={event.speaker} />

      <Link to="/sundmus/$id" params={{ id: event.id }} className={eventLink}>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{event.shortDescription}</p>
      </Link>

      {(!hideRegisteredBadge || !registered) && (
        <div className="mt-3 flex items-center justify-between gap-2">
          {displayStatus === "closed" && <StatusBadge status={displayStatus} />}
          {(displayStatus === "open" || registered) && (
            <span className="ml-auto flex items-center gap-3">
              <span className="text-sm text-primary">Vabu kohti: {availableSpots ?? 50}</span>
              {registered ? (
                <StatusBadge status="registered" />
              ) : (
                <Link
                  to="/sundmus/$id"
                  params={{ id: event.id }}
                  className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
                >
                  Registreeru
                </Link>
              )}
            </span>
          )}
          {displayStatus === "full" && (
            <SoldOutPill className={`ml-auto ${session ? "bg-background" : "bg-mindz-pink"}`} />
          )}
        </div>
      )}
      {actions}
    </div>
  );
}
