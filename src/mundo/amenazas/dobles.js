// Dobles: la amenaza de la era multiversal (ERA.twins). Es la primera que vive en su propio archivo: el build la mete en
// el motor y ella se engancha con amenaza({...}). Sirve de ejemplo para las amenazas nuevas (ver LEEME.md en esta carpeta).
// Dobles (ERA.twins, octubre de 2026): de otros universos llegan copias de tu gente. Desde TWIN_START, cada ~twinEvery() segundos
// se abre un portal a TWIN_FROM casilleros de un edificio y sale el doble de alguien de tu gente, con su mismo dibujo. Camina
// hasta la ciudad y se mezcla: anda de un edificio a otro y cada TWIN_STEAL segundos roba (twinCut() de lo que más tengas entre
// ideas, monedas y mineral; se ve el número arriba de él). Después de TWIN_TRIPS robos vuelve a su portal y se escapa con todo.
// Lo delata que titila cada tanto (un corte de colores) y, más fuerte, justo después de robar. Tocarlo lo manda de vuelta a su
// universo (+2 ideas) y devuelve lo robado. La defensa de la era (el espejo de la verdad) desenmascara y echa a los que pasan a
// ERA.defense.r casilleros. Vienen más seguido con cada invento (+10%) y con el comercio entre universos (+30%); con la prueba de
// identidad roban la mitad. No se guardan (lo que llevaban se pierde con ellos).
let twins=[];
const TWIN_START=120,TWIN_FROM=11,TWIN_SPD=1.6,TWIN_STEAL=7,TWIN_TRIPS=4,TWIN_CUT=0.06,TWIN_MIN=3;
const twinEvery=()=>40/((1+0.1*Object.keys(st.techs).length)*(st.techs.canje?1.3:1));
const twinOut=w=>w.state!=='gone';
const twinCut=()=>TWIN_CUT*(st.techs.identidad?0.5:1);
function spawnTwin(){const bs=[];obj.forEach((o,i)=>{if(o&&BUILD[o.t])bs.push(i);});if(!bs.length||!vil.length)return;
  const src=vil[Math.floor(Math.random()*vil.length)],ti=bs[Math.floor(Math.random()*bs.length)],tx=ti%MW,ty=(ti/MW)|0;
  for(let k=0;k<40;k++){const an=Math.random()*6.283,d=TWIN_FROM+Math.random()*3,x=Math.round(tx+Math.cos(an)*d),y=Math.round(ty+Math.sin(an)*d);
    if(!passable(x,y))continue;const path=pathAdj(x,y,tx,ty);if(!path)continue;
    twins.push({x,y,home:[x,y],path,state:'come',face:1,moving:false,t:0,st:TWIN_STEAL,trips:0,loot:{},skin:src.skin,bot:!!src.bot,ph:Math.random()*5,reveal:0});
    toast('¡Se abrió un portal! Viene un doble de alguien de tu gente: buscá al que titila y tocalo.');return;}}
// Se escapa: camina hasta su portal.
function twinFlee(w){w.state='flee';const[x,y]=tileOf(w);w.path=bfs(x,y,(a,b)=>a===w.home[0]&&b===w.home[1])||[];if(!w.path.length&&(x!==w.home[0]||y!==w.home[1])){w.x=w.home[0];w.y=w.home[1];}}
// Lo manda de vuelta a su universo y devuelve lo que llevaba.
function expelTwin(w,txt){if(!twinOut(w))return;const got=Object.entries(w.loot).filter(([,v])=>v>0);for(const[k,v]of got)add(k,v);
  w.state='gone';w.gt=0;w.loot={};zaps.push({x:w.x,y:w.y,t:0.5});float(w.x,w.y-1,txt,'#5fe3d0');if(got.length)float(w.x,w.y-0.4,'+'+got.map(([k,v])=>fmt(v)+' '+RN[k].toLowerCase()).join(' y '),'#93d36c');}
