import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Tag, ShieldCheck } from "lucide-react";

import { MeeskondCard } from "@/components/SpeakersTeamLinks";
import { RoomGallery } from "@/components/RoomGallery";
import largeRoomFront from "@/assets/ruum-suur-eest.jpg.asset.json";
import largeRoomCircle from "@/assets/ruum-suur-ring.jpg.asset.json";
import meetingRoom from "@/assets/ruum-koosolek.jpg.asset.json";
import kitchen from "@/assets/ruum-kook.jpg.asset.json";
import room2 from "@/assets/MindZ_stuudioruumid_Tartu_009.jpg.asset.json";
import loungeRoom from "@/assets/stuudio-lounge.jpg.asset.json";
import loungeRoomThumb from "@/assets/room-thumbs/stuudio-lounge.webp.asset.json";
import kiiaFounder from "@/assets/studio-mindz-looja-kiia-paal.jpg.asset.json";
import kiiaFounderThumb from "@/assets/room-thumbs/studio-mindz-looja-kiia-paal.webp.asset.json";
import room4 from "@/assets/MindZ_stuudioruumid_Tartu_016.jpg.asset.json";
import room5 from "@/assets/MindZ_stuudioruumid_Tartu_031.jpg.asset.json";
import ettn2025Timo from "@/assets/ettn2025-timo-porval.jpg.asset.json";
import ettn2025Mariliis from "@/assets/ettn2025-mariliis-piikar.jpg.asset.json";
import ettn2025Anu from "@/assets/ettn2025-anu-tahemaa.jpg.asset.json";
import ettn2025Janika from "@/assets/ettn2025-janika-moru.jpg.asset.json";
import room5Thumb from "@/assets/room-thumbs/MindZ_stuudioruumid_Tartu_031.webp.asset.json";
import room2Thumb from "@/assets/room-thumbs/MindZ_stuudioruumid_Tartu_009.webp.asset.json";
import meetingRoomThumb from "@/assets/room-thumbs/ruum-koosolek.webp.asset.json";
import kitchenThumb from "@/assets/room-thumbs/ruum-kook.webp.asset.json";
import largeRoomFrontThumb from "@/assets/room-thumbs/ruum-suur-eest.webp.asset.json";
import largeRoomCircleThumb from "@/assets/room-thumbs/ruum-suur-ring.webp.asset.json";
import room4Thumb from "@/assets/room-thumbs/MindZ_stuudioruumid_Tartu_016.webp.asset.json";
import ettn2025TimoThumb from "@/assets/room-thumbs/ettn2025-timo-porval.webp.asset.json";
import ettn2025MariliisThumb from "@/assets/room-thumbs/ettn2025-mariliis-piikar.webp.asset.json";
import ettn2025AnuThumb from "@/assets/room-thumbs/ettn2025-anu-tahemaa.webp.asset.json";
import ettn2025JanikaThumb from "@/assets/room-thumbs/ettn2025-janika-moru.webp.asset.json";

const ROOM_IMAGES = [
  { src: kiiaFounder.url, thumb: kiiaFounderThumb.url, alt: "Studio MindZi looja Kiia Paal" },
  { src: room5.url, thumb: room5Thumb.url, alt: "Studio MindZi koolitusruum roheliste tugitoolidega" },
  { src: meetingRoom.url, thumb: meetingRoomThumb.url, alt: "Studio MindZi väike koosolekuruum" },
  { src: kitchen.url, thumb: kitchenThumb.url, alt: "Studio MindZi köök" },
  { src: loungeRoom.url, thumb: loungeRoomThumb.url, alt: "Studio MindZi lounge-nurk kiikvankiga ja tugitoolidega" },
  { src: room2.url, thumb: room2Thumb.url, alt: "Studio MindZi koolitusruum taimede ja valgustitega" },
  { src: largeRoomFront.url, thumb: largeRoomFrontThumb.url, alt: "Studio MindZi suur koolitusruum" },
  { src: largeRoomCircle.url, thumb: largeRoomCircleThumb.url, alt: "Studio MindZi suur koolitusruum ringis toolidega" },
  { src: room4.url, thumb: room4Thumb.url, alt: "Studio MindZi koolitusruumi vaade köögivanni poolt" },
  { src: ettn2025Timo.url, thumb: ettn2025TimoThumb.url, alt: "Ettevõtlusnädal 2025: Timo Porval esinemas Studio MindZi ruumis" },
  {
    src: ettn2025Mariliis.url,
    thumb: ettn2025MariliisThumb.url,
    alt: "Ettevõtlusnädal 2025: Mariliis Piikar rääkimas osalejatele",
  },
  { src: ettn2025Anu.url, thumb: ettn2025AnuThumb.url, alt: "Ettevõtlusnädal 2025: Anu Tähemaa trummitund osalejatega" },
  { src: ettn2025Janika.url, thumb: ettn2025JanikaThumb.url, alt: "Ettevõtlusnädal 2025: Janika Mõru juhendamas rühmatööd" },
];

