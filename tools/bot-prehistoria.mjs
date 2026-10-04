// Bot de la Prehistoria del mundo abierto (mundo.html): juega la era entera y reporta en qué minuto de juego investiga cada
// invento y cuándo termina el ábaco. Sirve para ajustar el ritmo de la era con datos, como bot-mundo.mjs para las otras.
//   node tools/bot-prehistoria.mjs [corridas=3] [ritmo=1] [ignora] [sindefensa]
// Juega desde adentro de la página con ?debug: avanza el juego de a 0,1 s y cada segundo de juego decide qué hacer (comer,
// investigar, hacer herramientas, construir, trabajar en las obras, cazar y juntar lo que más falta). Los aldeanos andan
// solos en automático, como en el juego. Toca los lobos cada 3 s (`ignora`: nunca) y pone 2 antorchas y 2 cuchas con sus perros
// (`sindefensa`: nada de eso),
// como bot-mundo.mjs con las amenazas de las otras eras.
import { writeFileSync, mkdirSync } from 'node:fs';
import { serve, launch } from './harness.mjs';

const RUNS = +(process.argv[2] || 3);
const OPT = process.argv.slice(3), IGNORE = OPT.includes('ignora'), NODEF = OPT.includes('sindefensa');
const PACE = +((OPT.find(o => o.startsWith('ritmo=')) || 'ritmo=1').split('=')[1]);
const MAX_MIN = 150;

const INIT = seed => `(()=>{let a=${seed};Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  window.requestAnimationFrame=()=>1;})();`;

