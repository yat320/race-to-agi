// Antigüedad del mundo abierto: cobre, monedas, depósitos y el mecanismo de Anticitera. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:2,name:'Antigüedad',de:'de la Antigüedad',obra:'el mecanismo de Anticitera',next:{file:'mundo3.html',to:'a la Edad Media'},
  ore:{id:'cobre',name:'Cobre',col:'#f0a066',empty:'Veta de cobre agotada',gather:'cobre',icon:[['........','..kkkk..','.kqqQqk.','kqvqqQqk','kqqqQqQk','kQqqqQQk','.kkkkkk.','........']]},
  storage:{id:'deposito',name:'Depósito'},ideaBuild:'biblioteca',ideaTechs:['escritura','matematica','astronomia'],boostTech:'engranajes',farmBuild:'acueducto',nightTech:'astronomia',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','templo','puerto','atalaya'],
  // Piratas desde que hay monedas; las atalayas los echan.
  pirates:'moneda',defense:{id:'atalaya',r:4,label:'Atalayas'},
  // Adentro (octubre de 2026): en lo que produce, oficios (3 puestos; cada uno suma `v` a lo que produce ese edificio); lo demás
  // se mejora hasta el nivel 3 (el efecto de cada nivel está en motor.html; el nivel 3 pide además cobre).
  oficios:{granja:{n:'Labrador',ns:'Labradores',v:0.5},fogata:{n:'Cuentacuentos',ns:'Cuentacuentos',v:0.5},aserradero:{n:'Leñador',ns:'Leñadores',v:0.5},
    cantera:{n:'Picapedrero',ns:'Picapedreros',v:0.5},templo:{n:'Escriba',ns:'Escribas',v:0.4},mercado:{n:'Mercader',ns:'Mercaderes',v:0.5},puerto:{n:'Marinero',ns:'Marineros',v:0.5}},
  niveles:['casa','deposito','herreria','atalaya','acueducto','biblioteca','cuartel'],levelExtra:[{},{cobre:8}],
  // Capítulos (octubre de 2026): metas con reloj, como en las misiones (reglas en motor.html). `oro` y `plata` en segundos de
  // juego desde que empieza el capítulo: el doble y el triple de lo que tarda el bot; `premio` en ideas con ★★★.
  capitulos:[
    {name:'La aldea',oro:120,plata:180,premio:15,metas:[{t:'build',id:'granja',n:2,txt:'Tené 2 granjas'},{t:'build',id:'casa',n:2,txt:'Tené 2 casas'},{t:'tech',id:'metalurgia',txt:'Investigá la metalurgia'}]},
    {name:'El cobre',oro:90,plata:135,premio:25,metas:[{t:'build',id:'herreria',txt:'Construí una herrería'},{t:'build',id:'atalaya',txt:'Construí una atalaya'},{t:'tech',id:'escritura',txt:'Investigá la escritura'}]},
    {name:'Templos y monedas',oro:75,plata:120,premio:35,metas:[{t:'tech',id:'moneda',txt:'Investigá la moneda'},{t:'build',id:'templo',txt:'Construí un templo'},{t:'build',id:'mercado',txt:'Construí un mercado'}]},
    {name:'El agua',oro:180,plata:270,premio:50,metas:[{t:'tech',id:'irrigacion',txt:'Investigá la irrigación'},{t:'build',id:'acueducto',txt:'Construí un acueducto'},{t:'tap',n:1,txt:'Echá un pirata'}]},
    {name:'El mar',oro:75,plata:120,premio:70,metas:[{t:'tech',id:'navegacion',txt:'Investigá la navegación'},{t:'build',id:'puerto',txt:'Construí un puerto'},{t:'of',n:1,txt:'Poné a alguien en un oficio'},{t:'lv',n:1,txt:'Mejorá un edificio'}]},
    {name:'Los sabios',oro:225,plata:330,premio:100,metas:[{t:'tech',id:'matematica',txt:'Investigá la matemática'},{t:'build',id:'biblioteca',txt:'Construí una biblioteca'},{t:'tech',id:'astronomia',txt:'Investigá la astronomía'}]},
    {name:'La máquina',oro:285,plata:420,premio:0,metas:[{t:'tech',id:'engranajes',txt:'Investigá los engranajes'},{t:'tech',id:'anticitera',txt:'Armá el mecanismo de Anticitera'}]}],
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'soldado',building:'Cuartel',unit:'Soldado',done:'Cuartel listo: llegó un soldado',desc:'Trae un soldado que patrulla cerca y sale solo a echar a los piratas a 8 casilleros o menos.',info:'Cuartel: su soldado echa a los piratas que andan cerca.',tip:'un cuartel: el soldado sale solo a echar a los piratas.'},
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
    news:'Novedades: 13 edificios, cobre y monedas, depósitos con capacidad, la hoja Tribu para decidir qué juntan tus aldeanos, adentro de cada edificio oficios (escribas, mercaderes, marineros…) o mejoras hasta el nivel 3, y piratas: tocalos antes de que roben, o antes de que vuelvan al barco para recuperar lo robado. Las atalayas echan a los que pasan cerca.',
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
// Adentro de todo (octubre de 2026): lo que produce tiene oficios (ERA.oficios) y lo demás, niveles (ERA.niveles). Corazón de
// cada construcción (HS.in_<id>, 176×200, dos cuadros) y lo que usa cada oficio o suma cada nivel (HS.inp_<id>).
const ANK=hx('#1b1a24'),ANCU=P4('#7a3a1e','#b5602e','#d88a4a','#f0b070'),ANF=f=>f?[FIRE[0],FIRE[1],FIRE[2]]:[FIRE[1],FIRE[2],FIRE[3]];
const anAmph=(a,x,y,s,c)=>{c=c||CLAY;ell(a,x,y,9*s,13*s,c[2]);ell(a,x-3*s,y-4*s,3*s,5*s,c[3]);rect(a,x-3*s,y-19*s,6*s,7*s,c[1]);rect(a,x-5*s,y-20*s,10*s,2,c[0]);line(a,x-3*s,y-15*s,x-7*s,y-9*s,c[0],2);line(a,x+3*s,y-15*s,x+7*s,y-9*s,c[0],2);ell(a,x,y+12*s,3*s,3*s,c[1]);};
const anScroll=(a,x,y)=>{rect(a,x,y,14,5,hx('#ecdcb0'));rect(a,x-2,y-1,3,7,WOOD[2]);rect(a,x+13,y-1,3,7,WOOD[2]);};
const anCol=(a,x,y,h)=>{rect(a,x,y,14,h,STONE2[3]);for(let k=2;k<14;k+=4)rect(a,x+k,y,1,h,STONE2[2]);rect(a,x-3,y,20,5,STONE2[2]);rect(a,x-3,y+h-5,20,5,STONE2[2]);};
function anCoreArt(t,f){return mkA(176,200,a=>{const F=ANF(f);
  if(t==='granja'){for(const x of[24,56,88])anAmph(a,x,176,1.3);for(let k=0;k<3;k++){const x=120+k*18;for(let s=-6;s<7;s+=3)line(a,x,196,x+s,150,STRAW[2],2);rect(a,x-7,170,14,4,STRAW[0]);}
    ell(a,150,110,20,6,STONE2[2]);ell(a,150,106,16,4,STONE2[3]);line(a,40,60,60,40,IRON[2],3);ell(a,64,40,10,10,(i,j)=>i>0&&i*i+j*j>50?IRON[3]:null);if(f)for(const[x,y]of[[124,140],[140,134]])rect(a,x,y,2,2,STRAW[3]);}
  else if(t==='fogata'){for(let k=0;k<9;k++){const an=k/9*6.283;blob(a,[[80+Math.cos(an)*40,180+Math.sin(an)*12,8]],ROCK,null);}const d=f?3:-3;
    poly(a,[[54,180],[62,146],[72,156],[80+d,112],[90,156],[100,142],[106,180]],F[0]);poly(a,[[64,180],[72,154],[80-d,128],[88,154],[96,180]],F[1]);poly(a,[[72,180],[80+d,150],[88,180]],F[2]);
    rect(a,130,170,44,8,WOOD[2]);rect(a,134,178,5,18,WOOD[1]);rect(a,166,178,5,18,WOOD[1]);}
  else if(t==='aserradero'){for(const x of[20,120])rect(a,x,150,10,46,WOOD[1]);rect(a,10,140,150,14,WOOD[2]);ell(a,160,147,8,8,RING[2]);ell(a,160,147,4,4,RING[1]);
    const sx=f?70:80;rect(a,sx,96,6,70,WOOD[3]);rect(a,sx+40,96,6,70,WOOD[3]);rect(a,sx,96,46,4,WOOD[2]);line(a,sx+3,160,sx+43,160,IRON[3],2);for(let k=0;k<5;k++)rect(a,140,100+k*12,34,8,WOOD[1+(k%2)]);}
  else if(t==='cantera'){for(let r=0;r<4;r++){const y=64+r*32,w=40+r*24;rect(a,0,y,w,32,ROCK[1+(r%2)]);rect(a,0,y,w,4,ROCK[3]);for(let x=8+(r%2)*12;x<w-4;x+=24)rect(a,x,y+4,2,28,ROCK[0]);}
    rect(a,118,156,52,28,ROCK[2]);rect(a,118,156,52,4,ROCK[3]);rect(a,140,160,2,24,ROCK[0]);for(const x of[126,146,164])ell(a,x,190,6,6,WOOD[2]);
    line(a,88,140,104,112,WOOD[2],3);poly(a,[[98,108],[114,110],[106,118]],IRON[2]);if(f)for(const[x,y]of[[112,126],[118,120],[108,118]])rect(a,x,y,2,2,ROCK[3]);}
  else if(t==='templo'){anCol(a,10,40,160);anCol(a,150,40,160);rect(a,10,30,160,12,STONE2[2]);poly(a,[[6,30],[88,4],[170,30]],STONE2[3]);
    rect(a,56,130,64,66,STONE2[2]);rect(a,52,126,72,6,STONE2[3]);ell(a,88,118,14,6,ANCU[1]);poly(a,[[80,118],[88,90+(f?4:0)],[96,118]],F[0]);poly(a,[[84,118],[88,100],[92,118]],F[2]);
    for(const[x,y]of[[34,170],[34,180],[124,176]])anScroll(a,x,y);}
  else if(t==='mercado'){for(const x of[10,160])rect(a,x,60,6,140,WOOD[1]);for(let x=10;x<166;x++)rect(a,x,56,1,24,((x>>4)&1)?hx('#c8413b'):hx('#ecdcb0'));rect(a,10,140,156,10,WOOD[2]);rect(a,14,150,148,46,WOOD[1]);
    for(const[x,c]of[[30,BERRY],[62,STRAW],[94,LEAF]])blob(a,[[x,132,12],[x+10,128,10]],c,null);const tl=f?3:-3;rect(a,136,100,3,40,IRON[2]);line(a,120,108-tl,154,108+tl,IRON[2],2);ell(a,122,116-tl,8,3,GOLD);ell(a,152,116+tl,8,3,GOLD);}
  else if(t==='puerto'){for(let y=150;y<200;y++)for(let x=0;x<120;x++)a.set(x,y,(y+((x+f*4)>>3))%6?WA[1]:WA[3]);poly(a,[[0,104],[96,120],[80,160],[0,160]],WOOD[1]);rect(a,0,104,96,4,ANCU[2]);ell(a,70,128,6,4,hx('#f4f1e8'));ell(a,70,128,2,2,ANK);
    for(let k=0;k<5;k++)line(a,14+k*14,162,4+k*14,190,WOOD[3],2);rect(a,118,150,58,50,WOOD[2]);for(let x=118;x<176;x+=10)rect(a,x,150,2,50,WOOD[1]);for(const[x,y]of[[132,144],[150,144],[168,144],[141,118],[159,118]])anAmph(a,x,y,0.9);}
  else if(t==='casa'){blob(a,[[46,184,20]],ROCK,null);ell(a,46,176,12,9,(i,j)=>j<3?(i*i+j*j<30?F[2]:F[1]):null);for(const x of[96,108])line(a,x,80,x,196,WOOD[2],4);rect(a,96,80,72,5,WOOD[2]);
    for(let x=104;x<160;x+=4)line(a,x,86,x,150,(x>>2)%2?hx('#4a78b8'):hx('#ecdcb0'),1);rect(a,102,150,62,30,hx('#4a78b8'));rect(a,160,80,5,116,WOOD[2]);anAmph(a,150,184,1);}
  else if(t==='deposito'){for(let r=0;r<3;r++)for(let k=0;k<4-r;k++)anAmph(a,24+k*36+r*18,186-r*40,1.2);rect(a,0,196,176,4,WOOD[1]);}
  else if(t==='herreria'){blob(a,[[50,150,40]],P4('#5a2e1e','#7a3e26','#9a5232','#b5683e'),null);ell(a,50,160,16,14,(i,j)=>i*i+j*j<60?F[2]:F[f?0:1]);rect(a,20,190,62,8,ROCK[1]);
    rect(a,90,170,30,8,IRON[1]);rect(a,84,166,24,6,IRON[2]);rect(a,98,178,12,18,IRON[1]);ell(a,140,186,18,10,WOOD[2]);rect(a,124,170,32,14,HIDE[2]);for(const x of[130,146,162])rect(a,x,194,12,5,ANCU[2]);if(f)for(const[x,y]of[[96,156],[104,150],[90,152]])rect(a,x,y,2,2,F[2]);}
  else if(t==='atalaya'){for(const x of[40,70])line(a,x,10,x,196,WOOD[2],4);for(let y=24;y<196;y+=18)rect(a,40,y,30,4,WOOD[3]);ell(a,130,40,20,8,ANCU[2]);ell(a,118,40,6,10,ANCU[1]);
    rect(a,124,150,24,46,STONE2[2]);ell(a,136,146,16,6,ANCU[1]);poly(a,[[126,146],[136,116+(f?4:0)],[146,146]],F[1]);}
  else if(t==='acueducto'){rect(a,0,40,176,20,STONE2[2]);rect(a,0,36,176,6,STONE2[3]);for(let x=0;x<176;x++)rect(a,x,44,1,6,(x+f*6)%12<6?WA[3]:WA[2]);
    for(let k=0;k<3;k++){const x0=k*60;rect(a,x0,60,14,140,STONE2[2]);ell(a,x0+37,100,23,40,(i,j)=>j<0&&i*i/(23*23)+j*j/1600>1?STONE2[2]:null);rect(a,x0+14,60,46,40-0,0);}
    for(let y=60;y<200;y+=8)for(let x=0;x<176;x+=60)rect(a,x,y,14,1,STONE2[1]);}
  else if(t==='biblioteca'){rect(a,6,30,164,170,WOOD[1]);for(let r=0;r<6;r++)for(let k=0;k<7;k++){const x=12+k*23,y=36+r*26;rect(a,x,y,20,22,WOOD[0]);for(let s=0;s<3;s++)ell(a,x+5+s*5,y+16,3,3,hx('#ecdcb0'));}}
  else if(t==='cuartel'){rect(a,10,140,150,8,WOOD[2]);for(let k=0;k<6;k++){line(a,20+k*24,196,26+k*24,40,WOOD[2],3);poly(a,[[26+k*24,30],[31+k*24,44],[21+k*24,44]],ANCU[3]);}
    for(const[x,y]of[[40,100],[88,96],[136,100]]){ell(a,x,y,18,18,ANCU[2]);ell(a,x,y,12,12,hx('#c8413b'));ell(a,x,y,4,4,GOLD);}}
  outlineAll(a,ANK);});}
