CREATE TABLE public.feedback (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text,
  rating smallint,
  comment text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.feedback TO anon;
GRANT INSERT ON public.feedback TO authenticated;
GRANT ALL ON public.feedback TO service_role;

ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit feedback"
ON public.feedback
FOR INSERT
TO anon, authenticated
WITH CHECK (true);