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
ERA.interiores={supercomp:{name:'Supercomputadora',un:'una supercomputadora',al:'a la supercomputadora',el:'la supercomputadora'}};
ERA.text=Object.assign({},ERA.text,{
  title:'La carrera por la AGI',
  intro:'Un laboratorio rival también quiere llegar a la AGI y va cada vez más rápido. Ganás si la terminás antes que ellos y con seguridad 100%. Tus centros de datos ahora son supercomputadoras: se recorren por dentro como antes, con sus racks, sus escritorios y su pizarra. Y ojo con los espías del rival.',
  news:'Novedades: el laboratorio rival con su barra y sus espías, la seguridad, las embajadas y los puestos de guardia. Las supercomputadoras se recorren por dentro.',
  legacy:'Lo que trae tu ciudad de la etapa 1',
  noLegacy:'No terminaste la etapa 1 en este navegador: arrancás con lo básico para juntar.',
  winText:()=>'Terminaste una AGI segura en el día '+(Math.floor(st.time/DAY)+1)+', cuando el rival iba '+Math.floor(st.rival)+'%.',
  winNote:'Fin del prototipo. Contale a Claude qué te gustó para armar las etapas que siguen.'});
/* ---------- arte de la era ---------- */