function twinSteal(w){const ks=['ideas','monedas',ORE].sort((a,b)=>relRes(b)-relRes(a)),k=ks[0],have=Math.floor(st.res[k]),n=Math.min(have,Math.max(TWIN_MIN*unitOf(k),Math.floor(have*twinCut())));
  w.trips++;if(n<=0)return;st.res[k]-=n;w.loot[k]=(w.loot[k]||0)+n;w.reveal=1.5;float(w.x,w.y-1,'−'+fmt(n)+' '+RN[k].toLowerCase(),'#d08cff');
  if(!w.told){w.told=true;toast('¡Alguien de tu gente te robó '+fmt(n)+' '+RN[k].toLowerCase()+'! Es un doble: tocalo para devolverlo a su universo.');}}
function updateTwins(dt){if(!twins.length)return;const T=towersXY();
  for(const w of twins){
    if(w.state==='gone'){w.gt+=dt;continue;}
    w.t+=dt;w.reveal=Math.max(0,w.reveal-dt);stepEnt(w,dt,TWIN_SPD);if(w.blocked){w.blocked=false;w.path=[];}
    if(T.length&&jammed(T,w.x,w.y)){expelTwin(w,'¡desenmascarado!');continue;}
    if(w.state==='come'){if(!w.path.length){w.state='blend';w.st=TWIN_STEAL*0.6;}continue;}
    if(w.state==='blend'){w.st-=dt;if(w.st<=0){w.st=TWIN_STEAL;twinSteal(w);if(w.trips>=TWIN_TRIPS){twinFlee(w);continue;}}
      // Anda de un edificio a otro, como uno más.
      if(!w.path.length){w.wt=(w.wt||0)-dt;if(w.wt<=0){w.wt=1+Math.random()*2;const[x,y]=tileOf(w),bs=[];obj.forEach((o,i)=>{if(o&&BUILD[o.t]&&Math.hypot(i%MW-x,((i/MW)|0)-y)<=6)bs.push(i);});
        if(bs.length){const i=bs[Math.floor(Math.random()*bs.length)];w.path=pathAdj(x,y,i%MW,(i/MW)|0)||[];}}}
      continue;}
    // Llegó a su portal: se va con lo robado.
    if(!w.path.length){const got=Object.entries(w.loot).filter(([,v])=>v>0);w.state='gone';w.gt=0;zaps.push({x:w.x,y:w.y,t:0.5});
      if(got.length){float(w.x,w.y-1,'se escapó','#e8654d');toast('Un doble se escapó a su universo con '+got.map(([k,v])=>fmt(v)+' '+RN[k].toLowerCase()).join(' y ')+'.');}}}
  twins=twins.filter(w=>twinOut(w)||w.gt<0.8);}
// Doble: titila cada tanto con un corte de colores (más fuerte justo después de robar); su portal es un óvalo violeta que gira.
function drawGlitch(w){const t=performance.now()/1000+w.ph;if(!(w.reveal>0)&&t%1.8>0.16)return;const px=w.x*T,py=w.y*T-3,f=Math.floor(t*24);
  ctx.globalAlpha=0.8;for(let k=0;k<3;k++){const r=((f*7+k*13)%11)/11;ctx.fillStyle=k%2?'#4fe8ff':'#ff4fd8';ctx.fillRect(px+1+(r*4-2),py+2+r*12,13,1.4);}
  ctx.globalAlpha=1;}
function drawTwinPortals(){if(!twins.length)return;const t=performance.now()/1000;
  for(const w of twins){const k=twinOut(w)?1:Math.max(0,1-w.gt/0.8),cx=w.home[0]*T+8,cy=w.home[1]*T+7;if(k<=0)continue;ctx.globalAlpha=k;
    ctx.fillStyle='rgba(232,101,77,'+(0.16+0.08*Math.sin(t*4)).toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,cy+8,7,2.5,0,0,6.29);ctx.fill();
    ctx.fillStyle='rgba(40,16,70,.7)';ctx.beginPath();ctx.ellipse(cx,cy,4.2,7,0,0,6.29);ctx.fill();
    for(let j=0;j<3;j++){const a0=t*(2+j)+j*2;ctx.strokeStyle=['#d08cff','#4fe8ff','#ff4fd8'][j];ctx.lineWidth=0.8;ctx.beginPath();ctx.ellipse(cx,cy,4.6-j*1.2,7.4-j*1.8,0,a0,a0+3.6);ctx.stroke();}
    ctx.globalAlpha=1;}}
