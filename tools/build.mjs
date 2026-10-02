// Arma dist/ listo para servir (GitHub Pages, un hosting estático o el celular).
// Los archivos que no empiezan con <!doctype> son páginas "estilo artifact" (sin head propio) y acá se envuelven.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, copyFileSync } from 'node:fs';
const WRAP = '<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><style>[hidden]{display:none!important}body{margin:0}</style></head><body>';
mkdirSync('dist', { recursive: true });
for (const f of readdirSync('.').filter(f => f.endsWith('.html'))) {
  const src = readFileSync(f, 'utf8');
  const out = src.trimStart().toLowerCase().startsWith('<!doctype') ? src : WRAP + src + '</body></html>';
  writeFileSync('dist/' + f, out);
  console.log('dist/' + f, out.length, 'bytes');
}
