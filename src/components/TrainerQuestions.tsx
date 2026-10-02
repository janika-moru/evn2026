import { useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { HelpCircle, ImagePlus, MessagesSquare, Pencil, ThumbsUp, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import type { EventItem } from "@/lib/events";
import { questionAuthor, type QuestionItem } from "@/lib/questions";
import {
  askQuestion,
  deleteQuestion,
  listQuestions,
  toggleVote,
  updateQuestion,
} from "@/lib/questions.functions";

const MAX_BYTES = 10 * 1024 * 1024;
const input =
  "mt-1 min-h-[48px] w-full rounded-xl border border-border bg-background px-4 text-[17px] outline-none focus:ring-2 focus:ring-ring";

export function TrainerQuestionButtons({ event }: { event: EventItem }) {
  const [askOpen, setAskOpen] = useState(false);
  const [listOpen, setListOpen] = useState(false);
  if (!event.fientaEventId) return null;
  const btn =
    "min-h-[52px] w-full rounded-full bg-primary px-4 text-[15px] text-primary-foreground whitespace-normal [&_svg]:size-5";
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      <Button className={btn} onClick={() => setAskOpen(true)}>
        <HelpCircle /> Esita küsimus koolitajale
      </Button>
      <Button className={btn} onClick={() => setListOpen(true)}>
        <MessagesSquare /> Vaata küsimusi koolitajale
      </Button>
      <Dialog open={askOpen} onOpenChange={setAskOpen}>
        <DialogContent className="max-h-[90vh] w-[calc(100vw-2rem)] max-w-md overflow-y-auto rounded-2xl md:max-w-2xl lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Esita küsimus koolitajale</DialogTitle>
            <DialogDescription>{event.title}</DialogDescription>
          </DialogHeader>
          <AskForm
            eventId={event.fientaEventId}
            onDone={() => {
              setAskOpen(false);
              setListOpen(true);
            }}
          />
        </DialogContent>
      </Dialog>
      <Dialog open={listOpen} onOpenChange={setListOpen}>
        <DialogContent className="max-h-[90vh] max-w-md overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle>Küsimused koolitajale</DialogTitle>
            <DialogDescription>{event.title}</DialogDescription>
          </DialogHeader>
          {listOpen && <QuestionList eventId={event.fientaEventId} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function AskForm({ eventId, onDone }: { eventId: string; onDone: () => void }) {
  const ask = useServerFn(askQuestion);
  const qc = useQueryClient();
  const [body, setBody] = useState("");
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function pick(f: File | null) {
    setError("");
    if (f && (!f.type.startsWith("image/") || f.size > MAX_BYTES)) {
      setError("Lisa pildifail kuni 10 MB.");
      return;
    }
    setFile(f);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!body.trim()) return setError("Kirjuta oma küsimus.");
    setSending(true);
    setError("");
    let attachment: string | null = null;
    if (file) {
      const { data: s } = await supabase.auth.getSession();
      const uid = s.session?.user.id;
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const safeExt = /^(jpg|jpeg|png|webp|gif|heic|heif)$/.test(ext) ? ext : "jpg";
      const path = `${uid}/${crypto.randomUUID()}.${safeExt}`;
      const { error: upErr } = await supabase.storage
        .from("question-images")
        .upload(path, file, { contentType: file.type });
      if (!uid || upErr) {
        setSending(false);
        return setError("Pildi üleslaadimine ebaõnnestus. Proovi väiksema pildiga või saada ilma.");
      }
      attachment = path;
    }
    try {
      const res = await ask({
        data: { eventId, body, name: name || null, field: field || null, attachment },
      });
      if (!res.ok) {
        setSending(false);
        return setError(
          "rateLimited" in res
            ? "Liiga palju küsimusi korraga. Proovi mõne minuti pärast — sinu tekst jääb alles."
            : "Saatmine ebaõnnestus. Proovi uuesti — sinu tekst jääb alles.",
        );
      }
    } catch {
      setSending(false);
      return setError("Saatmine ebaõnnestus. Proovi uuesti — sinu tekst jääb alles.");
    }
    await qc.invalidateQueries({ queryKey: ["questions", eventId] });
    setSending(false);
    onDone();
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <textarea
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
        maxLength={2000}
        rows={4}
        placeholder="Sinu küsimus"
        className="min-h-[128px] w-full resize-none rounded-xl border border-border bg-background p-4 text-[17px] outline-none focus:ring-2 focus:ring-ring"
      />
      <label className="block text-[15px]">
        Sinu nimi
        <input value={name} onChange={(e) => setName(e.target.value)} maxLength={100} className={input} />
      </label>
      <label className="block text-[15px]">
        Valdkond
        <input value={field} onChange={(e) => setField(e.target.value)} maxLength={100} className={input} />
      </label>
      <p className="text-[14px] text-muted-foreground">
        Nimi ja valdkond on vabatahtlikud. Ilma nimeta näidatakse küsimust anonüümsena.
      </p>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => pick(e.target.files?.[0] ?? null)}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => fileRef.current?.click()}
        className="min-h-[48px] w-full rounded-full text-[15px]"
      >
        <ImagePlus /> {file ? file.name : "Lisa ekraanipilt"}
      </Button>
      {error && <p className="text-[15px] text-destructive">{error}</p>}
      <Button
        type="submit"
        disabled={sending}
        className="min-h-[52px] w-full rounded-full text-[17px]"
      >
        {sending ? "Saadan…" : "Saada küsimus"}
      </Button>
    </form>
  );
}

function QuestionList({ eventId }: { eventId: string }) {
  const list = useServerFn(listQuestions);
  const vote = useServerFn(toggleVote);
  const update = useServerFn(updateQuestion);
  const remove = useServerFn(deleteQuestion);
  const qc = useQueryClient();
  const key = ["questions", eventId];
  const query = useQuery({
    queryKey: key,
    queryFn: () => list({ data: { eventId } }),
    refetchInterval: 15000,
  });
  const refresh = () => qc.invalidateQueries({ queryKey: key });

  if (query.isLoading) return <p className="text-[15px] text-muted-foreground">Laen…</p>;
  if (query.isError)
    return <p className="text-[15px] text-destructive">Küsimuste laadimine ebaõnnestus.</p>;
  const items = query.data ?? [];
  if (!items.length)
    return <p className="text-[15px] text-muted-foreground">Küsimusi veel ei ole.</p>;

  return (
    <div className="space-y-3">
      {items.map((q) => (
        <QuestionCard
          key={q.id}
          q={q}
          onVote={async () => {
            await vote({ data: { id: q.id } });
            refresh();
          }}
          onSave={async (body) => {
            await update({ data: { id: q.id, body } });
            refresh();
          }}
          onDelete={async () => {
            await remove({ data: { id: q.id } });
            refresh();
          }}
        />
      ))}
    </div>
  );
}

export function QuestionCard({
  q,
  onVote,
  onSave,
  onDelete,
  large = false,
}: {
  q: QuestionItem;
  onVote?: () => Promise<void>;
  onSave?: (body: string) => Promise<void>;
  onDelete?: () => Promise<void>;
  large?: boolean;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(q.body);
  const [busy, setBusy] = useState(false);
  const [zoom, setZoom] = useState(false);

  const run = async (fn?: () => Promise<void>) => {
    if (!fn || busy) return;
    setBusy(true);
    try {
      await fn();
    } finally {
      setBusy(false);
    }
  };

  return (
    <article className="rounded-2xl border border-border bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <p className={`font-semibold ${large ? "text-[19px]" : "text-[15px]"}`}>{questionAuthor(q)}</p>
        {q.mine && !editing && (
          <div className="flex shrink-0 gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Muuda küsimust"
              onClick={() => setEditing(true)}
              className="size-9 rounded-full text-muted-foreground"
            >
              <Pencil className="size-4" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Võta küsimus tagasi"
              onClick={() => {
                if (window.confirm("Kas võtad küsimuse tagasi?")) void run(onDelete);
              }}
              className="size-9 rounded-full text-destructive"
            >
              <Trash2 className="size-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
      {editing ? (
        <div className="mt-2 space-y-2">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            maxLength={2000}
            rows={4}
            className="w-full rounded-xl border border-border bg-background p-3 text-[17px] outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex gap-2">
            <Button
              disabled={busy || !draft.trim()}
              onClick={() => run(async () => {
                await onSave?.(draft.trim());
                setEditing(false);
              })}
              className="rounded-full"
            >
              Salvesta
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setDraft(q.body);
                setEditing(false);
              }}
              className="rounded-full"
            >
              Loobu
            </Button>
          </div>
        </div>
      ) : (
        <p className={`mt-2 whitespace-pre-wrap leading-relaxed ${large ? "text-[22px]" : "text-[17px]"}`}>
          {q.body}
        </p>
      )}
      {q.imageUrl && (
        <>
          <button onClick={() => setZoom(true)} className="mt-3 block" aria-label="Ava ekraanipilt suurelt">
            <img src={q.imageUrl} alt="Ekraanipilt" className="size-20 rounded-lg object-cover" />
          </button>
          <Dialog open={zoom} onOpenChange={setZoom}>
            <DialogContent className="w-[calc(100vw-1rem)] max-w-5xl border-0 p-2 sm:p-4">
              <DialogTitle className="sr-only">Ekraanipilt</DialogTitle>
              <img src={q.imageUrl} alt="Ekraanipilt" className="mx-auto max-h-[80vh] w-auto object-contain" />
            </DialogContent>
          </Dialog>
        </>
      )}
      <div className="mt-3 flex justify-end">
        {onVote && !q.mine ? (
          <Button
            type="button"
            variant={q.votedByMe ? "default" : "secondary"}
            size="sm"
            onClick={() => run(onVote)}
            aria-pressed={q.votedByMe}
            aria-label="Hea küsimus"
            className="min-h-[40px] rounded-full px-3 text-[15px]"
          >
            <ThumbsUp className="size-4" aria-hidden="true" /> {q.votes}
          </Button>
        ) : (
          <span className="flex min-h-[40px] items-center gap-1.5 px-3 text-[15px] text-muted-foreground">
            <ThumbsUp className="size-4" aria-hidden="true" /> {q.votes}
          </span>
        )}
      </div>
    </article>
  );
}
