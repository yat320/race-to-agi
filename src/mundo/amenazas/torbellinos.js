// Torbellinos de luz: la amenaza de la era alfa (ERA.whirls, octubre de 2026). En el universo recién nacido la luz todavía no
// se calmó y se arma en torbellinos: la mecánica nueva es que desparraman lo guardado. Desde WHIRL_START, cada ~whirlEvery()
// segundos se forma uno a WHIRL_FROM–WHIRL_FROM+3 casilleros del granero o de uno de los edificios que más producen (whirlGoal)
// y llega volando derecho, rápido como una ráfaga (WHIRL_SPD casilleros por segundo). En la ciudad salta de un edificio a otro
// cercano (WHIRL_ZIP, WHIRL_STAY, WHIRL_NEAR): se queda poco en cada uno. Mientras está encima de un edificio, apenas llega y
// después cada WHIRL_SUCK segundos, chupa whirlCut() de lo que más tenés entre ideas, monedas y mineral (entre WHIRL_MIN y
// WHIRL_MAX) y lo tira alrededor, a 1–WHIRL_TOSS casilleros, en 1 a 3 motas de luz con su número. Una mota se recupera si la
// tocás o si alguien de tu gente (vos, un aldeano o un robot) pasa por encima; si nadie la junta, se apaga a los
// WHIRL_MOTE_LIFE segundos y lo que tenía se pierde. Tocar el torbellino lo deshace (+2 ideas); si nadie lo toca, se deshace
// solo a los WHIRL_LIFE segundos. La defensa de la era (el estabilizador de campo) deshace los torbellinos que entran a
// ERA.defense.r casilleros, y las motas que caen (o quedan) cerca vuelven solas, volando hasta él; la luz se escapa de los
// campos en calma: WHIRL_FREE de las veces el torbellino va a lo que no cubre un estabilizador, y en la ciudad salta primero a
// eso. Vienen más seguido con cada invento (+10%) y con el mercado del espectro (+30%); con los campos en calma chupan la
// mitad. No se guardan, ni ellos ni sus motas (como con los dobles, lo que había en las motas se pierde).
// Calibrado con el bot (la era sola): con lo que pedía la hoja de ruta (cada ~40 s, 60 s de vida, chupando un poco cada pocos
// segundos), sin tocarlos ni defensas tardaba 14 min contra 9,7 tocándolos, pero con 2 cuarteles, 9,6: el cazavientos sale a
// 8 casilleros de su cuartel y en la ciudad compacta del bot los deshacía todos antes de que tocaran un edificio. Ahora son
// ráfagas cortas: llegan rápido, chupan apenas tocan un edificio, de a más (con tope, así el final no se dispara) y duran poco,
// así que el cazavientos llega cuando ya desparramaron algo. whirlStats (con ?debug) cuenta lo chupado y por dónde volvió.
// whirlStats: cuántos se formaron (n), cuánto chuparon (suck), cuánto volvió pisando las motas (walk), tocándolas (tap) o por un
// estabilizador (home), cuánto se apagó (lost) y cómo terminaron (taps: tocados, calm: en un estabilizador, fade: solos).
let whirls=[],whirlMotes=[],whirlLostT=-1e9,whirlToldT=-1e9,whirlLost={},whirlStats={n:0,suck:0,walk:0,tap:0,home:0,lost:0,taps:0,calm:0,fade:0};
const WHIRL_START=120,WHIRL_FROM=10,WHIRL_SPD=4,WHIRL_ZIP=2,WHIRL_STAY=0.8,WHIRL_NEAR=5,WHIRL_FREE=0.4,WHIRL_SUCK=3,WHIRL_CUT=0.17,WHIRL_MIN=3,WHIRL_MAX=25,WHIRL_TOSS=4,WHIRL_LIFE=14,WHIRL_HIT=1.3,
  WHIRL_MOTE_LIFE=30,WHIRL_MOTE_FLY=0.7,WHIRL_HOME=1.2,WHIRL_PICK=0.6,WHIRL_MOTE_HIT=1;
