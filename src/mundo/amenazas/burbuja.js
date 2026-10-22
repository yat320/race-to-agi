// La burbuja de la IA (octubre de 2026, Juani: "sí, armá la burbuja en la era IA", después de charlar si la gente que invierte
// en IA, recupera la inversión y reinvierte arma una burbuja; y del otro lado, que las empresas con ingresos de verdad pueden
// absorber la pérdida). No es una amenaza: usa los mismos ganchos. Se prende con `burbuja:{tech, of, los, respaldo}` en la era
// (la IA) y trae:
// - Con el invento `tech` (el software en la nube, el que trae las monedas) y tu primera empresa (el de `of` que da monedas)
//   llegan los inversores y la IA se pone de moda: se arma una burbuja que flota sobre tu empresa de software y crece cada vez
//   más rápido (burbG: ×1,5 al minuto, ×2,9 a los dos). Nunca revienta antes de BURB_SAFE s (la primera de la era, antes de
//   BURB_SAFE1: es la que te enseña); después, cada vez es más fácil (burbHaz): a los dos minutos ya reventaron 6 de cada 10,
//   y a los BURB_MAX s revienta seguro.
// - Tocás la burbuja o su fila del HUD y ponés monedas: lo que pusiste crece con ella. Vendés cuando quieras (lo que no entra en
//   el depósito queda adentro) y podés volver a poner: invertir, recuperar y reinvertir.
// - Cuando revienta, recuperás la mitad de lo que pusiste. Si lo que perdés es más que tu respaldo (lo que ganan en monedas tus
//   edificios en BURB_BACK s, burbBack), hay crisis: los edificios de `of` (centros de datos, empresas y laboratorios) paran
//   BURB_CRISIS s (gancho `off` del motor). Con ingresos de verdad detrás, la pérdida se absorbe y no pasa nada más.
// - Después de reventar el mercado se calma BURB_CALM s y se arma otra.
// Tiene su propio azar (burbRnd, sembrado con el reloj del juego) para no cambiar el del resto: sin invertir, la partida es la
// misma que sin burbuja. Se guarda con la partida (`burbuja`): en qué va, lo puesto, lo que vale y la crisis.
const BURB=Object.assign({tech:null,of:[],los:'tus edificios',respaldo:'empresas'},ERA.burbuja||{});
const BURB_FIRST=8,BURB_CALM=45,BURB_SAFE=20,BURB_SAFE1=45,BURB_TH=120,BURB_MAX=240,BURB_BACK=120,BURB_CRISIS=45,BURB_STEP=10;
// En qué va (off antes del invento, calma o euforia), el reloj de la calma, la edad de la burbuja, lo que pusiste (M) y en
// cuántas partes (S: lo que vale es S × burbG), la crisis, las ventas con ganancia (la meta del capítulo) y si ya la abriste.
let burbF='off',burbT=0,burbA=0,burbM=0,burbS=0,burbCri=0,burbWins=0,burbSeen=false,burbAt=-1,burbBoom=null,burbRnd=Math.random,burbWonDone=false,
  burbBotT=0,burbBotN=-1,burbBotG=1,burbBotA=0;
