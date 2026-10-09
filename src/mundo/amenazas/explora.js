// Explorar el mapa (octubre de 2026, Juani: "antiguedad sigue siendo aburrida"; marcó que se espera, que nada amenaza, que no
// hay qué descubrir y que es siempre lo mismo, y eligió probar primero explorar). No es una amenaza: usa los mismos ganchos.
// Se prende con `explora:true` en la era (la Antigüedad) y trae:
// - Niebla: el mapa arranca tapado salvo alrededor del pueblo. Se destapa por donde caminás vos (EXP_R_P), tu gente (EXP_R_V)
//   y alrededor de lo construido (EXP_R_B; la defensa de la era, que es una torre, mira más lejos: EXP_R_T). Los aldeanos
//   solo juntan lo que ya se ve y no se puede construir en la niebla (el motor mira `FOG` con `fogged`). Tocar la niebla
//   es ir a explorar hasta ahí.
// - Hallazgos escondidos lejos del pueblo (EXP_KINDS): ruinas con ideas y piedra, una aldea perdida que se suma, un
//   campamento pirata que hay que echar a golpes (EXP_HITS toques) para quedarse con su tesoro, un oráculo en una colina
//   que destapa mucho alrededor y un yacimiento que deja vetas nuevas. Se ven al destaparlos y se toman tocándolos de cerca.
// Se guarda con la partida (`explora`: lo descubierto en tramos y los hallazgos). Una partida de antes, sin `explora`, arranca
// con la niebla destapada alrededor de lo que ya tenía.
const EXP_R_START=7,EXP_R_P=4.5,EXP_R_V=2.5,EXP_R_B=3,EXP_R_T=7,EXP_R_ORACLE=11,EXP_HITS=3;
const EXP_KINDS=['ruinas','aldea','ruinas','cofre','oraculo','veta'];
// Sin piratas en la era (la Edad Media), el campamento es de bandidos; y la era puede renombrar los hallazgos (`explora:{nombres}`).
const EXP_BAND=ERA.pirates?'piratas':'bandidos';
const EXP_NAME=Object.assign({ruinas:'unas ruinas',aldea:'una aldea perdida',cofre:'un campamento '+(ERA.pirates?'pirata':'de bandidos'),oraculo:'un oráculo',veta:'un yacimiento'},ERA.explora&&ERA.explora.nombres||{});
const expCap=t=>t.charAt(0).toUpperCase()+t.slice(1);
let expSeen=null,expFinds=[],expGo=null,expGoT=0;
// Dibujos: ruinas de columnas caídas, dos chozas con su gente, la carpa pirata con el cofre, el templete del oráculo con su
// fuego y la grieta con vetas que brillan. Se arman la primera vez que hacen falta.
function expRuinsArt(){return mkA(64,64,a=>{const S=P4('#6d6458','#8a8070','#a39b88','#d8d0bc');ell(a,32,52,26,7,hx('#5a6a3a'));
  for(const[x,h]of[[12,26],[26,36],[44,18]]){rect(a,x,52-h,9,h,S[2]);rect(a,x,52-h,2,h,S[3]);rect(a,x-2,52-h-3,13,4,S[1]);}
  poly(a,[[30,50],[56,44],[58,49],[32,55]],S[1]);rect(a,6,48,10,5,S[0]);outlineAll(a,OUTL);});}
function expVillageArt(){return mkA(64,64,a=>{const R=P4('#7a4a2a','#a66a3a','#c88a4a','#e8c07a');
  for(const[x,y,w]of[[6,30,24],[32,24,26]]){poly(a,[[x-2,y+8],[x+w/2,y-8],[x+w+2,y+8]],R[3]);rect(a,x,y+8,w,18,R[1]);rect(a,x+w/2-3,y+16,6,10,hx('#3a2418'));}
  ell(a,32,58,24,4,hx('#5a6a3a'));outlineAll(a,OUTL);});}
function expCampArt(){return mkA(64,64,a=>{poly(a,[[4,50],[24,14],[44,50]],hx('#8a2a2a'));poly(a,[[24,14],[44,50],[34,50]],hx('#5a1a1a'));
  rect(a,24,4,2,12,WOOD[1]);rect(a,26,4,12,8,hx('#1b1a24'));rect(a,30,6,4,3,hx('#f4f1e8'));
  rect(a,40,40,20,12,WOOD[1]);rect(a,40,40,20,4,WOOD[3]);rect(a,48,44,4,4,hx('#e8c05a'));outlineAll(a,OUTL);});}
