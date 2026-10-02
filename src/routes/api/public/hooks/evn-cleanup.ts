import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

// Ühekordne 10.10.2027 kustutamine: andmebaas kustutab read ise (run_evn_cleanup),
// see route tühjendab tagasiside fotode kausta. Kutsuja tõestab end ühekordse
// koodiga, mille andmebaas just cleanup_tokens tabelisse kirjutas.
const body = z.object({ token: z.string().regex(/^[0-9a-f]{64}$/), dryRun: z.boolean().optional() });

export const Route = createFileRoute("/api/public/hooks/evn-cleanup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = body.safeParse(await request.json().catch(() => null));
        if (!parsed.success) return new Response("Bad request", { status: 400 });
        const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
        const { data: tok } = await supabaseAdmin
          .from("cleanup_tokens")
          .delete()
          .eq("token", parsed.data.token)
          .gte("created_at", new Date(Date.now() - 60 * 60_000).toISOString())
          .select("token");
        if (!tok?.length) return new Response("Unauthorized", { status: 401 });

        let found = 0;
        let removed = 0;
        for (const bucketName of ["feedback", "question-images"]) {
        const bucket = supabaseAdmin.storage.from(bucketName);
        const { data: folders } = await bucket.list("", { limit: 1000 });
        for (const folder of folders ?? []) {
          for (;;) {
            const { data: files } = await bucket.list(folder.name, { limit: 1000 });
            if (!files?.length) break;
            const paths = files.map((f) => `${folder.name}/${f.name}`);
            found += paths.length;
            if (parsed.data.dryRun) break;
            const { error } = await bucket.remove(paths);
            if (error) return Response.json({ ok: false, removed }, { status: 500 });
            removed += paths.length;
          }
        }
        }
        return Response.json({ ok: true, found, removed });
      },
    },
  },
});
