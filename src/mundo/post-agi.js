// Post-AGI del mundo abierto: iridio, puerto espacial, escudos y meteoritos; la esfera de Dyson. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:11,name:'Post-AGI',de:'de la era post-AGI',next:null,
  ore:{id:'iridio',name:'Iridio',col:'#b8c8e8',empty:'Veta de iridio agotada',gather:'iridio',icon:[['........','..kkkk..','.kqvqqk.','kqqqvqqk','kqvqqqQk','.kqQqQk.','..kkkk..','........'],{q:'#565a6e',Q:'#3a3a48',v:'#b8c8e8'}]},
  storage:{id:'granero',name:'Granero'},ideaBuild:'instituto',ideaTechs:['nanotec','cosmologia'],boostTech:'fusion',farmBuild:'sintetizador',nightTech:'cosmologia',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','centro','escudo','puerto','sintetizador','minero','instituto'],
  meteors:true,
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo10-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era de la AGI',perks:[
    ['agi','ideaMult',1.25,'AGI: ideas +25% durante toda la era'],
    ['automatizacion','agri',1.25,'Automatización: granjas +25%'],
    ['escalado','speed',1.2,'Escalado: te movés 20% más rápido']
  ]},
  techs:[
 {id:'nanotec',name:'Nanotecnología',cost:{iridio:15,ideas:30},req:[],desc:'Desbloquea el centro de la AGI, el taller y la cantera. Ideas +50%.'},
 {id:'escudos',name:'Escudos',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el escudo: desvía los meteoritos que apuntan cerca.'},
 {id:'cohetes',name:'Cohetes reutilizables',cost:{iridio:20,ideas:50},req:['nanotec'],desc:'Desbloquea el puerto espacial, que da monedas.'},
 {id:'sintesis',name:'Síntesis de alimentos',cost:{madera:40,piedra:20,ideas:65},req:['nanotec'],desc:'Desbloquea el sintetizador, que potencia las granjas.'},
 {id:'mineria',name:'Minería de asteroides',cost:{madera:60,iridio:20,ideas:95},req:['cohetes'],desc:'Desbloquea la mina de asteroides, que da iridio. Caen 30% más meteoritos.'},
 {id:'radar',name:'Radar orbital',cost:{monedas:30,ideas:130},req:['escudos','cohetes'],desc:'Los meteoritos tardan 50% más en caer: hay más tiempo para tocarlos.'},
 {id:'cosmologia',name:'Cosmología',cost:{monedas:55,ideas:340},req:['radar','mineria'],desc:'Desbloquea el instituto del espacio. Ideas +50% y de noche ves más lejos.'},
 {id:'fusion',name:'Fusión nuclear',cost:{iridio:70,monedas:55,ideas:450},req:['cohetes','radar'],desc:'Todo produce +50%.'},
 {id:'dyson',name:'Esfera de Dyson',cost:{piedra:130,iridio:110,monedas:130,ideas:1000},req:['cosmologia','fusion'],desc:'Un enjambre de espejos alrededor del Sol: toda su energía para la humanidad. Cierra la era post-AGI.'}],
  builds:[
 {id:'casa',name:'Hábitat',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Hábitat listo: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',name:'Granja',req:null,base:{madera:12,comida:4},grow:1.25,done:'Granja lista',desc:'Produce comida sola.',prod:{comida:0.2},noSand:true},
 {id:'fogata',name:'Fogata',req:null,base:{madera:5,piedra:4},grow:1.6,done:'Fogata encendida',desc:'Genera ideas y alumbra de noche. Comer cerca rinde el doble.',prod:{ideas:0.12}},
 {id:'aserradero',name:'Aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,done:'Aserradero listo',desc:'Produce madera solo.',prod:{madera:0.12}},
 {id:'granero',name:'Granero',req:null,base:{madera:25,piedra:15},grow:1.4,done:'Granero construido',desc:'+150 de capacidad para cada recurso. Las ideas no tienen límite.'},
 {id:'herreria',name:'Taller',req:'nanotec',base:{madera:25,piedra:20,iridio:10},grow:1.6,done:'Taller listo',desc:'Herramientas de nanotecnología: vos y los aldeanos juntan +30% por cada taller.'},
 {id:'cantera',name:'Cantera',req:'nanotec',base:{madera:20,iridio:8},grow:1.35,done:'Cantera lista',desc:'Produce piedra sola.',prod:{piedra:0.12}},
 {id:'centro',name:'Centro de la AGI',req:'nanotec',base:{piedra:40,iridio:10},grow:1.5,done:'Centro de la AGI encendido',desc:'La AGI piensa con vos: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'escudo',name:'Escudo',req:'escudos',base:{madera:25,piedra:25,iridio:5},grow:1.4,done:'Escudo encendido',desc:'Desvía los meteoritos que apuntan a 5 casilleros o menos.'},
 {id:'puerto',name:'Puerto espacial',req:'cohetes',base:{madera:30,piedra:25,iridio:5},grow:1.4,done:'Puerto espacial abierto',desc:'Los cohetes comercian con las colonias: da muchas monedas.',prod:{monedas:0.45}},
 {id:'sintetizador',name:'Sintetizador',req:'sintesis',base:{madera:35,piedra:30},grow:1.6,done:'Sintetizador listo',desc:'Cada sintetizador hace rendir +50% a todas las granjas.'},
 {id:'minero',name:'Mina de asteroides',req:'mineria',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Mina de asteroides lista',desc:'Trae iridio de los asteroides.',prod:{iridio:0.12}},
 {id:'instituto',name:'Instituto del espacio',req:'cosmologia',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Instituto abierto',desc:'Ideas +30% por cada instituto.'}],
  info:{casa:'Hábitat: acá viven 2 aldeanos.',granja:'Granja: produce comida.',fogata:'Fogata: genera ideas. Comer cerca rinde el doble.',aserradero:'Aserradero: produce madera.',granero:'Granero: más capacidad.',herreria:'Taller: juntás más rápido.',cantera:'Cantera: produce piedra.',centro:'Centro de la AGI: genera ideas.',escudo:'Escudo: desvía los meteoritos que apuntan a 5 casilleros o menos.',puerto:'Puerto espacial: da monedas.',sintetizador:'Sintetizador: potencia las granjas.',minero:'Mina de asteroides: da iridio.',instituto:'Instituto del espacio: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['escudos','escudo','un escudo: desvía los meteoritos que caen cerca.']],
  tips2:[['nanotec','centro','un centro de la AGI: genera muchísimas ideas.'],['cohetes','puerto','un puerto espacial para conseguir monedas.'],['sintesis','sintetizador','un sintetizador: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era post-AGI completa.',
  // Cada puerto lanza un cohete cada 24 s; el resto del tiempo el cohete espera en la plataforma.
  deco:(o,px,py)=>{if(o.t!=='puerto'||o.bug)return;const ph=(st.time/24+((px*7+py*3)%24)/24)%1;
    if(ph<0.22){const h=ph/0.22;hd(HS.rocket[1],px+8,py+2-h*h*40);}else if(ph>0.35)hd(HS.rocket[0],px+8,py+2);},
  text:{
    when:'2045 d.C.',title:'Después de la AGI',
    intro:'Con una AGI segura de tu lado, la humanidad sale al espacio: cohetes que van y vienen, minas en los asteroides y piedras que se desvían de su camino. Tocá los meteoritos antes de que caigan sobre tus edificios, o dejalos caer en tierra libre y aprovechá el iridio del cráter. La meta: la esfera de Dyson, toda la energía del Sol.',
    news:'Novedades: iridio, puerto espacial, escudos y meteoritos. Un edificio dañado no produce hasta que lo reparás tocándolo. Cuanto más avanzás, más seguido caen.',
    legacy:'Lo que trae tu ciudad de la era de la AGI',
    noLegacy:'No hay una AGI terminada en este navegador: arrancás con 2 aldeanos. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del granero, lo que sobra se pierde. Caen meteoritos: tocalos antes de que lleguen. Si caen sobre un edificio lo dañan y hay que tocarlo para repararlo; en tierra libre dejan un cráter con iridio. Los escudos desvían los que apuntan cerca. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'La esfera de Dyson',winText:()=>'Terminaste la esfera de Dyson en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Toda la energía del Sol, para la humanidad y su AGI.',
    winNote:'Es un prototipo: no suma al progreso de las eras. Por ahora es la última era.'}
};

/* ---------- arte de la era ---------- */
const SPACE=P4('#2a2a34','#3a3a48','#565a6e','#7a8098'),IRID=hx('#b8c8e8'),CYAN=hx('#5fe3d0');
// Veta de iridio: un meteorito oscuro con brillos metálicos.
function iridiumOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],SPACE,null);
  const r=mulberry32(41);for(let k=0;k<14;k++){const x=14+Math.floor(r()*36),y=18+Math.floor(r()*24);if(a.get(x,y)&&a.get(x+2,y+1)){rect(a,x,y,2,1,IRID);a.set(x,y-1,hx('#e8f0ff'));}}
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Hábitat: torre blanca con terrazas verdes y una cúpula.
function habitatArt(){return mkA(64,64,a=>{const WH=P4('#a8b4c0','#c8d2dc','#e6ecf2','#ffffff');
  poly(a,[[14,60],[20,14],[44,14],[50,60]],(x,y)=>x>40?WH[1]:WH[2]);
  for(const y of[24,36,48]){rect(a,16,y,32,3,LEAF[2]);for(let x=17;x<47;x+=4)ell(a,x,y,2,1.6,LEAF[3]);}
  for(const y of[18,30,42])for(let x=24;x<42;x+=6)rect(a,x,y,3,4,GLASS[1]);
  rect(a,28,52,8,8,DKW);ell(a,32,13,10,4,(i,j)=>j<=0?CYAN:null);outlineAll(a,OUTL);});}
// Centro de la AGI: un pedestal oscuro con un anillo que flota alrededor de un núcleo de luz.
function agiCenterArt(){return mkA(64,64,a=>{const BK=P4('#14161c','#20242e','#2e3440','#404858');
  rect(a,8,40,48,20,BK[2]);rect(a,44,40,12,20,BK[1]);rect(a,8,40,48,2,BK[3]);for(let x=12;x<44;x+=6)rect(a,x,46,3,10,CYAN);
  ell(a,32,22,16,16,(i,j)=>{const d=Math.hypot(i,j);return d>12.5?hx('#c8ccd2'):d>11?hx('#8a93a3'):null;});
  ell(a,32,22,7,7,(i,j)=>Math.hypot(i,j)<4?hx('#ffffff'):CYAN);rect(a,30,36,4,4,BK[3]);outlineAll(a,OUTL);});}
// Escudo: un generador con una antena y la cúpula de energía que lo cubre.
function shieldArt(){return mkA(64,64,a=>{ell(a,32,42,29,27,(i,j)=>j<=0&&Math.hypot(i/29,j/27)>0.9?hx('#7fe8dc'):null);
  rect(a,18,44,28,16,STONE2[2]);rect(a,38,44,8,16,STONE2[1]);rect(a,18,44,28,2,STONE2[3]);
  rect(a,30,22,4,22,IRON[2]);ell(a,32,22,6,6,CYAN);ell(a,31,21,3,3,hx('#e8fff8'));rect(a,26,52,12,8,DKW);
  outlineAll(a,OUTL);});}
// Puerto espacial: plataforma de lanzamiento con torre y control; el cohete se dibuja aparte (ERA.deco).
function spaceportArt(){return mkA(64,64,a=>{rect(a,4,48,56,12,STONE2[2]);rect(a,4,48,56,2,STONE2[3]);for(let x=8;x<58;x+=10)rect(a,x,53,6,1,GOLD);
  rect(a,10,10,6,38,IRON[2]);for(let y=12;y<46;y+=6){line(a,10,y,15,y+5,IRON[1],1);line(a,15,y,10,y+5,IRON[1],1);}rect(a,16,20,12,2,IRON[1]);
  ell(a,40,50,10,3,hx('#2a2a3a'));rect(a,48,38,10,10,GLASS[1]);rect(a,48,38,10,1,GLASS[3]);outlineAll(a,OUTL);});}
// Cohete reutilizable: blanco con punta roja; el segundo cuadro lleva la llama.
function rocketArt(f){return mkA(16,40,a=>{poly(a,[[8,0],[12,8],[12,28],[4,28],[4,8]],(x,y)=>y<8?hx('#e8654d'):x>9?hx('#c8d2dc'):hx('#ffffff'));
  rect(a,6,12,4,3,GLASS[1]);poly(a,[[4,20],[1,30],[4,28]],hx('#e8654d'));poly(a,[[12,20],[15,30],[12,28]],hx('#e8654d'));
  if(f){poly(a,[[5,29],[11,29],[8,39]],hx('#ffd35a'));poly(a,[[6,29],[10,29],[8,35]],hx('#fff3b0'));}outlineAll(a,OUTL);});}
// Sintetizador: tanques de vidrio con nutrientes verdes sobre una máquina.
function synthArt(){return mkA(64,64,a=>{rect(a,6,34,52,26,IRON[2]);rect(a,44,34,14,26,IRON[1]);rect(a,6,34,52,2,IRON[3]);
  for(const x of[12,26,40]){rect(a,x,14,10,24,GLASS[2]);rect(a,x,26,10,12,hx('#7fd06a'));rect(a,x,14,10,2,GLASS[3]);rect(a,x+2,28,2,6,hx('#c8f0a8'));}
  rect(a,10,44,44,3,CYAN);rect(a,26,50,12,10,DKW);outlineAll(a,OUTL);});}
// Mina de asteroides: un pedazo de asteroide sobre la plataforma y la grúa que lo trae.
function asteroidMineArt(){return mkA(64,64,a=>{rect(a,4,50,56,10,STONE2[1]);rect(a,4,50,56,2,STONE2[3]);
  blob(a,[[34,36,13],[24,40,9],[44,42,8]],SPACE,null);for(const[x,y]of[[30,32],[38,38],[26,40],[42,34]])rect(a,x,y,2,1,IRID);
  rect(a,8,8,4,42,GOLD);rect(a,8,8,30,3,GOLD);line(a,34,11,34,22,IRON[0],1);rect(a,31,22,7,3,IRON[1]);outlineAll(a,OUTL);});}
// Instituto del espacio: edificio con una antena parabólica grande.
function spaceInstArt(){return mkA(64,64,a=>{const CN=P4('#6a7a8a','#8a9aaa','#aabaca','#cad8e6');
  rect(a,4,34,56,26,CN[2]);rect(a,46,34,14,26,CN[1]);rect(a,2,30,60,4,CN[3]);for(let x=8;x<44;x+=7)rect(a,x,40,4,10,GLASS[1]);rect(a,26,50,10,10,DKW);
  ell(a,36,16,14,8,(i,j)=>j>=-1?(i<0?hx('#e2e4e8'):hx('#c8ccd2')):null);rect(a,35,20,3,10,IRON[1]);line(a,36,16,30,6,IRON[1],1);ell(a,30,6,1.5,1.5,hx('#e8654d'));
  outlineAll(a,OUTL);});}
// Meteorito: roca con un borde encendido que titila.
function meteorArt(f){return mkA(32,32,a=>{ell(a,16,16,10,10,f?hx('#ffb050'):hx('#f08a24'));blob(a,[[16,16,7],[13,13,4]],P4('#3a3238','#54484e','#6e6266','#8a7e80'),null);
  for(const[x,y]of[[14,15],[18,18],[17,12]])a.set(x,y,hx('#2a2228'));outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#e8eef4',C:'#b8c2cc',j:'#5fe3d0',y:'#3a2418'},{c:'#3a4a6a',C:'#28344e',j:'#e8c05a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#7a4a8a',C:'#583468',j:'#e8eef4',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:iridiumOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:[fireArt(0),fireArt(1)],
  casa:habitatArt(),granja:granjaArt(),aserradero:sawmillArt(),granero:barnArt(),herreria:forgeArt(),cantera:quarryArt(),centro:agiCenterArt(),escudo:shieldArt(),puerto:spaceportArt(),
  sintetizador:synthArt(),minero:asteroidMineArt(),instituto:spaceInstArt(),meteor:[meteorArt(0),meteorArt(1)],rocket:[rocketArt(0),rocketArt(1)],
  hero:[personArt({c:'#5fe3d0',C:'#3fa89c',j:'#2a2a3a'},0),personArt({c:'#5fe3d0',C:'#3fa89c',j:'#2a2a3a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
