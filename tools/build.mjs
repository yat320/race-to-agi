// Arma dist/ listo para servir (GitHub Pages, un hosting estático o el celular).
// Los archivos que no empiezan con <!doctype> son páginas "estilo artifact" (sin head propio) y acá se envuelven.
// Las eras del mundo abierto desde la 2 se arman acá: src/mundo/motor.html con los datos y el arte de cada era
// (src/mundo/*.js) y las amenazas en archivos propios (src/mundo/amenazas/*.js). Las listas de eras (el inicio, la
// Prehistoria y la fila de eras del motor), el link a la era siguiente y los papeles de los edificios salen de los datos de
// cada era: una era nueva es un archivo nuevo y nada más.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { loadEras, missing, shortName, obraName, toName } from './eras.mjs';
// La app instalable (PWA, octubre de 2026): el manifiesto, el color de la barra, el ícono de iPhone y el service worker.
// Va en el <head> de todas las páginas, así se puede instalar desde cualquiera (el inicio o el link directo a una era).
const PWA = '<link rel="manifest" href="manifest.webmanifest"><meta name="theme-color" content="#15131b"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><link rel="apple-touch-icon" href="icons/apple-180.png">' +
  '<script>if("serviceWorker"in navigator&&location.protocol!=="file:")addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));</script>';
const withPWA = html => html.replace(/<head>/i, '<head>' + PWA);
const WRAP = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>[hidden]{display:none!important}body{margin:0}</style></head><body>';
const ERAS = loadEras();
if (missing(ERAS).length) console.warn('Aviso: faltan las eras ' + missing(ERAS).join(', ') + ' (la de antes no pasa a la de después y el inicio las saltea).');
const fill = (src, key, val, file) => {
  if (src.split(key).length !== 2) throw new Error(file + ': tiene que tener ' + key + ' una sola vez');
  return src.replace(key, () => val);
};

// Las eras para el inicio (la Prehistoria está escrita en index.html) y los nombres cortos para la fila de eras.
const MUNDO = JSON.stringify(ERAS.map(e => ({ n: e.n, name: e.ERA.nombreInicio || e.ERA.name, obra: obraName(e.ERA), file: 'mundo' + e.n + '.html', save: 'rtagi-mundo' + e.n + '-v1' })));
const NAMES = JSON.stringify(ERAS.map(e => shortName(e.ERA)));
// Qué papel cumple cada edificio cuando la ciudad pasa a una era que no lo tiene (ROLE en el motor, que manda para las eras
// hasta la 16): el que dice `role`, y desde la era 17 el que se deduce de lo que hace (el de ideas de la era, el que
// potencia granjas, la defensa, el depósito, el que da mineral, ideas o monedas). Sin papel queda como monumento.
// Los básicos están en todas las eras y no necesitan papel.
const BASE = new Set(['casa', 'granja', 'fogata', 'aserradero', 'cantera', 'granero', 'herreria', 'cuartel', 'monumento']);
const roleOf = (b, E) => b.role || (E.n <= 16 || BASE.has(b.id) ? null : b.id === E.ideaBuild ? 'ideaBuild' : b.id === E.farmBuild ? 'farmBuild' : E.defense && b.id === E.defense.id ? 'defense' :
  b.id === E.storage.id ? 'storage' : b.prod && b.prod[E.ore.id] ? 'ore' : b.prod && b.prod.ideas ? 'ideas' : b.prod && b.prod.monedas ? 'monedas' : null);
const ROLES = {};
for (const e of ERAS) for (const b of e.ERA.builds) { const r = roleOf(b, e.ERA); if (r) ROLES[b.id] = r; }

mkdirSync('dist', { recursive: true });
for (const f of readdirSync('.').filter(f => f.endsWith('.html'))) {
  let src = readFileSync(f, 'utf8');
  if (f === 'index.html') src = fill(src, '/*@mundo*/[]', MUNDO, f);
  if (f === 'mundo.html') src = fill(src, '/*@eras*/[]', NAMES, f);
  const out = src.trimStart().toLowerCase().startsWith('<!doctype') ? src : WRAP + src + '</body></html>';
  writeFileSync('dist/' + f, withPWA(out));
  console.log('dist/' + f, out.length, 'bytes');
}

