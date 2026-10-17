// base: ia.js
// La carrera de la IA, etapa 1 (octubre de 2026, Juani: un juego aparte "de solo la era IA y tal vez AGI", con más profundidad,
// separado en etapas dentro de la IA y con "más interacción con los edificios, tal vez poder entrar y recorrerlos"). Es un
// prototipo: la era IA del mundo abierto (src/mundo/ia.js, que el build pone arriba de esto) con sus propias partidas
// (`juego`) y el centro de datos que se recorre por dentro (src/mundo/amenazas/interior.js). Las etapas que siguen se suman
// como src/ia/etapa2.js, etapa3.js…
ERA.juego={id:'ia',etapa:1,nombre:'La carrera de la IA'};
// Sin etapa anterior: arranca solo (una clave que no existe); al terminar pasa a la etapa 2 (ia2.html), no a la AGI del mundo abierto.
ERA.legacy=Object.assign({},ERA.legacy,{key:'rtagi-ia0-v1',perks:[]});
ERA.next={file:'ia2.html',to:'a la carrera por la AGI'};
// Los edificios que se recorren por dentro: el centro de datos (racks de GPUs, escritorios, la pizarra y cajas viejas) y el
// laboratorio de IA (mesas de experimentos, escritorios y cajas).
ERA.interiores={datacenter:{name:'Centro de datos'},labia:{name:'Laboratorio de IA',plano:'lab',un:'un laboratorio de IA',al:'al laboratorio de IA',el:'el laboratorio de IA'}};
// Capítulos con reloj (como en la Antigüedad), con metas de adentro (gancho `goal` de interior.js). Calibrados con el bot en
// la era IA sola (no entra a los edificios, así que se le suma lo de adentro): oro ≈ 2× y plata ≈ 3×.
ERA.capitulos=[
  {name:'Los primeros datos',oro:240,plata:360,premio:20,metas:[{t:'tech',id:'redes',txt:'Investigá las redes neuronales'},{t:'build',id:'datacenter',txt:'Construí un centro de datos'},{t:'rack',n:1,txt:'Instalá un rack de GPUs adentro'}]},
  {name:'Los robots',oro:150,plata:225,premio:30,metas:[{t:'tech',id:'robotica',txt:'Investigá la robótica'},{t:'build',id:'fabrob',txt:'Construí una fábrica de robots'},{t:'desk',n:1,txt:'Sentá a alguien a investigar adentro'}]},
  {name:'El negocio',oro:180,plata:270,premio:40,metas:[{t:'tech',id:'software',txt:'Investigá el software en la nube'},{t:'build',id:'startup',txt:'Construí una empresa de software'},{t:'tech',id:'alineacion',txt:'Investigá la alineación'},{t:'rackLv',n:1,txt:'Mejorá un rack al nivel 2'}]},
  {name:'El laboratorio',oro:400,plata:600,premio:60,metas:[{t:'tech',id:'lenguaje',txt:'Investigá los modelos de lenguaje'},{t:'build',id:'labia',txt:'Construí un laboratorio de IA'},{t:'exp',n:1,txt:'Sacá un experimento bueno'}]},
  {name:'El asistente',oro:340,plata:510,premio:0,metas:[{t:'tech',id:'interpretabilidad',txt:'Investigá la interpretabilidad'},{t:'tech',id:'chips',txt:'Investigá los chips de IA'},{t:'tech',id:'asistente',txt:'Terminá el asistente universal'}]}];
ERA.text=Object.assign({},ERA.text,{
  title:'La carrera de la IA',
  intro:'Llegá al asistente universal. Entrá a tus centros de datos y laboratorios y mejoralos por dentro. Cada capítulo tiene reloj: cuanto más rápido, más estrellas.',
  news:'',
  noLegacy:'Arrancás con lo básico armado: una casa con 2 aldeanos más, una granja, una maderera y una cantera.',
  winNote:'Tu ciudad, tus ideas y lo de adentro de tus centros de datos pasan a la etapa 2: la carrera por la AGI.'});
/* ---------- arte de la era ---------- */
