// Industria del mundo abierto: carbón, fábricas, trenes, el humo y los ludditas; la máquina analítica. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:5,name:'Industria',de:'de la Industria',obra:'la máquina analítica',next:{file:'mundo6.html',to:'a la Electricidad'},
  ore:{id:'carbon',name:'Carbón',col:'#a3a8b4',empty:'Veta de carbón agotada',gather:'carbón',icon:[['........','...kk...','..kvqk..','.kqqQkk.','kvqQkqqk','kqQQkqQk','.kkkkkk.','........'],{q:'#3e3848',Q:'#24202c',v:'#8a8f9c'}]},
  storage:{id:'granero'},ideaBuild:'palacio',ideaTechs:['quimica','exposiciones','gas'],boostTech:'tarjetas',farmBuild:'estacion',nightTech:'gas',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','laboratorio','fabrica','estacion','puerto','palacio','sindicato'],
  // Los ludditas salen de las casas a romper las máquinas de fábricas y minas; el sindicato los calma a 4 casilleros (reglas en motor.html).
  // Objetos que se fabrican (la prueba de la fabricación, octubre de 2026): el acero sale de la fundición, con carbón y piedra, y
  // los engranajes del taller mecánico, con acero y madera. Los piden el tren, los barcos y la máquina analítica, entre otros.
  items:[{id:'acero',name:'Acero',col:'#c8d2dc',icon:[['........','........','...kkkkk','..kwWWsk','.kwWWssk','kssssskk','kSSSSSk.','kkkkkk..'],{w:'#ffffff',W:'#dfe4ea',s:'#a3abb8',S:'#7a8290'}]},
    {id:'engranajes',name:'Engranajes',col:'#e0b060',icon:[['.k.kk.k.','kgkGGkgk','.kgGGgk.','kgGkkGgk','kgGkkGgk','.kgGGgk.','kgkGGkgk','.k.kk.k.'],{g:'#c8a050',G:'#f0d080'}]}],
  // Adentro de la mina, la fundición, el taller mecánico, la fábrica y el laboratorio (`puestos`) van máquinas: lo que cuesta cada nivel.
  machine:[{madera:20,piedra:20},{acero:8,piedra:20},{acero:12,engranajes:8,monedas:30}],
  luddites:['fabrica','mina'],defense:{id:'sindicato',r:4,label:'Sindicatos',of:['fabrica','mina']},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'policia',building:'Comisaría',unit:'Policía',done:'Comisaría lista: llegó un policía',desc:'Trae un policía que sale solo a calmar a los ludditas y a arreglar las máquinas rotas, a 8 casilleros o menos.',info:'Comisaría: su policía calma a los ludditas cerca.',tip:'una comisaría: el policía sale solo a calmar a los ludditas.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo4-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'del Renacimiento',perks:[
    ['pascalina','ideaMult',1.25,'Pascalina: ideas +25% durante toda la era'],
    ['botanica','agri',1.25,'Botánica: granjas +25%']
  ]},
  techs:[
 {id:'vapor',name:'Máquina de vapor',cost:{carbon:15,ideas:30},req:[],desc:'Desbloquea la mina de carbón, la herrería, la cantera a vapor y la fundición, que hace acero.'},
 {id:'quimica',name:'Química',cost:{piedra:15,ideas:35},req:[],desc:'Desbloquea el laboratorio, que genera muchas ideas. Ideas +50%.'},
 {id:'telar',name:'Telar mecánico',cost:{carbon:20,ideas:50},req:['vapor'],desc:'Desbloquea la fábrica, que quema carbón, da muchas monedas y echa humo; el taller mecánico, que hace engranajes, y el sindicato.'},
 {id:'ferrocarril',name:'Ferrocarril',cost:{madera:40,piedra:20,acero:10,ideas:65},req:['vapor'],desc:'Desbloquea la estación de tren, que potencia las granjas.'},
 {id:'barcos',name:'Barco de vapor',cost:{madera:60,carbon:20,acero:15,ideas:95},req:['telar'],desc:'Desbloquea el puerto: barcos que traen monedas e ideas.'},
 {id:'exposiciones',name:'Exposiciones',cost:{monedas:30,ideas:130},req:['quimica','telar'],desc:'Desbloquea el palacio de cristal. Ideas +50%.'},
 {id:'gas',name:'Alumbrado a gas',cost:{monedas:45,ideas:270},req:['barcos','exposiciones'],desc:'Se lee de noche: ideas +50% y ves más lejos en la oscuridad.'},
 {id:'tarjetas',name:'Tarjetas perforadas',cost:{carbon:40,monedas:45,engranajes:12,ideas:320},req:['vapor','exposiciones'],desc:'Máquinas que siguen instrucciones: todos los edificios producen +50%.'},
 {id:'analitica',name:'Máquina analítica',cost:{piedra:80,carbon:60,acero:15,engranajes:20,monedas:100,ideas:650},req:['gas','tarjetas'],desc:'Babbage y Ada Lovelace: la primera computadora programable. Cierra la Industria.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'parque',name:'Parque',req:null,base:{madera:15,piedra:10},grow:1.3,done:'Parque plantado: el aire se limpia',desc:'Árboles que limpian el humo. Cada parque compensa casi una fábrica.'},
 {id:'herreria',name:'Herrería',req:'vapor',base:{madera:25,piedra:20,carbon:10},grow:1.6,done:'Herrería lista',desc:'Herramientas de acero: los aldeanos juntan +30% por cada herrería.'},
 {id:'cantera',req:'vapor',base:{madera:20,carbon:8},grow:1.35,prod:{piedra:0.12}},
 {id:'mina',name:'Mina de carbón',req:'vapor',base:{madera:30,piedra:15},grow:1.4,done:'Mina abierta',desc:'Una bomba de vapor saca carbón sola. Echa algo de humo.',prod:{carbon:0.12},smoke:0.03,smk:[[2.2,1.4]],puestos:true},
 {id:'laboratorio',name:'Laboratorio',req:'quimica',base:{piedra:40,carbon:10},grow:1.5,done:'Laboratorio abierto',desc:'Químicos e inventores: genera muchas ideas.',prod:{ideas:0.35},puestos:true},
 {id:'fundicion',name:'Fundición',req:'vapor',base:{madera:25,piedra:30},grow:1.5,craft:true,done:'Fundición encendida',desc:'Funde carbón y piedra en acero: gasta 9 de carbón y 6 de piedra por minuto y hace 15 de acero. Se frena si falta alguno o si ya no entra.',prod:{acero:0.25},use:{carbon:0.15,piedra:0.1},puestos:true},
 {id:'torneria',name:'Taller mecánico',req:'telar',base:{madera:30,piedra:20,acero:5},grow:1.5,craft:true,done:'Taller mecánico en marcha',desc:'Tornea acero y madera en engranajes: gasta 6 de acero y 6 de madera por minuto y hace 9 engranajes.',prod:{engranajes:0.15},use:{acero:0.1,madera:0.1},puestos:true},
 {id:'fabrica',name:'Fábrica',req:'telar',base:{madera:30,piedra:25,carbon:5},grow:1.4,done:'Fábrica en marcha',desc:'Quema carbón y da muchas monedas. Echa mucho humo. Sin carbón, se frena.',prod:{monedas:0.3},use:{carbon:0.1},smoke:0.06,smk:[[13,0]],puffs:4,puestos:true},
 {id:'sindicato',name:'Sindicato',req:'telar',base:{madera:25,piedra:20,carbon:5},grow:1.4,done:'Sindicato abierto',desc:'Los obreros negocian en vez de romper: los ludditas que pasan a 4 casilleros se calman solos.'},
 {id:'estacion',name:'Estación de tren',req:'ferrocarril',base:{madera:35,piedra:30,acero:8},grow:1.6,done:'Llegó el tren',desc:'El tren reparte la cosecha: cada estación hace rendir +50% a todas las granjas. Echa algo de humo.',smoke:0.02,smk:[[2.6,7]]},
 {id:'puerto',name:'Puerto',req:'barcos',base:{madera:40,carbon:20,acero:8},grow:1.5,done:'Puerto abierto',desc:'Va pegado al agua. Los barcos de vapor traen monedas e ideas.',prod:{monedas:0.2,ideas:0.1},water:'El puerto tiene que ir pegado al agua.',smoke:0.015,smk:[[6,2.5],[10,3]]},
 {id:'palacio',name:'Palacio de cristal',req:'exposiciones',base:{madera:30,piedra:35,monedas:25,acero:12},grow:1.6,done:'Exposición inaugurada',desc:'Los inventos se muestran al mundo: ideas +30% por cada palacio.'}],
  info:{casa:'Casa: acá viven 2 aldeanos.',fundicion:'Fundición: hace acero con carbón y piedra.',torneria:'Taller mecánico: hace engranajes con acero y madera.',parque:'Parque: limpia el humo.',herreria:'Herrería: los aldeanos juntan más rápido.',mina:'Mina: saca carbón. Echa humo.',laboratorio:'Laboratorio: genera ideas.',sindicato:'Sindicato: calma a los ludditas a 4 casilleros.',fabrica:'Fábrica: quema carbón y da monedas. Echa mucho humo.',estacion:'Estación: potencia las granjas. Echa humo.',puerto:'Puerto: trae monedas e ideas.',palacio:'Palacio de cristal: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['telar','sindicato','un sindicato cerca de las fábricas y minas: calma a los ludditas.']],
  tips2:[['vapor','fundicion','una fundición: hace acero, que piden el tren, los barcos y la máquina analítica.'],['telar','torneria','un taller mecánico: hace engranajes con el acero.'],['quimica','laboratorio','un laboratorio: genera muchas ideas.'],['telar','fabrica','una fábrica para conseguir monedas.'],['barcos','puerto','un puerto pegado al agua.']],
  smogTip:'Más parques o menos fábricas.',done:'Industria completa.',
  text:{
    when:'1780 d.C.',title:'La Revolución Industrial',
    intro:'Tu ciudad descubre el carbón y el vapor. Las fábricas producen como nunca, pero llenan el aire de humo, y no todos están contentos: los ludditas salen a romper las máquinas. La meta: construir la máquina analítica, la primera computadora programable.',
    news:'Novedades: carbón, minas, fábricas, trenes, humo y ludditas, y cosas que se fabrican: la fundición hace acero y el taller mecánico, engranajes. Y se puede entrar a las industrias: tocá una mina, la fundición, el taller, una fábrica o el laboratorio y ponele máquinas; un obrero las maneja. Con mucho humo tu gente junta y cosecha menos: los parques lo limpian. Los ludditas salen de las casas a romper fábricas y minas: tocalos para calmarlos y tocá lo roto para arreglarlo. Con más humo salen más seguido; los sindicatos los calman solos.',
    legacy:'Lo que trae tu ciudad del Renacimiento',
    noLegacy:'No hay un Renacimiento terminado en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o una veta y va a buscarlo el aldeano más cercano. Los edificios producen solos; adentro de la mina, la fundición, el taller mecánico, la fábrica y el laboratorio van máquinas (tocalos). Las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del depósito, lo que sobra se pierde. Las fábricas, minas, trenes y barcos echan humo: con mucho humo se junta y se cosecha menos, y los parques lo limpian. Los ludditas salen de las casas a romper fábricas y minas: tocalos para calmarlos, y tocá lo roto para arreglarlo. Con más humo salen más seguido; los sindicatos los calman solos. En la compu: flechas o WASD.',
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
// Sindicato: salón de ladrillo con frontón de piedra y reloj, puerta en arco y un estandarte rojo con un engranaje.
function unionArt(){return mkA(64,64,a=>{const WF=hx('#f6f1e4');brickWall(a,6,24,52,36);brickWall(a,48,24,10,36,true);rect(a,4,20,56,4,STONE2[2]);rect(a,4,23,56,1,STONE2[0]);
  poly(a,[[32,6],[52,20],[12,20]],(x,y)=>x<32?STONE2[3]:STONE2[2]);ell(a,32,14,4,4,WF);ell(a,32,14,4,4,(i,j)=>Math.abs(i*i+j*j-14)<4?IRON[1]:null);rect(a,32,11,1,4,IRON[0]);rect(a,32,14,3,1,IRON[0]);
  rect(a,26,42,12,18,WOOD[1]);ell(a,32,42,6,5,(i,j)=>j<=0?WOOD[1]:null);rect(a,31,40,2,20,WOOD[0]);rect(a,24,58,16,2,STONE2[2]);
  for(const x of[40,50]){rect(a,x,30,6,10,WF);rect(a,x+1,31,4,8,DKW);rect(a,x+2,31,1,8,WF);rect(a,x-1,40,8,1,STONE2[3]);}
  rect(a,9,26,1,22,IRON[0]);rect(a,10,27,12,16,RED);poly(a,[[10,43],[22,43],[22,48],[16,45],[10,48]],RED);rect(a,10,27,12,1,hx('#e8654d'));
  for(let k=0;k<8;k++){const an=k*Math.PI/4;rect(a,Math.round(16+Math.cos(an)*4),Math.round(35+Math.sin(an)*4),1,1,WF);}ell(a,16,35,3,3,WF);ell(a,16,35,1.4,1.4,RED);
  outlineAll(a,OUTL);});}
// Luddita: obrero con gorra y un mazo de hierro levantado.
function ludditeArt(f){const c=personArt({c:'#6b4f38',C:'#4f3a2a',j:'#2a2a3a',y:'#3a2418'},f),g=c.getContext('2d');
  g.fillStyle='#4a4e5a';g.fillRect(19,4,26,7);g.fillRect(38,9,12,3);g.fillStyle='#33363f';g.fillRect(19,10,26,1);
  g.fillStyle='#7a5434';for(let k=0;k<14;k++)g.fillRect(50+Math.round(k*0.3),46-k*2,2,2);g.fillStyle='#34343e';g.fillRect(47,14,12,8);g.fillStyle='#6a6a78';g.fillRect(47,14,12,2);return c;}
const VILPAL2=[{c:'#4a4e5a',C:'#33363f',j:'#7a5434',y:'#3a2418'},{c:'#6b4f38',C:'#4f3a2a',j:'#2a2a3a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#2f4a6e',C:'#203450',j:'#d8d0bc',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:coalOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:brickHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),parque:parkArt(),mina:mineArt(),laboratorio:labArt(),fabrica:factoryArt(),estacion:stationArt(),puerto:steamshipArt(),palacio:crystalArt(),sindicato:unionArt(),luddite:[ludditeArt(0),ludditeArt(1)],
  hero:[personArt({c:'#2f6b6b',C:'#1f4a4a',j:'#d4ae62'},0),personArt({c:'#2f6b6b',C:'#1f4a4a',j:'#d4ae62'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
// Fundición: un alto horno de ladrillo con chimenea, la boca encendida y lingotes de acero al costado.
function foundryArt(){return mkA(64,64,a=>{brickWall(a,6,28,40,30);rect(a,6,56,40,2,BRICK[0]);
  poly(a,[[6,28],[46,28],[38,16],[14,16]],(x,y)=>((y>>1)&1)?BRICK[1]:BRICK[2]);rect(a,20,2,10,15,BRICK[1]);rect(a,19,2,12,3,BRICK[0]);
  ell(a,26,50,9,10,(i,j)=>j>5?null:Math.hypot(i/9,j/10)>0.8?BRICK[0]:j>-1?hx('#ffd35a'):hx('#f08a24'));rect(a,16,54,20,4,hx('#2a2a34'));
  for(const[x,y]of[[47,52],[51,48],[55,52]]){rect(a,x,y,8,4,IRON[2]);rect(a,x,y,8,1,IRON[3]);}
  outlineAll(a,OUTL);a.set(24,46,hx('#fff6c8'));a.set(28,47,hx('#fff6c8'));});}
// Taller mecánico: un galpón de ladrillo con portón y un engranaje grande en la fachada.
function latheArt(){return mkA(64,64,a=>{brickWall(a,4,28,56,30);rect(a,4,56,56,2,BRICK[0]);
  poly(a,[[2,28],[62,28],[56,16],[8,16]],(x,y)=>((x>>2)&1)?SLATE[1]:SLATE[2]);rect(a,8,36,18,20,DKW);rect(a,8,36,18,2,IRON[2]);rect(a,16,38,2,18,IRON[1]);
  ell(a,43,42,12,12,(i,j)=>{const d=Math.hypot(i,j),an=Math.atan2(j,i);return d<2.5?DKW:d<7.5?hx('#c8a050'):d<9.5||(Math.cos(an*8)>0.35&&d<12)?hx('#a8782e'):null;});
  outlineAll(a,OUTL);a.set(41,40,hx('#f0d080'));a.set(42,39,hx('#f0d080'));});}
HS.fundicion=foundryArt();HS.torneria=latheArt();
// Adentro de las industrias (lo que se ve al tocarlas): el corazón de cada una, en dos cuadros, a la izquierda del interior.
// La mina: la boca del túnel con su farol, los rieles y una vagoneta con carbón.
function inMineArt(f){return mkA(176,200,a=>{const RK=P4('#2e2a2a','#3e3836','#524a46','#6a605a'),K=hx('#0e0d14');
  blob(a,[[40,90,60],[120,80,62],[88,40,44],[150,140,40],[20,150,40]],RK,null);for(const[x,y,r]of[[30,50,8],[140,60,7],[160,110,6],[18,120,6],[110,30,5]])blob(a,[[x,y,r]],COALT,null);
  rect(a,30,78,100,122,K);ell(a,80,80,50,26,(i,j)=>j<0?K:null);rect(a,26,72,10,128,WOOD[2]);rect(a,26,72,3,128,WOOD[3]);rect(a,124,72,10,128,WOOD[1]);rect(a,20,64,120,12,WOOD[2]);rect(a,20,64,120,3,WOOD[3]);
  for(let x=0;x<176;x+=14)rect(a,x,188,8,6,WOOD[0]);rect(a,0,186,176,3,IRON[3]);rect(a,0,194,176,3,IRON[3]);
  poly(a,[[96,150],[166,150],[158,182],[104,182]],IRON[2]);rect(a,96,150,70,4,IRON[3]);for(const x of[110,150]){ell(a,x,186,8,8,IRON[1]);ell(a,x,186,3,3,IRON[3]);}
  blob(a,[[112,148,9],[126,144,10],[142,146,9],[154,149,7]],COALT,null);
  rect(a,44,76,2,10,IRON[1]);rect(a,38,86,14,16,IRON[0]);rect(a,40,88,10,12,f?hx('#ffb24a'):hx('#ffe680'));rect(a,36,84,18,3,IRON[2]);
  outlineAll(a,OUTL);});}
// La fundición: el horno de ladrillo con la boca encendida y una cuchara que vuelca acero en los moldes.
function inFoundryArt(f){return mkA(176,200,a=>{const HOT=f?[hx('#ff7a1a'),hx('#ffb24a'),hx('#ffe680')]:[hx('#ff8a2a'),hx('#ffd35a'),hx('#fff2b0')];
  brickWall(a,44,0,30,46);brickWall(a,8,40,108,160);rect(a,4,36,116,6,STONE2[2]);
  ell(a,62,150,30,30,(i,j)=>j<8?(i*i+j*j<14*14?HOT[2]:i*i+j*j<22*22?HOT[1]:HOT[0]):null);rect(a,32,158,60,42,HOT[0]);rect(a,44,164,36,36,HOT[1]);rect(a,26,154,72,4,STONE2[3]);
  line(a,148,0,148,92,IRON[2],2);ell(a,148,104,18,14,(i,j)=>j>=-2?IRON[1]:null);rect(a,130,100,36,4,HOT[2]);line(a,132,108,126,116,IRON[2],3);
  rect(a,f?123:124,116,f?5:3,62,HOT[1]);rect(a,f?124:125,116,1,62,HOT[2]);
  for(const x of[112,136,160]){rect(a,x-10,182,22,14,IRON[1]);rect(a,x-8,184,18,8,x===136?HOT[1]:hx('#c8d2dc'));}
  for(let k=0;k<3;k++)rect(a,14+k*3,186-k*7,26,6,hx('#a3abb8'));
  outlineAll(a,OUTL);});}
// El taller mecánico: el eje de transmisión con sus correas y un torno que hace un engranaje (saltan chispas).
function inLatheArt(f){return mkA(176,200,a=>{const BR=hx('#c8a050'),BRL=hx('#f0d080');
  rect(a,0,16,176,6,IRON[2]);for(const x of[50,130]){ell(a,x,19,12,12,IRON[1]);ell(a,x,19,4,4,BR);}
  for(const x of[44,56])for(let y=30;y<120;y+=6)if(((y/6|0)+f)%2===0)rect(a,x,y,3,4,hx('#3a2418'));
  rect(a,4,152,168,14,IRON[2]);rect(a,4,152,168,3,IRON[3]);for(const x of[14,154])rect(a,x,166,10,34,IRON[1]);
  rect(a,14,108,44,44,IRON[1]);rect(a,14,108,44,4,IRON[3]);ell(a,50,120,10,10,IRON[2]);
  ell(a,70,130,14,14,IRON[2]);for(let s=0;s<3;s++){const an=s*2.094+f*1.05;rect(a,Math.round(70+Math.cos(an)*9)-2,Math.round(130+Math.sin(an)*9)-2,4,4,IRON[0]);}
  rect(a,84,124,52,12,BR);for(let x=88;x<134;x+=6)rect(a,x,124,3,12,BRL);rect(a,136,112,28,40,IRON[1]);rect(a,136,112,28,4,IRON[3]);
  rect(a,102,138,12,14,IRON[0]);rect(a,104,132,4,8,IRON[3]);
  for(const[x,y]of f?[[100,118],[96,112],[110,114]]:[[106,116],[98,120],[112,110]])rect(a,x,y,2,2,hx('#ffe680'));
  rect(a,100,52,72,6,WOOD[2]);for(const x of[114,140,162])ell(a,x,44,8,8,(i,j)=>{const d=Math.hypot(i,j),an=Math.atan2(j,i);return d<2?DKW:d<5?BRL:d<6.5||(Math.cos(an*6)>0.3&&d<8.5)?BR:null;});
  outlineAll(a,OUTL);});}
// La fábrica: dos telares con su eje arriba; la lanzadera va y viene y la tela se enrolla abajo.
function inLoomArt(f){return mkA(176,200,a=>{const TH=[hx('#e8eef4'),hx('#7ea6dc')],CL=[hx('#c8413b'),hx('#4a78b8')];
  rect(a,0,14,176,6,IRON[2]);for(const x of[44,132]){ell(a,x,17,10,10,IRON[1]);ell(a,x,17,3,3,GOLD);line(a,x-8,24,x-8,90,hx('#3a2418'),2);line(a,x+8,24,x+8,90,hx('#3a2418'),2);}
  for(let k=0;k<2;k++){const x0=8+k*88;rect(a,x0,88,72,8,WOOD[2]);rect(a,x0,88,72,2,WOOD[3]);for(const x of[x0,x0+64])rect(a,x,88,8,108,WOOD[1]);
    for(let x=x0+12;x<x0+62;x+=4)line(a,x,96,x+((x>>2)&1?2:-2),150,TH[(x>>2)&1],1);
    rect(a,x0+8,146,58,8,WOOD[2]);const sx=x0+12+(f?36:6);rect(a,sx,140,16,6,WOOD[3]);rect(a,sx+2,141,12,4,WOOD[2]);
    ell(a,x0+36,176,26,12,CL[k]);ell(a,x0+36,172,22,6,mulc(CL[k],1.25));rect(a,x0+8,154,56,10,CL[k]);}
  outlineAll(a,OUTL);});}
// El laboratorio: una mesa con matraces que burbujean, estantes con frascos y una pizarra con fórmulas.
function inLabArt(f){return mkA(176,200,a=>{const GL=[hx('#5fe3d0'),hx('#e8654d'),hx('#93d36c'),hx('#f0cc4a')],GW=hx('#e8f4ff');
  rect(a,8,26,92,58,hx('#2f4a3a'));rect(a,8,26,92,4,WOOD[2]);rect(a,8,80,92,4,WOOD[2]);
  for(const[x,y,w]of[[16,38,30],[52,38,22],[16,52,18],[40,52,34],[16,66,26],[48,66,16]])rect(a,x,y,w,2,hx('#e8eef4'));
  for(const y of[100,124]){rect(a,112,y,60,4,WOOD[2]);for(let k=0;k<5;k++){const x=116+k*11;rect(a,x,y-12,7,12,GL[(k+y)%4]);rect(a,x+2,y-16,3,4,GW);}}
  rect(a,4,150,168,8,WOOD[2]);rect(a,4,150,168,3,WOOD[3]);for(const x of[10,160])rect(a,x,158,8,42,WOOD[1]);
  for(const[x,c]of[[28,0],[66,1],[104,2],[138,3]]){ell(a,x,138,11,11,GW);ell(a,x,140,9,8,GL[c]);rect(a,x-3,114,6,16,GW);
    const b=(f+c)%2;a.set(x-3,132-b*3,GW);a.set(x+2,128-b*2,GW);a.set(x,122-b*4,GW);}
  line(a,66,114,104,108,IRON[2],2);rect(a,58,146,16,4,IRON[1]);rect(a,62,142,8,4,f?hx('#ffb24a'):hx('#ffe680'));
  outlineAll(a,OUTL);});}
HS.in_laboratorio=[inLabArt(0),inLabArt(1)];HS.in_mina=[inMineArt(0),inMineArt(1)];HS.in_fundicion=[inFoundryArt(0),inFoundryArt(1)];HS.in_torneria=[inLatheArt(0),inLatheArt(1)];HS.in_fabrica=[inLoomArt(0),inLoomArt(1)];
