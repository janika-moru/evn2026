import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/privaatsus")({
  head: () => ({
    meta: [
      { title: "Privaatsus- ja andmetöötlustingimused — Studio MindZ 2026" },
      {
        name: "description",
        content:
          "Kuidas Studio MindZ OÜ kogub, kasutab ja kaitseb Tartu ettevõtlusnädala 2026 äpi kasutajate andmeid.",
      },
      {
        property: "og:title",
        content: "Privaatsus- ja andmetöötlustingimused — Studio MindZ 2026",
      },
      {
        property: "og:description",
        content: "Andmete kogumine, säilitamine, jagamine koolitajatega ja Sinu õigused.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { property: "og:url", content: "/privaatsus" },
    ],
    links: [{ rel: "canonical", href: "/privaatsus" }],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-7">
      <h2 className="text-lg font-bold leading-snug">{title}</h2>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-foreground/80">{children}</div>
    </section>
  );
}

function PrivacyPage() {
  return (
    <main className="px-4 pb-4 pt-8">
      <Link
        to="/info"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
      >
        <ArrowLeft className="size-4" /> Tagasi Info lehele
      </Link>

      <h1 className="mt-4 text-2xl font-bold leading-tight">
        Privaatsus- ja andmetöötlustingimused
      </h1>
      <p className="mt-2 text-sm text-foreground/70">
        Kehtivad alates oktoobrist 2026. Viimati uuendatud 30. septembril 2026.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-foreground/80">
        Need tingimused kirjeldavad, kuidas Studio MindZ OÜ kogub, töötleb ja kaitseb Sinu
        isikuandmeid Tartu ettevõtlusnädala 2026 veebiäpis (edaspidi äpis) aadressil tartu.mindz.ee.
      </p>

      <Section title="1. Vastutav ja volitatud töötleja">
        <div>
          <span className="block font-semibold text-foreground">
            Vastutav töötleja: Studio MindZ OÜ
          </span>
          <span className="block">Telliskivi tn 57/1, Tallinn, 10412, Harjumaa</span>
          <span className="block">Registrikood 14545246</span>
          <span className="block">mindz.ee</span>
          <span className="block">info@mindz.ee</span>
        </div>
        <div>
          <span className="block font-semibold text-foreground">
            Volitatud töötleja: OÜ E-Assisto
          </span>
          <span className="block">A. Haava tn 11, Tartu linn, 50409, Tartumaa</span>
          <span className="block">Registrikood 16696788</span>
          <span className="block">assisto.ee</span>
          <span className="block">janika@assisto.ee</span>
        </div>
        <p>
          OÜ E-Assisto on Studio MindZ OÜ partner ettevõtlusnädala korraldamisel: täidab
          programmijuhi rolli Studio MindZi ruumides toimuva programmi planeerimisel,
          koolitajatega suhtlemisel ja osalejate teenindamisel ning teostab ja haldab selle
          juurde kuuluvat veebiäppi. Isikuandmeid töötleb E-Assisto ainult Studio MindZ OÜ
          juhiste alusel ja ettevõtlusnädala korraldamise eesmärgil.
        </p>
      </Section>

      <Section title="2. Millised andmed ja mis eesmärgil kogume">
        <p>
          Kogume ainult neid andmeid, mis on teenuse toimimiseks vajalikud. Fienta toorandmeid
          (makseinfo, aadress, IP-aadress) ega osalejate nimesid veebiäpi andmebaasis ei säilitata.
        </p>
        <p>
          <span className="font-semibold text-foreground">Registreerumine ja osalemine.</span>{" "}
          Meiliaadress, sündmuse tunnus, pileti number ja olek. Eesmärk: Sinu piletite kuvamine
          „Minu kava" vaates, koolituse ettevalmistamine ja läbiviimine ning koolituse
          lisamaterjalide ja olulise info saatmine. Alus: lepingu täitmine (GDPR art 6 lg 1 p b)
          ning korraldaja ja koolitaja õigustatud huvi kvaliteetse õppe tagamisel (p f).
        </p>
        <p>
          <span className="font-semibold text-foreground">Sisselogimine.</span> Meiliaadress,
          ühekordne sisselogimislink ja seansiandmed. Alus: lepingu täitmine (p b).
        </p>
        <p>
          <span className="font-semibold text-foreground">Tagasiside.</span> Hinnang 1–10 ja
          sõnaline tagasiside; vabatahtlikult nimi, roll, meiliaadress või telefon ja foto.
          Eesmärk: koolituste ja korralduse kvaliteedi hindamine, tagasiside edastamine
          koolitajale, vajadusel Sinuga ühenduse võtmine. Alus: õigustatud huvi (p f),
          vabatahtlike väljade ja foto puhul nõusolek (p a).
        </p>
        <p>
          <span className="font-semibold text-foreground">Küsimused koolitajale.</span> Küsimuse
          tekst, vabatahtlikult nimi, valdkond ja ekraanipilt. Küsimusi näevad sama koolituse
          osalejad ja koolitaja. Eesmärk: koolituse ajal küsimustele vastamine. Alus: õigustatud
          huvi (p f), vabatahtlike väljade puhul nõusolek (p a).
        </p>
        <p>
          <span className="font-semibold text-foreground">Tagasiside avaldamine.</span> Nimi,
          roll, foto, hinnang ja arvamus avaldatakse kodulehel või sotsiaalmeedias ainult siis,
          kui oled vormis vastava märkeruudu ise linnukesega kinnitanud (p a).
        </p>
        <p>
          <span className="font-semibold text-foreground">Tehnilised logid.</span> Süsteemsed
          sünkroonimis- ja veateated ilma isikuandmeteta. Alus: õigustatud huvi süsteemi
          turvalisuse ja töökindluse tagamisel (p f).
        </p>
      </Section>

      <Section title="3. Andmete jagamine koolitajaga">
        <p>
          Koolitusele registreerunud osaleja andmeid (meiliaadress ja registreeritud koolitus)
          jagatakse vastava koolituse läbiviijaga. Eesmärk on võimaldada koolitajal koolituseks
          ette valmistuda ning saata osalejatele koolituse lisamaterjale, slaide, ülesandeid ja
          järelinfot.
        </p>
        <p>
          Koolitaja tohib neid andmeid kasutada üksnes konkreetse koolitusega seotud suhtluseks.
          Osalejate lisamine koolitaja üldisesse turundus- või uudiskirjalisti ilma osaleja
          eraldi nõusolekuta ei ole lubatud.
        </p>
        <p>
          Koolitajale vahendatakse ka talle antud tagasiside. Sinu nimi ja kontakt jõuavad
          koolitajani ainult siis, kui lisasid need tagasisidevormis ise.
        </p>
      </Section>

      <Section title="4. Küpsised ja seadmesse salvestamine">
        <p>
          Äpis ei kasutata turundus-, reklaami- ega jälgimisküpsiseid. Kasutame ainult
          tehniliselt vajalikke lahendusi:
        </p>
        <p>
          <span className="font-semibold text-foreground">Sisselogimise seanss</span> hoiab Sind
          „Minu kava" lehel sisse logituna.
        </p>
        <p>
          <span className="font-semibold text-foreground">Vormi eeltäide.</span> Kui märgid
          tagasisidevormis „Jäta selles seadmes meelde", salvestab brauser Sinu nime, rolli ja
          kontakti. Fotot seadmesse ei salvestata. Salvestus aegub 10. oktoobril 2026 ja selle
          saab igal ajal kustutada brauseri mälu tühjendades.
        </p>
        <p>
          <span className="font-semibold text-foreground">Offline-vahemälu</span> hoiab
          kujundusfaile ja fonte, et äpp töötaks ka nõrga levi korral.
        </p>
      </Section>

      <Section title="5. Kui kaua andmeid hoiame">
        <p>
          <span className="font-semibold text-foreground">
            Registreeringud, tagasiside, fotod ja kasutajakontod:
          </span>{" "}
          1 aasta, sest need on sisendiks järgmise aasta programmi koostamisel. 10. oktoobril
          2027 kustutatakse need automaatselt ja pöördumatult.
        </p>
        <p>
          <span className="font-semibold text-foreground">Tehnilised logid:</span> kustutatakse
          automaatselt 30 päeva möödudes.
        </p>
        <p>
          <span className="font-semibold text-foreground">Teavituskirjad:</span> iga tagasiside
          kohta saadetakse teavitus aadressile info@mindz.ee; nendele kehtivad Studio MindZ OÜ
          üldised kirjavahetuse säilitamise reeglid.
        </p>
      </Section>

      <Section title="6. Kellele andmeid edastatakse">
        <p>OÜ E-Assisto — programmijuhtimine ning äpi teostus ja haldus.</p>
        <p>Fienta (Eesti) — piletimüügi ja registreerimise keskkond.</p>
        <p>
          Pilvetaristu ja andmebaasiteenus — serverid asuvad Euroopa Liidus või tagavad
          GDPR-ile vastava kaitsetaseme.
        </p>
        <p>E-kirjade edastamise teenus — sisselogimislingid ja teavitused.</p>
        <p>Koolitajad — vastavalt punktile 3.</p>
        <p>
          Isikuandmeid ei müüda ega edastata kolmandatele isikutele reklaamieesmärkidel.
          Väljapoole EL/EMP piirkonda andmeid ilma nõuetekohaste kaitsemeetmeteta ei edastata.
        </p>
      </Section>

      <Section title="7. Turvameetmed">
        <p>Kogu andmevahetus toimub krüpteeritud HTTPS/TLS-ühenduse kaudu.</p>
        <p>
          Andmebaasis kehtib rea-taseme turvalisus, mis välistab teiste osalejate andmete
          nägemise.
        </p>
        <p>Tagasisidevormidel on robotilõks ja serveripoolne kuritarvituste piirang.</p>
        <p>Paroolide puhul kontrollitakse, kas parool on avalikes leketes esinenud.</p>
        <p>Fotosid saab üles laadida ainult pildifailidena kuni 10 MB ja need on privaatsed.</p>
      </Section>

      <Section title="8. Pildistamine sündmusel">
        <p>
          Koolitustest tehakse foto- ja videosalvestusi koolitaja ja Studio MindZi kasutuseks.
          Kui Sa ei soovi pildile jääda, anna sellest enne koolituse algust korraldajale teada.
        </p>
      </Section>

      <Section title="9. Sinu õigused">
        <p>Õigus tutvuda oma andmetega ja saada neist koopia.</p>
        <p>Õigus nõuda ebaõigete andmete parandamist.</p>
        <p>Õigus nõuda andmete kustutamist ka enne 10.10.2027.</p>
        <p>Õigus nõusolek igal ajal tagasi võtta.</p>
        <p>Õigus piirata töötlemist ja esitada vastuväiteid.</p>
        <p>
          Oma õiguste kasutamiseks kirjuta{" "}
          <a href="mailto:info@mindz.ee" className="text-primary underline">
            info@mindz.ee
          </a>
          . Vastame hiljemalt 30 päeva jooksul.
        </p>
        <p>
          Kui leiad, et Sinu õigusi on rikutud, on Sul õigus pöörduda Andmekaitse Inspektsiooni
          poole (Tatari 39, 10134 Tallinn, info@aki.ee, tel 627 4135) või kohtusse.
        </p>
      </Section>
    </main>
  );
}
