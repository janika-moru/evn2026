import { CalendarPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    // Minu kava: kolm nuppu kõrvuti. Terviklikud fraasid („Lisa Google
    // kalendrisse" jne) võtaksid 390px ekraanil üle 500px ja isegi
    // „Google'i kalender" kuju 375px, kaardisisene ruum on 316px.
    const btn =
      "min-h-[44px] rounded-full border-2 border-background bg-transparent px-2 text-[14px] leading-tight shadow-none whitespace-normal";
    return (
      <div className={`grid grid-cols-3 gap-2 ${className}`}>
        <Button asChild variant="outline" className={btn}>
          <a href={googleCalendarUrl(event)} target="_blank" rel="noreferrer">
            Lisa Google'i
          </a>
        </Button>
        <Button asChild variant="outline" className={btn}>
          <a href={outlookCalendarUrl(event)} target="_blank" rel="noreferrer">
            Lisa Outlook'i
          </a>
        </Button>
        <Button asChild variant="outline" className={btn}>
          <a href={icalDataUrl(event)} download={`${event.id}.ics`}>
            Lisa Apple'i
          </a>
        </Button>
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
