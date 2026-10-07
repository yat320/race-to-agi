// Estrellas inestables: la amenaza de la era de los soles (ERA.novas, octubre de 2026). La humanidad aprende a encender
// estrellas, pero no todas salen estables: la mecánica nueva es una cuenta regresiva que explota en un área. Desde NOVA_START,
// cada ~novaEvery() segundos cae del cielo una estrella chica (tarda NOVA_FALL segundos en bajar) en la tierra libre pegada a
// donde hay más edificios sanos juntos (novaSpot: el casillero libre con más edificios a NOVA_R o menos, entre los mejores al
// azar; lo que cubre un blindaje atrae la mitad). Desde NOVA_PAIR inventos caen de a dos y desde NOVA_TRIO de a tres, en lugares
// distintos. Se queda en el suelo latiendo, con un número grande que cuenta para atrás desde NOVA_FUSE. Si llega a cero, explota
// y rompe (o.bug, se guarda) todo lo que está a NOVA_R casilleros: no produce hasta que lo tocás o hasta que se arregla solo a
// los NOVA_FIX segundos. Tocar la estrella la apaga (+2 ideas). El enfriado hace que cuente el doble de lento (novaRate). La
// defensa de la era (el blindaje solar) cubre ERA.defense.r casilleros: las estrellas que caen ahí cuentan a la mitad y su
// explosión no rompe lo que cubre, pero los blindajes que la tenían cerca se recalientan y no cubren durante NOVA_HEAT segundos
// (el blindaje mismo nunca se rompe). El artificiero (el guardián) no la apaga de un toque: la desarma en NOVA_DEFUSE segundos
// junto a ella, así que si caen varias juntas no llega a todas. Caen más seguido con cada invento (+10%) y con la subasta de
// estrellas (+30%). Las estrellas no se guardan; los recalentados tampoco (al cargar, los blindajes están fríos).
// Calibrado con el bot (la era sola, 10 a 20 corridas por variante): con un toque del artificiero y blindajes que no se
// recalentaban, los dos protegían todo (la ciudad del bot entra en dos blindajes y a 8 casilleros de los cuarteles) y la era daba
// lo mismo que tocando (9,5–9,9 min); con el recalentado, el desarme largo y las tandas de tres, solo con cuarteles tarda ~1,1
// veces lo de tocando, solo con blindajes ~1,2 y sin nada ~1,4.
let novas=[],novaBooms=[],novaScars=[],NOVA_SPR=null;
const NOVA_START=120,NOVA_FUSE=20,NOVA_R=2.5,NOVA_FIX=42,NOVA_FALL=1.2,NOVA_HIT=1.3,NOVA_PAIR=4,NOVA_TRIO=6,NOVA_BOOM=1.2,NOVA_SCAR=10,NOVA_DEFUSE=10,NOVA_HEAT=25;
const novaEvery=()=>45/((1+0.1*Object.keys(st.techs).length)*(st.techs.subasta?1.3:1));
// Qué tan rápido cuenta: con el enfriado, la mitad; cerca de un blindaje, otra mitad.
const novaRate=n=>(st.techs.enfriado?0.5:1)*(n.sh?0.5:1);
const novaOut=n=>n.state!=='out';
const novaNear=(i,x,y)=>Math.hypot(i%MW-x,((i/MW)|0)-y)<=NOVA_R;
// Los blindajes que cubren: los que andan y no están recalentados.
const novaShields=()=>towersXY().filter(([x,y])=>!(obj[y*MW+x].heat>0));
// Dónde cae: un casillero libre pegado a un edificio, el que tenga más edificios sanos alrededor (uno al azar entre los que
// tienen casi tantos como el mejor), lejos de las otras estrellas; lo que cubre un blindaje atrae la mitad. -1 si no hay ninguno.
function novaSpot(){const bs=[],TW=novaShields();obj.forEach((o,i)=>{if(o&&BUILD[o.t]&&!o.bug)bs.push([i,TW.length&&jammed(TW,i%MW,(i/MW)|0)?0.5:1]);});if(!bs.length)return -1;
  const seen=new Set(),cand=[];let best=0;
  for(const[i]of bs){const x=i%MW,y=(i/MW)|0;
    for(const[dx,dy]of DIRS8){const a=x+dx,b=y+dy,j=b*MW+a;if(seen.has(j)||!passable(a,b))continue;seen.add(j);
      if(novas.some(n=>Math.hypot(n.x-a,n.y-b)<3))continue;let c=0;for(const[k,w]of bs)if(novaNear(k,a,b))c+=w;cand.push([c,j]);if(c>best)best=c;}}
  const top=cand.filter(c=>c[0]>=best-1);return top.length?top[Math.floor(Math.random()*top.length)][1]:-1;}