const whirlEvery=()=>25/((1+0.1*Object.keys(st.techs).length)*(st.techs.espectro?1.3:1));
const whirlCut=()=>WHIRL_CUT*(st.techs.calma?0.5:1);
const whirlOut=w=>w.state==='come'||w.state==='spin';
const whirlLie=m=>m.state==='lie';
// "1 idea", "3 ideas", "1 moneda": el nombre del recurso en singular cuando es uno.
const whirlRN=(k,n)=>n===1&&(k==='ideas'||k==='monedas')?RN[k].toLowerCase().slice(0,-1):RN[k].toLowerCase();
const whirlBld=i=>{const o=obj[i];return!!o&&!!BUILD[o.t]&&o.t!=='monumento';};
// Lo que no cubre un estabilizador (la luz se escapa de los campos en calma).
const whirlFree=(i,TW)=>!(TW.length&&jammed(TW,i%MW,(i/MW)|0));
// Adónde va: al granero o a uno de los edificios que más producen (los de los tres tipos que más dan cada uno), mitad y mitad;
// si no hay ninguno de esos, a cualquier edificio. El 40% de las veces (WHIRL_FREE), y siempre con `free` (la tanda de
// prueba), elige entre lo que no cubre un estabilizador, si hay.
function whirlGoal(free){const store=[],prod=[],bs=[],TW=towersXY(),only=TW.length&&(free||Math.random()<WHIRL_FREE);
  for(const pass of only?[1,0]:[0]){obj.forEach((o,i)=>{const b=o&&BUILD[o.t];if(!whirlBld(i)||(pass&&!whirlFree(i,TW)))return;bs.push(i);if(o.t===ERA.storage.id)store.push(i);
      if(b.prod)prod.push([i,Object.values(b.prod).reduce((s,x)=>s+x,0)]);});if(bs.length)break;}
  const top=[...new Set(prod.map(p=>p[1]))].sort((a,b)=>b-a).slice(0,3),best=prod.filter(p=>top.includes(p[1])).map(p=>p[0]);
  const c=store.length&&(!best.length||Math.random()<0.5)?store:best.length?best:bs;return c.length?c[Math.floor(Math.random()*c.length)]:-1;}
function spawnWhirl(free){const ti=whirlGoal(free);if(ti<0)return;const tx=ti%MW,ty=(ti/MW)|0,TW=towersXY();
  for(let k=0;k<40;k++){const an=Math.random()*6.283,d=WHIRL_FROM+Math.random()*3,x=clamp(tx+Math.cos(an)*d,1,MW-2),y=clamp(ty+Math.sin(an)*d,1,MH-2);
    if(TW.length&&jammed(TW,x,y))continue;
    whirlStats.n++;whirls.push({x,y,gx:tx,gy:ty,ti,state:'come',t:0,sk:WHIRL_SUCK,stay:WHIRL_STAY,ph:Math.random()*6.28});
    toast('¡Un torbellino de luz! Viene a desparramar lo que guardaste: tocalo para deshacerlo.');return;}}
// El edificio más cercano al torbellino, si tiene uno encima o al lado (a 1,2 casilleros o menos).
function whirlOver(w){const x0=Math.round(w.x),y0=Math.round(w.y);let bi=-1,bd=1.21;
  for(let y=y0-1;y<=y0+1;y++)for(let x=x0-1;x<=x0+1;x++){if(!inb(x,y)||!whirlBld(y*MW+x))continue;const d=Math.hypot(x-w.x,y-w.y);if(d<bd){bd=d;bi=y*MW+x;}}
  return bi;}
