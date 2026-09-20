/**
 * Map a scroll progress value (0..1) to an active step index. Returns
 * `min(floor(progress * stepCount), stepCount - 1)` clamped into
 * [0, stepCount - 1]. Returns 0 when `stepCount` is not positive.
 */
export function stepForProgress(progress: number, stepCount: number): number {
  if (stepCount <= 0) return 0;
  const clampedProgress = Math.min(1, Math.max(0, progress));
  const step = Math.floor(clampedProgress * stepCount);
  return Math.min(step, stepCount - 1);
}
