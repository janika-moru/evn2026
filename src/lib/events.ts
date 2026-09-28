// Keskmne sündmuste andmemudel — sisu ja UI on eraldi.
// Demo-andmed asendatakse järgmises etapis päris Fienta sündmustega.

export type RegistrationStatus =
  | "open" // Registreeru
  | "registered" // Oled registreerunud ✓
  | "full" // Kohad täis
  | "closed"; // Registreerimine lõppenud

export interface EventItem {
  id: string;
  fientaEventId?: string;
  title: string;
  speaker: string;
  description: string;
  shortDescription: string;
  date: string; // "2026-10-05"
  startTime: string; // "10:00"
  endTime: string; // "12:00"
  venue: string;
  fientaUrl: string;
  slidesUrl?: string;
  materialsUrl?: string;
  registrationStatus: RegistrationStatus;
}

export interface Speaker {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  linkedinUrl?: string;
  eventIds: string[];
}

export const EVENT_DAYS = [
  { date: "2026-10-05", label: "E 5.10" },
  { date: "2026-10-06", label: "T 6.10" },
  { date: "2026-10-07", label: "K 7.10" },
  { date: "2026-10-08", label: "N 8.10" },
  { date: "2026-10-09", label: "R 9.10" },
] as const;

export const EVENTS: EventItem[] = [
  // E 5.10
  {
    id: "avamine",
    title: "Nädala avamine ja hommikukohv",
    speaker: "Studio MindZ tiim",
    shortDescription: "Tervitus, nädala ülevaade ja tutvumine hommikukohvi kõrval.",
    description:
      "Alustame Tartu ettevõtlusnädala Studio MindZi programmi sõbraliku avamisega. Saad ülevaate nädala sündmustest, kohtad koolitajaid ja teisi osalejaid ning saad end rahulikult sisse seada.",
    date: "2026-10-05",
    startTime: "09:00",
    endTime: "10:00",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "registered",
  },
  {
    id: "ettevotlik-moeldis",
    title: "Ettevõtlik mõtteviis: kust algab äriidee?",
    speaker: "Kati Orav",
    shortDescription: "Praktiline töötuba ideede leidmiseks ja testimiseks.",
    description:
      "Kuidas leida äriidee, mida tasub edasi arendada? Selles töötoas vaatame, kuidas ettevõtjad leiavad ja testivad ideid enne suuremate investeeringute tegemist. Osaleda võib ilma eelteadmisteta — võta kaasa avatud meel ja märkmik.",
    date: "2026-10-05",
    startTime: "10:30",
    endTime: "12:30",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "open",
  },
  {
    id: "suhtlemisoskused",
    title: "Suhtlemisoskused, mis müüvad",
    speaker: "Marten Kask",
    shortDescription: "Kuidas rääkida oma ideest nii, et teised kuulaksid.",
    description:
      "Hea idee ei müü ennast ise. Õpime, kuidas esitleda oma ideed selgelt ja veenvalt — nii investorile, kliendile kui meeskonnale. Praktilised harjutused ja kohene tagasiside.",
    date: "2026-10-05",
    startTime: "14:00",
    endTime: "16:00",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "open",
  },
  // T 6.10
  {
    id: "turundus-algajale",
    title: "Turundus algajale ettevõtjale",
    speaker: "Liisa Mägi",
    shortDescription: "Esimesed sammud turunduses ilma suure eelarveta.",
    description:
      "Kuidas teha turundust siis, kui eelarve on nulli lähedal? Vaatame, millised kanalid ja tegevused annavad alguses kõige rohkem tulemust, ja paneme paika sinu esimese lihtsa turundusplaani.",
    date: "2026-10-06",
    startTime: "10:00",
    endTime: "12:00",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "registered",
  },
  {
    id: "rahaline-kindlustunne",
    title: "Rahaline kindlustunne ettevõtja esimesel aastal",
    speaker: "Andres Tamm",
    shortDescription: "Eelarvestamine, hinnastamine ja rahavoog lihtsalt.",
    description:
      "Raha on paljude algavate ettevõtjate suurim mure. Räägime hinnastamisest, rahavoogude planeerimisest ja sellest, kuidas vältida kõige levinumaid rahavigu esimesel aastal.",
    date: "2026-10-06",
    startTime: "13:00",
    endTime: "15:00",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "full",
  },
  // K 7.10
  {
    id: "muuk-puudutus",
    title: "Müük, mis ei tundu müügina",
    speaker: "Kati Orav",
    shortDescription: "Müügiveskeldused, mis jäävad inimeseks.",
    description:
      "Müük ei pea olema pealetükkiv. Õpime konsultatiivse müügi põhimõtteid: kuidas kuulata klienti, esitada õigeid küsimusi ja jõuda kokkuleppeni, millega mõlemad pooled rahul on.",
    date: "2026-10-07",
    startTime: "10:00",
    endTime: "12:30",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "open",
  },
  {
    id: "ai-toovoed",
    title: "AI töövahendid ettevõtja igapäevas",
    speaker: "Marten Kask",
    shortDescription: "Praktilised AI-töövood, mis säästavad aega juba homme.",
    description:
      "Vaatame konkreetselt, kuidas kasutada tehisintellekti töövahendeid tekstide, piltide, analüüsi ja kliendisuhtluse kiirendamiseks. Toome välja ka piirid ja riskid, mida tasub teada.",
    date: "2026-10-07",
    startTime: "14:00",
    endTime: "16:00",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "open",
  },
  // N 8.10
  {
    id: "meeskond-ja-juhtimine",
    title: "Esimene töötaja: meeskonna loomine ja juhtimine",
    speaker: "Liisa Mägi",
    shortDescription: "Millal ja kuidas võtta tööle esimene inimene.",
    description:
      "Esimese töötaja võtmine on suur samm. Räägime õiguse hetkest, värbamise põhitõdedest, õiguslikest nüanssidest ja sellest, kuidas olla hea juht ka siis, kui juhtimine on uus roll.",
    date: "2026-10-08",
    startTime: "10:00",
    endTime: "12:00",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "open",
  },
  {
    id: "vorgustike-oo",
    title: "Võrgustike õhtu: kohtu teiste ettevõtjatega",
    speaker: "Studio MindZ tiim",
    shortDescription: "Vabaõhuline kohtumine, kiirkohtingud ja kontaktid.",
    description:
      "Lõõgastav õhtu, kus saad kohtuda teiste osalejate, koolitajate ja Tartu ettevõtjatega. Kiirkohtingu-vormis tutvumine aitab leida uusi kontakte ilma piinlike vaikusteta.",
    date: "2026-10-08",
    startTime: "17:00",
    endTime: "19:00",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "open",
  },
  // R 9.10
  {
    id: "kasvulood",
    title: "Kasvulood: Tartu ettevõtjad jagavad kogemust",
    speaker: "Andres Tamm",
    shortDescription: "Ausad lood läbimurretest ja ebaõnnestumistest.",
    description:
      "Kolme Tartu ettevõtja ausad lood: mis töötas, mis ei töötanud ja mida nad teeksid teisiti. Küsimuste-vastuste voorus saad küsida otse kõike, mis sind ettevõtluses mõtlema paneb.",
    date: "2026-10-09",
    startTime: "10:00",
    endTime: "12:00",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "closed",
  },
  {
    id: "nadala-lopetamine",
    title: "Nädala lõpetamine ja jätkuplaanid",
    speaker: "Studio MindZ tiim",
    shortDescription: "Kokkuvõte, kontaktide vahetus ja järgmised sammud.",
    description:
      "Võtame nädala kokku, jagame koolitajate kontakte ja materjale ning aitame sul panna paika konkreetsed järgmised sammud pärast ettevõtlusnädala lõppu.",
    date: "2026-10-09",
    startTime: "13:00",
    endTime: "14:30",
    venue: "Studio MindZ, Lutsu 3, Tartu",
    fientaUrl: "https://fienta.com/et/o/studiomindz",
    registrationStatus: "open",
  },
];