const BOT = String.raw`window.__bot=(function(){
const D=window.__rtagiDebug,MW=60,MH=56,$=id=>document.getElementById(id),st=()=>D.st;
const R=()=>st().res,has=t=>!!st().techs[t],obj=()=>D.obj();
const cnt=id=>D.agg.count[id]||0;
const S={techs:[],builds:{},eats:0,hunts:0,wolves:0,wait:{investigando:0,'sin ideas':0,materiales:0}};
// En qué se va el tiempo: investigando con ideas de sobra (manda la velocidad de investigación), investigando sin ideas
// (mandan las ideas que entran) o sin poder empezar el próximo invento (faltan materiales).
function tally(){const rs=st().rs;if(rs)S.wait[R().ideas>=1?'investigando':'sin ideas']++;else if(nextTech())S.wait.materiales++;}
// Qué construir, en orden: [edificio, cuántos, invento que lo habilita].
const PLAN=[['fogata',1,'fuego'],['choza',2,'refugio'],...(window.__nodef?[]:[['antorcha',2,'fuego']]),['campamento',1,'caza'],...(window.__nodef?[]:[['cucha',2,'domesticacion']]),['almacen',1,'almacen'],['puente',2,'puentes'],['taller',1,'pedernal'],
  ['cueva',1,'pinturas'],['choza',3,'refugio'],['fogata',2,'fuego'],['cultivo',3,'agricultura'],['monumento',1,'abaco']];
// Mejoras de edificios ya terminados: [edificio, hasta qué nivel].
const LEVELS=[['fogata',2],['choza',2],['cueva',2],['campamento',2],['almacen',2],['fogata',3]];
const TOOLS=['hacha','pico','canasta','lanza','sandalias'];
function nextTech(){return D.TECHS.find(t=>!has(t.id)&&t.req.every(r=>has(r)));}
function wants(){const out=[];for(const[id,n,t]of PLAN)if(has(t)&&cnt(id)<n&&!out.some(w=>w[0]===id))out.push([id,n]);return out;}
function cost(id){return D.buildCost(D.BUILDS.find(b=>b.id===id));}
// Lugares para construir: casilleros pares (así nunca forman una pared) y lejos de la orilla (para no tapar la entrada de un puente).
function spots(cx,cy,r){const out=[];for(let y=Math.max(1,cy-r);y<=Math.min(MH-2,cy+r);y++)for(let x=Math.max(1,cx-r);x<=Math.min(MW-2,cx+r);x++){
  if(x%2||y%2)continue;const d=Math.hypot(x-cx,y-cy);if(d>=2&&d<=r&&x<D.riverX[y]-2)out.push([d,x,y]);}return out.sort((a,b)=>a[0]-b[0]);}
const OKROW={};
function ok(y){if(y in OKROW)return OKROW[y];const x0=D.riverX[y],px=Math.round(D.P.x),py=Math.round(D.P.y),o=obj();
  const flint=(x,yy)=>[[1,0],[-1,0],[0,1],[0,-1],[1,1],[1,-1],[-1,1],[-1,-1]].some(([a,b])=>{const q=o[(yy+b)*MW+x+a];return q&&q.t==='flint';});
  const v=D.passable(x0-1,y)&&D.passable(x0+2,y)&&!!D.bfs(px,py,(x,yy)=>x===x0-1&&yy===y)&&!!D.bfs(x0+2,y,flint);
  // Si el primer puente ya está, la segunda fila tiene que ser la misma.
  return OKROW[y]=v;}
function place(id){if(!D.afford(cost(id)))return false;const n0=cnt(id);
  if(id==='puente'){// Dos puentes seguidos sobre el río, en la fila más cercana a la tribu.
    const rows=[];obj().forEach((q,i)=>{if(q&&q.t==='puente')rows.push((i/MW)|0);});
    const py=rows.length?rows[0]:Math.round(D.P.y);for(let dy=0;dy<(rows.length?1:MH);dy++)for(const y of[py+dy,py-dy]){if(y<1||y>=MH-1)continue;const x0=D.riverX[y];
      // Solo donde se puede cruzar de verdad: la orilla de acá se alcanza desde la tribu y la de allá lleva al pedernal.
      if(!ok(y))continue;
      for(const x of[x0,x0+1])if(D.canPlace('puente',x,y)){D.place('puente',x,y);if(cnt(id)>n0){S.builds[id]=(S.builds[id]||0)+1;return true;}}}
    return false;}
  if(id==='antorcha'){// Después de los puentes, en el primer lugar libre de la tribu que todavía no alumbra ningún fuego (como los demás
    // edificios, cerca del centro: entre los árboles y las piedras una antorcha puede cerrar un paso).
    if(cnt('puente')<2)return false;
    for(const[,x,y]of spots(22,28,14))if(!D.scaredAt(x,y)&&Math.hypot(x-D.P.x,y-D.P.y)>=3&&D.canPlace(id,x,y)){D.place(id,x,y);if(cnt(id)>n0){S.builds[id]=(S.builds[id]||0)+1;return true;}}
    return false;}
  for(const[,x,y]of spots(22,28,14))if(D.canPlace(id,x,y)){D.place(id,x,y);if(cnt(id)>n0){S.builds[id]=(S.builds[id]||0)+1;return true;}}
  return false;}
// No gastar en mejoras lo que le falta al próximo invento (una persona tampoco gasta las pieles de la vestimenta en chozas).
function spare(c){const t=nextTech(),tc=(t&&t.cost)||{};return Object.keys(c).every(k=>!tc[k]||R()[k]-c[k]>=tc[k]);}
function build(){for(const[id]of wants())if(place(id))return true;
  for(const[id,lv]of LEVELS){const o=obj();for(let i=0;i<o.length;i++){const q=o[i];if(!q||q.t!==id||!(q.lv>0)||q.lv>=lv||q.need)continue;
    const nx=D.BUILDS.find(b=>b.id===id).lv[q.lv];if(nx&&spare(nx.c)&&D.levelUp(i))return true;}}
  return false;}
// Juntar: lo que más falta para el invento que sigue, después para lo que hay que construir y después para las herramientas.
function goals(){const g=[],t=nextTech();if(t)g.push(t.cost||{});for(const[id]of wants())g.push(cost(id));
  for(const id of TOOLS){const u=D.UPG.find(x=>x.id===id),nx=u.levels[st().upg[id]+1];if(nx&&nx.c&&(!nx.req||has(nx.req)))g.push(nx.c);}return g;}
function need(){for(const c of goals()){const miss=Object.keys(c).filter(k=>k!=='ideas'&&(c[k]||0)>R()[k]);
    if(miss.length)return miss.sort((a,b)=>(c[b]-R()[b])-(c[a]-R()[a]))[0];}
  return['madera','piedra','comida'].sort((a,b)=>R()[a]-R()[b])[0];}
function hunt(){const L=st().upg.lanza,px=Math.round(D.P.x),py=Math.round(D.P.y);let best=null,bd=1e9;
  for(const a of D.anim){const A=D.ANIM[a.kind];if(A.req>L)continue;const d=Math.hypot(a.x-D.P.x,a.y-D.P.y);if(d>=bd)continue;
    // Solo animales a los que se llega caminando (no los del otro lado del río sin puente).
    const ax=Math.round(a.x),ay=Math.round(a.y);if(!D.bfs(px,py,(x,y)=>Math.max(Math.abs(x-ax),Math.abs(y-ay))<=1))continue;bd=d;best=a;}
  if(!best)return false;D.onTap(Math.round(best.x),Math.round(best.y),best.x*D.T+8,best.y*D.T+8);S.hunts++;return true;}
function gather(){const P=D.P;if(P.task||P.act||P.hunt||P.path.length)return;
  // Primero, si hay una obra sin terminar, trabajar en ella.
  const o=obj();let wi=-1,wd=1e9;for(let i=0;i<o.length;i++){if(!D.canWork(o[i]))continue;const d=Math.hypot(i%MW-P.x,((i/MW)|0)-P.y);if(d<wd){wd=d;wi=i;}}
  if(wi>=0&&(D.vil.length<3||o[wi].t==='monumento')){D.onTap(wi%MW,(wi/MW)|0);return;}
  const k=need();if(k==='pieles'){if(hunt())return;}
  let best=-1,bd=1e9;for(let i=0;i<o.length;i++){const q=o[i],c=q&&D.RES[q.t];if(!c||c.give!==k||st().time-(FAR.get(i)??-1e9)<60||!D.canGather(q,'p'))continue;const d=Math.hypot(i%MW-P.x,((i/MW)|0)-P.y);if(d<bd){bd=d;best=i;}}
  // Lo que no se alcanza (sin camino) no se vuelve a intentar por un minuto (puede haber un puente en obra).
  if(best>=0){D.onTap(best%MW,(best/MW)|0);if(!P.task&&!P.act&&!P.path.length)FAR.set(best,st().time);}else if(wi>=0)D.onTap(wi%MW,(wi/MW)|0);}
const FAR=new Map();
let tick=0;const PACE=window.__pace||1;
// Los lobos que vienen se tocan para espantarlos.
function wolves(){for(const w of D.wolves)if(!(w.wait>0)&&w.state!=='flee'){D.onTap(Math.round(w.x),Math.round(w.y),w.x*D.T+8,w.y*D.T+8);S.wolves++;}}
function step(){tick++;
  if(tick%(3*PACE)===0&&!window.__ignore)wolves();
  if(tick%PACE)return;
  if(st().energy<30&&R().comida>=1){D.eat();S.eats++;}
  if(!st().rs){const t=nextTech();if(t&&D.afford(t.cost||{})){D.startResearch(t.id);}}
  for(const id of TOOLS){const u=D.UPG.find(x=>x.id===id),nx=u.levels[st().upg[id]+1];if(nx&&nx.c&&(id==='hacha'||id==='pico'||spare(nx.c)))D.tool(id);}
  for(let k=0;k<2&&build();k++);
  gather();}
let last=null;
return{run(maxMin){$('modalCard').querySelector('[data-m=start]')?.click();
    while(!st().won&&st().time<maxMin*60){for(let k=0;k<10;k++)D.update(0.1);
      for(const t of D.TECHS)if(has(t.id)&&!S.techs.some(x=>x[0]===t.id))S.techs.push([t.id,Math.round(st().time)]);tally();step();}
    return{won:st().won,min:Math.round(st().time/6)/10,vil:D.vil.length,techs:S.techs,wait:S.wait,builds:S.builds,eats:S.eats,hunts:S.hunts,wolves:S.wolves,pin:Math.round(D.wolfPinT),lost:D.wolfLost,dogs:D.st.dogScares||0,ideas:Math.round(R().ideas),upg:Object.assign({},st().upg),res:Object.fromEntries(Object.entries(R()).map(([k,v])=>[k,Math.round(v)])),count:Object.assign({},D.agg.count),rs:st().rs,P:[Math.round(D.P.x),Math.round(D.P.y)],busy:{task:D.P.task,act:D.P.act,hunt:!!D.P.hunt,path:D.P.path.length},far:FAR.size,need:need(),next:(nextTech()||{}).id};}};
})();`;

