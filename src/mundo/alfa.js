// Era alfa del mundo abierto (la que sigue a la omega; en la fila de eras, "Alfa"): del punto omega nace un universo nuevo y tu ciudad es lo primero que hay en él. Fotones, estabilizadores de campo y torbellinos de luz que chupan lo que guardaste y lo desparraman en motas; la primera luz. Datos y arte de la era; las reglas están en motor.html y los torbellinos, en amenazas/torbellinos.js.
const ERA={
  n:20,name:'Era alfa',short:'Alfa',de:'de la era alfa',obra:'la primera luz',next:null,
  ore:{id:'foton',name:'Fotones',col:'#ffd96a',empty:'Cristales de luz apagados',gather:'fotones',icon:[['...kk...','..kwGk..','.kwGGgk.','.kwGGgk.','.kwGGgk.','.kwGGgk.','..kGgk..','...kk...'],{w:'#fff6c8',G:'#ffd96a',g:'#d4a02a'}]},
  storage:{id:'granero'},ideaBuild:'catedral',ideaTechs:['fotones','catedral'],boostTech:'resonancia',farmBuild:'huertoluz',nightTech:'catedral',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','prisma','estabilizador','espectro','huertoluz','condensador','catedral'],
  whirls:true,defense:{id:'estabilizador',r:4,label:'Estabilizadores'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'cazavientos',building:'Puesto de cazavientos',unit:'Cazavientos',done:'Puesto de cazavientos listo: llegó un cazavientos',desc:'Trae un cazavientos que sale solo a atrapar con su frasco los torbellinos de luz, a 8 casilleros o menos. Las motas no las junta.',info:'Puesto de cazavientos: su cazavientos deshace torbellinos cerca.',tip:'un puesto de cazavientos: el cazavientos deshace los torbellinos solo.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo19-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era omega',perks:[
    ['omega','ideaMult',1.25,'El punto omega: ideas +25% durante toda la era'],
    ['invernadero','agri',1.25,'Invernadero eterno: granjas +25%'],
    ['cronica','speed',1.2,'Crónica del universo: te sabés el camino, te movés 20% más rápido']
  ]},
  techs:[
 {id:'fotones',name:'Fotones',cost:{foton:15,ideas:30},req:[],desc:'Desbloquea el prisma de ideas, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'estabilizador',name:'Estabilizadores de campo',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el estabilizador de campo: deshace los torbellinos que se le acercan.'},
 {id:'espectro',name:'Mercado del espectro',cost:{foton:20,ideas:50},req:['fotones'],desc:'Desbloquea el mercado del espectro, que da monedas. Vienen 30% más torbellinos.'},
 {id:'cultivoluz',name:'Cultivo de luz',cost:{madera:40,piedra:20,ideas:65},req:['fotones'],desc:'Desbloquea el huerto de luz, que potencia las granjas.'},
 {id:'condensador',name:'Condensador de fotones',cost:{madera:60,foton:20,ideas:95},req:['espectro'],desc:'Desbloquea el condensador de fotones, que hace fotones solo.'},
 {id:'calma',name:'Campos en calma',cost:{monedas:30,ideas:130},req:['estabilizador','espectro'],desc:'Los torbellinos chupan la mitad.'},
 {id:'catedral',name:'Catedral de luz',cost:{monedas:55,ideas:340},req:['calma','condensador'],desc:'Desbloquea la catedral de luz. Ideas +50% y de noche ves más lejos.'},
 {id:'resonancia',name:'Resonancia',cost:{foton:70,monedas:55,ideas:450},req:['espectro','calma'],desc:'Todo produce +50%.'},
 {id:'primeraluz',name:'La primera luz',cost:{piedra:130,foton:110,monedas:130,ideas:1000},req:['catedral','resonancia'],desc:'La primera luz del universo nuevo, encendida por vos. Cierra la era alfa.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa de luz',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa de luz lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'fotones',base:{madera:25,piedra:20,foton:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'fotones',base:{madera:20,foton:8},grow:1.35,prod:{piedra:0.12}},
 {id:'prisma',name:'Prisma de ideas',req:'fotones',base:{piedra:40,foton:10},grow:1.5,done:'Prisma de ideas encendido',desc:'Abre la luz en todos sus colores, y cada color es una idea: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'estabilizador',name:'Estabilizador de campo',req:'estabilizador',base:{madera:25,piedra:25,foton:5},grow:1.4,done:'Estabilizador de campo encendido',desc:'Calma la luz a 4 casilleros o menos: deshace los torbellinos que entran y hace volver solas las motas que caen cerca.'},
 {id:'espectro',name:'Mercado del espectro',req:'espectro',base:{madera:30,piedra:25,foton:5},grow:1.4,done:'Mercado del espectro abierto',desc:'Se compra y se vende luz de todos los colores: da muchas monedas.',prod:{monedas:0.45}},
 {id:'huertoluz',name:'Huerto de luz',req:'cultivoluz',base:{madera:35,piedra:30},grow:1.6,done:'Huerto de luz plantado',desc:'Plantas que crecen con luz pura: cada huerto hace rendir +50% a todas las granjas.'},
 {id:'condensador',name:'Condensador de fotones',req:'condensador',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Condensador de fotones encendido',desc:'Junta la luz que flota en el aire y la vuelve cristal: da fotones solo.',prod:{foton:0.12}},
 {id:'catedral',name:'Catedral de luz',req:'catedral',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Catedral de luz abierta',desc:'Sus vitrales guardan la luz de todo el universo nuevo: ideas +30% por cada catedral.'}],
  info:{casa:'Casa de luz: acá viven 2 aldeanos.',herreria:'Nanotaller: los aldeanos juntan más rápido.',prisma:'Prisma de ideas: genera ideas.',estabilizador:'Estabilizador de campo: deshace los torbellinos y hace volver las motas, a 4 casilleros o menos.',espectro:'Mercado del espectro: da monedas.',huertoluz:'Huerto de luz: potencia las granjas.',condensador:'Condensador de fotones: da fotones.',catedral:'Catedral de luz: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['estabilizador','estabilizador','un estabilizador de campo: deshace los torbellinos de luz.']],
  tips2:[['fotones','prisma','un prisma de ideas: genera muchísimas ideas.'],['espectro','espectro','un mercado del espectro para conseguir monedas.'],['cultivoluz','huertoluz','un huerto de luz: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era alfa completa.',
  // El estabilizador gira sus anillos y larga ondas de calma; por el prisma corre un destello y su arcoíris titila; al
  // condensador le entran motitas de luz por las puntas de los brazos; en el huerto suben chispitas y la catedral late en el rosetón.
  deco:(o,px,py)=>{const off=((px*3+py*5)%16)/16,t=st.time;
    if(o.t==='estabilizador'){const u=(t*0.45+off)%1;ctx.strokeStyle='rgba(150,210,255,'+(0.5*(1-u)).toFixed(2)+')';ctx.lineWidth=0.6;ctx.beginPath();ctx.ellipse(px+8,py+13.5,3+u*7,1+u*2.4,0,0,6.29);ctx.stroke();
      for(let k=0;k<2;k++){const a0=t*(k?-1.7:2.3)+off*6;ctx.strokeStyle=k?'rgba(255,233,150,.95)':'rgba(255,255,255,.9)';ctx.lineWidth=0.55;ctx.beginPath();ctx.ellipse(px+8,py+4,3.6-k*0.9,1.2+k*0.7,k?0.5:0,a0,a0+2.2);ctx.stroke();}}
    else if(o.t==='prisma'){const u=(t*0.7+off)%1;ctx.fillStyle='rgba(255,255,255,'+(0.9*(1-Math.abs(u*2-1))).toFixed(2)+')';ctx.fillRect(px+u*6,py+7.4-u*0.5,1.2,0.8);
      ctx.globalAlpha=0.25+0.2*Math.sin(t*3+off*6);ctx.fillStyle='#ffffff';ctx.fillRect(px+10.5,py+5,5,4);ctx.globalAlpha=1;}
    else if(o.t==='condensador'){for(let k=0;k<4;k++){const u=(t*0.6+k/4+off)%1,s=k%2?-1:1,sx=px+8+s*(5.5+(k>>1)),sy=py-2.5+(k>>1)*1.5,ex=px+8+s*2.25,ey=py+1.5;
      ctx.fillStyle='rgba(255,233,150,'+(1-u*0.6).toFixed(2)+')';ctx.fillRect(sx+(ex-sx)*u-0.45,sy+(ey-sy)*u-0.45,0.9,0.9);}}
    else if(o.t==='huertoluz'){for(let k=0;k<3;k++){const u=(t*0.5+k/3+off)%1;ctx.fillStyle=['rgba(255,233,150,','rgba(255,160,220,','rgba(140,240,220,'][k]+(1-u).toFixed(2)+')';ctx.fillRect(px+3.5+k*4.2+Math.sin(u*7+k)*0.8,py+6-u*8,0.9,0.9);}}
    else if(o.t==='catedral'){const p=0.5+0.5*Math.sin(t*2+off*6);ctx.fillStyle='rgba(255,240,180,'+(0.12+0.2*p).toFixed(2)+')';ctx.beginPath();ctx.arc(px+8,py+7.2,2.6,0,6.29);ctx.fill();
      ctx.fillStyle='rgba(255,246,200,'+(0.4+0.5*p).toFixed(2)+')';ctx.fillRect(px+7.6,py-1.6,0.8,0.8);}},
  text:{
    when:'Año 0, otra vez',title:'La era alfa',
    intro:'Del punto omega nace un universo nuevo, y tu ciudad es lo primero que hay en él. Todo es luz recién hecha, que se junta en fotones: cristales dorados de luz condensada. Pero la luz todavía no se calmó y se arma en torbellinos que pasan por tus edificios, chupan lo que guardaste y lo desparraman en motas de luz. Tocá el torbellino para deshacerlo y juntá las motas antes de que se apaguen, o poné estabilizadores de campo. La meta: la primera luz.',
    news:'Novedades: fotones, estabilizadores de campo y torbellinos de luz. Un torbellino chupa lo que más tenés y lo desparrama en motas con su número: tocalo para deshacerlo. Las motas vuelven si las tocás o si alguien de tu gente pasa por encima; si no, se apagan.',
    legacy:'Lo que trae tu ciudad de la era omega',
    noLegacy:'No hay una era omega terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o un cristal de fotones y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Pasan torbellinos de luz: van a tu bóveda o a lo que más produce, chupan lo que más tenés y lo desparraman en motas con su número. Tocá el torbellino para deshacerlo y tocá las motas para recuperarlas (también vuelven si alguien de tu gente pasa por encima); si nadie las junta, se apagan. Cerca de un estabilizador de campo los torbellinos se deshacen y las motas vuelven solas. En la compu: flechas o WASD.',
    win:'La primera luz',winText:()=>'Encendiste la primera luz en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. El universo nuevo ya tiene con qué verse, y todo lo que venga va a nacer a su luz.'}
};
/* ---------- arte de la era ---------- */
const ALFG=P4('#8a6418','#d4a02a','#ffd96a','#fff6c8'),ALFW=P4('#9c98b4','#c4c0d8','#e4e0f0','#fbfaff'),ALFB=P4('#1e2a4a','#2c3c66','#40568a','#5a74b0'),
  ALFK=P4('#2a2438','#3a3250','#4e4468','#6a5e88'),ALFS=P4('#4a7ab8','#7aaee0','#b4dcf6','#ecf8ff'),
  ALFRB=['#ff6a6a','#ffaa4a','#ffe85a','#7ae07a','#5ac8ff','#a07aff'].map(hx),ALFH=hx('#ffffff'),ALFPK=hx('#ff9ad8'),ALFCY=hx('#7af0e0');
// Pone a la sombra un rectángulo de lo pintado (el costado derecho de las paredes).
function alfShade(a,x,y,w,h,k){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++){const v=a.get(i,j);if(v)a.set(i,j,mulc(v,k));}}
// Un cristal de luz parado: un prisma de seis caras visto de frente, con la cara de la izquierda más clara y la punta arriba.
function alfCrystal(a,x,y,h,w,l){poly(a,[[x-w,y],[x-w+l,y-h+w],[x+l,y-h],[x+w+l,y-h+w],[x+w,y]],(X)=>X<x+l-w*0.35?ALFG[3]:X<x+l+w*0.35?ALFG[2]:ALFG[1]);
  line(a,x-w*0.45+l*0.6,y-2,x-w*0.45+l,y-h+w+1,ALFH,1);}
// Fotones: cristales dorados de luz condensada que salen de una roca oscura, con chispitas alrededor.
function photonOreArt(){return mkA(64,52,a=>{blob(a,[[32,43,12],[19,46,7],[45,46,7]],ALFK,null);
  for(const[x,y,h,w,l]of[[21,44,19,5,-4],[43,44,21,5,4],[32,44,31,6,0],[27,46,12,4,-2],[38,47,11,4,2]])alfCrystal(a,x,y,h,w,l);
  for(let x=10;x<56;x++)for(let y=47;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);
  for(const[x,y]of[[12,22],[52,16],[24,8],[44,6]]){a.set(x,y,ALFH);a.set(x-1,y,ALFG[3]);a.set(x+1,y,ALFG[3]);a.set(x,y-1,ALFG[3]);a.set(x,y+1,ALFG[3]);}});}
// Casa de luz: paredes de nácar, una cúpula de vidrio dorado que brilla, puerta y ventanas redondas con luz y un cristal en la punta.
function lightHouseArt(){return mkA(64,64,a=>{rect(a,10,34,44,23,ALFW[2]);rect(a,10,34,44,2,ALFW[3]);alfShade(a,42,34,12,23,0.82);rect(a,6,56,52,3,ALFW[0]);rect(a,6,56,52,1,ALFW[1]);
  ell(a,32,35,23,22,(i,j)=>{if(j>0)return null;const d=Math.hypot(i/23,j/22),an=Math.atan2(j,i*0.9);if(d>0.9)return ALFW[1];return Math.abs(Math.sin(an*4))<0.12||Math.abs(d-0.55)<0.05?ALFW[0]:i<-6?ALFG[3]:i<8?ALFG[2]:ALFG[1];});
  for(const[x,y]of[[20,24],[22,20],[26,17]])a.set(x,y,ALFH);rect(a,10,33,44,2,ALFW[1]);
  ell(a,32,48,6,6,(i,j)=>j<=0?ALFG[2]:null);rect(a,26,48,12,9,ALFG[2]);ell(a,32,50,3,5,(i,j)=>j<1?ALFG[3]:ALFH);rect(a,26,48,1,9,ALFG[1]);rect(a,37,48,1,9,ALFG[1]);
  for(const x of[17,47]){ell(a,x,44,4.5,4.5,ALFW[0]);ell(a,x,44,3.5,3.5,(i,j)=>i+j<-1?ALFH:ALFG[2]);}
  rect(a,31,6,2,8,ALFW[1]);poly(a,[[32,0],[36,5],[32,10],[28,5]],(x,y)=>x<32?ALFG[3]:ALFG[1]);a.set(31,3,ALFH);outlineAll(a,OUTL);});}
// Prisma de ideas: un prisma de vidrio enorme sobre un pedestal; le entra un rayo blanco por la izquierda y sale un arcoíris por
// la derecha (el destello que corre va aparte, ERA.deco).
function ideaPrismArt(){return mkA(64,64,a=>{rect(a,16,46,32,12,ALFW[2]);alfShade(a,40,46,8,12,0.8);rect(a,12,43,40,4,ALFW[3]);rect(a,12,46,40,1,ALFW[0]);rect(a,14,57,36,2,ALFW[0]);
  for(let k=0;k<6;k++)line(a,40,27,63,14+k*4,ALFRB[k],3);
  line(a,0,31,24,28,ALFW[3],3);line(a,0,30,24,28,ALFH,1);
  poly(a,[[32,4],[51,43],[13,43]],(x,y)=>{const e=(x-32)/((y-4)*0.49+0.01);return e<-0.55?ALFS[3]:e<0.1?ALFS[2]:e<0.6?ALFS[1]:ALFS[0];});
  line(a,31,8,18,40,ALFH,1);line(a,33,10,46,40,ALFS[1],1);for(let k=0;k<6;k++)a.set(36+k*0.7,26+k*0.3,ALFRB[k]);outlineAll(a,OUTL);
  for(const[x,y]of[[8,22],[56,8]])a.set(x,y,ALFH);});}
// Estabilizador de campo: una columna de nácar sobre una base azul, con un núcleo de luz quieta adentro de dos anillos dorados
// (los anillos que giran y las ondas de calma van aparte, ERA.deco).
function stabilizerArt(){return mkA(64,64,a=>{poly(a,[[10,60],[54,60],[58,52],[6,52]],ALFB[1]);rect(a,8,50,48,4,ALFB[3]);rect(a,8,53,48,1,ALFB[0]);
  for(const x of[14,26,38,50])rect(a,x-2,55,4,2,hx('#9ad8ff'));
  rect(a,27,24,10,27,ALFW[2]);rect(a,27,24,3,27,ALFW[3]);rect(a,34,24,3,27,ALFW[1]);for(const y of[30,38,46])rect(a,26,y,12,2,ALFG[2]);
  ell(a,32,16,19,6,(i,j)=>{const d=Math.hypot(i/19,j/6);return d>0.78?(j<0?ALFG[3]:ALFG[1]):null;});
  ell(a,32,16,9,9,(i,j)=>{const d=Math.hypot(i,j)/9;return d<0.35?ALFH:d<0.6?hx('#d8f0ff'):d<0.85?hx('#9ad8ff'):ALFS[0];});
  ell(a,32,16,19,6,(i,j)=>{const d=Math.hypot(i/19,j/6);return d>0.78&&j>0?ALFG[2]:null;});for(const[x,y]of[[28,12],[29,11]])a.set(x,y,ALFH);outlineAll(a,OUTL);});}
// Mercado del espectro: un puesto con toldo de los colores del arcoíris, un mostrador con frascos de luz de cada color y un
// cartel con una moneda.
function spectrumMarketArt(){return mkA(64,64,a=>{rect(a,6,30,52,28,ALFW[2]);alfShade(a,46,30,12,28,0.82);rect(a,10,34,44,12,ALFK[1]);
  for(const[x,c]of[[14,0],[22,2],[30,4],[38,5],[46,3]]){const C=ALFRB[c];rect(a,x,36,6,9,mulc(C,0.55));ell(a,x+3,40,2,3,C);a.set(x+2,38,ALFH);rect(a,x+1,35,4,2,WOOD[2]);}
  rect(a,4,46,56,12,WOOD[2]);rect(a,4,46,56,2,WOOD[3]);rect(a,46,48,14,10,WOOD[1]);for(let x=8;x<58;x+=10)rect(a,x,50,1,8,WOOD[0]);
  poly(a,[[0,32],[6,16],[58,16],[64,32]],(x,y)=>{const c=ALFRB[(Math.floor((x+2)/11))%6];return y<22?c:mulc(c,0.85);});
  for(let x=0;x<64;x+=6)ell(a,x+3,32,3,2,(i,j)=>j>=0?mulc(ALFRB[(Math.floor((x+5)/11))%6],0.75):null);
  rect(a,24,2,16,14,WOOD[2]);rect(a,24,2,16,2,WOOD[3]);ell(a,32,9,4.5,4.5,(i,j)=>i+j<-1?hx('#fff0a0'):GOLD);rect(a,31,7,2,5,ALFG[1]);outlineAll(a,OUTL);});}
// Huerto de luz: un cantero de nácar con plantas cuyas flores son lamparitas de luz (doradas, rosadas y celestes).
function lightGardenArt(){return mkA(64,64,a=>{rect(a,4,46,56,12,ALFW[2]);rect(a,4,46,56,2,ALFW[3]);alfShade(a,46,46,14,12,0.82);rect(a,4,56,56,2,ALFW[0]);
  rect(a,7,43,50,4,SOIL[1]);for(let x=9;x<55;x+=5)a.set(x,44,SOIL[3]);
  for(const[x,y,c]of[[12,24,ALFG[2]],[22,14,ALFPK],[33,20,ALFCY],[43,12,ALFG[2]],[52,26,ALFPK]]){line(a,x,44,x,y+5,LEAF[2],2);
    ell(a,x-4,y+16,4,1.6,LEAF[3]);ell(a,x+4,y+11,4,1.6,LEAF[2]);ell(a,x,y,4.5,5.5,(i,j)=>{const d=Math.hypot(i/4.5,j/5.5);return d<0.4?ALFH:d<0.75?c:mulc(c,0.75);});rect(a,x-2,y+5,4,2,ALFW[1]);}
  outlineAll(a,OUTL);for(const[x,y]of[[17,6],[38,4],[58,14],[6,18]])a.set(x,y,ALFH);});}
// Condensador de fotones: un tanque de vidrio con cristales dorados adentro, entre dos brazos curvos que juntan la luz del aire
// por las puntas (las motitas que entran van aparte, ERA.deco).
function condenserArt(){return mkA(64,64,a=>{rect(a,10,54,44,7,ALFB[1]);rect(a,10,54,44,1,ALFB[3]);
  for(const s of[-1,1]){for(let k=0;k<=24;k++){const an=k/24*Math.PI*0.9,x=32+s*(8+Math.sin(an)*16),y=52-k*1.9;rect(a,Math.round(x)-1,Math.round(y),3,2,k>20?ALFG[2]:ALFW[s<0?3:1]);}
    ell(a,32+s*9,6,3,3,(i,j)=>i+j<0?ALFH:ALFG[2]);}
  rect(a,21,22,22,32,ALFS[2]);rect(a,21,22,4,32,ALFS[3]);rect(a,38,22,5,32,ALFS[1]);
  for(const[x,y,h]of[[25,52,12],[31,52,18],[37,52,10],[28,52,8],[34,52,7]])alfCrystal(a,x,y,h,3,0);
  rect(a,19,19,26,4,ALFW[1]);rect(a,19,19,26,1,ALFW[3]);rect(a,19,52,26,3,ALFW[1]);rect(a,30,14,4,6,ALFW[0]);outlineAll(a,OUTL);});}
// Catedral de luz: una fachada de nácar con dos torres de aguja, un portal en punta y un rosetón de vidrios de colores, y una
// estrella arriba de todo (el rosetón y la estrella laten, ERA.deco).
function lightCathedralArt(){return mkA(64,64,a=>{rect(a,14,24,36,34,ALFW[2]);alfShade(a,40,24,10,34,0.84);
  for(const x of[4,46]){rect(a,x,20,14,38,ALFW[2]);alfShade(a,x+9,20,5,38,0.8);poly(a,[[x-1,21],[x+7,2],[x+15,21]],(X)=>X<x+7?ALFG[2]:ALFG[1]);for(const y of[30,42])ell(a,x+7,y,2.5,4,(i,j)=>j<1?ALFS[2]:ALFS[1]);}
  poly(a,[[12,25],[32,8],[52,25]],(X)=>X<32?ALFW[3]:ALFW[1]);rect(a,31,0,2,9,ALFG[2]);rect(a,28,3,8,2,ALFG[2]);
  ell(a,32,29,9,9,(i,j)=>{const d=Math.hypot(i,j);if(d>8.2)return ALFG[1];if(d<2.2)return ALFH;return ALFRB[((Math.floor((Math.atan2(j,i)+Math.PI)/(Math.PI/3)))%6+6)%6];});
  for(let k=0;k<6;k++){const an=k*Math.PI/3;line(a,32,29,32+Math.cos(an)*8,29+Math.sin(an)*8,ALFG[1],1);}
  ell(a,32,48,7,8,(i,j)=>j<=0?ALFG[2]:null);rect(a,25,48,14,10,ALFG[2]);rect(a,31,42,2,16,ALFG[1]);ell(a,32,51,4,5,(i,j)=>j<0?ALFG[3]:ALFH);
  rect(a,2,57,60,3,ALFW[0]);outlineAll(a,OUTL);});}
const ALFVIL=[{c:'#ffd96a',C:'#d4a02a',j:'#40568a',y:'#3a2418'},{c:'#a8d4f4',C:'#6a9ac8',j:'#2a2a3a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#ff9ad8',C:'#c86aa8',j:'#4e4468',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:photonOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:lightHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),prisma:ideaPrismArt(),estabilizador:stabilizerArt(),espectro:spectrumMarketArt(),
  huertoluz:lightGardenArt(),condensador:condenserArt(),catedral:lightCathedralArt(),
  hero:[personArt({c:'#fff6c8',C:'#e0c870',j:'#40568a'},0),personArt({c:'#fff6c8',C:'#e0c870',j:'#40568a'},1)],vil:ALFVIL.map(p=>[personArt(p,0),personArt(p,1)])};
