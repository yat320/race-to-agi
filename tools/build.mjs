// Arma dist/ listo para servir (GitHub Pages, un hosting estático o el celular).
// Los archivos que no empiezan con <!doctype> son páginas "estilo artifact" (sin head propio) y acá se envuelven.
// Las eras 2 a 15 del mundo abierto se arman acá: src/mundo/motor.html con los datos y el arte de cada era (src/mundo/*.js).
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
const WRAP = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>[hidden]{display:none!important}body{margin:0}</style></head><body>';
mkdirSync('dist', { recursive: true });
for (const f of readdirSync('.').filter(f => f.endsWith('.html'))) {
  const src = readFileSync(f, 'utf8');
  const out = src.trimStart().toLowerCase().startsWith('<!doctype') ? src : WRAP + src + '</body></html>';
  writeFileSync('dist/' + f, out);
  console.log('dist/' + f, out.length, 'bytes');
}

// Mundo abierto: cada era tiene sus datos arriba y su arte abajo de la marca; van a /*@datos*/ y /*@arte*/ del motor.
const MARK = '/* ---------- arte de la era ---------- */';
const motor = readFileSync('src/mundo/motor.html', 'utf8');
for (const f of readdirSync('src/mundo').filter(f => f.endsWith('.js')).sort()) {
  const src = readFileSync('src/mundo/' + f, 'utf8'), n = (src.match(/\bn:(\d+),/) || [])[1];
  if (!n || !src.includes(MARK)) throw new Error('src/mundo/' + f + ': falta `n:` en ERA o la marca del arte');
  const page = 'mundo' + n + '.html';
  if (existsSync(page)) throw new Error(page + ' está en la raíz y también sale de src/mundo/' + f + ': dejá uno solo');
  const [datos, arte] = src.split(MARK);
  const out = motor.replace('/*@datos*/', () => datos.trim()).replace('/*@arte*/', () => arte.trim());
  writeFileSync('dist/' + page, out);
  console.log('dist/' + page, out.length, 'bytes (src/mundo/' + f + ')');
}
