import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { dayLabel, displayTime, type EventItem } from "@/lib/events";
import { requestWithdrawal } from "@/lib/withdrawal.functions";

export function WithdrawButton({ event, large = false }: { event: EventItem; large?: boolean }) {
  const send = useServerFn(requestWithdrawal);
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function confirm() {
    setState("sending");
    try {
      const r = await send({ data: { eventId: event.id } });
      setState(r.ok ? "sent" : "error");
    } catch {
      setState("error");
    }
  }

  const done = state === "sent";
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {large ? (
          <Button
            variant="outline"
            disabled={done}
            className="min-h-[40px] w-full rounded-full border-2 border-background bg-transparent px-2 text-center text-[14px] leading-snug shadow-none whitespace-normal"
          >
            {done ? "Loobumine saadetud" : "Loobu koolitusest"}
          </Button>
        ) : (
          <button disabled={done} className="underline underline-offset-2 disabled:no-underline">
            {done ? "Loobumine saadetud" : "Loobu koolitusest"}
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm rounded-2xl">
        <DialogHeader>
          <DialogTitle>{done ? "Aitäh!" : "Kas soovid koolitusest loobuda?"}</DialogTitle>
          <DialogDescription>
            {done
              ? "Andsime korraldajale teada."
              : `${event.title} · ${dayLabel(event.date)} ${displayTime(event.startTime)}`}
          </DialogDescription>
        </DialogHeader>
        {state === "error" && (
          <p className="text-[15px] text-destructive">Saatmine ebaõnnestus. Proovi uuesti.</p>
        )}
        {done ? (
          <Button onClick={() => setOpen(false)} className="min-h-[52px] rounded-full text-[17px]">
            Sulge
          </Button>
        ) : (
          <div className="grid gap-3">
            <Button
              onClick={confirm}
              disabled={state === "sending"}
              className="min-h-[52px] rounded-full text-[17px]"
            >
              {state === "sending" ? "Saadan…" : "Jah, loobun"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="min-h-[52px] rounded-full text-[17px]"
            >
              Katkesta
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
