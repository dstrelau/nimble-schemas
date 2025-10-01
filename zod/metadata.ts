import { z } from "zod";

export const MetadataSchema = z.object({
  source: z.union([z.url(), z.enum(["GMG"])]).optional(),
});
