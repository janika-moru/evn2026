import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, CheckCircle2, HeartHandshake, Lightbulb, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MeeskondRow } from "@/components/SpeakersTeamLinks";
import { submitFeedback } from "@/lib/feedback.functions";
import { loadFeedbackProfile, saveFeedbackProfile } from "@/lib/feedback-profile";
import { supabase } from "@/integrations/supabase/client";

const GOOGLE_REVIEW_URL = "https://g.page/r/CcA2FXmeWHxzEBM/review";

export function StudioFeedbackSection({ returnLabel = "Tagasi", className = "" }: { returnLabel?: string; className?: string }) {
  const sendFeedback = useServerFn(submitFeedback);
  const [type, setType] = useState<"keep" | "change" | null>(null);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [field, setField] = useState("");
  const [contact, setContact] = useState("");
  const [remember, setRemember] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const hpRef = useRef<HTMLInputElement>(null);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    const saved = loadFeedbackProfile();
    if (saved) {
      setName(saved.name ?? "");
      setField(saved.field ?? "");
      setContact(saved.contact ?? "");
      setRemember(true);
    }
    void supabase.auth.getSession().then(({ data }) => {
      const email = data.session?.user.email;
      if (email) setContact((previous) => previous || email);
    });
  }, []);

  useEffect(() => {
    const el = msgRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [message, type]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!type) return;
    if (!message.trim()) { setError("Kirjuta paar sõna."); return; }
    setSending(true);
    setError("");
    try {
      const res = await sendFeedback({ data: {
        event_id: null,
        feedback_type: type,
        message: message.trim(),
        rating: null,
        keep_text: null,
        change_text: null,
        respondent_name: name.trim() || null,
        respondent_field: field.trim() || null,
        contact_requested: Boolean(contact.trim()),
        contact: contact.trim() || null,
        website: hpRef.current?.value || "",
        elapsed_ms: Date.now() - startedAt.current,
      } });
      if (!res.ok) {
        setError("rateLimited" in res && res.rateLimited
          ? "Hetkel saadetakse tagasisidet palju korraga. Sinu tekst on alles — proovi mõne minuti pärast uuesti."
          : "Saatmine ebaõnnestus. Proovi palun uuesti.");
        return;
      }
      saveFeedbackProfile(remember, { name, field, contact });
      setSent(true);
    } catch {
      setError("Saatmine ebaõnnestus. Proovi palun uuesti.");
    } finally { setSending(false); }
  }

  function close() {
    setType(null);
    setError("");
    if (sent) setMessage("");
    setSent(false);
  }

  const inputClass = "w-full rounded-xl border border-border bg-background px-4 py-3 text-base";

  return (
    <section aria-label="Tagasiside stuudio tiimile" className={`rounded-3xl border border-primary/25 bg-mindz-mint p-4 ${className}`}>
      <h2 className="text-base font-semibold">Jäta tagasiside tiimile</h2>
      {sent ? (
        <div className="mt-4 text-center" role="status">
          <CheckCircle2 className="mx-auto size-10 text-primary" />
          <h3 className="mt-3 text-xl font-semibold">Sinu tagasiside jõudis meieni</h3>
          <p className="mt-2 text-sm text-muted-foreground">Aitäh! Loeme seda kindlasti — ja täname, et võtsid aja.</p>
          <Button variant="outline" onClick={close} className="mt-4 h-auto min-h-11 whitespace-normal rounded-full">{returnLabel}</Button>
        </div>
      ) : type ? (
        <>
          <Button variant="ghost" onClick={close} className="mt-2 h-auto min-h-11 px-0 text-muted-foreground"><ArrowLeft /> Tagasi</Button>
          <form onSubmit={submit} className="mt-3 space-y-4">
            <input ref={hpRef} name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
            <div>
              <label htmlFor="studio-message" className="text-sm font-semibold">Kirjuta meile</label>
              <textarea id="studio-message" ref={msgRef} maxLength={4000} autoFocus value={message} onChange={(e) => setMessage(e.target.value)} placeholder={type === "keep" ? "Mis tiimi, korralduse või ruumide juures meeldis?" : "Mida tiimi, korralduse või ruumide juures muuta?"} className={`mt-2 max-h-[70vh] min-h-32 resize-none overflow-y-auto outline-none focus:ring-2 focus:ring-ring ${inputClass}`} />
            </div>
            <input aria-label="Sinu nimi" value={name} onChange={(e) => setName(e.target.value)} maxLength={200} placeholder="Sinu nimi" className={inputClass} />
            <input aria-label="Roll / valdkond" value={field} onChange={(e) => setField(e.target.value)} maxLength={200} placeholder="Roll / valdkond" className={inputClass} />
            <input aria-label="Meiliaadress" type="email" maxLength={300} value={contact} onChange={(e) => setContact(e.target.value)} placeholder="Meiliaadress" className={inputClass} />
            <p className="text-xs leading-relaxed text-muted-foreground">Nimi ja meiliaadress on vabatahtlikud ning mõeldud vaid tiimile vastamiseks — anonüümselt vastamiseks jäta need täitmata.</p>
            <label className="flex cursor-pointer items-start gap-2.5 text-sm leading-snug text-muted-foreground"><input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-primary" />Jäta nimi, roll ja meiliaadress selles seadmes meelde</label>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            <Button type="submit" disabled={sending} className="h-auto min-h-12 w-full rounded-full">{sending ? "Saadan…" : "Saada"}</Button>
          </form>
        </>
      ) : (
        <>
          <div className="mt-3"><MeeskondRow /></div>
          <div className="mt-4 grid gap-2">
            <Button variant="outline" onClick={() => setType("keep")} className="h-auto min-h-12 justify-start gap-3 whitespace-normal rounded-2xl border-primary/20 bg-background/70 px-4 py-3.5 text-sm font-semibold"><HeartHandshake className="size-5 text-primary" /><span className="flex-1 text-center">Kiidan korraldust, ruume või tiimi</span></Button>
            <Button variant="outline" onClick={() => setType("change")} className="h-auto min-h-12 justify-start gap-3 whitespace-normal rounded-2xl border-primary/20 bg-background/70 px-4 py-3.5 text-sm font-semibold"><Lightbulb className="size-5 text-primary" /><span className="flex-1 text-center">Parandusettepanek korraldusele, ruumidele või tiimile</span></Button>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Nimi ja meiliaadress on vabatahtlikud ning mõeldud vaid koolitajale ja tiimile vastamiseks.</p>
        </>
      )}
      <Button asChild variant="secondary" className="mt-3 h-auto min-h-12 w-full whitespace-normal rounded-2xl bg-mindz-pink p-4 text-sm font-semibold"><a href={GOOGLE_REVIEW_URL}><Star className="size-5 text-primary" />Lisa Google arvustus</a></Button>
    </section>
  );
}