// Era del génesis del mundo abierto (la que sigue a la de la conciencia; en la fila de eras, "Génesis"): polvo primordial, barreras de vacío y devoradores del vacío que salen de grietas, comen lo que juntaste y se dividen en dos; el universo bebé. Datos y arte de la era; las reglas están en motor.html y los devoradores en amenazas/devoradores.js.
const ERA={
  n:18,name:'Era del génesis',short:'Génesis',de:'de la era del génesis',obra:'el universo bebé',next:null,
  ore:{id:'primordial',name:'Polvo primordial',col:'#ecc05a',empty:'Remolino de polvo primordial agotado',gather:'polvo primordial',icon:[['..kkkk..','.kdggdk.','kdgddwgk','kgdwGdgk','kgdGwdgk','kgwddgdk','.kdggdk.','..kkkk..'],{d:'#2e2450',g:'#ecc05a',G:'#c8952a',w:'#fff0b0'}]},
  storage:{id:'granero'},ideaBuild:'leyes',ideaTechs:['primordial','leyes'],boostTech:'constantes',farmBuild:'vivero',nightTech:'leyes',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','incubadora','barrera','estrellero','vivero','crisol','leyes'],
  eaters:true,defense:{id:'barrera',r:4,label:'Barreras'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'cazador',building:'Puesto de cazadores',unit:'Cazador',done:'Puesto de cazadores listo: llegó un cazador',desc:'Trae un cazador del vacío que sale solo a cazar devoradores con su arpón de luz, a 8 casilleros o menos.',info:'Puesto de cazadores: su cazador caza devoradores cerca.',tip:'un puesto de cazadores: el cazador sale solo a cazar devoradores.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo17-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era de la conciencia',perks:[
    ['conciencia','ideaMult',1.25,'Conciencia compartida: ideas +25% durante toda la era'],
    ['jardines','agri',1.25,'Jardines de la mente: granjas +25%'],
    ['colmena','speed',1.2,'Mente colmena: te movés 20% más rápido']
  ]},
  techs:[
 {id:'primordial',name:'Polvo primordial',cost:{primordial:15,ideas:30},req:[],desc:'Desbloquea la incubadora de universos, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'barrera',name:'Barreras de vacío',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea la barrera de vacío: deshace a los devoradores que se le acercan.'},
 {id:'inflacion',name:'Inflación cósmica',cost:{primordial:20,ideas:50},req:['primordial'],desc:'Desbloquea la fábrica de estrellas, que da monedas. Se abren 30% más grietas.'},
 {id:'cosecha',name:'Cosecha de galaxias',cost:{madera:40,piedra:20,ideas:65},req:['primordial'],desc:'Desbloquea el vivero de galaxias, que potencia las granjas.'},
 {id:'crisol',name:'Crisol primordial',cost:{madera:60,primordial:20,ideas:95},req:['inflacion'],desc:'Desbloquea el crisol, que hace polvo primordial solo.'},
 {id:'cuarentena',name:'Cuarentena',cost:{monedas:30,ideas:130},req:['barrera','inflacion'],desc:'Los devoradores se dividen la mitad de seguido.'},
 {id:'leyes',name:'Leyes físicas a medida',cost:{monedas:55,ideas:340},req:['cuarentena','crisol'],desc:'Desbloquea el taller de leyes físicas. Ideas +50% y de noche ves más lejos.'},
 {id:'constantes',name:'Constantes afinadas',cost:{primordial:70,monedas:55,ideas:450},req:['inflacion','cuarentena'],desc:'Todo produce +50%.'},
 {id:'genesis',name:'El universo bebé',cost:{piedra:130,primordial:110,monedas:130,ideas:1000},req:['leyes','constantes'],desc:'Un universo recién nacido, con las leyes que elegiste. Cierra la era del génesis.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa semilla',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa semilla lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'primordial',base:{madera:25,piedra:20,primordial:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'primordial',base:{madera:20,primordial:8},grow:1.35,prod:{piedra:0.12}},
 {id:'incubadora',name:'Incubadora de universos',req:'primordial',base:{piedra:40,primordial:10},grow:1.5,done:'Incubadora de universos encendida',desc:'Universos de prueba que crecen en un frasco: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'barrera',name:'Barrera de vacío',req:'barrera',base:{madera:25,piedra:25,primordial:5},grow:1.4,done:'Barrera de vacío encendida',desc:'Deshace a los devoradores que entran a 4 casilleros o menos, y ahí no se abren grietas.'},
 {id:'estrellero',name:'Fábrica de estrellas',req:'inflacion',base:{madera:30,piedra:25,primordial:5},grow:1.4,done:'Fábrica de estrellas encendida',desc:'Hace estrellas por encargo para los universos nuevos: da muchas monedas.',prod:{monedas:0.45}},
 {id:'vivero',name:'Vivero de galaxias',req:'cosecha',base:{madera:35,piedra:30},grow:1.6,done:'Vivero de galaxias plantado',desc:'Cada vivero hace rendir +50% a todas las granjas.'},
 {id:'crisol',name:'Crisol primordial',req:'crisol',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Crisol primordial encendido',desc:'Funde la nada y hace polvo primordial solo.',prod:{primordial:0.12}},
 {id:'leyes',name:'Taller de leyes físicas',req:'leyes',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Taller de leyes físicas abierto',desc:'Se escriben las leyes de cada universo nuevo: ideas +30% por cada taller.'}],
  info:{casa:'Casa semilla: acá viven 2 aldeanos.',herreria:'Nanotaller: los aldeanos juntan más rápido.',incubadora:'Incubadora de universos: genera ideas.',barrera:'Barrera de vacío: deshace a los devoradores a 4 casilleros o menos.',estrellero:'Fábrica de estrellas: da monedas.',vivero:'Vivero de galaxias: potencia las granjas.',crisol:'Crisol primordial: da polvo primordial.',leyes:'Taller de leyes físicas: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['barrera','barrera','una barrera de vacío: deshace a los devoradores que se le acercan.']],
  tips2:[['primordial','incubadora','una incubadora de universos: genera muchísimas ideas.'],['inflacion','estrellero','una fábrica de estrellas para conseguir monedas.'],['cosecha','vivero','un vivero de galaxias: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era del génesis completa.',
  // La barrera tiene un hexágono violeta que gira y late; en la incubadora gira un universo chiquito, y del crisol suben chispas doradas.
  deco:(o,px,py)=>{if(o.bug)return;const off=((px*3+py*5)%16)/16,t=st.time;
    if(o.t==='barrera'){const a=0.35+0.25*Math.sin(t*3+off*6);ctx.strokeStyle='rgba(180,140,255,'+a.toFixed(2)+')';ctx.lineWidth=0.7;ctx.beginPath();
      for(let k=0;k<=6;k++){const an=k*Math.PI/3+t*0.6,x=px+8+Math.cos(an)*6.5,y=py+2.5+Math.sin(an)*2.4;if(k)ctx.lineTo(x,y);else ctx.moveTo(x,y);}ctx.stroke();}
    else if(o.t==='incubadora'){for(let k=0;k<6;k++){const an=t*1.6+k*2.1+off*6,r=0.8+k*0.42;ctx.fillStyle=k%2?'rgba(255,211,90,.85)':'rgba(208,140,255,.85)';ctx.fillRect(px+7.6+Math.cos(an)*r,py+6.6+Math.sin(an)*r*0.6,0.8,0.8);}}
    else if(o.t==='crisol'){for(let k=0;k<3;k++){const ph=(t*0.8+k/3+off)%1;ctx.fillStyle='rgba(255,211,90,'+(1-ph).toFixed(2)+')';ctx.fillRect(px+5+k*3+Math.sin(t*3+k)*0.6,py+5-ph*7,1,1);}}},
  text:{
    when:'Año 1.000.000.000',title:'La era del génesis',
    intro:'Con la conciencia compartida, todas las mentes piensan juntas y la humanidad aprende a crear universos. Pero el vacío entre los universos no está vacío: por grietas salen devoradores, bichos de nada que se comen lo que juntaste y cada tanto se dividen en dos. Tocalos antes de que se multipliquen, o poné barreras de vacío. La meta: el universo bebé.',
    news:'Novedades: polvo primordial, barreras de vacío y devoradores. Por una grieta sale un devorador que se come lo que más tenés (se ve el número). Cada 20 s se divide en dos, hasta ocho: cada toque mata uno, así que tocalo mientras es uno solo.',
    legacy:'Lo que trae tu ciudad de la era de la conciencia',
    noLegacy:'No hay una era de la conciencia terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o un remolino de polvo y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Por grietas del vacío salen devoradores: van a tu granero o a lo que más produce, se comen lo que más tenés y cada tanto se dividen en dos. Cada toque mata uno; si los dejás, al rato se llenan y se vuelven. Cerca de una barrera de vacío se deshacen solos. En la compu: flechas o WASD.',
    win:'El universo bebé',winText:()=>'Terminaste el universo bebé en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Adentro ya hay polvo, estrellas y, algún día, alguien que va a mirar el cielo.'}
};
/* ---------- arte de la era ---------- */
const GENV=P4('#0e0a18','#1c1530','#2e2450','#463a78'),GENG=P4('#8a6418','#c8952a','#ecc05a','#fff0b0'),GENP=P4('#9aa4b8','#bcc6d6','#dde4ee','#f6f9fc'),
  GENS=P4('#5a3a1e','#8a5a2e','#b8843e','#e0b060'),GENR=P4('#2a2438','#3a3250','#4e4468','#6a5e88'),GENSL=P4('#2e3246','#3e4460','#545c7c','#6e789a'),
  GENC=hx('#5fe3d0'),GENVI=hx('#b48cff'),GENVD=hx('#7a5ad0'),GENPK=hx('#ff8ac8'),GENW=hx('#ffffff'),GENGL=hx('#a8d0f0');
// Remolino de polvo primordial: sobre una roca oscura gira una nube de polvo oscuro con dos brazos dorados en espiral y un
// núcleo que brilla.
function primordialOreArt(){return mkA(64,52,a=>{blob(a,[[32,43,11],[20,46,7],[44,46,7]],GENR,null);
  ell(a,32,23,22,11,(i,j)=>{const d=Math.hypot(i/22,j/11);return d>0.86?null:d<0.3?GENG[2]:Math.sin(Math.atan2(j*2,i)*2-d*9)>0.35?GENG[d<0.6?2:1]:GENV[d<0.55?3:2];});
  ell(a,32,23,4,2.5,GENG[3]);for(let x=10;x<56;x++)for(let y=48;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);
  for(const[x,y]of[[32,23],[16,20],[48,26],[25,29],[41,16],[52,21]])a.set(x,y,GENW);});}
// Casa semilla: una semilla gigante parada, con una puerta redonda, dos ventanas y un brote arriba.
function seedHouseArt(){return mkA(64,64,a=>{rect(a,8,56,48,4,SOIL[1]);rect(a,8,56,48,1,SOIL[2]);
  const sh=(x,y)=>x<22?GENS[3]:x<38?GENS[2]:GENS[1];ell(a,32,38,20,19,(i,j)=>sh(32+i));poly(a,[[13,36],[32,8],[51,36]],sh);
  line(a,30,11,22,34,GENS[3],1);line(a,40,20,44,44,GENS[0],1);
  ell(a,32,50,6,7,(i,j)=>j>4?null:j<-2&&Math.abs(i)>3?null:WOOD[1]);rect(a,26,50,12,7,WOOD[1]);rect(a,31,46,2,11,WOOD[0]);ell(a,35,52,1,1,GENG[2]);
  for(const x of[22,42]){ell(a,x,36,4,4,GENS[0]);ell(a,x,36,3,3,(i,j)=>i+j<0?hx('#ffe9a8'):hx('#e8c070'));}
  line(a,32,9,32,2,LEAF[2],2);ell(a,27,3,4.5,2,LEAF[3]);ell(a,37,4,4.5,2,LEAF[2]);outlineAll(a,OUTL);});}
// Incubadora de universos: una esfera de vidrio sobre un pedestal, con un universo chiquito adentro y caños a los costados
// (lo que gira adentro va aparte, ERA.deco).
function incubatorArt(){return mkA(64,64,a=>{rect(a,14,48,36,12,GENP[2]);rect(a,40,48,10,12,GENP[1]);rect(a,12,45,40,4,GENP[3]);rect(a,12,48,40,1,GENP[0]);
  for(const x of[6,55]){rect(a,x,30,4,22,GENP[1]);rect(a,x,30,4,1,GENP[3]);}rect(a,6,30,10,4,GENP[1]);rect(a,48,30,10,4,GENP[1]);
  ell(a,32,27,17,17,(i,j)=>{const d=Math.hypot(i,j)/17;return d>0.9?(i+j<-6?GENW:GENGL):d<0.25?GENV[3]:GENV[1+((Math.atan2(j,i)*2+d*7)%2>1?1:0)];});
  for(let s=0;s<2;s++)for(let k=0;k<9;k++){const th=k*0.55+s*Math.PI,r=2+k*1.3;a.set(32+Math.cos(th)*r,27+Math.sin(th)*r*0.55,k%2?GENG[2]:GENVI);}
  ell(a,32,27,2.5,1.6,GENG[3]);for(const[x,y]of[[22,16],[21,18],[23,15]])a.set(x,y,GENW);
  rect(a,18,52,3,2,GENC);rect(a,24,52,3,2,GENG[2]);rect(a,30,52,3,2,GENPK);outlineAll(a,OUTL);});}
// Barrera de vacío: una columna oscura sobre una base, con tres anillos dorados y un cristal violeta arriba (el hexágono que
// gira va aparte, ERA.deco).
function barrierArt(){return mkA(64,64,a=>{poly(a,[[12,60],[52,60],[56,53],[8,53]],GENP[1]);rect(a,10,50,44,4,GENP[3]);
  rect(a,26,14,12,37,GENV[2]);rect(a,26,14,2,37,GENV[3]);rect(a,35,14,3,37,GENV[1]);
  for(const y of[22,32,42])ell(a,32,y,12,3.2,(i,j)=>Math.hypot(i/12,j/3.2)<0.62?null:j<0?GENG[3]:i>4?GENG[1]:GENG[2]);
  poly(a,[[32,0],[40,9],[32,16],[24,9]],(x,y)=>x<32?(y<9?hx('#d8c0ff'):GENVI):GENVD);line(a,29,5,27,9,GENW,1);outlineAll(a,OUTL);});}
// Fábrica de estrellas: un galpón de chapa con un horno redondo donde nace una estrella, una chimenea que larga chispas y
// estrellitas en la cinta.
function starFactoryArt(){return mkA(64,64,a=>{rect(a,4,26,52,32,GENSL[2]);for(let x=4;x<56;x+=6)rect(a,x,26,1,32,GENSL[1]);rect(a,40,26,16,32,GENSL[1]);
  rect(a,2,22,56,5,GENSL[0]);rect(a,2,22,56,1,GENSL[3]);rect(a,46,4,8,20,GENSL[1]);rect(a,45,2,10,3,GENSL[0]);
  ell(a,24,40,12,12,(i,j)=>{const d=Math.hypot(i,j);return d>10.5?GENG[1]:d>9?GENG[0]:d<3.5?GENW:d<6?GENG[3]:hx('#f0a030');});
  for(const[dx,dy]of[[0,-1],[1,0],[0,1],[-1,0],[0.7,0.7],[-0.7,0.7],[0.7,-0.7],[-0.7,-0.7]])line(a,24+dx*4,40+dy*4,24+dx*(dx&&dy?7:8),40+dy*(dx&&dy?7:8),GENG[3],1);
  rect(a,4,54,52,4,GENV[1]);for(const x of[10,40,50]){rect(a,x,50,5,1,GENG[3]);rect(a,x+2,48,1,5,GENG[3]);a.set(x+2,50,GENW);}
  outlineAll(a,OUTL);for(const[x,y]of[[49,0],[52,1],[47,1]])a.set(x,y,GENG[3]);});}
// Vivero de galaxias: un cantero largo de tierra oscura con tres galaxias que crecen en tallos, cada una de un color, y
// estrellitas alrededor.
function nurseryArt(){return mkA(64,64,a=>{rect(a,4,46,56,12,GENP[2]);rect(a,4,46,56,2,GENP[3]);rect(a,46,48,14,10,GENP[1]);rect(a,4,56,56,2,GENG[1]);
  rect(a,7,44,50,4,GENV[1]);for(let x=9;x<55;x+=5)a.set(x,45,GENV[3]);
  for(const[x,y,c,r]of[[16,24,GENVI,9],[34,16,GENC,10],[50,28,GENPK,7]]){line(a,x,44,x,y+3,LEAF[2],2);ell(a,x-3,y+12,3,1.5,LEAF[3]);
    ell(a,x,y,r,r*0.6,(i,j)=>{const d=Math.hypot(i/r,j/(r*0.6));return d<0.28?GENW:d<0.45?GENG[3]:Math.sin(Math.atan2(j/0.6,i)*2-d*7)>0.1?c:null;});}
  outlineAll(a,OUTL);for(const[x,y]of[[26,6],[44,8],[8,14],[58,18],[24,34]])a.set(x,y,GENW);});}
// Crisol primordial: una olla de hierro sobre patas y un fuego, llena de polvo dorado que da vueltas (las chispas van aparte).
function crucibleArt(){return mkA(64,64,a=>{for(const[x0,x1]of[[18,12],[46,52]])line(a,x0,46,x1,60,GENSL[1],3);
  poly(a,[[20,60],[26,48],[30,56],[34,46],[38,56],[44,60]],FIRE[1]);poly(a,[[26,60],[30,52],[34,60]],FIRE[2]);
  ell(a,32,36,21,15,(i,j)=>j<-4?null:i<-9?GENSL[3]:i>9?GENSL[1]:GENSL[2]);rect(a,10,30,44,3,GENSL[3]);rect(a,10,33,44,1,GENSL[0]);
  ell(a,32,30,19,4.5,(i,j)=>{const an=Math.atan2(j,i/4)*2+Math.hypot(i/19,j/4.5)*5;return Math.sin(an)>0?GENG[2]:GENG[1];});ell(a,32,30,4,1.5,GENG[3]);
  for(const x of[8,56])rect(a,x-2,30,4,4,GENSL[1]);outlineAll(a,OUTL);for(const[x,y]of[[26,24],[36,22],[31,19],[40,25]])a.set(x,y,GENG[3]);});}
// Taller de leyes físicas: una casa con un pizarrón lleno de fórmulas, un engranaje y una órbita en el techo.
function lawsArt(){return mkA(64,64,a=>{rect(a,4,26,56,32,GENP[2]);rect(a,46,26,14,32,GENP[1]);gable(a,2,62,12,26,P4('#1c1530','#2e2450','#463a78','#5e4e98'));
  rect(a,8,31,32,21,WOOD[2]);rect(a,10,33,28,17,hx('#1f3a30'));const CK=hx('#e8f0e8');
  rect(a,12,36,3,1,CK);rect(a,16,35,1,3,CK);rect(a,15,36,3,1,CK);rect(a,20,36,4,1,CK);rect(a,20,38,4,1,CK);rect(a,26,35,2,3,CK);rect(a,29,34,1,1,CK);
  rect(a,12,42,6,1,CK);line(a,19,44,22,40,CK,1);rect(a,24,42,8,1,CK);rect(a,27,45,2,1,CK);rect(a,12,46,10,1,CK);ell(a,34,46,2,2,(i,j)=>Math.hypot(i,j)>1.2?CK:null);
  ell(a,51,42,7,7,(i,j)=>{const d=Math.hypot(i,j);return d<2?GENSL[0]:d<5.5?GENG[1]:(Math.atan2(j,i)*8/Math.PI+8|0)%2?GENG[2]:null;});
  rect(a,31,4,2,10,GENSL[1]);ell(a,32,5,8,2.5,(i,j)=>Math.hypot(i/8,j/2.5)>0.7?GENG[2]:null);ell(a,32,5,2,2,GENC);a.set(39,5,GENVI);outlineAll(a,OUTL);});}
const GENVIL=[{c:'#ecc05a',C:'#c8952a',j:'#2e2450',y:'#3a2418'},{c:'#b48cff',C:'#7a5ad0',j:'#2a2a3a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#7fd8c0',C:'#4aa890',j:'#5a3a1e',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:primordialOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:seedHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),incubadora:incubatorArt(),barrera:barrierArt(),estrellero:starFactoryArt(),
  vivero:nurseryArt(),crisol:crucibleArt(),leyes:lawsArt(),
  hero:[personArt({c:'#e8e0ff',C:'#b4a8e0',j:'#2e2450'},0),personArt({c:'#e8e0ff',C:'#b4a8e0',j:'#2e2450'},1)],vil:GENVIL.map(p=>[personArt(p,0),personArt(p,1)])};
