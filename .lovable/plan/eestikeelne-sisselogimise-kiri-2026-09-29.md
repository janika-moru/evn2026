# Eestikeelne sisselogimise-kiri

## Eesmärk
Sisselogimislingiga kiri jõuab kasutajani eesti keeles, pealkirjaga:
**„Logi sisse ettevõtlusnädal Studio Mindzis keskkonda"**

## Hetke seis
- Kiri tuleb hetkel vaikemalliga (inglise keeles), sest projektil pole oma saatjadomeeni.
- Ilma domeenita eestikeelset kirja teha ei saa — Lovable nõuab päris domeeni, mille kasutaja omab.

## Sammud
1. **Saatjadomeeni seadistamine** — avame e-posti seadistamise dialoogi (kasutaja valib olemasoleva domeeni või ostab uue). DNS-i kinnitamine ei pea lõpuni jõudma enne järgmisi samme.
2. **Sisselogimise-kirjade mallide loomine** — pärast domeeni valikut luuakse kirjamallid (sh sisselogimise link).
3. **Sisselogimise kirja eestistamine** — kiri kirjutatakse eesti keeles:
   - Pealkiri: „Logi sisse ettevõtlusnädal Studio Mindzis keskkonda"
   - Sisu: tervitus, selgitus, et tegu on ettevõtlusnädala äpiga, ja nupp/link sisselogimiseks (kehtib lühikest aega)
   - Brändivärv (roheline #009D97), kuid kirja taust jääb alati valgeks
4. **Käivitamine** — mallid käivitatakse taustal; e-posti saatmine hakkab tööle, kui DNS on kinnitatud (jälgitav Cloud → Emails vaates).
5. **Kontroll** — saadame testkirja ja kontrollime, et pealkiri ja sisu on eestikeelsed ning link töötab.

## Tehnilised märkused
- Kasutame autentimise-kirjade hook'i (auth-email-hook) — kirjad lähevad siis meie mallidega, mitte vaikemalliga.
- Kirjad jäävad ka muu (nt konto kinnitus) osas eestikeelseks, kui soovime — küsime täpsustust enne lõplikku salvestamist.
- Unsubscribe-jalus on Lovable lisatud ja ei ole ära võetav.
