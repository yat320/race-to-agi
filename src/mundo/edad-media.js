// Edad Media del mundo abierto: hierro, monasterios, ferias, molinos y la imprenta. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:3,name:'Edad Media',de:'de la Edad Media',next:{file:'mundo4.html',to:'al Renacimiento'},
  ore:{id:'hierro',name:'Hierro',col:'#b8c4d6',empty:'Veta de hierro agotada',gather:'hierro',icon:[['........','........','..kkkkk.','.kvqqqQk','kqqqqQQk','kQQQQQk.','.kkkkk..','........'],{q:'#9aa6b8',Q:'#5d6270',v:'#e3e8f0'}]},
  storage:{id:'granero',name:'Granero'},ideaBuild:'universidad',ideaTechs:['monasterios','universidades','anteojos'],boostTech:'reloj',farmBuild:'molino',nightTech:'anteojos',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','monasterio','hospital','puerto','universidad'],
  // La peste enferma los edificios donde se junta gente y se contagia; el hospital los cuida a 4 casilleros (reglas en motor.html).
  plague:['casa','monasterio','feria','puerto','universidad'],defense:{id:'hospital',r:4,label:'Hospitales',of:['casa','monasterio','feria','puerto','universidad']},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo2-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la Antigüedad',perks:[
    ['anticitera','ideaMult',1.25,'Mecanismo de Anticitera: ideas +25% durante toda la era'],
    ['irrigacion','agri',1.25,'Irrigación: granjas +25%']
  ]},
  techs:[
 {id:'forja',name:'Forja del hierro',cost:{hierro:15,ideas:30},req:[],desc:'Desbloquea la herrería y la cantera.'},
 {id:'monasterios',name:'Monasterios',cost:{piedra:15,ideas:35},req:[],desc:'Desbloquea el monasterio, donde los monjes copian libros, y el hospital, que frena la peste. Ideas +50%.'},
 {id:'gremios',name:'Gremios',cost:{hierro:20,ideas:50},req:['forja'],desc:'Desbloquea la feria, que cambia comida por monedas.'},
 {id:'molinos',name:'Molinos de viento',cost:{madera:40,piedra:20,ideas:65},req:['monasterios'],desc:'Desbloquea el molino, que potencia las granjas.'},
 {id:'rutas',name:'Rutas comerciales',cost:{madera:60,hierro:20,ideas:95},req:['gremios'],desc:'Desbloquea el puerto: comercio con otras ciudades. Los barcos traen peste: brota 30% más seguido.'},
 {id:'universidades',name:'Universidades',cost:{monedas:30,ideas:130},req:['monasterios','gremios'],desc:'Desbloquea la universidad. Ideas +50%.'},
 {id:'anteojos',name:'Anteojos',cost:{monedas:45,ideas:270},req:['rutas','universidades'],desc:'Los sabios leen hasta viejos: ideas +50%. De noche ves más lejos.'},
 {id:'reloj',name:'Reloj mecánico',cost:{hierro:60,monedas:45,ideas:320},req:['forja','universidades'],desc:'Engranajes que miden el tiempo: todos los edificios producen +50%.'},
 {id:'imprenta',name:'Imprenta',cost:{piedra:110,hierro:90,monedas:100,ideas:650},req:['anteojos','reloj'],desc:'Tipos móviles de metal: los libros se copian por miles. Cierra la Edad Media.'}],
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',name:'Granja',req:null,base:{madera:12,comida:4},grow:1.25,done:'Granja lista',desc:'Produce comida sola.',prod:{comida:0.2},noSand:true},
 {id:'fogata',name:'Fogata',req:null,base:{madera:5,piedra:4},grow:1.6,done:'Fogata encendida',desc:'Genera ideas y alumbra de noche. Comer cerca rinde el doble.',prod:{ideas:0.12}},
 {id:'aserradero',name:'Aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,done:'Aserradero listo',desc:'Produce madera solo.',prod:{madera:0.12}},
 {id:'granero',name:'Granero',req:null,base:{madera:25,piedra:15},grow:1.4,done:'Granero construido',desc:'+150 de capacidad para cada recurso. Las ideas no tienen límite.'},
 {id:'herreria',name:'Herrería',req:'forja',base:{madera:25,piedra:20,hierro:10},grow:1.6,done:'Herrería lista',desc:'Herramientas de hierro: vos y los aldeanos juntan +30% por cada herrería.'},
 {id:'cantera',name:'Cantera',req:'forja',base:{madera:20,hierro:8},grow:1.35,done:'Cantera lista',desc:'Produce piedra sola.',prod:{piedra:0.12}},
 {id:'monasterio',name:'Monasterio',req:'monasterios',base:{piedra:40,hierro:10},grow:1.5,done:'Monasterio construido',desc:'Los monjes copian libros: genera muchas ideas.',prod:{ideas:0.35}},
 {id:'hospital',name:'Hospital',req:'monasterios',base:{madera:25,piedra:20,hierro:5},grow:1.4,done:'Hospital abierto',desc:'Lo que está a 4 casilleros no se contagia de peste, y lo que ya estaba enfermo se cura solo.'},
 {id:'feria',name:'Feria',req:'gremios',base:{madera:30,piedra:15,hierro:5},grow:1.4,done:'Feria abierta',desc:'Cambia comida por monedas. Si no hay comida, se frena.',prod:{monedas:0.12},use:{comida:0.2}},
 {id:'molino',name:'Molino',req:'molinos',base:{madera:35,piedra:30},grow:1.6,done:'Molino girando',desc:'Cada molino hace producir +50% a todas las granjas.'},
 {id:'puerto',name:'Puerto',req:'rutas',base:{madera:40,hierro:20},grow:1.5,done:'Puerto abierto',desc:'Va pegado al agua. El comercio trae monedas e ideas.',prod:{monedas:0.2,ideas:0.1},water:'El puerto tiene que ir pegado al agua.'},
 {id:'universidad',name:'Universidad',req:'universidades',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Universidad abierta',desc:'Ideas +30% por cada universidad.'}],
  info:{casa:'Casa: acá viven 2 aldeanos.',granja:'Granja: produce comida.',fogata:'Fogata: genera ideas. Comer cerca rinde el doble.',aserradero:'Aserradero: produce madera.',granero:'Granero: más capacidad.',herreria:'Herrería: juntás más rápido.',cantera:'Cantera: produce piedra.',monasterio:'Monasterio: genera ideas.',hospital:'Hospital: cuida de la peste lo que está a 4 casilleros.',feria:'Feria: cambia comida por monedas.',molino:'Molino: potencia las granjas.',puerto:'Puerto: trae monedas e ideas.',universidad:'Universidad: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['monasterios','hospital','un hospital en el medio de la ciudad: frena la peste.']],
  tips2:[['monasterios','monasterio','un monasterio: genera muchas ideas.'],['gremios','feria','una feria para conseguir monedas.'],['rutas','puerto','un puerto pegado al agua.']],
  smogTip:'',done:'Edad Media completa.',
  deco:(o,px,py)=>{if(o.t==='molino'){ctx.save();ctx.translate(px+8,py+5);ctx.rotate(st.time*1.2);ctx.drawImage(HS.aspas,-8,-8,16,16);ctx.restore();}},
  text:{
    when:'476 d.C.',title:'La Edad Media',
    intro:'Tu pueblo ya es una ciudad. Hay hierro en las colinas, monasterios donde se copian libros y ferias donde se comercia. Pero también hay peste: se contagia entre casas, monasterios, ferias, puertos y universidades, y lo que se enferma rinde la mitad. La meta: construir la imprenta, para que el conocimiento se copie por miles.',
    news:'Novedades: hierro, monasterios, ferias, molinos de viento, universidades y la peste: tocá lo que se enferma para curarlo antes de que contagie. Los hospitales cuidan lo que tienen alrededor.',
    legacy:'Lo que trae tu ciudad de la Antigüedad',
    noLegacy:'No hay una Antigüedad terminada en este navegador: arrancás con 2 aldeanos. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del granero, lo que sobra se pierde. A veces brota la peste: lo que se enferma rinde la mitad (en una casa enferma, los aldeanos andan y trabajan a la mitad) y contagia lo que tiene cerca. Tocalo para curarlo; los hospitales cuidan lo que tienen alrededor. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'Edad Media superada',winText:()=>'Terminaste la imprenta en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Los libros ya se copian por miles.',
    winNote:'Es un prototipo: no suma al progreso de las eras. Tu ciudad, tus ideas y tus monedas pasan al Renacimiento.'}
};

/* ---------- arte de la era ---------- */
function harborArt(){return mkA(64,64,a=>{rect(a,0,44,64,10,WOOD[2]);for(let x=0;x<64;x+=6)rect(a,x,44,1,10,WOOD[1]);rect(a,0,44,64,2,WOOD[3]);for(const x of[4,30,56])rect(a,x,54,4,10,WOOD[1]);
  poly(a,[[6,38],[52,38],[46,44],[12,44]],WOOD[2]);rect(a,8,38,44,2,WOOD[3]);rect(a,28,4,2,34,WOOD[1]);poly(a,[[31,6],[31,34],[54,34]],(x,y)=>x<36?hx('#f6f1e4'):hx('#e3ddcc'));poly(a,[[27,10],[27,32],[12,32]],hx('#d8d0bc'));
  rect(a,30,2,8,3,hx('#c8413b'));outlineAll(a,OUTL);});}
function ironOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],ROCK,null);
  const r=mulberry32(19);for(let k=0;k<12;k++){const x=12+Math.floor(r()*40),y=16+Math.floor(r()*26);if(!a.get(x,y)||!a.get(x+3,y+2))continue;ell(a,x+1.5,y+1,2.4,1.5,r()<0.6?RUST[1]:RUST[2]);a.set(x+1,y,hx('#3e4250'));}
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
function halfTimberArt(){return mkA(64,64,a=>{rect(a,8,30,48,30,PLAST[2]);rect(a,44,30,12,30,PLAST[1]);
  for(const x of[8,24,40,54])rect(a,x,30,2,30,BEAM);rect(a,8,30,48,2,BEAM);rect(a,8,44,48,2,BEAM);line(a,10,32,23,43,BEAM,2);line(a,41,43,53,32,BEAM,2);
  rect(a,28,46,9,14,hx('#4a2e1c'));rect(a,28,46,9,1,WOOD[3]);rect(a,13,48,7,6,hx('#2a1a12'));rect(a,12,48,1,6,WOOD[2]);rect(a,20,48,1,6,WOOD[2]);
  gable(a,2,62,2,30,SLATE);rect(a,4,29,56,2,SLATE[0]);rect(a,44,4,6,12,STONE2[1]);rect(a,43,3,8,2,STONE2[0]);outlineAll(a,OUTL);});}
