CREATE TABLE public.event_availability (
  fienta_event_id text PRIMARY KEY,
  active_registrations integer NOT NULL DEFAULT 0 CHECK (active_registrations >= 0),
  capacity integer NOT NULL DEFAULT 50 CHECK (capacity > 0),
  available_spots integer NOT NULL DEFAULT 50 CHECK (available_spots >= 0),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

GRANT SELECT ON public.event_availability TO anon, authenticated;
GRANT ALL ON public.event_availability TO service_role;

ALTER TABLE public.event_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view event availability"
ON public.event_availability
FOR SELECT
TO anon, authenticated
USING (true);