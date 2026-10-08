// Bot del mundo abierto: juega las eras desde la 2 hasta la última una atrás de otra (cada una arranca con lo que dejó la anterior) y
// reporta cuántos minutos de juego tarda en terminar la obra de cada era. Sirve para ajustar el balance con datos.
//   node tools/bot-mundo.mjs [corridas=3] [eras=2-N o una sola, como 3] [solo] [ritmo=1] [ignora] [sindefensa] [sintorres] [singuardias] [sinmaquinas] [sinniveles] [sinoficios]
// Con `solo`, cada era arranca sin nada de la anterior (como si la abrieras suelta) en vez de encadenarlas.
// Con `ritmo=N` decide cada N segundos de juego en vez de cada uno (y mira las amenazas cada 3N): con 2 o 3 se parece
// más a una persona, que tarda en abrir hojas, elegir y caminar. Con `ignora` no toca nunca las amenazas (para medir cuánto
// pesan sobre alguien distraído) y con `sindefensa` no construye la defensa de la era (atalayas, escudos) ni los cuarteles
// de los guardianes; con `sintorres`, solo los cuarteles, y con `singuardias`, solo la defensa. Con `sinmaquinas` no pone
// máquinas adentro de las industrias (las eras con puestos) con `sinniveles` no mejora edificios (ERA.niveles)
// y con `sinoficios` no pone gente en los oficios (ERA.oficios).
// Juega desde adentro de la página con ?debug: avanza el juego de a 0,1 s y cada segundo de juego decide qué hacer
// (tocar amenazas, comer, investigar, construir, juntar). Investiga y construye por las hojas, como una persona.
// La Antigüedad arranca con un legado típico de la Prehistoria (4 aldeanos, 50 ideas, ábaco, rueda y agricultura).
import { writeFileSync, mkdirSync } from 'node:fs';
import { serve, launch } from './harness.mjs';
import { loadEras, shortName } from './eras.mjs';

const ALL = loadEras(), LAST = ALL.at(-1).n;

const RUNS = +(process.argv[2] || 3);
const [E0, E1 = E0] = (process.argv[3] || '2-' + LAST).split('-').map(Number);
const OPT = process.argv.slice(4), SOLO = OPT.includes('solo'), IGNORE = OPT.includes('ignora'), NODEF = OPT.includes('sindefensa'), NOTOWER = OPT.includes('sintorres'), NOGUARD = OPT.includes('singuardias'), NOMACH = OPT.includes('sinmaquinas'), NOLV = OPT.includes('sinniveles'), NOOF = OPT.includes('sinoficios'), PACE = +((OPT.find(o => o.startsWith('ritmo=')) || 'ritmo=1').split('=')[1]);
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
// Las amenazas: bichos, virus, robots desalineados, espías y las de cada era. Se tocan cuando aparecen (cada 3 s de juego, como alguien atento).
function threats(){const o=D.obj();let n=0;
  for(const v of D.viruses()){D.onTap(Math.round(v.x),Math.round(v.y));n++;}
  for(const m of D.meteors().slice()){D.onTap(m.x,m.y);n++;}
  for(const p of D.pirates().slice())if(!(p.wait>0)){D.onTap(Math.round(p.x),Math.round(p.y));n++;}
  for(const w of D.swarms().slice()){D.onTap(Math.round(w.x),Math.round(w.y));n++;}
  for(const l of D.ludds().slice())if(l.state!=='home'&&!(l.wait>0)){D.onTap(Math.round(l.x),Math.round(l.y));n++;}
  for(const w of D.storms().slice()){D.onTap(Math.round(w.x),Math.round(w.y-0.6));n++;}
  for(const m of D.moths().slice())if(m.trap==null){D.onTap(Math.round(m.x),Math.round(m.y-0.4));n++;}
  if(D.goos)for(const g of D.goos().slice()){D.onTap(g.core%MW,(g.core/MW)|0);n++;}
  if(D.ufos)for(const u of D.ufos().slice())if(u.state!=='leave'){D.onTap(Math.round(u.x),Math.round(u.y-1));n++;}
  if(D.rifts)for(const r of D.rifts().slice())if(r.state!=='close'){D.onTap(Math.round(r.x),Math.round(r.y));n++;}
  // Las amenazas en archivos propios (src/mundo/amenazas) dicen dónde tocarlas.
  if(D.botTaps)for(const[x,y]of D.botTaps()){D.onTap(x,y);n++;}
  if(D.holes)for(const h of D.holes().slice())if(h.state!=='die'){for(let k=Math.ceil(h.m);k>0;k--)D.onTap(Math.round(h.x),Math.round(h.y));n++;}
  if(D.spies)for(const sp of D.spies().slice())if(!(sp.wait>0)){D.onTap(Math.round(sp.x),Math.round(sp.y));n++;}
  for(const v of D.vil)if(v.bad){D.onTap(Math.round(v.x),Math.round(v.y));n++;}
  for(let i=0;i<o.length;i++)if(o[i]&&(o[i].bug||o[i].past)){D.onTap(i%MW,(i/MW)|0);n++;}
  S.taps+=n;}
