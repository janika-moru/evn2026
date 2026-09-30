UPDATE public.registrations SET raw_payload = NULL, attendee_name = NULL WHERE raw_payload IS NOT NULL OR attendee_name IS NOT NULL;
UPDATE public.webhook_logs SET raw_payload = NULL WHERE raw_payload IS NOT NULL;

CREATE OR REPLACE FUNCTION public.try_start_fienta_sync(_min_interval_seconds integer)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE last_at timestamptz;
BEGIN
  IF NOT pg_try_advisory_xact_lock(hashtext('fienta-sync')) THEN
    RETURN false;
  END IF;
  SELECT max(received_at) INTO last_at FROM public.webhook_logs WHERE source = 'api-sync';
  IF last_at IS NOT NULL AND now() - last_at < make_interval(secs => _min_interval_seconds) THEN
    RETURN false;
  END IF;
  INSERT INTO public.webhook_logs (source, error) VALUES ('api-sync', NULL);
  RETURN true;
END;
$$;
REVOKE ALL ON FUNCTION public.try_start_fienta_sync(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.try_start_fienta_sync(integer) TO service_role;

CREATE INDEX IF NOT EXISTS webhook_logs_source_received_idx ON public.webhook_logs (source, received_at DESC);

CREATE EXTENSION IF NOT EXISTS pg_cron;
SELECT cron.schedule('purge-webhook-logs', '15 3 * * *',
  $$DELETE FROM public.webhook_logs WHERE received_at < now() - interval '30 days'$$);