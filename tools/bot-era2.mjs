import { chromium } from 'playwright';
const S='./out/';
const only=process.argv[2]?process.argv[2].split(',').map(Number):null;
const b = await chromium.launch();
const ctx = await b.newContext({ viewport:{width:400,height:850}, deviceScaleFactor:1, hasTouch:true, isMobile:true });
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.stack));
await p.goto('http://localhost:8765/era2.html?debug');
await p.evaluate(()=>{localStorage.clear();localStorage.setItem('rtagi-era1-misiones-v1',JSON.stringify({best:{1:3,2:3,3:2,4:2,5:2,6:2,7:2,8:2,9:1,10:1},spent:10,upg:{},built:{}}));localStorage.setItem('rtagi-legacy-v1',JSON.stringify({v:1,eras:{'1':{done:true,dia:10}}}));});
await p.reload(); await p.waitForTimeout(500);
for(let mi=0;mi<10;mi++){
  const r=await p.evaluate(async(mi)=>{
    const M=window.__m;M.startMission(mi);let steps=0;const m=M.G.m;
    const SIZE={piel:2,cofre:2};const SH={molino:['trigo'],horno:['harina'],queseria:['leche'],telar:['lana'],fundicion:['cobre','estano'],engranajes:['bronce'],escriba:['papiro']};
    const goalN=k=>{const x=m.goals.find(x=>x[0]===k);return x?x[1]:0;};
    let log={pir:0,fox:0,loc:0,lostPlots:0,stolen:0};
    while(M.G&&!M.G.won&&steps<6000){steps++;const g=M.G;
      for(const pr of g.pirates)if((pr.state==='come'&&pr.x>-16)||pr.state==='raid')for(let k=0;k<2;k++)M.onTap(pr.x+14,pr.y+14);
      for(const w of g.foxes)if(w.state==='hunt'&&w.x>0&&w.x<176)for(let k=0;k<2;k++)M.onTap(w.x,w.y-6);
      for(const L of g.locusts)if(L.state!=='leave'&&L.x>0&&L.x<176)for(let k=0;k<2;k++)M.onTap(L.x,L.y);
      for(const pr of g.products.slice())if(!pr.fly)M.onTap(pr.x,pr.y);
      g.plots.forEach((pl,i)=>{if(!pl)return;if(pl.s==='ripe'||pl.s==='dead')M.tapPlot(i);if(pl.s==='empty'&&g.water>0)M.tapPlot(i);});
      const grassTot=g.grass.reduce((a,b)=>a+b,0);
      if(grassTot<12&&g.water>0)M.onTap(40+Math.random()*100,90+Math.random()*70);
      if(g.water<=0&&g.refill<=0)M.onTap(19,204);
      const cnt=k=>g.animals.filter(a=>a.kind===k).length;
      const want={gallina:4,oveja:m.buy.includes('oveja')?(goalN('oveja')||2):0,vaca:m.buy.includes('vaca')?2:0};
      if(m.anti){want.gallina=3;want.oveja=1;want.vaca=2;}
      for(const k of ['gallina','oveja','vaca'])if(m.buy.includes(k)&&cnt(k)<want[k]&&g.money>=({gallina:20,oveja:40,vaca:60})[k]+30){const bt=document.querySelector('[data-buy="'+k+'"]');if(bt&&!bt.disabled)bt.click();}
      if(m.anti)M.tapAnti();
      const antiL=m.anti?Object.fromEntries(M.antiLeft()):{};
      g.slots.forEach((s,i)=>{if(!s)return;if(m.anti&&s.type==='engranajes'&&!antiL.engranaje&&antiL.bronce)return;if(!s.built&&g.money>=s.cost+10)M.tapSlot(s,i);else if(s.built&&!s.busy&&SH[s.type].every(k=>(g.store[k]||0)-g.orders.reduce((a,o)=>a+(o.items[k]||0),0)>=1))M.tapSlot(s,i);});
      g.orders.forEach((o,i)=>{if(M.canDeliver(o))M.deliverOrder(i);});
      const used=Object.entries(g.store).reduce((a,[k,n])=>a+n*(SIZE[k]||1),0),cap=g.store&&M.G?Object.keys(g.store).length:0;
      // market
      if(m.market){const need={};
        if(m.anti){const left=Object.fromEntries(M.antiLeft());const eng=(left.engranaje||0),bro=(left.bronce||0)+eng,rol=left.rollo||0;
          const haveB=(g.store.bronce||0),haveE=(g.store.engranaje||0);need.cobre=Math.max(0,bro-haveB-(g.store.cobre||0));need.estano=Math.max(0,bro-haveB-(g.store.estano||0));need.papiro=Math.max(0,rol-(g.store.rollo||0)-(g.store.papiro||0));}
        else{for(const k of m.market){need[k]=(g.store[k]||0)<2?1:0;}}
        const reserve=m.anti?0:40;
        for(const k of m.market)if(need[k]>0&&g.money>=({cobre:15,estano:20,papiro:12})[k]+reserve&&(k!=='cobre'||!m.anti||(g.store.cobre||0)<=(g.store.estano||0)))M.buyMat(k,1);}
      if(m.anti)M.tapAnti();
      const monGoal=goalN('monedas')||(m.anti?1:0);
      const cap2=[8,12,18][0];
      if(g.ship.away<=0&&(used>=6||(monGoal&&used>=3))){g.ship.load={};
        const keepAnti=m.anti?Object.fromEntries(M.antiLeft()):{};
        for(const[k,n]of Object.entries(g.store)){let keep=0;
          for(const s of g.slots)if(s&&s.built&&SH[s.type].includes(k))keep=Math.min(n,3);
          if(keepAnti[k])keep=n;if(m.anti&&(k==='bronce'||k==='engranaje'||k==='cobre'||k==='estano'||k==='papiro'||k==='rollo'))keep=n;
          if(m.orders){let on=0;for(const o of g.orders)on+=o.items[k]||0;keep=Math.max(keep,Math.min(n,on));}
          const gk=goalN(k);if(gk&&k!=='monedas')keep=Math.max(keep,n);
          if(n-keep>0)g.ship.load[k]=n-keep;}
        let sz=0;for(const k in g.ship.load){while(g.ship.load[k]>0&&sz+g.ship.load[k]*(SIZE[k]||1)>10)g.ship.load[k]--;sz+=g.ship.load[k]*(SIZE[k]||1);}
        M.sendShip();}
      const before={an:g.animals.length,money:g.money};
      for(let k=0;k<5;k++)M.update(0.1);
    }
    const g=M.G;return {mi:mi+1,won:g.won,t:Math.round(g.t),gold:m.gold,silver:m.silver,money:g.money,an:g.animals.length,orders:g.ordersDone,caught:g.caught,sw:g.swatted,sunk:g.sunk,col:g.collected,store:g.store};
  },mi);
  if(!only||only.includes(mi+1))console.log(JSON.stringify(r));
  await p.waitForTimeout(600);
  if(mi===9)await p.screenshot({path:S+'e2_win10.png'});
  await p.evaluate(()=>{const b=document.querySelector('[data-a="map"]');if(b)b.click();});await p.waitForTimeout(150);
}
await p.screenshot({path:S+'e2_map2.png'});
console.log('errors',errs.slice(0,3));
await b.close();
