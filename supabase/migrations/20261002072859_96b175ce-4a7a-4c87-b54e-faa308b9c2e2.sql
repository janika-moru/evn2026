ALTER TABLE public.trainer_questions
  ADD COLUMN owner_email_normalized text;

UPDATE public.trainer_questions AS q
SET owner_email_normalized = lower(trim(u.email))
FROM auth.users AS u
WHERE u.id = q.user_id
  AND u.email IS NOT NULL;

CREATE INDEX trainer_questions_owner_email_idx
  ON public.trainer_questions (owner_email_normalized);