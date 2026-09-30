# Minu kava kaardi rahulikum paigutus

## Eesmärk

Muuta ainult **Minu kava** koolituskaardid vähem kirjuks, jättes suure kirja ja suured puutealad alles. Kava ja sündmuse detailvaade ei muutu.

## Muudatused

- Kuupäeva ja kellaaja kohale ei lisata ruumi; nende alla tuleb selgem vahe enne pealkirja.
- Koolitaja pilt, nimi ja kontaktlingid moodustavad ühe kompaktse rea: nimi ning lingid on pildi kõrval ja nende omavaheline vahe väheneb.
- Kirjelduse järel tuleb keskele joondatud „Lisa kalendrisse”.
- Google, Outlook ja Apple (.ics) kuvatakse selle all eraldi suurte piirjoonega nuppudena. Nuppude taust jääb kaardi roosa taustaga samaks.
- „Ava Fienta: Pilet · QR-kood · loobumine” muutub üheks suureks, keskele joondatud piirjoonega nupuks, mille taust jääb kaardi taustaga samaks.
- Olemasoleva kujundusega „Anna tagasisidet” ja „Vaata slaide” nupud liiguvad kaardi kõige viimaseks.

## Tehniline lahendus

- `SpeakerLinks` saab Minu kava suure vaate jaoks tihedama nime ja linkide paigutuse.
- `AddToCalendar` saab suure vaate jaoks eraldi keskjoonduse ning kolm nuppu.
- `RegisteredEventActions` järjestab Minu kava vaates kalender → Fienta → tagasiside ja slaidid; muudes vaadetes jääb senine järjestus ja kujundus alles.
- `EventCard` muudab ainult suure vaate kuupäeva-alust vahet.

## Kontroll

- Kontroll telefoni 390 px vaates sisselogitud kasutajaga.
- Kõik kalendri-, Fienta-, tagasiside- ja slaidinupud jäävad vajutatavaks ning tekst ei murdu kohmakalt.
- Kava ja sündmuse detailvaate välimus ei muutu.
