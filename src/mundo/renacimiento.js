// Renacimiento del mundo abierto: plata, talleres, bancos, carabelas, langostas y palomares, y la pascalina. Datos y arte de la era; las reglas están en motor.html.
const ERA={
  n:4,name:'Renacimiento',de:'del Renacimiento',next:{file:'mundo5.html',to:'a la Industria'},
  ore:{id:'plata',name:'Plata',col:'#e3e8f0',empty:'Veta de plata agotada',gather:'plata',icon:[['........','........','..kkkkkk','.kvvvvQk','kqqqqqQk','kQQQQQkk','kkkkkkk.','........'],{q:'#c9d1dc',Q:'#8a93a3',v:'#ffffff'}]},
  storage:{id:'granero',name:'Granero'},ideaBuild:'academia',ideaTechs:['perspectiva','academias','telescopio'],boostTech:'mecanica',farmBuild:'jardin',nightTech:'telescopio',
  // Edificios que alumbran de noche (además de fogatas, casas y lo que tiene luz eléctrica).
  lights:['herreria','taller','puerto','academia'],
  // Mangas de langostas que llegan volando a comerse las granjas; el palomar las espanta a 4 casilleros (reglas en motor.html).
  locusts:true,defense:{id:'palomar',r:4,label:'Palomares',of:['granja']},
  // Lo que trae la gente de la era anterior: tope de aldeanos, ideas y monedas, y [invento, campo, valor, texto] por cada bono.
  legacy:{key:'rtagi-mundo3-v1',aldeanos:8,ideas:200,monedas:80,mudan:' aldeanos de tu ciudad se mudan con vos',de:'de la Edad Media',perks:[
    ['imprenta','ideaMult',1.25,'Imprenta: ideas +25% durante toda la era'],
    ['molinos','agri',1.25,'Molinos de viento: granjas +25%']
  ]},
  techs:[
 {id:'perspectiva',name:'Perspectiva',cost:{piedra:15,ideas:35},req:[],desc:'Desbloquea el taller de artistas, que genera muchas ideas. Ideas +50%.'},
 {id:'mineria',name:'Minería de plata',cost:{plata:15,ideas:30},req:[],desc:'Desbloquea la herrería y la cantera.'},
 {id:'banca',name:'Banca',cost:{plata:20,ideas:50},req:['mineria'],desc:'Desbloquea el banco, que cambia plata por monedas.'},
 {id:'botanica',name:'Botánica',cost:{madera:40,piedra:20,ideas:65},req:['perspectiva'],desc:'Desbloquea el jardín botánico, que potencia las granjas, y el palomar, que espanta las langostas.'},
 {id:'carabelas',name:'Carabelas',cost:{madera:60,plata:20,ideas:95},req:['banca'],desc:'Desbloquea el puerto: barcos que cruzan el océano.'},
 {id:'academias',name:'Academias',cost:{monedas:30,ideas:130},req:['perspectiva','banca'],desc:'Desbloquea la academia. Ideas +50%.'},
 {id:'telescopio',name:'Telescopio',cost:{monedas:45,ideas:270},req:['carabelas','academias'],desc:'Mirar el cielo de cerca: ideas +50%. De noche ves más lejos.'},
 {id:'mecanica',name:'Mecánica de precisión',cost:{plata:60,monedas:45,ideas:320},req:['mineria','academias'],desc:'Engranajes finos: todos los edificios producen +50%.'},
 {id:'pascalina',name:'Pascalina',cost:{piedra:110,plata:90,monedas:100,ideas:650},req:['telescopio','mecanica'],desc:'La primera calculadora: engranajes que suman solos. Cierra el Renacimiento.'}],
  builds:[
 {id:'casa',name:'Casa',req:null,base:{madera:20,piedra:10},grow:1.35,done:'Casa construida: llegaron 2 aldeanos',desc:'Suma 2 aldeanos que juntan recursos solos. Cada aldeano come 2 de comida por minuto.'},
 {id:'granja',name:'Granja',req:null,base:{madera:12,comida:4},grow:1.25,done:'Granja lista',desc:'Produce comida sola.',prod:{comida:0.2},noSand:true},
 {id:'fogata',name:'Fogata',req:null,base:{madera:5,piedra:4},grow:1.6,done:'Fogata encendida',desc:'Genera ideas y alumbra de noche. Comer cerca rinde el doble.',prod:{ideas:0.12}},
 {id:'aserradero',name:'Aserradero',req:null,base:{madera:10,piedra:12},grow:1.35,done:'Aserradero listo',desc:'Produce madera solo.',prod:{madera:0.12}},
 {id:'granero',name:'Granero',req:null,base:{madera:25,piedra:15},grow:1.4,done:'Granero construido',desc:'+150 de capacidad para cada recurso. Las ideas no tienen límite.'},
 {id:'herreria',name:'Herrería',req:'mineria',base:{madera:25,piedra:20,plata:10},grow:1.6,done:'Herrería lista',desc:'Herramientas mejores: vos y los aldeanos juntan +30% por cada herrería.'},
 {id:'cantera',name:'Cantera',req:'mineria',base:{madera:20,plata:8},grow:1.35,done:'Cantera lista',desc:'Produce piedra sola.',prod:{piedra:0.12}},
 {id:'taller',name:'Taller de artistas',req:'perspectiva',base:{piedra:40,plata:10},grow:1.5,done:'Taller abierto',desc:'Pintores e inventores trabajan juntos: genera muchas ideas.',prod:{ideas:0.35}},
 {id:'banco',name:'Banco',req:'banca',base:{madera:30,piedra:15,plata:5},grow:1.4,done:'Banco abierto',desc:'Cambia plata por monedas. Si no hay plata, se frena.',prod:{monedas:0.2},use:{plata:0.1}},
 {id:'jardin',name:'Jardín botánico',req:'botanica',base:{madera:35,piedra:30},grow:1.6,done:'Jardín plantado',desc:'Papa y maíz de América: cada jardín hace producir +50% a todas las granjas.'},
 {id:'palomar',name:'Palomar',req:'botanica',base:{madera:20,piedra:25,plata:5},grow:1.4,done:'Palomar listo',desc:'Las palomas espantan las langostas que pasan a 4 casilleros.'},
 {id:'puerto',name:'Puerto',req:'carabelas',base:{madera:40,plata:20},grow:1.5,done:'Puerto abierto',desc:'Va pegado al agua. Las carabelas traen monedas e ideas.',prod:{monedas:0.2,ideas:0.1},water:'El puerto tiene que ir pegado al agua.'},
 {id:'academia',name:'Academia',req:'academias',base:{madera:30,piedra:35,monedas:25},grow:1.6,done:'Academia abierta',desc:'Ideas +30% por cada academia.'}],
  info:{casa:'Casa: acá viven 2 aldeanos.',granja:'Granja: produce comida.',fogata:'Fogata: genera ideas. Comer cerca rinde el doble.',aserradero:'Aserradero: produce madera.',granero:'Granero: más capacidad.',herreria:'Herrería: juntás más rápido.',cantera:'Cantera: produce piedra.',taller:'Taller de artistas: genera ideas.',banco:'Banco: cambia plata por monedas.',palomar:'Palomar: espanta las langostas a 4 casilleros.',jardin:'Jardín botánico: potencia las granjas.',puerto:'Puerto: trae monedas e ideas.',academia:'Academia: más ideas.'},
  // Pistas: las de tips1 van antes del humo espeso; las de tips2, después de "granero lleno".
  tips1:[['botanica','palomar','un palomar cerca de las granjas: espanta las langostas.']],
  tips2:[['perspectiva','taller','un taller de artistas: genera muchas ideas.'],['banca','banco','un banco para conseguir monedas.'],['carabelas','puerto','un puerto pegado al agua.']],
  smogTip:'',done:'Renacimiento completo.',
  // Dos palomas dan vueltas alrededor de cada palomar.
  deco:(o,px,py)=>{if(o.t!=='palomar')return;ctx.fillStyle='#f6f1e4';for(let k=0;k<2;k++){const an=st.time*1.4+k*Math.PI+px*0.1,x=px+8+Math.cos(an)*7,y=py-1+Math.sin(an)*2.5,up=Math.floor(st.time*8+k)%2;
    ctx.fillRect(x-1,y-0.4,2,0.8);ctx.fillRect(x-0.4,y-0.4-(up?0.9:-0.5),0.8,0.9);}},
  text:{
    when:'1450 d.C.',title:'El Renacimiento',
    intro:'Tu ciudad despierta. Hay plata en las colinas, artistas que dibujan en perspectiva, bancos que prestan y carabelas que cruzan el océano. Pero en el campo hay plaga: mangas de langostas que llegan volando a comerse tus granjas y tapan todo lo que tienen alrededor. La meta: construir la pascalina, la primera máquina que suma sola.',
    news:'Novedades: plata, talleres de artistas, bancos, jardines botánicos, academias y langostas: una manga posada en una granja no deja producir nada a 2 casilleros y se come tu comida. Tocalas para espantarlas; los palomares las espantan solos. Conviene poner las granjas lejos de los talleres y los bancos.',
    legacy:'Lo que trae tu ciudad de la Edad Media',
    noLegacy:'No hay una Edad Media terminada en este navegador: arrancás con 2 aldeanos. Podés cargar un código de progreso desde la pantalla de eras.',
    menu:'Tocá para moverte y juntar. Los edificios producen solos; las casas suman aldeanos que comen 2 de comida por minuto. Si un recurso llega al tope del granero, lo que sobra se pierde. Llegan mangas de langostas volando hacia las granjas: mientras comen, nada de lo que tapan produce y se comen la comida guardada. Tocalas para espantarlas; los palomares espantan las que pasan cerca. En la compu: flechas o WASD, E para juntar, F para comer.',
    win:'Renacimiento superado',winText:()=>'Terminaste la pascalina en el día '+(Math.floor(st.time/DAY)+1)+' con '+vil.length+' aldeanos y '+Object.values(counts).reduce((a,b)=>a+b,0)+' edificios. Las máquinas ya saben sumar.',
    winNote:'Tu ciudad, tus ideas y tus monedas pasan a la Industria.'}
};

