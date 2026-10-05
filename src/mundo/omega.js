// Era omega del mundo abierto (la que sigue al génesis y la última por ahora): los universos se enfrían; chispas, estufas estelares y olas de frío que cruzan el mapa congelando lo que pisan; el punto omega. Datos y arte de la era; las reglas están en motor.html y las olas, en amenazas/frio.js.
const ERA={
  n:19,name:'Era omega',de:'de la era omega',obra:'el punto omega',next:null,
  ore:{id:'chispa',name:'Chispas',col:'#ffa94d',empty:'Brasas apagadas',gather:'chispas',icon:[['...k....','..kfk...','..kFfk..','.kfFFfk.','kfFwFFfk','kfFwwFfk','.kfFFfk.','..kkkk..'],{f:'#f08a24',F:'#ffd35a',w:'#fff3b0'}]},
  storage:{id:'granero'},ideaBuild:'cronica',ideaTechs:['chispa','cronica'],boostTech:'eternidad',farmBuild:'invernadero',nightTech:'cronica',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','faro','estufa','lonja','invernadero','recolector','cronica'],
  frost:true,defense:{id:'estufa',r:4,label:'Estufas'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'fogonero',building:'Sala de fogoneros',unit:'Fogonero',done:'Sala de fogoneros abierta: llegó un fogonero',desc:'Trae un fogonero que sale solo, con su pala y su brasa, a romper las olas de frío y descongelar lo que encuentra, a 8 casilleros o menos.',info:'Sala de fogoneros: su fogonero rompe las olas de frío cerca.',tip:'una sala de fogoneros: el fogonero rompe las olas de frío y descongela solo.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo18-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era del génesis',perks:[
    ['genesis','ideaMult',1.25,'El universo bebé: ideas +25% durante toda la era'],
    ['cosecha','agri',1.25,'Cosecha de galaxias: granjas +25%'],
    ['leyes','speed',1.2,'Leyes físicas a medida: te movés 20% más rápido']
  ]},
  techs:[
 {id:'chispa',name:'Chispas',cost:{chispa:15,ideas:30},req:[],desc:'Desbloquea el faro de la última luz, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'estufas',name:'Estufas estelares',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea la estufa estelar: le abre un hueco a las olas de frío.'},
 {id:'calor',name:'Lonja del calor',cost:{chispa:20,ideas:50},req:['chispa'],desc:'Desbloquea la lonja del calor, que da monedas. Vienen 30% más olas.'},
 {id:'invernadero',name:'Invernadero eterno',cost:{madera:40,piedra:20,ideas:65},req:['chispa'],desc:'Desbloquea el invernadero eterno, que potencia las granjas.'},
 {id:'recolector',name:'Recolector de chispas',cost:{madera:60,chispa:20,ideas:95},req:['calor'],desc:'Desbloquea el recolector de chispas, que junta chispas solo.'},
 {id:'abrigo',name:'Abrigo cuántico',cost:{monedas:30,ideas:130},req:['estufas','calor'],desc:'Lo congelado se descongela en la mitad.'},
 {id:'cronica',name:'Crónica del universo',cost:{monedas:55,ideas:340},req:['abrigo','recolector'],desc:'Desbloquea la crónica del universo. Ideas +50% y de noche ves más lejos.'},
 {id:'eternidad',name:'Eternidad',cost:{chispa:70,monedas:55,ideas:450},req:['calor','abrigo'],desc:'Todo produce +50%.'},
 {id:'omega',name:'El punto omega',cost:{piedra:130,chispa:110,monedas:130,ideas:1000},req:['cronica','eternidad'],desc:'Todo el calor que queda, junto en un solo punto. Cierra la era omega.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa hoguera',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa hoguera lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'chispa',base:{madera:25,piedra:20,chispa:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'chispa',base:{madera:20,chispa:8},grow:1.35,prod:{piedra:0.12}},
 {id:'faro',name:'Faro de la última luz',req:'chispa',base:{piedra:40,chispa:10},grow:1.5,done:'Faro de la última luz encendido',desc:'Alumbra lo que queda del universo para pensar: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'estufa',name:'Estufa estelar',req:'estufas',base:{madera:25,piedra:25,chispa:5},grow:1.4,done:'Estufa estelar encendida',desc:'Su calor le abre un hueco a las olas de frío que pasan a 4 casilleros o menos, y lo congelado cerca se descongela rápido.'},
 {id:'lonja',name:'Lonja del calor',req:'calor',base:{madera:30,piedra:25,chispa:5},grow:1.4,done:'Lonja del calor abierta',desc:'Se compra y se vende calor: da muchas monedas.',prod:{monedas:0.45}},
 {id:'invernadero',name:'Invernadero eterno',req:'invernadero',base:{madera:35,piedra:30},grow:1.6,done:'Invernadero eterno plantado',desc:'Un jardín que nunca se enfría: cada invernadero hace rendir +50% a todas las granjas.'},
 {id:'recolector',name:'Recolector de chispas',req:'recolector',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Recolector de chispas andando',desc:'Junta las chispas que flotan en el aire: da chispas solo.',prod:{chispa:0.12}},
 {id:'cronica',name:'Crónica del universo',req:'cronica',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Crónica del universo abierta',desc:'Escribe todo lo que pasó desde el principio: ideas +30% por cada crónica.'}],
  info:{casa:'Casa hoguera: acá viven 2 aldeanos, alrededor del fuego.',herreria:'Nanotaller: los aldeanos juntan más rápido.',faro:'Faro de la última luz: genera ideas.',estufa:'Estufa estelar: le abre un hueco a las olas de frío a 4 casilleros o menos.',lonja:'Lonja del calor: da monedas.',invernadero:'Invernadero eterno: potencia las granjas.',recolector:'Recolector de chispas: da chispas.',cronica:'Crónica del universo: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['estufas','estufa','una estufa estelar: le abre un hueco a las olas de frío.']],
  tips2:[['chispa','faro','un faro de la última luz: genera muchísimas ideas.'],['calor','lonja','una lonja del calor para conseguir monedas.'],['invernadero','invernadero','un invernadero eterno: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era omega completa.',
  // Lo congelado lleva escarcha encima (frostCrust, de las olas de frío). Si no: la estufa echa calor que sube, el faro gira su haz,
  // al recolector le caen chispas y en la crónica se escribe una línea nueva.
  deco:(o,px,py)=>{if(o.bug){frostCrust(px,py);return;}const off=((px*3+py*5)%16)/16,t=st.time;
    if(o.t==='estufa'){for(let k=0;k<2;k++){const u=(t*0.6+k/2+off)%1,y=py+1-u*7,x=px+8.4+Math.sin(u*9+k*3)*1.3;ctx.strokeStyle='rgba(255,170,90,'+(0.65*(1-u)).toFixed(2)+')';ctx.lineWidth=0.7;
        ctx.beginPath();ctx.moveTo(x,y);ctx.quadraticCurveTo(x+1.4,y-1.2,x,y-2.4);ctx.stroke();}
      ctx.fillStyle='rgba(255,214,110,'+(0.18+0.12*Math.sin(t*4+off*6)).toFixed(2)+')';ctx.beginPath();ctx.arc(px+8,py+9.5,3.2,0,6.29);ctx.fill();}
    else if(o.t==='faro'){const c=Math.cos(t*1.4+off*6),L=11*Math.abs(c),s=c>0?1:-1;if(L>1.5){ctx.fillStyle='rgba(255,236,150,.32)';ctx.beginPath();ctx.moveTo(px+8,py+2.6);ctx.lineTo(px+8+s*L,py+0.6);ctx.lineTo(px+8+s*L,py+4.6);ctx.closePath();ctx.fill();}}
    else if(o.t==='recolector'){for(let k=0;k<3;k++){const u=(t*0.8+k/3+off)%1;ctx.fillStyle=k%2?'#ffd35a':'#f08a24';ctx.globalAlpha=1-u*0.6;ctx.fillRect(px+4+k*3.6+Math.sin(u*6+k)*1.2-u*(k-1)*1.5,py-3+u*5,1,1);}ctx.globalAlpha=1;}
    else if(o.t==='cronica'){const u=(t*0.35+off)%1;ctx.fillStyle='#c88a2a';ctx.fillRect(px+9,py+4.6+Math.floor(u*3)*1.3,0.5+((u*3)%1)*4.2,0.5);}},
  text:{
    when:'El fin de los tiempos',title:'La era omega',
    intro:'Con el universo bebé, la humanidad aprendió a crear universos, pero los viejos se apagan: las estrellas se enfrían y solo quedan chispas, las últimas brasas. Por el mapa cruzan olas de frío, frentes de escarcha que congelan todo lo que pisan. Cada ola lleva en el medio un corazón de hielo que brilla: tocalo y la ola se rompe entera, o poné estufas estelares, que le abren un hueco. La meta: el punto omega, juntar todo el calor que queda en un solo lugar.',
    news:'Novedades: chispas, estufas estelares y olas de frío. Un frente de escarcha entra por un borde y cruza el mapa: lo que pisa se congela y no produce, y la gente anda más lenta. Tocá el corazón de hielo del medio para romperlo, y lo congelado para descongelarlo.',
    legacy:'Lo que trae tu ciudad de la era del génesis',
    noLegacy:'No hay una era del génesis terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o una veta y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Cruzan olas de frío: lo que pisan se congela y no produce, y la gente que pisan anda más lenta un rato. Tocá el corazón de hielo para romper la ola y tocá lo congelado para descongelarlo. Las estufas estelares le abren un hueco al frente. En la compu: flechas o WASD.',
    win:'El punto omega',winText:()=>'Terminaste el punto omega en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Todo el calor que quedaba está en un solo punto, y desde ahí puede encenderse un universo nuevo.'}
};
/* ---------- arte de la era ---------- */
const OMEMB=P4('#8a2a10','#c8501e','#f08a24','#ffd35a'),OMHOT=hx('#fff3b0'),OMASH=P4('#1e1c26','#2c2a36','#3e3b4a','#565266'),
  OMWHT=P4('#8a93a3','#c3c9d4','#e8ecf2','#ffffff'),OMRED=P4('#6a2420','#a83a2e','#c8413b'),OMICE=P4('#7aa8d8','#a8cce8','#d4ecf8','#f4fbff'),
  OMPAGE=P4('#c8b890','#e0d4b0','#f2ead2','#fffaf0'),OMSLATE=P4('#2a3040','#3a4256','#4e5a74','#6e7c98');
// Pone a la sombra un rectángulo de lo pintado (el costado derecho de las paredes).
function omShade(a,x,y,w,h,k){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++){const v=a.get(i,j);if(v)a.set(i,j,mulc(v,k));}}
// Veta de chispas: roca oscura rajada, con brasas encendidas adentro y chispas que saltan.
function sparkOreArt(){return mkA(64,52,a=>{blob(a,[[32,34,14],[20,40,9],[45,40,10],[30,23,9]],OMASH,null);
  for(const[x0,y0,x1,y1]of[[20,34,28,42],[28,42,37,35],[37,35,46,41],[27,20,33,30],[33,30,40,28]]){line(a,x0,y0,x1,y1,OMEMB[1],3);line(a,x0,y0,x1,y1,OMEMB[2],2);line(a,x0,y0,x1,y1,OMEMB[3],1);}
  for(const[x,y]of[[33,30],[28,42],[37,35]])ell(a,x,y,2,2,OMHOT);
  for(let x=10;x<56;x++)for(let y=46;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);
  for(const[x,y,c]of[[26,9,OMEMB[3]],[35,4,OMEMB[2]],[41,11,OMEMB[3]],[31,14,OMHOT]]){a.set(x,y,c);a.set(x+1,y,c);a.set(x,y+1,c);a.set(x+1,y+1,c);}});}
// Casa hoguera: casa de piedra con techo de pizarra nevado, chimenea que echa brasas y la luz del fuego en la puerta y la ventana.
function hearthHouseArt(){return mkA(64,64,a=>{stoneWall(a,8,30,48,28);omShade(a,44,30,12,28,0.8);rect(a,6,56,52,3,STONE2[0]);
  rect(a,42,8,8,18,BRICK[2]);rect(a,42,8,2,18,BRICK[3]);rect(a,40,6,12,3,BRICK[1]);
  poly(a,[[2,32],[32,10],[62,32]],(x,y)=>((y>>2)&1)?(x<32?OMSLATE[2]:OMSLATE[1]):(x<32?OMSLATE[3]:OMSLATE[2]));rect(a,4,31,56,2,OMSLATE[0]);
  ell(a,32,46,7,7,(i,j)=>j<0?OMEMB[2]:null);rect(a,25,46,14,12,OMEMB[2]);ell(a,32,50,4,5,(i,j)=>j<2?OMEMB[3]:OMHOT);
  for(const x of[12,44]){rect(a,x,38,8,8,OMEMB[3]);rect(a,x+3,38,2,8,WOOD[1]);rect(a,x,41,8,2,WOOD[1]);}
  snowCap(a,4,30);outlineAll(a,OUTL);for(const[x,y]of[[45,3],[48,0],[43,1]])a.set(x,y,OMEMB[3]);});}
// Faro de la última luz: una torre blanca y roja sobre la roca, con la linterna encendida arriba (el haz que gira va aparte, ERA.deco).
function lastLightArt(){return mkA(64,64,a=>{blob(a,[[32,57,13],[19,59,8],[45,59,8]],OMASH,null);
  poly(a,[[23,56],[27,20],[37,20],[41,56]],(x,y)=>{const b=((y-20)/9|0)%2;return x>34?(b?OMRED[0]:OMWHT[1]):x<28?(b?OMRED[2]:OMWHT[3]):(b?OMRED[1]:OMWHT[2]);});
  rect(a,30,46,4,10,DKW);rect(a,22,17,20,3,IRON[2]);rect(a,22,17,20,1,IRON[3]);for(let x=23;x<42;x+=3)rect(a,x,14,1,3,IRON[1]);
  rect(a,26,6,12,9,OMEMB[3]);rect(a,29,8,6,5,OMHOT);rect(a,26,6,1,9,IRON[1]);rect(a,37,6,1,9,IRON[1]);
  ell(a,32,6,8,5,(i,j)=>j<=0?(i<-2?OMRED[2]:OMRED[1]):null);rect(a,31,0,2,3,IRON[2]);outlineAll(a,OUTL);});}
// Estufa estelar: una estufa de hierro sobre patas, con una estrella chiquita encendida en la panza y el caño arriba.
function starStoveArt(){return mkA(64,64,a=>{for(const x of[17,43])rect(a,x,54,4,8,IRON[0]);rect(a,13,50,38,5,IRON[1]);rect(a,13,50,38,1,IRON[3]);
  ell(a,32,37,18,15,(i,j)=>i>9?IRON[1]:i<-10?IRON[3]:IRON[2]);rect(a,19,21,26,4,IRON[2]);rect(a,19,21,26,1,IRON[3]);rect(a,28,4,8,17,IRON[1]);rect(a,28,4,2,17,IRON[3]);rect(a,26,2,12,3,IRON[2]);
  ell(a,32,38,10,9,GOLD);ell(a,32,38,8,7,(i,j)=>{const d=Math.hypot(i,j*1.15);return d<2.4?OMHOT:d<4.4?OMEMB[3]:(Math.abs(i)<1||Math.abs(j)<1)?OMEMB[3]:d<6.4?OMEMB[2]:OMEMB[0];});
  for(const x of[24,40])rect(a,x,30,1,16,IRON[0]);outlineAll(a,OUTL);});}
// Lonja del calor: un mercado con toldo a rayas, tres arcos y braseros encendidos adentro, y un cartel con una moneda.
function heatMarketArt(){return mkA(64,64,a=>{stoneWall(a,4,28,56,30);omShade(a,46,28,14,30,0.8);
  for(const x of[7,25,43]){rect(a,x,40,14,18,DKW);ell(a,x+7,40,7,6,(i,j)=>j<=0?DKW:null);rect(a,x+3,50,8,6,IRON[1]);rect(a,x+3,50,8,1,IRON[3]);
    poly(a,[[x+3,50],[x+5,44],[x+7,47],[x+9,42],[x+11,50]],OMEMB[2]);poly(a,[[x+5,50],[x+7,46],[x+9,50]],OMEMB[3]);}
  poly(a,[[0,30],[6,16],[58,16],[64,30]],(x,y)=>((x>>2)&1)?(y<23?OMEMB[2]:OMEMB[1]):(y<23?OMPAGE[3]:OMPAGE[2]));rect(a,0,29,64,2,OMEMB[0]);
  rect(a,24,4,16,12,WOOD[2]);rect(a,24,4,16,2,WOOD[3]);ell(a,32,10,4,4,(i,j)=>i+j<-1?hx('#fff0a0'):GOLD);outlineAll(a,OUTL);});}
// Invernadero eterno: una cúpula de vidrio con nieve arriba, plantas adentro y un brasero que la tiene tibia.
function eternalGreenhouseArt(){return mkA(64,64,a=>{rect(a,4,52,56,8,STONE2[2]);rect(a,4,52,56,2,STONE2[3]);rect(a,46,52,14,8,STONE2[1]);
  ell(a,32,52,28,30,(i,j)=>j>0?null:(i>14?hx('#8ab8c8'):(i+j<-20?hx('#d8f0f4'):hx('#b0d8e0'))));
  blob(a,[[16,48,6],[26,44,7],[40,45,7],[50,48,5]],LEAF,null);for(const[x,y]of[[24,40],[42,42],[15,45],[33,47]])ell(a,x,y,1.6,1.6,OMEMB[2]);
  rect(a,29,46,6,6,IRON[1]);ell(a,32,45,2.5,2,OMEMB[3]);
  for(const x of[12,22,32,42,52]){const h=Math.sqrt(Math.max(0,1-((x-32)/28)**2))*30;rect(a,x,52-h,1,h,OMWHT[0]);}ell(a,32,52,20,21,(i,j)=>j<=0&&Math.hypot(i/20,j/21)>0.95?OMWHT[0]:null);
  snowCap(a,3,40);outlineAll(a,OUTL);});}
// Recolector de chispas: un embudo de cobre que atrapa las chispas que flotan (se las ve caer, ERA.deco) y las junta en un frasco.
function sparkCollectorArt(){return mkA(64,64,a=>{rect(a,10,56,44,6,IRON[1]);rect(a,10,56,44,1,IRON[3]);
  rect(a,17,32,30,24,hx('#2a2a3a'));rect(a,17,32,30,2,OMWHT[1]);rect(a,19,34,2,20,hx('#4a4a5e'));
  blob(a,[[24,50,5],[32,48,6],[40,50,5],[29,43,4],[37,43,4]],OMEMB,null);for(const[x,y]of[[28,47],[36,45],[32,41]])a.set(x,y,OMHOT);
  rect(a,28,18,8,14,COPPER[1]);rect(a,28,18,2,14,COPPER[2]);poly(a,[[10,4],[54,4],[37,19],[27,19]],(x,y)=>x>40?COPPER[0]:y<8?COPPER[2]:COPPER[1]);rect(a,10,3,44,2,COPPER[2]);
  outlineAll(a,OUTL);});}
// Crónica del universo: un libro enorme abierto sobre un atril de piedra, con las páginas que brillan y una pluma en el tintero.
function chronicleArt(){return mkA(64,64,a=>{rect(a,18,56,28,6,STONE2[1]);rect(a,18,56,28,1,STONE2[3]);rect(a,25,38,14,18,STONE2[2]);rect(a,35,38,4,18,STONE2[1]);
  poly(a,[[4,40],[6,12],[32,16],[58,12],[60,40],[32,42]],OMRED[0]);poly(a,[[7,37],[9,14],[31,18],[31,39]],(x,y)=>x<12?OMPAGE[1]:OMPAGE[3]);poly(a,[[33,18],[55,14],[57,37],[33,39]],(x,y)=>x>52?OMPAGE[1]:OMPAGE[2]);
  rect(a,31,17,2,23,OMPAGE[0]);for(let k=0;k<6;k++){rect(a,12,20+k*3,16,1,hx('#8a7a5a'));if(k<3)rect(a,36,19+k*3,15,1,hx('#8a7a5a'));}
  for(const[x,y]of[[16,30],[22,24],[44,32],[49,28]])a.set(x,y,OMEMB[3]);
  rect(a,52,44,6,5,DKW);line(a,55,44,61,26,OMPAGE[3],2);line(a,57,40,62,30,OMPAGE[1],1);outlineAll(a,OUTL);});}
// Copo de escarcha: el motor lo dibuja (drawBug) temblando arriba de lo congelado; el segundo cuadro está girado.
function frostFlakeArt(f){return mkA(32,32,a=>{const W=OMICE[3],B=OMICE[1];for(let k=0;k<6;k++){const A=k*Math.PI/3+(f?Math.PI/6:0),c=Math.cos(A),s=Math.sin(A),px=16+c*7.5,py=16+s*7.5;
    line(a,16,16,16+c*13,16+s*13,k%2?B:W,2);for(const d of[-0.8,0.8])line(a,px,py,px+Math.cos(A+d)*4.5,py+Math.sin(A+d)*4.5,W,1);}
  ell(a,16,16,2.5,2.5,W);outlineAll(a,hx('#24406e'));});}
const OMVIL=[{c:'#d0703a',C:'#a0502a',j:'#3a2a20'},{c:'#c8413b',C:'#8a2a26',j:'#2a2a3a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#e8c05a',C:'#b08a30',j:'#5a3a2a',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,true),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:sparkOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:hearthHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),faro:lastLightArt(),estufa:starStoveArt(),lonja:heatMarketArt(),
  invernadero:eternalGreenhouseArt(),recolector:sparkCollectorArt(),cronica:chronicleArt(),bug:[frostFlakeArt(0),frostFlakeArt(1)],
  hero:[personArt({c:'#eef6fc',C:'#a8c8e8',j:'#2a2a3a'},0),personArt({c:'#eef6fc',C:'#a8c8e8',j:'#2a2a3a'},1)],vil:OMVIL.map(p=>[personArt(p,0),personArt(p,1)])};
