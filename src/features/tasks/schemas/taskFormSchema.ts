/**
 * Task form validation schema.
 *
 * The schema is shared between UI forms and mock API handlers to keep the task
 * payload shape consistent.
 */
import { z } from "zod";

export const taskFormSchema = z.object({
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  status: z.enum(["todo", "in-progress", "done"]),
});

export type TaskFormValues = z.infer<typeof taskFormSchema>;