function spawnNovas(){const nt=Object.keys(st.techs).length,n=nt>=NOVA_TRIO?3:nt>=NOVA_PAIR?2:1;let k=0;
  for(;k<n;k++){const j=novaSpot();if(j<0)break;novas.push({x:j%MW,y:(j/MW)|0,fuse:NOVA_FUSE,t:0,state:'fall',sh:false,ph:Math.random()*6.28});}
  if(k)toast(k>1?'¡Cayeron '+(k===2?'dos':'tres')+' estrellas inestables! Cuando la cuenta llega a 0, explotan: tocalas para apagarlas.':'¡Cayó una estrella inestable! Cuando la cuenta llega a 0, explota: tocala para apagarla.');}
// Se apaga: se encoge y deja de contar.
function novaOff(n,txt){n.state='out';n.ot=0;zaps.push({x:n.x,y:n.y-0.2,t:0.5});if(txt)float(n.x,n.y-1,txt,'#7fe8ff');}
// Lo roto vuelve a producir.
function novaFix(i,txt){const o=obj[i];o.bug=false;o.burn=0;BROKEN=null;if(txt)float(i%MW,(i/MW)|0,txt,'#93d36c');}
// Explota: rompe lo que está a NOVA_R casilleros, menos lo que cubre un blindaje; los blindajes que la tenían cerca aguantan la
// explosión y se recalientan: NOVA_HEAT segundos no cubren.
function novaBoom(n,TW){n.dead=true;novaBooms.push({x:n.x,y:n.y,t:0});novaScars.push({x:n.x,y:n.y,t:0,ph:n.ph});let hit=0,safe=0;
  for(let y=Math.floor(n.y-NOVA_R);y<=Math.ceil(n.y+NOVA_R);y++)for(let x=Math.floor(n.x-NOVA_R);x<=Math.ceil(n.x+NOVA_R);x++){
    if(!inb(x,y)||Math.hypot(x-n.x,y-n.y)>NOVA_R)continue;const i=y*MW+x,o=obj[i];if(!o||!BUILD[o.t]||o.bug)continue;
    if(TW.length&&jammed(TW,x,y)){safe++;continue;}
    o.bug=true;o.burn=0;BROKEN=null;hit++;}
  let hot=0;for(const[x,y]of TW)if(Math.hypot(x-n.x,y-n.y)<=ERA.defense.r){obj[y*MW+x].heat=NOVA_HEAT;hot++;float(x,y-0.6,'¡recalentado!','#ff8a5a');}
  float(n.x,n.y-1.2,'¡BUM!','#ffb347');
  toast(hit?'¡Explotó una estrella! Rompió '+(hit===1?'un edificio: tocalo para arreglarlo.':hit+' edificios: tocalos para arreglarlos.'):hot||safe?'¡El blindaje aguantó la explosión! Se recalentó: un rato no cubre.':'¡Explotó una estrella!');}
