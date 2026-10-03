// Bot del mundo abierto: juega las eras 2 a 11 una atrás de otra (cada una arranca con lo que dejó la anterior) y
// reporta cuántos minutos de juego tarda en terminar la obra de cada era. Sirve para ajustar el balance con datos.
//   node tools/bot-mundo.mjs [corridas=3] [eras=2-11 o una sola, como 3] [solo] [ritmo=1] [ignora] [sindefensa]
// Con `solo`, cada era arranca sin nada de la anterior (como si la abrieras suelta) en vez de encadenarlas.
// Con `ritmo=N` decide cada N segundos de juego en vez de cada uno (y mira las amenazas cada 3N): con 2 o 3 se parece
// más a una persona, que tarda en abrir hojas, elegir y caminar. Con `ignora` no toca nunca las amenazas (para medir cuánto
// pesan sobre alguien distraído) y con `sindefensa` no construye la defensa de la era (atalayas, escudos).
// Juega desde adentro de la página con ?debug: avanza el juego de a 0,1 s y cada segundo de juego decide qué hacer
// (tocar amenazas, comer, investigar, construir, juntar). Investiga y construye por las hojas, como una persona.
// La Antigüedad arranca con un legado típico de la Prehistoria (4 aldeanos, 50 ideas, ábaco, rueda y agricultura).
import { writeFileSync, mkdirSync } from 'node:fs';
import { serve, launch } from './harness.mjs';

const RUNS = +(process.argv[2] || 3);
const [E0, E1 = E0] = (process.argv[3] || '2-11').split('-').map(Number);
const OPT = process.argv.slice(4), SOLO = OPT.includes('solo'), IGNORE = OPT.includes('ignora'), NODEF = OPT.includes('sindefensa'), PACE = +((OPT.find(o => o.startsWith('ritmo=')) || 'ritmo=1').split('=')[1]);
const MAX_MIN = 120;
const PREHISTORIA = JSON.stringify({ v: 3, st: { won: true, res: { ideas: 50 }, techs: { abaco: true, rueda: true, agricultura: true } }, vil: [[0, 0], [0, 0], [0, 0], [0, 0]], obj: [] });

// Azar sembrado por corrida y la página quieta: el bot es el único que avanza el juego.
const INIT = seed => `(()=>{let a=${seed};Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
  window.requestAnimationFrame=()=>1;})();`;

