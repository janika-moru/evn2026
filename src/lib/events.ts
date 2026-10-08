// Keskmne sündmuste andmemudel — sisu ja UI on eraldi.
// Päris andmed Fienta ametlikust avalikust API-st (organizer 33715), seisuga 28.09.2026.

import anuTahemaaPhoto from "@/assets/anu-tahemaa.png.asset.json";
import birgitRuunikPhoto from "@/assets/birgit-ruunik.png.asset.json";
import eppKarsinPhoto from "@/assets/epp-karsin.png.asset.json";
import janikaMoruPhoto from "@/assets/janika-moru.png.asset.json";
import kiiaPaalPhoto from "@/assets/kiia-paal.png.asset.json";
import kadriLeppikPhoto from "@/assets/kadri-leppik.png.asset.json";
import liisiPhoto from "@/assets/liisi.jpg.asset.json";
import martinPhoto from "@/assets/martin.png.asset.json";
import mikkOrglaanPhoto from "@/assets/mikk-orglaan.png.asset.json";
import seljePhoto from "@/assets/selje.jpg.asset.json";
import kukkumiskaitsePhoto from "@/assets/kukkumiskaitse.png.asset.json";
import urmoPhoto from "@/assets/urmo.png.asset.json";
import ulviPhoto from "@/assets/ulvi.png.asset.json";
import timoPhoto from "@/assets/timo.png.asset.json";
import tambetPhoto from "@/assets/tambet.png.asset.json";
import rolandPhoto from "@/assets/roland.png.asset.json";
import mariPhoto from "@/assets/mari-maekivi.png.asset.json";
import marikaPhoto from "@/assets/marika.png.asset.json";
import papsidLetter from "@/content/papsid-kiri.md?raw";
import papsidPhoto from "@/assets/papsid.png.asset.json";
import katrinVilimaaPhoto from "@/assets/katrin-vilimaa-otsing.png.asset.json";
import katrinDiffertPhoto from "@/assets/katrin-differt.png.asset.json";
import ivarRaavPhoto from "@/assets/ivar-raav.png.asset.json";
import kullikeKuberPhoto from "@/assets/kullike-kuber.jpg.asset.json";
import anuTahemaaThumb from "@/assets/thumbs/anu-tahemaa.webp.asset.json";
import birgitRuunikThumb from "@/assets/thumbs/birgit-ruunik.webp.asset.json";
import eppKarsinThumb from "@/assets/thumbs/epp-karsin.webp.asset.json";
import janikaMoruThumb from "@/assets/thumbs/janika-moru.webp.asset.json";
import kiiaPaalThumb from "@/assets/thumbs/kiia-paal.webp.asset.json";
import kadriLeppikThumb from "@/assets/thumbs/kadri-leppik.webp.asset.json";
import liisiThumb from "@/assets/thumbs/liisi.webp.asset.json";
import martinThumb from "@/assets/thumbs/martin.webp.asset.json";
import mikkOrglaanThumb from "@/assets/thumbs/mikk-orglaan.webp.asset.json";
import seljeThumb from "@/assets/thumbs/selje.webp.asset.json";
import kukkumiskaitseThumb from "@/assets/thumbs/kukkumiskaitse.webp.asset.json";
import urmoThumb from "@/assets/thumbs/urmo.webp.asset.json";
import ulviThumb from "@/assets/thumbs/ulvi.webp.asset.json";
import timoThumb from "@/assets/thumbs/timo.webp.asset.json";
import tambetThumb from "@/assets/thumbs/tambet.webp.asset.json";
import rolandThumb from "@/assets/thumbs/roland.webp.asset.json";
import mariThumb from "@/assets/thumbs/mari-maekivi.webp.asset.json";
import marikaThumb from "@/assets/thumbs/marika.webp.asset.json";
import papsidThumb from "@/assets/thumbs/papsid.webp.asset.json";
import katrinVilimaaThumb from "@/assets/thumbs/katrin-vilimaa-otsing.webp.asset.json";
import katrinDiffertThumb from "@/assets/thumbs/katrin-differt.webp.asset.json";
import ivarRaavThumb from "@/assets/thumbs/ivar-raav.webp.asset.json";
import kullikeKuberThumb from "@/assets/thumbs/kullike-kuber.webp.asset.json";
import lopupeguPhoto from "@/assets/lopupegu-studio-mindz.webp.asset.json";
import lopupeguThumb from "@/assets/thumbs/lopupegu-studio-mindz.webp.asset.json";



export type RegistrationStatus =
  | "open" // Registreeru
  | "registered" // Oled registreerunud ✓
  | "full" // Kohad täis
  | "closed"; // Registreerimine lõppenud

export interface EventItem {
  id: string;
  fientaEventId?: string;
  capacity?: number;
  title: string;
  speaker: string;
  description: string;
  shortDescription: string;
  date: string; // "2026-10-05"
  startTime: string; // "10:00"
  endTime: string; // "12:00"
  venue: string;
  fientaUrl: string;
  registrationUrl: string;
  googleCalendarUrl?: string;
  outlookUrl?: string;
  icalUrl?: string;
  slidesUrl?: string;
  materialsUrl?: string;
  /** False = koolitusel slaide pole ega tule (nt lõpuõhtu) — „Slaide veel pole" nuppu ei näidata. */
  slidesExpected?: boolean;
  /** Koolitaja kiri osalejatele (näidatakse registreerunutele aknas). */
  letter?: string;
  seriesUrl?: string; // Korduvate sessioonide seeria leht Fientas
  registrationStatus: RegistrationStatus;
}

export interface Speaker {
  id: string;
  name: string;
  /** Kuvatav lühinimi pallikese all, nt „Kukkumiskaitse" duokoolitajate asemel. */
  displayName?: string;
  role: string;
  bio: string;
  imageUrl?: string;
  /** 128px WebP pisipilt pallikeste ja nimekirjade jaoks. */
  thumbUrl?: string;
  email?: string;
  phone?: string;
  websiteUrl?: string;
  /** Lisaks kodulehele kuvatavad saidilingid (nt koolitaja kaks oma lehte). */
  websites?: { label: string; url: string }[];
  linkedinUrl?: string;
  instagramUrl?: string;
  facebookUrl?: string;
  eventIds: string[];
  /** Korraldaja (nt Studio MindZ) — ei ilmu koolitajate nimekirja ega tagasiside koolitaja valikusse. */
  isOrganizer?: boolean;
}

export const EVENT_DAYS = [
  { date: "2026-10-05", label: "E 5. okt" },
  { date: "2026-10-06", label: "T 6. okt" },
  { date: "2026-10-07", label: "K 7. okt" },
  { date: "2026-10-08", label: "N 8. okt" },
  { date: "2026-10-09", label: "R 9. okt" },
] as const;

