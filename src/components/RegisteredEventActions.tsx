import { Link } from "@tanstack/react-router";
import { FileText, Mail, MessageSquareHeart, Ticket } from "lucide-react";
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
import { TicketQr } from "@/components/TicketQr";
import { WithdrawButton } from "@/components/WithdrawButton";

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
      {event.letter ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className={btn}>
              <Mail />
              Loe koolitajate kirja
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] w-[calc(100vw-2rem)] overflow-y-auto md:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Kiri koolitajatelt</DialogTitle>
              <DialogDescription className="sr-only">{event.title}</DialogDescription>
            </DialogHeader>
            <div className="whitespace-pre-line text-base leading-relaxed">
              {event.letter.trim().split(/(https?:\/\/\S+)/g).map((part, i) =>
                /^https?:\/\//.test(part) ? (
                  <a key={i} href={part} target="_blank" rel="noreferrer" className="underline underline-offset-2">
                    {part}
                  </a>
                ) : (
                  part
                ),
              )}
            </div>
          </DialogContent>
        </Dialog>
      ) : slidesUrl ? (
        <Button asChild variant="outline" className={btn}>
          <a href={slidesUrl} target="_blank" rel="noreferrer">
            <FileText />
            Vaata slaide
          </a>
        </Button>
      ) : (
        // Kui slaide pole ega tule (nt lõpuõhtu), nuppu üldse ei näidata.
        // Muul juhul jääb hall „Slaide veel pole", et osaleja teaks, et need tulevad.
        event.slidesExpected === false ? null : (
          <Button disabled variant="outline" className={btn}>
            <FileText />
            Slaide veel pole
          </Button>
        )
      )}
    </div>
  );

  const fientaDialog = (
    <Dialog>
      <DialogTrigger asChild>
        {large ? (
          <Button
            variant="outline"
            className="min-h-[40px] w-full rounded-full border-2 border-background bg-transparent px-2 text-center text-[14px] leading-snug shadow-none whitespace-normal"
          >
            Näita QR-koodi
          </Button>
        ) : (
          <button className={link}>QR-kood</button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>Sinu pilet</DialogTitle>
          <DialogDescription>Näita seda koodi kohapeal sissepääsul.</DialogDescription>
        </DialogHeader>
        <TicketQr fientaEventId={event.fientaEventId} />
      </DialogContent>
    </Dialog>
  );

  if (large) {
    return (
      <div className="mt-4 space-y-3">
        <AddToCalendar event={event} large />
        {/* Kaks nuppu kõrvuti: QR-koodi paremas servas, et pöidlega mugavam avada. */}
        <div className="grid grid-cols-2 gap-2">
          <WithdrawButton event={event} large />
          {fientaDialog}
        </div>
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
        {fientaDialog}
        <span>·</span>
        <WithdrawButton event={event} />
      </p>
    </div>
  );
}