// El bot, adentro de la página.
const BOT = String.raw`window.__bot=(function(){
const D=window.__rtagiDebug,E=D.ERA,ORE=E.ore.id,MW=64,MH=64,SP=[30,34],$=id=>document.getElementById(id);
const TYPE={madera:'tree',piedra:'rock',comida:'bush',[ORE]:'ore'},GATHER=['madera','piedra','comida',ORE];
const B={};E.builds.forEach(b=>B[b.id]=b);
const R=()=>D.st.res,has=t=>!!D.st.techs[t],cnt=id=>D.counts()[id]||0;
const afford=c=>Object.entries(c).every(([k,v])=>R()[k]>=v);
const S={taps:0,eats:0,builds:{},techs:[],safety:[],smogMax:0};
const closeAll=()=>{if(!$('sheet').hidden)$('sheetClose').click();if(!$('place').hidden)$('placeCancel').click();};
// Investigar y construir por las hojas, como una persona.
function research(id){closeAll();$('bTech').click();const b=document.querySelector('[data-tech="'+id+'"]');if(b&&!b.disabled)b.click();closeAll();
  if(has(id)){S.techs.push([id,Math.round(D.st.time)]);return true;}return false;}
// Lugares para construir: en las casillas pares, así quedan pasillos para caminar; cerca del inicio primero.
function spots(cx,cy,r,any){const out=[];for(let y=Math.max(0,cy-r);y<=Math.min(MH-1,cy+r);y++)for(let x=Math.max(0,cx-r);x<=Math.min(MW-1,cx+r);x++){
  if(!any&&(x%2||y%2))continue;const d=Math.hypot(x-cx,y-cy);if(d<=r&&d>=2)out.push([d,x,y]);}return out.sort((a,b)=>a[0]-b[0]||a[2]-b[2]||a[1]-b[1]);}
function place(id,opt){opt=opt||{};if(!afford(D.buildCost(id)))return null;closeAll();$('bBuild').click();const b=document.querySelector('[data-build="'+id+'"]');
  if(!b||b.disabled){closeAll();return null;}b.click();const n0=cnt(id),c=opt.at||SP;
  for(const[,x,y]of spots(c[0],c[1],opt.r||(B[id].water?30:16),opt.any||B[id].water)){if(!D.canPlace(id,x,y)||(opt.ok&&!opt.ok(x,y)))continue;
    D.onTap(x,y);if(cnt(id)>n0){closeAll();S.builds[id]=(S.builds[id]||0)+1;return[x,y];}}
  closeAll();return null;}
const nodes=()=>[...D.grid().on.values()].filter(n=>n.t!=='ciudad');
// Las amenazas: bichos, virus y robots desalineados. Se tocan cuando aparecen (cada 3 s de juego, como alguien atento).
function threats(){const o=D.obj();let n=0;
  for(const v of D.viruses()){D.onTap(Math.round(v.x),Math.round(v.y));n++;}
  for(const m of D.meteors().slice()){D.onTap(m.x,m.y);n++;}
  for(const p of D.pirates().slice())if(!(p.wait>0)){D.onTap(Math.round(p.x),Math.round(p.y));n++;}
  for(const w of D.swarms().slice()){D.onTap(Math.round(w.x),Math.round(w.y));n++;}
  for(const l of D.ludds().slice())if(l.state!=='home'&&!(l.wait>0)){D.onTap(Math.round(l.x),Math.round(l.y));n++;}
  for(const v of D.vil)if(v.bad){D.onTap(Math.round(v.x),Math.round(v.y));n++;}
  for(let i=0;i<o.length;i++)if(o[i]&&o[i].bug){D.onTap(i%MW,(i/MW)|0);n++;}
  S.taps+=n;}
// Qué construir y cuántos, en orden de prioridad.
function wants(){const V=D.vil.filter(v=>!v.bot).length,nT=Object.keys(D.st.techs).length,w=[];
  w.push(['granja',1+Math.floor((V+1)/4)],['aserradero',1],['casa',Math.min(4,1+Math.ceil(nT/2))]);
  if(E.grid==='data'&&B.servidor)w.push(['servidor',1]);
  if(E.grid==='power'){const els=E.builds.filter(b=>b.elec).reduce((s,b)=>s+cnt(b.id),0);
    w.push(['usina',1+Math.floor(els/6)]);if(B.represa)w.push(['represa',1]);}
  if(E.rival)w.push(['labseg',4],['embajada',2]);
  if(E.robots)w.push(['fabrob',2]);
  if(E.defense&&!window.__nodef)w.push([E.defense.id,2]);
  for(const b of E.builds){if(!b.req||w.some(x=>x[0]===b.id))continue;const p=b.prod||{};w.push([b.id,p.ideas||p.monedas?2:1]);}
  const full=['madera','piedra',ORE].some(k=>R()[k]>=D.cap(k)-5);if(full||cnt(E.storage.id)<1&&nT>=4)w.push([E.storage.id,Math.min(3,cnt(E.storage.id)+1)]);
  if(D.st.smog>12&&B.parque)w.push(['parque',Math.min(4,cnt('parque')+1)]);
  return w.filter(([id,n])=>B[id]&&!(window.__nodef&&E.defense&&id===E.defense.id)&&(!B[id].req||has(B[id].req))&&cnt(id)<n);}
function build(){for(const[id]of wants()){const b=B[id];if(!afford(D.buildCost(id)))continue;
    let opt={};
    if(b.elec){const ns=nodes();if(!ns.length)continue;opt={any:true,ok:(x,y)=>ns.some(n=>Math.hypot(n.x-x,n.y-y)<=2.9)};}
    if(place(id,opt))return true;
    if(b.elec&&B.poste){const ns=nodes();if(ns.length&&place('poste',{any:true,ok:(x,y)=>ns.some(n=>Math.hypot(n.x-x,n.y-y)<=4.4)}))return true;}}
  if(E.cities)return antenas();
  return false;}
// Internet: antenas desde el servidor hasta la ciudad sin conectar más cercana (hasta 2 ciudades).
function antenas(){const g=D.grid();if(!cnt('servidor')||g.linked.length>=2)return false;const ns=nodes();if(!ns.length)return false;
  const left=g.cities.filter(c=>!g.on.has(c.i));let best=null,bd=1e9;for(const c of left)for(const n of ns){const d=Math.hypot(c.x-n.x,c.y-n.y);if(d<bd){bd=d;best=[c,n];}}
  if(!best)return false;const[c,n]=best;
  return !!place('antena',{any:true,at:[n.x,n.y],r:5,ok:(x,y)=>Math.hypot(x-n.x,y-n.y)<=4.9&&Math.hypot(x-c.x,y-c.y)<bd-1.5});}
// Juntar lo que más falta para el próximo invento (o el próximo edificio); si no falta nada juntable, lo que menos hay.
function nextTech(){return E.techs.find(t=>!has(t.id)&&t.req.every(r=>has(r)));}
function gather(){const P=D.P;if(P.task||P.act||P.path.length)return;
  let k=null;if(R().comida<6)k='comida';
  if(!k){const t=nextTech(),goals=[t&&t.cost].concat(wants().slice(0,3).map(([id])=>D.buildCost(id))).filter(Boolean);
    for(const c of goals){const miss=GATHER.filter(r=>(c[r]||0)>R()[r]).sort((a,b)=>(c[b]-R()[b])-(c[a]-R()[a]));if(miss.length){k=miss[0];break;}}}
  if(!k)k=GATHER.filter(r=>R()[r]<D.cap(r)).sort((a,b)=>R()[a]-R()[b])[0];if(!k)return;
  const o=D.obj(),px=Math.round(P.x),py=Math.round(P.y);let best=-1,bd=1e9;
  for(let i=0;i<o.length;i++){const q=o[i];if(!q||q.t!==TYPE[k]||!(q.hp>0))continue;const d=Math.abs(i%MW-px)+Math.abs(((i/MW)|0)-py);if(d<bd){bd=d;best=i;}}
  if(best>=0)D.onTap(best%MW,(best/MW)|0);}
let tick=0;const PACE=window.__pace||1;
function step(){tick++;
  if(tick%(3*PACE)===0&&!window.__ignore)threats();
  if(tick%PACE)return;
  if(D.st.energy<30&&R().comida>=1){$('bEat').click();S.eats++;}
  for(const t of E.techs){if(has(t.id)||!t.req.every(r=>has(r))||!afford(t.cost))continue;if(E.rival&&t===E.techs[E.techs.length-1]&&D.st.safety<100)continue;if(research(t.id))break;}
  for(let k=0;k<3&&build();k++);
  gather();S.smogMax=Math.max(S.smogMax,D.st.smog);
  if(tick%(60-60%PACE)===0&&E.rival)S.safety.push([Math.round(D.st.time/60),Math.round(D.st.safety),Math.round(D.st.rival)]);}
return{run(maxMin){$('modalCard').querySelector('[data-m=start]')?.click();
    while(!D.st.won&&!D.st.lost&&D.st.time<maxMin*60){for(let k=0;k<10;k++)D.update(0.1);step();}
    closeAll();const n=E.builds.reduce((s,b)=>s+cnt(b.id),0);
    return{won:D.st.won,lost:!!D.st.lost,min:Math.round(D.st.time/6)/10,day:Math.floor(D.st.time/160)+1,vil:D.vil.filter(v=>!v.bot).length,bots:D.vil.filter(v=>v.bot).length,
      buildings:n,techs:S.techs,builds:S.builds,taps:S.taps,eats:S.eats,rival:Math.round(D.st.rival),rivalAt:E.rival?Math.round((D.st.time+(D.st.won?D.rivalEta():0))/6)/10:null,safety:Math.round(D.st.safety),smog:Math.round(S.smogMax),
      legacy:D.st.legacy&&D.st.legacy.has?{aldeanos:D.st.legacy.aldeanos,ideas:D.st.legacy.ideas,monedas:D.st.legacy.monedas||0}:null,curve:S.safety};}};
})();`;

