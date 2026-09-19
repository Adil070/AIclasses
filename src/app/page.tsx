import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Courses from "@/components/Courses";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import KurlaPromo from "@/components/KurlaPromo";
import MapSection from "@/components/MapSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Courses />
      <WhyUs />
      <Testimonials />
      <KurlaPromo />
      <MapSection />
      <Footer />
    </main>
  );
}
