// Service worker: el juego se instala como app en el celular y anda sin conexión (octubre de 2026). El build lo copia a
// dist/sw.js y pone la versión (un resumen de todo lo publicado), así cada versión nueva estrena su caché.
// - Las páginas (.html) van primero a la red, así siempre llega la última versión; sin conexión salen de la caché.
// - Lo demás (íconos, manifiesto, las fuentes de Google) sale de la caché y, si no está, de la red.
// - Al instalarse guarda el inicio y los íconos; cada era o etapa queda guardada la primera vez que la abrís.
const VERSION = '/*@version*/';
const CACHE = 'rtagi-' + VERSION;
const SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png'];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('rtagi-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const isPage = u => u.origin === location.origin && (u.pathname.endsWith('/') || u.pathname.endsWith('.html'));
self.addEventListener('fetch', e => {
  const r = e.request; if (r.method !== 'GET') return;
  const u = new URL(r.url);
  const fonts = /fonts\.(googleapis|gstatic)\.com$/.test(u.hostname);
  if (u.origin !== location.origin && !fonts) return;
  if (isPage(u)) {
    e.respondWith(fetch(r).then(res => { if (res.ok) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; })
      .catch(() => caches.match(r, { ignoreSearch: true }).then(m => m || caches.match('index.html'))));
    return;
  }
  e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => { if (res.ok || res.type === 'opaque') { const cp = res.clone(); caches.open(CACHE).then(c => c.put(r, cp)); } return res; })));
});
