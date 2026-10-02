# Race to AGI — guía para trabajar en este repo

Juego de gestión en pixel art, en español rioplatense (voseo: "tocá", "vendé"). Se juega en el celular, en el navegador. Un archivo HTML por pieza, sin frameworks ni build para el juego en sí.

## Estado y dirección

- Lo que funciona y gustó: **misiones cortas con reloj** (`era1.html`, `era2.html`): metas, estrellas por tiempo, amenazas que hay que tocar, mejoras que quedan para siempre, talleres que persisten entre misiones.
- Lo que se está probando: **carrera por turnos** (`carrera.html`): mapa con niebla, árbol de tecnologías donde cada nodo habilita una acción en el terreno, un rival con las mismas reglas que corre hacia la misma obra, sabotaje en vez de combate. Referencia: Polytopia.
- Retomado: **mundo abierto** (`mundo.html`, la Prehistoria libre de antes, que vivía en `archive/`): mapa grande para explorar, recursos, aldeanos, inventos y el ábaco como obra final. Es un prototipo aislado: guarda en su propia clave y no escribe el legado de las eras.
- Decisión pendiente: si el juego final es por misiones, por turnos, mundo abierto o un híbrido. Primero se prueban mecánicas; la historia y los nombres históricos son piel, van después.

## Reglas de diseño (vienen del feedback de Juani, no cambiarlas sin preguntar)

1. Nada de tutorial largo. Solo pistas cortas en contexto (burbuja con flecha o botón que late), y cada pista una sola vez.
2. Las mejoras tienen que implicar decisión: las estrellas no alcanzan para comprar todo.
3. Una mejora se entiende de un vistazo: ícono + "3 → 5" + una línea. Nada de párrafos.
4. Lo construido persiste. Nunca "empezar de cero" entre misiones.
5. Todo diálogo tiene botón para cerrar abajo, y el botón atrás del celular cierra el diálogo en vez de salir del juego.
6. Todo tiene que poder tocarse: targets de ≥ 32 px, adyacencia en 8 direcciones.
7. Dificultad y presión: sin reloj, rival o amenaza que escale, el juego se siente plano.

## Arquitectura técnica

- Canvas con mundo lógico de 176×224 px (misiones) o 176×208 (carrera), escalado para llenar el ancho; `imageSmoothingEnabled=false`.
- Sprites como strings de caracteres sobre una paleta (`sprite(rows,w,pal)`), más dibujos procedurales. Sin assets externos.
- Mapa de la carrera en alta: pixel art procedural a `A=4` píxeles de arte por unidad del mundo (casillero de 64×64). `buildTerrain()` arma el terreno una vez por partida, `buildFog()` rearma la niebla cuando cambia lo visto y `HI` tiene los sprites del mapa. `S` queda para los íconos chicos de la interfaz. Todo se pinta en un `Uint32Array` (`Art`) y se vuelca de una vez; si un píxel de arte queda más chico que uno de pantalla, se suaviza al achicar.
- Sonido: chiptune con Web Audio (`tone()` + diccionario `SFX`). Toggle guardado en `localStorage['rtagi-sound']`.
- Cambio de era desde el hub: `fetch('eraN.html')` + `document.write`. Cada página pone `window.__rtagiActive = ID` y todos los loops/listeners chequean `alive()`.
- Botón atrás: una sola entrada de historial mientras haya algo abierto (`syncNav()` coalescido con `setTimeout 0` + handler de `popstate`). Guardia de 450 ms contra el "ghost tap" que cerraba hojas recién abiertas.
- `requestAnimationFrame`: `dt = clamp((now-last)/1000, 0, 0.1)`. Sin el clamp hubo un freeze por dt negativo.
- Pantalla de misión: HUD arriba (nombre, reloj, monedas, barras oro/plata, metas), escena fija en canvas, barra de compra abajo. Hojas (sheet) para comercio y mejoras; modales para briefing, pausa y resultado.
- Ambiente de las misiones (`drawDeco`, `drawClouds`, `drawSmoke`, `pop`, `drawDayLight`): solo dibujo, no tocan el estado del juego. Matas y flores que se mecen, sombras de nubes, humo en talleres que cocinan, destello al juntar, monedas al vender. La luz se entibia al pasar el tiempo del oro y atardece al pasar el de la plata.
- Carrera: cámara con zoom (`SC = FIT × ZM`, `ZM` de 1 a 3) y centro `CX,CY` en coordenadas del mundo. Un dedo arrastra; dos dedos o la rueda acercan; botones +/− (el + centra lo seleccionado o la capital). Tocar selecciona al soltar, solo si no hubo arrastre.

### localStorage (compartido entre páginas, no renombrar sin migrar)

- `rtagi-legacy-v1`: `{v:1, eras:{'1':{done,dia,aldeanos,ideas,techs,estrellas}, '2':{...}}}`. Código exportable: `'RTAGI-' + btoa(unescape(encodeURIComponent(JSON)))`.
- `rtagi-era1-misiones-v1`, `rtagi-era2-misiones-v1`: `{best:{n:estrellas}, spent, upg:{}, built:{}}`.
- `rtagi-carrera-v1`: partida en curso del prototipo por turnos. `rtagi-mundo-v1`: partida del mundo abierto. `rtagi-arbol-v1`: estado del prototipo del árbol.
- Los prototipos se abren desde la sección "Prototipos" del hub (`PROTOS` en `index.html`, cada uno con su `state()` para mostrar la partida en curso).

## Cómo probar

- `npm run serve` y abrir `http://localhost:8765` (en el celular, usar la IP de la PC).
- Bots en `tools/`: juegan las misiones por código (`?debug` expone `window.__m`) y reportan tiempos. Los scripts de npm arman `dist/` y `tools/harness.mjs` lo sirve en un puerto libre; `bot:era1`/`bot:era2` terminan con un veredicto y salen con código 1 si una misión no se gana o hay errores de página (pasarse del oro solo se avisa). Los tiempos varían entre corridas (animales y pedidos son aleatorios): para ajustar estrellas, mirar varias corridas, no una. En 120 corridas de era2 todas quedaron bajo el oro salvo una M10 (419 s vs 400); el bot de era1 se pasa del oro en la M7 en ~30 % de las corridas porque gasta la leche/lana cruda que piden los pedidos. Sin poder bajar navegadores (nube de Claude): `PW_CHROMIUM=/opt/pw-browsers/chromium`. Regla usada para las estrellas: **oro ≈ 2× el tiempo del bot, plata ≈ 3×**. Si cambiás una misión, volvé a correr el bot y ajustá `gold`/`silver`.
- `tools/sim-carrera.mjs`: rival vs rival, 40 semillas. Meta: la obra se termina entre el turno 19 y 29 (promedio ~23).
- Antes de publicar, probar en viewport 400×850 con touch (los scripts usan Playwright con `isMobile:true`).

## Pendientes conocidos

- Android: la idea original era compilar para Android. Camino sugerido: Capacitor sobre `dist/`. Todavía no se hizo.
- Hosting: `.github/workflows/pages.yml` publica `dist/` en GitHub Pages (https://yat320.github.io/race-to-agi/) en cada push a `main`; en otras ramas solo arma. Las versiones publicadas como artifacts de Claude siguen existiendo pero no se actualizan desde acá.
- `carrera.html`: la IA conoce el mapa entero para moverse (no respeta su niebla). Aceptable para el prototipo.
