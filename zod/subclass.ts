import { z } from "zod";
import { MetadataSchema } from "./metadata";

export const SubclassVisibilitySchema = z.enum(["public", "private"]);

export const CLASS_NAMES = [
  "Artificer",
  "Berserker",
  "The Cheat",
  "Commander",
  "Hexbinder",
  "Hunter",
  "Mage",
  "Oathsworn",
  "Shadowmancer",
  "Shepherd",
  "Songweaver",
  "Stormshifter",
  "Zephyr",
];

export const SubclassAbilitySchema = z.object({
  name: z.string(),
  description: z.string(),
});

export const SubclassLevelSchema = z.object({
  level: z.int().positive(),
  abilities: z.array(SubclassAbilitySchema),
});

export const SubclassSchema = z.object({
  meta: MetadataSchema.optional(),
  namePreface: z.string().optional(),
  name: z.string(),
  className: z.enum(CLASS_NAMES),
  description: z.string().optional(),
  levels: z.array(SubclassLevelSchema),
});

/*

actionType: z
			.enum(["action", "bonus action", "reaction", "free action", "passive"])
			.optional()
			.meta({ description: "What type of action this ability requires" }),

		trigger: z.string().optional().meta({ description: "For reactions, what triggers this ability" }),

		cost: z
			.object({
				mana: z.number().int().min(0).optional(),
				hitDice: z.number().int().min(0).optional(),
				totHCharges: z.number().int().min(0).optional().meta({ description: "Thrill of the Hunt charges" }),
				furyDice: z.number().int().min(0).optional(),
				wounds: z.number().int().min(0).optional(),
			})
			.strict()
			.optional()
			.meta({ description: "Resource costs for using this ability" }),

		levelScaling: z
			.array(
				z
					.object({
						level: z.number().int().min(1).max(20),
						changes: z.string().meta({ description: "Description of what changes at this level" }),
					})
					.strict(),
			)
			.optional()
			.meta({ description: "How this ability changes at higher levels" }),
			*/
