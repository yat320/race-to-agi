// Sirenas: la amenaza de la era de la conciencia (ERA.sirens, octubre de 2026). Entre las mentes de todos los universos vagan
// sirenas que atraen a tu gente. Desde SIREN_START, cada ~sirenEvery() segundos llega flotando una desde SIREN_FROM casilleros
// hacia donde trabaja más gente, se queda ahí y canta. El canto empieza en SIREN_R0 casilleros y crece hasta SIREN_R1
// (sirenGrow() por segundo): el que queda adentro deja lo que hace, camina hasta ella y se queda hechizado alrededor sin
// trabajar (v.held, que el motor respeta: no lo mueve ni lo manda a juntar). Tocarla la calla (+2 ideas) y suelta a todos; si
// nadie la toca, se va sola a los SIREN_LIFE segundos de cantar. La defensa de la era (la cúpula de silencio): la gente que
// trabaja a ERA.defense.r casilleros o menos no la oye, y la sirena se calla cuando se le acerca o cuando su canto llega hasta
// esa zona (sirenHushed). Vienen más seguido con cada invento (+10%) y con el mercado de sueños (+30%); con la armonía el canto
// crece la mitad de rápido. No se guardan: al cargar, los hechizados ya volvieron a trabajar.
// Calibrado con el bot (la era sola, octubre de 2026): con lo que pedía la hoja de ruta (cada 40 s, 70 s cantando, el canto a
// 6 casilleros en 30 s) y la cúpula callando solo a las que entraban a 4 casilleros, sin tocarlas ni defensas tardaba 11,2 min
// contra 9,5 tocándolas, y con 2 cúpulas, 12,7 (iban adonde nadie las tapaba). Lo que se pierde es lo que junta la gente, y
// pesa poco hasta que falta casi toda: con todos hechizados desde el minuto 2 la era no se terminaba. Ahora (cada 25 s, 90 s
// cantando, el canto a 6 en 17,5 s, adonde está la gente aunque haya cúpulas, y la cúpula callando también a la que canta
// hasta su zona): tocándolas, 9,4; sin tocarlas, con 2 cúpulas, 10; con 2 conservatorios, 10,2; sin nada, 13 (de 10,9 a 15,6).
let sirens=[],sirenArts=null;
const SIREN_START=120,SIREN_FROM=11,SIREN_SPD=1.4,SIREN_R0=2.5,SIREN_R1=6,SIREN_GROW=0.2,SIREN_LIFE=90,SIREN_WALK=1.8,SIREN_CROWD=5,SIREN_UP=0.6;
const sirenEvery=()=>25/((1+0.1*Object.keys(st.techs).length)*(st.techs.suenos?1.3:1));
const sirenGrow=()=>SIREN_GROW*(st.techs.armonia?0.5:1);
const sirenOut=s=>s.state==='come'||s.state==='sing';
const sirenR=s=>s.state==='sing'?Math.min(SIREN_R1,SIREN_R0+s.t*sirenGrow()):0;
const sirenHeld=s=>vil.filter(v=>v.held===s);
const sirenSpell=v=>!!(v.held&&v.held.siren);
// Ocupado con otra amenaza (o con otra sirena): no la oye.
const sirenBusy=v=>!!(v.held||v.away||v.abd||v.orb||v.bad);
// Puede oír una sirena el que está libre y no trabaja cerca de una cúpula de silencio.
const sirenEar=(v,T)=>!sirenBusy(v)&&!(T.length&&jammed(T,v.x,v.y));
// Una cúpula la calla si la sirena se le acerca o si su canto llega hasta la zona de silencio.
const sirenHushed=(T,s)=>T.some(([a,b])=>Math.hypot(a-s.x,b-s.y)<=ERA.defense.r+sirenR(s));
function spawnSiren(){const ppl=vil.filter(v=>!sirenBusy(v));if(!ppl.length)return;
  // Va hacia donde trabaja más gente: al lado del que tiene más gente a SIREN_CROWD casilleros (también la que está cerca de
  // una cúpula, así que muchas veces se calla antes de cantar).
  let best=null,bn=-1;for(const v of ppl){const n=ppl.filter(w=>Math.hypot(w.x-v.x,w.y-v.y)<=SIREN_CROWD).length+Math.random()*0.5;if(n>bn){bn=n;best=v;}}
  const gx=Math.round(best.x),gy=Math.round(best.y),an=Math.random()*6.283,d=SIREN_FROM+Math.random()*3;
  sirens.push({siren:true,x:clamp(gx+Math.cos(an)*d,1,MW-2),y:clamp(gy+Math.sin(an)*d,1,MH-2),gx,gy,state:'come',t:0,face:Math.cos(an)>0?-1:1,ph:Math.random()*6.28});
  toast('¡Una sirena! Viene a cantarle a tu gente: tocala para callarla.');}
