import { Users, BookOpen, Award, TrendingUp } from "lucide-react";

const stats = [
  { icon: Users, value: "500+", label: "Students Trained", color: "text-blue-600", bg: "bg-blue-50" },
  { icon: BookOpen, value: "15+", label: "Courses Offered", color: "text-orange-500", bg: "bg-orange-50" },
  { icon: Award, value: "5+", label: "Years of Excellence", color: "text-green-600", bg: "bg-green-50" },
  { icon: TrendingUp, value: "95%", label: "Placement Rate", color: "text-purple-600", bg: "bg-purple-50" },
];

export default function Stats() {
  return (
    <section className="bg-slate-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow border border-slate-100"
              >
                <div className={`inline-flex p-3 rounded-xl mb-3 ${s.bg}`}>
                  <Icon size={24} className={s.color} />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-1 font-heading">{s.value}</div>
                <div className="text-sm text-slate-500">{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