function updateNovas(dt){if(!novas.length&&!novaBooms.length&&!novaScars.length)return;const TW=novaShields();
  for(const n of novas){n.t+=dt;
    if(n.state==='out'){n.ot+=dt;if(n.ot>=0.8)n.dead=true;continue;}
    if(n.state==='fall'){if(n.t<NOVA_FALL)continue;n.state='on';n.t=0;zaps.push({x:n.x,y:n.y,t:0.4});}
    n.sh=TW.length>0&&jammed(TW,n.x,n.y);n.fuse-=dt*novaRate(n);if(n.fuse<=0)novaBoom(n,TW);}
  novas=novas.filter(n=>!n.dead);
  // Un artificiero que va a una estrella deja de caminar cuando su casillero ya es vecino del de ella, aunque esté corrido del
  // centro y le quede lejos para tocarla (a más de 1,6): se lo lleva al centro de su casillero.
  for(const g of guards){const q=g.goal;if(!q||q.b||g.path.length||!novas.some(n=>n.x===q.tx&&n.y===q.ty))continue;const[x,y]=tileOf(g);
    if(Math.hypot(q.x-g.x,q.y-g.y)>1.6&&passable(x,y))g.path=[[x,y]];}
  for(const b of novaBooms)b.t+=dt;novaBooms=novaBooms.filter(b=>b.t<NOVA_BOOM);
  for(const s of novaScars)s.t+=dt;novaScars=novaScars.filter(s=>s.t<NOVA_SCAR);}
// Cada medio segundo: caer, lo roto se arregla solo y los blindajes recalentados se enfrían.
function novaTick(step){if(st.time>=NOVA_START&&Math.random()<step/novaEvery())spawnNovas();
  for(let i=0;i<obj.length;i++){const o=obj[i];if(!o||!BUILD[o.t])continue;if(o.heat>0){o.heat-=step;if(o.heat<=0){o.heat=0;float(i%MW,(i/MW)|0,'¡listo!','#7fe8ff');}}
    if(!o.bug)continue;o.burn=(o.burn||0)+step;if(o.burn>=NOVA_FIX)novaFix(i,'¡arreglado!');}}
// Estrella chica de cinco puntas que late: amarilla, naranja cuando le queda poco y roja y rajada al final (stage 0, 1, 2); el
// segundo cuadro tiene las puntas más largas. Se arma la primera vez que hace falta (cuando ya están las ayudas del arte).
function novaArt(stage,f){return mkA(48,48,a=>{const C=[['#e09020','#ffd35a','#fff3b0','#ffffff'],['#d0581a','#ff9a3a','#ffd35a','#fff3b0'],['#9a2418','#f0503a','#ff9a70','#ffe2c8']][stage].map(hx);
  const R1=f?22:19,R2=f?8.5:9,pts=[];for(let k=0;k<10;k++){const an=-Math.PI/2+k*Math.PI/5,r=k%2?R2:R1;pts.push([24+Math.cos(an)*r,25+Math.sin(an)*r]);}
  poly(a,pts,(x,y)=>{const d=Math.hypot(x-24,y-25);return d<4.5?C[3]:d<8?C[2]:d<12.5?C[1]:C[0];});
  if(stage===2)for(const[x0,y0,x1,y1]of[[24,25,30,16],[24,25,15,30],[24,25,31,32]])line(a,x0,y0,x1,y1,hx('#5a1410'),1);
  ell(a,20,21,1.6,1.6,hx('#ffffff'));outlineAll(a,OUTL);});}
