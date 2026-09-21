/**
 * Pure helpers for the "Have a question?" enquiry form. Kept framework-free so
 * they can be unit-tested in isolation. Behavior mirrors the reference design:
 * validate name/phone/email, then build a mailto: link with details prefilled.
 */

export interface EnquiryInput {
  name: string;
  phone: string;
  email: string;
  course: string;
  branch: string;
  message: string;
}

export const BRANCH_OPTIONS = [
  "Main Branch — Andheri",
  "City Branch — Dadar",
  "No preference",
] as const;

/**
 * Indian mobile: an optional +91 / 0091 / 0 prefix followed by a 10-digit
 * number starting 6-9. Spaces and dashes are ignored.
 */
export function isValidIndianPhone(raw: string): boolean {
  const digits = raw.replace(/[\s-]/g, "").replace(/^(?:\+91|0091|0)/, "");
  return /^[6-9]\d{9}$/.test(digits);
}

export function isValidEmail(raw: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw.trim());
}

export type EnquiryErrors = Partial<Record<"name" | "phone" | "email", string>>;

/** Returns a map of field -> error message. Empty object means valid. */
export function validateEnquiry(input: EnquiryInput): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (input.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!input.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!isValidIndianPhone(input.phone)) {
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  }
  if (!input.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!isValidEmail(input.email)) {
    errors.email = "Enter a valid email address.";
  }
  return errors;
}

export function isEnquiryValid(input: EnquiryInput): boolean {
  return Object.keys(validateEnquiry(input)).length === 0;
}

/** Build the mailto: href with subject and body prefilled from the enquiry. */
export function buildMailto(to: string, input: EnquiryInput): string {
  const subject = `Course enquiry — ${input.course || "General"}`;
  const body = [
    `Name: ${input.name.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Email: ${input.email.trim()}`,
    `Course: ${input.course || "-"}`,
    `Preferred branch: ${input.branch || "-"}`,
    "",
    "Message:",
    input.message.trim() || "-",
  ].join("\n");
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
