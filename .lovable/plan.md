# Jagatav äpp materjalide ja tagasiside jaoks

## Jagatav link ja menüü
- Jagatav link on **https://tartu.mindz.ee/minu-kava**. Sisselogimine jääb sama meiliaadressiga, millega inimene Fientas registreerus.
- Avaleht `/` avab samuti Minu kava.
- Peita menüüst „Kava“. Alles jäävad „Minu kava“, „Info“ ja „Tagasiside“; „Slaidid“ menüüpunkti ei lisata.
- Minu kavas jäävad alles oma koolituste materjalid ja olemasolev südamega tagasisideolek.

## Info leht
- Eemaldada kõik enne „Studio MindZ meeskond“ osa: asukohapilt, aadress, saabumisjuhised, teavitused ja kontaktiplokk.
- Leht algab „Studio MindZ meeskond“ osaga. Säilitada sellele järgnev ruumide galerii, kirjeldused ja rendiinfo muutmata.
- Eemaldada lõpust „Lisa veebiäpp oma telefoni“ osa.
- Tõsta olemasolev „Andmetöötlus“ osa lehe lõppu selle asemele, säilitades teksti ja privaatsustingimuste lingi.

## Materjalid ainult registreerunutele
- Slaide ja lisamaterjale saab äpi kaudu avada ainult sisselogitud inimene, kes on registreerunud vastavale koolitusele.
- Eemaldada sündmuse lehelt registreerimata külastaja avalikud materjalilingid.
- Koolitajate lehel ei näidata enam kõigile avatud slaidi- ega töövihikulinke; ligipääs oma koolituste materjalidele jääb Minu kavasse.
- Ühine `/slaidid` leht suunab Minu kavasse ega kuva kõigi koolituste materjale.
- **Piirang:** juba jagatud Google Drive’i või Claude’i otselingid jäävad nende teenuste lubade järgi avatuks. Äpi muudatus ei muuda väliste failide jagamisõigusi.

## Tehniline teostus
- Materjalide URL-id hoida serveripoolses allikas, mitte avalikult allalaaditavas sündmuste andmestikus. Tagastada lingid alles pärast kasutaja ja vastava Fienta registreeringu kontrollimist.
- Kasutada olemasolevaid kontosid ja registreeringuid. Uusi tabeleid ega andmebaasi skeemi muudatust pole selleks kavandatud; registreeringuid, tagasisidet ja küsimusi ei kustutata.
- Säilitada tagasisideoleku olemasolev loogika. Uuendada muutuvate lehtede pealkirju ja jagamise kirjeldusi uuele otstarbele vastavaks.

## Kontroll
- Sisselogimata ja vastava registreeringuta kasutaja ei saa äpist materjalilinke ka otsepäringuga.
- Registreerunu saab Minu kavas oma slaidid, töövihiku või Papside kirja avada ning näeb tagasisideolekut.
- Kontrollida, et menüüs pole Kava ja Info leht algab meeskonnaga ning lõpeb andmetöötlusega.
- Lisada ja käivitada väikesed testid materjalide ligipääsureeglitele.