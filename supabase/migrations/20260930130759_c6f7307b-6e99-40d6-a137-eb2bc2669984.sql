CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE TABLE public.cleanup_tokens (
  token text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.cleanup_tokens TO service_role;
ALTER TABLE public.cleanup_tokens ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.run_evn_cleanup()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE _token text;
BEGIN
  IF now() < timestamptz '2027-10-10 00:00:00+03' OR now() > timestamptz '2027-10-13 00:00:00+03' THEN
    RETURN;
  END IF;
  DELETE FROM public.registrations WHERE true;
  DELETE FROM public.feedback WHERE true;
  DELETE FROM public.webhook_logs WHERE true;
  DELETE FROM public.event_availability WHERE true;
  DELETE FROM auth.users WHERE true;
  -- Fotod kustutatakse serveri kaudu (salvestusruumi ei saa SQL-iga tühjendada)
  DELETE FROM public.cleanup_tokens WHERE created_at < now() - interval '1 hour';
  _token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.cleanup_tokens (token) VALUES (_token);
  PERFORM net.http_post(
    url := 'https://tartu.mindz.ee/api/public/hooks/evn-cleanup',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object('token', _token)
  );
END;
$$;
REVOKE ALL ON FUNCTION public.run_evn_cleanup() FROM PUBLIC, anon, authenticated;

SELECT cron.schedule('evn-cleanup-2027', '0 0 10-12 10 *', 'select public.run_evn_cleanup()');