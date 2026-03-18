"use client";

/**
 * Task form component.
 *
 * The form supports both task creation and task editing with React Hook Form
 * and Zod validation.
 */
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { Button, Input } from "@/components/ui";
import { useLanguage } from "@/contexts";
import { taskFormSchema, type TaskFormValues } from "@/features/tasks/schemas";
import { createTask, updateTask } from "@/features/tasks/services";
import type { TaskDto } from "@/features/tasks/types";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

type TaskFormProps = {
  task?: TaskDto | null;
  onCancel: () => void;
  onSuccess: (result: {
    message: string;
    mode: "create" | "edit";
    task: TaskDto;
  }) => void;
};

const emptyFormValues: TaskFormValues = {
  title: "",
  description: "",
  status: "todo",
};

/**
 * Renders the task creation and editing form.
 *
 * @param props - Form props.
 * @returns The task form.
 */
export function TaskForm({ onCancel, onSuccess, task }: TaskFormProps) {
  const { t } = useLanguage();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setError,
    setValue,
    watch,
  } = useForm<TaskFormValues>({
    defaultValues: emptyFormValues,
  });

  useEffect(() => {
    reset(
      task
        ? {
            title: task.title,
            description: task.description,
            status: task.status,
          }
        : emptyFormValues,
    );
  }, [reset, task]);

  const selectedStatus = useWatch({
    control,
    name: "status",
  });

  /**
   * Validates and submits the task form payload.
   *
   * @param values - Form values collected by React Hook Form.
   * @returns A promise that resolves after the save flow completes.
   */
  async function onSubmit(values: TaskFormValues) {
    setSubmitError(null);

    const parsedValues = taskFormSchema.safeParse(values);

    if (!parsedValues.success) {
      parsedValues.error.issues.forEach((issue) => {
        const fieldName = issue.path[0];

        if (fieldName === "title" || fieldName === "description" || fieldName === "status") {
          setError(fieldName, { message: issue.message });
        }
      });

      return;
    }

    const payload = {
      ...parsedValues.data,
      description: parsedValues.data.description ?? "",
    };

    const response = task
      ? await updateTask({ id: task.id, ...payload })
      : await createTask(payload);

    if (!response.success) {
      setSubmitError(response.error?.message ?? t.submitError);
      return;
    }

    reset(emptyFormValues);
    onSuccess({
      message: task ? t.updateSuccess : t.createSuccess,
      mode: task ? "edit" : "create",
      task: response.data ?? {
        id: task?.id ?? crypto.randomUUID(),
        ...payload,
        createdAt: task?.createdAt ?? new Date().toISOString(),
      },
    });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-card-foreground">{t.title}</label>
        <Input {...register("title")} placeholder={t.title} />
        {errors.title ? <p className="text-sm text-[#a53b2d]">{errors.title.message}</p> : null}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-card-foreground">
          {t.description}
        </label>
        <Input {...register("description")} placeholder={t.description} />
        {errors.description ? (
          <p className="text-sm text-[#a53b2d]">{errors.description.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <p className="text-sm font-semibold text-card-foreground">{t.status}</p>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: t.statusTodo, value: "todo" as const },
            { label: t.statusInProgress, value: "in-progress" as const },
            { label: t.statusDone, value: "done" as const },
          ].map((option) => (
            <Button
              className={cn("justify-center", selectedStatus !== option.value && "opacity-75")}
              key={option.value}
              onClick={() => setValue("status", option.value)}
              type="button"
              variant={selectedStatus === option.value ? "default" : "ghost"}
            >
              {option.label}
            </Button>
          ))}
        </div>
        {errors.status ? <p className="text-sm text-[#a53b2d]">{errors.status.message}</p> : null}
      </div>

      {submitError ? <p className="text-sm text-[#a53b2d]">{submitError}</p> : null}

      <div className="flex justify-end gap-3">
        <Button onClick={onCancel} type="button" variant="ghost">
          <Icons.cancel className="h-4 w-4" />
          {t.cancel}
        </Button>
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? (
            <Icons.loader className="h-4 w-4 animate-spin" />
          ) : (
            <Icons.save className="h-4 w-4" />
          )}
          {t.save}
        </Button>
      </div>
    </form>
  );
}
