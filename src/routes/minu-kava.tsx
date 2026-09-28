import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarCheck, LogOut, Mail } from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { EventCard } from "@/components/EventCard";
import { registeredEvents, longDate, EVENT_DAYS } from "@/lib/events";

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
      { property: "og:url", content: "/minu-kava" },
    ],
    links: [{ rel: "canonical", href: "/minu-kava" }],
  }),
  component: MySchedulePage,
});

function MySchedulePage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

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
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/minu-kava` },
    });
    if (error) {
      setStatus("error");
      setMessage("Kirja saatmine ebaõnnestus. Kontrolli e-posti aadressi ja proovi uuesti.");
      return;
    }
    setStatus("sent");
    setMessage(`Saatsime sisselogimise lingi aadressile ${email}. Ava see oma telefonis.`);
  }

  return (
    <>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Logi sisse sama e-posti aadressiga, mida kasutasid Fientas registreerumisel. Siis
        näed siin kõiki oma registreeringuid.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 rounded-2xl bg-secondary p-4">
        <label htmlFor="email" className="text-sm font-semibold">
          E-posti aadress
        </label>
        <input
          id="email"
          type="email"
          required
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
          {status === "sending" ? "Saadan…" : "Saada sisselogimise link"}
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

      <section className="mt-6">
        <h2 className="text-base font-semibold">Näidis: nii näeb sinu kava välja</h2>
        <div className="mt-3 space-y-3 opacity-60">
          {registeredEvents()
            .slice(0, 2)
            .map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
        </div>
      </section>
    </>
  );
}

function SignedIn({ email }: { email: string }) {
  const mine = registeredEvents();

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

      {mine.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-border bg-card p-5 text-center">
          <CalendarCheck className="mx-auto size-8 text-primary" />
          <p className="mt-2 text-sm text-muted-foreground">
            Sul ei ole veel ühtegi registreeringut.
          </p>
          <Link
            to="/kava"
            search={{}}
            className="mt-4 inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            Vaata kava
          </Link>
        </div>
      ) : (
        EVENT_DAYS.filter((d) => mine.some((e) => e.date === d.date)).map((d) => (
          <section key={d.date} className="mt-6">
            <h2 className="text-base font-semibold">{longDate(d.date)}</h2>
            <div className="mt-3 space-y-3">
              {mine
                .filter((e) => e.date === d.date)
                .map((e) => (
                  <EventCard key={e.id} event={e} />
                ))}
            </div>
          </section>
        ))
      )}
    </>
  );
}
