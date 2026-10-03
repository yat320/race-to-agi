# Race to AGI

Juego de gestión en pixel art: la humanidad avanza de la Prehistoria a la AGI en 10 eras. Todo es HTML + canvas, sin dependencias, pensado para jugar en el celular.

## Qué hay

| Archivo | Qué es | Estado |
|---|---|---|
| `index.html` | Inicio del mundo abierto: sus 11 eras (con la que toca jugar marcada), el progreso hacia la AGI y el código de progreso; las misiones y la carrera por turnos quedan plegadas en "Otros modos que probamos" | funciona |
| `era1.html` | Prehistoria por misiones (10 misiones, estilo Farm Frenzy) | jugable, probado con bot |
| `era2.html` | Antigüedad por misiones (10 misiones, ciudad que crece) | jugable, probado con bot |
| `carrera.html` | Prototipo por turnos (mapa, árbol de tecnologías, rival que corre a la obra) | prototipo, probado con simulaciones |
| `mundo.html` | Prototipo de mundo abierto, Prehistoria: explorar, juntar recursos, sumar aldeanos, construir el ábaco | prototipo, retomado |
| `src/mundo/motor.html` | Motor común de las eras 2 a 11 del mundo abierto: reglas, render, HUD y todas las mecánicas (humo, red eléctrica, bichos, ciudades y virus, robots, rival, meteoritos). `npm run build` le mete los datos y el arte de cada era (`src/mundo/<era>.js`) y escribe `dist/mundoN.html` | funciona |
| `src/mundo/antiguedad.js` → `mundo2.html` | Mundo abierto, Antigüedad: cobre, monedas, 13 edificios, piratas que desembarcan a robar (tocalos o poné atalayas) y el mecanismo de Anticitera; arranca con lo que trae la tribu de la Prehistoria | prototipo, retomado |
| `src/mundo/edad-media.js` → `mundo3.html` | Mundo abierto, Edad Media: hierro, monasterios, ferias, molinos de viento, universidades, una peste que se contagia de casa en casa (tocá las casas enfermas o poné hospitales) y la imprenta; arranca con lo que trae la ciudad de la Antigüedad | prototipo, retomado |
| `src/mundo/renacimiento.js` → `mundo4.html` | Mundo abierto, Renacimiento: plata, talleres de artistas, bancos, jardines botánicos, carabelas, academias y la pascalina; arranca con lo que trae la ciudad de la Edad Media | prototipo |
| `src/mundo/industria.js` → `mundo5.html` | Mundo abierto, Industria: carbón, minas, fábricas, trenes, barcos de vapor y la máquina analítica; las chimeneas echan humo que hace juntar y cosechar menos, y los parques lo limpian; arranca con lo que trae la ciudad del Renacimiento | prototipo |
| `src/mundo/electricidad.js` → `mundo6.html` | Mundo abierto, Electricidad: cobre, usinas, represas, postes y cables; los edificios con ⚡ andan solo si están conectados a la red; obra final: la tabuladora eléctrica; arranca con lo que trae la ciudad de la Industria | prototipo |
| `src/mundo/computacion.js` → `mundo7.html` | Mundo abierto, Computación: silicio, computadoras, oficinas y bichos que traban las máquinas y hay que tocar antes de que se contagien; obra final: el microprocesador; arranca con lo que trae la ciudad de la Electricidad | prototipo |
| `src/mundo/internet.js` → `mundo8.html` | Mundo abierto, Internet: litio, servidor y antenas para conectar cuatro ciudades lejanas que dan monedas e ideas; por la red llegan virus que hay que tocar antes de que tumben el servidor; obra final: el teléfono inteligente; arranca con lo que trae la ciudad de la Computación | prototipo |
| `src/mundo/ia.js` → `mundo9.html` | Mundo abierto, IA: tierras raras, centros de datos y fábricas de robots que juntan solos; los robots a veces se desalinean y convierten tus recursos en clips hasta que los tocás; obra final: el asistente universal; arranca con lo que trae la ciudad de la era de Internet | prototipo |
| `src/mundo/agi.js` → `mundo10.html` | Mundo abierto, AGI: carrera contra un laboratorio rival que acelera; la AGI necesita seguridad 100%, las embajadas y el tratado frenan al rival y, si llega primero, se pierde la carrera y se puede reintentar; arranca con lo que trae la ciudad de la era de la IA | prototipo |
| `src/mundo/post-agi.js` → `mundo11.html` | Mundo abierto, era estelar (la que sigue a la AGI): iridio, puerto espacial con cohetes, escudos y meteoritos que hay que tocar antes de que dañen tus edificios (o dejarlos caer en tierra libre por el iridio del cráter); obra final: la esfera de Dyson; arranca con lo que trae la ciudad de la AGI | prototipo |
| `arbol.html` | Prototipo del árbol de progreso de las 10 eras (sin juego atrás) | prototipo |

## Correr

```bash
npm install                     # solo para los bots (Playwright); el juego no necesita nada
npx playwright install chromium # una vez, baja el navegador que usan los bots
npm run serve                   # arma dist/ y lo sirve en http://localhost:8765
npm run bot:era2                # un bot juega las 10 misiones de la Antigüedad y reporta tiempos
npm run sim:carrera             # 40 partidas rival vs rival del prototipo por turnos
npm run huella:mundo            # juega un guion fijo en cada era del mundo abierto y guarda la huella en out/huella
npm run bot:mundo               # un bot juega las eras 2 a 11 del mundo abierto encadenadas y reporta minutos hasta cada obra
```

Los bots arman `dist/` y lo sirven solos en un puerto libre; no hace falta tener `npm run serve` corriendo. Al final `bot:era1` y `bot:era2` dicen cuántas misiones ganaron y cuántas quedaron bajo el oro; salen con error si alguna no se gana o hay errores de página. Si ya hay un Chromium instalado y no se puede bajar otro, `PW_CHROMIUM=/ruta/al/chrome npm run bot:era2`.

`index.html` y `arbol.html` están escritos "estilo artifact" (sin `<head>` propio) porque así se publican en Claude; `tools/build.mjs` los envuelve al armar `dist/`. Las eras y `carrera.html` son documentos completos. Las eras 2 a 11 del mundo abierto no están en la raíz: `tools/build.mjs` las arma desde `src/mundo/` (abrirlas siempre desde `dist/`, con `npm run serve`).

## Publicar

`.github/workflows/pages.yml` arma `dist/` en cada push. Desde `main` además lo publica en GitHub Pages: https://yat320.github.io/race-to-agi/ (en Settings → Pages, "Source" tiene que estar en "GitHub Actions"). En las otras ramas solo verifica que el build ande.

Las decisiones de diseño y las reglas que hay que respetar están en `CLAUDE.md`.
