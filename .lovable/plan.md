# Küsimused koolitajale

## Mida kasutaja näeb
- **Minu kava** igal registreeritud koolituse kaardil kaks rohelist nuppu: „Esita küsimus koolitajale” ja „Vaata küsimusi koolitajale”.
- **Esita küsimus**: sama vormi stiil nagu tagasisidel: kasvav tekstikast, nimi (valikuline), valdkond (valikuline) ja „Lisa ekraanipilt”. Meiliaadressi välja ei ole.
- **Vaata küsimusi**: iga küsimus on oma kaardil (nagu Info lehe plokid). Ülemises servas nimi ja valdkond, näiteks „Janika, koolitused”. Kui nimi puudub, on seal „Anonüümne”. Ekraanipilt on väike pilt ja vajutades avaneb see suurelt (nagu galeriis).
- Oma küsimusel on väikesed 📝 (muuda) ja 🗑️ (tagasi võtta, enne küsitakse kinnitust). Teiste küsimusi muuta ei saa.
- Iga küsimuse juures on 👍 koos arvuga. Ühe vajutusega saab hääle anda ja teisega selle tagasi võtta. Oma küsimusele häält anda ei saa. Küsimused on järjestatud häälte arvu ja seejärel aja järgi.
- Küsimusi näevad ja neile hääli annavad ainult selle koolituse registreerunud ja sisseloginud osalejad.
- **Koolitaja link**: igal koolitusel on oma salajane link (nt `/kysimused/<kood>`). Selle saab kopeerida Admin lehelt ja koolitajale saata. Koolitaja näeb ilma sisselogimiseta küsimusi ja pilte suures, loetavas vaates. See vaade uueneb iga mõne sekundi järel ja on ainult vaatamiseks.

## Andmekaitse
- Ekraanipildid on privaatses hoidlas ja neid näidatakse ainult ajutiste linkide kaudu. Lubatud on ainult pildifailid, kuni 10 MB.
- Küsimused kustutatakse koos teiste andmetega 10.10.2027 toimuval EVN-i andmete puhastusel.
- Privaatsustingimustesse ja Info lehe „Andmetöötlus” plokki lisatakse üks lause küsimuste kohta.

## Tehnilised detailid
- Uued tabelid: `trainer_questions` (id, fienta_event_id, user_id, body, respondent_name, respondent_field, attachment_path, timestamps), `trainer_question_votes` (question_id, user_id, unique) ja `event_question_links` (fienta_event_id, token, mis luuakse juhuslikult). Igale tabelile lisatakse GRANT ja RLS.
- RLS: lugeda ja hääletada saab, kui kasutaja meilil on selle sündmuse aktiivne registreering (sama meilipõhine kontroll nagu registrations-tabelis). Muuta ja kustutada saab ainult `user_id = auth.uid()`.
- Kõik kirjutused tehakse serverifunktsioonide kaudu, mis kasutavad `requireSupabaseAuth` ja zodi valideerimist (tekst kuni 2000 märki ning nimi ja valdkond kuni 100 märki). Lisatakse lihtne kiirusepiirang.
- Uus privaatne salvestushoidla `question-images`, kuhu üleslaadimine on lubatud ainult kasutaja UUID-kausta. Koolitaja vaade saab allkirjastatud lingid avalikust serverifunktsioonist, mis kontrollib tokenit.
- Avalik leht `src/routes/kysimused.$token.tsx` (noindex). Komponendid: `TrainerQuestions.tsx` (nimekiri, muutmine, hääled) ja `AskQuestionForm.tsx`. Suure pildi vaates kasutatakse uuesti galerii dialoogi lahendust.
- Nupud lisatakse `RegisteredEventActions` komponenti. Nii ilmuvad need ka registreerunu sündmuse lehel, kooskõlas olemasoleva jagatud lahendusega.
- Admin lehele lisatakse iga koolituse juurde nupp „Kopeeri koolitaja link”.
- Funktsiooni `run_evn_cleanup` laiendatakse uute tabelitega ja puhastuse lõpp-punkti `question-images` hoidlaga.
