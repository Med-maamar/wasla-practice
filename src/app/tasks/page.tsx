/**
 * Tasks page route.
 *
 * The page remains a thin orchestration layer that delegates feature logic to
 * the tasks module.
 */
import { TaskList } from "@/features/tasks/components";

/**
 * Renders the tasks page.
 *
 * @returns The task list feature.
 */
export default function TasksPage() {
  return <TaskList />;
}
