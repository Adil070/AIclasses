const reviews = [
  {
    name: "Priya Sharma",
    course: "MS Office & Tally",
    rating: 5,
    review:
      "After completing the Tally course here, I got a job at a CA firm within 2 weeks! The faculty explains everything so clearly. Best decision I ever made.",
    avatar: "PS",
    avatarBg: "bg-blue-100 text-blue-700",
  },
  {
    name: "Ravi Kumar",
    course: "Web Design",
    rating: 5,
    review:
      "Amazing institute! I came with zero knowledge and now I build websites for clients. The practical approach really works. Highly recommended to everyone!",
    avatar: "RK",
    avatarBg: "bg-orange-100 text-orange-700",
  },
  {
    name: "Anjali Patil",
    course: "Graphic Design",
    rating: 5,
    review:
      "The Photoshop and CorelDraw training was excellent. My portfolio has impressed multiple employers. Thank you AI Computer Institute for changing my life!",
    avatar: "AP",
    avatarBg: "bg-purple-100 text-purple-700",
  },
  {
    name: "Mohammed Shaikh",
    course: "Python Programming",
    rating: 5,
    review:
      "I was scared of coding but the teachers made Python so simple and fun. Now I'm working on my own project. Great environment and teaching style throughout.",
    avatar: "MS",
    avatarBg: "bg-green-100 text-green-700",
  },
  {
    name: "Sunita Gaikwad",
    course: "Computer Basics",
    rating: 5,
    review:
      "As a homemaker learning computers for the first time, the staff was incredibly patient and supportive. I can now confidently use a computer for daily tasks.",
    avatar: "SG",
    avatarBg: "bg-pink-100 text-pink-700",
  },
  {
    name: "Deepak Nair",
    course: "Hardware & Networking",
    rating: 5,
    review:
      "Excellent hardware course with real equipment to practice on. Got placed at a service center in Chembur after completing. The fees were also very reasonable!",
    avatar: "DN",
    avatarBg: "bg-indigo-100 text-indigo-700",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="text-yellow-400 text-lg">
          ★
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4 font-heading">
            What Our Students Say
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Real stories from real students who transformed their careers at AI Computer Institute.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
            >
              <Stars count={r.rating} />
              <p className="text-slate-600 mt-4 mb-6 leading-relaxed text-sm">
                &ldquo;{r.review}&rdquo;
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${r.avatarBg}`}
                >
                  {r.avatar}
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{r.name}</div>
                  <div className="text-slate-400 text-xs">{r.course}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 bg-slate-50 border border-slate-200 rounded-2xl px-8 py-5">
            <div className="text-5xl font-bold text-slate-900 font-heading">4.9</div>
            <div>
              <div className="flex gap-0.5 text-yellow-400 text-2xl mb-1">★★★★★</div>
              <div className="text-slate-500 text-sm">Overall Rating · 150+ Reviews on Google</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
