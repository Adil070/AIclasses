import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { parseStatValue, formatStat } from "./counter";

// Prefix/suffix decorators that contain no digits, so they never bleed into the
// parsed number.
const noDigitString = fc
  .string({ maxLength: 4 })
  .map((s) => s.replace(/[\d,]/g, ""));

describe("parseStatValue / formatStat", () => {
  // **Feature: interactive-homepage, Property 1: Stat parse/format round-trip and pass-through**
  // **Validates: Requirements 1.1, 1.2, 1.3**
  it("round-trips numeric stats and passes through digit-free strings", () => {
    // Numeric stats: prefix + integer + suffix should rebuild exactly.
    fc.assert(
      fc.property(
        noDigitString,
        fc.nat({ max: 100000 }),
        noDigitString,
        (prefix, target, suffix) => {
          const value = `${prefix}${target}${suffix}`;
          const parsed = parseStatValue(value);
          expect(parsed.hasNumber).toBe(true);
          expect(parsed.target).toBe(target);
          expect(formatStat(parsed, parsed.target)).toBe(value);
        }
      ),
      { numRuns: 100 }
    );

    // Digit-free strings pass through unchanged regardless of the count.
    fc.assert(
      fc.property(noDigitString, fc.integer(), (value, current) => {
        const parsed = parseStatValue(value);
        expect(parsed.hasNumber).toBe(false);
        expect(formatStat(parsed, current)).toBe(value);
      }),
      { numRuns: 100 }
    );
  });
});

describe("parseStatValue / formatStat examples", () => {
  it("parses common stat formats", () => {
    expect(parseStatValue("500+")).toMatchObject({ target: 500, suffix: "+", hasNumber: true });
    expect(parseStatValue("95%")).toMatchObject({ target: 95, suffix: "%", hasNumber: true });
    expect(parseStatValue("15+")).toMatchObject({ target: 15, hasNumber: true });
  });

  it("passes through strings with no digits", () => {
    const parsed = parseStatValue("Coming soon");
    expect(parsed.hasNumber).toBe(false);
    expect(formatStat(parsed, 42)).toBe("Coming soon");
  });

  it("handles the empty string", () => {
    const parsed = parseStatValue("");
    expect(parsed.hasNumber).toBe(false);
    expect(formatStat(parsed, 0)).toBe("");
  });

  it("formats intermediate counts with decorators", () => {
    const parsed = parseStatValue("500+");
    expect(formatStat(parsed, 250)).toBe("250+");
  });
});
