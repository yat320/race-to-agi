// Antigüedad del mundo abierto: cobre, monedas, depósitos y el mecanismo de Anticitera. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:2,name:'Antigüedad',de:'de la Antigüedad',next:{file:'mundo3.html',to:'a la Edad Media'},
  ore:{id:'cobre',name:'Cobre',col:'#f0a066',empty:'Veta de cobre agotada',gather:'cobre',icon:[['........','..kkkk..','.kqqQqk.','kqvqqQqk','kqqqQqQk','kQqqqQQk','.kkkkkk.','........']]},
  storage:{id:'deposito',name:'Depósito'},ideaBuild:'biblioteca',ideaTechs:['escritura','matematica','astronomia'],boostTech:'engranajes',farmBuild:'acueducto',nightTech:'astronomia',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','templo','puerto','atalaya'],
  // Piratas desde que hay monedas; las atalayas los echan.
  pirates:'moneda',defense:{id:'atalaya',r:4,label:'Atalayas'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo-v1',st:true,aldeanos:6,ideas:150,monedas:0,mudan:' aldeanos de tu tribu viven en la casa comunal',de:'de la Prehistoria',perks:[
    ['abaco','ideaMult',1.25,'Ábaco: ideas +25% durante toda la era'],
    ['rueda','speed',1.2,'Rueda: te movés 20% más rápido'],
    ['agricultura','agri',1.25,'Agricultura: granjas +25%']
  ]},
  techs:[
 {id:'metalurgia',name:'Metalurgia del cobre',cost:{cobre:15,ideas:20},req:[],desc:'Desbloquea la herrería, la cantera y la atalaya.'},
 {id:'escritura',name:'Escritura',cost:{piedra:15,ideas:30},req:[],desc:'Desbloquea el templo. Ideas +50%.'},
 {id:'moneda',name:'Moneda',cost:{cobre:20,ideas:45},req:['metalurgia'],desc:'Desbloquea el mercado, que cambia comida por monedas. Con las monedas llegan los piratas.'},
 {id:'irrigacion',name:'Irrigación',cost:{piedra:40,ideas:60},req:['escritura'],desc:'Desbloquea el acueducto, que potencia las granjas.'},
 {id:'navegacion',name:'Navegación',cost:{madera:60,cobre:20,ideas:90},req:['moneda'],desc:'Desbloquea el puerto: comercio con otros pueblos. Atrae 30% más piratas.'},
 {id:'matematica',name:'Matemática',cost:{monedas:25,ideas:120},req:['escritura','moneda'],desc:'Desbloquea la biblioteca. Ideas +50%.'},
 {id:'astronomia',name:'Astronomía',cost:{monedas:40,ideas:250},req:['navegacion','matematica'],desc:'Ideas +50%. De noche ves más lejos.'},
 {id:'engranajes',name:'Engranajes',cost:{cobre:50,monedas:40,ideas:300},req:['metalurgia','matematica'],desc:'Todos los edificios producen +50%.'},
 {id:'anticitera',name:'Mecanismo de Anticitera',cost:{piedra:100,cobre:80,monedas:80,ideas:600},req:['astronomia','engranajes'],desc:'Una computadora de engranajes que predice el movimiento de los astros. Cierra la Antigüedad.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'deposito',name:'Depósito',req:null,base:{madera:25,piedra:15},grow:1.4,done:'Depósito construido',desc:'+150 de capacidad para cada recurso. Las ideas no tienen límite.'},
 {id:'herreria',name:'Herrería',req:'metalurgia',base:{madera:25,piedra:20,cobre:10},grow:1.6,done:'Herrería lista',desc:'Herramientas de cobre: vos y los aldeanos juntan +30% por cada herrería.'},
 {id:'cantera',req:'metalurgia',base:{madera:20,cobre:8},grow:1.35,prod:{piedra:0.12}},
 {id:'atalaya',name:'Atalaya',req:'metalurgia',base:{madera:20,piedra:20,cobre:5},grow:1.4,done:'Atalaya construida',desc:'Sus guardias echan a los piratas que pasan a 4 casilleros o menos.'},
 {id:'templo',name:'Templo',req:'escritura',base:{piedra:40,cobre:15},grow:1.5,done:'Templo construido',desc:'Los escribas del templo generan muchas ideas.',prod:{ideas:0.35}},
 {id:'mercado',name:'Mercado',req:'moneda',base:{madera:30,piedra:15,cobre:5},grow:1.4,done:'Mercado abierto',desc:'Cambia comida por monedas. Si no hay comida, se frena.',prod:{monedas:0.12},use:{comida:0.2}},
 {id:'acueducto',name:'Acueducto',req:'irrigacion',base:{piedra:50,cobre:15},grow:1.6,done:'Acueducto terminado',desc:'Cada acueducto hace producir +50% a todas las granjas.'},
 {id:'puerto',name:'Puerto',req:'navegacion',base:{madera:40,cobre:20},grow:1.5,done:'Puerto abierto',desc:'Va pegado al agua. El comercio trae monedas e ideas.',prod:{monedas:0.2,ideas:0.1},water:'El puerto tiene que ir pegado al agua.'},
 {id:'biblioteca',name:'Biblioteca',req:'matematica',base:{madera:30,piedra:30,monedas:25},grow:1.6,done:'Biblioteca abierta',desc:'Ideas +30% por cada biblioteca.'}],
  info:{atalaya:'Atalaya: echa a los piratas que pasan cerca.',casa:'Casa: acá viven 2 aldeanos.',deposito:'Depósito: más capacidad.',herreria:'Herrería: juntás más rápido.',templo:'Templo: genera ideas.',mercado:'Mercado: cambia comida por monedas.',acueducto:'Acueducto: potencia las granjas.',puerto:'Puerto: trae monedas e ideas.',biblioteca:'Biblioteca: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['moneda','atalaya','una atalaya: echa a los piratas que desembarcan.']],
  tips2:[['escritura','templo','un templo: genera muchas ideas.'],['moneda','mercado','un mercado para conseguir monedas.'],['navegacion','puerto','un puerto pegado al agua.']],
  smogTip:'',done:'Antigüedad completa.',
  text:{
    when:'3.000 a.C.',title:'La Antigüedad',
    intro:'Tu tribu ya es un pueblo. Ahora hay cobre en las colinas, comercio por el mar y escribas que anotan todo. Pero el comercio atrae piratas: desembarcan a robar tus monedas y tu cobre. La meta: construir el mecanismo de Anticitera, la primera computadora de la historia.',
    news:'Novedades: 13 edificios, cobre y monedas, depósitos con capacidad, la hoja Tribu para decidir qué juntan tus aldeanos, y piratas: tocalos antes de que roben, o antes de que vuelvan al barco para recuperar lo robado. Las atalayas echan a los que pasan cerca.',
    legacy:'Tu legado de la Prehistoria',
    noLegacy:'No hay legado de la Prehistoria en este navegador: arrancás con 2 aldeanos. Podés cargar un código desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un depósito se llena, lo que sobra se pierde. Cuando tengas monedas llegan piratas por mar: tocalos antes de que roben, o recuperá lo que se llevan tocándolos antes de que lleguen al barco. Las atalayas echan a los que pasan cerca. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'Antigüedad superada',winText:()=>'Terminaste el mecanismo de Anticitera en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. La humanidad ya sabe construir máquinas que calculan.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan a la Edad Media.'}
};

/* ---------- arte de la era ---------- */
function oreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],ROCK,null);
  const r=mulberry32(9);for(let k=0;k<12;k++){const x=12+Math.floor(r()*40),y=16+Math.floor(r()*26);if(!a.get(x,y)||!a.get(x+3,y+2))continue;const C=r()<0.6?COPPER:MALA;ell(a,x+1.5,y+1,2.2,1.5,C[1]);a.set(x+1,y,C[C.length-1]);}
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
function casaArt(){return mkA(64,64,a=>{rect(a,8,30,48,30,PLAST[2]);rect(a,42,30,14,30,PLAST[1]);rect(a,8,58,48,2,PLAST[0]);
  rect(a,40,40,10,20,hx('#4a2e1c'));rect(a,40,40,10,2,WOOD[1]);rect(a,16,38,10,9,BLUER[1]);rect(a,16,38,10,2,BLUER[3]);rect(a,20,38,2,9,PLAST[2]);rect(a,16,42,10,1,PLAST[2]);
  gable(a,2,62,8,30,TERRA);rect(a,4,29,56,2,TERRA[0]);outlineAll(a,OUTL);});}
