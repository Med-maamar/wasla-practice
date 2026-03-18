/**
 * Button primitive for the WASLA practice application.
 *
 * The component provides a small design-system surface with consistent
 * variants, sizes, and forwarded HTML button props.
 */
import { forwardRef } from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "destructive" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-accent text-accent-foreground shadow-sm hover:bg-[#c76035] focus-visible:ring-accent/40",
  destructive:
    "bg-[#a53b2d] text-white shadow-sm hover:bg-[#8b2f23] focus-visible:ring-[#a53b2d]/40",
  ghost:
    "bg-transparent text-card-foreground hover:bg-[#f2e5d7] focus-visible:ring-[#c7aa91]/40",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 rounded-xl px-3 text-sm",
  md: "h-11 rounded-2xl px-4 text-sm",
  lg: "h-12 rounded-2xl px-5 text-base",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

/**
 * Renders a reusable button with WASLA-specific variants and sizes.
 *
 * @param props - Button props and native HTML button attributes.
 * @param ref - Forwarded reference to the underlying button element.
 * @returns A styled button element.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, size = "md", type = "button", variant = "default", ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 border border-transparent font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    />
  );
});
