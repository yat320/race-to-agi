// Devoradores del vacío: la amenaza de la era del génesis (ERA.eaters, octubre de 2026). La mecánica nueva es que se
// multiplican. Desde EATER_START, cada ~eaterEvery() segundos se abre una grieta del vacío a EATER_FROM–EATER_FROM+3
// casilleros de un edificio (el granero o uno de los que más producen, eaterGoal) y sale un devorador chico que camina hasta
// él. Allá come: cada EATER_BITE_T segundos, EATER_BITE por cada devorador que está comiendo, de lo que más tengas (cualquier
// recurso; se ve el número arriba de la camada); lo que comen se pierde. Cada eaterSplit() segundos cada devorador se divide
// en dos, hasta EATER_MAX por camada: si los dejás, se duplican. Cada toque mata uno (+1 idea; el último de la camada, +2, y
// la grieta se cierra). Si nadie los toca, a los EATER_LIFE segundos la camada está llena y vuelve a su grieta: el daño se
// termina solo. La defensa de la era (la barrera de vacío) deshace a los que entran a ERA.defense.r casilleros; no se abren
// grietas adentro y, si pueden, la rodean (eaterPath), así que lo que queda afuera de las barreras sí se lo comen. Vienen más
// seguido con cada invento (+10%) y con la inflación cósmica (+30%); con la cuarentena se dividen la mitad de seguido. No se
// guardan (al cargar, las grietas ya se cerraron).
// Calibrado con el bot (la era sola): comiendo solo ideas, monedas y mineral, sin tocarlos ni defensas la era tardaba entre 11
// y 18 min según cuándo le comían el polvo primordial del crisol al principio; comiendo de todo, vida de 80 s (la hoja de ruta
// decía 90) y una grieta cada ~45 s, tarda ~13–14,5.
let eaterBroods=[],EATER_SPR=null,eaterToldT=-1e9;
const EATER_START=120,EATER_FROM=9,EATER_SPD=1.3,EATER_BITE_T=3,EATER_BITE=1,EATER_SPLIT=20,EATER_MAX=8,EATER_LIFE=80,EATER_OPEN=0.8,EATER_HIT=1.15;
const eaterEvery=()=>45/((1+0.1*Object.keys(st.techs).length)*(st.techs.inflacion?1.3:1));
const eaterSplit=()=>EATER_SPLIT*(st.techs.cuarentena?2:1);
const eaterAll=()=>eaterBroods.flatMap(c=>c.pack);
const eaterMid=c=>{let x=0,y=0;for(const e of c.pack){x+=e.x;y+=e.y;}return{x:x/c.pack.length,y:y/c.pack.length};};
// Adónde va una camada: al granero o a uno de los edificios que más producen (los de los tres tipos que más dan cada uno),
// mitad y mitad; si no hay ninguno de esos, a cualquier edificio. Con `free` (la tanda de prueba), solo a lo que no cubre una
// barrera, si hay.
function eaterGoal(free){const store=[],prod=[],bs=[],TW=free?towersXY():[];
  obj.forEach((o,i)=>{const b=o&&BUILD[o.t];if(!b||o.t==='monumento'||(TW.length&&jammed(TW,i%MW,(i/MW)|0)))return;bs.push(i);if(o.t===ERA.storage.id)store.push(i);
    if(b.prod)prod.push([i,Object.values(b.prod).reduce((s,x)=>s+x,0)]);});
  const top=[...new Set(prod.map(p=>p[1]))].sort((a,b)=>b-a).slice(0,3),best=prod.filter(p=>top.includes(p[1])).map(p=>p[0]);
  const c=store.length&&(!best.length||Math.random()<0.5)?store:best.length?best:bs;return c.length?c[Math.floor(Math.random()*c.length)]:-1;}
// Un camino que rodea las barreras (como bfs, pero sin pisar lo que cubren); si no hay, null y van derecho.
function eaterPath(sx,sy,goal,TW){if(!TW.length)return null;const N=MW*MH,prev=new Int32Array(N).fill(-2),q=new Int32Array(N),s=sy*MW+sx;let h=0,t=0;prev[s]=-1;q[t++]=s;
  while(h<t){const c=q[h++],cx=c%MW,cy=(c/MW)|0;
    if(goal(cx,cy)){const path=[];let k=c;while(k!==s){path.push([k%MW,(k/MW)|0]);k=prev[k];}return path.reverse();}
    for(const[dx,dy]of DIRS){const nx=cx+dx,ny=cy+dy;if(!inb(nx,ny))continue;const n=ny*MW+nx;if(prev[n]!==-2||!passable(nx,ny)||jammed(TW,nx,ny))continue;prev[n]=c;q[t++]=n;}}
  return null;}
