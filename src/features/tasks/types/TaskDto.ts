/**
 * Task DTO contract.
 *
 * The interface models the task resource returned by the mock BFF API and used
 * throughout the tasks feature.
 */
export interface TaskDto {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  createdAt: string;
}
