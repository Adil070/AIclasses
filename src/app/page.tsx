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
import { RadialSelector } from "@/components/interactive/RadialSelector";
import { ScrollProgression } from "@/components/interactive/ScrollProgression";
import { ProjectsGallery } from "@/components/interactive/ProjectsGallery";
import { getLearningSteps } from "@/lib/data/learning-steps";
import { getSiteSettings } from "@/lib/data/settings";
import { getBanners } from "@/lib/data/banners";
import { getCourses } from "@/lib/data/courses";
import { getFeatures } from "@/lib/data/features";
import { getTestimonials } from "@/lib/data/testimonials";
import { getStudentProjects } from "@/lib/data/student-projects";
import { getBranches } from "@/lib/data/branches";

// Content is CMS-driven and edited from /admin; fetch per-request rather than
// baking Firestore reads into the production build (which has no credentials).
export const dynamic = "force-dynamic";

export default async function Home() {
  const [
    settings,
    banners,
    courses,
    features,
    testimonials,
    studentProjects,
    branches,
    learningSteps,
  ] = await Promise.all([
    getSiteSettings(),
    getBanners(),
    getCourses(),
    getFeatures(),
    getTestimonials(),
    getStudentProjects(),
    getBranches(),
    getLearningSteps(),
  ]);

  return (
    <main>
      <Navbar settings={settings} />
      <Hero settings={settings} courses={courses} />
      <Stats settings={settings} />
      <Courses courses={courses} />
      <div className="py-10 bg-surface md:hidden">
        <RadialSelector courses={courses} />
      </div>
      <ScrollProgression steps={learningSteps} />
      <ProjectsGallery projects={studentProjects} />
      <WhyUs settings={settings} features={features} />
      <Testimonials testimonials={testimonials} />
      <Banner banners={banners} />
      <MapSection settings={settings} branches={branches} />
      <QuerySection settings={settings} courses={courses} branches={branches} />
      <Footer settings={settings} courses={courses} />
    </main>
  );
}
