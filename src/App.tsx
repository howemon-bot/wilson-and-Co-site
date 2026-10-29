import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Intro } from './components/Intro';
import { Film } from './components/Film';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { Testimonials } from './components/Testimonials';
import { Ethos } from './components/Ethos';
import { Team } from './components/Team';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <Film />
        <Services />
        <Projects />
        <Testimonials />
        <Ethos />
        <Team />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
