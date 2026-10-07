// Olas de frío: la amenaza de la era omega (ERA.frost, octubre de 2026). Los universos se enfrían y por el mapa cruzan frentes de
// escarcha: la mecánica nueva es un frente que avanza en línea. Desde FROST_START, cada ~frostEvery() segundos entra una ola desde
// fuera de la pantalla, por uno de los cuatro lados (a FROST_FROM casilleros de un edificio), y marcha derecho hacia él a FROST_SPD
// casilleros por segundo; desde FROST_PAIR inventos vienen de a dos, por lados distintos. Es una línea de 2·FROST_W+1 casilleros,
// perpendicular a su marcha, con un corazón de hielo en el medio. Lo que el frente pisa se congela (o.bug, se guarda; cada ola
// congela cada casillero una sola vez): no produce hasta que lo tocás o hasta que se descongela solo a los frostThaw() segundos
// (la mitad con el abrigo cuántico). La gente que pisa (aldeanos y robots) anda y trabaja a la mitad durante FROST_CHILL segundos
// (v.chill, no se guarda). Tocar el corazón rompe la ola entera (+2 ideas); lo que ya congeló sigue congelado. La defensa de la
// era (la estufa estelar) derrite el frente donde lo toca su calor, a ERA.defense.r casilleros: ese pedazo de la línea se apaga
// para siempre y la ola sigue con un hueco. El corazón no se derrite (solo se rompe con un toque), pero lo que congela cerca de
// una estufa se descongela en FROST_NEAR segundos, y la estufa misma no se congela. Después de FROST_RUN casilleros la ola se
// disipa sola. Vienen más seguido con cada invento (+10%) y con la lonja del calor (+30%). Las olas no se guardan.
// Calibrado con el bot (la era sola): con medio casillero por segundo, 60 s congelado y de a una, los fogoneros rompían todas
// las olas antes de que llegaran a la ciudad (la del bot cabe en 4,5 casilleros alrededor de los cuarteles) y sin defensas
// se congelaba hasta la mitad de la ciudad (14,8 min contra 9,6 tocando). De a dos, más rápido y 40 s congelado, los fogoneros no
// llegan a todo y sin nada la era tarda 1,4 veces.
let frosts=[],frostSteam=[];
const FROST_START=120,FROST_FROM=16,FROST_W=4,FROST_SPD=1,FROST_RUN=30,FROST_THAW=40,FROST_NEAR=10,FROST_CHILL=15,FROST_PAIR=5;
const frostEvery=()=>50/((1+0.1*Object.keys(st.techs).length)*(st.techs.calor?1.3:1));
const frostThaw=()=>FROST_THAW*(st.techs.abrigo?0.5:1);
const frostOut=w=>w.state==='go';
// Dónde está el pedazo k de la línea (de −FROST_W a FROST_W; el 0 es el corazón).
const frostSeg=(w,k)=>({x:w.x-w.dy*k,y:w.y+w.dx*k});
function spawnFrost(){const bs=[];obj.forEach((o,i)=>{if(o&&BUILD[o.t]&&!o.bug)bs.push(i);});if(!bs.length)return;
  const n=Object.keys(st.techs).length>=FROST_PAIR?2:1,ds=DIRS.slice();
  for(let k=0;k<n;k++){const ti=bs[Math.floor(Math.random()*bs.length)],[dx,dy]=ds.splice(Math.floor(Math.random()*ds.length),1)[0];
    frosts.push({x:clamp(ti%MW-dx*FROST_FROM,1,MW-2),y:clamp(((ti/MW)|0)-dy*FROST_FROM,1,MH-2),dx,dy,go:0,segs:new Array(2*FROST_W+1).fill(true),seen:new Set(),state:'go',t:0,ph:Math.random()*6.28});}
  toast(n>1?'¡Dos olas de frío, de dos lados! Congelan lo que pisan: tocá sus corazones de hielo.':'¡Una ola de frío! Congela lo que pisa: tocá el corazón de hielo para romperla.');}
function breakFrost(w,txt){w.state='break';w.t=0;zaps.push({x:w.x,y:w.y-0.3,t:0.5});if(txt)float(w.x,w.y-0.9,txt,'#bfe8ff');}
// Lo congelado vuelve a producir.
function thawFrost(i,txt){const o=obj[i];o.bug=false;o.ice=0;BROKEN=null;if(txt)float(i%MW,(i/MW)|0,txt,'#ffb060');}
function frostFreeze(w,i){const o=obj[i];if(!o||!BUILD[o.t]||o.bug||(ERA.defense&&o.t===ERA.defense.id))return;
  o.bug=true;o.ice=0;BROKEN=null;float(i%MW,(i/MW)|0,'¡congelado!','#bfe8ff');
  if(!w.told){w.told=true;toast('¡El frío congeló '+nameOf(o).toLowerCase()+'! No produce: tocá lo congelado para descongelarlo.');}}
