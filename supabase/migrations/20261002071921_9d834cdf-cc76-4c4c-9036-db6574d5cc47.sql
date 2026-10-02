CREATE TABLE public.trainer_questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  fienta_event_id text NOT NULL,
  user_id uuid NOT NULL,
  body text NOT NULL,
  respondent_name text,
  respondent_field text,
  attachment_path text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX trainer_questions_event_idx ON public.trainer_questions (fienta_event_id);
GRANT ALL ON public.trainer_questions TO service_role;
ALTER TABLE public.trainer_questions ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER trainer_questions_updated_at BEFORE UPDATE ON public.trainer_questions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TABLE public.trainer_question_votes (
  question_id uuid NOT NULL REFERENCES public.trainer_questions(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (question_id, user_id)
);
GRANT ALL ON public.trainer_question_votes TO service_role;
ALTER TABLE public.trainer_question_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users upload own question images" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'question-images' AND (storage.foldername(name))[1] = auth.uid()::text);

CREATE OR REPLACE FUNCTION public.run_evn_cleanup()
 RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $function$
DECLARE _token text;
BEGIN
  IF now() < timestamptz '2027-10-10 00:00:00+03' OR now() > timestamptz '2027-10-13 00:00:00+03' THEN
    RETURN;
  END IF;
  DELETE FROM public.trainer_question_votes WHERE true;
  DELETE FROM public.trainer_questions WHERE true;
  DELETE FROM public.registrations WHERE true;
  DELETE FROM public.feedback WHERE true;
  DELETE FROM public.webhook_logs WHERE true;
  DELETE FROM public.event_availability WHERE true;
  DELETE FROM auth.users WHERE true;
  DELETE FROM public.cleanup_tokens WHERE created_at < now() - interval '1 hour';
  _token := encode(gen_random_bytes(32), 'hex');
  INSERT INTO public.cleanup_tokens (token) VALUES (_token);
  PERFORM net.http_post(
    url := 'https://tartu.mindz.ee/api/public/hooks/evn-cleanup',
    headers := '{"Content-Type": "application/json"}'::jsonb,
    body := jsonb_build_object('token', _token)
  );
END;
$function$;