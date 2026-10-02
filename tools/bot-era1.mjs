import { serve, launch, verdict } from './harness.mjs';
const srv = await serve(), b = await launch();
const ctx = await b.newContext({ viewport:{width:400,height:850}, deviceScaleFactor:2, hasTouch:true, isMobile:true });
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.stack));
await p.goto(srv.url + '/era1.html?debug'); await p.evaluate(()=>localStorage.clear()); await p.reload(); await p.waitForTimeout(500);
const res=[];
for(let mi=0;mi<10;mi++){
  const r=await p.evaluate(async(mi)=>{
    const M=window.__m;M.startMission(mi);let steps=0;const g0=M.G,m=g0.m;
    const need=m.abaco?m.abaco.need:{};
    while(M.G&&!M.G.won&&steps<8000){steps++;const g=M.G;
      for(const pr of g.products.slice())if(!pr.fly)M.onTap(pr.x,pr.y);
      for(const mm of g.mamuts.slice())for(let k=0;k<2;k++)M.onTap(mm.x,mm.y-8);
      for(const w of g.wolves)if(w.state==='hunt')M.onTap(w.x,w.y-6);
      const grassTot=g.grass.reduce((a,b)=>a+b,0);
      if(grassTot<(m.winter?20:14)){if(g.water>0)M.onTap(60+Math.random()*90,110+Math.random()*80);else if(g.refill<=0)M.onTap(19,204);}
      const cnt=k=>g.animals.filter(a=>a.kind===k).length;
      const want={ave:4,cabra:m.buy.includes('cabra')?2:0,oveja:m.buy.includes('oveja')?(m.goals.some(x=>x[0]==='oveja')?3:2):0};
      if(m.goals.some(x=>x[0]==='animales')){want.ave=5;want.cabra=3;want.oveja=3;}
      for(const k of ['ave','oveja','cabra'])if(m.buy.includes(k)&&cnt(k)<want[k]&&g.money>=({ave:20,oveja:40,cabra:50})[k]+ (m.abaco&&g.money<320?0:0)){const bt=document.querySelector('[data-buy="'+k+'"]');if(bt&&!bt.disabled)bt.click();}
      g.slots.forEach((s,i)=>{if(!s)return;const inp={fogon:'huevo',secadero:'leche',telar:'lana'}[s.type];if(!s.built&&g.money>=s.cost+10)M.tapSlot(s,i);else if(s.built&&!s.busy&&g.store[inp])M.tapSlot(s,i);});
      g.orders.forEach((o,i)=>{if(M.canDeliver(o))M.deliverOrder(i);});
      if(!document.getElementById('sheet').hidden)document.querySelector('[data-a="closeSheet"]')?.click();
      if(m.abaco)M.tapAbaco();if(m.abaco)for(const k in need)need[k]=Math.max(0,m.abaco.need[k]-((g.abacoGot||{})[k]||0));
      const used=Object.entries(g.store).reduce((a,[k,n])=>a+n*(k==='lobo'?3:k==='marfil'?2:1),0);
      const conchasGoal=m.goals.some(x=>x[0]==='conchas'||x[0]==='abaco');
      if(g.caravan.away<=0&&(used>=5||(conchasGoal&&used>=3))){g.caravan.load={};
        for(const[k,n]of Object.entries(g.store)){let keep=0;if(k==='huevo'&&g.slots[0]&&g.slots[0].built)keep=Math.min(n,2);if(k==='leche'&&g.slots[1]&&g.slots[1].built)keep=Math.min(n,2);if(k==='lana'&&g.slots[2]&&g.slots[2].built)keep=Math.min(n,2);if(need[k])keep=Math.min(n,need[k]);
          if(m.orders&&!m.abaco)keep=Math.min(n,2);if(n-keep>0)g.caravan.load[k]=n-keep;}
        let sz=0;for(const k in g.caravan.load){while(g.caravan.load[k]>0&&sz+g.caravan.load[k]*({lobo:3,marfil:2}[k]||1)>10)g.caravan.load[k]--;sz+=g.caravan.load[k]*({lobo:3,marfil:2}[k]||1);}
        M.sendCaravan();}
      for(let k=0;k<5;k++)M.update(0.1);
    }
    const g=M.G;return {mi:mi+1,won:g.won,t:Math.round(g.t),stars:g.t<=m.gold?3:g.t<=m.silver?2:1,gold:m.gold,silver:m.silver,money:g.money,an:g.animals.length,orders:g.ordersDone,caught:g.caught,col:g.collected};
  },mi);
  res.push(r);console.log(JSON.stringify(r));
  await p.waitForTimeout(700);
  if(mi===9||mi===4||mi===5||mi===6)await p.screenshot({path:'./out/mm'+(mi+1)+'.png'});
  await p.evaluate(()=>{const b=document.querySelector('[data-a="map"]');if(b)b.click();});await p.waitForTimeout(200);
}
await p.screenshot({path:'./out/mm_map.png'});
console.log('errors',errs.slice(0,3));
verdict(res,errs);
await b.close(); srv.close();
