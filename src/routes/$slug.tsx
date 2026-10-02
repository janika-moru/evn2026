import { createFileRoute, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { QuestionCard } from "@/components/TrainerQuestions";
import { getEventByFientaId, dayLabel, displayTime } from "@/lib/events";
import { QUESTION_SLUGS } from "@/lib/questions";
import { publicQuestions } from "@/lib/questions.functions";

export const Route = createFileRoute("/$slug")({
  beforeLoad: ({ params }) => {
    if (!QUESTION_SLUGS[params.slug.toLowerCase()]) throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Küsimused koolitajale — Studio MindZ 2026" },
      { name: "description", content: "Osalejate küsimused koolitajale Tartu Ettevõtlusnädalal." },
      { property: "og:title", content: "Küsimused koolitajale — Studio MindZ 2026" },
      { property: "og:description", content: "Osalejate küsimused koolitajale Tartu Ettevõtlusnädalal." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TrainerView,
  errorComponent: () => <p className="p-4">Küsimuste laadimine ebaõnnestus.</p>,
  notFoundComponent: () => <p className="p-4">Lehte ei leitud.</p>,
});

function TrainerView() {
  const { slug } = Route.useParams();
  const query = useQuery({
    queryKey: ["public-questions", slug.toLowerCase()],
    queryFn: () => publicQuestions({ data: { slug } }),
    refetchInterval: 5000,
  });
  const event = getEventByFientaId(QUESTION_SLUGS[slug.toLowerCase()] ?? "");
  const items = query.data?.items ?? [];

  return (
    <main className="px-4 pt-8 pb-8">
      <h1 className="text-2xl font-bold">Küsimused koolitajale</h1>
      {event && (
        <p className="mt-2 text-[17px] text-muted-foreground">
          {event.title} · {dayLabel(event.date)} {displayTime(event.startTime)}
        </p>
      )}
      <div className="mt-6 space-y-4">
        {query.isLoading ? (
          <p className="text-[17px] text-muted-foreground">Laen…</p>
        ) : items.length === 0 ? (
          <p className="text-[17px] text-muted-foreground">Küsimusi veel ei ole.</p>
        ) : (
          items.map((q) => <QuestionCard key={q.id} q={q} large />)
        )}
      </div>
    </main>
  );
}
