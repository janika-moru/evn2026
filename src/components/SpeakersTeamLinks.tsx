import { Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import type { ReactNode } from "react";
import type { Speaker } from "@/lib/events";
import { initials, nameLines, teamMembers, speakersInListOrder } from "@/lib/events";

/** Roosa kaart, mis viib koolitajate ja materjalide lehele. */
export function KoolitajadCard() {
  return (
    <section className="mt-8 grid gap-3">
      <Link
        to="/koolitajad"
        className="flex items-center gap-3 rounded-2xl border border-mindz-pink bg-mindz-pink p-4"
      >
        <Users className="size-5 text-foreground" />
        <span className="text-sm font-semibold text-foreground">Koolitajad &amp; materjalid</span>
      </Link>
    </section>
  );
}

/** Meeskonna pallikeste rida ilma kaardita — kasutamiseks rohelise bloki sees. */
export function MeeskondRow() {
  return (
    <div className="grid grid-cols-5 gap-2">
      {teamMembers().map((member) => {
        const cell = (
          <>
            {member.imageUrl ? (
              <img
                src={member.thumbUrl ?? member.imageUrl}
                alt={member.name}
                decoding="async"
                width={56}
                height={56}
                className="size-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-base font-semibold">
                {initials(member.name)}
              </div>
            )}
            <span className="text-center text-[12px] font-medium leading-tight">
              {nameLines(member.name).map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </span>
          </>
        );
        const className = "flex flex-col items-center gap-1.5";
        return member.speakerId ? (
          <Link key={member.id} to="/koolitajad" hash={member.speakerId} className={className}>
            {cell}
          </Link>
        ) : (
          <div key={member.id} className={className}>
            {cell}
          </div>
        );
      })}
    </div>
  );
}

/** Koolitajate pallikeste rida — tähestiku järjekorras (Kiia, Janika ees).
 *  `onSelect` korral avab klõps antud koolitaja vormi (Tagasiside leht),
 *  muidu viib klikk koolitaja profiilile. */
export function KoolitajadRow({
  onSelect,
  selectedId,
}: {
  onSelect?: ((speaker: Speaker) => void) | undefined;
  selectedId?: string | null | undefined;
} = {}) {
  return (
    <div className="grid grid-cols-4 gap-2">
      {speakersInListOrder().map((speaker) => {
        const ring = selectedId === speaker.id ? "ring-2 ring-primary" : "";
        const pillName = speaker.displayName ?? speaker.name;
        const cell = (
          <>
            {speaker.imageUrl ? (
              <img
                src={speaker.thumbUrl ?? speaker.imageUrl}
                alt={speaker.name}
                loading="lazy"
                decoding="async"
                width={56}
                height={56}
                className={`size-14 rounded-full object-cover ${ring}`}
              />
            ) : (
              <div
                className={`flex size-14 items-center justify-center rounded-full bg-background text-base font-semibold ${ring}`}
              >
                {initials(pillName)}
              </div>
            )}
            <span className="text-center text-[12px] font-medium leading-tight">
              {nameLines(pillName).map((line) => (
                <span key={line} className="block whitespace-nowrap">
                  {line}
                </span>
              ))}
            </span>
          </>
        );
        const className = "flex flex-col items-center gap-1.5";
        return onSelect ? (
          <button
            key={speaker.id}
            type="button"
            onClick={() => onSelect(speaker)}
            aria-label={`Jäta tagasiside: ${speaker.name}`}
            className={className}
          >
            {cell}
          </button>
        ) : (
          <Link key={speaker.id} to="/koolitajad" hash={speaker.id} className={className}>
            {cell}
          </Link>
        );
      })}
    </div>
  );
}

/** Koolitajate pallikese rida roosas kaardis — Tagasiside lehel. */
export function KoolitajadPills({
  onSelect,
  selectedId,
  children,
}: {
  onSelect?: ((speaker: Speaker) => void) | undefined;
  selectedId?: string | null | undefined;
  children?: ReactNode;
}) {
  return (
    <section className="mt-4 rounded-2xl border border-mindz-pink bg-mindz-pink p-4">
      <h2 className="text-base font-semibold">Jäta tagasiside koolitusele</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Klõpsa koolitaja pildil ja täida tagasiside vorm.
      </p>
      <div className="mt-3">
        <KoolitajadRow onSelect={onSelect} selectedId={selectedId} />
      </div>
      {children}
    </section>
  );
}

/** "Studio MindZ meeskond" pallikeste rida — kelle poole kohapeal pöörduda. */
export function MeeskondCard() {
  return (
    <section className="mt-4 rounded-2xl border border-primary/25 bg-mindz-mint p-4">
      <p className="text-sm font-semibold">Studio MindZ meeskond</p>
      <div className="mt-3">
        <MeeskondRow />
      </div>
    </section>
  );
}

/** Mõlemad koos — Info ja Minu kava lehe lõpus. */
export function SpeakersTeamLinks() {
  return (
    <>
      <KoolitajadCard />
      <MeeskondCard />
    </>
  );
}