function expOracleArt(){return mkA(64,64,a=>{const S=P4('#8a8070','#bdb5a2','#e3ddcc','#f6f1e4');ell(a,32,56,28,6,hx('#6a7a4a'));
  rect(a,10,48,44,6,S[1]);poly(a,[[8,20],[32,8],[56,20]],S[2]);rect(a,8,20,48,4,S[1]);
  for(const x of[12,24,36,48])rect(a,x,24,5,24,S[3]);ell(a,32,42,5,6,hx('#e8a040'));ell(a,32,40,3,4,hx('#ffe08a'));outlineAll(a,OUTL);});}
function expVeinArt(){return mkA(64,64,a=>{const R=P4('#4a4038','#6a5a4a','#8a7a64','#a89a80');poly(a,[[6,52],[16,24],[34,16],[54,26],[58,52]],R[1]);
  poly(a,[[16,24],[34,16],[40,30],[22,36]],R[2]);for(const[x,y]of[[22,40],[34,30],[44,42],[30,48]]){ell(a,x,y,4,3,hx('#d9822b'));a.set(x-1,y-1,hx('#ffd08a'));}
  outlineAll(a,OUTL);});}
function expArt(){if(!HS.expRuinas)HS.expRuinas=expRuinsArt();if(!HS.expAldea)HS.expAldea=expVillageArt();if(!HS.expCofre)HS.expCofre=expCampArt();
  if(!HS.expOraculo)HS.expOraculo=expOracleArt();if(!HS.expVeta)HS.expVeta=expVeinArt();}
const expSprite=k=>({ruinas:HS.expRuinas,aldea:HS.expAldea,cofre:HS.expCofre,oraculo:HS.expOraculo,veta:HS.expVeta})[k];
function expReveal(cx,cy,r){const R=Math.ceil(r);for(let y=Math.max(0,Math.floor(cy)-R);y<=Math.min(MH-1,Math.ceil(cy)+R);y++)for(let x=Math.max(0,Math.floor(cx)-R);x<=Math.min(MW-1,Math.ceil(cx)+R);x++)
  if(!expSeen[y*MW+x]&&Math.hypot(x-cx,y-cy)<=r)expSeen[y*MW+x]=1;}
// Los hallazgos van lejos del pueblo, cada uno para otro lado, en tierra libre que se pueda pisar.
// Con la ciudad de la era anterior, que ya se ve, van afuera de lo visto si se puede (y un poco más lejos).
function expPlace(){expFinds=[];const used=[];const kinds=EXP_KINDS.slice();
  for(let k=0;k<kinds.length;k++){let best=null;
    for(let n=0;n<400&&!best;n++){const an=(k+Math.random()*0.8)/kinds.length*Math.PI*2,d=12+Math.random()*(n<200?16:12),x=Math.round(SPAWN[0]+Math.cos(an)*d),y=Math.round(SPAWN[1]+Math.sin(an)*d);
      if(x<3||y<3||x>MW-4||y>MH-4||obj[y*MW+x]||!passable(x,y)||ground[y*MW+x]===SAND)continue;if(used.some(([ux,uy])=>Math.hypot(ux-x,uy-y)<7))continue;if(n<200&&expSeen[y*MW+x])continue;best=[x,y];}
    if(!best)continue;used.push(best);expFinds.push({x:best[0],y:best[1],k:kinds[k],done:false,hits:0,told:false});}}
function expStart(old){expSeen=new Uint8Array(MW*MH);FOG=expSeen;
  if(!old){expReveal(SPAWN[0],SPAWN[1],EXP_R_START);expPlace();return;}
  // Una partida de antes, o la ciudad que vino de la era anterior: se ve todo lo que ya tenía (edificios, gente y vos) y un poco
  // alrededor; los hallazgos van afuera de eso si se puede, y los que igual caen ahí ya se ven.
  expReveal(P.x,P.y,EXP_R_START);for(const v of vil)expReveal(v.x,v.y,EXP_R_P);obj.forEach((o,i)=>{if(o&&!RES[o.t])expReveal(i%MW,(i/MW)|0,EXP_R_START);});
  expPlace();for(const f of expFinds)if(expSeen[f.y*MW+f.x])f.told=true;}
