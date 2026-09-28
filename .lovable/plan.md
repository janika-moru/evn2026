# Fienta webhooki 401 vea parandus

## Probleem
Fienta saadab registreerumise teated õigele aadressile õige võtmega, aga meie server vastab 401, sest salvestatud webhooki võti (FIENTA_WEBHOOK_TOKEN) on keskkonnast kadunud. Kontrollisin: server lükkab tagasi ka varem töötava võtme.

## Sammud
1. Salvestan FIENTA_WEBHOOK_TOKEN saladuse uuesti (sama väärtus, mis Fientas juba sisestatud — URL-i ei pea muutma).
2. Taaskäivitan arendusserveri, et saladus jõuaks käiku.
3. Kontrollin curliga, et õige võti annab 200 ja vale 401.
4. Palun kasutajal saata Fientas uus test või teha registreerumine uuesti.
5. Kontrollin /admin logidest, et payload jõudis kohale, ja kohandan parserit päris väljade järgi (osaleja e-post, tühistamise staatus).
6. Testin kogu voo: webhook → registrations → Minu kava kuvab "Oled registreerunud ✓".

## Tehniline detail
- Saladus: secrets--set_secret (FIENTA_WEBHOOK_TOKEN, olemasolev väärtus)
- Taaskäivitus: vite protsessi kill (supervisor tõstab automaatselt üles)
- Parseri kohandus: src/lib/registrations.server.ts (alles pärast päris payloadi nägemist)
