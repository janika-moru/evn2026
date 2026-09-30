import { Link } from "@tanstack/react-router";
import { FileText, MessageSquareHeart } from "lucide-react";
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
export function RegisteredEventActions({ event }: { event: EventItem }) {
  const slidesUrl = event.slidesUrl ?? event.materialsUrl;

  return (
    <div className="mt-3 space-y-2">
      <div className="grid grid-cols-2 gap-2">
        <Button asChild variant="outline" className="h-10 rounded-full px-2 text-xs">
          <Link to="/tagasiside" search={{ sundmus: event.id }}>
            <MessageSquareHeart />
            Anna tagasisidet
          </Link>
        </Button>
        {slidesUrl ? (
          <Button asChild variant="outline" className="h-10 rounded-full px-2 text-xs">
            <a href={slidesUrl} target="_blank" rel="noreferrer">
              <FileText />
              Vaata slaide
            </a>
          </Button>
        ) : (
          <Button disabled variant="outline" className="h-10 rounded-full px-2 text-xs">
            <FileText />
            Slaide veel pole
          </Button>
        )}
      </div>

      <AddToCalendar event={event} />

      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
        <Ticket className="size-3.5 shrink-0" />
        <span>Ava Fienta:</span>
        <Dialog>
          <DialogTrigger className="underline underline-offset-2">
            Pilet · QR-kood · loobumine
          </DialogTrigger>
          <DialogContent className="max-w-sm rounded-2xl">
            <DialogHeader>
              <DialogTitle>Sinu pilet</DialogTitle>
              <DialogDescription>
                Logi Fientasse sisse sama meiliga, millega registreerusid – sealt näed oma piletit ja
                QR-koodi ning saad soovi korral kohast loobuda.
              </DialogDescription>
            </DialogHeader>
            <Button asChild className="rounded-full">
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
