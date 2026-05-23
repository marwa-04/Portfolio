import { useLenis } from "@/hooks/useLenis";
import { AmbientBackground } from "@/components/AmbientBackground";
import { Cursor } from "@/components/Cursor";
import { Loader } from "@/components/Loader";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Timeline } from "@/components/sections/Timeline";
import { Stats } from "@/components/sections/Stats";
import { TechStack } from "@/components/sections/TechStack";
import { Certifications } from "@/components/sections/Certifications";
import { Playground } from "@/components/sections/Playground";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";
import { GitHubProvider } from "@/context/GitHubContext";
import { profile } from "@/data/profile";

export default function App() {
  useLenis();

  return (
    <GitHubProvider username={profile.githubUser}>
      <Loader />
      <AmbientBackground />
      <Cursor />
      <Navbar />

      <main className="relative">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Timeline />
        <Stats />
        <TechStack />
        <Certifications />
        <Playground />
        <Contact />
      </main>

      <Footer />
    </GitHubProvider>
  );
}
