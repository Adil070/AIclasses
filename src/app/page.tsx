import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Courses from "@/components/Courses";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import Banner from "@/components/Banner";
import MapSection from "@/components/MapSection";
import QuerySection from "@/components/QuerySection";
import Footer from "@/components/Footer";
import { CourseCarousel } from "@/components/interactive/CourseCarousel";
import { RadialSelector } from "@/components/interactive/RadialSelector";
import { ScrollProgression } from "@/components/interactive/ScrollProgression";
import { ProjectsGallery } from "@/components/interactive/ProjectsGallery";
import { PROGRESSION_STEPS, STUDENT_PROJECTS } from "@/lib/data/interactive-content";
import { getSiteSettings } from "@/lib/data/settings";
import { getBanners } from "@/lib/data/banners";
import { getCourses } from "@/lib/data/courses";
import { getFeatures } from "@/lib/data/features";
import { getTestimonials } from "@/lib/data/testimonials";

// Content is CMS-driven and edited from /admin; fetch per-request rather than
// baking Firestore reads into the production build (which has no credentials).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [settings, banners, courses, features, testimonials] = await Promise.all([
    getSiteSettings(),
    getBanners(),
    getCourses(),
    getFeatures(),
    getTestimonials(),
  ]);

  return (
    <main>
      <Navbar settings={settings} />
      <Hero settings={settings} courses={courses} />
      <Stats settings={settings} />
      <Courses courses={courses} />
      <div className="py-10 bg-white">
        <CourseCarousel courses={courses} />
      </div>
      <div className="py-10 bg-white">
        <RadialSelector courses={courses} />
      </div>
      <ScrollProgression steps={PROGRESSION_STEPS} />
      <ProjectsGallery projects={STUDENT_PROJECTS} />
      <WhyUs settings={settings} features={features} />
      <Testimonials testimonials={testimonials} />
      <Banner banners={banners} />
      <MapSection settings={settings} />
      <QuerySection />
      <Footer settings={settings} courses={courses} />
    </main>
  );
}
