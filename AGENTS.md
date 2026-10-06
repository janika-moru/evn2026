<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- Fienta registrations are keyed by email_normalized (not auth user id); participants read their own rows via RLS on auth.jwt() email — registrations can exist before the account does.
- Fienta webhook lives at /api/public/fienta-webhook, guarded by ?token= matching FIENTA_WEBHOOK_TOKEN; parsing/upsert shared with CSV import in src/lib/registrations.server.ts — one dedupe path.
- Fienta registrations primarily sync via official API (GET /api/v1/events/{id}/tickets, Bearer FIENTA_API) in syncFromFientaApi; triggered on Minu kava load (throttled 1/min via webhook_logs source='api-sync') and admin button — no cron/webhook dependency needed.
- Public event availability is persisted in event_availability and computed during Fienta sync as each event's optional capacity (default 50) minus non-cancelled/refunded ticket quantities — Morning Mindset sessions use 25 while attendee data stays private.
- Speaker contact and photo fields live on SPEAKERS, while slides and materials stay on EVENTS — profiles remain reusable and resources stay tied to the correct session.
- Repeated sessions are tagged with seriesUrl on EVENTS and collapsed to one row by speakerEventRows() (src/lib/events.ts) — keeps the koolitajad list scannable and links to the Fienta series page instead of five near-duplicate events.
- Event dates and times stay in ISO/Fienta format internally and are localized only for display through helpers in src/lib/events.ts — preserves sorting, comparisons, and calendar exports.
- Brand tints are semantic tokens in src/styles.css (@theme --color-mindz-*), e.g. --color-mindz-mint for the light-green team card — never hardcode hex in components, so theming and dark mode keep working.
- Registered-event actions are shared through RegisteredEventActions in both Minu kava and the event detail — keeps feedback, slides, and speaker contacts identical on both paths.
- Fienta sync throttling uses DB function try_start_fienta_sync (advisory lock) called only from server; runs in background from Minu kava only — atomic, avoids parallel syncs.
- Fienta raw payloads are never persisted (registrations/webhook_logs); webhook_logs purged after 30 days via pg_cron — GDPR data minimisation.

- Poppins on ise majutatud (public/fonts + @font-face src/styles.css), Google Fontsi linki ei kasutata — kiirem esmalaadimine ja vähem väliseid päringuid.
- Offline-vahemälu: public/sw.js (staatika cache-first, lehed network-first) registreeritakse src/components/OfflineCache.tsx kaudu — äpp töötab nõrga levi korral.
- Galerii pisipildid on 400px WebP src/assets/room-thumbs/, täissuuruses pilt laaditakse alles suures vaates — Info leht avaneb kiiresti.
- Korraldajad (nt Studio MindZ) on ORGANIZERS-ist, eraldi SPEAKERS-ist; speakersForEvent loeb mõlemad, koolitajate nimekiri ja trainingSpeakerForEvent jätab isOrganizer-märgiga profiilid välja — lõpuõhtu näitab korraldaja pildi ja sotslingid, aga Studio MindZ ei ilmu koolitajate hulka ega tagasiside koolitaja valikusse.
- One-time EVN cleanup on 10.10.2027: pg_cron `evn-cleanup-2027` runs public.run_evn_cleanup() (date-guarded, retries 10–12 Oct) which deletes registrations/feedback/logs/auth users and calls /api/public/hooks/evn-cleanup with a single-use cleanup_tokens token to empty the feedback bucket — storage can't be deleted via SQL and no cron secret is readable in SQL.
- Trainer questions (trainer_questions/votes) are server-function-only; access is checked against the caller's Fienta registration, question ownership follows the normalized account email across devices, and public trainer links /<slug> map via QUESTION_SLUGS — keeps writes validated and links readable.
- Trainer feedback dashboard /tagasiside/<slug> is open by URL (no code, per user decision) and server-function-only; contact/photo fields are never returned — feedback PII stays private.
- Trainer feedback responses include the explicit publication-consent flag without filtering entries, so the dashboard can identify feedback that must not be republished.
