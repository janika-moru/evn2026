ALTER TABLE public.feedback
  ADD COLUMN feedback_type text NOT NULL DEFAULT 'change' CHECK (feedback_type IN ('keep','change','help')),
  ADD COLUMN message text,
  ADD COLUMN needs_help boolean NOT NULL DEFAULT false,
  ADD COLUMN contact_requested boolean NOT NULL DEFAULT false,
  ADD COLUMN contact text,
  ADD COLUMN attachment_url text,
  ADD COLUMN status text NOT NULL DEFAULT 'new' CHECK (status IN ('new','resolved'));
UPDATE public.feedback SET message = comment WHERE message IS NULL;
ALTER TABLE public.feedback ADD CONSTRAINT feedback_lengths CHECK (char_length(coalesce(message,'')) <= 4000 AND char_length(coalesce(contact,'')) <= 300);
GRANT SELECT, UPDATE ON public.feedback TO authenticated;
CREATE POLICY "Admins read feedback" ON public.feedback FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins update feedback" ON public.feedback FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Anyone uploads feedback photos" ON storage.objects FOR INSERT TO anon, authenticated WITH CHECK (bucket_id = 'feedback');
CREATE POLICY "Admins view feedback photos" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'feedback' AND public.has_role(auth.uid(),'admin'));