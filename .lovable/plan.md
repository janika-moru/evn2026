# Nädala tagasiside: jaotus koolituse päeva järgi

## Vastus küsimusele
Jah — leht /tagasiside/nadal loeb tagasisidet iga avamisel otse andmebaasist (kõik alates 5. oktoobrist, ülempiiri pole), nii et ka praegu antav tagasiside jõuab sinna kohe.

## Mida muudan (ainult leht /tagasiside/nadal)
1. **Päevade kaupa** jaotus ja päevafilter lähtuvad **koolituse toimumise päevast**, mitte tagasiside andmise kuupäevast. Nt reedel antud tagasiside teisipäevasele koolitusele läheb „T 6.10" alla.
2. **Kiia Morning Mindset** (hommikused sessioonid E–R): tema tagasiside loetakse **iga päeva** ritta ja päevafiltris kuvatakse see iga valitud päeva all. Üldarvudes (ülemised kastid, tulpdiagramm, koolitajate tabel) loetakse iga tagasiside endiselt **üks kord**.
   Kiia reedene päevakoolitus „Miks kohvipaus…" on eraldi koolitus ja läheb ainult reede alla.
3. **Kiitused ja ettepanekud** stuudiole/tiimile ei ole seotud ühegi koolitusega — need jäävad päevade jaotuses andmise kuupäeva järgi (pärast nädalat antud → „Hiljem").
4. „Hiljem" rida asendub reaga **„Jooksev tagasiside Studio MindZile"** — sinna lähevad pärast nädalat antud tiimi-tagasisided; koolituste tagasisided jaotuvad alati E–R vahel.

## Tehniline detail
- Uus abifunktsioon `feedbackDays(row)` failis src/routes/tagasiside_.nadal.tsx: kui eventId kuulub Morning Mindset seeriasse (seriesUrl kaudu src/lib/events.ts) → kõik 5 päeva; kui eventId on olemas → `getEvent(eventId).date`; muidu `tallinnDate(createdAt)` (> 9.10 → "later").
- Päevaloendus ja `inDay` filter kasutavad `feedbackDays(row).includes(day)`.
- Kontroll brauseris: päeva valimisel tulevad õiged koolitused, Kiia hommikused tagasisided ilmuvad iga päeva all.
