"use client";

/**
 * Task card component.
 *
 * The card renders task content together with edit and delete actions.
 */
import { Badge, Button, Card } from "@/components/ui";
import { useLanguage } from "@/contexts";
import type { TaskDto } from "@/features/tasks/types";
import { Icons } from "@/lib/icons";

type TaskCardProps = {
  task: TaskDto;
  onDelete: (task: TaskDto) => void;
  onEdit: (task: TaskDto) => void;
};

/**
 * Renders a single task card with localized actions and status label.
 *
 * @param props - Task card props.
 * @returns A task card.
 */
export function TaskCard({ onDelete, onEdit, task }: TaskCardProps) {
  const { locale, t } = useLanguage();

  const statusLabel =
    task.status === "todo"
      ? t.statusTodo
      : task.status === "in-progress"
        ? t.statusInProgress
        : t.statusDone;

  return (
    <Card className="flex h-full flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-card-foreground">{task.title}</h3>
          <p className="text-sm leading-6 text-muted">
            {task.description || t.emptyDescription}
          </p>
        </div>
        <Badge label={statusLabel} status={task.status} />
      </div>
      <div className="mt-auto flex items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {new Date(task.createdAt).toLocaleDateString(locale)}
        </p>
        <div className="flex gap-2">
          <Button onClick={() => onEdit(task)} size="sm" variant="ghost">
            <Icons.edit className="h-4 w-4" />
            {t.edit}
          </Button>
          <Button onClick={() => onDelete(task)} size="sm" variant="destructive">
            <Icons.delete className="h-4 w-4" />
            {t.delete}
          </Button>
        </div>
      </div>
    </Card>
  );
}
