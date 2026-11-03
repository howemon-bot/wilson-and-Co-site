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
  heading: 'A design-led studio for interiors, renovations and installations.',
  // *word* is set in italics.
  text: 'Working across *Barcelona* and the surrounding areas, we choose *local materials* and skilled makers, taking care of every detail so you can focus on what *really matters*.',
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

// Slides that move on their own, in this order. Add retouched project
// photographs here.
export const heroSlides: HeroSlide[] = [
  {
    image: '/images/hero-wandsworth.jpg',
    alt: 'Classical Beauty: the renovated house in Wandsworth at dusk, seen from the garden',
    caption: 'Garden Extension, Wandsworth',
    focus: '50% 60%',
    zoom: 1,
  },
  {
    image: '/images/hero-japandi-clot-living.jpg',
    alt: 'The living room of the Japandi apartment in Clot: a terracotta sofa, a teak coffee table and a rattan chair under a skylight',
    caption: 'Japandi Living Room, Clot',
    focus: '35% 62%', // more of the right wall, the rattan chair still whole
    zoom: 1,
  },
  {
    image: '/images/hero-japandi-clot-terrace.jpg',
    alt: 'The terrace of the Japandi apartment in Clot: rattan chairs and a stone table under climbing plants, seen through a black-framed glass door',
    caption: 'Indoor Courtyard, Barcelona',
    focus: '18% 100%', // slightly right; anchored low so the table shows more than the top
    zoom: 1.12,
  },
];

export const film = {
  // Silent 17s web cut of the brand film (re-edit pending).
  src: '/videos/wilson-and-co-film.mp4',
  poster: '/images/film-poster.jpg',
  label: 'Wilson & Co film',
};

export type Service = { title: string; text: string };

// Three rows after the film. *word* is set in italics.
export const services: Service[] = [
  {
    title: 'Interiors',
    text: 'Spaces planned around the way you live. We design the layout, joinery, lighting and finishes, working with *local materials* and makers wherever we can, and see every detail through to the day you move in.',
  },
  {
    title: 'Renovations',
    text: 'From a single room to a full *reforma*, we rethink a space or your whole home with one team throughout. We manage the work from the first sketch to the final detail, so you have one point of contact and no loose ends.',
  },
  {
    title: 'Installations',
    text: 'Electrical work from maintenance to full rewiring, plumbing, underfloor heating and air conditioning, solar panels and EV chargers, and simple home automation for lighting, heating, blinds and security. All *quietly built in*, and installed to last.',
  },
];

export type Project = {
  slug: string;
  title: string;
  categories: string[];
  /** Picture numbers (1 = first) shown larger, on a row of their own. Default: [1]. */
  featured?: number[];
  /** Neighbourhood and city, shown on the project page. */
  location?: string;
  /** A few sentences for the project page, from the current site. Blank lines split paragraphs. */
  text?: string;
  image: string;
  /** Gallery in on-site order. Index 0 is the picture the project page shows first. */
  images: string[];
};

const shot = (file: string) => `/images/gallery/${file}`;

