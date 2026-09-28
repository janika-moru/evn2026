import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
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
        .select("fienta_event_id, status")
        .eq("email_normalized", email!.trim().toLowerCase());
      if (error) throw error;
      return new Set(
        (data ?? [])
          .filter((r) => !/cancel|refund|tühist/i.test(r.status))
          .map((r) => r.fienta_event_id),
      );
    },
  });
  return { session, ready, ids: q.data ?? new Set<string>(), query: q };
}

export function effectiveStatus(event: EventItem, ids: Set<string>): RegistrationStatus {
  return event.fientaEventId && ids.has(event.fientaEventId) ? "registered" : event.registrationStatus;
}
