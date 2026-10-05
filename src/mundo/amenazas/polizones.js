// Polizones: la amenaza de la era de la vida (ERA.riders, octubre de 2026). La mecánica nueva es que se suben a tu gente.
// Desde RIDER_START, cada ~riderEvery() segundos sale del bosque (de un casillero libre pegado a un árbol, a RIDER_FROM–
// RIDER_FROM+4 casilleros de alguien de tu gente y lejos de los arcos) un polizón: un bichito que corre a RIDER_SPD casilleros
// por segundo hacia la persona libre más cercana (aldeano o robot; mejor si viene cargada, RIDER_LOAD) y se le sube a la cabeza.
// Mientras lo lleva, cada entrega de esa persona se la come: apenas junta su carga y sale para su casa, el polizón se la come
// entera (la mitad con el repelente, riderEat()) y se ve el número. Cuando comió RIDER_FULL, salta a otra persona que tenga a
// RIDER_HOP casilleros o menos (mejor si viene cargada), y así recorre la ciudad. Tocar a la persona que lo lleva, o al bichito,
// lo baja y lo espanta (+2 ideas); lo que comió no vuelve. Si nadie lo toca, a los RIDER_LIFE segundos se baja y se vuelve al
// bosque, lleno: el daño se termina solo. Si no queda nadie libre, igual sale y espera su turno, pero nunca hay más de
// RIDER_SHARE polizones por persona. La defensa de la era (el arco de limpieza) limpia a la gente que trabaja (o se queda quieta)
// a ERA.defense.r casilleros o menos y espanta a los polizones que corren cerca; al que pasa caminando, el polizón se le agarra
// fuerte. El cuidador (el guardián) va solo a bajárselo a quien lo lleva: no persigue bichos por el bosque. Vienen más seguido
// con cada invento (+10%) y con la feria de especies (+30%). No se guardan: al cargar, tu gente ya está limpia.
// Sin tocar el motor: las amenazas se actualizan antes que los aldeanos, así que el polizón ve al que salió para su casa con algo
// (state 'return' y v.carry) y le vacía la carga; al llegar, deposit no suma nada.
// Calibrado con el bot (la era sola, 20 corridas): con lo de la hoja de ruta (uno cada 40 s que se va a los 90 s, comiendo al
// llegar a la casa), sin tocarlos ni defensas tardaba ~10,3 min contra 9,8 tocándolos: lo que se pierde es lo que junta la gente
// y, como con las sirenas, pesa poco hasta que falta casi todo. Comiendo además de lo guardado, se iba hasta 22 min cuando no
// dejaban juntar esporas para los inventos. Y el arco y el cuidador los bajaban antes de que comieran (con 2 cuarteles, 9,6).
// Ahora vienen más seguido (cada 16 s) y duran menos (75 s), comen apenas sale la carga, buscan al que va cargado, saltan después
// de cada carga y el arco no limpia al que pasa caminando: tocándolos, 9,6; con 2 cuarteles, 10,1; con 2 arcos, 10,8; sin nada,
// 13,9 (de 9,5 a 16,5).
let riders=[],riderSpr=null,riderToldT=-1e9,riderEaten=0;
const RIDER_START=120,RIDER_FROM=9,RIDER_SPD=3.2,RIDER_CLIMB=0.45,RIDER_LIFE=75,RIDER_EAT=1,RIDER_FULL=4,RIDER_HOP=3,RIDER_HOP_T=0.7,RIDER_HIT=1.3,
  RIDER_FLEE=1.2,RIDER_SHARE=1.25,RIDER_LOAD=3;