export const EVENTS: EventItem[] = [
  {
    "id": "202940",
    "fientaEventId": "202940",
    "capacity": 25,
    "title": "Morning Mindset: alusta päeva selgema pea ja parema fookusega",
    "speaker": "Kiia Paal",
    "shortDescription": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.",
    "description": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.\n\nMorning Mindset on viiest praktilisest hommikusessioonist koosnev sari, mis aitab märgata ja paremini juhtida seda, kuidas sa oma tööpäeva alustad, millele tähelepanu annad, kuidas pinge all reageerid ning kuidas töörežiimist välja tuled.\n\nKellele?\n\nMorning Mindset sobib ettevõtjale, juhile, töötajale või ettevõtlusnädala osalejale, kes soovib alustada päeva teadlikumalt, paremini keskenduda ning saada kaasa praktilisi enesejuhtimise tööriistu.\n\nVarasem kogemus tähelepanu-, hingamis- või lõdvestusharjutustega ei ole vajalik. Piisab uudishimust ja valmisolekust korraks tavapärasest töötempost välja astuda.\n\nOsaleda võib kogu viiepäevases sarjas või valida just need hommikud, mille teema sind kõige rohkem kõnetab. Iga kohtumine on iseseisev tervik, kuid kõik viis koos moodustavad tervikliku enesejuhtimise nädala.\n\nMida koolituselt saad?\n\nViiel hommikul keskendume viiele praktilisele enesejuhtimise oskusele – selgusele, tegutsemisvalmidusele, tasakaalu hoidmisele surve all, loovale mõtlemisele ning nädala teadlikule lõpetamisele ja taastumisele.\n\nIga hommik ühendab lühikese teaduspõhise või psühholoogilise sissevaate praktilise enesevaatluse ja juhendatud kogemusega. Morning Mindset ei toetu ühele koolkonnale ega ühele „õigele“ tehnikale – kokku saavad tähelepanu juhtimine, käitumisteadus, stressiregulatsioon, juhendatud kujutlus, lõdvestus, loov probleemilahendus ja refleksioon.\n\nEsmaspäev – SELGUS: mis on päriselt oluline?\n\nKorrastame tähelepanu ja prioriteete ning vaatame, kuidas liikuda heast kavatsusest ühe konkreetse järgmise sammuni.\n\nTeisipäev – TEGUTSEMISVALMIDUS: kuidas ennast tööpäevaks käima saada?\n\nUurime, mis mõjutab meie energiat ja tegutsemisvalmidust ning kuidas liikuda motivatsiooni ootamisest esimese reaalse tegevuseni.\n\nKolmapäev – TASAKAAL SURVE ALL: stress ei pea tegema järgmist otsust sinu eest.\n\nHarjutame, kuidas märgata oma pingereaktsiooni varem, luua reageerimise ja tegevuse vahele rohkem ruumi ning valida automaatse reaktsiooni asemel teadlikum järgmine samm.\n\nNeljapäev – LOOV MÕTLEMINE: kui rohkem pingutamine enam ei aita.\n\nKatsetame, kuidas tähelepanu, liikumise ja vaatenurga muutmine võib aidata väljuda harjumuspärasest mõtterajast ning märgata uusi ideid ja lahendusi.\n\nReede – TEADLIK LÕPETAMINE JA TAASTUMINE: mida võtan kaasa ja mida võin jätta siia?\n\nMärkame nädala jooksul toimunud edasiminekut, korrastame lahtised mõtted ning loome rahulikuma ülemineku töörežiimist puhkusele ja järgmisse nädalasse.\n\nIga hommik annab kaasa vähemalt ühe praktilise võtte või mõtteviisi, mida saad hiljem kasutada ka keset kiiret tööpäeva.\n\nKoolitaja\n\nKiia Paal on täiskasvanute koolitaja, ettevõtja ja Studio MindZ asutaja. Tal on üle kümne aasta kogemust inimeste ja gruppide koolitamise ning juhendamisega.\n\nOma töös ühendab Kiia täiskasvanuõppe ja ettevõtluskogemuse psühholoogia, tähelepanu juhtimise, stressijuhtimise ning praktiliste enesejuhtimise meetoditega. Tema koolitusi iseloomustab rahulik, empaatiline ja praktiline lähenemine, mis aitab uued teadmised siduda osaleja enda tööolukordade ja igapäevaste valikutega.",
    "date": "2026-10-05",
    "startTime": "08:30",
    "endTime": "09:15",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/kiia-morning-mindset-kiia-paal-studio-mindzis-05-10",
    "registrationUrl": "https://fienta.com/kiia-morning-mindset-kiia-paal-studio-mindzis-05-10",
    "seriesUrl": "https://fienta.com/et/s/kiia-morning-mindset-kiia-paal-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202928",
    "fientaEventId": "202928",
    "title": "Mille eest rohkem raha küsida ja mida delegeerida?",
    "speaker": "Mikk Orglaan",
    "shortDescription": "Mikroettevõtjana harjud tegema peaaegu kõike ise. Mõnda aega see isegi töötab, aga ühel hetkel ei ole lahendus enam pikem tööpäev. Selles praktilises töötoas aitab Mikk Orglaan sul paremini mõista, millised tööd tasub enda käes hoida, millised kellelegi teisele anda ja millist inimest sul nende ülesannete jaoks tegelikult juurde vaja on.",
    "description": "Mikroettevõtjana harjud tegema peaaegu kõike ise. Mõnda aega see isegi töötab, aga ühel hetkel ei ole lahendus enam pikem tööpäev. Selles praktilises töötoas aitab Mikk Orglaan sul paremini mõista, millised tööd tasub enda käes hoida, millised kellelegi teisele anda ja millist inimest sul nende ülesannete jaoks tegelikult juurde vaja on.\n\nKellele?\n\nTegutsevale mikro- või väikeettevõtjale, kes on oma ettevõtet juba mõnda aega ise vedanud ja jõudnud punkti, kus kõike ei ole enam mõistlik üksi teha.\n\nEriti sobib töötuba sulle siis, kui plaanid oma tiimi kasvatada või tahad üle vaadata, millistele teenustele, toodetele ja töödele tasub sul endal edaspidi rohkem keskenduda.\n\nMida töötoast saad?\n\nTöötoa keskmes oled sina ise. Praktiliste küsimustike ja harjutuste abil kaardistad oma tugevusi, tööstiili ja seda, millised ülesanded tulevad sulle loomulikumalt ning millised võtavad ebaproportsionaalselt palju energiat.\n\nTestide kaudu saad enda kohta numbrilist sisendit ning Mikk aitab tulemusi ettevõtluse kontekstis tõlgendada. Selle põhjal vaatame, millised tööd tasub endale jätta, millised delegeerida, millise profiiliga inimest võiksid enda kõrvale vajada ning kas ka sinu teenuste või toodete valikus tasub midagi muuta.\n\nTöötoas kasutame selleks Sparkly keskkonna teste. Eesmärk on, et lahkud selgema arusaamaga sellest, millele oma aega ja energiat ettevõttes edaspidi suunata ning millist abi sul järgmise sammu tegemiseks vaja on.\n\nKoolitaja\n\nMikk Orglaan on ettevõtja, ärimentor, investor ning Sparkly kaasasutaja ja tegevjuht. Tal on ligi 30 aastat kogemust ettevõtete ehitamise, tarkvaraäri, värbamise ja meeskondade arendamisega ning ta on nõustanud ettevõtjaid ja juhtkondi nii strateegia kui ettevõtte kasvuga seotud küsimustes. Sparkly loomisel on ta keskendunud sellele, kuidas paremini sobitada inimesed, päris tööülesanded ja rollid.\n\nNB! Võta kaasa sülearvuti või piisavalt suure ekraaniga telefon, et saaksid töötoa jooksul küsimustikke täita ja oma tulemusi vaadata.",
    "date": "2026-10-05",
    "startTime": "10:00",
    "endTime": "11:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/mille-eest-rohkem-raha-kusida-ja-mida-delegeerida-mikk-orglaan-studio-mindzis",
    "registrationUrl": "https://fienta.com/mille-eest-rohkem-raha-kusida-ja-mida-delegeerida-mikk-orglaan-studio-mindzis",
    "registrationStatus": "open",
    "slidesUrl": "https://drive.google.com/file/d/1f8CG-bDOnR09OhImUns1Aw4NQYNPmxR5/view?usp=sharing"
  },
  {
    "id": "202930",
    "fientaEventId": "202930",
    "title": "Kas sinu turundus töötab või sa lihtsalt arvad, et töötab?",
    "speaker": "Kadri Leppik",
    "shortDescription": "Turunduses on täna meeletult palju FOMO. Paljudel on tunne, et peab kohal olema igal võimalikul sotsiaalmeediaplatvormil, panustama SEO-sse ja GEO-sse, jooksutama Google'i ja Meta reklaame, tugevdama LinkedInis persoonibrändi, saatma uudiskirju ning jõudma teha seda kõike veel korraga.",
    "description": "Turunduses on täna meeletult palju FOMO. Paljudel on tunne, et peab kohal olema igal võimalikul sotsiaalmeediaplatvormil, panustama SEO-sse ja GEO-sse, jooksutama Google'i ja Meta reklaame, tugevdama LinkedInis persoonibrändi, saatma uudiskirju ning jõudma teha seda kõike veel korraga.\n\nAga kas iga ettevõte peab kõike tegema ja igal pool kohal olema?\n\nKui teha natukene siit ja natukene sealt, võib ühel hetkel tekkida tunne, et „turundus ei tööta\". Tegelik probleem võib aga olla hoopis mujal. Koolitus aitab vaadata oma tänasele turundusele tervikuna otsa ja leida üles, kus on tegelikud kitsaskohad.\n\nKellele koolitus on mõeldud?\n\nTegutsevatele ettevõtjatele ja juhtidele, kelle ettevõttes turundust juba tehakse, aga kes tahavad selgemalt aru saada, mis töötab, mis ei tööta ja kuhu tasub oma aega ning raha järgmisena suunata.\n\nMida koolituselt saad?\n\nSaad praktilise raamistiku, mille abil oma turundust analüüsida ja leida üles kõige suurem kitsaskoht.\n\nKas turundusel on selge strateegia ja äriline eesmärk? Kas räägid õige kliendiga ja õiges kohas? Kas väärtuspakkumine eristub? Kas turunduskanalitel on selge roll? Kas veebileht muudab huvi päringuks või ostuks? Kas taasturundus kasvatab müüki? Mis saab päringust edasi ja kuidas jõuab olemasolev klient kordusostuni? Kas õigesti seadistatud analüütika näitab, millised tegevused toovad müüki ja millised kulutavad eelarvet?\n\nEesmärk ei ole anda sulle veel kümmet uut turundusülesannet. Pigem oskad pärast küsida: „Kus on meie kõige suurem kitsaskoht ja millise ühe asja parandamine annaks praegu kõige suurema mõju?\"\n\nNii saad juurde mitte rohkem tegemisi, vaid suurema selguse, mida teha ja mida võib praegu rahulikult tegemata jätta.\n\nKoolitaja\n\nKadri Leppik on Digistrateegi kaasasutaja ja digiturunduse strateeg, kes on turunduses tegutsenud pea kaheksa aastat nii Baltikumi turundusjuhina kui ka erinevate ettevõtete strateegilise turunduspartnerina.",
    "date": "2026-10-05",
    "startTime": "12:30",
    "endTime": "14:00",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/kas-sinu-turundus-tootab-kadri-leppik-studio-mindzis",
    "registrationUrl": "https://fienta.com/kas-sinu-turundus-tootab-kadri-leppik-studio-mindzis",
    "slidesUrl": "https://docs.google.com/presentation/d/1pWPCr5F8rWst4tvElGV286Z8Dy7rYiinuMuajEy6JAE/edit?usp=sharing",
    "registrationStatus": "open"
  },
  {
    "id": "202931",
    "fientaEventId": "202931",
    "title": "Kuidas introverdina tulemuslikult networkida?",
    "speaker": "Martin Mark",
    "shortDescription": "Edukas networking ei nõua ekstraverdiks muutumist. Õige mõtteviisi ja praktiliste võtetega saad ka introverdina uusi kontakte luua, end networking-üritustel kindlamalt tunda ja seal aktiivselt osaleda, ilma et peaksid oma loomupärast suhtlusviisi muutma.",
    "description": "Edukas networking ei nõua ekstraverdiks muutumist. Õige mõtteviisi ja praktiliste võtetega saad ka introverdina uusi kontakte luua, end networking-üritustel kindlamalt tunda ja seal aktiivselt osaleda, ilma et peaksid oma loomupärast suhtlusviisi muutma.\n\nKellele?\n\nIntrovertidele.\n\nMida koolituselt saad?\n\nÕpid praktilisi tehnikaid ja nippe, kuidas networking-üritusel vestlust alustada, ennast tutvustada ja uusi kontakte luua.\n\nSama oluline on mõtteviis: saad enesekindlust ja arusaama, et tulemuslik networking on introverdina täiesti tehtav. Sa ei pea muutuma ekstraverdiks, vaid saad õppida kasutama enda tugevusi koos oskustega, mis aitavad uute inimestega kontakti luua.\n\nKoolitaja\n\nMartin Mark on Introvertide Akadeemia asutaja, mentor ja harjumuste koolitaja. Ise introverdina aitab ta inimestel olla ettevõtluses ja tööelus nähtavam ning enesekindlam, jäädes seejuures iseendaks.\n\nNB! Koolitusel tehakse video- ja fotosalvestusi Martini ja Introvertide Akadeemia enda kasutuseks. Videosalvestuse fookuses on koolitaja ning kaamera paikneb statsionaarselt. Soovi korral on võimalik valida ruumis koht, kus osaleja kaadrisse ei jää.",
    "date": "2026-10-05",
    "startTime": "15:00",
    "endTime": "16:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/kuidas-introverdina-tulemuslikult-networkida-martin-mark-studio-mindzis",
    "registrationUrl": "https://fienta.com/kuidas-introverdina-tulemuslikult-networkida-martin-mark-studio-mindzis",
    "registrationStatus": "open",
    "slidesUrl": "https://drive.google.com/file/d/1gtlTiH8ubuUPeDRdDysAKCpbdvirQI5q/view?usp=sharing"
  },
  {
    "id": "202933",
    "fientaEventId": "202933",
    "title": "Kuidas olla AI-ga vesteldes tulemuslikum?",
    "speaker": "Janika Mõru",
    "shortDescription": "Kui kasutad AI-d juba igapäevaselt, aga tulemus ei ole alati see, mida vestlust alustades lootsid, aitab koolitus saada AI-ga koostöös osavamaks ja jõuda sagedamini päriselt kasutatava tulemuseni.",
    "description": "Kui kasutad AI-d juba igapäevaselt, aga tulemus ei ole alati see, mida vestlust alustades lootsid, aitab koolitus saada AI-ga koostöös osavamaks ja jõuda sagedamini päriselt kasutatava tulemuseni.\n\nKellele?\n\nKoolitus on mõeldud neile, kes kasutavad juba ChatGPT-d, Gemini, Claude’i, Copilotit või mõnda muud AI-tööriista ning tahavad saada sellest oma igapäevatöös rohkem kasu.\n\nSee ei ole AI-ga alustamise koolitus ega keskendu agentidele, automatsioonidele või erinevate AI-tööriistade võrdlemisele.\n\nMida koolituselt saad?\n\nSaad paremini aru, miks AI võib vestluse jooksul hakata pakkuma lahendusi, mis viivad algsest eesmärgist eemale, ja kuidas koostööd ise teadlikumalt juhtida.\n\nÕpid selgemalt paika panema, mida tahad AI abil saavutada, andma paremat sisendit ja tagasisidet ning paluma AI-l ka enda pakutud lahendust kriitiliselt hinnata ja parandada.\n\nSaad teada, kuidas kasutada hästi õnnestunud näiteid järgmiste tulemuste parandamiseks ning kuidas muuta hea vestluse tulemus korduvkasutatavaks promptiks või juhiseks. Nii ei pea sarnase ülesande puhul iga kord kogu mõttetööd ja parandamist algusest alustama.\n\nKoolitaja annab edasi lihtsad põhimõtted ja enda lemmikud täiendavad tööriistad, mida saad kasutada koos erinevate LLMidega sõltumata sellest, millist AI-tööriista eelistad. Koolituse jooksul saab arutada ka enda näiteid ja küsida soovitusi konkreetsete kasutusjuhtude kohta.\n\nKoolitaja\n\nJanika Mõru on koolitaja ja koolituste korraldaja, kes on kasvanud virtuaalse assistendi rollist Veebikooli kliendihoidmise juhiks ning pakub selle kõrvalt AI-koolitusi ja mentorlust. Ta kasutab AI-d igapäevases töös ning keskendub koolitustel praktilistele töövõtetele, mis aitavad saada AI-st paremaid tulemusi ilma, et töö sõltuks ühest konkreetsest tööriistast.",
    "slidesUrl": "https://claude.ai/artifact/M5xBvAc27NkNkvdHqvCwdP",
    "date": "2026-10-05",
    "startTime": "17:30",
    "endTime": "19:00",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/ai-ga-vesteldes-tulemuslikum-janika-moru-studio-mindzis",
    "registrationUrl": "https://fienta.com/ai-ga-vesteldes-tulemuslikum-janika-moru-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202965",
    "fientaEventId": "202965",
    "capacity": 25,
    "title": "Morning Mindset: alusta päeva selgema pea ja parema fookusega",
    "speaker": "Kiia Paal",
    "shortDescription": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.",
    "description": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.\n\nMorning Mindset on viiest praktilisest hommikusessioonist koosnev sari, mis aitab märgata ja paremini juhtida seda, kuidas sa oma tööpäeva alustad, millele tähelepanu annad, kuidas pinge all reageerid ning kuidas töörežiimist välja tuled.\n\nKellele?\n\nMorning Mindset sobib ettevõtjale, juhile, töötajale või ettevõtlusnädala osalejale, kes soovib alustada päeva teadlikumalt, paremini keskenduda ning saada kaasa praktilisi enesejuhtimise tööriistu.\n\nVarasem kogemus tähelepanu-, hingamis- või lõdvestusharjutustega ei ole vajalik. Piisab uudishimust ja valmisolekust korraks tavapärasest töötempost välja astuda.\n\nOsaleda võib kogu viiepäevases sarjas või valida just need hommikud, mille teema sind kõige rohkem kõnetab. Iga kohtumine on iseseisev tervik, kuid kõik viis koos moodustavad tervikliku enesejuhtimise nädala.\n\nMida koolituselt saad?\n\nViiel hommikul keskendume viiele praktilisele enesejuhtimise oskusele – selgusele, tegutsemisvalmidusele, tasakaalu hoidmisele surve all, loovale mõtlemisele ning nädala teadlikule lõpetamisele ja taastumisele.\n\nIga hommik ühendab lühikese teaduspõhise või psühholoogilise sissevaate praktilise enesevaatluse ja juhendatud kogemusega. Morning Mindset ei toetu ühele koolkonnale ega ühele „õigele“ tehnikale – kokku saavad tähelepanu juhtimine, käitumisteadus, stressiregulatsioon, juhendatud kujutlus, lõdvestus, loov probleemilahendus ja refleksioon.\n\nEsmaspäev – SELGUS: mis on päriselt oluline?\n\nKorrastame tähelepanu ja prioriteete ning vaatame, kuidas liikuda heast kavatsusest ühe konkreetse järgmise sammuni.\n\nTeisipäev – TEGUTSEMISVALMIDUS: kuidas ennast tööpäevaks käima saada?\n\nUurime, mis mõjutab meie energiat ja tegutsemisvalmidust ning kuidas liikuda motivatsiooni ootamisest esimese reaalse tegevuseni.\n\nKolmapäev – TASAKAAL SURVE ALL: stress ei pea tegema järgmist otsust sinu eest.\n\nHarjutame, kuidas märgata oma pingereaktsiooni varem, luua reageerimise ja tegevuse vahele rohkem ruumi ning valida automaatse reaktsiooni asemel teadlikum järgmine samm.\n\nNeljapäev – LOOV MÕTLEMINE: kui rohkem pingutamine enam ei aita.\n\nKatsetame, kuidas tähelepanu, liikumise ja vaatenurga muutmine võib aidata väljuda harjumuspärasest mõtterajast ning märgata uusi ideid ja lahendusi.\n\nReede – TEADLIK LÕPETAMINE JA TAASTUMINE: mida võtan kaasa ja mida võin jätta siia?\n\nMärkame nädala jooksul toimunud edasiminekut, korrastame lahtised mõtted ning loome rahulikuma ülemineku töörežiimist puhkusele ja järgmisse nädalasse.\n\nIga hommik annab kaasa vähemalt ühe praktilise võtte või mõtteviisi, mida saad hiljem kasutada ka keset kiiret tööpäeva.\n\nKoolitaja\n\nKiia Paal on täiskasvanute koolitaja, ettevõtja ja Studio MindZ asutaja. Tal on üle kümne aasta kogemust inimeste ja gruppide koolitamise ning juhendamisega.\n\nOma töös ühendab Kiia täiskasvanuõppe ja ettevõtluskogemuse psühholoogia, tähelepanu juhtimise, stressijuhtimise ning praktiliste enesejuhtimise meetoditega. Tema koolitusi iseloomustab rahulik, empaatiline ja praktiline lähenemine, mis aitab uued teadmised siduda osaleja enda tööolukordade ja igapäevaste valikutega.",
    "date": "2026-10-06",
    "startTime": "08:30",
    "endTime": "09:15",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/morning-mindset-06-10-studio-mindzis",
    "registrationUrl": "https://fienta.com/morning-mindset-06-10-studio-mindzis",
    "seriesUrl": "https://fienta.com/et/s/kiia-morning-mindset-kiia-paal-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202955",
    "fientaEventId": "202955",
    "title": "Kuidas kasutatakse AI-d sinu ettevõtte ründamiseks?",
    "speaker": "Urmo Keskel",
    "shortDescription": "AI ei anna uusi võimalusi ainult ettevõtjatele. Seda kasutavad järjest osavamalt ka küberkurjategijad, et muuta petukirjad, telefonikõned ja muud rünnakud usutavamaks. Urmo Keskel näitab päris näidete kaudu, kuidas ettevõtteid täna rünnatakse ning milliste üsna lihtsate töökorralduslike muudatustega saab riske oluliselt vähendada.",
    "description": "AI ei anna uusi võimalusi ainult ettevõtjatele. Seda kasutavad järjest osavamalt ka küberkurjategijad, et muuta petukirjad, telefonikõned ja muud rünnakud usutavamaks. Urmo Keskel näitab päris näidete kaudu, kuidas ettevõtteid täna rünnatakse ning milliste üsna lihtsate töökorralduslike muudatustega saab riske oluliselt vähendada.\n\nKellele?\n\nTegutsevate ettevõtete omanikele, tegevjuhtidele, osakonnajuhtidele ja teistele inimestele, kellel on ettevõttes otsustusõigus ning võimalus mõjutada seda, kuidas töötajad igapäevaselt andmete, kontode ja suhtluskanalitega ümber käivad.\n\nKõige rohkem saab koolitusest kasu suurem ettevõte. Mida rohkem on organisatsioonis inimesi, seda suurem mõju võib olla ühel heal juhtimisotsusel, sest see mõjutab korraga suurema hulga töötajate käitumist ja kogu ettevõtte küberhügieeni.\n\nKa väiksema ettevõtte juht saab siit praktilisi mõtteid ja muudatusi, mida kohe kasutusele võtta, kuid koolituse peamine fookus on organisatsioonidel, kus küberhügieen sõltub juba paljude inimeste igapäevastest harjumustest.\n\nFookus ei ole keerulistel tehnilistel lahendustel. Vaatame eelkõige inimfaktorit ja küberhügieeni: mida saab juht ise otsustada ja muuta, et töötajatel oleks lihtsam turvaliselt käituda.\n\nMida koolituselt saad?\n\nSaad ülevaate sellest, kuidas küberrünnakud ja kelmused on AI tulekuga muutunud ning milliseid uusi võimalusi see ründajatele annab.\n\nUrmo toob näiteid Eestis levinud rünnakutest e-postis, telefonis, SMS-is ja sõnumirakendustes ning juhtumitest, kus ettevõtted on kandnud reaalset kahju.\n\nVaatame, kuidas ründajad kasutavad AI-d järjest usutavamate sõnumite ja petuskeemide loomiseks, aga ka seda, miks ettevõtte kaitse algab endiselt väga sageli üsna tavalisest küberhügieenist.\n\nKoolituse oluline osa on praktilistel soovitustel: milliseid vigu vältida, millele töötajate käitumises tähelepanu pöörata ning milliseid muudatusi saab ettevõtte töökorralduses teha kohe.\n\nEesmärk on, et lahkud koolituselt mitte ainult suurema teadlikkusega riskidest, vaid ka mõne konkreetse otsusega, mida saad oma ettevõttes muuta, et vähendada inimfaktorist tulenevaid küberriske.\n\nKoolitaja\n\nUrmo Keskel on Phishbite'i kaasasutaja, kes tegeleb igapäevaselt küberhügieeni, õngitsusrünnakute ja kelmuste ennetamisega. Ta aitab organisatsioonidel mõista, kuidas ründajad inimeste käitumist ära kasutavad ning kuidas vähendada sellest tulenevaid küberriske.\n\nPhishbite on küberhügieeni koolitusplatvorm, mis aitab muuta töötajate käitumist igakuiste lühikeste koolitusampsude ja päriseluliste õngitsussimulatsioonide abil. Urmo jälgib aktiivselt ka seda, kuidas AI muudab sotsiaalse manipuleerimise ja petuskeemide võimalusi.",
    "date": "2026-10-06",
    "startTime": "10:00",
    "endTime": "11:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/kuidas-ai-ga-ettevotet-runnatakse-urmo-keskel-studio-mindzis",
    "registrationUrl": "https://fienta.com/kuidas-ai-ga-ettevotet-runnatakse-urmo-keskel-studio-mindzis",
    "slidesUrl": "https://drive.google.com/file/d/1fVr1r6p_TopWJH09y-toGWPTxAz5Qer8/view?usp=sharing",
    "registrationStatus": "open"
  },
  {
    "id": "202946",
    "fientaEventId": "202946",
    "title": "Kuidas kasvatada ettevõtet nii, et paarisuhe ei jääks kahjumisse?",
    "speaker": "Papsid",
    "shortDescription": "Ettevõtja tööpäev ei lõpe alati kontoriukse sulgemisega. Mõtted, vastutus ja pinged tulevad sageli koju kaasa. Koolitus aitab mõelda, mida saad ise teha selleks, et lähedased ei saaks ainult seda osa sinust, mis tööpäevast üle jääb.",
    "description": "Ettevõtja tööpäev ei lõpe alati kontoriukse sulgemisega. Mõtted, vastutus ja pinged tulevad sageli koju kaasa. Koolitus aitab mõelda, mida saad ise teha selleks, et lähedased ei saaks ainult seda osa sinust, mis tööpäevast üle jääb.\n\nKellele?\n\nEttevõtjatele ja ettevõtlusega alustajatele, kes tahavad kasvatada oma ettevõtet nii, et paarisuhe ja pereelu ei jääks töö kõrval tagaplaanile. Koolitus sobib nii meestele kui naistele.\n\nMida koolituselt saad?\n\nSaad praktilisi ja universaalseid soovitusi, kuidas hoida ettevõtluse kõrval paarisuhet ja pereelu, jagada kodust vastutust ning luua kokkuleppeid, mis aitavad kodus päriselt kohal olla.\n\nRäägime sellest, kuidas töö ja koduse elu vahele selgemaid piire luua ning kuidas ettevõtluse ja ambitsioonide kõrval hoida ruumi ka lähedastele.\n\nJuttu tuleb päris elust, enda kogemustest ja toimivatest lahendustest. Ja nalja saab ka.\n\nKoolitajad\n\nKristo Tuurmann ja Illimar Pilt on Papside asutajad ja kogemuskoolitajad, kes jagavad oma koolitustel praktilisi kogemusi paarisuhetest, pereelust ning töö ja pere tasakaalust. Kristo on ettevõtja, koolitaja ja mentor, kellel on pikaajaline kogemus ettevõtluse ja finantsjuhtimise valdkonnas. Illimar peab ennast eelkõige praktikuks, kelle jaoks kogemus on parim õpetaja.",
    "date": "2026-10-06",
    "startTime": "13:00",
    "endTime": "14:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/ettevotlus-ja-paarisuhe-papsid-studio-mindzis",
    "registrationUrl": "https://fienta.com/ettevotlus-ja-paarisuhe-papsid-studio-mindzis",
    "letter": papsidLetter,
    "registrationStatus": "open"
  },
  {
    "id": "202947",
    "fientaEventId": "202947",
    "title": "Kuidas TAASkäivitada meiliturundust?",
    "speaker": "Timo Porval",
    "shortDescription": "Kontaktid on olemas, aga kirju pole ammu saatnud? Või polegi neile kunagi regulaarselt kirjutanud? Kuidas pärast pikka pausi uuesti alustada nii, et meiliturundus seekord jälle mõne nädala pärast soiku ei jääks?",
    "description": "Kontaktid on olemas, aga kirju pole ammu saatnud? Või polegi neile kunagi regulaarselt kirjutanud? Kuidas pärast pikka pausi uuesti alustada nii, et meiliturundus seekord jälle mõne nädala pärast soiku ei jääks?\n\nKellele?\n\nTurundajatele ja juba tegutsevatele ettevõtjatele, kellel on meililist olemas ja meiliturundusega varem alustatud, kuid kirjade saatmine on mingil põhjusel seisma jäänud.\n\nMida koolituselt saad?\n\nTimo aitab läbi mõelda, mida teha olemasolevate kontaktidega, kuidas pärast pausi uuesti kirjutama hakata ning kuidas kujundada endale toimivam ja järjepidevam viis meiliturundusega tegelemiseks.\n\nJuttu tuleb ka sellest, mida tasub meiliturunduses 2026. aasta sügisel silmas pidada, milliseid numbreid jälgida ning kuidas AI on kirjade loomist ja meiliturunduse tööviise muutnud.\n\nEesmärk on, et meiliturundus saaks päriselt uuesti käima ja jääks toimima.\n\nKoolitaja\n\nTimo Porval on digiagentuuri Lavii ja Turunduslabori asutaja. Üle 15 aasta on ta aidanud ettevõtetel kasvada ning toonud turule sadu kampaaniaid ja lahendusi. Lisaks on ta olnud üks konverentside SEO Estonia ja Ettevõtlik Mees eestvedajatest.",
    "date": "2026-10-06",
    "startTime": "15:00",
    "endTime": "16:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/taaskaivitada-meiliturundust-timo-porval-studio-mindzis",
    "registrationUrl": "https://fienta.com/taaskaivitada-meiliturundust-timo-porval-studio-mindzis",
    "registrationStatus": "open",
    "slidesUrl": "https://drive.google.com/file/d/14raFc2bkuxazP08I2wUH69nlJFWP3o-3/view?usp=drive_link"
  },
  {
    "id": "202945",
    "fientaEventId": "202945",
    "title": "Kogemuslugu: kuidas viia AI kasutamine juhina töötajateni?",
    "speaker": "Ulvi Kala",
    "shortDescription": "Ulvi Kala jagab ausat kogemuslugu sellest, miks ei saa AI-koolitustelt saadud lahendusi oma ettevõttesse üks ühele üle võtta ning kuidas päriselus tuleb leida oma ettevõtte inimestele, tööviisidele ja vajadustele sobiv lähenemine.",
    "description": "Ulvi Kala jagab ausat kogemuslugu sellest, miks ei saa AI-koolitustelt saadud lahendusi oma ettevõttesse üks ühele üle võtta ning kuidas päriselus tuleb leida oma ettevõtte inimestele, tööviisidele ja vajadustele sobiv lähenemine.\n\nFookuses ei ole samm-sammuline õpetus, vaid see, mis on päriselus hästi töötanud, milliseid ämbreid on ette tulnud ja mida on tulnud oma ettevõtte jaoks ümber mõelda.\n\nKellele?\n\nVäikese ja keskmise ettevõtte juhtidele ning osakonnajuhtidele, kes juba kasutavad AI-d enda töös ja tahavad järgmise sammuna rakendada seda teadlikumalt kogu ettevõtte kontekstis.\n\nMida kogemusloost saad?\n\nSaad ühe päris ettevõtte näitel vaadata, mis muutub siis, kui AI ei ole enam ainult juhi isiklik töövahend, vaid hakkab jõudma ka ettevõtte töökorraldusse ja töötajate igapäevasesse töösse.\n\nUlvi jagab nii õnnestumisi kui ka kohti, kus algne idee või koolituselt saadud soovitus päriselus ei töötanud ning tuli oma ettevõtte järgi ümber teha või kõrvale jätta.\n\nSee ei ole agentide või suurte automatsioonide ehitamise koolitus. Fookuses on igapäevane LLMide kasutamine ettevõtte teadmiste, juhtimise ja meeskonnatöö toetamiseks.\n\nUlvi kogemuslugu on kohtumise alguspunkt. Edasi ootame ka osalejaid jagama enda kogemusi, õnnestumisi ja ämbreid, et koos arutada, mis AI kasutusele võtmisel päriselus töötab, mis võib valesti minna ja mida tasub oma ettevõttes tähele panna.\n\nEesmärk on saada motivatsiooni AI-d oma ettevõttes päriselt kasutama hakata ning näha, et selleks ei ole üht universaalset mudelit. Lahendus kujuneb iga ettevõtte enda tööviiside, inimeste ja vajaduste järgi.\n\nKoolitaja\n\nUlvi Kala on Baltic Intertexi tegevjuht ja juhatuse liige ning ettevõtlusmentor ja coach. Ta on Baltic Intertexi juhtinud üle 25 aasta ning jagab kohtumisel enda värsket praktilist kogemust AI kasutamisest juhi töös ja selle kasutuse laiendamisest ettevõtte sees.",
    "date": "2026-10-06",
    "startTime": "17:30",
    "endTime": "19:00",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/ai-ettevottes-kogemuslugu-ulvi-kala-studio-mindzis",
    "registrationUrl": "https://fienta.com/ai-ettevottes-kogemuslugu-ulvi-kala-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202966",
    "fientaEventId": "202966",
    "capacity": 25,
    "title": "Morning Mindset: alusta päeva selgema pea ja parema fookusega",
    "speaker": "Kiia Paal",
    "shortDescription": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.",
    "description": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.\n\nMorning Mindset on viiest praktilisest hommikusessioonist koosnev sari, mis aitab märgata ja paremini juhtida seda, kuidas sa oma tööpäeva alustad, millele tähelepanu annad, kuidas pinge all reageerid ning kuidas töörežiimist välja tuled.\n\nKellele?\n\nMorning Mindset sobib ettevõtjale, juhile, töötajale või ettevõtlusnädala osalejale, kes soovib alustada päeva teadlikumalt, paremini keskenduda ning saada kaasa praktilisi enesejuhtimise tööriistu.\n\nVarasem kogemus tähelepanu-, hingamis- või lõdvestusharjutustega ei ole vajalik. Piisab uudishimust ja valmisolekust korraks tavapärasest töötempost välja astuda.\n\nOsaleda võib kogu viiepäevases sarjas või valida just need hommikud, mille teema sind kõige rohkem kõnetab. Iga kohtumine on iseseisev tervik, kuid kõik viis koos moodustavad tervikliku enesejuhtimise nädala.\n\nMida koolituselt saad?\n\nViiel hommikul keskendume viiele praktilisele enesejuhtimise oskusele – selgusele, tegutsemisvalmidusele, tasakaalu hoidmisele surve all, loovale mõtlemisele ning nädala teadlikule lõpetamisele ja taastumisele.\n\nIga hommik ühendab lühikese teaduspõhise või psühholoogilise sissevaate praktilise enesevaatluse ja juhendatud kogemusega. Morning Mindset ei toetu ühele koolkonnale ega ühele „õigele“ tehnikale – kokku saavad tähelepanu juhtimine, käitumisteadus, stressiregulatsioon, juhendatud kujutlus, lõdvestus, loov probleemilahendus ja refleksioon.\n\nEsmaspäev – SELGUS: mis on päriselt oluline?\n\nKorrastame tähelepanu ja prioriteete ning vaatame, kuidas liikuda heast kavatsusest ühe konkreetse järgmise sammuni.\n\nTeisipäev – TEGUTSEMISVALMIDUS: kuidas ennast tööpäevaks käima saada?\n\nUurime, mis mõjutab meie energiat ja tegutsemisvalmidust ning kuidas liikuda motivatsiooni ootamisest esimese reaalse tegevuseni.\n\nKolmapäev – TASAKAAL SURVE ALL: stress ei pea tegema järgmist otsust sinu eest.\n\nHarjutame, kuidas märgata oma pingereaktsiooni varem, luua reageerimise ja tegevuse vahele rohkem ruumi ning valida automaatse reaktsiooni asemel teadlikum järgmine samm.\n\nNeljapäev – LOOV MÕTLEMINE: kui rohkem pingutamine enam ei aita.\n\nKatsetame, kuidas tähelepanu, liikumise ja vaatenurga muutmine võib aidata väljuda harjumuspärasest mõtterajast ning märgata uusi ideid ja lahendusi.\n\nReede – TEADLIK LÕPETAMINE JA TAASTUMINE: mida võtan kaasa ja mida võin jätta siia?\n\nMärkame nädala jooksul toimunud edasiminekut, korrastame lahtised mõtted ning loome rahulikuma ülemineku töörežiimist puhkusele ja järgmisse nädalasse.\n\nIga hommik annab kaasa vähemalt ühe praktilise võtte või mõtteviisi, mida saad hiljem kasutada ka keset kiiret tööpäeva.\n\nKoolitaja\n\nKiia Paal on täiskasvanute koolitaja, ettevõtja ja Studio MindZ asutaja. Tal on üle kümne aasta kogemust inimeste ja gruppide koolitamise ning juhendamisega.\n\nOma töös ühendab Kiia täiskasvanuõppe ja ettevõtluskogemuse psühholoogia, tähelepanu juhtimise, stressijuhtimise ning praktiliste enesejuhtimise meetoditega. Tema koolitusi iseloomustab rahulik, empaatiline ja praktiline lähenemine, mis aitab uued teadmised siduda osaleja enda tööolukordade ja igapäevaste valikutega.",
    "date": "2026-10-07",
    "startTime": "08:30",
    "endTime": "09:15",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/morning-mindset-07-10-studio-mindzis",
    "registrationUrl": "https://fienta.com/morning-mindset-07-10-studio-mindzis",
    "seriesUrl": "https://fienta.com/et/s/kiia-morning-mindset-kiia-paal-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202948",
    "fientaEventId": "202948",
    "title": "SEO lihtsalt: kuidas Google'is ja AI-s usaldust kasvatada?",
    "speaker": "Roland Kivitare",
    "shortDescription": "Saad keerulisest SEO valdkonnast lihtsa tervikpildi ning mõistad paremini, kuidas kasvatada ettevõtte usaldust Google'is ja AI-põhistes otsingutes. Koolitus aitab sul SEO-s paremaid otsuseid teha: mida tellida eksperdilt, mida teha ise ja milliseid tulemusi on realistlik oodata.",
    "description": "Saad keerulisest SEO valdkonnast lihtsa tervikpildi ning mõistad paremini, kuidas kasvatada ettevõtte usaldust Google'is ja AI-põhistes otsingutes. Koolitus aitab sul SEO-s paremaid otsuseid teha: mida tellida eksperdilt, mida teha ise ja milliseid tulemusi on realistlik oodata.\n\nKellele?\n\nJuba tegutsevate ettevõtete juhtidele ja turundusjuhtidele, kes tahavad SEO-sse teadlikumalt panustada ning paremini mõista, mida teha ise ja mida tellida eksperdilt.\n\nKõige rohkem saab koolitusest kasu ettevõte, kellel on turundustegevused juba käimas ja soov SEO-ga pikemalt tegeleda, mitte otsida ühekordset kiiret parandust.\n\nMida koolituselt saad?\n\nSEO võib tunduda lõputu nimekirjana: märksõnad, lingid, kohalik SEO, sisu, tehniline pool, Google'i tööriistad ja nüüd veel AI. Roland aitab näha, kuidas need osad omavahel kokku käivad ja millised neist on sinu ettevõtte jaoks päriselt olulised.\n\nRäägime ka sellest, miks SEO tulemused võtavad aega. Üks audit või tehniline parandus ei vii ettevõtet automaatselt Google'i esilehele ning kõiki muutusi ei ole võimalik kohe numbrites näha.\n\nPärast koolitust oskad paremini hinnata, kas SEO-ga on mõistlik tegeleda ettevõttes ise või kaasata ekspert. Teenust sisse ostes oled teadlikum tellija ja oskad küsida paremaid küsimusi. Samuti on sul lihtsam hinnata, kas sinu ettevõtte SEO liigub õiges suunas.\n\nKoolitaja\n\nRoland Kivitare on kogenud SEO ekspert ja praktik ning aktiivne Turunduslabori liige. Ta keskendub keerulise SEO valdkonna selgitamisele lihtsas ja arusaadavas keeles.\n\nRoland koolitas ka eelmisel Tartu Ettevõtlusnädalal Studio MindZis. Tema koolitus tõi saali täis osalejaid ja sai väga positiivset tagasisidet.",
    "date": "2026-10-07",
    "startTime": "10:00",
    "endTime": "11:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/seo-lihtsalt-roland-kivitare-studio-mindzis",
    "registrationUrl": "https://fienta.com/seo-lihtsalt-roland-kivitare-studio-mindzis",
    "slidesUrl": "https://claude.ai/artifact/VVMQCew8TD2YYw217ro9P1",
    "registrationStatus": "open"
  },
  {
    "id": "202949",
    "fientaEventId": "202949",
    "title": "Turundajalt turundajatele turundusest",
    "speaker": "Katrin Vilimaa-Otsing",
    "shortDescription": "See eriline kohtumine on ainult turundajatele. Katrin Vilimaa-Otsing jagab värsket ekspertvaadet sellele, mis turunduses praegu toimub ja toimib, ning saad suhelda teiste turundajatega professionaalsel tasemel, jagades kogemusi ja märkamisi.",
    "description": "See eriline kohtumine on ainult turundajatele. Katrin Vilimaa-Otsing jagab värsket ekspertvaadet sellele, mis turunduses praegu toimub ja toimib, ning saad suhelda teiste turundajatega professionaalsel tasemel, jagades kogemusi ja märkamisi.\n\nKellele?\n\nKogenud turundajatele, kes tegelevad turundusega igapäevaselt ja tahavad hoida end valdkonna arengutega kursis ning võrrelda oma tähelepanekuid teiste turundajate kogemustega.\n\nSee ei ole turunduse baaskoolitus. Eeldame, et turunduse põhimõisted ja tavapärased töövahendid on juba tuttavad. Konversioon, ROI, Tag Manager ja muu valdkonna sõnavara on siin ühine keel.\n\nMida koolituselt saad?\n\nKatrin jagab oma tähelepanekuid sellest, mis on turunduses muutunud, mis tema kogemuse põhjal endiselt toimib ja mille suhtes tasub praegu tähelepanelikum olla.\n\nTema vaade põhineb nii igapäevasel klienditööl kui ka pideval enesetäiendamisel, rahvusvahelistel koolitustel, konverentsidel ja valdkonna arengute jälgimisel. Ta toob sellest infovoost välja selle, mida peab Eesti turundaja jaoks praegu oluliseks.\n\nJuttu tuleb ka AI mõjust turundusele, platvormide ja tehniliste lahenduste muutustest ning sellest, kuidas need turundaja igapäevatööd mõjutavad.\n\nLisaks Katrini jagamistele jääb aega küsimusteks, kogemuste võrdlemiseks ja turundajate omavaheliseks aruteluks.\n\nKoolitaja\n\nKatrin Vilimaa-Otsing on pika kogemusega turundusekspert, strateeg ja koolitaja. IT-haridus aitab tal vaadata uusi tööriistu ja valdkonna muudatusi ka tehnilise pilguga. Ta tegeleb nii turundusstrateegiate, kampaaniate ja reklaamiplatvormide kui ka analüütika ja turunduse tehnilisema poolega.",
    "date": "2026-10-07",
    "startTime": "12:30",
    "endTime": "14:00",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/turundajalt-turundajatele-turundusest-katrin-vilimaa-otsing-studio-mindzis",
    "registrationUrl": "https://fienta.com/turundajalt-turundajatele-turundusest-katrin-vilimaa-otsing-studio-mindzis",
    "registrationStatus": "open",
    "slidesUrl": "https://drive.google.com/file/d/141cibWwDQhcRl_0QpW_Z7mjqxkWJe9Xe/view?usp=sharing"
  },
  {
    "id": "202952",
    "fientaEventId": "202952",
    "title": "Halda ja muuda oma WordPressi lehte AI abil",
    "speaker": "Marika Juusu",
    "shortDescription": "Sul on WordPressi koduleht ja oskad seda ise hallata. Aga mis muutub siis, kui järgmise maandumislehe, uue sektsiooni või väikese paranduse tegemiseks ei pea enam WordPressis ise nupp nupu haaval tegutsema? Marika näitab, kuidas anda ülesanne AI-le nii, et see saab sinu WordPressi lehel päriselt tegutseda, sina aga juhid ja kontrollid tulemust.",
    "description": "Sul on WordPressi koduleht ja oskad seda ise hallata. Aga mis muutub siis, kui järgmise maandumislehe, uue sektsiooni või väikese paranduse tegemiseks ei pea enam WordPressis ise nupp nupu haaval tegutsema? Marika näitab, kuidas anda ülesanne AI-le nii, et see saab sinu WordPressi lehel päriselt tegutseda, sina aga juhid ja kontrollid tulemust.\n\nKellele?\n\nNeile, kellel on juba olemas WordPressi koduleht ja varasem kogemus selle iseseisva haldamisega.\n\nSee ei ole WordPressi ega kodulehe tegemise algkursus. Eeldame, et saad aru oma lehe ülesehitusest, oskad WordPressi adminis ise toimetada ning tead, kuidas sinu leht on üles ehitatud, näiteks millist lehe-ehitajat või pluginaid kasutad.\n\nSinu amet või roll ei ole oluline. Oluline on olemasolev WordPressi oskus ja soov õppida lehte AI abil kiiremini ning teistmoodi haldama.\n\nMida koolituselt saad?\n\nNäed, kuidas Marika kasutab AI-d oma igapäevases WordPressi töös ning milliseid ülesandeid saab uue tööviisiga teha teisiti kui seni.\n\nVaatame näiteks, kuidas lasta AI-l luua ja muuta lehti või sektsioone, teha maandumislehti ja muid igapäevaseid veebimuudatusi. Marika jagab oma praktilisi kogemusi sellest, kuidas AI-le ülesandeid anda, mida enne muudatuse tegemist kontrollida ning milliseid vigu ja tõrkeid võib ette tulla.\n\nNäidetes kasutab Marika ChatGPT Codexit, kuid sama tööviisi saab kasutada ka teiste koodiga töötavate AI-lahendustega, näiteks Claude Code'iga.\n\nKoolitusel näed ka, kuidas luua ühendus AI ja oma WordPressi lehe vahel. Kui võtad arvuti kaasa, saad ühenduse Marika juhendamisel ka enda lehel seadistada ja esimesi samme kohe proovida. Kui arvutit kaasa ei võta, saad sama hiljem iseseisvalt läbi teha.\n\nKoolitaja\n\nMarika Juusu on Veebikooli kaasasutaja, koolitaja ja turunduspraktik, kes õpetab ettevõtjatele WordPressi ning veebis tegutsemise praktilist poolt. Oma koolitustel näitab ta lahendusi, mida kasutab ka ise: kuidas veebilehti kiiremini ehitada ja muuta ning kasutada AI-d nii, et sellest oleks igapäevases töös päriselt kasu.",
    "date": "2026-10-07",
    "startTime": "15:00",
    "endTime": "17:00",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/wordpressi-haldamine-ai-abil-marika-juusu-studio-mindzis",
    "registrationUrl": "https://fienta.com/wordpressi-haldamine-ai-abil-marika-juusu-studio-mindzis",
    "registrationStatus": "open",
    "slidesUrl": "https://docs.google.com/presentation/d/1hJGGtyD8RNogs4_RE25Dd5WiwReoLZGm9IinLLtc0pk/edit?usp=sharing"
  },
  {
    "id": "202958",
    "fientaEventId": "202958",
    "capacity": 36,
    "title": "Nähtamatud mõjutajad ettevõttes: miks samad probleemid korduvad?",
    "speaker": "Ivar Raav",
    "shortDescription": "Mõnikord teed ettevõttes ikka ja jälle justkui õigeid asju, aga sama probleem tuleb tagasi. Turundad rohkem, kuid kliente ei lisandu. Muudad töökorraldust, aga meeskonnas kordub sama pinge. Proovid uut lahendust, kuid mõne aja pärast oled tuttavas kohas tagasi. Selles praktilises töötoas aitab Ivar Raav vaadata nähtavast probleemist sügavamale ja märgata, mis seda sinu ettevõttes tegelikult üleval hoiab.",
    "description": "Mõnikord teed ettevõttes ikka ja jälle justkui õigeid asju, aga sama probleem tuleb tagasi. Turundad rohkem, kuid kliente ei lisandu. Muudad töökorraldust, aga meeskonnas kordub sama pinge. Proovid uut lahendust, kuid mõne aja pärast oled tuttavas kohas tagasi. Selles praktilises töötoas aitab Ivar Raav vaadata nähtavast probleemist sügavamale ja märgata, mis seda sinu ettevõttes tegelikult üleval hoiab.\n\nKellele?\n\nEttevõtjatele, omanikele, tegevjuhtidele ja teistele inimestele, kellel on ettevõttes otsustusõigus ning kes puutuvad kokku mõne probleemiga, mis kipub hoolimata tehtud muudatustest korduma.\n\nEttevõtte suurus ei ole oluline. Võid töötada oma ettevõttes üksi, juhtida väikest meeskonda või vastutada suure organisatsiooni eest. Oluline on, et saad ise oma juhtimisotsuseid ja ettevõtte toimimist mõjutada ning oled valmis vaatama ka seda, kuidas sinu enda harjumused, suhted ja mõtteviisid ettevõttes toimuvat kujundavad.\n\nMida töötoast saad?\n\nSee ei ole loeng, vaid praktiline töötuba. Töötame osalejate päris ettevõtlus- ja juhtimisprobleemidega ning otsime nende nähtavate sümptomite taga olevaid mõjutajaid.\n\nMiks võib sama probleem ettevõttes ikka uuesti tekkida, kuigi oled proovinud seda lahendada? Milline seos võib sellel olla sinu suhtega raha, klientide, töötajate, vastutuse või ettevõtte kasvuga? Millist probleemi püüad praegu lahendada tegevusega, kuigi tähelepanu vajab tegelikult midagi muud?\n\nIvar kasutab töötoas organisatsiooni süsteemse sekkumise harjutusi, mis aitavad tuua nähtavale suhteid, uskumusi ja mustreid, mida igapäevases tööelus on keeruline märgata. Sõltuvalt grupist toimub töö individuaalselt või väiksemates gruppides.\n\nTöötoa eesmärk ei ole anda sulle veel üht tegevuste nimekirja. Eesmärk on aidata näha korduvat probleemi teise nurga alt, jõuda lähemale selle tegelikule põhjusele ning märgata, mida saad juhina ise muuta.\n\nLahkud töötoast julgema pilguga oma ettevõtte probleemidele ja parema oskusega küsida nähtava sümptomi kõrval ka: mis seda tegelikult põhjustab?\n\nKoolitaja\n\nIvar Raav on holistiline juhtimiskoolitaja, mentor ja konsultant, kelle töö keskendub juhtimise esmapilgul nähtamatule tasandile ning sellele, miks organisatsioonides samad süsteemsed probleemid korduma jäävad.\n\nTa ühendab oma töös pika praktilise juhtimiskogemuse, organisatsioonikäitumise teadmised ning süsteemse ja terapeutilise vaate. Ivar on raamatu „Juhtimise jalajälg\" autor ning tema koolituste keskmes on sageli juhi enda mõju sellele, milline kultuur, koostöö ja tulemuslikkus organisatsioonis kujuneb.",
    "date": "2026-10-07",
    "startTime": "18:00",
    "endTime": "20:00",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/nahtamatud-mojutajad-ettevottes-ivar-raav-studio-mindzis",
    "registrationUrl": "https://fienta.com/nahtamatud-mojutajad-ettevottes-ivar-raav-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202967",
    "fientaEventId": "202967",
    "capacity": 25,
    "title": "Morning Mindset: alusta päeva selgema pea ja parema fookusega",
    "speaker": "Kiia Paal",
    "shortDescription": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.",
    "description": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.\n\nMorning Mindset on viiest praktilisest hommikusessioonist koosnev sari, mis aitab märgata ja paremini juhtida seda, kuidas sa oma tööpäeva alustad, millele tähelepanu annad, kuidas pinge all reageerid ning kuidas töörežiimist välja tuled.\n\nKellele?\n\nMorning Mindset sobib ettevõtjale, juhile, töötajale või ettevõtlusnädala osalejale, kes soovib alustada päeva teadlikumalt, paremini keskenduda ning saada kaasa praktilisi enesejuhtimise tööriistu.\n\nVarasem kogemus tähelepanu-, hingamis- või lõdvestusharjutustega ei ole vajalik. Piisab uudishimust ja valmisolekust korraks tavapärasest töötempost välja astuda.\n\nOsaleda võib kogu viiepäevases sarjas või valida just need hommikud, mille teema sind kõige rohkem kõnetab. Iga kohtumine on iseseisev tervik, kuid kõik viis koos moodustavad tervikliku enesejuhtimise nädala.\n\nMida koolituselt saad?\n\nViiel hommikul keskendume viiele praktilisele enesejuhtimise oskusele – selgusele, tegutsemisvalmidusele, tasakaalu hoidmisele surve all, loovale mõtlemisele ning nädala teadlikule lõpetamisele ja taastumisele.\n\nIga hommik ühendab lühikese teaduspõhise või psühholoogilise sissevaate praktilise enesevaatluse ja juhendatud kogemusega. Morning Mindset ei toetu ühele koolkonnale ega ühele „õigele“ tehnikale – kokku saavad tähelepanu juhtimine, käitumisteadus, stressiregulatsioon, juhendatud kujutlus, lõdvestus, loov probleemilahendus ja refleksioon.\n\nEsmaspäev – SELGUS: mis on päriselt oluline?\n\nKorrastame tähelepanu ja prioriteete ning vaatame, kuidas liikuda heast kavatsusest ühe konkreetse järgmise sammuni.\n\nTeisipäev – TEGUTSEMISVALMIDUS: kuidas ennast tööpäevaks käima saada?\n\nUurime, mis mõjutab meie energiat ja tegutsemisvalmidust ning kuidas liikuda motivatsiooni ootamisest esimese reaalse tegevuseni.\n\nKolmapäev – TASAKAAL SURVE ALL: stress ei pea tegema järgmist otsust sinu eest.\n\nHarjutame, kuidas märgata oma pingereaktsiooni varem, luua reageerimise ja tegevuse vahele rohkem ruumi ning valida automaatse reaktsiooni asemel teadlikum järgmine samm.\n\nNeljapäev – LOOV MÕTLEMINE: kui rohkem pingutamine enam ei aita.\n\nKatsetame, kuidas tähelepanu, liikumise ja vaatenurga muutmine võib aidata väljuda harjumuspärasest mõtterajast ning märgata uusi ideid ja lahendusi.\n\nReede – TEADLIK LÕPETAMINE JA TAASTUMINE: mida võtan kaasa ja mida võin jätta siia?\n\nMärkame nädala jooksul toimunud edasiminekut, korrastame lahtised mõtted ning loome rahulikuma ülemineku töörežiimist puhkusele ja järgmisse nädalasse.\n\nIga hommik annab kaasa vähemalt ühe praktilise võtte või mõtteviisi, mida saad hiljem kasutada ka keset kiiret tööpäeva.\n\nKoolitaja\n\nKiia Paal on täiskasvanute koolitaja, ettevõtja ja Studio MindZ asutaja. Tal on üle kümne aasta kogemust inimeste ja gruppide koolitamise ning juhendamisega.\n\nOma töös ühendab Kiia täiskasvanuõppe ja ettevõtluskogemuse psühholoogia, tähelepanu juhtimise, stressijuhtimise ning praktiliste enesejuhtimise meetoditega. Tema koolitusi iseloomustab rahulik, empaatiline ja praktiline lähenemine, mis aitab uued teadmised siduda osaleja enda tööolukordade ja igapäevaste valikutega.",
    "date": "2026-10-08",
    "startTime": "08:30",
    "endTime": "09:15",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/morning-mindset-08-10-studio-mindzis",
    "registrationUrl": "https://fienta.com/morning-mindset-08-10-studio-mindzis",
    "seriesUrl": "https://fienta.com/et/s/kiia-morning-mindset-kiia-paal-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202936",
    "fientaEventId": "202936",
    "title": "Kuidas muuta toimiv ettevõte kliendikesksemaks?",
    "speaker": "Katrin Differt",
    "shortDescription": "Kui ettevõttel on toimiv toode või teenus, kliendid ja meeskond, võib järgmine samm olla kliendikogemuse teadlik arendamine. Koolitus aitab mõista, kuidas muuta juba hea ettevõte veel hinnatumaks, eristuvamaks ja kliendikesksemaks.",
    "description": "Kui ettevõttel on toimiv toode või teenus, kliendid ja meeskond, võib järgmine samm olla kliendikogemuse teadlik arendamine. Koolitus aitab mõista, kuidas muuta juba hea ettevõte veel hinnatumaks, eristuvamaks ja kliendikesksemaks.\n\nKellele?\n\nKoolitus on mõeldud eelkõige juba toimivate ettevõtete omanikele ja juhtidele ning personali-, teenindus-, meeskonna- ja valdkonnajuhtidele, kellel on võimalus mõjutada ettevõtte tööviise ja kliendikogemust.\n\nKõige rohkem saab koolitusest kasu inimene, kelle ettevõttes on kliendikesksuse olulisus juba läbi mõeldud ja otsus selles suunas liikuda tehtud. Küsimus ei ole enam selles, kas kliendikogemusega tegeleda, vaid kuidas sellest kujundada kogu ettevõtet ühendav mõtteviis.\n\nMida koolituselt saad?\n\nSaad terviklikuma arusaama sellest, mida kliendikesksus ettevõtte jaoks tähendab ja miks suurepärane kliendikogemus ei sünni ainult heast teenindusest.\n\nKoolitus aitab näha, kuidas ettevõtte erinevate meeskondade, juhtide ja töötajate tegevus kokku kujundab kliendi kogemuse ning miks selle parandamine vajab teadlikku juhtimist ja koostööd kogu ettevõttes.\n\nSaad inspiratsiooni ja uusi vaatenurki, kuidas kliendikesksusest mõelda ning milline mõtteviis aitab muuta selle kogu ettevõtte loomulikuks osaks. Praktilised sammud ja näited tulevad jutu käigus, kuid koolituse põhirõhk on arusaamisel, miks kliendikesksus peab olema ettevõtteülene valik, mitte ühe inimese või osakonna ülesanne.\n\nKoolitaja\n\nKatrin Differt on kliendikogemuse ekspert, kelle missioon on aidata ettevõtetel muuta kliendikogemus strateegiliseks prioriteediks kogu organisatsioonis. Ta teeb seda 360°Kogemuse kaudu, pakkudes mentorlust, kliendikogemuse auditeid, klienditeekonna kaardistamist, töötubasid ja koolitusi.",
    "date": "2026-10-08",
    "startTime": "10:00",
    "endTime": "11:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/kliendikeskne-ettevote-katrin-differt-studio-mindzis",
    "registrationUrl": "https://fienta.com/kliendikeskne-ettevote-katrin-differt-studio-mindzis",
    "registrationStatus": "open",
    "slidesUrl": "https://canva.link/v71f2n3gbv8u8dv"
  },
  {
    "id": "202957",
    "fientaEventId": "202957",
    "title": "Riskijaht ettevõttes: leia ohud enne, kui need leiavad sinu",
    "speaker": "Taavi Lukas ja Anders Veetamm",
    "shortDescription": "Töötaja palkamine ei tähenda ainult uut palgakulu. Hetkest, mil sinu ettevõttes töötavad teised inimesed, tuleb hakata teadlikult mõtlema ka sellele, millistes tingimustes nad töötavad, millised riskid nende tööga kaasnevad ja mida peab tööandja nende maandamiseks tegema. Taavi Lukas ja Anders Veetamm aitavad vaadata oma ettevõtet värske pilguga ning märgata ohukohti enne, kui neist saavad õnnetused, tööseisakud või ootamatud kulud.",
    "description": "Töötaja palkamine ei tähenda ainult uut palgakulu. Hetkest, mil sinu ettevõttes töötavad teised inimesed, tuleb hakata teadlikult mõtlema ka sellele, millistes tingimustes nad töötavad, millised riskid nende tööga kaasnevad ja mida peab tööandja nende maandamiseks tegema. Taavi Lukas ja Anders Veetamm aitavad vaadata oma ettevõtet värske pilguga ning märgata ohukohti enne, kui neist saavad õnnetused, tööseisakud või ootamatud kulud.\n\nKellele?\n\nTegutsevatele ettevõtjatele ja juhtidele, kelle ettevõttes on töötajad või kelle meeskond kasvab.\n\nEriti kasulik on koolitus siis, kui ettevõte on jõudnud etapist „teen ise\" selleni, et töö eest vastutavad juba mitmed inimesed. Koos töötajatega tekivad tööandjale ka uued küsimused: millist väljaõpet ja juhendamist inimesed vajavad, millised riskid tuleb läbi mõelda, milliseid kaitsevahendeid võib töö tegemiseks vaja olla ning kas vajalik tööohutuse korraldus ja dokumentatsioon on olemas.\n\nMida koolituselt saad?\n\nÕpid vaatama tööohutust mitte ainult nõuete ja dokumentide, vaid ettevõtte igapäevase juhtimise osana.\n\nTeeme praktilise „riskijahi\" ja vaatame päris näidete kaudu, milliseid ohukohti võib ettevõtja harjumusest enam mitte märgata. Need ei pruugi olla ainult suured ja silmaga nähtavad ohud. Probleem võib peituda töövahendites, töökorralduses, juhendamises, kaitsevahendites või selles, et mõni oluline risk on lihtsalt jäänud läbi mõtlemata.\n\nRäägime ka sellest, mida töötaja töölevõtmine tööandja jaoks muudab. Millised tööohutuse teemad tasub kohe alguses paika panna? Millal on vaja riskianalüüsi? Mida peab töötaja teadma enne tööle asumist? Ja millised näiliselt väikesed tegematajätmised võivad hiljem ettevõtjale kõige kallimaks maksma minna?\n\nEesmärk on, et oskad pärast koolitust oma ettevõttes paremini märgata kohti, mida tasub üle kontrollida ja parandada, enne kui probleem endast ise märku annab.\n\nKoolitajad\n\nTaavi Lukas on Kukkumiskaitse OÜ tegevjuht-koolitaja, kes on tööohutuse valdkonnas tegutsenud alates 2002. aastast. Tal on töökeskkonna spetsialisti ja konsultandina kogemus nii tööstus- kui teenindusettevõtetega ning ta on 6. taseme täiskasvanute koolitaja.\n\nAnders Veetamm on Kukkumiskaitse koolitaja, kelle töökogemus ulatub Eesti kõrval Soome, Rootsi, Saksamaale ja Austraaliasse. Erinevates riikides töötamine on andnud talle praktilise vaate sellele, kuidas ohutuskultuur ja töövõtted ettevõtetes erinevad.",
    "date": "2026-10-08",
    "startTime": "12:30",
    "endTime": "14:00",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/riskijaht-ettevottes-taavi-lukas-anders-veetamm-studio-mindzis",
    "registrationUrl": "https://fienta.com/riskijaht-ettevottes-taavi-lukas-anders-veetamm-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202954",
    "fientaEventId": "202954",
    "title": "Müügikõnede töötuba: kuidas helistada külmadele ja soovitatud kontaktidele?",
    "speaker": "Tambet Tallo",
    "shortDescription": "Selles aktiivses müügikõnede töötoas saad harjutada, kuidas alustada vestlust nii külma kontakti kui ka soovituste kaudu saadud inimesega ning liikuda kõnes loomulikult edasi päris müügivestluseni.",
    "description": "Selles aktiivses müügikõnede töötoas saad harjutada, kuidas alustada vestlust nii külma kontakti kui ka soovituste kaudu saadud inimesega ning liikuda kõnes loomulikult edasi päris müügivestluseni.\n\nKellele?\n\nInimestele, kelle töö osa on müük ja kes tahavad oma müügikõnede oskust paremaks saada.\n\nSobib müügiinimestele, ettevõtjatele, vabakutselistele, müügijuhtidele, tiimijuhtidele, tegevjuhtidele ja teistele, kelle töö osa on müük. Ametinimetusest olulisem on see, et sul on olemas toimiv toode või teenus, tead, kellele seda müüd, ning tahad jõuda uute klientideni külmade või soovitatud kontaktide kaudu.\n\nSee ei ole müügi algkursus ega koht, kus alles testida, kas sinu tootel või teenusel võiks turgu olla. Kõige rohkem saad töötoast kasu siis, kui müügikõnede tegemine on või peaks olema sinu töö regulaarne osa.\n\nMida koolituselt saad?\n\nTambet näitab, kuidas valmistuda kõneks, alustada vestlust ja rääkida oma tootest või teenusest nii, et kõne ei muutuks lihtsalt päheõpitud müügiteksti ettelugemiseks.\n\nVaatame eraldi külma kontakti ja soovitatud kontakti. Kuidas neid vestlusi alustada? Kuidas jõuda kiiresti selleni, kas inimesel võiks sinu pakutava vastu huvi olla? Kuidas küsida küsimusi, kuulata vastuseid ning tulla toime olukorraga, kus esimene reaktsioon on „ei ole huvitatud\"?\n\nSee ei ole ainult kuulamise koolitus. Teooria vaheldub harjutamise, küsimuste ja rollimängudega, kus saad erinevaid müügiolukordi ise läbi proovida ning Tambetilt tagasisidet.\n\nEesmärk on, et pärast koolitust ei oleks sul lihtsalt rohkem teadmisi müügikõnedest, vaid oleksid neid ka harjutanud ja tunneksid end järgmisele kontaktile helistades kindlamalt.\n\nKoolitaja\n\nTambet Tallo on Combat Ready müügi- ja juhtimiscoach ning ICF-i sertifitseeritud coach. Tal on pikaajaline praktiline kogemus nii müümise, müügiinimeste treenimise kui ka juhtide ja müügimeeskondade arendamisega.\n\nTema enda müügitaust ulatub Southwestern Advantage'i aega, kus ta töötas aastaid aktiivses müügis ning värbas ja treenis müügiinimesi. Tänases töös aitab Tambet ettevõtjatel, juhtidel ja müügiinimestel muuta müügiteadmised järjepidevaks tegevuseks ja paremaks tulemuseks.",
    "date": "2026-10-08",
    "startTime": "15:00",
    "endTime": "16:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/muugikonede-tootuba-tambet-tallo-studio-mindzis",
    "registrationUrl": "https://fienta.com/muugikonede-tootuba-tambet-tallo-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202959",
    "fientaEventId": "202959",
    "title": "Küsida võib kõike: avameelne vestlusõhtu Epp Kärsiniga",
    "speaker": "Epp Kärsin",
    "shortDescription": "Suurel laval saab kuulata. Väiksemas ringis saab päriselt küsida. Epp Kärsini vestlusõhtul ei ole etteantud loengukava, vaid teemad sünnivad ruumis olevate inimeste küsimustest. Räägime avatult suhetest, lähedusest, seksuaalsusest, eneseväärtustamisest ja kõigest sellest, mida inimene oma eraelust paratamatult ka tööellu kaasa võtab.",
    "description": "Suurel laval saab kuulata. Väiksemas ringis saab päriselt küsida. Epp Kärsini vestlusõhtul ei ole etteantud loengukava, vaid teemad sünnivad ruumis olevate inimeste küsimustest. Räägime avatult suhetest, lähedusest, seksuaalsusest, eneseväärtustamisest ja kõigest sellest, mida inimene oma eraelust paratamatult ka tööellu kaasa võtab.\n\nKellele?\n\nTäiskasvanutele, kes tahavad Epu teemade üle väiksemas ja vahetumas ringis kaasa mõelda ning küsida küsimusi, mille esitamiseks suure konverentsisaali formaat tavaliselt ruumi ei jäta.\n\nVõid tulla üksi või kaaslasega. Sa ei pea olema osalenud Epu päevasel ettekandel ning sa ei pea ise midagi jagama, kui sa seda teha ei soovi.\n\nMida vestlusõhtult saad?\n\nSee ei ole klassikaline koolitus ega Epu päevase ettekande kordus. Tegemist on vaba vestlusõhtuga, kus küsida võib kõike.\n\nMillest me lõpuks räägime, sõltub inimestest, kes õhtul kokku tulevad. Küsimused võivad puudutada paarisuhet ja lähedust, seksuaalsust ja naudingut, eneseväärtustamist, piire ja oma vajadustest rääkimist või seda, kuidas isiklikus elus toimuv mõjutab meie energiat, suhteid teiste inimestega ja tööelu.\n\nEpp on oma vestlusõhtute keskmesse pannud just ausa ja ilma tabudeta rääkimise. Tema enda sõnul ei pretendeeri ta absoluutsele tõele, vaid on kogemuskoolitaja ning julgustab inimesi võtma kaasa selle, mis neid ennast kõnetab.\n\nÕhtu väärtus on võimaluses kuulata, küsida, kaasa mõelda ja saada mõnele seni ütlemata või küsimata küsimusele uus vaatenurk.\n\nKoolitaja\n\nEpp Kärsin on teadliku seksuaalsuse kogemuskoolitaja, kes on oma koolituste ja esinemistega toonud armastuse, läheduse, seksuaalsuse ja eneseväärtustamise teemad Eestis väga suure publiku ette. Oma töös räägib ta neist teemadest avatult ja ilma häbita ning peab oluliseks, et inimesed oskaksid luua paremat kontakti nii iseenda kui oma lähedastega.\n\nEpp teeb ka ettevõtetele meeskonnakoolitusi, kus seob lähisuhete ja isikliku heaolu teemad inimese tööelus kohalolu, suhtlemise ja tulemuslikkusega.",
    "date": "2026-10-08",
    "startTime": "18:00",
    "endTime": "20:00",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/kusida-voib-koike-epp-karsin-studio-mindzis",
    "registrationUrl": "https://fienta.com/kusida-voib-koike-epp-karsin-studio-mindzis",
    "capacity": 60,
    "registrationStatus": "open"
  },
  {
    "id": "202968",
    "fientaEventId": "202968",
    "capacity": 25,
    "title": "Morning Mindset: alusta päeva selgema pea ja parema fookusega",
    "speaker": "Kiia Paal",
    "shortDescription": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.",
    "description": "Enne kohtumisi, koolitusi ja päeva kiiremat tempot võta 45 minutit, et korraks peatuda, mõtted selgemaks saada ning tähelepanu teadlikult eesootavale päevale suunata.\n\nMorning Mindset on viiest praktilisest hommikusessioonist koosnev sari, mis aitab märgata ja paremini juhtida seda, kuidas sa oma tööpäeva alustad, millele tähelepanu annad, kuidas pinge all reageerid ning kuidas töörežiimist välja tuled.\n\nKellele?\n\nMorning Mindset sobib ettevõtjale, juhile, töötajale või ettevõtlusnädala osalejale, kes soovib alustada päeva teadlikumalt, paremini keskenduda ning saada kaasa praktilisi enesejuhtimise tööriistu.\n\nVarasem kogemus tähelepanu-, hingamis- või lõdvestusharjutustega ei ole vajalik. Piisab uudishimust ja valmisolekust korraks tavapärasest töötempost välja astuda.\n\nOsaleda võib kogu viiepäevases sarjas või valida just need hommikud, mille teema sind kõige rohkem kõnetab. Iga kohtumine on iseseisev tervik, kuid kõik viis koos moodustavad tervikliku enesejuhtimise nädala.\n\nMida koolituselt saad?\n\nViiel hommikul keskendume viiele praktilisele enesejuhtimise oskusele – selgusele, tegutsemisvalmidusele, tasakaalu hoidmisele surve all, loovale mõtlemisele ning nädala teadlikule lõpetamisele ja taastumisele.\n\nIga hommik ühendab lühikese teaduspõhise või psühholoogilise sissevaate praktilise enesevaatluse ja juhendatud kogemusega. Morning Mindset ei toetu ühele koolkonnale ega ühele „õigele“ tehnikale – kokku saavad tähelepanu juhtimine, käitumisteadus, stressiregulatsioon, juhendatud kujutlus, lõdvestus, loov probleemilahendus ja refleksioon.\n\nEsmaspäev – SELGUS: mis on päriselt oluline?\n\nKorrastame tähelepanu ja prioriteete ning vaatame, kuidas liikuda heast kavatsusest ühe konkreetse järgmise sammuni.\n\nTeisipäev – TEGUTSEMISVALMIDUS: kuidas ennast tööpäevaks käima saada?\n\nUurime, mis mõjutab meie energiat ja tegutsemisvalmidust ning kuidas liikuda motivatsiooni ootamisest esimese reaalse tegevuseni.\n\nKolmapäev – TASAKAAL SURVE ALL: stress ei pea tegema järgmist otsust sinu eest.\n\nHarjutame, kuidas märgata oma pingereaktsiooni varem, luua reageerimise ja tegevuse vahele rohkem ruumi ning valida automaatse reaktsiooni asemel teadlikum järgmine samm.\n\nNeljapäev – LOOV MÕTLEMINE: kui rohkem pingutamine enam ei aita.\n\nKatsetame, kuidas tähelepanu, liikumise ja vaatenurga muutmine võib aidata väljuda harjumuspärasest mõtterajast ning märgata uusi ideid ja lahendusi.\n\nReede – TEADLIK LÕPETAMINE JA TAASTUMINE: mida võtan kaasa ja mida võin jätta siia?\n\nMärkame nädala jooksul toimunud edasiminekut, korrastame lahtised mõtted ning loome rahulikuma ülemineku töörežiimist puhkusele ja järgmisse nädalasse.\n\nIga hommik annab kaasa vähemalt ühe praktilise võtte või mõtteviisi, mida saad hiljem kasutada ka keset kiiret tööpäeva.\n\nKoolitaja\n\nKiia Paal on täiskasvanute koolitaja, ettevõtja ja Studio MindZ asutaja. Tal on üle kümne aasta kogemust inimeste ja gruppide koolitamise ning juhendamisega.\n\nOma töös ühendab Kiia täiskasvanuõppe ja ettevõtluskogemuse psühholoogia, tähelepanu juhtimise, stressijuhtimise ning praktiliste enesejuhtimise meetoditega. Tema koolitusi iseloomustab rahulik, empaatiline ja praktiline lähenemine, mis aitab uued teadmised siduda osaleja enda tööolukordade ja igapäevaste valikutega.",
    "date": "2026-10-09",
    "startTime": "08:30",
    "endTime": "09:15",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/morning-mindset-09-10-studio-mindzis",
    "registrationUrl": "https://fienta.com/morning-mindset-09-10-studio-mindzis",
    "seriesUrl": "https://fienta.com/et/s/kiia-morning-mindset-kiia-paal-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202950",
    "fientaEventId": "202950",
    "title": "Töötuba koolitajatele: Tee oma koolitus paremaks",
    "speaker": "Mari Mäekivi",
    "shortDescription": "Võta kaasa üks enda olemasolev või ettevalmistamisel olev koolitus ja vaata sellele värske pilguga otsa. Töötoa jooksul saad selgemaks, mis peaks õppija jaoks sinu koolituse tulemusel muutuma ning kuidas sellest lähtudes teha teadlikumaid valikuid õpiväljundite, sisu ja meetodite osas.",
    "description": "Võta kaasa üks enda olemasolev või ettevalmistamisel olev koolitus ja vaata sellele värske pilguga otsa. Töötoa jooksul saad selgemaks, mis peaks õppija jaoks sinu koolituse tulemusel muutuma ning kuidas sellest lähtudes teha teadlikumaid valikuid õpiväljundite, sisu ja meetodite osas.\n\nKellele?\n\nTegutsevatele koolitajatele ja sisekoolitajatele, kellel on juba koolitamise kogemus ning üks konkreetne koolitus, mida nad tahavad paremaks teha.\n\nSee ei ole koolitajaks alustamise baaskoolitus. Kõige rohkem saad töötoast kasu siis, kui sul on olemas päris koolitus, mille üle saad kohapeal kaasa mõelda.\n\nMida koolituselt saad?\n\nÕpid alustama koolituse planeerimist mitte slaididest või teemade nimekirjast, vaid soovitud muutusest: mis peaks õppija jaoks pärast koolitust olema teisiti?\n\nSealt liigud edasi õpiväljundite, meetodite ja sisu juurde ning vaatad, kuidas need omavahel loogiliselt kokku siduda.\n\nRäägime ka ühest koolitaja keerulisemast valikust: mida koolitusse võtta ja mida teadlikult välja jätta.\n\nTöötoa jooksul saad neid põhimõtteid kohe oma valitud koolituse peal läbi mõelda.\n\nKoolitaja\n\nMari Mäekivi on andragoog ja 7. taseme kutsega koolitajate koolitaja. Tema töö keskmes on küsimus, kuidas kujundada koolitusi nii, et seal päriselt toimuks õppimine, mitte ainult info edastamine. Mari aitab koolitajatel teha teadlikumaid valikuid ning luua õppijakeskseid ja tulemuslikke koolitusi.",
    "date": "2026-10-09",
    "startTime": "10:00",
    "endTime": "11:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/tee-oma-koolitus-paremaks-mari-maekivi-studio-mindzis",
    "registrationUrl": "https://fienta.com/tee-oma-koolitus-paremaks-mari-maekivi-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202938",
    "fientaEventId": "202938",
    "title": "Miks kohvipaus võib koolituse ära rikkuda? Mida koolituse tellimisel läbi mõelda",
    "speaker": "Kiia Paal",
    "shortDescription": "Hea koolituse tulemust ei määra ainult sisu ja koolitaja. Seda mõjutavad ka ruum, pauside ajastus, toitlustus, tehnilised lahendused, infovahetus ning paljud väikesed korralduslikud valikud.",
    "description": "Hea koolituse tulemust ei määra ainult sisu ja koolitaja. Seda mõjutavad ka ruum, pauside ajastus, toitlustus, tehnilised lahendused, infovahetus ning paljud väikesed korralduslikud valikud.\n\nMõnikord võib isegi valesse kohta planeeritud kohvipaus või selle ettevalmistamine rikkuda koolituse kõige olulisema osa.\n\nKellele?\n\nKoolitus on mõeldud eelkõige inimestele, kes tellivad või korraldavad ettevõttes koolitusi: personali- ja koolitusjuhtidele, büroojuhtidele, assistentidele, juhtidele ning teistele, kelle ülesanne on valida koolitusruum, korraldada toitlustus, panna paika päevakava või vahendada infot koolitaja, ruumi ja osalejate vahel.\n\nSamuti sobib koolitus koolitajale, kes korraldab oma koolituse praktilise poole ise.\n\nEesmärk on aidata märgata detaile, mis võivad tunduda väikesed, kuid mõjutavad otseselt osaleja kogemust ja seda, kas koolitus jõuab soovitud tulemuseni.\n\nMida koolituselt saad?\n\nSaad praktilise ülevaate sellest, millele koolituse tellimisel ja korraldamisel mõelda juba enne koolituspäeva algust.\n\nKiia toob kokku kaks vaatenurka. Kutsetunnistusega täiskasvanute koolitajana teab ta, millist keskkonda õppimine vajab, ning Studio MindZi koolitusruumide pakkujana näeb ta igapäevaselt korduvaid korralduslikke vigu, mis võivad head koolitust takistada.\n\nJuttu tuleb ruumist ja selle sobivusest, pausidest ja toitlustusest, päevakava ülesehitusest, turvalisest õpikeskkonnast ning infost, mida koolitaja ja korraldaja peavad omavahel õigel ajal jagama.\n\nKoolitaja\n\nKiia Paal on täiskasvanute koolitaja, ettevõtja ning Studio MindZ koolitus- ja sündmusruumide looja. Tal on üle kümne aasta kogemust täiskasvanute õpetamise ja koolituste läbiviimisega Eestis ning rahvusvaheliselt. Oma töös ühendab ta koolitaja teadmised ja koolitusruumide korraldamise praktilise kogemuse.",
    "date": "2026-10-09",
    "startTime": "12:00",
    "endTime": "13:15",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/mida-koolituse-tellimisel-labi-moelda-kiia-paal-studio-mindzis",
    "registrationUrl": "https://fienta.com/mida-koolituse-tellimisel-labi-moelda-kiia-paal-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202951",
    "fientaEventId": "202951",
    "title": "Tööandjabränding: Oled hea tööandja? Näita seda sotsiaalmeedias",
    "speaker": "Birgit Ruunik",
    "shortDescription": "Sa oskad müüa oma toodet või teenust. Aga kas oskad müüa ka töökohta? Heast palgast ja ägedast töökultuurist on värbamisel vähe kasu, kui potentsiaalsed töötajad neist midagi ei tea. Koolitus aitab vaadata oma ettevõtte sotsiaalmeediat tööandja pilguga ja näidata paremini seda, miks just sinu ettevõttes on hea töötada.",
    "description": "Sa oskad müüa oma toodet või teenust. Aga kas oskad müüa ka töökohta? Heast palgast ja ägedast töökultuurist on värbamisel vähe kasu, kui potentsiaalsed töötajad neist midagi ei tea. Koolitus aitab vaadata oma ettevõtte sotsiaalmeediat tööandja pilguga ja näidata paremini seda, miks just sinu ettevõttes on hea töötada.\n\nKellele?\n\nTurundus-, kommunikatsiooni- ja HR-inimestele, kes soovivad muuta oma ettevõtte tööandjana sotsiaalmeedias nähtavamaks ning panna turunduse ja HR-i selles osas paremini koostööd tegema.\n\nPS! Kõige rohkem võidab ettevõte, kust tulevad koolitusele nii turundusjuht kui personalijuht. Nii tekib juba koolitusel ühine arusaam, mida võiks ettevõttes muuta, mida tasub sotsiaalmeedias näidata ja kuidas seda teha. Mõlemal on oma valdkonnas otsustusõigus ning pärast koolitust saab ühise arusaama pealt kohe koostööga edasi minna.\n\nMida koolituselt saad?\n\nSaad praktilisi ideid, kuidas muuta oma ettevõte tööandjana sotsiaalmeedias nähtavamaks, milliseid lugusid tasub rääkida ja kuidas kaasata sisuloomesse oma inimesi.\n\nVaatame, kuidas tuua sotsiaalmeedias esile ettevõtte väärtusi, inimesi ja igapäevast tööelu nii, et potentsiaalne töötaja saaks päriselt aru, milline tööandja sa oled.\n\nPärast koolitust oskad vaadata oma ettevõtte sotsiaalmeediat uue pilguga ning tead paremini, mida teha selleks, et sinu tööandja kuvand jõuaks inimesteni, keda soovid tulevikus värvata.\n\nKoolitaja\n\nBirgit Ruunik on tööandja brändingu ekspert, koolitaja ja Palgajutud.ee looja. Tal on kogemus nii turundusagentuurist kui ka tööandja brändingu valdkonnast ning täna tegutseb ta oma ettevõtte alt, aidates ettevõtetel oma tööandja kuvandit ja kommunikatsiooni paremini läbi mõelda. Copywriteri ja turundustaust annab talle tugeva sõnumiloome vaate ning aitab muuta ettevõtte tugevused selgeks ja arusaadavaks sisuks.",
    "date": "2026-10-09",
    "startTime": "13:45",
    "endTime": "15:15",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/hea-tooandja-sotsiaalmeedias-birgit-ruunik-studio-mindzis",
    "registrationUrl": "https://fienta.com/hea-tooandja-sotsiaalmeedias-birgit-ruunik-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202953",
    "fientaEventId": "202953",
    "title": "Võõrustamise ABC: kuidas luua sündmusel õige õhkkond?",
    "speaker": "Anu Tähemaa",
    "shortDescription": "Hea sündmus ei sünni ainult heast programmist. Võõrustaja loob suure osa sellest, kuidas inimene end saabudes tunneb, kellega ta rääkima satub ja millise kogemusega hiljem lahkub. Anu Tähemaa aitab märgata võõrustamise väikeseid, aga olulisi hetki ning näitab, kuidas neid teadlikumalt juhtida.",
    "description": "Hea sündmus ei sünni ainult heast programmist. Võõrustaja loob suure osa sellest, kuidas inimene end saabudes tunneb, kellega ta rääkima satub ja millise kogemusega hiljem lahkub. Anu Tähemaa aitab märgata võõrustamise väikeseid, aga olulisi hetki ning näitab, kuidas neid teadlikumalt juhtida.\n\nKellele?\n\nKõigile, kes korraldavad ja võõrustavad füüsilises ruumis toimuvaid sündmusi ning puutuvad ise osalejatega kokku.\n\nEriti sobib koolitus neile, kes korraldavad kutsetega üritusi, kliendi- ja kogukonnasündmusi, networking'u üritusi või teisi kohtumisi, kus oluline osa sündmuse väärtusest sünnib inimeste omavahelisest suhtlemisest.\n\nKasu saab ka inimene, kes osaleb ise sageli networking'u- ja seltskondlikel sündmustel ning tahab paremini mõista, mida võõrustajalt oodata ja kuidas ise sellistes olukordades tegutseda.\n\nMida koolituselt saad?\n\nÕpid vaatama sündmust võõrustaja pilguga alates hetkest, mil esimene külaline uksest sisse astub.\n\nKuidas inimest tervitada ja aidata tal kiiresti olukorda sisse elada? Kuidas märgata, kes võiks kellega tuttavaks saada, ning inimesi omavahel loomulikult kokku viia? Kuidas kuulata nii, et märkad ühiseid huvisid ja võimalikke kontakte?\n\nRäägime ka sellest, kuidas võõrustaja saab oma sõnade, kehakeele ja käitumisega kujundada sündmuse õhkkonda, anda inimestele vajalikke suuniseid, seada vajadusel piire ning tulla toime ebamugavate või keerulisemate olukordadega.\n\nFookus ei ole sündmuse tehnilisel korraldusel, vaid sellel, mida teeb võõrustaja inimesena, et külalised teaksid, kuhu tulla, kuidas olla ja kellega suhelda.\n\nAnu jagab oma pika sündmuste korraldamise ja neil osalemise kogemuse põhjal päris näiteid sellest, mis töötab, mis võib kogemuse ootamatult ära rikkuda ja mida saab võõrustaja ise paremini teha.\n\nEesmärk on, et järgmisel sündmusel oskad juba teadlikumalt luua just sellise õhkkonna, mida selle sündmuse eesmärk ja inimesed vajavad.\n\nKoolitaja\n\nAnu Tähemaa on Corporate Maestro looja, rahvusvaheliselt sertifitseeritud inspiratsioonikõneleja, avaliku esinemise ekspert ja koolitaja, kelle töö keskmes on selge ja mõjus eneseväljendus, kehakeel ning kontakt teiste inimestega.",
    "date": "2026-10-09",
    "startTime": "16:00",
    "endTime": "17:30",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/voorustamise-abc-anu-tahemaa-studio-mindzis",
    "registrationUrl": "https://fienta.com/voorustamise-abc-anu-tahemaa-studio-mindzis",
    "registrationStatus": "open"
  },
  {
    "id": "202960",
    "fientaEventId": "202960",
    "title": "Ettevõtlusnädala lõpuõhtu Studio MindZis",
    "speaker": "Studio MindZ",
    "shortDescription": "Ettevõtlusnädala jooksul on Studio MindZis kohtunud ettevõtjad, juhid ja tegijad väga erinevate teemade ümber. Enne kui nädal päriselt seljataha jätta, tuleme veel üheks õhtuks kokku, et jagada nädala jooksul tekkinud mõtteid, luua uusi kontakte ja lihtsalt mõnusalt koos aega veeta.",
    "description": "Ettevõtlusnädala jooksul on Studio MindZis kohtunud ettevõtjad, juhid ja tegijad väga erinevate teemade ümber. Enne kui nädal päriselt seljataha jätta, tuleme veel üheks õhtuks kokku, et jagada nädala jooksul tekkinud mõtteid, luua uusi kontakte ja lihtsalt mõnusalt koos aega veeta.\n\nKellele?\n\nOodatud on kõik ettevõtlikud inimesed, kes soovivad ettevõtlusnädala jooksul kogetut teistega arutada, uusi inimesi tundma õppida ja leida kontakte, kellega võiks suhtlus jätkuda ka pärast ettevõtlusnädalat.\n\nSa ei pea olema osalenud Studio MindZi teistel sündmustel. Võid tulla ka lihtsalt selleks, et kohtuda teiste ettevõtjate ja tegijatega.\n\nMis toimub?\n\nÕhtu keskmes on vaba suhtlus ja networkimine. Saab jagada nädala jooksul tekkinud ideid, arutada ärivõimalusi, leida uusi koostööpartnereid või lihtsalt kohtuda inimestega, kellega tekib hea klapp.\n\nEelmisel aastal sündis sellel õhtul uusi tutvusi ja koostöömõtteid ning vestlused jätkusid veel pikalt pärast ametliku programmi lõppu. Sel aastal loome taas ruumi, kus ei ole enam järgmist koolitust, kuhu kiirustada, vaid aega päriselt inimestega rääkida.\n\nPakume õhtu jooksul ka midagi head süüa ja juua.\n\nTartu Ettevõtlusnädal toimub 5.–9. oktoobril 2026. See sündmus lõpetab Studio MindZi ruumides toimuva ettevõtlusnädala programmi.\n\nTule ja võta nädal kokku koos inimestega, kellega võib mõni hea mõte alles päriselt alguse saada.\n\nNB! Ürituse korraldajal on õigus sündmusele mitte lubada inimesi, kes segavad teisi osalejaid või ei järgi ruumi kodukorda.",
    "date": "2026-10-09",
    "startTime": "18:00",
    "endTime": "21:00",
    "venue": "Studio MindZ, Lutsu tänav 3, 51005 Tartu, Tartu maakond",
    "fientaUrl": "https://fienta.com/ettevotlusnadala-lopuohtu-studio-mindzis",
    "registrationUrl": "https://fienta.com/ettevotlusnadala-lopuohtu-studio-mindzis",
    "capacity": 70,
    "slidesExpected": false,
    "registrationStatus": "open"
  }
];

