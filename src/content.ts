// Copy and image order from https://wilsonandco.es/ (Oct 2026).
// The hero is the oldest photograph (Wandsworth, 2020). The project strip
// follows the homepage: oldest work first, newest last. Gallery files are
// listed in the order the live project pages show them, so the first
// picture in each gallery is the one the site leads with.
// Most files are not bundled yet — Img shows a placeholder until they are
// added to public/ (see scripts/fetch-images.sh).

export const company = {
  name: 'Wilson & Co',
  mark: 'WILSON & CO.',
  city: 'Barcelona',
  instagram: 'https://www.instagram.com/wilson.andco/',
  whatsapp: 'https://wa.me/34662395047',
};

export const hero = {
  kicker: 'Renovation & installation studio',
  heading:
    'Wilson & Co is a design-led studio for interiors, renovations and installations in Barcelona and the surrounding areas. We work with local materials wherever we can and take care of every detail, so you can focus on what really matters.',
};

export type HeroSlide = {
  image: string;
  alt: string;
  caption: string;
  /** Point of the photo to keep in view, as a CSS position. */
  focus: string;
  /** Starting zoom. Above 1 crops in on the focus point. */
  zoom: number;
};

// Three slides that move on their own. Until more photographs are ready,
// all three use the Wandsworth house, framed on different parts of it.
export const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero-wandsworth.jpg',
    alt: 'Classical Beauty: the renovated house in Wandsworth at dusk, seen from the garden',
    caption: 'Classical Beauty, Wandsworth',
    focus: '50% 60%',
    zoom: 1,
  },
  {
    image: '/images/hero-wandsworth.jpg',
    alt: 'The glazed living room of the Wandsworth house, lit at dusk',
    caption: 'Classical Beauty, the living room',
    focus: '50% 66%',
    zoom: 1.45,
  },
  {
    image: '/images/hero-wandsworth.jpg',
    alt: 'The garden path and planting of the Wandsworth house',
    caption: 'Classical Beauty, the garden',
    focus: '62% 88%',
    zoom: 1.3,
  },
];

export const film = {
  src: '/videos/WilsonandCo_Video_1080_HR.mp4',
  poster: '/images/Video_WilsonAndCo_Poster.png',
  label: 'Wilson & Co film',
};

export type Service = { title: string; text: string; more: string };

export const services: Service[] = [
  {
    title: 'Interior Design',
    text: 'Spaces planned around the way you live, with local materials and makers.',
    more: 'Read more',
  },
  {
    title: 'Renovations',
    text: 'Rethinking a space or your whole home, with one team throughout.',
    more: 'read more',
  },
  {
    title: 'Electrical & solar',
    text: 'From maintenance and new installations to full rewiring, fuse board upgrades, solar panels and EV chargers.',
    more: 'read more',
  },
  {
    title: 'Plumbing, heating & AC',
    text: 'Your bathroom, kitchen, underfloor heating and climate systems, installed to last.',
    more: 'read more',
  },
  {
    title: 'Home Automation',
    text: 'Simple control of your lighting, heating, blinds, security and entertainment.',
    more: 'read more',
  },
];

export type Project = {
  slug: string;
  title: string;
  categories: string[];
  image: string;
  /** Gallery in on-site order. Index 0 is the picture the project page shows first. */
  images: string[];
};

const shot = (file: string) => `/images/gallery/${file}`;

export const projects: Project[] = [
  {
    slug: 'industrial-clapham',
    title: 'Industrial Clapham',
    categories: ['Automation', 'Electrical'],
    image: '/images/industrial-clapham.jpg',
    images: [1, 2, 3, 4, 5, 6].map((n) =>
      shot(`WilsonAndCo_Industrial_Clapham${n}${n >= 5 ? '-scaled' : ''}.jpg`),
    ),
  },
  {
    slug: 'clapham-south',
    title: 'Clapham South',
    categories: ['Automation', 'Electrical'],
    image: '/images/clapham-south.jpg',
    images: [1, 2, 3, 7, 5, 4, 6, 8, 9].map((n) => shot(`WilsonAndCo_Clapham_South${n}.jpg`)),
  },
  {
    slug: 'entertainment-heaven',
    title: 'Entertainment Heaven',
    categories: ['Automation', 'Electrical'],
    image: '/images/entertainment-heaven.jpg',
    images: [
      ...[1, 2, 3, 4, 5, 6].map((n) => shot(`WilsonAndCo_Entertaining_Heaven${n}-scaled.jpg`)),
      ...[7, 8, 9, 10, 11, 12].map((n) => shot(`WilsonAndCo_Entertaining_Heaven${n}.jpg`)),
    ],
  },
  {
    slug: 'classical-beauty',
    title: 'Classical Beauty',
    categories: ['Electrical'],
    image: '/images/classical-beauty.jpg',
    images: [1, 2, 3, 4, 5, 6, 7, 9, 8].map((n) => shot(`WilsonAndCo_ClassicalBeauty${n}.jpg`)),
  },
  {
    slug: 'coastal-solar-panels',
    title: 'Coastal Solar Panels',
    categories: ['Electrical', 'Solar'],
    image: '/images/coastal-solar.jpg',
    images: [1, 2, 3, 6, 5, 4].map((n) => shot(`Solar_${n}.jpg`)),
  },
  {
    slug: 'eixample-bathroom',
    title: 'Eixample Bathroom',
    categories: ['Electrical', 'Interior design', 'Plumbing'],
    image: '/images/eixample-bathroom.jpg',
    images: [2, 3, 1, 6, 5, 4, 7, 8].map((n) => shot(`bathroom_wco_${n}-scaled.jpg`)),
  },
  {
    slug: 'japandi-style-in-clot',
    title: 'Japandi Style in Clot',
    categories: ['Electrical', 'Interior design'],
    image: '/images/japandi-clot.jpg',
    images: [2, 4, 16, 3, 7, 5, 8, 10, 17, 13, 14].map((n) => shot(`clot_wilsonandco_${n}-scaled.jpg`)),
  },
  {
    slug: 'warm-minimalism-in-sant-antoni',
    title: 'Warm Minimalism in Sant Antoni',
    categories: ['Air Conditioning', 'Automation', 'Electrical', 'Interior design', 'Plumbing'],
    image: '/images/warm-minimalism.jpg',
    images: [8, 7, 4, 3, 2, 5, 10, 6, 9, 11, 12, 1, 13].map((n) => shot(`romo_wilsonco_${n}-scaled.jpg`)),
  },
];

