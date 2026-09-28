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
- Public event availability is persisted in event_availability and computed during Fienta sync as 50 minus non-cancelled/refunded ticket quantities — keeps attendee data private while exposing counts.
- Speaker contact and photo fields live on SPEAKERS, while slides and materials stay on EVENTS — profiles remain reusable and resources stay tied to the correct session.