// n: burbujas que se armaron, pops: que reventaron, put: monedas puestas, sold: ventas, gain: lo ganado (o perdido) en
// total, crisis: cuántas hubo y log: las primeras 30 cosas que pasaron ([segundo, qué, monedas]), para el reporte del bot.
const burbStats={n:0,pops:0,put:0,sold:0,gain:0,crisis:0,log:[]};
const burbLog=(k,n)=>{if(burbStats.log.length<30)burbStats.log.push([Math.round(st.time),k,Math.round(n||0)]);};
// Cuánto creció desde que se armó (sube más rápido cuanto más dura) y cuánto valen tus partes.
const burbG=a=>Math.exp(0.004*a+0.00004*a*a);
const burbV=()=>burbS*burbG(burbA);
// La chance de reventar por segundo (como una vida de Weibull de forma 2 y escala BURB_TH: crece con la edad).
const burbHaz=a=>a<(burbStats.n>1?BURB_SAFE:BURB_SAFE1)?0:2*a/(BURB_TH*BURB_TH);
const burbPct=G=>'+'+Math.floor((G-1)*100)+'%';
// El respaldo: lo que tus edificios ganan en monedas en BURB_BACK segundos (los ingresos de verdad, no lo de la burbuja).
const burbBack=()=>{const e=economy();return Math.max(0,e.pr.monedas-e.us.monedas)*BURB_BACK;};
const burbCoin=()=>'<img class="px" alt="monedas" style="vertical-align:-3px" src="'+ICON.monedas+'">';
// Llegan los inversores: con el invento y una empresa (cualquiera de `of` que dé monedas, también una que vino de otra era).
const burbReady=()=>!!BURB.tech&&!!st.techs[BURB.tech]&&BURB.of.some(id=>BUILD[id]&&BUILD[id].prod&&BUILD[id].prod.monedas&&counts[id]>0);
function burbSeed(){burbRnd=mulberry32(((Math.floor(st.time*977)|0)^Math.imul(burbStats.n+1,7919))+12345);}
// Dónde flota: sobre la empresa (el de `of` que da monedas) más cerca del centro logístico; si no hay, sobre otro de `of` o
// sobre el centro logístico.
function burbPlace(){let ci=obj.findIndex(o=>o&&o.t===ERA.storage.id);if(ci<0)ci=obj.findIndex(o=>o&&o.t==='casa');const[cx,cy]=ci<0?tileOf(P):[ci%MW,(ci/MW)|0];
  let best=-1,bd=1e9;obj.forEach((o,i)=>{const b=o&&BURB.of.includes(o.t)&&BUILD[o.t];if(!b)return;const d=Math.hypot(i%MW-cx,((i/MW)|0)-cy)+(b.prod&&b.prod.monedas?0:100);if(d<bd){bd=d;best=i;}});
  burbAt=best>=0?best:ci>=0?ci:cy*MW+cx;}
// El radio y el centro, en píxeles del mundo: crece hacia arriba desde el techo del edificio y se mece.
const burbR=G=>5+8*Math.log(G);
function burbXY(r,t){const x=burbAt%MW,y=(burbAt/MW)|0;return[x*T+8,y*T-3-r+(t==null?0:Math.sin(t*1.4)*1.2)];}
function burbStart(){burbF='euforia';burbA=0;burbStats.n++;burbSeed();burbPlace();burbLog('arma');
  toast(burbStats.n===1&&!burbSeen?'La IA está de moda: se armó una burbuja. Tocala para invertir.':'Se armó otra burbuja de la IA.');}
function burbPut(n){n=Math.floor(Math.min(n,st.res.monedas));if(burbF!=='euforia'||n<1)return false;
  st.res.monedas-=n;burbM+=n;burbS+=n/burbG(burbA);burbStats.put+=n;burbSeen=true;burbLog('pone',n);const r=burbR(burbG(burbA)),[x,y]=burbXY(r);float((x-8)/T,(y+r)/T,'-'+n+' monedas',RCOL.monedas);save();return true;}
// Vender: todo lo que entra en el depósito (lo que no entra queda adentro; si lo que queda es menos de una moneda, se va
// igual). Con `auto` (la era terminada), sin avisos y sin guardar: lo guarda el que la llamó.
const burbRoom=()=>Math.max(0,cap('monedas')-st.res.monedas);
function burbSell(auto){if(burbF!=='euforia'||burbS<=0)return false;const V=burbV(),q=Math.min(V,burbRoom());
  if(q<0.5&&V>=0.5){if(!auto)toast('No entran más monedas: hacé lugar antes de vender.');return false;}
  const all=V-q<1,f=all?1:q/V,m=burbM*f,g=q-m;if(all){burbS=0;burbM=0;}else{burbS*=1-f;burbM-=m;}
  add('monedas',q);burbStats.sold++;burbStats.gain+=g;if(g>=1)burbWins++;burbLog('vende',q);
  const r=burbR(burbG(burbA)),[x,y]=burbXY(r);float((x-8)/T,(y-r)/T,'+'+Math.floor(q)+' monedas',RCOL.monedas);flashChip('monedas');
  if(!auto){toast('Vendiste: +'+fmt(Math.floor(q))+' monedas'+(g>=1?' (ganaste '+fmt(Math.floor(g))+')':'')+(all?'.':'. Lo que no entró sigue adentro.'));save();}return true;}
