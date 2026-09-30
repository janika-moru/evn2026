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
    // Minu kava: iga kalender oma suure nupuna, valge äärejoon roosa kaardi taustal.
    const big = "min-h-[48px] w-full rounded-full border-background bg-transparent px-4 text-[15px]";
    return (
      <div className={`grid grid-cols-1 gap-2.5 ${className}`}>
        <Button asChild variant="outline" className={big}>
          <a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
            Lisa Google kalendrisse
          </a>
        </Button>
        <Button asChild variant="outline" className={big}>
          <a href={outlookCalendarUrl(event)} target="_blank" rel="noreferrer">
            Lisa Outlook'i kalendrisse
          </a>
        </Button>
        <Button asChild variant="outline" className={big}>
          <a href={icalDataUrl(event)} download={`${event.id}.ics`}>
            Lisa Apple kalendrisse
          </a>
        </Button>
      </div>
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