const NAMES = { 2: 'Antigüedad', 3: 'Edad Media', 4: 'Renacimiento', 5: 'Industria', 6: 'Electricidad', 7: 'Computación', 8: 'Internet', 9: 'IA', 10: 'AGI', 11: 'Era estelar' };
mkdirSync('out', { recursive: true });
const srv = await serve(), b = await launch(), all = [], errs = [];
try {
  for (let run = 1; run <= RUNS; run++) {
    const ctx = await b.newContext({ viewport: { width: 400, height: 850 }, isMobile: true, hasTouch: true });
    await ctx.route(/fonts\.(googleapis|gstatic)\.com/, r => r.abort());
    await ctx.addInitScript(INIT(run * 7919));
    const p = await ctx.newPage(); p.on('pageerror', e => errs.push(e.message));
    await p.goto(srv.url + '/index.html');
    await p.evaluate(s => { localStorage.clear(); localStorage.setItem('rtagi-mundo-v1', s); }, PREHISTORIA);
    for (let n = E0; n <= E1; n++) {
      const t0 = Date.now();
      if (SOLO) await p.evaluate(() => { for (const k of Object.keys(localStorage)) if (k.startsWith('rtagi-mundo')) localStorage.removeItem(k); });
      await p.goto(srv.url + '/mundo' + n + '.html?debug');
      await p.evaluate(([k, ig, nd]) => { window.__pace = k; window.__ignore = ig; window.__nodef = nd; }, [PACE, IGNORE, NODEF]);
      await p.evaluate(BOT);
      const r = await p.evaluate(m => window.__bot.run(m), MAX_MIN);
      await p.evaluate(() => { window.__rtagiActive = 'fin'; });
      r.n = n; r.run = run; all.push(r);
      console.log('corrida ' + run + ' · ' + NAMES[n].padEnd(12) + (r.won ? ' terminada en ' + String(r.min).padStart(5) + ' min' : r.lost ? ' PERDIDA a los ' + r.min + ' min' : ' sin terminar a los ' + r.min + ' min') +
        ' · día ' + r.day + ' · ' + r.vil + ' aldeanos' + (r.bots ? ' + ' + r.bots + ' robots' : '') + ' · ' + r.buildings + ' edificios · ' + r.taps + ' amenazas tocadas' +
        (r.rivalAt ? ' · rival ' + r.rival + '% (llegaba a los ' + r.rivalAt + ' min)' : '') + (r.smog ? ' · humo hasta ' + r.smog + '%' : '') + ' (' + ((Date.now() - t0) / 1000).toFixed(0) + ' s)');
      // La era siguiente lee la partida ganada de esta; si no se ganó, la cadena se corta.
      if (!r.won && !SOLO) break;
    }
    await ctx.close();
  }
} finally { await b.close(); srv.close(); }

