/* ══════════════════════════════════════════════
   UI.JS — Eco en Bolognía
   1. Barra de progreso de carga del modelo 3D
   2. Scroll Reveal (fade-in al entrar en viewport)
══════════════════════════════════════════════ */

/* ── 1. BARRA DE PROGRESO MODEL-VIEWER ── */
(function () {
  const mv     = document.querySelector('#mv');
  const bar    = document.getElementById('modelProgressBar');
  const fill   = document.getElementById('modelProgressFill');
  const pct    = document.getElementById('modelProgressPct');
  const poster = document.getElementById('modelPosterText');

  if (!mv || !bar) return;

  mv.addEventListener('progress', e => {
    const p = Math.round((e.detail.totalProgress || 0) * 100);
    fill.style.width = p + '%';
    if (pct) pct.textContent = p + '%';
    if (poster) poster.textContent = p < 100 ? 'Cargando modelo… ' + p + '%' : 'Listo';
  });

  mv.addEventListener('load', () => {
    bar.style.opacity = '0';
    bar.style.transform = 'translateY(-8px)';
    setTimeout(() => { bar.style.display = 'none'; }, 500);
  });

  /* Si el modelo ya estaba en caché y carga sin emitir progress */
  mv.addEventListener('model-visibility', () => {
    bar.style.display = 'none';
  });
})();


/* ── 2. SCROLL REVEAL ── */
(function () {
  /* Elementos a animar — los que NO son el hero ni el modelo */
  const TARGETS = [
    /* sección fauna */
    '.fauna-header',
    '.fauna-card',
    /* sección propuestas */
    '.propuestas-header',
    '.prop-card',
    /* sección paneles */
    '.paneles-header',
    '.panel-thumb',
    /* sección acerca/footer */
    'footer',
  ];

  /* Estilos iniciales — invisible y desplazado hacia abajo */
  const style = document.createElement('style');
  style.textContent = `
    .sr-hidden {
      opacity: 0;
      transform: translateY(28px);
      transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                  transform 0.55s cubic-bezier(0.22,1,0.36,1);
    }
    .sr-visible {
      opacity: 1 !important;
      transform: none !important;
    }
    /* delay escalonado para grillas */
    .sr-hidden:nth-child(2) { transition-delay: 0.08s; }
    .sr-hidden:nth-child(3) { transition-delay: 0.16s; }
    .sr-hidden:nth-child(4) { transition-delay: 0.24s; }
    .sr-hidden:nth-child(5) { transition-delay: 0.32s; }
    .sr-hidden:nth-child(6) { transition-delay: 0.40s; }
    .sr-hidden:nth-child(n+7) { transition-delay: 0.48s; }

    @media (prefers-reduced-motion: reduce) {
      .sr-hidden { opacity: 1 !important; transform: none !important; transition: none !important; }
    }
  `;
  document.head.appendChild(style);

  /* Aplicar clase inicial una vez que el DOM está listo */
  document.addEventListener('DOMContentLoaded', () => {
    TARGETS.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('sr-hidden');
      });
    });

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          io.unobserve(entry.target); /* solo anima una vez */
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll('.sr-hidden').forEach(el => io.observe(el));
  });
})();
