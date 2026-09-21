import {
  Banknote,
  BookOpen,
  CheckCircle,
  Clock,
  ShieldCheck,
  Sparkles,
  Trophy,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Feature, SiteSettings } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";
import BlobField from "@/components/interactive/BlobField";

const ICONS: Record<string, LucideIcon> = {
  Trophy,
  CheckCircle,
  Users,
  Clock,
  Banknote,
  BookOpen,
  Sparkles,
  ShieldCheck,
};

export default function WhyUs({
  settings,
  features,
}: {
  settings: SiteSettings;
  features: Feature[];
}) {
  return (
    <section id="why-us" className="relative overflow-hidden section-y bg-mist">
      <BlobField />
      <div className="relative z-10 section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal>
            <span className="eyebrow uppercase">Why Choose Us</span>
            <h2 className="text-4xl md:text-5xl font-semibold text-ink mt-3 mb-6 tracking-tight">
              The Smart Choice for Your Computer Education
            </h2>
            <p className="text-ink/50 text-lg mb-4 leading-relaxed">
              At {settings.instituteName}, we go beyond textbooks. Our students leave with
              real skills, confidence, and the support they need to succeed in
              today&apos;s digital world.
            </p>
            <p className="text-ink/50 mb-9 leading-relaxed">
              Whether you&apos;re a school student, homemaker, working professional or a
              job seeker — we have the right course and batch for you.
            </p>
            <a
              href="#courses"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent-dark text-white font-medium px-7 py-3.5 rounded-full transition-all duration-200"
            >
              View All Courses →
            </a>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => {
              const Icon = ICONS[f.icon] ?? Sparkles;
              return (
                <Reveal key={f.id} delay={i * 0.06}>
                  <div className="glass card-glow bg-mist rounded-2xl p-5 border border-ink/[0.05] h-full">
                    <div className="inline-flex p-3 rounded-xl mb-3 bg-accent/10 text-accent">
                      <Icon size={19} />
                    </div>
                    <h3 className="font-semibold text-ink mb-1.5 text-sm tracking-tight">
                      {f.title}
                    </h3>
                    <p className="text-ink/50 text-sm leading-relaxed">{f.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