/* ---------- arte de la era ---------- */
const OCH=P4('#a8743a','#c9944f','#ddb06a','#ecc98a'),GRN=hx('#3f6b4a'),SILV=P4('#8a93a3','#c9d1dc','#eef2f7','#ffffff');
function silverOreArt(){return mkA(64,52,a=>{blob(a,[[32,32,17],[20,38,12],[45,38,13],[30,22,11]],P4('#3e4250','#4f5462','#6d7280','#8a8f9c'),null);
  const on=(x,y,c)=>{if(a.get(x,y))a.set(x,y,c);};
  for(const[x0,y0,x1,y1]of[[13,37,25,29],[25,29,34,31],[34,31,47,23],[21,45,35,39],[35,39,51,41],[28,17,33,24]]){const n=Math.ceil(Math.hypot(x1-x0,y1-y0))*2;for(let k=0;k<=n;k++){const x=x0+(x1-x0)*k/n,y=y0+(y1-y0)*k/n;on(x,y,SILV[1]);on(x,y+1,SILV[0]);}}
  for(const[x,y]of[[25,29],[40,27],[18,34],[35,39],[46,41],[31,21]]){if(!a.get(x,y))continue;on(x,y,SILV[3]);on(x-1,y,SILV[2]);on(x+1,y,SILV[2]);on(x,y-1,SILV[2]);on(x,y+1,SILV[2]);}
  for(let x=8;x<58;x++)for(let y=44;y<52;y++)if(a.get(x,y))a.set(x,y,mulc(a.get(x,y),0.8));outlineAll(a,OUTL);});}
