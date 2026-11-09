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
      alt: 'Classical Beauty: la casa reformada en Wandsworth al atardecer, vista desde el jardín',
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
    Solar: 'Energía solar',
  } as Record<string, string>,

  locations: {
    'South East London': 'Sureste de Londres',
    'Wandsworth, London': 'Wandsworth, Londres',
    'Clapham South, London': 'Clapham South, Londres',
    'Barnes, London': 'Barnes, Londres',
  } as Record<string, string>,

  // Project page text, by slug.
  projects: {
    'warm-minimalism-in-sant-antoni':
      'Reforma integral de un piso de los años cincuenta en Sant Antoni. Replanteamos la distribución, sobre todo en la zona de día, para hacerla más abierta y adaptada a la forma de vivir de hoy.\n\nEl parquet original se conservó, se restauró y se trató, para que la casa mantenga su historia. La madera recorre todo el proyecto, desde la carpintería a medida hasta los acabados, y le da calidez y coherencia. Líneas limpias, tonos suaves y materiales naturales hacen de ella una casa tranquila y fácil de vivir.',
    'japandi-style-in-clot':
      'Una casa de tres plantas en El Clot, rediseñada con un interiorismo de inspiración japandi: la sencillez del diseño escandinavo con la calidez de la artesanía japonesa. Materiales naturales, líneas limpias y tonos suaves y apagados recorren cada estancia.\n\nLa terraza de la cubierta funciona ahora como parte de la vivienda, y aporta luz y calma. Una renovación eléctrica completa queda discretamente detrás de todo, para que la casa resulte actual sin perder su sencillez.',
    'eixample-bathroom':
      'Un baño pequeño, completamente replanteado. Recuperamos el techo original de volta catalana, que devuelve altura y carácter al espacio, y colocamos baldosas Nolla para un suelo geométrico y duradero.\n\nEl encargo consistía en aprovechar al máximo el espacio: una planificación cuidadosa, almacenaje integrado y materiales elegidos para durar. El resultado es un baño compacto, práctico en el día a día y con unos acabados preciosos.',
    'sarria-kitchen':
      'Reforma integral de la zona de cocina de una vivienda en Sarrià. Rediseñamos el espacio en torno a la forma en que la familia cocina y se reúne, con un rincón para desayunar junto a la ventana y un almacenaje pensado para el día a día.\n\nEl cuarzo blanco sube desde la encimera por las paredes, los muebles shaker en gris suave aportan calma y un aparador acristalado con vidrio acanalado y luz cálida bajo los muebles da profundidad. Las baldosas estampadas del suelo y las *paredes rosas* dan carácter a la estancia.',
    'classical-beauty':
      'Una casa de tres dormitorios ampliada hasta convertirse en una vivienda de cuatro plantas, con un sótano completo diseñado como sala de ocio y biblioteca. La iluminación era clave en el encargo, dentro y fuera, y todo debía integrarse limpiamente en la arquitectura.',
    'coastal-solar-panels':
      'Una instalación solar de 6 kW para una casa de tres plantas en Castelldefels. Colocamos paneles en las dos vertientes del tejado para aprovechar el sol a lo largo del día, llevamos el cableado de forma ordenada por la fachada y lo conectamos a un inversor trifásico. También nos encargamos de todo el papeleo y las licencias para el cliente.',
    'entertainment-heaven':
      'Reforma de una casa de cuatro plantas en el sureste de Londres. Diseñamos e hicimos toda la instalación eléctrica, además del wifi en toda la casa y el audio y vídeo integrados. El proyecto incluyó incluso una casa en el árbol iluminada para los niños.',
    'clapham-south':
      'Una instalación eléctrica completamente nueva en la planta baja y el sótano. Para que los propietarios pudieran seguir viviendo en la casa, las tres plantas superiores se cablearon de forma provisional y después se conectaron a los nuevos cuadros eléctricos. Las dos plantas inferiores tienen domótica Rako, con escenas de iluminación que cambian a lo largo del día.',
    barnes:
      'Una casa de dos plantas ampliada hasta convertirse en una vivienda de cuatro, con sótano y buhardilla. El sótano se convirtió en una sala de cine con un equipo completo de audio y vídeo. Las tiras de luz en el cajeado del techo y la iluminación indirecta del jardín vertical dan al espacio el aire moderno que buscaba el cliente.',
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