// Da vueltas por la ciudad: el próximo edificio, uno cercano (a WHIRL_NEAR casilleros o menos) que no sea el de ahora; si
// hay, uno que no cubra un estabilizador.
function whirlHop(w){const TW=towersXY(),bs=[],fr=[];obj.forEach((o,i)=>{if(i!==w.ti&&whirlBld(i)&&Math.hypot(i%MW-w.gx,((i/MW)|0)-w.gy)<=WHIRL_NEAR){bs.push(i);if(whirlFree(i,TW))fr.push(i);}});
  const c=fr.length?fr:bs;if(!c.length)return;const i=c[Math.floor(Math.random()*c.length)];w.ti=i;w.gx=i%MW;w.gy=(i/MW)|0;}
// Una mota: sale del torbellino y cae en un casillero libre a 1–WHIRL_TOSS casilleros (si no hay, en cualquiera de tierra).
function whirlThrow(w,k,n){let tx=-1,ty=-1;
  for(let j=0;j<24;j++){const an=Math.random()*6.283,d=1+Math.random()*(WHIRL_TOSS-1),x=Math.round(w.x+Math.cos(an)*d),y=Math.round(w.y+Math.sin(an)*d);
    if(passable(x,y)||(j>=16&&inb(x,y)&&ground[y*MW+x]!==WATER)){tx=x;ty=y;break;}}
  if(tx<0){tx=clamp(Math.round(w.x),0,MW-1);ty=clamp(Math.round(w.y),0,MH-1);}
  whirlMotes.push({x:w.x,y:w.y,sx:w.x,sy:w.y-1,tx,ty,k,n,state:'fly',t:0,ph:Math.random()*6.28});}
// Chupa de lo que más tenés y lo desparrama en 1 a 3 motas.
function whirlSuck(w){const k=['ideas','monedas',ORE].sort((a,b)=>relRes(b)-relRes(a))[0],have=Math.floor(st.res[k]),u=unitOf(k);if(have<=0)return;
  const n=Math.min(have,u*Math.max(WHIRL_MIN,Math.min(WHIRL_MAX,Math.round(have/u*whirlCut())))),parts=n/u>=12?3:n/u>=6?2:1;st.res[k]-=n;whirlStats.suck+=n;
  for(let p=0,left=n;p<parts;p++){const q=p===parts-1?left:Math.floor(n/parts);left-=q;whirlThrow(w,k,q);}
  float(w.x,w.y-2.2,'−'+fmt(n)+' '+whirlRN(k,n),'#e8654d');
  if(!w.told&&st.time-whirlToldT>=30){w.told=true;whirlToldT=st.time;toast('¡El torbellino desparramó '+fmt(n)+' '+whirlRN(k,n)+'! Tocá las motas para recuperarlas antes de que se apaguen.');}}
function whirlEnd(w,state,txt,col){if(!whirlOut(w))return;w.state=state;w.t=0;if(state==='break')zaps.push({x:w.x,y:w.y-0.5,t:0.5});if(txt)float(w.x,w.y-1.6,txt,col||'#5fe3d0');}
// Una mota vuelve: lo que tenía se suma de nuevo.
function whirlGet(m){if(m.state!=='lie'&&m.state!=='fly'&&m.state!=='home')return 0;add(m.k,m.n);float(m.x,m.y-0.6,'+'+fmt(m.n)+' '+whirlRN(m.k,m.n),RCOL[m.k]);m.state='got';m.t=0;return m.n;}
// El estabilizador más cercano a la mota, si la tiene a ERA.defense.r casilleros o menos: la mota vuela hasta él.
function whirlHome(m,TW){let b=null,bd=ERA.defense.r+0.01;for(const[a,c]of TW){const d=Math.hypot(a-m.x,c-m.y);if(d<bd){bd=d;b=[a,c];}}
  if(!b)return false;m.state='home';m.t=0;m.sx=m.x;m.sy=m.y;m.tx=b[0];m.ty=b[1];return true;}
