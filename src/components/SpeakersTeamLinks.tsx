import { Link } from "@tanstack/react-router";
import { Users } from "lucide-react";
import { firstName, initials, teamMembers } from "@/lib/events";

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
    <div className="grid grid-cols-4 gap-2">
      {teamMembers().map((member) => {
        const cell = (
          <>
            {member.imageUrl ? (
              <img src={member.imageUrl} alt={member.name} className="size-14 rounded-full object-cover" />
            ) : (
              <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-base font-semibold">
                {initials(member.name)}
              </div>
            )}
            <span className="text-xs font-medium">{firstName(member.name)}</span>
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

/** Koolitajate pallikeste rida — tähestiku järjekorras (Kiia, Janika ees), klikk avab profiili. */
export function KoolitajadRow() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {speakersInListOrder().map((speaker) => (
        <Link key={speaker.id} to="/koolitajad" hash={speaker.id} className="flex flex-col items-center gap-1.5">
          {speaker.imageUrl ? (
            <img src={speaker.imageUrl} alt={speaker.name} className="size-14 rounded-full object-cover" />
          ) : (
            <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-base font-semibold">
              {initials(speaker.name)}
            </div>
          )}
          <span className="text-xs font-medium">{firstName(speaker.name)}</span>
        </Link>
      ))}
    </div>
  );
}

/** Koolitajate pallikese rida rohelises kaardis — Tagasiside lehel. */
export function KoolitajadPills() {
  return (
    <section className="mt-4 rounded-2xl border border-primary/25 bg-mindz-mint p-4">
      <p className="text-sm font-semibold">Koolitajad</p>
      <div className="mt-3">
        <KoolitajadRow />
      </div>
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
