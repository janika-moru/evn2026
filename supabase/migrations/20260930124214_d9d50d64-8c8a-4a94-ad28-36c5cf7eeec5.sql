DROP POLICY IF EXISTS "Users upload own feedback photos" ON storage.objects;
CREATE POLICY "Users upload own feedback photos"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'feedback'
  AND (storage.foldername(name))[1] = auth.uid()::text
  AND lower(metadata->>'mimetype') IN (
    'image/jpeg', 'image/jpg', 'image/pjpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/heic', 'image/heif'
  )
);