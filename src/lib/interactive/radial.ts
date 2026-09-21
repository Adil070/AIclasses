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

/**
 * Signed angle in degrees (-180, 180] from vector (fromX, fromY) to (toX, toY)
 * measured around the origin. Positive is counter-clockwise in screen space.
 * Returns 0 if either point is at the origin (no defined direction).
 */
export function angleBetween(
  fromX: number,
  fromY: number,
  toX: number,
  toY: number
): number {
  if ((fromX === 0 && fromY === 0) || (toX === 0 && toY === 0)) return 0;
  const a1 = Math.atan2(fromY, fromX);
  const a2 = Math.atan2(toY, toX);
  let diff = ((a2 - a1) * 180) / Math.PI;
  // Normalize into (-180, 180].
  while (diff <= -180) diff += 360;
  while (diff > 180) diff -= 360;
  return diff;
}

/**
 * Given an accumulated drag angle (degrees) and the item count, return how many
 * discrete steps the dial has turned. One step per (360 / count) degrees, like
 * the detents on a rotary phone dial. Returns 0 when `count` is not positive.
 */
export function stepsFromAngle(accumulatedDegrees: number, count: number): number {
  if (count <= 0) return 0;
  const per = 360 / count;
  return Math.round(accumulatedDegrees / per);
}
