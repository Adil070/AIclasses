import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { angleForIndex, radialStep, angleBetween, stepsFromAngle } from "./radial";

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

describe("angleBetween", () => {
  it("returns 0 when a point is at the origin", () => {
    expect(angleBetween(0, 0, 1, 1)).toBe(0);
    expect(angleBetween(1, 1, 0, 0)).toBe(0);
  });

  it("measures a signed angle within (-180, 180]", () => {
    // From +x axis to +y axis is a quarter turn.
    expect(angleBetween(1, 0, 0, 1)).toBeCloseTo(90, 6);
    // From +x axis to -y axis is a quarter turn the other way.
    expect(angleBetween(1, 0, 0, -1)).toBeCloseTo(-90, 6);
    // Opposite direction normalizes to 180 (not -180).
    expect(angleBetween(1, 0, -1, 0)).toBeCloseTo(180, 6);
  });

  it("is always within (-180, 180] for any two non-origin points", () => {
    const nonZero = fc
      .tuple(fc.integer({ min: -50, max: 50 }), fc.integer({ min: -50, max: 50 }))
      .filter(([x, y]) => x !== 0 || y !== 0);
    fc.assert(
      fc.property(nonZero, nonZero, ([ax, ay], [bx, by]) => {
        const d = angleBetween(ax, ay, bx, by);
        expect(d).toBeGreaterThan(-180.0001);
        expect(d).toBeLessThanOrEqual(180.0001);
      }),
      { numRuns: 100 }
    );
  });
});

describe("stepsFromAngle", () => {
  it("is safe when count is zero", () => {
    expect(stepsFromAngle(123, 0)).toBe(0);
  });

  it("turns one detent per (360/count) degrees", () => {
    // 8 items -> 45 deg per step.
    expect(stepsFromAngle(45, 8)).toBe(1);
    expect(stepsFromAngle(90, 8)).toBe(2);
    expect(stepsFromAngle(-45, 8)).toBe(-1);
    // Rounds to the nearest detent.
    expect(stepsFromAngle(20, 8)).toBe(0);
    expect(stepsFromAngle(30, 8)).toBe(1);
  });
});
