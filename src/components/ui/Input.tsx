/**
 * Input primitive for the WASLA practice application.
 *
 * The component wraps the native input element with the shared border, focus,
 * and spacing styles used across forms.
 */
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

/**
 * Renders a styled input field while forwarding native input props.
 *
 * @param props - Native input props plus an optional className override.
 * @param ref - Forwarded reference to the underlying input element.
 * @returns A styled input element.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-2xl border border-border bg-white px-4 text-sm text-card-foreground outline-none transition-shadow placeholder:text-muted focus-visible:ring-4 focus-visible:ring-accent/20",
        className,
      )}
      {...props}
    />
  );
});