const riderEvery=()=>16/((1+0.1*Object.keys(st.techs).length)*(st.techs.trueque?1.3:1));
const riderEat=()=>RIDER_EAT*(st.techs.repelente?0.5:1);
const riderOut=r=>r.state==='come'||r.state==='ride'||r.state==='hop';
// Se le puede subir al que anda libre: no lo tiene otra amenaza, no lleva uno y no va otro polizón a buscarlo.
const riderFree=(v,r)=>!v.away&&!v.held&&!v.abd&&!v.orb&&!v.bad&&!v.rider&&!riders.some(q=>q!==r&&(q.state==='come'&&q.prey===v||q.state==='hop'&&q.to===v));
// Dónde está: en la cabeza de quien lo lleva, o donde va corriendo o saltando.
const riderAt=r=>r.state==='ride'&&r.host?{x:r.host.x,y:r.host.y}:{x:r.x,y:r.y};
// El nombre del recurso como en los otros avisos, en singular cuando es una idea o una moneda.
const riderRN=(k,n)=>n===1&&(k==='ideas'||k==='monedas')?RN[k].toLowerCase().slice(0,-1):RN[k].toLowerCase();
const riderAte=r=>Object.entries(r.ate).filter(([,v])=>v>=1).map(([k,v])=>fmt(Math.round(v))+' '+riderRN(k,Math.round(v))).join(' y ');
function spawnRider(){const T=towersXY(),pop=vil.filter(v=>!v.away&&!v.held),free=pop.filter(v=>riderFree(v,null)),ppl=free.length?free:pop;
  if(!ppl.length||riders.filter(riderOut).length>=Math.max(1,Math.round(pop.length*RIDER_SHARE)))return false;
  const p=ppl[Math.floor(Math.random()*ppl.length)],px=Math.round(p.x),py=Math.round(p.y),R=RIDER_FROM+4,cand=[];
  for(let y=py-R;y<=py+R;y++)for(let x=px-R;x<=px+R;x++){const d=Math.hypot(x-px,y-py);if(d<RIDER_FROM||d>R||!passable(x,y)||(T.length&&jammed(T,x,y)))continue;
    if(DIRS8.some(([a,b])=>{const o=inb(x+a,y+b)&&obj[(y+b)*MW+x+a];return!!o&&o.t==='tree';}))cand.push([x,y]);}
  let at=cand.length?cand[Math.floor(Math.random()*cand.length)]:null;
  // Si por ahí no hay bosque, de cualquier lugar libre a esa distancia.
  for(let k=0;k<40&&!at;k++){const an=Math.random()*6.283,d=RIDER_FROM+Math.random()*3,x=Math.round(px+Math.cos(an)*d),y=Math.round(py+Math.sin(an)*d);if(passable(x,y)&&!(T.length&&jammed(T,x,y)))at=[x,y];}
  if(!at)return false;
  const r={x:at[0],y:at[1],home:at,path:[],state:'come',t:0,face:1,moving:false,host:null,prey:null,to:null,belly:0,ate:{},re:0,hold:0,chew:0,ph:Math.random()*6.28};
  riders.push(r);riderAim(r);
  if(st.time-riderToldT>=20){riderToldT=st.time;toast('¡Un polizón salió del bosque! Va a subirse a alguien de tu gente: tocalo antes.');}
  return true;}
// Elige a la persona libre más cercana (la que viene cargada cuenta como si estuviera RIDER_LOAD casilleros más cerca) y arma el
// camino hasta ella; lo rehace cada tanto, porque la gente se mueve.
function riderAim(r){let best=null,bd=1e9;for(const v of vil){if(!riderFree(v,r))continue;const d=Math.hypot(v.x-r.x,v.y-r.y)-(v.carry>0?RIDER_LOAD:0);if(d<bd){bd=d;best=v;}}
  r.prey=best;r.re=0.7;r.path=[];if(best){const[x,y]=tileOf(r);r.path=pathAdj(x,y,Math.round(best.x),Math.round(best.y))||[];}}
function riderMount(r,v){r.state='ride';r.host=v;r.prey=r.to=null;r.path=[];r.belly=0;r.hold=0;r.bit=false;v.rider=r;zaps.push({x:v.x,y:v.y-0.6,t:0.4});float(v.x,v.y-1.3,'¡se le subió!','#ff8ad8');
  if(!r.told){r.told=true;if(st.time-riderToldT>=20){riderToldT=st.time;toast('¡Un polizón se le subió a '+(v.bot?'un robot':'un aldeano')+'! Se come lo que entrega: tocalo para bajarlo.');}}}
