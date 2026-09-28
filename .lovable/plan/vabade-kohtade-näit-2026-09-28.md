# Vabade kohtade näit

## Tulemus
- Iga avatud sündmuse „Registreeru“ nupu kõrval kuvatakse roheliselt „Vabu kohti: xx“.
- Näit on olemas nii kava kaardil kui sündmuse detailvaates.
- Täis sündmus kuvab olemasoleva „Kohad täis“ oleku ega paku registreerumist.

## Andmete arvutus
- Fienta ametlik API annab piletid, kuid mitte eraldi täpset vabade kohtade arvu; embed-liides annab vaid väärtuse `true`, kui kohti on üle 50.
- Seetõttu arvutatakse vabad kohad valemiga `50 − aktiivsete piletite arv` iga Fienta sündmuse kohta.
- Tühistatud ja tagastatud pileteid kasutatud kohtade hulka ei arvestata; tulemus ei lange alla nulli.
- Andmed värskendatakse serveris Fienta võtmega ja tehakse avalikule kavale turvaliselt kättesaadavaks ilma osalejate isikuandmeteta.

## Tehniline teostus
- Lisa avalik ainult-lugemiseks sündmuste kohtade tabel koos vajalike õiguste ja reeglitega.
- Laienda olemasolevat Fienta sünkroniseerimist nii, et see salvestab iga sündmuse aktiivsete registreeringute arvu ja 50 koha põhjal vabad kohad.
- Lisa avaliku vaate päring ja ühine vabade kohtade näidu komponent.
- Kontrolli telefonivaates, et arv ja nupp mahuvad kõrvuti ning Fienta vorm avaneb endiselt rakenduses.