function updateFrosts(dt){const HT=towersXY();
  for(const w of frosts){w.t+=dt;
    if(!frostOut(w)){if(w.t>=(w.state==='fade'?2:1))w.dead=true;continue;}
    const v=FROST_SPD*dt;w.x+=w.dx*v;w.y+=w.dy*v;w.go+=v;
    if(w.go>=FROST_RUN||!inb(Math.round(w.x),Math.round(w.y))){w.state='fade';w.t=0;continue;}
    for(let k=-FROST_W;k<=FROST_W;k++){if(!w.segs[k+FROST_W])continue;const p=frostSeg(w,k),hot=HT.length&&jammed(HT,p.x,p.y);
      // El calor de una estufa le abre un hueco al frente (el corazón aguanta).
      if(hot&&k){w.segs[k+FROST_W]=false;frostSteam.push({x:p.x,y:p.y,t:1.6});if(!w.melt){w.melt=true;float(p.x,p.y-0.6,'¡derretido!','#ffb060');}continue;}
      const tx=Math.round(p.x),ty=Math.round(p.y);if(!inb(tx,ty))continue;const i=ty*MW+tx;if(w.seen.has(i))continue;w.seen.add(i);frostFreeze(w,i);}
    // La gente que pisa se entumece (cerca de una estufa, no).
    for(const p of vil){if(p.away||p.held||p.orb)continue;const ax=(p.x-w.x)*w.dx+(p.y-w.y)*w.dy,k=Math.round((p.y-w.y)*w.dx-(p.x-w.x)*w.dy);
      if(Math.abs(ax)>0.6||Math.abs(k)>FROST_W||!w.segs[k+FROST_W]||(HT.length&&jammed(HT,p.x,p.y)))continue;
      if(!(p.chill>0))float(p.x,p.y-1,'¡brr!','#bfe8ff');p.chill=FROST_CHILL;}}
  frosts=frosts.filter(w=>!w.dead);
  for(const s of frostSteam)s.t-=dt;frostSteam=frostSteam.filter(s=>s.t>0);
  // Entumecidos: andan y trabajan a la mitad (v.slow, que el motor respeta como la peste).
  for(const v of vil){if(!(v.chill>0))continue;v.chill-=dt;if(v.chill<=0)v.chill=0;v.slow=v.chill>0;}}
// Cada medio segundo: aparecer, y lo congelado se descongela solo (en FROST_NEAR segundos cerca de una estufa).
function frostTick(step){if(st.time>=FROST_START&&Math.random()<step/frostEvery())spawnFrost();const HT=towersXY();
  for(let i=0;i<obj.length;i++){const o=obj[i];if(!o||!o.bug||!BUILD[o.t])continue;o.ice=(o.ice||0)+step;
    if(o.ice>=(HT.length&&jammed(HT,i%MW,(i/MW)|0)?FROST_NEAR:frostThaw()))thawFrost(i,'¡descongelado!');}}
// Escarcha encima de un edificio congelado: un bloque de hielo con un borde que brilla, nieve arriba y carámbanos abajo. La dibuja
// ERA.deco de la era (y drawOver, para la fogata y el taller, que el motor dibuja aparte).
function frostCrust(px,py){const t=performance.now()/1000,sh=(t*0.7+px*0.013)%2.2;
  ctx.fillStyle='rgba(190,224,255,.45)';ctx.fillRect(px+1,py+1,T-2,T-2);ctx.strokeStyle='rgba(244,251,255,.9)';ctx.lineWidth=0.7;ctx.strokeRect(px+1.4,py+1.4,T-2.8,T-2.8);
  if(sh<1){ctx.strokeStyle='rgba(255,255,255,'+(0.7*(1-Math.abs(sh*2-1))).toFixed(2)+')';ctx.lineWidth=1.2;ctx.beginPath();ctx.moveTo(px+2+sh*10,py+13);ctx.lineTo(px+4+sh*10,py+3);ctx.stroke();}
  ctx.fillStyle='#f4fbff';ctx.fillRect(px+1,py+0.5,T-2,1.4);
  for(let k=0;k<4;k++){const x=px+3+k*3.4,h=1.6+((k*7+((px+py)>>4))%3)*0.8;ctx.beginPath();ctx.moveTo(x-0.9,py+T-1.6);ctx.lineTo(x+0.9,py+T-1.6);ctx.lineTo(x,py+T-1.6+h);ctx.closePath();ctx.fill();}}
