import Image from "next/image";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Projects from "../components/Projects";

export default function Home() {
  return (
    <>
      <section id="hero" className="dark:bg-gray-950 dark:text-white h-screen">
        <HeroSection />
      </section>
      <section id="about" className="dark:bg-gray-950 dark:text-white h-screen">
        <About />
      </section>
      <section
        id="projects"
        className="dark:bg-gray-950 dark:text-white h-screen"
      >
        <Projects />
      </section>
    </>
  );
}
