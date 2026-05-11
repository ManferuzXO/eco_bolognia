/* ══ FULLSCREEN — Modelo 3D ══ */
(function () {

  const container = document.getElementById('modelContainer');
  const exitBtn   = document.getElementById('fsExitBtn');
  const mainBtn   = document.getElementById('modelFullscreenBtn');

  if (!container) return;

  /* Todos los modales + botón salir se mueven dentro del container en fullscreen */
  const MOVE_IDS = [
    'intervModalOverlay',
    'faunaModalOverlay',
    'rojoModalOverlay',
    'propModalOverlay',
    'fsExitBtn',
  ];

  const originalPositions = {};

  function moveInto() {
    MOVE_IDS.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      originalPositions[id] = { parent: el.parentNode, nextSibling: el.nextSibling };
      container.appendChild(el);
    });
  }

  function moveOut() {
    MOVE_IDS.forEach(id => {
      const el  = document.getElementById(id);
      const pos = originalPositions[id];
      if (!el || !pos) return;
      pos.nextSibling
        ? pos.parent.insertBefore(el, pos.nextSibling)
        : pos.parent.appendChild(el);
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
    moveInto();
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
      moveOut();
      return;
    }
    if (document.exitFullscreen)            document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen)  document.mozCancelFullScreen();
  }

  window.toggleModelFullscreen = function () {
    isFull() ? exitFullscreen() : enterFullscreen();
  };

  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange'].forEach(ev => {
    document.addEventListener(ev, () => {
      const full = isFull();
      setUI(full);
      if (!full) moveOut();
    });
  });

  /* Tecla F — desktop */
  document.addEventListener('keydown', e => {
    if ((e.key === 'f' || e.key === 'F') && !e.ctrlKey && !e.metaKey) {
      const modal = document.querySelector(
        '#faunaModalOverlay.open,#propModalOverlay.open,#panelModalOverlay.open,#rojoModalOverlay.open,#intervModalOverlay.open'
      );
      if (!modal) { e.preventDefault(); window.toggleModelFullscreen(); }
    }
  });

  /* Swipe abajo — móvil */
  let ty = 0, tx = 0;
  container.addEventListener('touchstart', e => {
    if (!isFull()) return;
    ty = e.touches[0].clientY;
    tx = e.touches[0].clientX;
  }, { passive: true });
  container.addEventListener('touchend', e => {
    if (!isFull()) return;
    const dy = e.changedTouches[0].clientY - ty;
    const dx = Math.abs(e.changedTouches[0].clientX - tx);
    if (dy > 80 && dx < 60) exitFullscreen();
  }, { passive: true });

})();
