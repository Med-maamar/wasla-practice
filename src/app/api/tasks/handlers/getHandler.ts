/**
 * Single task retrieval handler.
 *
 * The handler looks up a task by identifier in the in-memory store.
 */
import { z } from "zod";

import type { TaskDto } from "@/features/tasks/types";
import type { BffResponse } from "@/lib/api/bff/BffResponse";

import { readTaskStore } from "@/app/api/tasks/handlers/taskStore";

const getTaskParamsSchema = z.object({
  id: z.string().min(1),
});

/**
 * Retrieves a single task by identifier.
 *
 * @param params - Request params expected to contain the task id.
 * @returns The matching task or an error response.
 */
export async function getHandler(
  params?: Record<string, unknown>,
): Promise<BffResponse<TaskDto>> {
  const parsedParams = getTaskParamsSchema.safeParse(params);

  if (!parsedParams.success) {
    return {
      success: false,
      error: {
        code: "INVALID_PARAMS",
        message: "A valid task id is required.",
        details: parsedParams.error.flatten(),
      },
    };
  }

  const taskStore = await readTaskStore();
  const task = taskStore.find((item) => item.id === parsedParams.data.id);

  if (!task) {
    return {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Task not found.",
      },
    };
  }

  return {
    success: true,
    data: task,
  };
}
