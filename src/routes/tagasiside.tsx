import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { EVENTS, getEvent } from "@/lib/events";
import { supabase } from "@/integrations/supabase/client";

const validateSearch = (search: Record<string, unknown>): { sundmus?: string } => ({
  sundmus: typeof search["sundmus"] === "string" ? (search["sundmus"] as string) : undefined,
});

export const Route = createFileRoute("/tagasiside")({
  validateSearch,
  head: () => ({
    meta: [
      { title: "Anna tagasisidet — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Jaga oma mõtteid Studio MindZi ettevõtlusnädala sündmuste ja korralduse kohta. Tagasiside võib olla anonüümne.",
      },
      { property: "og:title", content: "Anna tagasisidet — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Jaga oma mõtteid sündmuste ja korralduse kohta. Tagasiside võib olla anonüümne.",
      },
      { property: "og:url", content: "/tagasiside" },
    ],
    links: [{ rel: "canonical", href: "/tagasiside" }],
  }),
  component: FeedbackPage,
});

function FeedbackPage() {
  const { sundmus } = Route.useSearch();
  const preselected = sundmus && getEvent(sundmus) ? sundmus : "general";

  const [target, setTarget] = useState(preselected);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);
    setError("");
    const { error: dbError } = await supabase.from("feedback").insert({
      event_id: target === "general" ? null : target,
      rating: rating > 0 ? rating : null,
      comment: comment.trim() || null,
    });
    setSending(false);
    if (dbError) {
      setError("Tagasiside saatmine ebaõnnestus. Proovi palun uuesti.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <main className="px-4 pt-16 text-center">
        <CheckCircle2 className="mx-auto size-12 text-primary" />
        <h1 className="mt-4 text-2xl font-bold">Aitäh tagasiside eest!</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sinu mõtted aitavad meil nädalat jooksvalt paremaks teha.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
        >
          Tagasi avalehele
        </Link>
      </main>
    );
  }

  return (
    <main className="px-4 pt-8">
      <h1 className="text-2xl font-bold">Anna tagasisidet</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Tagasiside võib olla anonüümne — nime ei pea lisama.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 space-y-5">
        <div>
          <label htmlFor="target" className="text-sm font-semibold">
            Mille kohta tagasiside on?
          </label>
          <select
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="general">Üldine korraldus</option>
            {EVENTS.map((e) => (
              <option key={e.id} value={e.id}>
                {e.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="text-sm font-semibold">Kuidas läks?</p>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                aria-label={`${n} tärni`}
                onClick={() => setRating(n)}
                className={`flex size-12 items-center justify-center rounded-full border transition-colors ${
                  n <= rating
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground"
                }`}
              >
                <Star className="size-5" fill={n <= rating ? "currentColor" : "none"} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="comment" className="text-sm font-semibold">
            Sinu mõtted
          </label>
          <textarea
            id="comment"
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Mis oli hea? Mida võiks paremini teha?"
            className="mt-2 w-full rounded-xl border border-border bg-background px-4 py-3 text-base outline-none focus:ring-2 focus:ring-ring"
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
    </main>
  );
}