export const SPEAKERS: Speaker[] = [
   {
     "id": "kiia-paal",
     "name": "Kiia Paal",
     "imageUrl": kiiaPaalPhoto.url,
     "thumbUrl": kiiaPaalThumb.url,
     "websites": [
       { "label": "www.pehmesynnikool.ee", "url": "https://www.pehmesynnikool.ee/" },
       { "label": "www.mindz.ee", "url": "https://www.mindz.ee/" }
     ],
     "role": "",
     "bio": "",
    "eventIds": [
      "202940",
      "202965",
      "202966",
      "202967",
      "202968",
      "202938"
    ]
  },
   {
     "id": "mikk-orglaan",
     "name": "Mikk Orglaan",
     "imageUrl": mikkOrglaanPhoto.url,
     "thumbUrl": mikkOrglaanThumb.url,
     "websiteUrl": "https://sparkly.hr/et",
     "linkedinUrl": "https://www.linkedin.com/in/mikkorglaan/",
     "role": "",
     "bio": "",
    "eventIds": [
      "202928"
    ]
  },
  {
    "id": "kadri-leppik",
    "name": "Kadri Leppik",
    "role": "",
    "bio": "",
    "imageUrl": kadriLeppikPhoto.url,
     "thumbUrl": kadriLeppikThumb.url,
    "websiteUrl": "https://digistrateeg.ee/",
    "linkedinUrl": "https://www.linkedin.com/in/kadri-leppik/",
    "eventIds": [
      "202930"
    ]
  },
  {
    "id": "martin-mark",
    "name": "Martin Mark",
    "role": "",
    "bio": "",
    "imageUrl": martinPhoto.url,
     "thumbUrl": martinThumb.url,
    "email": "",
    "phone": "",
    "websiteUrl": "https://introverdid.ee/",
    "linkedinUrl": "https://www.linkedin.com/in/martinmarkest/",
    "facebookUrl": "",
    "instagramUrl": "",
    "eventIds": [
      "202931"
    ]
  },
  {
    "id": "janika-moru",
    "name": "Janika Mõru",
    "role": "",
    "bio": "",
    "imageUrl": janikaMoruPhoto.url,
     "thumbUrl": janikaMoruThumb.url,
    "email": "janika@assisto.ee",
    "phone": "5358 3234",
    "websiteUrl": "https://janikamoru.ee",
    "linkedinUrl": "https://www.linkedin.com/in/janika-moru/",
    "eventIds": [
      "202933"
    ]
  },
  {
     "id": "urmo-keskel",
     "name": "Urmo Keskel",
     "role": "",
     "bio": "",
     "imageUrl": urmoPhoto.url,
     "thumbUrl": urmoThumb.url,
     "websiteUrl": "https://phishbite.com/et/",
     "linkedinUrl": "https://www.linkedin.com/in/urmokeskel/",
    "eventIds": [
      "202955"
    ]
  },
  {
     "id": "papsid",
     "name": "Kristo Tuurmann ja Illimar Pilt",
     "displayName": "Papsid.ee",
     "role": "",
     "bio": "",
     "imageUrl": papsidPhoto.url,
     "thumbUrl": papsidThumb.url,
     "websiteUrl": "https://papsid.ee/",
     "instagramUrl": "https://www.instagram.com/papsid.ee/",
    "eventIds": [
      "202946"
    ]
  },
  {
     "id": "timo-porval",
     "name": "Timo Porval",
     "role": "",
     "bio": "",
     "imageUrl": timoPhoto.url,
     "thumbUrl": timoThumb.url,
     "websiteUrl": "https://turunduslabor.ee/",
     "linkedinUrl": "https://www.linkedin.com/in/timoporval/",
    "eventIds": [
      "202947"
    ]
  },
  {
     "id": "ulvi-kala",
     "name": "Ulvi Kala",
     "role": "",
     "bio": "",
     "imageUrl": ulviPhoto.url,
     "thumbUrl": ulviThumb.url,
     "websiteUrl": "https://www.balticintertex.ee/",
     "linkedinUrl": "https://www.linkedin.com/in/ulvi-kala/",
    "eventIds": [
      "202945"
    ]
  },
  {
     "id": "roland-kivitare",
     "name": "Roland Kivitare",
     "role": "",
     "bio": "",
     "imageUrl": rolandPhoto.url,
     "thumbUrl": rolandThumb.url,
     "websiteUrl": "https://rolevents.ee/",
     "linkedinUrl": "https://www.linkedin.com/in/rolandkivitare/",
    "eventIds": [
      "202948"
    ]
  },
  {
    "id": "katrin-vilimaa-otsing",
    "name": "Katrin Vilimaa-Otsing",
    "role": "",
    "bio": "",
    "imageUrl": katrinVilimaaPhoto.url,
     "thumbUrl": katrinVilimaaThumb.url,
    "websiteUrl": "https://turunduskoolitus.ee/",
    "linkedinUrl": "https://www.linkedin.com/in/katrinvilimaa/",
    "eventIds": [
      "202949"
    ]
  },
  {
     "id": "marika-juusu",
     "name": "Marika Juusu",
     "role": "",
     "bio": "",
     "imageUrl": marikaPhoto.url,
     "thumbUrl": marikaThumb.url,
     "websiteUrl": "https://veebikool.ee/",
     "linkedinUrl": "https://www.linkedin.com/in/marika-juusu/",
    "eventIds": [
      "202952"
    ]
  },
  {
    "id": "ivar-raav",
    "name": "Ivar Raav",
    "role": "",
    "bio": "",
    "imageUrl": ivarRaavPhoto.url,
     "thumbUrl": ivarRaavThumb.url,
    "websiteUrl": "https://ivarraav.com/",
    "linkedinUrl": "https://www.linkedin.com/in/ivarraav/",
    "eventIds": [
      "202958"
    ]
  },
  {
    "id": "katrin-differt",
    "name": "Katrin Differt",
    "role": "",
    "bio": "",
    "imageUrl": katrinDiffertPhoto.url,
     "thumbUrl": katrinDiffertThumb.url,
    "websiteUrl": "https://360kogemus.ee/",
    "linkedinUrl": "https://www.linkedin.com/in/katrin-differt-bb9194216/",
    "eventIds": [
      "202936"
    ]
  },
  {
    "id": "taavi-lukas-ja-anders-veetamm",
     "name": "Taavi Lukas ja Anders Veetamm",
     "displayName": "Kukkumiskaitse",
     "role": "",
     "bio": "",
     "imageUrl": kukkumiskaitsePhoto.url,
     "thumbUrl": kukkumiskaitseThumb.url,
     "websiteUrl": "https://kukkumiskaitse.ee/",
     "facebookUrl": "https://www.facebook.com/Kukkumiskaitse.ee/",
    "eventIds": [
      "202957"
    ]
  },
  {
     "id": "tambet-tallo",
     "name": "Tambet Tallo",
     "role": "",
     "bio": "",
     "imageUrl": tambetPhoto.url,
     "thumbUrl": tambetThumb.url,
     "websiteUrl": "https://combatready.eu/",
     "linkedinUrl": "https://www.linkedin.com/in/tambet-tallo-sales-leadership-coach-speaker/",
    "eventIds": [
      "202954"
    ]
  },
  {
    "id": "epp-karsin",
    "name": "Epp Kärsin",
    "role": "",
    "bio": "",
    "imageUrl": eppKarsinPhoto.url,
     "thumbUrl": eppKarsinThumb.url,
    "websiteUrl": "https://www.eppkarsin.com/",
    "instagramUrl": "https://www.instagram.com/eppkarsin",
    "eventIds": [
      "202959"
    ]
  },
  {
     "id": "mari-maekivi",
     "name": "Mari Mäekivi",
     "role": "",
     "bio": "",
     "imageUrl": mariPhoto.url,
     "thumbUrl": mariThumb.url,
     "websiteUrl": "https://marimaekivi.ee/",
     "linkedinUrl": "https://www.linkedin.com/in/marimaekivi/",
    "eventIds": [
      "202950"
    ]
  },
  {
    "id": "birgit-ruunik",
    "name": "Birgit Ruunik",
    "role": "",
    "bio": "",
    "imageUrl": birgitRuunikPhoto.url,
     "thumbUrl": birgitRuunikThumb.url,
    "websiteUrl": "https://palgajutud.ee/",
    "linkedinUrl": "https://www.linkedin.com/in/birgit-ruunik/",
    "eventIds": [
      "202951"
    ]
  },
  {
    "id": "anu-tahemaa",
    "name": "Anu Tähemaa",
    "role": "",
    "bio": "",
    "imageUrl": anuTahemaaPhoto.url,
     "thumbUrl": anuTahemaaThumb.url,
    "websiteUrl": "https://corporatemaestro.com/et/",
    "linkedinUrl": "https://www.linkedin.com/in/anu-tahemaa/",
    "eventIds": [
      "202953"
    ]
  }
];