function storeArt2(){return mkA(64,64,a=>{rect(a,30,30,28,30,WOOD[2]);for(let y=30;y<60;y+=7)rect(a,30,y,28,1,WOOD[1]);rect(a,30,30,2,30,WOOD[3]);rect(a,43,30,2,30,WOOD[1]);line(a,31,31,57,59,WOOD[1],1);
  for(const[x,h]of[[8,26],[19,22]]){blob(a,[[x+4,60-h*0.45,h*0.3],[x+4,60-h*0.75,h*0.18]],TERRA,null);rect(a,x+2,60-h,5,3,TERRA[1]);rect(a,x+1,60-h,7,1,TERRA[2]);line(a,x,60-h*0.75,x-2,60-h*0.6,TERRA[1],1);}
  outlineAll(a,OUTL);});}
function templeArt(){return mkA(64,64,a=>{rect(a,2,56,60,4,MARBLE[1]);rect(a,4,52,56,4,MARBLE[2]);rect(a,2,56,60,1,MARBLE[3]);rect(a,4,52,56,1,MARBLE[3]);
  columns(a,[8,20,32,44],24,52,MARBLE);rect(a,4,18,56,6,MARBLE[2]);rect(a,4,18,56,1,MARBLE[3]);for(let x=6;x<58;x+=6)rect(a,x,20,3,3,MARBLE[1]);
  gable(a,2,62,4,18,MARBLE);ell(a,32,12,2.5,2.5,hx('#e8c05a'));outlineAll(a,OUTL);});}