function eaterNew(x,y,path){return{x,y,path,state:'go',face:1,moving:false,split:0,pop:0,wt:0,ox:(Math.random()-0.5)*0.5,oy:(Math.random()-0.5)*0.4,ph:Math.random()*6.28};}
function spawnEaters(free){const ti=eaterGoal(free);if(ti<0)return;const tx=ti%MW,ty=(ti/MW)|0,TW=towersXY();
  for(let k=0;k<40;k++){const an=Math.random()*6.283,d=EATER_FROM+Math.random()*3,x=Math.round(tx+Math.cos(an)*d),y=Math.round(ty+Math.sin(an)*d);
    if(!passable(x,y)||(TW.length&&jammed(TW,x,y)))continue;const path=eaterPath(x,y,(a,b)=>adj(a,b,tx,ty),TW)||pathAdj(x,y,tx,ty);if(!path)continue;
    eaterBroods.push({rift:[x,y],ti,t:0,ct:0,state:'on',bite:0,ate:{},told:false,pack:[eaterNew(x,y,path)],ph:Math.random()*6.28,jag:[0,1,2,3,4,5,6].map(()=>0.6+Math.random()*0.8)});
    toast('¡Se abrió una grieta del vacío! Sale un devorador: tocalo antes de que se divida.');return;}}
// El edificio más cercano que siga en pie (si el suyo ya no está).
function eaterNear(e){let ti=-1,bd=1e9;obj.forEach((o,i)=>{if(!o||!BUILD[o.t])return;const d=Math.hypot(i%MW-e.x,((i/MW)|0)-e.y);if(d<bd){bd=d;ti=i;}});return ti;}
// Camina hasta su edificio; si ya está al lado, come.
function eaterGo(c,e){if(!obj[c.ti]||!BUILD[obj[c.ti].t]){c.ti=eaterNear(e);if(c.ti<0){eaterBack(c,e);return;}}
  const[x,y]=tileOf(e),tx=c.ti%MW,ty=(c.ti/MW)|0;if(adj(x,y,tx,ty)){e.state='eat';e.path=[];return;}
  e.state='go';e.path=eaterPath(x,y,(a,b)=>adj(a,b,tx,ty),towersXY())||pathAdj(x,y,tx,ty)||[];if(!e.path.length)eaterBack(c,e);}
// Vuelve a su grieta; si no hay camino, se mete al vacío donde está.
function eaterBack(c,e){e.state='back';const[x,y]=tileOf(e),[rx,ry]=c.rift;if(x===rx&&y===ry){e.path=[];return;}
  const goal=(a,b)=>a===rx&&b===ry;e.path=eaterPath(x,y,goal,towersXY())||bfs(x,y,goal)||[];if(!e.path.length)e.gone=true;}
