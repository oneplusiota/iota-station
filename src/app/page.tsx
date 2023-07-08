import Image from "next/image";
import HeroSection from "../components/HeroSection";
import About from "../components/About";
import Projects from "../components/Projects";
import Skills from "../components/Skills";

export default function Home() {
  return (
    <>
      <section
        id="hero"
        className="dark:bg-gray-950 dark:text-white h-screen w-full"
      >
        <HeroSection />
      </section>
      <section
        id="about"
        className="dark:bg-gray-950 dark:text-white h-full w-full"
      >
        <About />
      </section>
      <section
        id="about"
        className="dark:bg-gray-950 dark:text-white h-full w-full"
      >
        <Skills />
      </section>
      <section
        id="projects"
        className="dark:bg-gray-950 dark:text-white h-full w-full"
      >
        <Projects />
      </section>
    </>
  );
}
