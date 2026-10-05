// Lee las eras del mundo abierto desde src/mundo/*.js: cada archivo tiene sus datos (`const ERA={...}`) arriba de la
// marca del arte. Lo usan el build (arma las listas de eras, los papeles de los edificios y el link a la era siguiente),
// el bot y la huella, así una era nueva no hay que anotarla a mano en ningún lado.
import { readFileSync, readdirSync } from 'node:fs';

export const MARK = '/* ---------- arte de la era ---------- */';

// Evalúa los datos de una era sin el motor: lo que no es de JavaScript (st, vil, gridTip…) es un comodín que no hace nada,
// porque los datos solo lo usan adentro de funciones que acá no se llaman.
const ANY = new Proxy(function () {}, { get: (t, k) => k === Symbol.toPrimitive ? () => 0 : ANY, apply: () => ANY });
const SCOPE = new Proxy({}, { has: (t, k) => k !== 'ERA', get: (t, k) => k === Symbol.unscopables ? undefined : k in globalThis ? globalThis[k] : ANY });
function evalEra(datos, f) {
  try { return new Function('scope', 'with(scope){' + datos + '\nreturn ERA;}')(SCOPE); }
  catch (e) { throw new Error('src/mundo/' + f + ': no se pueden leer los datos de la era (' + e.message + ')'); }
}

// Nombre corto (el de la fila de eras): "Era cósmica" → "Cósmica"; "AGI" queda igual. ERA.short lo pisa.
export const shortName = E => E.short || (s => s[0].toUpperCase() + s.slice(1))(E.name.replace(/^Era /, ''));
// La obra final es el último invento: "La puerta al multiverso" → "la puerta al multiverso". ERA.obra lo pisa.
export const obraName = E => E.obra || (s => s[0].toLowerCase() + s.slice(1))(E.techs.at(-1).name);
// "de la era cósmica" → "a la era cósmica"; "del Renacimiento" → "al Renacimiento".
export const toName = E => E.de.replace(/^del /, 'al ').replace(/^de /, 'a ');

export function loadEras(dir = 'src/mundo') {
  const out = [];
  for (const f of readdirSync(dir).filter(f => f.endsWith('.js')).sort()) {
    const src = readFileSync(dir + '/' + f, 'utf8');
    if (!src.includes(MARK)) throw new Error(dir + '/' + f + ': falta la marca del arte (' + MARK + ')');
    const [datos, arte] = src.split(MARK), ERA = evalEra(datos, f);
    if (!ERA || !(ERA.n > 1)) throw new Error(dir + '/' + f + ': falta `n:` en ERA');
    out.push({ f, n: ERA.n, ERA, datos: datos.trim(), arte: arte.trim() });
  }
  out.sort((a, b) => a.n - b.n);
  for (let i = 1; i < out.length; i++) if (out[i].n === out[i - 1].n) throw new Error(dir + ': ' + out[i - 1].f + ' y ' + out[i].f + ' tienen los dos n:' + out[i].n);
  return out;
}

// Los números que faltan entre la 2 y la última (mientras se arma una era en paralelo con la anterior, puede faltar una).
export function missing(eras) {
  const have = new Set(eras.map(e => e.n)), out = [];
  for (let n = 2; n < eras.at(-1).n; n++) if (!have.has(n)) out.push(n);
  return out;
}
