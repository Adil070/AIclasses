import type { Testimonial } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";

const AVATAR_TONES = [
  "bg-blue-50 text-blue-700",
  "bg-purple-50 text-purple-700",
  "bg-green-50 text-green-700",
  "bg-orange-50 text-orange-700",
  "bg-pink-50 text-pink-700",
  "bg-indigo-50 text-indigo-700",
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-amber-400 text-lg">
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const average =
    testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : "5.0";

  return (
    <section id="reviews" className="section-y bg-white">
      <div className="section">
        <Reveal className="text-center mb-16">
          <span className="eyebrow uppercase">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-semibold text-ink mt-3 mb-4 tracking-tight">
            What Our Students Say
          </h2>
          <p className="text-ink/50 text-lg max-w-2xl mx-auto">
            Real stories from real students who transformed their careers with us.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((r, i) => (
            <Reveal key={r.id} delay={(i % 3) * 0.08}>
              <div className="bg-mist rounded-3xl p-6 border border-ink/[0.05] hover:-translate-y-1 transition-transform duration-300 h-full">
                <Stars count={r.rating} />
                <p className="text-ink/70 mt-4 mb-6 leading-relaxed text-sm">
                  &ldquo;{r.review}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-ink/[0.06]">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm ${AVATAR_TONES[i % AVATAR_TONES.length]}`}
                  >
                    {r.avatarInitials}
                  </div>
                  <div>
                    <div className="font-medium text-ink text-sm">{r.name}</div>
                    <div className="text-ink/40 text-xs">{r.course}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {testimonials.length > 0 && (
          <Reveal className="mt-14 text-center">
            <div className="inline-flex items-center gap-4 bg-mist border border-ink/[0.05] rounded-2xl px-8 py-5">
              <div className="text-5xl font-semibold text-ink tracking-tight">{average}</div>
              <div>
                <div className="flex gap-0.5 text-amber-400 text-2xl mb-1">★★★★★</div>
                <div className="text-ink/50 text-sm">
                  Overall Rating · {testimonials.length}+ Reviews
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
