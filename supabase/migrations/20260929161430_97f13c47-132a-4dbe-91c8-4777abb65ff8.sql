drop policy if exists "Anyone uploads feedback photos" on storage.objects;

create policy "Users upload own feedback photos"
on storage.objects
for insert
to authenticated
with check (
  bucket_id = 'feedback'
  and (storage.foldername(name))[1] = (select auth.uid()::text)
  and name ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(jpg|jpeg|png|webp|heic|heif|gif)$'
);