import { createFileRoute } from "@tanstack/react-router";
import {
  MapPin,
  Navigation,
  Footprints,
  Car,
  CircleAlert,
  Backpack,
  Clock,
  Mail,
  Camera,
  Building2,
  Tag,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { SpeakersTeamLinks } from "@/components/SpeakersTeamLinks";
import directionsImage from "@/assets/studio-mindz-sissepaas.jpg.asset.json";
import largeRoomFront from "@/assets/ruum-suur-eest.jpg.asset.json";
import largeRoomCircle from "@/assets/ruum-suur-ring.jpg.asset.json";
import meetingRoom from "@/assets/ruum-koosolek.jpg.asset.json";
import kitchen from "@/assets/ruum-kook.jpg.asset.json";

/** Kohale tuleku juhise pilt. */
const DIRECTIONS_IMAGE_URL: string | null = directionsImage.url;

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Lutsu+t%C3%A4nav+3%2C+51005+Tartu%2C+Tartu+maakond%2C+Eesti";

const ROOM_IMAGES = [
  { src: largeRoomFront.url, alt: "Studio MindZi suur koolitusruum" },
  { src: largeRoomCircle.url, alt: "Studio MindZi suur koolitusruum ringis toolidega" },
  { src: meetingRoom.url, alt: "Studio MindZi väike koosolekuruum" },
  { src: kitchen.url, alt: "Studio MindZi köök" },
];

const STEPS: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Footprints, title: "Saabumine", text: "Hoovis liigu puittrepi juurde ja tule üles 2. korrusele." },
  { icon: Car, title: "Parkimine", text: "Parkimine toimub linna üldkorra alusel." },
  {
    icon: CircleAlert,
    title: "Vahetusjalanõud!",
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
  {
    icon: Camera,
    title: "Video- ja fotosalvestused",
    text: "Koolitustest tehakse video- ja fotosalvestusi koolitaja ja Studio MindZi kasutuseks.",
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
      {DIRECTIONS_IMAGE_URL && (
        <img
          src={DIRECTIONS_IMAGE_URL}
          alt="Studio MindZ sissepääs: Lutsu 3, Tartu, Antoniuse õuemaja 2. korrus"
          className="w-full rounded-2xl object-cover"
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

      <section className="mt-8" aria-labelledby="rooms-heading">
        <div className="flex items-center gap-2">
          <Building2 className="size-6 text-primary" />
          <h2 id="rooms-heading" className="text-xl font-bold">
            Ruumid
          </h2>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          {ROOM_IMAGES.map((image) => (
            <img
              key={image.src}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="aspect-square w-full rounded-lg object-cover"
            />
          ))}
        </div>

        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          Tartu stuudios on kaks kõrvutiasetsevat, uksega ühendatud ruumi. Laudu ja toole saame
          vajadusel tubade vahel liigutada vastavalt soovile.
        </p>

        <div className="mt-4 space-y-3">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold">Suur koolitusruum · 70 m²</h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/80">
              Diivanid ja tugitoolid 20–25 osalejale, esitlustehnika, pabertahvel ja markerid,
              kõlarid, kohvinurk, väike külmik ning garderoob. Tualett asub eesruumis.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold">Väike koosolekuruum / kohvikutuba · 35 m²</h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/80">
              Kohvikulauad või suur koosolekulaud ja toolid 8–10 osalejale, esitlusteler,
              pabertahvel, täisvarustuses köök, külmik ja nõudepesumasin. Tualett asub samas
              ruumis.
            </p>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-mindz-mint p-5">
          <div className="flex items-center gap-2">
            <Tag className="size-5 text-primary" />
            <h3 className="text-base font-bold">Ruumide rentimine</h3>
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">
            Ruume on võimalik rentida endale sobivaks sündmuseks.
          </p>
          <div className="mt-3 space-y-1.5">
            <p className="text-sm">
              <span className="font-semibold">Tund</span> — hind alates 50 € + KM
            </p>
            <p className="text-sm">
              <span className="font-semibold">Päev</span> — hind alates 350 € + KM
            </p>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80">
            Täpsema pakkumise jaoks saada meil aadressile{" "}
            <a href="mailto:info@mindz.ee" className="font-semibold text-primary underline">
              info@mindz.ee
            </a>
            .
          </p>
        </div>
      </section>

      <SpeakersTeamLinks />
    </main>
  );
}

