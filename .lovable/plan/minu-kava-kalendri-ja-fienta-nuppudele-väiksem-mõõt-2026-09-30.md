# Minu kava: kalendri- ja Fienta nuppudele väiksem mõõt

## Eesmärk

Minu kava koolituse kast mahub telefoni ekraanile algusest lõpuni. Väiksemaks tulevad ainult kalendrisse lisamise kolm nuppu (Google, Outlook, Apple) ja Fienta nupp — kogu ülejäänud kast jääb praegusele suurusele.

## Mis muutub

Kalendri- ja Fienta nupud jäävad samasse stiili (täistekst, ümar, valge äärejoon roosa kaardil), aga madalad ja tihedamad:

| Element | Praegu | Uus |
| :--- | :--- | :--- |
| Kalendrinupp (3 tükki) | 48px kõrge, vahe 10px, tekst 15px | 40px kõrge, vahe 6px, tekst 14px |
| Fienta nupp „Ava Fienta: QR-kood ja loobumine" | 52px kõrge, tekst 15px | 40px kõrge, tekst 14px |
| Vahe kalendri ja Fienta nupu vahel | 16px (space-y-4) | 10px |
| Vahe kalendribloki alguses | 20px (mt-5) | 16px |

Tagasiside/slaide nupud (52px, 15px), koolitaja nimi, kontaktlingid (15px), „Lisa kalendrisse" eelnevad read jäävad muutmata.

## Kus tehakse

- `src/components/AddToCalendar.tsx` — `large` harus: nuppude kõrgus `min-h-[40px]`, vahe `gap-1.5`, tekst `text-sm` (14px), äärejoon 2px jääb.
- `src/components/RegisteredEventActions.tsx` — `large` harus: Fienta nupp `min-h-[40px]` ja `text-sm`; väliskonteiner `mt-4 space-y-2.5`.

Kava leht, sündmuse detailvaade ja teised lehed ei muutu (muudatused puudutavad ainult `large`-harusid, mida kasutab ainult Minu kava).

## Kontroll

1. Telefonivaade 390px: Minu kava kast mahub ekraanile algusest lõpuni; tehakse ekraanipilt.
2. Kalendrinupud ja Fienta nupp on 40px kõrged; tagasiside/slaide nupud endiselt 52px.
3. Ükski nupp pole lõigatud ega kahe rea vahele murdunud.
4. Typecheck ja ehitus puhtad.
