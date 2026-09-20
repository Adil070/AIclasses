import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { stepForProgress } from "./progression";

describe("stepForProgress", () => {
  // **Feature: interactive-homepage, Property 4: Scroll progress maps to a valid bounded step**
  // **Validates: Requirements 5.1, 5.2**
  it("maps progress to a bounded step index", () => {
    fc.assert(
      fc.property(
        fc.double({ min: 0, max: 1, noNaN: true }),
        fc.integer({ min: 1, max: 100 }),
        (progress, stepCount) => {
          const step = stepForProgress(progress, stepCount);
          expect(step).toBeGreaterThanOrEqual(0);
          expect(step).toBeLessThanOrEqual(stepCount - 1);
          expect(step).toBe(Math.min(Math.floor(progress * stepCount), stepCount - 1));
        }
      ),
      { numRuns: 100 }
    );
  });

  it("maps endpoints to first and last step", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 100 }), (stepCount) => {
        expect(stepForProgress(0, stepCount)).toBe(0);
        expect(stepForProgress(1, stepCount)).toBe(stepCount - 1);
      }),
      { numRuns: 100 }
    );
  });

  it("is safe when step count is zero", () => {
    expect(stepForProgress(0.5, 0)).toBe(0);
  });
});
