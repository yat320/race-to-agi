// Era de la conciencia del mundo abierto (la que sigue a la multiversal): cristales de recuerdo, cúpulas de silencio y sirenas que cantan y atraen a tu gente; la conciencia compartida. Datos y arte de la era; las reglas están en motor.html y las sirenas en amenazas/sirenas.js.
const ERA={
  n:17,name:'Era de la conciencia',de:'de la era de la conciencia',obra:'la conciencia compartida',next:null,
  // En la fila de eras (sin esto diría "De la conciencia").
  short:'Conciencia',
  ore:{id:'recuerdo',name:'Cristales de recuerdo',col:'#d8b8ff',empty:'Veta de recuerdos agotada',gather:'cristales de recuerdo',icon:[['...k....','..kwk.k.','.kwlLkwk','.klLLklk','kwlLkLLk','klLLkLk.','.kLLLk..','..kkk...'],{w:'#ffffff',l:'#f0dcff',L:'#b48cff'}]},
  storage:{id:'granero'},ideaBuild:'colmena',ideaTechs:['memoria','colmena'],boostTech:'empatia',farmBuild:'jardinmente',nightTech:'colmena',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','memoria','silencio','suenos','jardinmente','destileria','colmena'],
  sirens:true,defense:{id:'silencio',r:4,label:'Cúpulas'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'director',building:'Conservatorio',unit:'Director de orquesta',done:'Conservatorio abierto: llegó un director de orquesta',desc:'Trae un director de orquesta que tapa el canto con su música y sale solo a callar sirenas, a 8 casilleros o menos.',info:'Conservatorio: su director de orquesta calla a las sirenas cerca.',tip:'un conservatorio: el director de orquesta sale solo a callar a las sirenas.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo16-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era multiversal',perks:[
    ['puerta','ideaMult',1.25,'Puerta al multiverso: ideas +25% durante toda la era'],
    ['semillas','agri',1.25,'Semillas de mil mundos: granjas +25%'],
    ['destinos','speed',1.2,'Mapa de destinos: te movés 20% más rápido']
  ]},
  techs:[
 {id:'memoria',name:'Cristales de recuerdo',cost:{recuerdo:15,ideas:30},req:[],desc:'Desbloquea el palacio de la memoria, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'silencio',name:'Cúpulas de silencio',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea la cúpula de silencio: la gente que trabaja cerca no oye a las sirenas.'},
 {id:'suenos',name:'Mercado de sueños',cost:{recuerdo:20,ideas:50},req:['memoria'],desc:'Desbloquea el mercado de sueños, que da monedas. Vienen 30% más sirenas.'},
 {id:'jardines',name:'Jardines de la mente',cost:{madera:40,piedra:20,ideas:65},req:['memoria'],desc:'Desbloquea el jardín de la mente, que potencia las granjas.'},
 {id:'destilado',name:'Destilado de recuerdos',cost:{madera:60,recuerdo:20,ideas:95},req:['suenos'],desc:'Desbloquea la destilería de recuerdos, que hace cristales sola.'},
 {id:'armonia',name:'Armonía',cost:{monedas:30,ideas:130},req:['silencio','suenos'],desc:'El canto de las sirenas crece la mitad de rápido.'},
 {id:'colmena',name:'Mente colmena',cost:{monedas:55,ideas:340},req:['armonia','destilado'],desc:'Desbloquea la colmena. Ideas +50% y de noche ves más lejos.'},
 {id:'empatia',name:'Empatía total',cost:{recuerdo:70,monedas:55,ideas:450},req:['suenos','armonia'],desc:'Todo produce +50%.'},
 {id:'conciencia',name:'La conciencia compartida',cost:{piedra:130,recuerdo:110,monedas:130,ideas:1000},req:['colmena','empatia'],desc:'Todas las mentes de todos los universos, pensando juntas. Cierra la era de la conciencia.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa nube',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa nube lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'memoria',base:{madera:25,piedra:20,recuerdo:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'memoria',base:{madera:20,recuerdo:8},grow:1.35,prod:{piedra:0.12}},
 {id:'memoria',name:'Palacio de la memoria',req:'memoria',base:{piedra:40,recuerdo:10},grow:1.5,done:'Palacio de la memoria abierto',desc:'Cada cuarto guarda un recuerdo de alguien: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'silencio',name:'Cúpula de silencio',req:'silencio',base:{madera:25,piedra:25,recuerdo:5},grow:1.4,done:'Cúpula de silencio lista',desc:'La gente que trabaja a 4 casilleros o menos no oye a las sirenas, y las que se acercan se callan.'},
 {id:'suenos',name:'Mercado de sueños',req:'suenos',base:{madera:30,piedra:25,recuerdo:5},grow:1.4,done:'Mercado de sueños abierto',desc:'Se compran y se venden sueños embotellados: da muchas monedas.',prod:{monedas:0.45}},
 {id:'jardinmente',name:'Jardín de la mente',req:'jardines',base:{madera:35,piedra:30},grow:1.6,done:'Jardín de la mente plantado',desc:'Cada jardín de la mente hace rendir +50% a todas las granjas.'},
 {id:'destileria',name:'Destilería de recuerdos',req:'destilado',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Destilería de recuerdos encendida',desc:'Destila recuerdos y hace cristales sola.',prod:{recuerdo:0.12}},
 {id:'colmena',name:'Colmena',req:'colmena',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Colmena conectada',desc:'Muchas mentes pensando como una: ideas +30% por cada colmena.'}],
  info:{casa:'Casa nube: acá viven 2 aldeanos.',herreria:'Nanotaller: los aldeanos juntan más rápido.',memoria:'Palacio de la memoria: genera ideas.',silencio:'Cúpula de silencio: la gente a 4 casilleros o menos no oye a las sirenas, y las que se acercan se callan.',suenos:'Mercado de sueños: da monedas.',jardinmente:'Jardín de la mente: potencia las granjas.',destileria:'Destilería de recuerdos: da cristales de recuerdo.',colmena:'Colmena: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['silencio','silencio','una cúpula de silencio: la gente que trabaja cerca no oye a las sirenas.']],
  tips2:[['memoria','memoria','un palacio de la memoria: genera muchísimas ideas.'],['suenos','suenos','un mercado de sueños para conseguir monedas.'],['jardines','jardinmente','un jardín de la mente: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era de la conciencia completa.',
  // La cúpula de silencio tiene un brillo que la recorre; la colmena prende sus celdas de a una; del mercado suben burbujas
  // de sueño, del jardín suben pensamientos y a la destilería le caen gotas.
  deco:(o,px,py)=>{if(o.bug)return;const off=((px*3+py*5)%16)/16,t=st.time;
    if(o.t==='silencio'){const ph=(t/2.6+off)%1;ctx.strokeStyle='rgba(255,255,255,'+(0.65*Math.sin(ph*Math.PI)).toFixed(2)+')';ctx.lineWidth=0.7;ctx.beginPath();ctx.arc(px+8,py+10.5,6.6,Math.PI*(1.08+ph*0.5),Math.PI*(1.3+ph*0.5));ctx.stroke();}
    else if(o.t==='colmena'){const k=Math.floor(t*2.5+off*7)%7,c=[[8,5],[5,7],[11,7],[8,9],[5,11],[11,11],[8,13]][k];ctx.fillStyle='rgba(255,240,170,.85)';ctx.fillRect(px+c[0]-1,py+c[1]-1,2,2);}
    else if(o.t==='suenos'){for(let k=0;k<3;k++){const ph=(t*0.35+off+k/3)%1;ctx.fillStyle=['rgba(255,138,216,','rgba(79,232,255,','rgba(255,211,90,'][k]+(0.8*(1-ph)).toFixed(2)+')';ctx.beginPath();ctx.arc(px+4+k*4+Math.sin(ph*6+k)*1,py+8-ph*9,0.6+ph*0.8,0,6.29);ctx.fill();}}
    else if(o.t==='jardinmente'){for(let k=0;k<2;k++){const ph=(t*0.3+off+k/2)%1;ctx.fillStyle='rgba(255,220,250,'+(0.9*(1-ph)).toFixed(2)+')';ctx.fillRect(px+7+k*2+Math.sin(ph*5+k)*1.5,py+3-ph*7,1,1);}}
    else if(o.t==='destileria'){const ph=(t*0.9+off)%1;ctx.fillStyle='rgba(216,184,255,'+(1-ph*0.6).toFixed(2)+')';ctx.fillRect(px+13.4,py+8+ph*3,0.8,1);}},
  text:{
    when:'Año 10.000.000',title:'La era de la conciencia',
    intro:'Con la puerta al multiverso abierta, las mentes de todos los universos empiezan a tocarse: los recuerdos se vuelven cristales y los sueños se compran y se venden. Pero entre las mentes también vagan sirenas. Llegan flotando adonde trabaja más gente y cantan, y el que las oye deja todo y se queda a escucharlas. Tocalas para callarlas, o poné cúpulas de silencio. La meta: la conciencia compartida.',
    news:'Novedades: cristales de recuerdo, cúpulas de silencio y sirenas. Una sirena canta cerca de tu gente y el que la oye deja de trabajar y se queda a escucharla. Tocala y los suelta a todos; si nadie la toca, se va sola al rato.',
    legacy:'Lo que trae tu ciudad de la era multiversal',
    noLegacy:'No hay una era multiversal terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o una veta y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Llegan sirenas: cantan cerca de tu gente y el que las oye deja de trabajar para quedarse a escucharlas. Tocalas para callarlas y soltar a todos. Cerca de una cúpula de silencio no se las oye. En la compu: flechas o WASD.',
    win:'La conciencia compartida',winText:()=>'Terminaste la conciencia compartida en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Ahora todas las mentes de todos los universos piensan juntas.'}
};
/* ---------- arte de la era ---------- */
const CYAN=hx('#5fe3d0'),VIO=hx('#b48cff'),GOLDL=hx('#ffd35a'),CORAL=hx('#e8654d'),PINK=hx('#ff8ad8'),SKY=hx('#4fe8ff'),
  PEARL=P4('#9aa4b8','#bcc6d6','#dde4ee','#f6f9fc'),DARK=P4('#14161c','#20242e','#2e3440','#404858'),
  LILA=P4('#6a4a9a','#9a78d0','#c8a8f0','#ece0ff'),NACAR=P4('#a898bc','#ccc0de','#ebe4f4','#ffffff'),NUBE=P4('#a8b4d0','#ccd6ec','#eaf0fa','#ffffff');
// Hexágono con la punta para arriba (las celdas de la colmena).
function hexCell(a,cx,cy,r,c){const p=[];for(let k=0;k<6;k++){const an=Math.PI/6+k*Math.PI/3;p.push([cx+Math.cos(an)*r,cy+Math.sin(an)*r]);}poly(a,p,c);}
// Veta de cristales de recuerdo: prismas lilas y nacarados sobre la roca, con un brillo rosado adentro del más grande.
function memoryOreArt(){return mkA(64,52,a=>{blob(a,[[32,42,13],[20,44,8],[44,44,9]],ROCK,null);
  for(const[x,y,h,w]of[[20,42,19,8],[44,43,16,7],[32,40,30,11]]){const hw=w/2;
    poly(a,[[x-hw,y],[x-hw,y-h*0.72],[x,y-h],[x+hw,y-h*0.72],[x+hw,y]],(px,py)=>px<x-hw*0.35?LILA[3]:px<x+hw*0.2?LILA[2]:((px+py)&3)?LILA[1]:hx('#e8a8e0'));
    line(a,x-hw+1,y-2,x-hw+1,y-h*0.72,NACAR[3],1);}
  ell(a,32,25,3,6,(i,j)=>Math.hypot(i,j/2)<1.4?hx('#ffffff'):hx('#ffc8f0'));for(const[x,y]of[[18,30],[45,33],[28,16]])a.set(x,y,hx('#ffffff'));
  for(let x=10;x<56;x++)for(let y=46;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa nube: una casita lila con techo a dos aguas y una ventana redonda que brilla, sentada sobre una nube.
function cloudHouseArt(){return mkA(64,64,a=>{rect(a,16,26,32,24,NACAR[2]);rect(a,38,26,10,24,NACAR[1]);
  poly(a,[[11,28],[32,8],[53,28]],(x,y)=>y>25?LILA[0]:x<32?LILA[2]:LILA[1]);rect(a,40,10,5,10,LILA[1]);rect(a,39,9,7,2,LILA[0]);
  ell(a,26,35,4.5,4.5,(i,j)=>Math.hypot(i,j)>3.4?LILA[1]:i+j<-1?hx('#fff4c8'):hx('#ffd35a'));rect(a,35,36,8,14,LILA[0]);rect(a,36,37,6,13,hx('#7a5aa8'));a.set(40,44,GOLDL);
  blob(a,[[13,53,9],[26,51,11],[40,52,10],[52,54,8],[32,57,9],[20,58,6]],NUBE,null);outlineAll(a,OUTL);});}
// Palacio de la memoria: un palacio nacarado con muchas ventanitas, cada una con un recuerdo de otro color, y una cúpula con un cristal arriba.
function memoryPalaceArt(){return mkA(64,64,a=>{const C=[PINK,SKY,GOLDL,VIO,CYAN,hx('#ffb070')];
  rect(a,4,32,56,26,NACAR[2]);rect(a,46,32,14,26,NACAR[1]);rect(a,2,56,60,4,NACAR[0]);rect(a,2,30,60,3,NACAR[3]);rect(a,2,33,60,1,NACAR[0]);
  ell(a,32,30,15,13,(i,j)=>j>0?null:i<-5?LILA[3]:i>7?LILA[1]:LILA[2]);for(const x of[24,32,40])rect(a,x,19,1,11,LILA[0]);
  poly(a,[[32,2],[37,10],[32,17],[27,10]],(x,y)=>x<32?hx('#f6e8ff'):hx('#c8a0f0'));a.set(31,8,hx('#ffffff'));
  for(let r=0;r<2;r++)for(let k=0;k<6;k++){const x=7+k*9+(k>2?2:0),y=37+r*9;if(k===2||k===3){continue;}rect(a,x,y,5,6,C[(k*3+r*2)%6]);rect(a,x,y,5,1,NACAR[0]);}
  rect(a,27,42,10,14,DKW);ell(a,32,42,5,4,(i,j)=>j<=0?DKW:null);rect(a,29,44,6,12,hx('#4a3a6a'));ell(a,32,49,1.5,1.5,PINK);outlineAll(a,OUTL);});}
// Cúpula de silencio: una burbuja de vidrio lila sobre un zócalo, con un parlante tachado adentro: acá no se oye nada (el
// brillo que la recorre va aparte, ERA.deco).
function silenceDomeArt(){return mkA(64,64,a=>{rect(a,6,50,52,10,PEARL[1]);rect(a,6,50,52,2,PEARL[3]);rect(a,44,52,14,8,PEARL[0]);for(const x of[12,22,40,50])rect(a,x,55,4,2,LILA[2]);
  ell(a,32,50,26,28,(i,j)=>{if(j>0)return null;const d=Math.hypot(i/26,j/28);return d>0.9?NACAR[3]:d>0.82?LILA[2]:i<-8&&j<-12&&d<0.62?hx('#f4ecff'):((i*3+j*5)&15)?hx('#b8a4e0'):hx('#d4c4f4');});
  rect(a,20,33,7,10,LILA[0]);poly(a,[[26,33],[35,25],[35,51],[26,43]],LILA[0]);rect(a,21,34,2,8,hx('#8a6ac0'));
  line(a,18,46,44,26,NACAR[3],5);line(a,18,46,44,26,CORAL,3);outlineAll(a,OUTL);});}
// Mercado de sueños: un puesto con toldo a rayas lilas y frascos de sueños de colores que brillan en el mostrador.
function dreamMarketArt(){return mkA(64,64,a=>{rect(a,6,30,52,28,WOOD[2]);rect(a,6,30,52,2,WOOD[3]);rect(a,46,30,12,28,WOOD[1]);for(const x of[8,54])rect(a,x,14,3,22,WOOD[1]);
  for(let x=4;x<60;x++){const c=((x>>2)&1)?LILA[2]:NACAR[3];rect(a,x,12,1,10,c);if(x%4<2)a.set(x,22,c);}rect(a,4,11,56,2,LILA[0]);
  rect(a,8,36,48,2,WOOD[0]);for(const[x,c]of[[12,PINK],[21,SKY],[30,GOLDL],[39,VIO],[48,CYAN]]){rect(a,x+1,25,2,2,WOOD[0]);rect(a,x,27,4,9,c);rect(a,x,27,1,9,hx('#ffffff'));}
  rect(a,22,42,20,10,NACAR[2]);rect(a,22,42,20,1,NACAR[3]);ell(a,29,47,3,3,GOLDL);ell(a,30,46,2,2,hx('#fff4c8'));poly(a,[[34,44],[38,44],[37,49]],LILA[1]);ell(a,36,44,2.5,2.5,(i,j)=>i>0?null:LILA[1]);
  outlineAll(a,OUTL);});}
// Jardín de la mente: un cantero con flores que brillan y, en el medio, un arbusto podado con forma de cerebro.
function mindGardenArt(){return mkA(64,64,a=>{const BR=P4('#a84a8a','#d070b0','#f0a0d4','#ffd4ee');rect(a,4,46,56,12,SOIL[1]);rect(a,4,46,56,2,SOIL[2]);for(let x=6;x<58;x+=6)rect(a,x,53,3,1,SOIL[0]);
  rect(a,30,38,4,10,WOOD[2]);rect(a,30,38,1,10,WOOD[3]);
  ell(a,32,24,18,15,(i,j)=>{const d=Math.hypot(i/18,j/15),w=Math.sin(i*0.7+Math.cos(j*0.6)*2.2)+Math.sin(j*0.9+i*0.2);return d>0.86?BR[1]:Math.abs(w)<0.35?BR[0]:i+j<-8?BR[3]:BR[2];});
  rect(a,31,11,2,26,BR[0]);
  for(const[x,y,c]of[[9,44,PINK],[16,42,SKY],[48,43,GOLDL],[55,44,VIO],[12,50,CYAN],[52,50,PINK]]){line(a,x,y+6,x,y+1,LEAF[2],1);ell(a,x,y,2.2,2.2,c);a.set(x,y,hx('#ffffff'));}
  outlineAll(a,OUTL);});}
// Destilería de recuerdos: un alambique de cobre sobre un fuego lila, con el caño en espiral que gotea en un frasco de cristales (la gota va aparte, ERA.deco).
function distilleryArt(){return mkA(64,64,a=>{rect(a,4,52,40,8,PEARL[1]);rect(a,4,52,40,2,PEARL[3]);
  for(const[x,h]of[[12,6],[18,9],[24,7],[30,8]]){poly(a,[[x-3,52],[x,52-h],[x+3,52]],LILA[2]);a.set(x,50,hx('#ffffff'));}
  ell(a,22,36,15,13,(i,j)=>i<-6&&j<-4?COPPER[2]:i>6?COPPER[0]:COPPER[1]);rect(a,8,46,28,4,COPPER[0]);ell(a,22,22,6,4,COPPER[2]);rect(a,20,12,4,8,COPPER[1]);
  line(a,22,12,44,14,COPPER[1],3);line(a,22,11,44,13,COPPER[2],1);for(let k=0;k<3;k++)ell(a,48,18+k*6,6,2.4,(i,j)=>j<0?COPPER[2]:COPPER[0]);rect(a,52,16,3,22,COPPER[0]);
  rect(a,48,42,14,18,hx('#e4f0ff'));rect(a,48,42,14,2,NACAR[0]);rect(a,49,48,12,11,hx('#c8a8f0'));for(const[x,y]of[[51,52],[56,50],[54,56],[58,55]])poly(a,[[x-2,y+3],[x,y-3],[x+2,y+3]],(px)=>px<x?LILA[3]:LILA[1]);
  rect(a,52,38,3,4,COPPER[0]);outlineAll(a,OUTL);});}
// Colmena: celdas hexagonales que se apilan como un panal, con una luz adentro de cada una y una antena arriba (las celdas que se prenden van aparte, ERA.deco).
function hiveArt(){return mkA(64,64,a=>{rect(a,8,54,48,6,PEARL[1]);rect(a,8,54,48,2,PEARL[3]);
  for(const[x,y]of[[32,20],[20,27],[44,27],[32,34],[20,41],[44,41],[32,48]]){hexCell(a,x,y,8.6,NACAR[0]);hexCell(a,x,y,7.2,NACAR[2]);hexCell(a,x,y,4.8,(px,py)=>px+py<x+y-2?hx('#fff0b0'):hx('#c890f0'));}
  rect(a,31,4,2,9,PEARL[0]);ell(a,32,4,2.5,2.5,CYAN);outlineAll(a,OUTL);});}
// Conservatorio (el cuartel de los directores de orquesta): una sala de conciertos nacarada con un ventanal en arco y una lira dorada en el frente.
function conservatoryArt(){return mkA(64,64,a=>{rect(a,6,26,52,32,NACAR[2]);rect(a,46,26,12,32,NACAR[1]);rect(a,4,56,56,4,NACAR[0]);
  poly(a,[[2,27],[32,10],[62,27]],(x,y)=>x<32?LILA[2]:LILA[1]);rect(a,2,26,60,2,LILA[0]);
  for(const x of[9,49])rect(a,x,30,6,26,NACAR[3]);rect(a,20,34,24,22,DKW);ell(a,32,34,12,8,(i,j)=>j<=0?DKW:null);rect(a,22,36,20,20,hx('#ffd35a'));ell(a,32,36,10,6,(i,j)=>j<=0?hx('#fff4c8'):null);
  for(const x of[27,32,37])rect(a,x,30,1,26,NACAR[0]);
  line(a,28,13,26,22,GOLDL,2);line(a,36,13,38,22,GOLDL,2);rect(a,27,22,10,2,GOLDL);for(const x of[30,32,34])rect(a,x,15,1,7,hx('#fff4c8'));outlineAll(a,OUTL);});}
// El cuartel de esta era es el conservatorio (en vez del hangar de las eras del futuro).
EP_ART.cuartel=EP_ART.cuartel.map((f,e)=>e===3?conservatoryArt:f);
const VILPAL2=[{c:'#c8a8f0',C:'#9a78c8',j:'#4a3a6a',y:'#3a2418'},{c:'#8ad8e8',C:'#5aa8c0',j:'#2a2a3a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#f0b8d8',C:'#c888a8',j:'#5a3a6a',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:memoryOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:cloudHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),memoria:memoryPalaceArt(),silencio:silenceDomeArt(),
  suenos:dreamMarketArt(),jardinmente:mindGardenArt(),destileria:distilleryArt(),colmena:hiveArt(),
  hero:[personArt({c:'#ece0ff',C:'#b48cff',j:'#2a2a3a'},0),personArt({c:'#ece0ff',C:'#b48cff',j:'#2a2a3a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
