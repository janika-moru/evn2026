import { Link } from "@tanstack/react-router";
import { initials, speakersForEvent } from "@/lib/events";

const contactLink =
  "text-muted-foreground underline decoration-current underline-offset-4 transition-colors hover:text-foreground";

/**
 * Suure vaate (Minu kava) lingi tabamisala: pseudo-element laiendab kliki-
 * ja puuteala umbes 44px kõrguseks, ilma et see muutuks lehe paigutust —
 * nõnda jääb koolitaja nimi ja lingid pildi kõrgusega joondatuks.
 */
const largeTap = "relative after:absolute after:-inset-x-2 after:-inset-y-3 after:content-['']";

/**
 * Koolitaja pilt, tema profiilile viiv nimi ja selle all kontaktlingid
 * (koduleht, sotsmeedia). Kui sündmusel pole koolitajat andmebaasis,
 * kuvatakse fallback-tekst ligita.
 *
 * large (Minu kava) = pilt, nimi ja lingid moodustavad terviku: nime ülemine
 * äär joondub pildi ülemise ääre ja lingid pildi alumise äärega.
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
        <div key={speaker.id} className={`flex gap-3 ${large ? "items-start" : "items-center"}`}>
          {speaker.imageUrl ? (
            <img
              src={speaker.thumbUrl ?? speaker.imageUrl}
              alt={speaker.name}
              loading="lazy"
              decoding="async"
              width={large ? 52 : 40}
              height={large ? 52 : 40}
              className={`shrink-0 rounded-full object-cover ${large ? "size-13" : "size-10"}`}
            />
          ) : (
            <div
              className={`flex shrink-0 items-center justify-center rounded-full bg-secondary font-semibold ${
                large ? "size-12 text-sm" : "size-10 text-xs"
              }`}
            >
              {initials(speaker.name)}
            </div>
          )}
          <div
            className={
              large ? "flex min-h-13 min-w-0 flex-col justify-between" : "min-w-0"
            }
          >
            {speaker.isOrganizer ? (
              <p
                className={`font-semibold text-foreground ${
                  large ? "-mt-[2px] text-[17px] leading-[1.2]" : "text-sm"
                }`}
              >
                {speaker.name}
              </p>
            ) : (
              <Link
                to="/koolitajad"
                hash={speaker.id}
                className={`block font-semibold text-foreground underline-offset-4 hover:underline ${
                  large ? "-mt-[2px] text-[17px] leading-[1.2]" : "text-sm"
                }`}
              >
                {speaker.name}
              </Link>
            )}
            <div
              className={`flex flex-wrap ${
                large ? "gap-x-5 text-[15px] leading-[1.3]" : "mt-1 gap-x-3 gap-y-0.5 text-xs"
              }`}
            >
              {speaker.websiteUrl && (
                <a
                  href={speaker.websiteUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLink} ${large ? largeTap : ""}`}
                >
                  Koduleht
                </a>
              )}
              {speaker.linkedinUrl && (
                <a
                  href={speaker.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLink} ${large ? largeTap : ""}`}
                >
                  LinkedIn
                </a>
              )}
              {speaker.facebookUrl && (
                <a
                  href={speaker.facebookUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLink} ${large ? largeTap : ""}`}
                >
                  Facebook
                </a>
              )}
              {speaker.instagramUrl && (
                <a
                  href={speaker.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`${contactLink} ${large ? largeTap : ""}`}
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
