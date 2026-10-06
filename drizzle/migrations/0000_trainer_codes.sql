CREATE TABLE public.trainer_codes (speaker_id text PRIMARY KEY, code text NOT NULL);
GRANT ALL ON public.trainer_codes TO service_role;
ALTER TABLE public.trainer_codes ENABLE ROW LEVEL SECURITY;
CREATE TABLE public.trainer_code_attempts (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), speaker_id text NOT NULL, created_at timestamptz NOT NULL DEFAULT now());
GRANT ALL ON public.trainer_code_attempts TO service_role;
ALTER TABLE public.trainer_code_attempts ENABLE ROW LEVEL SECURITY;
CREATE INDEX trainer_code_attempts_idx ON public.trainer_code_attempts (speaker_id, created_at);