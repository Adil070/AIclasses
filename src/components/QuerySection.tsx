"use client";

import { useState, type FormEvent } from "react";
import { ChevronDown, Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import type { Branch, Course, SiteSettings } from "@/lib/data/types";
import {
  BRANCH_OPTIONS,
  buildMailto,
  validateEnquiry,
  type EnquiryErrors,
  type EnquiryInput,
} from "@/lib/enquiry";

const inputBase =
  "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-ink placeholder:text-ink/35 focus:outline-none focus:ring-1";
const ok = "border-ink/10 focus:border-accent focus:ring-accent";
const bad = "border-red-500 focus:border-red-500 focus:ring-red-500";

export default function QuerySection({
  settings,
  courses = [],
  branches = [],
}: {
  settings?: SiteSettings;
  courses?: Course[];
  branches?: Branch[];
}) {
  const [errors, setErrors] = useState<EnquiryErrors>({});

  // Prefer real CMS branch names; fall back to the generic options otherwise.
  const branchOptions =
    branches.length > 0 ? [...branches.map((b) => b.name), "No preference"] : [...BRANCH_OPTIONS];

  const to = settings?.email || "info@aicomputerinstitute.in";
  const phone = settings?.phone || "+91 90000 00001";
  const location = settings?.addressLines?.slice(1).join(", ") || "Govandi, Mumbai";

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const input: EnquiryInput = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      course: String(data.get("course") ?? ""),
      branch: String(data.get("branch") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const found = validateEnquiry(input);
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    // Match the reference: open the visitor's email app with details prefilled.
    window.location.href = buildMailto(to, input);
  }

  return (
    <section id="query" className="section-y bg-surface">
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
          {/* Left: heading + contact info */}
          <Reveal>
            <span className="eyebrow uppercase">Enquiry</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-ink mt-3 mb-4 tracking-tight">
              Have a question? Let&apos;s talk.
            </h2>
            <p className="text-ink/50 text-lg leading-relaxed max-w-md">
              Send us your details and we&apos;ll reply with course info, fees and batch
              timings.
            </p>

            <div className="mt-8 space-y-4 text-sm">
              <a
                href={`mailto:${to}`}
                className="flex items-center gap-3 text-ink/70 hover:text-ink transition-colors"
              >
                <Mail size={18} className="text-accent" />
                {to}
              </a>
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-3 text-ink/70 hover:text-ink transition-colors"
              >
                <Phone size={18} className="text-accent" />
                {phone}
              </a>
              <span className="flex items-center gap-3 text-ink/50">
                <MapPin size={18} className="text-accent" />
                {location}
              </span>
            </div>
          </Reveal>

          {/* Right: glass form card */}
          <Reveal delay={0.1}>
            <form
              onSubmit={handleSubmit}
              noValidate
              className="glass bg-mist rounded-3xl p-8 sm:p-10 border border-ink/[0.05] space-y-5"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1.5">
                    Full name
                  </label>
                  <input
                    name="name"
                    type="text"
                    placeholder="Your name"
                    aria-invalid={!!errors.name}
                    className={`${inputBase} ${errors.name ? bad : ok}`}
                  />
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1.5">Phone</label>
                  <input
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    placeholder="+91 "
                    aria-invalid={!!errors.phone}
                    className={`${inputBase} ${errors.phone ? bad : ok}`}
                  />
                  {errors.phone && (
                    <p className="mt-1.5 text-xs text-red-500">{errors.phone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1.5">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                  className={`${inputBase} ${errors.email ? bad : ok}`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1.5">
                    Course of interest
                  </label>
                  <div className="relative">
                    <select
                      name="course"
                      defaultValue=""
                      className={`${inputBase} ${ok} appearance-none pr-10`}
                    >
                      <option value="">Select a course</option>
                      {courses.map((c) => (
                        <option key={c.id} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1.5">
                    Preferred branch
                  </label>
                  <div className="relative">
                    <select
                      name="branch"
                      defaultValue={branchOptions[0]}
                      className={`${inputBase} ${ok} appearance-none pr-10`}
                    >
                      {branchOptions.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/40"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1.5">
                  Message (optional)
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Tell us what you'd like to know…"
                  className={`${inputBase} ${ok}`}
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-200"
              >
                Send enquiry
              </button>
              <p className="text-xs text-ink/40 text-center">
                Submitting opens your email app with the details filled in, ready to send.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
