import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  isValidIndianPhone,
  isValidEmail,
  validateEnquiry,
  isEnquiryValid,
  buildMailto,
  type EnquiryInput,
} from "./enquiry";

const base: EnquiryInput = {
  name: "Asha",
  phone: "9876543210",
  email: "asha@example.com",
  course: "Python Programming",
  branch: "No preference",
  message: "",
};

describe("isValidIndianPhone", () => {
  it("accepts valid 10-digit numbers starting 6-9, with optional prefixes", () => {
    expect(isValidIndianPhone("9876543210")).toBe(true);
    expect(isValidIndianPhone("+91 98765 43210")).toBe(true);
    expect(isValidIndianPhone("+919876543210")).toBe(true);
    expect(isValidIndianPhone("0091-9876543210")).toBe(true);
    expect(isValidIndianPhone("09876543210")).toBe(true);
    expect(isValidIndianPhone("6000000000")).toBe(true);
  });

  it("rejects numbers with wrong length or leading digit", () => {
    expect(isValidIndianPhone("1234567890")).toBe(false); // starts with 1
    expect(isValidIndianPhone("987654321")).toBe(false); // 9 digits
    expect(isValidIndianPhone("98765432101")).toBe(false); // 11 digits
    expect(isValidIndianPhone("5876543210")).toBe(false); // starts with 5
    expect(isValidIndianPhone("")).toBe(false);
    expect(isValidIndianPhone("abcdefghij")).toBe(false);
  });

  // Property: any 10-digit string with a 6-9 leading digit is valid, and stays
  // valid after adding a +91 prefix / spaces.
  it("is prefix- and whitespace-insensitive for valid numbers", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 6, max: 9 }),
        fc.array(fc.integer({ min: 0, max: 9 }), { minLength: 9, maxLength: 9 }),
        (lead, rest) => {
          const num = `${lead}${rest.join("")}`;
          expect(isValidIndianPhone(num)).toBe(true);
          expect(isValidIndianPhone(`+91${num}`)).toBe(true);
          expect(isValidIndianPhone(`+91 ${num}`)).toBe(true);
        }
      ),
      { numRuns: 100 }
    );
  });
});

describe("isValidEmail", () => {
  it("accepts typical emails and rejects malformed ones", () => {
    expect(isValidEmail("user@example.com")).toBe(true);
    expect(isValidEmail("a.b-c@sub.domain.in")).toBe(true);
    expect(isValidEmail("plainaddress")).toBe(false);
    expect(isValidEmail("no@domain")).toBe(false);
    expect(isValidEmail("@nolocal.com")).toBe(false);
    expect(isValidEmail("spaces in@email.com")).toBe(false);
    expect(isValidEmail("")).toBe(false);
  });
});

describe("validateEnquiry / isEnquiryValid", () => {
  it("passes a fully valid enquiry", () => {
    expect(validateEnquiry(base)).toEqual({});
    expect(isEnquiryValid(base)).toBe(true);
  });

  it("flags a short/empty name", () => {
    expect(validateEnquiry({ ...base, name: "" }).name).toBeDefined();
    expect(validateEnquiry({ ...base, name: "A" }).name).toBeDefined();
  });

  it("flags missing vs invalid phone with distinct messages", () => {
    expect(validateEnquiry({ ...base, phone: "" }).phone).toBe(
      "Please enter your phone number."
    );
    expect(validateEnquiry({ ...base, phone: "12345" }).phone).toBe(
      "Enter a valid 10-digit Indian mobile number."
    );
  });

  it("flags missing vs invalid email with distinct messages", () => {
    expect(validateEnquiry({ ...base, email: "" }).email).toBe(
      "Please enter your email."
    );
    expect(validateEnquiry({ ...base, email: "nope" }).email).toBe(
      "Enter a valid email address."
    );
  });

  it("message and course/branch are optional (do not block validity)", () => {
    expect(isEnquiryValid({ ...base, message: "", course: "", branch: "" })).toBe(true);
  });
});

describe("buildMailto", () => {
  it("targets the given address and encodes subject + body", () => {
    const href = buildMailto("info@school.in", base);
    expect(href.startsWith("mailto:info@school.in?")).toBe(true);
    expect(href).toContain(`subject=${encodeURIComponent("Course enquiry — Python Programming")}`);

    const bodyParam = new URL(href).searchParams.get("body") ?? "";
    expect(bodyParam).toContain("Name: Asha");
    expect(bodyParam).toContain("Phone: 9876543210");
    expect(bodyParam).toContain("Email: asha@example.com");
    expect(bodyParam).toContain("Course: Python Programming");
    expect(bodyParam).toContain("Preferred branch: No preference");
  });

  it("falls back to placeholders when optional fields are blank", () => {
    const href = buildMailto("x@y.com", {
      ...base,
      course: "",
      branch: "",
      message: "",
    });
    expect(href).toContain(`subject=${encodeURIComponent("Course enquiry — General")}`);
    const bodyParam = new URL(href).searchParams.get("body") ?? "";
    expect(bodyParam).toContain("Course: -");
    expect(bodyParam).toContain("Preferred branch: -");
    expect(bodyParam.trimEnd().endsWith("-")).toBe(true); // message placeholder
  });
});