// Lo descubierto se guarda en tramos: cuántos tapados, cuántos destapados, y así (el mapa es casi todo de una pieza).
function expPack(){const r=[];let c=0,n=0;for(let i=0;i<expSeen.length;i++){if(expSeen[i]!==c){r.push(n);c=expSeen[i];n=0;}n++;}r.push(n);return r;}
function expUnpack(r){const s=new Uint8Array(MW*MH);let i=0,c=0;for(const n of r){if(c)s.fill(1,i,Math.min(s.length,i+n));i+=n;c^=1;}return s;}
function expClaim(f){if(f.k==='cofre'&&f.hits<EXP_HITS-1){f.hits++;zaps.push({x:f.x,y:f.y,t:0.4});float(f.x,f.y-0.6,'¡fuera!','#e8654d');
    toast('¡Uno menos! '+(EXP_HITS-f.hits===1?'Falta 1 golpe':'Faltan '+(EXP_HITS-f.hits)+' golpes')+' para echar a los '+EXP_BAND+'.');return;}
  f.done=true;expGo=null;sparks.push({x:f.x,y:f.y,t:1.6,d:0,big:true});
  if(f.k==='ruinas'){st.res.ideas+=25*IX;add('piedra',15);float(f.x,f.y-0.6,ideaTxt(25),RCOL.ideas);float(f.x,f.y-1.2,'+15 piedra',RCOL.piedra);toast('Ruinas de una ciudad vieja: +'+fmt(25*IX)+' ideas y 15 de piedra.');}
  else if(f.k==='aldea'){addVillager(f.x,f.y);addVillager(f.x,f.y);float(f.x,f.y-0.6,'+2 aldeanos','#93d36c');toast('Una aldea perdida: 2 aldeanos se suman a tu pueblo.');}
  else if(f.k==='cofre'){add('monedas',40);add(ORE,15);float(f.x,f.y-0.6,'+40 monedas',RCOL.monedas);float(f.x,f.y-1.2,'+15 '+RN[ORE].toLowerCase(),RCOL[ORE]);toast('¡Echaste a los '+EXP_BAND+'! Su tesoro: 40 monedas y 15 de '+RN[ORE].toLowerCase()+'.');}
  else if(f.k==='oraculo'){st.res.ideas+=15*IX;expReveal(f.x,f.y,EXP_R_ORACLE);float(f.x,f.y-0.6,ideaTxt(15),RCOL.ideas);toast(expCap(EXP_NAME.oraculo.replace(/^un /,'el ').replace(/^una /,'la '))+': desde arriba se ve lejos. +'+fmt(15*IX)+' ideas.');}
  else if(f.k==='veta'){let n=0;for(const[dx,dy]of DIRS8){const x=f.x+dx,y=f.y+dy;if(n<5&&inb(x,y)&&!obj[y*MW+x]&&passable(x,y)&&!(Math.round(P.x)===x&&Math.round(P.y)===y)){obj[y*MW+x]={t:'ore',hp:RES.ore.hp,regen:0};n++;}}
    recount();toast('Un yacimiento: '+n+' vetas de '+RN[ORE].toLowerCase()+' nuevas.');}
  if(f.k==='ruinas'||f.k==='oraculo')flashChip('ideas');else if(f.k==='cofre')flashChip('monedas');save();}
