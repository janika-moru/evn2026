REVOKE EXECUTE ON FUNCTION public.try_start_fienta_sync(integer) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.try_start_fienta_sync(integer) TO service_role;

CREATE POLICY "Admins can view availability"
ON public.event_availability
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));