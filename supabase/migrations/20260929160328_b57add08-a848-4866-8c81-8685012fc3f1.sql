DROP POLICY IF EXISTS "Anyone can view event availability" ON public.event_availability;
REVOKE SELECT ON public.event_availability FROM anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_available_spots(_fienta_event_id text)
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT available_spots FROM public.event_availability
  WHERE fienta_event_id = _fienta_event_id
$$;

REVOKE ALL ON FUNCTION public.get_available_spots(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_available_spots(text) TO anon, authenticated;