// Con dobles, la barra cuenta qué parte de tu gente trabaja cerca de un espejo de la verdad.
function twinRow(p){const T=towersXY(),pop=vil.filter(v=>!v.away),cov=T.length?pop.filter(v=>jammed(T,v.x,v.y)).length:0,n=twins.filter(twinOut).length,
    on=T.length>0||n>0||st.time>=TWIN_START;$(p==='g'?'gridRow':'smogRow').hidden=!on;if(!on)return;const f=pop.length?cov/pop.length*100:0;
  $(p+'Fill').style.width=f+'%';$(p+'Fill').classList.toggle('hi',n>0);$(p+'Num').textContent=Math.round(f)+'%';
  $(p+'Meta').textContent=n?(n===1?'1 doble suelto':n+' dobles sueltos'):T.length?'gente verificada':'sin '+ERA.defense.label.toLowerCase();}
amenaza({on:'twins',
  reset(){twins=[];},
  tick(step){if(st.time>=TWIN_START&&Math.random()<step/twinEvery())spawnTwin();},
  update:updateTwins,
  targets(add){for(const w of twins)if(twinOut(w))add(w.x,w.y,Math.round(w.x),Math.round(w.y));},
  // Se dibuja como la persona que copia, con el corte de colores encima (y transparente frente a un edificio, como ella).
  ents(list){for(const w of twins)if(twinOut(w))list.push({k:w.y+1,z:1,e:w,f:w.bot?HS.robot:HS.vil[w.skin%3],post:drawGlitch,ghost:true});},
  drawUnder:drawTwinPortals,
  lights(L){for(const w of twins)if(twinOut(w))L.push([w.home[0]*T+8,w.home[1]*T+7,2.2,0.85]);},
  // La flecha del borde apunta al portal, no al doble (que se mezcla con tu gente).
  arrows:()=>twins.filter(twinOut).map(w=>({x:w.home[0],y:w.home[1]})),
  hint(){const ws=twins.filter(twinOut),fl=ws.filter(w=>w.state==='flee').length;
    if(fl)return['¡Se escapa un doble!',(fl===1?'Vuelve a su portal':'Vuelven '+fl+' a sus portales')+' con lo que robó: tocalo antes de que llegue.'];
    if(ws.length)return['¡Dobles!',(ws.length===1?'Hay uno disfrazado':'Hay '+ws.length+' disfrazados')+' entre tu gente y te roba'+(ws.length===1?'':'n')+': buscá al que titila y tocalo.'];
    return null;},
  row:twinRow,
  // Un doble se toca donde está, aunque haya alguien de tu gente al lado.
  tap(tx,ty){const hit=twins.find(w=>twinOut(w)&&Math.hypot(w.x-tx,w.y-ty)<=1.0);
    if(hit){expelTwin(hit,'¡era un doble!');st.res.ideas+=2*IX;float(hit.x,hit.y-1.6,ideaTxt(2),RCOL.ideas);toast('¡Era un doble! Volvió a su universo.');return true;}
    return false;},
  prueba(){for(let k=0;k<3;k++)spawnTwin();},
  debug:{twins:()=>twins,spawnTwin:()=>spawnTwin(),twinEvery:()=>twinEvery()},
  // Detective: gorra de cazador a cuadros con orejeras y una lupa en la mano.
  guardia:{kind:'detective',pal:{c:'#a8865a',C:'#7a5e3a',j:'#4a3a2a'},draw(a,K){const C1=hx('#8a6a3a'),C2=hx('#6a4e2a');ell(a,32,9,13,7,(i,j)=>j<=2?(((i>>1)+(j>>1))&1?C1:C2):null);rect(a,19,9,4,8,C2);rect(a,41,9,4,8,C2);rect(a,30,1,4,2,C2);
      line(a,48,46,52,36,hx('#5a3a20'),2);ell(a,54,31,5,5,(i,j)=>{const d=Math.hypot(i,j);return d>3.6?hx('#c8a050'):d>1.5||i>0?hx('#bfe4f4'):hx('#ffffff');});}}});
