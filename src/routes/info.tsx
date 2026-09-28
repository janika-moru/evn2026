import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Navigation, Users, MessageSquareHeart } from "lucide-react";

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Lutsu+t%C3%A4nav+3%2C+51005+Tartu%2C+Tartu+maakond%2C+Eesti";

const BEFORE_YOU_COME = [
  "Palun jõua kohale vähemalt 10 minutit enne algust, et jõuaksid end rahulikult sisse seada.",
  "Võta kaasa hea tuju ja märkmete tegemiseks arvuti või märkmik.",
  "Parkimine toimub linna üldkorra alusel.",
  "Puitpõranda kaitseks võib ruumis viibida sokkides või ilma terava kontsata vahetusjalanõudes.",
];

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: "Kohale tulek — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Studio MindZ, Lutsu 3, Tartu, Antoniuse Õuemaja 2. korrus. Kohale tuleku juhis ja kasulik info enne koolitust.",
      },
      { property: "og:title", content: "Kohale tulek — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Studio MindZ, Lutsu 3, Tartu, Antoniuse Õuemaja 2. korrus.",
      },
      { property: "og:url", content: "/info" },
    ],
    links: [{ rel: "canonical", href: "/info" }],
  }),
  component: InfoPage,
});

function InfoPage() {
  return (
    <main className="px-4 pt-8">
      <h1 className="text-2xl font-bold">Kohale tulek</h1>

      <section className="mt-4 rounded-2xl bg-secondary p-5">
        <MapPin className="size-6 text-primary" />
        <p className="mt-2 text-lg font-semibold leading-snug">Studio MindZ</p>
        <p className="text-base">Lutsu 3, Tartu</p>
        <p className="text-base">Antoniuse Õuemaja, 2. korrus</p>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          Hoovis liigu puittrepi juurde ja tule üles 2. korrusele.
        </p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground"
        >
          <Navigation className="size-5" /> Ava Google Mapsis
        </a>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold">Enne tulekut</h2>
        <ul className="mt-3 space-y-3">
          {BEFORE_YOU_COME.map((text) => (
            <li
              key={text}
              className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed"
            >
              {text}
            </li>
          ))}
          <li className="rounded-2xl border border-border bg-card p-4 text-sm leading-relaxed">
            Küsimuste või murede korral kirjuta julgelt{" "}
            <a href="mailto:info@mindz.ee" className="font-semibold text-primary underline">
              info@mindz.ee
            </a>
          </li>
        </ul>
      </section>

      <section className="mt-8 grid gap-3">
        <Link
          to="/koolitajad"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
        >
          <Users className="size-5 text-primary" />
          <span className="text-sm font-semibold">Koolitajad &amp; materjalid</span>
        </Link>
        <Link
          to="/tagasiside"
          className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4"
        >
          <MessageSquareHeart className="size-5 text-primary" />
          <span className="text-sm font-semibold">Anna tagasisidet</span>
        </Link>
      </section>
    </main>
  );
}
