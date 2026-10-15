import { describe, expect, it } from "vitest";
import { registeredMaterials } from "./materials";

const materials = { "202950": { slidesUrl: "mari-slides", materialsUrl: "mari-workbook" }, "202946": { letter: "Papside kiri" } };
describe("Registreeringupõhine materjalide ligipääs", () => {
  it("ei anna materjale registreeringuta", () => {
    expect(registeredMaterials(materials, [])).toEqual({});
  });
  it("annab ainult vastava koolituse slaidid ja töövihiku", () => {
    expect(registeredMaterials(materials, [{ fienta_event_id: "202950", status: "paid" }])).toEqual({ "202950": materials["202950"] });
  });
  it("ei anna tühistatud või tagastatud pileti materjale", () => {
    expect(registeredMaterials(materials, [{ fienta_event_id: "202950", status: "cancelled" }, { fienta_event_id: "202946", status: "refunded" }])).toEqual({});
  });
  it("annab Papside kirja ainult Papside registreeringuga", () => {
    expect(registeredMaterials(materials, [{ fienta_event_id: "202946", status: "paid" }])).toEqual({ "202946": materials["202946"] });
  });
});