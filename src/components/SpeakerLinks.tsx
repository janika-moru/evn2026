import { Link } from "@tanstack/react-router";
import { initials, speakersForEvent } from "@/lib/events";

const contactLink =
  "text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground";

/**
 * Koolitaja pilt, tema profiilile viiv nimi ja selle all kontaktlingid
 * (koduleht, sotsmeedia). Kui sündmusel pole koolitajat andmebaasis,
 * kuvatakse fallback-tekst ligita.
 */
export function SpeakerLinks({
  eventId,
  fallback,
}: {
  eventId: string;
  fallback?: string;
}) {
  const speakers = speakersForEvent(eventId);

  if (speakers.length === 0) {
    return fallback ? (
      <p className="mt-1 text-sm text-muted-foreground">{fallback}</p>
    ) : null;
  }

  return (
    <div className="mt-2 space-y-2.5">
      {speakers.map((speaker) => (
        <div key={speaker.id} className="flex items-center gap-3">
          {speaker.imageUrl ? (
            <img
              src={speaker.imageUrl}
              alt={speaker.name}
              className="size-10 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-xs font-semibold">
              {initials(speaker.name)}
            </div>
          )}
          <div className="min-w-0">
            <Link
              to="/koolitajad"
              hash={speaker.id}
              className="text-sm font-semibold text-foreground underline-offset-4 hover:underline"
            >
              {speaker.name}
            </Link>
            <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs">
              {speaker.websiteUrl && (
                <a
                  href={speaker.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={contactLink}
                >
                  Koduleht
                </a>
              )}
              {speaker.linkedinUrl && (
                <a
                  href={speaker.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={contactLink}
                >
                  LinkedIn
                </a>
              )}
              {speaker.facebookUrl && (
                <a
                  href={speaker.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={contactLink}
                >
                  Facebook
                </a>
              )}
              {speaker.instagramUrl && (
                <a
                  href={speaker.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={contactLink}
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
