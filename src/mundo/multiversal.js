// Era multiversal del mundo abierto (la que sigue a la cósmica): materia espejo, espejos de la verdad y dobles de tu gente que llegan de otros universos a robarte; la puerta al multiverso. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:16,name:'Era multiversal',de:'de la era multiversal',obra:'la puerta al multiverso',next:null,
  ore:{id:'espejo',name:'Materia espejo',col:'#bfe4f4',empty:'Veta de materia espejo agotada',gather:'materia espejo',icon:[['....k...','...kwk..','..kwsSk.','.kwsSSsk','kwsSwSk.','.ksSSk..','..kSk...','...k....'],{w:'#ffffff',s:'#bfe4f4',S:'#7aa8c8'}]},
  storage:{id:'granero'},ideaBuild:'telar',ideaTechs:['espejo','destinos'],boostTech:'superposicion',farmBuild:'semillero',nightTech:'destinos',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','ventana','verdad','canje','semillero','pulidora','telar'],
  twins:true,defense:{id:'verdad',r:4,label:'Espejos'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'detective',building:'Oficina de detectives',unit:'Detective',done:'Oficina de detectives abierta: llegó un detective',desc:'Trae un detective que reconoce a los dobles y sale solo a mandarlos de vuelta, a 8 casilleros o menos.',info:'Oficina de detectives: su detective atrapa dobles cerca.',tip:'una oficina de detectives: el detective reconoce a los dobles y los atrapa solo.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo15-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era cósmica',perks:[
    ['computadora','ideaMult',1.25,'Computadora cósmica: ideas +25% durante toda la era'],
    ['soles','agri',1.25,'Soles de bolsillo: granjas +25%'],
    ['fondo','speed',1.2,'Fondo cósmico: te movés 20% más rápido']
  ]},
  techs:[
 {id:'espejo',name:'Materia espejo',cost:{espejo:15,ideas:30},req:[],desc:'Desbloquea la ventana a otros universos, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'verdad',name:'Espejos de la verdad',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el espejo de la verdad: desenmascara a los dobles que pasan cerca.'},
 {id:'canje',name:'Comercio entre universos',cost:{espejo:20,ideas:50},req:['espejo'],desc:'Desbloquea la casa de canje, que da monedas. Se abren 30% más portales.'},
 {id:'semillas',name:'Semillas de mil mundos',cost:{madera:40,piedra:20,ideas:65},req:['espejo'],desc:'Desbloquea el semillero de mil mundos, que potencia las granjas.'},
 {id:'pulido',name:'Espejos perfectos',cost:{madera:60,espejo:20,ideas:95},req:['canje'],desc:'Desbloquea la pulidora de espejos, que hace materia espejo sola.'},
 {id:'identidad',name:'Prueba de identidad',cost:{monedas:30,ideas:130},req:['verdad','canje'],desc:'Los dobles roban la mitad.'},
 {id:'destinos',name:'Mapa de destinos',cost:{monedas:55,ideas:340},req:['identidad','pulido'],desc:'Desbloquea el telar de destinos. Ideas +50% y de noche ves más lejos.'},
 {id:'superposicion',name:'Superposición',cost:{espejo:70,monedas:55,ideas:450},req:['canje','identidad'],desc:'Todo produce +50%.'},
 {id:'puerta',name:'La puerta al multiverso',cost:{piedra:130,espejo:110,monedas:130,ideas:1000},req:['destinos','superposicion'],desc:'Un camino a todos los universos posibles. Cierra la era multiversal.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa caleidoscopio',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa caleidoscopio lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'espejo',base:{madera:25,piedra:20,espejo:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'espejo',base:{madera:20,espejo:8},grow:1.35,prod:{piedra:0.12}},
 {id:'ventana',name:'Ventana a otros universos',req:'espejo',base:{piedra:40,espejo:10},grow:1.5,done:'Ventana a otros universos abierta',desc:'Mirás cómo resolvieron todo en otros universos: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'verdad',name:'Espejo de la verdad',req:'verdad',base:{madera:25,piedra:25,espejo:5},grow:1.4,done:'Espejo de la verdad colgado',desc:'Desenmascara a los dobles que pasan a 4 casilleros o menos: los manda de vuelta con lo que robaron.'},
 {id:'canje',name:'Casa de canje',req:'canje',base:{madera:30,piedra:25,espejo:5},grow:1.4,done:'Casa de canje abierta',desc:'Se canjean cosas con otros universos: da muchas monedas.',prod:{monedas:0.45}},
 {id:'semillero',name:'Semillero de mil mundos',req:'semillas',base:{madera:35,piedra:30},grow:1.6,done:'Semillero de mil mundos plantado',desc:'Cada semillero hace rendir +50% a todas las granjas.'},
 {id:'pulidora',name:'Pulidora de espejos',req:'pulido',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Pulidora de espejos encendida',desc:'Pule materia espejo sola.',prod:{espejo:0.12}},
 {id:'telar',name:'Telar de destinos',req:'destinos',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Telar de destinos tejiendo',desc:'Teje los caminos de todos los universos: ideas +30% por cada telar.'}],
  info:{casa:'Casa caleidoscopio: acá viven 2 aldeanos.',herreria:'Nanotaller: los aldeanos juntan más rápido.',ventana:'Ventana a otros universos: genera ideas.',verdad:'Espejo de la verdad: desenmascara a los dobles a 4 casilleros o menos.',canje:'Casa de canje: da monedas.',semillero:'Semillero de mil mundos: potencia las granjas.',pulidora:'Pulidora de espejos: da materia espejo.',telar:'Telar de destinos: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['verdad','verdad','un espejo de la verdad: desenmascara a los dobles que pasan cerca.']],
  tips2:[['espejo','ventana','una ventana a otros universos: genera muchísimas ideas.'],['canje','canje','una casa de canje para conseguir monedas.'],['semillas','semillero','un semillero de mil mundos: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era multiversal completa.',
  // El espejo de la verdad tiene un brillo que lo cruza cada tanto, y el telar, hilos de colores que se mueven.
  deco:(o,px,py)=>{if(o.bug)return;const off=((px*3+py*5)%16)/16;
    if(o.t==='verdad'){const ph=(st.time/2.2+off)%1;if(ph<0.35){const x=px+4+ph/0.35*8;ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=0.8;ctx.beginPath();ctx.moveTo(x,py+3);ctx.lineTo(x-2,py+11);ctx.stroke();}}
    else if(o.t==='telar'){for(let k=0;k<3;k++){const y=py+5+k*2.2+Math.sin(st.time*3+k*2+off*6)*0.6;ctx.fillStyle=['#ff4fd8','#4fe8ff','#ffd35a'][k];ctx.fillRect(px+3,y,10,0.7);}}},
  text:{
    when:'Año 1.000.000',title:'La era multiversal',
    intro:'Con la computadora cósmica, la humanidad descubre que este universo no es el único: hay infinitos, uno al lado del otro, y en cada uno hay otra versión de tu ciudad. Por portales llegan dobles de tu gente, idénticos, que se mezclan y te roban ideas, monedas y materia espejo para llevárselas a su universo. Los delata que titilan cada tanto: tocalos para mandarlos de vuelta, o poné espejos de la verdad. La meta: la puerta al multiverso.',
    news:'Novedades: materia espejo, espejos de la verdad y dobles. Un doble sale de un portal con la cara de alguien de tu gente, se mezcla en la ciudad y cada tanto roba (se ve el número). Cuando juntó bastante, vuelve a su portal. Lo delata que titila: tocalo y devuelve todo.',
    legacy:'Lo que trae tu ciudad de la era cósmica',
    noLegacy:'No hay una era cósmica terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o una veta y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Llegan dobles de tu gente desde otros universos: se mezclan y roban ideas, monedas y materia espejo. Los delatan que titilan cada tanto y el número de lo que roban: tocalos para mandarlos de vuelta con lo robado. Cerca de un espejo de la verdad los desenmascaran solos. En la compu: flechas o WASD.',
    win:'La puerta al multiverso',winText:()=>'Terminaste la puerta al multiverso en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Ahora tu ciudad puede ir a visitar a todas sus otras versiones.'}
};
/* ---------- arte de la era ---------- */
const CYAN=hx('#5fe3d0'),VIO=hx('#b48cff'),GOLDL=hx('#ffd35a'),CORAL=hx('#e8654d'),PINK=hx('#ff4fd8'),SKY=hx('#4fe8ff'),
  MIR=P4('#5a7a98','#7aa8c8','#bfe4f4','#ffffff'),PEARL=P4('#9aa4b8','#bcc6d6','#dde4ee','#f6f9fc'),DARK=P4('#14161c','#20242e','#2e3440','#404858');
// Veta de materia espejo: astillas de espejo plateadas, paradas en la roca, que reflejan el cielo.
function mirrorOreArt(){return mkA(64,52,a=>{blob(a,[[32,42,13],[20,44,8],[44,44,9]],ROCK,null);
  for(const[x,y,h,w]of[[22,40,22,6],[32,38,30,7],[42,41,20,6]]){poly(a,[[x-w/2,y],[x,y-h],[x+w/2,y]],(px,py)=>px<x-1?MIR[2]:px<x+1?MIR[3]:MIR[1]);line(a,x-w/4,y-2,x,y-h+4,MIR[3],1);}
  a.set(32,10,hx('#ffffff'));a.set(33,11,MIR[2]);for(let x=10;x<56;x++)for(let y=46;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa caleidoscopio: una casa blanca con una cúpula de vitrales de colores.
function kaleidoHouseArt(){return mkA(64,64,a=>{const VT=[PINK,SKY,GOLDL,VIO,CYAN];rect(a,10,32,44,26,PEARL[2]);rect(a,42,32,12,26,PEARL[1]);rect(a,8,56,48,3,PEARL[0]);
  ell(a,32,32,22,18,(i,j)=>j>0?null:Math.hypot(i,j)>20.5?PEARL[3]:VT[((Math.atan2(j,i)*2.6+5)|0)%5]);for(let k=0;k<5;k++){const an=Math.PI+k*Math.PI/5;line(a,32,32,32+Math.cos(an)*21,32+Math.sin(an)*17,PEARL[3],1);}
  rect(a,28,42,8,14,DKW);for(const x of[15,44])rect(a,x,40,6,6,hx('#7fe8dc'));outlineAll(a,OUTL);});}
// Ventana a otros universos: un marco en arco sobre un pedestal; adentro se ve otro mundo, con cielo rosa y dos lunas.
function windowArt(){return mkA(64,64,a=>{rect(a,12,52,40,8,PEARL[1]);rect(a,12,52,40,2,PEARL[3]);
  poly(a,[[14,52],[14,22],[50,22],[50,52]],PEARL[2]);ell(a,32,22,18,16,(i,j)=>j<=0?PEARL[2]:null);
  poly(a,[[19,50],[19,24],[45,24],[45,50]],(x,y)=>y<38?hx('#ff8ac8'):y<44?hx('#c86aa8'):hx('#5a8a5a'));ell(a,32,24,13,11,(i,j)=>j<=0?hx('#ff8ac8'):null);
  ell(a,26,22,3,3,hx('#fff4d0'));ell(a,37,28,2,2,hx('#d8e8ff'));poly(a,[[19,44],[26,36],[33,44]],hx('#7a4a8a'));poly(a,[[28,44],[37,34],[45,44]],hx('#8a5a9a'));
  outlineAll(a,OUTL);});}
// Espejo de la verdad: un espejo alto con marco dorado sobre un pie (el brillo que lo cruza va aparte, ERA.deco).
function truthMirrorArt(){return mkA(64,64,a=>{rect(a,20,54,24,6,DARK[2]);rect(a,30,44,4,10,GOLDL);
  ell(a,32,24,14,21,(i,j)=>{const d=Math.hypot(i/14,j/21);return d>0.84?(i+j<0?hx('#ffe890'):GOLDL):i+j<-6?MIR[3]:j<6?MIR[2]:MIR[1];});
  for(const[x,y]of[[32,2],[18,24],[46,24]])ell(a,x,y,2,2,CORAL);outlineAll(a,OUTL);});}
// Casa de canje: dos mostradores con un portal entre medio, por donde pasan cajas y monedas.
function canjeArt(){return mkA(64,64,a=>{rect(a,4,34,56,24,PEARL[2]);rect(a,4,30,56,5,PEARL[3]);rect(a,46,34,14,24,PEARL[1]);
  ell(a,32,40,8,13,(i,j)=>{const d=Math.hypot(i/8,j/13);return d>0.8?VIO:Math.sin(Math.atan2(j,i)*3+d*4)>0?hx('#7a5ae0'):hx('#2a1a50');});
  for(const x of[8,46]){rect(a,x,46,12,10,COPPER[1]);rect(a,x,46,12,2,COPPER[2]);}rect(a,10,40,6,5,GOLD);rect(a,48,40,6,5,COPPER[2]);ell(a,52,43,2,2,GOLDL);
  outlineAll(a,OUTL);});}
// Semillero de mil mundos: un cantero con plantas que no se parecen entre sí, cada una de otro universo.
function seedbedArt(){return mkA(64,64,a=>{rect(a,4,44,56,14,SOIL[1]);rect(a,4,44,56,2,SOIL[2]);for(let x=6;x<58;x+=6)rect(a,x,52,3,1,SOIL[0]);
  line(a,10,50,10,30,LEAF[1],2);ell(a,10,28,5,4,PINK);line(a,22,50,22,24,hx('#4a6a9a'),2);for(let k=0;k<4;k++)ell(a,22+(k%2?3:-3),30+k*4,3,1.5,SKY);
  line(a,34,50,34,32,LEAF[2],2);ell(a,34,30,6,6,(i,j)=>Math.hypot(i,j)<2.5?GOLDL:hx('#f08a24'));line(a,46,50,46,22,hx('#6a2a7a'),2);ell(a,46,22,3,6,VIO);
  line(a,56,50,56,36,LEAF[1],2);ell(a,56,34,4,4,CYAN);outlineAll(a,OUTL);});}
// Pulidora de espejos: una máquina con un disco de espejo que gira y chispas.
function polisherArt(){return mkA(64,64,a=>{rect(a,8,36,48,22,DARK[2]);rect(a,8,36,48,3,DARK[3]);rect(a,40,36,16,22,DARK[1]);
  ell(a,26,28,15,6,(i,j)=>j<0?MIR[3]:MIR[1]);rect(a,24,28,4,10,DARK[3]);line(a,40,20,50,8,PEARL[1],3);rect(a,46,4,10,6,PEARL[2]);
  rect(a,12,44,8,8,MIR[2]);rect(a,44,44,8,4,GOLDL);outlineAll(a,OUTL);for(const[x,y]of[[42,24],[45,21],[40,20],[47,26]])a.set(x,y,GOLDL);});}
// Telar de destinos: un telar de madera con hilos de colores que brillan (los que se mueven van aparte, ERA.deco).
function loomArt(){return mkA(64,64,a=>{rect(a,8,56,48,4,WOOD[1]);for(const x of[10,50])rect(a,x,14,4,44,WOOD[2]);rect(a,8,12,48,4,WOOD[3]);rect(a,12,48,40,3,WOOD[1]);
  for(let x=16;x<50;x+=3)rect(a,x,16,1,32,[PINK,SKY,GOLDL,VIO][(x/3|0)%4]);rect(a,16,30,32,4,PEARL[2]);ell(a,32,8,4,4,(i,j)=>Math.hypot(i,j)<1.8?hx('#ffffff'):VIO);
  outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#ff8ac8',C:'#c86aa8',j:'#4a3a8a',y:'#3a2418'},{c:'#4fe8ff',C:'#2aa8c8',j:'#2a2a3a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#ffd35a',C:'#c8a020',j:'#7a4a8a',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:mirrorOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:kaleidoHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),ventana:windowArt(),verdad:truthMirrorArt(),canje:canjeArt(),
  semillero:seedbedArt(),pulidora:polisherArt(),telar:loomArt(),
  hero:[personArt({c:'#bfe4f4',C:'#7aa8c8',j:'#2a2a3a'},0),personArt({c:'#bfe4f4',C:'#7aa8c8',j:'#2a2a3a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
