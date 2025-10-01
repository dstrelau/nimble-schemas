import { describe, expect, it } from "vitest";
import { z } from "zod";
import subclasses from "../examples/subclasses.json";
import { SubclassSchema } from "./subclass";

describe("Subclass validation", () => {
  describe("SubclassSchema", () => {
    for (const subclass of subclasses.subclasses) {
      it(`validates subclass: ${subclass.name || "unnamed"}`, () => {
        expect(() =>
          z.strictObject({ ...SubclassSchema.shape }).parse(subclass)
        ).not.toThrow();
      });
    }
  });
});
