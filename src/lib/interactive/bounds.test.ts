import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { clampIndex } from "./bounds";

describe("clampIndex", () => {
  // **Feature: interactive-homepage, Property 6: Index clamping stays within bounds**
  // **Validates: Requirements 2.2, 6.1, 6.2, 2.3, 6.3, 3.5**
  it("stays within bounds for any index and length (including zero)", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: -1000, max: 1000 }),
        fc.nat({ max: 1000 }),
        (index, length) => {
          const result = clampIndex(index, length);
          if (length === 0) {
            expect(result).toBe(0);
          } else {
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(length - 1);
          }
        }
      ),
      { numRuns: 100 }
    );
  });

  it("handles boundary examples", () => {
    expect(clampIndex(-1, 5)).toBe(0);
    expect(clampIndex(5, 5)).toBe(4);
    expect(clampIndex(0, 5)).toBe(0);
    expect(clampIndex(3, 0)).toBe(0);
  });
});
