import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { QUESTION_SLUGS, type QuestionItem } from "@/lib/questions";

const eventId = z.string().regex(/^\d{1,12}$/);
const optText = z.string().trim().max(100).nullish();
const body = z.string().trim().min(1).max(2000);
const path = z
  .string()
  .regex(/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.(jpg|jpeg|png|webp|gif|heic|heif)$/)
  .nullish();

type Ctx = { supabase: any; userId: string };

async function assertRegistered(ctx: Ctx, fientaEventId: string) {
  const { data } = await ctx.supabase
    .from("registrations")
    .select("status")
    .eq("fienta_event_id", fientaEventId);
  const ok = (data ?? []).some((r: { status: string }) => !/cancel|refund|tühist/i.test(r.status));
  if (!ok) throw new Error("Not registered");
}

async function loadQuestions(fientaEventId: string, userId: string | null): Promise<QuestionItem[]> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data: rows } = await supabaseAdmin
    .from("trainer_questions")
    .select("id, body, respondent_name, respondent_field, attachment_path, user_id, created_at, trainer_question_votes(user_id)")
    .eq("fienta_event_id", fientaEventId);
  const paths = (rows ?? []).map((r) => r.attachment_path).filter(Boolean) as string[];
  const urls = new Map<string, string>();
  if (paths.length) {
    const { data: signed } = await supabaseAdmin.storage
      .from("question-images")
      .createSignedUrls(paths, 60 * 60);
    for (const s of signed ?? []) if (s.path && s.signedUrl) urls.set(s.path, s.signedUrl);
  }
  return (rows ?? [])
    .map((r) => {
      const votes = (r.trainer_question_votes ?? []) as { user_id: string }[];
      return {
        id: r.id,
        body: r.body,
        name: r.respondent_name,
        field: r.respondent_field,
        imageUrl: r.attachment_path ? (urls.get(r.attachment_path) ?? null) : null,
        votes: votes.length,
        votedByMe: !!userId && votes.some((v) => v.user_id === userId),
        mine: !!userId && r.user_id === userId,
        createdAt: r.created_at,
      };
    })
    .sort((a, b) => b.votes - a.votes || a.createdAt.localeCompare(b.createdAt));
}

export const listQuestions = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ eventId }).parse(d))
  .handler(async ({ data, context }) => {
    await assertRegistered(context as Ctx, data.eventId);
    return loadQuestions(data.eventId, context.userId);
  });

export const askQuestion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ eventId, body, name: optText, field: optText, attachment: path }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertRegistered(context as Ctx, data.eventId);
    if (data.attachment && !data.attachment.startsWith(`${context.userId}/`)) throw new Error("Bad path");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since = new Date(Date.now() - 10 * 60_000).toISOString();
    const { count } = await supabaseAdmin
      .from("trainer_questions")
      .select("id", { count: "exact", head: true })
      .eq("user_id", context.userId)
      .gte("created_at", since);
    if ((count ?? 0) >= 20) return { ok: false as const, rateLimited: true };
    const { error } = await supabaseAdmin.from("trainer_questions").insert({
      fienta_event_id: data.eventId,
      user_id: context.userId,
      body: data.body,
      respondent_name: data.name || null,
      respondent_field: data.field || null,
      attachment_path: data.attachment ?? null,
    });
    if (error) return { ok: false as const };
    return { ok: true as const };
  });

export const updateQuestion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid(), body }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin
      .from("trainer_questions")
      .update({ body: data.body })
      .eq("id", data.id)
      .eq("user_id", context.userId);
    return { ok: !error };
  });

export const deleteQuestion = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: rows } = await supabaseAdmin
      .from("trainer_questions")
      .delete()
      .eq("id", data.id)
      .eq("user_id", context.userId)
      .select("attachment_path");
    const p = rows?.[0]?.attachment_path;
    if (p) await supabaseAdmin.storage.from("question-images").remove([p]);
    return { ok: true };
  });

export const toggleVote = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: q } = await supabaseAdmin
      .from("trainer_questions")
      .select("fienta_event_id, user_id")
      .eq("id", data.id)
      .maybeSingle();
    if (!q || q.user_id === context.userId) return { ok: false };
    await assertRegistered(context as Ctx, q.fienta_event_id);
    const { data: del } = await supabaseAdmin
      .from("trainer_question_votes")
      .delete()
      .eq("question_id", data.id)
      .eq("user_id", context.userId)
      .select("question_id");
    if (!del?.length) {
      await supabaseAdmin
        .from("trainer_question_votes")
        .insert({ question_id: data.id, user_id: context.userId });
    }
    return { ok: true };
  });

// Koolitaja avalik vaade — ainult lugemiseks.
export const publicQuestions = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ slug: z.string().max(40) }).parse(d))
  .handler(async ({ data }) => {
    const id = QUESTION_SLUGS[data.slug.toLowerCase()];
    if (!id) return null;
    const items = await loadQuestions(id, null);
    return { eventId: id, items };
  });
