import { useEffect, useState, type ReactNode } from "react";

/** Toimunud = 15 min pärast lõpuaega Tallinna aja järgi (okt 2026: UTC+3). */
function useIsPast(event: { date: string; endTime: string }) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const end = Date.parse(`${event.date}T${event.endTime}:00+03:00`) + 15 * 60_000;
    const check = () => setPast(Date.now() >= end);
    check();
    const t = setInterval(check, 60_000);
    return () => clearInterval(t);
  }, [event.date, event.endTime]);
  return past;
}
import { Link } from "@tanstack/react-router";
import { Clock, CheckCircle2 } from "lucide-react";
import type { EventItem } from "@/lib/events";
import { displayTime, statusLabel, longDate } from "@/lib/events";
import { useMyRegistrations, effectiveStatus } from "@/hooks/use-my-registrations";
import { useEventAvailability } from "@/hooks/use-event-availability";
import { SpeakerLinks } from "@/components/SpeakerLinks";

/** Kohad on otsas — brändi roosas toonis, registreerumise nupu asemel. */
export function SoldOutPill({
  className = "",
  large = false,
}: {
  className?: string;
  large?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full border border-border font-semibold text-foreground ${
        large ? "min-h-[48px] px-5 text-base" : "px-4 py-2 text-sm"
      } ${className}`}
    >
      Välja müüdud
    </span>
  );
}

export function StatusBadge({
  status,
  large = false,
  grey = false,
}: {
  status: EventItem["registrationStatus"];
  large?: boolean;
  /** Toimunud koolitus — märk neutraalses toonis, mitte roheline. */
  grey?: boolean;
}) {
  if (status === "registered") {
    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full font-semibold ${
          grey
            ? "border border-border text-muted-foreground"
            : "bg-primary text-primary-foreground"
        } ${large ? "min-h-[44px] px-4 text-sm" : "px-3 py-1 text-xs"}`}
      >
        <CheckCircle2 className={large ? "size-4" : "size-3.5"} />
        {statusLabel(status)}
      </span>
    );
  }
  if (status === "closed") {
    return (
      <span
        className={`inline-flex items-center rounded-full bg-muted font-medium text-muted-foreground ${
          large ? "min-h-[44px] px-4 text-sm" : "px-3 py-1 text-xs"
        }`}
      >
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
 * large (Minu kava) = suurem kiri ja rohkem ruumi, et leht oleks loetav
 * ka halva nägemisega kasutajale; Kava ja sündmuse leht jäävad vaikimisi
 * ehk large=false kujule.
 */
export function EventCard({
  event,
  showDate = false,
  actions,
  hideRegisteredBadge = false,
  large = false,
}: {
  event: EventItem;
  showDate?: boolean;
  actions?: ReactNode;
  hideRegisteredBadge?: boolean;
  large?: boolean;
}) {
  const { session, ids } = useMyRegistrations();
  const { availableSpots } = useEventAvailability(event.fientaEventId);
  const status = effectiveStatus(event, ids);
  const displayStatus = status === "open" && availableSpots === 0 ? "full" : status;
  const registered = displayStatus === "registered";
  const past = useIsPast(event);

  const eventLink =
    "block rounded-xl transition-colors active:bg-secondary/60";

  return (
    <div
      className={`rounded-2xl border border-border ${large ? "p-5" : "p-4"} ${
        past ? "bg-muted opacity-70" : registered ? "bg-mindz-pink" : "bg-card"
      }`}
    >
      <Link to="/sundmus/$id" params={{ id: event.id }} className={eventLink}>
        <p
          className={`flex items-center gap-1.5 font-medium text-muted-foreground ${
            large ? "text-base" : "text-sm"
          }`}
        >
          <Clock className={`shrink-0 ${large ? "size-5" : "size-4"}`} />
          {showDate && <span className="uppercase">{longDate(event.date)}</span>}
          {displayTime(event.startTime)}–{displayTime(event.endTime)}
        </p>
        <h3
          className={`font-semibold leading-snug ${large ? "mt-4 text-xl" : "mt-1 text-base"}`}
        >
          {event.title}
        </h3>
      </Link>

      <SpeakerLinks eventId={event.id} fallback={event.speaker} large={large} />

      <Link to="/sundmus/$id" params={{ id: event.id }} className={eventLink}>
        <p
          className={`line-clamp-2 text-muted-foreground ${
            large ? "mt-3 text-[17px] leading-relaxed" : "mt-2 text-sm"
          }`}
        >
          {event.shortDescription}
        </p>
      </Link>

      {(!hideRegisteredBadge || !registered) && (
        <div className={`flex items-center justify-between gap-2 ${large ? "mt-4" : "mt-3"}`}>
          {displayStatus === "closed" && <StatusBadge status={displayStatus} large={large} />}
          {(displayStatus === "open" || registered) && (
            <span className="ml-auto flex items-center gap-3">
              {availableSpots !== null && (
                <span className={`text-primary ${large ? "text-base" : "text-sm"}`}>
                  Vabu kohti: {availableSpots}
                </span>
              )}
              {registered ? (
                <StatusBadge status="registered" large={large} />
              ) : (
                <Link
                  to="/sundmus/$id"
                  params={{ id: event.id }}
                  className={`inline-flex items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground ${
                    large ? "min-h-[48px] px-5 text-base" : "px-4 py-2 text-sm"
                  }`}
                >
                  Registreeru
                </Link>
              )}
            </span>
          )}
          {displayStatus === "full" && (
            <SoldOutPill
              large={large}
              className={`ml-auto ${session ? "bg-background" : "bg-mindz-pink"}`}
            />
          )}
        </div>
      )}
      {actions}
    </div>
  );
}
