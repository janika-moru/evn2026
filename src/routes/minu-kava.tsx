import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, FileText, LogOut, Mail, RefreshCw, UserRound } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { EventCard } from "@/components/EventCard";
import { EVENTS, longDate, EVENT_DAYS, speakersForEvent, type EventItem } from "@/lib/events";
import { useSession, useMyRegistrations } from "@/hooks/use-my-registrations";

export const Route = createFileRoute("/minu-kava")({
  head: () => ({
    meta: [
      { title: "Minu kava — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Näe kõiki oma Studio MindZi registreeringuid ühes kohas. Logi sisse sama e-posti aadressiga, mida kasutasid Fientas.",
      },
      { property: "og:title", content: "Minu kava — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Näe kõiki oma Studio MindZi registreeringuid ühes kohas.",
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
      <h1 className="text-2xl font-bold">Minu kava</h1>

      {!ready ? (
        <p className="mt-4 text-sm text-muted-foreground">Laen…</p>
      ) : session ? (
        <SignedIn email={session.user.email ?? ""} />
      ) : (
        <SignInCard />
      )}
    </main>
  );
}

function SignInCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

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
      setMessage("Kirja saatmine ebaõnnestus. Kontrolli e-posti aadressi ja proovi uuesti.");
      return;
    }
    setStatus("sent");
    setMessage(`Saatsime sisselogimise lingi aadressile ${clean}. Ava kiri ja vajuta lingil.`);
  }

  return (
    <>
      <h2 className="mt-4 text-lg font-semibold">Vaata oma kava</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
        Logi sisse sama e-posti aadressiga, mida kasutasid Fientas registreerumisel.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 rounded-2xl bg-secondary p-4">
        <label htmlFor="email" className="text-sm font-semibold">
          E-post
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="sinu@email.ee"
          className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground disabled:opacity-60"
        >
          <Mail className="size-4" />
          {status === "sending" ? "Saadan…" : "Saada sisselogimislink"}
        </button>
        <p className="mt-2 text-xs text-muted-foreground">Parooli ei ole vaja luua.</p>
        {message && (
          <p
            className={`mt-3 text-sm ${status === "error" ? "text-destructive" : "text-primary"}`}
          >
            {message}
          </p>
        )}
      </form>
    </>
  );
}

function SignedIn({ email }: { email: string }) {
  const { ids, query } = useMyRegistrations();
  const mine = EVENTS.filter((e) => e.fientaEventId && ids.has(e.fientaEventId));

  return (
    <>
      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="truncate text-sm text-muted-foreground">{email}</p>
        <button
          onClick={() => supabase.auth.signOut()}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-semibold"
        >
          <LogOut className="size-3.5" /> Logi välja
        </button>
      </div>

      {query.isLoading ? (
        <p className="mt-6 text-sm text-muted-foreground">Otsin sinu registreeringuid…</p>
      ) : mine.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-center">
          <CalendarCheck className="mx-auto size-8 text-primary" />
          <p className="mt-2 font-semibold">
            Me ei leidnud selle e-posti aadressiga registreeringuid.
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Kui registreerusid teise e-posti aadressiga, logi sisse selle aadressiga.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button
              onClick={() => query.refetch()}
              className="inline-flex items-center gap-1.5 rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
            >
              <RefreshCw className="size-4" /> Värskenda registreeringuid
            </button>
            <Link
              to="/kava"
              search={{}}
              className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Vaata kava
            </Link>
          </div>
        </div>
      ) : (
        <>
          {EVENT_DAYS.filter((d) => mine.some((e) => e.date === d.date)).map((d) => (
            <section key={d.date} className="mt-6">
              <h2 className="text-base font-semibold first-letter:uppercase">{longDate(d.date)}</h2>
              <div className="mt-3 space-y-3">
                {mine
                  .filter((e) => e.date === d.date)
                  .sort((a, b) => a.startTime.localeCompare(b.startTime))
                  .map((e) => (
                    <MyScheduleEvent key={e.id} event={e} />
                  ))}
              </div>
            </section>
          ))}
          <button
            onClick={() => query.refetch()}
            className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            <RefreshCw className="size-4" /> Värskenda registreeringuid
          </button>
        </>
      )}
    </>
  );
}

function MyScheduleEvent({ event }: { event: EventItem }) {
  const speakers = speakersForEvent(event.id);
  const hasLinks = speakers.length > 0 || event.slidesUrl || event.materialsUrl;

  return (
    <div>
      <EventCard event={event} />
      {hasLinks && (
        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 px-1">
          {speakers.map((speaker) => (
            <Link
              key={speaker.id}
              to="/koolitajad"
              hash={speaker.id}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <UserRound className="size-4" /> {speaker.name}
            </Link>
          ))}
          {event.slidesUrl && (
            <a
              href={event.slidesUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <FileText className="size-4" /> Vaata slaide
            </a>
          )}
          {event.materialsUrl && (
            <a
              href={event.materialsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
            >
              <FileText className="size-4" /> Materjalid
            </a>
          )}
        </div>
      )}
    </div>
  );
}