// Every project, in the order they appear on the site.
export const allProjects: Project[] = [
  {
    slug: 'warm-minimalism-in-sant-antoni',
    title: 'Warm Minimalism in Sant Antoni',
    categories: ['Air Conditioning', 'Automation', 'Electrical', 'Interior design', 'Plumbing'],
    text: "A full renovation of a 1950s apartment in Sant Antoni. We reworked the layout, especially in the living area, to make it more open and better suited to the way people live today.\n\nThe original parquet floor was kept, restored and treated, so the home holds on to its history. Wood runs through the whole project, from made-to-measure joinery to the finishes, keeping it warm and consistent. Clean lines, soft tones and natural materials make it calm and easy to live in.",
    location: 'Sant Antoni, Barcelona',
    image: '/images/warm-minimalism.jpg',
    // Retouched set (straightened, one white); see Drive: Wilson/WEB_site_2026.
    images: [
      '01_kitchen-and-dining', '02_galley-kitchen', '03_curved-wall-and-shelves', '04_corridor', '05_bathroom',
      '06_shower-detail', '07_green-bathroom', '08_bar-niche', '09_kids-room',
    ].map((n) => shot(`sant-antoni-${n}.jpg`)),
  },
  {
    slug: 'japandi-style-in-clot',
    title: 'Japandi Style in Clot',
    categories: ['Electrical', 'Interior design'],
    text: "A three-storey house in El Clot, redesigned with a Japandi-inspired interior: the simplicity of Scandinavian design with the warmth of Japanese craft. Natural materials, clean lines and soft, muted tones run through every room.\n\nThe rooftop terrace now works as part of the living space, bringing in light and a sense of calm. A complete electrical upgrade sits quietly behind it all, so the home feels modern without losing its simplicity.",
    location: 'Clot, Barcelona',
    image: '/images/hero-japandi-clot-living.jpg',
    // Retouched set (straightened, one white); see Drive: Reve&Rory/WEB_site_2026.
    images: [
      '01_living-room', '02_patio-through-steel-window', '03_patio', '04_bar-room', '05_green-tile-bar',
      '06_green-tile-detail', '07_open-plan-ground-floor', '08_sideboard-and-mirror', '09_terrace-dining',
      '10_terrace-lounge', '11_facade',
    ].map((n) => shot(`clot-${n}.jpg`)),
  },
  {
    slug: 'eixample-bathroom',
    title: 'Eixample Bathroom',
    categories: ['Electrical', 'Interior design', 'Plumbing'],
    text: "A small bathroom, completely rethought. We restored the original volta catalana ceiling, which brings back height and character, and laid Nolla tiles for a durable, geometric floor.\n\nThe brief was about making the most of the space: careful planning, built-in storage and materials chosen to last. The result is a compact bathroom that is practical day to day and beautifully finished.",
    location: 'Eixample, Barcelona',
    image: '/images/eixample-bathroom.jpg',
    // Retouched set (straight, one white); see Drive: *_Photography/Website_2026.
    images: ['01_vaulted-bathroom', '02_vanity-and-window', '03_shower-wall', '04_shower-shelves', '05_basin', '06_tap-detail', '07_floor-tiles'].map((n) => shot(`eixample-${n}.jpg`)),
  },
  {
    slug: 'classical-beauty',
    title: 'Classical Beauty',
    categories: ['Electrical'],
    text: "A three-bedroom house extended into a four-storey home, with a full basement designed as an entertainment room and library. Lighting was central to the brief, inside and out, and everything had to be integrated cleanly into the architecture.",
    location: 'Wandsworth, London',
    image: '/images/hero-wandsworth.jpg',
    // Retouched set (straight, one white); see Drive: *_Photography/Website_2026.
    images: ['01_garden-at-dusk', '02_rear-extension', '03_lightwell-glazing', '04_terrace-steps', '05_library', '06_green-kitchen', '07_kitchen-island'].map((n) => shot(`classical-${n}.jpg`)),
  },
  {
    slug: 'industrial-clapham',
    title: 'Industrial Clapham',
    categories: ['Automation', 'Electrical'],
    text: "A two-bedroom house in the heart of Clapham, completely stripped back. We planned and installed all the automation and lighting to work with the architecture, giving the home a soft, warm feel.",
    location: 'Clapham, London',
    image: '/images/industrial-clapham.jpg',
    // Retouched set (straight, one white); see Drive: *_Photography/Website_2026.
    images: ['01_landing', '02_kitchen-and-garden', '03_kitchen-and-glass-bridge', '04_shower-room', '05_cloakroom'].map((n) => shot(`industrial-${n}.jpg`)),
  },
  {
    slug: 'coastal-solar-panels',
    title: 'Coastal Solar Panels',
    categories: ['Electrical', 'Solar'],
    location: "Castelldefels, Barcelona",
    text: "A 6kW solar system for a three-storey house in Castelldefels. We placed panels on both sides of the pitched roof to make the most of the sun throughout the day, ran the cabling neatly along the façade and connected it to a three-phase inverter. We also took care of all the paperwork and licensing for the client.",
    image: '/images/coastal-solar.jpg',
    // Retouched set (straight, one white); see Drive: *_Photography/Website_2026.
    images: ['01_roof-and-sea-view', '02_panels-towards-the-sea', '03_installing', '04_panels-and-skylights'].map((n) => shot(`solar-${n}.jpg`)),
  },
  {
    slug: 'entertainment-heaven',
    title: 'Entertainment Heaven',
    categories: ['Automation', 'Electrical'],
    location: "South East London",
    text: "A refurbishment of a four-storey house in south-east London. We designed and installed the full electrical system, along with wifi throughout and integrated audio and visual. The project even included a lit tree house for the children.",
    image: '/images/entertainment-heaven.jpg',
    // Retouched set (straight, one white); see Drive: *_Photography/Website_2026.
    images: ['01_garden-facade', '02_bar', '03_bar-at-night', '04_kitchen-island', '05_kitchen-under-the-roof', '06_dining-room', '07_bathroom', '08_bath-and-niches', '09_hot-tub-terrace'].map((n) => shot(`heaven-${n}.jpg`)),
  },
  {
    slug: 'clapham-south',
    title: 'Clapham South',
    categories: ['Automation', 'Electrical'],
    text: "A completely new electrical installation on the ground floor and basement. So the owners could keep living in the house, the three floors above were wired temporarily and later connected to the new consumer boards. Both lower floors have Rako home automation, with lighting scenes that change through the day.",
    location: 'Clapham South, London',
    image: '/images/clapham-south.jpg',
    // Retouched set (straight, one white); see Drive: *_Photography/Website_2026.
    images: ['01_kitchen-and-dining', '02_dining-room', '03_rear-extension', '04_garden-seating', '05_joinery-and-steel-door', '06_library'].map((n) => shot(`claphamsouth-${n}.jpg`)),
  },
  {
    slug: 'barnes',
    title: 'Barnes',
    categories: ['Automation', 'Electrical'],
    location: 'Barnes, London',
    text: "A two-storey house extended into a four-storey home, with a full basement and loft. The basement became a cinema room with a complete audio and visual setup. Strip lighting in the ceiling bulkhead and indirect lighting on the vertical garden give the space the modern feel the client was looking for.",
    // No photos yet.
    image: '',
    images: [],
  },
];

