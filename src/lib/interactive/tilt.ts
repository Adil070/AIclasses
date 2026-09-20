export interface Tilt {
  rotateX: number;
  rotateY: number;
}

function clamp(value: number, max: number): number {
  if (value > max) return max;
  if (value < -max) return -max;
  return value + 0; // normalize -0 to +0
}

/**
 * Compute a card tilt from a pointer offset relative to the card center.
 * `offsetX` / `offsetY` are expected in the normalized range [-1, 1] but any
 * value is accepted and the result is clamped to +/- `maxDeg` on each axis.
 * Horizontal offset drives rotateY; vertical offset drives rotateX (inverted so
 * the top edge lifts toward the pointer). Zero offset yields zero rotation.
 */
export function computeTilt(offsetX: number, offsetY: number, maxDeg: number): Tilt {
  const max = Math.abs(maxDeg);
  return {
    rotateY: clamp(offsetX * max, max),
    rotateX: clamp(-offsetY * max, max),
  };
}
