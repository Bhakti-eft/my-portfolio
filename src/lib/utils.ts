/** Join class names, skipping falsy values. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Resolve a file in /public against the configured base path,
 * so links keep working on GitHub Pages sub-paths.
 */
export function asset(path: string): string {
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
}

export const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
