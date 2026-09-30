import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Camera, CheckCircle2, GraduationCap, HeartHandshake, Lightbulb, Star, X } from "lucide-react";
import type { Speaker } from "@/lib/events";
import { EVENTS, getEvent, dayLabel, displayTime, trainingSpeakerForEvent } from "@/lib/events";
import { supabase } from "@/integrations/supabase/client";
import { submitFeedback } from "@/lib/feedback.functions";
import { MeeskondRow, KoolitajadPills } from "@/components/SpeakersTeamLinks";
import { SpeakerFeedbackForm } from "@/components/SpeakerFeedbackForm";



const validateSearch = (search: Record<string, unknown>): { sundmus?: string } => {
  const raw = search["sundmus"];
  if (typeof raw === "string") return { sundmus: raw };
  if (typeof raw === "number") return { sundmus: String(raw) };
  return {};
};

export const Route = createFileRoute("/tagasiside")({
  validateSearch,
  head: () => ({
    meta: [
      { title: "Anna tagasisidet — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Hinda koolitust, kiida või paku muutmist — ja jäta meile Google'i arvustus. Tagasiside on anonüümne.",
      },
      { property: "og:title", content: "Anna tagasisidet — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Hinda koolitust, kiida või paku muutmist — ja jäta meile Google'i arvustus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: FeedbackPage,
});

type FType = "training" | "keep" | "change";

// Google'i arvustuse otselink (Studio MindZ) — avab otse arvustuse kirjutamise vormi
const GOOGLE_REVIEW_URL = "https://g.page/r/CcA2FXmeWHxzEBM/review";

const TYPES: { id: FType; label: string; short: string; icon: typeof HeartHandshake; hint: string }[] = [
  { id: "training", label: "Jäta tagasiside koolitusele", short: "Koolitus", icon: GraduationCap, hint: "" },
  { id: "keep", label: "Kiidan korraldust/ruume/tiimi", short: "Kiidan", icon: HeartHandshake, hint: "Mis tiimi, korralduse või ruumide juures meeldis?" },
  { id: "change", label: "Parandusettepanek korraldusele/ruumidele/tiimile", short: "Parandus", icon: Lightbulb, hint: "Mida tiimi, korralduse või ruumide juures muuta?" },
];

function FeedbackPage() {
  const { sundmus } = Route.useSearch();
  const fromEvent = sundmus && getEvent(sundmus) ? sundmus : null;
  // Minu kava „Anna tagasisidet" avab sama koolitaja vormi, mis koolitaja
  // pallikesel klõpsates — sündmuse kaudu leitakse tema koolitaja.
  const fromEventSpeaker = fromEvent ? (trainingSpeakerForEvent(fromEvent) ?? null) : null;

  const [type, setType] = useState<FType | null>(
    fromEvent && !fromEventSpeaker ? "training" : null,
  );
  const [target, setTarget] = useState(fromEvent ?? "");
  const [rating, setRating] = useState<number | null>(null);
  const [keepText, setKeepText] = useState("");
  const [changeText, setChangeText] = useState("");
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [message, setMessage] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [wantsContact, setWantsContact] = useState(false);
  const [contact, setContact] = useState("");
  const [publishConsent, setPublishConsent] = useState(false);
  const [remember, setRemember] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState<FType | null>(null);

  // Koolitajale klõpsates avaneb tema tagasisidevorm kohe siinsamas lehel
  const [speaker, setSpeaker] = useState<Speaker | null>(fromEventSpeaker);
  // URL-i parameeter jõuab kohale alles pärast esmast renderdust —
  // seadista koolitaja siis, kui ta kättesaadavaks saab.
  useEffect(() => {
    if (fromEventSpeaker) setSpeaker((prev) => prev ?? fromEventSpeaker);
  }, [fromEventSpeaker]);
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);
  // Robotilõks: nähtamatu väli + vormi täitmise aeg
  const hpRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(Date.now());
  // Eeltäide: kasutaja nõusolekul seadmesse jäetud meiliaadress/telefon
  useEffect(() => {
    try {
      const raw = localStorage.getItem("smz-feedback-profile");
      if (raw) {
        const saved = JSON.parse(raw) as { contact?: string };
        if (saved.contact) {
          setContact(saved.contact);
          setWantsContact(true);
          setRemember(true);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!speaker) return;
    if (fromEventSpeaker && speaker.id === fromEventSpeaker.id) {
      window.scrollTo({ top: 0 });
      return;
    }
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [speaker, fromEventSpeaker]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!type) return;
    if (type === "training") {
      if (!target) return setError("Vali koolitus.");
      if (!rating) return setError("Vali hinnang 1–10.");
    } else if (!message.trim() && !photo) {
      setError("Kirjuta paar sõna või lisa foto.");
      return;
    }
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
    const training = type === "training";
    let dbErr = false;
    try {
      const res = await submitFeedback({
        data: {
          event_id: training ? target : null,
          feedback_type: type,
          message: training ? null : message.trim() || null,
          rating: training ? rating : null,
          keep_text: training ? keepText.trim() || null : null,
          change_text: training ? changeText.trim() || null : null,
          respondent_name: training ? name.trim() || null : null,
          respondent_field: training ? field.trim() || null : null,
          contact_requested: wantsContact,
          contact: wantsContact ? contact.trim() || null : null,
          publish_consent: publishConsent,
          attachment_url: attachment,
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
    // Ainult kasutaja nõusolekul: meil/telefon selles seadmes (fotot ei hoita)
    try {
      if (remember && wantsContact && contact.trim()) {
        localStorage.setItem(
          "smz-feedback-profile",
          JSON.stringify({ contact: contact.trim() }),
        );
      } else {
        localStorage.removeItem("smz-feedback-profile");
      }
    } catch {
      // salvestus ei õnnestunud — tagasiside on ikkagi saadetud
    }
    setSent(type);
  }

  if (sent) {
    return (
      <main className="px-4 pt-16 text-center">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary">
          <CheckCircle2 className="size-8 text-primary-foreground" />
        </div>
        <h1 className="mt-4 text-2xl font-bold">Sinu tagasiside jõudis meieni</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Aitäh! Loeme seda kindlasti — ja täname, et võtsid aja.
        </p>
        <a
          href={GOOGLE_REVIEW_URL}
          className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-2 rounded-2xl bg-mindz-pink p-4 text-sm font-semibold"
        >
          <Star className="size-4" /> Lisa Google arvustus
        </a>
        <div className="mt-6 flex flex-col items-center gap-3">
          <button
            onClick={() => {
              setSent(null);
              setType(null);
              setMessage("");
              setRating(null);
              setKeepText("");
              setChangeText("");
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

  // Minu kava „Anna tagasisidet" → näita kohe ainult kirjutamisvormi
  if (!type && fromEventSpeaker && speaker?.id === fromEventSpeaker.id) {
    return (
      <main className="px-4 pt-6 pb-8">
        <Link
          to="/minu-kava"
          className="inline-flex min-h-11 items-center gap-1 text-base font-semibold text-muted-foreground"
        >
          <ArrowLeft className="size-5 shrink-0" /> Minu kava
        </Link>
        <div className="mt-2">
          <SpeakerFeedbackForm
            key={speaker.id}
            speaker={speaker}
            startOpen
            onClose={() => navigate({ to: "/minu-kava" })}
          />
        </div>
      </main>
    );
  }

  if (!type) {
    return (
      <main className="px-4 pt-6 pb-8">
        <section className="rounded-3xl border border-primary/25 bg-mindz-mint p-4">
          <h2 className="text-base font-semibold">Jäta tagasiside tiimile</h2>
          <div className="mt-3">
            <MeeskondRow />
          </div>

          <div className="mt-4 grid gap-2">
            {TYPES.filter((item) => item.id !== "training").map((item) => (
              <button
                key={item.id}
                onClick={() => setType(item.id)}
                className="flex items-center gap-3 rounded-2xl border border-primary/20 bg-background/70 px-4 py-3.5 text-left text-sm font-semibold transition active:scale-[0.98]"
              >
                <item.icon className="size-5 shrink-0 text-primary" />
                {item.id === "keep" ? "Kiidan korraldust, ruume või tiimi" : "Parandusettepanek korraldusele, ruumidele või tiimile"}
              </button>
            ))}
          </div>

          <a
            href={GOOGLE_REVIEW_URL}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-mindz-pink p-4 text-sm font-semibold transition active:scale-[0.98]"
          >
            <Star className="size-5 text-primary" />
            Lisa Google arvustus
          </a>
        </section>

        <KoolitajadPills onSelect={setSpeaker} selectedId={speaker?.id ?? null}>
          {speaker && (
            <div ref={formRef} className="scroll-mt-2">
              <SpeakerFeedbackForm
                key={speaker.id}
                speaker={speaker}
                startOpen
                onClose={() => setSpeaker(null)}
              />
            </div>
          )}
        </KoolitajadPills>

        {!speaker && (
          <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
            Nimi ja meiliaadress on vabatahtlikud ning mõeldud vaid koolitajale ja tiimile
            vastamiseks.
          </p>
        )}
      </main>
    );
  }

  const current = TYPES.find((t) => t.id === type);
  if (!current) return null;
  const fixedEvent = fromEvent ? getEvent(fromEvent) : null;

  return (
    <main className="px-4 pt-6 pb-8">
      <button
        onClick={() => setType(null)}
        className="inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground"
      >
        <ArrowLeft className="size-4 shrink-0" /> {current.short}
      </button>

      <form onSubmit={submit} className="mt-4 space-y-5">
        <input
          ref={hpRef}
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        {type === "training" ? (
          <>
            {fixedEvent ? (
              <p className="rounded-xl bg-secondary px-4 py-3 text-sm">
                <span className="font-semibold">{fixedEvent.title}</span>
              </p>
            ) : (
              <div>
                <label htmlFor="target" className="text-sm font-semibold">Koolitus</label>
                <select
                  id="target"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base"
                >
                  <option value="">Vali koolitus</option>
                  {EVENTS.map((ev) => (
                    <option key={ev.id} value={ev.id}>
                      {dayLabel(ev.date)} {displayTime(ev.startTime)} {ev.title}
                    </option>
                  ))}
                </select>
              </div>
            )}
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
            <Field id="keep" label="Mis võiks koolituse kordamisel kindlasti samaks jääda?" value={keepText} onChange={setKeepText} />
            <Field id="change" label="Mis võiks olla teistmoodi?" value={changeText} onChange={setChangeText} />
            <div className="grid gap-3">
              <input value={name} onChange={(e) => setName(e.target.value)} maxLength={200} placeholder="Sinu nimi" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base" />
              <input value={field} onChange={(e) => setField(e.target.value)} maxLength={200} placeholder="Valdkond" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-base" />
              <p className="text-xs leading-relaxed text-muted-foreground">
                Nimi ja valdkond on vabatahtlikud ning mõeldud vaid koolitajale ja tiimile
                vastamiseks.
              </p>
            </div>
          </>
        ) : (
          <>
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
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Meiliaadress on vabatahtlik ning mõeldud vaid tiimile vastamiseks.
          </p>
          {wantsContact && (
            <input
              type="text"
              required
              maxLength={300}
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Meiliaadress või telefon"
              className="mt-3 w-full rounded-xl border border-border bg-background px-4 py-3 text-base"
            />
          )}
        </div>

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
            Jäta meiliaadress selles seadmes meelde
          </label>
        </div>

          </>
        )}

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

function Field({ id, label, value, onChange }: { id: string; label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">{label}</label>
      <textarea
        id={id}
        rows={3}
        maxLength={4000}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
