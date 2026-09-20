/**
 * Clamp a requested index into the valid range for a list of the given length.
 * Returns 0 when `length` is 0 (empty list) so callers never index out of
 * bounds. Otherwise returns a value in [0, length - 1].
 */
export function clampIndex(index: number, length: number): number {
  if (length <= 0) return 0;
  if (index < 0) return 0;
  if (index > length - 1) return length - 1;
  return Math.floor(index) + 0; // normalize -0 to +0
}
