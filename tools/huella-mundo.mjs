// Huella del mundo abierto (eras 2 a 10): juega un guion fijo con el azar sembrado, el reloj congelado y los
// cuadros controlados, y guarda el estado, los textos, los sprites y capturas de cada era en una carpeta.
// Sirve para comprobar que un cambio en el motor no cambia nada: correrlo antes y después, y comparar con
// `node tools/huella-mundo.mjs comparar <antes> <después>`.
//   node tools/huella-mundo.mjs <carpeta> [eras, ej. 2,5,10]
import { mkdirSync, writeFileSync, readFileSync, readdirSync, existsSync } from 'node:fs';
import { serve, launch } from './harness.mjs';

const ERAS = {
  2: { techs: ['metalurgia', 'escritura', 'moneda', 'irrigacion', 'navegacion', 'matematica', 'astronomia', 'engranajes', 'anticitera'], builds: ['casa', 'granja', 'fogata', 'aserradero', 'deposito', 'herreria', 'cantera', 'templo', 'mercado', 'acueducto', 'puerto', 'biblioteca'] },
  3: { techs: ['forja', 'monasterios', 'gremios', 'molinos', 'rutas', 'universidades', 'anteojos', 'reloj', 'imprenta'], builds: ['casa', 'granja', 'fogata', 'aserradero', 'granero', 'herreria', 'cantera', 'monasterio', 'feria', 'molino', 'puerto', 'universidad'] },
  4: { techs: ['perspectiva', 'mineria', 'banca', 'botanica', 'carabelas', 'academias', 'telescopio', 'mecanica', 'pascalina'], builds: ['casa', 'granja', 'fogata', 'aserradero', 'granero', 'herreria', 'cantera', 'taller', 'banco', 'jardin', 'puerto', 'academia'] },
  5: { techs: ['vapor', 'quimica', 'telar', 'ferrocarril', 'barcos', 'exposiciones', 'gas', 'tarjetas', 'analitica'], builds: ['casa', 'granja', 'fogata', 'aserradero', 'granero', 'parque', 'herreria', 'cantera', 'mina', 'laboratorio', 'fabrica', 'estacion', 'puerto', 'palacio'] },
  6: { techs: ['dinamo', 'motor', 'lamparita', 'frio', 'hidro', 'escuelas', 'telefono', 'valvulas', 'tabuladora'], builds: ['casa', 'granja', 'fogata', 'aserradero', 'granero', 'parque', 'herreria', 'cantera', 'usina', 'poste', 'represa', 'fabrica', 'laboratorio', 'frigorifico', 'escuela'], near: { usina: ['fabrica', 'laboratorio', 'frigorifico', 'escuela'] } },
  7: { techs: ['eniac', 'tractor', 'transistor', 'lenguajes', 'satelite', 'universidades', 'depuracion', 'circuito', 'micro'], builds: ['casa', 'granja', 'fogata', 'aserradero', 'granero', 'parque', 'usina', 'poste', 'represa', 'herreria', 'cantera', 'computadora', 'oficina', 'galpon', 'universidad'], near: { usina: ['computadora', 'oficina', 'universidad'] } },
  8: { techs: ['www', 'biotec', 'comercio', 'email', 'firewall', 'buscadores', 'antivirus', 'banda', 'smartphone'], builds: ['casa', 'granja', 'fogata', 'aserradero', 'granero', 'servidor', 'herreria', 'cantera', 'cibercafe', 'tienda', 'semillas', 'buscador'], antenas: true },
  9: { techs: ['redes', 'vertical', 'robotica', 'software', 'alineacion', 'lenguaje', 'interpretabilidad', 'chips', 'asistente'], builds: ['casa', 'granja', 'fogata', 'aserradero', 'granero', 'herreria', 'cantera', 'datacenter', 'fabrob', 'startup', 'huerta', 'seguridad', 'labia'] },
  10: { techs: ['computo', 'seguridad', 'productos', 'automatizacion', 'diplomacia', 'ciencia', 'tratado', 'escalado', 'agi'], builds: ['casa', 'granja', 'fogata', 'aserradero', 'granero', 'herreria', 'cantera', 'supercomp', 'labseg', 'empresa', 'agro', 'embajada', 'instituto'] },
};
const PREV = { 2: 'rtagi-mundo-v1' }; for (let n = 3; n <= 10; n++) PREV[n] = 'rtagi-mundo' + (n - 1) + '-v1';
const PERKS = ['abaco', 'rueda', 'agricultura', 'anticitera', 'irrigacion', 'imprenta', 'molinos', 'pascalina', 'botanica', 'analitica', 'ferrocarril', 'tabuladora', 'frio', 'micro', 'tractor', 'smartphone', 'biotec', 'asistente', 'vertical', 'interpretabilidad'];
const prevSave = n => { const techs = Object.fromEntries(PERKS.map(t => [t, true])), vil = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
  return JSON.stringify(n === 2 ? { st: { won: true, res: { ideas: 120 }, techs }, vil, obj: [] } : { v: 1, won: true, vil, res: { ideas: 150, monedas: 60 }, techs, obj: [] }); };