// Casa con revoque ocre, tejado bajo de tejas y postigos verdes.
function palazzoArt(){return mkA(64,64,a=>{rect(a,8,26,48,34,OCH[2]);rect(a,46,26,10,34,OCH[1]);
  rect(a,44,6,5,10,TERRA[1]);rect(a,43,5,7,2,TERRA[0]);
  poly(a,[[12,14],[52,14],[60,26],[4,26]],(x,y)=>(x&3)===0?TERRA[1]:((y>>1)&1)?TERRA[2]:TERRA[3]);rect(a,4,25,56,2,TERRA[0]);
  rect(a,6,27,52,2,PLAST[3]);rect(a,6,29,50,1,OCH[0]);
  for(const x of[13,28,43]){rect(a,x,33,7,10,DKW);ell(a,x+3,33,3.5,3,(i,j)=>j<=0?DKW:null);rect(a,x-2,32,2,11,GRN);rect(a,x+7,32,2,11,GRN);rect(a,x-1,43,9,1,PLAST[3]);}
  rect(a,8,46,48,2,PLAST[2]);
  rect(a,27,51,10,9,WOOD[1]);ell(a,32,51,5,4,(i,j)=>j<=0?WOOD[1]:null);rect(a,32,48,1,12,WOOD[0]);
  for(const x of[13,44]){rect(a,x,51,7,6,DKW);rect(a,x,51,7,1,PLAST[3]);}
  outlineAll(a,OUTL);});}
