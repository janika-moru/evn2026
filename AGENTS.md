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
