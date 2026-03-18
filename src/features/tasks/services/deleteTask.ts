/**
 * Task deletion service module.
 *
 * The function deletes a task through the mock BFF route.
 */
import { apiClient } from "@/lib/api/bff/bff-client";
import type { BffResponse } from "@/lib/api/bff/BffResponse";

/**
 * Deletes a task by identifier through the mock API.
 *
 * @param id - Task identifier.
 * @returns A response describing whether the deletion succeeded.
 */
export async function deleteTask(id: string): Promise<BffResponse<{ id: string }>> {
  return apiClient<{ id: string }>("/api/tasks", {
    action: "delete",
    params: { id },
  });
}
