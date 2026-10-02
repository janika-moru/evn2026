import { CalendarPlus } from "lucide-react";
import type { EventItem } from "@/lib/events";
import { googleCalendarUrl, outlookCalendarUrl, icalDataUrl } from "@/lib/calendar";
import { Button } from "@/components/ui/button";

/**
 * Diskreetne kalendrilinkide rida: Google · Outlook · Apple (.ics).
 * .ics koostatakse brauseris lennult — serverisse ei salvestata midagi.
 *
 * large (Minu kava) = 15px tekst ja iga lingi tabamisala vähemalt 44px kõrge.
 */
export function AddToCalendar({
  event,
  className = "",
  large = false,
}: {
  event: EventItem;
  className?: string;
  large?: boolean;
}) {
  if (large) {
    // Minu kava: kolm kalendrit ühel real tavaliste linkidena, 15px tekst
    // ja piisavalt suured tabamisalad.
    return (
      <p
        className={`flex flex-wrap items-center gap-x-2 gap-y-1 text-[15px] text-muted-foreground ${className}`}
      >
        <CalendarPlus className="size-5 shrink-0" />
        <span>Lisa kalendrisse:</span>
        <a
          href={googleCalendarUrl(event)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[44px] items-center underline underline-offset-4"
        >
          Google
        </a>
        <span aria-hidden>·</span>
        <a
          href={outlookCalendarUrl(event)}
          target="_blank"
          rel="noreferrer"
          className="inline-flex min-h-[44px] items-center underline underline-offset-4"
        >
          Outlook
        </a>
        <span aria-hidden>·</span>
        <a
          href={icalDataUrl(event)}
          download={`${event.id}.ics`}
          className="inline-flex min-h-[44px] items-center underline underline-offset-4"
        >
          Apple (.ics)
        </a>
      </p>
    );
  }

  const linkCls = large
    ? "inline-flex min-h-[44px] items-center underline underline-offset-4"
    : "underline underline-offset-2";

  return (
    <p
      className={`flex flex-wrap items-center text-muted-foreground ${
        large ? "gap-x-3 text-[15px]" : "gap-x-1.5 gap-y-1 text-xs"
      } ${className}`}
    >
      <CalendarPlus className={`shrink-0 ${large ? "size-5" : "size-3.5"}`} />
      <span>Lisa kalendrisse:</span>
      <a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer" className={linkCls}>
        Google
      </a>
      <span aria-hidden>·</span>
      <a href={outlookCalendarUrl(event)} target="_blank" rel="noreferrer" className={linkCls}>
        Outlook
      </a>
      <span aria-hidden>·</span>
      <a href={icalDataUrl(event)} download={`${event.id}.ics`} className={linkCls}>
        Apple (.ics)
      </a>
    </p>
  );
}
