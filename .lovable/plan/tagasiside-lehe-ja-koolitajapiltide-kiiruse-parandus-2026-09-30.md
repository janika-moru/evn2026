# Tagasiside lehe ja koolitajapiltide kiiruse parandus

## Probleem

Koolitajate ja tiimi portreed on täissuuruses PNG-failid (nt üks portree on 2,4 MB). Tagasiside lehel laaditakse neid korraga üle 20 — telefon tõmbab alla kümneid megabaite, et näidata 56-pikslisi pisipilte. Seetõttu avaneb leht aeglaselt.

## Lahendus

### 1. Väikesed pisipildid (peamine võit)

- Teen igast koolitaja- ja tiimipildist 128×128 px WebP-pisipildi (mõne kilobaidi suurune) skriptiga, mis kasutab olemasolevaid faile.
- Pisipildid lähevad kausta `public/speakers/thumbs/` ja laevad koos äpiga.
- `src/lib/events.ts`: lisan koolitajatele ja tiimiliikmetele välja `thumbUrl` (pisipilt), `imageUrl` jääb täissuuruses profiililehe jaoks.
- Pisipilte kasutatakse: Tagasiside lehe pallikesed, Info lehe meeskonnarida, Kava/Minu kava koolitaja read, koolitajate nimekiri.

### 2. Brauseri optimeeringud kõigile piltidele

- `loading="lazy"` ja `decoding="async"` kõigile pisipiltidele — pildid laevad alles siis, kui kasutaja nendeni kerib.
- Selged `width`/`height` atribuudid — brauser ei arvuta lehe paigutust piltide saabumisel ümber (leht ei hüppa).
- Esimesed nähtavad pildid (tiimi rida) jäävad tavalaadimisele, et need ilmuksid kohe.

### 3. Muudetavad failid

- `src/lib/events.ts` — `thumbUrl` väljad koolitajatele ja tiimile
- `src/components/SpeakersTeamLinks.tsx` — pallikeste read kasutavad pisipilte + lazy/async + mõõdud
- `src/components/SpeakerLinks.tsx` — koolitaja rida Kavas/Minu kavas
- `src/components/SpeakerFeedbackForm.tsx` — vormi päise pilt
- `src/routes/koolitajad.tsx` — koolitajate nimekirja pisipildid
- Uus skript pisipiltide genereerimiseks (ühekordne, käivitan ise)

### 4. Kontroll

- Typecheck ja build.
- Playwright: Tagasiside leht mobiilisuuruses — võrgu päringute kogumaht enne/pärast, pildid ilmuvad, vorm avaneb.
- Kava ja Info leht visuaalselt samad kui enne.

## Mida see ei muuda

- Piltide väljanägemist (sama pilt, lihtsalt väiksema failina)
- Koolitajate profiililehte — seal jääb täissuuruses pilt
- Ühtegi teksti, nuppu ega lehe struktuuri
