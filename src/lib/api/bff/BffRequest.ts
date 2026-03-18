/**
 * BFF request contracts.
 *
 * The file defines the supported action set and the schema used to validate
 * POST bodies received by BFF-style API routes.
 */
import { z } from "zod";

export const BffAction = z.enum(["list", "get", "create", "update", "delete"]);

export const BffRequestSchema = z.object({
  action: BffAction,
  params: z.record(z.string(), z.unknown()).optional(),
  data: z.unknown().optional(),
});

export type BffAction = z.infer<typeof BffAction>;
export type BffRequest<TData = unknown> = {
  action: BffAction;
  params?: Record<string, unknown>;
  data?: TData;
};
