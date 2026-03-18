/**
 * Task listing service module.
 *
 * The function fetches paginated tasks through the BFF client and returns a
 * standardized response envelope.
 */
import type { TaskDto } from "@/features/tasks/types";
import { apiClient } from "@/lib/api/bff/bff-client";
import type { BffResponse, PaginatedListDto } from "@/lib/api/bff/BffResponse";

/**
 * Fetches paginated tasks from the mock API.
 *
 * @param params - Optional pagination parameters.
 * @returns A paginated task list response.
 */
export async function getTasks(params?: {
  page?: number;
  pageSize?: number;
}): Promise<BffResponse<PaginatedListDto<TaskDto>>> {
  return apiClient<PaginatedListDto<TaskDto>>("/api/tasks", {
    action: "list",
    params,
  });
}