function eaterKill(c,e,txt){e.dead=true;c.pack=c.pack.filter(q=>q!==e);zaps.push({x:e.x,y:e.y,t:0.5});if(txt)float(e.x,e.y-1,txt,'#5fe3d0');}
function eaterClose(c){if(c.state==='close')return;c.state='close';c.ct=0;zaps.push({x:c.rift[0],y:c.rift[1],t:0.6});}
// "1 idea", "3 ideas", "1 moneda": el nombre del recurso en singular cuando es uno.
const eaterRN=(k,n)=>n===1&&(k==='ideas'||k==='monedas')?RN[k].toLowerCase().slice(0,-1):RN[k].toLowerCase();
const eaterAte=c=>Object.entries(c.ate).filter(([,v])=>v>0).map(([k,v])=>v+' '+eaterRN(k,v)).join(' y ');
function updateEaters(dt){if(!eaterBroods.length)return;const TW=towersXY(),sp=eaterSplit();
  for(const c of eaterBroods){c.t+=dt;
    if(c.state==='close'){c.ct+=dt;continue;}
    // Se llenaron: la camada vuelve a su grieta.
    if(c.state==='on'&&c.t>=EATER_LIFE){c.state='back';for(const e of c.pack)eaterBack(c,e);}
    // Por las dudas: los que medio minuto después no llegaron a la grieta se meten al vacío donde estén.
    if(c.t>=EATER_LIFE+30)for(const e of c.pack)e.gone=true;
    const n0=c.pack.length;
    for(const e of c.pack.slice()){e.pop=Math.max(0,e.pop-dt);
      stepEnt(e,dt,EATER_SPD);if(e.blocked){e.blocked=false;e.path=[];if(e.state==='back')eaterBack(c,e);else eaterGo(c,e);}
      if(TW.length&&jammed(TW,e.x,e.y)){eaterKill(c,e,'¡deshecho!');continue;}
      if(e.state==='back'){if(!e.path.length)e.gone=true;continue;}
      if(e.state==='go'){if(!e.path.length)eaterGo(c,e);}
      // Come dando vueltas alrededor del edificio, de un casillero pegado a otro.
      else if(!e.path.length){e.wt-=dt;if(e.wt<=0){e.wt=0.6+Math.random()*1.2;const o=obj[c.ti];if(!o||!BUILD[o.t]){eaterGo(c,e);continue;}
        const[x,y]=tileOf(e),tx=c.ti%MW,ty=(c.ti/MW)|0,ns=DIRS8.map(([a,b])=>[x+a,y+b]).filter(([a,b])=>passable(a,b)&&adj(a,b,tx,ty));
        if(ns.length)e.path=[ns[Math.floor(Math.random()*ns.length)]];}}
      // Se divide: el nuevo sale del mismo lugar y hace lo mismo que el que lo largó.
      e.split+=dt;if(e.split>=sp&&c.pack.length<EATER_MAX){e.split=0;const k=eaterNew(e.x,e.y,e.path.slice());k.state=e.state;k.pop=e.pop=0.6;c.pack.push(k);}}
    // Los que llegaron a la grieta se meten.
    c.pack=c.pack.filter(e=>!e.gone&&!e.dead);
    if(c.pack.length>n0){const m=eaterMid(c);float(m.x,m.y-1.3,'¡'+n0+' → '+c.pack.length+'!','#d08cff');
      if(!c.told){c.told=true;if(st.time-eaterToldT>=30){eaterToldT=st.time;toast('¡Un devorador se dividió en dos! Si los dejás, se duplican cada '+sp+' s.');}}}
    if(!c.pack.length){if(c.state==='back'){const a=eaterAte(c);float(c.rift[0],c.rift[1]-1,'se fueron','#c8b8ff');if(a)toast('Los devoradores volvieron al vacío. Se comieron '+a+'.');}eaterClose(c);continue;}
    // Cada tanto comen, todos juntos, de lo que más tengas.
    if(c.state==='on'){c.bite+=dt;if(c.bite>=EATER_BITE_T){c.bite=0;const n=c.pack.filter(e=>e.state==='eat').length;
      if(n){const k=RK.slice().sort((a,b)=>st.res[b]-st.res[a])[0],take=Math.min(Math.floor(st.res[k]),Math.round(n*EATER_BITE));
        if(take>0){st.res[k]-=take;c.ate[k]=(c.ate[k]||0)+take;const m=eaterMid(c);float(m.x,m.y-0.6,'−'+take+' '+eaterRN(k,take),'#e8654d');}}}}}
  eaterBroods=eaterBroods.filter(c=>c.state!=='close'||c.ct<0.8);}
// Devorador: una bola de vacío con estrellitas adentro, ojos dorados y una boca con dientes que se abre y se cierra (los dos
// cuadros); abajo, unos flecos que se mueven. Se arma la primera vez que hace falta (cuando ya están las ayudas del arte).
function eaterArt(f){return mkA(64,64,a=>{const V=P4('#0e0a18','#1c1530','#2e2450','#463a78'),RIM=hx('#8a6ae0'),G=hx('#ffd35a'),W=hx('#ffffff'),D=hx('#07040e');
  for(const[x,h]of[[21,f?6:4],[28,f?4:6],[36,f?6:4],[43,f?4:6]])poly(a,[[x-3,52],[x+3,52],[x+(f?1:-1),56+h]],V[1]);
  poly(a,[[19,34],[23,22],[28,31]],V[2]);poly(a,[[36,31],[41,22],[45,34]],V[2]);
  ell(a,32,42,18,15,(i,j)=>{const d=Math.hypot(i/18,j/15);return d>0.84&&i+j<-4?RIM:j<-6?V[2]:j<5?V[1]:V[0];});
  for(const[x,y,c]of[[22,44,W],[41,50,G],[27,53,W],[44,40,W],[34,31,G]])a.set(x,y,c);
  for(const x of[25,39]){ell(a,x,38,3.6,3.2,G);rect(a,x,36,1,5,D);a.set(x-2,37,W);}
  line(a,21,33,28,35,D,2);line(a,43,33,36,35,D,2);
  if(f){ell(a,32,48,10,5,(i,j)=>Math.hypot(i/10,j/5)<0.5?hx('#5a1a3a'):hx('#2a0818'));for(let x=24;x<=40;x+=4){poly(a,[[x-2,43],[x+2,43],[x,47]],W);poly(a,[[x-2,53],[x+2,53],[x,50]],W);}}
  else{rect(a,22,47,21,2,D);for(let x=23;x<=41;x+=3)poly(a,[[x-1.5,47],[x+1.5,47],[x,50]],W);}
  outlineAll(a,OUTL);});}