function anPropArt(t){return mkA(112,112,a=>{
  if(t==='granja'){for(let k=0;k<3;k++){const x=26+k*30;for(let s=-6;s<7;s+=3)line(a,x,108,x+s,62,STRAW[2],2);rect(a,x-7,84,14,4,STRAW[0]);}}
  else if(t==='fogata'){rect(a,8,90,96,10,WOOD[2]);rect(a,12,100,6,12,WOOD[1]);rect(a,94,100,6,12,WOOD[1]);}
  else if(t==='aserradero'){rect(a,10,86,92,14,WOOD[2]);ell(a,100,93,7,7,RING[2]);for(const x of[18,88])rect(a,x,100,6,12,WOOD[1]);}
  else if(t==='cantera'){rect(a,20,72,60,38,ROCK[2]);rect(a,20,72,60,4,ROCK[3]);line(a,84,108,98,84,WOOD[2],3);rect(a,92,76,12,8,WOOD[3]);}
  else if(t==='templo'){rect(a,14,78,80,8,WOOD[3]);for(const x of[20,84])rect(a,x,86,6,26,WOOD[1]);anScroll(a,36,70);ell(a,74,72,4,4,ANK);}
  else if(t==='mercado'){rect(a,8,80,96,8,WOOD[2]);rect(a,12,88,88,22,WOOD[1]);blob(a,[[30,72,10],[54,70,10]],BERRY,null);anAmph(a,84,64,0.8);}
  else if(t==='puerto'){for(const[x,y]of[[30,96],[56,96],[82,96],[43,66],[69,66]])anAmph(a,x,y,0.9);}
  else if(t==='casa'){rect(a,6,82,100,8,WOOD[2]);rect(a,8,70,96,14,hx('#4a78b8'));rect(a,8,70,96,3,hx('#7ea6dc'));rect(a,10,62,20,10,hx('#ecdcb0'));for(const x of[8,98])rect(a,x,90,6,20,WOOD[1]);}
  else if(t==='deposito'){for(const y of[56,104])rect(a,6,y,100,5,WOOD[2]);for(const x of[6,100])rect(a,x,10,6,100,WOOD[1]);for(const x of[26,56,86])anAmph(a,x,86,0.9);for(const x of[30,62])anAmph(a,x,38,0.8);}
  else if(t==='herreria'){rect(a,26,82,52,10,IRON[2]);rect(a,20,78,24,6,IRON[2]);rect(a,40,92,14,20,IRON[1]);line(a,70,72,90,52,WOOD[2],3);rect(a,84,46,14,10,ANCU[1]);}
  else if(t==='atalaya'){rect(a,48,72,18,40,STONE2[2]);ell(a,57,70,14,5,ANCU[1]);poly(a,[[48,70],[57,44],[66,70]],FIRE[1]);poly(a,[[52,70],[57,54],[62,70]],FIRE[2]);}
  else if(t==='acueducto'){ell(a,56,96,44,12,STONE2[2]);ell(a,56,94,38,8,WA[2]);rect(a,50,50,12,44,STONE2[3]);ell(a,56,50,12,5,STONE2[2]);line(a,56,46,56,40,WA[3],2);}
  else if(t==='biblioteca'){rect(a,10,10,92,100,WOOD[1]);for(let r=0;r<4;r++)for(let k=0;k<4;k++){const x=14+k*22,y=14+r*24;rect(a,x,y,19,20,WOOD[0]);for(let s=0;s<3;s++)ell(a,x+5+s*5,y+14,3,3,hx('#ecdcb0'));}}
  outlineAll(a,ANK);});}
for(const t of['granja','fogata','aserradero','cantera','templo','mercado','puerto','casa','deposito','herreria','atalaya','acueducto','biblioteca','cuartel']){HS['in_'+t]=[anCoreArt(t,0),anCoreArt(t,1)];if(t!=='cuartel')HS['inp_'+t]=anPropArt(t);}