/** Ürituste korraldajad — samasugused kaardid kui koolitajad, aga oma sotsmeediaga. */
export const ORGANIZERS: Speaker[] = [
  {
    id: "studio-mindz",
    name: "Studio MindZ",
    role: "",
    bio: "",
    imageUrl: lopupeguPhoto.url,
    thumbUrl: lopupeguThumb.url,
    instagramUrl: "https://www.instagram.com/studiomindz/",
    facebookUrl: "https://www.facebook.com/studiomindZ",
    eventIds: ["202960"],
    isOrganizer: true,
  },
];


export function getEvent(id: string): EventItem | undefined {
  return EVENTS.find((e) => e.id === id);
}

export function eventsForDate(date: string): EventItem[] {
  return EVENTS.filter((e) => e.date === date).sort((a, b) =>
    a.startTime.localeCompare(b.startTime),
  );
}

export function getEventByFientaId(fientaId: string): EventItem | undefined {
  return EVENTS.find((e) => e.fientaEventId === fientaId);
}

export function speakersForEvent(eventId: string): Speaker[] {
  return [...SPEAKERS, ...ORGANIZERS].filter((speaker) => speaker.eventIds.includes(eventId));
}

/** Tagasiside koolitaja — korraldajat (Studio MindZ) siin ei pakuta. */
export function trainingSpeakerForEvent(eventId: string): Speaker | undefined {
  return speakersForEvent(eventId).find((speaker) => !speaker.isOrganizer);
}

