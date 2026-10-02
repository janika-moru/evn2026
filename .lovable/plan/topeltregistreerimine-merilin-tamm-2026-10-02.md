# Topeltregistreerimine — Merilin Tamm

## Mis juhtus (kontrollitud andmebaasist)
- Tema meil on Fientas **merilin.tamm@pm.me** (mitte pm.ee).
- Koolitusel „Turundajalt turundajatele turundusest" (7. okt 12.30) on tal **kaks eraldi Fienta tellimust**: 30.09 (tellimus 5446311) ja 02.10 (tellimus 5460451). Mõlemad on aktiivsed, seega hoiab ta praegu **kahte kohta**.
- Fienta lubab sama meiliga mitu korda registreeruda — see on Fienta käitumine, mitte äpi viga. Äpp ise peidab „Registreeru" nupu juba siis, kui inimene on sisse logitud ja registreerunud; teine registreerumine tehti kas sisse logimata või otse Fienta lehel.

## Mida Sina saad teha kohe
1. Tühista Fientas üks kahest piletist (nt hilisem, 5460451) — vabaneb üks koht ja äpp näitab järgmisel sünkil õiget vabade kohtade arvu.
2. Fienta ürituse seadetes tasub vaadata, kas saab piirata pileteid ühe tellimuse/meili kohta (kui Fienta seda võimaldab — äpp seda Fientas muuta ei saa).

## Mida äpis teeksin (väike muudatus)
- Kui sisse loginud kasutaja on koolitusele juba registreerunud, ei näidata „Registreeru" nuppu ka **Kava nimekirjas** ega seeria lingis — ainult märge, et on registreerunud (koolituse lehel on see juba nii).
- Muud kujundust ei muuda.

## Tehniline
- Kontrollida `EventCard` ja teised „Registreeru" kohad, kasutada sama `effectiveStatus`-loogikat mis `sundmus.$id.tsx`-is.
- Sisse logimata kasutajat äpp ära tunda ei saa — seda juhtumit lahendab ainult Fienta seadistus või käsitsi tühistamine.
