# Turvalisus, süsteemi töökindlus ja andmete minimeerimine

Järjekord valitud nii, et kõige suurem päris risk (domeeni rikkumine ja isikuandmed) saab parandatud enne ja kõige väiksema mõjuga seadistus jääb viimaseks.

## 1. Fienta toorandmete minimeerimine (GDPR)
Praegu salvestatakse iga Fienta pileti täielik JSON registreeringu juurde ning veebihaagi logidesse.
- Registreeringu juurde jäävad ainult: meiliaadress (normaliseeritud), sündmuse ID, pileti ja tellimuse ID, olek, allikas, loomis- ja muutmisaeg. Nime ei salvestata (Minu kava ei vaja seda).
- Uute kirjete puhul toorandmeid enam ei salvestata; olemasolevad toorandmed kustutatakse ühekordselt.
- Tehnilisse logisse salvestatakse toorandmete asemel ainult veateade ja sündmuse ID.
- Logide automaatne kustutamine: sünkroonimise ja veebihaagi logid kustuvad 30 päeva pärast (igapäevane automaatne puhastus).
- Admin-lehel kuvatakse logidest vaid aeg, sündmus ja viga.

## 2. Sisselogimiskirjade spämmikaitse
- Uuri, milline praegune tunnipõhine saatmispiirang kehtib, ning sea see mõistlikuks (nt 30 kirja tunnis kogu äpi peale — täiesti piisav ka esmaspäeva hommikuks, aga takistab massrünnakut). Ühe aadressi kohta kehtib juba sisseehitatud ~60-sekundiline ooteaeg.
- Minu kava vormil: kui kiri saadeti äsja, näidatakse selge teade „Uue lingi saad küsida umbes minuti pärast" ja nupp on selle aja lukus (loendur). Kui piirang on täis, kuvatakse „Proovi mõne minuti pärast uuesti".
- Botikaitset (Cloudflare Turnstile) praegu ei lisa — see nõuab eraldi kontot ja võtmeid ning lisab kasutajale sammu. Lisame selle ainult siis, kui logidest näeb kuritarvitamist.

## 3. Fienta sünkroonimise koormus ja töökindlus
Praegu kontrollitakse „kas viimane sünk oli alla minuti tagasi" ja märgitakse sünk alanuks kahe eraldi päringuga — kui mitu inimest avab lehe samal hetkel, võivad mitu sünki korraga käivituda.
- Asendame selle ühe andmebaasi funktsiooniga, mis võtab luku ühe sammuga: korraga saab sünki alustada ainult üks päring minutis, teised saavad kohe vastuse „vahele jäetud".
- Minu kava näitab registreeringuid alati andmebaasist; sünk käib taustal ega blokeeri lehte. Fienta tõrke korral kuvatakse viimati salvestatud andmed ja leht ei jookse kokku.
- Kui ühe sündmuse päring Fientas ebaõnnestub, ei muudeta selle sündmuse vabu kohti ega registreeringuid (vanad andmed jäävad).
- Kava lehte ja registreerumata külastajaid see ei puuduta — nemad Fientat ei koorma.

## 4. Privaatsuspoliitika sisend (hilisemaks)
Pärast punkte 1–3 koostan lühikese kokkuvõtte, mida ja kui kaua hoitakse: registreeringud kuni ettevõtlusnädala järeltegevuste lõpuni, tehnilised logid 30 päeva, tagasiside ja fotod kokkulepitud perioodi jooksul. Täpsed tähtajad kinnitad Sina.

## Tehniline osa
- Migratsioon: `raw_payload` jääb veeruna alles (nullable), kuid kood lõpetab kirjutamise; ühekordne `update ... set raw_payload = null`. Uus `try_start_fienta_sync(min_interval)` security definer funktsioon (advisory lock + insert-if-stale), kutsub ainult service_role. pg_cron töö `delete from webhook_logs where received_at < now() - interval '30 days'`.
- `registrations.server.ts`: eemalda raw_payload nii webhooki/CSV kui API teel; logi ainult error + event id; kasuta uut lukufunktsiooni.
- `admin.tsx`: eemalda raw_payload kuvamine.
- `use-my-registrations.ts`: loe andmed kohe, sünk eraldi taustapäringuna, mis pärast lõppu registreeringud uuesti laeb.
- `minu-kava.tsx`: 60 s loendur pärast saatmist; 429 / rate limit vea tõlgitud teade.
- Auth seadistus: `rate_limit_email_sent` ≈ 30/h.
