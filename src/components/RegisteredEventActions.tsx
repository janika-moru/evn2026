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

const contactLink =
  "text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground";

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
        <div key={speaker.id} className="flex items-center gap-3">
          <Link to="/koolitajad" hash={speaker.id} aria-label={speaker.name} className="shrink-0">
            {speaker.imageUrl ? (
              <img
                src={speaker.imageUrl}
                alt=""
                className="size-9 shrink-0 rounded-full object-cover"
              />
            ) : (
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                <UserRound className="size-4" />
              </span>
            )}
          </Link>
          <div className="min-w-0">
            <Link
              to="/koolitajad"
              hash={speaker.id}
              className="block text-sm font-bold leading-tight"
            >
              {speaker.name}
            </Link>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
              {speaker.websiteUrl && (
                <a
                  href={speaker.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={contactLink}
                >
                  Koduleht
                </a>
              )}
              {speaker.linkedinUrl && (
                <a
                  href={speaker.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={contactLink}
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </div>
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