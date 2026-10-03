// AGI del mundo abierto: grafeno, la seguridad y la carrera contra el rival; la AGI. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:10,name:'AGI',de:'de la AGI',next:{file:'mundo11.html',to:'a la era post-AGI'},
  ore:{id:'grafeno',name:'Grafeno',col:'#c8ccd2',empty:'Veta de grafeno agotada',gather:'grafeno',icon:[['........','..kkkk..','.kqvvqk.','kqkqqkqk','kqkqqkqk','.kqkkqk.','..kkkk..','........'],{q:'#4a4e5a',Q:'#2a2e38',v:'#c8ccd2'}]},
  storage:{id:'granero',name:'Granero'},ideaBuild:'instituto',ideaTechs:['computo','ciencia'],boostTech:'escalado',farmBuild:'agro',nightTech:'escalado',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','supercomp','labseg','empresa','agro','embajada','instituto'],
  landmarks:[[18,-16,'rival']],
  grid:'data',rival:true,
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo9-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era de la IA',perks:[
    ['asistente','ideaMult',1.25,'Asistente universal: ideas +25% durante toda la era'],
    ['vertical','agri',1.25,'Cultivo vertical: granjas +25%'],
    ['interpretabilidad','safety',20,'Interpretabilidad: arrancás con 20% de seguridad']
  ]},
  techs:[
 {id:'computo',name:'Cómputo a escala',cost:{grafeno:15,ideas:30},req:[],desc:'Desbloquea la supercomputadora, el taller y la cantera. Ideas +50%. El rival se apura 10%.'},
 {id:'seguridad',name:'Investigación de seguridad',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el laboratorio de seguridad. Seguridad +10%.',safety:10},
 {id:'productos',name:'Productos de IA',cost:{grafeno:20,ideas:50},req:['computo'],desc:'Desbloquea la empresa de IA, que da monedas.'},
 {id:'automatizacion',name:'Automatización',cost:{madera:40,piedra:20,ideas:65},req:['computo'],desc:'Desbloquea la granja automática, que potencia las granjas.'},
 {id:'diplomacia',name:'Diplomacia',cost:{madera:60,grafeno:20,ideas:95},req:['seguridad'],desc:'Desbloquea la embajada: cada una frena al rival 12%.'},
 {id:'ciencia',name:'Ciencia automatizada',cost:{monedas:30,ideas:130},req:['productos','seguridad'],desc:'Desbloquea el instituto de investigación. Ideas +50%. El rival se apura 10%.'},
 {id:'tratado',name:'Tratado internacional',cost:{monedas:45,ideas:270},req:['diplomacia','ciencia'],desc:'Todos prometen ir con cuidado: el rival va 30% más lento. Seguridad +20%.',safety:20},
 {id:'escalado',name:'Escalado',cost:{grafeno:60,monedas:45,ideas:320},req:['productos','ciencia'],desc:'Todo produce +50% y de noche ves más lejos. El rival se apura 10%.'},
 {id:'agi',name:'AGI',cost:{piedra:110,grafeno:90,monedas:100,ideas:650},req:['tratado','escalado'],desc:'Inteligencia general alineada con la humanidad. Necesita seguridad 100%. Termina la carrera.'}],
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',name:'Granja',req:null,base:{madera:12,comida:4},grow:1.25,done:'Granja lista',desc:'Produce comida sola.',prod:{comida:0.2},noSand:true},
 {id:'fogata',name:'Fogata',req:null,base:{madera:5,piedra:4},grow:1.6,done:'Fogata encendida',desc:'Genera ideas y alumbra de noche. Comer cerca rinde el doble.',prod:{ideas:0.12}},
 {id:'aserradero',name:'Aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,done:'Aserradero listo',desc:'Produce madera solo.',prod:{madera:0.12}},
 {id:'granero',name:'Granero',req:null,base:{madera:25,piedra:15},grow:1.4,done:'Granero construido',desc:'+150 de capacidad para cada recurso. Las ideas no tienen límite.'},
 {id:'herreria',name:'Taller',req:'computo',base:{madera:25,piedra:20,grafeno:10},grow:1.6,done:'Taller listo',desc:'Herramientas inteligentes: vos y los aldeanos juntan +30% por cada taller.'},
 {id:'cantera',name:'Cantera',req:'computo',base:{madera:20,grafeno:8},grow:1.35,done:'Cantera lista',desc:'Produce piedra sola.',prod:{piedra:0.12}},
 {id:'supercomp',name:'Supercomputadora',req:'computo',base:{piedra:40,grafeno:10},grow:1.5,done:'Supercomputadora encendida',desc:'Genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'labseg',name:'Laboratorio de seguridad',req:'seguridad',base:{madera:25,piedra:25},grow:1.4,done:'Laboratorio de seguridad abierto',desc:'Sube la seguridad 3% por minuto. La AGI necesita 100%.'},
 {id:'empresa',name:'Empresa de IA',req:'productos',base:{madera:30,piedra:25,grafeno:5},grow:1.4,done:'Empresa abierta',desc:'Vende asistentes: da muchas monedas.',prod:{monedas:0.45}},
 {id:'agro',name:'Granja automática',req:'automatizacion',base:{madera:35,piedra:30},grow:1.6,done:'Granja automática lista',desc:'Cada granja automática hace rendir +50% a todas las granjas.'},
 {id:'embajada',name:'Embajada',req:'diplomacia',base:{madera:30,piedra:30,monedas:20},grow:1.6,done:'Embajada abierta',desc:'Convence al rival de ir con cuidado: cada embajada lo frena 12%.'},
 {id:'instituto',name:'Instituto de investigación',req:'ciencia',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Instituto abierto',desc:'Ideas +30% por cada instituto.'}],
  info:{casa:'Casa: acá viven 2 aldeanos.',granja:'Granja: produce comida.',fogata:'Fogata: genera ideas. Comer cerca rinde el doble.',aserradero:'Aserradero: produce madera.',granero:'Granero: más capacidad.',herreria:'Taller: juntás más rápido.',cantera:'Cantera: produce piedra.',supercomp:'Supercomputadora: genera ideas.',labseg:'Laboratorio de seguridad: sube la seguridad.',empresa:'Empresa de IA: da monedas.',agro:'Granja automática: potencia las granjas.',embajada:'Embajada: frena al rival.',instituto:'Instituto: más ideas.',rival:'Laboratorio rival: si llega primero a la AGI, perdés la carrera.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['seguridad','labseg','un laboratorio de seguridad: la AGI necesita 100%.'],['diplomacia','embajada','una embajada: frena al rival.'],()=>st.techs.tratado&&st.techs.escalado&&st.safety<100?['Falta seguridad:','la AGI necesita 100%. Construí más laboratorios de seguridad.']:null],
  tips2:[['computo','supercomp','una supercomputadora: genera muchísimas ideas.'],['productos','empresa','una empresa de IA para conseguir monedas.'],['automatizacion','agro','una granja automática: potencia las granjas.']],
  smogTip:'Más parques, o represas en vez de usinas.',done:'Carrera ganada.',
  text:{
    when:'2030 d.C.',title:'La AGI',
    intro:'La última carrera. Un laboratorio rival también quiere llegar a la AGI, y va cada vez más rápido. Para ganar tenés que terminarla antes que ellos y con seguridad 100%: una AGI apurada y sin cuidado es peligrosa. Frenalo con embajadas y tratados, y subí la seguridad con laboratorios.',
    news:'Novedades: grafeno, el laboratorio rival con su barra, la seguridad y las embajadas. Si el rival llega primero, perdés la carrera y podés reintentarla.',
    legacy:'Lo que trae tu ciudad de la era de la IA',
    noLegacy:'No hay una era de la IA terminada en este navegador: arrancás con 2 aldeanos. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del granero, lo que sobra se pierde. Un laboratorio rival corre hacia la AGI: si llega primero, perdés la carrera. La AGI necesita seguridad 100%: subila con laboratorios de seguridad, y frená al rival con embajadas y el tratado. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'¡Ganaste la carrera a la AGI!',winText:()=>'Terminaste una AGI segura en el día '+(Math.floor(st.time/DAY)+1)+', cuando el rival iba '+Math.floor(st.rival)+'%. De la Prehistoria a la AGI, y la historia sigue: la era post-AGI te espera.',
    winNote:'Es un prototipo: no suma al progreso de las eras. Tu ciudad, tus ideas y tus monedas pasan a la era post-AGI.',
    lose:'El rival llegó primero',loseText:'El laboratorio rival terminó una AGI sin la seguridad suficiente. Esta vez la carrera se perdió. Lo que hiciste en las eras anteriores no se toca.'}
};

/* ---------- arte de la era ---------- */
// Veta de grafeno: roca con escamas negras en forma de panal.
function grapheneOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],ROCK,null);
  const hex=(cx,cy)=>{for(let k=0;k<6;k++){const a1=k*Math.PI/3,a2=(k+1)*Math.PI/3;line(a,cx+Math.cos(a1)*3,cy+Math.sin(a1)*3,cx+Math.cos(a2)*3,cy+Math.sin(a2)*3,hx('#1b1a24'),1);}a.set(cx-1,cy-1,hx('#c8ccd2'));};
  for(const[x,y]of[[22,30],[28,33],[34,30],[40,34],[28,26],[44,40],[20,38]])hex(x,y);
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa del futuro: cúpula blanca con jardín en el techo y ventana redonda.
function futureHouseArt(){return mkA(64,64,a=>{const WH=P4('#b8c0c8','#d4dce4','#eef2f6','#ffffff');
  ell(a,32,40,26,22,(i,j)=>j<=0?(i<8?WH[2]:WH[1]):null);rect(a,6,40,52,20,WH[2]);rect(a,44,40,14,20,WH[1]);
  ell(a,32,20,14,4,(i,j)=>j<=0?LEAF[2]:null);for(const x of[24,32,40])ell(a,x,17,3,2.5,LEAF[3]);
  ell(a,20,42,7,6,GLASS[1]);ell(a,19,41,4,3,GLASS[2]);rect(a,36,40,10,20,DKW);rect(a,36,40,10,1,hx('#5fe3d0'));rect(a,6,58,52,2,hx('#5fe3d0'));
  outlineAll(a,OUTL);});}
// Supercomputadora: tres bloques negros con líneas de luz.
function superCompArt(){return mkA(64,64,a=>{const BK=P4('#14161c','#20242e','#2e3440','#404858');
  for(const[x,w,top]of[[4,16,16],[22,20,8],[44,16,20]]){rect(a,x,top,w,60-top,BK[2]);rect(a,x+w-4,top,4,60-top,BK[1]);rect(a,x,top,w,2,BK[3]);for(let y=top+5;y<58;y+=5)rect(a,x+2,y,w-6,1,hx('#5fe3d0'));}
  for(let k=0;k<5;k++)a.set(26+k*3,12,hx('#93d36c'));outlineAll(a,OUTL);});}
// Empresa de IA: torre de vidrio con un logo.
function aiCompanyArt(){return mkA(64,64,a=>{poly(a,[[18,60],[16,10],[40,4],[46,60]],(x,y)=>x>38?GLASS[0]:((y>>2)&1)?GLASS[1]:GLASS[2]);for(let y=8;y<58;y+=4)for(let x=16;x<46;x++)if(a.get(x,y))a.set(x,y,hx('#24406e'));
  ell(a,29,18,5,5,hx('#ffffff'));ell(a,29,18,3,3,hx('#c87ae8'));rect(a,10,56,44,4,STONE2[2]);rect(a,26,50,10,10,DKW);
  outlineAll(a,OUTL);});}
// Granja automática: surcos con riego y un dron que la cuida.
function autoFarmArt(){return mkA(64,64,a=>{rect(a,2,30,60,30,SOIL[1]);for(let r=0;r<4;r++){const y=33+r*7;for(let x=4;x<60;x+=3)ell(a,x,y,1.4,1.2,LEAF[2+(x&1)]);rect(a,2,y+3,60,1,SOIL[0]);}
  rect(a,2,28,60,2,IRON[2]);for(let x=6;x<60;x+=10)rect(a,x,30,1,3,hx('#7ec0ee'));
  rect(a,24,10,16,4,DKW);for(const x of[20,44]){rect(a,x-4,8,8,1,IRON[2]);rect(a,x,8,1,3,IRON[1]);}ell(a,32,14,2,1.5,RED);line(a,32,16,32,24,hx('#7ec0ee'),1);});}
// Laboratorio de seguridad: edificio blanco con un escudo verde y un candado.
function safetyLabArt(){return mkA(64,64,a=>{const WH=P4('#b8c0c8','#d4dce4','#eef2f6','#ffffff');
  poly(a,[[22,2],[42,2],[42,10],[32,18],[22,10]],(x,y)=>x<32?hx('#93d36c'):hx('#5fa840'));rect(a,29,4,6,1,IRON[0]);rect(a,29,4,1,4,IRON[0]);rect(a,34,4,1,4,IRON[0]);rect(a,28,8,8,6,GOLD);a.set(32,10,DKW);a.set(32,11,DKW);
  rect(a,4,24,56,36,WH[2]);rect(a,46,24,14,36,WH[1]);rect(a,2,20,60,4,WH[3]);for(let x=8;x<44;x+=9)rect(a,x,30,6,10,GLASS[1]);rect(a,24,46,12,14,hx('#3f8f47'));
  outlineAll(a,OUTL);});}
// Embajada: edificio clásico con banderas de colores.
function embassyArt(){return mkA(64,64,a=>{for(const[x,c]of[[14,'#4a78b8'],[30,'#e8654d'],[46,'#3f8f47']]){rect(a,x,2,1,16,IRON[0]);rect(a,x+1,2,8,5,hx(c));rect(a,x+4,3,2,2,hx('#ffffff'));}
  rect(a,6,30,52,28,MARBLE[2]);rect(a,46,30,12,28,MARBLE[1]);rect(a,28,40,8,18,WOOD[1]);columns(a,[10,20,38,48],34,56,MARBLE);
  poly(a,[[32,18],[58,30],[6,30]],(x,y)=>x<32?MARBLE[3]:MARBLE[2]);rect(a,4,58,56,2,MARBLE[1]);outlineAll(a,OUTL);});}
// Instituto de investigación: edificio con la cúpula de un observatorio.
function researchInstArt(){return mkA(64,64,a=>{const CN=P4('#6a7a8a','#8a9aaa','#aabaca','#cad8e6');
  ell(a,46,24,10,10,(i,j)=>j<=0?(i<-1?hx('#e2e4e8'):hx('#c8ccd2')):null);rect(a,45,14,3,10,DKW);line(a,46,16,54,7,IRON[1],2);
  rect(a,4,28,56,32,CN[2]);rect(a,46,28,14,32,CN[1]);rect(a,2,24,60,4,CN[3]);for(let x=8;x<44;x+=7)rect(a,x,34,4,14,GLASS[1]);rect(a,26,50,10,10,DKW);
  outlineAll(a,OUTL);});}
// Laboratorio rival: torre oscura con ventanas y un núcleo rojo.
function rivalArt(){return mkA(64,64,a=>{const DR=P4('#1e1418','#2e1e24','#442a32','#5e3a44');
  rect(a,31,0,2,6,IRON[1]);poly(a,[[20,60],[26,6],[38,6],[44,60]],(x,y)=>x>34?DR[1]:DR[2]);for(let y=12;y<58;y+=6)for(let x=22;x<42;x+=4)if(a.get(x,y)&&a.get(x+1,y))a.set(x,y,hx('#e8654d'));
  ell(a,32,22,5,5,hx('#e8654d'));ell(a,32,22,3,3,hx('#ffb0a0'));rect(a,8,52,48,8,DR[2]);rect(a,8,52,48,1,DR[3]);
  outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#e6ecf2',C:'#b8c0c8',j:'#5fe3d0',y:'#3a2418'},{c:'#2f6b6b',C:'#1f4a4a',j:'#e6ecf2',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#6a5a9a',C:'#4a3e72',j:'#e6ecf2',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:grapheneOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:[fireArt(0),fireArt(1)],
  casa:futureHouseArt(),granja:granjaArt(),aserradero:sawmillArt(),granero:barnArt(),herreria:forgeArt(),cantera:quarryArt(),supercomp:superCompArt(),labseg:safetyLabArt(),empresa:aiCompanyArt(),agro:autoFarmArt(),embajada:embassyArt(),instituto:researchInstArt(),rival:rivalArt(),robot:[robotArt(0,0),robotArt(1,0)],robotBad:[robotArt(0,1),robotArt(1,1)],
  hero:[personArt({c:'#e8c05a',C:'#b8902e',j:'#2a2a3a'},0),personArt({c:'#e8c05a',C:'#b8902e',j:'#2a2a3a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
