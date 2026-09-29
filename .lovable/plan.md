# Minu kava ja sündmuse detailvaate lihtsustamine

## Muudatused
- Eemaldan Minu kava lõpust eraldi „Koolitajate slaidid ja materjalid” sektsiooni.
- Teen iga registreeritud koolituse üheks kompaktseks kaardiks: üleval `ESMASPÄEV, 5. OKT 17.30–19.00`, selle all pealkiri ja koolitaja.
- Paigutan kaardi esimesele nupureale „Anna tagasisidet” ja „Vaata slaide”. Kui slaide veel pole, jääb slaidinupp halliks ning ütleb selgelt, et slaide pole veel lisatud.
- Paigutan koolitaja profiili eraldi täislaiuses reale, kus on koolitaja nimi ja võimalusel profiilipilt. Pikk nimi saab rahulikult kogu rea laiuse.
- Hoian Kava ja Minu kava kaardid lingituna samale sündmuse detailvaatele, et sündmuse info ei sõltuks sisenemiskohast.
- Eemaldan sündmuse detailvaatest „Lisa kalendrisse” nupu.
- Registreeritud osalejale kuvan detailvaates järjest: registreerumise kinnituse, tagasiside nupu, slaidinupu ning koolitaja nime ja profiilipildiga kontaktilingi.
- Sama koolitaja kontaktilink viib olemasolevale Koolitajad lehele täpselt selle koolitaja profiili juurde; sama profiil jääb avatavaks ka Info lehe kaudu.
- Kontrollin telefoni vaates nii Kava → sündmus kui Minu kava → sündmus teekonda ning slaididega ja slaidideta koolitusi.

## Tehniline märkus
- Sündmuse detail jääb üheks olemasolevaks aadressiks `/sundmus/{id}`; eraldi Minu kava detaillehte ei looda.
- Kuupäeva ja kellaaja uus kuju on ainult ekraanil. Algandmed jäävad masinloetavaks, et sortimine ja Fienta sünk töötaks edasi.