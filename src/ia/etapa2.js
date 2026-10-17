// base: agi.js
// La carrera de la IA, etapa 2 (octubre de 2026, Juani: "falta la parte que le sigue a la nueva etapa de ia"): la carrera por
// la AGI, sobre la era AGI del mundo abierto (src/mundo/agi.js, que el build pone arriba de esto): el laboratorio rival, sus
// espías, la seguridad y las embajadas. Arranca con la ciudad de la etapa 1 si la terminaste: los centros de datos pasan a
// supercomputadoras en el mismo lugar y se traen lo de adentro (racks, foco, cajas y la gente sentada a investigar).
ERA.juego={id:'ia',etapa:2,nombre:'La carrera de la IA'};
// La etapa anterior: su partida (rtagi-ia1-v1) y sobre qué era se armó (la IA, 9), para traer la ciudad.
ERA.legacy=Object.assign({},ERA.legacy,{key:'rtagi-ia1-v1',prevN:9,de:'de la etapa 1'});
ERA.next=null;
// Las supercomputadoras se recorren por dentro, como los centros de datos de la etapa 1.
ERA.interiores={supercomp:{name:'Supercomputadora',un:'una supercomputadora',al:'a la supercomputadora',el:'la supercomputadora'},
  // Los laboratorios de IA de la etapa 1 pasan a institutos (su papel: los que multiplican las ideas), con sus mesas de experimentos.
  instituto:{name:'Instituto',plano:'lab',un:'un instituto',al:'al instituto',el:'el instituto'}};
// Capítulos con reloj, como en la etapa 1. Calibrados con el bot en la era AGI sola (3 corridas, 11,5 min; los inventos a los
// 100, 189, 289, 326, 372, 442, 539, 601 y 690 s), más lo de adentro: oro ≈ 2× y plata ≈ 3×.
ERA.capitulos=[
  {name:'Cómputo a escala',oro:240,plata:360,premio:20,metas:[{t:'tech',id:'computo',txt:'Investigá el cómputo a escala'},{t:'build',id:'supercomp',txt:'Tené una supercomputadora al día'},{t:'build',id:'guardia',txt:'Construí un puesto de guardia'}]},
  {name:'Seguridad primero',oro:200,plata:300,premio:30,metas:[{t:'tech',id:'seguridad',txt:'Investigá la seguridad'},{t:'build',id:'labseg',txt:'Construí un laboratorio de seguridad'},{t:'seg',n:20,txt:'Llegá a 20% de seguridad'}]},
  {name:'Espías',oro:240,plata:360,premio:40,metas:[{t:'tech',id:'productos',txt:'Investigá los productos de IA'},{t:'build',id:'empresa',txt:'Construí una empresa de IA'},{t:'spy',n:1,txt:'Atrapá un espía adentro'}]},
  {name:'La diplomacia',oro:320,plata:480,premio:60,metas:[{t:'tech',id:'diplomacia',txt:'Investigá la diplomacia'},{t:'build',id:'embajada',txt:'Construí una embajada'},{t:'tech',id:'ciencia',txt:'Investigá la ciencia automatizada'},{t:'seg',n:50,txt:'Llegá a 50% de seguridad'}]},
  {name:'La AGI',oro:500,plata:750,premio:0,metas:[{t:'tech',id:'tratado',txt:'Firmá el tratado internacional'},{t:'tech',id:'escalado',txt:'Investigá el escalado'},{t:'seg',n:100,txt:'Llegá a 100% de seguridad'},{t:'tech',id:'agi',txt:'Terminá la AGI antes que el rival'}]}];
ERA.text=Object.assign({},ERA.text,{
  title:'La carrera por la AGI',
  intro:'Un laboratorio rival quiere llegar a la AGI antes que vos. Ganás si la terminás primero y con seguridad 100%. Sus espías se meten en tus supercomputadoras: entrá a atraparlos.',
  news:'',
  legacy:'Lo que trae tu ciudad de la etapa 1',
  noLegacy:'No terminaste la etapa 1 en este navegador: arrancás con lo básico para juntar.',
  winText:()=>'Terminaste una AGI segura en el día '+(Math.floor(st.time/DAY)+1)+', cuando el rival iba '+Math.floor(st.rival)+'%.',
  winNote:'Fin del prototipo. Contale a Claude qué te gustó para armar las etapas que siguen.'});
/* ---------- arte de la era ---------- */
