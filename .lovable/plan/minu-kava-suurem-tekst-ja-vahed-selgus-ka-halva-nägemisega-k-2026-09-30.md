# Minu kava: suurem tekst ja vahed (selgus ka halva nägemisega kasutajale)

## Eesmärk

Minu kava leht muutub suurema kirja ja suuremate vahedega kaardiks, mida on lihtne lugeda ja kus nupule tabamine ei nõua silmitsemist. Muudatus kehtib **ainult Minu kava** lehel — Kava ja sündmuse detailvaade jäävad senise kujuga. Üks suurus kõigile, lülitit ei tule.

## Mis muutudes Minu kava vaates

- Koolituse pealkiri, kellaaeg/kuupäev, lühikirjeldus ja koolitaja nimi saavad suurema kirja.
- Koolitaja kontaktlingid (Koduleht, LinkedIn, Instagram) suurenevad ning nende vahe laieneb, et kõrvaline lingi peale vajutamine ei oleks lihtne viga.
- Nupud „Anna tagasisidet" ja „Vaata slaide" kasvavad kõrgemaks ja laiemaks ning nende vahe suureneb.
- Read „Lisa kalendrisse" ja „Ava Fienta" kasvavad samuti ning linkide tabamisalad muutuvad kõrgemaks.
- Kaardisisene ruum ja kaartevaheline vahe suureneb.
- Samas vormis suureneb ka Minu kava sisselogimisplokk: väljad, nupp „Saada sisselogimislink", „Sisse logides saad" nimekiri ja „Logi välja" nupp.

## Kuidas tehakse

Kuna kaarti ja toimingute rida kasutavad ka Kava ja sündmuse leht, ei muudeta nende vaikimisi väljanägemist. Selle asemel tuuakse sisse valikuline `large` märguanne, mille Minu kava lülitab sisse ja mis antakse edasi allkomponentidele.

- `src/components/EventCard.tsx` — uus `large?: boolean` prop, mis määrab kaardi sisu mõõdud ja annab märguande edasi `SpeakerLinks`-ile.
- `src/components/SpeakerLinks.tsx` — `large` mõjutab pildi suurust, nime ja kontaktlingide suurust ning lingide tabamisalade kõrgust.
- `src/components/RegisteredEventActions.tsx` — `large` mõjutab nuppude kõrgust, teksti, ikoone, ridade vahele ja jagavat joont; annab märguande edasi `AddToCalendar`-ile.
- `src/components/AddToCalendar.tsx` — `large` mõjutab kalendrilinkide suurust ja tabamisalasid.
- `src/routes/minu-kava.tsx` — lülitab `large` sisse oma kaartidel, suurendab kaartevahelise vahe ning kohendab sisselogimisploki, tühja oleku ja „Logi välja" nupu mõõdud.

Kuskile ei kirjutata uut värvi ega brändi elementi — kasutatavad on olemasolevad toonid ja ümarused.

## Mõõdud

| Element | Praegu | Uus |
| :--- | :--- | :--- |
| Koolituse pealkiri | 16px | 20px |
| Kuupäev ja kellaaeg | 14px | 16px |
| Lühikirjeldus | 14px | 17px, suurem reavaheline |
| Koolitaja nimi | 14px | 17px |
| Kontaktlingid | 12px | 15px, laiem vahe, kõrgem tabamisala |
| „Vabu kohti" | 14px | 16px |
| „Oled registreerunud" märk | 12px | 14px |
| Toimingute nupud | 40px kõrge, 12px tekst | 52px kõrge, 15px tekst |
| „Lisa kalendrisse" / „Ava Fienta" read | 12px | 15px, linkide tabamisala vähemalt 44px kõrge |
| Kaardi sisu ja kahe kaardi vahe | 16px / 12px | 20px / 16px |
| Sisselogimise nupp | 16px tekst | 17px tekst, vähemalt 52px kõrge |

Kõik puutetundlikud elemendid on vähemalt 44×44 px, mis on telefoni jaoks usaldusväärne miinimum.

## Mis ei muutu

- Kava leht, sündmuse detailvaade, Koolitajad, Info ja Tagasiside leht jäävad täpselt samasuguseks.
- Sisu, järjekord ja sõnastused ei muutu — ainult suurus ja ruum.
- Uusi seadistusi, lüliteid ega täiendavaid ekraane ei lisata.

## Kontroll

1. Mobiilivaade 390 px: Minu kava kaartide mõõdud loetakse brauserist (pealkiri 20px, nupud 52px, kontaktlingid 15px) ja tehakse ekraanipilt.
2. Samas vaates kontrollitakse, et Kava kaartide mõõdud on endiselt senised (pealkiri 16px, kontaktlingid 12px).
3. Veendutakse, et ükski kolmest kalendrilingist ega Fienta lingist ei ole lõigatud ega kahe rea vahele killustatud.
4. Typecheck ja ehitus peavad olema puhtad.