writeFileSync('out/bot-mundo' + (SOLO ? '-solo' : '') + (PACE > 1 ? '-ritmo' + PACE : '') + (IGNORE ? '-ignora' : '') + (NODEF ? '-sindefensa' : '') + '.json', JSON.stringify(all, null, 1));
// Resumen: minutos por era (mínimo, promedio y máximo entre corridas) y cuándo se investigó cada invento, en promedio.
console.log('\n' + (SOLO ? 'Cada era sola, sin legado.' : 'Eras encadenadas: cada una arranca con lo que dejó la anterior.') + (PACE > 1 ? ' Decide cada ' + PACE + ' s.' : '') + '\nera            corridas  ganadas   mín   prom   máx  (minutos de juego hasta la obra)');
for (let n = E0; n <= E1; n++) {
  const rs = all.filter(r => r.n === n), ok = rs.filter(r => r.won).map(r => r.min);
  if (!rs.length) continue;
  const avg = ok.length ? ok.reduce((a, c) => a + c, 0) / ok.length : NaN;
  console.log(NAMES[n].padEnd(14) + String(rs.length).padStart(8) + String(ok.length).padStart(9) + (ok.length ? String(Math.min(...ok)).padStart(6) + avg.toFixed(1).padStart(7) + String(Math.max(...ok)).padStart(6) : '     -      -     -') +
    (rs.some(r => r.lost) ? '   (' + rs.filter(r => r.lost).length + ' perdidas)' : ''));
}
console.log(errs.length + ' errores de página' + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
if (errs.length || all.some(r => !r.won)) process.exitCode = 1;