// Se baja de quien lo lleva (queda donde estaba esa persona).
function riderDrop(r){const v=r.host;if(v){if(v.rider===r)v.rider=null;r.x=v.x;r.y=v.y;}r.host=null;}
// Lo espantan (un toque, un cuidador o un arco): se baja y huye corriendo hacia el bosque mientras se desvanece.
function riderScare(r,txt){if(!riderOut(r))return;riderDrop(r);r.state='flee';r.t=0;r.path=[];r.to=r.prey=null;
  let dx=r.home[0]-r.x,dy=r.home[1]-r.y,d=Math.hypot(dx,dy);if(d<0.5){const an=Math.random()*6.283;dx=Math.cos(an);dy=Math.sin(an);d=1;}
  r.fx=dx/d;r.fy=dy/d;r.face=dx>0?1:-1;zaps.push({x:r.x,y:r.y-0.5,t:0.5});if(txt)float(r.x,r.y-1.4,txt,'#5fe3d0');}
// Se llenó: se baja y vuelve caminando, despacio, a su lugar del bosque.
function riderLeave(r){const was=r.state==='ride';riderDrop(r);r.state='leave';r.t=0;r.to=r.prey=null;const[x,y]=tileOf(r);r.path=bfs(x,y,(a,b)=>a===r.home[0]&&b===r.home[1])||[];
  float(r.x,r.y-1.3,'se fue lleno','#c8b8ff');const a=riderAte(r);if(was&&a)toast('Un polizón se volvió al bosque, lleno: se comió '+a+'.');}
// Salta a otra persona cerca: la más cercana, y mejor si viene cargada.
function riderHop(r){const h=r.host;let best=null,bd=1e9;for(const v of vil){if(v===h||!riderFree(v,r))continue;const d=Math.hypot(v.x-h.x,v.y-h.y);if(d>RIDER_HOP)continue;
    const s=d-(v.carry>0?1.5:0);if(s<bd){bd=s;best=v;}}
  if(!best)return false;riderDrop(r);r.state='hop';r.to=best;r.ht=0;r.fx=h.x;r.fy=h.y;r.belly=0;float(h.x,h.y-1.5,'¡saltó!','#ff8ad8');return true;}
// Se come la entrega: la carga entera (RIDER_EAT; con el repelente, la mitad, y el resto llega a la casa).
function riderBite(r,v){const k=v.kind,c=v.carry,n=Math.min(c,c*riderEat());if(n<=0)return;
  v.carry=c-n<0.05?0:Math.round((c-n)*10)/10;r.belly+=n;r.ate[k]=(r.ate[k]||0)+n;r.chew=1;riderEaten+=n;float(v.x,v.y-1.7,'−'+fmt(Math.round(n*10)/10)+' '+riderRN(k,n),'#ff8ad8');}
