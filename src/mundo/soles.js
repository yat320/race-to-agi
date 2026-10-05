// Era de los soles del mundo abierto (la que sigue a la de la vida y la última por ahora; en la fila de eras, "Soles"): la humanidad aprende a encender estrellas; helio, blindajes solares y estrellas inestables que caen junto a la ciudad, cuentan para atrás y explotan rompiendo lo que tienen cerca; la galaxia nueva. Datos y arte de la era; las reglas están en motor.html y las estrellas, en amenazas/novas.js.
const ERA={
  n:22,name:'Era de los soles',short:'Soles',de:'de la era de los soles',obra:'la galaxia nueva',next:null,
  ore:{id:'helio',name:'Helio',col:'#ffd35a',empty:'Burbujas de helio agotadas',gather:'helio',icon:[['.....kk.','..kkkwgk','.kgwgkk.','kgwgggGk','kggggGGk','kgggGGGk','.kGGGGk.','..kkkk..'],{g:'#ffd35a',G:'#e0a020',w:'#fff3b0'}]},
  storage:{id:'granero'},ideaBuild:'astrolabio',ideaTechs:['helio','cartas'],boostTech:'sinfonia',farmBuild:'jardinsolar',nightTech:'cartas',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','planetario','blindaje','subasta','jardinsolar','destilador','astrolabio'],
  novas:true,defense:{id:'blindaje',r:4,label:'Blindajes'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'artificiero',building:'Brigada de artificieros',unit:'Artificiero',done:'Brigada de artificieros lista: llegó un artificiero',desc:'Trae un artificiero que sale solo, con su traje acolchado y su pinza, a desarmar las estrellas inestables (tarda 10 s cada una) y arreglar lo roto, a 8 casilleros o menos.',info:'Brigada de artificieros: su artificiero desarma las estrellas cerca.',tip:'una brigada de artificieros: el artificiero desarma solo las estrellas inestables.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo21-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era de la vida',perks:[
    ['eden','ideaMult',1.25,'El Edén cósmico: ideas +25% durante toda la era'],
    ['pradera','agri',1.25,'Pradera viva: granjas +25%'],
    ['simbiosis','speed',1.2,'Templo de la simbiosis: te movés 20% más rápido']
  ]},
  techs:[
 {id:'helio',name:'Helio',cost:{helio:15,ideas:30},req:[],desc:'Desbloquea el planetario, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'blindaje',name:'Blindaje solar',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el blindaje solar: cerca, las estrellas cuentan a la mitad y no rompen nada.'},
 {id:'subasta',name:'Subasta de estrellas',cost:{helio:20,ideas:50},req:['helio'],desc:'Desbloquea la subasta de estrellas, que da monedas. Caen 30% más estrellas.'},
 {id:'jardinsolar',name:'Jardín solar',cost:{madera:40,piedra:20,ideas:65},req:['helio'],desc:'Desbloquea el jardín solar, que potencia las granjas.'},
 {id:'extraccion',name:'Destilador de helio',cost:{madera:60,helio:20,ideas:95},req:['subasta'],desc:'Desbloquea el destilador de helio, que junta helio solo.'},
 {id:'enfriado',name:'Enfriado',cost:{monedas:30,ideas:130},req:['blindaje','subasta'],desc:'Las estrellas inestables cuentan el doble de lento.'},
 {id:'cartas',name:'Cartas estelares',cost:{monedas:55,ideas:340},req:['enfriado','extraccion'],desc:'Desbloquea el gran astrolabio. Ideas +50% y de noche ves más lejos.'},
 {id:'sinfonia',name:'Sinfonía de las esferas',cost:{helio:70,monedas:55,ideas:450},req:['subasta','enfriado'],desc:'Todo produce +50%.'},
 {id:'galaxia',name:'La galaxia nueva',cost:{piedra:130,helio:110,monedas:130,ideas:1000},req:['cartas','sinfonia'],desc:'Cien mil millones de soles encendidos a mano. Cierra la era de los soles.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa solar',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa solar lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'helio',base:{madera:25,piedra:20,helio:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'helio',base:{madera:20,helio:8},grow:1.35,prod:{piedra:0.12}},
 {id:'planetario',name:'Planetario',req:'helio',base:{piedra:40,helio:10},grow:1.5,done:'Planetario abierto',desc:'Bajo la cúpula giran los mundos que vas a encender: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'blindaje',name:'Blindaje solar',req:'blindaje',base:{madera:25,piedra:25,helio:5},grow:1.4,done:'Blindaje solar levantado',desc:'Las estrellas que caen a 4 casilleros o menos cuentan a la mitad y su explosión no rompe lo que cubre. Después de aguantar una, se recalienta y un rato no cubre.'},
 {id:'subasta',name:'Subasta de estrellas',req:'subasta',base:{madera:30,piedra:25,helio:5},grow:1.4,done:'Subasta de estrellas abierta',desc:'Se rematan estrellas recién encendidas: da muchas monedas.',prod:{monedas:0.45}},
 {id:'jardinsolar',name:'Jardín solar',req:'jardinsolar',base:{madera:35,piedra:30},grow:1.6,done:'Jardín solar plantado',desc:'Girasoles con un sol chiquito en la flor: cada jardín hace rendir +50% a todas las granjas.'},
 {id:'destilador',name:'Destilador de helio',req:'extraccion',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Destilador de helio andando',desc:'Junta el gas dorado que sueltan las estrellas: da helio solo.',prod:{helio:0.12}},
 {id:'astrolabio',name:'Gran astrolabio',req:'cartas',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Gran astrolabio armado',desc:'Mide dónde va cada sol nuevo: ideas +30% por cada astrolabio.'}],
  info:{casa:'Casa solar: acá viven 2 aldeanos.',herreria:'Nanotaller: los aldeanos juntan más rápido.',planetario:'Planetario: genera ideas.',blindaje:'Blindaje solar: cerca, las estrellas cuentan a la mitad y no rompen nada. Si aguanta una explosión, se recalienta un rato.',subasta:'Subasta de estrellas: da monedas.',jardinsolar:'Jardín solar: potencia las granjas.',destilador:'Destilador de helio: da helio.',astrolabio:'Gran astrolabio: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['blindaje','blindaje','un blindaje solar: cerca, las estrellas cuentan a la mitad y no rompen nada.']],
  tips2:[['helio','planetario','un planetario: genera muchísimas ideas.'],['subasta','subasta','una subasta de estrellas para conseguir monedas.'],['jardinsolar','jardinsolar','un jardín solar: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era de los soles completa.',
  // Lo roto (drawBug) y el blindaje recalentado (drawOver) los dibuja la amenaza. Si no: al blindaje lo cruza un brillo,
  // alrededor del planetario giran dos planetas, la estrella del frasco de la subasta titila, las flores del jardín laten como
  // soles, del destilador suben burbujas doradas y en el astrolabio gira la regla.
  deco:(o,px,py)=>{if(o.bug||o.heat>0)return;const off=((px*3+py*5)%16)/16,t=st.time;
    if(o.t==='blindaje'){const a=0.3+0.2*Math.sin(t*2.4+off*6);ctx.strokeStyle='rgba(127,232,255,'+a.toFixed(2)+')';ctx.lineWidth=0.7;ctx.beginPath();ctx.ellipse(px+8,py+12.5,7.4,9,0,Math.PI,2*Math.PI);ctx.stroke();
      const u=(t*0.45+off)%1.6;if(u<1){const an=Math.PI+u*Math.PI;ctx.fillStyle='rgba(255,255,255,'+(0.9*Math.sin(u*Math.PI)).toFixed(2)+')';ctx.fillRect(px+8+Math.cos(an)*6.2-0.6,py+12.5+Math.sin(an)*7.4-0.6,1.2,1.2);}}
    else if(o.t==='planetario'){for(const[k,c]of[[0,'#f08a7c'],[1,'#7fe8ff']]){const an=t*(k?0.8:1.25)+k*3+off*6,x=px+8+Math.cos(an)*7,y=py+6.5+Math.sin(an)*1.6;if(Math.sin(an)<0&&Math.abs(Math.cos(an))<0.8)continue;ctx.fillStyle=c;ctx.fillRect(x-0.7,y-0.7,1.4,1.4);}}
    else if(o.t==='subasta'){const s=0.6+0.5*Math.abs(Math.sin(t*3+off*6));ctx.fillStyle='rgba(255,243,176,.95)';ctx.fillRect(px+8-s,py+2.6,s*2,0.5);ctx.fillRect(px+7.75,py+2.85-s,0.5,s*2);}
    else if(o.t==='jardinsolar'){for(const[x,y,k]of[[3,5,0],[8,2.5,1],[13,4.5,2]]){const a=0.25+0.2*Math.sin(t*3+k*2+off*6);ctx.fillStyle='rgba(255,226,120,'+a.toFixed(2)+')';ctx.beginPath();ctx.arc(px+x,py+y,2.6,0,6.29);ctx.fill();}}
    else if(o.t==='destilador'){for(let k=0;k<3;k++){const u=(t*0.7+k/3+off)%1;ctx.fillStyle='rgba(255,211,90,'+(0.9*(1-u)).toFixed(2)+')';ctx.beginPath();ctx.arc(px+12+Math.sin(u*7+k*2)*0.9,py+4.5-u*7,0.5+u*0.6,0,6.29);ctx.fill();}}
    else if(o.t==='astrolabio'){const an=t*0.5+off*6;ctx.strokeStyle='#ecc56a';ctx.lineWidth=0.6;ctx.beginPath();ctx.moveTo(px+8-Math.cos(an)*4.2,py+6.5-Math.sin(an)*4.2);ctx.lineTo(px+8+Math.cos(an)*4.2,py+6.5+Math.sin(an)*4.2);ctx.stroke();}},
  text:{
    when:'Año 9.000.000.000',title:'La era de los soles',
    intro:'Con el Edén cósmico, el universo nuevo está lleno de vida y la humanidad aprende a encender estrellas. Pero no todas salen estables: algunas caen del cielo, chiquitas, y se quedan latiendo con una cuenta regresiva. Si llega a cero, explotan y rompen todo lo que tienen cerca. Tocalas para apagarlas, o poné blindajes solares. La meta: la galaxia nueva, cien mil millones de soles encendidos a mano.',
    news:'Novedades: helio, blindajes solares y estrellas inestables. Cae una estrella junto a tus edificios y cuenta para atrás: tocala antes de que llegue a 0. Si explota, rompe lo que tiene cerca; tocá lo roto para arreglarlo.',
    legacy:'Lo que trae tu ciudad de la era de la vida',
    noLegacy:'No hay una era de la vida terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o unas burbujas de helio y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Caen estrellas inestables junto a donde hay más edificios: cuentan para atrás y, si llegan a 0, explotan y rompen lo que tienen cerca. Tocalas para apagarlas y tocá lo roto para arreglarlo. Cerca de un blindaje solar cuentan a la mitad y no rompen nada, pero el blindaje que aguanta una explosión se recalienta y un rato no cubre. En la compu: flechas o WASD.',
    win:'La galaxia nueva',winText:()=>'Terminaste la galaxia nueva en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Cien mil millones de soles, encendidos uno por uno, y ninguno explota.'}
};
/* ---------- arte de la era ---------- */
const SLGOLD=P4('#a86a10','#e0a020','#ffd35a','#fff3b0'),SLWHT=P4('#9aa4b8','#c3cbd6','#e6ecf2','#ffffff'),SLSKY=P4('#141a3a','#22305e','#3a4e8a','#5a74b8'),
  SLBRASS=P4('#6a4a1a','#9a6e2a','#c8963a','#ecc56a'),SLROCK=P4('#3a2a2a','#54403a','#6e5648','#8a705a'),SLCY=hx('#7fe8ff'),SLCORAL=hx('#e8654d'),SLWARM=P4('#c87a20','#ffc860','#fff3b0');
// Una estrella de cinco puntas pintada en el lienzo (centro, radio de las puntas y del medio, y el color).
function slStar(a,cx,cy,r1,r2,c){const p=[];for(let k=0;k<10;k++){const an=-Math.PI/2+k*Math.PI/5,r=k%2?r2:r1;p.push([cx+Math.cos(an)*r,cy+Math.sin(an)*r]);}poly(a,p,c);}
// Burbujas de helio: gas dorado que sale de una grieta en una roca oscura, en burbujas de varios tamaños con su brillo.
function helioOreArt(){return mkA(64,52,a=>{blob(a,[[32,43,12],[19,46,8],[46,46,9]],SLROCK,null);ell(a,32,35,7,2.5,SLGOLD[2]);ell(a,32,35,4,1.4,SLGOLD[3]);
  for(const[x,y,r]of[[31,22,10],[46,14,6.5],[17,15,6],[42,31,4.5],[24,4,3.5]])ell(a,x,y,r,r,(i,j)=>{const d=Math.hypot(i,j)/r;return d>0.8?SLGOLD[1]:Math.hypot(i+r*0.4,j+r*0.4)<r*0.34?SLGOLD[3]:d<0.5?SLGOLD[2]:hx('#f6c444');});
  for(let x=8;x<58;x++)for(let y=47;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);for(const[x,y]of[[26,17],[43,11],[14,12]])a.set(x,y,hx('#ffffff'));});}
// Casa solar: casa blanca con un techo dorado redondo como un sol que sale, con sus rayos, y la luz tibia en las ventanas.
function solarHouseArt(){return mkA(64,64,a=>{for(let k=1;k<6;k++){const an=Math.PI+k*Math.PI/6,q=d=>[32+Math.cos(an+d)*19,34+Math.sin(an+d)*15];poly(a,[q(-0.13),q(0.13),[32+Math.cos(an)*28,34+Math.sin(an)*24]],k%2?SLGOLD[1]:SLGOLD[2]);}
  rect(a,10,32,44,26,SLWHT[2]);rect(a,42,32,12,26,SLWHT[1]);rect(a,8,56,48,3,SLWHT[0]);
  ell(a,32,34,21,16,(i,j)=>j>0?null:i<-8&&j<-6?SLGOLD[3]:i>9?SLGOLD[1]:SLGOLD[2]);rect(a,10,33,44,2,SLGOLD[0]);
  rect(a,27,43,10,15,DKW);ell(a,32,43,5,4,(i,j)=>j<=0?DKW:null);rect(a,28,45,8,13,hx('#6a4426'));a.set(34,51,SLGOLD[2]);
  for(const x of[18,46])ell(a,x,44,4,4,(i,j)=>Math.hypot(i,j)>3?SLWHT[0]:i+j<-1?SLWARM[2]:SLWARM[1]);outlineAll(a,OUTL);});}
// Planetario: una cúpula azul de noche con estrellitas, un anillo dorado con un planeta adelante y la entrada con columnas.
function planetariumArt(){return mkA(64,64,a=>{rect(a,4,40,56,20,SLWHT[2]);rect(a,44,40,16,20,SLWHT[1]);rect(a,2,58,60,2,SLWHT[0]);
  for(const x of[8,16,44,52]){rect(a,x,43,4,15,SLWHT[3]);rect(a,x+3,43,1,15,SLWHT[1]);}rect(a,25,45,14,15,DKW);ell(a,32,45,7,5,(i,j)=>j<=0?DKW:null);
  ell(a,32,39,23,25,(i,j)=>{if(j>0)return null;const d=Math.hypot(i/23,j/25);return d>0.9?SLWHT[0]:i<-6&&j<-13?SLSKY[3]:j<-10?SLSKY[2]:SLSKY[1];});rect(a,2,38,60,3,SLWHT[3]);
  for(const[x,y]of[[24,22],[38,18],[30,29],[43,28],[19,31],[34,24],[28,17]])a.set(x,y,(x+y)%3?hx('#ffffff'):SLGOLD[2]);
  ell(a,32,27,28,6,(i,j)=>{const d=Math.hypot(i/28,j/6);return d>0.8&&j>=-1?SLGOLD[2]:null;});ell(a,53,29,3.5,3.5,(i,j)=>i+j<-1?hx('#f6a090'):SLCORAL);
  rect(a,31,10,2,5,SLWHT[1]);ell(a,32,10,2,2,SLGOLD[2]);outlineAll(a,OUTL);});}
// Blindaje solar: una cúpula baja de placas doradas como escamas, con una franja cian que brilla abajo y el emisor arriba.
function sunShieldArt(){return mkA(64,64,a=>{rect(a,6,50,52,10,IRON[2]);rect(a,6,50,52,2,IRON[3]);rect(a,44,50,14,10,IRON[1]);
  ell(a,32,50,25,30,(i,j)=>{if(j>0)return null;const row=Math.floor((j+30)/6),sx=i+25+(row&1)*3,edge=(j+30)%6===5||sx%6===5;
    return edge?SLGOLD[0]:i<-10&&j<-10?SLGOLD[3]:i>10?SLGOLD[1]:(row+Math.floor(sx/6))%2?SLGOLD[2]:hx('#f0c040');});
  rect(a,8,45,48,3,SLCY);rect(a,8,45,48,1,hx('#e8fcff'));rect(a,30,14,4,7,IRON[2]);rect(a,30,14,1,7,IRON[3]);ell(a,32,12,4,4,(i,j)=>i+j<-1?hx('#e8fcff'):SLCY);outlineAll(a,OUTL);});}
// Subasta de estrellas: una sala con frontón dorado, tres arcos (el del medio con el atril y el martillo) y, arriba, la estrella
// que se remata, adentro de un frasco de vidrio.
function starAuctionArt(){return mkA(64,64,a=>{rect(a,4,30,56,30,SLWHT[2]);rect(a,46,30,14,30,SLWHT[1]);rect(a,2,58,60,2,SLWHT[0]);
  poly(a,[[2,31],[32,17],[62,31]],(x,y)=>x<32?SLBRASS[2]:SLBRASS[1]);rect(a,2,30,60,2,SLBRASS[0]);
  for(const x of[7,25,43]){rect(a,x,42,14,16,DKW);ell(a,x+7,42,7,6,(i,j)=>j<=0?DKW:null);}
  for(const x of[7,43]){rect(a,x+2,48,10,10,SLWARM[0]);ell(a,x+7,48,5,4,(i,j)=>j<=0?SLWARM[0]:null);}
  rect(a,28,46,8,12,WOOD[2]);rect(a,27,45,10,2,WOOD[3]);line(a,30,42,35,39,WOOD[1],2);rect(a,34,37,4,3,WOOD[3]);
  ell(a,32,9,8,9,(i,j)=>{const d=Math.hypot(i/8,j/9);return d>0.84?hx('#9ab8c8'):i<-3&&j<-3?hx('#f4fbff'):hx('#cfe6ee');});rect(a,26,17,12,3,SLBRASS[1]);rect(a,26,17,12,1,SLBRASS[3]);
  slStar(a,32,10,6,2.6,SLGOLD[2]);slStar(a,32,10,3,1.3,SLGOLD[3]);outlineAll(a,OUTL);});}
// Jardín solar: tres girasoles grandes con un sol chiquito en la flor, sobre un cantero con matas.
function solarGardenArt(){return mkA(64,64,a=>{rect(a,4,48,56,12,SOIL[1]);rect(a,4,48,56,2,SOIL[2]);rect(a,4,58,56,2,SOIL[0]);
  for(const[x,y]of[[12,22],[32,12],[52,20]]){rect(a,x-1,y,3,48-y,LEAF[1]);rect(a,x-1,y,1,48-y,LEAF[2]);
    for(const s of[-1,1])ell(a,x+s*5,y+(48-y)*0.55,4.5,2,(i,j)=>j<0?LEAF[3]:LEAF[2]);
    for(let k=0;k<10;k++){const an=k*Math.PI/5;ell(a,x+Math.cos(an)*7,y+Math.sin(an)*7,2.8,2.8,k%2?SLGOLD[1]:SLGOLD[2]);}
    ell(a,x,y,5.5,5.5,(i,j)=>{const d=Math.hypot(i+1.5,j+1.5);return d<2?hx('#ffffff'):d<4?SLGOLD[3]:hx('#f6c444');});}
  blob(a,[[22,49,5],[42,49,5]],LEAF,null);outlineAll(a,OUTL);});}
// Destilador de helio: una olla de cobre sobre el fuego, un caño en espiral y un tanque de vidrio lleno de gas dorado con burbujas.
function helioStillArt(){return mkA(64,64,a=>{rect(a,4,54,56,6,IRON[1]);rect(a,4,54,56,1,IRON[3]);
  for(const x of[11,19,27])poly(a,[[x-3,54],[x+3,54],[x,47]],x===19?SLGOLD[2]:hx('#f08a24'));
  ell(a,19,38,13,11,(i,j)=>i<-5&&j<-4?COPPER[2]:i>6?COPPER[0]:COPPER[1]);rect(a,14,22,10,8,COPPER[1]);rect(a,14,22,3,8,COPPER[2]);rect(a,12,20,14,3,COPPER[0]);
  line(a,24,22,34,14,COPPER[2],2);for(let k=0;k<4;k++)ell(a,36,20+k*6,4,2,(i,j)=>Math.hypot(i/4,j/2)>0.6?COPPER[k%2?1:2]:null);line(a,38,40,40,44,COPPER[1],2);
  rect(a,40,12,18,42,hx('#9ab8c8'));rect(a,42,14,14,38,hx('#cfe6ee'));rect(a,42,30,14,22,SLGOLD[1]);rect(a,42,30,14,2,SLGOLD[3]);
  for(const[x,y,r]of[[46,24,2],[51,18,1.5],[47,40,2],[52,35,1.5],[49,46,1.5]])ell(a,x,y,r,r,y<30?SLGOLD[2]:SLGOLD[3]);rect(a,39,10,20,3,IRON[2]);rect(a,47,4,4,6,IRON[1]);
  outlineAll(a,OUTL);});}
// Gran astrolabio: un aro de bronce enorme con las marcas de las horas y un cielo con estrellas adentro, colgado de un pie de
// piedra (la regla que gira va aparte, ERA.deco).
function astrolabeArt(){return mkA(64,64,a=>{rect(a,16,56,32,6,STONE2[1]);rect(a,16,56,32,1,STONE2[3]);rect(a,26,46,12,10,STONE2[2]);rect(a,34,46,4,10,STONE2[1]);
  ell(a,32,26,22,22,(i,j)=>{const d=Math.hypot(i,j);return d>18?(i+j<-8?SLBRASS[3]:i+j>8?SLBRASS[1]:SLBRASS[2]):d>16.5?SLBRASS[0]:d>11?SLSKY[1]:d>9.5?SLBRASS[2]:SLSKY[2];});
  for(let k=0;k<24;k++){const an=k*Math.PI/12,r0=k%6?19.5:18.5;line(a,32+Math.cos(an)*r0,26+Math.sin(an)*r0,32+Math.cos(an)*21,26+Math.sin(an)*21,SLBRASS[0],1);}
  for(const[x,y]of[[24,20],[40,32],[38,17],[22,33],[29,40],[43,24]])a.set(x,y,(x+y)%2?SLGOLD[3]:hx('#ffffff'));slStar(a,32,26,4,1.8,SLGOLD[2]);
  ell(a,32,2,3,3,(i,j)=>Math.hypot(i,j)>1.5?SLBRASS[2]:null);outlineAll(a,OUTL);});}
// Llamita: el motor la dibuja (drawBug) sobre lo roto solo si no tiene el gancho de la amenaza; queda por las dudas.
function slFlameArt(f){return mkA(32,32,a=>{const h=f?24:20;poly(a,[[8,28],[24,28],[17,28-h]],hx('#f08a24'));poly(a,[[11,28],[21,28],[15,32-h]],SLGOLD[2]);ell(a,16,26,3,2,SLGOLD[3]);outlineAll(a,OUTL);});}
const SLVIL=[{c:'#f0c048',C:'#c09030',j:'#5a3a1a',y:'#3a2418'},{c:'#e8654d',C:'#b84a38',j:'#2a2a3a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#3a4e8a',C:'#22305e',j:'#ffd35a',y:'#8a5a2a'}];
const HS={tree:treeArt(OAKL,true,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:helioOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:solarHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),planetario:planetariumArt(),blindaje:sunShieldArt(),
  subasta:starAuctionArt(),jardinsolar:solarGardenArt(),destilador:helioStillArt(),astrolabio:astrolabeArt(),bug:[slFlameArt(0),slFlameArt(1)],
  hero:[personArt({c:'#fff3b0',C:'#e0a020',j:'#2a2a3a'},0),personArt({c:'#fff3b0',C:'#e0a020',j:'#2a2a3a'},1)],vil:SLVIL.map(p=>[personArt(p,0),personArt(p,1)])};
