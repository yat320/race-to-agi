// Mundo vivo (octubre de 2026, Juani: la Prehistoria "se siente bien, las que siguen meh"; eligió llevarles lo de la
// Prehistoria: hacer cosas con las manos, un mundo vivo e inventos que cambian el juego). No es una amenaza: usa los mismos
// ganchos. Se prende con `vida:true` en la era (por ahora, la Antigüedad) y trae:
// - Cabras que andan sueltas por el pasto. Tocás una y vas a buscarla: si la alcanzás, +8 de comida; vuelve otra al rato.
// - Sequía de verano: cada VIDA_DRY_EVERY segundos, VIDA_DRY_LEN segundos en que las granjas rinden la mitad, salvo que tengas
//   el edificio que las potencia (ERA.farmBuild, el acueducto): ese las riega.
// - Mercaderes, desde el invento que trae las monedas (el que desbloquea el primer edificio que da monedas): llegan caminando,
//   esperan un rato y te ofrecen dos tratos; elegís uno o los dejás ir.
// - Barcos de comercio, desde que tenés un puerto: atracan al lado y, si los tocás antes de que zarpen, dejan monedas e ideas.
// Nada de esto se guarda: al cargar, el mundo arranca de nuevo.
const VIDA_GOATS=4,VIDA_GOAT_FOOD=8,VIDA_DRY_START=150,VIDA_DRY_EVERY=210,VIDA_DRY_LEN=50,VIDA_MERCH_EVERY=75,VIDA_MERCH_STAY=35,VIDA_SHIP_EVERY=55,VIDA_SHIP_STAY=22;
let vidaGoats=[],vidaGoatT=0,vidaChase=null,vidaChaseT=0,vidaMerch=null,vidaMerchT=0,vidaShip=null,vidaShipT=0,vidaDry=0;
const vidaCoinTech=()=>{const b=BUILDS.find(b=>b.prod&&b.prod.monedas&&b.req);return b&&b.req;};
const vidaPort=()=>{const i=obj.findIndex(o=>o&&o.t==='puerto');return i;};
const vidaCenter=()=>{let i=obj.findIndex(o=>o&&o.t===ERA.storage.id);if(i<0)i=obj.findIndex(o=>o&&o.t==='casa');return i<0?tileOf(P):[i%MW,(i/MW)|0];};
function vidaFreeTile(far,from){for(let k=0;k<80;k++){const x=2+Math.floor(Math.random()*(MW-4)),y=2+Math.floor(Math.random()*(MH-4));
    if(!passable(x,y)||ground[y*MW+x]===SAND)continue;const d=Math.hypot(x-from[0],y-from[1]);if(d<far[0]||d>far[1])continue;return[x,y];}return null;}
function vidaSpawnGoat(){const s=vidaFreeTile([7,22],tileOf(P));if(s)vidaGoats.push({x:s[0],y:s[1],path:[],face:1,moving:false,t:Math.random()*3});}
function vidaCatch(g){vidaGoats=vidaGoats.filter(o=>o!==g);if(vidaChase===g)vidaChase=null;add('comida',VIDA_GOAT_FOOD);
  float(g.x,g.y-0.6,'+'+VIDA_GOAT_FOOD+' comida',RCOL.comida);zaps.push({x:g.x,y:g.y,t:0.5});flashChip('comida');}
function vidaSpawnMerch(){const c=vidaCenter(),s=vidaFreeTile([9,16],c);if(!s)return;const p=pathAdj(s[0],s[1],c[0],c[1]);if(!p)return;
  const pool=[[{comida:20},{monedas:12}],[{madera:30},{[ORE]:10}],[{piedra:25},{monedas:10}],[{monedas:15},{ideas:40*IX}],[{[ORE]:10},{comida:30}],[{madera:25},{piedra:25}]];
  const a=Math.floor(Math.random()*pool.length);let b=Math.floor(Math.random()*(pool.length-1));if(b>=a)b++;
  vidaMerch={x:s[0],y:s[1],home:s,path:p,face:1,moving:false,state:'come',t:VIDA_MERCH_STAY,offers:[pool[a],pool[b]]};
  if(!quiet)toast('Llegó un mercader con tratos: tocalo cuando llegue.');}