// Qué construir y cuántos, en orden de prioridad.
function wants(){const V=D.vil.filter(v=>!v.bot).length,nT=Object.keys(D.st.techs).length,w=[];
  w.push(['granja',1+Math.floor((V+1)/4)],['aserradero',1],['casa',Math.min(4,1+Math.ceil(nT/2))]);
  // Si el próximo invento pide un objeto, primero el edificio que lo hace (y el que hace lo que ese gasta).
  {const t=nextTech(),seen=new Set(),add=k=>{const b=E.builds.find(b=>b.craft&&b.prod&&b.prod[k]);if(!b||seen.has(b.id))return;seen.add(b.id);for(const u in b.use){add(u);const pb=E.builds.find(p=>!p.craft&&p.prod&&p.prod[u]&&p.req);if(pb&&!seen.has(pb.id)){seen.add(pb.id);w.push([pb.id,2]);}}w.push([b.id,1]);};if(t)for(const k in t.cost)add(k);}
  if(E.grid==='data'&&B.servidor)w.push(['servidor',1]);
  if(E.grid==='power'){const els=E.builds.filter(b=>b.elec).reduce((s,b)=>s+cnt(b.id),0);
    w.push(['usina',1+Math.floor(els/6)]);if(B.represa)w.push(['represa',1]);}
  if(E.rival)w.push(['labseg',4],['embajada',2]);
  if(E.robots)w.push(['fabrob',2]);
  if(E.defense&&!window.__nodef&&!window.__notower)w.push([E.defense.id,2]);
  if(B.cuartel&&!window.__nodef&&!window.__noguard)w.push(['cuartel',2]);
  for(const b of E.builds){if(!b.req||w.some(x=>x[0]===b.id))continue;const p=b.prod||{};w.push([b.id,p.ideas||p.monedas?2:1]);}
  const full=['madera','piedra',ORE].some(k=>R()[k]>=D.cap(k)-5);if(full||cnt(E.storage.id)<1&&nT>=4)w.push([E.storage.id,Math.min(3,cnt(E.storage.id)+1)]);
  if(D.st.smog>12&&B.parque)w.push(['parque',Math.min(4,cnt('parque')+1)]);
  const off=id=>(window.__nodef||window.__notower)&&E.defense&&id===E.defense.id||(window.__nodef||window.__noguard)&&id==='cuartel';
  return w.filter(([id,n])=>B[id]&&!off(id)&&(!B[id].req||has(B[id].req))&&cnt(id)<n);}
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
// Los objetos (ERA.items) no se juntan: si falta uno, falta lo que gasta el edificio que lo hace (y lo de ese, si es otro objeto).
const SRC={};for(const b of E.builds)if(b.craft&&b.prod)for(const k in b.prod)SRC[k]=b.use;
function need(c){const m={},walk=(k,v,d)=>{if(d>3)return;if(SRC[k])for(const u in SRC[k])walk(u,v,d+1);else m[k]=(m[k]||0)+v;};for(const k in c)if((c[k]||0)>R()[k])walk(k,c[k]-R()[k],0);return m;}
function nextTech(){return E.techs.find(t=>!has(t.id)&&t.req.every(r=>has(r)));}
function gather(){const P=D.P;if(P.task||P.act||P.path.length)return;
  // Las obras (ERA.obras) se levantan a mano: primero la más cercana.
  {const ob=D.obras?D.obras():[];if(ob.length){const[px,py]=[Math.round(P.x),Math.round(P.y)],i=ob.sort((a,b)=>Math.hypot(a%MW-px,(a/MW|0)-py)-Math.hypot(b%MW-px,(b/MW|0)-py))[0];D.onTap(i%MW,(i/MW)|0);return;}}
  let k=null;if(R().comida<6)k='comida';
  const hands=E.n<5;
  // El edificio que fabrica lo que pide el próximo invento va primero: si no, la fundición se come la piedra y el taller no se hace nunca.
  if(!k){const t=nextTech(),ws=wants(),cb=ws.find(([id])=>B[id].craft&&!cnt(id)),goals=[cb&&D.buildCost(cb[0]),t&&t.cost].concat(ws.slice(0,3).map(([id])=>D.buildCost(id))).filter(Boolean);
    for(const c of goals){const nd=need(c),miss=GATHER.filter(r=>nd[r]>0).sort((a,b)=>nd[b]-nd[a]);if(miss.length){k=miss[0];break;}}}
  if(!k)k=GATHER.filter(r=>R()[r]<D.cap(r)).sort((a,b)=>R()[a]-R()[b])[0];if(!k)return;
  // Desde la Industria no se junta a mano: como una persona, se les dice a los aldeanos qué priorizar.
  if(!hands){D.st.prio=k;return;}
  const o=D.obj(),px=Math.round(P.x),py=Math.round(P.y);let best=-1,bd=1e9;
  for(let i=0;i<o.length;i++){const q=o[i];if(!q||q.t!==TYPE[k]||!(q.hp>0))continue;const d=Math.abs(i%MW-px)+Math.abs(((i/MW)|0)-py);if(d<bd){bd=d;best=i;}}
  if(best>=0)D.onTap(best%MW,(best/MW)|0);}
