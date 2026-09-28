import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Camera, HeartHandshake, LifeBuoy, Lightbulb, X } from "lucide-react";
import { EVENTS, getEvent, dayLabel, displayTime } from "@/lib/events";
import { supabase } from "@/integrations/supabase/client";

const validateSearch = (search: Record<string, unknown>): { sundmus?: string } =>
  typeof search["sundmus"] === "string" ? { sundmus: search["sundmus"] as string } : {};

export const Route = createFileRoute("/tagasiside")({
  validateSearch,
  head: () => ({
    meta: [
      { title: "Anna tagasisidet — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Ütle meile kiiresti, mis töötab, mida võiks muuta või kui vajad kohe abi. Tagasiside on anonüümne.",
      },
      { property: "og:title", content: "Anna tagasisidet — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Ütle meile kiiresti, mis töötab, mida võiks muuta või kui vajad abi.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FeedbackPage,
});

type FType = "keep" | "change" | "help";

const TYPES: { id: FType; label: string; icon: typeof HeartHandshake; hint: string }[] = [
  { id: "keep", label: "Teeme samamoodi edasi", icon: HeartHandshake, hint: "Mis sulle meeldis?" },
  { id: "change", label: "Teeksin midagi teisiti", icon: Lightbulb, hint: "Mida võiksime muuta?" },
  { id: "help", label: "Mul on praegu abi vaja", icon: LifeBuoy, hint: "Mis juhtus? Kus sa oled?" },
];

function FeedbackPage() {
  const { sundmus } = Route.useSearch();
  const fromEvent = sundmus && getEvent(sundmus) ? sundmus : null;

  const [type, setType] = useState<FType | null>(null);
  const [target, setTarget] = useState(fromEvent ?? "general");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [wantsContact, setWantsContact] = useState(false);
  const [contact, setContact] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<FType | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!type) return;
    if (!message.trim() && !photo) {
      setError("Kirjuta paar sõna või lisa foto.");
      return;
    }
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
      event_id: target === "general" ? null : target,
      feedback_type: type,
      message: message.trim() || null,
      needs_help: type === "help",
      contact_requested: wantsContact,
      contact: wantsContact ? contact.trim() || null : null,
      attachment_url: attachment,
    });
    setSending(false);
    if (dbErr) {
      setError("Saatmine ebaõnnestus. Proovi palun uuesti.");
      return;
    }
    setSent(type);
  }

  if (sent) {
    return (
      <main className="px-4 pt-16 text-center">
        <p className="text-5xl">💚</p>
        <h1 className="mt-4 text-2xl font-bold">Aitäh! Saime su mõtte kätte.</h1>
        {sent === "help" && (
          <p className="mx-auto mt-3 max-w-xs rounded-2xl bg-secondary p-4 text-sm">
            Kui asi vajab kohe lahendamist, kirjuta{" "}
            <a href="mailto:info@mindz.ee" className="font-semibold text-primary underline">
              info@mindz.ee
            </a>
            .
          </p>
        )}
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={() => {
              setSent(null);
              setType(null);
              setMessage("");
              setPhoto(null);
              setWantsContact(false);
              setContact("");
            }}
            className="text-sm font-semibold text-primary"
          >
            Ütle veel midagi
          </button>
          <Link
            to="/kava"
            search={{}}
            className="inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Tagasi kava juurde
          </Link>
        </div>
      </main>
    );
  }

  if (!type) {
    return (
      <main className="px-4 pt-8">
        <h1 className="text-2xl font-bold">Mida tahad meile öelda?</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Võtab alla poole minuti. Anonüümne.
        </p>
        <div className="mt-6 space-y-3">
          {TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`flex w-full items-center gap-4 rounded-2xl border p-5 text-left text-base font-semibold transition active:scale-[0.98] ${
                t.id === "help"
                  ? "border-foreground/10 bg-secondary"
                  : "border-border bg-card"
              }`}
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <t.icon className="size-5" />
              </span>
              {t.label}
            </button>
          ))}
        </div>
      </main>
    );
  }

  const current = TYPES.find((t) => t.id === type)!;
  const fixedEvent = fromEvent ? getEvent(fromEvent) : null;

  return (
    <main className="px-4 pt-6 pb-8">
      <button
        onClick={() => setType(null)}
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4" /> {current.label}
      </button>

      <form onSubmit={submit} className="mt-4 space-y-5">
        {fixedEvent ? (
          <p className="rounded-xl bg-secondary px-4 py-3 text-sm">
            Sündmus: <span className="font-semibold">{fixedEvent.title}</span>
          </p>
        ) : (
          <div>
            <label htmlFor="target" className="text-sm font-semibold">
              Millest jutt?
            </label>
            <select
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base"
            >
              <option value="general">Üldine korraldus</option>
              {EVENTS.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {dayLabel(ev.date)} {displayTime(ev.startTime)} · {ev.title}
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label htmlFor="msg" className="text-sm font-semibold">
            Kirjuta meile
          </label>
          <textarea
            id="msg"
            rows={4}
            maxLength={4000}
            autoFocus
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={current.hint}
            className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
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
        )}

        <div className="rounded-xl bg-secondary p-4">
          <label className="flex items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              checked={wantsContact}
              onChange={(e) => setWantsContact(e.target.checked)}
              className="size-5 accent-[var(--primary)]"
            />
            Soovin, et minuga võetaks ühendust.
          </label>
          {wantsContact && (
            <input
              type="text"
              required
              maxLength={300}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="E-post või telefon"
              className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-base"
            />
          )}
        </div>

        {error && <p className="text-sm text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={sending}
          className="w-full rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground disabled:opacity-60"
        >
          {sending ? "Saadan…" : "Saada"}
        </button>
      </form>
    </main>
  );
}
