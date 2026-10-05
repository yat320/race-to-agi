# Race to AGI

Juego de gestión en pixel art: la humanidad avanza de la Prehistoria a la AGI, y más allá, era por era. Todo es HTML + canvas, sin dependencias, pensado para jugar en el celular.

## Qué hay

| Archivo | Qué es | Estado |
|---|---|---|
| `index.html` | Inicio del mundo abierto: sus eras (con la que toca jugar marcada), el progreso hacia la AGI, el código de progreso y, para probar, el modo prueba (abrir cualquier era y terminarla al toque) y empezar de cero; las misiones y la carrera por turnos quedan plegadas en "Otros modos que probamos" | funciona |
| `era1.html` | Prehistoria por misiones (10 misiones, estilo Farm Frenzy) | jugable, probado con bot |
| `era2.html` | Antigüedad por misiones (10 misiones, ciudad que crece) | jugable, probado con bot |
| `carrera.html` | Prototipo por turnos (mapa, árbol de tecnologías, rival que corre a la obra) | prototipo, probado con simulaciones |
| `mundo.html` | Prototipo de mundo abierto, Prehistoria: explorar, juntar recursos, sumar aldeanos, lobos de noche que acechan lejos del fuego (tocalos, poné antorchas o criá perros, que además ayudan a cazar), construir el ábaco | prototipo, retomado |
| `src/mundo/motor.html` | Motor común de las eras del mundo abierto desde la 2: reglas, render, HUD y todas las mecánicas (humo, red eléctrica, bichos, ciudades y virus, robots, rival, meteoritos, nanobots, ovnis, grietas temporales, agujeros negros, dobles) y los guardianes de cada era (soldado, médico de la peste, policía, drones, agente…), que salen solos de su cuartel a frenar la amenaza. `npm run build` le mete los datos y el arte de cada era (`src/mundo/<era>.js`) y escribe `dist/mundoN.html` | funciona |
| `src/mundo/antiguedad.js` → `mundo2.html` | Mundo abierto, Antigüedad: cobre, monedas, 13 edificios, piratas que desembarcan a robar (tocalos o poné atalayas) y el mecanismo de Anticitera; arranca con lo que trae la tribu de la Prehistoria | prototipo, retomado |
| `src/mundo/edad-media.js` → `mundo3.html` | Mundo abierto, Edad Media: hierro, monasterios, ferias, molinos de viento, universidades, una peste que se contagia de casa en casa (tocá las casas enfermas o poné hospitales) y la imprenta; arranca con lo que trae la ciudad de la Antigüedad | prototipo, retomado |
| `src/mundo/renacimiento.js` → `mundo4.html` | Mundo abierto, Renacimiento: plata, talleres de artistas, bancos, jardines botánicos, carabelas, academias, mangas de langostas que se comen las granjas (tocalas o poné palomares) y la pascalina; arranca con lo que trae la ciudad de la Edad Media | prototipo, retomado |
| `src/mundo/industria.js` → `mundo5.html` | Mundo abierto, Industria: carbón, minas, fábricas, trenes, barcos de vapor y la máquina analítica; las chimeneas echan humo que hace juntar y cosechar menos, y los parques lo limpian; ludditas que salen de las casas a romper fábricas y minas, más seguido con humo (tocalos o poné sindicatos); arranca con lo que trae la ciudad del Renacimiento. Desde esta era no se junta a mano: tocar un recurso manda a buscarlo al aldeano más cercano, y los edificios básicos cambian con la época (granja a vapor, café, depósito…; después granja con riego, centro cultural, centro logístico; al final domo de cultivo, holoplaza, bóveda de estasis) | prototipo, retomado |
| `src/mundo/electricidad.js` → `mundo6.html` | Mundo abierto, Electricidad: cobre, usinas, represas, postes y cables; los edificios con ⚡ andan solo si están conectados a la red; tormentas que tiran rayos y cortan la red (tocá la nube o poné pararrayos); obra final: la tabuladora eléctrica; arranca con lo que trae la ciudad de la Industria | prototipo, retomado |
| `src/mundo/computacion.js` → `mundo7.html` | Mundo abierto, Computación: silicio, computadoras, oficinas y polillas que llegan volando a trabar las máquinas, el doble de noche (tocalas en el aire o poné trampas de luz); obra final: el microprocesador; arranca con lo que trae la ciudad de la Electricidad | prototipo, retomado |
| `src/mundo/internet.js` → `mundo8.html` | Mundo abierto, Internet: litio, servidor y antenas para conectar cuatro ciudades lejanas que dan monedas e ideas; por la red llegan virus que se meten en las compus y borran ideas (tocalos en el camino o poné soporte técnico cerca de las compus); obra final: el teléfono inteligente; arranca con lo que trae la ciudad de la Computación | prototipo |
| `src/mundo/ia.js` → `mundo9.html` | Mundo abierto, IA: tierras raras, centros de datos y fábricas de robots que juntan solos; los robots a veces se desalinean y toman un centro de datos, una empresa o un laboratorio para hacer clips (tocalos o poné centros de supervisión); obra final: el asistente universal; arranca con lo que trae la ciudad de la era de Internet | prototipo |
| `src/mundo/agi.js` → `mundo10.html` | Mundo abierto, AGI: carrera contra un laboratorio rival que acelera; la AGI necesita seguridad 100%, las embajadas y el tratado frenan al rival, sus espías copian tus planos para adelantarlo (tocalos o poné puestos de guardia) y, si llega primero, se pierde la carrera y se puede reintentar; arranca con lo que trae la ciudad de la era de la IA | prototipo |
| `src/mundo/post-agi.js` → `mundo11.html` | Mundo abierto, era estelar (la que sigue a la AGI): iridio, puerto espacial con cohetes, escudos y meteoritos que hay que tocar antes de que dañen tus edificios (o dejarlos caer en tierra libre por el iridio del cráter), y drones que arreglan solos lo dañado a los 3 minutos; obra final: la esfera de Dyson; arranca con lo que trae la ciudad de la AGI | prototipo |
| `src/mundo/interestelar.js` → `mundo12.html` | Mundo abierto, era interestelar (la que sigue a la estelar): materia exótica, astillero estelar, nubes de nanobots grises que crecen y tapan lo que tocan (tocalas o poné campos de contención) y el motor de curvatura; arranca con lo que trae la ciudad de la era estelar | prototipo |
| `src/mundo/galactica.js` → `mundo13.html` | Mundo abierto, era galáctica (la que sigue a la interestelar): neutronio, mercado galáctico, ovnis que se llevan a tu gente con un rayo y la devuelven a los 3 minutos (tocalos o poné torres de interferencia cerca de donde trabajan) y la federación galáctica; arranca con lo que trae la ciudad de la era interestelar | prototipo |
| `src/mundo/intergalactica.js` → `mundo14.html` | Mundo abierto, era intergaláctica (la que sigue a la galáctica): materia oscura, portal intergaláctico, grietas temporales que hacen retroceder en el tiempo lo que produce (la holoplaza vuelve a ser café y fogata, y rinde la mitad por cada época; tocalas o poné anclas temporales) y la red de agujeros de gusano; arranca con lo que trae la ciudad de la era galáctica | prototipo |
| `src/mundo/cosmica.js` → `mundo15.html` | Mundo abierto, era cósmica (la que sigue a la intergaláctica): quarks, biblioteca de Babel, agujeros negros que flotan hacia la ciudad, atrapan gente en órbita, se tragan lo que tienen cerca y estiran los edificios (tocalos para evaporarlos, los grandes piden varios toques, o poné repulsores gravitatorios) y la computadora cósmica; arranca con lo que trae la ciudad de la era intergaláctica | prototipo |
| `src/mundo/multiversal.js` → `mundo16.html` | Mundo abierto, era multiversal (la que sigue a la cósmica): materia espejo, ventana a otros universos, dobles de tu gente que llegan por portales, se mezclan y te roban (los delata que titilan: tocalos o poné espejos de la verdad) y la puerta al multiverso; arranca con lo que trae la ciudad de la era cósmica | prototipo |
| `src/mundo/conciencia.js` + `amenazas/sirenas.js` → `mundo17.html` | Mundo abierto, era de la conciencia (la que sigue a la multiversal): cristales de recuerdo, palacio de la memoria, sirenas que cantan y atraen a tu gente, que deja de trabajar mientras las escucha (tocalas o poné cúpulas de silencio) y la conciencia compartida; arranca con lo que trae la ciudad de la era multiversal | prototipo |
| `src/mundo/genesis.js` + `amenazas/devoradores.js` → `mundo18.html` | Mundo abierto, era del génesis (la que sigue a la conciencia): polvo primordial, incubadora de universos, devoradores del vacío que se comen lo que más tenés y se dividen en dos si no los tocás (tocalos o poné barreras de vacío) y el universo bebé; arranca con lo que trae la ciudad de la era de la conciencia | prototipo |
| `src/mundo/omega.js` + `amenazas/frio.js` → `mundo19.html` | Mundo abierto, era omega (la que sigue al génesis): chispas, faro de la última luz, olas de frío que entran por un borde y congelan lo que pisan (tocá el corazón de hielo para romperlas o poné estufas estelares) y el punto omega; arranca con lo que trae la ciudad de la era del génesis | prototipo |
| `src/mundo/alfa.js` + `amenazas/torbellinos.js` → `mundo20.html` | Mundo abierto, era alfa (un universo nuevo nace del punto omega): fotones, prisma de ideas, torbellinos de luz que chupan lo que más tenés y lo desparraman en motas (juntalas, tocá el torbellino o poné estabilizadores de campo) y la primera luz | prototipo |
| `src/mundo/vida.js` + `amenazas/polizones.js` → `mundo21.html` | Mundo abierto, era de la vida: esporas, árbol sabio, polizones que se suben a tu gente y se comen lo que entrega (tocalos o poné arcos de limpieza) y el Edén cósmico | prototipo |
| `src/mundo/soles.js` + `amenazas/novas.js` → `mundo22.html` | Mundo abierto, era de los soles, la última: helio, planetario, estrellas inestables que caen con una cuenta regresiva y explotan rompiendo lo de alrededor (tocalas o poné blindaje solar) y la galaxia nueva | prototipo |
| `src/mundo/amenazas/` | Las amenazas en archivo propio (desde los dobles): cada una se registra sola en el motor y la prende la era que la usa; `LEEME.md` explica los ganchos | funciona |
| `docs/eras/` | Un doc por era: qué tiene, qué hereda, su amenaza, cómo se ajustó, cuánto tarda con el bot y su arte. `docs/hoja-de-ruta.md`, las que siguen | |
| `arbol.html` | Prototipo del árbol de progreso de las 10 eras (sin juego atrás) | prototipo |

