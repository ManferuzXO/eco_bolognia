/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           ANIMALES.JS — La Memoria del URAQI                ║
 * ║                                                              ║
 * ║  Aquí defines los 36 animales del proyecto.                 ║
 * ║  Cada clave (animal-01, animal-02...) corresponde           ║
 * ║  al hotspot numerado en el modelo 3D.                       ║
 * ║                                                              ║
 * ║  CAMPOS:                                                     ║
 * ║  nombre    → Nombre común (ej: "Colibrí Gigante")           ║
 * ║  cientifico→ Nombre científico en cursiva                   ║
 * ║  emoji     → Se muestra si no hay imagen                    ║
 * ║  imagen    → Ruta a foto circular (ej: "fotos/colibri.jpg") ║
 * ║  color     → Color de acento del card                       ║
 * ║  audio     → Ruta al archivo de sonido (ej: "audio/x.mp3") ║
 * ║              Pon null si aún no tienes el audio             ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

window.ANIMALES = {

  /* ── ANIMAL 01 ── */
  'animal-01': {
    nombre:     'Colibrí Cometa',
    cientifico: 'Sappho Sparganurus',
    emoji:      '🐦',
    imagen:     'fotos/1.jpeg',          // ej: 'fotos/colibri-gigante.jpg'
    color:      '#8faa5c',
    audio:      'audios/1.mp3',          // ej: 'audio/colibri-gigante.mp3'
  },

  /* ── ANIMAL 02 ── */
  'animal-02': {
    nombre:     'Chaiñita',
    cientifico: 'Spinus atratus',
    emoji:      '🐾',
    imagen:     'fotos/2.jpg',
    color:      '#b09c85',
    audio:      'audios/2.mp3',
  },

  /* ── ANIMAL 03 ── */
  'animal-03': {
    nombre:     'Colibrí Gigante',
    cientifico: 'Patagona gigas',
    emoji:      '🐾',
    imagen:     'fotos/3.jpg',
    color:      '#9e5447',
    audio:      'audios/3.mp3',
  },

  /* ── ANIMAL 04 
  'animal-04': {
    nombre:     'Animal 04',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#d4906e',
    audio:      null,
  },

  /* ── ANIMAL 05 
  'animal-05': {
    nombre:     'Animal 05',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#8faa5c',
    audio:      null,
  },── */

  /* ── ANIMAL 06 ── */
  'animal-06': {
    nombre:     'Piquito de oro',
    cientifico: 'Catamenia analis',
    emoji:      '🐾',
    imagen:     'fotos/6.jpg',
    color:      '#b09c85',
    audio:     'audios/4.mp3',
  },

  /* ── ANIMAL 07 ── */
  'animal-07': {
    nombre:     'Alkamari',
    cientifico: 'Phalcoboenus megalopterus',
    emoji:      '🐾',
    imagen:     'fotos/7.jpg',
    color:      '#9e5447',
    audio:      'audios/5.mp3',
  },

  /* ── ANIMAL 08 ── */
  'animal-08': {
    nombre:     'Pichitanka',
    cientifico: 'Zonotrichia capensis',
    emoji:      '🐾',
    imagen:     'fotos/8.jpg',
    color:      '#d4906e',
    audio:      'audios/6.mp3',
  },

  /* ── ANIMAL 09 ── */
  'animal-09': {
    nombre:     'Conirrostro cinereo',
    cientifico: 'Conistorum cinereum',
    emoji:      '🐾',
    imagen:     'fotos/9.jpg',
    color:      '#8faa5c',
    audio:      'audios/7.mp3',
  },

  /* ── ANIMAL 10 
  'animal-10': {
    nombre:     'Animal 10',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#b09c85',
    audio:      null,
  },── */

  /* ── ANIMAL 11 ── */
  'animal-11': {
    nombre:     'Zenaida',
    cientifico: 'Zenaida auriculata',
    emoji:      '🐾',
    imagen:     'fotos/11.jpg',
    color:      '#9e5447',
    audio:      'audios/8.mp3',
  },

  /* ── ANIMAL 12 
  'animal-12': {
    nombre:     'Animal 12',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#d4906e',
    audio:      null,
  },

  /* ── ANIMAL 13 
  'animal-13': {
    nombre:     'Animal 13',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#8faa5c',
    audio:      null,
  },

  /* ── ANIMAL 14 
  'animal-14': {
    nombre:     'Animal 14',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#b09c85',
    audio:      null,
  },

  /* ── ANIMAL 15 
  'animal-15': {
    nombre:     'Animal 15',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#9e5447',
    audio:      null,
  },

  /* ── ANIMAL 16 
  'animal-16': {
    nombre:     'Animal 16',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#d4906e',
    audio:      null,
  },

  /* ── ANIMAL 17 
  'animal-17': {
    nombre:     'Animal 17',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#8faa5c',
    audio:      null,
  },

  /* ── ANIMAL 18 
  'animal-18': {
    nombre:     'Animal 18',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#b09c85',
    audio:      null,
  },

  /* ── ANIMAL 19 
  'animal-19': {
    nombre:     'Animal 19',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#9e5447',
    audio:      null,
  },

  /* ── ANIMAL 20 
  'animal-20': {
    nombre:     'Animal 20',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#d4906e',
    audio:      null,
  },── */

  /* ── ANIMAL 21 ── */
  'animal-21': {
    nombre:     'Colibri rutilante',
    cientifico: 'Colibri coruscans',
    emoji:      '🐾',
    imagen:     'fotos/21.jpg',
    color:      '#8faa5c',
    audio:      'audios/9.mp3',
  },

  /* ── ANIMAL 22 ── */
  'animal-22': {
    nombre:     'Mirlo grande',
    cientifico: 'Turdus fuscater',
    emoji:      '🐾',
    imagen:     'fotos/22.jpg',
    color:      '#b09c85',
    audio:      'audios/10.mp3',
  },

  /* ── ANIMAL 23 
    nombre:     'Animal 23',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#9e5447',
    audio:      null,
  },── */

  /* ── ANIMAL 24 ── */
  'animal-24': {
    nombre:     'Dormilona cenicienta',
    cientifico: 'Muscisaxicola cinereus',
    emoji:      '🐾',
    imagen:     'fotos/24.jpg',
    color:      '#d4906e',
    audio:      'audios/11.mp3',
  },

  /* ── ANIMAL 25 ── */
  'animal-25': {
    nombre:     'Zenaida',
    cientifico: 'Zenaida auriculata',
    emoji:      '🐾',
    imagen:     'fotos/11.jpg',
    color:      '#8faa5c',
    audio:      'audios/8.mp3',
  },

  /* ── ANIMAL 26 ── */
  'animal-26': {
    nombre:     'Zenaida',
    cientifico: 'Zenaida auriculata',
    emoji:      '🐾',
    imagen:     'fotos/11.jpg',
    color:      '#b09c85',
    audio:      'audios/8.mp3',
  },

  /* ── ANIMAL 27 ── */
  'animal-27': {
    nombre:     'Jilguero vientre amarillo',
    cientifico: 'Spinus xanthogastrus',
    emoji:      '🐾',
    imagen:     'fotos/27.jpg',
    color:      '#9e5447',
    audio:      'audios/14.mp3',
  },

  /* ── ANIMAL 28 
  'animal-28': {
    nombre:     'Animal 28',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#d4906e',
    audio:      null,
  },

  /* ── ANIMAL 29 
  'animal-29': {
    nombre:     'Animal 29',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#8faa5c',
    audio:      null,
  },── */

  /* ── ANIMAL 30 ── */
  'animal-30': {
    nombre:     'Sinsonte castaño',
    cientifico: 'Mimus dorsalis ',
    emoji:      '🐾',
    imagen:     'fotos/30.jpg',
    color:      '#b09c85',
    audio:      'audios/15.mp3',
  },

  /* ── ANIMAL 31 ── */
  'animal-31': {
    nombre:     'Colibrí Cometa',
    cientifico: 'Sappho Sparganurus',
    emoji:      '🐦',
    imagen:     'fotos/1.jpeg',
    color:      '#9e5447',
    audio:      'audios/1.mp3',
  },

  /* ── ANIMAL 32 ── */
  'animal-32': {
    nombre:     'Chubta',
    cientifico: 'Phrygilus punensis',
    emoji:      '🐾',
    imagen:     'fotos/32.jpg',
    color:      '#d4906e',
    audio:      'audios/17.mp3',
  },

  /* ── ANIMAL 33 ── */
  'animal-33': {
    nombre:     'Chiguanco',
    cientifico: 'Turdus chiguanco',
    emoji:      '🐾',
    imagen:     'fotos/33.jpg',
    color:      '#8faa5c',
    audio:      'audios/18.mp3',
  },

  /* ── ANIMAL 34 ── */
  'animal-34': {
    nombre:     'Zenaida',
    cientifico: 'Zenaida auriculata',
    emoji:      '🐾',
    imagen:     'fotos/11.jpg',
    color:      '#b09c85',
    audio:      'audios/8.mp3',
  },

  /* ── ANIMAL 35 ── */
  'animal-35': {
    nombre:     'Paloma Moteada',
    cientifico: 'Patagioenas maculosa',
    emoji:      '🐾',
    imagen:     'fotos/35.jpg',
    color:      '#9e5447',
    audio:      'audios/19.mp3',
  },

  /* ── ANIMAL 36 
  'animal-36': {
    nombre:     'Animal 36',
    cientifico: 'Nombre scientificus',
    emoji:      '🐾',
    imagen:     null,
    color:      '#d4906e',
    audio:      null,
  },── */

};
