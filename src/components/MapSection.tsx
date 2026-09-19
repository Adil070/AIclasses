import { Clock, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";

export default function MapSection({ settings }: { settings: SiteSettings }) {
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Reveal className="space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-ink/[0.05]">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 text-accent p-3 rounded-xl flex-shrink-0">
                  <MapPin size={19} />
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1 tracking-tight">Address</h4>
                  <p className="text-ink/50 text-sm leading-relaxed">
                    {settings.addressLines.map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < settings.addressLines.length - 1 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-ink/[0.05]">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 text-accent p-3 rounded-xl flex-shrink-0">
                  <Clock size={19} />
                </div>
                <div className="w-full">
                  <h4 className="font-semibold text-ink mb-2 tracking-tight">Timings</h4>
                  <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-ink/50">
                      <span>Mon – Sat</span>
                      <span className="font-medium text-ink/80">{settings.timingsWeekday}</span>
                    </div>
                    <div className="flex justify-between text-ink/50">
                      <span>Sunday</span>
                      <span className="font-medium text-ink/80">{settings.timingsSunday}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-ink/[0.05]">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 text-accent p-3 rounded-xl flex-shrink-0">
                  <Phone size={19} />
                </div>
                <div>
                  <h4 className="font-semibold text-ink mb-1 tracking-tight">Call Us</h4>
                  <a
                    href={`tel:${settings.phone.replace(/\s+/g, "")}`}
                    className="text-accent hover:underline text-sm font-medium"
                  >
                    {settings.phone}
                  </a>
                  <p className="text-ink/40 text-xs mt-0.5">Available during institute hours</p>
                </div>
              </div>
            </div>

            <a
              href={settings.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-ink hover:bg-black text-white font-medium py-3.5 rounded-full transition-all duration-200"
            >
              <MapPin size={16} /> Get Directions on Google Maps
            </a>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2 rounded-2xl overflow-hidden border border-ink/[0.06]">
            <iframe
              src={settings.mapEmbedUrl}
              width="100%"
              height="480"
              style={{ border: 0, display: "block" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${settings.instituteName} — Location`}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
