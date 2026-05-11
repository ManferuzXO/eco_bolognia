/* ══ FULLSCREEN — Modelo 3D ══ */
(function () {

  const container = document.getElementById('modelContainer');
  const exitBtn   = document.getElementById('fsExitBtn');
  const mainBtn   = document.getElementById('modelFullscreenBtn');

  if (!container) return;

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
      return;
    }
    if (document.exitFullscreen)            document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen)  document.mozCancelFullScreen();
  }

  window.toggleModelFullscreen = function () {
    isFull() ? exitFullscreen() : enterFullscreen();
  };

  /* Sync con Escape nativo */
  ['fullscreenchange', 'webkitfullscreenchange', 'mozfullscreenchange'].forEach(ev => {
    document.addEventListener(ev, () => setUI(isFull()));
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

  /* ── Swipe hacia abajo para salir en móvil ── */
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
    /* Swipe abajo > 80px, más vertical que horizontal → salir */
    if (dy > 80 && dx < 60) exitFullscreen();
  }, { passive: true });

})();
