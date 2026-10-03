// IA del mundo abierto: tierras raras, robots que se desalinean; el asistente universal. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:9,name:'IA',de:'de la IA',next:{file:'mundo10.html',to:'a la AGI'},
  ore:{id:'tierras',name:'Tierras raras',col:'#c8a8f0',empty:'Veta de tierras raras agotada',gather:'tierras raras',icon:[['........','..kkkk..','.kqvqqk.','kqqQqvqk','kQqqvqQk','.kQQqQk.','..kkkk..','........'],{q:'#9a7ac8',Q:'#5a4a8a',v:'#7ae0c8'}]},
  storage:{id:'granero',name:'Granero'},ideaBuild:'labia',ideaTechs:['redes','lenguaje'],boostTech:'chips',farmBuild:'huerta',nightTech:'chips',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','datacenter','fabrob','startup','huerta','seguridad','labia'],
  grid:'data',robots:'robotica',
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo8-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era de Internet',perks:[
    ['smartphone','ideaMult',1.25,'Teléfono inteligente: ideas +25% durante toda la era'],
    ['biotec','agri',1.25,'Biotecnología: granjas +25%']
  ]},
  techs:[
 {id:'redes',name:'Redes neuronales',cost:{tierras:15,ideas:30},req:[],desc:'Desbloquea el centro de datos, el taller y la cantera. Ideas +50%.'},
 {id:'vertical',name:'Cultivo vertical',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea la huerta vertical, que potencia las granjas.'},
 {id:'robotica',name:'Robótica',cost:{tierras:20,ideas:50},req:['redes'],desc:'Desbloquea la fábrica de robots: juntan solos y no comen, pero a veces se desalinean.'},
 {id:'software',name:'Software en la nube',cost:{madera:40,piedra:20,ideas:65},req:['redes'],desc:'Desbloquea la empresa de software, que da monedas.'},
 {id:'alineacion',name:'Alineación',cost:{madera:60,tierras:20,ideas:95},req:['robotica'],desc:'Desbloquea el instituto de alineación. Los robots se desalinean la mitad de seguido.'},
 {id:'lenguaje',name:'Modelos de lenguaje',cost:{monedas:30,ideas:130},req:['software','robotica'],desc:'Desbloquea el laboratorio de IA. Ideas +50%.'},
 {id:'interpretabilidad',name:'Interpretabilidad',cost:{monedas:45,ideas:270},req:['alineacion','lenguaje'],desc:'Entendés qué piensan: se desalinean la mitad de seguido y tardan el doble en convencer a otros.'},
 {id:'chips',name:'Chips de IA',cost:{tierras:60,monedas:45,ideas:320},req:['robotica','lenguaje'],desc:'Todo produce +50% y los robots trabajan más rápido. De noche ves más lejos.'},
 {id:'asistente',name:'Asistente universal',cost:{piedra:110,tierras:90,monedas:100,ideas:650},req:['interpretabilidad','chips'],desc:'Una IA que ayuda en cualquier tarea. Cierra la era de la IA.'}],
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',name:'Granja',req:null,base:{madera:12,comida:4},grow:1.25,done:'Granja lista',desc:'Produce comida sola.',prod:{comida:0.2},noSand:true},
 {id:'fogata',name:'Fogata',req:null,base:{madera:5,piedra:4},grow:1.6,done:'Fogata encendida',desc:'Genera ideas y alumbra de noche. Comer cerca rinde el doble.',prod:{ideas:0.12}},
 {id:'aserradero',name:'Aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,done:'Aserradero listo',desc:'Produce madera solo.',prod:{madera:0.12}},
 {id:'granero',name:'Granero',req:null,base:{madera:25,piedra:15},grow:1.4,done:'Granero construido',desc:'+150 de capacidad para cada recurso. Las ideas no tienen límite.'},
 {id:'herreria',name:'Taller',req:'redes',base:{madera:25,piedra:20,tierras:10},grow:1.6,done:'Taller listo',desc:'Herramientas inteligentes: vos, los aldeanos y los robots juntan +30% por cada taller.'},
 {id:'cantera',name:'Cantera',req:'redes',base:{madera:20,tierras:8},grow:1.35,done:'Cantera lista',desc:'Produce piedra sola.',prod:{piedra:0.12}},
 {id:'datacenter',name:'Centro de datos',req:'redes',base:{piedra:40,tierras:10},grow:1.5,done:'Centro de datos encendido',desc:'Entrena modelos: genera muchas ideas.',prod:{ideas:0.5}},
 {id:'fabrob',name:'Fábrica de robots',req:'robotica',base:{piedra:40,tierras:15},grow:1.5,done:'Llegaron 2 robots',desc:'Arma 2 robots que juntan recursos solos, más rápido y sin comer. A veces se desalinean: tocalos para corregirlos.',bots:2},
 {id:'startup',name:'Empresa de software',req:'software',base:{madera:30,piedra:25,tierras:5},grow:1.4,done:'Empresa abierta',desc:'Vende programas: da muchas monedas.',prod:{monedas:0.4}},
 {id:'huerta',name:'Huerta vertical',req:'vertical',base:{madera:35,piedra:30},grow:1.6,done:'Huerta vertical lista',desc:'Cada huerta vertical hace rendir +50% a todas las granjas.'},
 {id:'seguridad',name:'Instituto de alineación',req:'alineacion',base:{madera:30,piedra:30,monedas:20},grow:1.6,done:'Instituto abierto',desc:'Cada instituto baja 25% la chance de que un robot se desalinee.'},
 {id:'labia',name:'Laboratorio de IA',req:'lenguaje',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Laboratorio abierto',desc:'Ideas +30% por cada laboratorio.'}],
  info:{casa:'Casa: acá viven 2 aldeanos.',granja:'Granja: produce comida.',fogata:'Fogata: genera ideas. Comer cerca rinde el doble.',aserradero:'Aserradero: produce madera.',granero:'Granero: más capacidad.',herreria:'Taller: juntás más rápido.',cantera:'Cantera: produce piedra.',datacenter:'Centro de datos: genera ideas.',fabrob:'Fábrica de robots: arma robots.',startup:'Empresa de software: da monedas.',huerta:'Huerta vertical: potencia las granjas.',seguridad:'Instituto de alineación: los robots se desalinean menos.',labia:'Laboratorio de IA: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['robotica','fabrob','una fábrica de robots: juntan solos y no comen.'],['alineacion','seguridad','un instituto de alineación: tus robots se desalinean menos.']],
  tips2:[['redes','datacenter','un centro de datos: genera muchas ideas.'],['software','startup','una empresa de software para conseguir monedas.'],['vertical','huerta','una huerta vertical: potencia las granjas.']],
  smogTip:'Más parques, o represas en vez de usinas.',done:'Era de la IA completa.',
  text:{
    when:'2012 d.C.',title:'La IA',
    intro:'Las máquinas aprenden. Los robots juntan recursos solos, más rápido que nadie y sin comer, pero a veces se desalinean: dejan de hacerte caso y convierten tus recursos en clips. Tocalos para corregirlos. La meta: un asistente universal, una IA que ayuda en cualquier tarea.',
    news:'Novedades: tierras raras, robots que se desalinean, centros de datos e institutos de alineación. Ya no hay virus ni ciudades para conectar.',
    legacy:'Lo que trae tu ciudad de la era de Internet',
    noLegacy:'No hay una era de Internet terminada en este navegador: arrancás con 2 aldeanos. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del granero, lo que sobra se pierde. Las fábricas de robots arman robots que juntan solos y no comen, pero a veces se desalinean y convierten tus recursos en clips: tocalos para corregirlos antes de que convenzan a otros. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'Era de la IA superada',winText:()=>'Terminaste el asistente universal en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y robots y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Ya hay una IA que ayuda en cualquier tarea.',
    winNote:'Es un prototipo: no suma al progreso de las eras. Tu ciudad, tus ideas y tus monedas pasan a la carrera final: la AGI.'}
};

/* ---------- arte de la era ---------- */
// Veta de tierras raras: roca con pintas de colores.
function rareEarthOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],ROCK,null);
  const r=mulberry32(29);for(let k=0;k<16;k++){const x=12+Math.floor(r()*40),y=16+Math.floor(r()*26);if(!a.get(x,y)||!a.get(x+3,y+2))continue;ell(a,x+1.5,y+1,2,1.4,[hx('#7a5aa8'),hx('#3a8a7a'),hx('#b8a040')][k%3]);a.set(x+1,y,hx('#ffffff'));}
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa inteligente: techo con paneles solares, ventanal y una tira de luz.
function smartHouseArt(){return mkA(64,64,a=>{const WL=P4('#a8b0b8','#c8d0d8','#e4e8ec','#f8fafc');
  poly(a,[[4,26],[32,8],[60,26]],(x,y)=>((y>>1)&1)?SLATE[1]:SLATE[2]);
  for(let y=13;y<24;y++){const xl=Math.round(32-(y-8)*28/18)+3;for(let x=xl;x<29;x++)a.set(x,y,((x+y)%4===0||y%4===0)?hx('#8ab4e8'):hx('#24406e'));}
  rect(a,8,26,48,34,WL[2]);rect(a,46,26,10,34,WL[1]);rect(a,8,26,48,1,hx('#5fe3d0'));
  rect(a,12,32,20,14,GLASS[1]);rect(a,12,32,20,1,IRON[1]);rect(a,22,32,1,14,IRON[1]);for(let t=0;t<6;t++)a.set(15+t,43-t,GLASS[3]);
  rect(a,37,40,9,20,WOOD[2]);rect(a,44,49,1,2,GOLD);outlineAll(a,OUTL);});}
// Centro de datos: galpón blanco con ventiladores en el techo y tiras de luz.
function dataCenterArt(){return mkA(64,64,a=>{const WB=P4('#b8bcc4','#d4d8de','#eceef2','#ffffff');
  for(const x of[8,24,40]){rect(a,x,12,14,8,IRON[2]);ell(a,x+7,16,5,3,IRON[0]);ell(a,x+7,16,1.5,1,IRON[3]);}
  rect(a,2,20,60,40,WB[2]);rect(a,48,20,14,40,WB[1]);rect(a,0,18,64,3,WB[3]);rect(a,2,30,60,2,hx('#5fe3d0'));rect(a,2,46,60,2,hx('#4a78b8'));
  for(let x=6;x<46;x+=8)rect(a,x,34,5,10,DKW);rect(a,50,46,8,14,DKW);outlineAll(a,OUTL);});}
// Fábrica de robots: nave con portón y un brazo robótico amarillo.
function robotFactoryArt(){return mkA(64,64,a=>{const WH=P4('#7a828e','#9aa2ae','#bcc4ce','#dce2e8'),YL=P4('#a87a10','#d4a020','#f0c040','#ffe080');
  rect(a,40,20,8,6,YL[1]);line(a,44,20,50,8,YL[2],4);line(a,50,8,58,14,YL[2],3);ell(a,50,8,2.5,2.5,YL[3]);rect(a,56,14,5,3,IRON[0]);rect(a,57,17,1,3,IRON[0]);rect(a,60,17,1,3,IRON[0]);
  rect(a,2,28,60,32,WH[2]);rect(a,46,28,16,32,WH[1]);rect(a,0,24,64,4,WH[3]);
  rect(a,8,38,24,22,IRON[1]);for(let y=39;y<60;y+=2)rect(a,8,y,24,1,IRON[0]);
  rect(a,38,40,18,8,DKW);rect(a,40,42,4,4,hx('#5fe3d0'));rect(a,46,42,4,4,hx('#5fe3d0'));
  outlineAll(a,OUTL);});}
// Empresa de software: oficina de vidrio con un logo de colores y plantas en la entrada.
function startupArt(){return mkA(64,64,a=>{const WB=P4('#8a9098','#a8b0b8','#c8d0d8','#e8ecf0');
  ell(a,32,8,6,6,hx('#e8654d'));ell(a,32,8,4,4,hx('#ffd35a'));ell(a,32,8,2,2,hx('#5fe3d0'));rect(a,31,13,2,2,IRON[0]);
  rect(a,6,18,52,42,GLASS[1]);rect(a,46,18,12,42,GLASS[0]);for(let x=6;x<58;x+=8)rect(a,x,18,1,42,WB[3]);for(let y=18;y<60;y+=10)rect(a,6,y,52,1,WB[3]);rect(a,4,14,56,4,WB[3]);
  rect(a,26,48,12,12,GLASS[0]);rect(a,31,48,1,12,WB[3]);for(const x of[10,50]){rect(a,x,54,5,6,WOOD[2]);ell(a,x+2.5,52,3.5,3,LEAF[2]);}
  outlineAll(a,OUTL);});}
// Huerta vertical: torre con estantes de plantas bajo luces violetas.
function verticalFarmArt(){return mkA(64,64,a=>{const WB=P4('#8a9098','#a8b0b8','#c8d0d8','#e8ecf0');
  rect(a,12,6,40,54,WB[2]);rect(a,44,6,8,54,WB[1]);rect(a,10,4,44,3,WB[3]);
  for(let y=10;y<56;y+=9){rect(a,15,y,30,7,DKW);rect(a,15,y,30,1,hx('#c87ae8'));for(let x=16;x<45;x+=3)ell(a,x,y+4,1.5,1.5,LEAF[2+((x+y)&1)]);rect(a,15,y+6,30,1,SOIL[1]);}
  rect(a,27,56,10,4,DKW);outlineAll(a,OUTL);});}
// Instituto de alineación: edificio verde con un escudo y una tilde.
function safetyArt(){return mkA(64,64,a=>{const GN=P4('#3a6a5a','#4e8a76','#6aa892','#8ec8b2');
  poly(a,[[22,4],[42,4],[42,12],[32,20],[22,12]],(x,y)=>x<32?hx('#e8f4ff'):hx('#c8dcf0'));line(a,27,10,31,14,hx('#3f8f47'),2);line(a,31,14,38,7,hx('#3f8f47'),2);
  rect(a,6,26,52,34,GN[2]);rect(a,46,26,12,34,GN[1]);rect(a,4,22,56,4,GN[3]);for(const x of[11,36,48])rect(a,x,32,7,10,GLASS[1]);rect(a,24,46,10,14,WOOD[1]);
  outlineAll(a,OUTL);});}
// Laboratorio de IA: edificio violeta con una red neuronal en el cartel.
function aiLabArt(){return mkA(64,64,a=>{const WB=P4('#4a4a6a','#5e5e88','#7a7aa8','#9a9ac4'),N=[[19,6],[19,14],[32,5],[32,10],[32,15],[45,10]];
  rect(a,14,2,36,16,DKW);for(const[x1,y1]of N.slice(0,2))for(const[x2,y2]of N.slice(2,5))line(a,x1,y1,x2,y2,WB[1],1);for(const[x1,y1]of N.slice(2,5))line(a,x1,y1,45,10,WB[1],1);for(const[x,y]of N)ell(a,x,y,1.6,1.6,hx('#5fe3d0'));
  rect(a,4,24,56,36,WB[2]);rect(a,46,24,14,36,WB[1]);rect(a,2,20,60,4,WB[3]);for(let x=8;x<44;x+=9)rect(a,x,30,6,12,hx('#9ad8f0'));rect(a,24,46,12,14,DKW);
  outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#3a3a48',C:'#28283a',j:'#5fe3d0',y:'#3a2418'},{c:'#d8d0c0',C:'#a89c88',j:'#4a78b8',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#c87a3a',C:'#9a5a28',j:'#2a2a3a',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:rareEarthOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:[fireArt(0),fireArt(1)],
  casa:smartHouseArt(),granja:granjaArt(),aserradero:sawmillArt(),granero:barnArt(),herreria:forgeArt(),cantera:quarryArt(),datacenter:dataCenterArt(),fabrob:robotFactoryArt(),startup:startupArt(),huerta:verticalFarmArt(),seguridad:safetyArt(),labia:aiLabArt(),robot:[robotArt(0,0),robotArt(1,0)],robotBad:[robotArt(0,1),robotArt(1,1)],
  hero:[personArt({c:'#4a78b8',C:'#2f5a96',j:'#ffd35a'},0),personArt({c:'#4a78b8',C:'#2f5a96',j:'#ffd35a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
