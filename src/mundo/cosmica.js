// Era cósmica del mundo abierto (la que sigue a la intergaláctica): quarks, repulsores gravitatorios y agujeros negros que atrapan a tu gente en órbita y estiran los edificios; la computadora cósmica. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:15,name:'Era cósmica',de:'de la era cósmica',obra:'la computadora cósmica',next:{file:'mundo16.html',to:'a la era multiversal'},
  ore:{id:'quarks',name:'Quarks',col:'#f0a0ff',empty:'Nube de quarks agotada',gather:'quarks',icon:[['...kk...','..krrk..','..krRk..','.kkkkkk.','kggkkbbk','kgGkkbBk','.kk..kk.','........'],{r:'#e8504a',R:'#ff9a8a',g:'#4fc060',G:'#b6f08a',b:'#4a78e8',B:'#9ac0ff'}]},
  storage:{id:'granero'},ideaBuild:'radio',ideaTechs:['quarks','fondo'],boostTech:'cuerdas',farmBuild:'sol',nightTech:'fondo',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','babel','repulsor','bolsa','sol','colisionador','radio'],
  holes:true,defense:{id:'repulsor',r:4,label:'Repulsión'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa). Los astronautas vuelan.
  guard:{kind:'astronauta',building:'Base de astronautas',unit:'Astronauta',fly:true,done:'Base de astronautas lista: llegó un astronauta',desc:'Trae un astronauta que vuela con su mochila cohete a evaporar agujeros negros y a arreglar lo estirado, a 8 casilleros o menos.',info:'Base de astronautas: su astronauta evapora agujeros negros cerca.',tip:'una base de astronautas: el astronauta sale solo a evaporar agujeros negros.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo14-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era intergaláctica',perks:[
    ['red','ideaMult',1.25,'Red de agujeros de gusano: ideas +25% durante toda la era'],
    ['cuantica','agri',1.25,'Cosecha cuántica: granjas +25%'],
    ['universo','speed',1.2,'Mapa del universo: te movés 20% más rápido']
  ]},
  techs:[
 {id:'quarks',name:'Física de quarks',cost:{quarks:15,ideas:30},req:[],desc:'Desbloquea la biblioteca de Babel, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'antigravedad',name:'Antigravedad',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el repulsor gravitatorio: los agujeros negros no se le acercan.'},
 {id:'estrellas',name:'Comercio de estrellas',cost:{quarks:20,ideas:50},req:['quarks'],desc:'Desbloquea la bolsa de estrellas, que da monedas.'},
 {id:'soles',name:'Soles de bolsillo',cost:{madera:40,piedra:20,ideas:65},req:['quarks'],desc:'Desbloquea el sol de bolsillo, que potencia las granjas.'},
 {id:'colisionadores',name:'Colisionadores',cost:{madera:60,quarks:20,ideas:95},req:['estrellas'],desc:'Desbloquea el colisionador, que hace quarks solo. Los agujeros negros aparecen 30% más seguido.'},
 {id:'hawking',name:'Radiación de Hawking',cost:{monedas:30,ideas:130},req:['antigravedad','estrellas'],desc:'Los agujeros negros crecen la mitad: piden menos toques.'},
 {id:'fondo',name:'Fondo cósmico',cost:{monedas:55,ideas:340},req:['hawking','colisionadores'],desc:'Desbloquea el radiotelescopio. Ideas +50% y de noche ves más lejos.'},
 {id:'cuerdas',name:'Teoría de cuerdas',cost:{quarks:70,monedas:55,ideas:450},req:['estrellas','hawking'],desc:'Todo produce +50%.'},
 {id:'computadora',name:'La computadora cósmica',cost:{piedra:130,quarks:110,monedas:130,ideas:1000},req:['fondo','cuerdas'],desc:'Una mente del tamaño del universo, para pensar la última pregunta. Cierra la era cósmica.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa esfera',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa esfera lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'quarks',base:{madera:25,piedra:20,quarks:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'quarks',base:{madera:20,quarks:8},grow:1.35,prod:{piedra:0.12}},
 {id:'babel',name:'Biblioteca de Babel',req:'quarks',base:{piedra:40,quarks:10},grow:1.5,done:'Biblioteca de Babel abierta',desc:'Galerías hexagonales con todos los libros posibles: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'repulsor',name:'Repulsor gravitatorio',req:'antigravedad',base:{madera:25,piedra:25,quarks:5},grow:1.4,done:'Repulsor gravitatorio encendido',desc:'Los agujeros negros no se acercan a 4 casilleros o menos: lo de adentro no se estira ni queda en órbita.'},
 {id:'bolsa',name:'Bolsa de estrellas',req:'estrellas',base:{madera:30,piedra:25,quarks:5},grow:1.4,done:'Bolsa de estrellas abierta',desc:'Se compran y se venden estrellas enteras: da muchas monedas.',prod:{monedas:0.45}},
 {id:'sol',name:'Sol de bolsillo',req:'soles',base:{madera:35,piedra:30},grow:1.6,done:'Sol de bolsillo encendido',desc:'Cada sol de bolsillo hace rendir +50% a todas las granjas.'},
 {id:'colisionador',name:'Colisionador',req:'colisionadores',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Colisionador encendido',desc:'Choca partículas y hace quarks solo.',prod:{quarks:0.12}},
 {id:'radio',name:'Radiotelescopio',req:'fondo',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Radiotelescopio encendido',desc:'Escucha el eco del big bang: ideas +30% por cada radiotelescopio.'}],
  info:{casa:'Casa esfera: acá viven 2 aldeanos.',herreria:'Nanotaller: los aldeanos juntan más rápido.',babel:'Biblioteca de Babel: genera ideas.',repulsor:'Repulsor gravitatorio: los agujeros negros no se acercan a 4 casilleros o menos.',bolsa:'Bolsa de estrellas: da monedas.',sol:'Sol de bolsillo: potencia las granjas.',colisionador:'Colisionador: da quarks.',radio:'Radiotelescopio: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['antigravedad','repulsor','un repulsor gravitatorio: los agujeros negros no se le acercan.']],
  tips2:[['quarks','babel','una biblioteca de Babel: genera muchísimas ideas.'],['estrellas','bolsa','una bolsa de estrellas para conseguir monedas.'],['soles','sol','un sol de bolsillo: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era cósmica completa.',
  // Cada repulsor larga anillos cian que se alejan (empuja), y el sol de bolsillo tiene una corona que late.
  deco:(o,px,py)=>{if(o.bug)return;const off=((px*3+py*5)%16)/16;
    if(o.t==='repulsor'){for(let k=0;k<2;k++){const ph=(st.time/1.4+off+k/2)%1;ctx.strokeStyle='rgba(95,227,208,'+(0.7*(1-ph)).toFixed(2)+')';ctx.lineWidth=0.8;ctx.beginPath();ctx.ellipse(px+8,py+4,2+ph*9,1+ph*3.5,0,0,Math.PI*2);ctx.stroke();}}
    else if(o.t==='sol'){const a=0.25+0.15*Math.sin(st.time*3+off*6);ctx.fillStyle='rgba(255,211,90,'+a.toFixed(2)+')';ctx.beginPath();ctx.arc(px+8,py+4.5,4.5,0,Math.PI*2);ctx.fill();}},
  text:{
    when:'10.000 d.C.',title:'La era cósmica',
    intro:'Con la red de agujeros de gusano, la humanidad llega a los confines del universo, y allá manda la gravedad. Aparecen agujeros negros chicos que flotan hacia tu ciudad: atrapan en órbita a tu gente, se tragan lo que tienen cerca y estiran los edificios que pisan. Tocalos para evaporarlos antes de que crezcan, o poné repulsores gravitatorios. La meta: la computadora cósmica, una mente del tamaño del universo para pensar la última pregunta.',
    news:'Novedades: quarks, repulsores gravitatorios y agujeros negros. Un agujero negro atrapa en órbita a la gente que pasa cerca, se traga árboles y piedras y rompe el edificio que pisa. Cuanto más se traga, más crece y más toques pide; si nadie lo toca, se evapora solo al rato.',
    legacy:'Lo que trae tu ciudad de la era intergaláctica',
    noLegacy:'No hay una era intergaláctica terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o una veta y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Aparecen agujeros negros: atrapan en órbita a la gente que pasa cerca y estiran los edificios que pisan. Tocalos para evaporarlos (los grandes piden varios toques) y tocá lo estirado para arreglarlo. A los repulsores gravitatorios no se les acercan. En la compu: flechas o WASD.',
    win:'La computadora cósmica',winText:()=>'Terminaste la computadora cósmica en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Ahora tiene todo el tiempo del universo para pensar la última pregunta.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan a la era multiversal.'}
};
/* ---------- arte de la era ---------- */
const CYAN=hx('#5fe3d0'),VIO=hx('#b48cff'),GOLDL=hx('#ffd35a'),CORAL=hx('#e8654d'),SPACE=P4('#0c0a1a','#1a1630','#2c2650','#463e78'),
  PEARL=P4('#9aa4b8','#bcc6d6','#dde4ee','#f6f9fc'),DARK=P4('#14161c','#20242e','#2e3440','#404858'),QR=[hx('#e8504a'),hx('#4fc060'),hx('#4a78e8')],QL=[hx('#ff9a8a'),hx('#b6f08a'),hx('#9ac0ff')];
// Nube de quarks: tres bolitas de colores (rojo, verde y azul, como los colores de los quarks) que flotan sobre una roca oscura, unidas por gluones.
function quarkOreArt(){return mkA(64,52,a=>{blob(a,[[32,40,14],[20,43,9],[45,43,10]],SPACE,null);
  const P=[[24,20],[40,20],[32,32]];for(let k=0;k<3;k++){const[x0,y0]=P[k],[x1,y1]=P[(k+1)%3];for(let s=0;s<=16;s++){const u=s/16,x=x0+(x1-x0)*u,y=y0+(y1-y0)*u+Math.sin(u*Math.PI*4)*1.2;a.set(Math.round(x),Math.round(y),VIO);}}
  P.forEach(([x,y],k)=>ell(a,x,y,6,6,(i,j)=>Math.hypot(i+2,j+2)<2.2?hx('#ffffff'):i+j<-2?QL[k]:QR[k]));
  for(let x=10;x<56;x++)for(let y=46;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa esfera: una esfera blanca sobre tres patas, con ventanas redondas, una puerta y una antena.
function sphereHouseArt(){return mkA(64,64,a=>{for(const x of[16,32,48])rect(a,x-2,44,4,14,PEARL[1]);rect(a,8,57,48,3,PEARL[0]);
  ell(a,32,30,22,20,(i,j)=>Math.hypot(i+8,j+8)<6?PEARL[3]:i+j>14?PEARL[1]:PEARL[2]);rect(a,10,32,44,2,PEARL[1]);
  for(const[x,y]of[[20,24],[44,24],[32,20]])ell(a,x,y,3.5,3.5,(i,j)=>i+j<-1?hx('#c8f4ff'):hx('#7fe8dc'));
  rect(a,28,36,8,12,DKW);rect(a,31,2,2,10,PEARL[0]);ell(a,32,2,2,2,CORAL);outlineAll(a,OUTL);});}
// Biblioteca de Babel: una torre de piedra de galerías hexagonales, cada piso con su balcón y sus estantes llenos de libros, y una escalera en espiral arriba.
function babelArt(){return mkA(64,64,a=>{const BK=[VIO,CYAN,GOLDL,CORAL],W=P4('#6a5a44','#8a7656','#a8946e','#c8b48a');
  for(let f=0;f<4;f++){const y=50-f*12,w=20-f*2;
    poly(a,[[32-w,y],[32-w+4,y-10],[32+w-4,y-10],[32+w,y]],(x)=>x<32-w+5?W[3]:x>32+w-6?W[1]:W[2]);
    rect(a,32-w,y,2*w,2,W[0]);rect(a,32-w+1,y-1,2*w-2,1,W[3]);
    for(const cx of[32-w*0.45,32+w*0.45-1]){const x0=Math.round(cx-3);rect(a,x0,y-8,7,7,DKW);for(let k=0;k<6;k++)rect(a,x0+k+0.5|0,y-6,1,4,BK[(k+f)&3]);}}
  for(let k=0;k<10;k++)a.set(32+Math.round(Math.cos(k*1.1)*4),12-k,W[1]);ell(a,32,2,2,2,GOLDL);outlineAll(a,OUTL);});}
// Repulsor gravitatorio: una bobina de cobre sobre una base, con un emisor que flota arriba y larga luz cian (los anillos que se alejan van aparte, ERA.deco).
function repulsorArt(){return mkA(64,64,a=>{rect(a,12,52,40,8,DARK[2]);rect(a,12,52,40,2,DARK[3]);rect(a,18,46,28,7,DARK[1]);
  for(let y=24;y<46;y++)rect(a,24,y,16,1,(y>>1)&1?COPPER[2]:COPPER[1]);rect(a,24,24,4,22,COPPER[0]);
  ell(a,32,15,13,5,(i,j)=>j<=0?PEARL[3]:PEARL[1]);ell(a,32,17,6,3,(i,j)=>j>=0?CYAN:null);ell(a,32,9,4,4,(i,j)=>Math.hypot(i+1,j+1)<1.6?hx('#ffffff'):CYAN);
  outlineAll(a,OUTL);});}
// Bolsa de estrellas: un edificio con una pantalla grande donde una curva sube entre estrellas, y un cartel con precios.
function bolsaArt(){return mkA(64,64,a=>{rect(a,4,26,56,34,PEARL[2]);rect(a,44,26,16,34,PEARL[1]);rect(a,2,22,60,5,PEARL[3]);
  rect(a,8,30,34,20,SPACE[0]);let py=46;for(let x=10;x<40;x++){py=Math.max(32,py-((x%5)?(x%3?1:0):-1));a.set(x,py,hx('#93d36c'));a.set(x,py+1,hx('#5a9a3a'));}
  for(const[x,y]of[[14,34],[22,38],[34,33]]){a.set(x,y,GOLDL);a.set(x+1,y,GOLDL);a.set(x,y+1,GOLDL);a.set(x-1,y,GOLDL);a.set(x,y-1,GOLDL);}
  rect(a,46,30,10,20,DKW);rect(a,8,53,34,4,GOLD);for(let x=10;x<40;x+=5)rect(a,x,54,3,2,SPACE[1]);outlineAll(a,OUTL);});}
// Sol de bolsillo: una estrella chiquita y brillante que flota sobre un campo, sostenida por un aro.
function solArt(){return mkA(64,64,a=>{rect(a,4,44,56,14,SOIL[1]);rect(a,4,44,56,2,SOIL[2]);
  for(let x=7;x<58;x+=5){rect(a,x,38,2,8,LEAF[2]);a.set(x,37,GOLDL);a.set(x+1,38,LEAF[3]);}
  ell(a,32,16,15,15,(i,j)=>Math.hypot(i,j)>13.5?PEARL[2]:null);rect(a,31,30,2,10,PEARL[1]);
  ell(a,32,16,9,9,(i,j)=>{const d=Math.hypot(i+2,j+2);return d<3?hx('#fffbe0'):d<6?GOLDL:hx('#f08a24');});
  outlineAll(a,OUTL);for(const[x,y]of[[32,3],[32,29],[19,16],[45,16]])a.set(x,y,GOLDL);});}
// Colisionador: un anillo enorme con luz azul adentro, un detector en el medio y caños.
function colliderArt(){return mkA(64,64,a=>{rect(a,2,50,60,10,DARK[2]);rect(a,2,50,60,1,DARK[3]);
  ell(a,32,34,29,14,(i,j)=>{const d=Math.hypot(i/29,j/14);return d>0.78?(j<0?PEARL[3]:PEARL[1]):d>0.66?hx('#4a78e8'):null;});
  rect(a,24,22,16,20,DARK[1]);rect(a,24,22,16,2,DARK[3]);ell(a,32,32,5,5,(i,j)=>Math.hypot(i,j)<2?hx('#ffffff'):Math.hypot(i,j)<3.5?QL[2]:QR[2]);
  for(const x of[14,50]){rect(a,x-2,40,4,10,COPPER[1]);}outlineAll(a,OUTL);for(const[x,y,k]of[[10,34,0],[54,34,1],[32,47,2]])a.set(x,y,QL[k]);});}
// Radiotelescopio: una antena parabólica grande que mira al cielo, sobre una base que gira.
function radioArt(){return mkA(64,64,a=>{rect(a,14,52,36,8,PEARL[1]);rect(a,14,52,36,2,PEARL[3]);rect(a,26,36,12,16,PEARL[2]);rect(a,34,36,4,16,PEARL[1]);
  ell(a,30,22,24,13,(i,j)=>{if(i+j*1.4>8)return null;const d=Math.hypot(i/24,j/13);return d>0.9?PEARL[0]:d>0.5?PEARL[2]:PEARL[3];});
  line(a,30,22,44,8,DARK[2],1);line(a,20,30,44,8,DARK[2],1);ell(a,45,7,2.5,2.5,CORAL);for(let k=0;k<3;k++)a.set(50+k*3,4-k,CYAN);outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#f6f9fc',C:'#bcc6d6',j:'#e8504a',y:'#3a2418'},{c:'#463e78',C:'#2c2650',j:'#4fc060',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#4a78e8',C:'#2e5288',j:'#ffd35a',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:quarkOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:sphereHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),babel:babelArt(),repulsor:repulsorArt(),bolsa:bolsaArt(),
  sol:solArt(),colisionador:colliderArt(),radio:radioArt(),
  hero:[personArt({c:'#ffd35a',C:'#c8a020',j:'#2a2a3a'},0),personArt({c:'#ffd35a',C:'#c8a020',j:'#2a2a3a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
