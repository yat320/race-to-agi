// Dibuja los íconos de la app (la PWA que se instala en el celular) y los guarda en public/icons/.
// Se corre a mano cuando cambia el dibujo: node tools/iconos.mjs. Los PNG quedan en el repo.
// El dibujo es un chip en pixel art (la carrera hacia la AGI) sobre el fondo del juego, a 32×32 agrandado sin suavizar.
import { mkdirSync, writeFileSync } from 'node:fs';
import { launch } from './harness.mjs';

// El chip, armado con anillos de afuera hacia adentro, centrado en los 32×32, con patitas en los cuatro lados.
const PIX = (() => {
  const g = Array.from({ length: 32 }, () => Array(32).fill('.'));
  const rings = ['k', 'o', 'O', 'O', 'd', 's', 'S', 't', 'T', 'w', 'w', 'w'];
  for (let r = 0; r < rings.length; r++) for (let y = 6 + r; y < 26 - r; y++) for (let x = 6 + r; x < 26 - r; x++) g[y][x] = rings[r];
  for (let k = 8; k < 24; k += 2) { g[3][k] = 'k'; g[4][k] = 'p'; g[27][k] = 'p'; g[28][k] = 'k'; g[k][3] = 'k'; g[k][4] = 'p'; g[k][27] = 'p'; g[k][28] = 'k'; }
  return g.map(r => r.join(''));
})();
const PAL = { k: '#1b140a', p: '#c9ccd6', o: '#8d5b1f', O: '#dd9c40', d: '#3a2a16', s: '#1d2230', S: '#2a5a58', t: '#3aa89a', T: '#5fe3d0', w: '#e8fff9' };
const BG = '#15131b';

const b = await launch(), pg = await b.newPage();
const make = (size, pad) => pg.evaluate(([PIX, PAL, BG, size, pad]) => {
  const c = document.createElement('canvas'); c.width = c.height = size; const g = c.getContext('2d');
  g.fillStyle = BG; g.fillRect(0, 0, size, size);
  const inner = size * (1 - 2 * pad), s = inner / 32, o = size * pad;
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) { const ch = PIX[y][x]; if (PAL[ch]) { g.fillStyle = PAL[ch]; g.fillRect(Math.floor(o + x * s), Math.floor(o + y * s), Math.ceil(s), Math.ceil(s)); } }
  return c.toDataURL('image/png').split(',')[1];
}, [PIX, PAL, BG, size, pad]);
mkdirSync('public/icons', { recursive: true });
// Los "maskable" dejan margen: Android los recorta en círculo o en gota.
for (const [f, size, pad] of [['icon-192.png', 192, 0.04], ['icon-512.png', 512, 0.04], ['maskable-512.png', 512, 0.14], ['apple-180.png', 180, 0.08]]) {
  writeFileSync('public/icons/' + f, Buffer.from(await make(size, pad), 'base64'));
  console.log('public/icons/' + f);
}
await b.close();
