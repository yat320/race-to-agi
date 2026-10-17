// Edificios que se recorren por dentro (octubre de 2026, Juani: un juego aparte de la IA con "más interacción con los
// edificios, tal vez poder entrar y recorrerlos"; eligió probar primero un edificio por dentro, con máquinas para mejorar,
// gente con tareas, problemas adentro y secretos). Se prende con `interiores:{edificio:{...}}` en la era (la etapa 1 de la
// carrera de la IA, src/ia/etapa1.js, con el centro de datos).
// Tocás el edificio y tu personaje camina hasta la puerta y entra: la pantalla pasa a un mapa chico del interior (la escena:
// el motor deja de dibujar el mundo y de mover al jugador afuera, pero el resto sigue andando). Adentro caminás tocando y,
// pegado a algo, lo usás:
// - Racks de GPUs (INT_SLOTS lugares): se instalan y se mejoran hasta el nivel 3; cada nivel suma lo de un tercio de centro de
//   datos más (`extra`, que el motor suma a lo que produce el edificio).
// - Escritorios: sentás a un aldeano a investigar (deja de juntar afuera y se lo ve adentro) y suma INT_DESK.
// - La pizarra elige el foco: investigar (lo de adentro da ideas) o producto (da monedas).
// - Problemas: un rack se recalienta cada tanto (deja de sumar hasta que lo arreglás tocándolo, también si estás afuera:
//   la pista avisa) y a veces entra un bicho que corre por el piso.
// - Un secreto: las cajas viejas del rincón se abren con INT_BOX golpes y traen un prototipo viejo (ideas y un rack gratis).
// - Otro plano (`plano:'lab'`, el laboratorio de IA): mesas de experimentos en vez de racks. Se elige prudente (más lento y
//   casi seguro) o ambicioso (rápido, da más y a veces sale mal); cuando termina hay que ir a ver qué salió. Si sale mal, se
//   escapa un modelo desalineado que corre por el piso: tocalo antes de que se meta en la red. Las cajas traen una mesa más.
// - Espías (etapa 2, con `spies` en la era): el que llega a un edificio recorrible no copia desde afuera sino que se mete
//   (gancho `spyIn` del motor), camina hasta un rack y copia los planos INT_SPY segundos. Afuera no se ve ni se toca: el
//   edificio late en rojo y la pista avisa. Entrás y lo tocás para atraparlo; si termina, sale con los planos y vuelve a su
//   laboratorio como los de afuera (todavía se lo puede tocar para recuperarlos). Los espías no se guardan.
// Se guarda con la partida (`interior`, por casillero del edificio).
const INT_W=11,INT_H=10,INT_SLOTS=4,INT_DESKS=2,INT_DESK=0.4,INT_BOX=3,INT_HOT_EVERY=75,INT_BUG_EVERY=50;
const INT_RACK=[0,0.3,0.6,1],INT_SPY=20;
// Con el foco en seguridad (solo en una era con rival, la etapa 2), cada edificio de lo de adentro suma INT_SAFE puntos de
// seguridad por segundo: un rack al máximo, 1,2% por minuto (un laboratorio de seguridad da 3%).
const INT_SAFE=0.02;
// Lo de adentro: paredes (W), puerta (D), racks (0-4), escritorios (a, b) con su silla abajo, pizarra (P), cajas (C) y, en el
// laboratorio, mesas de experimentos (e-h; la h la traen las cajas). La puerta va en el mismo lugar en todos.
const INT_MAPS={datos:['WWWWWWWWWWW','WP........W','W.0.1.2.3.W','W.........W','W.........W','W.a.b....4W','W.........W','W........CW','W.........W','WWWWWDWWWWW'],
  lab:['WWWWWWWWWWW','W.........W','W.e..f..g.W','W.........W','W.........W','W.a.b....hW','W.........W','W........CW','W.........W','WWWWWDWWWWW']};
