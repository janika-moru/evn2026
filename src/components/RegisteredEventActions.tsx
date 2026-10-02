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
import { TrainerQuestionButtons } from "@/components/TrainerQuestions";

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
  // Telefonis üks nupp rea kohta, et tekst mahuks mugavalt ära.
  const btn = large
    ? "min-h-[52px] rounded-full border-2 border-background px-4 text-[15px] [&_svg]:size-5"
    : "h-10 rounded-full px-2 text-xs";
  const link = large
    ? "inline-flex min-h-[44px] items-center underline underline-offset-4"
    : "underline underline-offset-2";

  const actionButtons = (
    <div className={large ? "grid grid-cols-1 gap-3 sm:grid-cols-2" : "grid grid-cols-2 gap-2"}>
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
  );

  const fientaDialog = (
    <Dialog>
      <DialogTrigger asChild>
        {large ? (
          <Button
            variant="outline"
            className="min-h-[40px] w-full rounded-full border border-background bg-transparent px-3 text-center text-[14px] leading-snug shadow-none whitespace-normal"
          >
            Ava Fienta: QR-kood ja loobumine
          </Button>
        ) : (
          <button className={link}>QR-kood ja loobumine</button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Sinu pilet</DialogTitle>
          <DialogDescription>
            Logi Fientasse sisse sama meiliga, millega registreerusid – sealt näed oma piletit ja
            QR-koodi ning saad soovi korral kohast loobuda.
          </DialogDescription>
        </DialogHeader>
        <Button asChild className="min-h-[52px] rounded-full px-6 text-[17px]">
          <a href="https://fienta.com/u/tickets" target="_blank" rel="noreferrer">
            Ava Fienta konto
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  );

  if (large) {
    return (
      <div className="mt-4 space-y-3">
        <AddToCalendar event={event} large />
        {fientaDialog}
        <TrainerQuestionButtons event={event} />
        {actionButtons}
      </div>
    );
  }


  return (
    <div className="mt-3 space-y-2">
      {actionButtons}

      <AddToCalendar event={event} />

      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs text-muted-foreground">
        <Ticket className="size-3.5 shrink-0" />
        <span>Ava Fienta:</span>
        {fientaDialog}
      </p>
    </div>
  );
}
