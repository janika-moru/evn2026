# Kalendrisse lisamine (Google • Outlook • iCal)

## Eesmärk
Osaleja saab sündmuse ühe klõpsuga oma kalendrisse lisada — nii telefonis kui arvutis. Lahendus on Fienta-laadne: kolm valikut (Google, Outlook, .ics-fail Apple'i ja muudele kalendritele).

## Muudatused

1. **Uus abimoodul `src/lib/calendar.ts`** — genereerib sündmusest kolm linki:
   - Google: `calendar.google.com/calendar/render?action=TEMPLATE&...` (arvutis avaneb veeb, telefonis Google Kalendri äpp)
   - Outlook: `outlook.live.com/calendar/0/deeplink/compose?...` (katab Outlooki ja Microsoft 365)
   - iCal: sündmusest koostatakse `.ics`-faili sisu ja avatakse `data:`-URI-na — Apple Kalender ja telefoni sisemine kalender avavad selle otse
   - Kõik lingid kannavad: pealkiri, kuupäev, algus- ja lõppkellaaeg (Europe/Tallinn ajavööndis), koht (Lutsu 3, Tartu) ja lühikirjeldus.

2. **Uus komponent `src/components/AddToCalendar.tsx`** — väike diskreetne rida kolme tekstilingiga: „Google · Outlook · Apple (.ics)". Ei lisa visuaalset müra — sobib äpi minimaalse stiiliga.

3. **Sündmuse detailvaade (`/sundmus/$id`)** — kalendrilinkide rida lisatakse kellaaja/koha märkide alla, enne kirjeldust. Nähtav kõigile.

4. **Minu kava** — kalendrilinkide rida lisatakse iga registreeritud koolituse kaardile (RegisteredEventActions'i juurde), et osaleja saaks kirjas oleva koolituse kohe kalendrisse panna.

## Tehniline märkus
- `.ics`-faili ei salvestata serverisse — see koostatakse brauseris lennult sündmuse andmetest, seega pole vaja andmebaasi ega uusi tabeleid.
- Kellajad on andmetes ISO-vormingus; kalendrilinkide jaoks teisendatakse need Europe/Tallinn ajavööndi kohaselt õigeks.
- Muudatused on puhtalt esitluskihis; Fienta sünkroonimist ega registreeringute loogikat ei puudutata.

## Kontroll
- Ava sündmuse detail ja klõpsa kõiki kolme linki: Google avab eeltäidetud sündmuse, Outlook samuti, .ics laadib alla / avab kalendri.
- Kontrolli, et kellaaeg on õige (Eesti aeg) ja koht on Lutsu 3, Tartu.
- Kontrolli mobiilivaates, et lingirida ei riku kaardi paigutust.
