import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Film } from './components/Film';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';
import { Opening } from './components/Opening';
import { CursorDot } from './components/CursorDot';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Film />
        <Services />
        <Projects />
        <Team />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      <Opening />
      <CursorDot />
    </>
  );
}
