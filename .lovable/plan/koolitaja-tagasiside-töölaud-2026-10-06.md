# Koolitaja tagasiside töölaud

## Mida koolitaja näeb

Aadress: `tartu.mindz.ee/tagasiside/<eesnimi>` (samad nimed ja erandid nagu küsimuste lingil: katrinv, katrind, papsid, kukkumiskaitse; Kiial üks leht kõigi tema sessioonidega). Suured ja väikesed tähed ei loe.

1. **Koodi küsimine** — lehe avamisel küsitakse koolitaja isiklikku koodi (6 märki). Õige koodi järel jääb see seadmesse meelde, et iga kord uuesti ei peaks sisestama. Vale kood → „Vale kood".
2. **Kokkuvõte** — keskmine hinne suurelt (nt „9,2 / 10") ja **tulpdiagramm hinnetest 1–10**: iga tulba all number, kõrgus = mitu inimest selle hinde andis, tulba kohal arv.
3. **Tagasisidekaardid** — iga tagasiside eraldi puhtas, ekraanipildisõbralikus kaardis: hinne (tähtedena/numbrina), tsitaat suures kirjas, all nimi ja roll (nime puudumisel „Osaleja"). Studio MindZ väike märk kaardi nurgas. **Meiliaadressi ega fotosid ei näidata.**
4. Tühja teksti (ainult hinne) tagasisided lähevad ainult diagrammi, kaartidena neid ei näidata.

## Koodid

- Igale koolitajale luuakse unikaalne kood. Koodid hoitakse serveris, mitte äpis.
- Pärast valmimist saad minult nimekirja „koolitaja — link — kood", et saata need meiliga.

## Turvalisus

- Tagasiside tuleb ainult serverist ja ainult õige koodi korral; kood võrreldakse serveris.
- Koodi äraarvamise vastu piirang (liiga palju valesid katseid → ootamine).
- Leht on otsingumootoritele peidetud.

## Mida see ei muuda

- Küsimuste link `/<eesnimi>` jääb nagu on.
- Tagasiside vormid ja info@mindz.ee teavitused jäävad samaks.
- Slaidide lisamise võimalust praegu ei tehta.

## Tehniline osa

- Uus route `src/routes/tagasiside.$slug.tsx` (olemasolev `/tagasiside` leht jääb). Slugide kaardistus taaskasutab `QUESTION_SLUGS` loogikat, aga koondab koolitaja kõik sündmused (speaker → events via `src/lib/events.ts`).
- Koodid: üks server-only secret `TRAINER_CODES` (JSON `{slug: code}`), genereeritakse ja salvestatakse turvaliselt; nimekiri antakse kasutajale.
- `src/lib/trainer-feedback.functions.ts`: `getTrainerFeedback({slug, code})` — timing-safe võrdlus, piirang vigaste katsete arvule (webhook_logs-laadne loendur või mälupõhine + DB), loeb `feedback` tabelist `feedback_type='training'` ja `event_id in (koolitaja sündmused)` supabaseAdmin'iga, tagastab ainult rating, message, respondent_name, respondent_field, created_at (ilma contact/attachment).
- Diagramm puhta CSS/flexiga brändi tokenitega (ilma uue teegita).
- Kood localStorage'is võtmega slugi järgi; vale vastuse korral kustutatakse.
- AGENTS.md: reegel koolitaja töölaua koodide ja andmete kohta. Mälus olev „töölaud hiljem" piirang eemaldatakse, kuna kasutaja nüüd seda soovib.
