# Slaidide leht /slaidid

Uus avalik leht aadressil **tartu.mindz.ee/slaidid**, kust leiab kõikide koolitajate slaidid ja lisamaterjalid. Leht avaneb otse lingiga (midagi menüüsse ei lisata).

## Mida lehel näidatakse

- **Kõik koolitused ajajärjekorras** (esmaspäev → reede), iga rida koos:
  - koolitaja nimi (pallikesega samas stiilis, duodel firma nimi nt „Papsid")
  - koolituse pealkiri ning päev ja kellaaeg
  - link **„Vaata slaide"** (või „Töövihik" Maril), kui materjal on olemas
- Koolitustel, kus slaide pole, selle asemel **hall märge „Slaide pole"** (nt Ulvi Kala, Kiia päevane koolitus, Epp Kärsini vestlusõhtu, Ivar Raav).
- Morning Mindseti korduvad hommikused sessioonid kuvatakse **ühel real** (nagu Koolitajate lehel), halli märkmega, sest slaide pole.
- **Kukkumiskaitse** rida halli märkmega „Koolitus jäi ära" (slaidid ei tule).
- Lõpuõhtu (võrgustumine, mitte koolitus) lehel ei ole.

Kujundus järgib äpi praegust stiili: minimaalne, ümarad kaardid, Poppins, bränditoodid (roheline/roosa) — mitte midagi muud ei muudeta.

## Tehnilised sammud

1. **`src/lib/events.ts`** — uus abifunktsioon `slidesPageRows()`, mis koostab slaidilehe read:
   - käib EVENTS läbi ajajärjekorras (kuupäev + kellaaeg);
   - jätab välja lõpuõhtu (202960);
   - koondab Morning Mindseti seeria (seriesUrl) üheks reaks;
   - iga rea juures: `speaker` (kuvatav nimi), `title`, `date`, `startTime`, `hasSlides` (slidesUrl või materialsUrl olemasolu), `materials` (url + silt, kui on), `cancelled` (Kukkumiskaitse).
2. **`src/routes/slaidid.tsx`** — uus staatiline route `createFileRoute("/slaidid")`:
   - `head()`: pealkiri „Slaidid — Studio MindZ 2026", kirjeldus, og:title/og:description/og:type/twitter:card, canonical `/slaidid`;
   - lihtne nimekiri kaartidena, lingid avanevad uues vaates (`target="_blank"`), kõik tekstid eesti keeles.
3. **Kontroll:** tüübikontroll ja build OK; leht avaneb aadressil `/slaidid` ja read koos linkidega on õiged (Playwrighti kiirkontroll).

Pärast avaldamist töötab leht aadressil tartu.mindz.ee/slaidid.
