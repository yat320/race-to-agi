// Era interestelar del mundo abierto (la que sigue a la estelar): materia exótica, campos de contención y nanobots grises; el motor de curvatura. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:12,name:'Era interestelar',de:'de la era interestelar',next:null,
  ore:{id:'exotica',name:'Materia exótica',col:'#c49cff',empty:'Cristal exótico agotado',gather:'materia exótica',icon:[['....k...','...kvk..','..kvqk.k','.kvqqkkv','.kvqQkvq','kvqQQkqQ','kqQQQkQk','.kkkkkk.'],{q:'#8a5ad0',Q:'#5a3a8a',v:'#e0c8ff'}]},
  storage:{id:'granero',name:'Granero'},ideaBuild:'academia',ideaTechs:['exotica','xenologia'],boostTech:'cuantica',farmBuild:'terraformador',nightTech:'xenologia',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','nucleo','contencion','astillero','terraformador','colector','academia'],
  goo:true,defense:{id:'contencion',r:4,label:'Contención'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo11-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era estelar',perks:[
    ['dyson','ideaMult',1.25,'Esfera de Dyson: ideas +25% durante toda la era'],
    ['sintesis','agri',1.25,'Síntesis de alimentos: granjas +25%'],
    ['cohetes','speed',1.2,'Cohetes reutilizables: te movés 20% más rápido']
  ]},
  techs:[
 {id:'exotica',name:'Física exótica',cost:{exotica:15,ideas:30},req:[],desc:'Desbloquea el núcleo cuántico, el nanotaller y la cantera. Ideas +50%.'},
 {id:'campos',name:'Campos de contención',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el campo de contención: los nanobots no crecen cerca.'},
 {id:'naves',name:'Naves de colonización',cost:{exotica:20,ideas:50},req:['exotica'],desc:'Desbloquea el astillero estelar, que da monedas.'},
 {id:'terraformacion',name:'Terraformación',cost:{madera:40,piedra:20,ideas:65},req:['exotica'],desc:'Desbloquea el terraformador, que potencia las granjas.'},
 {id:'antimateria',name:'Antimateria',cost:{madera:60,exotica:20,ideas:95},req:['naves'],desc:'Desbloquea el colector, que junta materia exótica. Se escapan 30% más nanobots.'},
 {id:'sensores',name:'Sensores cuánticos',cost:{monedas:30,ideas:130},req:['campos','naves'],desc:'Los nanobots crecen 50% más lento: hay más tiempo para apagarlos.'},
 {id:'xenologia',name:'Xenobiología',cost:{monedas:55,ideas:340},req:['sensores','antimateria'],desc:'Desbloquea la academia galáctica. Ideas +50% y de noche ves más lejos.'},
 {id:'cuantica',name:'Computación cuántica',cost:{exotica:70,monedas:55,ideas:450},req:['naves','sensores'],desc:'Todo produce +50%.'},
 {id:'curvatura',name:'Motor de curvatura',cost:{piedra:130,exotica:110,monedas:130,ideas:1000},req:['xenologia','cuantica'],desc:'Doblar el espacio para viajar más rápido que la luz: la primera nave hacia otra estrella. Cierra la era interestelar.'}],
  builds:[
 {id:'casa',name:'Arcología',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Arcología lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',name:'Granja',req:null,base:{madera:12,comida:4},grow:1.25,done:'Granja lista',desc:'Produce comida sola.',prod:{comida:0.2},noSand:true},
 {id:'fogata',name:'Fogata',req:null,base:{madera:5,piedra:4},grow:1.6,done:'Fogata encendida',desc:'Genera ideas y alumbra de noche. Comer cerca rinde el doble.',prod:{ideas:0.12}},
 {id:'aserradero',name:'Aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,done:'Aserradero listo',desc:'Produce madera solo.',prod:{madera:0.12}},
 {id:'granero',name:'Granero',req:null,base:{madera:25,piedra:15},grow:1.4,done:'Granero construido',desc:'+150 de capacidad para cada recurso. Las ideas no tienen límite.'},
 {id:'herreria',name:'Nanotaller',req:'exotica',base:{madera:25,piedra:20,exotica:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: vos y los aldeanos juntan +30% por cada nanotaller.'},
 {id:'cantera',name:'Cantera',req:'exotica',base:{madera:20,exotica:8},grow:1.35,done:'Cantera lista',desc:'Produce piedra sola.',prod:{piedra:0.12}},
 {id:'nucleo',name:'Núcleo cuántico',req:'exotica',base:{piedra:40,exotica:10},grow:1.5,done:'Núcleo cuántico encendido',desc:'Calcula en muchos mundos a la vez: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'contencion',name:'Campo de contención',req:'campos',base:{madera:25,piedra:25,exotica:5},grow:1.4,done:'Campo de contención encendido',desc:'Los nanobots no crecen a 4 casilleros o menos, y lo que quedó adentro se apaga.'},
 {id:'astillero',name:'Astillero estelar',req:'naves',base:{madera:30,piedra:25,exotica:5},grow:1.4,done:'Astillero abierto',desc:'Arma naves que comercian con las colonias: da muchas monedas.',prod:{monedas:0.45}},
 {id:'terraformador',name:'Terraformador',req:'terraformacion',base:{madera:35,piedra:30},grow:1.6,done:'Terraformador listo',desc:'Cada terraformador hace rendir +50% a todas las granjas.'},
 {id:'colector',name:'Colector exótico',req:'antimateria',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Colector listo',desc:'Junta materia exótica solo.',prod:{exotica:0.12}},
 {id:'academia',name:'Academia galáctica',req:'xenologia',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Academia abierta',desc:'Ideas +30% por cada academia.'}],
  info:{casa:'Arcología: acá viven 2 aldeanos.',granja:'Granja: produce comida.',fogata:'Fogata: genera ideas. Comer cerca rinde el doble.',aserradero:'Aserradero: produce madera.',granero:'Granero: más capacidad.',herreria:'Nanotaller: juntás más rápido.',cantera:'Cantera: produce piedra.',nucleo:'Núcleo cuántico: genera ideas.',contencion:'Campo de contención: los nanobots no crecen a 4 casilleros o menos.',astillero:'Astillero estelar: da monedas.',terraformador:'Terraformador: potencia las granjas.',colector:'Colector exótico: da materia exótica.',academia:'Academia galáctica: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['campos','contencion','un campo de contención: los nanobots no crecen cerca.']],
  tips2:[['exotica','nucleo','un núcleo cuántico: genera muchísimas ideas.'],['naves','astillero','un astillero estelar para conseguir monedas.'],['terraformacion','terraformador','un terraformador: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era interestelar completa.',
  // Cada astillero despacha una nave cada 30 s: sube despacio y se va; el resto del tiempo la nave espera en la grúa.
  deco:(o,px,py)=>{if(o.t!=='astillero'||o.bug)return;const ph=(st.time/30+((px*5+py*7)%30)/30)%1;
    if(ph<0.2){const h=ph/0.2;hd(HS.ship[1],px+2+h*h*20,py-1-h*h*30);}else if(ph>0.3)hd(HS.ship[0],px+2,py-1);},
  text:{
    when:'2150 d.C.',title:'La era interestelar',
    intro:'Con toda la energía del Sol, la humanidad mira a otras estrellas. Pero las fábricas que se arman solas a veces se escapan: nubes de nanobots grises que crecen y tapan todo lo que tocan. Tocalas para apagarlas, o rodeá tu ciudad de campos de contención. La meta: el motor de curvatura, la primera nave hacia otra estrella.',
    news:'Novedades: materia exótica, campos de contención y nanobots grises. Lo que tapa una nube no produce y lo que se puede juntar, se lo come. Si nadie la apaga, se queda sin energía a los 100 s. Cuanto más avanzás, más seguido se escapan.',
    legacy:'Lo que trae tu ciudad de la era estelar',
    noLegacy:'No hay una era estelar terminada en este navegador: arrancás con 2 aldeanos. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del granero, lo que sobra se pierde. Se escapan nubes de nanobots: crecen hacia tus edificios y lo que tapan no produce. Tocá cualquier parte de la nube para apagarla; si no, se apaga sola a los 100 s. Los campos de contención no las dejan crecer cerca. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'El motor de curvatura',winText:()=>'Terminaste el motor de curvatura en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. La primera nave de la humanidad sale hacia otra estrella.',
    winNote:'Por ahora es la última era.'}
};

/* ---------- arte de la era ---------- */
const EXO=P4('#3a2460','#5a3a8a','#8a5ad0','#c49cff'),EXOL=hx('#e0c8ff'),CYAN=hx('#5fe3d0'),WHITE=P4('#a8b4c0','#c8d2dc','#e6ecf2','#ffffff'),DARK=P4('#14161c','#20242e','#2e3440','#404858');
// Cristales de materia exótica: un racimo violeta que brilla.
function exoticOreArt(){return mkA(64,52,a=>{ell(a,32,46,22,5,ROCK[0]);
  for(const[x,y,w,h]of[[22,46,7,26],[33,46,8,36],[44,46,6,22],[14,46,5,14],[51,46,4,12]])poly(a,[[x-w,y],[x-w*0.6,y-h*0.75],[x,y-h],[x+w*0.6,y-h*0.75],[x+w,y]],(X)=>X<x-w*0.2?EXO[3]:X<x+w*0.3?EXO[2]:EXO[1]);
  for(const[x,y]of[[31,16],[21,26],[43,28]]){rect(a,x,y,2,6,EXOL);a.set(x+1,y-1,hx('#ffffff'));}outlineAll(a,OUTL);});}
// Arcología: una pirámide escalonada blanca con ventanas que brillan y jardines en las terrazas.
function arcologyArt(){return mkA(64,64,a=>{
  for(const[y,w]of[[48,26],[36,20],[24,14],[14,8]]){rect(a,32-w,y,2*w,12,WHITE[2]);rect(a,32+w-6,y,6,12,WHITE[1]);rect(a,32-w,y,2*w,2,LEAF[2]);for(let x=32-w+3;x<32+w-4;x+=5)rect(a,x,y+5,2,3,CYAN);}
  rect(a,30,4,4,10,WHITE[3]);ell(a,32,4,3,3,EXOL);rect(a,28,54,8,6,DKW);outlineAll(a,OUTL);});}
// Núcleo cuántico: un cubo de luz que flota adentro de un marco, sobre un pedestal oscuro.
function quantumCoreArt(){return mkA(64,64,a=>{rect(a,8,44,48,16,DARK[2]);rect(a,44,44,12,16,DARK[1]);rect(a,8,44,48,2,DARK[3]);for(let x=12;x<42;x+=6)rect(a,x,50,3,6,EXO[3]);
  for(const x of[10,52])rect(a,x,8,3,36,IRON[2]);rect(a,10,8,45,3,IRON[2]);
  poly(a,[[32,14],[44,22],[44,34],[32,42],[20,34],[20,22]],(x,y)=>y<28-Math.abs(x-32)*0.65?EXO[3]:x<32?EXO[2]:EXO[1]);
  poly(a,[[32,20],[38,24],[38,31],[32,35],[26,31],[26,24]],(x,y)=>y<27?hx('#ffffff'):EXOL);outlineAll(a,OUTL);});}
// Campo de contención: un pilón con un anillo de energía arriba y el borde del campo en el suelo.
function containmentArt(){return mkA(64,64,a=>{ell(a,32,54,28,8,(i,j)=>Math.hypot(i/28,j/8)>0.85?hx('#7fe8dc'):null);
  poly(a,[[22,58],[26,22],[38,22],[42,58]],(x)=>x>34?STONE2[1]:STONE2[2]);rect(a,22,56,20,3,STONE2[0]);
  for(const y of[30,40,50])rect(a,25,y,14,2,CYAN);
  ell(a,32,16,14,6,(i,j)=>Math.hypot(i/14,j/6)>0.6?(j<0?CYAN:hx('#3fa89c')):null);ell(a,32,16,4,4,hx('#e8fff8'));outlineAll(a,OUTL);});}
// Astillero estelar: una grúa grande y la plataforma; la nave se dibuja aparte (ERA.deco).
function shipyardArt(){return mkA(64,64,a=>{rect(a,2,50,60,10,STONE2[2]);rect(a,2,50,60,2,STONE2[3]);for(let x=6;x<60;x+=9)rect(a,x,55,5,1,GOLD);
  rect(a,6,8,5,42,GOLD);for(let y=10;y<48;y+=6){line(a,6,y,10,y+5,hx('#a88a3a'),1);}rect(a,6,8,52,4,GOLD);line(a,46,12,46,20,IRON[0],1);rect(a,43,20,7,3,IRON[1]);
  rect(a,50,40,10,10,GLASS[1]);rect(a,50,40,10,1,GLASS[3]);outlineAll(a,OUTL);});}
// Nave de colonización: blanca, con alas cortas y una franja violeta; el segundo cuadro lleva el motor encendido.
function shipArt(f){return mkA(48,40,a=>{poly(a,[[4,20],[30,12],[44,20],[30,28]],(x,y)=>y<20?WHITE[3]:WHITE[1]);rect(a,14,18,22,3,EXO[2]);
  poly(a,[[16,14],[22,4],[26,13]],WHITE[2]);poly(a,[[16,26],[22,36],[26,27]],WHITE[1]);rect(a,34,17,5,3,GLASS[1]);
  if(f){poly(a,[[4,17],[4,23],[-2,20]],hx('#c49cff'));a.set(0,20,hx('#ffffff'));}outlineAll(a,OUTL);});}
// Terraformador: una cúpula de vidrio con plantas y una nube que sale de la chimenea.
function terraformerArt(){return mkA(64,64,a=>{rect(a,6,40,52,20,IRON[2]);rect(a,46,40,12,20,IRON[1]);rect(a,6,40,52,2,IRON[3]);
  ell(a,26,40,18,16,(i,j)=>j<=0?(Math.hypot(i/18,j/16)>0.88?GLASS[3]:GLASS[1]):null);for(const[x,h]of[[18,8],[24,12],[30,9],[36,6]]){rect(a,x,40-h,2,h,LEAF[1]);ell(a,x+1,40-h,3,2.5,LEAF[3]);}
  rect(a,48,16,6,24,IRON[2]);for(const[x,y,r]of[[51,12,5],[46,8,4],[56,6,4]])ell(a,x,y,r,r*0.8,hx('#e8f0f8'));rect(a,14,48,36,3,LEAF[2]);rect(a,26,52,10,8,DKW);outlineAll(a,OUTL);});}
// Colector exótico: una antena que concentra un rayo violeta sobre un cristal.
function collectorArt(){return mkA(64,64,a=>{rect(a,8,48,48,12,DARK[2]);rect(a,8,48,48,2,DARK[3]);
  ell(a,22,24,16,9,(i,j)=>j>=-1?(i<0?hx('#e2e4e8'):hx('#c8ccd2')):null);rect(a,21,30,3,18,IRON[2]);line(a,22,24,44,38,EXO[3],2);
  for(const[x,y,w,h]of[[44,48,5,16],[50,48,3,9]])poly(a,[[x-w,y],[x,y-h],[x+w,y]],(X)=>X<x?EXO[3]:EXO[2]);ell(a,44,38,3,3,EXOL);outlineAll(a,OUTL);});}
// Academia galáctica: un edificio con columnas y una galaxia en espiral arriba.
function galacticAcademyArt(){return mkA(64,64,a=>{rect(a,4,34,56,26,WHITE[2]);rect(a,46,34,14,26,WHITE[1]);rect(a,2,30,60,4,WHITE[3]);for(let x=8;x<56;x+=8)rect(a,x,36,3,24,WHITE[1]);rect(a,26,48,12,12,DKW);
  ell(a,32,15,16,11,(i,j)=>{const d=Math.hypot(i/16,j/11),an=Math.atan2(j/11,i/16);if(d>1)return null;const arm=Math.sin(an*2+d*7);return d<0.25?hx('#ffffff'):arm>0.3?EXO[3]:arm>-0.2?EXO[1]:hx('#1e1a34');});
  outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#e8eef4',C:'#b8c2cc',j:'#c49cff',y:'#3a2418'},{c:'#3a2a5a',C:'#281c40',j:'#5fe3d0',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#2a6a6a',C:'#1c4c4c',j:'#e8eef4',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:exoticOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:[fireArt(0),fireArt(1)],
  casa:arcologyArt(),granja:granjaArt(),aserradero:sawmillArt(),granero:barnArt(),herreria:forgeArt(),cantera:quarryArt(),nucleo:quantumCoreArt(),contencion:containmentArt(),astillero:shipyardArt(),
  terraformador:terraformerArt(),colector:collectorArt(),academia:galacticAcademyArt(),ship:[shipArt(0),shipArt(1)],
  hero:[personArt({c:'#c49cff',C:'#8a5ad0',j:'#2a2a3a'},0),personArt({c:'#c49cff',C:'#8a5ad0',j:'#2a2a3a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