const eaterFrames=()=>EATER_SPR||(EATER_SPR=[eaterArt(0),eaterArt(1)]);
// Al dividirse, un anillo violeta que se abre alrededor de los dos.
function eaterPost(v){if(!(v.pop>0))return;const k=1-v.pop/0.6;ctx.strokeStyle='rgba(208,140,255,'+(1-k).toFixed(2)+')';ctx.lineWidth=0.8;ctx.beginPath();ctx.arc(v.x*T+8,v.y*T+9,3+k*7,0,6.29);ctx.stroke();}
// La grieta: una raja negra en el suelo con borde violeta y motas doradas que suben; se abre al salir el primero y se cierra
// cuando no queda ninguno. Debajo de cada devorador, el halo rojo de las amenazas.
function drawEaterRifts(){if(!eaterBroods.length)return;const t=performance.now()/1000;
  for(const c of eaterBroods){const k=c.state==='close'?Math.max(0,1-c.ct/0.8):Math.min(1,c.t/EATER_OPEN);if(k<=0)continue;const cx=c.rift[0]*T+8,cy=c.rift[1]*T+11,J=c.jag;
    ctx.fillStyle='rgba(232,101,77,'+((0.18+0.08*Math.sin(t*4+c.ph))*k).toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,cy,10*k,4*k,0,0,6.29);ctx.fill();
    ctx.fillStyle='rgba(180,140,255,'+((0.22+0.1*Math.sin(t*3+c.ph))*k).toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,cy,7.5*k,3*k,0,0,6.29);ctx.fill();
    ctx.beginPath();for(let j=0;j<7;j++){const x=cx+(j-3)*2.2*k,h=(j===0||j===6?0.2:J[j]*(j%2?1.8:2.6))*k;ctx.lineTo(x,cy-h);}
    for(let j=6;j>=0;j--){const x=cx+(j-3)*2.2*k+0.6,h=(j===0||j===6?0.2:J[6-j]*(j%2?1.4:1))*k;ctx.lineTo(x,cy+h);}ctx.closePath();
    ctx.fillStyle='#07040e';ctx.fill();ctx.strokeStyle='#b48cff';ctx.lineWidth=0.7;ctx.stroke();
    for(let j=0;j<3;j++){const ph=(t*0.7+j/3+c.ph)%1;ctx.fillStyle='rgba(255,211,90,'+(k*(1-ph)).toFixed(2)+')';ctx.fillRect(cx-3+j*3+Math.sin(t*2+j)*0.8,cy-1-ph*9,1,1);}}
  for(const c of eaterBroods)for(const e of c.pack){ctx.fillStyle='rgba(232,101,77,'+(0.3+0.1*Math.sin(t*5+e.ph)).toFixed(2)+')';ctx.beginPath();ctx.ellipse((e.x+e.ox)*T+8,(e.y+e.oy)*T+14.5,6,2.2,0,0,6.29);ctx.fill();}}
// De noche los ojos dorados brillan arriba de la oscuridad.
function drawEaterEyes(){const d=darkness();if(d<0.05||!eaterBroods.length)return;ctx.fillStyle='rgba(255,211,90,'+Math.min(1,d/0.5).toFixed(2)+')';
  for(const e of eaterAll()){const px=Math.round((e.x+e.ox)*T),py=Math.round((e.y+e.oy)*T)-3;for(const ex of[25,39]){const x=e.face<0?px+16-(ex+2)/4:px+(ex-2)/4;ctx.fillRect(x,py+8.7,1.1,1.4);}}}
// Con devoradores, la barra cuenta qué parte de los edificios está cerca de una barrera de vacío.
function eaterRow(p){const D=ERA.defense,bs=[],sh=[];obj.forEach((o,i)=>{if(o&&BUILD[o.t]){bs.push(i);if(o.t===D.id&&!o.bug)sh.push(i);}});
  const cov=bs.filter(i=>sh.some(j=>Math.hypot(j%MW-i%MW,((j/MW)|0)-((i/MW)|0))<=D.r)).length,n=eaterAll().length,on=sh.length>0||n>0||st.time>=EATER_START;
  $(p==='g'?'gridRow':'smogRow').hidden=!on;if(!on)return;const f=bs.length?cov/bs.length*100:0;
  $(p+'Fill').style.width=f+'%';$(p+'Fill').classList.toggle('hi',n>0);$(p+'Num').textContent=Math.round(f)+'%';
  $(p+'Meta').textContent=n?(n===1?'1 devorador':n+' devoradores'):sh.length?'vacío en calma':'sin '+D.label.toLowerCase();}
