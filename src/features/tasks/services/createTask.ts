/**
 * Task creation service module.
 *
 * The function sends new task payloads to the mock BFF route.
 */
import type { CreateTaskRequest, TaskDto } from "@/features/tasks/types";
import { apiClient } from "@/lib/api/bff/bff-client";
import type { BffResponse } from "@/lib/api/bff/BffResponse";

/**
 * Creates a new task through the mock API.
 *
 * @param data - Task creation payload.
 * @returns The created task wrapped in a BFF response.
 */
export async function createTask(
  data: CreateTaskRequest,
): Promise<BffResponse<TaskDto>> {
  return apiClient<TaskDto>("/api/tasks", {
    action: "create",
    data,
  });
}