// Experimentos: cuánto tardan, cuánto cuestan, cuántas ideas dan (en la unidad de la Antigüedad) y la chance de que salga mal.
const INT_EXP={1:{n:'Prudente',t:60,c:{monedas:15},i:6,risk:0.1},2:{n:'Ambicioso',t:30,c:{monedas:30},i:10,risk:0.4}},INT_ROGUE=15,INT_LABDESK=0.5;
let INT_MAP=INT_MAPS.datos;
let intXp=0,intCool=0,intSpyN=0,intChose=false,intIn=null,intP=null,intState={},intGo=null,intGoT=0,intAct=null,intBug=null,intHotT=0,intBugT=0,intSeen=false;
const intDef=t=>ERA.interiores&&ERA.interiores[t];
const intPlan=i=>{const d=obj[i]&&intDef(obj[i].t);return INT_MAPS[d&&d.plano]||INT_MAPS.datos;};
const intBench=c=>'efgh'.indexOf(c);
// "un centro de datos", "al centro de datos", "el centro de datos"; uno femenino lo dice la era (`un`, `al`, `el`).
const intUn=d=>d.un||'un '+d.name.toLowerCase(),intAl=d=>d.al||'al '+d.name.toLowerCase(),intEl=d=>d.el||'el '+d.name.toLowerCase();
const intCell=(x,y,M)=>x<0||y<0||x>=INT_W||y>=INT_H?'W':(M||INT_MAP)[y][x];
const intWalk=(x,y,M)=>{const c=intCell(x,y,M);return c==='.'||c==='D';};
function intFind(ch,M){M=M||INT_MAP;for(let y=0;y<INT_H;y++)for(let x=0;x<INT_W;x++)if(M[y][x]===ch)return[x,y];return null;}
const INT_DOOR=intFind('D');
function intGet(i){if(!intState[i])intState[i]={r:[0,0,0,0,0],hot:[0,0,0,0,0],d:0,f:'ideas',box:0,five:0,e:[0,0,0,0],m:[0,0,0,0]};return intState[i];}
const intRackCost=lv=>[{piedra:20,[ORE]:8},{[ORE]:15,monedas:15},{[ORE]:25,monedas:30}][lv];
const intTxt=c=>Object.entries(c).map(([k,v])=>fmt(v)+' '+RN[k].toLowerCase()).join(', ');
// Cuánto suma un edificio por dentro, en edificios de su tipo (racks andando y gente en los escritorios).
function intBonus(s){let b=0;for(let k=0;k<INT_SLOTS+1;k++)if(s.r[k]&&!s.hot[k])b+=INT_RACK[s.r[k]];return b+s.d*INT_DESK;}
// Los aldeanos sentados a investigar: los marca `held` (el motor no los mueve) y `inside` (no se dibujan afuera).
const intSeated=i=>vil.filter(v=>v.held==='interior'&&v.desk===i);
function intSit(i,quietly){const s=intGet(i),bx=i%MW,by=(i/MW)|0;
  const v=vil.filter(v=>!v.bot&&!v.bad&&!v.held&&!v.away&&!v.abd&&!v.orb&&v.job==null&&v.post==null&&!v.carry).sort((a,b)=>Math.hypot(a.x-bx,a.y-by)-Math.hypot(b.x-bx,b.y-by))[0];
  if(!v){if(!quietly)toast('No hay nadie libre: hacé otra casa.');return false;}
  v.held='interior';v.desk=i;v.inside=true;v.state='idle';v.path=[];v.target=null;v.x=bx;v.y=by;return true;}
function intStand(i){const v=intSeated(i).pop();if(!v)return;v.held=null;v.desk=null;v.inside=false;v.state='idle';v.t=0.3;
  const sp=DIRS8.map(([dx,dy])=>[(i%MW)+dx,((i/MW)|0)+dy]).find(([x,y])=>passable(x,y));if(sp){v.x=sp[0];v.y=sp[1];}}
// keepNav: entra sobre la entrada del historial del cartel que se acaba de cerrar (cerrar con un paso atrás y entrar con uno
// adelante se cruzaban, y al salir se volvía una página de más: se salía del juego).
function intEnter(i,keepNav){intIn=i;INT_MAP=intPlan(i);intP={x:INT_DOOR[0],y:INT_DOOR[1]-1,path:[],face:1,moving:false};intAct=null;intSeen=true;if(!keepNav)navPush();
  const d=intDef(obj[i].t);toast(d.name+': tocá algo para ir; pegado, lo usás. La puerta te saca.');}
function intExit(fromBack){if(intIn==null)return;if(intBug&&intBug.rogue)toast('El modelo desalineado se escapó a la red.');intIn=null;intAct=null;intBug=null;if(!fromBack)navPop();save();}
// Caminar adentro: BFS en el mapa chico hasta el casillero o hasta al lado de lo que tocaste.
function intPath(sx,sy,goal,M){const k=(x,y)=>y*INT_W+x,prev=new Map([[k(sx,sy),null]]),q=[[sx,sy]];
  while(q.length){const[x,y]=q.shift();if(goal(x,y)){const p=[];let c=k(x,y);while(c!==k(sx,sy)){p.unshift([c%INT_W,(c/INT_W)|0]);c=prev.get(c);}return p;}
    for(const[dx,dy]of DIRS8){const nx=x+dx,ny=y+dy;if(!intWalk(nx,ny,M)||prev.has(k(nx,ny)))continue;if(dx&&dy&&(!intWalk(x+dx,y,M)||!intWalk(x,y+dy,M)))continue;prev.set(k(nx,ny),k(x,y));q.push([nx,ny]);}}
  return null;}
// Caminar adentro: como stepEnt del motor, pero mirando el mapa de adentro (stepEnt mira el de afuera, y en las mismas
// coordenadas, la esquina del mapa, hay agua: el personaje se frenaba de golpe y no llegaba a los racks).
function intStep(e,dt,spd,M){e.moving=false;let move=spd*dt;
  while(move>0&&e.path.length){const[tx,ty]=e.path[0];if(!intWalk(tx,ty,M)){e.path.length=0;break;}
    const dx=tx-e.x,dy=ty-e.y,dist=Math.hypot(dx,dy);if(Math.abs(dx)>0.01)e.face=dx>0?1:-1;
    if(dist<=move){e.x=tx;e.y=ty;e.path.shift();move-=dist;}else{e.x+=dx/dist*move;e.y+=dy/dist*move;move=0;}e.moving=true;}}