// Mundo abierto: cada era tiene sus datos arriba y su arte abajo de la marca; van a /*@datos*/ y /*@arte*/ del motor.
const AMENAZAS = readdirSync('src/mundo/amenazas').filter(f => f.endsWith('.js')).sort()
  .map(f => '// ---- src/mundo/amenazas/' + f + '\n' + readFileSync('src/mundo/amenazas/' + f, 'utf8').trim()).join('\n');
let motor = readFileSync('src/mundo/motor.html', 'utf8');
motor = fill(motor, '/*@amenazas*/', AMENAZAS, 'src/mundo/motor.html');
motor = fill(motor, '/*@eras*/[]', NAMES, 'src/mundo/motor.html');
motor = fill(motor, '/*@papeles*/{}', JSON.stringify(ROLES), 'src/mundo/motor.html');
for (const e of ERAS) {
  const page = 'mundo' + e.n + '.html';
  if (existsSync(page)) throw new Error(page + ' está en la raíz y también sale de src/mundo/' + e.f + ': dejá uno solo');
  const nx = ERAS.find(x => x.n === e.n + 1), next = nx ? JSON.stringify({ file: 'mundo' + nx.n + '.html', to: toName(nx.ERA) }) : 'null';
  let out = fill(motor, '/*@siguiente*/null', next, 'src/mundo/motor.html');
  out = fill(out, '/*@datos*/', e.datos, 'src/mundo/motor.html');
  out = fill(out, '/*@arte*/', e.arte, 'src/mundo/motor.html');
  writeFileSync('dist/' + page, withPWA(out));
  console.log('dist/' + page, out.length, 'bytes (src/mundo/' + e.f + ')');
}

// Juegos aparte con el mismo motor (src/ia/: la carrera de la IA). Cada etapa dice arriba sobre qué era del mundo abierto se
// arma (`// base: ia.js`): sus datos van después de los de esa era (y los cambian) y su arte después del arte de esa era.
// Salen como dist/ia1.html, ia2.html…; no entran en el inicio del mundo abierto ni en el bot o la huella.
if (existsSync('src/ia')) for (const f of readdirSync('src/ia').filter(f => /^etapa\d+\.js$/.test(f)).sort()) {
  const src = readFileSync('src/ia/' + f, 'utf8'), base = (src.match(/^\/\/ base: (\S+)/m) || [])[1];
  const b = ERAS.find(e => e.f === base);
  if (!b) throw new Error('src/ia/' + f + ': falta "// base: <era>.js" con una era de src/mundo');
  const MARK = '/* ---------- arte de la era ---------- */';
  if (!src.includes(MARK)) throw new Error('src/ia/' + f + ': falta la marca del arte');
  const [datos, arte] = src.split(MARK), page = 'ia' + f.match(/\d+/)[0] + '.html';
  let out = fill(motor, '/*@siguiente*/null', 'null', 'src/mundo/motor.html');
  out = fill(out, '/*@datos*/', b.datos + '\n' + datos.trim(), 'src/mundo/motor.html');
  out = fill(out, '/*@arte*/', b.arte + '\n' + arte.trim(), 'src/mundo/motor.html');
  writeFileSync('dist/' + page, withPWA(out));
  console.log('dist/' + page, out.length, 'bytes (src/ia/' + f + ' sobre src/mundo/' + base + ')');
}

// Lo estático de la app (public/: el manifiesto y los íconos) va tal cual; el service worker lleva la versión: un resumen de
// todo lo publicado, así cada versión nueva estrena su caché y la vieja se borra.
const copyDir = (from, to) => { mkdirSync(to, { recursive: true }); for (const f of readdirSync(from, { withFileTypes: true })) {
  if (f.isDirectory()) copyDir(from + '/' + f.name, to + '/' + f.name); else writeFileSync(to + '/' + f.name, readFileSync(from + '/' + f.name)); } };
copyDir('public', 'dist');
{ const h = createHash('sha256'); for (const f of readdirSync('dist').filter(f => f.endsWith('.html')).sort()) h.update(readFileSync('dist/' + f));
  const v = h.digest('hex').slice(0, 12);
  writeFileSync('dist/sw.js', fill(readFileSync('src/sw.js', 'utf8'), '/*@version*/', v, 'src/sw.js'));
  console.log('dist/sw.js versión ' + v); }