function marketArt(){return mkA(64,64,a=>{rect(a,8,24,3,36,WOOD[1]);rect(a,53,24,3,36,WOOD[1]);rect(a,6,40,52,6,WOOD[2]);rect(a,6,40,52,2,WOOD[3]);rect(a,8,46,48,12,WOOD[1]);for(let x=8;x<56;x+=6)rect(a,x,46,1,12,WOOD[0]);
  for(let x=2;x<62;x++)for(let y=6;y<20;y++){const sag=y>=17?((x%8)<4):true;if(sag)a.set(x,y,((x>>2)&1)?hx('#f6f1e4'):hx('#c8413b'));}rect(a,2,6,60,2,hx('#8f2a22'));
  for(const[x,c]of[[13,BERRY],[22,P4('#a07a20','#e8c05a','#fff0a8')],[33,P4('#2c6a98','#5b9cc9','#cfe6f2')],[44,TERRA]]){ell(a,x+2,37,3.2,2.6,c[1]);ell(a,x+5,37,3.2,2.6,c[1]);ell(a,x+3.5,35,3,2.4,c[2]);}outlineAll(a,OUTL);});}
function aqueductArt(){return mkA(64,64,a=>{rect(a,0,8,64,8,MARBLE[1]);rect(a,0,8,64,2,MARBLE[3]);rect(a,2,10,60,3,BLUER[2]);rect(a,2,10,60,1,BLUER[3]);
  rect(a,0,16,64,44,MARBLE[2]);for(const cx of[16,48])for(let y=26;y<60;y++)for(let x=cx-10;x<=cx+10;x++){const dy=Math.max(0,32-y);if((x-cx)*(x-cx)+dy*dy*1.4<=100)a.set(x,y,0);}
  for(let y=18;y<60;y+=6)for(let x=((y>>1)&1)*4;x<64;x+=8){const v=a.get(x,y);if(v)rect(a,x,y,1,6,MARBLE[1]);}for(let y=18;y<60;y+=6)for(let x=0;x<64;x++)if(a.get(x,y))a.set(x,y,MARBLE[1]);outlineAll(a,OUTL);});}
function harborArt(){return mkA(64,64,a=>{rect(a,0,44,64,10,WOOD[2]);for(let x=0;x<64;x+=6)rect(a,x,44,1,10,WOOD[1]);rect(a,0,44,64,2,WOOD[3]);for(const x of[4,30,56])rect(a,x,54,4,10,WOOD[1]);
  poly(a,[[6,38],[52,38],[46,44],[12,44]],WOOD[2]);rect(a,8,38,44,2,WOOD[3]);rect(a,28,4,2,34,WOOD[1]);poly(a,[[31,6],[31,34],[54,34]],(x,y)=>x<36?hx('#f6f1e4'):hx('#e3ddcc'));poly(a,[[27,10],[27,32],[12,32]],hx('#d8d0bc'));
  rect(a,30,2,8,3,hx('#c8413b'));outlineAll(a,OUTL);});}