const novaFrames=()=>NOVA_SPR||(NOVA_SPR=[0,1,2].map(s=>[novaArt(s,0),novaArt(s,1)]));
const novaStage=n=>n.fuse>10?0:n.fuse>5?1:2;
// Dónde está una estrella que cae: baja en diagonal desde el cielo.
const novaFallPos=n=>{const u=1-Math.min(1,n.t/NOVA_FALL);return{x:n.x+5*u,y:n.y-12*u};};
// En el suelo: lo que dejó cada explosión (quemado que se apaga de a poco) y, debajo de cada estrella, el área que va a romper:
// un círculo rojo que late más rápido cuanto menos le queda, con el borde punteado que gira; si la cubre un blindaje, un anillo
// cian adentro. Las que caen marcan dónde van a caer.
function drawNovaUnder(){if(!novas.length&&!novaScars.length)return;const t=performance.now()/1000,R=NOVA_R*T;
  for(const s of novaScars){const k=Math.min(1,(NOVA_SCAR-s.t)/3),cx=s.x*T+8,cy=s.y*T+9,r=R*0.75,g=ctx.createRadialGradient(cx,cy,0,cx,cy,r);
    g.addColorStop(0,'rgba(30,20,24,'+(0.5*k).toFixed(2)+')');g.addColorStop(0.6,'rgba(40,28,28,'+(0.22*k).toFixed(2)+')');g.addColorStop(1,'rgba(40,28,28,0)');
    ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(cx,cy,r,r*0.75,0,0,6.29);ctx.fill();
    for(let j=0;j<5;j++){const an=j*1.26+s.ph,d=r*(0.2+0.12*j);ctx.fillStyle='rgba(255,140,60,'+(0.8*k*(0.5+0.5*Math.sin(t*3+j))).toFixed(2)+')';ctx.fillRect(cx+Math.cos(an)*d-0.5,cy+Math.sin(an)*d*0.75-0.5,1,1);}}
  for(const n of novas){const cx=n.x*T+8,cy=n.y*T+8;
    if(n.state==='fall'){const u=Math.min(1,n.t/NOVA_FALL);ctx.fillStyle='rgba(0,0,0,'+(0.12+0.2*u).toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,cy+5,2+4*u,1+1.5*u,0,0,6.29);ctx.fill();
      ctx.strokeStyle='rgba(232,101,77,'+(0.3+0.4*u).toFixed(2)+')';ctx.lineWidth=0.8;ctx.setLineDash([2,2]);ctx.beginPath();ctx.arc(cx,cy,R,0,6.29);ctx.stroke();ctx.setLineDash([]);continue;}
    const k=n.state==='out'?Math.max(0,1-n.ot/0.8):1;if(k<=0)continue;const hz=1.5+(1-n.fuse/NOVA_FUSE)*7,pu=0.5+0.5*Math.sin(t*hz*6.28+n.ph);ctx.globalAlpha=k;
    ctx.fillStyle='rgba(232,101,77,'+(0.08+0.1*pu*(n.fuse<=5?1.6:1)).toFixed(2)+')';ctx.beginPath();ctx.arc(cx,cy,R,0,6.29);ctx.fill();
    ctx.strokeStyle='rgba(232,101,77,'+(0.55+0.35*pu).toFixed(2)+')';ctx.lineWidth=0.9;ctx.setLineDash([3,2]);ctx.lineDashOffset=-t*4;ctx.beginPath();ctx.arc(cx,cy,R,0,6.29);ctx.stroke();ctx.setLineDash([]);ctx.lineDashOffset=0;
    if(n.sh){ctx.strokeStyle='rgba(127,232,255,'+(0.45+0.2*pu).toFixed(2)+')';ctx.lineWidth=0.7;ctx.beginPath();ctx.arc(cx,cy,R-1.6,0,6.29);ctx.stroke();}
    ctx.fillStyle='rgba(232,101,77,'+(0.3+0.15*pu).toFixed(2)+')';ctx.beginPath();ctx.ellipse(cx,cy+6,5.5,2,0,0,6.29);ctx.fill();ctx.globalAlpha=1;}}