function abbeyArt(){return mkA(64,64,a=>{stoneWall(a,4,30,40,30);rect(a,4,58,40,2,STONE2[0]);gable(a,2,46,14,30,SLATE);rect(a,2,29,44,2,SLATE[0]);
  for(const x of[10,30]){rect(a,x,38,6,10,hx('#2a2a3a'));ell(a,x+3,38,3,3,(i,j)=>j<=0?hx('#2a2a3a'):null);rect(a,x+1,40,1,6,hx('#5b9cc9'));}
  rect(a,19,44,10,16,hx('#3a2418'));ell(a,24,44,5,4,(i,j)=>j<=0?hx('#3a2418'):null);
  stoneWall(a,44,10,16,50);for(let y=6;y<10;y++)rect(a,44+(y-6),y,16-2*(y-6),1,SLATE[2]);poly(a,[[52,0],[61,10],[43,10]],(x,y)=>x<52?SLATE[2]:SLATE[1]);
  rect(a,48,16,8,8,hx('#1b1a24'));ell(a,52,20,2.5,2.5,hx('#e8c05a'));rect(a,48,58,16,2,STONE2[0]);outlineAll(a,OUTL);});}
function fairArt(){return mkA(64,64,a=>{const tent=(x0,c1,c2)=>{poly(a,[[x0+12,10],[x0+26,30],[x0-2,30]],(x,y)=>((x>>2)&1)?c1:c2);rect(a,x0,30,24,26,c2);for(let x=x0;x<x0+24;x+=6)rect(a,x,30,3,26,c1);rect(a,x0+8,40,8,16,hx('#2a1a12'));rect(a,x0+11,4,2,8,WOOD[1]);poly(a,[[x0+13,4],[x0+20,6],[x0+13,8]],c1);};
  tent(2,hx('#c8413b'),hx('#f6f1e4'));tent(36,hx('#4a78b8'),hx('#ecd67e'));
  for(let x=0;x<64;x+=1){const y=26+Math.round(Math.sin(x/64*Math.PI)*4);if(x%7<5)a.set(x,y,WOOD[0]);}for(let k=0;k<8;k++){const x=4+k*8,y=27+Math.round(Math.sin((x)/64*Math.PI)*4);poly(a,[[x,y],[x+5,y],[x+2.5,y+5]],[hx('#e8c05a'),hx('#c8413b'),hx('#5fe3d0'),hx('#93d36c')][k%4]);}
  rect(a,26,50,12,8,WOOD[2]);rect(a,26,50,12,2,WOOD[3]);outlineAll(a,OUTL);});}
