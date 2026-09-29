import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarCheck, Check, LogOut, Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { RegisteredEventActions } from "@/components/RegisteredEventActions";
import { EventCard } from "@/components/EventCard";
import { EVENTS, type EventItem } from "@/lib/events";
import { useSession, useMyRegistrations } from "@/hooks/use-my-registrations";

const BENEFITS = [
  "näha ja tühistada oma registreerimisi",
  "ligipääsu slaididele ja lisamaterjalidele",
  "lingid koolitaja kontaktidele",
  "jätta tagasisidet koolitajale",
];


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

      <div className="mt-5">
        <p className="text-sm font-semibold">Sisse logides saad:</p>
        <ul className="mt-2 space-y-1.5">
          {BENEFITS.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

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
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Parooli ei ole vaja luua. Kliki postkastis oleval lingil ja see toob su tagasi
          äppi sisselogituna.
        </p>
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
        <Button
          variant="outline"
          size="sm"
          onClick={() => supabase.auth.signOut()}
          className="shrink-0 rounded-full"
        >
          <LogOut className="size-3.5" /> Logi välja
        </Button>
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
          <div className="mt-4 flex justify-center">
            <Button asChild className="rounded-full">
              <Link to="/kava" search={{}}>
                Vaata kava
              </Link>
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-3">
            {[...mine]
              .sort((a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`))
              .map((event) => (
                <MyScheduleEvent key={event.id} event={event} />
              ))}
          </div>
        </>
      )}
    </>
  );
}

function MyScheduleEvent({ event }: { event: EventItem }) {
  return (
    <EventCard
      event={event}
      showDate
      actions={<RegisteredEventActions event={event} />}
    />
  );
}