// La estrella en el suelo: un halo que pasa de dorado a rojo, y la estrella que salta y late más rápido cuanto menos le queda.
// Al apagarla, se encoge y se desvanece.
function drawNovas(){if(!novas.length)return;const t=performance.now()/1000,F=novaFrames();
  for(const n of novas){if(n.state==='fall')continue;const out=n.state==='out',k=out?Math.max(0,1-n.ot/0.8):1;if(k<=0)continue;
    const sg=out?0:novaStage(n),hz=1.5+(1-n.fuse/NOVA_FUSE)*7,cx=n.x*T+8,cy=n.y*T+5.5+(out?0:Math.abs(Math.sin(t*hz*3.14+n.ph))*-1.2),s=(out?k:1)*12;
    const g=ctx.createRadialGradient(cx,cy,0,cx,cy,9);g.addColorStop(0,['rgba(255,226,120,.6)','rgba(255,160,70,.6)','rgba(255,80,60,.65)'][sg]);g.addColorStop(1,'rgba(255,120,60,0)');
    if(!out){ctx.fillStyle=g;ctx.beginPath();ctx.arc(cx,cy,9,0,6.29);ctx.fill();}
    if(out)ctx.globalAlpha=k;ctx.drawImage(F[sg][out?0:Math.floor(t*hz*2+n.ph)%2],cx-s/2,cy-s/2,s,s);ctx.globalAlpha=1;}}
// Arriba de la oscuridad: la que cae (una estela dorada), las explosiones (destello, anillo de fuego y chispas) y el número grande
// de la cuenta, que se agranda en cada segundo y se pone naranja y después rojo; si la cubre un blindaje, un escudito cian al lado.
function drawNovaTop(){if(!novas.length&&!novaBooms.length)return;const t=performance.now()/1000,F=novaFrames(),R=NOVA_R*T;
  for(const n of novas){if(n.state!=='fall')continue;const p=novaFallPos(n),x=p.x*T+8,y=p.y*T+6;
    const g=ctx.createLinearGradient(x,y,x+12,y-26);g.addColorStop(0,'rgba(255,226,120,.85)');g.addColorStop(1,'rgba(255,226,120,0)');ctx.strokeStyle=g;ctx.lineWidth=3;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+12,y-26);ctx.stroke();ctx.lineCap='butt';ctx.drawImage(F[0][Math.floor(t*10)%2],x-6,y-6,12,12);}
  for(const b of novaBooms){const u=b.t/NOVA_BOOM,cx=b.x*T+8,cy=b.y*T+8;
    ctx.fillStyle='rgba(255,246,214,'+(0.85*(1-u)*(1-u)).toFixed(2)+')';ctx.beginPath();ctx.arc(cx,cy,R*(0.4+0.8*Math.min(1,u*3)),0,6.29);ctx.fill();
    ctx.strokeStyle='rgba(255,140,50,'+(1-u).toFixed(2)+')';ctx.lineWidth=2.5*(1-u)+0.4;ctx.beginPath();ctx.arc(cx,cy,R*(0.3+0.9*u),0,6.29);ctx.stroke();
    for(let k=0;k<12;k++){const an=k*0.5236+b.x,d=R*(0.2+1.1*u);ctx.fillStyle=k%2?'rgba(255,211,90,'+(1-u).toFixed(2)+')':'rgba(240,138,36,'+(1-u).toFixed(2)+')';ctx.fillRect(cx+Math.cos(an)*d-0.8,cy+Math.sin(an)*d*0.8-0.8,1.6,1.6);}}
  // Lo que lleva desarmado un artificiero: un arco cian que se cierra alrededor de la estrella.
  for(const n of novas){if(!(n.wk>0)||!novaOut(n))continue;const cx=n.x*T+8,cy=n.y*T+5.5,a0=-Math.PI/2,a1=a0+Math.min(1,n.wk/NOVA_DEFUSE)*6.283;
    ctx.lineWidth=1;ctx.strokeStyle='rgba(127,232,255,.3)';ctx.beginPath();ctx.arc(cx,cy,8,0,6.29);ctx.stroke();
    for(const[c,w]of[['#1b1a24',2.4],['#7fe8ff',1.3]]){ctx.lineWidth=w;ctx.strokeStyle=c;ctx.beginPath();ctx.arc(cx,cy,8,a0,a1);ctx.stroke();}}
  ctx.textAlign='center';ctx.lineJoin='round';
  for(const n of novas){if(n.state!=='on')continue;const v=Math.max(1,Math.ceil(n.fuse)),pop=Math.max(0,1-(v-n.fuse)*4),hot=v<=5,sz=(hot?11:10)*(1+0.3*pop),x=n.x*T+8,y=n.y*T-3;
    ctx.font='700 '+sz.toFixed(1)+'px "Pixelify Sans", monospace';ctx.lineWidth=3;ctx.strokeStyle='#1b1a24';ctx.strokeText(v,x,y);
    ctx.fillStyle=hot?(Math.floor(t*4)%2?'#ff5a4a':'#ffd0c8'):v<=10?'#ffb347':'#fff3b0';ctx.fillText(v,x,y);
    if(n.sh){const w=ctx.measureText(String(v)).width,sx=x-w/2-5,sy=y-4.5;ctx.fillStyle='#1b1a24';ctx.beginPath();ctx.moveTo(sx-3,sy-3.4);ctx.lineTo(sx+3,sy-3.4);ctx.lineTo(sx+3,sy+0.6);ctx.lineTo(sx,sy+3.6);ctx.lineTo(sx-3,sy+0.6);ctx.closePath();ctx.fill();
      ctx.fillStyle='#7fe8ff';ctx.beginPath();ctx.moveTo(sx-2.2,sy-2.6);ctx.lineTo(sx+2.2,sy-2.6);ctx.lineTo(sx+2.2,sy+0.3);ctx.lineTo(sx,sy+2.6);ctx.lineTo(sx-2.2,sy+0.3);ctx.closePath();ctx.fill();}}}