function millArt(){return mkA(64,64,a=>{poly(a,[[22,20],[42,20],[48,60],[16,60]],(x,y)=>x>38?STONE2[1]:((((y/5)|0)+((x/7)|0))%3?STONE2[2]:STONE2[3]));for(let y=24;y<60;y+=5)for(let x=16;x<49;x++)if(a.get(x,y))a.set(x,y,STONE2[0]);
  poly(a,[[32,6],[46,22],[18,22]],(x,y)=>x<32?WOOD[3]:WOOD[2]);rect(a,18,21,28,2,WOOD[0]);rect(a,27,46,10,14,hx('#3a2418'));ell(a,32,46,5,4,(i,j)=>j<=0?hx('#3a2418'):null);rect(a,29,30,6,6,hx('#2a1a12'));
  outlineAll(a,OUTL);});}
// Aspas del molino: se dibujan aparte y giran.
function sailsArt(){return mkA(64,64,a=>{for(let k=0;k<4;k++){const an=k*Math.PI/2,c=Math.cos(an),s2=Math.sin(an);
  for(let t=4;t<31;t++){const x=32+c*t,y=32+s2*t;a.set(x,y,WOOD[1]);a.set(x+s2,y-c,WOOD[1]);for(let w=2;w<9;w++){const X=x-s2*w,Y=y+c*w;a.set(X,Y,(t%5===0||w===8)?WOOD[1]:hx('#ece6d6'));}}}
  ell(a,32,32,3.5,3.5,WOOD[0]);ell(a,32,32,1.5,1.5,WOOD[3]);outlineAll(a,OUTL);});}