/** Koolitajate lehe järjekord: eesnime järgi, erandina kõige ees Studio MindZ tiim (Kiia, Janika). */
const PINNED_SPEAKER_IDS = ["kiia-paal", "janika-moru"];

/** Studio MindZ tiimiliikmed — märgistatakse koolitajate nimekirjas. */
export const TEAM_SPEAKER_IDS = PINNED_SPEAKER_IDS;

export function isTeamSpeaker(speaker: Speaker): boolean {
  return TEAM_SPEAKER_IDS.includes(speaker.id);
}

/** Studio MindZ tiim — Info lehe pallikeste rida. */
export type TeamMember = {
  id: string;
  name: string;
  /** Koolitaja profiil koolitajate lehel, kui inimene ka koolitab. */
  speakerId?: string;
  /** oma pilt, kui inimesel pole koolitaja profiili */
  imageUrl?: string;
  thumbUrl?: string;
};

export const TEAM: TeamMember[] = [
  { id: "kiia", name: "Kiia Paal", speakerId: "kiia-paal" },
  { id: "janika", name: "Janika Mõru", speakerId: "janika-moru" },
  { id: "selje", name: "Selje Perez", imageUrl: seljePhoto.url, thumbUrl: seljeThumb.url },
  { id: "liisi", name: "Liisi Kaal", imageUrl: liisiPhoto.url, thumbUrl: liisiThumb.url },
  { id: "kullike", name: "Küllike Kuber", imageUrl: kullikeKuberPhoto.url, thumbUrl: kullikeKuberThumb.url },
];