// Lo que rompió una explosión: hollín, llamitas que bailan, humo y el marco rojo que late. Lo dibuja el motor (el gancho drawBug)
// encima de cada edificio roto; la fogata y el taller, que el motor dibuja aparte, van en drawOver.
function novaScorch(px,py){const t=performance.now()/1000,a=0.55+0.3*Math.sin(t*6),k=((px*7+py*13)>>4)%3;
  ctx.fillStyle='rgba(30,20,24,.45)';ctx.beginPath();ctx.ellipse(px+8,py+11.5,6.5,3.6,0,0,6.29);ctx.fill();ctx.beginPath();ctx.ellipse(px+4.5+k,py+6,3,2.4,0,0,6.29);ctx.fill();
  for(const[fx,fy,s,o]of[[px+4.5,py+13,1,0],[px+11.5-k,py+11,0.8,1.7],[px+8,py+7.5,0.6,3.1]]){const h=(3+Math.sin(t*11+o)*0.9)*s,w=1.6*s;
    ctx.fillStyle='#f08a24';ctx.beginPath();ctx.moveTo(fx-w,fy);ctx.lineTo(fx+w,fy);ctx.lineTo(fx+Math.sin(t*7+o)*0.6,fy-h);ctx.closePath();ctx.fill();
    ctx.fillStyle='#ffd35a';ctx.beginPath();ctx.moveTo(fx-w*0.5,fy);ctx.lineTo(fx+w*0.5,fy);ctx.lineTo(fx,fy-h*0.55);ctx.closePath();ctx.fill();}
  puffs(px+9,py+4,2);ctx.strokeStyle='rgba(232,101,77,'+a.toFixed(2)+')';ctx.lineWidth=0.6;ctx.strokeRect(px+0.5,py+0.5,T-1,T-1);}
// Un blindaje recalentado: brilla rojo y le sube el calor; se le ve cuánto le falta para volver a cubrir.
function novaHot(o,px,py){const t=performance.now()/1000,f=Math.min(1,o.heat/NOVA_HEAT),a=0.35+0.25*f+0.12*Math.sin(t*7);
  const g=ctx.createRadialGradient(px+8,py+9,0,px+8,py+9,8);g.addColorStop(0,'rgba(255,110,60,'+a.toFixed(2)+')');g.addColorStop(1,'rgba(255,110,60,0)');ctx.fillStyle=g;ctx.fillRect(px,py,T,T);
  ctx.strokeStyle='rgba(255,150,90,.7)';ctx.lineWidth=0.6;for(let k=0;k<3;k++){const u=(t*0.8+k/3)%1,x=px+4+k*4;ctx.globalAlpha=1-u;ctx.beginPath();ctx.moveTo(x,py+6-u*8);ctx.quadraticCurveTo(x+1.2,py+4.5-u*8,x,py+3-u*8);ctx.stroke();}
  ctx.globalAlpha=1;ctx.fillStyle='#1b1a24';ctx.fillRect(px+2,py+15,12,2);ctx.fillStyle='#ff8a5a';ctx.fillRect(px+2.5,py+15.5,11*f,1);}
