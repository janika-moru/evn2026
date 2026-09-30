import { Link } from "@tanstack/react-router";
import { initials, speakersForEvent } from "@/lib/events";

const contactLink =
  "text-muted-foreground underline decoration-current underline-offset-4 transition-colors hover:text-foreground";

/**
 * Koolitaja pilt, tema profiilile viiv nimi ja selle all kontaktlingid
 * (koduleht, sotsmeedia). Kui sündmusel pole koolitajat andmebaasis,
 * kuvatakse fallback-tekst ligita.
 *
 * large (Minu kava) = suurem pilt, nimi ja lingid ning iga lingi tabamisala
 * vähemalt 44px kõrge, et väiksemaid linkedine ei saa kogemata puutuda.
 */
export function SpeakerLinks({
  eventId,
  fallback,
  large = false,
}: {
  eventId: string;
  fallback?: string;
  large?: boolean;
}) {
  const speakers = speakersForEvent(eventId);

  if (speakers.length === 0) {
    return fallback ? (
      <p className={`mt-1 text-muted-foreground ${large ? "text-[17px]" : "text-sm"}`}>
        {fallback}
      </p>
    ) : null;
  }

  return (
    <div className={large ? "mt-3 space-y-3" : "mt-2 space-y-2.5"}>
      {speakers.map((speaker) => (
        <div key={speaker.id} className={`flex items-center ${large ? "gap-3" : "gap-3"}`}>
          {speaker.imageUrl ? (
            <img
              src={speaker.imageUrl}
              alt={speaker.name}
              loading="lazy"
              decoding="async"
              className={`shrink-0 rounded-full object-cover ${large ? "size-14" : "size-10"}`}
            />
          ) : (
            <div
              className={`flex shrink-0 items-center justify-center rounded-full bg-secondary font-semibold ${
                 large ? "size-14 text-sm" : "size-10 text-xs"
              }`}
            >
              {initials(speaker.name)}
            </div>
          )}
          <div className="min-w-0">
            <Link
              to="/koolitajad"
              hash={speaker.id}
              className={`block font-semibold text-foreground underline-offset-4 hover:underline ${
                large ? "text-[17px]" : "text-sm"
              }`}
            >
              {speaker.name}
            </Link>
            <div
              className={`flex flex-wrap ${
                large ? "gap-x-5 text-[15px] leading-none" : "mt-1 gap-x-3 gap-y-0.5 text-xs"
              }`}
            >
              {speaker.websiteUrl && (
                <a
                  href={speaker.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLink} ${
                    large ? "inline-flex min-h-[44px] items-center" : ""
                  }`}
                >
                  Koduleht
                </a>
              )}
              {speaker.linkedinUrl && (
                <a
                  href={speaker.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLink} ${
                    large ? "inline-flex min-h-[44px] items-center" : ""
                  }`}
                >
                  LinkedIn
                </a>
              )}
              {speaker.facebookUrl && (
                <a
                  href={speaker.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLink} ${
                    large ? "inline-flex min-h-[44px] items-center" : ""
                  }`}
                >
                  Facebook
                </a>
              )}
              {speaker.instagramUrl && (
                <a
                  href={speaker.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLink} ${
                    large ? "inline-flex min-h-[44px] items-center" : ""
                  }`}
                >
                  Instagram
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
