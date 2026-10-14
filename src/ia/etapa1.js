// base: ia.js
// La carrera de la IA, etapa 1 (octubre de 2026, Juani: un juego aparte "de solo la era IA y tal vez AGI", con más profundidad,
// separado en etapas dentro de la IA y con "más interacción con los edificios, tal vez poder entrar y recorrerlos"). Es un
// prototipo: la era IA del mundo abierto (src/mundo/ia.js, que el build pone arriba de esto) con sus propias partidas
// (`juego`) y el centro de datos que se recorre por dentro (src/mundo/amenazas/interior.js). Las etapas que siguen se suman
// como src/ia/etapa2.js, etapa3.js…
ERA.juego={id:'ia',etapa:1,nombre:'La carrera de la IA'};
// Sin etapa anterior: arranca solo (una clave que no existe) y no pasa a la AGI del mundo abierto.
ERA.legacy=Object.assign({},ERA.legacy,{key:'rtagi-ia0-v1',perks:[]});
ERA.next=null;
// Los edificios que se recorren por dentro: el centro de datos (racks de GPUs, escritorios, la pizarra y cajas viejas).
ERA.interiores={datacenter:{name:'Centro de datos'}};
ERA.text=Object.assign({},ERA.text,{
  title:'La carrera de la IA',
  intro:'Un prototipo de un juego aparte, solo de la IA. Ahora podés entrar a tus centros de datos y recorrerlos: instalá y mejorá racks de GPUs, sentá a tu gente a investigar, elegí en la pizarra qué hacen y enfriá los racks que se recalientan. Y revisá las cajas del rincón.',
  news:'Novedad: los centros de datos se recorren por dentro. Tocá uno para entrar.',
  noLegacy:'Arrancás con lo básico para juntar. Los robots, los desalineados y la supervisión son los de la era IA del mundo abierto.',
  winNote:'Fin del prototipo. Contale a Claude qué te gustó de recorrer los edificios para armar las etapas que siguen.'});
/* ---------- arte de la era ---------- */
