// Industria del mundo abierto: carbón, fábricas, trenes y el humo; la máquina analítica. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:5,name:'Industria',de:'de la Industria',next:{file:'mundo6.html',to:'a la Electricidad'},
  ore:{id:'carbon',name:'Carbón',col:'#a3a8b4',empty:'Veta de carbón agotada',gather:'carbón',icon:[['........','...kk...','..kvqk..','.kqqQkk.','kvqQkqqk','kqQQkqQk','.kkkkkk.','........'],{q:'#3e3848',Q:'#24202c',v:'#8a8f9c'}]},
  storage:{id:'granero',name:'Granero'},ideaBuild:'palacio',ideaTechs:['quimica','exposiciones','gas'],boostTech:'tarjetas',farmBuild:'estacion',nightTech:'gas',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','laboratorio','fabrica','estacion','puerto','palacio'],
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo4-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'del Renacimiento',perks:[
    ['pascalina','ideaMult',1.25,'Pascalina: ideas +25% durante toda la era'],
    ['botanica','agri',1.25,'Botánica: granjas +25%']
  ]},
  techs:[
 {id:'vapor',name:'Máquina de vapor',cost:{carbon:15,ideas:30},req:[],desc:'Desbloquea la mina de carbón, la herrería y la cantera.'},
 {id:'quimica',name:'Química',cost:{piedra:15,ideas:35},req:[],desc:'Desbloquea el laboratorio, que genera muchas ideas. Ideas +50%.'},
 {id:'telar',name:'Telar mecánico',cost:{carbon:20,ideas:50},req:['vapor'],desc:'Desbloquea la fábrica: quema carbón, da muchas monedas y echa humo.'},
 {id:'ferrocarril',name:'Ferrocarril',cost:{madera:40,piedra:20,ideas:65},req:['vapor'],desc:'Desbloquea la estación de tren, que potencia las granjas.'},
 {id:'barcos',name:'Barco de vapor',cost:{madera:60,carbon:20,ideas:95},req:['telar'],desc:'Desbloquea el puerto: barcos que traen monedas e ideas.'},
 {id:'exposiciones',name:'Exposiciones',cost:{monedas:30,ideas:130},req:['quimica','telar'],desc:'Desbloquea el palacio de cristal. Ideas +50%.'},
 {id:'gas',name:'Alumbrado a gas',cost:{monedas:45,ideas:270},req:['barcos','exposiciones'],desc:'Se lee de noche: ideas +50% y ves más lejos en la oscuridad.'},
 {id:'tarjetas',name:'Tarjetas perforadas',cost:{carbon:60,monedas:45,ideas:320},req:['vapor','exposiciones'],desc:'Máquinas que siguen instrucciones: todos los edificios producen +50%.'},
 {id:'analitica',name:'Máquina analítica',cost:{piedra:110,carbon:90,monedas:100,ideas:650},req:['gas','tarjetas'],desc:'Babbage y Ada Lovelace: la primera computadora programable. Cierra la Industria.'}],
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',name:'Granja',req:null,base:{madera:12,comida:4},grow:1.25,done:'Granja lista',desc:'Produce comida sola.',prod:{comida:0.2},noSand:true},
 {id:'fogata',name:'Fogata',req:null,base:{madera:5,piedra:4},grow:1.6,done:'Fogata encendida',desc:'Genera ideas y alumbra de noche. Comer cerca rinde el doble.',prod:{ideas:0.12}},
 {id:'aserradero',name:'Aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,done:'Aserradero listo',desc:'Produce madera solo.',prod:{madera:0.12}},
 {id:'granero',name:'Granero',req:null,base:{madera:25,piedra:15},grow:1.4,done:'Granero construido',desc:'+150 de capacidad para cada recurso. Las ideas no tienen límite.'},
 {id:'parque',name:'Parque',req:null,base:{madera:15,piedra:10},grow:1.3,done:'Parque plantado: el aire se limpia',desc:'Árboles que limpian el humo. Cada parque compensa casi una fábrica.'},
 {id:'herreria',name:'Herrería',req:'vapor',base:{madera:25,piedra:20,carbon:10},grow:1.6,done:'Herrería lista',desc:'Herramientas de acero: vos y los aldeanos juntan +30% por cada herrería.'},
 {id:'cantera',name:'Cantera',req:'vapor',base:{madera:20,carbon:8},grow:1.35,done:'Cantera lista',desc:'Produce piedra sola.',prod:{piedra:0.12}},
 {id:'mina',name:'Mina de carbón',req:'vapor',base:{madera:30,piedra:15},grow:1.4,done:'Mina abierta',desc:'Una bomba de vapor saca carbón sola. Echa algo de humo.',prod:{carbon:0.12},smoke:0.03,smk:[[2.2,1.4]]},
 {id:'laboratorio',name:'Laboratorio',req:'quimica',base:{piedra:40,carbon:10},grow:1.5,done:'Laboratorio abierto',desc:'Químicos e inventores: genera muchas ideas.',prod:{ideas:0.35}},
 {id:'fabrica',name:'Fábrica',req:'telar',base:{madera:30,piedra:25,carbon:5},grow:1.4,done:'Fábrica en marcha',desc:'Quema carbón y da muchas monedas. Echa mucho humo. Sin carbón, se frena.',prod:{monedas:0.3},use:{carbon:0.1},smoke:0.06,smk:[[13,0]],puffs:4},
 {id:'estacion',name:'Estación de tren',req:'ferrocarril',base:{madera:35,piedra:30},grow:1.6,done:'Llegó el tren',desc:'El tren reparte la cosecha: cada estación hace rendir +50% a todas las granjas. Echa algo de humo.',smoke:0.02,smk:[[2.6,7]]},
 {id:'puerto',name:'Puerto',req:'barcos',base:{madera:40,carbon:20},grow:1.5,done:'Puerto abierto',desc:'Va pegado al agua. Los barcos de vapor traen monedas e ideas.',prod:{monedas:0.2,ideas:0.1},water:'El puerto tiene que ir pegado al agua.',smoke:0.015,smk:[[6,2.5],[10,3]]},
 {id:'palacio',name:'Palacio de cristal',req:'exposiciones',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Exposición inaugurada',desc:'Los inventos se muestran al mundo: ideas +30% por cada palacio.'}],
  info:{casa:'Casa: acá viven 2 aldeanos.',granja:'Granja: produce comida.',fogata:'Fogata: genera ideas. Comer cerca rinde el doble.',aserradero:'Aserradero: produce madera.',granero:'Granero: más capacidad.',parque:'Parque: limpia el humo.',herreria:'Herrería: juntás más rápido.',cantera:'Cantera: produce piedra.',mina:'Mina: saca carbón. Echa humo.',laboratorio:'Laboratorio: genera ideas.',fabrica:'Fábrica: quema carbón y da monedas. Echa mucho humo.',estacion:'Estación: potencia las granjas. Echa humo.',puerto:'Puerto: trae monedas e ideas.',palacio:'Palacio de cristal: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[],
  tips2:[['quimica','laboratorio','un laboratorio: genera muchas ideas.'],['telar','fabrica','una fábrica para conseguir monedas.'],['barcos','puerto','un puerto pegado al agua.']],
  smogTip:'Más parques o menos fábricas.',done:'Industria completa.',
  text:{
    when:'1780 d.C.',title:'La Revolución Industrial',
    intro:'Tu ciudad descubre el carbón y el vapor. Las fábricas producen como nunca, pero llenan el aire de humo. La meta: construir la máquina analítica, la primera computadora programable.',
    news:'Novedades: carbón, minas, fábricas, trenes y humo. Con mucho humo tu gente junta y cosecha menos: los parques lo limpian.',
    legacy:'Lo que trae tu ciudad del Renacimiento',
    noLegacy:'No hay un Renacimiento terminado en este navegador: arrancás con 2 aldeanos. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del granero, lo que sobra se pierde. Las fábricas, minas, trenes y barcos echan humo: con mucho humo juntás y cosechás menos, y los parques lo limpian. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'Industria superada',winText:()=>'Terminaste la máquina analítica en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Ada Lovelace ya escribió el primer programa.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan a la Electricidad.'}
};

/* ---------- arte de la era ---------- */
const COALT=P4('#141218','#1f1c24','#2e2a36','#6a6a7a');
function coalOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],P4('#4a4440','#5d5650','#7a726a','#948b80'),null);
  for(const[x,y,r]of[[24,30,5],[38,26,4.5],[42,38,5],[28,40,4],[18,36,3.5],[33,34,3]])blob(a,[[x,y,r]],COALT,null);
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa de ladrillo de dos pisos, techo de pizarra y dos chimeneas.
function brickHouseArt(){return mkA(64,64,a=>{const WF=hx('#f6f1e4');brickWall(a,8,26,38,34);brickWall(a,46,26,10,34,true);
  for(const x of[14,44]){rect(a,x,2,6,12,BRICK[1]);rect(a,x-1,1,8,2,BRICK[0]);rect(a,x+1,0,1,2,IRON[2]);rect(a,x+4,0,1,2,IRON[2]);}
  poly(a,[[10,12],[54,12],[58,26],[6,26]],(x,y)=>((y>>1)&1)?SLATE[2]:SLATE[3]);rect(a,6,25,52,2,SLATE[0]);
  for(const x of[13,29,43]){rect(a,x,31,8,10,WF);rect(a,x+1,32,6,8,DKW);rect(a,x+3,32,1,8,WF);rect(a,x+1,35,6,1,WF);rect(a,x-1,41,10,1,STONE2[3]);}
  rect(a,8,45,48,2,STONE2[2]);rect(a,27,49,10,11,hx('#2f4a3a'));rect(a,27,48,10,1,STONE2[3]);rect(a,34,54,1,1,GOLD);rect(a,25,58,14,2,STONE2[2]);
  for(const x of[13,44]){rect(a,x,50,8,7,WF);rect(a,x+1,51,6,5,DKW);rect(a,x+4,51,1,5,WF);}
  outlineAll(a,OUTL);});}
// Fábrica: nave de ladrillo con techo en diente de sierra y una chimenea alta (el humo se dibuja aparte).
function factoryArt(){return mkA(64,64,a=>{for(let y=0;y<44;y++){const w=y<3?10:8,x0=y<3?47:48;for(let i=0;i<w;i++)a.set(x0+i,y,y%4===3?MORT:i<3?BRICK[3]:i>5?BRICK[1]:BRICK[2]);}
  rect(a,47,10,10,2,BRICK[0]);rect(a,47,24,10,2,BRICK[0]);
  brickWall(a,2,30,46,30);rect(a,2,58,46,2,BRICK[0]);
  for(let k=0;k<3;k++){const x0=2+k*15;poly(a,[[x0+4,18],[x0+16,30],[x0+4,30]],(x,y)=>((y>>1)&1)?SLATE[1]:SLATE[2]);rect(a,x0,18,4,12,GLASS[1]);rect(a,x0+1,19,1,10,GLASS[3]);}
  for(let x=6;x<44;x+=9){rect(a,x,36,6,9,DKW);for(let j=0;j<9;j+=3)rect(a,x,36+j,6,1,IRON[2]);rect(a,x+2,36,1,9,IRON[2]);rect(a,x,35,6,1,STONE2[3]);}
  rect(a,19,48,12,12,WOOD[1]);rect(a,19,48,12,1,WOOD[3]);rect(a,24,48,2,12,WOOD[0]);
  blob(a,[[39,57,4],[44,58,3]],COALT,null);outlineAll(a,OUTL);});}
// Mina de carbón: casilla de la bomba de vapor, castillete con la rueda y una vagoneta.
function mineArt(){return mkA(64,64,a=>{rect(a,6,8,5,20,BRICK[2]);rect(a,5,6,7,3,BRICK[0]);brickWall(a,2,34,20,26);gable(a,0,24,24,34,SLATE);rect(a,8,46,7,14,hx('#2a1a12'));
  line(a,30,60,38,12,WOOD[2],2);line(a,54,60,46,12,WOOD[2],2);line(a,32,46,52,46,WOOD[1],2);line(a,35,30,49,30,WOOD[1],2);line(a,33,46,49,30,WOOD[1],1);line(a,51,46,35,30,WOOD[1],1);
  rect(a,42,10,1,38,IRON[1]);
  for(let j=-8;j<=8;j++)for(let i=-8;i<=8;i++){const d=Math.hypot(i,j);if((d>=5.4&&d<=7.2)||(d<5.4&&(Math.abs(i)<=0.6||Math.abs(j)<=0.6)))a.set(42+i,10+j,d<1.5?IRON[0]:d>=5.4?IRON[3]:IRON[2]);}
  rect(a,33,47,18,2,WOOD[3]);rect(a,34,49,16,11,hx('#1b1a24'));
  rect(a,50,52,12,6,IRON[1]);rect(a,50,52,12,1,IRON[3]);blob(a,[[54,51,3],[58,51,3]],COALT,null);for(const x of[52,60])ell(a,x,59,1.6,1.6,IRON[0]);
  outlineAll(a,OUTL);});}
// Laboratorio: piedra, claraboya de vidrio y un ventanal lleno de frascos.
function labArt(){return mkA(64,64,a=>{stoneWall(a,6,28,52,32);gable(a,2,62,10,28,SLATE);
  poly(a,[[28,15],[36,15],[41,25],[23,25]],(x,y)=>(x%4===0||y%4===0)?IRON[2]:((x+y)&4)?GLASS[2]:GLASS[1]);
  rect(a,10,34,30,18,DKW);rect(a,10,33,30,1,STONE2[3]);rect(a,9,52,32,2,STONE2[3]);rect(a,10,43,30,1,WOOD[2]);
  [['#5fe3d0',13],['#93d36c',21],['#f08a7c',29],['#ffd35a',35]].forEach(([c,x],k)=>{const C=hx(c);rect(a,x,35,2,3,GLASS[2]);ell(a,x+1,40,3,2.5,C);a.set(x,39,hx('#ffffff'));rect(a,x+(k%2?2:0),46,2,6,C);rect(a,x+(k%2?2:0),45,2,1,GLASS[3]);});
  rect(a,44,40,10,20,WOOD[1]);ell(a,49,40,5,4,(i,j)=>j<=0?WOOD[1]:null);rect(a,49,40,1,20,WOOD[0]);
  outlineAll(a,OUTL);});}
// Estación de tren: edificio con reloj, andén, vías y una locomotora.
function stationArt(){return mkA(64,64,a=>{brickWall(a,24,20,38,24);gable(a,22,63,4,20,SLATE);ell(a,43,13,5,5,IRON[0]);ell(a,43,13,4,4,hx('#f6f1e4'));rect(a,43,10,1,4,IRON[0]);rect(a,43,13,3,1,IRON[0]);
  for(const x of[29,40,51]){rect(a,x,30,7,14,DKW);ell(a,x+3,30,3.5,3,(i,j)=>j<=0?DKW:null);}
  rect(a,0,44,64,6,STONE2[2]);rect(a,0,44,64,1,STONE2[3]);rect(a,0,58,64,1,IRON[3]);for(let x=1;x<64;x+=5)rect(a,x,59,3,2,WOOD[1]);
  const LOC=hx('#2f5a3a');rect(a,24,32,14,20,LOC);rect(a,22,30,18,3,IRON[0]);rect(a,28,36,6,6,DKW);
  rect(a,4,40,22,12,IRON[1]);rect(a,4,40,22,2,IRON[3]);rect(a,4,50,22,2,IRON[0]);rect(a,2,41,2,10,IRON[0]);for(const x of[10,18])rect(a,x,40,1,12,GOLD);
  rect(a,8,30,5,10,IRON[1]);rect(a,7,28,7,3,IRON[0]);ell(a,20,39,3,2,(i,j)=>j<=0?GOLD:null);
  for(const[x,r]of[[11,4],[21,4],[32,3]]){ell(a,x,54,r,r,RED);ell(a,x,54,1.2,1.2,IRON[0]);}rect(a,11,54,21,1,IRON[3]);poly(a,[[0,50],[4,50],[4,57],[0,57]],RED);
  outlineAll(a,OUTL);});}
// Puerto con un barco de vapor de ruedas.
function steamshipArt(){return mkA(64,64,a=>{rect(a,0,48,64,8,WOOD[2]);for(let x=0;x<64;x+=6)rect(a,x,48,1,8,WOOD[1]);rect(a,0,48,64,2,WOOD[3]);for(const x of[4,30,56])rect(a,x,56,4,8,WOOD[1]);
  rect(a,54,8,1,26,WOOD[0]);rect(a,8,12,1,22,WOOD[0]);
  for(const[x,y]of[[22,10],[38,12]]){rect(a,x,y,5,26-y,RED);rect(a,x,y,5,3,IRON[0]);}
  rect(a,12,26,40,8,hx('#f6f1e4'));rect(a,12,26,40,1,hx('#ffffff'));for(let x=15;x<50;x+=5)rect(a,x,29,2,2,DKW);
  poly(a,[[2,34],[62,34],[56,46],[8,46]],(x,y)=>y<38?IRON[2]:IRON[1]);rect(a,5,38,54,2,RED);
  ell(a,32,35,8,8,(i,j)=>j>0?null:(Math.round(Math.atan2(j,i)*6/Math.PI)&1)?WOOD[3]:WOOD[1]);
  outlineAll(a,OUTL);});}
// Palacio de cristal para las exposiciones: bóvedas de vidrio con marcos blancos.
function crystalArt(){return mkA(64,64,a=>{const FR=hx('#f6f1e4');rect(a,2,36,60,24,GLASS[1]);ell(a,32,36,30,10,(i,j)=>j<=0?GLASS[2]:null);rect(a,20,28,24,32,GLASS[2]);ell(a,32,28,12,13,(i,j)=>j<=0?GLASS[3]:null);
  for(let y=0;y<64;y++)for(let x=0;x<64;x++){const c=a.get(x,y);if(c!==GLASS[1]&&c!==GLASS[2]&&c!==GLASS[3])continue;if(x%6===2||y%6===0)a.set(x,y,FR);else if(x>50)a.set(x,y,mulc(c,0.85));}
  for(let t=0;t<12;t++){if(a.get(8+t,58-t))a.set(8+t,58-t,hx('#ffffff'));if(a.get(24+t,58-t))a.set(24+t,58-t,hx('#ffffff'));}
  rect(a,28,48,8,12,DKW);rect(a,27,47,10,1,FR);rect(a,32,8,1,8,IRON[0]);poly(a,[[33,8],[39,10],[33,12]],RED);
  outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#4a4e5a',C:'#33363f',j:'#7a5434',y:'#3a2418'},{c:'#6b4f38',C:'#4f3a2a',j:'#2a2a3a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#2f4a6e',C:'#203450',j:'#d8d0bc',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:coalOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:[fireArt(0),fireArt(1)],
  casa:brickHouseArt(),granja:granjaArt(),aserradero:sawmillArt(),granero:barnArt(),herreria:forgeArt(),cantera:quarryArt(),parque:parkArt(),mina:mineArt(),laboratorio:labArt(),fabrica:factoryArt(),estacion:stationArt(),puerto:steamshipArt(),palacio:crystalArt(),
  hero:[personArt({c:'#2f6b6b',C:'#1f4a4a',j:'#d4ae62'},0),personArt({c:'#2f6b6b',C:'#1f4a4a',j:'#d4ae62'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
