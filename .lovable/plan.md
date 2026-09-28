# Studio MindZ 2026 — ürituse mobiilirakendus

Mobile-first veebirakendus Tartu ettevõtlusnädala Studio MindZi programmile (5.–9. okt 2026), mille osalejad saavad lingiga telefoni Home Screenile lisada. Esmane eesmärk: kiire kava ülevaade, registreeringute nägemine, kohale tuleku info ja tagasiside.

## Bränd ja disain

- Font: Poppins (laaditakse `<link>`-iga root headis)
- Värvid: roheline #009D97 (peamine tegevusvärv), roosa #F3DDD6 (toetav taust), hall #C3C2C1, tume tekst #020A0A, valge taust
- Pehmed ümardatud kaardid, suured vajutatavad nupud, õhuline ja sõbralik, ilma gradientide/varjude/klaasiefektideta
- Semantic tokenid `src/styles.css`-is (oklch), hardcoded värve komponentides ei kasutata
- Logo ei joonistata ega genereerita — kasutatakse ainult siis, kui logo fail lisatakse

## Lehed ja navigatsioon

Allservas püsiv 4-punktiline navigatsioon: **Täna / Minu kava / Kava / Info**. Tagasiside ja Koolitajad & materjalid on hästi leitavad lingid/nupud, mitte bottom-navis.

- **Täna (`/`)** — päis (Tartu ettevõtlusnädal Studio MindZis 2026, 5.–9. okt), tänased sündmused, järgmine algav sündmus, minu tänased registreeringud, kiirlingid (Minu kava, Kogu kava, Anna tagasisidet, Kohale tulek), infoplokk + link tartu.ee kogu programmi juurde
- **Kava (`/kava`)** — horisontaalselt keritavad päeva-chip'id (E 5.10 … R 9.10), sündmuse kaardid (kellaaeg, nimi, koolitaja, lühikirjeldus, staatus, registreerimisnupp). Staatused: Registreeru / Oled registreerunud ✓ / Kohad täis / Registreerimine lõppenud
- **Sündmuse detail (`/sundmus/$id`)** — kuupäev, kellaaeg, pealkiri, koolitaja, kirjeldus, registreerimis-CTA ja staatus, Lisa kalendrisse (.ics allalaadimine), Anna tagasisidet, materjalid kui olemas
- **Minu kava (`/minu-kava`)** — sisselogimata: selgitav tekst + passwordless e-posti login (magic link); sisse logituna: minu registreeringud (esialgu demo-andmed)
- **Info (`/info`)** — Kohale tulek: aadress (Lutsu 3, Antoniuse Õuemaja, 2. korrus), juhise tekst, suur "Ava Google Mapsis" nupp (antud link), "Enne tulekut" infokillud eraldi plokkidena, info@mindz.ee mailto-link
- **Koolitajad & materjalid (`/koolitajad`)** — koolitajate kaardid (foto, nimi, sündmused, kontakt, LinkedIn, slaidid/materjalid ainult kui link olemas); placeholder-andmed
- **Tagasiside (`/tagasiside`)** — lihtne vorm: sündmuse valik (või "Üldine korraldus"), vabatekst, anonüümne; sündmuse detailvaatest avades on sündmus eelvalitud

## PWA (Home Screenile lisamine)

- Manifest-only lahendus: `public/manifest.webmanifest` (nimi, värvid, `display: standalone`), head-tägid rootis, ikoonid `public/`-sse
- Service workerit ega offline-režiimi ei lisata (brief seda ei nõua)

## Andmemudel

- Üks keskne `src/lib/events.ts` — Event tüüp (id, fientaEventId, title, speaker, description, startTime, endTime, date, venue, fientaUrl, calendarUrls, slidesUrl, registrationStatus) + demo-sündmused kõikidele 5 päevale
- Sisu ja UI eraldi; demo-andmed asendatavad hiljem päris Fienta andmetega

## Autentimine

- Lovable Cloud sisselülitamine + magic-link e-posti login (paroolita)
- Profiilitabelit esialgu ei looda — ainult login ja "Minu kava" struktuur demo-registreeringutega

## Tehnilised detailid

- TanStack Start failipõhised ruudid; iga leht oma `head()` meta-andmetega (eestikeelsed title/description/og)
- Bottom nav ja päis `__root.tsx`-is
- Kontroll: 375px ja 390px telefon + desktop; prioriteet telefon

## Märkused / järgmised etapid (mitte selles versioonis)

- Brief viitab lisatud kohaletuleku pildile, aga pilt ei olnud kaasas — Info leht tehakse tekstiga; kui pildi saadad, lisan selle
- Päris Fienta registreeringud, webhook ja täpsem tagasiside UX tulevad järgmises etapis
