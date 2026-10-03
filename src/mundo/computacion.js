// Computación del mundo abierto: silicio, computadoras y los bichos; el microprocesador. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:7,name:'Computación',de:'de la Computación',next:{file:'mundo8.html',to:'a Internet'},
  ore:{id:'silicio',name:'Silicio',col:'#d8ccf0',empty:'Veta de cuarzo agotada',gather:'silicio',icon:[['........','...k....','..kvk.k.','..kqkkvk','.kqqkqk.','.kqQkQk.','..kkkk..','........'],{q:'#c8b8e8',Q:'#8a7ab8',v:'#ffffff'}]},
  storage:{id:'granero',name:'Granero'},ideaBuild:'universidad',ideaTechs:['lenguajes','satelite','universidades'],boostTech:'circuito',farmBuild:'galpon',nightTech:'satelite',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','usina','represa'],
  grid:'power',bugs:true,
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo6-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la Electricidad',perks:[
    ['tabuladora','ideaMult',1.25,'Tabuladora eléctrica: ideas +25% durante toda la era'],
    ['frio','agri',1.25,'Refrigeración: granjas +25%']
  ]},
  techs:[
 {id:'eniac',name:'Computadora electrónica',cost:{silicio:15,ideas:30},req:[],desc:'Desbloquea la computadora, el taller y la cantera. A las máquinas les salen bichos.'},
 {id:'tractor',name:'Tractores',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el galpón de tractores, que potencia las granjas.'},
 {id:'transistor',name:'Transistor',cost:{silicio:20,ideas:50},req:['eniac'],desc:'Desbloquea la oficina, que da monedas. Las máquinas fallan 40% menos.'},
 {id:'lenguajes',name:'Lenguajes de programación',cost:{madera:40,piedra:20,ideas:65},req:['eniac'],desc:'Programar se vuelve más fácil: ideas +50%.'},
 {id:'satelite',name:'Satélites',cost:{madera:60,silicio:20,ideas:95},req:['transistor'],desc:'Mirás desde el cielo: ideas +50% y de noche ves más lejos.'},
 {id:'universidades',name:'Carreras de computación',cost:{monedas:30,ideas:130},req:['lenguajes','transistor'],desc:'Desbloquea la universidad. Ideas +50%.'},
 {id:'depuracion',name:'Depuración',cost:{monedas:45,ideas:270},req:['satelite','universidades'],desc:'Programas probados: las máquinas fallan 40% menos y los bichos tardan el doble en contagiarse.'},
 {id:'circuito',name:'Circuito integrado',cost:{silicio:60,monedas:45,ideas:320},req:['transistor','universidades'],desc:'Muchos transistores en un chip: todos los edificios producen +50%.'},
 {id:'micro',name:'Microprocesador',cost:{piedra:110,silicio:90,monedas:100,ideas:650},req:['depuracion','circuito'],desc:'Toda una computadora en un chip. Cierra la Computación.'}],
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',name:'Granja',req:null,base:{madera:12,comida:4},grow:1.25,done:'Granja lista',desc:'Produce comida sola.',prod:{comida:0.2},noSand:true},
 {id:'fogata',name:'Fogata',req:null,base:{madera:5,piedra:4},grow:1.6,done:'Fogata encendida',desc:'Genera ideas y alumbra de noche. Comer cerca rinde el doble.',prod:{ideas:0.12}},
 {id:'aserradero',name:'Aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,done:'Aserradero listo',desc:'Produce madera solo.',prod:{madera:0.12}},
 {id:'granero',name:'Granero',req:null,base:{madera:25,piedra:15},grow:1.4,done:'Granero construido',desc:'+150 de capacidad para cada recurso. Las ideas no tienen límite.'},
 {id:'parque',name:'Parque',req:null,base:{madera:15,piedra:10},grow:1.3,done:'Parque plantado: el aire se limpia',desc:'Árboles que limpian el humo de las usinas.'},
 {id:'usina',name:'Usina',req:null,base:{madera:30,piedra:30,silicio:10},grow:1.5,done:'Usina encendida',desc:'Da luz a 6 edificios con ⚡. Echa humo.',power:6,node:true,smoke:0.06,smk:[[2.75,0],[5.75,0]],puffs:4},
 {id:'poste',name:'Poste',req:null,base:{madera:6,silicio:3},grow:1.06,done:'Poste instalado',desc:'Estira la red: se conecta con otro poste o una usina a 4 casilleros, y da luz a lo que esté a 3.',node:true},
 {id:'represa',name:'Represa',req:null,base:{piedra:50,silicio:25},grow:1.5,done:'Represa funcionando',desc:'Va pegada al agua. Da luz a 6 edificios con ⚡ sin echar humo.',power:6,node:true,water:'La represa tiene que ir pegada al agua.'},
 {id:'herreria',name:'Taller',req:'eniac',base:{madera:25,piedra:20,silicio:10},grow:1.6,done:'Taller listo',desc:'Herramientas eléctricas: vos y los aldeanos juntan +30% por cada taller.'},
 {id:'cantera',name:'Cantera',req:'eniac',base:{madera:20,silicio:8},grow:1.35,done:'Cantera lista',desc:'Produce piedra sola.',prod:{piedra:0.12}},
 {id:'computadora',name:'Computadora',req:'eniac',base:{piedra:40,silicio:10},grow:1.5,done:'Computadora encendida',desc:'Ocupa una sala entera y genera muchas ideas. Le salen bichos: tocala para aplastarlos.',prod:{ideas:0.45},elec:true,bug:true},
 {id:'oficina',name:'Oficina',req:'transistor',base:{madera:30,piedra:25,silicio:5},grow:1.4,done:'Oficina abierta',desc:'Empleados con computadoras: da muchas monedas. Le salen bichos.',prod:{monedas:0.35},elec:true,bug:true},
 {id:'galpon',name:'Galpón de tractores',req:'tractor',base:{madera:35,piedra:30},grow:1.6,done:'Galpón listo',desc:'Cada galpón hace rendir +50% a todas las granjas.'},
 {id:'universidad',name:'Universidad',req:'universidades',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Universidad abierta',desc:'Ideas +30% por cada universidad.',elec:true}],
  info:{casa:'Casa: acá viven 2 aldeanos.',granja:'Granja: produce comida.',fogata:'Fogata: genera ideas. Comer cerca rinde el doble.',aserradero:'Aserradero: produce madera.',granero:'Granero: más capacidad.',parque:'Parque: limpia el humo.',usina:'Usina: da luz a 6 edificios. Echa humo.',poste:'Poste: estira la red.',represa:'Represa: da luz a 6 edificios sin humo.',herreria:'Taller: juntás más rápido.',cantera:'Cantera: produce piedra.',computadora:'Computadora: genera ideas.',oficina:'Oficina: da monedas.',galpon:'Galpón: potencia las granjas.',universidad:'Universidad: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['eniac',['usina','represa'],'una usina o una represa: dan luz a las máquinas con ⚡.'],gridTip],
  tips2:[['eniac','computadora','una computadora con luz: genera muchas ideas.'],['transistor','oficina','una oficina con luz para conseguir monedas.'],['tractor','galpon','un galpón de tractores: potencia las granjas.']],
  smogTip:'Más parques, o represas en vez de usinas.',done:'Computación completa.',
  deco:(o,px,py,lit)=>{if(o.t==='computadora'&&lit&&!o.bug)blink(px,py);},
  text:{
    when:'1945 d.C.',title:'La Computación',
    intro:'Las primeras computadoras ocupan salas enteras y calculan rapidísimo, pero se traban: les salen bichos. Tocalos para aplastarlos antes de que se contagien. La meta: el microprocesador, toda una computadora en un chip.',
    news:'Novedades: silicio, computadoras, oficinas y bichos. Una máquina con bicho no produce; si no lo aplastás, se contagia a las vecinas. Usinas, represas y postes ya los sabés construir.',
    legacy:'Lo que trae tu ciudad de la Electricidad',
    noLegacy:'No hay una Electricidad terminada en este navegador: arrancás con 2 aldeanos. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del granero, lo que sobra se pierde. A las computadoras y oficinas les salen bichos: tocalas para aplastarlos antes de que se contagien. Los edificios con ⚡ necesitan luz: tienen que quedar cerca de una usina, una represa o un poste conectado. Las usinas echan humo: con mucho humo juntás y cosechás menos, y los parques lo limpian. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'Computación superada',winText:()=>'Terminaste el microprocesador en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Una computadora ya entra en la palma de la mano.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan a la era de Internet.'}
};

/* ---------- arte de la era ---------- */
// Veta de silicio: roca con cristales de cuarzo.
function quartzOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],ROCK,null);
  const QZ=P4('#8a7ab8','#b8a8e0','#ddd4f4','#ffffff');
  const prism=(x,y,h,lean)=>{for(let j=0;j<h;j++){const xx=x+Math.round(lean*j/h);for(let i=0;i<4;i++)a.set(xx+i,y-j,i===0?QZ[3]:i===3?QZ[0]:QZ[2]);}const tx=x+Math.round(lean);poly(a,[[tx,y-h],[tx+4,y-h],[tx+2,y-h-3]],QZ[3]);};
  prism(16,40,7,-2);prism(22,34,10,-2);prism(27,36,14,0);prism(33,35,11,2);prism(40,40,8,3);
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Centro de cómputos: edificio de hormigón con un ventanal y adentro gabinetes con cintas y lucecitas.
function computerArt(){return mkA(64,64,a=>{const CO=P4('#8a8f98','#a8adb6','#c8ccd2','#e2e4e8');
  rect(a,10,13,1,2,IRON[0]);rect(a,35,13,1,2,IRON[0]);rect(a,8,4,30,9,DKW);for(let i=0;i<6;i++)rect(a,11+i*4,7,2,3,i%2?hx('#93d36c'):hx('#5fe3d0'));
  rect(a,2,18,60,42,CO[2]);rect(a,48,18,14,42,CO[1]);rect(a,0,14,64,4,CO[3]);rect(a,0,18,64,1,CO[0]);
  rect(a,6,24,44,30,hx('#1e2430'));
  for(const x of[9,23,37]){rect(a,x,27,11,25,CO[2]);rect(a,x,27,11,1,hx('#ffffff'));
    for(const y of[31,39])for(const dx of[3,8]){ell(a,x+dx,y,2.5,2.5,IRON[1]);ell(a,x+dx,y,1,1,CO[2]);}
    for(let k=0;k<4;k++)a.set(x+2+k*2,46,[RED,YEL,hx('#93d36c'),hx('#5fa8c8')][k]);rect(a,x+1,48,9,3,IRON[2]);}
  for(let x=6;x<=50;x+=11)rect(a,x,24,1,30,IRON[2]);rect(a,52,40,8,20,hx('#3a4250'));
  outlineAll(a,OUTL);});}
// Oficina: torre de vidrio y acero.
function officeArt(){return mkA(64,64,a=>{const CO=P4('#5a6270','#7a828e','#9aa2ae','#c2c8d0');
  rect(a,12,4,40,56,CO[2]);rect(a,42,4,10,56,CO[1]);rect(a,10,2,44,3,CO[3]);
  for(let y=8;y<46;y+=7)for(let x=14;x<50;x+=6){rect(a,x,y,5,5,x>40?GLASS[0]:GLASS[1]);a.set(x,y,GLASS[3]);}
  rect(a,26,50,12,10,GLASS[0]);rect(a,31,50,1,10,IRON[1]);rect(a,24,49,16,1,CO[3]);rect(a,8,58,48,2,STONE2[2]);
  outlineAll(a,OUTL);});}
// Galpón de chapa con techo curvo y un tractor rojo adelante.
function tractorShedArt(){return mkA(64,64,a=>{const ZN=P4('#6a7078','#8a9098','#aab0b8','#cad0d6');
  ell(a,32,40,28,22,(i,j)=>j<=0?ZN[((i+40)&3)<2?2:1]:null);rect(a,4,40,56,20,ZN[2]);for(let x=4;x<60;x+=4)rect(a,x,40,1,20,ZN[1]);rect(a,18,34,28,26,hx('#2a2a32'));
  rect(a,22,44,16,8,RED);rect(a,30,37,8,9,RED);rect(a,31,38,6,4,GLASS[2]);rect(a,24,38,2,6,IRON[0]);
  ell(a,34,53,6,6,IRON[0]);ell(a,34,53,2.5,2.5,YEL);ell(a,23,55,3.5,3.5,IRON[0]);ell(a,23,55,1.3,1.3,YEL);
  outlineAll(a,OUTL);});}
// Universidad moderna: hormigón sobre pilotes, ventanas verticales y una antena parabólica.
function univModernArt(){return mkA(64,64,a=>{const CN=P4('#7a7670','#9a968e','#b8b4aa','#d4d0c6');
  rect(a,44,10,2,8,IRON[1]);ell(a,46,8,7,3,hx('#e2e4e8'));ell(a,46,7,5,1.5,hx('#c8ccd2'));line(a,46,8,50,2,IRON[1],1);
  rect(a,10,10,24,6,DKW);for(let i=0;i<5;i++)rect(a,12+i*4,12,2,2,hx('#f6f1e4'));
  rect(a,4,22,56,26,CN[2]);rect(a,46,22,14,26,CN[1]);rect(a,2,18,60,4,CN[3]);for(let x=7;x<56;x+=7)rect(a,x,26,4,18,GLASS[1]);
  rect(a,4,48,56,12,hx('#2a3040'));for(const x of[6,20,34,48])rect(a,x,48,4,12,CN[2]);rect(a,24,50,10,10,GLASS[0]);
  outlineAll(a,OUTL);});}
// Bicho (polilla) que se mete en las máquinas; dos cuadros de aleteo.
function bugArt(f){return mkA(32,32,a=>{const WG=P4('#5a4632','#7a6448','#a08868','#c8b490'),BD=hx('#3a2a1e'),sp=f?10:7;
  for(const s of[-1,1]){ell(a,16+s*sp*0.6,13,sp*0.75,6,(i,j)=>WG[j<-2?3:j<2?2:1]);ell(a,16+s*sp*0.5,20,sp*0.5,4,WG[1]);ell(a,16+s*sp*0.6,13,1.5,1.5,BD);}
  rect(a,15,8,3,16,BD);ell(a,16.5,8,2,2,BD);line(a,16,7,12,2,BD,1);line(a,17,7,21,2,BD,1);
  outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#c8902e',C:'#9a6c20',j:'#4a3a2a',y:'#3a2418'},{c:'#3a6a8a',C:'#284e68',j:'#e3ddcc',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#8a3a5a',C:'#662a42',j:'#e3ddcc',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:quartzOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:[fireArt(0),fireArt(1)],
  casa:modernHouseArt(),granja:granjaArt(),aserradero:sawmillArt(),granero:barnArt(),herreria:forgeArt(),cantera:quarryArt(),parque:parkArt(),usina:powerPlantArt(),poste:poleArt(),represa:damArt(),computadora:computerArt(),oficina:officeArt(),galpon:tractorShedArt(),universidad:univModernArt(),bug:[bugArt(0),bugArt(1)],
  hero:[personArt({c:'#5a4a8a',C:'#40346a',j:'#e3ddcc'},0),personArt({c:'#5a4a8a',C:'#40346a',j:'#e3ddcc'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
// Lucecitas de los gabinetes que titilan mientras la computadora anda.
function blink(px,py){const t=Math.floor(performance.now()/180);ctx.fillStyle='#1b1a24';for(const c of[9,23,37])for(let k=0;k<4;k++)if(hash(c+k,t,7)<0.45)ctx.fillRect(px+(c+2+k*2)/ART,py+46/ART,1/ART,1/ART);}
