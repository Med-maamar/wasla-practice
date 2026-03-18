/**
 * Task creation request contract.
 *
 * The type defines the payload accepted when creating a new task.
 */
import type { TaskDto } from "@/features/tasks/types/TaskDto";

export type CreateTaskRequest = Pick<TaskDto, "title" | "description" | "status">;
