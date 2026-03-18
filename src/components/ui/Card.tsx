/**
 * Card primitive for the WASLA practice application.
 *
 * Cards provide a consistent container style for panels, lists, and content
 * sections throughout the task manager UI.
 */
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

/**
 * Renders a padded content container with the shared border and shadow styles.
 *
 * @param props - Native div props plus an optional className override.
 * @param ref - Forwarded reference to the underlying div element.
 * @returns A styled card container.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-[1.75rem] border border-border bg-card p-6 text-card-foreground shadow-[0_12px_35px_rgba(91,60,39,0.08)]",
        className,
      )}
      {...props}
    />
  );
});
