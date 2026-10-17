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

**Espías adentro** (decidido en el trabajo autónomo: afuera el espía copiaba en 4 segundos parado al lado y no había nada que recorrer).
- El espía que llega a una supercomputadora se mete. El motor le pregunta a las amenazas con el gancho `spyIn`; `s.inside` lo saca de lo que se ve, se toca y atrapan los puestos de guardia afuera.
- Adentro camina hasta un rack al azar y copia los planos 20 segundos (`INT_SPY`), con una barra roja.
- Afuera, la supercomputadora late en rojo, hay flecha si queda fuera de pantalla y la pista dice "¡Espía adentro!".
- Entrás y lo tocás: lo atrapás (+2 ideas) y no se lleva nada. Si termina, sale con los planos (rival +2%) y vuelve a su laboratorio como los de afuera; tocándolo en el camino los recuperás.
- Los guardianes no entran: adentro es cosa tuya.
- Lo demás de los espías no cambia (de dónde salen, cada cuánto, los puestos de guardia). En el mundo abierto no hay edificios recorribles, así que nada cambia ahí.

**Intro corta** (regla 1: nada de tutorial largo). Las dos etapas arrancan con dos o tres líneas: la meta, que se recorren los edificios y que hay reloj. Lo de adentro lo explican las pistas cuando entrás. Sin `news` no hay renglón de novedades, un juego aparte no repite lo que arma `starterKit` (lo dice corto su `noLegacy`) y el botón que vuelve dice "Inicio" (`HUBTXT`).

**Capítulos con reloj en la etapa 1** (decidido en el trabajo autónomo: una de las quejas de Juani es que "nada apura", y los capítulos de la Antigüedad ya existían). La etapa 1 se juega de a un capítulo, con 3 o 4 metas y estrellas por tiempo, y cada capítulo tiene una meta de adentro. Las metas nuevas las cuenta `interior.js` con el gancho `goal`, que el motor llama para lo que no conoce:
- `rack`: racks instalados;
- `rackLv`: niveles de rack por encima del 1;
- `desk`: gente sentada adentro;
- `exp`: experimentos que salieron bien;
- `cool`: racks enfriados.

`exp` y `cool` se guardan en `interior` como `xp` y `cool`; una partida sin ellos arranca en 0.

| Capítulo | Metas | ★★★ hasta | ★★ hasta |
|---|---|---|---|
| Los primeros datos | redes, un centro de datos, un rack | 4:00 | 6:00 |
| Los robots | robótica, una fábrica de robots, alguien sentado | 2:30 | 3:45 |
| El negocio | software, una empresa, alineación, un rack nivel 2 | 3:00 | 4:30 |
| El laboratorio | lenguaje, un laboratorio, un experimento bueno | 6:40 | 10:00 |
| El asistente | interpretabilidad, chips, el asistente | 5:40 | 8:30 |

Calibrado con el bot en la era IA sola (3 corridas, 9,7 min; los inventos a los 98, 167, 199, 245, 411, 489, 532 y 582 s), con oro ≈ 2× y plata ≈ 3×. El bot no entra a los edificios: lo de adentro se sumó a mano (~20 s por meta, un minuto más para el experimento). Las marcas se guardan como `ia1` en `rtagi-estrellas-v1`. Una partida de antes cuenta lo ya hecho sin estrellas.

**Capítulos con reloj en la etapa 2.** Con dos metas propias:
- `seg`: el % de seguridad, que cuenta el motor;
- `spy`: los espías atrapados adentro, que cuenta `interior.js` y se guarda como `spy`.

| Capítulo | Metas | ★★★ hasta | ★★ hasta |
|---|---|---|---|
| Cómputo a escala | cómputo, una supercomputadora al día, un puesto de guardia | 4:00 | 6:00 |
| Seguridad primero | seguridad, un laboratorio de seguridad, 20% de seguridad | 3:20 | 5:00 |
| Espías | productos, una empresa de IA, un espía atrapado adentro | 4:00 | 6:00 |
| La diplomacia | diplomacia, una embajada, ciencia, 50% de seguridad | 5:20 | 8:00 |
| La AGI | tratado, escalado, 100% de seguridad, la AGI | 8:20 | 12:30 |

Calibrado con el bot en la era AGI sola (3 corridas, 11,5 min; los inventos a los 100, 189, 289, 326, 372, 442, 539, 601 y 690 s).

**La pizarra de la supercomputadora: seguridad o velocidad** (etapa 2, decidido en el trabajo autónomo: la etapa necesitaba una decisión propia y la AGI pide seguridad 100%). En una era con rival, la pizarra tiene una tercera opción.
- **Seguridad:** lo de adentro deja de dar ideas o monedas y suma `INT_SAFE` (0,02) puntos de seguridad por segundo por cada edificio que suma por dentro. Un rack al máximo da 1,2% por minuto; un laboratorio de seguridad, 3%. Una supercomputadora llena (5 racks y 2 escritorios), unos 7% por minuto.
- Se decide por edificio y se puede cambiar cuando quieras: ir más rápido o ir con cuidado.
- Se guarda en el cuarto dato de cada edificio: 2 es seguridad (0, ideas; 1, monedas).
- El renglón de abajo del interior achica la letra si no entra.

**El laboratorio de IA por dentro** (etapa 1; en la etapa 2 pasa a instituto, con lo de adentro). Lo decidí en el trabajo autónomo: era el punto 4 del plan, un segundo edificio para recorrer y distinto del centro de datos.
- Es otro plano en `interior.js` (`plano:'lab'`, `INT_MAPS`), con la puerta en el mismo lugar.
- Tiene 3 mesas de experimentos, una cuarta que traen las cajas, 2 escritorios y las cajas.
- Una mesa entrena un modelo y hay que elegir cómo (`INT_EXP`, ideas en la unidad de la Antigüedad):

  | Experimento | Tarda | Da | Cuesta | Sale mal |
  |---|---|---|---|---|
  | Prudente | 60 s | +6 | 15 monedas | 10% |
  | Ambicioso | 30 s | +10 | 30 monedas | 40% |

- El experimento sigue con el laboratorio cerrado (también con la partida cerrada: se guarda). Al terminar avisa, y hay que ir a ver qué salió.
- Si sale mal, se escapa un modelo desalineado que corre por el piso 15 segundos. Tocarlo da la mitad de las ideas; si salís o se escapa, no da nada.
- El laboratorio no produce ideas por sí mismo (multiplica las de los demás), así que adentro los escritorios aceleran los experimentos: +50% cada persona sentada.
- Se guarda con lo demás de adentro, como séptimo y octavo dato de cada edificio: lo que falta de cada mesa y qué experimento tiene. Una partida sin esos datos arranca con las mesas libres.
- Los espías de la etapa 2 también se meten en los institutos: van a una mesa en vez de un rack.

**Balance de lo de adentro** (cuentas, sin bot: el bot no juega la carrera de la IA).
- Un rack al máximo cuesta en total 20 de piedra, 48 de mineral y 45 monedas, y suma lo que un centro de datos entero. El tercer centro de datos cuesta 90 de piedra y 22 de mineral, y sigue subiendo ×1,5.
- O sea: los racks rinden como el tercer o cuarto centro de datos. No se encarecen, pero hay 5 por edificio, se recalientan cada ~75 s y hay que entrar a enfriarlos.
- Lo dejo así: premia jugar adentro, que es lo que se está probando. Si la etapa 1 se pasa demasiado rápido, lo primero es encarecer los racks.

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
