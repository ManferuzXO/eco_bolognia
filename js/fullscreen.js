/* ══ FULLSCREEN — Modelo 3D ══ */
(function () {

  const container = document.getElementById('modelContainer');
  const exitBtn   = document.getElementById('fsExitBtn');
  const mainBtn   = document.getElementById('modelFullscreenBtn');

  if (!container) return;

  /* IDs de todos los modales que deben funcionar dentro del fullscreen */
  const MODAL_IDS = [
    'intervModalOverlay',
    'faunaModalOverlay',
    'rojoModalOverlay',
    'propModalOverlay',
  ];

  /* Guardamos el nodo siguiente de cada modal para restaurar el orden al salir */
  const modalOriginalPositions = {};

  function moveModalsInto() {
    MODAL_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      /* Guardar posición original */
      modalOriginalPositions[id] = {
        parent:      el.parentNode,
        nextSibling: el.nextSibling,
      };
      container.appendChild(el);
    });
  }

  function moveModalsOut() {
    MODAL_IDS.forEach(id => {
      const el  = document.getElementById(id);
      const pos = modalOriginalPositions[id];
      if (!el || !pos) return;
      /* Restaurar en la posición original */
      if (pos.nextSibling) {
        pos.parent.insertBefore(el, pos.nextSibling);
      } else {
        pos.parent.appendChild(el);
      }
    });
  }

  const isFull = () =>
    !!(document.fullscreenElement ||
       document.webkitFullscreenElement ||
       document.mozFullScreenElement) ||
    container.classList.contains('fs-fallback');

  function setUI(full) {
    if (exitBtn) exitBtn.classList.toggle('visible', full);
    if (mainBtn) mainBtn.classList.toggle('active', full);
  }

  function enterFullscreen() {
    moveModalsInto();   /* mover modales ANTES de pedir fullscreen */
    if (container.requestFullscreen)            container.requestFullscreen();
    else if (container.webkitRequestFullscreen) container.webkitRequestFullscreen();
    else if (container.mozRequestFullScreen)    container.mozRequestFullScreen();
    else {
      container.classList.add('fs-fallback');
      document.body.style.overflow = 'hidden';
      setUI(true);
    }
  }

  function exitFullscreen() {
    if (container.classList.contains('fs-fallback')) {
      container.classList.remove('fs-fallback');
      document.body.style.overflow = '';
      setUI(false);
      moveModalsOut();
      return;
    }
    if (document.exitFullscreen)            document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen)  document.mozCancelFullScreen();
  }

  window.toggleModelFullscreen = function () {
    isFull() ? exitFullscreen() : enterFullscreen();
  };

  /* Sync con Escape nativo — también restaura modales */
  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange'].forEach(ev => {
    document.addEventListener(ev, () => {
      const full = isFull();
      setUI(full);
      if (!full) moveModalsOut();
    });
  });

  /* Tecla F en desktop */
  document.addEventListener('keydown', e => {
    if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey) {
      const modal = document.querySelector(
        '#faunaModalOverlay.open,#propModalOverlay.open,#panelModalOverlay.open,#rojoModalOverlay.open,#intervModalOverlay.open'
      );
      if (!modal) { e.preventDefault(); window.toggleModelFullscreen(); }
    }
  });

  /* Swipe hacia abajo para salir en móvil */
  let touchStartY = 0;
  let touchStartX = 0;

  container.addEventListener('touchstart', e => {
    if (!isFull()) return;
    touchStartY = e.touches[0].clientY;
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  container.addEventListener('touchend', e => {
    if (!isFull()) return;
    const dy = e.changedTouches[0].clientY - touchStartY;
    const dx = Math.abs(e.changedTouches[0].clientX - touchStartX);
    if (dy > 80 && dx < 60) exitFullscreen();
  }, { passive: true });

})();
