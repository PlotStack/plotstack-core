/**
 * Format a Date to ISO 8601 string.
 */
export function toISO(date: Date = new Date()): string {
  return date.toISOString();
}

/**
 * Get the current timestamp as ISO string.
 */
export function now(): string {
  return new Date().toISOString();
}

/**
 * Parse an ISO string to Date, returns null if invalid.
 */
export function parseDate(iso: string): Date | null {
  const d = new Date(iso);
  return isNaN(d.getTime()) ? null : d;
}