function updateRiders(dt){if(!riders.length)return;const T=towersXY();
  for(const r of riders){r.t+=dt;r.chew=Math.max(0,r.chew-dt);
    if(r.state==='flee'){r.x+=r.fx*dt*4;r.y+=r.fy*dt*4;r.moving=true;if(r.t>=RIDER_FLEE)r.dead=true;continue;}
    if(r.state==='leave'){stepEnt(r,dt,1.6);if(r.blocked){r.blocked=false;r.path=[];}if(!r.path.length||r.t>=12)r.dead=true;continue;}
    if(r.t>=RIDER_LIFE){riderLeave(r);continue;}
    if(r.state==='ride'){const v=r.host;
      // Si a quien lo lleva se lo llevó otra cosa, se baja y busca a otro.
      if(!v||!vil.includes(v)||v.away||v.held||v.abd||v.orb){riderDrop(r);r.state='come';riderAim(r);continue;}
      // La gente que trabaja (o se queda quieta) cerca de un arco de limpieza queda limpia; al que pasa caminando, el polizón se
      // le agarra fuerte.
      if(T.length&&v.state!=='go'&&v.state!=='return'&&jammed(T,v.x,v.y)){riderScare(r,'¡limpio!');continue;}
      r.x=v.x;r.y=v.y;r.face=v.face;
      // Salió para su casa con algo: se lo come (una vez por viaje; con el repelente, lo que deja llega a la casa).
      if(v.state!=='return')r.bit=false;else if(!r.bit&&v.carry>0&&v.kind){r.bit=true;riderBite(r,v);}
      if(r.belly>=RIDER_FULL){r.hold-=dt;if(r.hold<=0){r.hold=0.5;riderHop(r);}}
      continue;}
    if(r.state==='hop'){r.ht+=dt;const v=r.to,k=Math.min(1,r.ht/RIDER_HOP_T);r.x=r.fx+(v.x-r.fx)*k;r.y=r.fy+(v.y-r.fy)*k;if(Math.abs(v.x-r.fx)>0.05)r.face=v.x>r.fx?1:-1;
      if(k>=1){if(vil.includes(v)&&riderFree(v,r))riderMount(r,v);else{r.state='come';r.to=null;riderAim(r);}}
      continue;}
    // Corre hacia la persona libre más cercana; al alcanzarla, se le sube. Cerca de un arco, se espanta.
    if(T.length&&jammed(T,r.x,r.y)){riderScare(r,'¡espantado!');continue;}
    r.re-=dt;if(!r.prey||!riderFree(r.prey,r)||r.re<=0)riderAim(r);const v=r.prey;
    if(v){const d=Math.hypot(v.x-r.x,v.y-r.y);if(d<=RIDER_CLIMB){riderMount(r,v);continue;}
      if(d<=1.6){const k=Math.min(d,RIDER_SPD*dt);r.x+=(v.x-r.x)/d*k;r.y+=(v.y-r.y)/d*k;if(Math.abs(v.x-r.x)>0.05)r.face=v.x>r.x?1:-1;r.moving=true;r.path=[];continue;}}
    stepEnt(r,dt,RIDER_SPD);if(r.blocked){r.blocked=false;r.path=[];r.re=0;}}
  riders=riders.filter(r=>!r.dead);}
// Polizón: un bichito peludo y redondo, fucsia, con dos ojos grandes amarillos, antenas y patitas. En el suelo corre (mode 0,
// dos cuadros); en una cabeza se agarra con las patas a los costados (mode 1) y, al comer, abre la boca (f). Mide 48×40 (12×10
// en el mundo); para la gente, el del suelo va abajo de un lienzo de 64×64, como una persona.
function riderArt(f,mode){return mkA(48,40,a=>{const B=P4('#6a1450','#a8287e','#e04aa8','#ff8ad8'),Y=hx('#ffe14a'),K=hx('#1b1a24'),W=hx('#ffffff');
  if(mode)for(const s of[-1,1]){line(a,24+s*13,27,24+s*18,36,B[0],2);line(a,24+s*7,31,24+s*9,39,B[0],2);}
  else{const o=f?3:-3;for(const[x,d]of[[13,o],[20,-o],[28,o],[35,-o]])line(a,x,30,x+d,38,B[0],2);}
  line(a,18,11,13,3+(f?1:0),B[1],1);line(a,30,11,35,3+(f?0:1),B[1],1);ell(a,13,3,2.2,2.2,Y);ell(a,35,3,2.2,2.2,Y);
  for(let k=0;k<11;k++){const an=Math.PI*1.05+k*Math.PI*0.9/10,x=24+Math.cos(an)*17,y=22+Math.sin(an)*12;poly(a,[[x-1.6,y+1.2],[x+1.6,y+1.2],[x+Math.cos(an)*3,y+Math.sin(an)*3]],B[2]);}
  ell(a,24,22,17,12,(i,j)=>{const d=Math.hypot((i+5)/17,(j+5)/12);return d<0.45?B[3]:d<0.98?B[2]:B[1];});
  for(const[x,y]of[[10,23],[38,25],[31,13]])ell(a,x,y,2,1.4,B[3]);
  for(const x of[17,31]){ell(a,x,19,5.2,5.8,(i,j)=>Math.hypot(i,j)>4.8?K:Y);ell(a,x+1,20,2.3,2.8,K);a.set(x-1,17,W);a.set(x,17,W);}
  if(mode&&f){ell(a,24,29,6,3.6,K);ell(a,24,30.5,3.5,1.6,hx('#e8654d'));rect(a,20,26,2,2,W);rect(a,26,26,2,2,W);}
  else{line(a,18,28,24,30,K,1);line(a,24,30,30,28,K,1);rect(a,21,29,2,2,W);rect(a,25,29,2,2,W);}
  outlineAll(a,OUTL);});}