// Un lugar alrededor de la sirena para cada hechizado: la tierra libre más cercana a su puesto en la ronda. La ronda va a los
// costados y adelante (SIREN_RING, en radianes: 0 al este, π/2 al sur), no atrás ni abajo de ella, que flota ahí y los taparía.
const SIREN_RING=[0.45,2.69,1.57,-0.1,3.24,1.0,2.14,0.15,2.99,1.3,1.84];
function sirenSpot(s,px,py){const sx=Math.round(s.x),sy=Math.round(s.y),taken=new Set(sirenHeld(s).filter(w=>w.sirenAt).map(w=>w.sirenAt.join()).concat([sx+','+sy,sx+','+(sy-1)])),
    x0=Math.round(px),y0=Math.round(py);let best=null,bd=1e9;
  for(let y=y0-3;y<=y0+3;y++)for(let x=x0-3;x<=x0+3;x++){if(!passable(x,y)||taken.has(x+','+y))continue;const d=Math.hypot(x-px,y-py);if(d<bd){bd=d;best=[x,y];}}
  return best;}
function sirenWalk(v){const[x,y]=tileOf(v),s=v.sirenAt;v.path=s&&(x!==s[0]||y!==s[1])?bfs(x,y,(a,b)=>a===s[0]&&b===s[1])||[]:[];}
// El que la oye deja lo que hace (lo que llevaba lo sigue llevando) y va hacia ella.
function sirenHold(v,s){const n=sirenHeld(s).length,an=SIREN_RING[n%SIREN_RING.length],rr=1.5+Math.floor(n/SIREN_RING.length);v.held=s;v.state='idle';v.target=null;v.path=[];v.go=null;
  v.sirenAt=sirenSpot(s,s.x+Math.cos(an)*rr,s.y+Math.sin(an)*rr*0.85);sirenWalk(v);v.sirenRe=0;float(v.x,v.y-0.9,'♪','#ff8ad8');
  if(!s.told){s.told=true;toast('¡La sirena hechizó a '+(v.bot?'un robot':'un aldeano')+'! No trabaja mientras la escucha: tocala para callarla.');}}
// Suelta a los que tenía: vuelven a trabajar (el que llevaba algo, primero lo deja en su casa).
function sirenFree(s){for(const v of vil){if(v.held!==s)continue;v.held=null;v.sirenAt=null;v.lift=0;v.path=[];v.target=null;v.state='idle';v.t=0.3+Math.random()*0.5;if(v.carry)goHome(v);}}
// Se calla (un toque, un guardián o una cúpula) o se va sola: suelta a todos y se desvanece. Devuelve a cuántos soltó.
function sirenEnd(s,state,txt,col){if(!sirenOut(s))return 0;const n=sirenHeld(s).length,r=sirenR(s);sirenFree(s);s.state=state;s.t=0;s.r=r;
  if(state==='hush')zaps.push({x:s.x,y:s.y-SIREN_UP,t:0.5});if(txt)float(s.x,s.y-1.6,txt,col||'#5fe3d0');return n;}
function updateSirens(dt){if(!sirens.length)return;const T=towersXY();
  for(const s of sirens){s.t+=dt;
    if(!sirenOut(s)){if(s.t>=1.5)s.dead=true;continue;}
    // Cerca de una cúpula de silencio no se oye nada: se calla.
    if(T.length&&sirenHushed(T,s)){sirenEnd(s,'hush','¡silencio!');continue;}
    if(s.state==='come'){const dx=s.gx-s.x,dy=s.gy-s.y,d=Math.hypot(dx,dy),k=SIREN_SPD*dt;if(Math.abs(dx)>0.05)s.face=dx>0?1:-1;
      if(d<=k){s.x=s.gx;s.y=s.gy;s.state='sing';s.t=0;}else{s.x+=dx/d*k;s.y+=dy/d*k;}continue;}
    if(s.t>=SIREN_LIFE){const n=sirenEnd(s,'leave','se fue','#c8b8ff');if(n)toast('La sirena se fue: '+(n===1?'el que la escuchaba vuelve':'los '+n+' que la escuchaban vuelven')+' a trabajar.');continue;}
    const R=sirenR(s);for(const v of vil)if(sirenEar(v,T)&&Math.hypot(v.x-s.x,v.y-s.y)<=R)sirenHold(v,s);}
  sirens=sirens.filter(s=>!s.dead);
  // Los hechizados caminan despacio hasta su lugar en la ronda y se quedan mirándola, meciéndose.
  for(const v of vil){const s=v.held;if(!s||!s.siren)continue;
    if(!sirens.includes(s)||!sirenOut(s)){sirenFree(s);continue;}
    stepEnt(v,dt,SIREN_WALK);if(v.blocked){v.blocked=false;v.path=[];v.sirenRe=1;}
    if(v.sirenRe>0&&(v.sirenRe-=dt)<=0)sirenWalk(v);
    if(!v.path.length){v.face=s.x>v.x?1:-1;v.lift=0.06+0.05*Math.sin(st.time*2.5+v.x*3);}}}
