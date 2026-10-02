# Loobu koolitusest nupp

## Mida kasutaja näeb
- Lingi „Loobumine Fientas" eemaldan QR-koodi aknast. QR-kood ja piletikood jäävad nii nagu praegu.
- Uus nupp **„Loobu koolitusest"** tuleb kaardile kohe „Näita QR-koodi" nupu alla, samas stiilis. See on nii Minu kava kaardil kui ka koolituse lehel sisseloginud registreerunule.
- Nupule vajutades avaneb kinnitusaken:
  - pealkiri „Kas soovid koolitusest loobuda?";
  - koolituse nimi ja aeg;
  - nupud „Jah, loobun" ja „Katkesta".
- Kiri saadetakse alles pärast „Jah, loobun" vajutamist. Seejärel on aknas tekst „Aitäh! Andsime korraldajale teada." ja nupp muutub mitteaktiivseks „Loobumine saadetud".
- Koolitus jääb Minu kavasse seni, kuni korraldaja tühistab pileti Fientas. Kohtade seisu uuendate ise käsitsi.

## Kiri info@mindz.ee aadressile
- Teema: **Kasutaja loobus kohast äpi kaudu**
- Sisu:
  - Kasutaja meil: <sisseloginud kasutaja meil>
  - Koolitus: <pealkiri>, <kuupäev ja kellaaeg>

## Tehnilised üksikasjad
- Uus kirjamall `withdrawal-notification.tsx` (fikseeritud saaja info@mindz.ee), registreeritud `registry.ts`-is.
- Uus serverifunktsioon `requestWithdrawal` (`src/lib/withdrawal.functions.ts`), kasutab `requireSupabaseAuth`:
  - meil võetakse sisselogimisest, mitte brauserist;
  - kontrollib, et kasutajal on sellele koolitusele aktiivne registreering;
  - topeltkirjad on välistatud (idempotency key = kasutaja + koolitus);
  - andmebaasi midagi ei salvestata.
- Uus komponent `WithdrawButton.tsx`, mis lisatakse `RegisteredEventActions` sisse mõlemas vaates. `TicketQr.tsx`-ist eemaldan Fienta lingi.
