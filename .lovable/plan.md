# Iga tagasiside saadetakse meiliga info@mindz.ee postkasti

## Mis muutub
- Iga kord, kui keegi saadab tagasiside (koolitajale, kiitus, parandusettepanek), saadab äpp kohe kirja aadressile **info@mindz.ee**.
- Admin-vaadet juurde ei tehta.
- Kirja pealkiri algab alati sama märgiga, et postkastis oleks lihtne filtrit teha:
  - `[Tagasiside] Koolitaja: Kiia Paal – 9/10`
  - `[Tagasiside] Kiitus tiimile`
  - `[Tagasiside] Parandusettepanek`
- Kirjas on kõik, mida inimene sisestas: koolitus ja koolitaja, hinnang, tekst, nimi, roll, meiliaadress (kui ta selle andis), soov vastust saada ning märge „saadan pildi hiljem“.
- Kui inimene lisas foto, on kirjas link sellele fotole. Link kehtib 7 päeva, sest kirjadele faile manusena lisada ei saa.
- Kui inimene jättis meiliaadressi, saab Sinu postkastis vajutada „Vasta“ ja vastus läheb otse temale.
- Osaleja jaoks ei muutu midagi. Kui kirja saatmine peaks ebaõnnestuma, jõuab tagasiside ikkagi andmebaasi ja osaleja näeb tavalist kinnitust.

## Hea teada
- Iga kirja lõppu lisatakse automaatselt väike loobumislink. Seda ei saa välja lülitada. Ära sellele vajuta, muidu need kirjad enam ei tule.
- Kirjad saadetakse samalt aadressilt nagu sisselogimiskirjad (Studio MindZ, info@mindz.ee).

## Tehniline osa
- Seadistan äpi kirjade saatmise (mallide register ja saatmise abifunktsioon).
- Uus eestikeelne mall `feedback-notification` (MindZ roheline, valge taust) ja sellel on fikseeritud saaja info@mindz.ee.
- Uus serverifunktsioon `submitFeedback`:
  - kontrollib sisendit zod-iga;
  - salvestab rea `feedback` tabelisse;
  - foto korral loob 7 päeva kehtiva allkirjastatud lingi;
  - saadab kirja, kasutades `idempotencyKey` = feedback id;
  - kasutab tagastusaadressina osaleja meili, kui see on antud.
- `SpeakerFeedbackForm.tsx` ja `tagasiside.tsx` kasutavad otse andmebaasi lisamise asemel seda serverifunktsiooni. Foto üleslaadimine jääb nagu praegu.
- Olemasolevaid andmebaasi reegleid ei muudeta.
- Kontroll: saadan proovitagasiside ja vaatan saatmislogist, et kiri läks teele.
