CREATE OR REPLACE FUNCTION public.strip_raw_payload()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.raw_payload := NULL; RETURN NEW; END; $$;

CREATE TRIGGER registrations_strip_raw BEFORE INSERT OR UPDATE ON public.registrations
FOR EACH ROW EXECUTE FUNCTION public.strip_raw_payload();
CREATE TRIGGER webhook_logs_strip_raw BEFORE INSERT OR UPDATE ON public.webhook_logs
FOR EACH ROW EXECUTE FUNCTION public.strip_raw_payload();