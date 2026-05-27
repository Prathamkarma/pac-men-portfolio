import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes with clsx for conditional class handling.
 * This avoids class conflicts (e.g., `p-2` and `p-4` both being applied).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