const vidaTxt=c=>Object.entries(c).map(([k,v])=>fmt(v)+' '+RN[k].toLowerCase()).join(' y ');
function vidaTrade(){const m=vidaMerch;if(!m)return;
  showModal('<div class="kicker">Mercader</div><h2>¿Hacemos un trato?</h2><p class="muted">Elegí uno. Se va enseguida.</p><div class="row" style="flex-direction:column;align-items:stretch">'+
    m.offers.map(([g,r],k)=>'<button class="btn" id="vidaO'+k+'"'+(afford(g)?'':' disabled')+'>'+vidaTxt(g)+' → '+vidaTxt(r)+'</button>').join('')+'<button class="btn ghost" id="vidaNo">Ahora no</button></div>');
  m.offers.forEach(([g,r],k)=>{const b=$('vidaO'+k);if(b)b.onclick=()=>{if(!afford(g))return;pay(g);for(const q in r)q==='ideas'?st.res.ideas+=r[q]:add(q,r[q]);
    float(m.x,m.y-0.8,'¡trato hecho!','#93d36c');m.state='leave';m.path=pathAdj(Math.round(m.x),Math.round(m.y),m.home[0],m.home[1])||[];hideModal();save();};});
  $('vidaNo').onclick=()=>hideModal();}
function vidaSpawnShip(){const pi=vidaPort();if(pi<0)return;const px=pi%MW,py=(pi/MW)|0,oc=ocean();
  const w=DIRS8.map(([dx,dy])=>[px+dx,py+dy]).find(([x,y])=>inb(x,y)&&oc[y*MW+x]);if(!w)return;vidaShip={x:w[0],y:w[1],t:VIDA_SHIP_STAY};
  if(!quiet)toast('Atracó un barco de comercio: tocalo antes de que zarpe.');}
