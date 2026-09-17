import { z } from "zod";

const listCommentaryQuerySchema = z.object({
  limit: z
    .number()
    .int()
    .positive()
    .max(100)
    .optional(),
});

const createCommentarySchema = z.object({
  minute: z.number().int().nonnegative(),
  sequence: z.number().int().optional(),
  period: z.string().optional(),
  eventType: z.string().optional(),
  actor: z.string().optional(),
  team: z.string().optional(),
  message: z.string().min(),
  metadata: z.record(z.string(), z.any()).optional(),
  tags: z.array(z.string()).optional(),
});

export {
  listCommentaryQuerySchema,
  createCommentarySchema,
};