// Lo que se apagó, junto en un aviso cada tanto (si no, con muchas motas serían muchos).
function whirlLose(m){m.state='out';m.t=0;whirlStats.lost+=m.n;whirlLost[m.k]=(whirlLost[m.k]||0)+m.n;
  if(st.time-whirlLostT>=20){whirlLostT=st.time;const txt=Object.entries(whirlLost).map(([k,v])=>v+' '+whirlRN(k,v)).join(' y ');whirlLost={};toast('Se apagaron motas de luz: se perdieron '+txt+'.');}}
function updateWhirls(dt){const TW=towersXY();
  for(const w of whirls){w.t+=dt;
    if(!whirlOut(w)){if(w.t>=1)w.dead=true;continue;}
    // Cerca de un estabilizador, la luz se calma y el torbellino se deshace.
    if(TW.length&&jammed(TW,w.x,w.y)){whirlStats.calm++;whirlEnd(w,'break','¡calmado!');continue;}
    if(w.t>=WHIRL_LIFE){whirlStats.fade++;whirlEnd(w,'fade','se deshizo','#c8b8ff');continue;}
    if(!whirlBld(w.ti)){const o=whirlOver(w);if(o>=0){w.ti=o;w.gx=o%MW;w.gy=(o/MW)|0;}else whirlHop(w);}
    // Llega volando derecho y en la ciudad salta rápido de un edificio a otro: se queda poco en cada uno.
    const dx=w.gx-w.x,dy=w.gy-w.y,d=Math.hypot(dx,dy),v=(w.state==='come'?WHIRL_SPD:WHIRL_ZIP)*dt;
    if(d>v){w.x+=dx/d*v;w.y+=dy/d*v;}
    else{w.x=w.gx;w.y=w.gy;if(w.state==='come'){w.state='spin';w.stay=WHIRL_STAY;}else if((w.stay-=dt)<=0){w.stay=WHIRL_STAY;whirlHop(w);}}
    // Encima de un edificio, cada tanto chupa y desparrama.
    if(whirlOver(w)>=0){w.sk+=dt;if(w.sk>=WHIRL_SUCK){w.sk=0;whirlSuck(w);}}}
  whirls=whirls.filter(w=>!w.dead);
  if(!whirlMotes.length)return;
  const ppl=[P].concat(vil.filter(v=>!v.away&&!v.held&&!v.orb&&!v.abd));
  for(const m of whirlMotes){m.t+=dt;
    if(m.state==='fly'){const u=Math.min(1,m.t/WHIRL_MOTE_FLY);m.x=m.sx+(m.tx-m.sx)*u;m.y=m.sy+(m.ty-m.sy)*u;if(u>=1){m.state='lie';m.t=0;m.x=m.tx;m.y=m.ty;if(TW.length)whirlHome(m,TW);}continue;}
    if(m.state==='home'){const u=Math.min(1,m.t/WHIRL_HOME),e=u*u;m.x=m.sx+(m.tx-m.sx)*e;m.y=m.sy+(m.ty-m.sy)*e;if(u>=1){m.state='lie';whirlStats.home+=whirlGet(m);}continue;}
    if(m.state!=='lie'){if(m.t>=(m.state==='out'?1:0.5))m.dead=true;continue;}
    // Alguien de tu gente pasa por encima: la junta (el cazavientos no, ver targets).
    if(ppl.some(p=>Math.hypot(p.x-m.x,p.y-m.y)<=WHIRL_PICK)){whirlStats.walk+=whirlGet(m);continue;}
    if(TW.length&&whirlHome(m,TW))continue;
    if(m.t>=WHIRL_MOTE_LIFE)whirlLose(m);}
  whirlMotes=whirlMotes.filter(m=>!m.dead);}