// Modernizar lo que vino de la era anterior (rinde la mitad): primero lo que produce, uno por vez, si alcanza.
function modern(){if(!D.modernize)return false;const o=D.obj();let best=-1,bv=-1;
  const ns=E.grid==='power'?nodes():null;
  for(let i=0;i<o.length;i++){const q=o[i];if(!D.canModern(q))continue;const b=B[q.t],x=i%MW,y=(i/MW)|0;
    // Uno con ⚡ modernizado necesita luz: si queda lejos de la red, primero un poste hacia él.
    if(b.elec&&ns&&!ns.some(n=>Math.hypot(n.x-x,n.y-y)<=2.9)){if(B.poste&&ns.length&&afford(D.buildCost('poste'))){let bn=null,bd=1e9;for(const n of ns){const d=Math.hypot(n.x-x,n.y-y);if(d<bd){bd=d;bn=n;}}
        if(place('poste',{any:true,at:[bn.x,bn.y],r:5,ok:(px,py)=>Math.hypot(px-bn.x,py-bn.y)<=4.4&&Math.hypot(px-x,py-y)<bd-1}))return true;}continue;}
    const v=b&&b.prod?2:b&&(b.id===E.ideaBuild||b.id===E.farmBuild)?1:0;if(v>bv){bv=v;best=i;}}
  if(best<0)return false;const t=o[best].t;if(D.modernize(best)){S.modern=(S.modern||0)+1;return true;}return false;}
