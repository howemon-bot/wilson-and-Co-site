// What each project photo shows, for screen readers and Google Images (the
// photo's "alt" text). Keyed by file name without .jpg. Not shown on the page.

export const photoAlt: Record<string, { en: string; es: string }> = {
  // Warm Minimalism, Sant Antoni
  'sant-antoni-01_kitchen-and-dining': { en: 'Open kitchen and dining area', es: 'Cocina abierta y comedor' },
  'sant-antoni-02_galley-kitchen': { en: 'Galley kitchen', es: 'Cocina en paralelo' },
  'sant-antoni-03_curved-wall-and-shelves': { en: 'Curved wall with built-in shelves', es: 'Pared curva con estanterías integradas' },
  'sant-antoni-04_corridor': { en: 'Corridor', es: 'Pasillo' },
  'sant-antoni-05_bathroom': { en: 'Bathroom with terracotta tiles', es: 'Baño con azulejos en tono terracota' },
  'sant-antoni-06_shower-detail': { en: 'Shower with a lit niche', es: 'Ducha con hornacina iluminada' },
  'sant-antoni-07_green-bathroom': { en: 'Green-tiled bathroom', es: 'Baño con azulejos verdes' },
  'sant-antoni-08_bar-niche': { en: 'Built-in bar niche', es: 'Hornacina de bar integrada' },
  'sant-antoni-09_kids-room': { en: 'Children’s bedroom', es: 'Dormitorio infantil' },

  // Japandi Calm, Clot
  'clot-01_living-room': { en: 'Living room with a terracotta sofa and a rattan chair under a skylight', es: 'Salón con sofá terracota y butaca de ratán bajo un lucernario' },
  'clot-02_patio-through-steel-window': { en: 'The patio seen through a black steel window', es: 'El patio visto a través de una ventana de acero negro' },
  'clot-03_patio': { en: 'Patio with climbing plants', es: 'Patio con plantas trepadoras' },
  'clot-04_bar-room': { en: 'Bar room behind glazed steel doors', es: 'Zona de bar tras puertas acristaladas de acero' },
  'clot-05_green-tile-bar': { en: 'Bar with green tiles and lit wooden shelves', es: 'Barra con azulejos verdes y estantes de madera iluminados' },
  'clot-06_green-tile-detail': { en: 'Detail of the green tiles and brass shelf brackets', es: 'Detalle de los azulejos verdes y los soportes de latón' },
  'clot-07_open-plan-ground-floor': { en: 'Open-plan ground floor', es: 'Planta baja diáfana' },
  'clot-08_sideboard-and-mirror': { en: 'Wooden sideboard with an organic-shaped mirror', es: 'Aparador de madera con espejo de forma orgánica' },
  'clot-09_terrace-dining': { en: 'Rooftop terrace dining area under a pergola with jasmine', es: 'Comedor en la terraza de la cubierta, bajo una pérgola con jazmín' },
  'clot-10_terrace-lounge': { en: 'Rooftop terrace lounge', es: 'Zona de estar en la terraza de la cubierta' },
  'clot-11_facade': { en: 'Front of the house', es: 'Fachada de la casa' },

  // Volta & Nolla, Eixample
  'eixample-01_vaulted-bathroom': { en: 'Bathroom under the restored volta catalana ceiling', es: 'Baño bajo el techo de volta catalana recuperado' },
  'eixample-02_vanity-and-window': { en: 'Vanity unit by the window', es: 'Mueble de lavabo junto a la ventana' },
  'eixample-03_shower-wall': { en: 'Tiled shower wall', es: 'Pared de la ducha alicatada' },
  'eixample-04_shower-shelves': { en: 'Built-in shower shelves', es: 'Estantes integrados en la ducha' },
  'eixample-05_basin': { en: 'Basin and tap', es: 'Lavabo y grifo' },
  'eixample-06_tap-detail': { en: 'Detail of the tap', es: 'Detalle del grifo' },
  'eixample-07_floor-tiles': { en: 'Geometric Nolla floor tiles', es: 'Suelo geométrico de baldosas Nolla' },

  // Rose & Quartz, Sarrià
  'sarria-01_kitchen': { en: 'Kitchen with rose walls, white quartz and grey shaker cabinets', es: 'Cocina con paredes rosas, cuarzo blanco y muebles shaker grises' },
  'sarria-02_hob-and-oven-column': { en: 'Hob, extractor and oven column against a rose wall', es: 'Placa, campana y columna de hornos ante una pared rosa' },
  'sarria-03_sink-and-window': { en: 'Sink under the window', es: 'Fregadero bajo la ventana' },
  'sarria-04_sink-and-breakfast-nook': { en: 'Sink and breakfast corner by the window', es: 'Fregadero y rincón de desayuno junto a la ventana' },
  'sarria-05_glazed-dresser-and-arch': { en: 'Glazed dresser beside the arch', es: 'Aparador acristalado junto al arco' },
  'sarria-06_reeded-glass': { en: 'Detail of the reeded glass doors', es: 'Detalle de las puertas de vidrio acanalado' },
  'sarria-07_drawers-and-tiles': { en: 'Shaker drawers and the patterned floor tiles', es: 'Cajones shaker y el suelo de baldosas estampadas' },
  'sarria-08_brass-handle': { en: 'Detail of a brass handle', es: 'Detalle de un tirador de latón' },
  'sarria-09_floor-tiles': { en: 'Patterned floor tiles', es: 'Baldosas estampadas del suelo' },

  // Classical Beauty, Wandsworth
  'classical-01_garden-at-dusk': { en: 'The house from the garden at dusk', es: 'La casa vista desde el jardín al atardecer' },
  'classical-02_rear-extension': { en: 'Rear extension with large glazing', es: 'Ampliación trasera con grandes ventanales' },
  'classical-03_lightwell-glazing': { en: 'Glazed lightwell to the basement', es: 'Patio inglés acristalado hacia el sótano' },
  'classical-04_terrace-steps': { en: 'Steps up to the garden terrace', es: 'Escalones hacia la terraza del jardín' },
  'classical-05_library': { en: 'Basement library', es: 'Biblioteca en el sótano' },
  'classical-06_green-kitchen': { en: 'Green kitchen', es: 'Cocina verde' },
  'classical-07_kitchen-island': { en: 'Kitchen island', es: 'Isla de cocina' },

  // Entertainment Heaven, South East London
  'heaven-01_garden-facade': { en: 'Rear of the house from the garden', es: 'Fachada trasera vista desde el jardín' },
  'heaven-02_bar': { en: 'Bar with a green tiled front and velvet stools', es: 'Barra con frontal de azulejo verde y taburetes de terciopelo' },
  'heaven-03_bar-at-night': { en: 'The bar at night with a neon sign', es: 'La barra de noche con un rótulo de neón' },
  'heaven-04_kitchen-island': { en: 'Kitchen island with pendant lights', es: 'Isla de cocina con lámparas colgantes' },
  'heaven-05_kitchen-under-the-roof': { en: 'Kitchen under the pitched roof with skylights', es: 'Cocina bajo la cubierta inclinada con lucernarios' },
  'heaven-06_dining-room': { en: 'Dining room', es: 'Comedor' },
  'heaven-07_bathroom': { en: 'Bathroom with a freestanding bath', es: 'Baño con bañera exenta' },
  'heaven-08_bath-and-niches': { en: 'Bath with lit niches', es: 'Bañera con hornacinas iluminadas' },
  'heaven-09_hot-tub-terrace': { en: 'Hot tub terrace with string lights', es: 'Terraza con jacuzzi y guirnalda de luces' },
};

/** The description for a photo path, or undefined if there isn't one. */
export function altFor(src: string, lang: 'en' | 'es') {
  const key = src.split('/').pop()?.replace(/\.jpg$/, '') ?? '';
  return photoAlt[key]?.[lang];
}
