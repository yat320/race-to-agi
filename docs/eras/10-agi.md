# Era 10: AGI

Datos y arte en `src/mundo/agi.js`; se juega en `mundo10.html` (lo arma `npm run build`). Partida en `rtagi-mundo10-v1`.

## Qué tiene

La AGI (grafeno, supercomputadora, puesto de guardia, laboratorio de seguridad, empresa de IA, granja automática, embajada, instituto de investigación y el laboratorio rival en el mapa, con sus espías; la AGI como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de asistente universal y cultivo vertical, y 20% de seguridad de arranque si se investigó la interpretabilidad. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La AGI deja atrás los robots (el código quedó pero no se activa) y es una **carrera contra un rival** (`st.rival`, 0–100). El rival avanza solo y cada vez más rápido (`rivalRate` con `RIVAL_T` = 1600: llega en ~20 min de juego si nadie lo frena; calibrado con el bot para que jugando perfecto se termine con el rival en ~30%, tardando el doble en ~60% y tardando el triple se pierda si no se frena). Cómputo, ciencia y escalado lo apuran 10% cada uno; el tratado lo frena 30% y cada embajada 12% (`rivalMult`). El HUD calcula cuánto le falta contando la aceleración (`rivalEta`). La AGI necesita **seguridad** 100% (`st.safety`), que sube con laboratorios de seguridad (3%/min cada uno), con la investigación de seguridad (+10) y con el tratado (+20). Si el rival llega primero se pierde la carrera (`st.lost`, `showLose`) y se puede reintentar la era con doble toque; las eras anteriores no se tocan. Es la única era del mundo abierto que se puede perder. Desde octubre de 2026 el rival además manda **espías** (`ERA.spies`: supercomputadora, empresa de IA e instituto): desde los 2 minutos de juego, cada ~60 s (más seguido con cada invento, `spyEvery`; desde 5 inventos salen de a dos) sale uno del laboratorio rival y camina hasta uno de esos edificios, al azar (`spies`, no se guardan). Si llega, copia los planos 4 s: el rival avanza 2 puntos (`SPY_GAIN`) y el espía vuelve con una carpeta. Tocarlo lo atrapa (+2 ideas) y, si ya copió, el rival pierde lo que había ganado (`catchSpy`). Los puestos de guardia (`ERA.defense` con `of`) atrapan solos a los que pasan a 4 casilleros. El HUD no tiene una fila para la defensa (las dos son de la seguridad y el rival): la del rival suma cuántos espías vienen. Antes la AGI no tenía nada que tocar; se probó con 3 puntos cada 50 s y, sin tocarlos ni guardias, el bot perdía 2 de cada 3 carreras. Con el bot (la era sola): tocándolos se termina en ~10,5 min con el rival en ~42% (sin espías, 10 min y ~40%); tocando cada 15 s, en ~11,8 con ~49%; sin tocarlos pero con 2 puestos de guardia, el rival termina en ~65%; sin tocarlos ni guardias, en ~86% (entre 74 y 99). Encadenada, ~7,7 min con el rival en ~30%.

## Arte

Grafeno, casa con cúpula, supercomputadora, laboratorio de seguridad, empresa de IA, granja automática con dron, embajada con banderas, instituto con observatorio, puesto de guardia con baliza y barrera, la torre del rival con su porcentaje arriba y sus espías (piloto, sombrero y anteojos negros, con halo rojo; el edificio que copian late en rojo y el que vuelve lleva una carpeta con los planos, `drawSpies`).
