# Minu kava kaardi selgem paigutus

## Eesmärk

Minu kava koolituskaardid muutuvad rahulikumaks ja selgema järjeks: kalendrilinkid tulevad otse kirjelduse alla, küsimuste nupud jäävad enne tagasiside nuppe ning koolitaja nimi joondub tema pildiga. Kava leht, sündmuse detailvaade ja kõik nuppude stiilid jäävad muutumata.

## Mis muutub

1. **Koolitaja nimi ja pilt.** Nime pealt eemaldatakse 2px üles tõstva nihe, nii et nime rea ülemine äär on täpselt pildi ülemise äärega samal kõrgusel (nimi liigub 2px alla). Kontaktlingid, pildi suurus ja iconid jäävad samaks.

2. **Ridade järjekord kaardis.**
   ```text
   pealkiri
   koolitaja pilt + nimi + kontaktlingid
   kirjeldus
   Lisa Google'i   Lisa Outlook'i   Lisa Apple'i
   Ava Fienta: QR-kood ja loobumine
   Esita küsimus koolitajale | Vaata küsimusi koolitajale
   Anna tagasisidet | Vaata slaide
   ```
   Kalender tõuseb seega kirjelduse alla, tagasiside ja slaidid lähevad kasti kõige alla.

3. **Kalendrilinkide tekst.** Ühel real on kolm alla joonitud linki: „Lisa Google'i", „Lisa Outlook'i", „Lisa Apple'i" (15px kiri, iga lingi tabamisala vähemalt 44px). Eraldi silt „Lisa kalendrisse" ja selle kõrval olev kalenderikoon jäävad sellelt realt välja, kuna „Lisa" on nüüd iga lingi sees.

   Põhjendus: 390px telefoni kaardi sisu on 316px laiune. „Lisa Google kalendrisse" + „Lisa Outlook'i kalendrisse" + „Lisa Apple kalendrisse" võtaksid koos 516px ja isegi „Google'i kalender" kuju 375px — üks rida ei mahu. Valitud lühem kuju võtab 269px ja mahub ka kitsamale ekraanile.

## Kus tehakse

- `src/components/SpeakerLinks.tsx` — Minu kava harus eemaldatakse nime juurest üles tõstev nihe.
- `src/components/AddToCalendar.tsx` — Minu kava harus üks rida kolme täistekstiga lingiga; väiksem (Kava) variant jääb samaks.
- `src/components/RegisteredEventActions.tsx` — Minu kava harus uus järjekord: kalender → Fienta → küsimused → tagasiside ja slaidid.

## Kontroll

1. Telefonivaade 390px ja 360px, sisselogitud kontoga janika@assisto.ee: kalendrilinkidel üks rida, miski ei murdu ega ulatu kaardist välja; järjekord ülaltoodu järgi; nimi ja pilt joondunud.
2. Kava lehe ja sündmuse detailvaate välimus ei muutu.
3. Typecheck ja ehitus puhtad.