// Un copito: tres rayas que se cruzan, con contorno.
function frostFlake(x,y,r,col){ctx.lineCap='round';for(const[c,w]of[['#1b1a24',r*0.55],[col,r*0.28]]){ctx.strokeStyle=c;ctx.lineWidth=w;ctx.beginPath();
  for(let k=0;k<3;k++){const a=k*Math.PI/3;ctx.moveTo(x-Math.cos(a)*r,y-Math.sin(a)*r);ctx.lineTo(x+Math.cos(a)*r,y+Math.sin(a)*r);}ctx.stroke();}ctx.lineCap='butt';}
function frostDiamond(x,y,rx,ry){ctx.beginPath();ctx.moveTo(x,y-ry);ctx.lineTo(x+rx,y);ctx.lineTo(x,y+ry);ctx.lineTo(x-rx,y);ctx.closePath();}
// En el suelo: la escarcha que deja el frente detrás de él y el hielo bajo los pies de los entumecidos.
function drawFrostUnder(){const t=performance.now()/1000;
  for(const w of frosts){const a=frostOut(w)?1:w.state==='fade'?Math.max(0,1-w.t/2):Math.max(0,1-w.t);if(a<=0)continue;
    ctx.save();ctx.translate(w.x*T+8,w.y*T+8);ctx.rotate(Math.atan2(w.dy,w.dx));ctx.globalAlpha=a;
    const g=ctx.createLinearGradient(-T*2.6,0,-6,0);g.addColorStop(0,'rgba(214,236,255,0)');g.addColorStop(1,'rgba(214,236,255,.42)');ctx.fillStyle=g;
    for(let k=-FROST_W;k<=FROST_W;k++)if(w.segs[k+FROST_W])ctx.fillRect(-T*2.6,k*T-8,T*2.6-6,T);
    ctx.restore();}
  for(const v of vil)if(v.chill>0&&!v.away){ctx.fillStyle='rgba(200,232,255,.6)';ctx.beginPath();ctx.ellipse(v.x*T+8,v.y*T+14.5,5.5,1.8,0,0,6.29);ctx.fill();}}