export const Route = createFileRoute("/info")({
  head: () => ({
    meta: [
      { title: "Studio ja ruumid — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Studio MindZi meeskond, ruumid, rendiinfo ja andmetöötlustingimused.",
      },
      { property: "og:title", content: "Studio ja ruumid — Studio MindZ 2026" },
      {
        property: "og:description",
        content: "Studio MindZi meeskond, ruumid ja andmetöötlustingimused.",
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
      <MeeskondCard />

      <section className="mt-8" aria-labelledby="rooms-heading">
        <div className="flex items-center gap-2">
          <Building2 className="size-6 text-primary" />
          <h2 id="rooms-heading" className="text-xl font-bold">
            Ruumid
          </h2>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          Studio MindZ-is usume, et tõeliselt väärtuslik kogemus sünnib hubases atmosfääris, mille
          täidavad innustunud osalejad.
        </p>
        <p className="mt-2 text-sm leading-relaxed text-foreground/80">
          Koolitusstuudio asub otse vanalinna südames – jalutuskäigu kaugusel kohvikutest, Raekoja
          platsist ja Emajõest.
        </p>

        <RoomGallery images={ROOM_IMAGES} />

        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          Tartu stuudios on kaks kõrvutiasetsevat, uksega ühendatud ruumi. Laudu ja toole saame
          vajadusel tubade vahel liigutada vastavalt soovile.
        </p>

        <div className="mt-5 space-y-5">
          <div>
            <h3 className="font-semibold">Suur koolitusruum 70 m²</h3>
            <p className="mt-1 text-sm leading-relaxed text-foreground/80">
              Diivanid ja tugitoolid 20–25 osalejale, esitlustehnika, pabertahvel ja markerid,
              kõlarid, kohvinurk, väike külmik ning garderoob. Tualett asub eesruumis.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Väike koosolekuruum / kohvikutuba{"\u00a0"} 35 m²</h3>
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
              <span className="font-semibold">Tund</span> 50 € + KM
            </p>
            <p className="text-sm">
              <span className="font-semibold">Päev</span> 350 € + KM
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

      <section className="mt-8 mb-8 flex gap-3 rounded-2xl border border-border bg-card p-4">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
          <div>
            <p className="text-sm font-semibold">Andmetöötlus</p>
            <p className="mt-0.5 text-sm leading-relaxed text-foreground/80">
              Registreeringuid, tagasisidet, küsimusi koolitajale ja fotosid hoiame 1 aasta järgmise aasta programmi
              koostamiseks.{"\u00a0"}10. oktoobril 2027 kustutatakse need koos kasutajakontodega
              automaatselt.{"\u00a0"}
              <br />
              Tehnilised logid kustuvad automaatselt 30 päeva pärast.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Nimi ja meiliaadress on vabatahtlikud ning mõeldud vaid koolitajale ja tiimile
              vastamiseks.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Koolitusele registreerunu meiliaadressi jagame koolitajaga, et ta saaks koolituseks
              valmistuda ja saata lisamaterjale.
            </p>
            <Link
              to="/privaatsus"
              className="mt-2 inline-block text-sm font-semibold text-primary underline underline-offset-2"
            >
              Privaatsus- ja andmetöötlustingimused
            </Link>
          </div>

        </section>
    </main>
  );
}