// El torbellino: un embudo de luz que gira, angosto abajo y ancho arriba, que se mece. Atrás tiene un brillo; adelante, bandas en
// espiral (blancas, doradas y de colores, con un borde oscuro para que se lea sobre el pasto claro) y motitas de colores que suben
// dando vueltas. Al deshacerse, las bandas se abren y se apagan; al irse solo, se achica.
const WHIRL_COL=['#ffffff','#ffd96a','#ff9ad8','#ffffff','#7af0e0','#ffd96a','#ffffff','#a8d4f4'];
function drawWhirl(w,t){const out=whirlOut(w),k=out?Math.min(1,w.t/0.5):Math.max(0,1-w.t);if(k<=0)return;
  const bx=w.x*T+8,by=w.y*T+14,H=28*(w.state==='fade'?1-w.t*0.6:1),sp=w.state==='break'?1+w.t*2.2:1,sw=Math.sin(t*1.7+w.ph)*2.2,X=u=>bx+sw*u*u+Math.sin(t*5+u*6+w.ph)*0.5*u;
  ctx.globalAlpha=k;
  const gl=ctx.createRadialGradient(bx+sw*0.4,by-H*0.55,0,bx+sw*0.4,by-H*0.55,H*0.75);gl.addColorStop(0,'rgba(255,246,200,.5)');gl.addColorStop(1,'rgba(255,233,150,0)');
  ctx.fillStyle=gl;ctx.beginPath();ctx.arc(bx+sw*0.4,by-H*0.55,H*0.75,0,6.29);ctx.fill();
  if(w.state!=='break'){const g=ctx.createLinearGradient(0,by-H,0,by);g.addColorStop(0,'rgba(255,240,170,.3)');g.addColorStop(1,'rgba(255,255,255,.6)');ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(X(0)-1.3,by);
    for(let j=1;j<=8;j++){const u=j/8;ctx.lineTo(X(u)-(1.3+u*7.5),by-u*H);}for(let j=8;j>=0;j--){const u=j/8;ctx.lineTo(X(u)+(1.3+u*7.5),by-u*H);}ctx.closePath();ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.85)';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(X(0),by);for(let j=1;j<=6;j++){const u=j/6;ctx.lineTo(X(u)+Math.sin(t*9+j)*0.6,by-u*H*0.9);}ctx.stroke();}
  for(let j=0;j<8;j++){const u=(j+0.5)/8,y=by-u*H,rx=(1.6+u*7.4)*sp,ry=(0.7+u*1.8)*sp,a0=t*(7-u*3)+j*1.9+w.ph;
    ctx.lineWidth=1.9;ctx.strokeStyle='rgba(27,26,36,.5)';ctx.beginPath();ctx.ellipse(X(u),y,rx,ry,0,a0,a0+3.6);ctx.stroke();
    ctx.lineWidth=1.05;ctx.strokeStyle=WHIRL_COL[j];ctx.beginPath();ctx.ellipse(X(u),y,rx,ry,0,a0,a0+3.6);ctx.stroke();}
  for(let j=0;j<9;j++){const u=(t*0.6+j/9+w.ph)%1,an=t*6+j*0.7,r=(1.5+u*7.5)*sp;ctx.fillStyle=WHIRL_COL[(j+2)%8];ctx.globalAlpha=k*Math.min(1,(1-u)*2);
    ctx.fillRect(X(u)+Math.cos(an)*r-0.7,by-u*H+Math.sin(an)*r*0.25-0.7,1.4,1.4);}
  if(w.state==='break')for(let j=0;j<8;j++){const an=j*0.785+w.ph,d=w.t*18;ctx.fillStyle=WHIRL_COL[j];ctx.globalAlpha=k;ctx.fillRect(bx+Math.cos(an)*d-0.8,by-H*0.5+Math.sin(an)*d*0.6-0.8,1.6,1.6);}
  ctx.globalAlpha=1;}
