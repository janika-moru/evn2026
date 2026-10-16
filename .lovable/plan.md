# Tiimi tagasiside: ainult Google'i arvustus

## Mida muutub

Roheline „Jäta tagasiside tiimile" plokk (Minu kava ja Tagasiside leht) jääb alles, aga sellest võetakse ära kaks nuppu:

- „Kiidan korraldust, ruume või tiimi"
- „Parandusettepanek korraldusele, ruumidele või tiimile"

Ploki sisse jäävad: pealkiri, meeskonna pisipildid (Kiia, Janika, Selje, Liisi) ja roosa „Lisa Google arvustus" nupp.

```text
enne                      pärast
------------------------- -------------------------
Jäta tagasiside tiimile   Jäta tagasiside tiimile
[Kiia][Janika][Selje]     [Kiia][Janika][Selje]
[ Kiidan... ]             [ Lisa Google arvustus ]
[ Parandus... ]
[ Lisa Google arvustus ]
```

## Mille peaksid teadma

- **Kirjalikku tiimi tagasisidet ei saa enam äpi kaudu jätta.** Need kaks nuppu olid ainsad kohad, kust see vorm avanes. Koolitajate ja koolituste tagasisidevormid (hinnang 1–10 + tekst) jäävad täpselt samaks.
- **Midagi ei kustutata.** Juba laekunud 10 stuudiole jäetud kirjet (9 kiitust, 1 ettepanek) jäävad nähtavaks aadressidele /tagasiside/mindz ja /tagasiside/nadal ning admini töölaule. Andmebaasi ega registreeringuid ei muudeta.
- **Läbipaistvusteos** („Nimi ja meiliaadress on vabatahtlikud...") kaob koos tiimi vormiga, kuid jääb alles koolitaja vormides, Tagasiside lehe allosas ja Info „Andmete hoidmine" plokis.

## Tehniline teostus

- `src/components/StudioFeedbackSection.tsx` — eemaldatakse vormi olekud ja saatmise loogika (`sendFeedback`, `submitFeedback`, `loadFeedbackProfile`/`saveFeedbackProfile`, `supabase.auth.getSession`, robotilõks, `startedAt`, `type`/`message`/`name`/`field`/`contact`/`remember`/`sending`/`sent`/`error`), samuti kasutamata ikonid (`ArrowLeft`, `CheckCircle2`, `HeartHandshake`, `Lightbulb`). Järele jääb `MeeskondRow` + `GOOGLE_REVIEW_URL` nupp. `returnLabel` prop kaob, kuna vormi enam ei avata.
- `src/routes/minu-kava.tsx` — `StudioFeedbackSection` kutsumiselt eemaldatakse `returnLabel` argument; `className="mt-6 mb-6"` jääb.
- `src/routes/tagasiside.tsx` — samast lehest eemaldatakse „Kiidan"/„Parandusettepanek" harud (`FType` ja `TYPES` vastavad read, `else`-haru tekstivorm, `message`/`msgRef` ja nendega seotud efektid), et keegi ei saaks neid enam kuskilt avada. Koolituse hinnanguvorm jääb puutumata.
- `src/lib/feedback.functions.ts` ja andmebaas — muutmata, et senised kirjed jääksid loetavaks.
- Mälu ja reeglid uuendatakse: `mem://design/tagasiside-avalehe-jarjekord` (kaks valget rida enam ei kehti), `mem://design/tiimi-tagasiside-vorm-sama-lahendus` (asendatakse: tiimi vorm eemaldatud, ainult Google'i arvustus), `mem://features/tagasiside-labipaistvusteos` (tiimi vormi kohta eemaldatakse, ülejäänud kohad jäävad).

## Kontroll

- `bunx tsgo --noEmit` ja build peaksid olema puhtad; `bunx vitest run` (olemasolevad testid) peavad jääma roheliseks.
- Playwright: `/minu-kava` ja `/tagasiside` — „Kiidan" ja „Parandusettepanek" tekstid ei tohi lehtedest leiduda, meeskonna pildid ja „Lisa Google arvustus" peavad olema nähtavad, Google'i nupp avab `g.page` arvustuse.
- Lehtedel ei tohi tekkida konsoolivigu ega horisontaalset kerimist.
- Muudatus jõuab tartu.mindz.ee aadressile alles pärast avaldamist.
