/**
 * Task update handler.
 *
 * The handler validates partial updates and mutates the matching task in the
 * shared in-memory store.
 */
import { z } from "zod";

import type { TaskDto } from "@/features/tasks/types";
import type { BffResponse } from "@/lib/api/bff/BffResponse";

import { taskFormSchema } from "@/features/tasks/schemas";
import { readTaskStore, writeTaskStore } from "@/app/api/tasks/handlers/taskStore";

const updateTaskSchema = taskFormSchema.partial().extend({
  id: z.string().min(1),
});

/**
 * Updates an existing task in the in-memory store.
 *
 * @param data - Unknown update payload containing the task id and changed fields.
 * @returns The updated task or an error response.
 */
export async function updateHandler(data?: unknown): Promise<BffResponse<TaskDto>> {
  const parsedData = updateTaskSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      error: {
        code: "INVALID_PAYLOAD",
        message: "Task update payload is invalid.",
        details: parsedData.error.flatten(),
      },
    };
  }

  const taskStore = await readTaskStore();
  const taskIndex = taskStore.findIndex((item) => item.id === parsedData.data.id);

  if (taskIndex === -1) {
    return {
      success: false,
      error: {
        code: "NOT_FOUND",
        message: "Task not found.",
      },
    };
  }

  const currentTask = taskStore[taskIndex];

  taskStore[taskIndex] = {
    ...currentTask,
    ...parsedData.data,
    description: parsedData.data.description ?? currentTask.description,
  };
  await writeTaskStore(taskStore);

  return {
    success: true,
    data: taskStore[taskIndex],
  };
}
