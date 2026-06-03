import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Academic from "@/components/Academic";
import Timeline from "@/components/Timeline";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative w-full flex flex-col">
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Academic />
      <Timeline />
      <Contact />
      <Footer />
    </main>
  );
}
