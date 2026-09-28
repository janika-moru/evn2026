import { createFileRoute } from "@tanstack/react-router";
import { timingSafeEqual } from "crypto";

export const Route = createFileRoute("/api/public/fienta-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const expected = process.env["FIENTA_WEBHOOK_TOKEN"];
        const token = new URL(request.url).searchParams.get("token") ?? "";
        if (
          !expected ||
          token.length !== expected.length ||
          !timingSafeEqual(Buffer.from(token), Buffer.from(expected))
        ) {
          return new Response("Unauthorized", { status: 401 });
        }

        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { parseFientaPayload, upsertRegistration } = await import(
          "@/lib/registrations.server"
        );

        const text = await request.text();
        let payload: unknown;
        try {
          payload = JSON.parse(text);
        } catch {
          // Fienta võib saata ka form-encoded kujul
          payload = Object.fromEntries(new URLSearchParams(text));
        }

        try {
          await upsertRegistration(supabaseAdmin, parseFientaPayload(payload), payload, "webhook");
        } catch (e) {
          console.error("[fienta-webhook] unexpected", e);
        }
        return Response.json({ ok: true });
      },
    },
  },
});
