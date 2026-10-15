export interface EventMaterials {
  slidesUrl?: string;
  materialsUrl?: string;
  materialsLabel?: string;
  letter?: string;
}

export function registeredMaterials(
  materials: Record<string, EventMaterials>,
  registrations: { fienta_event_id: string; status: string }[],
): Record<string, EventMaterials> {
  const allowed = new Set(registrations.filter((r) => !/cancel|refund|tühist/i.test(r.status)).map((r) => r.fienta_event_id));
  return Object.fromEntries(Object.entries(materials).filter(([id]) => allowed.has(id)));
}