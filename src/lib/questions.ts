// Koolitaja avalik küsimuste link: tartu.mindz.ee/<slug> → Fienta sündmuse id.
export const QUESTION_SLUGS: Record<string, string> = {
  kiiae: "202940",
  kiiat: "202965",
  kiiak: "202966",
  kiian: "202967",
  kiiar: "202968",
  kiia: "202938",
  mikk: "202928",
  kadri: "202930",
  martin: "202931",
  janika: "202933",
  urmo: "202955",
  papsid: "202946",
  timo: "202947",
  ulvi: "202945",
  roland: "202948",
  katrinv: "202949",
  marika: "202952",
  ivar: "202958",
  katrind: "202936",
  kukkumiskaitse: "202957",
  tambet: "202954",
  epp: "202959",
  mari: "202950",
  birgit: "202951",
  anu: "202953",
};

export type QuestionItem = {
  id: string;
  body: string;
  name: string | null;
  field: string | null;
  imageUrl: string | null;
  votes: number;
  votedByMe: boolean;
  mine: boolean;
  createdAt: string;
};

export function questionAuthor(q: Pick<QuestionItem, "name" | "field">): string {
  const name = q.name?.trim() || "Anonüümne";
  return q.field?.trim() ? `${name}, ${q.field.trim()}` : name;
}
