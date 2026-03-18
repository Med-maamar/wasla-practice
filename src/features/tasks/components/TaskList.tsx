"use client";

/**
 * Task list feature component.
 *
 * The component fetches paginated tasks, displays them, and orchestrates the
 * create, edit, and delete interactions.
 */
import { useEffect, useState } from "react";

import { Button, Card, Dialog } from "@/components/ui";
import { useLanguage } from "@/contexts";
import { getTasks } from "@/features/tasks/services";
import type { TaskDto } from "@/features/tasks/types";
import { Icons } from "@/lib/icons";

import { TaskCard } from "@/features/tasks/components/TaskCard";
import { TaskDeleteDialog } from "@/features/tasks/components/TaskDeleteDialog";
import { TaskForm } from "@/features/tasks/components/TaskForm";

const PAGE_SIZE = 10;

/**
 * Renders the paginated tasks view and the CRUD dialogs.
 *
 * @returns The task list feature.
 */
export function TaskList() {
  const { t } = useLanguage();
  const [tasks, setTasks] = useState<TaskDto[]>([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<TaskDto | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<TaskDto | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    getTasks({ page, pageSize: PAGE_SIZE })
      .then((response) => {
        if (!response.success) {
          throw new Error(response.error?.message ?? t.loadError);
        }

        setTasks(response.data?.items ?? []);
        setTotalCount(response.data?.totalCount ?? 0);
      })
      .catch((requestError: Error) => {
        setError(requestError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, t.loadError]);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  /**
   * Opens the create-task dialog.
   */
  function handleCreateOpen() {
    setActiveTask(null);
    setIsFormOpen(true);
    setFeedback(null);
  }

  /**
   * Opens the edit-task dialog.
   *
   * @param task - Task selected for editing.
   */
  function handleEditOpen(task: TaskDto) {
    setActiveTask(task);
    setIsFormOpen(true);
    setFeedback(null);
  }

  /**
   * Refreshes the list after a successful mutation.
   *
   * @param message - Localized success message.
   */
  function handleMutationSuccess(message: string) {
    setFeedback(message);
    setError(null);
  }

  /**
   * Goes to the previous page and starts the loading state.
   */
  function handlePreviousPage() {
    setError(null);
    setIsLoading(true);
    setPage((currentPage) => currentPage - 1);
  }

  /**
   * Goes to the next page and starts the loading state.
   */
  function handleNextPage() {
    setError(null);
    setIsLoading(true);
    setPage((currentPage) => currentPage + 1);
  }

  /**
   * Applies a create or edit response directly to local state.
   *
   * @param result - Localized success message and updated task payload.
   */
  function handleFormSuccess(result: {
    message: string;
    mode: "create" | "edit";
    task: TaskDto;
  }) {
    handleMutationSuccess(result.message);
    setIsFormOpen(false);
    setActiveTask(null);

    if (result.mode === "create") {
      setPage(1);
      setTotalCount((currentCount) => currentCount + 1);
      setTasks((currentTasks) => [result.task, ...currentTasks].slice(0, PAGE_SIZE));
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.map((task) => (task.id === result.task.id ? result.task : task)),
    );
  }

  /**
   * Applies a delete response directly to local state.
   *
   * @param result - Localized success message and deleted task identifier.
   */
  function handleDeleteSuccess(result: { id: string; message: string }) {
    handleMutationSuccess(result.message);
    setTaskToDelete(null);
    setTotalCount((currentCount) => Math.max(0, currentCount - 1));
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== result.id));
  }

  return (
    <main className="px-6 py-10 md:px-10 lg:px-14">
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <Card className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted">{t.tasks}</p>
            <h2 className="text-3xl font-bold text-card-foreground">{t.tasks}</h2>
          </div>
          <Button onClick={handleCreateOpen} size="lg">
            <Icons.add className="h-4 w-4" />
            {t.createTask}
          </Button>
        </Card>

        {feedback ? (
          <Card className="border-[#a1c3a4] bg-[#e4f3e6] py-4 text-sm text-[#25623c]">
            {feedback}
          </Card>
        ) : null}

        {error ? (
          <Card className="border-[#d7a4a0] bg-[#fff1f0] py-4 text-sm text-[#a53b2d]">
            {error}
          </Card>
        ) : null}

        {isLoading ? (
          <Card className="flex items-center justify-center gap-3 py-12 text-muted">
            <Icons.loader className="h-5 w-5 animate-spin" />
            {t.loading}
          </Card>
        ) : tasks.length === 0 ? (
          <Card className="py-12 text-center text-muted">{t.noTasks}</Card>
        ) : (
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                onDelete={setTaskToDelete}
                onEdit={handleEditOpen}
                task={task}
              />
            ))}
          </section>
        )}

        <div className="flex items-center justify-between rounded-[1.75rem] border border-border bg-card px-5 py-4">
          <p className="text-sm text-muted">
            {t.page} {page} / {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              disabled={page <= 1}
              onClick={handlePreviousPage}
              variant="ghost"
            >
              <Icons.chevronLeft className="h-4 w-4" />
              {t.previous}
            </Button>
            <Button
              disabled={page >= totalPages}
              onClick={handleNextPage}
              variant="ghost"
            >
              {t.next}
              <Icons.chevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        closeLabel={t.cancel}
        description={activeTask ? t.editTask : t.createTask}
        onClose={() => setIsFormOpen(false)}
        open={isFormOpen}
        title={activeTask ? t.editTask : t.createTask}
      >
        <TaskForm
          key={activeTask?.id ?? "new-task-form"}
          onCancel={() => setIsFormOpen(false)}
          onSuccess={handleFormSuccess}
          task={activeTask}
        />
      </Dialog>

      <TaskDeleteDialog
        onClose={() => setTaskToDelete(null)}
        onDeleted={handleDeleteSuccess}
        task={taskToDelete}
      />
    </main>
  );
}