// Con la era terminada se vende solo lo que había adentro, así pasa entero a la era que sigue: en el primer paso o al guardar,
// lo que venga antes (al ganar se guarda enseguida y el cartel pausa el juego).
function burbWin(){if(!st.won||burbWonDone)return;burbWonDone=true;if(burbS>0)burbSell(true);}
function burbBurst(){const G=burbG(burbA),r=burbR(G),[x,y]=burbXY(r);burbBoom={x,y,r,t:0};burbStats.pops++;burbLog('revienta',burbM);
  if(burbS>0){const M=burbM,back=M/2,lose=M-back,cri=lose>burbBack(),had=st.res.monedas;add('monedas',back);burbStats.gain-=lose;
    float((x-8)/T,(y-r)/T,'-'+fmt(Math.ceil(lose))+' monedas','#e8654d');
    if(cri){burbCri=BURB_CRISIS;burbStats.crisis++;BROKEN=null;}
    toast('¡Reventó la burbuja! Recuperaste '+fmt(Math.floor(st.res.monedas-had))+' de '+fmt(Math.floor(M))+' monedas'+(cri?' y no te alcanza el respaldo: crisis.':'; tus ingresos absorben la pérdida.'));}
  else toast('¡Reventó la burbuja de la IA! No tenías nada adentro.');
  float((x-8)/T,(y-r)/T-0.6,'¡pum!','#ffe6fb');burbS=burbM=0;burbF='calma';burbT=BURB_CALM;burbA=0;save();}
// Qué pasa si revienta: cuánto perdés y si tu respaldo lo cubre.
function burbBackTxt(M){const R=burbBack(),c=BURB.los+' paran '+BURB_CRISIS+' s';
  if(R<1)return'Sin respaldo: todavía no ganás monedas de verdad. Si revienta con algo adentro, '+c+'.';
  const head='Respaldo: '+fmt(Math.floor(R))+' '+burbCoin()+', lo que ganan tus '+BURB.respaldo+' en '+BURB_BACK/60+' min.';
  if(!(M>0))return head+' Si al reventar perdés más que eso, '+c+'.';
  const L=M/2;return head+' Si revienta ahora perdés '+fmt(Math.ceil(L))+(L<=R?': lo absorbés.':': no alcanza y '+c+'.');}
// La hoja de la burbuja (un cartel que pausa el juego, como el del mercader): lo que pusiste, lo que vale y los botones.
function burbSheet(){if(burbF==='off')return;burbSeen=true;const coin=burbCoin(),n=Math.floor(st.res.monedas),half=Math.floor(n/2);
  let h='<div class="kicker">Burbuja de la IA</div>';
  const net=burbStats.pops+burbStats.sold?'<p class="muted">En esta era '+(burbStats.gain>=0?'ganaste ':'perdiste ')+fmt(Math.floor(Math.abs(burbStats.gain)))+' monedas con la burbuja.</p>':'';
  if(burbF==='euforia'){const V=burbV(),room=burbRoom(),can=room>=0.5||V<0.5;
    h+='<h2>'+burbPct(burbG(burbA))+'</h2><p>'+(burbS>0?'Pusiste '+fmt(Math.floor(burbM))+' '+coin+' y hoy valen '+fmt(Math.floor(V))+' '+coin+'.':'No pusiste nada todavía.')+'</p>'+
      '<p class="muted">Sube cada vez más rápido hasta que revienta: ahí recuperás la mitad de lo que pusiste.</p><p class="muted">'+burbBackTxt(burbM)+'</p>'+net+
      '<div class="row" style="flex-direction:column;align-items:stretch">'+
      '<button class="btn" id="burbPut1"'+(n>=BURB_STEP?'':' disabled')+'>Invertir '+BURB_STEP+' '+coin+'</button>'+
      (half>BURB_STEP?'<button class="btn" id="burbPutH">Invertir la mitad: '+half+' '+coin+'</button>':'')+
      (burbS>0?'<button class="btn" id="burbSell"'+(can?'':' disabled')+'>'+(!can?'Vender (no entran más monedas)':room<V-1?'Vender '+fmt(Math.floor(room))+' '+coin+' (no entra más)':'Vender: +'+fmt(Math.floor(V))+' '+coin)+'</button>':'')+
      '<button class="btn ghost" id="burbNo">Volver al juego</button></div>';}
  else h+='<h2>'+(burbCri>0?'¡Crisis!':'Se calmó el mercado')+'</h2>'+(burbCri>0?'<p>'+BURB.los.charAt(0).toUpperCase()+BURB.los.slice(1)+' paran '+clock(burbCri)+'. Con más '+BURB.respaldo+' tenés más respaldo.</p>':'')+
    '<p>La próxima burbuja se arma en '+clock(burbT)+'.</p>'+net+'<div class="row"><button class="btn ghost" id="burbNo">Volver al juego</button></div>';
  showModal(h);
  const on=(id,f)=>{const b=$(id);if(b)b.onclick=()=>{if(b.disabled)return;f();if(!$('modal').hidden)burbSheet();};};
  on('burbPut1',()=>burbPut(BURB_STEP));on('burbPutH',()=>burbPut(Math.floor(st.res.monedas/2)));on('burbSell',()=>burbSell());
  $('burbNo').onclick=()=>hideModal();}