// Adentro de las industrias (edificios con puestos): cada 5 s, por la hoja como una persona, pone una máquina rápida (o una
// limpia si hay mucho humo y el edificio echa) en la industria que más hace de lo que le falta al próximo invento (si hace al
// menos 0,15 por segundo: en el café o una mina no rinde lo que el aldeano que se lleva), o la mejora,
// con una persona de cada 3 como mucho de obrero (una por industria con máquinas), si le alcanza (sin gastar más de la mitad de lo que pide ese invento, salvo que la máquina haga justo lo que le falta) y le
// quedan al menos 3 personas libres para juntar.
function machines(){if(window.__nomach||!D.INL||!E.builds.some(b=>b.puestos))return false;
  const free=D.vil.filter(v=>v.job==null&&!v.bad).length,t=nextTech(),keep=t?t.cost:{},o=D.obj();
  let bs=-1;const ok=c=>Object.entries(c).every(([k,v])=>R()[k]>=v+(bs===2?0:0.5*(keep[k]||0)));
  const nd=t?need(t.cost):{},want=Object.keys(t?t.cost:{}).filter(k=>R()[k]<t.cost[k]).concat(Object.keys(nd));
  let best=-1;
  for(let i=0;i<o.length;i++){const q=o[i],b=q&&B[q.t];if(!b||!b.puestos||q.bug||D.isOld(q))continue;
    const n=(q.m||[]).filter(Boolean).length,g=Object.entries(b.prod||{}).reduce((t,[k,v])=>t+(want.includes(k)?v:0),0),sc=g>=0.15?g-0.03*n:-1;if(sc>bs){bs=sc;best=i;}}
  if(bs<0)return false;bs=2;
  if(best<0)return false;const q=o[best],b=B[q.t],m=q.m||[];
  let j=-1;for(let k=0;k<3;k++)if(!m[k]){j=k;break;}const work=D.vil.filter(v=>v.job!=null).length,add=j>=0&&free>3&&(q.m&&q.m.some(Boolean)||work<Math.floor(D.vil.length/3))&&ok(D.MACH_COST[0]);
  const up=!add&&m.map((x,k)=>[x,k]).filter(([x])=>x&&x.lv<3).sort((a,c)=>a[0].lv-c[0].lv)[0];
  if(!add&&!(up&&ok(D.MACH_COST[up[0].lv])))return false;
  closeAll();D.onTap(best%MW,(best/MW)|0);if($('sheet').hidden)return false;
  let el;if(add){const k=b.smoke&&D.st.smog>25&&m.some(x=>x&&x.k==='r')?'l':'r';el=document.querySelector('[data-mk="'+k+'"][data-pj="'+j+'"]');}else el=document.querySelector('[data-mu="'+up[1]+'"]');
  const done=!!el&&!el.disabled;if(done){el.click();S.mach=(S.mach||0)+1;(S.machLog=S.machLog||[]).push([Math.round(D.st.time),q.t,add?el.dataset.mk:'+']);}closeAll();return done;}
// Niveles (los edificios de ERA.niveles): cada 5 s, por la hoja, mejora la casa cuando ya tiene las 4 (un aldeano más), el
// depósito cuando se llena, la herrería, el parque con humo, y el palacio o la estación, si le alcanza sin gastar más de la mitad
// de lo que pide el próximo invento. Con sinniveles no mejora nada.
function levels(){if(window.__nolv||!E.niveles||!D.lvUp)return false;const t=nextTech(),keep=t?t.cost:{},o=D.obj();
  const ok=c=>Object.entries(c).every(([k,v])=>R()[k]>=v+0.5*(keep[k]||0));
  const full=['madera','piedra',ORE].some(k=>R()[k]>=D.cap(k)-5);
  const want=id=>id==='casa'?cnt('casa')>=4:id===E.storage.id?full:id==='parque'?D.st.smog>20:id==='herreria'||id===E.ideaBuild||id===E.farmBuild;
  let best=-1,bl=9;for(let i=0;i<o.length;i++){const q=o[i];if(!q||!E.niveles.includes(q.t)||!want(q.t)||D.isOld(q)||(q.lv||1)>=3)continue;const lv=q.lv||1;if(lv<bl&&ok(D.lvCost(q.t,lv+1))){bl=lv;best=i;}}
  if(best<0)return false;closeAll();D.onTap(best%MW,(best/MW)|0);const el=document.querySelector('[data-lv]');const done=!!el&&!el.disabled;
  if(done){el.click();S.lv=(S.lv||0)+1;(S.lvLog=S.lvLog||[]).push([Math.round(D.st.time),o[best].t,o[best].lv]);}closeAll();return done;}