// Azar sembrado, reloj congelado y cuadros a mano: la página no corre sola.
const INIT = `(()=>{let a=12345;Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  let now=1000;performance.now=()=>now;window.__q=[];window.requestAnimationFrame=cb=>{window.__q.push(cb);return 1;};
  window.__step=t=>{now=t;const q=window.__q;window.__q=[];for(const cb of q)cb(t);};})();`;

// Ayudas que corren dentro de la página (usan solo lo que todas las eras exponen con ?debug).
const HELP = `window.__H={t:2000,step(n){for(let k=0;k<(n||2);k++){this.t+=200;__step(this.t);}},
  get D(){return window.__rtagiDebug;},
  fill(){const r=this.D.st.res;for(const k in r)if(k!=='ideas')r[k]=Math.max(r[k],140);r.ideas=Math.max(r.ideas,3000);},
  research(id){this.fill();document.getElementById('bTech').click();const b=document.querySelector('[data-tech="'+id+'"]');const ok=!!b&&!b.disabled;if(ok)b.click();const c=document.getElementById('sheetClose');if(c&&!document.getElementById('sheet').hidden)c.click();return ok;},
  pos:{},
  place(id,pred){this.fill();document.getElementById('bBuild').click();const b=document.querySelector('[data-build="'+id+'"]');if(!b||b.disabled){document.getElementById('sheetClose').click();return null;}b.click();
    const D=this.D,o=D.obj(),px=Math.round(D.P.x),py=Math.round(D.P.y),c=[];for(let y=0;y<64;y++)for(let x=0;x<64;x++)c.push([Math.abs(x-px)+Math.abs(y-py),y,x]);
    c.sort((a,b)=>a[0]-b[0]||a[1]-b[1]||a[2]-b[2]);const cnt=()=>o.filter(q=>q&&q.t===id).length,n0=cnt();
    for(const[dd,y,x]of c){if(dd<2||o[y*64+x]||(pred&&!pred(x,y)))continue;D.onTap(x,y);if(cnt()>n0){(this.pos[id]=this.pos[id]||[]).push([x,y]);return[x,y];}}
    const pc=document.getElementById('placeCancel');if(pc)pc.click();return null;},
  near(id,r){return(x,y)=>(this.pos[id]||[]).some(([a,b])=>Math.hypot(a-x,b-y)<=r);},
  // Antenas desde el servidor hasta la ciudad más cercana.
  antenas(){const D=this.D,o=D.obj(),S=(this.pos.servidor||[])[0];if(!S)return 0;let city=null,bd=1e9;
    o.forEach((q,i)=>{if(q&&q.t==='ciudad'){const x=i%64,y=(i/64)|0,d=Math.hypot(x-S[0],y-S[1]);if(d<bd){bd=d;city=[x,y];}}});if(!city)return 0;
    let n=0;for(;n<8;n++){const nodes=[S].concat(this.pos.antena||[]);let from=null,fd=1e9;for(const p of nodes){const d=Math.hypot(p[0]-city[0],p[1]-city[1]);if(d<fd){fd=d;from=p;}}
      if(fd<=5)break;const P=this.place('antena',(x,y)=>Math.hypot(x-from[0],y-from[1])<=4.8&&Math.hypot(x-city[0],y-city[1])<fd-2);if(!P)break;}return n;},
  threats(){const D=this.D,o=D.obj();let n=0;
    const i=o.findIndex(q=>q&&q.bug);if(i>=0){D.onTap(i%64,(i/64)|0);n++;}
    if(D.viruses){const v=D.viruses()[0];if(v){D.onTap(Math.round(v.x),Math.round(v.y));n++;}}
    const b=D.vil.find(v=>v.bad);if(b){D.onTap(Math.round(b.x),Math.round(b.y));n++;}return n;},
  gather(k){const D=this.D,o=D.obj();if(D.P.task||D.P.act)return;const ty=['tree','rock','ore','bush'][k%4],px=Math.round(D.P.x),py=Math.round(D.P.y);let best=-1,bd=1e9;
    o.forEach((q,i)=>{if(q&&q.t===ty&&q.hp>0){const d=Math.abs(i%64-px)+Math.abs(((i/64)|0)-py);if(d<bd){bd=d;best=i;}}});if(best>=0)D.onTap(best%64,(best/64)|0);},
  run(sec){const D=this.D;for(let s=0;s<sec;s++){for(let k=0;k<10;k++)D.update(0.1);if(s%15===14)this.threats();if(s%10===9)this.gather(s/10|0);
    if(D.st.energy<30){D.st.res.comida=Math.max(D.st.res.comida,5);document.getElementById('bEat').click();}}},
  // Todo el estado, con los números redondeados (y sin repetir objetos que se apuntan entre sí).
  fp(){const D=this.D,seen=new WeakSet(),j=v=>JSON.parse(JSON.stringify(v,(k,x)=>{if(typeof x==='number')return Math.round(x*1e4)/1e4;if(x&&typeof x==='object'){if(seen.has(x))return'~';seen.add(x);}return x;}));
    return{st:j(D.st),P:j(D.P),vil:j(D.vil),obj:D.obj().map((o,i)=>o?[i,j(o)]:0).filter(Boolean),vir:D.viruses?j(D.viruses()):[]};},
  // Recursos a la mitad, así se ve lo que produce y consume cada cosa (lleno, el tope lo tapa todo).
  mid(){const r=this.D.st.res;for(const k in r)r[k]=k==='ideas'?100:60;},
  sprites(){const out={};for(const k in this.D.HS){const v=this.D.HS[k],a=Array.isArray(v)?v.flat():[v];out[k]=a.map(c=>c.toDataURL());}return out;},
  html(sel){const e=document.querySelector(sel);return e?e.innerHTML:null;},
  sheet(m){document.getElementById(m==='build'?'bBuild':m==='tech'?'bTech':'bTribe').click();const h={title:this.html('#sheetTitle'),sub:this.html('#sheetSub'),body:this.html('#sheetBody')};document.getElementById('sheetClose').click();return h;},
  clean(){document.getElementById('toasts').innerHTML='';document.querySelectorAll('.flash').forEach(e=>e.classList.remove('flash'));}};`;

