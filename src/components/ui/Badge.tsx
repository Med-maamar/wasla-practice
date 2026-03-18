/**
 * Badge primitive for task statuses.
 *
 * The component maps task states to pill styles so status indicators stay
 * visually consistent across the application.
 */
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

type BadgeStatus = "todo" | "in-progress" | "done";

const badgeClasses: Record<BadgeStatus, string> = {
  todo: "border-[#d9b879] bg-[#fff4db] text-[#835b16]",
  "in-progress": "border-[#d5a777] bg-[#fbe9d8] text-[#9c5524]",
  done: "border-[#a1c3a4] bg-[#e4f3e6] text-[#25623c]",
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: BadgeStatus;
  label?: string;
}

/**
 * Renders a task status pill with an icon and state-specific styling.
 *
 * @param props - Badge props including the required task status.
 * @returns A styled status badge.
 */
export function Badge({ className, label, status, ...props }: BadgeProps) {
  const StatusIcon =
    status === "todo"
      ? Icons.statusTodo
      : status === "in-progress"
        ? Icons.statusInProgress
        : Icons.statusDone;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold capitalize",
        badgeClasses[status],
        className,
      )}
      {...props}
    >
      <StatusIcon className="h-3.5 w-3.5" />
      {label ?? status}
    </span>
  );
}
