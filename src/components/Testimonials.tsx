import type { Testimonial } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";
import TestimonialsList from "@/components/TestimonialsList";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const average =
    testimonials.length > 0
      ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : "5.0";

  return (
    <section id="reviews" className="section-y bg-surface">
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

        <TestimonialsList testimonials={testimonials} />

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
