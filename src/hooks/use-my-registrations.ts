import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { syncMyRegistrations } from "@/lib/sync.functions";
import type { EventItem, RegistrationStatus } from "@/lib/events";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return { session, ready };
}

/** Sisseloginud kasutaja registreeritud Fienta event ID-d. RLS tagab, et tuleb ainult tema enda read. */
export function useMyRegistrations() {
  const { session, ready } = useSession();
  const email = session?.user.email ?? null;
  const q = useQuery({
    queryKey: ["my-registrations", email],
    enabled: !!email,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("registrations")
        .select("fienta_event_id, status, ticket_code")
        .eq("email_normalized", email!.trim().toLowerCase());
      if (error) throw error;
      const active = (data ?? []).filter((r) => !/cancel|refund|tühist/i.test(r.status));
      const codes = new Map<string, string[]>();
      for (const r of active) {
        if (!r.ticket_code) continue;
        const list = codes.get(r.fienta_event_id) ?? [];
        if (!list.includes(r.ticket_code)) list.push(r.ticket_code);
        codes.set(r.fienta_event_id, list);
      }
      return { ids: new Set(active.map((r) => r.fienta_event_id)), codes };
    },
  });
  return {
    session,
    ready,
    ids: q.data?.ids ?? new Set<string>(),
    codes: q.data?.codes ?? new Map<string, string[]>(),
    query: q,
  };
}

export function effectiveStatus(event: EventItem, ids: Set<string>): RegistrationStatus {
  return event.fientaEventId && ids.has(event.fientaEventId) ? "registered" : event.registrationStatus;
}

/** Ainult Minu kavas: Fienta sünk taustal (server lukustab 1x minutis). Leht näitab kohe
 *  salvestatud andmeid ja Fienta tõrke korral jäävad need alles. */
export function useFientaBackgroundSync(email: string | null) {
  const sync = useServerFn(syncMyRegistrations);
  const qc = useQueryClient();
  useEffect(() => {
    if (!email) return;
    let cancelled = false;
    sync()
      .then((r) => {
        if (cancelled || !r || r.skipped) return;
        qc.invalidateQueries({ queryKey: ["my-registrations", email] });
        qc.invalidateQueries({ queryKey: ["event-availability-all"] });
      })
      .catch((e) => console.warn("[sync]", e));
    return () => {
      cancelled = true;
    };
  }, [email, sync, qc]);
}
