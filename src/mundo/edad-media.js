// Edad Media del mundo abierto: hierro, monasterios, ferias, molinos y la imprenta. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:3,name:'Edad Media',de:'de la Edad Media',obra:'la imprenta',next:{file:'mundo4.html',to:'al Renacimiento'},
  ore:{id:'hierro',name:'Hierro',col:'#b8c4d6',empty:'Veta de hierro agotada',gather:'hierro',icon:[['........','........','..kkkkk.','.kvqqqQk','kqqqqQQk','kQQQQQk.','.kkkkk..','........'],{q:'#9aa6b8',Q:'#5d6270',v:'#e3e8f0'}]},
  storage:{id:'granero'},ideaBuild:'universidad',ideaTechs:['monasterios','universidades'],boostTech:'reloj',farmBuild:'molino',nightTech:'rutas',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','monasterio','hospital','puerto','universidad'],
  // La peste enferma los edificios donde se junta gente y se contagia; el hospital los cuida a 4 casilleros (reglas en motor.html).
  plague:['casa','monasterio','feria','puerto','universidad'],defense:{id:'hospital',r:4,label:'Hospitales',of:['casa','monasterio','feria','puerto','universidad']},
  // Adentro (octubre de 2026): en lo que produce, oficios (3 puestos; cada uno suma `v` a lo que produce ese edificio); lo demás
  // se mejora hasta el nivel 3 (el efecto de cada nivel está en motor.html; el nivel 3 pide además hierro).
  oficios:{granja:{n:'Campesino',ns:'Campesinos',v:0.5},fogata:{n:'Juglar',ns:'Juglares',v:0.5},aserradero:{n:'Leñador',ns:'Leñadores',v:0.5},
    cantera:{n:'Cantero',ns:'Canteros',v:0.5},monasterio:{n:'Copista',ns:'Copistas',v:0.4},feria:{n:'Feriante',ns:'Feriantes',v:0.5},puerto:{n:'Marinero',ns:'Marineros',v:0.5}},
  niveles:['casa','granero','herreria','hospital','molino','universidad','cuartel'],levelExtra:[{},{hierro:8}],
  // Como la Prehistoria (octubre de 2026): obras a mano y mundo vivo (cabras, sequía que el molino salva, mercaderes desde los
  // gremios y barcos en el puerto; src/mundo/amenazas/vida.js).
  obras:true,vida:true,
  // Explorar (octubre de 2026, Juani: "llevá lo mismo a la Edad Media", después de la Antigüedad): niebla y hallazgos lejos del
  // pueblo; sin piratas, el campamento es de bandidos (src/mundo/amenazas/explora.js).
  explora:{nombres:{ruinas:'unas ruinas romanas',oraculo:'una ermita en la colina'}},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'medico',building:'Casa del médico',unit:'Médico',done:'Casa del médico lista: llegó un médico',desc:'Trae un médico que sale solo a curar los edificios con peste a 8 casilleros o menos.',info:'Casa del médico: su médico cura la peste cerca.',tip:'una casa del médico: el médico sale solo a curar la peste.'},
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
 {id:'rutas',name:'Rutas comerciales',cost:{madera:60,hierro:20,ideas:95},req:['gremios'],desc:'Desbloquea el puerto: comercio con otras ciudades. Los barcos traen peste: brota 30% más seguido. De noche ves más lejos.'},
 {id:'universidades',name:'Universidades',cost:{monedas:30,ideas:130},req:['monasterios','gremios'],desc:'Desbloquea la universidad. Ideas +50%.'},
 {id:'reloj',name:'Reloj mecánico',cost:{hierro:45,monedas:35,ideas:220},req:['forja','universidades'],desc:'Engranajes que miden el tiempo: todos los edificios producen +50%.'},
 {id:'imprenta',name:'Imprenta',cost:{piedra:80,hierro:60,monedas:60,ideas:450},req:['rutas','reloj'],desc:'Tipos móviles de metal: los libros se copian por miles. Cierra la Edad Media.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Herrería',req:'forja',base:{madera:25,piedra:20,hierro:10},grow:1.6,done:'Herrería lista',desc:'Herramientas de hierro: vos y los aldeanos juntan +30% por cada herrería.'},
 {id:'cantera',req:'forja',base:{madera:20,hierro:8},grow:1.35,prod:{piedra:0.12}},
 {id:'monasterio',name:'Monasterio',req:'monasterios',base:{piedra:40,hierro:10},grow:1.5,done:'Monasterio construido',desc:'Los monjes copian libros: genera muchas ideas.',prod:{ideas:0.35}},
 {id:'hospital',name:'Hospital',req:'monasterios',base:{madera:25,piedra:20,hierro:5},grow:1.4,done:'Hospital abierto',desc:'Lo que está a 4 casilleros no se contagia de peste, y lo que ya estaba enfermo se cura solo.'},
 {id:'feria',name:'Feria',req:'gremios',base:{madera:30,piedra:15,hierro:5},grow:1.4,done:'Feria abierta',desc:'Cambia comida por monedas. Si no hay comida, se frena.',prod:{monedas:0.12},use:{comida:0.2}},
 {id:'molino',name:'Molino',req:'molinos',base:{madera:35,piedra:30},grow:1.6,done:'Molino girando',desc:'Cada molino hace producir +50% a todas las granjas.'},
 {id:'puerto',name:'Puerto',req:'rutas',base:{madera:40,hierro:20},grow:1.5,done:'Puerto abierto',desc:'Va pegado al agua. El comercio trae monedas e ideas.',prod:{monedas:0.2,ideas:0.1},water:'El puerto tiene que ir pegado al agua.'},
 {id:'universidad',name:'Universidad',req:'universidades',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Universidad abierta',desc:'Ideas +30% por cada universidad.'}],
  info:{casa:'Casa: acá viven 2 aldeanos.',herreria:'Herrería: juntás más rápido.',monasterio:'Monasterio: genera ideas.',hospital:'Hospital: cuida de la peste lo que está a 4 casilleros.',feria:'Feria: cambia comida por monedas.',molino:'Molino: potencia las granjas.',puerto:'Puerto: trae monedas e ideas.',universidad:'Universidad: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['monasterios','hospital','un hospital en el medio de la ciudad: frena la peste.']],
  tips2:[['monasterios','monasterio','un monasterio: genera muchas ideas.'],['gremios','feria','una feria para conseguir monedas.'],['rutas','puerto','un puerto pegado al agua.']],
  smogTip:'',done:'Edad Media completa.',
  deco:(o,px,py)=>{if(o.t==='molino'){ctx.save();ctx.translate(px+8,py+5);ctx.rotate(st.time*1.2);ctx.drawImage(HS.aspas,-8,-8,16,16);ctx.restore();}},
  text:{
    when:'476 d.C.',title:'La Edad Media',
    intro:'Tu pueblo ya es una ciudad. Hay hierro en las colinas, monasterios donde se copian libros y ferias donde se comercia. Pero también hay peste: se contagia entre casas, monasterios, ferias, puertos y universidades, y lo que se enferma rinde la mitad. La meta: construir la imprenta, para que el conocimiento se copie por miles.',
    news:'Novedades: hierro, monasterios, ferias, molinos de viento, universidades, adentro de cada edificio oficios (copistas, juglares, feriantes…) o mejoras hasta el nivel 3, y la peste: tocá lo que se enferma para curarlo antes de que contagie. Los hospitales cuidan lo que tienen alrededor.',
    legacy:'Lo que trae tu ciudad de la Antigüedad',
    noLegacy:'No hay una Antigüedad terminada en este navegador: arrancás con 2 aldeanos. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del granero, lo que sobra se pierde. A veces brota la peste: lo que se enferma rinde la mitad (en una casa enferma, los aldeanos andan y trabajan a la mitad) y contagia lo que tiene cerca. Tocalo para curarlo; los hospitales cuidan lo que tienen alrededor. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'Edad Media superada',winText:()=>'Terminaste la imprenta en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Los libros ya se copian por miles.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan al Renacimiento.'}
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
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:ironOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:halfTimberArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),monasterio:abbeyArt(),feria:fairArt(),molino:millArt(),aspas:sailsArt(),puerto:harborArt(),universidad:univArt(),hospital:hospitalArt(),
  hero:[personArt({c:'#5d7a3a',C:'#435a28',j:'#7a5434'},0),personArt({c:'#5d7a3a',C:'#435a28',j:'#7a5434'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
// Adentro de todo (octubre de 2026): lo que produce tiene oficios (ERA.oficios) y lo demás, niveles (ERA.niveles). Corazón de
// cada construcción (HS.in_<id>, 176×200, dos cuadros) y lo que usa cada oficio o suma cada nivel (HS.inp_<id>).
const MEK=hx('#1b1a24'),MEF=f=>f?[FIRE[0],FIRE[1],FIRE[2]]:[FIRE[1],FIRE[2],FIRE[3]],FLOUR=P4('#b3a98f','#d8d0bc','#ece6d6','#faf6ec');
const BOOKC=['#8a1f1f','#2c6a98','#3f8f47','#b38b1f','#5a3a6a','#7a5434'].map(hx);
// Una bolsa atada (de grano o de harina) y un barril con zunchos de hierro.
const meSack=(a,x,y,c)=>{c=c||STRAW;ell(a,x,y,13,15,c[1]);ell(a,x-4,y-4,5,7,c[2]);rect(a,x-4,y-18,8,5,c[0]);ell(a,x,y-20,5,3,c[1]);};
const meBarrel=(a,x,y,w,h)=>{w=w||32;h=h||44;const x0=x-w/2,y0=y-h/2;rect(a,x0,y0,w,h,WOOD[2]);rect(a,x0,y0,w/4,h,WOOD[3]);rect(a,x0+w*0.75,y0,w/4,h,WOOD[1]);
  for(const k of[0.18,0.78])rect(a,x0,y0+h*k,w,3,IRON[2]);ell(a,x,y0,w/2,4,WOOD[3]);};
const meBook=(a,x,y)=>{poly(a,[[x,y],[x+14,y-4],[x+28,y],[x+28,y+4],[x+14,y],[x,y+4]],hx('#f4f1e8'));line(a,x+14,y-4,x+14,y,MEK,1);for(let k=0;k<3;k++){rect(a,x+3,y-1+k*2-k,8,1,IRON[2]);rect(a,x+17,y-2+k*2,8,1,IRON[2]);}};
function meCoreArt(t,f){return mkA(176,200,a=>{const F=MEF(f);
  if(t==='granja'){for(const[x,y]of[[22,180],[50,180],[36,154]])meSack(a,x,y);meBarrel(a,96,170);
    line(a,140,30,140,130,WOOD[2],3);rect(a,130,30,20,3,IRON[2]);for(const dx of[-8,0,8])line(a,140+dx,30,140+dx,14,IRON[3],2);
    line(a,162,24,168,140,WOOD[2],3);ell(a,154,26,12,6,(i,j)=>j<0?IRON[3]:null);
    const hy=f?190:184;ell(a,128,184,12,9,hx('#f4f1e8'));ell(a,138,hy-10,6,6,hx('#f4f1e8'));rect(a,136,hy-18,4,4,hx('#c8413b'));rect(a,143,hy-10,4,2,STRAW[3]);rect(a,124,192,2,6,STRAW[1]);rect(a,132,192,2,6,STRAW[1]);}
  else if(t==='fogata'){poly(a,[[30,14],[146,14],[162,84],[14,84]],STONE2[1]);for(let y=20;y<84;y+=10)rect(a,24,y,128,1,STONE2[0]);rect(a,10,84,156,10,STONE2[3]);
    rect(a,14,94,20,102,STONE2[2]);rect(a,142,94,20,102,STONE2[2]);rect(a,34,94,108,102,hx('#24242c'));
    for(const x of[56,80,104])rect(a,x-14,184,30,8,WOOD[1]);const d=f?3:-3;
    poly(a,[[52,186],[60,150],[70,162],[86+d,124],[100,160],[110,146],[122,186]],F[0]);poly(a,[[64,186],[76,156],[88-d,138],[98,160],[108,186]],F[1]);poly(a,[[76,186],[88+d,158],[98,186]],F[2]);
    line(a,88,94,88,118,IRON[2],2);ell(a,88,132,22,15,IRON[1]);ell(a,88,120,22,4,IRON[2]);rect(a,66,118,44,3,IRON[3]);if(f)for(const[x,y]of[[80,110],[94,104]])rect(a,x,y,3,3,hx('#d6dae2'));}
  else if(t==='aserradero'){for(const x of[34,124]){line(a,x-14,196,x+14,150,WOOD[1],4);line(a,x+14,196,x-14,150,WOOD[1],4);}
    rect(a,8,136,158,18,WOOD[2]);rect(a,8,136,158,4,WOOD[3]);ell(a,8,145,6,9,RING[2]);ell(a,8,145,3,5,RING[1]);ell(a,166,145,6,9,RING[2]);ell(a,166,145,3,5,RING[1]);
    const sy=f?-8:8;rect(a,88,96+sy,3,92,IRON[3]);rect(a,76,92+sy,28,6,WOOD[3]);rect(a,76,186+sy,28,6,WOOD[3]);
    for(const x of[114,164])rect(a,x,24,5,72,WOOD[0]);for(let k=0;k<4;k++)rect(a,110,30+k*14,62,10,WOOD[1+(k%2)]);if(f)for(const[x,y]of[[84,160],[96,166],[80,170]])rect(a,x,y,3,2,RING[3]);}
  else if(t==='cantera'){const cx=58,cy=104,R=52;line(a,cx,cy,cx-34,196,WOOD[1],5);line(a,cx,cy,cx+34,196,WOOD[1],5);
    ell(a,cx,cy,R,R,(i,j)=>i*i+j*j>=(R-6)*(R-6)?WOOD[2]:null);for(let k=0;k<8;k++){const an=k*Math.PI/4+f*Math.PI/8;line(a,cx,cy,cx+Math.cos(an)*(R-4),cy+Math.sin(an)*(R-4),WOOD[1],3);}ell(a,cx,cy,7,7,WOOD[3]);
    line(a,cx,cy,156,22,WOOD[2],4);line(a,156,22,156,108+(f?4:0),hx('#c9b27b'),2);rect(a,138,108+(f?4:0),36,24,STONE2[2]);rect(a,138,108+(f?4:0),36,4,STONE2[3]);
    for(const[x,y,w]of[[112,168,58],[124,148,40]]){rect(a,x,y,w,28,STONE2[2]);rect(a,x,y,w,4,STONE2[3]);rect(a,x+w/2,y+4,2,24,STONE2[0]);}}
  else if(t==='monasterio'){rect(a,6,36,62,160,WOOD[1]);for(let r=0;r<5;r++){const y=40+r*31;rect(a,6,y+26,62,4,WOOD[2]);for(let x=10,k=r;x<62;x+=7,k++)rect(a,x,y+2,6,24-(k%3)*2,BOOKC[k%BOOKC.length]);}
    rect(a,116,118,8,72,WOOD[2]);rect(a,98,188,44,8,WOOD[1]);poly(a,[[90,104],[150,90],[152,100],[92,116]],WOOD[3]);meBook(a,100,100);
    rect(a,159,170,4,26,IRON[1]);rect(a,151,166,20,4,IRON[2]);rect(a,157,142,8,24,hx('#f4f1e8'));poly(a,[[157,142],[161,126+(f?3:0)],[165,142]],F[1]);rect(a,160,136,2,6,F[2]);}
  else if(t==='hospital'){rect(a,0,26,176,6,WOOD[1]);for(const x of[18,42,66,90]){line(a,x,32,x,46,STRAW[1]);blob(a,[[x,56,9],[x+4,62,6]],LEAF,null);}
    rect(a,8,96,92,100,WOOD[1]);for(const y of[96,130,164])rect(a,8,y,92,4,WOOD[2]);
    for(let r=0;r<3;r++)for(let k=0;k<4;k++){const x=22+k*22,y=118+r*34;ell(a,x,y,7,10,(r+k)%2?CLAY[2]:GLASS[1]);rect(a,x-5,y-14,10,4,WOOD[3]);}
    rect(a,116,152,56,8,WOOD[2]);for(const x of[120,164])rect(a,x,160,5,36,WOOD[1]);ell(a,144,148,20,7,IRON[2]);ell(a,144,146,16,4,WA[f?2:3]);
    rect(a,124,40,40,40,hx('#f4f1e8'));rect(a,140,46,8,28,hx('#c8413b'));rect(a,130,56,28,8,hx('#c8413b'));}
  else if(t==='feria'){for(const x of[8,162])rect(a,x,56,6,140,WOOD[1]);for(let x=8;x<168;x++)rect(a,x,48,1,22,((x>>4)&1)?hx('#2c6a98'):hx('#e8c05a'));
    for(let x=8;x<168;x+=16)ell(a,x+8,70,8,4,((x>>4)&1)?hx('#2c6a98'):hx('#e8c05a'));
    rect(a,8,140,160,10,WOOD[2]);rect(a,12,150,152,46,WOOD[1]);for(const x of[24,84,144])rect(a,x,150,2,46,WOOD[0]);
    for(const x of[28,52]){ell(a,x,132,12,8,hx('#e8c05a'));ell(a,x,128,12,4,hx('#f4d878'));}
    for(const x of[86,108]){ell(a,x,132,11,7,CLAY[2]);for(const d of[-4,0,4])line(a,x+d-2,128,x+d+2,134,CLAY[0],1);}blob(a,[[140,132,8],[152,130,8],[146,124,7]],BERRY,null);
    line(a,88,6,88,48,WOOD[2],2);poly(a,[[90,8],[120,14+(f?4:-2)],[90,24]],hx('#c8413b'));}
  else if(t==='molino'){const cx=72,cy=74,R=46;ell(a,cx,cy,R,R,(i,j)=>i*i+j*j>=(R-7)*(R-7)?WOOD[2]:null);
    for(let k=0;k<12;k++){const an=k*Math.PI/6+f*Math.PI/12;rect(a,Math.round(cx+Math.cos(an)*(R+2))-3,Math.round(cy+Math.sin(an)*(R+2))-3,7,7,WOOD[3]);}
    for(let k=0;k<4;k++){const an=k*Math.PI/2+f*Math.PI/12;line(a,cx,cy,cx+Math.cos(an)*(R-6),cy+Math.sin(an)*(R-6),WOOD[1],4);}ell(a,cx,cy,8,8,WOOD[3]);
    rect(a,cx-3,cy,6,92,WOOD[1]);rect(a,22,168,100,18,STONE2[1]);ell(a,72,168,50,9,STONE2[2]);ell(a,72,166,44,6,STONE2[3]);
    for(const[x,y]of[[142,182],[164,182],[153,156]])meSack(a,x,y,FLOUR);if(f)for(const[x,y]of[[124,176],[128,170]])rect(a,x,y,2,2,FLOUR[3]);}
  else if(t==='puerto'){for(let y=150;y<200;y++)for(let x=0;x<120;x++)a.set(x,y,(y+((x+f*4)>>3))%6?WA[1]:WA[3]);
    poly(a,[[0,116],[108,116],[94,160],[0,160]],WOOD[1]);for(let y=124;y<160;y+=9)rect(a,0,y,104-(y-116)/3,1,WOOD[0]);rect(a,0,96,32,20,WOOD[2]);rect(a,0,92,34,4,WOOD[3]);
    rect(a,58,8,4,108,WOOD[2]);const b=f?2:0;rect(a,30+b,20,58,62,FLOUR[2]);rect(a,30+b,44,58,10,hx('#c8413b'));rect(a,26,18,68,3,WOOD[2]);
    rect(a,118,150,58,50,WOOD[2]);for(let x=118;x<176;x+=10)rect(a,x,150,2,50,WOOD[1]);meBarrel(a,134,128,26,36);meBarrel(a,162,128,26,36);meBarrel(a,148,96,26,36);}
  else if(t==='universidad'){rect(a,14,92,50,104,WOOD[1]);poly(a,[[6,92],[72,92],[62,58],[16,58]],WOOD[2]);rect(a,10,128,58,8,WOOD[3]);meBook(a,24,124);rect(a,8,190,62,6,WOOD[2]);
    rect(a,126,142,6,54,RING[1]);rect(a,114,192,30,4,RING[0]);const cx=129,cy=112;ell(a,cx,cy,26,26,(i,j)=>Math.abs(Math.hypot(i,j)-24)<2?RING[2]:null);
    ell(a,cx,cy,26,10,(i,j)=>Math.abs(Math.hypot(i/24,j/8)-1)<0.12?RING[3]:null);const w=f?10:16;ell(a,cx,cy,w+2,26,(i,j)=>Math.abs(Math.hypot(i/w,j/24)-1)<0.12?RING[3]:null);ell(a,cx,cy,6,6,hx('#4a78b8'));
    rect(a,76,170,40,8,WOOD[2]);for(const x of[80,108])rect(a,x,178,4,18,WOOD[1]);}
  else if(t==='casa'){rect(a,14,120,52,76,STONE2[2]);rect(a,8,112,64,8,STONE2[3]);rect(a,24,140,32,56,hx('#24242c'));
    const d=f?2:-2;poly(a,[[28,196],[36,166],[40+d,152],[46,168],[52,196]],F[1]);poly(a,[[34,196],[40-d,172],[46,196]],F[2]);line(a,40,112,40,140,IRON[2],2);ell(a,40,150,10,8,IRON[1]);
    rect(a,100,150,66,8,WOOD[2]);for(const x of[104,158])rect(a,x,158,5,38,WOOD[1]);ell(a,118,146,10,4,CLAY[2]);rect(a,140,128,14,20,CLAY[2]);ell(a,147,128,7,3,CLAY[3]);rect(a,152,132,4,8,CLAY[1]);
    rect(a,100,70,66,5,WOOD[2]);for(const x of[106,158])rect(a,x,75,4,10,WOOD[1]);for(const x of[114,134,152])ell(a,x,60,9,10,(i,j)=>i*i+j*j<30?CLAY[3]:CLAY[2]);}
  else if(t==='granero'){for(let r=0;r<3;r++)for(let k=0;k<4-r;k++)meSack(a,24+k*34+r*17,182-r*28);meBarrel(a,152,174,30,42);meBarrel(a,152,130,30,42);rect(a,0,196,176,4,WOOD[1]);}
  else if(t==='herreria'){rect(a,10,110,72,86,BRICK[1]);for(let y=114;y<196;y+=8)rect(a,10,y,72,1,MORT);rect(a,22,124,48,30,hx('#24242c'));ell(a,46,150,20,8,(i,j)=>j<0?F[f?1:0]:F[2]);
    rect(a,6,104,80,8,STONE2[2]);poly(a,[[20,104],[72,104],[60,20],[32,20]],BRICK[2]);
    poly(a,[[90,150],[124,138+(f?6:0)],[124,162]],HIDE[1]);rect(a,124,146,10,10,WOOD[2]);
    rect(a,124,176,36,8,IRON[2]);rect(a,116,170,26,8,IRON[3]);rect(a,134,184,14,12,IRON[1]);
    const hx0=f?142:150,hy0=f?150:134;line(a,hx0,hy0,hx0+20,hy0+18,WOOD[2],3);rect(a,hx0-6,hy0-6,12,10,IRON[2]);if(f)for(const[x,y]of[[132,166],[140,160],[128,162]])rect(a,x,y,2,2,F[2]);}
  else if(t==='cuartel'){rect(a,6,40,90,156,WOOD[1]);for(const y of[40,78,116,154])rect(a,6,y+34,90,4,WOOD[2]);
    for(let r=0;r<4;r++)for(let k=0;k<4;k++){const x=18+k*21,y=58+r*38;ell(a,x,y,7,10,[GLASS[1],CLAY[2],LEAF[2],GLASS[2]][(r+k)%4]);rect(a,x-5,y-14,10,4,WOOD[3]);}
    rect(a,106,150,64,8,WOOD[2]);for(const x of[110,162])rect(a,x,158,5,38,WOOD[1]);ell(a,130,142,12,8,STONE2[2]);ell(a,130,136,9,3,STONE2[0]);line(a,134,136,144,118+(f?3:0),WOOD[3],4);
    blob(a,[[156,144,5],[160,140,4]],LEAF,null);line(a,108,30,108,60,STRAW[1]);blob(a,[[108,68,8]],LEAF,null);line(a,150,30,150,56,STRAW[1]);blob(a,[[150,64,8]],STRAW,null);}
  outlineAll(a,MEK);});}
function mePropArt(t){return mkA(112,112,a=>{
  if(t==='granja'){for(let s=-8;s<9;s+=3)line(a,36,110,36+s,60,STRAW[2],2);rect(a,28,84,16,4,STRAW[0]);meSack(a,74,94);}
  else if(t==='fogata'){rect(a,20,86,40,8,WOOD[2]);for(const x of[22,54])rect(a,x,94,5,16,WOOD[1]);ell(a,80,92,12,16,WOOD[3]);ell(a,80,92,4,4,MEK);line(a,80,78,94,40,WOOD[1],3);rect(a,90,34,8,8,WOOD[2]);}
  else if(t==='aserradero'){for(const x of[24,88]){line(a,x-10,110,x+10,82,WOOD[1],3);line(a,x+10,110,x-10,82,WOOD[1],3);}rect(a,6,76,100,8,WOOD[3]);rect(a,6,76,100,2,RING[2]);}
  else if(t==='cantera'){rect(a,18,72,62,38,STONE2[2]);rect(a,18,72,62,4,STONE2[3]);rect(a,48,76,2,34,STONE2[0]);line(a,86,108,98,80,WOOD[2],3);rect(a,92,72,14,10,WOOD[3]);line(a,82,74,90,62,IRON[3],2);}
  else if(t==='monasterio'){rect(a,48,80,8,30,WOOD[2]);rect(a,34,106,36,4,WOOD[1]);poly(a,[[18,70],[86,58],[88,68],[20,82]],WOOD[3]);meBook(a,30,66);ell(a,82,54,4,4,MEK);line(a,84,52,92,36,hx('#f4f1e8'),1);}
  else if(t==='feria'){rect(a,8,80,96,8,WOOD[2]);rect(a,12,88,88,22,WOOD[1]);ell(a,30,72,12,8,hx('#e8c05a'));ell(a,30,68,12,4,hx('#f4d878'));ell(a,64,72,11,7,CLAY[2]);blob(a,[[88,72,7],[94,66,6]],BERRY,null);}
  else if(t==='puerto'){meBarrel(a,30,90,30,40);meBarrel(a,66,90,30,40);rect(a,80,74,26,36,WOOD[2]);line(a,80,74,106,110,WOOD[1],2);line(a,106,74,80,110,WOOD[1],2);}
  else if(t==='casa'){rect(a,6,82,100,8,WOOD[2]);rect(a,8,70,96,14,STRAW[2]);rect(a,8,70,96,3,STRAW[3]);rect(a,40,64,64,12,hx('#8c3a2a'));rect(a,10,62,22,10,FLOUR[3]);for(const x of[8,98])rect(a,x,90,6,20,WOOD[1]);}
  else if(t==='granero'){for(const y of[56,104])rect(a,6,y,100,5,WOOD[2]);for(const x of[6,100])rect(a,x,10,6,100,WOOD[1]);for(const x of[30,62,86])meSack(a,x,88);meBarrel(a,36,38,22,32);meBarrel(a,70,38,22,32);}
  else if(t==='herreria'){rect(a,26,82,52,10,IRON[2]);rect(a,20,78,24,6,IRON[3]);rect(a,40,92,14,20,IRON[1]);line(a,70,72,90,52,WOOD[2],3);rect(a,84,46,14,10,IRON[2]);line(a,8,104,22,70,IRON[3],2);line(a,14,106,24,72,IRON[3],2);}
  else if(t==='hospital'){rect(a,6,82,100,8,WOOD[2]);rect(a,8,70,96,14,FLOUR[2]);rect(a,8,70,96,3,FLOUR[3]);rect(a,44,64,60,10,hx('#8a1f1f'));rect(a,70,64,6,10,FLOUR[3]);rect(a,10,62,22,10,FLOUR[3]);for(const x of[8,98])rect(a,x,90,6,20,WOOD[1]);}
  else if(t==='molino'){ell(a,56,100,46,10,STONE2[2]);rect(a,10,90,92,10,STONE2[1]);ell(a,56,90,46,8,STONE2[3]);ell(a,56,90,6,3,STONE2[0]);meSack(a,56,66,FLOUR);}
  else if(t==='universidad'){rect(a,8,74,96,8,WOOD[2]);for(const x of[12,94])rect(a,x,82,6,28,WOOD[1]);rect(a,8,96,96,4,WOOD[1]);meBook(a,20,70);for(let k=0;k<4;k++)rect(a,64+k*8,52,7,22,BOOKC[k]);}
  outlineAll(a,MEK);});}
for(const t of['granja','fogata','aserradero','cantera','monasterio','hospital','feria','molino','puerto','universidad','casa','granero','herreria','cuartel']){HS['in_'+t]=[meCoreArt(t,0),meCoreArt(t,1)];if(t!=='cuartel')HS['inp_'+t]=mePropArt(t);}
