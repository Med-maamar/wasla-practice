/**
 * Task update request contract.
 *
 * The type requires a task identifier and allows partial updates to the
 * editable task fields.
 */
import type { CreateTaskRequest } from "@/features/tasks/types/CreateTaskRequest";

export type UpdateTaskRequest = Partial<CreateTaskRequest> & {
  id: string;
};