## Correr

```bash
npm install                     # solo para los bots (Playwright); el juego no necesita nada
npx playwright install chromium # una vez, baja el navegador que usan los bots
npm run serve                   # arma dist/ y lo sirve en http://localhost:8765
npm run bot:era2                # un bot juega las 10 misiones de la Antigüedad y reporta tiempos
npm run sim:carrera             # 40 partidas rival vs rival del prototipo por turnos
npm run huella:mundo            # juega un guion fijo en cada era del mundo abierto y guarda la huella en out/huella
npm run bot:mundo               # un bot juega las eras del mundo abierto encadenadas, desde la 2 y reporta minutos hasta cada obra
npm run bot:prehistoria         # un bot juega la Prehistoria del mundo abierto y reporta cuándo saca cada invento y el ábaco
```

Los bots arman `dist/` y lo sirven solos en un puerto libre; no hace falta tener `npm run serve` corriendo. Al final `bot:era1` y `bot:era2` dicen cuántas misiones ganaron y cuántas quedaron bajo el oro; salen con error si alguna no se gana o hay errores de página. Si ya hay un Chromium instalado y no se puede bajar otro, `PW_CHROMIUM=/ruta/al/chrome npm run bot:era2`.

`index.html` y `arbol.html` están escritos "estilo artifact" (sin `<head>` propio) porque así se publican en Claude; `tools/build.mjs` los envuelve al armar `dist/`. Las eras y `carrera.html` son documentos completos. Las eras del mundo abierto desde la 2 no están en la raíz: `tools/build.mjs` las arma desde `src/mundo/` (y arma solas las listas de eras del inicio y de la Prehistoria) (abrirlas siempre desde `dist/`, con `npm run serve`).

## Publicar

`.github/workflows/pages.yml` arma `dist/` en cada push. Desde `main` además lo publica en GitHub Pages: https://yat320.github.io/race-to-agi/ (en Settings → Pages, "Source" tiene que estar en "GitHub Actions"). En las otras ramas solo verifica que el build ande.

Las decisiones de diseño y las reglas que hay que respetar están en `CLAUDE.md`.