const intNear=(x,y,tx,ty)=>Math.max(Math.abs(x-tx),Math.abs(y-ty))<=1;
// Los espías que están adentro del edificio i (o de cualquiera, sin i).
const intSpies=i=>spies.filter(s=>s.inside&&!s.dead&&(i==null||s.target===i));
const intSpyAt=(i,x,y)=>intSpies(i).find(s=>Math.hypot(s.ip.x-x,s.ip.y-y)<=1.2);
// Usar lo que hay en (tx,ty), ya pegado.
function intUse(tx,ty){const i=intIn,s=intGet(i),c=intCell(tx,ty),def=intDef(obj[i].t);
  {const sp=intSpyAt(i,tx,ty);if(sp){sp.dead=true;intSpyN++;st.res.ideas+=2*IX;floatIn(sp.ip.x,sp.ip.y,ideaTxt(2),RCOL.ideas);toast('¡Espía atrapado! No se llevó nada.');return;}}
  if(intBug&&Math.round(intBug.x)===tx&&Math.round(intBug.y)===ty){const r=intBug.rogue,n=r?Math.ceil(intBug.i/2):3;intBug=null;st.res.ideas+=n*IX;floatIn(tx,ty,ideaTxt(n),RCOL.ideas);toast(r?'¡Modelo corregido! Algo aprendiste del error.':'¡Bicho aplastado!');return;}
  const bk=intBench(c);if(bk>=0){intUseBench(i,s,bk,tx,ty,def);return;}
  if(/[0-4]/.test(c)){const k=+c;if(k===4&&!s.five){toast('Un rincón vacío. Algo habrá en las cajas…');return;}
    if(s.hot[k]){s.hot[k]=0;intCool++;st.res.ideas+=2*IX;floatIn(tx,ty,'¡enfriado!','#5fe3d0');toast('Rack enfriado: vuelve a sumar.');save();return;}
    const lv=s.r[k];if(lv>=3){toast('Rack al máximo: suma '+Math.round(INT_RACK[3]*100)+'% de '+intUn(def)+'.');return;}
    const cost=intRackCost(lv),title=lv?'Rack de GPUs: nivel '+lv+' → '+(lv+1):'Rack de GPUs';
    showModal('<div class="kicker">'+def.name+'</div><h2>'+title+'</h2><p>+'+Math.round(INT_RACK[lv]*100)+'% → +'+Math.round(INT_RACK[lv+1]*100)+'% de lo que da '+intUn(def)+'.</p><p class="muted">Cuesta '+intTxt(cost)+'. Se puede recalentar: entrá a enfriarlo.</p>'+
      '<div class="row"><button class="btn" id="intOk"'+(afford(cost)?'':' disabled')+'>'+(lv?'Mejorar':'Instalar')+'</button><button class="btn ghost" id="intNo">Cerrar</button></div>');
    $('intOk').onclick=()=>{if(!afford(cost))return;pay(cost);s.r[k]=lv+1;floatIn(tx,ty,lv?'¡nivel '+(lv+1)+'!':'¡instalado!','#93d36c');hideModal();save();};$('intNo').onclick=()=>hideModal();return;}
  if(c==='a'||c==='b'){const k=c==='a'?0:1,on=k<s.d,lab=INT_MAP===INT_MAPS.lab,what=lab?'los experimentos van '+Math.round(INT_LABDESK*100)+'% más rápido':'suma +'+Math.round(INT_DESK*100)+'% de '+intUn(def);
    showModal('<div class="kicker">'+def.name+'</div><h2>Escritorio</h2><p>'+(on?'Acá investiga alguien de tu gente: '+what+'. No junta afuera.':'Sentá a alguien a investigar: '+what+'. Deja de juntar afuera.')+'</p>'+
      '<div class="row"><button class="btn" id="intOk">'+(on?'Que vuelva afuera':'Sentar a alguien')+'</button><button class="btn ghost" id="intNo">Cerrar</button></div>');
    $('intOk').onclick=()=>{if(on){intStand(i);s.d--;}else if(intSit(i)){s.d++;floatIn(tx,ty+1,'¡a investigar!','#93d36c');}hideModal();save();};$('intNo').onclick=()=>hideModal();return;}
  if(c==='P'){showModal('<div class="kicker">'+def.name+'</div><h2>La pizarra</h2><p>¿En qué trabaja lo de adentro?</p><div class="row" style="flex-direction:column;align-items:stretch">'+
      '<button class="btn'+(s.f==='ideas'?'':' ghost')+'" id="intF1">Investigar: da ideas</button><button class="btn'+(s.f==='monedas'?'':' ghost')+'" id="intF2">Producto: da monedas</button>'+
      (ERA.rival?'<button class="btn'+(s.f==='seguridad'?'':' ghost')+'" id="intF3">Seguridad: sube la seguridad, no da ideas</button>':'')+'<button class="btn ghost" id="intNo">Cerrar</button></div>');
    const set=f=>{s.f=f;hideModal();toast(f==='ideas'?'Lo de adentro investiga: da ideas.':f==='monedas'?'Lo de adentro hace producto: da monedas.':'Lo de adentro trabaja en seguridad: más lento, pero más seguro.');save();};$('intF1').onclick=()=>set('ideas');$('intF2').onclick=()=>set('monedas');if($('intF3'))$('intF3').onclick=()=>set('seguridad');$('intNo').onclick=()=>hideModal();return;}
  if(c==='C'){if(s.box>=INT_BOX){toast('Las cajas ya están vacías.');return;}s.box++;zaps.push({x:tx,y:ty,t:0.3});
    if(s.box<INT_BOX){floatIn(tx,ty,'¡crac!','#e8c05a');toast('Cajas viejas llenas de polvo. '+(INT_BOX-s.box===1?'Un golpe más.':'Faltan '+(INT_BOX-s.box)+' golpes.'));return;}
    s.five=1;st.res.ideas+=40*IX;floatIn(tx,ty,ideaTxt(40),RCOL.ideas);
    if(INT_MAP===INT_MAPS.lab)toast('¡Un cuaderno con notas viejas! '+fmt(40*IX)+' ideas y una mesa de experimentos más en el rincón.');
    else{s.r[4]=1;toast('¡Un prototipo viejo! '+fmt(40*IX)+' ideas y un rack de GPUs gratis en el rincón.');}save();return;}
  if(c==='D'){intExit();return;}}
