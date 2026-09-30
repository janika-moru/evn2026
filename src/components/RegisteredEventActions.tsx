import { Link } from "@tanstack/react-router";
import { FileText, MessageSquareHeart, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { EventItem } from "@/lib/events";
import { AddToCalendar } from "@/components/AddToCalendar";

/** Koolitaja nimi ja kontaktlingid on kaardi pealkirja all (SpeakerLinks). */
export function RegisteredEventActions({
  event,
  large = false,
}: {
  event: EventItem;
  large?: boolean;
}) {
  const slidesUrl = event.slidesUrl ?? event.materialsUrl;

  // large (Minu kava): 52px kõrgused nupud, 15px tekst ja 44px tabamisalad.
  const btn = large
    ? "min-h-[52px] rounded-full px-3 text-[15px] [&_svg]:size-5"
    : "h-10 rounded-full px-2 text-xs";
  const link = large
    ? "inline-flex min-h-[44px] items-center underline underline-offset-4"
    : "underline underline-offset-2";

  return (
    <div className={large ? "mt-4 space-y-3" : "mt-3 space-y-2"}>
      <div className={`grid grid-cols-2 ${large ? "gap-3" : "gap-2"}`}>
        <Button asChild variant="outline" className={btn}>
          <Link to="/tagasiside" search={{ sundmus: event.id }}>
            <MessageSquareHeart />
            Anna tagasisidet
          </Link>
        </Button>
        {slidesUrl ? (
          <Button asChild variant="outline" className={btn}>
            <a href={slidesUrl} target="_blank" rel="noreferrer">
              <FileText />
              Vaata slaide
            </a>
          </Button>
        ) : (
          <Button disabled variant="outline" className={btn}>
            <FileText />
            Slaide veel pole
          </Button>
        )}
      </div>

      <AddToCalendar event={event} large={large} />

      <p
        className={`flex flex-wrap items-center text-muted-foreground ${
          large ? "gap-x-3 text-[15px]" : "gap-x-1.5 gap-y-1 text-xs"
        }`}
      >
        <Ticket className={`shrink-0 ${large ? "size-5" : "size-3.5"}`} />
        <span>Ava Fienta:</span>
        <Dialog>
          <DialogTrigger className={link}>Pilet · QR-kood · loobumine</DialogTrigger>
          <DialogContent className="max-w-sm rounded-2xl">
            <DialogHeader>
              <DialogTitle>Sinu pilet</DialogTitle>
              <DialogDescription>
                Logi Fientasse sisse sama meiliga, millega registreerusid – sealt näed oma piletit ja
                QR-koodi ning saad soovi korral kohast loobuda.
              </DialogDescription>
            </DialogHeader>
            <Button asChild className="min-h-[52px] rounded-full px-6 text-[17px]">
              <a href="https://fienta.com/et/u/tickets" target="_blank" rel="noreferrer">
                Ava Fienta konto
              </a>
            </Button>
          </DialogContent>
        </Dialog>
      </p>
    </div>
  );
}
