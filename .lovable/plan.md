# Registreerimata külastajale lihtsam vaade

## Eesmärk
Sündmuse lehel näeb registreerumata külastaja ainult „Registreeru" nuppu — kalendrisse lisamine, slaidid, tagasiside ja Fienta loobumise nupp on peidetud. Need ilmuvad alles siis, kui inimene on sisse loginud ja registreerunud. Minu kava eripakkumine näidatakse ainult sisseloginud osalejale, kellel on vähemalt üks registreering.

## Muudatused

### 1. Sündmuse leht (`src/routes/sundmus.$id.tsx`)
- `<RegisteredEventActions event={event} />` renderdatakse ainult siis, kui `status === "registered"` (ehk kasutaja on sisse loginud ja sellele sündmusele registreerunud).
- Registreerimata külastaja näeb: pealkiri, koolitaja, aeg, koht, kirjeldus, „Registreeru" nupp ja vabade kohtade arv — midagi muud.
- „Oled registreerunud ✓" rida ja tegevusnupud liiguvad ühte loogilisse blokki registreerunud kasutajale.

### 2. Minu kava eripakkumine (`src/routes/minu-kava.tsx`)
- `<SpecialOffer />` eemaldatakse lehe põhikomponendist ja viiakse `SignedIn` komponendi sisse.
- Kuvatakse ainult siis, kui `mine.length > 0` (vähemalt üks registreering).
- Sisselogimata kasutaja ja registreeringuteta kasutaja pakkumist ei näe.

### 3. „Sisse logides saad" nimekiri (`src/routes/minu-kava.tsx`)
- BENEFITS nimekirja lõppu lisatakse punkt: „eripakkumise Studio MindZilt".

## Kontroll
- Telefonivaade (390px): sündmuse leht ilma sisselogimata — ainult Registreeru; Minu kava ilma registreeringuteta — pakkumist ei näe.
- tsgo + build puhtad.