// Los cuadros: en el suelo (en un lienzo de persona) y en la cabeza. Se arman la primera vez que hacen falta.
function riderFrames(){if(riderSpr)return riderSpr;const big=c=>{const o=document.createElement('canvas');o.width=o.height=64;o.getContext('2d').drawImage(c,8,23);return o;};
  return riderSpr={run:[big(riderArt(0,0)),big(riderArt(1,0))],ride:[riderArt(0,1),riderArt(1,1)]};}
// Dónde va en la cabeza de una persona: arriba del pelo, siguiendo cómo camina o trabaja; se pone más gordo a medida que come.
function riderHead(v,r){const px=Math.round(v.x*T),py=Math.round(v.y*T),bob=v.state==='work'?(Math.sin(st.time*18)>0?-1:0):0,top=py-3+bob-Math.round((v.lift||0)*12),
    g=1+0.25*Math.min(1,r.belly/RIDER_FULL);return{cx:px+8,by:top+5,w:12*g,h:10*g};}
function riderDraw(fr,cx,by,w,h,face){ctx.save();if(face<0){ctx.translate(cx*2,0);ctx.scale(-1,1);}ctx.drawImage(fr,cx-w/2,by-h,w,h);ctx.restore();}
// Arriba de la persona que lo lleva (se dibuja justo después de ella, así respeta quién está adelante). Lo que trae para
// entregar no va arriba de la cabeza, donde lo taparía el polizón, sino agarrado por él, a un costado.
function riderPost(e){const v=e.host,r=v&&v.rider;if(!r||r.state!=='ride')return;const F=riderFrames(),p=riderHead(v,r),t=performance.now()/1000;
  riderDraw(r.chew>0?F.ride[Math.floor(t*8)%2]:F.ride[0],p.cx,p.by+(r.chew>0?0:Math.sin(t*5+r.ph)*0.4),p.w,p.h,v.face);
  if(v.carry&&v.kind&&I[v.kind])ctx.drawImage(I[v.kind],p.cx+(v.face<0?-p.w/2-2:p.w/2-4),p.by-6,6,6);}
// En el suelo: el halo rojo de lo que hay que tocar, abajo del polizón que corre y abajo de quien lo lleva (con un anillo fucsia).
function drawRiderHalos(){if(!riders.length)return;const t=performance.now()/1000;
  for(const r of riders){if(!riderOut(r))continue;const p=riderAt(r),cx=p.x*T+8,cy=p.y*T+14.5,a=0.28+0.1*Math.sin(t*6+r.ph);
    ctx.fillStyle='rgba(232,101,77,'+a.toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,cy,r.state==='ride'?7.5:6,r.state==='ride'?2.8:2.2,0,0,6.29);ctx.fill();
    if(r.state==='ride'){ctx.strokeStyle='rgba(255,138,216,.8)';ctx.lineWidth=0.7;ctx.setLineDash([2,1.5]);ctx.lineDashOffset=-t*4;ctx.beginPath();ctx.ellipse(cx,cy,8.5,3.2,0,0,6.29);ctx.stroke();ctx.setLineDash([]);}}}