// En el suelo: las motas y, debajo de cada torbellino, el halo rojo de lo que hay que tocar, la sombra y un remolino de polvo
// de luz que gira.
function drawWhirlUnder(){drawWhirlMotes(false);if(!whirls.length)return;const t=performance.now()/1000;
  for(const w of whirls){const k=whirlOut(w)?Math.min(1,w.t/0.6):Math.max(0,1-w.t);if(k<=0)continue;const cx=w.x*T+8,cy=w.y*T+14;ctx.globalAlpha=k;
    if(whirlOut(w)){ctx.fillStyle='rgba(232,101,77,'+(0.28+0.1*Math.sin(t*8+w.ph)).toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,cy,8,3,0,0,6.29);ctx.fill();}
    shadow(cx,cy,5,1.6);ctx.strokeStyle='rgba(255,233,150,.6)';ctx.lineWidth=0.7;for(let j=0;j<2;j++){const a0=-t*5+j*3.1;ctx.beginPath();ctx.ellipse(cx,cy,6-j*2,2.2-j*0.6,0,a0,a0+2.4);ctx.stroke();}
    ctx.globalAlpha=1;}}
// Arriba de la oscuridad de la noche (son luz): los torbellinos y lo de arriba de las motas.
function drawWhirlTop(){const t=performance.now()/1000;for(const w of whirls)drawWhirl(w,t);drawWhirlMotes(true);}
// Las motas: una bolita del color de lo que tienen, que late y flota, con su número arriba; en los últimos 10 s titila cada vez
// más rápido. Sin `top` (drawUnder) dibuja las que están en el suelo, abajo de la gente que las pisa al pasar; con `top`
// (drawTop, arriba de la oscuridad) las que vuelan, los números y, de noche, un brillo para que se vean.
function drawWhirlMotes(top){if(!whirlMotes.length)return;const t=performance.now()/1000,dk=top?darkness():0;ctx.textAlign='center';ctx.lineJoin='round';ctx.font='600 7px "Pixelify Sans", monospace';
  for(const m of whirlMotes){const col=RCOL[m.k],air=m.state==='fly'||m.state==='home';let a=1,lift=0,r=2.7;
    if(m.state==='fly'){const u=Math.min(1,m.t/WHIRL_MOTE_FLY);lift=Math.sin(u*Math.PI)*10;}
    else if(m.state==='home'){const u=Math.min(1,m.t/WHIRL_HOME);lift=Math.sin(u*Math.PI)*4;r=2.7-u*1.2;}
    else if(m.state==='got'){a=Math.max(0,1-m.t/0.5);r=2.7+m.t*6;}
    else if(m.state==='out'){a=Math.max(0,1-m.t);r=2.7*(1-m.t*0.7);}
    else{const left=WHIRL_MOTE_LIFE-m.t;if(left<10&&Math.sin(t*(4+(10-left)*1.6))<-0.2)a=0.35;lift=1.2+Math.sin(t*3+m.ph)*0.8;}
    if(a<=0)continue;const x=m.x*T+8,y=m.y*T+9-lift;
    if(top&&!air){if(m.state!=='lie')continue;
      if(dk>0.05){ctx.globalCompositeOperation='lighter';const g=ctx.createRadialGradient(x,y,0,x,y,r*2.4);g.addColorStop(0,col);g.addColorStop(1,'rgba(0,0,0,0)');ctx.fillStyle=g;ctx.globalAlpha=a*Math.min(1,dk/0.5)*0.8;
        ctx.beginPath();ctx.arc(x,y,r*2.4,0,6.29);ctx.fill();ctx.globalCompositeOperation='source-over';}
      ctx.globalAlpha=a;ctx.lineWidth=1.8;ctx.strokeStyle='#1b1a24';ctx.strokeText(m.n,x,y-4.5);ctx.fillStyle=col;ctx.fillText(m.n,x,y-4.5);continue;}
    if(top!==air)continue;ctx.globalAlpha=a;
    if(air){ctx.strokeStyle=col;ctx.lineWidth=0.6;ctx.globalAlpha=a*0.5;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x-(m.tx-m.sx)*3,y+(m.state==='fly'?3:-(m.ty-m.sy)*3));ctx.stroke();ctx.globalAlpha=a;}
    if(m.state==='got'){ctx.strokeStyle=col;ctx.lineWidth=0.8;ctx.beginPath();ctx.arc(x,y,r,0,6.29);ctx.stroke();continue;}
    const g=ctx.createRadialGradient(x,y,0,x,y,r*2.6);g.addColorStop(0,'rgba(255,255,255,.75)');g.addColorStop(0.4,col);g.addColorStop(1,'rgba(255,246,200,0)');
    ctx.fillStyle=g;ctx.globalAlpha=a*0.55;ctx.beginPath();ctx.arc(x,y,r*2.6,0,6.29);ctx.fill();ctx.globalAlpha=a;
    ctx.fillStyle='#1b1a24';ctx.beginPath();ctx.arc(x,y,r+0.6,0,6.29);ctx.fill();ctx.fillStyle=col;ctx.beginPath();ctx.arc(x,y,r,0,6.29);ctx.fill();
    ctx.fillStyle='#ffffff';ctx.fillRect(x-r*0.6,y-r*0.6,r*0.7,r*0.7);}
  ctx.globalAlpha=1;}