// La burbuja: jabón casi transparente con un borde de colores que gira, un brillo, las monedas que pusiste adentro y, arriba,
// cuánto subió. Tiembla más cuanto más creció. Del edificio suben burbujitas hasta ella. Al reventar, un anillo y gotas.
const BURB_COL=['#ff9ad8','#ffd96a','#7af0e0','#a8d4f4','#d9a0ff'];
function burbDraw(){const t=performance.now()/1000;
  if(burbF==='euforia'&&burbAt>=0){const G=burbG(burbA),r=burbR(G),[cx,cy]=burbXY(r,t),k=Math.min(1,burbA/1.5),w=0.03+0.09*Math.min(1,(G-1)/2),sw=Math.sin(t*(5+4*w*10)),rx=r*(1+w*sw),ry=r*(1-w*sw);
    ctx.globalAlpha=k;
    const ax=(burbAt%MW)*T+8,ay=((burbAt/MW)|0)*T+3;ctx.strokeStyle='rgba(255,255,255,.75)';ctx.lineWidth=0.5;
    for(let j=0;j<3;j++){const u=(t*0.45+j/3)%1,bx=ax+Math.sin(t*3+j*2)*1.5*(1-u),by=ay+(cy+ry-ay)*u;ctx.beginPath();ctx.arc(bx,by,0.7+u*0.8,0,6.29);ctx.stroke();}
    const g=ctx.createRadialGradient(cx-rx*0.35,cy-ry*0.4,r*0.1,cx,cy,r);g.addColorStop(0,'rgba(255,255,255,.30)');g.addColorStop(0.7,'rgba(190,225,255,.12)');g.addColorStop(1,'rgba(230,180,255,.34)');
    ctx.fillStyle=g;ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,6.29);ctx.fill();
    ctx.lineWidth=1.6;ctx.strokeStyle='rgba(27,26,36,.45)';ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,6.29);ctx.stroke();
    ctx.lineWidth=0.9;for(let j=0;j<5;j++){const a0=t*0.8+j*1.2566;ctx.strokeStyle=BURB_COL[j];ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,a0,a0+1.35);ctx.stroke();}
    ctx.fillStyle='rgba(255,255,255,.85)';ctx.beginPath();ctx.ellipse(cx-rx*0.42,cy-ry*0.46,Math.max(0.8,rx*0.2),Math.max(0.5,ry*0.1),-0.6,0,6.29);ctx.fill();ctx.fillRect(cx+rx*0.38,cy+ry*0.32,1,1);
    // Adentro, una moneda por cada vez que se duplicó lo que pusiste (hasta 5), que dan vueltas despacio.
    if(burbS>0&&r>=5.5){const n=Math.min(5,1+Math.floor(Math.log2(Math.max(1,burbV()/BURB_STEP)))),s=Math.min(7,r*0.55),sm=ctx.imageSmoothingEnabled;ctx.imageSmoothingEnabled=false;
      for(let j=0;j<n;j++){const an=t*0.9+j*6.283/n,d=n>1?r*0.38:0;ctx.drawImage(I.monedas,Math.round(cx+Math.cos(an)*d-s/2),Math.round(cy+Math.sin(an)*d*0.7-s/2),s,s);}ctx.imageSmoothingEnabled=sm;}
    ctx.font='600 7px "Pixelify Sans", monospace';ctx.textAlign='center';ctx.lineWidth=2;ctx.lineJoin='round';const lbl=burbPct(G);
    ctx.strokeStyle='#1b1a24';ctx.strokeText(lbl,cx,cy-ry-2.5);ctx.fillStyle=burbS>0?'#ffd35a':'#ffe6fb';ctx.fillText(lbl,cx,cy-ry-2.5);
    ctx.globalAlpha=1;}
  const b=burbBoom;if(b){const u=Math.min(1,b.t/0.9);ctx.globalAlpha=1-u;ctx.lineWidth=1;ctx.strokeStyle='#ffe6fb';ctx.beginPath();ctx.arc(b.x,b.y,b.r*(1+u*0.8),0,6.29);ctx.stroke();
    for(let j=0;j<12;j++){const an=j*0.5236+0.2,d=b.r+u*16;ctx.fillStyle=BURB_COL[j%5];ctx.fillRect(b.x+Math.cos(an)*d-0.8,b.y+Math.sin(an)*d+u*u*10-0.8,1.6,1.6);}
    ctx.globalAlpha=1;}}
