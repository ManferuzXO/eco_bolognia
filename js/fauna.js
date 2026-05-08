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
    if (a.imagen) { elF.innerHTML = `<img src="${a.imagen}" alt="${a.nombre}">`; elF.style.background = ''; }
    else { elF.innerHTML = a.emoji||'🐾'; elF.style.background = `linear-gradient(135deg,${a.color||'#b09c85'},#2a1f18)`; elF.style.fontSize = '1.6rem'; }
    if (!a.audio) { elA.style.opacity='0.4'; elA.style.pointerEvents='none'; elA.title='Audio no disponible aún'; }
  });
});