export const SPEAKERS: Speaker[] = [
  {
    id: "kati-orav",
    name: "Kati Orav",
    role: "Ettevõtlusmentor",
    bio: "Kati on aidanud üle saja algava ettevõtja ideed tegudeks viia. Tema töötoad on praktilised ja koheselt rakendatavad.",
    email: "kati@mindz.ee",
    linkedinUrl: "https://www.linkedin.com/",
    eventIds: ["ettevotlik-moeldis", "muuk-puudutus"],
  },
  {
    id: "marten-kask",
    name: "Marten Kask",
    role: "Suhtlemis- ja tehnoloogiatreener",
    bio: "Marten koolitab esitlemist, müügiveskeldusi ja AI-töövahendite nutikat kasutamist ettevõtja igapäevas.",
    email: "marten@mindz.ee",
    linkedinUrl: "https://www.linkedin.com/",
    eventIds: ["suhtlemisoskused", "ai-toovoed"],
  },
  {
    id: "liisa-magi",
    name: "Liisa Mägi",
    role: "Turundusstrateeg",
    bio: "Liisa on ehitanud väikeste eelarvetega turundusplaane nii idufirmadele kui kasvavatele teenuseettevõtetele.",
    email: "liisa@mindz.ee",
    linkedinUrl: "https://www.linkedin.com/",
    eventIds: ["turundus-algajale", "meeskond-ja-juhtimine"],
  },
  {
    id: "andres-tamm",
    name: "Andres Tamm",
    role: "Finantsnõustaja",
    bio: "Andres aitab ettevõtjatel rahaasjad selgeks saada — hinnastamisest ja eelarvestamisest esimese aasta ellujäämiseni.",
    email: "andres@mindz.ee",
    linkedinUrl: "https://www.linkedin.com/",
    eventIds: ["rahaline-kindlustunne", "kasvulood"],
  },
  {
    id: "mindz-tiim",
    name: "Studio MindZ tiim",
    role: "Korraldajad",
    bio: "Studio MindZ on Tartu kesklinnas asuv koolitus- ja koosloomestuudio, kus toimub ettevõtlusnädala programm.",
    email: "info@mindz.ee",
    eventIds: ["avamine", "vorgustike-oo", "nadala-lopetamine"],
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

export function registeredEvents(): EventItem[] {
  return EVENTS.filter((e) => e.registrationStatus === "registered");
}

/** Päeva label, nt "E 5.10" */
export function dayLabel(date: string): string {
  const day = EVENT_DAYS.find((d) => d.date === date);
  return day ? day.label : date;
}

/** Pikk kuupäev, nt "esmaspäev, 5. oktoober" */
export function longDate(date: string): string {
  return new Intl.DateTimeFormat("et-EE", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(date + "T12:00:00"));
}

/** Tänane kuupäev event-nädala kontekstis: kui täna on nädala sees, tagasta see; muidu esimene päev. */
export function todayEventDate(now = new Date()): string {
  const iso = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
  return EVENT_DAYS.some((d) => d.date === iso) ? iso : EVENT_DAYS[0].date;
}

/** Järgmine algav sündmus antud päeval (või päeva esimene, kui kõik on möödas). */
export function nextEventOn(date: string, now = new Date()): EventItem | undefined {
  const events = eventsForDate(date);
  const hhmm = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  return events.find((e) => e.startTime >= hhmm) ?? events[0];
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
