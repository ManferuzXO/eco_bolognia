/* ══ POBLAR FAUNA CARDS ══ */
window.addEventListener('DOMContentLoaded', () => {
  if (!window.ANIMALES) return;

  /* — rellenar datos en las cards del modelo — */
  Object.entries(window.ANIMALES).forEach(([id, a]) => {
    const elN = document.getElementById('nombre-' + id);
    const elS = document.getElementById('sci-'    + id);
    const elF = document.getElementById('foto-'   + id);
    const elA = document.getElementById('audio-'  + id);
    if (!elN) return;
    elN.textContent = a.nombre;
    elS.textContent = a.cientifico;
    if (a.imagen) { elF.innerHTML = `<img src="${a.imagen}" alt="${a.nombre}" loading="lazy" decoding="async">`; elF.style.background = ''; }
    else { elF.innerHTML = a.emoji||'🐾'; elF.style.background = `linear-gradient(135deg,${a.color||'#b09c85'},#2a1f18)`; elF.style.fontSize = '1.6rem'; }
    if (!a.audio) { elA.style.opacity='0.4'; elA.style.pointerEvents='none'; elA.title='Audio no disponible aún'; }
  });
});
/* ══ MODAL FAUNA ══ */
function abrirFaunaModal(animalId, num, nombre, cientifico, imagen, desc) {
  if (window._faunaModalId) {
    Object.keys(cardAudioInstances).forEach(k => { cardAudioInstances[k].pause(); delete cardAudioInstances[k]; });
  }
  window._faunaModalId = animalId;

  document.getElementById('faunaModalImg').src            = imagen;
  document.getElementById('faunaModalImg').alt            = nombre;
  document.getElementById('faunaModalNum').textContent    = num;
  document.getElementById('faunaModalNombre').textContent = nombre;
  document.getElementById('faunaModalSci').textContent    = cientifico;
  document.getElementById('faunaModalDesc').textContent   = desc;

  const btn = document.getElementById('faunaModalAudioBtn');
  btn.classList.remove('playing');
  btn.innerHTML = '<svg viewBox="0 0 10 10" fill="currentColor" style="width:9px;height:9px"><polygon points="0,0 10,5 0,10"/></svg> Escuchar canto';
  const animal = window.ANIMALES?.[animalId];
  btn.style.display = (animal && animal.audio) ? '' : 'none';

  document.getElementById('faunaModalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarFaunaModal(e) {
  if (e && e.target !== document.getElementById('faunaModalOverlay') &&
      !(e.target && e.target.classList.contains('fauna-modal-close'))) return;
  Object.keys(cardAudioInstances).forEach(k => { cardAudioInstances[k].pause(); delete cardAudioInstances[k]; });
  document.getElementById('faunaModalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && document.getElementById('faunaModalOverlay')?.classList.contains('open')) {
      Object.keys(cardAudioInstances).forEach(k => { cardAudioInstances[k].pause(); delete cardAudioInstances[k]; });
      document.getElementById('faunaModalOverlay').classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});