/** Tiimi liikmed koos piltidega, kui need on olemas. */
export function teamMembers(): (TeamMember & { imageUrl?: string; thumbUrl?: string })[] {
  return TEAM.map((member) => {
    const speaker = member.speakerId
      ? SPEAKERS.find((s) => s.id === member.speakerId)
      : undefined;
    const imageUrl = member.imageUrl ?? speaker?.imageUrl;
    const thumbUrl = member.thumbUrl ?? speaker?.thumbUrl;
    return imageUrl
      ? { ...member, imageUrl, ...(thumbUrl ? { thumbUrl } : {}) }
      : member;
  });
}

/** Nime esimene sõna, nt „Kiia Paal" → „Kiia". */
export function firstName(name: string): string {
  return name.split(" ")[0] ?? name;
}

/** Nime read pallikese alla: eesnimi esimesele reale, perekonnanimed teisele.
 *  Ühe sõnaga nimed (nt „Kukkumiskaitse") jäävad ühele reale. */
export function nameLines(name: string): string[] {
  const space = name.indexOf(" ");
  if (space === -1) return [name];
  return [name.slice(0, space), name.slice(space + 1)];
}

/** Algustähed, nt „Kiia Paal" → „KP". */
export function initials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("");
}

export function speakersInListOrder(): Speaker[] {
  const pinned = PINNED_SPEAKER_IDS.map((id) => SPEAKERS.find((s) => s.id === id)).filter(
    (s): s is Speaker => Boolean(s),
  );
  const rest = SPEAKERS.filter((s) => !PINNED_SPEAKER_IDS.includes(s.id)).sort((a, b) => {
    const byFirstName = firstName(a.name).localeCompare(firstName(b.name), "et");
    return byFirstName !== 0 ? byFirstName : a.name.localeCompare(b.name, "et");
  });
  return [...pinned, ...rest];
}

