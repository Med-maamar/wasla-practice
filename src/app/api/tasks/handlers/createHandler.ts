/**
 * Task creation handler.
 *
 * The handler validates incoming payloads and appends new tasks to the
 * in-memory store.
 */
import type { TaskDto } from "@/features/tasks/types";
import type { BffResponse } from "@/lib/api/bff/BffResponse";

import { taskFormSchema } from "@/features/tasks/schemas";
import { readTaskStore, writeTaskStore } from "@/app/api/tasks/handlers/taskStore";

/**
 * Creates a new task in the in-memory store.
 *
 * @param data - Unknown request payload to validate.
 * @returns The created task or an error response.
 */
export async function createHandler(data?: unknown): Promise<BffResponse<TaskDto>> {
  const parsedData = taskFormSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      success: false,
      error: {
        code: "INVALID_PAYLOAD",
        message: "Task payload is invalid.",
        details: parsedData.error.flatten(),
      },
    };
  }

  const taskStore = await readTaskStore();

  const newTask: TaskDto = {
    id: crypto.randomUUID(),
    title: parsedData.data.title,
    description: parsedData.data.description ?? "",
    status: parsedData.data.status,
    createdAt: new Date().toISOString(),
  };

  taskStore.unshift(newTask);
  await writeTaskStore(taskStore);

  return {
    success: true,
    data: newTask,
  };
}
