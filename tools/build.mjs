// Arma dist/ listo para servir (GitHub Pages, un hosting estático o el celular).
// Los archivos que no empiezan con <!doctype> son páginas "estilo artifact" (sin head propio) y acá se envuelven.
// Las eras del mundo abierto desde la 2 se arman acá: src/mundo/motor.html con los datos y el arte de cada era
// (src/mundo/*.js) y las amenazas en archivos propios (src/mundo/amenazas/*.js). Las listas de eras (el inicio, la
// Prehistoria y la fila de eras del motor), el link a la era siguiente y los papeles de los edificios salen de los datos de
// cada era: una era nueva es un archivo nuevo y nada más.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { loadEras, missing, shortName, obraName, toName } from './eras.mjs';
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
  writeFileSync('dist/' + f, out);
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
  writeFileSync('dist/' + page, out);
  console.log('dist/' + page, out.length, 'bytes (src/mundo/' + e.f + ')');
}
