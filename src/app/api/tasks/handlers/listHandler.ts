/**
 * Task list handler.
 *
 * The handler returns a paginated slice of the in-memory task store so the BFF
 * route can mimic a backend-for-frontend list action.
 */
import type { TaskDto } from "@/features/tasks/types";
import type { BffResponse, PaginatedListDto } from "@/lib/api/bff/BffResponse";

import { readTaskStore } from "@/app/api/tasks/handlers/taskStore";

/**
 * Converts an unknown query value into a safe positive integer.
 *
 * @param value - Raw input value from the request params object.
 * @param fallback - Default number to use when parsing fails.
 * @returns A positive integer.
 */
function toPositiveInteger(value: unknown, fallback: number) {
  const parsedValue =
    typeof value === "number"
      ? value
      : typeof value === "string"
        ? Number.parseInt(value, 10)
        : Number.NaN;

  return Number.isFinite(parsedValue) && parsedValue > 0 ? parsedValue : fallback;
}

/**
 * Builds a paginated task list response.
 *
 * @param params - Optional pagination params with page and pageSize.
 * @returns A paginated BFF response for tasks.
 */
export function listHandler(
  params?: Record<string, unknown>,
): Promise<BffResponse<PaginatedListDto<TaskDto>>> {
  return buildListResponse(params);
}

/**
 * Builds the paginated response with the persisted task list.
 *
 * @param params - Optional pagination params.
 * @returns A paginated response promise.
 */
async function buildListResponse(
  params?: Record<string, unknown>,
): Promise<BffResponse<PaginatedListDto<TaskDto>>> {
  const taskStore = await readTaskStore();
  const page = toPositiveInteger(params?.page, 1);
  const pageSize = toPositiveInteger(params?.pageSize, 10);

  // Slice the shared in-memory store so the route behaves like a real paginated API.
  const startIndex = (page - 1) * pageSize;
  const items = taskStore.slice(startIndex, startIndex + pageSize);

  return {
    success: true,
    data: {
      items,
      totalCount: taskStore.length,
      page,
      pageSize,
    },
  };
}
