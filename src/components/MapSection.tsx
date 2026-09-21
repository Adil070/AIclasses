"use client";

import { useState } from "react";
import { ChevronDown, Clock, MapPin, Phone } from "lucide-react";
import type { Branch, SiteSettings } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";

/**
 * "Visit Us" section. When multiple branches exist, a dropdown switches the
 * address/phone/timings/map. With no CMS branches, it falls back to the single
 * location stored in site settings so existing sites keep working.
 */
export default function MapSection({
  settings,
  branches = [],
}: {
  settings: SiteSettings;
  branches?: Branch[];
}) {
  // Build the list of branches, falling back to settings as one implicit branch.
  const list: Branch[] =
    branches.length > 0
      ? branches
      : [
          {
            id: "default",
            name: settings.addressLines[1] ?? "Main Branch",
            addressLines: settings.addressLines,
            phone: settings.phone,
            timingsWeekday: settings.timingsWeekday,
            timingsSunday: settings.timingsSunday,
            mapEmbedUrl: settings.mapEmbedUrl,
            mapLinkUrl: settings.mapLinkUrl,
            order: 0,
            published: true,
          },
        ];

  const [active, setActive] = useState(0);
  const branch = list[active] ?? list[0];
  const hasMultiple = list.length > 1;

  return (
    <section id="location" className="section-y bg-mist">
      <div className="section">
        <Reveal className="text-center mb-16">
          <span className="eyebrow uppercase">Find Us</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-ink mt-3 mb-4 tracking-tight">
            Visit Our Institute
          </h2>
          <p className="text-ink/50 text-lg max-w-2xl mx-auto">
            Conveniently located — easy to reach by train and bus.
          </p>
        </Reveal>

        {hasMultiple && (
          <Reveal className="mb-8 flex justify-center">
            <div className="relative w-full max-w-xs">
              <label className="sr-only" htmlFor="branch-select">
                Choose a branch
              </label>
              <select
                id="branch-select"
                value={active}
                onChange={(e) => setActive(Number(e.target.value))}
                className="glass w-full appearance-none rounded-full bg-surface px-5 py-3 pr-11 text-sm font-medium text-ink border border-ink/10 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
              >
                {list.map((b, i) => (
                  <option key={b.id} value={i}>
                    {b.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink/40"
              />
            </div>
          </Reveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Reveal className="space-y-4">
            <div className="glass bg-surface rounded-2xl p-6 border border-ink/[0.05]">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 text-accent p-3 rounded-xl flex-shrink-0">
                  <MapPin size={19} />
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1 tracking-tight">Address</h4>
                  <p className="text-ink/50 text-sm leading-relaxed">
                    {branch.addressLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < branch.addressLines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass bg-surface rounded-2xl p-6 border border-ink/[0.05]">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 text-accent p-3 rounded-xl flex-shrink-0">
                  <Clock size={19} />
                </div>
                <div className="w-full">
                  <h4 className="font-semibold text-ink mb-2 tracking-tight">Timings</h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-ink/50">
                      <span>Mon – Sat</span>
                      <span className="font-medium text-ink/80">{branch.timingsWeekday}</span>
                    </div>
                    <div className="flex justify-between text-ink/50">
                      <span>Sunday</span>
                      <span className="font-medium text-ink/80">{branch.timingsSunday}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass bg-surface rounded-2xl p-6 border border-ink/[0.05]">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 text-accent p-3 rounded-xl flex-shrink-0">
                  <Phone size={19} />
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1 tracking-tight">Call Us</h4>
                  <a
                    href={`tel:${branch.phone.replace(/\s+/g, "")}`}
                    className="text-accent hover:underline text-sm font-medium"
                  >
                    {branch.phone}
                  </a>
                  <p className="text-ink/40 text-xs mt-0.5">Available during institute hours</p>
                </div>
              </div>
            </div>

            <a
              href={branch.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-accent-dark text-white font-medium py-3.5 rounded-full transition-all duration-200"
            >
              <MapPin size={16} /> Get Directions on Google Maps
            </a>
          </Reveal>

          <Reveal
            delay={0.1}
            className="lg:col-span-2 rounded-2xl overflow-hidden border border-ink/[0.06]"
          >
            <iframe
              key={branch.id}
              src={branch.mapEmbedUrl}
              width="100%"
              height="480"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${branch.name} — Location`}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
