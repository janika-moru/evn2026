# Minu kava: sisselogimise kutse ette, tühi sõnastus paremaks

## Mida muutub

**Sõnastus.** Sisselogimise kastis on pealkirjana praegu „Vaata oma kava". Selle asemele tuleb **„Logi sisse, et vaadata slaide ja anda tagasisidet"**. Allpool jääb senine selgitus „Logi sisse sama meiliaadressiga, mida kasutasid Fientas registreerumisel." ja „Sisse logides saad:" nimekiri.

**Sektsioonide järjekord.**

```text
EI OLE SISSE LOGINUD                ON SISSE LOGINUD
-------------------------------   -------------------------------
Koolitajate slaidid ja tagasiside  Koolitajate slaidid ja tagasiside
Logi sisse, et vaadata slaide...   [ Roheline tiimi tagasiside plokk ]
[ Meiliaadress + Saada link ]      [ e-mail + Logi välja ]
[ Sisse logides saad: ... ]        [ Koolituste kaardid ruudustikus ]
[ Roheline tiimi tagasiside plokk ]  [ Ettevõtlusnädala eripakkumine ]
```

- **Sisselogimata inimese** jaoks on kõigepealt sisselogimise kutse (ja link/ kood), alles tema all roheline „Jäta tagasiside tiimile" plokk meeskonna piltide ja Google'i arvustusega.
- **Sisseloginud inimese** jaoks liigub tiimi tagasiside plokk kõige ülemiseks —enne oma koolituste kaarte.
- Lehe pealkiri „Koolitajate slaidid ja tagasiside" jääb mõlemal juhul kõige ette.

## Tehniline teostus

- `src/routes/minu-kava.tsx`
  - `MySchedulePage`: `StudioFeedbackSection` ei ilmu enam alati pealkirja järele. Laadimise ajal näidatakse endiselt „Laen…". Seejärel kaks haru: sisseloginud → `StudioFeedbackSection` + `SignedIn`; sisselogimata → `SignInCard` + `StudioFeedbackSection` (allpool, `className="mt-8"`).
  - `SignInCard`: `h2` tekst „Vaata oma kava" → „Logi sisse, et vaadata slaide ja anda tagasisidet".
- `src/components/StudioFeedbackSection.tsx` ja `src/routes/tagasiside.tsx` — muutmata (Tagasiside lehel jääb plokk samasse kohta).
- Mälu: `mem://design/tagasiside-avalehe-jarjekord` rida „Sama roheline plokk on ka Minu kava lehel koolituste kaartide ees" täpsustatakse — Minu kavas on plokk sisseloginul kaartide ees, sisselogimata sisselogimise kutse all.

## Kontroll

- Playwright (390px): sisselogimata olekus „Logi sisse, et vaadata slaide ja anda tagasisidet" enne „Jäta tagasiside tiimile" plokki; „Vaata oma kava" teksti ei leidu.
- Playwright sisseloginuna (janika@assisto.ee): „Jäta tagasiside tiimile" plokk enne koolituste kaarte.
- `bunx tsgo --noEmit`, `bunx vitest run` ja build peavad olema puhtad; konsoolivigu ja horisontaalset kerimist ei tohi tekkida.
- Muudatus jõuab tartu.mindz.ee aadressile alles pärast avaldamist.