// Con estrellas inestables, la barra cuenta qué parte de los edificios está cerca de un blindaje solar que cubre (no recalentado).
function novaRow(p){const HT=novaShields(),bs=[];obj.forEach((o,i)=>{if(o&&BUILD[o.t])bs.push(i);});
  const cov=HT.length?bs.filter(i=>jammed(HT,i%MW,(i/MW)|0)).length:0,n=novas.filter(novaOut).length,nb=bs.filter(i=>obj[i].bug).length,nh=bs.filter(i=>obj[i].heat>0).length,
    on=HT.length>0||nh>0||n>0||nb>0||st.time>=NOVA_START;$(p==='g'?'gridRow':'smogRow').hidden=!on;if(!on)return;const f=bs.length?cov/bs.length*100:0;
  $(p+'Fill').style.width=f+'%';$(p+'Fill').classList.toggle('hi',n>0||nb>0);$(p+'Num').textContent=Math.round(f)+'%';
  $(p+'Meta').textContent=n?(n===1?'1 estrella inestable':n+' estrellas inestables')+(nb?' · '+nb+(nb===1?' roto':' rotos'):''):nb?nb+(nb===1?' roto':' rotos'):nh?nh+(nh===1?' recalentado':' recalentados'):HT.length?'cielo en calma':'sin '+ERA.defense.label.toLowerCase();}
