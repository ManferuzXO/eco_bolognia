/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           PROPUESTAS.JS — Modal de Intervenciones           ║
 * ║                                                              ║
 * ║  Datos y lógica del modal de propuestas moradas/amarillas.  ║
 * ║                                                              ║
 * ║  CAMPOS por tipo (morado / amarillo):                       ║
 * ║  hero   → Imagen principal del modal                        ║
 * ║  tipo   → Etiqueta visible ("Intervención Morada", etc.)    ║
 * ║  titulo → Título del grupo de intervenciones                ║
 * ║  desc   → Descripción general                               ║
 * ║  items  → Array de sub-intervenciones:                      ║
 * ║    img    → Ruta de la imagen                               ║
 * ║    titulo → Nombre de la intervención                       ║
 * ║    desc   → Descripción corta                               ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

const PROPUESTAS = {
  morado: {
    hero:   'propuestas/Morado.png',
    tipo:   'Intervención Morada',
    titulo: 'Mejora de plazas, parques y espacios públicos',
    desc:   'Las intervenciones moradas buscan recuperar y mejorar el espacio público de Bolognía: plazas, parques y áreas verdes. Cada intervención incorpora murales de fauna local, vegetación nativa y mobiliario urbano que refuerzan la identidad del barrio y el vínculo con el entorno natural.',
    items: [
      { img: 'propuestas/m1.png',    titulo: 'Plaza de los Leones',           desc: 'Recuperación del rol central del espacio con mejoras de iluminación, verde y activación cultural.' },
      { img: 'propuestas/m2.png',    titulo: 'Plaza de la Piedra',            desc: 'Redesign con mobiliario en piedra local, arbolado nativo y superficies permeables.' },
      { img: 'propuestas/m3.png',    titulo: 'Parque Integral',               desc: 'Parque accesible con áreas de juego, descanso, vegetación y arte urbano para todos los vecinos.' },
      { img: 'propuestas/m4.png',    titulo: 'Área de recreación',            desc: 'Área conectada con el área natural protegida, con murales, caminos ecológicos y vegetación nativa.' },
      { img: 'propuestas/1 FINAL GR-01.jpeg',    titulo: 'Ascenso al Eco de Bolognía',    desc: 'Recorrido con murales, vegetación, miradores y espacios de contemplación hacia el área natural.' },
      { img: 'propuestas/m5.png',    titulo: 'Ingreso al Bosque de Bolognía', desc: 'Muro de tapia pisada y gaviones de piedra que crean una transición entre el barrio y el área natural.' },
      { img: 'propuestas/5 MURAL FINAL.png', titulo: 'Mural del Área de recreación y conexión con el área protegida', desc: 'Intervención de mural artístico situado en el area de recreación en el barrio de Bolognía, incorporando fauna nativa andina y elementos del paisaje local para recuperar la identidad cultural del espacio público.'},
      { img: 'propuestas/4 MURAL FINAL.png', titulo:'Mural por la Plaza de la Piedra', desc:'Intervención de mural artístico en la Plaza de la piedra, incorporando fauna nativa andina y elementos del paisaje local para recuperar la identidad cultural del espacio público.'},  
      { img: 'propuestas/2 CALLEJON -01.jpeg', titulo: 'Mural por los Callejones',               desc: 'Intervención de mural artístico en el barrio incorporando fauna nativa andina y elementos del paisaje local.' },
      
      
    ]
  },
  amarillo: {
    hero:   'propuestas/1a.jpg',
    tipo:   'Intervención Amarilla',
    titulo: 'Seguridad y accesibilidad en calles y veredas',
    desc:   'Las intervenciones amarillas mejoran la seguridad y accesibilidad de las calles de Bolognía mediante losetas con relieve táctil, iluminación y señalización. El objetivo es que personas no videntes, entre otros, puedan caminar de manera autónoma y segura por el barrio.',
    items: [
      
      
    ]
  }
};

/* ══ MODAL PROPUESTAS ══ */
function abrirPropModal(tipo) {
  const data = PROPUESTAS[tipo];
  if (!data) return;

  document.getElementById('propModalHero').src           = data.hero;
  document.getElementById('propModalHero').alt           = data.titulo;
  document.getElementById('propModalTipo').textContent   = data.tipo;
  document.getElementById('propModalTipo').className     = 'prop-modal-tipo ' + tipo;
  document.getElementById('propModalTitulo').textContent = data.titulo;
  document.getElementById('propModalDesc').textContent   = data.desc;
  document.getElementById('propModal').className         = 'prop-modal ' + tipo;

  document.getElementById('propModalGrid').innerHTML = data.items.map(item => `
    <div class="prop-modal-item" onclick="abrirItemIntervencion(this)"
         data-tipo="${tipo}"
         data-imagen="${item.img}"
         data-titulo="${item.titulo}"
         data-desc="${item.desc}">
      <div class="prop-item-img-wrap">
        <img src="${item.img}" alt="${item.titulo}" loading="lazy">
        <div class="prop-item-zoom-hint">🔍 Ver en detalle</div>
      </div>
      <div class="prop-modal-item-body">
        <div class="prop-modal-item-title">${item.titulo}</div>
        <div class="prop-modal-item-desc">${item.desc}</div>
      </div>
    </div>
  `).join('');

  document.getElementById('propModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarPropModal() {
  document.getElementById('propModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

/* Abre el modal de zoom desde una mini-card de propuesta */
function abrirItemIntervencion(el) {
  const tipo   = el.dataset.tipo   || 'morado';
  const imagen = el.dataset.imagen || '';
  const titulo = el.dataset.titulo || '';
  const desc   = el.dataset.desc   || '';
  abrirModalIntervencion({ dataset: { tipo, imagen, titulo, desc } });
}

/* ══ CIERRE AL CLICK EN OVERLAY ══ */
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('propModalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('propModalOverlay')) cerrarPropModal();
  });
});

/* ══ MODAL ÁREAS INTERVENIDAS (rojo) ══ */
function abrirModalRojo() {
  if (typeof activeWrapper !== 'undefined' && activeWrapper) closeCard(activeWrapper);
  document.getElementById('rojoModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function cerrarModalRojo() {
  document.getElementById('rojoModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}
window.addEventListener('DOMContentLoaded', () => {
  document.getElementById('rojoModalOverlay').addEventListener('click', e => {
    if (e.target === document.getElementById('rojoModalOverlay')) cerrarModalRojo();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') cerrarModalRojo();
  });
});