// Taller de artistas: arco abierto con un caballete y un cartel con la paleta.
function workshopArt(){return mkA(64,64,a=>{const DK=hx('#3a2a22');rect(a,6,28,52,32,PLAST[1]);rect(a,46,28,12,32,PLAST[0]);gable(a,2,62,10,28,TERRA);
  ell(a,32,21,3.5,3.5,DKW);ell(a,32,21,1.5,1.5,hx('#ffd35a'));
  rect(a,8,40,32,20,PLAST[3]);ell(a,24,40,16,11,(i,j)=>j<=0?PLAST[3]:null);rect(a,10,40,28,20,DK);ell(a,24,40,14,9,(i,j)=>j<=0?DK:null);
  line(a,19,58,23,38,WOOD[3],2);line(a,29,58,25,38,WOOD[3],2);line(a,24,46,24,58,WOOD[2],1);
  rect(a,17,35,14,11,WOOD[0]);rect(a,18,36,12,9,hx('#7ea6dc'));rect(a,18,41,12,4,hx('#58963f'));ell(a,26,38,1.5,1.5,hx('#ffd35a'));rect(a,20,40,3,2,hx('#3c6b2e'));rect(a,16,46,16,2,WOOD[2]);
  rect(a,42,33,13,2,WOOD[1]);rect(a,45,35,1,3,WOOD[0]);rect(a,52,35,1,3,WOOD[0]);
  ell(a,48.5,42,7,4.5,hx('#d4ae62'));ell(a,52,43,1.4,1.2,DK);rect(a,44,40,2,2,RED);rect(a,47,39,2,2,hx('#4a78b8'));rect(a,50,39,2,2,hx('#3c6b2e'));rect(a,45,43,2,2,hx('#f6f1e4'));
  rect(a,44,50,8,8,DKW);rect(a,44,50,8,1,PLAST[3]);outlineAll(a,OUTL);});}
// Banco: palacio de piedra almohadillada, cornisa pesada, columnas y una moneda en el frontón.
function bankArt(){return mkA(64,64,a=>{const RS=P4('#7a6a52','#958468','#ad9c7e','#c4b496');
  for(let y=20;y<60;y++)for(let x=4;x<60;x++){const row=((y-20)/7)|0,bx=(x-4+(row&1)*6)%12,by=(y-20)%7;a.set(x,y,(bx===0||by===6)?RS[0]:(bx===1||by===0)?RS[3]:x>48?RS[1]:RS[2]);}
  rect(a,2,12,60,2,TERRA[1]);rect(a,2,14,60,4,MARBLE[3]);rect(a,2,18,60,2,MARBLE[1]);for(let x=4;x<60;x+=4)rect(a,x,18,2,2,MARBLE[2]);
  for(const x of[9,47]){rect(a,x,26,8,12,DKW);ell(a,x+3.5,26,4,4,(i,j)=>j<=0?DKW:null);rect(a,x+3,23,2,15,RS[2]);rect(a,x-1,38,10,2,MARBLE[2]);}
  columns(a,[20,38],40,60,MARBLE);rect(a,18,36,28,4,MARBLE[2]);poly(a,[[32,26],[47,36],[17,36]],(x,y)=>x<32?MARBLE[3]:MARBLE[2]);
  ell(a,32,32,3.5,3.5,GOLD);ell(a,32,32,2,2,hx('#ffd35a'));rect(a,32,30,1,4,hx('#b8862a'));
  rect(a,26,42,12,18,WOOD[0]);ell(a,32,42,6,5,(i,j)=>j<=0?WOOD[0]:null);rect(a,27,44,4,16,WOOD[1]);rect(a,33,44,4,16,WOOD[1]);
  rect(a,4,52,14,2,WOOD[3]);rect(a,5,54,2,6,WOOD[1]);rect(a,15,54,2,6,WOOD[1]);
  for(let k=0;k<3;k++){rect(a,6,50-k*2,4,2,k%2?hx('#ffd35a'):GOLD);rect(a,12,50-k*2+2,4,2,k%2?SILV[2]:SILV[1]);}
  outlineAll(a,OUTL);});}