amenaza({on:'novas',
  reset(){novas=[];novaBooms=[];novaScars=[];},
  tick:novaTick,
  update:updateNovas,
  targets(add){for(const n of novas)if(novaOut(n))add(n.x,n.y,n.x,n.y);},
  drawUnder:drawNovaUnder,
  // La fogata y el taller rotos (el motor no les pasa drawBug), los blindajes recalentados y la estrella, arriba de la gente.
  drawOver(){for(let i=0;i<obj.length;i++){const o=obj[i];if(!o)continue;if(o.bug&&(o.t==='fogata'||o.t==='herreria'))novaScorch(i%MW*T,((i/MW)|0)*T);else if(o.heat>0)novaHot(o,i%MW*T,((i/MW)|0)*T);}drawNovas();},
  drawTop:drawNovaTop,
  drawBug:novaScorch,
  lights(L){for(const n of novas){if(n.state==='out')continue;if(n.state==='fall'){const p=novaFallPos(n);L.push([p.x*T+8,p.y*T+6,1.6,0.9]);}else L.push([n.x*T+8,n.y*T+6,2.4,0.95]);}
    for(const b of novaBooms)if(b.t<0.8)L.push([b.x*T+8,b.y*T+8,NOVA_R+1.5,1]);},
  arrows:()=>novas.filter(novaOut).map(n=>({x:n.x,y:n.y})),
  hint(){const n=novas.filter(n=>n.state==='on').length;
    if(n)return['¡Estrella inestable!',n===1?'Cuando la cuenta llegue a 0, explota y rompe lo que tiene cerca: tocala para apagarla.':'Hay '+n+' contando: cuando lleguen a 0, explotan y rompen lo que tienen cerca. Tocalas.'];
    const nb=obj.filter(o=>o&&o.bug&&BUILD[o.t]).length;if(nb)return['Rotos por una explosión:',nb+(nb===1?' edificio no produce: tocalo para arreglarlo.':' edificios no producen: tocalos para arreglarlos.')];
    return null;},
  row:novaRow,
  // La estrella se toca donde está (o cerca, mientras cae); un edificio roto, encima.
  // Un artificiero (quiet) la desarma de a poco: la toca cada ~0,3 s mientras está al lado y la apaga cuando trabajó NOVA_DEFUSE.
  tap(tx,ty){let hit=null,bd=NOVA_HIT;for(const n of novas){if(!novaOut(n))continue;const d=Math.hypot(n.x-tx,n.y-ty);if(d<=bd){bd=d;hit=n;}}
    if(hit&&quiet){hit.wk=(hit.wk||0)+Math.min(0.5,st.time-(hit.wt==null?st.time-0.3:hit.wt));hit.wt=st.time;
      if(!hit.told){hit.told=true;float(hit.x,hit.y-1.4,'¡desarmando!','#7fe8ff');}if(hit.wk<NOVA_DEFUSE)return false;}
    if(hit){novaOff(hit,'¡apagada!');st.res.ideas+=2*IX;float(hit.x,hit.y-1.6,ideaTxt(2),RCOL.ideas);toast('¡Estrella apagada!');return true;}
    if(!inb(tx,ty))return false;const i=ty*MW+tx,o=obj[i];
    if(o&&o.bug&&BUILD[o.t]){novaFix(i,'¡arreglado!');zaps.push({x:tx,y:ty,t:0.4});toast('¡Arreglado! '+nameOf(o)+' vuelve a producir.');save();return 'b';}
    return false;},
  prueba(){spawnNovas();},
  debug:{novas:()=>novas,spawnNovas:()=>spawnNovas(),novaEvery:()=>novaEvery(),novaArt:(s,f)=>novaArt(s,f)},
  // Artificiero: traje acolchado con costuras y hombreras, cuello grueso, casco redondo con visor y una pinza larga en la mano.
  guardia:{kind:'artificiero',pal:{c:'#6e7d45',C:'#4c5930',j:'#39421f'},draw(a,K){const OL=P4('#3e4826','#566236','#6e7d45','#8e9c62'),SEAM=hx('#3e4826'),VIS=P4('#3a6a80','#6aaccc','#a8dcec','#e8f8ff');
      for(const y of[36,41,47])for(let x=14;x<52;x++){const v=a.get(x,y);if(v===OL[2]||v===hx('#4c5930'))a.set(x,y,SEAM);}
      for(let y=31;y<50;y++){const v=a.get(32,y);if(v===OL[2]||v===hx('#4c5930'))a.set(32,y,SEAM);}
      for(const x of[16,48])ell(a,x,32,6,4.5,(i,j)=>j<-1?OL[3]:i>2?OL[1]:OL[2]);ell(a,32,29,14,4,(i,j)=>j<0?OL[2]:OL[1]);
      ell(a,32,15,16,15,(i,j)=>j>9?null:i<-7&&j<-5?OL[3]:i>8?OL[1]:OL[2]);rect(a,17,22,30,3,OL[0]);
      rect(a,20,12,24,11,OL[0]);rect(a,21,13,22,9,(VIS[2]));rect(a,21,13,22,2,VIS[3]);rect(a,21,20,22,2,VIS[1]);line(a,24,21,31,13,VIS[3],1);
      rect(a,26,16,3,3,hx('#1b1a24'));rect(a,35,16,3,3,hx('#1b1a24'));rect(a,30,0,4,3,OL[1]);
      line(a,47,46,57,24,hx('#5d6270'),2);line(a,50,47,60,25,hx('#5d6270'),2);line(a,48,45,57,25,hx('#c3c7cf'),1);line(a,51,46,60,26,hx('#c3c7cf'),1);
      poly(a,[[55,25],[58,18],[60,19],[58,26]],hx('#8a8f9c'));poly(a,[[59,26],[63,20],[64,22],[61,27]],hx('#8a8f9c'));rect(a,46,44,7,4,hx('#c8413b'));}}});
