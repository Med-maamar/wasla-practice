"use client";

/**
 * Task delete confirmation dialog.
 *
 * The dialog confirms deletion before removing a task through the mock API.
 */
import { useState } from "react";

import { Button, Dialog } from "@/components/ui";
import { useLanguage } from "@/contexts";
import { deleteTask } from "@/features/tasks/services";
import type { TaskDto } from "@/features/tasks/types";
import { Icons } from "@/lib/icons";

type TaskDeleteDialogProps = {
  onClose: () => void;
  onDeleted: (result: { id: string; message: string }) => void;
  task: TaskDto | null;
};

/**
 * Renders a confirmation dialog for task deletion.
 *
 * @param props - Delete dialog props.
 * @returns The delete dialog.
 */
export function TaskDeleteDialog({
  onClose,
  onDeleted,
  task,
}: TaskDeleteDialogProps) {
  const { t } = useLanguage();
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  /**
   * Deletes the currently selected task.
   *
   * @returns A promise that resolves after the delete flow completes.
   */
  async function handleDelete() {
    if (!task) {
      return;
    }

    setDeleteError(null);
    setIsDeleting(true);

    const response = await deleteTask(task.id);

    setIsDeleting(false);

    if (!response.success) {
      setDeleteError(response.error?.message ?? t.deleteError);
      return;
    }

    onDeleted({
      id: task.id,
      message: t.deleteSuccess,
    });
  }

  return (
    <Dialog
      closeLabel={t.cancel}
      description={t.deleteConfirmDescription}
      onClose={onClose}
      open={Boolean(task)}
      title={t.deleteConfirmTitle}
    >
      <div className="space-y-5">
        <p className="rounded-2xl border border-border bg-[#fff6ec] px-4 py-3 text-sm text-card-foreground">
          {task?.title}
        </p>
        {deleteError ? <p className="text-sm text-[#a53b2d]">{deleteError}</p> : null}
        <div className="flex justify-end gap-3">
          <Button onClick={onClose} variant="ghost">
            <Icons.cancel className="h-4 w-4" />
            {t.cancel}
          </Button>
          <Button disabled={isDeleting} onClick={handleDelete} variant="destructive">
            {isDeleting ? (
              <Icons.loader className="h-4 w-4 animate-spin" />
            ) : (
              <Icons.delete className="h-4 w-4" />
            )}
            {t.delete}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