async function era(b, srv, n, dir, legacy) {
  const E = ERAS[n], ctx = await b.newContext({ viewport: { width: 400, height: 850 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await ctx.addInitScript(INIT);
  const p = await ctx.newPage(), errs = [];p.on('pageerror', e => errs.push(e.message));
  await p.goto(srv.url + '/index.html');
  await p.evaluate(([k, v]) => { localStorage.clear(); if (v) localStorage.setItem(k, v); }, [PREV[n], legacy ? prevSave(n) : null]);
  await p.goto(srv.url + '/mundo' + n + '.html?debug');
  await p.evaluate(HELP);
  await p.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
  const out = { errs };
  await p.evaluate(() => __H.step(3));
  out.intro = await p.evaluate(() => __H.html('#modalCard'));
  await p.screenshot({ path: dir + '/m' + n + (legacy ? 'L' : '') + '_intro.png' });
  await p.evaluate(() => { document.querySelector('[data-m=start]').click(); __H.step(2); });
  out.fp0 = await p.evaluate(() => __H.fp());
  if (legacy) { await ctx.close(); return out; }
  out.sprites = await p.evaluate(() => __H.sprites());
  // Primera tanda: los dos primeros inventos y los edificios básicos, y 3 minutos de juego.
  out.placed = {};
  for (const t of E.techs.slice(0, 2)) await p.evaluate(t => __H.research(t), t);
  for (const id of E.builds.slice(0, 5)) out.placed[id] = await p.evaluate(id => __H.place(id), id);
  await p.evaluate(() => { __H.mid(); __H.run(180); __H.step(2); });
  out.fp1 = await p.evaluate(() => __H.fp());
  // Todo el resto de los inventos (menos la obra) y los edificios.
  for (let pass = 0; pass < 3; pass++) for (const t of E.techs.slice(0, -1)) await p.evaluate(t => __H.research(t), t);
  for (const id of E.builds.slice(5)) {
    const host = E.near && Object.keys(E.near).find(h => E.near[h].includes(id));
    out.placed[id] = await p.evaluate(([id, host]) => __H.place(id, host ? __H.near(host, 3) : null), [id, host]);
    if (id === 'servidor' && E.antenas) out.antenas = await p.evaluate(() => __H.antenas());
  }
  await p.evaluate(() => { __H.mid(); __H.run(300); __H.step(2); });
  out.fp2 = await p.evaluate(() => __H.fp());
  out.save = await p.evaluate(k => localStorage.getItem(k), 'rtagi-mundo' + n + '-v1');
  out.hud = await p.evaluate(() => document.getElementById('hud').innerText);
  for (const m of ['build', 'tech', 'tribe']) out['sheet_' + m] = await p.evaluate(m => __H.sheet(m), m);
  // Amenazas a propósito, sin tocarlas durante un minuto: bicho, virus o robot desalineado.
  out.threat = await p.evaluate(n => {
    const D = __H.D, o = D.obj();
    if (n === 7) { const q = o.find(q => q && q.t === 'computadora'); if (q) { q.bug = true; q.bugAge = 0; } }
    if (n === 8) for (const c of D.grid().linked) D.spawnVirus(c);
    if (n === 9) { const v = D.vil.find(v => v.bot); if (v) D.misalign(v); }
    for (let k = 0; k < 600; k++) D.update(0.1);
    D.st.energy = 100; for (const v of D.vil) v.hungry = false; __H.step(2); __H.clean();
    return { fp: __H.fp(), hud: document.getElementById('hud').innerText };
  }, n);
  await p.screenshot({ path: dir + '/m' + n + '_amenaza.png' });
  await p.evaluate(() => { for (let k = 0; k < 6; k++) __H.threats(); __H.step(2); });
  out.threatDone = await p.evaluate(() => ({ fp: __H.fp(), hud: document.getElementById('hud').innerText }));
  await p.evaluate(() => { document.getElementById('bMenu').click(); __H.step(1); });
  out.menu = await p.evaluate(() => __H.html('#modalCard'));
  await p.evaluate(() => { document.querySelector('#modalCard [data-m=close]').click(); __H.D.st.time = 160 * 9 + 40; __H.D.st.energy = 100; __H.clean(); __H.step(2); __H.clean(); });
  await p.screenshot({ path: dir + '/m' + n + '_dia.png' });
  await p.evaluate(() => { __H.D.st.time = 160 * 9 + 150; __H.step(2); __H.clean(); });
  await p.screenshot({ path: dir + '/m' + n + '_noche.png' });
  // La obra: en la AGI hace falta la seguridad completa.
  await p.evaluate(n => { __H.D.st.time = 160 * 9 + 40; if (n === 10) __H.D.st.safety = 100; }, n);
  out.won = await p.evaluate(t => __H.research(t), E.techs.at(-1));
  if (n === 10 && !out.won) out.notWon = await p.evaluate(() => document.getElementById('toasts').innerText);
  out.win = await p.evaluate(() => __H.html('#modalCard'));
  out.fp3 = await p.evaluate(() => __H.fp());
  // En la AGI, además, la carrera perdida: el rival llega antes.
  if (n === 10) {
    await p.evaluate(() => { document.querySelector('#modalCard [data-m=close]').click(); window.__rtagiActive = 'fin'; localStorage.removeItem('rtagi-mundo10-v1'); });
    await p.reload(); await p.evaluate(HELP);
    await p.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
    out.lose = await p.evaluate(() => { __H.step(2); document.querySelector('[data-m=start]').click(); __H.D.st.rival = 99.9; for (let k = 0; k < 200 && !__H.D.st.lost; k++) __H.D.update(0.1); __H.step(2); __H.clean();
      return { html: __H.html('#modalCard'), fp: __H.fp(), hud: document.getElementById('hud').innerText }; });
    await p.screenshot({ path: dir + '/m10_perdida.png' });
  }
  await ctx.close();
  return out;
}

// Carga en cada era la partida que guardó otra corrida (la versión de antes) y anota cómo queda: así se ve que el motor
// nuevo lee las partidas viejas igual que el viejo.
async function cargar(b, srv, n, dir, from) {
  const save = JSON.parse(readFileSync(from + '/m' + n + '.json', 'utf8')).save;
  const ctx = await b.newContext({ viewport: { width: 400, height: 850 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
  await ctx.addInitScript(INIT);
  const p = await ctx.newPage(), errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(srv.url + '/index.html');
  await p.evaluate(([k, v]) => { localStorage.clear(); localStorage.setItem(k, v); }, ['rtagi-mundo' + n + '-v1', save]);
  await p.goto(srv.url + '/mundo' + n + '.html?debug');
  await p.evaluate(HELP);
  await p.addStyleTag({ content: '*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}' });
  const out = { errs };
  out.fp = await p.evaluate(() => { __H.step(3); __H.clean(); return __H.fp(); });
  out.hud = await p.evaluate(() => document.getElementById('hud').innerText);
  await p.screenshot({ path: dir + '/m' + n + '_cargada.png' });
  out.fp30 = await p.evaluate(() => { for (let k = 0; k < 300; k++) __H.D.update(0.1); return __H.fp(); });
  await ctx.close();
  return out;
}

// Lo que se tolera al comparar: campos nuevos en su valor por defecto (0, false, vacío) que antes no estaban, ceros de más
// al final de una lista (la partida guardada suma columnas) y sprites que antes no se exponían. Se cuentan aparte.
let tolerated = 0;
const isDef = v => v === 0 || v === false || v === null || (Array.isArray(v) && !v.length) || (v && typeof v === 'object' && !Array.isArray(v) && !Object.keys(v).length);
function norm(x, y) {
  if (Array.isArray(x) && Array.isArray(y)) {
    let out = y;
    if (y.length > x.length && y.slice(x.length).every(isDef) && x.every(v => typeof v !== 'object' || v === null)) { out = y.slice(0, x.length); tolerated++; }
    return out.map((v, i) => i < x.length ? norm(x[i], v) : v);
  }
  if (x && y && typeof x === 'object' && typeof y === 'object' && !Array.isArray(x) && !Array.isArray(y)) {
    const out = {};
    for (const k in y) { if (!(k in x) && isDef(y[k])) { tolerated++; continue; } out[k] = k in x ? norm(x[k], y[k]) : y[k]; }
    return out;
  }
  return y;
}
async function compare(a, b) {
  let bad = 0;
  const files = readdirSync(a).filter(f => f.endsWith('.json'));
  for (const f of files) {
    if (!existsSync(b + '/' + f)) { console.log('FALTA ' + f); bad++; continue; }
    const A = JSON.parse(readFileSync(a + '/' + f, 'utf8')), B = JSON.parse(readFileSync(b + '/' + f, 'utf8'));
    for (const k of new Set([...Object.keys(A), ...Object.keys(B)])) {
      let ya = A[k], yb = B[k];
      if (k === 'save' && ya && yb) { ya = JSON.parse(ya); yb = JSON.parse(yb); }
      if (k === 'sprites' && ya && !Object.keys(ya).length) { tolerated++; continue; }
      const x = JSON.stringify(ya), y = JSON.stringify(norm(ya, yb));
      if (x === y) continue;
      bad++;let i = 0;while (i < x?.length && x[i] === y?.[i]) i++;
      console.log('DISTINTO ' + f + ' · ' + k + ' (desde el carácter ' + i + ')\n  antes:   ' + (x || '').slice(Math.max(0, i - 60), i + 120) + '\n  después: ' + (y || '').slice(Math.max(0, i - 60), i + 120));
    }
  }
  // Capturas: píxel por píxel en el navegador.
  const pngs = readdirSync(a).filter(f => f.endsWith('.png')), br = await launch(), pg = await br.newPage();
  for (const f of pngs) {
    if (!existsSync(b + '/' + f)) { console.log('FALTA ' + f); bad++; continue; }
    const d = await pg.evaluate(async ([x, y]) => {
      const load = s => new Promise(r => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; });
      const [ia, ib] = await Promise.all([load(x), load(y)]);if (ia.width !== ib.width || ia.height !== ib.height) return -1;
      const c = document.createElement('canvas');c.width = ia.width;c.height = ia.height;const g = c.getContext('2d');
      g.drawImage(ia, 0, 0);const da = g.getImageData(0, 0, c.width, c.height).data;g.drawImage(ib, 0, 0);const db = g.getImageData(0, 0, c.width, c.height).data;
      let n = 0;for (let i = 0; i < da.length; i += 4) if (da[i] !== db[i] || da[i + 1] !== db[i + 1] || da[i + 2] !== db[i + 2]) n++;return n;
    }, [readFileSync(a + '/' + f).toString('base64'), readFileSync(b + '/' + f).toString('base64')]);
    if (d) { bad++; console.log('DISTINTA ' + f + ': ' + (d < 0 ? 'otro tamaño' : d + ' píxeles')); }
  }
  await br.close();
  console.log((bad ? bad + ' diferencias' : 'Iguales: ' + files.length + ' eras y ' + pngs.length + ' capturas') + (tolerated ? ' (' + tolerated + ' campos nuevos en su valor por defecto, tolerados)' : ''));
  if (bad) process.exitCode = 1;
}

if (process.argv[2] === 'comparar') await compare(process.argv[3], process.argv[4]);
else if (process.argv[2] === 'cargar') {
  // node tools/huella-mundo.mjs cargar <carpeta con las partidas> <salida>
  const from = process.argv[3], dir = process.argv[4]; mkdirSync(dir, { recursive: true });
  const srv = await serve(process.env.HUELLA_DIST || 'dist'), b = await launch();
  try { for (let n = 2; n <= 10; n++) { const o = await cargar(b, srv, n, dir, from); writeFileSync(dir + '/m' + n + '.json', JSON.stringify(o)); console.log('era ' + n + ' cargada · errores ' + o.errs.length); } }
  finally { await b.close(); srv.close(); }
}
else {
  const dir = process.argv[2] || 'out/huella', list = (process.argv[3] || '2,3,4,5,6,7,8,9,10').split(',').map(Number);
  mkdirSync(dir, { recursive: true });
  const srv = await serve(process.env.HUELLA_DIST || 'dist'), b = await launch();
  try {
    for (const n of list) {
      const t0 = Date.now(), o = await era(b, srv, n, dir, false), L = await era(b, srv, n, dir, true);
      o.legacyIntro = L.intro;o.legacyFp0 = L.fp0;o.errs = o.errs.concat(L.errs);
      writeFileSync(dir + '/m' + n + '.json', JSON.stringify(o));
      console.log('era ' + n + ': ' + ((Date.now() - t0) / 1000).toFixed(0) + ' s · ganada ' + o.won + ' · errores ' + o.errs.length + (o.errs.length ? ' ' + o.errs[0] : ''));
    }
  } finally { await b.close(); srv.close(); }
}
