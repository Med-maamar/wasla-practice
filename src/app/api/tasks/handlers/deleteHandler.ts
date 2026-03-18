/**
 * Task deletion handler.
 *
 * The handler removes a task by identifier from the in-memory store.
 */
import { z } from "zod";

import type { BffResponse } from "@/lib/api/bff/BffResponse";

import { readTaskStore, writeTaskStore } from "@/app/api/tasks/handlers/taskStore";

const deleteTaskParamsSchema = z.object({
  id: z.string().min(1),
});

/**
 * Deletes a task from the in-memory store.
 *
 * @param params - Request params expected to contain the task id.
 * @returns The deleted task id or an error response.
 */
export function deleteHandler(
  params?: Record<string, unknown>,
): Promise<BffResponse<{ id: string }>> {
  return handleDelete(params);
}

/**
 * Deletes a task from the persisted mock store.
 *
 * @param params - Request params expected to contain the task id.
 * @returns The deleted task id or an error response.
 */
async function handleDelete(
  params?: Record<string, unknown>,
): Promise<BffResponse<{ id: string }>> {
  const parsedParams = deleteTaskParamsSchema.safeParse(params);

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
  const taskIndex = taskStore.findIndex((item) => item.id === parsedParams.data.id);

  if (taskIndex === -1) {
    return {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Task not found.",
      },
    };
  }

  taskStore.splice(taskIndex, 1);
  await writeTaskStore(taskStore);

  return {
    success: true,
    data: {
      id: parsedParams.data.id,
    },
  };
}