amenaza({on:'eaters',
  reset(){eaterBroods=[];eaterToldT=-1e9;},
  tick(step){if(st.time>=EATER_START&&Math.random()<step/eaterEvery())spawnEaters();},
  update:updateEaters,
  targets(add){for(const e of eaterAll())add(e.x,e.y,Math.round(e.x),Math.round(e.y));},
  // Un toque por devorador (es lo mismo que targets, pero queda dicho: cada toque mata uno).
  botTaps:()=>eaterAll().map(e=>[Math.round(e.x),Math.round(e.y)]),
  // Se dibujan con la gente, corridos un poco cada uno para que la camada se vea como un enjambre; comiendo, mastican.
  ents(list){if(!eaterBroods.length)return;const F=eaterFrames();
    for(const e of eaterAll()){const v={x:e.x+e.ox,y:e.y+e.oy,face:e.face,moving:e.moving||e.state==='eat',pop:e.pop};list.push({k:v.y+1,z:1,e:v,f:F,post:eaterPost});}},
  drawUnder:drawEaterRifts,
  drawTop:drawEaterEyes,
  lights(L){for(const c of eaterBroods)if(c.state!=='close')L.push([c.rift[0]*T+8,c.rift[1]*T+10,1.8,0.8]);},
  arrows:()=>eaterBroods.filter(c=>c.pack.length).map(eaterMid),
  hint(){const cs=eaterBroods.filter(c=>c.pack.length);if(!cs.length)return null;const n=cs.reduce((s,c)=>s+c.pack.length,0);
    if(cs.every(c=>c.state==='back'))return['Se vuelven al vacío:',(n===1?'el devorador se llenó':'los devoradores se llenaron')+'. Tocalos igual: dan ideas.'];
    return['¡Devoradores!',(n===1?'Hay uno: ':'Hay '+n+': ')+'comen lo que más tenés y cada '+eaterSplit()+' s se dividen. Cada toque mata uno.'];},
  row:eaterRow,
  // Cada toque mata al devorador más cercano; el último de la camada cierra la grieta.
  tap(tx,ty){let hit=null,hc=null,bd=EATER_HIT;for(const c of eaterBroods)for(const e of c.pack){const d=Math.hypot(e.x-tx,e.y-ty);if(d<=bd){bd=d;hit=e;hc=c;}}
    if(!hit)return false;eaterKill(hc,hit,null);const last=!hc.pack.length,g=last?2:1;st.res.ideas+=g;float(hit.x,hit.y-1,'+'+g+(g===1?' idea':' ideas'),RCOL.ideas);
    if(last){eaterClose(hc);toast('¡Camada deshecha! La grieta se cerró.');}else toast('¡Uno menos! '+(hc.pack.length===1?'Queda 1.':'Quedan '+hc.pack.length+'.'));
    return true;},
  prueba(){for(let k=0;k<2;k++)spawnEaters(true);},
  debug:{eaters:()=>eaterAll(),eaterBroods:()=>eaterBroods,spawnEaters:()=>spawnEaters(),eaterEvery:()=>eaterEvery(),eaterArt:f=>eaterArt(f)},
  // Cazador del vacío: casco con visor que brilla y un arpón de luz con la punta dorada.
  guardia:{kind:'cazador',pal:{c:'#2c3550',C:'#1e2538',j:'#ecc05a'},draw(a,K){const H=P4('#5a6478','#8a96a8','#c8d2dc','#eef3f8'),VI=hx('#5fe3d0');
      line(a,46,60,58,10,H[1],2);line(a,47,60,59,10,H[0],1);line(a,56,15,53,19,H[2],1);line(a,60,15,62,19,H[2],1);
      ell(a,58,7,4.5,6.5,hx('#ecc05a'));poly(a,[[55,12],[61,12],[58,0]],hx('#fff0b0'));line(a,58,3,58,10,hx('#ffffff'),1);
      ell(a,32,15,15,13,(i,j)=>j<=5?(i<-6&&j<-4?H[3]:i>7?H[1]:H[2]):null);rect(a,16,14,4,9,H[1]);rect(a,44,14,4,9,H[1]);
      rect(a,19,16,26,8,hx('#1e2538'));rect(a,20,17,24,5,VI);rect(a,22,17,9,1,hx('#e8fff8'));rect(a,38,1,2,4,H[1]);ell(a,39,1,1.5,1.5,hx('#ffd35a'));}}});