// Oficios (ERA.oficios): cada 5 s, por la hoja, suma uno en el edificio que más suma de lo que le falta al próximo invento (si
// suma al menos 0,12 por segundo: un labrador hace menos que el aldeano que se lleva), con una persona de cada 4 como mucho y
// al menos 4 libres para juntar. Con sinoficios no pone ninguno.
function oficios(){if(window.__noof||!E.oficios||!D.setOficio)return false;const t=nextTech(),o=D.obj();if(!t)return false;
  const nd=need(t.cost),want=Object.keys(t.cost).filter(k=>R()[k]<t.cost[k]).concat(Object.keys(nd));
  const posts=o.reduce((s,q)=>s+(q&&q.of||0),0),free=D.vil.filter(v=>v.job==null&&v.post==null&&!v.bad&&!v.bot).length;
  if(posts>=Math.floor(D.vil.length/4)||free<=4)return false;
  let best=-1,bs=0.12;for(let i=0;i<o.length;i++){const q=o[i],f=q&&E.oficios[q.t];if(!f||!B[q.t]||q.bug||D.isOld(q)||(q.of||0)>=3)continue;
    const g=f.v*Object.entries(B[q.t].prod||{}).reduce((s,[k,v])=>s+(want.includes(k)?v:0),0)-0.01*(q.of||0);if(g>=bs){bs=g;best=i;}}
  if(best<0)return false;closeAll();D.onTap(best%MW,(best/MW)|0);const el=document.querySelector('[data-of="1"]');const done=!!el&&!el.disabled;
  if(done){el.click();S.of=(S.of||0)+1;(S.ofLog=S.ofLog||[]).push([Math.round(D.st.time),o[best].t]);}closeAll();return done;}
let tick=0;const PACE=window.__pace||1;
// Ideas al arrancar: cuántas por minuto da lo que hay (la ciudad que vino) y cuántos minutos de eso pagan las ideas de toda la era.
function ideaStart(){if(!D.economy)return;const r=D.economy().pr.ideas*60,tot=E.techs.reduce((s,t)=>s+(t.cost.ideas||0),0);
  S.ideaStart={min:Math.round(r),have:Math.round(D.st.res.ideas),cubre:r>0?Math.round(Math.max(0,tot-D.st.res.ideas)/r*10)/10:null};}
function step(){tick++;if(tick===2)ideaStart();
  if(tick%(3*PACE)===0&&!window.__ignore)threats();
  if(tick%PACE)return;
  if(D.st.energy<30&&R().comida>=1){$('bEat').click();S.eats++;}
  for(const t of E.techs){if(has(t.id)||!t.req.every(r=>has(r))||!afford(t.cost))continue;if(E.rival&&t===E.techs[E.techs.length-1]&&D.st.safety<100)continue;if(research(t.id))break;}
  {const t=nextTech();if(t&&!afford(t.cost)){S.short=S.short||{};for(const k in t.cost)if(R()[k]<t.cost[k])S.short[k]=(S.short[k]||0)+1;}}
  modern();
  for(let k=0;k<3&&build();k++);
  if(tick%(5*PACE)===0)machines();
  if(tick%(5*PACE)===2*PACE)levels();
  if(tick%(5*PACE)===4*PACE)oficios();
  {const ob=D.obras?D.obras():[];if(ob.length){S.obra=S.obra||{sec:0,max:0,ids:{}};S.obra.sec+=PACE;S.obra.max=Math.max(S.obra.max,ob.length);for(const i of ob){const t=D.obj()[i].b;S.obra.ids[t]=(S.obra.ids[t]||0)+PACE;}}}
  gather();S.smogMax=Math.max(S.smogMax,D.st.smog);
  if(tick%(60-60%PACE)===0&&E.rival)S.safety.push([Math.round(D.st.time/60),Math.round(D.st.safety),Math.round(D.st.rival)]);}
