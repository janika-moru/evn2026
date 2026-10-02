import { CalendarPlus } from "lucide-react";
import type { EventItem } from "@/lib/events";
import { googleCalendarUrl, outlookCalendarUrl, icalDataUrl } from "@/lib/calendar";

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
    // Minu kava: sildil oma rida, kolm kalendrit ühel real kõrvuti tavaliste
    // linkidena, 15px tekst ja piisavalt suured tabamisalad.
    const linkCls = "inline-flex min-h-[44px] items-center underline underline-offset-4";
    return (
      <div className={`text-[15px] text-muted-foreground ${className}`}>
        <p className="mb-0.5 flex items-center gap-2">
          <CalendarPlus className="size-5 shrink-0" />
          <span>Lisa kalendrisse</span>
        </p>
        <p className="flex items-center justify-between">
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
      </div>
    );
  }

  const linkCls = "underline underline-offset-2";

  return (
    <p
      className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground ${className}`}
    >
      <CalendarPlus className="size-3.5 shrink-0" />
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
