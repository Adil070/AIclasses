import { MapPin, Sparkles, Bell } from "lucide-react";

export default function KurlaPromo() {
  return (
    <section className="relative py-10 overflow-hidden bg-gradient-to-r from-orange-500 via-orange-600 to-amber-500">
      {/* Dot pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="dots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="2" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-white text-center md:text-left">
          {/* Icon + headline */}
          <div className="flex items-center gap-5">
            <div className="hidden sm:flex bg-white/20 rounded-2xl p-3">
              <Sparkles size={30} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start mb-1">
                <Bell size={14} className="animate-bounce" />
                <span className="text-xs font-bold uppercase tracking-widest opacity-90">
                  Exciting Announcement
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading leading-tight">
                Coming Soon to{" "}
                <span className="underline decoration-white/60 underline-offset-4">Kurla!</span>
              </h3>
            </div>
          </div>

          {/* Message */}
          <p className="text-white/90 max-w-sm leading-relaxed text-sm md:text-base">
            We&apos;re expanding! AI Computer Institute is opening a brand‑new branch in{" "}
            <strong>Kurla, Mumbai</strong>. Stay tuned for our launch and early‑bird enrollment offers.
          </p>

          {/* Badge */}
          <div className="flex-shrink-0">
            <div className="inline-flex items-center gap-2 bg-white text-orange-600 font-bold px-6 py-3 rounded-xl shadow-lg text-sm">
              <MapPin size={16} />
              Kurla · Opening Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
