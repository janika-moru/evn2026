# Koolitaja leht: Küsimused, Tagasiside ja slaidide link

## Mida koolitaja näeb (tartu.mindz.ee/<eesnimi>)
- Pealkirja all koolituse nimi ja aeg nagu praegu.
- Kaks vahelehte: **Küsimused** (praegune vaade, uueneb iga 5 s järel) ja **Tagasiside**.
- Tagasiside vahelehel on iga tagasiside eraldi kastis nagu küsimustel: üleval nimi ja roll (või „Anonüümne“), siis hinnang 1–10, tekst, meiliaadress ja foto, mis avaneb vajutades suurelt. Uuemad on eespool. Kui tagasisidet pole, on kirjas „Tagasisidet veel ei ole.“
- Lehe all on plokk **„Lisa slaidide link“**: lahter lingi jaoks, lahter PIN-koodi jaoks ja nupp „Salvesta“. Kui link on juba olemas, on see näha ja seda saab muuta või eemaldada.

## Osalejate vaade
- Kui koolitaja on lingi lisanud, viib Minu kava ja koolituse lehe nupp „Vaata slaide“ sellele lingile. Kui koodis on slaidid juba olemas, jääb kehtima koolitaja lisatud link.
- Kui linki pole, jääb nähtavale „Slaide veel pole“.

## PIN-kood
- Igal koolitaja lingil on oma 4-kohaline kood. Pärast valmimist saadan Sulle nimekirja (link + kood), et saaksid need koolitajatele edasi saata.
- Kui kood on vale, ei salvestata midagi. Pärast mitut järjest valesti sisestatud koodi tuleb oodata.

## Privaatsus
- Meiliaadress ja foto on näha kõigile, kellel on koolitaja link (Sinu valik). Täiendan privaatsustingimusi ja Info lehe „Andmetöötlus“ plokki ühe lausega: tagasiside koos nime, meiliaadressi ja fotoga jõuab koolitajani tema lingi kaudu.
- Lisatud slaidide lingid kustuvad 10.10.2027 koos ülejäänud andmetega.

## Tehnilised detailid
- Uus tabel `trainer_slides` (fienta_event_id PK, url, updated_at). RLS on sees ja ligipääs on ainult service_role-il. Tabel lisatakse ka `run_evn_cleanup()` hulka.
- PIN-koodid salvestatakse serveri saladusena `TRAINER_PINS` (JSON slug→pin). Need genereeritakse ja kuvatakse Sulle üks kord.
- `src/lib/questions.functions.ts`:
  - `publicFeedback({slug})` – tagasiside, kus event_id vastab slugi koolitusele. Iga vastuse fotole luuakse 1 h kehtiv allkirjastatud link.
  - `getSlides({slug})`
  - `setSlides({slug, pin, url})` – kontrollib zodiga, et link on http(s). Kontrolli võrdlus on ajakindel. Valesid katseid piiratakse webhook_logs abil.
- Kiia Morning Mindseti 5 slugi kuuluvad samale seeriale. Iga slug on seotud oma sündmusega ja tagasiside filtreeritakse vastavalt.
- `getSlidesMap()` on avalik GET-funktsioon. Selle loeb `RegisteredEventActions` ja kirjutab üle `event.slidesUrl`.
- `src/routes/$slug.tsx`: shadcn Tabs, uus komponent `TrainerFeedbackCard` ja slaidide vorm.