// Lo que va por el aire o se desvanece: el que salta (con su sombra y una estela de puntos) y el que huye.
function drawRidersAir(){if(!riders.length)return;const F=riderFrames(),t=performance.now()/1000;
  for(const r of riders){
    if(r.state==='hop'){const k=Math.min(1,r.ht/RIDER_HOP_T),up=Math.sin(k*Math.PI)*14,cx=r.x*T+8,by=r.y*T-1-up;shadow(cx,r.y*T+15,4,1.2);
      ctx.fillStyle='rgba(255,138,216,.7)';for(let j=1;j<=4;j++){const q=Math.max(0,k-j*0.08),x=(r.fx+(r.to.x-r.fx)*q)*T+8,y=(r.fy+(r.to.y-r.fy)*q)*T-5-Math.sin(q*Math.PI)*14;ctx.fillRect(x-0.5,y-0.5,1,1);}
      riderDraw(F.ride[0],cx,by,12,10,r.face);}
    else if(r.state==='flee'){ctx.globalAlpha=Math.max(0,1-r.t/RIDER_FLEE);const px=r.x*T,py=r.y*T;riderDraw(F.run[Math.floor(t*10)%2],px+8,py+13,16,16,r.face);ctx.globalAlpha=1;}}}
// De noche, los ojos amarillos brillan arriba de la oscuridad.
function drawRiderEyes(){const d=darkness();if(d<0.05||!riders.length)return;ctx.fillStyle='rgba(255,225,74,'+Math.min(1,d/0.5).toFixed(2)+')';
  for(const r of riders){if(!riderOut(r)&&r.state!=='leave')continue;let cx,by,w,h;
    if(r.state==='ride'&&r.host){const p=riderHead(r.host,r);cx=p.cx;by=p.by;w=p.w;h=p.h;}
    else if(r.state==='hop'){cx=r.x*T+8;by=r.y*T-1-Math.sin(Math.min(1,r.ht/RIDER_HOP_T)*Math.PI)*14;w=12;h=10;}
    else{cx=r.x*T+8;by=r.y*T+12.75;w=12;h=10;}
    for(const ex of[17,31])ctx.fillRect(cx-w/2+ex/48*w-0.6,by-h+19/40*h-0.7,1.2,1.4);}}
// La barra cuenta qué parte de tu gente anda cerca de un arco de limpieza, y cuántos llevan polizón.
function riderRow(p){const T=towersXY(),pop=vil.filter(v=>!v.away),cov=T.length?pop.filter(v=>jammed(T,v.x,v.y)).length:0,out=riders.filter(riderOut),on=out.filter(r=>r.state==='ride').length,
    show=T.length>0||out.length>0||st.time>=RIDER_START;$(p==='g'?'gridRow':'smogRow').hidden=!show;if(!show)return;const f=pop.length?cov/pop.length*100:0;
  $(p+'Fill').style.width=f+'%';$(p+'Fill').classList.toggle('hi',out.length>0);$(p+'Num').textContent=Math.round(f)+'%';
  $(p+'Meta').textContent=on?on+(on===1?' con polizón':' con polizones'):out.length?(out.length===1?'1 polizón cerca':out.length+' polizones cerca'):T.length?'gente limpia':'sin '+ERA.defense.label.toLowerCase();}
