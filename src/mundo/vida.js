// Era de la vida del mundo abierto (la que sigue a la alfa; en la fila de eras, "Vida"): el universo nuevo se llena de vida; esporas, arcos de limpieza y polizones que salen del bosque, se suben a la cabeza de tu gente y se comen lo que entrega; el Edén cósmico. Datos y arte de la era; las reglas están en motor.html y los polizones, en amenazas/polizones.js.
const ERA={
  n:21,name:'Era de la vida',short:'Vida',de:'de la era de la vida',obra:'el Edén cósmico',next:null,
  ore:{id:'espora',name:'Esporas',col:'#7fe0a0',empty:'Hongos sin esporas',gather:'esporas',icon:[['.kkkk...','kwggGk..','kgggGk..','kgGGGkk.','.kkkkwck','....kcCk','.....kk.','........'],{g:'#5fd88a',G:'#2f9a5a',c:'#5fc8f0',C:'#2f88b8',w:'#f0fff4'}]},
  storage:{id:'granero'},ideaBuild:'simbiosis',ideaTechs:['esporas','simbiosis'],boostTech:'ecosistema',farmBuild:'pradera',nightTech:'simbiosis',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','arbolsabio','arco','especies','pradera','hongar','simbiosis'],
  riders:true,defense:{id:'arco',r:4,label:'Arcos'},
  // El cuartel de esta era y su guardián (el motor le da el mismo invento y costo que a la defensa).
  guard:{kind:'cuidador',building:'Refugio de cuidadores',unit:'Cuidador',done:'Refugio de cuidadores abierto: llegó un cuidador',desc:'Trae un cuidador que sale solo, con su red, a bajarle los polizones a tu gente, a 8 casilleros o menos.',info:'Refugio de cuidadores: su cuidador le baja los polizones a tu gente cerca.',tip:'un refugio de cuidadores: el cuidador le baja los polizones a tu gente solo.'},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo20-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la era alfa',perks:[
    ['primeraluz','ideaMult',1.25,'La primera luz: ideas +25% durante toda la era'],
    ['cultivoluz','agri',1.25,'Cultivo de luz: granjas +25%'],
    ['catedral','speed',1.2,'Catedral de luz: te movés 20% más rápido']
  ]},
  techs:[
 {id:'esporas',name:'Esporas',cost:{espora:15,ideas:30},req:[],desc:'Desbloquea el árbol sabio, el nanotaller y la perforadora láser. Ideas +50%.'},
 {id:'limpieza',name:'Arcos de limpieza',cost:{madera:30,piedra:15,ideas:35},req:[],desc:'Desbloquea el arco de limpieza: limpia a la gente que trabaja cerca.'},
 {id:'trueque',name:'Feria de especies',cost:{espora:20,ideas:50},req:['esporas'],desc:'Desbloquea la feria de especies, que da monedas. Vienen 30% más polizones.'},
 {id:'pradera',name:'Pradera viva',cost:{madera:40,piedra:20,ideas:65},req:['esporas'],desc:'Desbloquea la pradera viva, que potencia las granjas.'},
 {id:'hongar',name:'Hongar de esporas',cost:{madera:60,espora:20,ideas:95},req:['trueque'],desc:'Desbloquea el hongar, que hace esporas solo.'},
 {id:'repelente',name:'Repelente',cost:{monedas:30,ideas:130},req:['limpieza','trueque'],desc:'Los polizones comen la mitad.'},
 {id:'simbiosis',name:'Templo de la simbiosis',cost:{monedas:55,ideas:340},req:['repelente','hongar'],desc:'Desbloquea el templo de la simbiosis. Ideas +50% y de noche ves más lejos.'},
 {id:'ecosistema',name:'Ecosistema',cost:{espora:70,monedas:55,ideas:450},req:['trueque','repelente'],desc:'Todo produce +50%.'},
 {id:'eden',name:'El Edén cósmico',cost:{piedra:130,espora:110,monedas:130,ideas:1000},req:['simbiosis','ecosistema'],desc:'Un jardín donde vive todo lo que nació en el universo nuevo. Cierra la era de la vida.'}],
  // Granja, fogata, aserradero, granero y cantera: el nombre y los textos dependen de la época y están en el motor (BASIC).
  builds:[
 {id:'casa',name:'Casa árbol',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa árbol lista: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',req:null,base:{madera:12,comida:4},grow:1.25,prod:{comida:0.2},noSand:true},
 {id:'fogata',req:null,base:{madera:5,piedra:4},grow:1.6,prod:{ideas:0.12}},
 {id:'aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,prod:{madera:0.12}},
 {id:'granero',req:null,base:{madera:25,piedra:15},grow:1.4},
 {id:'herreria',name:'Nanotaller',req:'esporas',base:{madera:25,piedra:20,espora:10},grow:1.6,done:'Nanotaller listo',desc:'Herramientas que se arman solas: los aldeanos y los robots juntan +30% por cada nanotaller.'},
 {id:'cantera',req:'esporas',base:{madera:20,espora:8},grow:1.35,prod:{piedra:0.12}},
 {id:'arbolsabio',name:'Árbol sabio',req:'esporas',base:{piedra:40,espora:10},grow:1.5,done:'Árbol sabio plantado',desc:'Un árbol viejísimo que piensa despacio y en voz alta: genera muchísimas ideas.',prod:{ideas:0.6}},
 {id:'arco',name:'Arco de limpieza',req:'limpieza',base:{madera:25,piedra:25,espora:5},grow:1.4,done:'Arco de limpieza listo',desc:'Una cortina de bruma: limpia a la gente que trabaja a 4 casilleros o menos y espanta a los polizones que se acercan.'},
 {id:'especies',name:'Feria de especies',req:'trueque',base:{madera:30,piedra:25,espora:5},grow:1.4,done:'Feria de especies abierta',desc:'Se cambian bichos y plantas de todos los rincones del universo nuevo: da muchas monedas.',prod:{monedas:0.45}},
 {id:'pradera',name:'Pradera viva',req:'pradera',base:{madera:35,piedra:30},grow:1.6,done:'Pradera viva sembrada',desc:'Flores, abejas y pasto que crece cantando: cada pradera hace rendir +50% a todas las granjas.'},
 {id:'hongar',name:'Hongar de esporas',req:'hongar',base:{madera:30,piedra:15,monedas:10},grow:1.4,done:'Hongar de esporas sembrado',desc:'Hongos gigantes que largan esporas: da esporas solo.',prod:{espora:0.12}},
 {id:'simbiosis',name:'Templo de la simbiosis',req:'simbiosis',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Templo de la simbiosis abierto',desc:'Donde todo lo vivo aprende a vivir junto: ideas +30% por cada templo.'}],
  info:{casa:'Casa árbol: acá viven 2 aldeanos, entre las ramas.',herreria:'Nanotaller: los aldeanos juntan más rápido.',arbolsabio:'Árbol sabio: genera ideas.',arco:'Arco de limpieza: limpia a la gente y espanta a los polizones a 4 casilleros o menos.',especies:'Feria de especies: da monedas.',pradera:'Pradera viva: potencia las granjas.',hongar:'Hongar de esporas: da esporas.',simbiosis:'Templo de la simbiosis: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['limpieza','arco','un arco de limpieza: limpia a tu gente y espanta a los polizones.']],
  tips2:[['esporas','arbolsabio','un árbol sabio: genera muchísimas ideas.'],['trueque','especies','una feria de especies para conseguir monedas.'],['pradera','pradera','una pradera viva: potencia las granjas.']],
  smogTip:'Más parques.',done:'Era de la vida completa.',
  // Por el arco de limpieza suben burbujas y lo cruza un brillo; del árbol sabio suben ideas, del hongar, esporas, y en la pradera
  // revolotean mariposas. En el templo late el símbolo de la simbiosis y en la feria salta un bicho en su terrario.
  deco:(o,px,py)=>{if(o.bug)return;const off=((px*3+py*5)%16)/16,t=st.time;
    if(o.t==='arco'){for(let k=0;k<4;k++){const u=(t*0.45+k/4+off)%1,x=px+5.2+k*1.9+Math.sin(u*7+k*2)*0.7,y=py+12.5-u*9;ctx.strokeStyle='rgba(220,250,255,'+(0.85*(1-u)).toFixed(2)+')';ctx.lineWidth=0.4;
        ctx.beginPath();ctx.arc(x,y,0.5+u*0.6,0,6.29);ctx.stroke();}
      const sh=(t*0.5+off)%2.4;if(sh<1){ctx.fillStyle='rgba(255,255,255,'+(0.5*(1-Math.abs(sh*2-1))).toFixed(2)+')';ctx.fillRect(px+4.5+sh*6,py+5,1.2,8);}}
    else if(o.t==='arbolsabio'){for(let k=0;k<3;k++){const u=(t*0.35+k/3+off)%1;ctx.fillStyle=(k%2?'rgba(127,216,240,':'rgba(127,224,160,')+(1-u).toFixed(2)+')';
        ctx.fillRect(px+4+k*3.5+Math.sin(u*6+k)*1.2,py+3-u*7,1,1);}}
    else if(o.t==='hongar'){for(let k=0;k<4;k++){const u=(t*0.5+k/4+off)%1;ctx.fillStyle=(k%2?'rgba(127,216,240,':'rgba(160,240,180,')+(0.9*(1-u)).toFixed(2)+')';
        ctx.fillRect(px+3+k*3.2+Math.sin(u*5+k*2)*1.4,py+4-u*8,0.8,0.8);}}
    else if(o.t==='pradera'){for(let k=0;k<2;k++){const an=t*(0.8+k*0.3)+k*3+off*6,x=px+8+Math.cos(an)*(4.5-k),y=py+6+Math.sin(an*1.7)*2-k*2,w=Math.abs(Math.sin(t*14+k*2))*1.2+0.3;
        ctx.fillStyle=k?'#ffe14a':'#ff8ac8';ctx.fillRect(x-w,y,w,1);ctx.fillRect(x+0.5,y,w,1);ctx.fillStyle='#1b1a24';ctx.fillRect(x,y,0.5,1);}}
    else if(o.t==='simbiosis'){const g=0.25+0.2*Math.sin(t*2+off*6);ctx.fillStyle='rgba(160,255,210,'+g.toFixed(2)+')';ctx.beginPath();ctx.arc(px+8,py+4,2.6,0,6.29);ctx.fill();}
    else if(o.t==='especies'){const u=(t*1.3+off)%1,h=Math.max(0,Math.sin(u*Math.PI))*1.6;ctx.fillStyle='#ffe14a';ctx.fillRect(px+3.2,py+9.4-h,1.2,1);ctx.fillStyle='#1b1a24';ctx.fillRect(px+3.6,py+9.4-h,0.4,0.4);}},
  text:{
    when:'Año 1.000.000',title:'La era de la vida',
    intro:'Con la primera luz, el universo nuevo se llena de vida: esporas que brillan, bosques que piensan y bichos de todas las formas. No toda es amiga: del bosque salen polizones, bichitos que se le suben a la cabeza a tu gente y se comen lo que entrega. Tocá a quien lo lleva para bajárselo, o poné arcos de limpieza. La meta: el Edén cósmico, un jardín para todo lo que nace.',
    news:'Novedades: esporas, arcos de limpieza y polizones. Un bichito sale del bosque y se le sube a la cabeza a alguien de tu gente: se come lo que entrega (se ve el número) y, cuando comió bastante, salta a otro. Tocá a quien lo lleva para espantarlo.',
    legacy:'Lo que trae tu ciudad de la era alfa',
    noLegacy:'No hay una era alfa terminada en este navegador: arrancás con 4 aldeanos y lo básico para juntar. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte; tocá un árbol, una piedra o unos hongos con esporas y va a buscarlo el aldeano más cercano. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope de la bóveda de estasis, lo que sobra se pierde. Del bosque salen polizones: se le suben a la cabeza a tu gente, se comen lo que entrega y, cuando comieron bastante, saltan a otro que esté cerca. Tocá a quien lo lleva (o al bichito) para espantarlo; si nadie lo toca, al rato se vuelve al bosque, lleno. Los arcos de limpieza limpian a la gente que trabaja cerca. En la compu: flechas o WASD.',
    win:'El Edén cósmico',winText:()=>'Terminaste el Edén cósmico en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Ahí crece de todo, y hasta los polizones tienen su rincón (lejos de tu gente).'}
};
/* ---------- arte de la era ---------- */
const VIGR=P4('#1f7a4a','#3aae6a','#7fe0a0','#e0fff0'),VICY=P4('#1f6a98','#3aa0d0','#7fd8f0','#e8fbff'),VIMOSS=P4('#243320','#34502a','#4a7036','#6a9446'),
  VIBARK=P4('#3a281c','#563c26','#7a5834','#9e7a4a'),VILEAF=P4('#1a5230','#2a7440','#44a052','#7ad064'),VIDEEP=P4('#163e3a','#1f5a50','#2e7e68','#52a888'),
  VISTONE=P4('#6a7468','#8e9a8a','#b4c0ac','#dae4d2'),VIPK=hx('#ff8ac8'),VIYEL=hx('#ffe14a'),VIVIO=hx('#b48cff'),VIW=hx('#ffffff'),VIDK=hx('#1b1a24');
// Pone a la sombra un rectángulo de lo pintado (el costado derecho de las paredes).
function vidaShade(a,x,y,w,h,k){for(let j=y;j<y+h;j++)for(let i=x;i<x+w;i++){const v=a.get(i,j);if(v)a.set(i,j,mulc(v,k));}}
// Una bolita de esporas que brilla: más clara arriba a la izquierda y con un punto blanco.
function vidaOrb(a,x,y,r,P){ell(a,x,y,r,r,(i,j)=>{const d=Math.hypot(i+r*0.35,j+r*0.35)/r;return d<0.35?P[3]:d<0.8?P[2]:i+j>r*0.6?P[0]:P[1];});a.set(x-r*0.4,y-r*0.45,VIW);}
// Una flor de cinco pétalos con el centro amarillo.
function vidaFlower(a,x,y,r,c){for(let k=0;k<5;k++){const an=k*1.2566-1.57;ell(a,x+Math.cos(an)*r,y+Math.sin(an)*r,r*0.75,r*0.75,c);}ell(a,x,y,r*0.6,r*0.6,VIYEL);}
// Matas de esporas: un montículo de musgo con bolitas verdes y celestes que brillan, de varios tamaños, y motas que flotan.
function vidaSporeOreArt(){return mkA(64,52,a=>{blob(a,[[32,44,12],[19,46,8],[45,46,9]],VIMOSS,null);
  for(const[x,y,r,c]of[[36,26,9,1],[22,31,7,0],[47,35,6,0],[29,41,5,1],[15,40,4,1],[41,43,4,0],[52,44,3,1]])vidaOrb(a,x,y,r,c?VICY:VIGR);
  for(let x=8;x<58;x++)for(let y=48;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);
  for(const[x,y,c]of[[26,14,VIGR[3]],[44,10,VICY[3]],[33,6,VIW],[53,22,VIGR[2]]]){a.set(x,y,c);a.set(x+1,y,c);a.set(x,y+1,c);a.set(x+1,y+1,c);}});}
// Árbol del bosque: más verde y frondoso que en las otras eras, con alguna flor.
function vidaTreeArt(){return mkA(64,84,a=>{rect(a,27,52,10,30,VIBARK[2]);rect(a,27,52,3,30,VIBARK[3]);rect(a,34,52,3,30,VIBARK[1]);rect(a,22,78,20,4,VIBARK[1]);rect(a,24,77,4,3,VIBARK[2]);rect(a,36,77,4,3,VIBARK[2]);
  blob(a,[[32,28,21],[17,36,14],[47,36,14],[24,46,12],[40,46,12],[32,13,15]],VILEAF,null);
  for(const[x,y,c]of[[20,30,VIPK],[42,22,VIYEL],[34,42,VIPK],[48,38,VIW],[26,14,VIYEL]])vidaFlower(a,x,y,1.6,c);outlineAll(a,LEAFL);});}
// Casa árbol: una cabaña de tablas sobre un tronco, metida entre las ramas, con ventanas redondas, una escalera y la copa arriba.
function vidaTreeHouseArt(){return mkA(64,64,a=>{blob(a,[[32,13,14],[15,19,10],[49,19,10],[23,6,8],[41,6,8]],VILEAF,null);
  rect(a,27,44,10,16,VIBARK[2]);rect(a,27,44,3,16,VIBARK[3]);rect(a,34,44,3,16,VIBARK[1]);poly(a,[[20,62],[27,52],[27,62]],VIBARK[1]);poly(a,[[44,62],[37,52],[37,62]],VIBARK[1]);
  for(let x=10;x<54;x++)for(let y=22;y<42;y++)a.set(x,y,((x-10)>>2)%2?WOOD[2]:WOOD[3]);vidaShade(a,44,22,10,20,0.8);
  poly(a,[[6,24],[32,12],[58,24]],(x,y)=>((x+y)>>2)&1?VILEAF[2]:VILEAF[1]);rect(a,8,23,48,2,VILEAF[0]);
  rect(a,27,30,10,12,VIBARK[0]);ell(a,32,30,5,4,(i,j)=>j<=0?VIBARK[0]:null);ell(a,35,36,1,1,VIYEL);
  for(const x of[17,47])ell(a,x,31,4,4,(i,j)=>Math.hypot(i,j)>3?WOOD[1]:i+j<0?hx('#fff0b0'):hx('#f0c060'));
  rect(a,6,42,52,3,WOOD[1]);rect(a,6,42,52,1,WOOD[3]);for(const x of[8,55])rect(a,x,36,2,6,WOOD[1]);rect(a,6,36,52,1,WOOD[2]);
  for(const x of[42,48])rect(a,x,45,1,17,WOOD[1]);for(let y=48;y<62;y+=4)rect(a,42,y,7,1,WOOD[3]);outlineAll(a,OUTL);});}
// Árbol sabio: un árbol viejísimo de tronco retorcido, con cara de dormido, barba de musgo y frutas que brillan (las ideas que
// suben van aparte, ERA.deco).
function vidaWiseTreeArt(){return mkA(64,64,a=>{blob(a,[[32,17,17],[13,24,11],[51,24,11],[21,8,10],[43,8,10]],VIDEEP,null);
  poly(a,[[14,62],[22,50],[24,30],[40,30],[42,50],[50,62]],(x,y)=>x<26?VIBARK[3]:x>38?VIBARK[1]:((x+(y>>3))%7<2?VIBARK[1]:VIBARK[2]));
  for(const[x0,y0,x1,y1]of[[24,34,16,26],[40,34,48,25]])line(a,x0,y0,x1,y1,VIBARK[2],3);
  for(const x of[27,37]){line(a,x-3,40,x,42,VIDK,1);line(a,x,42,x+3,40,VIDK,1);}poly(a,[[31,42],[33,42],[34,46],[30,46]],VIBARK[1]);
  poly(a,[[24,47],[40,47],[38,56],[35,52],[32,58],[29,52],[26,56]],(x,y)=>(x+y)%3?hx('#a8c8a0'):hx('#7e9e78'));
  for(const[x,y,c]of[[14,22,VICY],[26,12,VIGR],[41,16,VICY],[52,26,VIGR],[33,25,VIGR],[20,30,VICY],[46,6,VIGR]])vidaOrb(a,x,y,2.6,c);outlineAll(a,OUTL);});}
// Arco de limpieza: dos pilares de piedra clara con enredaderas y un arco arriba con una flor en la clave; adentro, una cortina
// de bruma celeste (las burbujas y el brillo que la cruza van aparte, ERA.deco).
function vidaArchArt(){return mkA(64,64,a=>{for(const x of[6,44])rect(a,x,54,14,8,VISTONE[1]);rect(a,6,54,52,2,VISTONE[3]);
  for(let x=16;x<48;x++)for(let y=14;y<55;y++){const d=Math.hypot((x-32)/16,(y-30)/18);if(y<30&&d>1)continue;a.set(x,y,((x>>1)+(y>>3))%3?VICY[2]:VICY[3]);}
  for(const x of[9,47]){rect(a,x,20,8,35,VISTONE[2]);rect(a,x,20,2,35,VISTONE[3]);rect(a,x+6,20,2,35,VISTONE[1]);}
  ell(a,32,30,24,22,(i,j)=>j>0||Math.hypot(i/16,j/18)<=1?null:i<-8?VISTONE[3]:i>8?VISTONE[1]:VISTONE[2]);
  for(const x0 of[9,47])for(let y=22;y<54;y+=6){line(a,x0,y,x0+8,y+4,VILEAF[1],1);ell(a,x0+(y%12?1:7),y+1,1.6,1.2,VILEAF[3]);}
  for(let k=0;k<7;k++){const an=Math.PI+k*Math.PI/6,x=32+Math.cos(an)*21,y=30+Math.sin(an)*20;ell(a,x,y,1.8,1.4,VILEAF[2]);}
  vidaFlower(a,32,8,3,VIPK);outlineAll(a,OUTL);for(const[x,y]of[[24,24],[38,34],[28,44],[40,20]])a.set(x,y,VIW);});}
// Feria de especies: un puesto con toldo a rayas verdes, dos terrarios con plantas y bichos de otros mundos y un cartel con una
// moneda (el bicho que salta va aparte, ERA.deco).
function vidaSpeciesFairArt(){return mkA(64,64,a=>{rect(a,4,40,56,18,WOOD[2]);rect(a,4,40,56,2,WOOD[3]);rect(a,46,42,14,16,WOOD[1]);for(let x=8;x<58;x+=8)rect(a,x,44,1,14,WOOD[1]);
  for(const x of[6,56])rect(a,x-1,16,3,26,WOOD[1]);
  poly(a,[[0,26],[6,14],[58,14],[64,26]],(x,y)=>((x>>2)&1)?(y<20?VIGR[2]:VIGR[1]):(y<20?hx('#f6fff0'):hx('#d8eed0')));for(let x=0;x<64;x+=8)ell(a,x+4,26,4,2.5,(i,j)=>j<0?null:((x>>3)&1?hx('#d8eed0'):VIGR[1]));
  for(const[x,c]of[[9,VIPK],[35,VIYEL]]){rect(a,x,28,20,13,hx('#bfe8f0'));rect(a,x,28,20,1,VIW);rect(a,x,28,1,13,VIW);rect(a,x,38,20,3,SOIL[2]);
    line(a,x+15,38,x+15,31,VILEAF[2],1);ell(a,x+13,32,2,1.2,VILEAF[3]);ell(a,x+17,33,2,1.2,VILEAF[2]);ell(a,x+7,36,3.5,2.5,c);a.set(x+6,35,VIDK);a.set(x+8,35,VIDK);}
  rect(a,24,2,16,11,WOOD[2]);rect(a,24,2,16,2,WOOD[3]);rect(a,31,0,2,3,WOOD[1]);ell(a,32,8,3.5,3.5,(i,j)=>i+j<-1?hx('#fff0a0'):GOLD);outlineAll(a,OUTL);});}
// Pradera viva: un cantero cercado de pasto alto con flores grandes de colores (las mariposas van aparte, ERA.deco).
function vidaMeadowArt(){return mkA(64,64,a=>{rect(a,4,46,56,14,SOIL[1]);rect(a,4,46,56,3,SOIL[2]);
  const r=mulberry32(7);for(let k=0;k<26;k++){const x=6+Math.floor(r()*52),h=10+Math.floor(r()*16),c=VILEAF[1+Math.floor(r()*3)];line(a,x,58,x+(r()<0.5?-2:2),58-h,c,2);}
  for(const[x,y,c,s]of[[14,30,VIPK,3.2],[30,24,VIYEL,3.6],[46,30,VIVIO,3.2],[22,40,VIW,2.4],[52,42,VIPK,2.4],[38,38,VICY[2],2.6]]){line(a,x,58,x,y+2,VILEAF[1],1);vidaFlower(a,x,y,s,c);}
  for(const x of[6,32,58])rect(a,x-1,50,3,11,WOOD[2]);rect(a,4,53,56,2,WOOD[3]);outlineAll(a,OUTL);});}
// Hongar de esporas: un tronco caído con tres hongos gigantes de sombrero verde y celeste con lunares (las esporas que suben van
// aparte, ERA.deco).
function vidaMushroomFarmArt(){return mkA(64,64,a=>{ell(a,32,54,27,7,(i,j)=>j<-3?VIBARK[3]:j<2?VIBARK[2]:VIBARK[1]);ell(a,57,54,4,6,(i,j)=>Math.hypot(i,j)<2.5?RING[1]:RING[2]);
  for(const[x,y,rx,ry,P]of[[14,36,8,5,VICY],[50,34,9,6,VIGR],[32,22,14,9,VIGR]]){rect(a,x-2,y,5,50-y,hx('#ece6d6'));rect(a,x+1,y,2,50-y,hx('#c8c0ae'));
    ell(a,x,y,rx,ry,(i,j)=>j>ry*0.35?null:j>0?P[0]:(i<-rx*0.3&&j<-ry*0.4)?P[3]:P[2]);
    for(const[u,v]of[[-0.45,-0.45],[0.2,-0.6],[0.5,-0.15],[-0.1,-0.1]])ell(a,x+u*rx,y+v*ry,Math.max(1,rx*0.12),Math.max(1,ry*0.14),hx('#f6fff8'));}
  outlineAll(a,OUTL);for(const[x,y,c]of[[24,8,VIGR[3]],[38,5,VICY[3]],[10,24,VICY[3]],[54,20,VIGR[3]]])a.set(x,y,c);});}
// Templo de la simbiosis: un templo de piedra clara con escalones y columnas con enredaderas, una cúpula de hojas y arriba el
// símbolo de dos anillos entrelazados, uno verde y uno celeste (su brillo late aparte, ERA.deco).
function vidaSymbiosisTempleArt(){return mkA(64,64,a=>{rect(a,4,56,56,6,VISTONE[1]);rect(a,4,56,56,1,VISTONE[3]);rect(a,8,52,48,4,VISTONE[2]);rect(a,8,52,48,1,VISTONE[3]);
  rect(a,10,30,44,22,VISTONE[2]);vidaShade(a,44,30,10,22,0.82);
  for(const x of[12,22,38,48]){rect(a,x,32,4,20,VISTONE[3]);for(let y=34;y<50;y+=5)a.set(x+((y>>2)&1?0:3),y,VILEAF[2]);}
  rect(a,27,38,10,14,VIDK);ell(a,32,38,5,4,(i,j)=>j<=0?VIDK:null);rect(a,28,46,8,1,VIGR[1]);
  ell(a,32,30,24,18,(i,j)=>j>0?null:((Math.atan2(j,i)*5|0)+((Math.hypot(i,j)/5)|0))%2?VILEAF[2]:(i<-6&&j<-6?VILEAF[3]:VILEAF[1]));rect(a,8,29,48,3,VISTONE[3]);
  for(const[x,P]of[[29,VIGR],[35,VICY]])ell(a,x,7,5.5,5.5,(i,j)=>{const d=Math.hypot(i,j);return d>5.2?null:d>3.2?(i+j<0?P[3]:P[2]):null;});
  for(let j=-5;j<=5;j++)for(let i=-6;i<=6;i++){const d=Math.hypot(i,j);if(d>3.2&&d<=5.2&&j>0&&Math.abs(i)<3)a.set(29+i,7+j,VIGR[2]);}
  outlineAll(a,OUTL);});}
const VIDAVIL=[{c:'#5aa866',C:'#3e8048',j:'#5a3a1e'},{c:'#e0a040',C:'#b07a20',j:'#2a2a3a',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#4ab0c8',C:'#2a8aa0',j:'#5a3a2a',y:'#8a5a2a'}];
const HS={tree:vidaTreeArt(),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:vidaSporeOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:epArt('fogata'),
  casa:vidaTreeHouseArt(),granja:epArt('granja'),aserradero:epArt('aserradero'),granero:epArt('granero'),herreria:epArt('herreria'),cantera:epArt('cantera'),arbolsabio:vidaWiseTreeArt(),arco:vidaArchArt(),
  especies:vidaSpeciesFairArt(),pradera:vidaMeadowArt(),hongar:vidaMushroomFarmArt(),simbiosis:vidaSymbiosisTempleArt(),
  hero:[personArt({c:'#eaf6e4',C:'#b4d4a8',j:'#2a3a2a'},0),personArt({c:'#eaf6e4',C:'#b4d4a8',j:'#2a3a2a'},1)],vil:VIDAVIL.map(p=>[personArt(p,0),personArt(p,1)])};