// El frente: una pared de escarcha con cristales en el borde de adelante y copos que vuelan con él; el corazón flota en el medio,
// con su halo rojo de amenaza. Al romperse, los pedazos saltan y se apagan; donde se derrite, sube vapor.
function drawFrosts(){const t=performance.now()/1000;
  for(const w of frosts){const br=w.state==='break',a=frostOut(w)?1:w.state==='fade'?Math.max(0,1-w.t/2):Math.max(0,1-w.t);if(a<=0)continue;
    ctx.save();ctx.translate(w.x*T+8,w.y*T+8);ctx.rotate(Math.atan2(w.dy,w.dx));ctx.globalAlpha=a;
    for(let k=-FROST_W;k<=FROST_W;k++){if(!w.segs[k+FROST_W])continue;const y0=k*T-8,o=br?w.t*10:0;
      if(br){ctx.fillStyle='#e8f6ff';for(let j=0;j<3;j++){const yy=y0+3+j*5,dx=(j-1)*o*0.6;frostDiamond(2+o*(0.5+j*0.3),yy+dx,1.6,2.4);ctx.fill();}continue;}
      const g=ctx.createLinearGradient(-8,0,4,0);g.addColorStop(0,'rgba(214,236,255,.35)');g.addColorStop(1,'rgba(232,246,255,.78)');ctx.fillStyle=g;ctx.fillRect(-8,y0,12,T);
      ctx.fillStyle='rgba(122,168,214,.9)';ctx.fillRect(-8,y0,1,T);ctx.fillStyle='#f4fbff';ctx.fillRect(2,y0,2,T);
      for(let j=0;j<3;j++){const yy=y0+2.7+j*5.3,h=3+((k*5+j*3+9)%3)*1.2;ctx.fillStyle='#1b1a24';ctx.beginPath();ctx.moveTo(3.6,yy-2.2);ctx.lineTo(4.6+h,yy);ctx.lineTo(3.6,yy+2.2);ctx.closePath();ctx.fill();
        ctx.fillStyle=j===1?'#ffffff':'#d8eeff';ctx.beginPath();ctx.moveTo(3.6,yy-1.5);ctx.lineTo(3.8+h,yy);ctx.lineTo(3.6,yy+1.5);ctx.closePath();ctx.fill();}
      for(let j=0;j<2;j++){const u=(t*0.9+j*0.5+k*0.37+w.ph)%1,yy=y0+3+((k*7+j*9)%10)+Math.sin(t*3+j+k)*1.2;ctx.fillStyle='rgba(255,255,255,'+(0.9*(1-u)).toFixed(2)+')';ctx.fillRect(-6+u*18,yy,1.4,1.4);}}
    ctx.restore();
    // El corazón: un cristal que late y brilla.
    const cx=w.x*T+8,gy=w.y*T+13,pu=0.5+0.5*Math.sin(t*5+w.ph),cy=w.y*T+3+Math.sin(t*2.6+w.ph)*1.2;ctx.globalAlpha=a;
    if(br){ctx.fillStyle='#e8f6ff';for(let j=0;j<5;j++){const an=j*1.26+w.ph,d=w.t*14;frostDiamond(cx+Math.cos(an)*d,cy+Math.sin(an)*d,1.8,2.6);ctx.fill();}ctx.globalAlpha=1;continue;}
    ctx.fillStyle='rgba(232,101,77,'+(0.28+0.14*pu).toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,gy,7.5,2.8,0,0,6.29);ctx.fill();
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,10);g.addColorStop(0,'rgba(196,238,255,'+(0.5+0.3*pu).toFixed(2)+')');g.addColorStop(1,'rgba(196,238,255,0)');ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,10,0,6.29);ctx.fill();
    ctx.fillStyle='#1b1a24';frostDiamond(cx,cy,6,8.4);ctx.fill();ctx.fillStyle='#6aaee6';frostDiamond(cx,cy,5,7.4);ctx.fill();
    ctx.fillStyle='#bfe8ff';ctx.beginPath();ctx.moveTo(cx,cy-7.4);ctx.lineTo(cx-5,cy);ctx.lineTo(cx,cy+7.4);ctx.closePath();ctx.fill();
    ctx.fillStyle='#ffffff';ctx.beginPath();ctx.moveTo(cx,cy-7.4);ctx.lineTo(cx-2.6,cy-1.2);ctx.lineTo(cx,cy);ctx.closePath();ctx.fill();
    frostDiamond(cx,cy+0.5,1.2+pu*1.3,1.8+pu*1.8);ctx.fill();
    for(let j=0;j<3;j++){const an=t*1.6+j*2.09+w.ph;ctx.fillStyle='rgba(255,255,255,'+(0.5+0.5*Math.sin(t*7+j)).toFixed(2)+')';ctx.fillRect(cx+Math.cos(an)*8-0.7,cy+Math.sin(an)*5-0.7,1.4,1.4);}
    ctx.globalAlpha=1;}
  for(const s of frostSteam){const u=1-s.t/1.6;for(let j=0;j<2;j++){ctx.fillStyle='rgba(236,236,240,'+(0.5*(1-u)).toFixed(2)+')';ctx.beginPath();ctx.arc(s.x*T+8+Math.sin(u*5+j*2)*2+(j-0.5)*4,s.y*T+8-u*12-j*2,1.4+u*2.4,0,6.29);ctx.fill();}}
  // La fogata y el taller congelados (el motor no les pasa ERA.deco) y un copito arriba de los entumecidos.
  for(let i=0;i<obj.length;i++){const o=obj[i];if(!o||!o.bug||(o.t!=='fogata'&&o.t!=='herreria'))continue;const px=i%MW*T,py=((i/MW)|0)*T;frostCrust(px,py);
    ctx.strokeStyle='rgba(232,101,77,'+(0.55+0.3*Math.sin(t*6)).toFixed(2)+')';ctx.lineWidth=0.6;ctx.strokeRect(px+0.5,py+0.5,T-1,T-1);}
  for(const v of vil)if(v.chill>0&&!v.away)frostFlake(v.x*T+8,v.y*T-6+Math.sin(t*4+v.x)*0.8,2.6,'#d8eeff');}
// La barra cuenta qué parte de los edificios está cerca de una estufa estelar.
function frostRow(p){const HT=towersXY(),bs=[];obj.forEach((o,i)=>{if(o&&BUILD[o.t])bs.push(i);});
  const cov=HT.length?bs.filter(i=>jammed(HT,i%MW,(i/MW)|0)).length:0,n=frosts.filter(frostOut).length,nb=bs.filter(i=>obj[i].bug).length,
    on=HT.length>0||n>0||nb>0||st.time>=FROST_START;$(p==='g'?'gridRow':'smogRow').hidden=!on;if(!on)return;const f=bs.length?cov/bs.length*100:0;
  $(p+'Fill').style.width=f+'%';$(p+'Fill').classList.toggle('hi',n>0||nb>0);$(p+'Num').textContent=Math.round(f)+'%';
  $(p+'Meta').textContent=n?(n===1?'1 ola de frío':n+' olas de frío')+(nb?' · '+nb+(nb===1?' congelado':' congelados'):''):nb?nb+(nb===1?' congelado':' congelados'):HT.length?'todo templado':'sin '+ERA.defense.label.toLowerCase();}
