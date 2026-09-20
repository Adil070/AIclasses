import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { angleForIndex, radialStep } from "./radial";

const positiveCount = fc.integer({ min: 1, max: 500 });

describe("angleForIndex", () => {
  // **Feature: interactive-homepage, Property 2: Radial angles are evenly distributed**
  // **Validates: Requirements 3.1**
  it("places each item at an even interval within [0, 360)", () => {
    fc.assert(
      fc.property(positiveCount, (count) => {
        for (let index = 0; index < count; index++) {
          const angle = angleForIndex(index, count);
          expect(angle).toBeGreaterThanOrEqual(0);
          expect(angle).toBeLessThan(360);
          expect(angle).toBeCloseTo((index * (360 / count)) % 360, 6);
        }
      }),
      { numRuns: 100 }
    );
  });

  it("is safe when count is zero", () => {
    expect(angleForIndex(0, 0)).toBe(0);
  });
});

describe("radialStep", () => {
  // **Feature: interactive-homepage, Property 3: Radial step stays in range and wraps**
  // **Validates: Requirements 3.2, 3.3, 3.4**
  it("stays in range for any delta and reverses cleanly", () => {
    const countWithFocusAndDelta = positiveCount.chain((count) =>
      fc.tuple(
        fc.constant(count),
        fc.integer({ min: 0, max: count - 1 }),
        fc.integer({ min: -1000, max: 1000 })
      )
    );
    fc.assert(
      fc.property(countWithFocusAndDelta, ([count, focus, delta]) => {
        const next = radialStep(focus, delta, count);
        expect(next).toBeGreaterThanOrEqual(0);
        expect(next).toBeLessThanOrEqual(count - 1);
        // +1 then -1 returns to the original focus.
        expect(radialStep(radialStep(focus, 1, count), -1, count)).toBe(focus);
      }),
      { numRuns: 100 }
    );
  });

  it("is safe when count is zero", () => {
    expect(radialStep(0, 1, 0)).toBe(0);
  });

  it("wraps at boundaries for count 1", () => {
    expect(radialStep(0, 1, 1)).toBe(0);
    expect(radialStep(0, -1, 1)).toBe(0);
  });
});
