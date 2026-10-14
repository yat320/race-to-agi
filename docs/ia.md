# La carrera de la IA (juego aparte, prototipo)

Juani (octubre de 2026): "me gustaría hacer un juego de solo la era IA y tal vez AGI". Lo quiere parecido al mundo abierto pero con más profundidad, separado en etapas dentro de la IA, y con "más interacción con los edificios, tal vez poder entrar y recorrerlos".

Se decidió hacerlo en este repo, con el mismo motor, como un juego aparte:
- tiene su página (`ia1.html`, `ia2.html`… una por etapa) y sus partidas (`rtagi-ia1-v1`…);
- no toca el mundo abierto;
- desde el inicio se entra por "Nuevo: la carrera de la IA".

Lo primero que se armó es un prototipo: la etapa 1 con un edificio que se recorre por dentro (Juani eligió "primero el interior"). Para adentro eligió todo: mejorar y acomodar, gente con tareas, problemas y secretos.

## Cómo se arma

- `src/ia/etapaN.js` empieza con `// base: <era>.js`.
  - El build (`tools/build.mjs`) pone arriba los datos de esa era del mundo abierto, después los de la etapa (que los cambian: `ERA.juego`, `ERA.legacy`, `ERA.next`, `ERA.interiores`, `ERA.text`…) y suma el arte de las dos.
  - Sale `dist/iaN.html`. No entra en el inicio del mundo abierto, ni en el bot, ni en la huella.
- `ERA.juego` (`{id, etapa, nombre}`) cambia en el motor:
  - la clave de la partida (`rtagi-<id><etapa>-v1`);
  - el título, el cartel de inicio y el del final;
  - el texto de arriba ("etapa 1").
- La etapa 1 es la era IA del mundo abierto (`src/mundo/ia.js`): robots, desalineados, supervisión, obras y mundo vivo. Arranca sola, sin etapa anterior, y termina en el asistente universal, sin pasar a otra.

## Adentro de los edificios (`src/mundo/amenazas/interior.js`)

Se prende con `interiores:{edificio:{name}}`. En la etapa 1 es el centro de datos.

**Entrar.** Tocás el edificio, tu personaje camina hasta la puerta y entra. La pantalla pasa a un mapa chico del interior, de 11×10 casilleros. Ahí caminás tocando, y pegado a algo lo usás.
- El motor deja de dibujar el mundo y de mover al jugador afuera; lo demás sigue andando.
- Usa los ganchos `scene`, `sceneDraw`, `sceneTap` y `sceneBack`.
- El botón atrás del celular y la puerta te sacan.

**Racks de GPUs.** Hay 4 lugares, más un quinto que trae el secreto.
- Se instalan y se mejoran hasta el nivel 3.
- Cada rack suma 30%, 60% o 100% de un centro de datos. El motor suma lo de adentro a lo que produce el edificio con el gancho `extra`.

**Escritorios.** Hay 2. Sentás a un aldeano a investigar: deja de juntar afuera y suma 40%. Se lo ve adentro.

**Pizarra.** Elige el foco:
- investigar: lo de adentro da ideas;
- producto: da monedas en vez de ideas.

**Problemas.**
- Cada ~75 s se recalienta un rack que anda. Deja de sumar hasta que lo enfriás tocándolo. Si estás afuera, la pista te avisa.
- Mientras estás adentro, a veces entra un bicho que corre por el piso. Se toca para aplastarlo.

**Secreto.** Las cajas viejas del rincón se abren con 3 golpes. Traen un prototipo viejo: ideas y un rack gratis en el quinto lugar.

**Guardado.** Va con la partida (`interior`, por casillero del edificio). Los que investigan vuelven a sentarse al cargar.

**Un arreglo de octubre de 2026.** Juani: "entro al centro de datos y no me deja caminar ni enfriar algunas veces".

El personaje de adentro se movía con `stepEnt`, que mira si se puede pisar el mapa de afuera en las mismas coordenadas. Ahí, en la esquina del mapa, hay agua y cosas: se frenaba de golpe y a veces no llegaba al lado de un rack.

Ahora camina con su propio paso (`intStep`), que mira el mapa de adentro. Probado tocando la pantalla:
- camina a las cuatro esquinas y al medio;
- enfría los cinco racks recalentados.

Con la versión anterior, la misma prueba se frenaba en lugares al azar y dejaba dos racks calientes.

## Etapa 2: la carrera por la AGI (octubre de 2026)

Juani: "falta la parte que le sigue a la nueva etapa de ia". `src/ia/etapa2.js` se arma sobre la era AGI del mundo abierto (`// base: agi.js`): el laboratorio rival y sus espías, la seguridad, las embajadas y los puestos de guardia. Sale `dist/ia2.html`.

**El pase.**
- La etapa 1 termina con "Pasar a la carrera por la AGI" (`ERA.next`).
- El inicio abre la etapa en la que vas: la 2 si terminaste la 1 o ya la empezaste.

**La ciudad.** La etapa 2 trae la ciudad de la etapa 1 en el mismo mapa. Para eso, `ERA.legacy` tiene `key` (la partida de la etapa 1) y `prevN:9` (sobre qué era se armó); `prevCity` usa `prevN` cuando está.
- Los centros de datos pasan a supercomputadoras en el mismo casillero, con lo de adentro: racks, foco, cajas y la gente sentada (`fresh` en `interior.js`).
- Los racks llegan fríos.

**Las supercomputadoras se recorren por dentro.** `interiores:{supercomp:{name, un, al, el}}`; las formas femeninas sirven para los textos.
- Una que vino de la etapa 1 rinde la mitad hasta modernizarla.
- Al tocarla, un cartel deja elegir entre entrar o modernizarla.

**Dos arreglos de esta tanda:**
- Una cabra que pastaba al lado de un edificio se quedaba con el toque, y salías a cazarla en vez de entrar. Ahora un toque sobre un edificio es para el edificio (`vida.js`, en todas las eras con mundo vivo).
- Entrar desde el cartel cerraba el cartel con un paso atrás en el historial y entraba con uno adelante. Se cruzaban, y al salir se volvía una página de más: se salía del juego. Ahora entra sobre la misma entrada del historial (`intEnter(i, keepNav)`).

## Lo que sigue (si gusta)

- Etapas antes y entre medio (hoy son la IA y la AGI del mundo abierto, con interiores).
- Más edificios por dentro: el laboratorio de IA, la fábrica de robots y el instituto de alineación.
- Las etapas de la IA, cada una con su obra y su problema:
  1. redes neuronales;
  2. transformers;
  3. modelos grandes;
  4. agentes;
  5. AGI.