function libraryArt(){return mkA(64,64,a=>{rect(a,6,24,52,34,PLAST[2]);rect(a,44,24,14,34,PLAST[1]);rect(a,4,56,56,4,MARBLE[1]);rect(a,4,56,56,1,MARBLE[3]);
  columns(a,[9,49],26,56,MARBLE);rect(a,27,38,10,18,hx('#3a2418'));rect(a,27,38,10,2,WOOD[2]);for(const x of[17,40]){rect(a,x,32,7,10,hx('#2a1a12'));for(let y=34;y<41;y+=3)rect(a,x+1,y,5,1,hx('#e9d8a6'));}
  gable(a,2,62,6,24,BLUER);rect(a,2,23,60,2,BLUER[0]);ell(a,32,16,5,3,hx('#e9d8a6'));rect(a,27,15,10,2,hx('#c9b27b'));outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#d9cfb4',C:'#a89c7e',j:'#c8413b',y:'#6b4526'},{c:'#8c6d3a',C:'#65502a',j:'#e8c547',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#7b4a6a',C:'#58324c',j:'#d9cfb4',y:'#8a5a2a'}];
// Atalaya: torre de piedra con un brasero encendido arriba.
function atalayaArt(){return mkA(64,64,a=>{const ST=P4('#6d6458','#8a8070','#a39b88','#bdb5a2');
  poly(a,[[20,60],[24,14],[40,14],[44,60]],(x,y)=>x>36?ST[1]:ST[2]);for(let y=20;y<60;y+=6)for(let x=18;x<46;x++)if(a.get(x,y))a.set(x,y,ST[0]);
  rect(a,18,10,28,6,ST[3]);for(let x=18;x<46;x+=7)rect(a,x,5,4,5,ST[3]);rect(a,28,28,8,10,hx('#2a1a12'));rect(a,28,50,8,10,WOOD[1]);
  rect(a,30,1,4,5,IRON[1]);ell(a,32,1,4,3,FIRE[1]);ell(a,32,0,2,2,FIRE[2]);outlineAll(a,OUTL);});}
// Barco pirata: casco de madera, vela negra con una calavera y un banderín rojo.
function pirateBoatArt(){return mkA(64,64,a=>{poly(a,[[6,40],[58,40],[50,54],[14,54]],WOOD[2]);rect(a,6,40,52,2,WOOD[3]);rect(a,12,46,40,1,WOOD[1]);
  rect(a,31,8,2,32,WOOD[1]);poly(a,[[33,10],[33,36],[54,34]],hx('#2a2a3a'));poly(a,[[31,12],[31,36],[12,34]],hx('#3a3a48'));
  ell(a,43,22,3,3,hx('#f6f1e4'));rect(a,41,26,5,1,hx('#f6f1e4'));rect(a,32,4,9,4,hx('#c8413b'));outlineAll(a,OUTL);});}
// Pirata: ropa oscura, pañuelo rojo, parche en el ojo y un sable en la mano.
function pirateArt(f){const c=personArt({c:'#3a3a48',C:'#24242c',j:'#c8413b',y:'#2a1a12'},f),g=c.getContext('2d');
  g.fillStyle='#c8413b';g.fillRect(20,6,25,6);g.fillRect(43,10,5,4);g.fillStyle='#1b1a24';g.fillRect(25,19,5,5);g.fillRect(21,17,20,1);
  g.fillStyle='#d6dae2';for(let k=0;k<12;k++)g.fillRect(50+Math.round(k*0.4),44-k*1.5,2,2);g.fillStyle='#e8c05a';g.fillRect(47,44,6,2);return c;}
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:oreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:casaArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),deposito:storeArt2(),herreria:epArt('herreria'),cantera:epArt('cantera'),templo:templeArt(),mercado:marketArt(),acueducto:aqueductArt(),puerto:harborArt(),biblioteca:libraryArt(),atalaya:atalayaArt(),boat:pirateBoatArt(),pirate:[pirateArt(0),pirateArt(1)],
  hero:[personArt({c:'#e9e0c8',C:'#b3a78a',j:'#4a78b8'},0),personArt({c:'#e9e0c8',C:'#b3a78a',j:'#4a78b8'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
