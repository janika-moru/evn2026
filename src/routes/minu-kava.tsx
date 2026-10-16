import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarCheck, Check, FileText, LogOut, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FeedbackCompletionButton } from "@/components/FeedbackCompletionButton";
import { StudioFeedbackSection } from "@/components/StudioFeedbackSection";
import { useFeedbackCompletion } from "@/hooks/use-feedback-completion";
import { useMyMaterials } from "@/hooks/use-my-materials";
import type { FeedbackCompletion } from "@/lib/feedback-completion";
import { EVENTS, dayLabel, displayTime, trainingSpeakerForEvent, type EventItem } from "@/lib/events";
import { useSession, useMyRegistrations, useFientaBackgroundSync } from "@/hooks/use-my-registrations";

const BENEFITS = [
  "näha koolitusi, kuhu registreerusid",
  "ligipääsu slaididele ja lisamaterjalidele",
  "lingid koolitaja kontaktidele",
  "jätta tagasisidet koolitajale",
  "eripakkumise Studio MindZilt",
];

export const Route = createFileRoute("/minu-kava")({
  head: () => ({
    meta: [
      { title: "Koolitajate slaidid ja tagasiside — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Koolitajate slaidid, oma tagasisideolek ja tagasiside Studio MindZi tiimile. Logi sisse sama meiliaadressiga, mida kasutasid Fientas.",
      },
      { property: "og:title", content: "Koolitajate slaidid ja tagasiside — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Koolitajate slaidid, oma tagasisideolek ja tagasiside Studio MindZi tiimile.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/minu-kava" },
    ],
    links: [{ rel: "canonical", href: "/minu-kava" }],
  }),
  component: MySchedulePage,
});

function MySchedulePage() {
  const { session, ready } = useSession();

  return (
    <main className="px-4 pt-8">
      <h1 className="text-2xl font-bold">Koolitajate slaidid ja tagasiside</h1>
      <StudioFeedbackSection className="mt-6 mb-6" returnLabel="Tagasi slaidide juurde" />

      {!ready ? (
        <p className="mt-4 text-[15px] text-muted-foreground">Laen…</p>
      ) : session ? (
        <SignedIn email={session.user.email ?? ""} userId={session.user.id} />
      ) : (
        <SignInCard />
      )}
    </main>
  );
}

function SpecialOffer() {
  return (
    <section className="mt-8 rounded-2xl bg-mindz-mint p-5">
      <h2 className="text-[17px] font-semibold">Ettevõtlusnädala eripakkumine!</h2>
      <p className="mt-2 text-[17px] leading-relaxed">
        Ettevõtlusnädala külalisena saad oma esimeselt ruumirendilt −20% soodustust.
      </p>
      <p className="mt-3 text-[17px] leading-relaxed">
        Pakkumine kehtib broneeringutele kuni 31.12.2026.
        <br />
        Broneerimisel lisa märksõna <span className="whitespace-nowrap">Ettevõtlusnädal2026</span>.
      </p>
      <a
        href="https://www.mindz.ee"
        target="_blank"
        rel="noreferrer"
        className="mt-3 inline-block text-[17px] text-mindz-green underline underline-offset-2"
      >
        www.mindz.ee
      </a>
    </section>
  );
}

function SignInCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const clean = email.trim().toLowerCase();
    const { error } = await supabase.auth.signInWithOtp({
      email: clean,
      options: { emailRedirectTo: `${window.location.origin}/minu-kava` },
    });
    if (error) {
      setStatus("error");
      const limited = error.status === 429 || /rate limit|security purposes/i.test(error.message);
      if (limited) setCooldown(60);
      setMessage(
        limited
          ? "Liiga palju katseid. Proovi mõne minuti pärast uuesti."
          : "Kirja saatmine ebaõnnestus. Kontrolli meiliaadressi ja proovi uuesti.",
      );
      return;
    }
    setCooldown(60);
    setStatus("sent");
    setMessage(`Saatsime sisselogimise lingi aadressile ${clean}. Ava kiri ja vajuta lingil.`);
  }

  return (
    <>
      <h2 className="mt-4 text-xl font-semibold">Vaata oma kava</h2>
      <p className="mt-2 text-[17px] leading-relaxed text-muted-foreground">
        Logi sisse sama meiliaadressiga, mida kasutasid Fientas registreerumisel.
      </p>

      <div className="mt-6">
        <p className="text-[17px] font-semibold">Sisse logides saad:</p>
        <ul className="mt-2.5 space-y-2">
          {BENEFITS.map((item) => (
            <li key={item} className="flex gap-2.5 text-[17px] text-muted-foreground">
              <Check className="mt-1 size-5 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-border bg-card p-5">
        <label htmlFor="email" className="text-[17px] font-semibold">
          Meiliaadress
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="sinu@email.ee"
          className="mt-2 min-h-[52px] w-full rounded-xl border border-border bg-background px-4 text-[17px] outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={status === "sending" || cooldown > 0}
          className="mt-4 flex min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-[17px] font-semibold text-primary-foreground disabled:opacity-60"
        >
          <Mail className="size-5" />
          {status === "sending"
            ? "Saadan…"
            : cooldown > 0
              ? `Uue lingi saad küsida ${cooldown} s pärast`
              : "Saada sisselogimislink"}
        </button>
        <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
          Parooli ei ole vaja luua. Kliki postkastis oleval lingil ja see toob su tagasi
          äppi sisselogituna.
        </p>
        {message && (
          <p
            className={`mt-3 text-[15px] ${status === "error" ? "text-destructive" : "text-primary"}`}
          >
            {message}
          </p>
        )}
      </form>
      {status === "sent" && <CodeForm email={email.trim().toLowerCase()} />}
    </>
  );
}

function SignedIn({ email, userId }: { email: string; userId: string }) {
  const feedback = useFeedbackCompletion(userId);
  const { ids, query } = useMyRegistrations();
  useFientaBackgroundSync(email || null);
  const mine = EVENTS.filter((e) => e.fientaEventId && ids.has(e.fientaEventId));

  return (
    <>
      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="truncate text-[15px] text-muted-foreground">{email}</p>
        <Button
          variant="outline"
          onClick={() => supabase.auth.signOut()}
          className="min-h-[44px] shrink-0 rounded-full px-4 text-[15px]"
        >
          <LogOut className="size-4" /> Logi välja
        </Button>
      </div>

      {query.isLoading ? (
        <p className="mt-6 text-[15px] text-muted-foreground">Otsin sinu registreeringuid…</p>
      ) : mine.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-center">
          <CalendarCheck className="mx-auto size-9 text-primary" />
          <p className="mt-3 text-[17px] font-semibold">
            Me ei leidnud selle meiliaadressiga registreeringuid.
          </p>
          <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
            Kui registreerusid teise meiliaadressiga, logi sisse selle aadressiga.
          </p>
          <div className="mt-5 flex justify-center">
            <Button asChild className="min-h-[52px] rounded-full px-6 text-[17px]">
              <Link to="/tagasiside" search={{}}>
                Jäta tagasisidet
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[...mine]
            .sort((a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`))
            .map((event) => (
              <MyScheduleEvent key={event.id} event={event} feedbackState={{ completion: feedback.data?.[event.id], loading: feedback.isPending, failed: feedback.isError, retry: () => { void feedback.refetch(); } }} />
            ))}
        </div>
      )}

      {mine.length > 0 && <SpecialOffer />}
    </>
  );
}

const slidesLink =
  "inline-flex min-h-[44px] items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-2 transition-colors hover:opacity-80";
const missingMark = "text-sm text-muted-foreground/45";

/** Kaart slaidide lehe ruudustikus: pilt, nimi, pealkiri, aeg + materjalid ja tagasiside olek. */
function MyScheduleEvent({ event, feedbackState }: { event: EventItem; feedbackState: { completion?: FeedbackCompletion | undefined; loading: boolean; failed: boolean; retry: () => void } }) {
  const materialQuery = useMyMaterials();
  const material = materialQuery.data?.[event.fientaEventId ?? event.id];
  const slidesUrl = material?.slidesUrl ?? material?.materialsUrl;
  const materialsUrl =
    material?.materialsUrl && material.materialsUrl !== slidesUrl ? material.materialsUrl : undefined;
  const speaker = trainingSpeakerForEvent(event.id);
  const speakerName = speaker ? (speaker.displayName ?? speaker.name) : event.speaker;
  const speakerImageUrl = speaker?.thumbUrl ?? speaker?.imageUrl;

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-4">
      {speakerImageUrl && (
        <img
          src={speakerImageUrl}
          alt={speakerName}
          loading="lazy"
          className="h-16 w-16 rounded-full object-cover"
        />
      )}
      <h2 className="mt-2 text-base font-semibold leading-snug">{speakerName}</h2>
      <p className="mt-0.5 text-sm text-muted-foreground">{event.title}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">
        {dayLabel(event.date)} kell {displayTime(event.startTime)}
      </p>

      <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-3">
        {materialQuery.isPending ? (
          <span className={missingMark}>Laen materjale…</span>
        ) : materialQuery.isError ? (
          <button type="button" className={slidesLink} onClick={() => { void materialQuery.refetch(); }}>
            Proovi uuesti
          </button>
        ) : material?.letter ? (
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className={slidesLink}>
                Loe koolitajate kirja
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] w-[calc(100vw-2rem)] overflow-y-auto md:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Kiri koolitajatelt</DialogTitle>
                <DialogDescription className="sr-only">{event.title}</DialogDescription>
              </DialogHeader>
              <div className="whitespace-pre-line text-base leading-relaxed">
                {material.letter.trim().split(/(https?:\/\/\S+)/g).map((part, i) =>
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
          <a href={slidesUrl} target="_blank" rel="noreferrer" className={slidesLink}>
            Vaata slaide
          </a>
        ) : event.slidesExpected === false ? (
          <span className={missingMark}>Slaide pole</span>
        ) : (
          <span className={missingMark}>Slaide veel pole</span>
        )}
        {materialsUrl && (
          <a href={materialsUrl} target="_blank" rel="noreferrer" className={slidesLink}>
            {material?.materialsLabel ?? "Lisamaterjalid"}
          </a>
        )}
      </div>

      <div className="mt-3">
        <FeedbackCompletionButton eventId={event.id} {...feedbackState} />
      </div>
    </article>
  );
}

function CodeForm({ email }: { email: string }) {
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { error } = await supabase.auth.verifyOtp({
      email,
      token: code.replace(/\s/g, ""),
      type: "email",
    });
    setBusy(false);
    if (error) setError("Kood ei sobi või on aegunud. Küsi uus link.");
  }

  return (
    <form onSubmit={submit} className="mt-4 rounded-2xl border border-border bg-card p-5">
      <label htmlFor="otp" className="text-[17px] font-semibold">
        Link ei tööta? Sisesta kirjas olev kood
      </label>
      <input
        id="otp"
        inputMode="numeric"
        autoComplete="one-time-code"
        required
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="mt-2 min-h-[52px] w-full rounded-xl border border-border bg-background px-4 text-[20px] tracking-[0.3em] outline-none focus:ring-2 focus:ring-ring"
      />
      <button
        type="submit"
        disabled={busy || code.trim().length < 6}
        className="mt-4 flex min-h-[52px] w-full items-center justify-center rounded-full bg-primary px-5 text-[17px] font-semibold text-primary-foreground disabled:opacity-60"
      >
        {busy ? "Kontrollin…" : "Logi sisse"}
      </button>
      {error && <p className="mt-3 text-[15px] text-destructive">{error}</p>}
    </form>
  );
}