amenaza({on:'riders',
  reset(){riders=[];riderToldT=-1e9;riderEaten=0;for(const v of vil)v.rider=null;},
  tick(step){if(st.time>=RIDER_START&&Math.random()<step/riderEvery())spawnRider();},
  update:updateRiders,
  // El cuidador va a bajarle el polizón a quien lo lleva (no persigue bichos por el bosque); el bot, como alguien atento, también
  // toca a los que vienen corriendo. Se los toca donde están: en la cabeza de quien los lleva o en el suelo.
  targets(add){for(const r of riders)if(r.state==='ride'){const p=riderAt(r);add(p.x,p.y,Math.round(p.x),Math.round(p.y));}},
  botTaps:()=>riders.filter(riderOut).map(r=>{const p=riderAt(r);return[Math.round(p.x),Math.round(p.y)];}),
  // Corriendo o volviéndose, va con la gente (ordenado por profundidad); arriba de una cabeza, justo después de quien lo lleva.
  ents(list){if(!riders.length)return;const F=riderFrames();
    // La persona va con una copia sin la carga (el motor la dibujaría arriba de la cabeza) y el polizón encima.
    for(const it of list){const v=it.e;if(v&&v.rider&&v.rider.state==='ride'&&vil.includes(v)){it.e={x:v.x,y:v.y,face:v.face,moving:v.moving,state:v.state,lift:v.lift,hungry:v.hungry,host:v};it.post=riderPost;}}
    for(const r of riders)if(r.state==='come'||r.state==='leave')list.push({k:r.y+1,z:1,e:r,f:F.run});},
  drawUnder:drawRiderHalos,
  drawOver:drawRidersAir,
  drawTop:drawRiderEyes,
  lights(L){for(const r of riders)if(riderOut(r)){const p=riderAt(r);L.push([p.x*T+8,p.y*T+(r.state==='ride'?-1:10),1.3,0.7]);}},
  arrows:()=>riders.filter(riderOut).map(riderAt),
  hint(){const out=riders.filter(riderOut);if(!out.length)return null;const on=out.filter(r=>r.state==='ride').length;
    if(on)return['¡Polizones!',(on===1?'Uno va en la cabeza de alguien de tu gente y se come lo que entrega':'Van '+on+' en la cabeza de tu gente y se comen lo que entregan')+': tocá a quien lo lleva.'];
    return['¡Polizón!',(out.length===1?'Viene uno':'Vienen '+out.length)+' del bosque a subirse a tu gente: tocalo'+(out.length===1?'':'s')+' antes.'];},
  row:riderRow,
  // Un toque en la persona que lo lleva (o en el bichito, que va arriba de su cabeza) lo baja y lo espanta.
  tap(tx,ty){let hit=null,bd=RIDER_HIT;for(const r of riders){if(!riderOut(r))continue;const p=riderAt(r),d=Math.min(Math.hypot(p.x-tx,p.y-ty),Math.hypot(p.x-tx,p.y-0.7-ty));if(d<bd){bd=d;hit=r;}}
    if(!hit)return false;const v=hit.host,a=riderAte(hit);riderScare(hit,'¡fuera!');st.res.ideas+=2;float(hit.x,hit.y-0.8,'+2 ideas',RCOL.ideas);
    toast(v?'¡Polizón espantado! '+(v.bot?'Tu robot':'Tu aldeano')+' vuelve a entregar todo'+(a?' (se comió '+a+')':'')+'.':'¡Polizón espantado!');return true;},
  // Tres a propósito.
  prueba(){for(let k=0;k<3;k++)spawnRider();},
  debug:{riders:()=>riders,spawnRider:()=>spawnRider(),riderEvery:()=>riderEvery(),riderEaten:()=>riderEaten,riderArt:(f,m)=>riderArt(f,m)},
  // Cuidador: salacot de safari con una cinta verde y una red chica para bajar polizones.
  guardia:{kind:'cuidador',pal:{c:'#c8b07a',C:'#9a8456',j:'#6a4e2a'},draw(a,K){const H=P4('#a8946a','#d8c494','#efe0b4','#fff6dc'),GR=hx('#3e7a48'),N=hx('#eef4ee');
      ell(a,32,12,21,3.4,(i,j)=>j<0?null:i>10?H[0]:H[1]);ell(a,32,11,14,10,(i,j)=>j>1?null:i<-5&&j<-5?H[3]:i>6?H[1]:H[2]);rect(a,18,9,28,2,GR);rect(a,31,0,2,2,H[1]);
      line(a,47,48,53,28,hx('#7a5434'),2);ell(a,55,20,6.5,7.5,(i,j)=>{const d=Math.hypot(i/6.5,j/7.5);return d>0.8?GR:(i&1)&&(j&1)?null:N;});}}});
