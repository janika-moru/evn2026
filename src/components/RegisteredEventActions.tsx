import { Link } from "@tanstack/react-router";
import { FileText, MessageSquareHeart, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { speakersForEvent, type EventItem } from "@/lib/events";

export function RegisteredEventActions({ event }: { event: EventItem }) {
  const speakers = speakersForEvent(event.id);
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
          <Button disabled variant="secondary" className="h-10 rounded-full px-2 text-xs">
            <FileText />
            Slaide veel pole
          </Button>
        )}
      </div>

      {speakers.map((speaker) => (
        <Button
          key={speaker.id}
          asChild
          variant="outline"
          className="h-auto min-h-12 w-full justify-start rounded-xl px-3 py-2 text-left"
        >
          <Link to="/koolitajad" hash={speaker.id}>
            {speaker.imageUrl ? (
              <img
                src={speaker.imageUrl}
                alt=""
                className="size-8 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary">
                <UserRound />
              </span>
            )}
            <span className="min-w-0 whitespace-normal leading-tight">
              <span className="block text-xs text-muted-foreground">Koolitaja kontaktid</span>
              <span className="mt-0.5 block text-sm font-semibold">{speaker.name}</span>
            </span>
          </Link>
        </Button>
      ))}

      <Dialog>
        <DialogTrigger className="block w-full pt-1 text-center text-xs text-muted-foreground underline underline-offset-2">
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
            <a href="https://fienta.com/auth/login" target="_blank" rel="noreferrer">
              Ava Fienta konto
            </a>
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}