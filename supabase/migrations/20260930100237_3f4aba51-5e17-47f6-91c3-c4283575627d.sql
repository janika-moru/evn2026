select cron.schedule('purge-old-registrations-feedback', '30 3 * * *', $$
  delete from public.registrations where created_at < now() - interval '365 days';
  delete from public.feedback where created_at < now() - interval '365 days';
$$);