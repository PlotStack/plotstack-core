import { randomUUID } from 'node:crypto';

/**
 * Generate a UUID v4.
 * In production, consider UUIDv7 for time-ordered keys.
 */
export function generateId(): string {
  return randomUUID();
}
