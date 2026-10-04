// Internet del mundo abierto: litio, servidor, antenas, ciudades, virus y soporte técnico; el teléfono inteligente. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:8,name:'Internet',de:'de Internet',next:{file:'mundo9.html',to:'a la IA'},
  ore:{id:'litio',name:'Litio',col:'#b8f0a0',empty:'Veta de litio agotada',gather:'litio',icon:[['...kk...','..kkkk..','..kvqk..','..kqqk..','..kqqk..','..kQQk..','..kkkk..','........'],{q:'#9ae07a',Q:'#5aa347',v:'#e8ffe0'}]},
  storage:{id:'granero'},ideaBuild:'buscador',ideaTechs:['www','email','buscadores'],boostTech:'banda',farmBuild:'semillas',nightTech:'banda',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','servidor','cibercafe','tienda','buscador','semillas','soporte'],
  landmarks:[[0,-20,'ciudad'],[20,0,'ciudad'],[0,18,'ciudad'],[-20,0,'ciudad']],
  grid:'data',cities:true,
  // Los virus van a una compu al azar (con su nombre para los avisos); el soporte técnico cuida las que están a 4 casilleros
  // (reglas en motor.html).
  infect:{servidor:'el servidor',cibercafe:'un cibercafé',tienda:'una tienda online',buscador:'un buscador'},defense:{id:'soporte',r:4,label:'Soporte',of:['servidor','cibercafe','tienda','buscador']},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo7-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la Computación',perks:[
    ['micro','ideaMult',1.25,'Microprocesador: ideas +25% durante toda la era'],
    ['tractor','agri',1.25,'Tractores: granjas +25%']
  ]},
  techs:[
 {id:'www',name:'World Wide Web',cost:{litio:15,ideas:30},req:[],desc:'Desbloquea el cibercafé, el soporte técnico, el taller y la cantera mecanizada. Ideas +50%.'},
 {id:'biotec',name:'Biotecnología',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el laboratorio de semillas, que potencia las granjas.'},
 {id:'comercio',name:'Comercio electrónico',cost:{litio:20,ideas:50},req:['www'],desc:'Desbloquea la tienda online, que da monedas.'},
 {id:'email',name:'Correo electrónico',cost:{madera:40,piedra:20,ideas:65},req:['www'],desc:'Las ideas viajan al instante: ideas +50%.'},
 {id:'firewall',name:'Cortafuegos',cost:{madera:60,litio:20,ideas:95},req:['comercio'],desc:'Los virus viajan 40% más lento por la red.'},
 {id:'buscadores',name:'Buscadores',cost:{monedas:30,ideas:130},req:['email','comercio'],desc:'Desbloquea el buscador. Ideas +50%.'},
 {id:'antivirus',name:'Antivirus',cost:{monedas:45,ideas:270},req:['firewall','buscadores'],desc:'Cada antena frena uno de cada 4 virus que pasan por ella.'},
 {id:'banda',name:'Banda ancha',cost:{litio:60,monedas:45,ideas:320},req:['comercio','buscadores'],desc:'Todo produce +50%, también lo que dan las ciudades. De noche ves más lejos.'},
 {id:'smartphone',name:'Teléfono inteligente',cost:{piedra:110,litio:90,monedas:100,ideas:650},req:['antivirus','banda'],desc:'Internet en el bolsillo de todos. Cierra la era de Internet.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'servidor',name:'Servidor',req:null,base:{piedra:30,litio:10},grow:1.8,done:'Servidor encendido',desc:'El centro de tu red: las antenas se enganchan desde acá. Si le entra un virus, se corta la red: tocalo para limpiarlo.',power:1,node:true},
 {id:'antena',name:'Antena',req:null,base:{madera:8,litio:3},grow:1.06,done:'Antena instalada',desc:'Estira la red 5 casilleros. Llevala hasta las ciudades lejanas: cada una conectada da monedas e ideas.',node:true},
 {id:'soporte',name:'Soporte técnico',req:'www',base:{madera:15,piedra:15,litio:6},grow:1.4,done:'Soporte técnico atendiendo',desc:'Técnicos que cuidan las compus a 4 casilleros: los virus que llegan rebotan y lo infectado se limpia solo en 15 s.'},
 {id:'herreria',name:'Taller',req:'www',base:{madera:25,piedra:20,litio:10},grow:1.6,done:'Taller listo',desc:'Herramientas eléctricas: los aldeanos juntan +30% por cada taller.'},
 {id:'cantera',req:'www',base:{madera:20,litio:8},grow:1.35,prod:{piedra:0.12}},
 {id:'cibercafe',name:'Cibercafé',req:'www',base:{piedra:40,litio:10},grow:1.5,done:'Cibercafé abierto',desc:'Gente navegando: genera muchas ideas.',prod:{ideas:0.45}},
 {id:'tienda',name:'Tienda online',req:'comercio',base:{madera:30,piedra:25,litio:5},grow:1.4,done:'Tienda abierta',desc:'Vende por Internet: da muchas monedas.',prod:{monedas:0.35}},
 {id:'semillas',name:'Laboratorio de semillas',req:'biotec',base:{madera:35,piedra:30},grow:1.6,done:'Laboratorio de semillas listo',desc:'Cada laboratorio de semillas hace rendir +50% a todas las granjas.'},
 {id:'buscador',name:'Buscador',req:'buscadores',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Buscador en línea',desc:'Ideas +30% por cada buscador.'}],
  info:{casa:'Casa: acá viven 2 aldeanos.',servidor:'Servidor: el centro de tu red.',antena:'Antena: estira la red.',soporte:'Soporte técnico: cuida las compus cercanas de los virus.',herreria:'Taller: los aldeanos juntan más rápido.',cibercafe:'Cibercafé: genera ideas.',tienda:'Tienda online: da monedas.',semillas:'Laboratorio de semillas: potencia las granjas.',buscador:'Buscador: más ideas.',ciudad:'Ciudad lejana: llevá la red con antenas para comerciar.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['www','servidor','un servidor: es el centro de tu red.'],()=>counts.servidor&&!grid().linked.length?['Conectá','una ciudad lejana: poné antenas desde el servidor.']:null,['www','soporte','un soporte técnico cerca de tus compus: frena los virus.']],
  tips2:[['www','cibercafe','un cibercafé: genera muchas ideas.'],['comercio','tienda','una tienda online para conseguir monedas.'],['biotec','semillas','un laboratorio de semillas: potencia las granjas.']],
  smogTip:'Más parques, o represas en vez de usinas.',done:'Era de Internet completa.',
  deco:(o,px,py)=>{if(o.t==='servidor'&&!o.bug)blink(px,py);},
  text:{
    when:'1991 d.C.',title:'Internet',
    intro:'Las computadoras se conectan entre sí. Llevá la red con antenas hasta las ciudades lejanas para comerciar con ellas, pero por los mismos cables llegan virus que se meten en tus compus y borran ideas: tocalos en el camino, o poné soporte técnico cerca de las compus. La meta: el teléfono inteligente, Internet en el bolsillo.',
    news:'Novedades: litio, servidor, antenas, ciudades para conectar y virus que viajan por la red hasta tus compus; el soporte técnico las cuida. Ya hay luz en todos lados y no hay humo.',
    legacy:'Lo que trae tu ciudad de la Computación',
    noLegacy:'No hay una Computación terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o una veta y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del centro logístico, lo que sobra se pierde. Llevá la red con antenas desde tu servidor hasta las ciudades lejanas: cada una conectada da monedas e ideas. Por la red llegan virus que van al servidor, al cibercafé, a la tienda o al buscador: tocalos en el camino. Si uno entra, borra ideas y ese edificio no produce (y si es el servidor, se corta la red) hasta que lo tocás o hasta que los técnicos lo limpian en un minuto y medio. El soporte técnico cuida las compus a 4 casilleros. En la compu: flechas o WASD.',
    win:'Era de Internet superada',winText:()=>'Terminaste el teléfono inteligente en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Ahora todos llevan Internet en el bolsillo.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan a la era de la IA.'}
};

/* ---------- arte de la era ---------- */
// Veta de litio: roca con cristales rosados.
function lithiumOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],ROCK,null);
  const LI=P4('#b07a9a','#d8a8c4','#f0d4e4','#ffffff');
  const prism=(x,y,h,lean)=>{for(let j=0;j<h;j++){const xx=x+Math.round(lean*j/h);for(let i=0;i<4;i++)a.set(xx+i,y-j,i===0?LI[3]:i===3?LI[0]:LI[2]);}const tx=x+Math.round(lean);poly(a,[[tx,y-h],[tx+4,y-h],[tx+2,y-h-3]],LI[3]);};
  prism(18,38,8,-2);prism(25,36,13,-1);prism(31,37,10,1);prism(38,40,9,3);
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Servidor: edificio oscuro con racks llenos de lucecitas, aire acondicionado y una antenita.
function serverArt(){return mkA(64,64,a=>{const DG=P4('#2a2e38','#3a404c','#4e5664','#6a7280');
  rect(a,10,4,12,8,hx('#b8bcc4'));for(let x=11;x<21;x+=2)rect(a,x,5,1,6,hx('#8a8f9c'));rect(a,44,2,2,10,IRON[1]);ell(a,45,2,2,2,RED);
  rect(a,4,16,56,44,DG[2]);rect(a,46,16,14,44,DG[1]);rect(a,2,12,60,4,DG[3]);
  for(const x of[8,20,32]){rect(a,x,22,10,34,DG[0]);for(let y=24;y<54;y+=3){rect(a,x+1,y,8,2,DG[1]);a.set(x+2,y,(x+y)%3?hx('#5fe3d0'):hx('#93d36c'));a.set(x+4,y,hx('#5fe3d0'));}}
  rect(a,48,40,8,20,DG[0]);outlineAll(a,OUTL);});}
// Antena: torre reticulada con paneles y una luz roja arriba.
function towerArt(){return mkA(64,64,a=>{const wd=y=>Math.round(2+(y-6)*0.16);
  for(let y=6;y<62;y++){rect(a,32-wd(y),y,1,1,IRON[1]);rect(a,32+wd(y),y,1,1,IRON[1]);if(y%6===0)line(a,32-wd(y),y,32+wd(y),y,IRON[2],1);}
  for(let y=12;y<60;y+=6){line(a,32-wd(y),y,32+wd(y+6),y+6,IRON[2],1);line(a,32+wd(y),y,32-wd(y+6),y+6,IRON[2],1);}
  for(const[x,y]of[[26,10],[37,10],[27,18],[36,18]])rect(a,x,y,2,6,hx('#d8d0bc'));
  rect(a,31,2,2,6,IRON[1]);ell(a,32,2,1.4,1.4,RED);rect(a,22,60,21,2,STONE2[2]);
  outlineAll(a,OUTL);});}
// Cibercafé: frente violeta, cartel con una arroba y monitores en la vidriera.
function cybercafeArt(){return mkA(64,64,a=>{const WL=P4('#6a4a7a','#8a5a9a','#a87ab8','#c8a0d4'),CY=hx('#5fe3d0');
  rect(a,12,4,40,13,DKW);ell(a,32,10.5,5,5,CY);ell(a,32,10.5,3.5,3.5,DKW);ell(a,32.5,10.5,1.6,1.6,CY);rect(a,35,10,2,4,CY);rect(a,20,17,1,2,IRON[0]);rect(a,43,17,1,2,IRON[0]);
  rect(a,4,22,56,38,WL[2]);rect(a,46,22,14,38,WL[1]);rect(a,2,18,60,4,WL[3]);
  rect(a,8,28,30,22,hx('#1e2430'));for(const x of[11,23]){rect(a,x,34,8,6,hx('#9ad8f0'));rect(a,x+3,40,2,2,IRON[1]);rect(a,x-1,42,10,2,WOOD[2]);}
  rect(a,8,50,30,2,WL[0]);rect(a,42,36,12,24,hx('#3a2a42'));rect(a,44,38,8,10,GLASS[1]);
  outlineAll(a,OUTL);});}
// Tienda online: depósito con persiana, cajas y un cartel con un carrito.
function shopArt(){return mkA(64,64,a=>{const WH=P4('#8a7a5a','#a8987a','#c8b898','#e0d4b8'),W2=hx('#f6f1e4');
  poly(a,[[0,24],[32,12],[64,24]],(x,y)=>((y>>1)&1)?SLATE[2]:SLATE[3]);rect(a,2,24,60,36,WH[2]);rect(a,46,24,16,36,WH[1]);
  rect(a,8,36,22,24,IRON[2]);for(let y=37;y<60;y+=2)rect(a,8,y,22,1,IRON[1]);
  const box=(x,y,w,h)=>{rect(a,x,y,w,h,hx('#c8904a'));rect(a,x,y,w,1,hx('#e0b070'));rect(a,x+(w>>1),y,1,h,hx('#a87038'));};box(34,50,10,10);box(45,52,8,8);box(38,42,9,8);
  rect(a,34,27,22,11,DKW);rect(a,37,29,3,1,W2);rect(a,40,30,10,4,W2);rect(a,41,31,8,2,DKW);a.set(42,35,W2);a.set(48,35,W2);
  outlineAll(a,OUTL);});}
// Laboratorio de semillas: invernadero con plantines y un cartel con un tubo de ensayo.
function seedLabArt(){return mkA(64,64,a=>{const W2=hx('#f6f1e4');rect(a,26,4,12,9,DKW);rect(a,31,5,2,6,hx('#93d36c'));ell(a,32,11,1.5,1,hx('#93d36c'));rect(a,31,13,2,2,IRON[0]);
  poly(a,[[4,30],[32,15],[60,30]],(x,y)=>(x%6===4)?W2:GLASS[2]);rect(a,4,30,56,28,GLASS[1]);for(let x=4;x<60;x+=6)rect(a,x,30,1,28,W2);rect(a,4,44,56,1,W2);
  for(let x=7;x<58;x+=4){const h=4+((x*7)%5);rect(a,x,56-h,1,h,BLADE[1]);ell(a,x,56-h,1.6,1.4,LEAF[2+(x&1)]);}
  rect(a,4,56,56,4,SOIL[1]);outlineAll(a,OUTL);});}
// Buscador: edificio blanco con ventanas y una lupa gigante en el techo.
function searchArt(){return mkA(64,64,a=>{const WB=P4('#c8ccd4','#dfe2e8','#eef0f4','#ffffff'),BL=hx('#4a78b8');
  for(let j=-9;j<=9;j++)for(let i=-9;i<=9;i++){const d=Math.hypot(i,j);if(d<=8.5&&d>=6)a.set(30+i,11+j,BL);else if(d<6)a.set(30+i,11+j,i+j<-3?hx('#e8f4ff'):hx('#b8d4f0'));}
  line(a,36,17,43,23,BL,3);
  rect(a,6,26,52,34,WB[2]);rect(a,46,26,12,34,WB[1]);rect(a,4,22,56,4,WB[3]);
  for(let y=30;y<50;y+=6)for(let x=10;x<44;x+=7)rect(a,x,y,5,4,GLASS[1]);rect(a,26,50,12,10,GLASS[0]);
  outlineAll(a,OUTL);});}
// Ciudad lejana: torres con ventanas prendidas.
function cityArt(){return mkA(64,64,a=>{const tower=(x,w,top,c)=>{rect(a,x,top,w,60-top,c[2]);rect(a,x+w-3,top,3,60-top,c[1]);for(let y=top+3;y<57;y+=4)for(let i=x+2;i<x+w-3;i+=3)a.set(i,y,hash(i,y,5)<0.6?hx('#ffe98a'):c[0]);};
  rect(a,24,2,2,6,IRON[1]);ell(a,25,2,1.4,1.4,RED);
  tower(6,12,24,P4('#3a4a6a','#4e6088','#6a7ea8','#8a9ec4'));tower(18,14,8,P4('#5a4a6a','#76628a','#9a84ac','#bca8cc'));tower(32,12,18,P4('#4a5a5a','#5e7474','#7a9494','#9ab4b4'));tower(44,14,30,P4('#3a4a6a','#4e6088','#6a7ea8','#8a9ec4'));
  rect(a,2,58,60,4,STONE2[2]);outlineAll(a,OUTL);});}
// Virus: bola roja con púas y cara de enojado; dos cuadros.
function virusArt(f){return mkA(32,32,a=>{const VR=P4('#8a1f2a','#c8413b','#e8654d','#f8a090'),K=hx('#1b1a24');
  for(let k=0;k<8;k++){const an=k*Math.PI/4+(f?0.25:0),x=16+Math.cos(an)*11,y=16+Math.sin(an)*11;line(a,16+Math.cos(an)*7,16+Math.sin(an)*7,x,y,VR[1],2);ell(a,x,y,2,2,VR[3]);}
  blob(a,[[16,16,8]],VR,null);ell(a,13,14,1.4,1.4,K);ell(a,19,14,1.4,1.4,K);line(a,11,11,14,12,K,1);line(a,21,11,18,12,K,1);rect(a,13,19,7,1,K);
  outlineAll(a,OUTL);});}
// Soporte técnico: oficina celeste con un cartel de auriculares con micrófono y, en la vidriera, dos técnicos con auriculares
// frente a monitores con tildes verdes.
function supportArt(){return mkA(64,64,a=>{const WL=P4('#3e6a72','#5a8a90','#7aaab0','#a4ccd0'),CY=hx('#5fe3d0'),W2=hx('#f6f1e4'),OK=hx('#93d36c');
  rect(a,14,3,36,15,DKW);for(let k=0;k<=40;k++){const an=Math.PI+Math.PI*k/40;for(const r of[6,7])a.set(Math.round(32+Math.cos(an)*r),Math.round(12+Math.sin(an)*r),CY);}
  rect(a,23,11,4,6,CY);rect(a,37,11,4,6,CY);line(a,25,16,30,17,CY,1);ell(a,31,17,1.4,1.4,W2);rect(a,20,18,1,2,IRON[0]);rect(a,43,18,1,2,IRON[0]);
  rect(a,4,24,56,36,WL[2]);rect(a,46,24,14,36,WL[1]);rect(a,2,20,60,4,WL[3]);
  rect(a,8,29,32,21,hx('#1e2430'));
  for(const[x,hair,shirt]of[[11,'#3a2418','#2f6b8a'],[25,'#8a5a2a','#e8654d']]){rect(a,x,31,11,8,hx('#24384a'));line(a,x+3,35,x+5,37,OK,1);line(a,x+5,37,x+8,33,OK,1);rect(a,x+4,39,3,2,IRON[1]);
    rect(a,x+1,45,9,4,hx(shirt));ell(a,x+5,43,2.6,2.6,hx(hair));for(let k=0;k<=8;k++){const an=Math.PI+Math.PI*k/8;a.set(Math.round(x+5+Math.cos(an)*3.4),Math.round(43+Math.sin(an)*3.4),CY);}}
  rect(a,8,49,32,2,WOOD[2]);rect(a,8,51,32,1,WL[0]);
  rect(a,44,36,12,24,hx('#2a3a42'));rect(a,46,38,8,10,GLASS[1]);
  outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#e8654d',C:'#b84a38',j:'#2a2a3a',y:'#3a2418'},{c:'#2f6b8a',C:'#204e68',j:'#e3ddcc',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#6a8a3a',C:'#4e6a28',j:'#2a2a3a',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:lithiumOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:modernHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),servidor:serverArt(),antena:towerArt(),cibercafe:cybercafeArt(),tienda:shopArt(),semillas:seedLabArt(),buscador:searchArt(),soporte:supportArt(),ciudad:cityArt(),bug:[virusArt(0),virusArt(1)],
  hero:[personArt({c:'#2f8a8a',C:'#1f6060',j:'#e8654d'},0),personArt({c:'#2f8a8a',C:'#1f6060',j:'#e8654d'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
// Lucecitas de los racks que titilan mientras el servidor anda.
function blink(px,py){const t=Math.floor(performance.now()/150);ctx.fillStyle='#1b1a24';for(const c of[8,20,32])for(let y=24;y<54;y+=3)if(hash(c+y,t,7)<0.35)ctx.fillRect(px+(c+2)/ART,py+y/ART,1/ART,1/ART);}
