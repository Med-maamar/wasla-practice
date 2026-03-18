/**
 * Task update service module.
 *
 * The function sends task updates to the mock BFF route and returns the
 * updated task payload.
 */
import type { TaskDto, UpdateTaskRequest } from "@/features/tasks/types";
import { apiClient } from "@/lib/api/bff/bff-client";
import type { BffResponse } from "@/lib/api/bff/BffResponse";

/**
 * Updates an existing task through the mock API.
 *
 * @param data - Task update payload including the task identifier.
 * @returns The updated task wrapped in a BFF response.
 */
export async function updateTask(
  data: UpdateTaskRequest,
): Promise<BffResponse<TaskDto>> {
  return apiClient<TaskDto>("/api/tasks", {
    action: "update",
    data,
  });
}