/** Koolitaja sündmuste nimekirja rida — korduvad sessioonid on ühendatud seeriaks. */
export type SpeakerEventRow =
  | { kind: "single"; event: EventItem }
  | {
      kind: "series";
      title: string;
      /** Seeria Fienta leht — avatakse registreerimiseks. */
      url: string;
      /** Esimene sessioon — avab rakenduses koolituse kirjelduse lehe. */
      event: EventItem;
      events: EventItem[];
    };

/**
 * Koolitaja sündmused ridadena: samasse seeriasse kuuluvad sessioonid
 * (nt hommikune Morning Mindset) kuvatakse ühe reale lingiga seeria lehele.
 */
export function speakerEventRows(speaker: Speaker): SpeakerEventRow[] {
  const rows: SpeakerEventRow[] = [];
  const series = new Map<string, EventItem[]>();

  for (const id of speaker.eventIds) {
    const event = getEvent(id);
    if (!event) continue;
    if (event.seriesUrl) {
      const bucket = series.get(event.seriesUrl) ?? [];
      bucket.push(event);
      series.set(event.seriesUrl, bucket);
      continue;
    }
    rows.push({ kind: "single", event });
  }

  for (const [url, events] of series) {
    const sorted = [...events].sort((a, b) =>
      `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`),
    );
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    if (!first) continue;
    const shortTitle = (first.title.split(":")[0] ?? first.title).trim();
    const label =
      sorted.length > 1 && last
        ? `${shortTitle} — ${dayLabel(first.date)}–${dayLabel(last.date)}`
        : first.title;
    rows.push({ kind: "series", title: label, url, event: first, events: sorted });
  }

  return rows.sort((a, b) => {
    const firstOf = (row: SpeakerEventRow) =>
      row.kind === "single" ? row.event : row.events[0];
    const key = (row: SpeakerEventRow) => {
      const event = firstOf(row);
      return event ? `${event.date}T${event.startTime}` : "";
    };
    return key(a).localeCompare(key(b));
  });
}