mkdirSync('out', { recursive: true });
// BOT_DIST sirve otra carpeta (por ejemplo, una copia con los números de antes) para comparar.
const srv = await serve(process.env.BOT_DIST || 'dist'), b = await launch(), all = [], errs = [];
try {
  for (let run = 1; run <= RUNS; run++) {
    const ctx = await b.newContext({ viewport: { width: 400, height: 850 }, isMobile: true, hasTouch: true });
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    await ctx.addInitScript(INIT(run * 7919));
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.goto(srv.url + '/index.html');
    await p.evaluate(() => localStorage.clear());
    await p.goto(srv.url + '/mundo.html?debug');
    await p.evaluate(([k, ig, nd]) => { window.__pace = k; window.__ignore = ig; window.__nodef = nd; }, [PACE, IGNORE, NODEF]);
    await p.evaluate(BOT);
    const t0 = Date.now(), r = await p.evaluate(m => window.__bot.run(m), MAX_MIN);
    r.run = run; all.push(r);
    console.log('corrida ' + run + (r.won ? ' · terminada en ' + r.min + ' min' : ' · sin terminar a los ' + r.min + ' min') + ' · ' + r.vil + ' aldeanos · ' + r.techs.length + ' inventos · ' +
      r.hunts + ' cacerías · ' + r.wolves + ' lobos espantados (' + r.dogs + ' por los perros) · ' + r.pin + ' s con alguien acorralado · ' + r.lost + ' aldeanos se fueron por los lobos (' + ((Date.now() - t0) / 1000).toFixed(0) + ' s)');
    await ctx.close();
  }
} finally { await b.close(); srv.close(); }

