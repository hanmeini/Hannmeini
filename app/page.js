import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import About from '@/components/About'
import Shots from '@/components/Shots';
import Tools from '@/components/Tools';
import Services from '@/components/Services';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Shots />
      <About />
      <Services/>
      <Tools />
      <Contact/>
    </>
  );
}
