import { useEffect, useRef, useState } from "react";
import { Camera, CheckCircle2, GraduationCap, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { submitFeedback } from "@/lib/feedback.functions";
import type { Speaker } from "@/lib/events";
import { speakerEventRows } from "@/lib/events";

// Nimi, roll ja meil jäetakse seadmesse ainult „jäta meelde" nõusolekul (vt feedback-profile).
import { loadFeedbackProfile, saveFeedbackProfile } from "@/lib/feedback-profile";

// Tagasisidevorm koolitaja profiili all — hinnang 1–10, tekst, nimi, valdkond,
// e-post ja valikuline foto. Kõik isikuandmed on vabatahtlikud; varem sisestatud
// andmed täidetakse seadmest vaikimisi (sisse loginul e-post kontolt).
// `startOpen` + `onClose` võimaldavad vormi kasutada ka otse Tagasiside lehel,
// kus koolitajale klõpsates avaneb vorm kohe ja sulgemisel vormi lihtsalt eemaldatakse.
export function SpeakerFeedbackForm({
  speaker,
  startOpen = false,
  onClose,
}: {
  speaker: Speaker;
  startOpen?: boolean;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(startOpen);
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [contact, setContact] = useState("");
  const [photoPromise, setPhotoPromise] = useState(false);
  const [publishConsent, setPublishConsent] = useState(false);
  const [remember, setRemember] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const sentRef = useRef<HTMLDivElement>(null);
  // Robotilõks: nähtamatu väli + vormi täitmise aeg
  const hpRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(Date.now());

  // Eeltäide: 1) kasutaja nõusolekul seadmesse jäetud andmed, 2) sisse logitud meil
  useEffect(() => {
    const saved = loadFeedbackProfile();
    if (saved) {
      if (saved.name) setName(saved.name);
      if (saved.field) setField(saved.field);
      if (saved.contact) setContact(saved.contact);
      setRemember(true);
    }
    supabase.auth.getSession().then(({ data }) => {
      const email = data.session?.user?.email;
      if (email) setContact((prev) => prev || email);
    });
  }, []);

  // Tekstikast kasvab kirjutades koos tekstiga, et seda oleks mugav üle lugeda
  useEffect(() => {
    const el = msgRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [message, open]);

  // Kinnitus tuhil pärast saatmist ekraanile, et osaleja näeks kindlalt selle kätte
  useEffect(() => {
    if (sent) sentRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [sent]);

  const rows = speakerEventRows(speaker);
  const eventOptions = rows.flatMap((row) =>
    row.kind === "series" ? row.events : [row.event],
  );

  if (sent) {
    return (
      <div
        ref={sentRef}
        className="mt-4 scroll-mt-4 rounded-2xl border border-primary/25 bg-mindz-mint p-5 text-center"
      >
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary">
          <CheckCircle2 className="size-7 text-primary-foreground" />
        </div>
        <p className="mt-3 text-lg font-bold">Sinu tagasiside jõudis meieni</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Aitäh! Koolitaja loeb seda ja see aitab järgmisi koolitusi paremini ette valmistada.
        </p>
        <div className="mt-3 flex flex-col items-center gap-1.5">
          <button
            onClick={() => {
              setSent(false);
              setRating(null);
              setMessage("");
            }}
            className="text-sm font-semibold text-primary underline underline-offset-2"
          >
            Jäta veel üks tagasiside
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-sm text-muted-foreground underline underline-offset-2"
            >
              Sulge
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition active:scale-[0.98]"
      >
        <GraduationCap className="size-4" />
        Saada tagasiside koolitajale
      </button>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) return setError("Vali hinnang 1–10.");
    setSending(true);
    setError("");
    let attachment: string | null = null;
    if (photo) {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      if (!userId) {
        setSending(false);
        setError("Foto lisamiseks logi palun sisse — või saada tagasiside ilma pildita.");
        return;
      }
      const ext = (photo.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
      const path = `${userId}/${crypto.randomUUID()}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from("feedback")
        .upload(path, photo, { contentType: photo.type || "image/jpeg" });
      if (upErr) {
        setSending(false);
        setError("Foto üleslaadimine ebaõnnestus. Proovi väiksema pildiga või saada ilma.");
        return;
      }
      attachment = path;
    }
    let dbErr = false;
    try {
      const res = await submitFeedback({
        data: {
          event_id: eventOptions[0]?.id ?? null,
          speaker_id: speaker.id,
          feedback_type: "training",
          message: message.trim() || null,
          rating,
          respondent_name: name.trim() || null,
          respondent_field: field.trim() || null,
          contact_requested: !!contact.trim() || photoPromise,
          contact: contact.trim() || null,
          attachment_url: attachment,
          photo_promise: photoPromise,
          publish_consent: publishConsent,
          website: hpRef.current?.value || "",
          elapsed_ms: Date.now() - startedAt.current,
        },
      });
      dbErr = !res.ok;
    } catch {
      dbErr = true;
    }
    setSending(false);
    if (dbErr) {
      setError("Saatmine ebaõnnestus. Proovi palun uuesti.");
      return;
    }
    // Ainult kasutaja nõusolekul: nimi, roll ja meil selles seadmes (fotot ei hoita)
    saveFeedbackProfile(remember, { name, field, contact });
    setSent(true);
  }

  return (
    <form
      onSubmit={submit}
      className="relative mt-4 space-y-4 rounded-2xl border border-border bg-background/70 p-4"
    >
      <input
        ref={hpRef}
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold">
          {onClose ? `Tagasiside — ${speaker.name}` : "Saada tagasiside koolitajale"}
        </p>
        <button
          type="button"
          onClick={() => (onClose ? onClose() : setOpen(false))}
          aria-label="Sulge vorm"
          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Sinu tagasiside aitab järgmisi koolitusi paremini ette valmistada.
        <br />
        Nimi ja meiliaadress on vabatahtlikud ning mõeldud vaid koolitajale ja tiimile
        vastamiseks — anonüümselt vastamiseks jäta need täitmata.
      </p>

      <div>
        <p className="text-sm font-semibold">Kuidas jäid koolitusega rahule?</p>
        <div className="mt-2 grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setRating(n)}
              className={`rounded-xl border py-2.5 text-base font-semibold ${
                rating === n
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <textarea
        ref={msgRef}
        maxLength={4000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Mis koolituse juures meeldis ja mida võiks järgmine kord lahendada teisiti?"
        className="max-h-[70vh] min-h-32 w-full resize-none overflow-y-auto rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
      />

      <div className="grid gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={200}
          placeholder="Sinu nimi"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base"
        />
        <input
          value={field}
          onChange={(e) => setField(e.target.value)}
          maxLength={200}
          placeholder="Roll / valdkond"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base"
        />
        <input
          id={`contact-${speaker.id}`}
          type="email"
          maxLength={300}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="Meiliaadress"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base"
        />
      </div>

      {photo ? (
        <div className="flex items-center gap-3 rounded-xl border border-border p-2">
          <img
            src={URL.createObjectURL(photo)}
            alt="Lisatud foto"
            className="size-14 rounded-lg object-cover"
          />
          <span className="flex-1 truncate text-sm">{photo.name}</span>
          <button type="button" onClick={() => setPhoto(null)} aria-label="Eemalda foto">
            <X className="size-5 text-muted-foreground" />
          </button>
        </div>
      ) : (
        <div>
          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold">
            <Camera className="size-4" /> Lisa foto
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f && f.size > 10 * 1024 * 1024) setError("Foto on liiga suur (max 10 MB).");
                else if (f) setPhoto(f);
              }}
            />
          </label>
          <label className="mt-2 flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-muted-foreground">
            <input
              type="checkbox"
              checked={photoPromise}
              onChange={(e) => setPhotoPromise(e.target.checked)}
              className="mt-0.5 size-4 shrink-0 accent-primary"
            />
            Saadan pildi hiljem — tuleta meiliga meelde
          </label>
        </div>
      )}

      <div className="space-y-2">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-muted-foreground">
          <input
            type="checkbox"
            checked={publishConsent}
            onChange={(e) => setPublishConsent(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          Luban Studio MindZil avaldada minu tagasiside koos nime ja fotoga kodulehel või
          sotsiaalmeedias
        </label>
        <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-muted-foreground">
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="mt-0.5 size-4 shrink-0 accent-primary"
          />
          Jäta nimi, roll ja meiliaadress selles seadmes meelde
        </label>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground disabled:opacity-60"
      >
        {sending ? "Saadan…" : "Saada koolitajale"}
      </button>
    </form>
  );
}
