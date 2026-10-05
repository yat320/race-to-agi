// Era intergaláctica del mundo abierto (la que sigue a la galáctica): materia oscura, anclas temporales y grietas que hacen retroceder en el tiempo lo que tocan; la red de agujeros de gusano. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:14,name:'Era intergaláctica',de:'de la era intergaláctica',obra:'la red de agujeros de gusano',next:{file:'mundo15.html',to:'a la era cósmica'},
  ore:{id:'oscura',name:'Materia oscura',col:'#b4a0f0',empty:'Veta de materia oscura agotada',gather:'materia oscura',icon:[['........','..kkkk..','.kqvqqk.','kqQqvqqk','kqvQqQqk','.kqqvqk.','..kkkk..','........'],{q:'#3a2e6c',Q:'#221a44',v:'#d8ccff'}]},
  storage:{id:'granero'},ideaBuild:'ondas',ideaTechs:['oscura','universo'],boostTech:'entropia',farmBuild:'huerto',nightTech:'universo',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','cronoteca','ancla','portal','huerto','pozo','ondas'],
  rifts:true,defense:{id:'ancla',r:4,label:'Anclaje'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'crono',building:'Patrulla del tiempo',unit:'Patrullero',done:'Patrulla del tiempo lista: llegó un patrullero',desc:'Trae un patrullero que sale solo a cerrar grietas y a traer al presente lo que retrocedió, a 8 casilleros o menos.',info:'Patrulla del tiempo: su patrullero cierra grietas cerca.',tip:'una patrulla del tiempo: el patrullero sale solo a cerrar grietas.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo13-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era galáctica',perks:[
    ['federacion','ideaMult',1.25,'Federación galáctica: ideas +25% durante toda la era'],
    ['xenoagro','agri',1.25,'Xenoagricultura: granjas +25%'],
    ['cartografia','speed',1.2,'Cartografía galáctica: te movés 20% más rápido']
  ]},
  techs:[
 {id:'oscura',name:'Materia oscura',cost:{oscura:15,ideas:30},req:[],desc:'Desbloquea la cronoteca, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'anclas',name:'Anclas temporales',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el ancla temporal: cierra las grietas que se abren cerca.'},
 {id:'gusanos',name:'Agujeros de gusano',cost:{oscura:20,ideas:50},req:['oscura'],desc:'Desbloquea el portal intergaláctico, que da monedas. Las grietas se abren 30% más seguido.'},
 {id:'cuantica',name:'Cosecha cuántica',cost:{madera:40,piedra:20,ideas:65},req:['oscura'],desc:'Desbloquea el huerto cuántico, que potencia las granjas.'},
 {id:'gravedad',name:'Ingeniería gravitatoria',cost:{madera:60,oscura:20,ideas:95},req:['gusanos'],desc:'Desbloquea el pozo gravitatorio, que junta materia oscura solo.'},
 {id:'cronologia',name:'Física del tiempo',cost:{monedas:30,ideas:130},req:['anclas','gusanos'],desc:'Las grietas tardan 50% más en hacer retroceder algo: hay más tiempo para cerrarlas.'},
 {id:'universo',name:'Mapa del universo',cost:{monedas:55,ideas:340},req:['cronologia','gravedad'],desc:'Desbloquea el detector de ondas gravitatorias. Ideas +50% y de noche ves más lejos.'},
 {id:'entropia',name:'Inversión de la entropía',cost:{oscura:70,monedas:55,ideas:450},req:['gusanos','cronologia'],desc:'Todo produce +50%.'},
 {id:'red',name:'Red de agujeros de gusano',cost:{piedra:130,oscura:110,monedas:130,ideas:1000},req:['universo','entropia'],desc:'Une las galaxias con puentes instantáneos. Cierra la era intergaláctica.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa de anillos',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa de anillos lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'oscura',base:{madera:25,piedra:20,oscura:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'oscura',base:{madera:20,oscura:8},grow:1.35,prod:{piedra:0.12}},
 {id:'cronoteca',name:'Cronoteca',req:'oscura',base:{piedra:40,oscura:10},grow:1.5,done:'Cronoteca abierta',desc:'Guarda lo que se supo en todas las épocas: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'ancla',name:'Ancla temporal',req:'anclas',base:{madera:25,piedra:25,oscura:5},grow:1.4,done:'Ancla temporal encendida',desc:'Cierra las grietas que se abren a 4 casilleros o menos, y lo que retrocedió cerca vuelve solo al presente.'},
 {id:'portal',name:'Portal intergaláctico',req:'gusanos',base:{madera:30,piedra:25,oscura:5},grow:1.4,done:'Portal intergaláctico abierto',desc:'Se comercia con otras galaxias: da muchas monedas.',prod:{monedas:0.45}},
 {id:'huerto',name:'Huerto cuántico',req:'cuantica',base:{madera:35,piedra:30},grow:1.6,done:'Huerto cuántico plantado',desc:'Cada huerto cuántico hace rendir +50% a todas las granjas.'},
 {id:'pozo',name:'Pozo gravitatorio',req:'gravedad',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Pozo gravitatorio encendido',desc:'Junta materia oscura solo.',prod:{oscura:0.12}},
 {id:'ondas',name:'Detector de ondas',req:'universo',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Detector de ondas encendido',desc:'Escucha cómo se estira el universo: ideas +30% por cada detector.'}],
  info:{casa:'Casa de anillos: acá viven 2 aldeanos.',herreria:'Nanotaller: los aldeanos juntan más rápido.',cronoteca:'Cronoteca: genera ideas.',ancla:'Ancla temporal: cierra las grietas a 4 casilleros o menos.',portal:'Portal intergaláctico: da monedas.',huerto:'Huerto cuántico: potencia las granjas.',pozo:'Pozo gravitatorio: da materia oscura.',ondas:'Detector de ondas: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['anclas','ancla','un ancla temporal: cierra las grietas que se abren cerca.']],
  tips2:[['oscura','cronoteca','una cronoteca: genera muchísimas ideas.'],['gusanos','portal','un portal intergaláctico para conseguir monedas.'],['cuantica','huerto','un huerto cuántico: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era intergaláctica completa.',
  // Cada ancla temporal tiene un anillo dorado que gira al derecho (las grietas giran al revés).
  deco:(o,px,py)=>{if(o.t!=='ancla'||o.bug)return;const ph=st.time*1.2+((px*3+py*5)%16)/4;
    ctx.strokeStyle='rgba(255,211,90,.85)';ctx.lineWidth=0.8;for(let k=0;k<5;k++){const a0=ph+k*Math.PI*0.4;ctx.beginPath();ctx.ellipse(px+8,py+5,6.5,2.2,0,a0,a0+0.7);ctx.stroke();}},
  text:{
    when:'3000 d.C.',title:'La era intergaláctica',
    intro:'Con la federación galáctica, la humanidad viaja a otras galaxias por agujeros de gusano, pero cada viaje raja el tiempo. Se abren grietas temporales que hacen retroceder lo que tocan: una holoplaza vuelve a ser centro cultural, después café y al final fogata, y rinde cada vez menos. Tocalas para cerrarlas, o poné anclas temporales cerca. La meta: la red de agujeros de gusano que une las galaxias.',
    news:'Novedades: materia oscura, anclas temporales y grietas en el tiempo. Una grieta se abre sobre algo que produce, lo hace retroceder una época cada 8 segundos y después salta al de al lado. Lo que retrocedió rinde la mitad por cada época hasta que lo tocás o el tiempo se acomoda solo. Cuanto más avanzás, más seguido se abren.',
    legacy:'Lo que trae tu ciudad de la era galáctica',
    noLegacy:'No hay una era galáctica terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o una veta y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Se abren grietas temporales: hacen retroceder en el tiempo lo que produce, que rinde la mitad por cada época. Tocalas para cerrarlas y tocá lo que retrocedió para traerlo al presente; si no, el tiempo se acomoda solo de a poco. Cerca de un ancla temporal se cierran solas. En la compu: flechas o WASD.',
    win:'La red de agujeros de gusano',winText:()=>'Terminaste la red de agujeros de gusano en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Las galaxias quedan a un paso: la humanidad ya puede ir y volver por todo el universo.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan a la era cósmica.'}
};
/* ---------- arte de la era ---------- */
const OSC=P4('#100c22','#221a44','#3a2e6c','#5e4ea8'),OSCL=hx('#d8ccff'),CYAN=hx('#5fe3d0'),VIO=hx('#b48cff'),GOLDL=hx('#ffd35a'),CORAL=hx('#e8654d'),
  PEARL=P4('#9aa4b8','#bcc6d6','#dde4ee','#f6f9fc'),DARK=P4('#14161c','#20242e','#2e3440','#404858');
// Veta de materia oscura: roca casi negra con un remolino violeta adentro y chispas que brillan.
function darkOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],OSC,null);
  for(let k=0;k<46;k++){const an=k*0.42,r=1+k*0.33,x=Math.round(32+Math.cos(an)*r),y=Math.round(31+Math.sin(an)*r*0.8);if(a.get(x,y))a.set(x,y,k%3?OSC[3]:VIO);}
  const r=mulberry32(71);for(let k=0;k<9;k++){const x=14+Math.floor(r()*36),y=18+Math.floor(r()*24);if(a.get(x,y)&&a.get(x+1,y+1)){a.set(x,y,OSCL);a.set(x+1,y,VIO);a.set(x,y-1,VIO);}}
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa de anillos: una torre blanca y redonda con ventanas que brillan y un anillo dorado que flota alrededor.
function ringHouseArt(){return mkA(64,64,a=>{const RB=hx('#a8862a');
  ell(a,32,32,28,6,(i,j)=>Math.hypot(i/28,j/6)>0.76&&j<0?RB:null);
  rect(a,10,55,44,5,PEARL[1]);rect(a,10,55,44,1,PEARL[3]);
  rect(a,20,14,24,41,PEARL[2]);rect(a,37,14,7,41,PEARL[1]);ell(a,32,14,12,8,(i,j)=>j<=0?(i>4?PEARL[1]:PEARL[3]):null);
  for(const y of[18,40])for(const x of[24,31])rect(a,x,y,4,5,hx('#7fe8dc'));rect(a,38,40,3,5,hx('#4ab0a4'));
  rect(a,28,48,8,7,DKW);
  ell(a,32,32,28,6,(i,j)=>Math.hypot(i/28,j/6)>0.76&&j>=0?(j>3?RB:GOLDL):null);
  outlineAll(a,OUTL);});}
// Cronoteca: una biblioteca con columnas, libros de todas las épocas y un reloj grande en el frente.
function cronotecaArt(){return mkA(64,64,a=>{rect(a,4,52,56,3,PEARL[3]);rect(a,6,55,52,5,PEARL[1]);
  rect(a,8,28,48,24,OSC[2]);rect(a,44,28,12,24,OSC[1]);
  const BK=[VIO,CYAN,GOLDL,CORAL];for(const x0 of[14,24,34,44])for(let row=0;row<3;row++)for(let k=0;k<6;k++)rect(a,x0+k,31+row*7,1,5,BK[(k+row+x0)%4]);
  for(const x of[10,20,30,40,50])rect(a,x,28,4,24,x>44?PEARL[1]:PEARL[2]);
  poly(a,[[4,29],[32,10],[60,29]],(x)=>x<32?PEARL[3]:PEARL[2]);
  ell(a,32,22,6,6,(i,j)=>Math.hypot(i,j)>4.6?GOLDL:hx('#f6f1e4'));rect(a,32,18,1,4,DKW);rect(a,29,22,3,1,DKW);
  outlineAll(a,OUTL);});}
// Ancla temporal: una columna oscura con un ancla dorada y una esfera cian arriba (el anillo que gira se dibuja aparte, ERA.deco).
function anchorArt(){return mkA(64,64,a=>{rect(a,16,52,32,8,DARK[2]);rect(a,16,52,32,2,DARK[3]);
  poly(a,[[23,52],[26,14],[38,14],[41,52]],(x)=>x>34?OSC[1]:OSC[2]);rect(a,24,11,16,4,PEARL[2]);rect(a,24,11,16,1,PEARL[3]);
  ell(a,32,6,5,5,(i,j)=>Math.hypot(i+1.5,j+1.5)<2?hx('#ffffff'):i+j<0?CYAN:hx('#3fa89c'));
  rect(a,31,23,2,19,GOLDL);rect(a,27,26,10,2,GOLDL);ell(a,32,21,3,3,(i,j)=>Math.hypot(i,j)>1.4?GOLDL:null);
  line(a,25,37,32,44,GOLDL,2);line(a,39,37,32,44,GOLDL,2);rect(a,24,35,2,3,GOLDL);rect(a,38,35,2,3,GOLDL);
  outlineAll(a,OUTL);});}
// Portal intergaláctico: un aro blanco enorme con un remolino azul adentro, sobre una plataforma con cajones de comercio.
function portalArt(){return mkA(64,64,a=>{rect(a,4,52,56,8,DARK[2]);rect(a,4,52,56,2,DARK[3]);
  ell(a,32,30,21,21,(i,j)=>{const d=Math.hypot(i,j);if(d>17.5)return d>19.5?PEARL[1]:PEARL[3];const an=Math.atan2(j,i)+d*0.32;return d<5?hx('#c8f4ff'):Math.sin(an*3)>0.35?hx('#7a5ae0'):hx('#2a5ac0');});
  for(const y of[12,48])rect(a,30,y-2,4,4,CYAN);
  for(const[x,y]of[[1,42],[4,47],[54,44]]){rect(a,x,y,9,8,COPPER[1]);rect(a,x,y,9,2,COPPER[2]);rect(a,x+4,y,1,8,COPPER[0]);}
  outlineAll(a,OUTL);});}
// Huerto cuántico: plantas que están en dos lugares a la vez (cada una con su copia celeste) en un cantero bajo un arco de luz.
function quantumGardenArt(){return mkA(64,64,a=>{rect(a,4,42,56,16,SOIL[1]);rect(a,4,42,56,2,SOIL[2]);for(let x=6;x<58;x+=6)rect(a,x,50,3,1,SOIL[0]);
  for(const[x,h]of[[10,20],[21,27],[32,17],[43,25],[53,18]]){line(a,x+4,52,x+4,52-h,hx('#8ad0e8'),1);ell(a,x+4,52-h,3,3,hx('#c8f4ff'));
    line(a,x,54,x,54-h,LEAF[1],2);ell(a,x,54-h,4,4,(i,j)=>i+j<0?LEAF[3]:LEAF[2]);a.set(x,54-h,VIO);}
  for(const x of[3,59])rect(a,x,20,2,38,PEARL[2]);rect(a,3,18,58,2,CYAN);rect(a,3,20,58,1,hx('#3fa89c'));
  outlineAll(a,OUTL);});}
// Pozo gravitatorio: un embudo en el suelo entre dos torres, con una esfera oscura que flota y materia que cae en espiral.
function gravityWellArt(){return mkA(64,64,a=>{ell(a,32,50,28,9,(i,j)=>{const d=Math.hypot(i/28,j/9);return d>0.82?PEARL[j<0?3:1]:d>0.55?OSC[2]:OSC[0];});
  for(const x of[7,57]){rect(a,x-2,26,5,24,PEARL[2]);rect(a,x-3,23,7,3,CYAN);}
  ell(a,32,24,9,9,(i,j)=>{const d=Math.hypot(i,j);return d>7.6?VIO:Math.hypot(i+3,j+3)<3?OSC[3]:OSC[1];});
  outlineAll(a,OUTL);
  for(let k=0;k<16;k++){const an=k*0.85,r=13-k*0.7;a.set(Math.round(32+Math.cos(an)*r*1.6),Math.round(42+Math.sin(an)*r*0.45),k%2?VIO:OSCL);}});}
// Detector de ondas gravitatorias: una estación con cúpula y dos brazos larguísimos en ángulo recto, como los de verdad.
function wavesArt(){return mkA(64,64,a=>{
  line(a,22,40,54,11,PEARL[1],5);line(a,21,38,53,9,PEARL[3],1);rect(a,49,3,11,9,PEARL[2]);rect(a,49,3,11,1,PEARL[3]);
  rect(a,24,44,36,6,PEARL[2]);rect(a,24,44,36,1,PEARL[3]);rect(a,24,49,36,1,PEARL[0]);rect(a,55,39,8,13,PEARL[2]);rect(a,55,39,8,1,PEARL[3]);
  rect(a,5,38,23,18,PEARL[2]);rect(a,22,38,6,18,PEARL[1]);ell(a,15,38,8,6,(i,j)=>j<=0?(i>3?PEARL[1]:PEARL[3]):null);rect(a,13,48,6,8,DKW);
  outlineAll(a,OUTL);
  for(let x=0;x<16;x++)a.set(8+x,43+Math.round(Math.sin(x*0.8)*1.6),CYAN);});}
const VILPAL2=[{c:'#dde4ee',C:'#9aa4b8',j:'#5e4ea8',y:'#3a2418'},{c:'#3a2e6c',C:'#221a44',j:'#ffd35a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#2a5a6a',C:'#1c4250',j:'#e8654d',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:darkOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:ringHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),cronoteca:cronotecaArt(),ancla:anchorArt(),portal:portalArt(),
  huerto:quantumGardenArt(),pozo:gravityWellArt(),ondas:wavesArt(),
  hero:[personArt({c:'#b48cff',C:'#5e4ea8',j:'#2a2a3a'},0),personArt({c:'#b48cff',C:'#5e4ea8',j:'#2a2a3a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
