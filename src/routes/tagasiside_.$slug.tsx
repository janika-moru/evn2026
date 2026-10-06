import { createFileRoute, notFound } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { QUESTION_SLUGS } from "@/lib/questions";
import {
  getTrainerFeedback,
  type TrainerFeedbackItem,
} from "@/lib/trainer-feedback.functions";

export const Route = createFileRoute("/tagasiside_/$slug")({
  beforeLoad: ({ params }) => {
    if (!QUESTION_SLUGS[params.slug.toLowerCase()]) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Koolitaja tagasiside — Studio MindZ 2026" },
      { name: "description", content: "Koolitaja tagasiside töölaud Tartu Ettevõtlusnädalal." },
      { property: "og:title", content: "Koolitaja tagasiside — Studio MindZ 2026" },
      { property: "og:description", content: "Koolitaja tagasiside töölaud." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TrainerFeedbackPage,
  notFoundComponent: () => <p className="p-4">Lehte ei leitud.</p>,
});

function TrainerFeedbackPage() {
  const { slug } = Route.useParams();
  const fetchFeedback = useServerFn(getTrainerFeedback);
  const q = useQuery({
    queryKey: ["trainer-feedback", slug.toLowerCase()],
    queryFn: () => fetchFeedback({ data: { slug } }),
  });
  if (q.isLoading) return <p className="px-4 pt-8 text-muted-foreground">Laen…</p>;
  if (!q.data?.ok) return <p className="px-4 pt-8">Laadimine ebaõnnestus.</p>;
  return <Dashboard name={q.data.speakerName} items={q.data.items} />;
}

function Dashboard({ name, items }: { name: string; items: TrainerFeedbackItem[] }) {
  const rated = items.filter((i) => i.rating != null);
  const avg = rated.length ? rated.reduce((s, i) => s + (i.rating ?? 0), 0) / rated.length : null;
  const counts = Array.from({ length: 10 }, (_, k) => rated.filter((i) => i.rating === k + 1).length);
  const max = Math.max(1, ...counts);
  const quotes = items.filter((i) => i.message?.trim());

  return (
    <main className="px-4 pt-8 pb-10">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="mt-1 text-muted-foreground">Tagasiside · Tartu Ettevõtlusnädal 2026</p>

      <section className="mt-6 rounded-2xl border border-border bg-card p-5">
        {avg != null ? (
          <p className="text-4xl font-bold text-primary">
            {avg.toLocaleString("et-EE", { maximumFractionDigits: 1, minimumFractionDigits: 1 })}
            <span className="text-xl font-medium text-muted-foreground"> / 10</span>
          </p>
        ) : (
          <p className="text-muted-foreground">Hindeid veel ei ole.</p>
        )}
        <div className="mt-5 flex h-44 items-end gap-1.5" aria-label="Hinnete jaotus">
          {counts.map((c, k) => (
            <div key={k} className="flex h-full flex-1 flex-col items-center justify-end">
              <span className="mb-1 text-xs text-muted-foreground">{c || ""}</span>
              <div
                className="w-full rounded-t-md bg-primary"
                style={{ height: `${(c / max) * 100}%`, minHeight: c ? 4 : 0 }}
              />
              <span className="mt-1 text-sm font-medium">{k + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 space-y-4">
        {quotes.map((q) => (
          <figure key={q.id} className="relative rounded-2xl bg-mindz-pink p-6">
            {q.rating != null && (
              <p className="text-sm font-semibold text-primary">{q.rating} / 10</p>
            )}
            <blockquote className="mt-2 text-lg leading-relaxed whitespace-pre-line">
              „{q.message?.trim()}“
            </blockquote>
            <figcaption className="mt-4 text-sm">
              <span className="font-semibold">{q.name?.trim() || "Osaleja"}</span>
              {q.field?.trim() && <span className="text-muted-foreground">, {q.field.trim()}</span>}
            </figcaption>
            {!q.publishConsent && (
              <p className="mt-3 mb-4 text-sm font-medium text-foreground">
                Avaldamise luba puudub
              </p>
            )}
            <span className="absolute right-4 bottom-3 text-xs text-muted-foreground">
              Studio MindZ
            </span>
          </figure>
        ))}
      </div>
    </main>
  );
}
