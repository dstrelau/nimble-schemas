import { describe, expect, it } from "vitest";
import { z } from "zod";
import monsters from "../examples/monsters.json";
import {
  LegendaryMonsterSchema,
  MonsterFamily,
  StandardMonsterSchema,
} from "./monster";

describe("Monster validation", () => {
  describe("MonsterFamily", () => {
    for (const family of monsters.families) {
      it(`validates family: ${family.name}`, () => {
        expect(() =>
          z.strictObject({ ...MonsterFamily.shape }).parse(family)
        ).not.toThrow();
      });
    }
  });

  describe("MonsterSchema", () => {
    for (const monster of monsters.monsters) {
      it(`validates monster: ${monster.name}`, () => {
        expect(() =>
          z
            .union([
              z.strictObject({ ...StandardMonsterSchema.shape }),
              z.strictObject({ ...LegendaryMonsterSchema.shape }),
            ])
            .parse(monster)
        ).not.toThrow();
      });
    }
  });
});
