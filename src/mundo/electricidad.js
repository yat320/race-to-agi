// Electricidad del mundo abierto: cobre, usinas, postes, la red eléctrica y las tormentas; la tabuladora. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:6,name:'Electricidad',de:'de la Electricidad',obra:'la tabuladora eléctrica',next:{file:'mundo7.html',to:'a la Computación'},
  ore:{id:'cobre',name:'Cobre',col:'#f0a066',empty:'Veta de cobre agotada',gather:'cobre',icon:[['........','..kkkk..','.kqqQqk.','kqvqqQqk','kqqqQqQk','kQqqqQQk','.kkkkkk.','........']]},
  storage:{id:'granero'},ideaBuild:'escuela',ideaTechs:['lamparita','escuelas'],boostTech:'valvulas',farmBuild:'frigorifico',nightTech:'lamparita',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','usina','represa'],
  grid:'power',gridTech:'dinamo',
  // Tormentas que tiran rayos sobre lo eléctrico y cortan la red; el pararrayos se lleva los rayos a 4 casilleros (reglas en motor.html).
  storms:true,defense:{id:'pararrayos',r:4,label:'Pararrayos'},
  // Como la Prehistoria (octubre de 2026): obras que levantan vos y tu gente y mundo vivo (cabras, sequía que el frigorífico
  // salva y mercaderes desde el motor eléctrico; no hay puerto, así que no llegan barcos; src/mundo/amenazas/vida.js).
  obras:true,vida:true,
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'electricista',building:'Cuadrilla eléctrica',unit:'Electricista',done:'Cuadrilla eléctrica lista: llegó un electricista',desc:'Trae un electricista que sale solo a disipar tormentas y a arreglar lo quemado, a 8 casilleros o menos.',info:'Cuadrilla eléctrica: su electricista arregla lo quemado cerca.',tip:'una cuadrilla eléctrica: el electricista sale solo a arreglar lo quemado.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo5-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la Industria',perks:[
    ['analitica','ideaMult',1.25,'Máquina analítica: ideas +25% durante toda la era'],
    ['ferrocarril','agri',1.25,'Ferrocarril: granjas +25%']
  ]},
  techs:[
 {id:'dinamo',name:'Dínamo',cost:{cobre:15,ideas:30},req:[],desc:'Desbloquea la usina, los postes, el pararrayos, la herrería y la cantera a vapor.'},
 {id:'motor',name:'Motor eléctrico',cost:{cobre:20,ideas:50},req:['dinamo'],desc:'Desbloquea la fábrica eléctrica, que da muchas monedas.'},
 {id:'lamparita',name:'Lamparita',cost:{piedra:15,ideas:40},req:['dinamo'],desc:'Desbloquea el laboratorio. Ideas +50% y de noche ves más lejos.'},
 {id:'frio',name:'Refrigeración',cost:{madera:40,piedra:20,ideas:65},req:['dinamo'],desc:'Desbloquea el frigorífico, que potencia las granjas.'},
 {id:'hidro',name:'Hidroelectricidad',cost:{madera:60,cobre:20,ideas:95},req:['motor'],desc:'Desbloquea la represa: luz sin humo, pegada al agua.'},
 {id:'escuelas',name:'Escuela pública',cost:{monedas:30,ideas:130},req:['lamparita','motor'],desc:'Desbloquea la escuela. Ideas +50%.'},
 {id:'valvulas',name:'Válvulas de vacío',cost:{cobre:45,monedas:35,ideas:240},req:['motor','escuelas'],desc:'Electrónica: todos los edificios producen +50%.'},
 {id:'tabuladora',name:'Tabuladora eléctrica',cost:{piedra:80,cobre:60,monedas:60,ideas:450},req:['hidro','valvulas'],desc:'Tarjetas perforadas y electricidad: cuenta un censo entero en meses. Cierra la Electricidad.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'parque',name:'Parque',req:null,base:{madera:15,piedra:10},grow:1.3,done:'Parque plantado: el aire se limpia',desc:'Árboles que limpian el humo de las usinas.'},
 {id:'herreria',name:'Herrería',req:'dinamo',base:{madera:25,piedra:20,cobre:10},grow:1.6,done:'Herrería lista',desc:'Herramientas de acero: los aldeanos juntan +30% por cada herrería.'},
 {id:'cantera',req:'dinamo',base:{madera:20,cobre:8},grow:1.35,prod:{piedra:0.12}},
 {id:'usina',name:'Usina',req:'dinamo',base:{madera:30,piedra:30,cobre:10},grow:1.5,done:'Usina encendida',desc:'Da luz a 6 edificios con ⚡. Echa humo.',power:6,node:true,smoke:0.06,smk:[[2.75,0],[5.75,0]],puffs:4},
 {id:'poste',name:'Poste',req:'dinamo',base:{madera:6,cobre:3},grow:1.06,done:'Poste instalado',desc:'Estira la red: se conecta con otro poste o una usina a 4 casilleros, y da luz a lo que esté a 3.',node:true},
 {id:'pararrayos',name:'Pararrayos',req:'dinamo',base:{madera:10,piedra:15,cobre:8},grow:1.4,done:'Pararrayos instalado',desc:'Se lleva los rayos que caen a 4 casilleros: lo eléctrico de alrededor no se quema.'},
 {id:'represa',name:'Represa',req:'hidro',base:{piedra:50,cobre:25},grow:1.5,done:'Represa funcionando',desc:'Va pegada al agua. Da luz a 6 edificios con ⚡ sin echar humo.',power:6,node:true,water:'La represa tiene que ir pegada al agua.'},
 {id:'fabrica',name:'Fábrica eléctrica',req:'motor',base:{madera:30,piedra:25,cobre:5},grow:1.4,done:'Fábrica en marcha',desc:'Motores eléctricos: da muchas monedas.',prod:{monedas:0.35},elec:true},
 {id:'laboratorio',name:'Laboratorio',req:'lamparita',base:{piedra:40,cobre:10},grow:1.5,done:'Laboratorio abierto',desc:'Inventores con luz eléctrica: genera muchas ideas.',prod:{ideas:0.4},elec:true},
 {id:'frigorifico',name:'Frigorífico',req:'frio',base:{madera:35,piedra:30},grow:1.6,done:'Frigorífico funcionando',desc:'La cosecha no se pudre: cada frigorífico hace rendir +50% a todas las granjas.',elec:true},
 {id:'escuela',name:'Escuela',req:'escuelas',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Escuela abierta',desc:'Ideas +30% por cada escuela.',elec:true}],
  info:{casa:'Casa: acá viven 2 aldeanos.',parque:'Parque: limpia el humo.',herreria:'Herrería: los aldeanos juntan más rápido.',usina:'Usina: da luz a 6 edificios. Echa humo.',pararrayos:'Pararrayos: se lleva los rayos a 4 casilleros.',poste:'Poste: estira la red.',represa:'Represa: da luz a 6 edificios sin humo.',fabrica:'Fábrica eléctrica: da monedas.',laboratorio:'Laboratorio: genera ideas.',frigorifico:'Frigorífico: potencia las granjas.',escuela:'Escuela: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['dinamo',['usina','represa'],'una usina: da luz a 6 edificios con ⚡.'],gridTip,['dinamo','pararrayos','un pararrayos cerca de las usinas y los postes: se lleva los rayos.']],
  tips2:[['lamparita','laboratorio','un laboratorio con luz: genera muchas ideas.'],['motor','fabrica','una fábrica con luz para conseguir monedas.'],['hidro','represa','una represa pegada al agua: luz sin humo.']],
  smogTip:'Más parques, o represas en vez de usinas.',done:'Electricidad completa.',
  text:{
    when:'1880 d.C.',title:'La Electricidad',
    intro:'Llega la luz eléctrica. Las usinas mueven fábricas, laboratorios y frigoríficos, pero solo si los conectás con postes y cables, y las tormentas tiran rayos que queman la red. La meta: construir la tabuladora eléctrica, la máquina que contó un censo entero.',
    news:'Novedades: cobre y la red eléctrica. Los edificios con ⚡ andan solo si están cerca de una usina, una represa o un poste conectado. Las usinas echan humo; las represas no. Las tormentas tiran rayos que queman usinas, postes y lo que tiene ⚡: tocá la nube para disiparla y lo quemado para arreglarlo. Los pararrayos se llevan los rayos que caen cerca.',
    legacy:'Lo que trae tu ciudad de la Industria',
    noLegacy:'No hay una Industria terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o una veta y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del depósito, lo que sobra se pierde. Los edificios con ⚡ necesitan luz: tienen que quedar cerca de una usina, una represa o un poste conectado. Las usinas echan humo: con mucho humo se junta y se cosecha menos, y los parques lo limpian. Las tormentas tiran rayos que queman lo eléctrico y cortan la red: tocá la nube para disiparla y lo quemado para arreglarlo; los pararrayos se llevan los rayos que caen cerca. En la compu: flechas o WASD.',
    win:'Electricidad superada',winText:()=>'Terminaste la tabuladora eléctrica en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Las máquinas ya cuentan solas.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan a la Computación.'}
};

/* ---------- arte de la era ---------- */
function copperOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],ROCK,null);
  const r=mulberry32(9);for(let k=0;k<12;k++){const x=12+Math.floor(r()*40),y=16+Math.floor(r()*26);if(!a.get(x,y)||!a.get(x+3,y+2))continue;const C=r()<0.6?COPPER:MALA;ell(a,x+1.5,y+1,2.2,1.5,C[1]);a.set(x+1,y,C[C.length-1]);}
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa italianizante: fachada rosada, azotea con baranda, ventanas altas con balcón de hierro y puerta con banderola.
function italianHouseArt(){return mkA(64,64,a=>{const PK=P4('#b0706a','#d0928a','#e8b0a4','#f4cfc4'),SH=hx('#3f6b4a');
  rect(a,8,18,48,42,PK[2]);rect(a,46,18,10,42,PK[1]);
  rect(a,6,6,52,2,PLAST[3]);for(let x=8;x<56;x+=4)rect(a,x,8,2,6,PLAST[2]);rect(a,6,14,52,4,PLAST[3]);rect(a,6,18,52,1,PK[0]);
  for(const x of[13,41]){rect(a,x,24,10,18,DKW);rect(a,x-2,23,2,20,SH);rect(a,x+10,23,2,20,SH);rect(a,x-1,22,12,1,PLAST[3]);
    rect(a,x-2,40,14,1,IRON[1]);for(let i=x-2;i<x+12;i+=2)rect(a,i,41,1,4,IRON[1]);rect(a,x-2,44,14,1,IRON[1]);}
  rect(a,27,30,10,30,WOOD[1]);ell(a,32,30,5,4,(i,j)=>j<=0?GLASS[2]:null);rect(a,32,31,1,29,WOOD[0]);rect(a,25,58,14,2,STONE2[2]);
  outlineAll(a,OUTL);});}
// Fábrica eléctrica: hormigón claro, ventanales con marco de acero, tanque de agua y cartel con un rayo. No echa humo.
function elecFactoryArt(){return mkA(64,64,a=>{const CR=P4('#a89c84','#c4b89e','#ddd2b8','#eee6d2');
  rect(a,45,16,1,6,IRON[0]);rect(a,54,16,1,6,IRON[0]);rect(a,44,6,12,10,WOOD[2]);for(let x=44;x<56;x+=3)rect(a,x,6,1,10,WOOD[1]);poly(a,[[43,6],[50,1],[57,6]],WOOD[1]);
  rect(a,10,21,1,3,IRON[0]);rect(a,27,21,1,3,IRON[0]);rect(a,8,11,22,10,DKW);bolt(a,20,13);
  rect(a,2,24,60,36,CR[2]);rect(a,48,24,14,36,CR[1]);rect(a,0,22,64,3,CR[3]);rect(a,0,25,64,1,CR[0]);
  for(const x of[5,23,41]){rect(a,x,30,16,16,GLASS[1]);for(let i=0;i<=16;i+=4)rect(a,x+i,30,1,16,IRON[1]);for(let j=0;j<=16;j+=4)rect(a,x,30+j,16,1,IRON[1]);}
  rect(a,26,50,12,10,IRON[2]);for(let y=50;y<60;y+=2)rect(a,26,y,12,1,IRON[1]);
  outlineAll(a,OUTL);});}
// Laboratorio de inventor: casa de tablas blancas con galería y una lamparita gigante en el techo.
function edisonLabArt(){return mkA(64,64,a=>{const WH=P4('#a8a49a','#c8c4ba','#e6e2d8','#f8f6f0');
  for(let y=26;y<60;y++){rect(a,8,y,36,1,y%3===0?WH[1]:WH[2]);rect(a,44,y,12,1,y%3===0?WH[0]:WH[1]);}
  gable(a,4,60,12,26,SLATE);
  for(const x of[12,24,36,47]){rect(a,x-1,29,8,10,WH[3]);rect(a,x,30,6,8,DKW);rect(a,x+2,30,1,8,WH[3]);}
  rect(a,6,44,52,2,WOOD[3]);for(const x of[8,22,42,55])rect(a,x,46,2,14,WH[3]);rect(a,28,47,8,13,WOOD[1]);
  rect(a,29,13,6,5,IRON[2]);rect(a,29,14,6,1,IRON[3]);rect(a,30,18,4,2,IRON[0]);ell(a,32,7,6,6,hx('#ffe98a'));ell(a,30,5,2,2,hx('#ffffff'));rect(a,31,6,1,5,hx('#c8a050'));rect(a,33,6,1,5,hx('#c8a050'));
  outlineAll(a,OUTL);});}
// Frigorífico: galpón blanco y celeste con un copo de nieve, carámbanos y puertas de carga.
function frigoArt(){return mkA(64,64,a=>{const IC=P4('#6a8aa8','#9ab8d0','#d0e2ee','#f0f8fc');
  rect(a,2,22,60,38,IC[2]);rect(a,48,22,14,38,IC[1]);rect(a,0,18,64,4,IC[3]);rect(a,0,22,64,1,IC[0]);
  for(let x=2;x<62;x+=3)rect(a,x,23,1,1+((x*7)%4),IC[3]);
  const cx=17,cy=38;for(let k=0;k<3;k++){const an=k*Math.PI/3,c=Math.cos(an),s2=Math.sin(an);for(let t=-8;t<=8;t++)a.set(cx+c*t,cy+s2*t,BLUER[1]);for(const t of[-5,5]){a.set(cx+c*t-s2*2,cy+s2*t+c*2,BLUER[1]);a.set(cx+c*t+s2*2,cy+s2*t-c*2,BLUER[1]);}}
  ell(a,cx,cy,1.5,1.5,BLUER[2]);
  for(const x of[31,46]){rect(a,x,38,12,20,BLUER[1]);for(let y=40;y<58;y+=3)rect(a,x,y,12,1,BLUER[0]);}
  rect(a,0,58,64,2,STONE2[2]);outlineAll(a,OUTL);});}
// Escuela: columnas, frontón con reloj, escalinata y bandera celeste y blanca.
function schoolArt(){return mkA(64,64,a=>{const CEL=hx('#7ec0ee');rect(a,33,4,1,12,IRON[0]);rect(a,34,4,9,2,CEL);rect(a,34,6,9,2,hx('#ffffff'));rect(a,34,8,9,2,CEL);
  rect(a,4,30,56,28,MARBLE[2]);rect(a,48,30,12,28,MARBLE[1]);
  for(const x of[7,52]){rect(a,x,36,6,14,DKW);ell(a,x+3,36,3,3,(i,j)=>j<=0?DKW:null);}
  rect(a,30,40,6,16,WOOD[1]);columns(a,[16,24,36,44],32,56,MARBLE);rect(a,12,28,42,4,MARBLE[3]);poly(a,[[33,16],[54,28],[12,28]],(x,y)=>x<33?MARBLE[3]:MARBLE[2]);
  ell(a,33,23,3,3,IRON[0]);ell(a,33,23,2.2,2.2,hx('#f6f1e4'));a.set(33,22,IRON[0]);a.set(34,23,IRON[0]);
  rect(a,10,56,46,2,MARBLE[3]);rect(a,8,58,50,2,MARBLE[1]);outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#3a3a48',C:'#28283a',j:'#d8d0bc',y:'#3a2418'},{c:'#3f5f8a',C:'#2c4466',j:'#7a5434',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#7a4a6a',C:'#58324c',j:'#e3ddcc',y:'#8a5a2a'}];
// Pararrayos: varilla de hierro con punta y bola de vidrio, cable de cobre que baja y base de piedra.
function rodArt(){return mkA(64,64,a=>{stoneWall(a,22,50,20,10);rect(a,20,49,24,2,STONE2[3]);
  rect(a,31,8,3,42,IRON[1]);rect(a,31,8,1,42,IRON[3]);poly(a,[[32.5,0],[35,8],[30,8]],IRON[2]);ell(a,32.5,20,4,4,GLASS[1]);ell(a,31.5,19,1.5,1.5,GLASS[3]);
  for(const y of[12,30,40])rect(a,28,y,9,2,IRON[0]);for(let y=22;y<50;y++)a.set(35+Math.round(Math.sin(y*0.6)),y,COPPER[1]);
  outlineAll(a,OUTL);});}
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:copperOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:italianHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),parque:parkArt(),usina:powerPlantArt(),poste:poleArt(),represa:damArt(),fabrica:elecFactoryArt(),laboratorio:edisonLabArt(),frigorifico:frigoArt(),escuela:schoolArt(),pararrayos:rodArt(),
  hero:[personArt({c:'#4a6a3a',C:'#33492a',j:'#d4ae62'},0),personArt({c:'#4a6a3a',C:'#33492a',j:'#d4ae62'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