// La sirena: una sirena de pelo largo y cola de pez que flota y canta, en dos cuadros (el pelo y la cola se mecen).
function sirenArt(f){return mkA(64,64,a=>{const SK=P4('#b07a9a','#d8a4c4','#f4d0e4','#fff0f8'),HR=P4('#4a2070','#7a34a0','#b058d0','#e090f0'),TL=P4('#1f5a7a','#2f8aa8','#4fc0c8','#a0f0e8'),K=hx('#1b1a24');
  const w=f?2:-2;
  // Pelo largo que flota para atrás.
  poly(a,[[22,8],[36,4],[40,12],[30,22],[26,34+w],[18,46+w],[10,48+w],[14,38],[16,22]],(x,y)=>((x*2+y)>>2)&1?HR[1]:HR[2]);
  // Cola de pez que se curva para abajo, con escamas, y la aleta.
  poly(a,[[24,36],[42,36],[42,44],[36,52],[28+w,58],[22+w,58],[26,50],[24,44]],(x,y)=>((x+((y>>1)&1)*2)>>1&1)&&y%3===0?TL[3]:x>34?TL[1]:TL[2]);
  poly(a,[[24+w,56],[14+w*2,62],[22+w,63],[27+w,59],[32+w,63],[38+w*2,60],[30+w,55]],(x)=>x<26+w?TL[2]:TL[1]);
  // Cuerpo, el top de caracolas y los brazos: uno levantado, como si cantara para alguien.
  poly(a,[[26,22],[38,22],[42,36],[24,36]],(x)=>x>36?SK[1]:SK[2]);rect(a,24,34,18,3,HR[0]);
  ell(a,29,27,3,2.5,(i,j)=>j<-1?hx('#ffd4ec'):hx('#ff8ad8'));ell(a,36,27,3,2.5,(i,j)=>j<-1?hx('#ffd4ec'):hx('#ff8ad8'));
  line(a,38,24,48,14+w,SK[2],3);ell(a,49,12+w,2.5,2.5,SK[3]);line(a,26,24,20,34,SK[1],3);
  // Cabeza: cara de perfil a la derecha, ojos cerrados y la boca abierta, cantando.
  ell(a,32,15,8,8,(i,j)=>i>3?SK[3]:i<-4?SK[1]:SK[2]);poly(a,[[24,10],[34,5],[40,9],[36,8],[28,10],[26,18]],HR[2]);
  line(a,33,14,36,14,K,1);a.set(34,15,K);ell(a,37,19,1.4,1.6,hx('#7a1a3a'));rect(a,34,17,2,1,hx('#e8907a'));
  ell(a,22,12,2,2,hx('#ff8ad8'));a.set(22,11,hx('#ffffff'));
  outlineAll(a,OUTL);});}
const sirenSprite=()=>sirenArts||(sirenArts=[sirenArt(0),sirenArt(1)]);
// Una nota musical (cabeza, palito y bandera), con su contorno oscuro.
function sirenNote(x,y,c,al){ctx.globalAlpha=al;ctx.fillStyle='#1b1a24';ctx.beginPath();ctx.ellipse(x,y,1.7,1.25,-0.4,0,6.29);ctx.fill();ctx.fillRect(x+0.5,y-4.8,1.5,4.8);ctx.fillRect(x+0.5,y-4.8,3.2,1.7);
  ctx.fillStyle=c;ctx.beginPath();ctx.ellipse(x,y,1.05,0.7,-0.4,0,6.29);ctx.fill();ctx.fillRect(x+0.9,y-4.4,0.7,4.2);ctx.fillRect(x+0.9,y-4.4,2.4,0.9);ctx.globalAlpha=1;}
