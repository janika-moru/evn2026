# Registreeringu tühistamine Minu kava lehel

## Mis selgus
- Fientas käib loobumine pileti kaupa: iga pileti kinnitusmeilis ja pileti lehel on nupp „Loobu“.
- Äpp saab Fientast pileti andmed (pileti kood, tellimuse number, olek), kuid otsest loobumislinki nende hulgas ei ole.
- Fienta avalikus API-s ei ole kinnitatud võimalust pileteid korraldaja nimel tühistada. See tuleb enne ehitamist üle kontrollida.

## Ettepanek (kahes etapis)

**1. etapp – kohe, ohutu**
- Iga registreeritud koolituse kaardile (Minu kava ja koolituse leht) tuleb väike hall tekstilink „Loobu kohast“.
- Link avab akna selgitusega: „Loobumine käib Fienta kaudu. Ava oma Fienta kinnitusmeil ja vajuta „Loobu“ – koht vabaneb teistele.“ All on nupp „Ava Fienta“ (koolituse Fienta leht).
- Pärast loobumist kaob koolitus Minu kava lehelt järgmisel avamisel ise, sest tühistatud pileteid me ei näita.
- Sisselogimise loetelus jääb punkt „näha ja tühistada oma registreerimisi“ alles.

**2. etapp – ainult siis, kui Fienta seda lubab**
- Kontrollime Fienta tugiga või dokumentatsioonist, kas API kaudu saab pileti tühistada.
- Kui saab: „Loobu kohast“ tühistab koha otse äpis (koos kinnituse küsimisega „Kas oled kindel?“) ja vaba kohtade arv uueneb kohe.
- Kui ei saa: jääb 1. etapi lahendus.

## Tehniline osa
- Uus komponent RegisteredEventActions sisse: loobumisaken (shadcn Dialog), Fienta URL sündmuse andmetest.
- 2. etapp: serverifunktsioon, mis kontrollib, et pilet kuulub sisseloginud kasutaja meilile, kutsub Fienta API-t ja uuendab registreeringu oleku.
