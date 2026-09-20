/**
 * Angle in degrees for a course item at `index` when `count` items are spread
 * evenly around a full circle. Returns a value in the half-open range [0, 360).
 * Returns 0 when `count` is not positive so an empty selector is safe to render.
 */
export function angleForIndex(index: number, count: number): number {
  if (count <= 0) return 0;
  const raw = (index * (360 / count)) % 360;
  return raw < 0 ? raw + 360 : raw;
}

/**
 * Move the focus index by `delta` steps, wrapping around the circle. Always
 * returns an index in the range [0, count - 1]. Returns 0 when `count` is not
 * positive so an empty selector is safe.
 */
export function radialStep(focusIndex: number, delta: number, count: number): number {
  if (count <= 0) return 0;
  const next = (focusIndex + delta) % count;
  // `% ` can yield -0 for negative multiples; normalize to a positive index.
  return next < 0 ? next + count : next + 0;
}