const SIREN_COL=['#ff8ad8','#c8a8ff','#5fe3d0'];
// En el suelo: el canto (una mancha lila hasta donde llega, con ondas que se abren), la sombra y el halo rojo de lo que hay que tocar.
function drawSirenSong(){if(!sirens.length)return;const t=performance.now()/1000;
  for(const s of sirens){const cx=s.x*T+8,cy=s.y*T+10,k=sirenOut(s)?1:Math.max(0,1-s.t/1.2);if(k<=0)continue;ctx.globalAlpha=k;
    const R=(sirenOut(s)?sirenR(s):s.r||0)*T;
    if(R>0){ctx.fillStyle='rgba(200,150,255,.13)';ctx.beginPath();ctx.ellipse(cx,cy,R,R*0.7,0,0,6.29);ctx.fill();
      ctx.lineWidth=0.7;for(let j=0;j<3;j++){const u=(t*0.45+j/3+s.ph)%1;ctx.strokeStyle='rgba(255,150,230,'+(0.55*(1-u)).toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,cy,R*u,R*u*0.7,0,0,6.29);ctx.stroke();}
      ctx.strokeStyle='rgba(255,138,216,.6)';ctx.setLineDash([2,2]);ctx.lineDashOffset=-t*4;ctx.beginPath();ctx.ellipse(cx,cy,R,R*0.7,0,0,6.29);ctx.stroke();ctx.setLineDash([]);}
    if(sirenOut(s)){ctx.fillStyle='rgba(232,101,77,'+(0.28+0.1*Math.sin(t*8)).toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,cy+3,8,3,0,0,6.29);ctx.fill();}
    shadow(cx,cy+3,5,1.6);ctx.globalAlpha=1;}}
// Dónde se dibuja la sirena (arriba a la izquierda, en píxeles del mundo): flota un casillero arriba del suyo, se mece y, al
// irse o callarse, sube mientras se desvanece. Se dibuja un poco más grande que tu gente (SIREN_PX).
const SIREN_PX=20;
const sirenTop=(s,t)=>(s.y-SIREN_UP)*T-8+Math.sin(t*2.2+s.ph)*1.2-(s.state==='leave'?s.t*10:s.state==='hush'?s.t*4:0);
// Arriba de la gente: un hilo de notas de la sirena a cada hechizado, la sirena con su brillo y las notas que suelta.
function drawSirens(){if(!sirens.length)return;const t=performance.now()/1000,fr=sirenSprite();
  for(const v of vil){const s=v.held;if(!s||!s.siren||!sirenOut(s))continue;const x0=s.x*T+8+s.face*3,y0=sirenTop(s,t)+6,x1=v.x*T+8,y1=v.y*T-1,L=Math.hypot(x1-x0,y1-y0);
    ctx.fillStyle='rgba(255,170,235,.75)';for(let j=0;j<L/3;j++){const u=((j*3+t*9)%L)/L,o=Math.sin(u*9-t*5)*1.2;ctx.fillRect(x0+(x1-x0)*u-(y1-y0)/L*o-0.4,y0+(y1-y0)*u+(x1-x0)/L*o-0.4,0.8,0.8);}
    const b=Math.sin(t*3+v.x*2);sirenNote(v.x*T+8+b,v.y*T-6-(v.lift||0)*12,SIREN_COL[Math.abs(Math.round(v.x*7))%3],0.95);}
  for(const s of sirens){const k=sirenOut(s)?1:Math.max(0,1-s.t/1.2);if(k<=0)continue;const px=s.x*T,py=sirenTop(s,t),cx=px+8,cy=py+SIREN_PX/2;ctx.globalAlpha=k;
    // Un brillo rosado detrás, así se distingue de tu gente.
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,14),gl=0.55+0.15*Math.sin(t*3+s.ph);g.addColorStop(0,'rgba(255,190,240,'+gl.toFixed(2)+')');g.addColorStop(0.6,'rgba(230,140,255,'+(gl*0.45).toFixed(2)+')');g.addColorStop(1,'rgba(230,140,255,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,14,0,6.29);ctx.fill();
    ctx.save();if(s.face<0){ctx.translate(cx*2,0);ctx.scale(-1,1);}ctx.drawImage(fr[Math.floor(t*3+s.ph)%2],cx-SIREN_PX/2,py,SIREN_PX,SIREN_PX);ctx.restore();
    if(s.state==='sing')for(let j=0;j<3;j++){const u=(t*0.6+j/3+s.ph)%1;sirenNote(cx+s.face*(5+u*7)+Math.sin(u*8+j)*1.5,py+5-u*10,SIREN_COL[j],Math.min(1,(1-u)*1.8)*k);}
    ctx.globalAlpha=1;}}
