// Spanish version of the site text. Same structure as content.ts; anything not
// listed here (project names, testimonials, emails, photos) stays as it is.
// *word* is set in italics.

export const es = {
  meta: {
    title: 'Wilson & Co | Reformas, interiorismo e instalaciones en Barcelona',
    description:
      'Interiorismo, reformas e instalaciones con el diseño como punto de partida, en Barcelona y alrededores. Materiales locales, atención al detalle y un solo equipo de principio a fin.',
  },

  hero: {
    heading: 'Un estudio de diseño para interiorismo, reformas e instalaciones.',
    text: 'Trabajamos en *Barcelona* y alrededores con *materiales locales* y artesanos cualificados, y cuidamos cada detalle para que tú puedas centrarte en lo que *de verdad importa*.',
  },

  // In the same order as heroSlides in content.ts.
  heroSlides: [
    {
      alt: 'Belleza clásica: la casa reformada en Wandsworth al atardecer, vista desde el jardín',
      caption: 'Ampliación con jardín, Wandsworth',
    },
    {
      alt: 'El salón del piso japandi en el Clot: un sofá terracota, una mesa de centro de teca y una butaca de ratán bajo un lucernario',
      caption: 'Salón japandi, Clot',
    },
    {
      alt: 'La terraza del piso japandi en el Clot: sillas de ratán y una mesa de piedra bajo plantas trepadoras, vista a través de una puerta de vidrio con perfilería negra',
      caption: 'Patio interior, Barcelona',
    },
  ],

  film: { label: 'Vídeo de Wilson & Co' },

  services: {
    interiors: {
      title: 'Interiorismo',
      text: 'Espacios pensados para tu forma de vivir. Diseñamos la distribución, la carpintería, la iluminación y los acabados, trabajando con *materiales locales* y artesanos, y cuidamos cada detalle hasta el día en que entras a vivir.',
    },
    renovations: {
      title: 'Reformas',
      text: 'Desde una sola estancia hasta una *reforma integral*, repensamos un espacio o toda tu casa con un único equipo de principio a fin. Gestionamos la obra desde el primer boceto hasta el último detalle, para que tengas un solo interlocutor y nada quede pendiente.',
    },
    installations: {
      title: 'Instalaciones',
      text: 'Electricidad, desde el mantenimiento hasta una instalación nueva completa, fontanería, suelo radiante y aire acondicionado, placas solares y cargadores para vehículos eléctricos, y domótica sencilla para iluminación, calefacción, persianas y seguridad. Todo *discretamente integrado* e instalado para durar.',
    },
  },

  categories: {
    'Interior design': 'Interiorismo',
    'Full renovation': 'Reforma integral',
    Electrical: 'Electricidad',
    Plumbing: 'Fontanería',
    'Air conditioning': 'Climatización',
    Automation: 'Domótica',
  } as Record<string, string>,

  // Project names in Spanish, by slug; the rest keep their English name.
  titles: {
    'warm-minimalism-in-sant-antoni': 'Minimalismo cálido',
    'japandi-style-in-clot': 'Calma japandi',
    'sarria-kitchen': 'Rosa & Cuarzo',
    'classical-beauty': 'Belleza clásica',
  } as Record<string, string>,

  locations: {
    'South East London': 'Sudeste de Londres',
    'Wandsworth, London': 'Wandsworth, Londres',
  } as Record<string, string>,

  // Project page text, by slug.
  projects: {
    'warm-minimalism-in-sant-antoni':
      'El proyecto contempla la reforma integral de un piso de los años cincuenta en Sant Antoni. La distribución original se replantea, sobre todo en la zona de día, para abrir los espacios y adaptarlos a una forma de vivir más actual, en la que cocina, comedor y sala se entienden como un único ambiente.\n\nEl parquet original de espiga se conserva, se restaura y se trata, de manera que la vivienda mantiene parte de su historia. La madera actúa como hilo conductor de todo el proyecto, desde la carpintería a medida hasta los acabados, y aporta calidez y coherencia al conjunto. Las líneas limpias, los tonos suaves y los materiales naturales dan como resultado un espacio sereno y fácil de habitar.',
    'japandi-style-in-clot':
      'La casa, de tres plantas, se encuentra en el barrio del Clot. El interior se rediseña desde una mirada japandi, que combina la sencillez del diseño escandinavo con la calidez de la artesanía japonesa. Los materiales naturales, las líneas limpias y una paleta de tonos apagados se repiten en todas las estancias para dar continuidad al conjunto.\n\nLa terraza de la cubierta se incorpora como una extensión natural de la vivienda, aportando luz y una sensación de calma. La renovación completa de la instalación eléctrica queda integrada de forma discreta, de modo que la casa gana en confort sin perder su sencillez.',
    'eixample-bathroom':
      'El proyecto parte de un baño de dimensiones reducidas en un piso del Eixample. Se recupera la volta catalana original del techo, que devuelve altura y carácter al espacio, y se colocan baldosas Nolla en el pavimento, un material duradero cuyo dibujo geométrico dialoga con la arquitectura de la finca.\n\nEl encargo se centra en aprovechar al máximo cada centímetro. La distribución se estudia con detalle, el almacenaje se integra en el propio diseño y los materiales se eligen por su resistencia al uso diario. El resultado es un baño compacto, práctico y cuidado en sus acabados.',
    'sarria-kitchen':
      'El proyecto contempla la reforma integral de la cocina de una vivienda en Sarrià. El espacio se replantea a partir de la manera en que la familia cocina y se reúne, con un rincón de desayuno junto a la ventana y un almacenaje pensado para el uso diario.\n\nEl cuarzo blanco se prolonga desde la encimera hasta las paredes, mientras que los muebles de estilo shaker en gris suave aportan calma al conjunto. Un aparador con puertas de vidrio acanalado y luz cálida bajo los muebles altos da profundidad a la estancia. El pavimento de baldosa estampada y las paredes en tono rosa completan el espacio y le dan su carácter.',
    'classical-beauty':
      'Una casa de tres dormitorios se amplía hasta convertirse en una vivienda de cuatro plantas, con un sótano completo pensado como sala de estar y biblioteca. La iluminación, tanto interior como exterior, fue una de las prioridades del encargo, y se plantea de manera que quede integrada en la arquitectura sin restarle protagonismo.',
    'entertainment-heaven':
      'Reforma de una casa de cuatro plantas en el sudeste de Londres. El proyecto incluye el diseño y la instalación de todo el sistema eléctrico, el diseño de la zona de bar, la cobertura wifi en toda la vivienda y la integración del audio y el vídeo. También se ilumina la casa del árbol de los niños.',
  } as Record<string, string>,

  team: {
    heading: 'Equipo',
    intro:
      'Wilson & Co es un proyecto nacido de la pasión de Rohan y Monica por crear espacios funcionales y bonitos a la vez, hechos para durar y con materiales locales.',
    roles: { 'Rohan Wilson': 'Cofundador', 'Monica Howe Montesinos': 'Cofundadora' } as Record<string, string>,
  },

  // By email.
  contacts: {
    'monica@wilsonandco.es': { topic: 'Interiorismo e innovación' },
    'rohan@wilsonandco.es': { topic: 'Obra e instalaciones' },
    'hola@wilsonandco.es': { name: 'Consultas generales', topic: 'Cualquier otra consulta' },
  } as Record<string, { name?: string; topic: string }>,
};