/** Koolitaja slaidid või lisamaterjalid — vanim sündmus, millel need on olemas. */
export function speakerSlidesUrl(speaker: Speaker): string | undefined {
  const events = speaker.eventIds
    .map((id) => getEvent(id))
    .filter((event): event is EventItem => Boolean(event))
    .sort((a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`));

  for (const event of events) {
    const url = event.slidesUrl ?? event.materialsUrl;
    if (url) return url;
  }
  return undefined;
}

/** Päeva label, nt "E 5. okt" */
export function dayLabel(date: string): string {
  const day = EVENT_DAYS.find((d) => d.date === date);
  return day ? day.label : date;
}

/** Pikk kuupäev, nt "esmaspäev, 5. okt" */
export function longDate(date: string): string {
  return new Intl.DateTimeFormat("et-EE", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(new Date(date + "T12:00:00"));
}

/** Eesti kirjapildis kellaaeg, nt "09:30" → "9.30". */
export function displayTime(time: string): string {
  return time.replace(/^0/, "").replace(":", ".");
}

/** Tänane kuupäev event-nädala kontekstis: kui täna on nädala sees, tagasta see; muidu esimene päev. */
export function todayEventDate(now = new Date()): string {
  const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return EVENT_DAYS.some((d) => d.date === iso) ? iso : EVENT_DAYS[0].date;
}

/** Järgmine algav sündmus antud päeval (või päeva esimene, kui kõik on möödas). */
export function nextEventOn(date: string, now = new Date()): EventItem | undefined {
  const events = eventsForDate(date);
  const todayIso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  // Kui küsitud päev pole täna (nt enne nädalat või pärast), võta päeva esimene sündmus.
  if (date !== todayIso) return events[0];
  const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return events.find((e) => e.startTime >= hhmm) ?? events[0];
}

/** Järgmine algav sündmus üle kogu kava, päris kuupäeva ja kellaaja järgi. */
export function nextEvent(now = new Date()): EventItem | undefined {
  const nowKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}T${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return [...EVENTS]
    .sort((a, b) => `${a.date}T${a.startTime}`.localeCompare(`${b.date}T${b.startTime}`))
    .find((e) => `${e.date}T${e.startTime}` >= nowKey);
}

export function statusLabel(status: RegistrationStatus): string {
  switch (status) {
    case "open":
      return "Registreeru";
    case "registered":
      return "Oled registreerunud ✓";
    case "full":
      return "Kohad täis";
    case "closed":
      return "Registreerimine lõppenud";
  }
}
