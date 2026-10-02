import { serve, launch } from './harness.mjs';
const S='./out/';
const srv = await serve(), b = await launch();
const ctx = await b.newContext({ viewport:{width:400,height:850}, deviceScaleFactor:2, hasTouch:true, isMobile:true });
const p = await ctx.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(e.stack)); p.on('console',m=>{if(m.type()==='error'&&!/ERR_TUNNEL|fonts|net::/.test(m.text()))errs.push(m.text());});
await p.goto(srv.url + '/carrera.html?debug'); await p.evaluate(()=>localStorage.clear()); await p.reload(); await p.waitForTimeout(500);
await p.screenshot({path:S+'car_intro.png'});
// sims
const res=await p.evaluate(()=>{const out=[];for(let s=1;s<=40;s++){try{out.push(window.__m.sim(s*7919));}catch(e){out.push({err:e.message+' '+e.stack.split('\n')[1]});}}return out;});
const ok=res.filter(r=>!r.err);
console.log('errs in sim:',res.filter(r=>r.err).slice(0,2));
const turns=ok.map(r=>r.turn);const avg=a=>Math.round(a.reduce((x,y)=>x+y,0)/a.length*10)/10;
console.log('games',ok.length,'avg turn',avg(turns),'min',Math.min(...turns),'max',Math.max(...turns),'p0 wins',ok.filter(r=>r.winner===0).length,'p1 wins',ok.filter(r=>r.winner===1).length,'timeouts',ok.filter(r=>r.how==='tiempo').length);
console.log('avg cities',avg(ok.map(r=>r.c0)),avg(ok.map(r=>r.c1)),'avg techs',avg(ok.map(r=>r.t0)),avg(ok.map(r=>r.t1)));
console.log(JSON.stringify(ok.slice(0,6)));
console.log('errors',errs.slice(0,3));
await b.close(); srv.close();
