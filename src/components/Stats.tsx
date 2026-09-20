import { Award, BookOpen, TrendingUp, Users } from "lucide-react";
import type { SiteSettings } from "@/lib/data/types";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/interactive/Counter";

export default function Stats({ settings }: { settings: SiteSettings }) {
  const stats = [
    { icon: Users, value: settings.stats.studentsTrained, label: "Students Trained" },
    { icon: BookOpen, value: settings.stats.coursesOffered, label: "Courses Offered" },
    { icon: Award, value: settings.stats.yearsExperience, label: "Years of Excellence" },
    { icon: TrendingUp, value: settings.stats.placementRate, label: "Placement Rate" },
  ];

  return (
    <section className="bg-mist py-14 border-y border-ink/[0.04]">
      <div className="section">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.label} delay={i * 0.06}>
                <div className="bg-white rounded-2xl p-6 text-center border border-ink/[0.05]">
                  <div className="inline-flex p-3 rounded-xl mb-3 bg-accent/10 text-accent">
                    <Icon size={22} />
                  </div>
                  <Counter
                    value={s.value}
                    className="text-3xl font-semibold text-ink mb-1 tracking-tight block"
                  />
                  <div className="text-sm text-ink/50">{s.label}</div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