// En crisis, cada edificio parado muestra una flecha roja que baja (como el rayo tachado de los que no tienen luz), titilando.
function burbMarks(){if(!(burbCri>0)||Math.sin(performance.now()/160)<-0.3)return;
  for(let i=0;i<obj.length;i++){const o=obj[i];if(!o||o.bug||!BURB.of.includes(o.t))continue;const x=(i%MW)*T+12.5,y=((i/MW)|0)*T+1;
    ctx.fillStyle='#1b1a24';ctx.beginPath();ctx.arc(x,y,2.8,0,6.29);ctx.fill();ctx.strokeStyle='#e8654d';ctx.lineWidth=0.7;
    ctx.beginPath();ctx.moveTo(x-1.9,y-1.6);ctx.lineTo(x-0.5,y-0.1);ctx.lineTo(x+0.3,y-0.8);ctx.lineTo(x+1.4,y+1);ctx.stroke();
    ctx.fillStyle='#e8654d';ctx.beginPath();ctx.moveTo(x+2,y+1.7);ctx.lineTo(x+0.4,y+1.5);ctx.lineTo(x+1.8,y+0.1);ctx.closePath();ctx.fill();}}
// El bot (gancho botStep), por la fila y la hoja como una persona: en cada burbuja de menos de un minuto, si tiene respaldo y
// BURB_STEP monedas, las pone; la primera vez vende apenas gana algo (+15%, la meta del capítulo) y después cuando subió +40%
// desde que entró o al minuto. Si revienta antes, pierde la mitad.
function burbBotDo(id){$('amRow').click();if($('modal').hidden)return;const b=$(id);if(b&&!b.disabled)b.click();if(!$('modal').hidden&&$('burbNo'))$('burbNo').click();}
amenaza({on:'burbuja',
  reset(){burbF='off';burbT=burbA=burbM=burbS=burbCri=0;burbWins=0;burbSeen=false;burbAt=-1;burbBoom=null;burbWonDone=false;burbBotT=0;burbBotN=-1;for(const k in burbStats)burbStats[k]=0;burbStats.log=[];},
  tick(step){
    if(burbCri>0){burbCri=Math.max(0,burbCri-step);BROKEN=null;if(!burbCri)toast('Pasó la crisis: vuelven a andar '+BURB.los+'.');}
    if(burbF==='off'){if(burbReady()){burbF='calma';burbT=BURB_FIRST;}return;}
    if(st.won&&!burbWonDone){burbWin();save();}
    if(burbF==='calma'){burbT-=step;if(burbT<=0)burbStart();return;}
    burbA+=step;if(burbA>=BURB_MAX||burbRnd()<burbHaz(burbA)*step)burbBurst();},
  update(dt){if(burbBoom&&(burbBoom.t+=dt)>0.9)burbBoom=null;},
  off(){return burbCri>0?BURB.of:null;},
  drawOver:burbMarks,
  drawTop:burbDraw,
  // Se toca la burbuja en el aire, aunque abajo haya un árbol o una piedra; un toque sobre un edificio (o una obra) es para él.
  tap(tx,ty){if(quiet||burbF!=='euforia'||burbAt<0)return false;{const o=inb(tx,ty)&&obj[ty*MW+tx];if(o&&!RES[o.t])return false;}
    const r=burbR(burbG(burbA)),[cx,cy]=burbXY(r);if(Math.hypot(tx*T+8-cx,ty*T+8-cy)>r+7)return false;burbSheet();return'vida';},
  bar(){if(burbF==='off')return null;
    if(burbF==='euforia'){const G=burbG(burbA);return{lbl:'Burbuja',fill:100*(1-1/G),hi:G>=2,num:burbPct(G),meta:burbS>0?'pusiste '+fmt(Math.floor(burbM))+' · valen '+fmt(Math.floor(burbV())):'tocá para invertir'};}
    return burbCri>0?{lbl:'Burbuja',fill:100,hi:true,num:'crisis',meta:'paran '+clock(burbCri)}:{lbl:'Burbuja',fill:0,num:'—',meta:'se arma otra en '+clock(burbT)};},
  barTap:burbSheet,
  hint(){if(burbCri>0)return['¡Crisis!',BURB.los+' paran '+Math.ceil(burbCri)+' s. Con más '+BURB.respaldo+' tenés más respaldo.'];
    if(burbF==='euforia'&&!burbSeen)return['¡Burbuja de la IA!','tocala para invertir monedas; vendé antes de que reviente.'];return null;},
  // La meta del capítulo: vender con ganancia (de al menos una moneda).
  goal(m){return m.t==='burb'?burbWins:null;},
  save(){burbWin();return burbF==='off'?{}:{burbuja:{f:burbF,t:Math.round(burbT*10)/10,a:Math.round(burbA*10)/10,m:Math.round(burbM*100)/100,s:Math.round(burbS*1e4)/1e4,c:Math.round(burbCri*10)/10,w:burbWins,v:burbSeen?1:0,n:burbStats.n,g:Math.round(burbStats.gain*10)/10}};},
  // Una partida de antes de la burbuja (sin `burbuja`) arranca como una nueva: con el invento y una empresa, a los BURB_FIRST s.
  load(d){const b=d.burbuja;
    if(b&&typeof b==='object'){burbF=b.f==='euforia'?'euforia':'calma';burbT=clamp(+b.t||0,0,BURB_CALM);burbA=clamp(+b.a||0,0,BURB_MAX);burbM=Math.max(0,+b.m||0);burbS=Math.max(0,+b.s||0);
      burbCri=clamp(+b.c||0,0,BURB_CRISIS);burbWins=Math.max(0,b.w|0);burbSeen=!!b.v;burbStats.n=Math.max(0,b.n|0);burbStats.gain=+b.g||0;
      // Lo puesto solo puede estar adentro de una burbuja: si no (una partida rara), vuelve a las monedas.
      if(burbF!=='euforia'&&burbM>0){add('monedas',burbM);burbM=burbS=0;}}
    burbSeed();if(burbF==='euforia')burbPlace();},
  // Para la huella: una burbuja nueva con 20 monedas adentro.
  prueba(){if(burbF!=='euforia')burbStart();burbPut(20);},
  botStep(){if(burbF!=='euforia'||st.time<burbBotT)return;burbBotT=st.time+2;const G=burbG(burbA);
    if(burbS>0){if(G/burbBotG>=(burbWins?1.4:1.15)||burbA>=burbBotA+60)burbBotDo('burbSell');return;}
    if(burbBotN===burbStats.n||burbA>60||st.res.monedas<BURB_STEP||burbBack()<BURB_STEP)return;
    burbBotN=burbStats.n;burbBotG=G;burbBotA=burbA;burbBotDo('burbPut1');},
  debug:{burb:()=>({f:burbF,t:burbT,a:burbA,m:burbM,s:burbS,v:burbV(),G:burbG(burbA),c:burbCri,w:burbWins,seen:burbSeen,at:burbAt,back:burbBack()}),burbStats:()=>burbStats,
    burbPut:n=>burbPut(n),burbSell:()=>burbSell(),burbBurst:()=>burbBurst(),burbStart:()=>burbStart(),burbSheet:()=>burbSheet()}});
