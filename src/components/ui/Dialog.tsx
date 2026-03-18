"use client";

/**
 * Dialog primitive for modal content.
 *
 * The component renders an overlay, header row, title, optional description,
 * and close affordances while leaving the body content flexible.
 */
import { Button } from "@/components/ui/Button";
import { Icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

export interface DialogProps {
  open: boolean;
  title: string;
  description?: string;
  closeLabel?: string;
  className?: string;
  children: React.ReactNode;
  onClose: () => void;
}

/**
 * Renders a modal dialog when the `open` prop is true.
 *
 * @param props - Dialog content, visibility state, and close handler.
 * @returns A modal dialog or `null` when closed.
 */
export function Dialog({
  children,
  className,
  closeLabel = "Close",
  description,
  onClose,
  open,
  title,
}: DialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#26160f]/45 px-4 py-6 backdrop-blur-sm"
      role="dialog"
    >
      <button
        aria-label={closeLabel}
        className="absolute inset-0 cursor-default"
        onClick={onClose}
        type="button"
      />
      <div
        className={cn(
          "relative z-10 w-full max-w-lg rounded-[2rem] border border-border bg-card p-6 shadow-[var(--shadow)]",
          className,
        )}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-card-foreground">{title}</h2>
            {description ? <p className="text-sm text-muted">{description}</p> : null}
          </div>
          <Button
            aria-label={closeLabel}
            className="h-10 w-10 rounded-full p-0"
            onClick={onClose}
            variant="ghost"
          >
            <Icons.cancel className="h-4 w-4" />
          </Button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