// Una mesa de experimentos: elegir uno, ver cuánto falta o ver qué salió.
function intUseBench(i,s,k,tx,ty,def){if(k===3&&!s.five){toast('Un rincón vacío. Algo habrá en las cajas…');return;}
  const m=s.m[k];if(m&&s.e[k]>0){toast('Experimento '+INT_EXP[m].n.toLowerCase()+': faltan '+Math.ceil(s.e[k])+' s.');return;}
  if(m){const X=INT_EXP[m];s.m[k]=0;s.e[k]=0;
    if(Math.random()<X.risk){intBug={x:tx,y:ty+1,t:INT_ROGUE,rogue:true,i:X.i};floatIn(tx,ty,'¡salió mal!','#e8654d');toast('¡Salió mal! Se escapó un modelo desalineado: tocalo antes de que se meta en la red.');save();return;}
    intXp++;st.res.ideas+=X.i*IX;floatIn(tx,ty,ideaTxt(X.i),RCOL.ideas);toast('¡Salió bien! El modelo nuevo da '+fmt(X.i*IX)+' ideas.');save();return;}
  const opt=n=>{const X=INT_EXP[n];return'<button class="btn'+(n===1?'':' ghost')+'" id="intX'+n+'"'+(afford(X.c)?'':' disabled')+'>'+X.n+': '+X.t+' s, +'+fmt(X.i*IX)+' ideas'+(X.risk>0.2?', puede salir mal':'')+' ('+intTxt(X.c)+')</button>';};
  showModal('<div class="kicker">'+def.name+'</div><h2>Mesa de experimentos</h2><p>Entrená un modelo. Cuando termine, vení a ver qué salió.</p><div class="row" style="flex-direction:column;align-items:stretch">'+opt(1)+opt(2)+'<button class="btn ghost" id="intNo">Cerrar</button></div>');
  const go=n=>{const X=INT_EXP[n];if(!afford(X.c))return;pay(X.c);s.m[k]=n;s.e[k]=X.t;floatIn(tx,ty,'¡a entrenar!','#93d36c');hideModal();save();};
  $('intX1').onclick=()=>go(1);$('intX2').onclick=()=>go(2);$('intNo').onclick=()=>hideModal();}
function intDrawBench(px,py,S,k,t){const c=ctx,m=S.m[k],run=m&&S.e[k]>0,done=m&&!run;
  c.fillStyle='#5a6478';c.fillRect(px,py+3,T,8);c.fillStyle='#7a869c';c.fillRect(px,py+3,T,2);c.fillStyle='#3a4258';c.fillRect(px+1,py+11,2,4);c.fillRect(px+13,py+11,2,4);
  if(!m){c.strokeStyle='rgba(42,48,64,0.6)';c.setLineDash([2,2]);c.strokeRect(px+4.5,py-5.5,7,8);c.setLineDash([]);c.fillStyle='rgba(42,48,64,0.6)';c.fillRect(px+7,py-4,2,6);c.fillRect(px+5,py-2,6,2);return;}
  // Un frasco con líquido: celeste el prudente, violeta el ambicioso; burbujea mientras entrena.
  c.fillStyle='#d8e4f0';c.fillRect(px+5,py-6,6,9);c.fillStyle=m===1?'#5fe3d0':'#b06ad8';c.fillRect(px+6,py-2,4,4);
  if(run){for(let b=0;b<2;b++)c.fillRect(px+6+b*2,py-3-((t*6+b*3)%5),1,1);const f=1-S.e[k]/INT_EXP[m].t;c.fillStyle='#1b1a24';c.fillRect(px+1,py-10,14,3);c.fillStyle='#93d36c';c.fillRect(px+2,py-9,12*f,1);}
  if(done){c.fillStyle='#ffd35a';c.font='600 8px "Pixelify Sans", monospace';c.textAlign='center';c.fillText('!',px+8,py-8+Math.sin(t*5)*1.5);}}
// Números que suben adentro: en coordenadas del interior.
let intFloats=[];
function floatIn(x,y,txt,col){intFloats.push({x:x*T+8,y:y*T,txt,col,t:1.2});}
// El dibujo: a escala para que entre entre el HUD y la barra, centrado.
function intView(){const av=H-hudH-barH,s=Math.min(W/(INT_W*T),av/((INT_H+2)*T)),ox=(W-INT_W*T*s)/2,oy=hudH+(av-(INT_H+2)*T*s)/2;return{s,ox,oy};}
function intDrawRack(px,py,lv,hot,t){const c=ctx;c.fillStyle='#1d2230';c.fillRect(px+2,py-6,12,21);c.fillStyle='#2e3648';c.fillRect(px+3,py-5,10,19);
  for(let k=0;k<6;k++){const on=lv&&!hot&&((Math.floor(t*6)+k*3)%5)>0;c.fillStyle=k<lv*2?(on?'#5fe3d0':'#2a5a58'):'#3a4258';c.fillRect(px+5,py-3+k*3,6,1);c.fillStyle=on?'#93d36c':'#404a60';c.fillRect(px+12,py-3+k*3,1,1);}
  if(hot){c.fillStyle='rgba(232,101,77,'+(0.5+0.3*Math.sin(t*10))+')';c.fillRect(px+2,py-6,12,21);c.fillStyle='rgba(200,200,200,0.6)';for(let k=0;k<3;k++)c.fillRect(px+4+k*3,py-9-((t*8+k*4)%8),2,2);}}
