// Calibra los relojes de los capítulos con lo que tardó el bot (octubre de 2026, al llevar los capítulos a todas las eras).
// Lee el reporte del bot (por defecto out/bot-mundo.json, el de las eras encadenadas) y, para cada era con capítulos, toma
// cuánto tardó en cada uno (el promedio de las corridas) y propone ★★★ ≈ 2× y ★★ ≈ 3×, como en las misiones, redondeado a
// 15 s y con un mínimo de 60 s para ★★★ (un capítulo que el bot cumple al toque, porque la ciudad ya lo traía, igual tiene que
// dar tiempo a una persona) y 30 s de diferencia hasta ★★.
//   node tools/calibrar-capitulos.mjs [reporte.json]            muestra la tabla
//   node tools/calibrar-capitulos.mjs [reporte.json] escribir   además cambia oro y plata en cada src/mundo/<era>.js que
//                                                                tenga los provisorios (120/180 en todos)
//   … escribir todas                                             también en las que ya estaban calibradas
import { readFileSync, writeFileSync } from 'node:fs';
import { loadEras } from './eras.mjs';

const args = process.argv.slice(2), WRITE = args.includes('escribir'), file = args.find(a => a.endsWith('.json')) || 'out/bot-mundo.json';
const runs = JSON.parse(readFileSync(file, 'utf8')), eras = loadEras();
const r15 = s => Math.round(s / 15) * 15;
for (const e of eras) {
  const caps = e.ERA.capitulos;if (!caps) continue;
  const rs = runs.filter(r => r.n === e.n && r.cap && r.won);
  if (!rs.length) { console.log(`era ${e.n}: sin corridas ganadas en ${file}`); continue; }
  const rows = caps.map((c, i) => {
    const ds = rs.map(r => r.cap.d[i]).filter(d => d != null), avg = ds.reduce((a, b) => a + b, 0) / (ds.length || 1);
    const oro = Math.max(60, r15(2 * avg)), plata = Math.max(oro + 30, r15(3 * avg));
    return { name: c.name, ds, avg: Math.round(avg), oro, plata, before: [c.oro, c.plata] };
  });
  console.log(`era ${e.n} ${e.ERA.name} (${rs.length} corridas)`);
  for (const r of rows) console.log(`  ${r.name.padEnd(28)} bot ${r.ds.join('/').padEnd(14)} prom ${String(r.avg).padStart(4)} s → ★★★ ${r.oro} ★★ ${r.plata} (antes ${r.before.join('/')})`);
  if (!WRITE || !args.includes('todas') && !caps.every(c => c.oro === 120 && c.plata === 180)) continue;
  // Reemplaza en orden cada `oro:N,plata:M` adentro del bloque `capitulos:[` de la era.
  let src = readFileSync('src/mundo/' + e.f, 'utf8');const at = src.indexOf('capitulos:[');if (at < 0) { console.log('  (no encontré capitulos:[ en ' + e.f + ')'); continue; }
  let k = 0;const head = src.slice(0, at), tail = src.slice(at).replace(/oro:\d+,plata:\d+/g, m => k < rows.length ? `oro:${rows[k].oro},plata:${rows[k++].plata}` : m);
  writeFileSync('src/mundo/' + e.f, head + tail);console.log(`  escrito en src/mundo/${e.f} (${k} capítulos)`);
}
