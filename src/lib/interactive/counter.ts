export interface ParsedStat {
  /** Numeric portion of the stat, 0 when the value contains no digits. */
  target: number;
  /** Characters that appear before the numeric portion (e.g. "$", "~"). */
  prefix: string;
  /** Characters that appear after the numeric portion (e.g. "+", "%"). */
  suffix: string;
  /** False when the value contains no digits at all. */
  hasNumber: boolean;
}

// Matches an optional leading run of non-digits, a run of digits (with optional
// decimal and grouping commas), then the rest as suffix.
const STAT_PATTERN = /^(\D*)([\d,]*\.?\d+)([\s\S]*)$/;

/**
 * Split a stat string such as "500+" into its numeric target and the
 * surrounding decorators. When the value has no digits it is returned whole as
 * the prefix with `hasNumber = false`.
 */
export function parseStatValue(value: string): ParsedStat {
  const match = STAT_PATTERN.exec(value);
  if (!match) {
    return { target: 0, prefix: value, suffix: "", hasNumber: false };
  }
  const [, prefix, numberText, suffix] = match;
  const target = Number(numberText.replace(/,/g, ""));
  if (Number.isNaN(target)) {
    return { target: 0, prefix: value, suffix: "", hasNumber: false };
  }
  return { target, prefix, suffix, hasNumber: true };
}

/**
 * Reassemble a displayed stat from a parsed value and the current animated
 * count. When the original value had no number, the prefix (the whole original
 * string) is returned unchanged.
 */
export function formatStat(parsed: ParsedStat, current: number): string {
  if (!parsed.hasNumber) {
    return parsed.prefix;
  }
  const rounded = Math.round(current);
  return `${parsed.prefix}${rounded}${parsed.suffix}`;
}
