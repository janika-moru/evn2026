DROP POLICY IF EXISTS "Anyone can submit feedback" ON public.feedback;
CREATE POLICY "Anyone can submit valid feedback" ON public.feedback
FOR INSERT TO anon, authenticated
WITH CHECK (
  status = 'new'
  AND char_length(feedback_type) BETWEEN 1 AND 30
  AND (rating IS NULL OR rating BETWEEN 1 AND 10)
  AND coalesce(char_length(message), 0) <= 5000
  AND coalesce(char_length(keep_text), 0) <= 5000
  AND coalesce(char_length(change_text), 0) <= 5000
  AND coalesce(char_length(comment), 0) <= 5000
  AND coalesce(char_length(respondent_name), 0) <= 200
  AND coalesce(char_length(respondent_field), 0) <= 200
  AND coalesce(char_length(contact), 0) <= 320
  AND coalesce(char_length(event_id), 0) <= 100
  AND (attachment_url IS NULL OR attachment_url ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}/[0-9a-f-]{36}\.[a-z0-9]{1,5}$')
);

DROP POLICY IF EXISTS "Anyone uploads feedback photos" ON storage.objects;
CREATE POLICY "Anyone uploads feedback photos" ON storage.objects
FOR INSERT TO anon, authenticated
WITH CHECK (
  bucket_id = 'feedback'
  AND name ~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}/[0-9a-f-]{36}\.(jpg|jpeg|png|webp|heic|heif|gif)$'
);