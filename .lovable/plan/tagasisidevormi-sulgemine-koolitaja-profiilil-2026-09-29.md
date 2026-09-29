# Tagasisidevormi sulgemine koolitaja profiilil

## Probleem
Koolitaja profiilil avaneb „Saada tagasiside koolitajale" vorm nupuvajutusega, aga avatud vormi ei saa enam kinni panna — sulgemisvõimalus puudub.

## Lahendus
Lisada avatud vormi päisesse (pealkirja „Saada tagasiside koolitajale" kõrvale) sulgemisnupp:

- Hall „×" (sulge) ikoon/nupp vormi üleval paremal nurgas.
- Vajutamine sulgeb vormi ja näitab taas rohelist „Saada tagasiside koolitajale" nuppu.
- Vormi sisestatud andmed jäävad alles (nimi, roll, meil, foto on nagunii telefoni mälu eeltäites), nii et kogemata sulgemine ei kaota tööd.

## Tehniline detail
Fail: `src/components/SpeakerFeedbackForm.tsx` — avatud oleku päisesse lisatakse nupp, mis kutsub `setOpen(false)`. Muidu vormi sisu ega saatmise loogikat ei muudeta.
