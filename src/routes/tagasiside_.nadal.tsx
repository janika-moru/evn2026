import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getEvent, trainingSpeakerForEvent } from "@/lib/events";
import { getWeekFeedback, type WeekFeedbackRow } from "@/lib/week-feedback.functions";

export const Route = createFileRoute("/tagasiside_/nadal")({
  head: () => ({
    meta: [
      { title: "Nädala tagasiside koond — Studio MindZ 2026" },
      { name: "description", content: "Kogu Ettevõtlusnädala tagasiside koondvaade Studio MindZ tiimile." },
      { property: "og:title", content: "Nädala tagasiside koond — Studio MindZ 2026" },
      { property: "og:description", content: "Programmi, ruumide ja tiimi tagasiside koondvaade." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: WeekPage,
});

const fmt = (n: number) =>
  n.toLocaleString("et-EE", { maximumFractionDigits: 1, minimumFractionDigits: 1 });
const avgOf = (rows: WeekFeedbackRow[]) => {
  const r = rows.filter((x) => x.rating != null);
  return r.length ? r.reduce((s, x) => s + (x.rating ?? 0), 0) / r.length : null;
};
const DAYS = [
  ["2026-10-05", "E 5.10"],
  ["2026-10-06", "T 6.10"],
  ["2026-10-07", "K 7.10"],
  ["2026-10-08", "N 8.10"],
  ["2026-10-09", "R 9.10"],
] as const;
const tallinnDate = (iso: string) =>
  new Date(iso).toLocaleDateString("sv-SE", { timeZone: "Europe/Tallinn" });

type Tab = "programm" | "kiitus" | "ettepanek";

function WeekPage() {
  const fetchRows = useServerFn(getWeekFeedback);
  const q = useQuery({ queryKey: ["week-feedback"], queryFn: () => fetchRows() });
  const [tab, setTab] = useState<Tab>("programm");
  const [dayFilter, setDayFilter] = useState<string | null>(null);
  const [speakerFilter, setSpeakerFilter] = useState<string | null>(null);
  if (q.isLoading) return <p className="px-4 pt-8 text-muted-foreground">Laen…</p>;
  if (!q.data) return <p className="px-4 pt-8">Laadimine ebaõnnestus.</p>;

  const rows = q.data;
  const training = rows.filter((r) => r.type === "training");
  const keep = rows.filter((r) => r.type === "keep");
  const change = rows.filter((r) => r.type === "change" || r.type === "help");
  const avg = avgOf(training);
  const teamAvg = avgOf(keep);

  const bySpeaker = new Map<string, WeekFeedbackRow[]>();
  for (const r of training) {
    const name =
      (r.eventId && trainingSpeakerForEvent(r.eventId)?.name) ||
      (r.eventId && getEvent(r.eventId)?.title) ||
      "Muu";
    bySpeaker.set(name, [...(bySpeaker.get(name) ?? []), r]);
  }
  const speakerRows = [...bySpeaker.entries()]
    .map(([name, list]) => ({ name, n: list.length, avg: avgOf(list) }))
    .sort((a, b) => b.n - a.n);

  const counts = Array.from({ length: 10 }, (_, k) => training.filter((r) => r.rating === k + 1).length);
  const max = Math.max(1, ...counts);
  const after = rows.filter((r) => tallinnDate(r.createdAt) > "2026-10-09").length;

  const speakerNameOf = (r: WeekFeedbackRow) =>
    (r.eventId && trainingSpeakerForEvent(r.eventId)?.name) ||
    (r.eventId && getEvent(r.eventId)?.title) ||
    "Muu";

  const inDay = (r: WeekFeedbackRow) => {
    if (!dayFilter) return true;
    const d = tallinnDate(r.createdAt);
    return dayFilter === "later" ? d > "2026-10-09" : d === dayFilter;
  };
  const inSpeaker = (r: WeekFeedbackRow) =>
    !speakerFilter || (r.type === "training" && speakerNameOf(r) === speakerFilter);

  const baseList = tab === "kiitus" ? keep : tab === "ettepanek" ? change : training;
  const list = baseList.filter((r) => inDay(r) && inSpeaker(r));

  const dayOptions: { key: string; label: string; n: number }[] = [
    ...DAYS.map(([d, label]) => ({
      key: d,
      label,
      n: rows.filter((r) => tallinnDate(r.createdAt) === d).length,
    })),
    ...(after ? [{ key: "later", label: "Hiljem", n: after }] : []),
  ];
  const dayMax = Math.max(1, ...dayOptions.map((d) => d.n));

  return (
    <main className="px-4 pt-8 pb-10">
      <h1 className="text-2xl font-bold">Nädala tagasiside</h1>
      <p className="mt-1 text-muted-foreground">Tartu Ettevõtlusnädal 2026 · Studio MindZ</p>

      <section className="mt-6 grid grid-cols-3 gap-2">
        <Stat label="Koolitused" value={String(training.length)} sub={avg != null ? `${fmt(avg)} / 10` : ""} />
        <Stat label="Kiitused" value={String(keep.length)} sub={teamAvg != null ? `${fmt(teamAvg)} / 10` : ""} />
        <Stat label="Ettepanekud" value={String(change.length)} sub="" />
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card p-5">
        <h2 className="font-semibold">Koolituste hinded</h2>
        <div className="mt-4 flex h-40 items-end gap-1.5">
          {counts.map((c, k) => (
            <div key={k} className="flex h-full flex-1 flex-col items-center justify-end">
              <span className="mb-1 text-xs text-muted-foreground">{c || ""}</span>
              <div className="w-full rounded-t-md bg-primary" style={{ height: `${(c / max) * 100}%`, minHeight: c ? 4 : 0 }} />
              <span className="mt-1 text-sm font-medium">{k + 1}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card p-5">
        <h2 className="font-semibold">Päevade kaupa</h2>
        <div className="mt-3 space-y-2">
          {dayOptions.map((d) => {
            const active = dayFilter === d.key;
            return (
              <button
                key={d.key}
                type="button"
                onClick={() => setDayFilter(active ? null : d.key)}
                className={`flex w-full items-center gap-3 rounded-lg px-2 py-1 text-left text-sm ${
                  active ? "bg-primary/10 font-semibold" : ""
                }`}
              >
                <span className="w-14 shrink-0">{d.label}</span>
                <div className="h-3 flex-1 rounded-full bg-muted">
                  <div className="h-3 rounded-full bg-primary" style={{ width: `${(d.n / dayMax) * 100}%` }} />
                </div>
                <span className="w-6 text-right">{d.n}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-4 rounded-2xl border border-border bg-card p-5">
        <h2 className="font-semibold">Koolitajad</h2>
        <table className="mt-3 w-full text-sm">
          <tbody>
            {speakerRows.map((s) => {
              const active = speakerFilter === s.name;
              return (
                <tr
                  key={s.name}
                  onClick={() => {
                    setSpeakerFilter(active ? null : s.name);
                    if (!active) setTab("programm");
                  }}
                  className={`cursor-pointer border-t border-border ${active ? "bg-primary/10 font-semibold" : ""}`}
                >
                  <td className="py-2 pr-2">{s.name}</td>
                  <td className="py-2 text-right text-muted-foreground">{s.n}</td>
                  <td className="py-2 pl-3 text-right font-semibold">{s.avg != null ? fmt(s.avg) : "–"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {(
          [
            ["programm", "Koolitused"],
            ["kiitus", "Kiitused"],
            ["ettepanek", "Ettepanekud"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`rounded-full border-2 px-2 py-2 text-sm font-semibold ${
              tab === k ? "border-primary bg-primary text-primary-foreground" : "border-border"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-3">
        {list.filter((r) => r.message?.trim()).map((r) => (
          <figure key={r.id} className="rounded-2xl bg-mindz-pink p-5">
            <p className="text-xs text-muted-foreground">
              {r.eventId ? (trainingSpeakerForEvent(r.eventId)?.name ?? getEvent(r.eventId)?.title) : "Korraldus"}
              {" · "}
              {new Date(r.createdAt).toLocaleString("et-EE", {
                timeZone: "Europe/Tallinn",
                day: "numeric",
                month: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
              {r.rating != null && ` · ${r.rating}/10`}
            </p>
            <blockquote className="mt-2 whitespace-pre-line">{r.message?.trim()}</blockquote>
            {(r.name?.trim() || r.field?.trim()) && (
              <figcaption className="mt-2 text-sm text-muted-foreground">
                {[r.name?.trim(), r.field?.trim()].filter(Boolean).join(", ")}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </main>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 text-center">
      <p className="text-2xl font-bold text-primary">{value}</p>
      <p className="text-xs font-medium">{label}</p>
      {sub && <p className="text-xs text-muted-foreground">{sub}</p>}
    </div>
  );
}
