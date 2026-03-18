/**
 * Shared utility helpers used across the application.
 *
 * The current module exposes a minimal class name joiner so the UI primitives
 * can compose Tailwind classes without adding an extra dependency.
 */

/**
 * Joins class names while skipping falsy values.
 *
 * @param classes - List of classes that may include empty values.
 * @returns A space-separated class name string.
 */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
