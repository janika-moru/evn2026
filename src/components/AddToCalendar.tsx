import { CalendarPlus } from "lucide-react";
import type { EventItem } from "@/lib/events";
import { googleCalendarUrl, outlookCalendarUrl, icalDataUrl } from "@/lib/calendar";

/**
 * Diskreetne kalendrilinkide rida: Google · Outlook · Apple (.ics).
 * .ics koostatakse brauseris lennult — serverisse ei salvestata midagi.
 */
export function AddToCalendar({ event, className = "" }: { event: EventItem; className?: string }) {
  const linkCls = "underline underline-offset-2";
  return (
    <p className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground ${className}`}>
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