return{run(maxMin){$('modalCard').querySelector('[data-m=start]')?.click();
    while(!D.st.won&&!D.st.lost&&D.st.time<maxMin*60){for(let k=0;k<10;k++)D.update(0.1);step();}
    closeAll();const n=E.builds.reduce((s,b)=>s+cnt(b.id),0);
    return{won:D.st.won,lost:!!D.st.lost,min:Math.round(D.st.time/6)/10,day:Math.floor(D.st.time/160)+1,vil:D.vil.filter(v=>!v.bot).length,bots:D.vil.filter(v=>v.bot).length,
      buildings:n,techs:S.techs,builds:S.builds,taps:S.taps,short:S.short||{},lv:S.lv||0,lvLog:S.lvLog||[],ideaStart:S.ideaStart||null,cap:D.st.cap?{s:D.st.cap.s,d:D.st.cap.d}:null,of:S.of||0,ofLog:S.ofLog||[],mach:S.mach||0,machLog:S.machLog||[],crew:D.crew?D.crew().length:0,guard:D.st.guardHits||0,eats:S.eats,rival:Math.round(D.st.rival),rivalAt:E.rival?Math.round((D.st.time+(D.st.won?D.rivalEta():0))/6)/10:null,safety:Math.round(D.st.safety),smog:Math.round(S.smogMax),
      legacy:D.st.legacy&&D.st.legacy.has?{aldeanos:D.st.legacy.aldeanos,ideas:D.st.legacy.ideas,monedas:D.st.legacy.monedas||0}:null,curve:S.safety,obra:S.obra||null,res:Object.fromEntries(Object.entries(R()).map(([k,v])=>[k,Math.round(v)]))};}};
})();`;

const NAMES = Object.fromEntries(ALL.map(e => [e.n, shortName(e.ERA)]));
mkdirSync('out', { recursive: true });
const srv = await serve(process.env.BOT_DIST || 'dist'), b = await launch(), all = [], errs = [];
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
      await p.evaluate(([k, ig, nd, nt, ng, nm, nl, no]) => { window.__pace = k; window.__ignore = ig; window.__nodef = nd; window.__notower = nt; window.__noguard = ng; window.__nomach = nm; window.__nolv = nl; window.__noof = no; }, [PACE, IGNORE, NODEF, NOTOWER, NOGUARD, NOMACH, NOLV, NOOF]);
      await p.evaluate(BOT);
      const r = await p.evaluate(m => window.__bot.run(m), MAX_MIN);
      await p.evaluate(() => { window.__rtagiActive = 'fin'; });
      r.n = n; r.run = run; all.push(r);
      console.log('corrida ' + run + ' · ' + NAMES[n].padEnd(12) + (r.won ? ' terminada en ' + String(r.min).padStart(5) + ' min' : r.lost ? ' PERDIDA a los ' + r.min + ' min' : ' sin terminar a los ' + r.min + ' min') +
        ' · día ' + r.day + ' · ' + r.vil + ' aldeanos' + (r.bots ? ' + ' + r.bots + ' robots' : '') + ' · ' + r.buildings + ' edificios · ' + r.taps + ' amenazas tocadas' + (r.mach ? ' · ' + r.mach + ' máquinas (' + r.crew + ' obreros)' : '') + (r.lv ? ' · ' + r.lv + ' niveles' : '') + (r.of ? ' · ' + r.of + ' oficios' : '') + (r.cap ? ' · capítulos ' + r.cap.d.map(x => x + ' s').join(' ') + ' (★ ' + r.cap.s.reduce((a, b) => a + (b || 0), 0) + ')' : '') + (r.guard ? ' (+' + r.guard + ' por los guardianes)' : '') +
        (r.rivalAt ? ' · rival ' + r.rival + '% (llegaba a los ' + r.rivalAt + ' min)' : '') + (r.smog ? ' · humo hasta ' + r.smog + '%' : '') + ' (' + ((Date.now() - t0) / 1000).toFixed(0) + ' s)');
      // La era siguiente lee la partida ganada de esta; si no se ganó, la cadena se corta.
      if (!r.won && !SOLO) break;
    }
    await ctx.close();
  }
} finally { await b.close(); srv.close(); }

writeFileSync('out/bot-mundo' + (SOLO ? '-solo' : '') + (PACE > 1 ? '-ritmo' + PACE : '') + (IGNORE ? '-ignora' : '') + (NODEF ? '-sindefensa' : '') + (NOTOWER ? '-sintorres' : '') + (NOGUARD ? '-singuardias' : '') + (NOMACH ? '-sinmaquinas' : '') + (NOLV ? '-sinniveles' : '') + (NOOF ? '-sinoficios' : '') + '.json', JSON.stringify(all, null, 1));
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
