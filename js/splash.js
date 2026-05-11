/* ══ SPLASH SCREEN — Eco en Bolognía ══ */
(function () {
  const splash = document.getElementById('splash');
  if (!splash) return;

  function hideSplash() {
    splash.classList.add('splash-out');
    setTimeout(() => { splash.style.display = 'none'; }, 700);
  }

  /* Ocultar tras cargar fonts + 1.2s mínimo para que se vea bonito */
  const minWait   = new Promise(r => setTimeout(r, 1200));
  const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
  Promise.all([minWait, fontsReady]).then(hideSplash);
})();