function univArt(){return mkA(64,64,a=>{stoneWall(a,12,26,40,34);for(const x of[2,50]){stoneWall(a,x,16,12,44);poly(a,[[x+6,0],[x+14,16],[x-2,16]],(X,Y)=>X<x+6?BLUER[2]:BLUER[1]);rect(a,x+4,26,4,7,hx('#2a2a3a'));}
  gable(a,10,54,14,26,BLUER);rect(a,10,25,44,2,BLUER[0]);for(const x of[18,40]){rect(a,x,32,6,10,hx('#2a2a3a'));ell(a,x+3,32,3,3,(i,j)=>j<=0?hx('#2a2a3a'):null);rect(a,x+2,34,2,6,hx('#ffd35a'));}
  rect(a,27,44,10,16,hx('#3a2418'));ell(a,32,44,5,4,(i,j)=>j<=0?hx('#3a2418'):null);rect(a,30,30,4,8,hx('#c8413b'));rect(a,2,58,60,2,STONE2[0]);outlineAll(a,OUTL);});}
// Hospital: sala encalada sobre zócalo de piedra, techo de tejas, espadaña con campana y un cartel con una hoja de hierbas.
function hospitalArt(){return mkA(64,64,a=>{rect(a,4,32,56,28,PLAST[2]);rect(a,46,32,14,28,PLAST[1]);stoneWall(a,4,52,56,8);
  gable(a,0,63,12,32,TERRA);rect(a,0,31,64,2,TERRA[0]);
  stoneWall(a,27,1,10,15);rect(a,29,6,6,7,hx('#1b1a24'));ell(a,32,6,3,3,(i,j)=>j<=0?hx('#1b1a24'):null);ell(a,32,10,2.5,2.5,hx('#e8c05a'));rect(a,31,12,2,1,hx('#a07a2a'));
  for(const x of[9,47]){rect(a,x,38,8,10,hx('#2a2a3a'));ell(a,x+4,38,4,3,(i,j)=>j<=0?hx('#2a2a3a'):null);rect(a,x+2,40,4,7,hx('#ffd35a'));rect(a,x+3.5,40,1,7,hx('#2a2a3a'));}
  rect(a,26,44,12,16,hx('#3a2418'));ell(a,32,44,6,5,(i,j)=>j<=0?hx('#3a2418'):null);rect(a,31,40,2,20,WOOD[1]);
  rect(a,26,33,12,7,hx('#f6f1e4'));rect(a,26,33,12,1,WOOD[1]);ell(a,32,36.5,4,2,hx('#3f8f47'));line(a,28,37,36,36,hx('#24532a'),1);
  for(const x of[17,43]){rect(a,x,54,6,6,TERRA[1]);rect(a,x,54,6,1,TERRA[2]);ell(a,x+3,52,4,3,LEAF[2]);ell(a,x+2,51,2,1.5,LEAF[3]);}
  outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#8c3a2a',C:'#5f2419',j:'#d4ae62',y:'#6b4526'},{c:'#4f6d8c',C:'#35506a',j:'#7a5434',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#8a7a5a',C:'#655a40',j:'#4f3522',y:'#c9a45a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:ironOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:[fireArt(0),fireArt(1)],
  casa:halfTimberArt(),granja:granjaArt(),aserradero:sawmillArt(),granero:barnArt(),herreria:forgeArt(),cantera:quarryArt(),monasterio:abbeyArt(),feria:fairArt(),molino:millArt(),aspas:sailsArt(),puerto:harborArt(),universidad:univArt(),hospital:hospitalArt(),
  hero:[personArt({c:'#5d7a3a',C:'#435a28',j:'#7a5434'},0),personArt({c:'#5d7a3a',C:'#435a28',j:'#7a5434'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
