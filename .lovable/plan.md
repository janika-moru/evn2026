# Minu kava: materjalid ja tagasiside

## Lihtsam koolituskaart
- Eemaldada **ainult Minu kava kaartidelt** kalendrinupud, mõlemad küsimuste nupud, koolitusest loobumine ja QR-kood.
- Alles jäävad tagasiside ning olemasolevad materjalid: slaidid, töövihikud ja Papside kiri. Koolituste andmed, pildid ja kontaktlingid jäävad alles.
- Teiste lehtede tegevusi ei muudeta. Sisselogimise eel näidatavast tekstist eemaldada lubadus registreeringuid tühistada.

## Tagasiside olek
- Veel andmata: **„Tagasiside koolitajale veel andmata!“** — avab õige koolituse tagasisidevormi.
- Pärast edukat salvestamist: südameikoon ja **„Aitäh, tagasiside koolitajale antud“**. Olek säilib lehe uuesti avamisel ja sama kontoga teises seadmes.
- Pikk tekst saab telefonis korrektselt kahele reale minna; kogu nupp on mugavalt vajutatav.
- Olekut laetakse eraldi: laadimise või vea korral ei väideta ekslikult, et tagasiside on andmata.

## Varasemad vastused
- Varem sama meiliaadressiga antud koolituse tagasiside võetakse arvesse, kui selle saab kontoga siduda.
- Varasemat anonüümset vastust ei saa automaatselt tuvastada. Andmata olekus nupu kaudu saab kasutaja lisaks vormi avamisele valida **„Olen juba tagasisidet andnud“**.
- See valik muudab ainult kasutaja isiklikku olekut: uut tagasisidet ega hinnet ei teki ning koondstatistika ei muutu. Eksliku käsitsi märkimise saab tagasi võtta.
- Olek on koolitusepõhine: ühe koolituse tagasiside ei märgi sama koolitaja teisi koolitusi tehtuks. Morning Mindseti sessioonide juures lähtutakse konkreetsest koolitusest.

## Tehniline lahendus
- Praegune tagasiside salvestus ei seo vastust kinnitatud konto tunnusega. Lisada uus kaitstud isikliku tagasisideoleku tabel, mille kirjed seotakse kontoga ja koolitusega; kasutaja näeb ainult enda olekuid.
- Tagasiside saatmisel kontrollida olemasolevat sisselogimist serveris ja salvestada isiklik olek alles pärast tegeliku vastuse edukat salvestamist. Avalik tagasisidevorm jääb kasutatavaks ka sisse logimata.
- Varasemate vastuste kontroll tagastab ainult kasutaja enda koolituste olekud, mitte vastuste sisu ega teiste inimeste andmeid. Meiliaadressi ei küsita päringu sisendina, vaid kasutatakse kinnitatud kontot.
- Mõlemad olemasolevad koolituse tagasiside saatmise teed uuendavad sama olekut. Minu kava loeb olekud ühe päringuga ja värskendab need pärast saatmist või käsitsi märkimist.
- Konto seos jääb sisemiseks olekuandmeks ega avalda koolitajale anonüümse vastaja identiteeti. Uued olekuandmed lisada olemasoleva andmete kustutamise korra alla ning täpsustada privaatsusteksti.

## Kontroll
- Kontrollida sisselogituna telefonis: materjalid avanevad, eemaldatud tegevusi pole ja pikad nupusildid mahuvad.
- Kontrollida andmata → edukalt saadetud → südamega tänu → lehe uuesti avamine.
- Testida käsitsi märkimist ja selle tühistamist, varasemate vastuste arvestamist ning koolituste eraldatust.
- Testida, et ebaõnnestunud saatmine ei märgi vastust antuks, käsitsi märkimine ei muuda tagasisidestatistikat ja teise kasutaja olekud pole loetavad ega muudetavad.
