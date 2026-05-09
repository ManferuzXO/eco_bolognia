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
      { img: 'propuestas/m1.png',    titulo: 'Plaza de los Leones',           desc: 'Intervención en la Plaza de los Leones para recuperar su rol como espacio central del barrio. Incluye mejoras de iluminación, mobiliario urbano, zonas verdes y activación cultural con murales y elementos de arte público que dialogan con la fauna de Bolognía.' },
      { img: 'propuestas/m2.png',    titulo: 'Plaza de la Piedra',            desc: 'Reapropiación de la histórica plaza de la piedra con la reforestacíon, murlismo y aplicación de losetas podotáctiles.' },
      { img: 'propuestas/m3.png',    titulo: 'Parque Integral',               desc: 'Parque integral que articula diferentes escalas del espacio público, integrando áreas de juego, descanso, vegetación y arte urbano. Diseñado para ser accesible a todos los habitantes del barrio, con especial atención a adultos mayores y niños.' },
      { img: 'propuestas/m4.png',    titulo: 'Parque Recreativo',            desc: 'Este parque es un propuesta ubicada sobre un área residual en la zona, cercada al área protegida. Su objetivo es crear un espacio mas para el ocio, la información (con murales) y el descanso de quien lo visite.' },
      { img: 'propuestas/MURAL Colibri.png', titulo: 'Mural del Gigante', desc:'Este mural del Colibrí gigante, recupera el espacio público y residual que existía en la plaza de los leones. Creando un punto de parada y observación de información para los lugareños y visitantes.'},
      { img: 'propuestas/2 CALLEJON -01.jpeg', titulo: 'Mural en los callejones 4 y 5',               desc: 'Intervención de mural artístico en los callejones del barrio de Bolognía, incorporando fauna nativa andina y elementos del paisaje local para recuperar la identidad cultural del espacio público.' },
      { img: 'propuestas/4 MURAL FINAL.png', titulo:'Mural Informativo', desc:'Este mural/panel informativo tiene el objetivo de darle una vista previa al visitante o vecino que haya llegado en Puma Katari, trufi o minibus, de que a pocos pasos suyos se encuentran el área protegida de Bolognia y pueda visitarlo.'},  
      { img: 'propuestas/1 FINAL GR-01.jpeg',    titulo: 'Ascenso al Pasaje de La Queñua',    desc: 'La intervención en las graderías que dirigen hacia el ingreso del área protegida, tiene el fin de ser llamativo a quien lo vea al pasar, invitándo a ascender por las graderias al usuario, por medio del arte, la vegetación y la iluminación.' },
      { img: 'propuestas/m5.png',    titulo: 'Ingreso al Area Protegida', desc: 'El trabajo realizado en la entrada al bosque de Bolognia, trata de integrar la tierra, piedras y colores propios del sitio. Conformandose así intervenciones artísticas sobre muros de Tapia Pisada, el uso de vegetación y monolitos tallados en piedra, también la incorporación de muros Gaviones de piedra en lugares con tendencia a deslizamiento y avasallamiento.' },
      { img: 'propuestas/5 MURAL FINAL.png', titulo: 'Mural del Área de recreación y conexión con el área protegida', desc: 'Intervención de mural artístico situado en el area de recreación en el barrio de Bolognía, incorporando fauna nativa andina y elementos del paisaje local para recuperar la identidad cultural del espacio público.'},

      
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
        <img src="${item.img}" alt="${item.titulo}" loading="lazy" decoding="async">
        <div class="prop-item-zoom-hint">🔍 Ver en detalle</div>
      </div>
      <div class="prop-modal-item-body">
        <div class="prop-modal-item-title">${item.titulo}</div>
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