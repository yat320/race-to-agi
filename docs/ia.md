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

## Lo que sigue (si gusta)

- Más edificios por dentro: el laboratorio de IA, la fábrica de robots y el instituto de alineación.
- Las etapas de la IA, cada una con su obra y su problema:
  1. redes neuronales;
  2. transformers;
  3. modelos grandes;
  4. agentes;
  5. AGI.
