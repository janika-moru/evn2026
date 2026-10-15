CREATE TABLE public.feedback_completion (user_id uuid NOT NULL, event_id text NOT NULL, registration_id uuid REFERENCES public.registrations(id) ON DELETE CASCADE, submitted boolean NOT NULL DEFAULT false, manual boolean NOT NULL DEFAULT false, PRIMARY KEY(user_id,event_id));
GRANT SELECT ON public.feedback_completion TO authenticated;
GRANT ALL ON public.feedback_completion TO service_role;
ALTER TABLE public.feedback_completion ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own completion" ON public.feedback_completion FOR SELECT TO authenticated USING(user_id=auth.uid());
CREATE FUNCTION public.my_feedback_completion() RETURNS TABLE(event_id text,submitted boolean,manual boolean) LANGUAGE sql STABLE SECURITY DEFINER SET search_path=public AS $$
 SELECT c.event_id,c.submitted,c.manual FROM public.feedback_completion c WHERE c.user_id=auth.uid()
 UNION ALL SELECT f.event_id,true,false FROM public.feedback f WHERE auth.uid() IS NOT NULL AND f.feedback_type='training' AND f.event_id IS NOT NULL AND lower(trim(f.contact))=lower(trim(auth.jwt()->>'email'))
$$;
REVOKE ALL ON FUNCTION public.my_feedback_completion() FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.my_feedback_completion() TO authenticated;
CREATE FUNCTION public.set_manual_feedback_completion(_event_id text,_manual boolean) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path=public AS $$
DECLARE _registration uuid;
BEGIN
 IF auth.uid() IS NULL THEN RAISE EXCEPTION 'Unauthorized'; END IF;
 SELECT id INTO _registration FROM public.registrations WHERE email_normalized=lower(trim(auth.jwt()->>'email')) AND fienta_event_id=_event_id AND status !~* 'cancel|refund|tühist' LIMIT 1;
 IF _registration IS NULL THEN RAISE EXCEPTION 'Not registered'; END IF;
 INSERT INTO public.feedback_completion(user_id,event_id,registration_id,manual) VALUES(auth.uid(),_event_id,_registration,_manual) ON CONFLICT(user_id,event_id) DO UPDATE SET manual=excluded.manual,registration_id=excluded.registration_id;
END; $$;
REVOKE ALL ON FUNCTION public.set_manual_feedback_completion(text,boolean) FROM PUBLIC,anon;
GRANT EXECUTE ON FUNCTION public.set_manual_feedback_completion(text,boolean) TO authenticated;
COMMENT ON TABLE public.feedback_completion IS 'Private per-account event completion; linked registrations cascade during existing EVN cleanup.';