// Stuudio tiimile jäetav tagasiside: meeskond + Google'i arvustus.
// Kirjalikku tiimi tagasisidet äpp enam ei koguta — korraldaja palus
// suunata inimesed avaliku Google'i arvustuse juurde.
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeeskondRow } from "@/components/SpeakersTeamLinks";

const GOOGLE_REVIEW_URL = "https://g.page/r/CcA2FXmeWHxzEBM/review";

export function StudioFeedbackSection({ className = "" }: { className?: string }) {
  return (
    <section
      aria-label="Tagasiside stuudio tiimile"
      className={`rounded-3xl border border-primary/25 bg-mindz-mint p-4 ${className}`}
    >
      <h2 className="text-base font-semibold">Jäta tagasiside tiimile</h2>
      <div className="mt-3">
        <MeeskondRow />
      </div>
      <Button
        asChild
        variant="secondary"
        className="mt-4 h-auto min-h-12 w-full whitespace-normal rounded-2xl bg-mindz-pink p-4 text-sm font-semibold"
      >
        <a href={GOOGLE_REVIEW_URL}>
          <Star className="size-5 text-primary" />
          Lisa Google arvustus
        </a>
      </Button>
    </section>
  );
}
