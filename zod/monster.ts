import { z } from "zod";
import { CONDITION_NAMES } from "./conditions";
import { MetadataSchema } from "./metadata";

export const MONSTER_SIZES = [
  "tiny",
  "small",
  "medium",
  "large",
  "huge",
  "gargantuan",
];

export const MONSTER_ROLES = [
  "melee",
  "ranged",
  "controller",
  "support",
  "aoe",
  "summoner",
  "striker",
  "ambusher",
  "defender",
];

export const AttackTargetSchema = z.union([
  z.object({ range: z.int().positive() }),
  z.object({ reach: z.int().positive() }),
  z.object({ aura: z.int().positive() }),
]);

export const AttackDamageSchema = z.object({
  kind: z.string().optional(),
  roll: z.string().optional(),
});

export const AttackEffectSchema = z.object({
  trigger: z.enum(["hit", "crit", "miss", "turn_end", "damage"]).optional(),
  condition: z
    .union([
      z.enum(CONDITION_NAMES),
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    ])
    .optional(),
  damage: AttackDamageSchema.optional(),
  description: z.string().optional(),
});

export const AttackAreaSchema = z.object({
  shape: z.enum(["cone", "square", "line"]),
  size: z.int().positive(),
});

export const MonsterMovementSchema = z.object({
  mode: z.string().optional(),
  speed: z.int().positive(),
});

export const MonsterActionPartMove = z.object({
  type: z.literal("move"),
  ...MonsterMovementSchema.shape,
});

export const MonsterActionPartAttack = z.object({
  type: z.literal("attack"),
  damage: AttackDamageSchema.optional(),
  target: AttackTargetSchema.optional(),
  effects: z.array(AttackEffectSchema).optional(),
  area: AttackAreaSchema.optional(),
  save: z
    .object({
      stat: z.enum(["STR", "DEX", "INT", "WIL"]),
      dc: z.int().positive(),
    })
    .optional(),
});

export const MonsterActionPart = z.discriminatedUnion("type", [
  MonsterActionPartMove,
  MonsterActionPartAttack,
]);

export const MonsterAction = z.object({
  name: z.string(),
  description: z.string().optional(),
  damage: AttackDamageSchema.optional(),
  target: AttackTargetSchema.optional(),
  effects: z.array(AttackEffectSchema).optional(),
  area: AttackAreaSchema.optional(),
  uses: z.int().optional(),
  parts: z.array(MonsterActionPart).optional(),
});

export const AbilityEffectSchema = z.object({
  trigger: z.enum(["always", "hit", "crit", "miss", "turn_end", "death"]),
  condition: z
    .union([
      z.enum(CONDITION_NAMES),
      z.object({
        name: z.string(),
        description: z.string(),
      }),
    ])
    .optional(),
  damage: AttackDamageSchema.optional(),
  target: AttackTargetSchema.optional(),
  description: z.string().optional(),
  type: z.string().optional(),
});

export const MonsterAbility = z.object({
  name: z.string().optional(),
  description: z.string(),
  effects: z.array(AbilityEffectSchema).optional(),
});

export const MonsterFamily = z.object({
  meta: MetadataSchema.optional(),
  name: z.string(),
  description: z.string().optional(),
  abilities: z.array(MonsterAbility).default([]),
});

export const StandardMonsterSchema = z.object({
  meta: MetadataSchema.optional(),
  legendary: z.literal(false).default(false),
  name: z.string(),
  hp: z.int().positive(),
  level: z.union([z.enum(["1/4", "1/3", "1/2"]), z.number().positive()]),
  size: z.enum(MONSTER_SIZES),
  armor: z.enum(["none", "medium", "heavy"]),
  kind: z.string().optional(),
  family: z.string().optional(),
  saves: z
    .object({
      all: z.number().default(0),
      str: z.number().default(0),
      dex: z.number().default(0),
      int: z.number().default(0),
      wil: z.number().default(0),
    })
    .optional(),
  movement: z.array(MonsterMovementSchema).default([{ speed: 6 }]),
  abilities: z.array(MonsterAbility).default([]),
  effects: z.array(AbilityEffectSchema).default([]),
  actions: z.array(MonsterAction).default([]),
  actionsPerTurn: z.enum(["single", "all", "sequential"]).default("single"),
  role: z.enum(MONSTER_ROLES).optional(),
});

export const LegendaryMonsterSchema = z.object({
  ...StandardMonsterSchema.shape,
  legendary: z.literal(true),
  bloodied: z.object({
    hp: z.int().positive().optional(),
    description: z.string().optional(),
  }),
  lastStand: z.object({
    hp: z.int().positive().optional(),
    description: z.string().optional(),
  }),
});

export const MonsterSchema = z.union([
  LegendaryMonsterSchema,
  StandardMonsterSchema,
]);