// Jardín botánico: setos, canteros con flores, papa y maíz, y una fuente en el medio.
function gardenArt(){return mkA(64,64,a=>{const GRAV=P4('#a89466','#c2ad7c','#d9c48f','#e6d5a6'),HED=P4('#1f4a24','#2a6030','#3a7a3c','#55963f');
  for(let y=8;y<60;y++)for(let x=2;x<62;x++)a.set(x,y,hash(x,y,7)<0.18?GRAV[1]:GRAV[2]);
  rect(a,2,8,60,4,HED[2]);rect(a,2,8,60,1,HED[3]);rect(a,2,56,60,4,HED[1]);rect(a,2,59,60,1,HED[0]);rect(a,2,8,4,52,HED[2]);rect(a,58,8,4,52,HED[1]);rect(a,28,56,8,4,GRAV[2]);
  const bed=(x0,y0,kind)=>{rect(a,x0-1,y0-1,22,18,STONE2[2]);rect(a,x0,y0,20,16,SOIL[1]);
    for(let y=y0+3;y<y0+16;y+=5)for(let x=x0+2;x<x0+19;x+=4){
      if(kind===0){rect(a,x,y,1,2,BLADE[1]);ell(a,x,y-1,1.4,1.2,[RED,hx('#ffd35a'),hx('#f08a7c')][(x+y)%3]);}
      else if(kind===1){rect(a,x,y-4,1,6,BLADE[1]);a.set(x-1,y-2,BLADE[2]);a.set(x+1,y-1,BLADE[2]);rect(a,x+1,y-4,1,2,hx('#ecd67e'));}
      else if(kind===2){ell(a,x,y,1.8,1.4,LEAF[2]);a.set(x,y-1,hx('#f6f1e4'));}
      else{rect(a,x,y,1,2,BLADE[1]);ell(a,x,y-1,1.4,1.2,[hx('#8a5ac8'),hx('#f6f1e4')][(x>>2)&1]);}}};
  bed(7,14,0);bed(37,14,1);bed(7,38,2);bed(37,38,3);
  ell(a,32,34,7,5,MARBLE[2]);ell(a,32,34,5.5,3.8,SHL[1]);ell(a,31,33,2,1,SHL[2]);rect(a,31,27,2,7,MARBLE[3]);ell(a,32,27,2,1,MARBLE[3]);a.set(30,29,FOAM);a.set(34,30,FOAM);a.set(29,31,FOAM);a.set(35,32,FOAM);
  });}
// Puerto con una carabela: velas cuadradas con cruz roja y vela latina atrás.
function caravelArt(){return mkA(64,64,a=>{rect(a,0,48,64,8,WOOD[2]);for(let x=0;x<64;x+=6)rect(a,x,48,1,8,WOOD[1]);rect(a,0,48,64,2,WOOD[3]);for(const x of[4,30,56])rect(a,x,56,4,8,WOOD[1]);
  rect(a,22,4,2,30,WOOD[0]);rect(a,40,8,2,26,WOOD[0]);rect(a,54,12,1,20,WOOD[0]);
  poly(a,[[2,32],[62,30],[54,46],[10,46]],(x,y)=>y<36?WOOD[3]:y<41?WOOD[2]:WOOD[1]);rect(a,46,26,14,5,WOOD[2]);rect(a,46,26,14,1,WOOD[3]);rect(a,4,29,10,3,WOOD[2]);
  rect(a,8,36,48,1,hx('#d4ae62'));for(let x=14;x<50;x+=7)rect(a,x,39,2,2,WOOD[0]);
  const sail=(x0,y0,w,h)=>{for(let j=0;j<h;j++){const b=Math.round(Math.sin(j/(h-1)*Math.PI)*2);for(let i=-b;i<w+b;i++)a.set(x0+i,y0+j,i>w*0.6?PLAST[2]:PLAST[3]);}
    const cx=x0+(w>>1);rect(a,cx-1,y0+2,3,h-4,RED);rect(a,x0+2,y0+(h>>1)-1,w-4,3,RED);};
  sail(13,8,20,18);sail(33,12,16,14);poly(a,[[55,12],[55,28],[62,26]],PLAST[3]);poly(a,[[24,3],[30,5],[24,7]],RED);
  outlineAll(a,OUTL);});}
