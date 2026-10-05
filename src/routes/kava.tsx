import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Facebook, Instagram } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { EventCard } from "@/components/EventCard";
import kavaBanner from "@/assets/kava-banner.png.asset.json";
import { EVENT_DAYS, eventsForDate, longDate, todayEventDate } from "@/lib/events";
import { availabilityQueryOptions } from "@/hooks/use-event-availability";

const validateSearch = (search: Record<string, unknown>): { paev?: string } =>
  typeof search["paev"] === "string" ? { paev: search["paev"] as string } : {};

export const Route = createFileRoute("/kava")({
  validateSearch,
  head: () => ({
    meta: [
      { title: "Kava — Studio MindZ 2026" },
      {
        name: "description",
        content: "Studio MindZi programm päevade kaupa, 5.–9. oktoober 2026 Tartus.",
      },
      { property: "og:title", content: "Kava — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Studio MindZi programm päevade kaupa, 5.–9. oktoober 2026 Tartus.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/kava" },
    ],
    links: [{ rel: "canonical", href: "/kava" }],
  }),
  loader: async ({ context }) => {
    // Ainult andmebaasist loetud seis — Fienta API-t siin ei kutsuta.
    await context.queryClient.ensureQueryData(availabilityQueryOptions).catch(() => undefined);
  },
  component: SchedulePage,
  errorComponent: () => <p className="p-4">Kava laadimine ebaõnnestus.</p>,
  notFoundComponent: () => <p className="p-4">Lehte ei leitud.</p>,
});


function SchedulePage() {
  const { paev } = Route.useSearch();
  const navigate = useNavigate();
  const selected = EVENT_DAYS.some((d) => d.date === paev) ? paev! : todayEventDate();
  const events = eventsForDate(selected);
  const dayStartRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLImageElement>(null);
  // Bänner on lehe pealkiri — tekst tuleb nähtavale ainult siis,
  // kui pilt ei lahenud (nt nõrk internet).
  const [bannerFailed, setBannerFailed] = useState(false);

  useEffect(() => {
    // Pilt võib olla juba katkenud enne, kui React veateate kuulajaga liitub.
    const img = bannerRef.current;
    if (img && img.complete && img.naturalWidth === 0) setBannerFailed(true);
  }, []);

  function selectDay(date: string) {
    if (date !== selected) {
      navigate({ to: "/kava", search: { paev: date }, replace: true });
    }
    // Toome valitud päeva pealkirja ja nimekirja kohe nähtavale,
    // et päevale vajutamine oleks selgelt tajutav.
    requestAnimationFrame(() => {
      dayStartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  return (
    <main className="px-4 pt-8">
      {bannerFailed ? (
        <div className="rounded-2xl bg-secondary px-4 py-4">
          <h1 className="text-2xl font-bold">Kava</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Studio MindZi programm · 5.–9. oktoober
          </p>
        </div>
      ) : (
        <>
          <h1 className="sr-only">Kava</h1>
          <img
            ref={bannerRef}
            src={kavaBanner.url}
            alt="Tartu Ettevõtlusnädal 5.–9. oktoober Studio MindZis, Lutsu 3"
            className="w-full rounded-2xl"
            onError={() => setBannerFailed(true)}
          />
        </>
      )}

      <DayPicker selected={selected} onSelect={selectDay} />

      <div ref={dayStartRef} className="mt-5 scroll-mt-3">
        <h2 className="text-lg font-semibold first-letter:uppercase">{longDate(selected)}</h2>
      </div>

      <div key={selected} className="day-in mt-3 space-y-3">
        {events.length === 0 ? (
          <p className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground">
            Sellel päeval sündmusi ei ole.
          </p>
        ) : (
          events.map((e) => <EventCard key={e.id} event={e} />)
        )}
      </div>

      {/* Päevavaliku kordus lehe lõpus — mobiilil ei pea päevade vahetamiseks
          üles kerima. Valimine tõstab sama päeva pealkirja ikkagist nähtavale. */}
      <DayPicker selected={selected} onSelect={selectDay} />

      <section
        className="mt-8 mb-8 flex items-center justify-between gap-3"
        aria-labelledby="social-heading"
      >
        <h2 id="social-heading" className="text-sm font-medium leading-snug">
          Jälgi ettevõtlusnädala melu sotsiaalmeediast
        </h2>
        <div className="flex shrink-0 gap-2">
          <a
            href="https://www.instagram.com/studiomindz/"
            target="_blank"
            rel="noreferrer"
            aria-label="Studio MindZ Instagramis"
            className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary"
          >
            <Instagram className="size-5" />
          </a>
          <a
            href="https://www.facebook.com/studiomindZ"
            target="_blank"
            rel="noreferrer"
            aria-label="Studio MindZ Facebookis"
            className="flex size-10 items-center justify-center rounded-full bg-secondary text-primary"
          >
            <Facebook className="size-5" />
          </a>
        </div>
      </section>
    </main>
  );
}
