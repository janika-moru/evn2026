# Minu kava: „Näita QR-koodi" ja „Loobu koolitusest" kõrvuti

Kaks nuppu, mis on praegu teine teise all, saavad olema samal real. „Näita QR-koodi" tuleb reale paremale serva, et parema käega pöidel oleks seda mugavav tabada. „Loobu koolitusest" jääb vasakule.

## Mida muutub

- Minu kava koolituse kaardil on QR-koodi ja loobumise nüüd kõrvuti, üks real, võrdsete laiustega.
- Nupud jäävad täpselt samasse kohta kaardil (kalendrivaliku alla, küsimuste nuppude ette) – ainult paigutus muutub.
- Nuppude välimus, tekst, kõrgus ja käitumine jäävad samaks: „Näita QR-koodi" avab pileti QR-koodi, „Loobu koolitusest" küsib kinnituse ja saadab kirja meile info@mindz.ee.
- Koolituse avalehe väike rida („QR-kood · Loobu koolitusest") jääb muutmata.

```text
enne                          pärast
─────────────                 ─────────────
[ Näita QR-koodi ]            [Loobu koolitusest] [Näita QR-koodi]
[ Loobu koolitusest ]                  vasak               parem
```

## Tehnilised detailid

- `src/components/RegisteredEventActions.tsx` (large haru): `fientaDialog` ja `<WithdrawButton event={event} large />` viiakse ühise mähise sisse `<div className="grid grid-cols-2 gap-2">`, kus loobumise nupp on esimene (vasak) ja QR-koodi nupp teine (parem); senine üks-rea-alla järjekord kaob.
- Mõlema large-haru nupi klassist `px-3` → `px-2` (QR-koodi nupp failis `src/components/RegisteredEventActions.tsx`, loobumise nupp failis `src/components/WithdrawButton.tsx`), sest mõõdetud tekstilaiud on 390px ekraanil (kaardi sisu 316px, poolitatuna 154px lahku): „Loobu koolitusest" 130px ja „Näita QR-koodi" 113px. `px-3` korral jääb tekstiruumi 128px ja pikem tekst miguks kahele reale; `px-2` korral 136px ja mõlemad mahuvad ühele reale.
- Kinnituse after „Loobumine saadetud" (u 140px) võib murduda kahele reale – see on lubatud lõppolek, nupp jääb samale kohale ja rida joondatuks.
- `small`-haru (koolituse avaleht) ja teised plokk (kalender, küsimused, tagasiside/slaidid) ei puuduta.

## Kontroll

- Playwright 390px ja 360px, sisseloginud janika@assisto.ee: nupud samal real, QR paremas servas, üks rida, ühtegi teksti murdumist ega üle ääre jooksmist.
- Klõps „Näita QR-koodi" avab QR-koodi akna; klõps „Loobu koolitusest" avab kinnitusakna (kinnitamata sulgemine kirja ei saada).
- tsgo ja build puhtad.
