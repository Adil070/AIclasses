"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

type Status = "idle" | "submitting" | "success" | "error";

export default function QuerySection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          contact: data.get("contact"),
          courseInterested: data.get("courseInterested"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="query" className="section-y bg-white">
      <div className="section max-w-3xl">
        <Reveal className="text-center mb-12">
          <span className="eyebrow uppercase">Get In Touch</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-ink mt-3 mb-4 tracking-tight">
            Have a Question?
          </h2>
          <p className="text-ink/50 text-lg">
            Send us your query and our team will get back to you shortly.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          {status === "success" ? (
            <div className="bg-mist rounded-3xl p-10 text-center border border-ink/[0.05]">
              <CheckCircle2 size={36} className="text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-ink mb-2 tracking-tight">
                Message sent
              </h3>
              <p className="text-ink/50">
                Thanks for reaching out — we&apos;ll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-accent hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-mist rounded-3xl p-8 sm:p-10 border border-ink/[0.05] space-y-5"
            >
              {/* Honeypot — hidden from real visitors, catches simple bots */}
              <input
                type="text"
                name="company"
                tabIndex={-1}
                autoComplete="off"
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1.5">Name</label>
                  <input
                    name="name"
                    required
                    className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-ink/70 mb-1.5">
                    Phone or Email
                  </label>
                  <input
                    name="contact"
                    required
                    className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1.5">
                  Course you&apos;re interested in (optional)
                </label>
                <input
                  name="courseInterested"
                  className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-ink/70 mb-1.5">Message</label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  className="w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink"
                />
              </div>

              {status === "error" && <p className="text-sm text-red-600">{errorMessage}</p>}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center gap-2 bg-ink hover:bg-black text-white font-medium px-7 py-3.5 rounded-full transition-all duration-200 disabled:opacity-50"
              >
                {status === "submitting" ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <Send size={16} />
                )}
                Send Message
              </button>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
