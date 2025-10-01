import { z } from "zod";

export const CONDITION_NAMES = [
  "blinded",
  "bloodied",
  "charmed",
  "dazed",
  "dying",
  "frightened",
  "grappled",
  "hampered",
  "incapacitated",
  "invisible",
  "petrified",
  "poisoned",
  "prone",
  "restrained",
  "riding",
  "slowed",
  "taunted",
  "wounded",
] as const;

export const CONDITIONS: Record<
  (typeof CONDITION_NAMES)[number],
  { name: string; description: string }
> = {
  blinded: {
    name: "Blinded",
    description:
      "Can't see. Attacks against you have advantage, and your attacks have disadvantage.",
  },
  bloodied: {
    name: "Bloodied",
    description: "At half HP or less.",
  },
  charmed: {
    name: "Charmed",
    description:
      "Sees the charmer as an ally. Charmer has advantage on social interactions with you.",
  },
  dazed: {
    name: "Dazed",
    description:
      "Heroes: lose 1 action; monsters: can perform one less action on their next turn.",
  },
  dying: {
    name: "Dying",
    description:
      "At 0 HP. Taking damage while dying causes 2 Wounds, a crit causes 3 instead.",
  },
  frightened: {
    name: "Frightened",
    description:
      "Disadvantage on rolls when source of fear is nearby; speed halved when moving closer to it.",
  },
  grappled: {
    name: "Grappled",
    description: "Cannot move. Attacks against you have advantage.",
  },
  hampered: {
    name: "Hampered",
    description:
      "Any creature with their actions or movement reduced (e.g., Dazed, Grappled, Prone, Difficult Terrain).",
  },
  incapacitated: {
    name: "Incapacitated",
    description:
      "Can't do anything. Attacks against you have advantage, and melee attacks that hit, crit.",
  },
  invisible: {
    name: "Invisible",
    description:
      "Cannot be seen. Your attacks have advantage, and attacks against you have disadvantage.",
  },
  petrified: {
    name: "Petrified",
    description:
      "Incapacitated. You have all the benefits and drawbacks of being a rock! Immune to most damage except from large explosions, picks, or similar tools.",
  },
  poisoned: {
    name: "Poisoned",
    description: "Disadvantage on rolls.",
  },
  prone: {
    name: "Prone",
    description:
      "Movement costs twice as much, and disadvantage on attacks. Melee attacks against you have advantage; Ranged have disadvantage. Spend 3 spaces of your Speed to stand up.",
  },
  restrained: {
    name: "Restrained",
    description: "Cannot move. Attacks against you have advantage.",
  },
  riding: {
    name: "Riding",
    description:
      "You move with the creature you are riding. Any attacks that miss you, strike them.",
  },
  slowed: {
    name: "Slowed",
    description: "Speed halved during your next turn.",
  },
  taunted: {
    name: "Taunted",
    description:
      "Disadvantage on attacks except against the most recent taunter.",
  },
  wounded: {
    name: "Wounded",
    description: "Has any Wounds (typically 6 Wounds and a hero is dead).",
  },
};

export const ConditionSchema = z.object({
  name: z.enum(CONDITION_NAMES),
  description: z.string(),
});
