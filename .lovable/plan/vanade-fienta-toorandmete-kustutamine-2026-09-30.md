# Vanade Fienta toorandmete kustutamine

## Olukord (kontrollitud)
- Kõigil 562 registreeringul on Fienta täisandmed alles, st varasem ühekordne kustutamine ei jõudnud päris andmebaasi.
- Osalejate nimesid ei ole (0) ja tehnilistes logides toorandmeid ei ole (0).
- Praegune sünkroonimise kood uusi toorandmeid enam ei kirjuta; vanad lihtsalt jäid alles.

## Mida teen
1. Kustutan kõigilt registreeringutelt Fienta täisandmed. Alles jäävad meiliaadress, sündmus, pileti ja tellimuse number ning olek, nii et Minu kava töötab edasi samamoodi.
2. Kontrollin veel kord, et Fienta veebihaak ja CSV import ei salvesta toorandmeid, ja parandan, kui mõni seda teeb.
3. Lisan andmebaasi kaitse: kui mõni kood proovib tulevikus toorandmeid salvestada, jäetakse need automaatselt tühjaks.
4. Kontrollin lõpus uuesti, et toorandmetega registreeringuid on 0.

## Tehniline osa
- Andmemuudatus: `update registrations set raw_payload = null where raw_payload is not null;`
- Migratsioon: BEFORE INSERT OR UPDATE trigger `registrations` tabelil, mis seab `NEW.raw_payload := NULL` (sama `webhook_logs` jaoks).
- Üle vaadata `src/routes/api/public/fienta-webhook.ts` ja `admin.functions.ts` (CSV `raw` väli jäetakse serveris kasutamata).
