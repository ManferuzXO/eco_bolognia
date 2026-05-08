/* ══ ESCALA DINÁMICA HOTSPOTS ══ */
const mv = document.querySelector('#mv');
mv.addEventListener('camera-change', () => {
  document.querySelectorAll('.hs-wrapper').forEach(h => {
    const pos = mv.getCameraPosition();
    const hs  = mv.queryHotspot(h.getAttribute('slot'));
    if (!hs) return;
    const dist = Math.hypot(pos.x - hs.position.x, pos.y - hs.position.y, pos.z - hs.position.z);
    h.style.transform = `scale(${Math.max(0.6, Math.min(1.4, 200 / dist))})`;
  });
});

/* ══ TOGGLE CARDS FAUNA (verde) ══ */
let activeWrapper = null;

function toggleCard(wrapper) {
  if (activeWrapper && activeWrapper !== wrapper) closeCard(activeWrapper);
  wrapper.classList.toggle('open');
  activeWrapper = wrapper.classList.contains('open') ? wrapper : null;
}

function closeCard(wrapper) {
  if (!wrapper) return;
  wrapper.classList.remove('open');
  const id = wrapper.dataset.animal;
  if (id) stopAnimalAudio(id);
  if (activeWrapper === wrapper) activeWrapper = null;
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (activeWrapper) closeCard(activeWrapper);
    cerrarModalIntervencion();
  }
});

/* ══ MODAL INTERVENCIONES (morado / amarillo) ══ */
const modalOverlay = document.getElementById('intervModalOverlay');
const modalImg     = document.getElementById('intervModalImg');
const modalTag     = document.getElementById('intervModalTag');
const modalTitle   = document.getElementById('intervModalTitle');
const modalDesc    = document.getElementById('intervModalDesc');
const modalInner   = document.getElementById('intervModal');
const imgWrap      = modalImg ? modalImg.parentElement : null;

/* — Zoom & pan state — */
let ivZoom   = 1;
let ivOffset = { x: 0, y: 0 };
let ivDrag   = false;
let ivDragStart    = { x: 0, y: 0 };
let ivOffsetStart  = { x: 0, y: 0 };
let ivLastPinchDist = null;

const IV_ZOOM_MIN  = 1;
const IV_ZOOM_MAX  = 5;
const IV_ZOOM_STEP = 0.35;

function ivApplyTransform() {
  if (!modalImg) return;
  if (ivZoom <= IV_ZOOM_MIN) ivOffset = { x: 0, y: 0 };
  modalImg.style.transform = `translate(${ivOffset.x}px,${ivOffset.y}px) scale(${ivZoom})`;
}

function ivResetTransform() {
  ivZoom   = 1;
  ivOffset = { x: 0, y: 0 };
  ivApplyTransform();
}

/* — Wheel zoom — */
if (imgWrap) {
  imgWrap.addEventListener('wheel', e => {
    e.preventDefault();
    const dir = e.deltaY < 0 ? 1 : -1;
    ivZoom = Math.min(IV_ZOOM_MAX, Math.max(IV_ZOOM_MIN, ivZoom + dir * IV_ZOOM_STEP));
    ivApplyTransform();
  }, { passive: false });

  /* — Mouse drag — */
  imgWrap.addEventListener('mousedown', e => {
    if (ivZoom <= IV_ZOOM_MIN) return;
    ivDrag = true;
    ivDragStart   = { x: e.clientX, y: e.clientY };
    ivOffsetStart = { ...ivOffset };
    imgWrap.style.cursor = 'grabbing';
  });
  window.addEventListener('mousemove', e => {
    if (!ivDrag) return;
    ivOffset.x = ivOffsetStart.x + (e.clientX - ivDragStart.x);
    ivOffset.y = ivOffsetStart.y + (e.clientY - ivDragStart.y);
    ivApplyTransform();
  });
  window.addEventListener('mouseup', () => {
    ivDrag = false;
    if (imgWrap) imgWrap.style.cursor = ivZoom > IV_ZOOM_MIN ? 'grab' : 'default';
  });

  /* — Touch pinch zoom + drag — */
  imgWrap.addEventListener('touchstart', e => {
    if (e.touches.length === 2) {
      ivLastPinchDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    } else if (e.touches.length === 1 && ivZoom > IV_ZOOM_MIN) {
      ivDrag = true;
      ivDragStart   = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      ivOffsetStart = { ...ivOffset };
    }
  }, { passive: true });

  imgWrap.addEventListener('touchmove', e => {
    if (e.touches.length === 2 && ivLastPinchDist !== null) {
      e.preventDefault();
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (dist - ivLastPinchDist) / 100;
      ivZoom = Math.min(IV_ZOOM_MAX, Math.max(IV_ZOOM_MIN, ivZoom + delta));
      ivLastPinchDist = dist;
      ivApplyTransform();
    } else if (e.touches.length === 1 && ivDrag) {
      ivOffset.x = ivOffsetStart.x + (e.touches[0].clientX - ivDragStart.x);
      ivOffset.y = ivOffsetStart.y + (e.touches[0].clientY - ivDragStart.y);
      ivApplyTransform();
    }
  }, { passive: false });

  imgWrap.addEventListener('touchend', () => {
    ivDrag = false;
    ivLastPinchDist = null;
  });
}

function abrirModalIntervencion(wrapper) {
  if (activeWrapper) closeCard(activeWrapper);

  const tipo   = wrapper.dataset.tipo   || 'morado';
  const imagen = wrapper.dataset.imagen || '';
  const titulo = wrapper.dataset.titulo || '';
  const desc   = wrapper.dataset.desc   || '';

  ivResetTransform();

  modalImg.src = imagen;
  modalImg.alt = titulo;
  modalTag.textContent = tipo === 'morado' ? 'Intervención Morada' : 'Intervención Amarilla';
  modalTag.className = 'interv-modal-tag ' + tipo;
  modalTitle.textContent = titulo;
  modalDesc.textContent  = desc;
  modalInner.className   = 'interv-modal ' + tipo;

  if (imgWrap) imgWrap.style.cursor = 'default';

  modalOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function cerrarModalIntervencion() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
  ivResetTransform();
}

if (modalOverlay) {
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) cerrarModalIntervencion();
  });
}

function toggleImgCard(wrapper) {
  abrirModalIntervencion(wrapper);
}