amenaza({on:'frost',
  reset(){frosts=[];frostSteam=[];},
  tick:frostTick,
  update:updateFrosts,
  targets(add){for(const w of frosts)if(frostOut(w))add(w.x,w.y,Math.round(w.x),Math.round(w.y));},
  drawUnder:drawFrostUnder,
  drawOver:drawFrosts,
  lights(L){for(const w of frosts){if(!frostOut(w))continue;L.push([w.x*T+8,w.y*T+4,2.4,0.9]);
    for(let k=-FROST_W;k<=FROST_W;k+=2){if(!k||!w.segs[k+FROST_W])continue;const p=frostSeg(w,k);L.push([p.x*T+8,p.y*T+8,1.3,0.55]);}}},
  // La flecha del borde apunta al corazón.
  arrows:()=>frosts.filter(frostOut).map(w=>({x:w.x,y:w.y})),
  hint(){const n=frosts.filter(frostOut).length;if(n)return['¡Ola de frío!',(n===1?'Un frente de escarcha cruza el mapa':'Cruzan '+n+' frentes de escarcha')+' y congela'+(n===1?'':'n')+' lo que pisa'+(n===1?'':'n')+': '+(n===1?'tocá el corazón de hielo para romperlo.':'tocá sus corazones de hielo para romperlos.')];
    const nb=obj.filter(o=>o&&o.bug&&BUILD[o.t]).length;if(nb)return['Congelados:',nb+(nb===1?' edificio no produce: tocalo para descongelarlo.':' edificios no producen: tocalos para descongelarlos.')];
    return null;},
  row:frostRow,
  // El corazón se toca donde se lo ve; un edificio congelado, encima.
  tap(tx,ty){const hit=frosts.find(w=>frostOut(w)&&Math.hypot(w.x-tx,w.y-ty)<=1.3);
    if(hit){breakFrost(hit,'¡rota!');st.res.ideas+=2*IX;float(hit.x,hit.y-1.5,ideaTxt(2),RCOL.ideas);toast('¡Ola de frío rota!');return true;}
    if(!inb(tx,ty))return false;const i=ty*MW+tx,o=obj[i];
    if(o&&o.bug&&BUILD[o.t]){thawFrost(i,'¡descongelado!');zaps.push({x:tx,y:ty,t:0.4});toast('¡Fuera el hielo! '+nameOf(o)+' vuelve a producir.');save();return 'b';}
    return false;},
  prueba(){for(let k=0;k<3;k++)spawnFrost();},
  debug:{frosts:()=>frosts,spawnFrost:()=>spawnFrost(),frostEvery:()=>frostEvery()},
  // Fogonero: gorra de maquinista con visera, hollín en la cara y una pala con una brasa encendida (un guiño al fuego de la
  // Prehistoria).
  guardia:{kind:'fogonero',pal:{c:'#3e4a66',C:'#2a3248',j:'#8a5a2b'},draw(a,K){const CP=hx('#2c3446'),CL=hx('#46526e'),SOOT=hx('#5a4e48');
      ell(a,32,10,14,7,(i,j)=>j<=1?(i<-6&&j<-2?CL:CP):null);rect(a,16,10,32,2,hx('#1e2432'));rect(a,19,12,26,2,hx('#141826'));rect(a,28,5,8,2,hx('#c8a050'));
      for(const[x,y]of[[24,26],[25,27],[38,25],[22,24]])a.set(x,y,SOOT);
      line(a,45,58,53,27,hx('#7a5434'),3);line(a,46,58,54,27,hx('#a0703e'),1);rect(a,42,57,8,3,hx('#4f3522'));
      poly(a,[[46,28],[62,28],[61,15],[47,15]],(x,y)=>x>58?hx('#5d6270'):y<18?hx('#c3c7cf'):hx('#8a8f9c'));rect(a,46,27,17,2,hx('#5d6270'));
      ell(a,54,13,7,5,(i,j)=>{const d=Math.hypot(i,j*1.4);return d<2.2?hx('#fff3b0'):d<4.2?hx('#ffd35a'):j>1?hx('#c43d20'):hx('#f08a24');});
      for(const[x,y,c]of[[50,5,'#ffd35a'],[57,3,'#f08a24'],[54,1,'#ffd35a']])rect(a,x,y,2,2,hx(c));}}});
