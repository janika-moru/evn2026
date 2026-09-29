import { useEffect, useState } from "react";
import { Camera, GraduationCap, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import type { Speaker } from "@/lib/events";
import { speakerEventRows } from "@/lib/events";

// Tagasisidevorm koolitaja profiili all — hinnang 1–10, tekst, nimi, valdkond,
// valikuline foto ja kontakt (sisse logituna eeltäidetud e-postiga, muudetav).
export function SpeakerFeedbackForm({ speaker }: { speaker: Speaker }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // Sisse loginud kasutaja e-post vaikimisi kontaktiks (jääb muudetavaks)
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const email = data.session?.user?.email;
      if (email) setContact((prev) => prev || email);
    });
  }, []);

  const rows = speakerEventRows(speaker);
  const eventOptions = rows.flatMap((row) =>
    row.kind === "series" ? row.events : [row.event],
  );

  if (sent) {
    return (
      <div className="mt-4 rounded-2xl border border-primary/25 bg-mindz-mint p-4 text-center">
        <p className="text-2xl">💚</p>
        <p className="mt-1 text-sm font-semibold">Aitäh! Saime su tagasiside kätte.</p>
        <button
          onClick={() => {
            setSent(false);
            setRating(null);
            setMessage("");
            setPhoto(null);
          }}
          className="mt-2 text-sm font-semibold text-primary underline underline-offset-2"
        >
          Jäta veel üks tagasiside
        </button>
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
        Anna tagasisidet koolitusele
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
      const ext = (photo.name.split(".").pop() || "jpg").toLowerCase().slice(0, 5);
      const path = `${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
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
    const { error: dbErr } = await supabase.from("feedback").insert({
      event_id: eventOptions[0]?.id ?? null,
      feedback_type: "training",
      message: message.trim() || null,
      rating,
      respondent_name: name.trim() || null,
      respondent_field: field.trim() || null,
      needs_help: false,
      contact_requested: !!contact.trim(),
      contact: contact.trim() || null,
      attachment_url: attachment,
    });
    setSending(false);
    if (dbErr) {
      setError("Saatmine ebaõnnestus. Proovi palun uuesti.");
      return;
    }
    setSent(true);
  }

  return (
    <form
      onSubmit={submit}
      className="mt-4 space-y-4 rounded-2xl border border-border bg-background/70 p-4"
    >
      <p className="text-sm font-semibold">Anna tagasisidet koolitusele</p>

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
        rows={3}
        maxLength={4000}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Sinu tagasiside koolitusele"
        className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
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
        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold">
          <Camera className="size-4" /> Lisa foto (valikuline)
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
      )}

      <div>
        <label htmlFor={`contact-${speaker.id}`} className="text-sm font-semibold">
          Kontakt (e-post)
        </label>
        <input
          id={`contact-${speaker.id}`}
          type="email"
          maxLength={300}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          placeholder="sinu@email.ee"
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base"
        />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground disabled:opacity-60"
      >
        {sending ? "Saadan…" : "Saada tagasiside"}
      </button>
    </form>
  );
}
