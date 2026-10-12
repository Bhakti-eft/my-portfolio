import { MotionConfig } from 'framer-motion';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { SmoothScrollProvider } from '@/providers/SmoothScrollProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { IntroLoader } from '@/components/ui/IntroLoader';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { About, Contact, Education, Experience, Hero, Projects, Skills } from '@/sections';

export default function App() {
  return (
    // reducedMotion="user" makes every Framer Motion animation honour the OS setting.
    <MotionConfig reducedMotion="user">
      <ThemeProvider>
        <SmoothScrollProvider>
          <a
            href="#main"
            className="sr-only z-[100] rounded-full bg-accent px-4 py-2 font-medium text-on-accent focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
          >
            Skip to content
          </a>
          <IntroLoader />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main id="main">
            <Hero />
            <About />
            <Experience />
            <Projects />
            <Skills />
            <Education />
            <Contact />
          </main>
          <Footer />
        </SmoothScrollProvider>
      </ThemeProvider>
    </MotionConfig>
  );
}
