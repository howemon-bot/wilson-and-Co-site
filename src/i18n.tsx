import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import * as en from './content';
import { es } from './content.es';

// English or Spanish. The choice comes from ?lang= in the address, then the
// visitor's last choice, then their browser (Spanish or Catalan → Spanish).
export type Lang = 'en' | 'es';
const KEY = 'wco-lang';

function startLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  const fromUrl = new URLSearchParams(window.location.search).get('lang');
  if (fromUrl === 'en' || fromUrl === 'es') return fromUrl;
  try {
    const saved = window.localStorage.getItem(KEY);
    if (saved === 'en' || saved === 'es') return saved;
  } catch {
    /* storage blocked: fall through */
  }
  const browser = (navigator.languages?.[0] ?? navigator.language ?? '').toLowerCase();
  return browser.startsWith('es') || browser.startsWith('ca') ? 'es' : 'en';
}

// Words used by the page itself (labels, buttons), in both languages.
const UI = {
  en: {
    nav: { projects: 'Projects', services: 'Services', contact: 'Contact' },
    interiorDesign: 'Interior design',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    mainNav: 'Main',
    language: 'Language',
    heroCarousel: 'Featured projects',
    servicesTitle: 'Services',
    projectsTitle: 'Featured projects',
    testimonialsTitle: 'Testimonials',
    contactTitle: 'Contact',
    openProject: (title: string) => `${title}, open project`,
    closeProject: 'Close project',
    workDone: 'Work done',
    design: 'Design',
    location: 'Location',
    status: 'Status',
    completed: 'Completed',
    picture: (title: string, n: number) => `${title}, picture ${n}`,
    moreProjects: 'More projects',
    previous: 'Previous',
    next: 'Next',
    portraitOf: (name: string) => `Portrait of ${name}`,
    emailTo: (name: string) => `Email ${name}`,
    prevTestimonial: 'Previous testimonial',
    nextTestimonial: 'Next testimonial',
    place: 'Barcelona, Spain',
    privacy: 'Privacy policy',
    privacyText: 'We use your name and email only to answer an enquiry. We don’t sell or share those details.',
    backToTop: 'Back to top',
    openingWords: ['Interiors.', 'Renovations.', 'Installations.'],
    skip: 'Skip',
  },
  es: {
    nav: { projects: 'Proyectos', services: 'Servicios', contact: 'Contacto' },
    interiorDesign: 'Interiorismo',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    mainNav: 'Principal',
    language: 'Idioma',
    heroCarousel: 'Proyectos destacados',
    servicesTitle: 'Servicios',
    projectsTitle: 'Proyectos destacados',
    testimonialsTitle: 'Testimonios',
    contactTitle: 'Contacto',
    openProject: (title: string) => `${title}, abrir proyecto`,
    closeProject: 'Cerrar proyecto',
    workDone: 'Trabajos realizados',
    design: 'Diseño',
    location: 'Ubicación',
    status: 'Estado',
    completed: 'Terminado',
    picture: (title: string, n: number) => `${title}, imagen ${n}`,
    moreProjects: 'Más proyectos',
    previous: 'Anterior',
    next: 'Siguiente',
    portraitOf: (name: string) => `Retrato de ${name}`,
    emailTo: (name: string) => `Escribir a ${name}`,
    prevTestimonial: 'Testimonio anterior',
    nextTestimonial: 'Testimonio siguiente',
    place: 'Barcelona, España',
    privacy: 'Política de privacidad',
    privacyText:
      'Solo usamos tu nombre y tu correo electrónico para responder a tu consulta. No vendemos ni compartimos esos datos.',
    backToTop: 'Volver arriba',
    openingWords: ['Interiorismo.', 'Reformas.', 'Instalaciones.'],
    skip: 'Saltar',
  },
};

// The site text in one language. Spanish takes content.ts and swaps in the
// words from content.es.ts; anything without a Spanish version stays as it is.
type Content = {
  hero: typeof en.hero;
  heroSlides: en.HeroSlide[];
  film: typeof en.film;
  services: en.Service[];
  projects: en.Project[];
  featuredProjects: en.Project[];
  team: typeof en.team;
  contacts: en.ContactPerson[];
};

function contentFor(lang: Lang): Content {
  if (lang === 'en') return en;
  const cat = (c: string) => es.categories[c] ?? c;
  const localise = (p: en.Project): en.Project => ({
    ...p,
    title: es.titles[p.slug] ?? p.title,
    categories: p.categories.map(cat),
    location: p.location && (es.locations[p.location] ?? p.location),
    text: es.projects[p.slug] ?? p.text,
  });
  return {
    hero: es.hero,
    heroSlides: en.heroSlides.map((s, i) => ({ ...s, ...es.heroSlides[i] })),
    film: { ...en.film, ...es.film },
    services: en.services.map((s) => ({ ...s, ...es.services[s.id] })),
    projects: en.projects.map(localise),
    featuredProjects: en.featuredProjects.map(localise),
    team: {
      ...en.team,
      heading: es.team.heading,
      intro: es.team.intro,
      members: en.team.members.map((m) => ({ ...m, role: es.team.roles[m.name] ?? m.role })),
    },
    contacts: en.contacts.map((c) => ({ ...c, ...es.contacts[c.email] })),
  };
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof UI)['en']; c: Content };
const LangContext = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(startLang);

  // Keep the page's language, title, description and address in step.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    const title = lang === 'es' ? es.meta.title : 'Wilson & Co | Renovations, interiors and installations in Barcelona';
    const description =
      lang === 'es'
        ? es.meta.description
        : 'Design-led interiors, renovations and installations in Barcelona and surroundings. Local materials, attention to detail, and one team from beginning to end.';
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    try {
      window.localStorage.setItem(KEY, lang);
    } catch {
      /* storage blocked: the choice lasts until the page closes */
    }
    const url = new URL(window.location.href);
    if (lang === 'es') url.searchParams.set('lang', 'es');
    else url.searchParams.delete('lang');
    if (url.href !== window.location.href) history.replaceState(history.state, '', url);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: UI[lang], c: contentFor(lang) }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang needs LangProvider');
  return ctx;
}
