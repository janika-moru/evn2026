// Tagasisidevormi eeltäide seadmes — ainult kasutaja „Jäta selles seadmes meelde"
// nõusolekul. Vana võti (enne eraldi nõusolekut) kustutatakse lugemata.
// Andmed aeguvad 10.10.2026; fotot ei salvestata kunagi.
const LEGACY_KEY = "smz-feedback-profile";
const KEY = "smz-feedback-profile-v2";
const EXPIRES_AT = new Date("2026-10-10T00:00:00+03:00").getTime();

export type FeedbackProfile = { name?: string; field?: string; contact?: string };

export function loadFeedbackProfile(): FeedbackProfile | null {
  try {
    localStorage.removeItem(LEGACY_KEY);
    if (Date.now() >= EXPIRES_AT) {
      localStorage.removeItem(KEY);
      return null;
    }
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as FeedbackProfile & { expiresAt?: number };
    if (!p.expiresAt || Date.now() >= p.expiresAt) {
      localStorage.removeItem(KEY);
      return null;
    }
    return { name: p.name, field: p.field, contact: p.contact };
  } catch {
    return null;
  }
}

export function saveFeedbackProfile(remember: boolean, profile: FeedbackProfile) {
  try {
    localStorage.removeItem(LEGACY_KEY);
    const clean: FeedbackProfile = {};
    if (profile.name?.trim()) clean.name = profile.name.trim();
    if (profile.field?.trim()) clean.field = profile.field.trim();
    if (profile.contact?.trim()) clean.contact = profile.contact.trim();
    if (!remember || Date.now() >= EXPIRES_AT || !Object.keys(clean).length) {
      localStorage.removeItem(KEY);
      return;
    }
    localStorage.setItem(KEY, JSON.stringify({ ...clean, expiresAt: EXPIRES_AT }));
  } catch {
    // salvestus ei õnnestunud — tagasiside on ikkagi saadetud
  }
}