// Academia: cúpula de tejas con nervios blancos y linterna, fachada de mármol con franjas verdes.
function domeArt(){return mkA(64,64,a=>{rect(a,6,38,52,22,MARBLE[2]);rect(a,46,38,12,22,MARBLE[1]);for(const x of[6,18,44,56])rect(a,x,38,2,22,GRN);rect(a,6,38,52,2,GRN);rect(a,4,36,56,2,MARBLE[3]);
  rect(a,16,28,32,8,MARBLE[2]);rect(a,40,28,8,8,MARBLE[1]);for(const x of[22,32,42])ell(a,x,32,2,2,DKW);rect(a,14,26,36,2,MARBLE[3]);
  ell(a,32,26,15,16,(i,j)=>{if(j>0)return null;const lat=Math.sqrt(Math.max(0,1-(j/16)**2));if(Math.abs(i)<=0.5||Math.abs(Math.abs(i)-11.5*lat)<=0.6)return MARBLE[3];
    const l=-i/15*0.6-j/16*0.3+dith(i+32,j+26)*0.25;return TERRA[l>0.35?3:l>0?2:l>-0.3?1:0];});
  rect(a,29,6,6,5,MARBLE[3]);rect(a,33,6,2,5,MARBLE[1]);poly(a,[[32,1],[36,6],[28,6]],TERRA[1]);ell(a,32,1,1.5,1.5,GOLD);
  rect(a,27,46,10,14,WOOD[0]);ell(a,32,46,5,4,(i,j)=>j<=0?WOOD[0]:null);rect(a,32,44,1,16,WOOD[1]);
  for(const x of[10,48]){rect(a,x,44,6,8,DKW);ell(a,x+3,44,3,3,(i,j)=>j<=0?DKW:null);}
  outlineAll(a,OUTL);});}
// Palomar: torre redonda encalada sobre zócalo de piedra, nidos en dos filas, techo cónico de tejas y palomas en la cornisa.
function dovecoteArt(){return mkA(64,64,a=>{for(let y=22;y<60;y++)for(let x=16;x<48;x++){const u=(x-16)/31;a.set(x,y,u>0.78?PLAST[0]:u>0.55?PLAST[1]:u<0.12?PLAST[2]:PLAST[3]);}
  stoneWall(a,16,52,32,8);rect(a,14,36,36,2,STONE2[2]);rect(a,14,38,36,1,STONE2[0]);
  for(const y of[27,42])for(let x=19;x<46;x+=5){rect(a,x,y,3,3,DKW);ell(a,x+1,y,1.5,1,(i,j)=>j<=0?DKW:null);}
  poly(a,[[32,4],[52,22],[12,22]],(x,y)=>x<30?TERRA[2]:((y>>1)&1)?TERRA[1]:TERRA[2]);rect(a,12,21,40,2,TERRA[0]);
  rect(a,29,2,6,5,PLAST[3]);rect(a,30,3,1,3,DKW);rect(a,33,3,1,3,DKW);poly(a,[[32,0],[36,3],[28,3]],TERRA[1]);
  rect(a,28,48,8,12,WOOD[1]);ell(a,32,48,4,3,(i,j)=>j<=0?WOOD[1]:null);rect(a,32,47,1,13,WOOD[0]);
  const dove=(x,y)=>{ell(a,x,y,2.6,1.6,hx('#f6f1e4'));ell(a,x-2.2,y-1,1.3,1.2,hx('#f6f1e4'));a.set(x-3,y-1,hx('#e8a040'));a.set(x+1,y-1,hx('#c9c4b8'));};
  dove(20,34);dove(43,34);dove(24,19);
  outlineAll(a,OUTL);});}
const VILPAL2=[{c:'#7a2a3a',C:'#541c28',j:'#d4ae62',y:'#3a2418'},{c:'#2f5a4a',C:'#1f4034',j:'#e3ddcc',y:'#23160f',p:'#c98a5e',P:'#9a6440'},{c:'#b5823b',C:'#8a5f28',j:'#4a2e6a',y:'#8a5a2a'}];
const HS={tree:treeArt(LEAF,false,false),stump:stumpArt(false),rock:rockArt(ROCK,false),rubble:rubbleArt(),ore:silverOreArt(),bush:bushArt('B'),bushE:bushArt('E'),fogata:[fireArt(0),fireArt(1)],
  casa:palazzoArt(),granja:granjaArt(),aserradero:sawmillArt(),granero:barnArt(),herreria:forgeArt(),cantera:quarryArt(),taller:workshopArt(),banco:bankArt(),jardin:gardenArt(),puerto:caravelArt(),academia:domeArt(),palomar:dovecoteArt(),
  hero:[personArt({c:'#a8322e',C:'#7a2220',j:'#e8c05a'},0),personArt({c:'#a8322e',C:'#7a2220',j:'#e8c05a'},1)],vil:VILPAL2.map(p=>[personArt(p,0),personArt(p,1)])};