// Con torbellinos, la barra cuenta qué parte de los edificios está cerca de un estabilizador de campo.
function whirlRow(p){const TW=towersXY(),bs=[];obj.forEach((o,i)=>{if(o&&BUILD[o.t])bs.push(i);});
  const cov=TW.length?bs.filter(i=>jammed(TW,i%MW,(i/MW)|0)).length:0,n=whirls.filter(whirlOut).length,nm=whirlMotes.filter(whirlLie).length,
    on=TW.length>0||n>0||nm>0||st.time>=WHIRL_START;$(p==='g'?'gridRow':'smogRow').hidden=!on;if(!on)return;const f=bs.length?cov/bs.length*100:0;
  $(p+'Fill').style.width=f+'%';$(p+'Fill').classList.toggle('hi',n>0||nm>0);$(p+'Num').textContent=Math.round(f)+'%';
  $(p+'Meta').textContent=n?(n===1?'1 torbellino':n+' torbellinos'):nm?(nm===1?'1 mota suelta':nm+' motas sueltas'):TW.length?'luz en calma':'sin '+ERA.defense.label.toLowerCase();}
amenaza({on:'whirls',
  reset(){whirls=[];whirlMotes=[];whirlLost={};whirlLostT=whirlToldT=-1e9;for(const k in whirlStats)whirlStats[k]=0;},
  tick(step){if(st.time>=WHIRL_START&&Math.random()<step/whirlEvery())spawnWhirl();},
  update:updateWhirls,
  // Los guardianes van solo a los torbellinos y no juntan motas, ni pisándolas: con las motas, el cazavientos juntaba todo y
  // solo con cuarteles la era se terminaba igual que tocando.
  targets(add){for(const w of whirls)if(whirlOut(w))add(w.x,w.y,Math.round(w.x),Math.round(w.y));},
  // Para el bot, un toque por torbellino y uno por cada grupo de motas (un toque junta las que están a un casillero).
  botTaps(){const Q=whirls.filter(whirlOut).map(w=>[Math.round(w.x),Math.round(w.y)]);
    for(const m of whirlMotes)if(whirlLie(m)&&!Q.some(([x,y])=>Math.hypot(x-m.x,y-m.y)<=WHIRL_MOTE_HIT))Q.push([m.x,m.y]);return Q;},
  drawUnder:drawWhirlUnder,
  drawTop:drawWhirlTop,
  lights(L){for(const w of whirls)if(whirlOut(w))L.push([w.x*T+8,w.y*T+2,2.8,0.9]);for(const m of whirlMotes)if(whirlLie(m))L.push([m.x*T+8,m.y*T+8,1.1,0.6]);},
  arrows:()=>whirls.filter(whirlOut).map(w=>({x:w.x,y:w.y})),
  hint(){const n=whirls.filter(whirlOut).length;
    if(n)return[n===1?'¡Torbellino de luz!':'¡Torbellinos de luz!',(n===1?'Chupa':'Hay '+n+' que chupan')+' lo que más tenés y lo desparrama'+(n===1?'':'n')+' en motas: '+(n===1?'tocalo para deshacerlo.':'tocalos para deshacerlos.')];
    const ms=whirlMotes.filter(whirlLie);if(!ms.length)return null;const sum={};for(const m of ms)sum[m.k]=(sum[m.k]||0)+m.n;
    return['Motas de luz:',(ms.length===1?'hay una con ':'hay '+ms.length+' con ')+Object.entries(sum).map(([k,v])=>v+' '+whirlRN(k,v)).join(' y ')+': tocalas antes de que se apaguen.'];},
  row:whirlRow,
  // El torbellino se toca donde se lo ve (es alto: también un casillero más arriba); si no, las motas a un casillero o menos.
  tap(tx,ty){const hit=whirls.find(w=>whirlOut(w)&&(Math.hypot(w.x-tx,w.y-ty)<=WHIRL_HIT||Math.hypot(w.x-tx,w.y-1-ty)<=WHIRL_HIT));
    if(hit){whirlStats.taps++;whirlEnd(hit,'break','¡deshecho!');st.res.ideas+=2*IX;float(hit.x,hit.y-1,ideaTxt(2),RCOL.ideas);toast('¡Torbellino deshecho!');return true;}
    let n=0;for(const m of whirlMotes)if(whirlLie(m)&&Math.hypot(m.x-tx,m.y-ty)<=WHIRL_MOTE_HIT){whirlStats.tap+=whirlGet(m);n++;}
    if(n){zaps.push({x:tx,y:ty,t:0.4});return true;}
    return false;},
  // Dos torbellinos a propósito, a lo que no cubre un estabilizador.
  prueba(){for(let k=0;k<2;k++)spawnWhirl(true);},
  debug:{whirlStats:()=>whirlStats,whirls:()=>whirls,whirlMotes:()=>whirlMotes,spawnWhirl:f=>spawnWhirl(f),whirlEvery:()=>whirlEvery()},
  // Cazavientos: un cazatormentas de impermeable amarillo, con antiparras y el frasco donde atrapa la luz de los torbellinos.
  guardia:{kind:'cazavientos',pal:{c:'#e8b830',C:'#b08820',j:'#3a3a4a'},draw(a,K){const ST=hx('#3a3a4a'),FR=hx('#8a8f9c'),LN=hx('#7af0e0'),GL=P4('#7aa8c8','#bfe4f4','#e8f4ff');
      ell(a,32,10,14,7,(i,j)=>j<=2?(i<-5&&j<-3?hx('#ffe07a'):hx('#e8b830')):null);rect(a,17,11,30,2,hx('#b08820'));
      rect(a,18,19,28,3,ST);for(const x of[26,38]){ell(a,x,21,5,4.5,FR);ell(a,x,21,3.6,3.2,(i,j)=>i+j<-2?hx('#e8fff8'):LN);}rect(a,31,20,2,2,FR);
      rect(a,44,30,14,17,GL[1]);rect(a,44,30,3,17,GL[2]);rect(a,55,30,3,17,GL[0]);rect(a,43,28,16,3,GL[2]);rect(a,45,25,12,4,hx('#a0703e'));rect(a,45,25,12,1,hx('#c98f55'));
      ell(a,51,39,4,4,(i,j)=>{const d=Math.hypot(i,j);return d<1.6?hx('#ffffff'):d<3?hx('#ffd96a'):hx('#f0b040');});for(const[x,y]of[[47,34],[55,44],[48,45]])a.set(x,y,hx('#fff6c8'));}}});
