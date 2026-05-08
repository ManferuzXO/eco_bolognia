/* ══ VISOR DE PANELES ══
   Zoom: rueda del ratón / pinch táctil
   Desplazamiento: arrastrar con mouse / un dedo (cuando hay zoom)
   Sin botones de zoom visibles
*/

(function () {
  const overlay   = document.getElementById('panelModalOverlay');
  const modalImg  = document.getElementById('panelModalImg');
  const footer    = document.getElementById('panelModalFooter');
  const container = document.getElementById('panelImgContainer');

  let panelList  = [];
  let currentIdx = 0;
  let zoomLevel  = 1;
  let offset     = { x: 0, y: 0 };

  // Drag state
  let isDragging     = false;
  let dragStart      = { x: 0, y: 0 };
  let offsetStart    = { x: 0, y: 0 };

  // Pinch state
  let lastPinchDist  = null;

  const ZOOM_MIN  = 1;
  const ZOOM_MAX  = 6;
  const ZOOM_STEP = 0.4;  // kept for keyboard fallback

  /* — Transform — */
  function applyTransform() {
    if (!modalImg) return;
    if (zoomLevel <= ZOOM_MIN) offset = { x: 0, y: 0 };
    modalImg.style.transform = `translate(${offset.x}px,${offset.y}px) scale(${zoomLevel})`;
    updateCursor();
  }

  function resetZoom() {
    zoomLevel = 1;
    offset    = { x: 0, y: 0 };
    applyTransform();
  }

  function updateCursor() {
    if (!container) return;
    container.style.cursor = zoomLevel > ZOOM_MIN ? 'grab' : 'default';
  }

  /* — Recolectar paneles — */
  function recolectarPaneles() {
    panelList = [];
    document.querySelectorAll('.panel-thumb').forEach(thumb => {
      panelList.push({ src: thumb.dataset.src || '', label: thumb.dataset.label || '' });
    });
  }

  function cargarImagen() {
    const p = panelList[currentIdx];
    if (!p) return;
    resetZoom();

    const esPDF = p.src.toLowerCase().endsWith('.pdf');

    if (esPDF) {
      // Mostrar iframe, ocultar imagen
      modalImg.src = '';
      document.getElementById('panelImgContainer').style.display = 'none';
      document.getElementById('panelPdfContainer').classList.add('active');
      document.getElementById('panelPdfIframe').src = p.src;
      // Ocultar controles de zoom (no aplican para PDF)
      document.querySelector('.panel-modal-controls').style.display = 'none';
    } else {
      // Mostrar imagen, ocultar iframe
      document.getElementById('panelPdfContainer').classList.remove('active');
      document.getElementById('panelPdfIframe').src = '';
      document.getElementById('panelImgContainer').style.display = 'flex';
      modalImg.src = p.src;
      modalImg.alt = p.label;
    }

    if (footer) footer.textContent = `Panel ${currentIdx + 1} / ${panelList.length}`;
  }

  /* — Abrir — */
  window.abrirPanel = function (idx) {
    recolectarPaneles();
    currentIdx = idx;
    cargarImagen();
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  /* — Cerrar — */
  window.cerrarPanelModal = function () {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    resetZoom();
    // Limpiar iframe al cerrar
    document.getElementById('panelPdfIframe').src = '';
    document.getElementById('panelPdfContainer').classList.remove('active');
    document.getElementById('panelImgContainer').style.display = 'flex';
  };

  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) cerrarPanelModal();
    });
  }

  /* — Navegación — */
  window.panelAnterior = function () {
    if (!panelList.length) return;
    currentIdx = (currentIdx - 1 + panelList.length) % panelList.length;
    cargarImagen();
  };

  window.panelSiguiente = function () {
    if (!panelList.length) return;
    currentIdx = (currentIdx + 1) % panelList.length;
    cargarImagen();
  };

  /* — Funciones expuestas (por si quedan llamadas en HTML) — */
  window.zoomPanel      = function (dir) {
    zoomLevel = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoomLevel + dir * ZOOM_STEP));
    applyTransform();
  };
  window.resetPanelZoom = resetZoom;

  /* ══ WHEEL ZOOM ══ */
  if (overlay) {
    overlay.addEventListener('wheel', e => {
      e.preventDefault();
      const dir = e.deltaY < 0 ? 1 : -1;
      zoomLevel = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoomLevel + dir * ZOOM_STEP));
      applyTransform();
    }, { passive: false });
  }

  /* ══ MOUSE DRAG ══ */
  if (container) {
    container.addEventListener('mousedown', e => {
      if (zoomLevel <= ZOOM_MIN) return;
      isDragging  = true;
      dragStart   = { x: e.clientX, y: e.clientY };
      offsetStart = { ...offset };
      container.style.cursor = 'grabbing';
    });
  }

  window.addEventListener('mousemove', e => {
    if (!isDragging) return;
    offset.x = offsetStart.x + (e.clientX - dragStart.x);
    offset.y = offsetStart.y + (e.clientY - dragStart.y);
    applyTransform();
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    updateCursor();
  });

  /* ══ TOUCH — pinch zoom + single-finger drag ══ */
  if (container) {
    container.addEventListener('touchstart', e => {
      if (e.touches.length === 2) {
        lastPinchDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        isDragging = false;
      } else if (e.touches.length === 1) {
        if (zoomLevel > ZOOM_MIN) {
          isDragging  = true;
          dragStart   = { x: e.touches[0].clientX, y: e.touches[0].clientY };
          offsetStart = { ...offset };
        }
      }
    }, { passive: true });

    container.addEventListener('touchmove', e => {
      if (e.touches.length === 2 && lastPinchDist !== null) {
        e.preventDefault();
        const dist  = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const delta = (dist - lastPinchDist) / 120;
        zoomLevel   = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, zoomLevel + delta));
        lastPinchDist = dist;
        applyTransform();
      } else if (e.touches.length === 1 && isDragging) {
        offset.x = offsetStart.x + (e.touches[0].clientX - dragStart.x);
        offset.y = offsetStart.y + (e.touches[0].clientY - dragStart.y);
        applyTransform();
      }
    }, { passive: false });

    container.addEventListener('touchend', () => {
      isDragging    = false;
      lastPinchDist = null;
    });
  }

  /* ══ TECLADO ══ */
  document.addEventListener('keydown', e => {
    if (!overlay || !overlay.classList.contains('open')) return;
    if (e.key === 'Escape')                  cerrarPanelModal();
    if (e.key === 'ArrowLeft')               panelAnterior();
    if (e.key === 'ArrowRight')              panelSiguiente();
    if (e.key === '+' || e.key === '=')      zoomPanel(1);
    if (e.key === '-')                       zoomPanel(-1);
    if (e.key === '0')                       resetPanelZoom();
  });

})();