const expAt=(tx,ty)=>expFinds.find(f=>!f.done&&expSeen[f.y*MW+f.x]&&Math.abs(f.x-tx)<=0.6&&Math.abs(f.y-ty)<=0.6);
amenaza({on:'explora',
  reset(){expArt();expGo=null;expGoT=0;},
  // Con la ciudad de la era anterior (sus edificios traen `era`), arranca destapada alrededor de lo que ya tenés.
  fresh(){expStart(obj.some(o=>o&&o.era&&BUILD[o.t]));},
  load(d){const e=d&&d.explora;
    if(e&&Array.isArray(e.s)&&Array.isArray(e.f)){expSeen=expUnpack(e.s);FOG=expSeen;expFinds=e.f.filter(f=>Array.isArray(f)&&EXP_NAME[f[2]]).map(([x,y,k,done,hits])=>({x,y,k,done:!!done,hits:hits|0,told:true}));}
    else expStart(true);},
  save(){return expSeen?{explora:{s:expPack(),f:expFinds.map(f=>[f.x,f.y,f.k,f.done?1:0,f.hits])}}:{};},
  tick(){if(!expSeen)return;expReveal(P.x,P.y,EXP_R_P);for(const v of vil)if(!v.inside&&!v.away)expReveal(v.x,v.y,EXP_R_V);
    const D=ERA.defense&&ERA.defense.id;obj.forEach((o,i)=>{if(o&&!RES[o.t])expReveal(i%MW,(i/MW)|0,o.t===D?EXP_R_T:EXP_R_B);});
    for(const f of expFinds)if(!f.done&&!f.told&&expSeen[f.y*MW+f.x]){f.told=true;if(!quiet)toast('¡Descubriste '+EXP_NAME[f.k]+'! Tocalo para ver qué hay.');}},
  update(dt){if(!expGo)return;const f=expGo;expGoT-=dt;
    if(f.done||expGoT<=0){expGo=null;return;}
    if(Math.hypot(P.x-f.x,P.y-f.y)<=1.6&&!P.path.length){expClaim(f);if(f.k==='cofre'&&!f.done)expGo=null;return;}
    if(!P.path.length||P.task||P.act)expGo=null;},
  ents(list){for(const f of expFinds)if(!f.done&&expSeen&&expSeen[f.y*MW+f.x])list.push({k:f.y+1,z:0.5,e:f,f:[expSprite(f.k)],
    post:e=>{const t=performance.now()/1000;ctx.fillStyle='#ffd35a';ctx.font='600 7px "Pixelify Sans", monospace';ctx.textAlign='center';
      ctx.fillText(e.k==='cofre'?'☠ '+(EXP_HITS-e.hits):'?',e.x*T+8,e.y*T-5+Math.sin(t*3+e.x)*1.5);}});},
  // La niebla va arriba de todo (también de la noche): tapado del todo, y con un borde a medias para que no se vea a cuadritos.
  drawTop(){if(!expSeen)return;const vw=W/SC,vh=H/SC,x0=Math.max(0,Math.floor(cam.x/T)-1),x1=Math.min(MW-1,Math.ceil((cam.x+vw)/T)+1),y0=Math.max(0,Math.floor(cam.y/T)-1),y1=Math.min(MH-1,Math.ceil((cam.y+vh)/T)+1);
    for(let y=y0;y<=y1;y++)for(let x=x0;x<=x1;x++){const i=y*MW+x;
      if(!expSeen[i]){ctx.fillStyle='rgba(14,16,26,0.93)';ctx.fillRect(x*T-0.5,y*T-0.5,T+1,T+1);continue;}
      let n=0;for(const[dx,dy]of DIRS8){const nx=x+dx,ny=y+dy;if(inb(nx,ny)&&!expSeen[ny*MW+nx])n++;}
      if(n){ctx.fillStyle='rgba(14,16,26,'+(0.12+0.05*n).toFixed(2)+')';ctx.fillRect(x*T,y*T,T,T);}}},
  tap(tx,ty){if(quiet||!expSeen)return false;const f=expAt(tx,ty);if(!f)return false;
    if(Math.hypot(P.x-f.x,P.y-f.y)<=1.6){expClaim(f);return'vida';}
    const[px,py]=tileOf(P);P.task=null;P.act=null;const p=pathAdj(px,py,f.x,f.y);if(!p){toast('No llegás hasta ahí.');return'vida';}
    P.path=p;expGo=f;expGoT=40;marker={x:f.x,y:f.y,t:0.6};return'vida';},
  hint(){if(!expSeen)return null;const f=expFinds.find(f=>!f.done&&f.told);
    if(f&&f.k==='cofre'&&f.hits)return['¡'+expCap(EXP_BAND)+'!','tocá su campamento '+(EXP_HITS-f.hits)+' veces más para quedarte con el tesoro.'];
    if(f)return['¡Hallazgo!','tocá '+EXP_NAME[f.k]+' para ver qué hay.'];
    if(st.time>60&&st.time<360&&!expFinds.some(f=>f.done))return['Explorá:','tocá lo oscuro para ir: hay cosas escondidas.'];return null;},
  // El bot explora: va al hallazgo más cercano que todavía no tomó, aunque esté en la niebla.
  botTaps(){if(!expSeen)return[];const f=expFinds.filter(f=>!f.done).sort((a,b)=>Math.hypot(a.x-P.x,a.y-P.y)-Math.hypot(b.x-P.x,b.y-P.y))[0];
    return f?[[f.x,f.y]]:[];},
  debug:{finds:()=>expFinds,seen:()=>expSeen,reveal:(x,y,r)=>expReveal(x,y,r),claim:i=>expClaim(expFinds[i])}});
