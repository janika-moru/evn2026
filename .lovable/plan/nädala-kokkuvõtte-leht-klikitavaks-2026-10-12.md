# Nädala kokkuvõtte leht klikitavaks

## Eesmärk
Lehel **/tagasiside/nadal** saab päeva või koolitaja peal klõpsata ning all olev tagasiside filtreerub vastavalt. Praegu on päevade ribad ja koolitajate tabel ainult vaadatavad numbrid.

## Mida muudan (src/routes/tagasiside_.nadal.tsx)

1. **Päevade kaupa** plokk muutub klikitavaks:
   - Iga päeva rida (E 5.10 … R 9.10 ja „Hiljem") on nupp.
   - Valitud päev on visuaalselt esile tõstetud (roheline raam/taust, nagu praegu tabinuppudel).
   - Uuesti klõpsates valik tühistub (näidatakse jälle kõiki).

2. **Koolitajad** tabel muutub klikitavaks:
   - Iga koolitaja rida on nupp.
   - Valitud koolitaja tõstetakse esile; uuesti klõpsates valik tühistub.

3. **Filtreerimine all olevates nimekirjades:**
   - Kui päev on valitud, näidatakse ainult selle päeva tagasisidesid (kõigis kolmes vaates: Koolitused / Kiitused / Ettepanekud).
   - Kui koolitaja on valitud, näidatakse ainult tema koolituse tagasisidesid; samal ajal lülitub alumine vaade automaatselt „Koolitused" peale.
   - Päeva- ja koolitajafilter saavad koos kehtida (nt „K 7.10" + „Kadri Leppik").
   - Kui filtri tulemus on tühi, kuvatakse lühike teade „Selle valikuga tagasisidet pole."

4. **Aktiivse filtri näitamine:** nimekirja kohal ilmub väike rida, nt „K 7.10 · Kadri Leppik ✕" — ✕-ist saab filtri ühe klõpsuga eemaldada.

## Mida ei muuda
- Ülemised kokkuvõttekastid, tulpdiagramm ja numbrid jäävad alati kogu nädala koondseisuks (need ei filtreeru).
- Andmete laadimine ja turvalisus jäävad samaks — filtreerimine toimub juba laetud andmete peal, uusi päringuid ei tehta.

## Tehniline detail
- Kaks uut olekut lehel: `dayFilter` ja `speakerFilter` (string | null).
- Filtreerimine kasutab olemasolevat `tallinnDate()` abifunktsiooni ja sama koolitajanime loogikat, mis praegu tabeli ridade koostamisel.
- Testin brauseris: klõpsan päeva ja koolitajat, kontrollin, et nimekiri filtreerub ja filtri eemaldamine taastab täisnimekirja.