writeFileSync('out/bot-prehistoria' + (PACE > 1 ? '-ritmo' + PACE : '') + (IGNORE ? '-ignora' : '') + (NODEF ? '-sindefensa' : '') + '.json', JSON.stringify(all, null, 1));
// Minuto promedio en que se investiga cada invento (entre las corridas que lo lograron).
const ids = [...new Set(all.flatMap(r => r.techs.map(t => t[0])))];
console.log('\ninvento               minuto (promedio)');
for (const id of ids) { const ts = all.map(r => (r.techs.find(t => t[0] === id) || [])[1]).filter(v => v != null); console.log(id.padEnd(20) + (ts.reduce((a, c) => a + c, 0) / ts.length / 60).toFixed(1).padStart(8) + (ts.length < all.length ? '  (' + ts.length + ' de ' + all.length + ')' : '')); }
const ok = all.filter(r => r.won).map(r => r.min);
const W={};for(const r of all)for(const k in r.wait)W[k]=(W[k]||0)+r.wait[k];
console.log('\nen qué se va el tiempo (minutos por corrida): '+Object.entries(W).map(([k,v])=>k+' '+(v/60/all.length).toFixed(1)).join(' · '));
console.log('\nábaco: ' + ok.length + ' de ' + all.length + (ok.length ? ' · mín ' + Math.min(...ok) + ' · prom ' + (ok.reduce((a, c) => a + c, 0) / ok.length).toFixed(1) + ' · máx ' + Math.max(...ok) + ' min' : ''));
console.log(errs.length + ' errores de página' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
if (errs.length) process.exitCode = 1;