function intDrawBug(px,py,t){const c=ctx;c.fillStyle='#1b1a24';c.fillRect(px+5,py+6,6,4);c.fillStyle='#7a3a8a';c.fillRect(px+6,py+6,4,3);c.fillStyle='#1b1a24';
  for(let k=0;k<3;k++){const w=Math.sin(t*20+k)>0?1:0;c.fillRect(px+4,py+6+k,1,1+w);c.fillRect(px+11,py+6+k,1,1+w);}}
// Un toque adentro (en píxeles de la pantalla): ir hasta ahí, o hasta al lado de lo que tocaste y usarlo.
function intSceneTap(px,py){const{s,ox,oy}=intView(),tx=Math.floor((px-ox)/s/T),ty=Math.floor((py-oy)/s/T);
    if(ty>=INT_H&&Math.abs(tx-INT_DOOR[0])<=1){intExit();return;}
    if(tx<0||ty<0||tx>=INT_W||ty>=INT_H)return;
    const[sx,sy]=[Math.round(intP.x),Math.round(intP.y)];
    const sp=intSpyAt(intIn,tx,ty),bugHit=sp||intBug&&Math.hypot(intBug.x-tx,intBug.y-ty)<=1.2,who=sp?sp.ip:intBug;const gx=bugHit?Math.round(who.x):tx,gy=bugHit?Math.round(who.y):ty;
    if(intWalk(gx,gy)&&!bugHit&&INT_MAP[gy][gx]!=='D'){const p=intPath(sx,sy,(x,y)=>x===gx&&y===gy);if(p)intP.path=p;intAct=null;return;}
    if(intNear(sx,sy,gx,gy)){intP.path=[];if(gx!==sx)intP.face=gx>sx?1:-1;intUse(gx,gy);return;}
    const p=intPath(sx,sy,(x,y)=>intNear(x,y,gx,gy)&&!(x===gx&&y===gy));if(p){intP.path=p;intAct=[gx,gy];}}
// Un toque afuera sobre un edificio recorrible: ir hasta la puerta y entrar (o elegir, si vino de la etapa anterior).
function intTap(tx,ty){if(quiet||!inb(tx,ty))return false;const i=ty*MW+tx,o=obj[i];if(!o||!intDef(o.t)||o.bug)return false;
    // Uno que vino de la etapa anterior rinde la mitad hasta modernizarlo: se elige entre entrar y modernizarlo.
    if(isOld(o)&&!intChose){const d=intDef(o.t),b=BUILD[o.t],c=modernCost(b);
      showModal('<div class="kicker">'+d.name+'</div><h2>Vino de la etapa anterior</h2><p>Rinde la mitad hasta que la modernizás. Lo de adentro sigue igual.</p><p class="muted">Modernizarla cuesta '+intTxt(c)+'.</p>'+
        '<div class="row" style="flex-direction:column;align-items:stretch"><button class="btn" id="intIn">Entrar</button><button class="btn ghost" id="intMod"'+(canModern(o)?'':' disabled')+'>Modernizar</button><button class="btn ghost" id="intNo">Cerrar</button></div>');
      $('intIn').onclick=()=>{intChose=true;try{intTap(tx,ty);}finally{intChose=false;}};$('intMod').onclick=()=>{hideModal();modernize(i);};$('intNo').onclick=()=>hideModal();return'vida';}
    // Si venía del cartel de elegir, se cierra sin tocar el historial y se entra sobre esa misma entrada.
    const fromCard=intChose&&!$('modal').hidden;if(fromCard)hideModal(true);
    const[px,py]=tileOf(P);if(Math.max(Math.abs(px-tx),Math.abs(py-ty))<=1){P.path=[];intEnter(i,fromCard);return'vida';}
    if(fromCard)navPop();
    P.task=null;P.act=null;const p=pathAdj(px,py,tx,ty);if(!p){toast('No llegás hasta ahí.');return'vida';}P.path=p;intGo=i;intGoT=30;marker={x:tx,y:ty,t:0.6};return'vida';}
