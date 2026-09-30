import type { EventItem } from "@/lib/events";

const TIMEZONE = "Europe/Tallinn";

/** "2026-10-05" + "10:00" -> Date Europe/Tallinn ajavööndis. */
function toDate(date: string, time: string): Date {
  return new Date(`${date}T${time}:00`);
}

/** Google/Outlooki vorming: 20261005T100000 (kohalik aeg, ajavöönd eraldi). */
function stampLocal(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}T${p(d.getHours())}${p(d.getMinutes())}00`;
}

/** .ics UTC-vorming: 20261005T070000Z */
function stampUtc(d: Date): string {
  return d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

function locationOf(event: EventItem): string {
  return `${event.venue}, Lutsu 3, Tartu`;
}

export function googleCalendarUrl(event: EventItem): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${stampLocal(toDate(event.date, event.startTime))}/${stampLocal(toDate(event.date, event.endTime))}`,
    ctz: TIMEZONE,
    details: event.shortDescription,
    location: locationOf(event),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function outlookCalendarUrl(event: EventItem): string {
  const params = new URLSearchParams({
    path: "/calendar/action/compose",
    rru: "addevent",
    subject: event.title,
    startdt: `${event.date}T${event.startTime}:00`,
    enddt: `${event.date}T${event.endTime}:00`,
    body: event.shortDescription,
    location: locationOf(event),
  });
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`;
}

/** .ics sisu data: URI-na — Apple Kalender ja telefoni kalender avavad otse. */
export function icalDataUrl(event: EventItem): string {
  const esc = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Studio MindZ//Ettevotlusnadal 2026//ET",
    "BEGIN:VEVENT",
    `UID:${event.id}@tartu.mindz.ee`,
    `DTSTAMP:${stampUtc(new Date())}`,
    `DTSTART:${stampUtc(toDate(event.date, event.startTime))}`,
    `DTEND:${stampUtc(toDate(event.date, event.endTime))}`,
    `SUMMARY:${esc(event.title)}`,
    `DESCRIPTION:${esc(event.shortDescription)}`,
    `LOCATION:${esc(locationOf(event))}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(lines.join("\r\n"))}`;
}
