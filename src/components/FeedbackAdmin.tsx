import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { EVENTS, getEvent } from "@/lib/events";

const TYPE_LABEL: Record<string, string> = {
  training: "Koolitus",
  keep: "Kiidan korraldust",
  change: "Parandusettepanek",
  help: "Abi vaja",
};

export function FeedbackAdmin() {
  const [eventF, setEventF] = useState("all");
  const [typeF, setTypeF] = useState("all");
  const [showResolved, setShowResolved] = useState(false);

  const q = useQuery({
    queryKey: ["admin-feedback"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data ?? [];
    },
  });

  const rows = (q.data ?? []).filter(
    (r) =>
      (eventF === "all" ||
        (eventF === "general" ? !r.event_id : r.event_id === eventF)) &&
      (typeF === "all" || r.feedback_type === typeF) &&
      (showResolved || r.status !== "resolved"),
  );
  const openHelp = (q.data ?? []).filter((r) => r.needs_help && r.status !== "resolved").length;

  async function toggle(id: string, status: string) {
    await supabase
      .from("feedback")
      .update({ status: status === "resolved" ? "new" : "resolved" })
      .eq("id", id);
    q.refetch();
  }

  async function openPhoto(path: string) {
    const { data } = await supabase.storage.from("feedback").createSignedUrl(path, 300);
    if (data?.signedUrl) window.open(data.signedUrl, "_blank");
  }

  const sel = "rounded-lg border border-border bg-background px-2 py-2 text-sm";

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Tagasiside</h2>
        <button onClick={() => q.refetch()} className="text-sm font-semibold text-primary">
          Värskenda
        </button>
      </div>
      {openHelp > 0 && (
        <button
          onClick={() => setTypeF("help")}
          className="mt-3 w-full rounded-xl bg-destructive px-4 py-3 text-left text-sm font-semibold text-destructive-foreground"
        >
          🆘 {openHelp} lahendamata abipalvet — näita
        </button>
      )}
      <div className="mt-3 flex flex-wrap gap-2">
        <select value={typeF} onChange={(e) => setTypeF(e.target.value)} className={sel}>
          <option value="all">Kõik tüübid</option>
          <option value="training">Koolitus</option>
          <option value="keep">Kiidan korraldust</option>
          <option value="change">Parandusettepanek</option>
        </select>
        <select value={eventF} onChange={(e) => setEventF(e.target.value)} className={`${sel} max-w-full`}>
          <option value="all">Kõik sündmused</option>
          <option value="general">Üldine korraldus</option>
          {EVENTS.map((e) => (
            <option key={e.id} value={e.id}>
              {e.title.slice(0, 50)}
            </option>
          ))}
        </select>
        <label className="flex items-center gap-1.5 text-sm">
          <input
            type="checkbox"
            checked={showResolved}
            onChange={(e) => setShowResolved(e.target.checked)}
          />
          Näita lahendatuid
        </label>
      </div>

      <div className="mt-3 space-y-2">
        {q.isLoading && <p className="text-sm text-muted-foreground">Laen…</p>}
        {!q.isLoading && rows.length === 0 && (
          <p className="text-sm text-muted-foreground">Tagasisidet pole.</p>
        )}
        {rows.map((r) => (
          <div
            key={r.id}
            className={`rounded-xl border p-3 text-sm ${
              r.needs_help && r.status !== "resolved"
                ? "border-destructive bg-destructive/5"
                : "border-border bg-card"
            } ${r.status === "resolved" ? "opacity-60" : ""}`}
          >
            <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">
                {TYPE_LABEL[r.feedback_type] ?? r.feedback_type}
              </span>
              <span>
                {new Date(r.created_at).toLocaleString("et-EE", {
                  day: "numeric",
                  month: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {r.event_id ? (getEvent(r.event_id)?.title ?? r.event_id) : "Üldine korraldus"}
            </p>
            {r.rating != null && <p className="mt-2 font-semibold">Hinnang: {r.rating}/10</p>}
            {r.keep_text && <p className="mt-2 whitespace-pre-wrap"><span className="font-medium">Jääks samaks:</span> {r.keep_text}</p>}
            {r.change_text && <p className="mt-2 whitespace-pre-wrap"><span className="font-medium">Teistmoodi:</span> {r.change_text}</p>}
            {(r.respondent_name || r.respondent_field) && (
              <p className="mt-2 text-xs text-muted-foreground">{[r.respondent_name, r.respondent_field].filter(Boolean).join(", ")}</p>
            )}
            {(r.message ?? r.comment) && (
              <p className="mt-2 whitespace-pre-wrap">{r.message ?? r.comment}</p>
            )}
            {r.contact_requested && (
              <p className="mt-2 font-medium">📞 Soovib ühendust: {r.contact ?? "—"}</p>
            )}
            <div className="mt-2 flex gap-4">
              {r.attachment_url && (
                <button
                  onClick={() => openPhoto(r.attachment_url!)}
                  className="font-semibold text-primary"
                >
                  Vaata fotot
                </button>
              )}
              <button onClick={() => toggle(r.id, r.status)} className="font-semibold text-primary">
                {r.status === "resolved" ? "Märgi uueks" : "Märgi lahendatuks"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
