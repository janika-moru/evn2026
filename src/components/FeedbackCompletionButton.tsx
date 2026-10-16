import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Heart, MessageSquareHeart, Undo2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { setMyManualFeedbackCompletion } from "@/lib/feedback-completion.functions";
import { isFeedbackComplete, type FeedbackCompletion } from "@/lib/feedback-completion";
import { feedbackCompletionKey } from "@/hooks/use-feedback-completion";

export function FeedbackCompletionButton({ eventId, completion, loading, failed, retry, asLink }: {
  eventId: string;
  completion?: FeedbackCompletion | undefined;
  loading: boolean;
  failed: boolean;
  retry: () => void;
  asLink?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const write = useServerFn(setMyManualFeedbackCompletion);
  const queryClient = useQueryClient();
  const done = isFeedbackComplete(completion);
  const cls = "min-h-[48px] h-auto w-full rounded-full px-4 py-2 text-[15px] leading-snug whitespace-normal [&_svg]:size-5 [&_svg]:shrink-0";
  const linkCls = "inline-flex items-center gap-1 text-sm font-medium text-primary underline underline-offset-2 transition-colors hover:opacity-80";
  const doneCls = "inline-flex items-center gap-1 text-sm font-medium text-muted-foreground";

  async function mark(manual: boolean) {
    setBusy(true);
    setError("");
    try {
      await write({ data: { eventId, manual } });
      await queryClient.invalidateQueries({ queryKey: feedbackCompletionKey });
      setOpen(false);
    } catch {
      setError("Märke salvestamine ebaõnnestus. Proovi uuesti.");
    } finally { setBusy(false); }
  }

  if (asLink) {
    if (loading) return null;
    if (failed) return <button type="button" className={linkCls} onClick={retry}>Proovi uuesti</button>;
    if (completion?.submitted) return <span className={doneCls}><Heart className="size-4 fill-current text-primary" />Tagasiside antud</span>;
  }
  if (loading) return <Button disabled variant="outline" className={cls}>Laen tagasiside olekut…</Button>;
  if (failed) return <Button variant="outline" className={cls} onClick={retry}>Proovi tagasiside olekut uuesti laadida</Button>;
  if (completion?.submitted) return <Button disabled variant="outline" className={`${cls} disabled:opacity-100`}><Heart className="fill-current text-primary" /><span>Tagasiside koolitajale: juba antud</span></Button>;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {asLink ? (
          <button type="button" className={done ? doneCls : linkCls}>
            {done && <Heart className="size-4 fill-current text-primary" />}
            {done ? "Tagasiside antud" : "Anna tagasisidet"}
          </button>
        ) : (
        <Button variant="outline" className={cls}>
          {done ? <Heart className="fill-current text-primary" /> : <MessageSquareHeart />}
          <span>{done ? "Tagasiside koolitajale: juba antud" : "Tagasiside koolitajale: veel andmata"}</span>
        </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{done ? "Tagasiside antud" : "Tagasiside koolitajale"}</DialogTitle>
          <DialogDescription className="sr-only">Vali tagasiside tegevus</DialogDescription>
        </DialogHeader>
        <Button asChild className="min-h-12 h-auto rounded-full whitespace-normal">
          <Link to="/tagasiside" search={{ sundmus: eventId }}><MessageSquareHeart />{done ? "Jäta veel tagasisidet" : "Jäta tagasisidet koolitajale"}</Link>
        </Button>
        <Button variant="outline" disabled={busy} onClick={() => mark(!done)} className="min-h-12 h-auto rounded-full whitespace-normal">
          {done ? <Undo2 /> : <Heart />}{busy ? "Salvestan…" : done ? "Võta minu märge tagasi" : "Olen juba tagasisidet andnud"}
        </Button>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}