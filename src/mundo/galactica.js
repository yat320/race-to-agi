// Era galáctica del mundo abierto (la que sigue a la interestelar): neutronio, torres de interferencia y ovnis que se llevan a tu gente; la federación galáctica. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:13,name:'Era galáctica',de:'de la era galáctica',next:{file:'mundo14.html',to:'a la era intergaláctica'},
  ore:{id:'neutronio',name:'Neutronio',col:'#8ab0f0',empty:'Veta de neutronio agotada',gather:'neutronio',icon:[['........','..kkkk..','.kqvqqk.','kqqvQqqk','kqQvvqQk','.kqQqqk.','..kkkk..','........'],{q:'#2a3a6a',Q:'#1a2440',v:'#e8f4ff'}]},
  storage:{id:'granero'},ideaBuild:'observatorio',ideaTechs:['neutronio','cartografia'],boostTech:'energia',farmBuild:'jardin',nightTech:'cartografia',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','archivo','interferencia','mercado','jardin','forja','observatorio'],
  ufos:true,defense:{id:'interferencia',r:4,label:'Interferencia'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'agente',building:'Agencia',unit:'Agente',done:'Agencia lista: llegó un agente',desc:'Trae un agente que sale solo a espantar ovnis, a 8 casilleros o menos.',info:'Agencia: su agente espanta ovnis cerca.',tip:'una agencia: el agente sale solo a espantar ovnis.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo12-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era interestelar',perks:[
    ['curvatura','ideaMult',1.25,'Motor de curvatura: ideas +25% durante toda la era'],
    ['terraformacion','agri',1.25,'Terraformación: granjas +25%'],
    ['naves','speed',1.2,'Naves de colonización: te movés 20% más rápido']
  ]},
  techs:[
 {id:'neutronio',name:'Física de neutrones',cost:{neutronio:15,ideas:30},req:[],desc:'Desbloquea el archivo galáctico, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'interferencia',name:'Interferencia',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea la torre de interferencia: los ovnis no se llevan a nadie cerca.'},
 {id:'comercio',name:'Comercio galáctico',cost:{neutronio:20,ideas:50},req:['neutronio'],desc:'Desbloquea el mercado galáctico, que da monedas.'},
 {id:'xenoagro',name:'Xenoagricultura',cost:{madera:40,piedra:20,ideas:65},req:['neutronio'],desc:'Desbloquea el jardín alienígena, que potencia las granjas.'},
 {id:'forjas',name:'Forjas estelares',cost:{madera:60,neutronio:20,ideas:95},req:['comercio'],desc:'Desbloquea la forja de neutronio. Los ovnis vienen 30% más seguido.'},
 {id:'lenguas',name:'Lenguas alienígenas',cost:{monedas:30,ideas:130},req:['interferencia','comercio'],desc:'Los ovnis tardan 50% más en llevarse a alguien: hay más tiempo para espantarlos.'},
 {id:'cartografia',name:'Cartografía galáctica',cost:{monedas:55,ideas:340},req:['lenguas','forjas'],desc:'Desbloquea el observatorio galáctico. Ideas +50% y de noche ves más lejos.'},
 {id:'energia',name:'Energía del vacío',cost:{neutronio:70,monedas:55,ideas:450},req:['comercio','lenguas'],desc:'Todo produce +50%.'},
 {id:'federacion',name:'Federación galáctica',cost:{piedra:130,neutronio:110,monedas:130,ideas:1000},req:['cartografia','energia'],desc:'La humanidad se une a las otras civilizaciones de la galaxia. Cierra la era galáctica.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa flotante',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa flotante lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'neutronio',base:{madera:25,piedra:20,neutronio:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'neutronio',base:{madera:20,neutronio:8},grow:1.35,prod:{piedra:0.12}},
 {id:'archivo',name:'Archivo galáctico',req:'neutronio',base:{piedra:40,neutronio:10},grow:1.5,done:'Archivo galáctico abierto',desc:'Lo que saben las otras civilizaciones: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'interferencia',name:'Torre de interferencia',req:'interferencia',base:{madera:25,piedra:25,neutronio:5},grow:1.4,done:'Torre de interferencia encendida',desc:'Los ovnis no se llevan a nadie a 4 casilleros o menos: los espanta.'},
 {id:'mercado',name:'Mercado galáctico',req:'comercio',base:{madera:30,piedra:25,neutronio:5},grow:1.4,done:'Mercado galáctico abierto',desc:'Se comercia con otras especies: da muchas monedas.',prod:{monedas:0.45}},
 {id:'jardin',name:'Jardín alienígena',req:'xenoagro',base:{madera:35,piedra:30},grow:1.6,done:'Jardín alienígena plantado',desc:'Cada jardín alienígena hace rendir +50% a todas las granjas.'},
 {id:'forja',name:'Forja de neutronio',req:'forjas',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Forja de neutronio encendida',desc:'Hace neutronio sola.',prod:{neutronio:0.12}},
 {id:'observatorio',name:'Observatorio galáctico',req:'cartografia',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Observatorio abierto',desc:'Ideas +30% por cada observatorio.'}],
  info:{casa:'Casa flotante: acá viven 2 aldeanos.',herreria:'Nanotaller: los aldeanos juntan más rápido.',archivo:'Archivo galáctico: genera ideas.',interferencia:'Torre de interferencia: los ovnis no se llevan a nadie a 4 casilleros o menos.',mercado:'Mercado galáctico: da monedas.',jardin:'Jardín alienígena: potencia las granjas.',forja:'Forja de neutronio: da neutronio.',observatorio:'Observatorio galáctico: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['interferencia','interferencia','una torre de interferencia: los ovnis no se llevan a nadie cerca.']],
  tips2:[['neutronio','archivo','un archivo galáctico: genera muchísimas ideas.'],['comercio','mercado','un mercado galáctico para conseguir monedas.'],['xenoagro','jardin','un jardín alienígena: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era galáctica completa.',
  // Cada torre de interferencia larga ondas violetas desde la antena.
  deco:(o,px,py)=>{if(o.t!=='interferencia'||o.bug)return;const ph=(st.time/1.6+((px*3+py*5)%16)/16)%1;
    ctx.strokeStyle='rgba(208,140,255,'+(0.75*(1-ph)).toFixed(2)+')';ctx.lineWidth=1;ctx.beginPath();ctx.ellipse(px+8,py+2.5,2+ph*10,1+ph*4,0,0,Math.PI*2);ctx.stroke();},
  text:{
    when:'2300 d.C.',title:'La era galáctica',
    intro:'Con el motor de curvatura, la humanidad sale a la galaxia y descubre que no está sola. Llegan ovnis curiosos que se llevan a tu gente con un rayo para estudiarla. Tocalos para espantarlos, o poné torres de interferencia cerca de donde trabajan. La meta: la federación galáctica, la paz con las otras civilizaciones.',
    news:'Novedades: neutronio, torres de interferencia y ovnis. Un ovni sigue a un aldeano o a un robot y lo levanta con un rayo; si nadie lo espanta, se lo lleva y lo devuelven a los 3 minutos. Cuanto más avanzás, más seguido vienen.',
    legacy:'Lo que trae tu ciudad de la era interestelar',
    noLegacy:'No hay una era interestelar terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o una veta y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Llegan ovnis: siguen a alguien de tu gente y lo levantan con un rayo. Tocalos para espantarlos; si no, se lo llevan y lo devuelven a los 3 minutos. Cerca de una torre de interferencia no se llevan a nadie. En la compu: flechas o WASD.',
    win:'La federación galáctica',winText:()=>'Terminaste la federación galáctica en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. La humanidad ya no está sola: tiene amigos entre las estrellas.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan a la era intergaláctica.'}
};
/* ---------- arte de la era ---------- */
const NEU=P4('#1a2440','#2a3a6a','#4a6aa8','#8ab0f0'),NEUL=hx('#e8f4ff'),CYAN=hx('#5fe3d0'),VIO=hx('#d08cff'),WHITE=P4('#a8b4c0','#c8d2dc','#e6ecf2','#ffffff'),DARK=P4('#14161c','#20242e','#2e3440','#404858');
// Veta de neutronio: roca azul oscura y pesada con vetas que brillan.
function neutronOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],NEU,null);
  for(const[x0,y0,x1,y1]of[[22,22,30,34],[38,24,44,36],[27,40,35,37]])line(a,x0,y0,x1,y1,NEU[3],1);
  const r=mulberry32(53);for(let k=0;k<10;k++){const x=14+Math.floor(r()*36),y=18+Math.floor(r()*24);if(a.get(x,y)&&a.get(x+1,y+1)){a.set(x,y,NEUL);a.set(x+1,y,NEU[3]);a.set(x,y-1,NEU[3]);}}
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa flotante: una casa redonda con plantas en el techo, sobre un disco que flota con una luz abajo.
function floatHouseArt(){return mkA(64,64,a=>{ell(a,32,58,14,2.5,hx('#7fe8dc'));
  ell(a,32,46,26,5,(i,j)=>j<0?WHITE[2]:WHITE[0]);rect(a,8,46,48,2,CYAN);
  rect(a,14,24,36,20,WHITE[2]);rect(a,40,24,10,20,WHITE[1]);ell(a,32,24,18,10,(i,j)=>j<=0?(i>10?WHITE[1]:WHITE[3]):null);
  for(const x of[22,40])ell(a,x,32,4,4,(i,j)=>i<0&&j<0?GLASS[3]:GLASS[1]);rect(a,28,34,8,10,DKW);blob(a,[[24,14,4],[31,12,4],[38,15,3]],LEAF,null);
  outlineAll(a,OUTL);});}
// Archivo galáctico: un obelisco oscuro con signos que brillan y dos anillos que flotan alrededor.
function archiveArt(){return mkA(64,64,a=>{rect(a,10,50,44,10,DARK[2]);rect(a,10,50,44,2,DARK[3]);
  poly(a,[[22,50],[26,12],[38,12],[42,50]],(x)=>x>34?DARK[1]:DARK[2]);poly(a,[[26,12],[32,3],[38,12]],DARK[3]);
  for(let y=16;y<48;y+=6){rect(a,29,y,6,1,NEU[3]);a.set(30+((y>>1)%4),y+2,CYAN);}
  for(const y of[22,38])ell(a,32,y,18,4,(i,j)=>{const d=Math.hypot(i/18,j/4);return d>0.72&&(j>0||Math.abs(i)>9)?(j>0?CYAN:hx('#3fa89c')):null;});
  outlineAll(a,OUTL);});}
// Torre de interferencia: una torre reticulada con una esfera violeta arriba (las ondas se dibujan aparte, ERA.deco).
function jammerArt(){return mkA(64,64,a=>{rect(a,16,52,32,8,STONE2[2]);rect(a,16,52,32,2,STONE2[3]);
  const lx=y=>22+(52-y)*7/38,rx=y=>42-(52-y)*7/38;line(a,22,52,29,14,IRON[2],2);line(a,42,52,35,14,IRON[2],2);
  for(let y=16;y<48;y+=8){line(a,lx(y),y,rx(y+8),y+8,IRON[1],1);line(a,rx(y),y,lx(y+8),y+8,IRON[1],1);}
  rect(a,28,12,8,3,IRON[3]);ell(a,32,8,6,6,(i,j)=>Math.hypot(i+1.5,j+1.5)<2.2?hx('#ffffff'):i+j<0?VIO:hx('#9a5ac8'));
  outlineAll(a,OUTL);});}
// Mercado galáctico: puestos bajo un toldo a rayas, con frutos de otros planetas que brillan.
function marketArt(){return mkA(64,64,a=>{rect(a,4,36,56,24,WHITE[2]);rect(a,46,36,14,24,WHITE[1]);ell(a,32,22,10,8,(i,j)=>j<=0?(i<-3&&j<-3?GLASS[3]:GLASS[2]):null);
  for(let x=2;x<62;x++){const c=((x>>2)&1)?VIO:CYAN;rect(a,x,24,1,12,c);if(x%4<2)a.set(x,36,c);}
  for(const x of[8,26]){rect(a,x,42,14,14,DKW);rect(a,x,54,14,2,WOOD[2]);}
  for(const[x,c]of[[12,CYAN],[17,hx('#ffd35a')],[30,VIO],[35,hx('#ff8ab0')]])ell(a,x,51,2.5,2.5,c);
  rect(a,44,42,12,8,GOLD);rect(a,46,45,8,1,WOOD[2]);outlineAll(a,OUTL);});}
// Jardín alienígena: plantas de tallo violeta con bulbos que brillan, en un cantero con postes blancos.
function alienGardenArt(){return mkA(64,64,a=>{rect(a,4,42,56,16,SOIL[1]);rect(a,4,42,56,2,SOIL[2]);for(let x=6;x<58;x+=6)rect(a,x,50,3,1,SOIL[0]);
  for(const[x,h,c]of[[10,22,CYAN],[20,30,VIO],[30,18,hx('#ff8ab0')],[40,28,CYAN],[50,20,VIO]]){line(a,x,54,x+2,54-h,hx('#6a2a7a'),2);ell(a,x+2,54-h,4,5,c);a.set(x+1,52-h,hx('#ffffff'));ell(a,x-2,54-h*0.5,2,1.5,LEAF[2]);}
  for(const x of[4,58])rect(a,x,38,2,20,WHITE[2]);rect(a,4,57,56,2,WHITE[1]);outlineAll(a,OUTL);});}
// Forja de neutronio: una prensa pesada con el núcleo azul que brilla, dos pistones y caños.
function neutronForgeArt(){return mkA(64,64,a=>{rect(a,6,26,52,34,IRON[2]);rect(a,46,26,12,34,IRON[1]);rect(a,6,26,52,3,IRON[3]);
  ell(a,24,44,10,10,(i,j)=>{const d=Math.hypot(i,j);return d<3?NEUL:d<6?NEU[3]:d<8.5?NEU[2]:IRON[0];});
  for(const[x,y]of[[10,8],[38,12]]){rect(a,x+2,y+3,6,26-y-3,WHITE[1]);rect(a,x+2,y+3,2,26-y-3,WHITE[3]);rect(a,x,y,10,3,IRON[3]);}
  rect(a,46,38,12,3,COPPER[1]);rect(a,46,46,12,3,COPPER[1]);rect(a,40,50,4,10,DKW);outlineAll(a,OUTL);});}
// Observatorio galáctico: una cúpula blanca con un telescopio grande y estrellas alrededor.
function observatoryArt(){return mkA(64,64,a=>{rect(a,8,36,48,24,WHITE[2]);rect(a,44,36,12,24,WHITE[1]);rect(a,6,34,52,3,WHITE[3]);
  ell(a,30,34,18,16,(i,j)=>j<=0?(i>8?WHITE[1]:WHITE[3]):null);rect(a,27,19,5,15,DARK[1]);line(a,30,27,47,10,IRON[2],4);ell(a,48,9,3,3,GLASS[2]);
  rect(a,26,48,10,12,DKW);for(const x of[12,40])rect(a,x,42,4,4,CYAN);outlineAll(a,OUTL);for(const[x,y]of[[8,10],[14,4],[56,26],[60,16]]){a.set(x,y,NEUL);a.set(x+1,y,NEU[3]);a.set(x-1,y,NEU[3]);a.set(x,y+1,NEU[3]);a.set(x,y-1,NEU[3]);}});}
// Ovni: un plato plateado con luces que se prenden de a una y una cúpula con un extraterrestre curioso adentro.
function ufoArt(f){return mkA(64,40,a=>{const M=P4('#5a6270','#8a93a3','#b8c0cc','#dfe4ea');
  ell(a,32,16,14,11,(i,j)=>j<=2?(i<-4&&j<-5?GLASS[3]:GLASS[1]):null);ell(a,32,16,5,5,hx('#7ad870'));rect(a,29,15,2,3,DKW);rect(a,33,15,2,3,DKW);
  ell(a,32,25,30,8,(i,j)=>j<-2?M[3]:j<1?M[2]:M[1]);ell(a,32,31,11,3,hx('#7fe8dc'));
  for(let k=0;k<6;k++)rect(a,7+k*10,24,3,3,(k+f)%2?hx('#ffd35a'):hx('#e8654d'));outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#e8eef4',C:'#b8c2cc',j:'#8ab0f0',y:'#3a2418'},{c:'#2a3a6a',C:'#1a2440',j:'#d08cff',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#5a2a6a',C:'#3c1c48',j:'#5fe3d0',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:neutronOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:floatHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),archivo:archiveArt(),interferencia:jammerArt(),mercado:marketArt(),
  jardin:alienGardenArt(),forja:neutronForgeArt(),observatorio:observatoryArt(),ufo:[ufoArt(0),ufoArt(1)],
  hero:[personArt({c:'#8ab0f0',C:'#4a6aa8',j:'#2a2a3a'},0),personArt({c:'#8ab0f0',C:'#4a6aa8',j:'#2a2a3a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
