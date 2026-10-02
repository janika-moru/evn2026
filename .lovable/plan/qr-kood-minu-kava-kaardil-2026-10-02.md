# QR-kood Minu kava kaardil

## Mida kasutaja näeb
- Minu kava kaardil asendub nupp „Ava Fienta: QR-kood ja loobumine" nupuga **„Näita QR-koodi"**. Kujundus ja asukoht jäävad samaks.
- Nupule vajutades avaneb aken:
  - suur QR-kood valgel taustal, et kaamera loeks selle ka heleda ekraaniga;
  - selle all piletikood tekstina (nt `8JHQCQ7HG6`), kui koodi tuleb sisestada käsitsi;
  - väike hall link „Loobumine Fientas", mis avab `fienta.com/u/tickets`.
- Kui ühel inimesel on samale koolitusele mitu piletit, näidatakse kõik QR-koodid üksteise all.
- Kui koodi veel pole (sünk käib alles), on aknas tekst „Piletikood ilmub mõne hetke pärast" ja Fienta link.
- Kohapeal skännid koode Fienta piletikontrolli äpiga. Pilet märgitakse Fientas kasutatuks.
- Koolituse lehel jääb praegune väike rida, kuid „QR-kood ja loobumine" avab sama akna.

## Tehnilised üksikasjad
- Andmebaasi muudatus: `registrations` tabelisse lisandub veerg `ticket_code text` (võib olla tühi). Kehtivad senised ligipääsureeglid: osaleja näeb ainult oma meiliga seotud ridu.
- `syncFromFientaApi` (`src/lib/registrations.server.ts`) salvestab iga pileti `code` välja veergu `ticket_code`. Toorandmeid endiselt ei salvestata.
- `useMyRegistrations` loeb lisaks `ticket_code` ja `status`; tühistatud või tagasi makstud pileteid ei näidata.
- QR-kood luuakse brauseris paketiga `qrcode`, nii et väliseid päringuid ei tehta. QR-kood sisaldab ainult piletikoodi.
- `fientaDialog` failis `RegisteredEventActions.tsx` saab uue sisu. Uus komponent on `TicketQr.tsx`.
- Piletikoodid kustutatakse 10.10.2027 koos registreeringutega. See töötab juba praeguse puhastusega.
- Kontrollin tulemust Playwrightiga janika@assisto.ee kontoga laiusel 390px.