amenaza({on:'vida',
  reset(){vidaGoats=[];vidaGoatT=0;vidaChase=null;vidaMerch=null;vidaMerchT=0;vidaShip=null;vidaShipT=0;vidaDry=0;},
  // Las granjas, con la sequía y sin acueducto, rinden la mitad (el motor multiplica por esto).
  farm(){return vidaDry>0&&!act(ERA.farmBuild)?0.5:1;},
  tick(step){
    vidaGoatT-=step;if(vidaGoats.length<VIDA_GOATS&&vidaGoatT<=0){vidaGoatT=20;vidaSpawnGoat();}
    {const ph=st.time-VIDA_DRY_START;const was=vidaDry>0;vidaDry=ph>0&&ph%VIDA_DRY_EVERY<VIDA_DRY_LEN?VIDA_DRY_LEN-ph%VIDA_DRY_EVERY:0;
      if(vidaDry>0&&!was)toast(act(ERA.farmBuild)?'Llegó la sequía, pero tus acueductos riegan las granjas.':'¡Sequía! Las granjas rinden la mitad hasta que llueva. Un acueducto las riega.');}
    const ct=vidaCoinTech();if(ct&&st.techs[ct]&&!vidaMerch){vidaMerchT+=step;if(vidaMerchT>=VIDA_MERCH_EVERY){vidaMerchT=0;vidaSpawnMerch();}}
    if(!vidaShip&&vidaPort()>=0){vidaShipT+=step;if(vidaShipT>=VIDA_SHIP_EVERY){vidaShipT=0;vidaSpawnShip();}}
    if(vidaShip){vidaShip.t-=step;if(vidaShip.t<=0){float(vidaShip.x,vidaShip.y-0.6,'zarpó','#c9d2de');vidaShip=null;}}},
  update(dt){
    for(const g of vidaGoats){stepEnt(g,dt,0.9);g.t-=dt;if(g.t<=0&&!g.path.length){g.t=2+Math.random()*3;const[x,y]=tileOf(g),d=DIRS8[Math.floor(Math.random()*8)];if(passable(x+d[0],y+d[1]))g.path=[[x+d[0],y+d[1]]];}}
    // Persecución: el camino del jugador se rehace hacia la cabra; si tocaste otra cosa (el camino ya no termina cerca), se corta.
    if(vidaChase){const g=vidaChase;vidaChaseT-=dt;
      if(!vidaGoats.includes(g)||vidaChaseT<=0)vidaChase=null;
      else if(Math.hypot(P.x-g.x,P.y-g.y)<=1.4)vidaCatch(g);
      else{const end=P.path[P.path.length-1];if(P.task||P.act||end&&Math.hypot(end[0]-g.x,end[1]-g.y)>2.5)vidaChase=null;
        else if(!P.path.length||Math.random()<dt*2){const[px,py]=tileOf(P),[gx,gy]=tileOf(g),p=pathAdj(px,py,gx,gy);if(p)P.path=p;}}}
    const m=vidaMerch;if(m){stepEnt(m,dt,2.2);if(m.state==='come'&&!m.path.length)m.state='wait';
      if(m.state==='wait'){m.t-=dt;if(m.t<=0){m.state='leave';m.path=pathAdj(Math.round(m.x),Math.round(m.y),m.home[0],m.home[1])||[];}}
      if(m.state==='leave'&&!m.path.length)vidaMerch=null;}},
  ents(list){for(const g of vidaGoats)list.push({k:g.y+1,z:1,e:g,f:HS.cabra});if(vidaMerch)list.push({k:vidaMerch.y+1,z:1,e:vidaMerch,f:HS.mercader,
    post:e=>{if(e.state!=='wait')return;const t=performance.now()/1000;ctx.fillStyle='#ffd35a';ctx.font='600 6px "Pixelify Sans", monospace';ctx.textAlign='center';ctx.fillText('$',e.x*T+8,e.y*T-4+Math.sin(t*4)*1.5);}});},
  drawUnder(){if(vidaShip){const t=performance.now()/1000;hd(HS.nave,vidaShip.x*T,vidaShip.y*T+Math.sin(t*2)*0.6);}},
  // La sequía se ve: el mapa queda más amarillo.
  drawOver(){if(vidaDry>0&&!act(ERA.farmBuild)){ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.fillStyle='rgba(255,190,90,0.10)';ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);ctx.restore();}},
  tap(tx,ty){
    if(vidaShip&&Math.hypot(vidaShip.x-tx,vidaShip.y-ty)<=1.2){const s=vidaShip;vidaShip=null;add('monedas',15);st.res.ideas+=8*IX;
      float(s.x,s.y-0.6,'+15 monedas',RCOL.monedas);float(s.x,s.y-1.2,ideaTxt(8),RCOL.ideas);zaps.push({x:s.x,y:s.y,t:0.5});return'vida';}
    if(quiet)return false;
    if(vidaMerch&&Math.hypot(vidaMerch.x-tx,vidaMerch.y-ty)<=1.2){if(vidaMerch.state==='wait')vidaTrade();else toast(vidaMerch.state==='come'?'El mercader viene en camino.':'El mercader ya se va.');return'vida';}
    const g=vidaGoats.find(g=>Math.hypot(g.x-tx,g.y-ty)<=1.2);if(!g)return false;
    if(Math.hypot(P.x-g.x,P.y-g.y)<=1.6){vidaCatch(g);return'vida';}
    vidaChase=g;vidaChaseT=12;P.task=null;P.act=null;const[px,py]=tileOf(P),[gx,gy]=tileOf(g),p=pathAdj(px,py,gx,gy);if(p)P.path=p;float(g.x,g.y-0.6,'¡meee!','#f4f1e8');return'vida';},
  hint(){if(vidaDry>0&&!act(ERA.farmBuild))return['¡Sequía!','las granjas rinden la mitad. Un acueducto las riega.'];
    if(vidaShip)return['¡Barco!','tocalo antes de que zarpe: trae monedas e ideas.'];
    if(vidaMerch&&vidaMerch.state==='wait')return['Mercader:','tocalo para ver sus tratos.'];return null;},
  arrows(){const a=[];if(vidaShip)a.push({x:vidaShip.x,y:vidaShip.y});if(vidaMerch&&vidaMerch.state==='wait')a.push({x:vidaMerch.x,y:vidaMerch.y});return a;},
  // El bot toca los barcos y, si le falta comida, las cabras; a los mercaderes los deja ir.
  botTaps(){const q=[];if(vidaShip)q.push([vidaShip.x,vidaShip.y]);if(st.res.comida<30)for(const g of vidaGoats.slice(0,1))q.push([Math.round(g.x),Math.round(g.y)]);return q;},
  debug:{goats:()=>vidaGoats,merch:()=>vidaMerch,ship:()=>vidaShip,dry:()=>vidaDry,spawnMerch:()=>vidaSpawnMerch(),spawnShip:()=>vidaSpawnShip(),trade:()=>vidaTrade()}});