export type Testimonial = { quote: string; name: string; place: string; lang: 'en' | 'es' };

export const testimonials: Testimonial[] = [
  {
    lang: 'es',
    quote:
      'No nos creemos la suerte que hemos tenido de encontrar a Mónica y a Rohan. Nuestra casa ha sido un antes y un después desde que los contratamos. Su profesionalidad, su ojo para el diseño y la calidad de su trabajo se aprecian en cada rincón en el que han intervenido. Han transformado un espacio frío, con luces de hospital, en un hogar luminoso, acogedor y lleno de encanto.',
    name: 'Rebeca Calvo',
    place: 'Barcelona',
  },
  {
    lang: 'en',
    quote:
      'Monica and Rohan took the stress out of refurbishing our home and delivered a fantastic result! From start to finish, they guided us through both the aesthetic and technical aspects. They quickly resolved every issue we encountered, either themselves or through their excellent network of professionals. The price was very competitive, and they actually saved us money by helping identify problems early on. I’d recommend them to anyone in a heartbeat!',
    name: 'Rory Campbell',
    place: 'Barcelona',
  },
  {
    lang: 'en',
    quote:
      'Our experience with Rohan at Wilson & Co was very positive. He quickly resolved major electrical issues in our older home, coordinated well with other contractors, and handled our many changes professionally. He also installed a powerful, efficient solar system and took care of all the paperwork. In under two years, it’s already cut our bill significantly. Rohan met every challenge—our home is now fossil fuel free and safely wired. Him being a native English speaker was a big plus.',
    name: 'Ron H',
    place: 'Sant Feliu de Guixols',
  },
  {
    lang: 'es',
    quote:
      'La empresa Wilson Electrics (ahora Wilson & Co) realizó la instalación de los puntos de recarga para vehículos en el parking de nuestra finca. Hicieron un trabajo impecable, sin causar las molestias habituales de este tipo de instalaciones. Rohan Wilson lo hizo todo muy fácil, limpio y silencioso. No tenemos ninguna duda de que volveríamos a confiar en él.',
    name: 'Ramón',
    place: 'Barcelona',
  },
  {
    lang: 'en',
    quote:
      'I have used Wilson and Co on several occasions for electrical work and home automation in our home in Barcelona, and I couldn’t be happier with the results. Rohan Wilson is professional, efficient, and understood the smart home system to perfection. From upgrading my wiring to setting up automated devices for lighting, curtains and climate control, everything was done seamlessly. Highly recommend for anyone looking for reliable electrical services in Barcelona!',
    name: 'Simon Cariss',
    place: 'Barcelona',
  },
  {
    lang: 'en',
    quote:
      'Rohan and his team installed a total of 6kW solar panels on my house roof plus the 3-phase electrical installation that goes with it. The work was done quick, flawless and the treat with him was hassle-free, friendly and to the point. I would recommend working with him at Wilson & Co.',
    name: 'Martin Tromp',
    place: 'Castelldefels',
  },
  {
    lang: 'en',
    quote:
      'I would highly recommend Rohan Wilson for any electrical job, big or small. We had a full kitchen refurb done and Rohan advised on and implemented all wiring, underfloor heating and lighting. He is extremely professional, courteous and helpful. Cost was always competitive.',
    name: 'Roseanne Taylor',
    place: 'London',
  },
];

export const ethos = {
  heading: "Let's make something beautiful together.",
  text: "We keep what's worth keeping and restore it where we can. When something new is needed, we choose local materials and makers, and things that can be repaired rather than replaced. Less waste, less transport, and a home that ages well.",
};

export const team = {
  heading: 'Team',
  intro:
    'Wilson & Co is a passion project founded by Rohan and Monica, driven by their commitment to creating spaces that are both functional and beautiful —while staying mindful of environmental responsibility.',
  members: [
    {
      name: 'Rohan Wilson',
      role: 'Co-founder',
      image: '/images/rohan-wilson.jpg',
      instagram: 'https://www.instagram.com/wilson.andco/',
      whatsapp: 'https://wa.me/34662395047',
      email: 'rohan@wilsonandco.es',
    },
    {
      name: 'Monica Howe Montesinos',
      role: 'Co-founder',
      image: '/images/monica-howe.jpg',
      instagram: 'https://www.instagram.com/wilson.andco/',
      email: 'monica@wilsonandco.es',
    },
  ],
};

export const contacts = [
  { name: 'Rohan Wilson', topic: 'Projects', email: 'rohan@wilsonandco.es' },
  { name: 'Monica Howe', topic: 'Innovation', email: 'monica@wilsonandco.es' },
  { name: 'General enquiries', topic: 'Anything else', email: 'hola@wilsonandco.es' },
];
