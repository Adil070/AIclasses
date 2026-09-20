import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { computeTilt } from "./tilt";

describe("computeTilt", () => {
  // **Feature: interactive-homepage, Property 5: Tilt is clamped and directionally correct**
  // **Validates: Requirements 4.1, 4.2, 4.3**
  it("clamps to +/- maxDeg, matches offset direction, and is zero at center", () => {
    fc.assert(
      fc.property(
        // Include offsets outside the normalized [-1, 1] range.
        fc.double({ min: -5, max: 5, noNaN: true }),
        fc.double({ min: -5, max: 5, noNaN: true }),
        fc.double({ min: 1, max: 45, noNaN: true }),
        (offsetX, offsetY, maxDeg) => {
          const { rotateX, rotateY } = computeTilt(offsetX, offsetY, maxDeg);

          // Clamped to the max magnitude on each axis.
          expect(Math.abs(rotateY)).toBeLessThanOrEqual(maxDeg + 1e-9);
          expect(Math.abs(rotateX)).toBeLessThanOrEqual(maxDeg + 1e-9);

          // rotateY sign follows offsetX; rotateX sign follows -offsetY.
          // `+ 0` normalizes -0 so Object.is comparisons are stable.
          expect(Math.sign(rotateY) + 0).toBe(Math.sign(offsetX) + 0);
          expect(Math.sign(rotateX) + 0).toBe(Math.sign(-offsetY) + 0);
        }
      ),
      { numRuns: 100 }
    );
  });

  it("returns zero rotation at center", () => {
    expect(computeTilt(0, 0, 12)).toEqual({ rotateX: 0, rotateY: 0 });
  });
});