// Con sirenas, la barra cuenta qué parte de tu gente trabaja cerca de una cúpula de silencio (no las oye).
function sirenRow(p){const T=towersXY(),pop=vil.filter(v=>!v.away),cov=T.length?pop.filter(v=>jammed(T,v.x,v.y)).length:0,n=sirens.filter(sirenOut).length,nh=vil.filter(sirenSpell).length,
    on=T.length>0||n>0||st.time>=SIREN_START;$(p==='g'?'gridRow':'smogRow').hidden=!on;if(!on)return;const f=pop.length?cov/pop.length*100:0;
  $(p+'Fill').style.width=f+'%';$(p+'Fill').classList.toggle('hi',n>0);$(p+'Num').textContent=Math.round(f)+'%';
  $(p+'Meta').textContent=nh?nh+(nh===1?' hechizado':' hechizados'):n?(n===1?'1 sirena cerca':n+' sirenas cerca'):T.length?'gente en silencio':'sin '+ERA.defense.label.toLowerCase();}
amenaza({on:'sirens',
  reset(){sirens=[];for(const v of vil)if(sirenSpell(v)){v.held=null;v.sirenAt=null;v.lift=0;v.state='idle';v.path=[];}},
  tick(step){if(st.time>=SIREN_START&&Math.random()<step/sirenEvery())spawnSiren();},
  update:updateSirens,
  // Flota arriba de su casillero: se la alcanza desde uno vecino, como a un edificio (b), y se la toca donde se la ve.
  targets(add){for(const s of sirens)if(sirenOut(s))add(s.x,s.y,Math.round(s.x),Math.round(s.y-SIREN_UP),true);},
  tap(tx,ty){const hit=sirens.find(s=>sirenOut(s)&&(Math.hypot(s.x-tx,s.y-SIREN_UP-ty)<=1.4||Math.hypot(s.x-tx,s.y-ty)<=1.1));
    if(hit){const n=sirenEnd(hit,'hush','¡callada!');st.res.ideas+=2*IX;float(hit.x,hit.y-1,ideaTxt(2),RCOL.ideas);
      toast(n?'¡Sirena callada! '+(n===1?'Soltó a uno de tu gente.':'Soltó a '+n+' de tu gente.'):'¡Sirena callada!');return true;}
    return false;},
  drawUnder:drawSirenSong,
  drawOver:drawSirens,
  lights(L){for(const s of sirens)if(sirenOut(s))L.push([s.x*T+8,(s.y-SIREN_UP)*T+6,2.4,0.9]);},
  arrows:()=>sirens.filter(sirenOut).map(s=>({x:s.x,y:s.y-SIREN_UP})),
  hint(){const out=sirens.filter(sirenOut);if(!out.length)return null;const sing=out.filter(s=>s.state==='sing').length,nh=vil.filter(sirenSpell).length;
    if(sing)return[sing===1?'¡Sirena!':'¡Sirenas!',(sing===1?'Canta':'Hay '+sing+' cantando')+(nh?' y tiene'+(sing===1?'':'n')+(nh===1?' hechizado a uno':' hechizados a '+nh)+' de tu gente':' cerca de tu gente')+': tocala'+(sing===1?'':'s')+' para callarla'+(sing===1?'':'s')+'.'];
    return['¡Sirena!',(out.length===1?'Viene una':'Vienen '+out.length)+' adonde trabaja tu gente: tocala'+(out.length===1?'':'s')+' antes de que cante'+(out.length===1?'':'n')+'.'];},
  row:sirenRow,
  // Dos sirenas a propósito.
  prueba(){for(let k=0;k<2;k++)spawnSiren();},
  debug:{sirens:()=>sirens,spawnSiren:()=>spawnSiren(),sirenEvery:()=>sirenEvery(),sirenArt:f=>sirenSprite()[f?1:0]},
  // Director de orquesta: frac negro con pechera blanca y moño, pelo blanco y la batuta levantada.
  guardia:{kind:'director',pal:{c:'#22222e',C:'#15151d',j:'#22222e',y:'#e4e4ec'},draw(a,K){const W=hx('#f6f6fa'),CO=hx('#22222e'),CD=hx('#15151d');
      poly(a,[[27,30],[37,30],[32,45]],W);rect(a,30,44,4,2,CO);poly(a,[[28,30],[32,32],[28,34]],K);poly(a,[[36,30],[32,32],[36,34]],K);
      poly(a,[[17,50],[23,50],[19,62]],CD);poly(a,[[41,50],[47,50],[45,62]],CD);for(const y of[36,40])rect(a,31,y,2,2,K);
      line(a,47,45,58,26,W,1);rect(a,46,44,3,3,hx('#5a3a20'));
      const G=hx('#ffd35a');ell(a,55,12,2.4,1.8,G);rect(a,57,4,1,8,G);rect(a,57,4,4,2,G);}}});
