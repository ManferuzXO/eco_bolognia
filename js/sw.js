/* ══ SERVICE WORKER — Eco en Bolognía ══
   Requerido para que Android e iOS permitan instalar la app.
   Estrategia: Cache First para assets estáticos,
               Network First para el modelo 3D y PDFs pesados.
════════════════════════════════════════════════════════════ */

const CACHE_NAME = 'eco-bologna-v1';

/* Assets ligeros que se cachean al instalar */
const PRECACHE = [
  './',
  './index.html',
  './css/styles.css',
  './js/animales.js',
  './js/audio.js',
  './js/fauna.js',
  './js/fullscreen.js',
  './js/hotspots.js',
  './js/menu.js',
  './js/paneles.js',
  './js/propuestas.js',
  './js/splash.js',
  './js/ui.js',
  './manifest.json',
  './favicon.svg',
];

/* ── Instalar: pre-cachear assets ligeros ── */
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

/* ── Activar: limpiar caches viejos ── */
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

/* ── Fetch: Cache First para estáticos, Network First para .glb/.mp3/.pdf ── */
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  /* Archivos pesados o dinámicos → siempre red primero */
  if (url.pathname.match(/\.(glb|mp3|pdf)$/i)) {
    e.respondWith(
      fetch(e.request).catch(() => caches.match(e.request))
    );
    return;
  }

  /* Todo lo demás → caché primero, red como fallback */
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(response => {
        /* Solo cachear respuestas válidas del mismo origen */
        if (response.ok && url.origin === self.location.origin) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(c => c.put(e.request, clone));
        }
        return response;
      });
    })
  );
});