// Projects without photos stay off the site until they have some.
// Interior design always leads the list of work done.
const interiorsFirst = (c: string[]) => [...c.filter((x) => x === 'Interior design'), ...c.filter((x) => x !== 'Interior design')];
export const projects = allProjects
  .filter((p) => p.images.length > 0)
  .map((p) => ({ ...p, categories: interiorsFirst(p.categories) }));

// The six on the home page, in order. Swap Entertainment Heaven for Barnes once Barnes has photos.
const FEATURED = [
  'warm-minimalism-in-sant-antoni',
  'japandi-style-in-clot',
  'eixample-bathroom',
  'classical-beauty',
  'industrial-clapham',
  'entertainment-heaven',
];
export const featuredProjects = FEATURED.map((slug) => projects.find((p) => p.slug === slug)).filter(
  (p): p is Project => Boolean(p),
);

// highlight: one sentence copied word for word from the quote, shown large above it.
export type Testimonial = { quote: string; highlight: string; name: string; place: string; lang: 'en' | 'es' };

export const testimonials: Testimonial[] = [
  {
    lang: 'es',
    quote:
      'No nos creemos la suerte que hemos tenido de encontrar a Mónica y a Rohan. Nuestra casa ha sido un antes y un después desde que los contratamos. Su profesionalidad, su ojo para el diseño y la calidad de su trabajo se aprecian en cada rincón en el que han intervenido. Han transformado un espacio frío, con luces de hospital, en un hogar luminoso, acogedor y lleno de encanto.',
    highlight: 'Nuestra casa ha sido un antes y un después desde que los contratamos.',
    name: 'Rebeca Calvo',
    place: 'Barcelona',
  },
  {
    lang: 'en',
    quote:
      'Monica and Rohan took the stress out of refurbishing our home and delivered a fantastic result! From start to finish, they guided us through both the aesthetic and technical aspects. They quickly resolved every issue we encountered, either themselves or through their excellent network of professionals. The price was very competitive, and they actually saved us money by helping identify problems early on. I’d recommend them to anyone in a heartbeat!',
    highlight: 'I’d recommend them to anyone in a heartbeat!',
    name: 'Rory Campbell',
    place: 'Barcelona',
  },
  {
    lang: 'en',
    quote:
      'Our experience with Rohan at Wilson & Co was very positive. He quickly resolved major electrical issues in our older home, coordinated well with other contractors, and handled our many changes professionally. He also installed a powerful, efficient solar system and took care of all the paperwork. In under two years, it’s already cut our bill significantly. Rohan met every challenge—our home is now fossil fuel free and safely wired. Him being a native English speaker was a big plus.',
    highlight: 'Rohan met every challenge—our home is now fossil fuel free and safely wired.',
    name: 'Ron H',
    place: 'Sant Feliu de Guixols',
  },
  {
    lang: 'es',
    quote:
      'La empresa Wilson Electrics (ahora Wilson & Co) realizó la instalación de los puntos de recarga para vehículos en el parking de nuestra finca. Hicieron un trabajo impecable, sin causar las molestias habituales de este tipo de instalaciones. Rohan Wilson lo hizo todo muy fácil, limpio y silencioso. No tenemos ninguna duda de que volveríamos a confiar en él.',
    highlight: 'Rohan Wilson lo hizo todo muy fácil, limpio y silencioso.',
    name: 'Ramón',
    place: 'Barcelona',
  },
  {
    lang: 'en',
    quote:
      'I have used Wilson and Co on several occasions for electrical work and home automation in our home in Barcelona, and I couldn’t be happier with the results. Rohan Wilson is professional, efficient, and understood the smart home system to perfection. From upgrading my wiring to setting up automated devices for lighting, curtains and climate control, everything was done seamlessly. Highly recommend for anyone looking for reliable electrical services in Barcelona!',
    highlight: 'I couldn’t be happier with the results.',
    name: 'Simon Cariss',
    place: 'Barcelona',
  },
  {
    lang: 'en',
    quote:
      'Rohan and his team installed a total of 6kW solar panels on my house roof plus the 3-phase electrical installation that goes with it. The work was done quick, flawless and the treat with him was hassle-free, friendly and to the point. I would recommend working with him at Wilson & Co.',
    highlight: 'The work was done quick, flawless and the treat with him was hassle-free, friendly and to the point.',
    name: 'Martin Tromp',
    place: 'Castelldefels',
  },
  {
    lang: 'en',
    quote:
      'I would highly recommend Rohan Wilson for any electrical job, big or small. We had a full kitchen refurb done and Rohan advised on and implemented all wiring, underfloor heating and lighting. He is extremely professional, courteous and helpful. Cost was always competitive.',
    highlight: 'He is extremely professional, courteous and helpful.',
    name: 'Roseanne Taylor',
    place: 'London',
  },
];

export const team = {
  heading: 'Team',
  intro:
    'Wilson & Co is a passion project founded by Rohan and Monica, driven by their commitment to creating spaces that are both functional and beautiful, built to last and made with local materials wherever we can.',
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
  { name: 'Monica Howe', topic: 'Interiors and innovation', email: 'monica@wilsonandco.es' },
  { name: 'Rohan Wilson', topic: 'Construction and installations', email: 'rohan@wilsonandco.es' },
  { name: 'General enquiries', topic: 'Anything else', email: 'hola@wilsonandco.es' },
];