amenaza({on:'interiores',
  reset(){intXp=0;intCool=0;intSpyN=0;intIn=null;intGo=null;intAct=null;intBug=null;intFloats=[];intState={};for(const v of vil)if(v.held==='interior'){v.held=null;v.inside=false;v.desk=null;}},
  // Una etapa que arranca con la ciudad de la anterior (ERA.legacy.key) se trae lo de adentro de los edificios que siguen siendo
  // recorribles (los centros de datos pasan a supercomputadoras en el mismo casillero): racks, foco, cajas y gente sentada.
  fresh(){let d=null;try{d=JSON.parse(localStorage.getItem(ERA.legacy.key));}catch(e){}const e=d&&d.won&&d.interior;if(!e||!e.s)return;
    this.load({interior:{s:e.s,seen:e.seen}});for(const i in intState)for(let k=0;k<5;k++)intState[i].hot[k]=0;},
  save(){const o={};for(const i in intState){const s=intState[i];if(obj[i]&&intDef(obj[i].t))o[i]=[s.r.join(''),s.hot.join(''),s.d,s.f==='monedas'?1:s.f==='seguridad'?2:0,s.box,s.five,s.e.map(Math.ceil).join(','),s.m.join('')];}return{interior:{s:o,seen:intSeen?1:0,xp:intXp,cool:intCool,spy:intSpyN}};},
  load(d){const e=d&&d.interior;intSeen=!!(e&&e.seen);intXp=(e&&e.xp)|0;intCool=(e&&e.cool)|0;intSpyN=(e&&e.spy)|0;if(!e||!e.s)return;
    for(const i in e.s){const a=e.s[i];if(!obj[i]||!intDef(obj[i].t)||!Array.isArray(a))continue;const s=intGet(+i);
      s.r=String(a[0]).split('').map(Number).slice(0,5);s.hot=String(a[1]).split('').map(Number).slice(0,5);while(s.r.length<5)s.r.push(0);while(s.hot.length<5)s.hot.push(0);
      s.f=a[3]===2&&ERA.rival?'seguridad':a[3]===1?'monedas':'ideas';s.box=a[4]|0;s.five=a[5]|0;
      if(a[6]!=null){const e=String(a[6]).split(',').map(Number),m=String(a[7]||'').split('').map(Number);for(let k=0;k<4;k++){s.e[k]=e[k]>0?e[k]:0;s.m[k]=INT_EXP[m[k]]?m[k]:0;}}const want=Math.min(INT_DESKS,a[2]|0);s.d=0;for(let k=0;k<want;k++)if(intSit(+i,true))s.d++;}},
  // Lo de adentro suma edificios enteros a lo que produce (con el foco en ideas); con el foco en producto da monedas aparte.
  extra(id){let b=0;for(const i in intState){const o=obj[i];if(o&&o.t===id&&!o.bug&&intState[i].f==='ideas')b+=intBonus(intState[i]);}return b;},
  // Un espía que llega a un edificio recorrible se mete: entra por la puerta y va a un rack al azar.
  spyIn(s){const o=obj[s.target];if(!o||!intDef(o.t))return false;const M=intPlan(s.target),spots=[...'0123efg'].map(c=>intFind(c,M)).filter(Boolean),r=spots[Math.floor(Math.random()*spots.length)],[dx,dy]=INT_DOOR;
    const ip={x:dx,y:dy-1,path:[],face:1,moving:false};ip.path=intPath(dx,dy-1,(x,y)=>x===r[0]&&y===r[1]+1,M)||[];s.ip=ip;s.it=0;
    if(!quiet&&!intSpies().length)toast('¡Un espía entró '+intAl(intDef(o.t))+'! Entrá y tocalo antes de que copie tus planos.');return true;},
  arrows(){return intIn!=null?[]:intSpies().map(s=>({x:s.target%MW,y:(s.target/MW)|0}));},
  // Metas de los capítulos: racks instalados, gente sentada adentro, experimentos que salieron bien, racks enfriados y espías
  // atrapados adentro.
  goal(m){const S=Object.keys(intState).filter(i=>obj[i]&&intDef(obj[i].t)).map(i=>intState[i]);
    if(m.t==='rack')return S.reduce((t,s)=>t+s.r.filter(Boolean).length,0);
    if(m.t==='rackLv')return S.reduce((t,s)=>t+s.r.reduce((a,l)=>a+Math.max(0,l-1),0),0);
    if(m.t==='desk')return S.reduce((t,s)=>t+s.d,0);
    if(m.t==='exp')return intXp;
    if(m.t==='cool')return intCool;
    if(m.t==='spy')return intSpyN;
    return null;},
  scene(){return intIn!=null;},
  sceneBack(){intExit(true);},
  tick(step){
    // Cada tanto se recalienta un rack que anda (en cualquier centro de datos), y entra un bicho al que estás recorriendo.
    const racks=[];for(const i in intState){const s=intState[i];if(!obj[i]||!intDef(obj[i].t))continue;s.r.forEach((lv,k)=>{if(lv&&!s.hot[k])racks.push([s,k,+i]);});}
    intHotT+=step;if(racks.length&&intHotT>=INT_HOT_EVERY){intHotT=Math.random()*20;const[s,k,bi]=racks[Math.floor(Math.random()*racks.length)];s.hot[k]=1;
      if(!quiet)toast('¡Se recalentó un rack de GPUs! Entrá '+intAl(intDef(obj[bi].t))+' a enfriarlo.');}
    if(intIn!=null&&!intBug){intBugT+=step;if(intBugT>=INT_BUG_EVERY){intBugT=0;intBug={x:1+Math.floor(Math.random()*(INT_W-2)),y:3,t:12};}}
    if(intBug){intBug.t-=step;if(intBug.t<=0){const r=intBug.rogue;intBug=null;if(intIn!=null)toast(r?'El modelo desalineado se escapó a la red.':'El bicho se metió en una máquina y se fue.');}}
    // Los experimentos avanzan aunque no estés adentro; al terminar, hay que ir a ver qué salió.
    for(const i in intState){const S=intState[i];if(!obj[i]||!intDef(obj[i].t))continue;const sp=1+INT_LABDESK*S.d;for(let k=0;k<4;k++)if(S.m[k]&&S.e[k]>0){S.e[k]-=step*sp;if(S.e[k]<=0){S.e[k]=0;if(!quiet&&intIn!=+i)toast('¡Terminó un experimento! Entrá '+intAl(intDef(obj[i].t))+' a ver qué salió.');}}}
    // Con el foco en producto, lo de adentro da monedas en vez de ideas.
    for(const i in intState){const o=obj[i],s=intState[i];if(!o||!intDef(o.t)||o.bug)continue;if(s.f==='monedas')add('monedas',intBonus(s)*0.18*step);
      else if(s.f==='seguridad'&&ERA.rival&&!st.won&&!st.lost)st.safety=Math.min(100,st.safety+intBonus(s)*INT_SAFE*step);}},
  update(dt){
    // Afuera: caminar hasta la puerta del edificio que tocaste, y entrar.
    if(intGo!=null&&intIn==null){intGoT-=dt;const i=intGo,x=i%MW,y=(i/MW)|0;
      if(!obj[i]||intGoT<=0||P.task||P.act){intGo=null;}
      else if(Math.max(Math.abs(P.x-x),Math.abs(P.y-y))<=1.2&&!P.path.length){intGo=null;intEnter(i);}
      else if(!P.path.length)intGo=null;}
    // Los espías adentro: caminan hasta su rack, copian y, si terminan, salen con los planos.
    for(const s of intSpies()){const o=obj[s.target];if(!o||!intDef(o.t)){s.inside=false;spyHome(s);continue;}
      intStep(s.ip,dt,1.3,intPlan(s.target));if(s.ip.path.length)continue;s.it+=dt;if(s.it<INT_SPY)continue;
      s.inside=false;if(!st.won&&!st.lost){s.loot=SPY_GAIN;st.rival=Math.min(100,st.rival+SPY_GAIN);}float(s.x,s.y-1,'rival +'+SPY_GAIN+'%','#e8654d');
      toast('Un espía salió de '+intEl(intDef(o.t))+' con tus planos: el rival avanza '+SPY_GAIN+'%. Tocalo antes de que llegue y los recuperás.');spyHome(s);}
    if(intIn==null)return;
    if(placing||!obj[intIn]||!intDef(obj[intIn].t)){intExit();return;}
    intStep(intP,dt,4);
    if(intAct&&!intP.path.length){const[tx,ty]=intAct;const[px,py]=[Math.round(intP.x),Math.round(intP.y)];intAct=null;if(intNear(px,py,tx,ty)){if(tx!==px)intP.face=tx>px?1:-1;intUse(tx,ty);}}
    if(intBug){const v=intBug.rogue?1.8:1.4;intBug.x+=Math.sin(st.time*2.3)*dt*v;intBug.y+=Math.cos(st.time*1.7)*dt*v;intBug.x=clamp(intBug.x,1,INT_W-2);intBug.y=clamp(intBug.y,3,INT_H-2);}
    for(const f of intFloats){f.t-=dt;f.y-=dt*10;}intFloats=intFloats.filter(f=>f.t>0);},
  sceneDraw(){const{s,ox,oy}=intView(),t=performance.now()/1000,c=ctx,i=intIn,S=intGet(i),def=intDef(obj[i].t);
    c.setTransform(1,0,0,1,0,0);c.fillStyle='#0e1018';c.fillRect(0,0,W,H);c.setTransform(s,0,0,s,ox,oy);c.imageSmoothingEnabled=false;
    for(let y=0;y<INT_H;y++)for(let x=0;x<INT_W;x++){const ch=INT_MAP[y][x],px=x*T,py=y*T;
      if(ch==='W'){c.fillStyle=y===0?'#3a4256':'#2a3040';c.fillRect(px,py,T,T);c.fillStyle='#4a546c';c.fillRect(px,py+T-2,T,2);continue;}
      c.fillStyle=(x+y)%2?'#c9ccd6':'#bfc3ce';c.fillRect(px,py,T,T);c.fillStyle='rgba(0,0,0,0.05)';c.fillRect(px,py,T,1);
      if(ch==='D'){c.fillStyle='#7a4a2a';c.fillRect(px+2,py,12,T);c.fillStyle='#e8c05a';c.fillRect(px+11,py+8,2,2);}}
    // Lo que hay adentro, de arriba para abajo.
    for(let y=0;y<INT_H;y++)for(let x=0;x<INT_W;x++){const ch=INT_MAP[y][x],px=x*T,py=y*T;
      if(/[0-4]/.test(ch)){const k=+ch;if(k===4&&!S.five){c.fillStyle='rgba(0,0,0,0.12)';c.fillRect(px+2,py+2,12,12);continue;}
        if(S.r[k])intDrawRack(px,py,S.r[k],S.hot[k],t+k);else{c.strokeStyle='rgba(42,48,64,0.6)';c.setLineDash([2,2]);c.strokeRect(px+2.5,py+2.5,11,11);c.setLineDash([]);c.fillStyle='rgba(42,48,64,0.6)';c.fillRect(px+7,py+5,2,6);c.fillRect(px+5,py+7,6,2);}}
      {const bk=intBench(ch);if(bk>=0){if(bk===3&&!S.five){c.fillStyle='rgba(0,0,0,0.12)';c.fillRect(px+2,py+2,12,12);}else intDrawBench(px,py,S,bk,t);}}
      if(ch==='a'||ch==='b'){c.fillStyle='#8a5a3a';c.fillRect(px,py+3,T,8);c.fillStyle='#a66a3a';c.fillRect(px,py+3,T,2);c.fillStyle='#1d2230';c.fillRect(px+4,py-2,8,6);
        c.fillStyle=(ch==='a'?0:1)<S.d?'#5fe3d0':'#3a4258';c.fillRect(px+5,py-1,6,4);c.fillStyle='#5a3a2a';c.fillRect(px+5,py+T+2,6,5);}
      if(ch==='P'){c.fillStyle='#f4f1e8';c.fillRect(px-2,py-10,20,12);c.fillStyle='#8a8070';c.fillRect(px-2,py+2,20,1);c.fillStyle=S.f==='ideas'?'#3a72c8':S.f==='seguridad'?'#3a9a5a':'#c8413b';
        c.fillRect(px+1,py-7,7,1);c.fillRect(px+1,py-4,11,1);c.fillRect(px+10,py-8,4,4);}
      if(ch==='C'&&S.box<INT_BOX){c.fillStyle='#a6824a';c.fillRect(px+1,py+3,14,11);c.fillStyle='#8a6a3a';c.fillRect(px+1,py+8,14,1);c.fillRect(px+7,py+3,1,11);
        c.fillStyle='rgba(255,255,255,0.25)';c.fillRect(px+2,py+3,6,1);c.fillStyle='#ffd35a';c.font='600 7px "Pixelify Sans", monospace';c.textAlign='center';c.fillText('?',px+8,py-1+Math.sin(t*3)*1.5);}}
    if(intBug){if(intBug.rogue){c.fillStyle='rgba(232,101,77,'+(0.25+0.12*Math.sin(t*8)).toFixed(2)+')';c.beginPath();c.ellipse(intBug.x*T+8,intBug.y*T+13,7,3,0,0,6.29);c.fill();drawEnt({x:intBug.x,y:intBug.y,face:Math.cos(st.time*2.3)>0?1:-1,moving:true},HS.robotBad||HS.spy);}else intDrawBug(intBug.x*T,intBug.y*T,t);}
    for(const sp of intSpies(i)){const e=sp.ip;c.fillStyle='rgba(232,101,77,'+(0.25+0.12*Math.sin(t*8)).toFixed(2)+')';c.beginPath();c.ellipse(e.x*T+8,e.y*T+13,7,3,0,0,6.29);c.fill();drawEnt(e,HS.spy);
      if(!e.path.length){const f=Math.min(1,sp.it/INT_SPY);c.fillStyle='#1b1a24';c.fillRect(e.x*T+1,e.y*T-5,14,3);c.fillStyle='#e8654d';c.fillRect(e.x*T+2,e.y*T-4,12*f,1);}}
    // La gente sentada a investigar y vos.
    const desks=[intFind('a'),intFind('b')];intSeated(i).forEach((v,k)=>{const d=desks[k];if(!d)return;drawEnt({x:d[0],y:d[1]+0.7,face:1,moving:false,state:'work'},HS.vil[v.skin%3]);});
    drawEnt(intP,HS.hero,true);
    for(const f of intFloats){c.globalAlpha=Math.min(1,f.t*1.5);c.font='600 7px "Pixelify Sans", monospace';c.textAlign='center';c.lineWidth=2;c.strokeStyle='#1b1a24';c.strokeText(f.txt,f.x,f.y);c.fillStyle=f.col;c.fillText(f.txt,f.x,f.y);}
    c.globalAlpha=1;c.font='600 8px "Pixelify Sans", monospace';c.textAlign='center';c.fillStyle='#ffd35a';c.fillText('salir',INT_DOOR[0]*T+8,INT_H*T+9);
    const nb=Math.round(intBonus(S)*100),lab=INT_MAP===INT_MAPS.lab,ne=S.m.filter((m,k)=>m&&S.e[k]>0).length;
    // El renglón de abajo: si no entra en el ancho del interior, la letra se achica.
    const ft=lab?def.name+(S.d?' · ×'+String(1+INT_LABDESK*S.d).replace('.',','):'')+' · '+(ne?ne+' entrenando':'mesas libres'):S.f==='seguridad'?def.name+' · +'+String(Math.round(intBonus(S)*INT_SAFE*600)/10).replace('.',',')+'% seguridad/min':def.name+' · +'+nb+'% '+(S.f==='ideas'?'ideas':'monedas');c.fillStyle='#f0e7d4';for(let fs=8;fs>5;fs--){c.font='600 '+fs+'px "Pixelify Sans", monospace';if(c.measureText(ft).width<=INT_W*T)break;}c.fillText(ft,INT_W*T/2,INT_H*T+22);},
  sceneTap(px,py){intSceneTap(px,py);},
  tap(tx,ty){return intTap(tx,ty);},
  hint(){const ok=i=>obj[i]&&intDef(obj[i].t),hot=Object.keys(intState).find(i=>ok(i)&&intState[i].hot.some(Boolean));
    if(hot!=null&&intIn==null)return['¡Rack recalentado!','entrá '+intAl(intDef(obj[hot].t))+' y tocalo para enfriarlo.'];
    if(intIn!=null&&intBug)return intBug.rogue?['¡Modelo desalineado!','tocalo antes de que se escape a la red.']:['¡Un bicho!','tocalo antes de que se meta en una máquina.'];
    const done=Object.keys(intState).find(i=>ok(i)&&intState[i].m.some((m,k)=>m&&!(intState[i].e[k]>0)));
    if(done!=null&&intIn==null)return['¡Experimento listo!','entrá '+intAl(intDef(obj[done].t))+' a ver qué salió.'];
    if(!intSeen){const id=Object.keys(ERA.interiores).find(k=>counts[k]);if(id)return['Entrá:','tocá '+intEl(ERA.interiores[id])+' para recorrerlo por dentro.'];}
    return null;},
  debug:{chose:()=>intChose,tapPx:(x,y)=>intSceneTap(x,y),view:()=>intView(),interior:()=>({in:intIn,p:intP,state:intState,bug:intBug}),enter:i=>intEnter(i),exit:()=>intExit(),use:(x,y)=>intUse(x,y)}});
