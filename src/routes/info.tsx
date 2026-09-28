import { createFileRoute, Link } from "@tanstack/react-router";
import {
  MapPin,
  Navigation,
  Users,
  MessageSquareHeart,
  Footprints,
  Car,
  Sparkles,
  Backpack,
  Clock,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import directionsImage from "@/assets/studio-mindz-sissepaas.jpg.asset.json";

/** Kohale tuleku juhise pilt. */
const DIRECTIONS_IMAGE_URL: string | null = directionsImage.url;

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Lutsu+t%C3%A4nav+3%2C+51005+Tartu%2C+Tartu+maakond%2C+Eesti";

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Footprints, title: "Saabumine", text: "Hoovis liigu puittrepi juurde ja tule üles 2. korrusele." },
  { icon: Car, title: "Parkimine", text: "Parkimine toimub linna üldkorra alusel." },
  {
    icon: Sparkles,
    title: "Jalanõud",
    text: "Puitpõranda kaitseks võib ruumis viibida sokkides või ilma terava kontsata vahetusjalanõudes.",
  },
  {
    icon: Backpack,
    title: "Võta kaasa",
    text: "Võta kaasa hea tuju ja märkmete tegemiseks arvuti või märkmik.",
  },
  {
    icon: Clock,
    title: "Tule 15 minutit varem",
    text: "Palun jõua kohale vähemalt 15 minutit enne algust. Koolitus algab täpselt märgitud ajal.",
  },
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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
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

      {DIRECTIONS_IMAGE_URL && (
        <img
          src={DIRECTIONS_IMAGE_URL}
          alt="Studio MindZ sissepääs: Lutsu 3, Tartu, Antoniuse õuemaja 2. korrus"
          className="mt-4 w-full rounded-2xl object-cover"
        />
      )}

      <section className="mt-4 rounded-2xl bg-secondary p-5">
        <MapPin className="size-6 text-primary" />
        <p className="mt-2 text-lg font-semibold leading-snug">Studio MindZ</p>
        <p className="text-base">Lutsu 3, Tartu</p>
        <p className="text-base">Antoniuse Õuemaja, 2. korrus</p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground"
        >
          <Navigation className="size-5" /> Ava Google Mapsis
        </a>
      </section>

      <ul className="mt-4 space-y-3">
        {STEPS.map((st) => (
          <li key={st.title} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
            <st.icon className="mt-0.5 size-5 shrink-0 text-primary" />
            <div className="min-w-0">
              <p className="text-sm font-semibold">{st.title}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-foreground/80">{st.text}</p>
              {st.title === "Parkimine" && (
                <div className="mt-2 flex flex-col items-start gap-1.5">
                  <a
                    href="https://tartu.ee/et/parkimine"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-primary underline underline-offset-2"
                  >
                    Tartu linna parkimiskord
                  </a>
                  <a
                    href="https://gis.tartulv.ee/portal/apps/experiencebuilder/experience/?id=de369a00ca89413489cbb10fc794b93f"
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-semibold text-primary underline underline-offset-2"
                  >
                    Vaata parkimisalade kaarti
                  </a>
                </div>
              )}
            </div>
          </li>
        ))}
        <li className="flex gap-3 rounded-2xl border border-border bg-card p-4">
          <Mail className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold">Kontakt</p>
            <p className="mt-0.5 text-sm leading-relaxed text-foreground/80">
              Küsimuste või murede korral kirjuta julgelt{" "}
              <a href="mailto:info@mindz.ee" className="font-semibold text-primary underline">
                info@mindz.ee
              </a>
            </p>
          </div>
        </li>
      </ul>

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
