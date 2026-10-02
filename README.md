# Race to AGI

Juego de gestión en pixel art: la humanidad avanza de la Prehistoria a la AGI en 10 eras. Todo es HTML + canvas, sin dependencias, pensado para jugar en el celular.

## Qué hay

| Archivo | Qué es | Estado |
|---|---|---|
| `index.html` | Hub: lista de eras, prototipos, progreso total, código de legado | funciona |
| `era1.html` | Prehistoria por misiones (10 misiones, estilo Farm Frenzy) | jugable, probado con bot |
| `era2.html` | Antigüedad por misiones (10 misiones, ciudad que crece) | jugable, probado con bot |
| `carrera.html` | Prototipo por turnos (mapa, árbol de tecnologías, rival que corre a la obra) | prototipo, probado con simulaciones |
| `mundo.html` | Prototipo de mundo abierto (Prehistoria libre: explorar, juntar recursos, sumar aldeanos, construir el ábaco) | prototipo, retomado |
| `arbol.html` | Prototipo del árbol de progreso de las 10 eras (sin juego atrás) | prototipo |
| `archive/` | Antigüedad en mundo abierto (versión anterior), por si sirven piezas | referencia |

## Correr

```bash
npm install                     # solo para los bots (Playwright); el juego no necesita nada
npx playwright install chromium # una vez, baja el navegador que usan los bots
npm run serve                   # arma dist/ y lo sirve en http://localhost:8765
npm run bot:era2                # un bot juega las 10 misiones de la Antigüedad y reporta tiempos
npm run sim:carrera             # 40 partidas rival vs rival del prototipo por turnos
```

Los bots arman `dist/` y lo sirven solos en un puerto libre; no hace falta tener `npm run serve` corriendo. Al final `bot:era1` y `bot:era2` dicen cuántas misiones ganaron y cuántas quedaron bajo el oro; salen con error si alguna no se gana o hay errores de página. Si ya hay un Chromium instalado y no se puede bajar otro, `PW_CHROMIUM=/ruta/al/chrome npm run bot:era2`.

`index.html` y `arbol.html` están escritos "estilo artifact" (sin `<head>` propio) porque así se publican en Claude; `tools/build.mjs` los envuelve al armar `dist/`. Las eras y `carrera.html` son documentos completos.

## Publicar

`.github/workflows/pages.yml` arma `dist/` en cada push. Desde `main` además lo publica en GitHub Pages: https://yat320.github.io/race-to-agi/ (en Settings → Pages, "Source" tiene que estar en "GitHub Actions"). En las otras ramas solo verifica que el build ande.

Las decisiones de diseño y las reglas que hay que respetar están en `CLAUDE.md`.
