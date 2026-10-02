# Race to AGI

Juego de gestión en pixel art: la humanidad avanza de la Prehistoria a la AGI en 10 eras. Todo es HTML + canvas, sin dependencias, pensado para jugar en el celular.

## Qué hay

| Archivo | Qué es | Estado |
|---|---|---|
| `index.html` | Hub: lista de eras, progreso total, código de legado | funciona |
| `era1.html` | Prehistoria por misiones (10 misiones, estilo Farm Frenzy) | jugable, probado con bot |
| `era2.html` | Antigüedad por misiones (10 misiones, ciudad que crece) | jugable, probado con bot |
| `carrera.html` | Prototipo por turnos (mapa, árbol de tecnologías, rival que corre a la obra) | prototipo, probado con simulaciones |
| `arbol.html` | Prototipo del árbol de progreso de las 10 eras (sin juego atrás) | prototipo |
| `archive/` | Versiones anteriores de mundo abierto, por si sirven piezas | referencia |

## Correr

```bash
npm install            # solo para los bots (Playwright); el juego no necesita nada
npm run serve          # arma dist/ y lo sirve en http://localhost:8765
npm run bot:era2       # un bot juega las 10 misiones de la Antigüedad y reporta tiempos
npm run sim:carrera    # 40 partidas rival vs rival del prototipo por turnos
```

`index.html` y `arbol.html` están escritos "estilo artifact" (sin `<head>` propio) porque así se publican en Claude; `tools/build.mjs` los envuelve al armar `dist/`. Las eras y `carrera.html` son documentos completos.

Las decisiones de diseño y las reglas que hay que respetar están en `CLAUDE.md`.
