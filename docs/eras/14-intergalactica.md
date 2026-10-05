# Era 14: Era intergaláctica

Datos y arte en `src/mundo/intergalactica.js`; se juega en `mundo14.html` (lo arma `npm run build`). Partida en `rtagi-mundo14-v1`.

## Qué tiene

La era intergaláctica, la que sigue a la galáctica (materia oscura, casa de anillos, cronoteca, ancla temporal, portal intergaláctico, huerto cuántico, pozo gravitatorio, detector de ondas gravitatorias; las grietas temporales; la red de agujeros de gusano como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de federación galáctica, xenoagricultura y cartografía galáctica. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La era intergaláctica (octubre de 2026) suma **grietas temporales** (`ERA.rifts`; los agujeros de gusano rajan el tiempo, y la amenaza usa las versiones viejas de los edificios básicos): desde los 2 minutos de juego, cada ~45 s (más seguido con cada invento, +10%, y con los agujeros de gusano, +30%, `riftEvery`) se abre una grieta sobre un edificio que produce (`riftable`: con `prod`, o el de ideas o el de granjas de la era; `rifts`, no se guardan). Cada 8 s (12 con la física del tiempo, `riftStep`) lo hace retroceder una época (`o.past`, hasta 3, se guarda): se ve y se llama como era antes (`pastEp`, `nameOf`: la holoplaza vuelve a ser centro cultural, café y fogata; el domo de cultivo, granja con riego, granja a vapor y granja), lo que no tiene versión vieja se ve en sepia (`pastArt`) y todo lleva un reloj de arena en la esquina con un punto por época (`pastBadge`). Rinde la mitad por cada época (`pastW`, que `recount()` suma a `OLDC` y `broken()` a `BROKEN_OLD`, como el atraso de era). Después de 3 épocas salta una vez al que produce más cercano a 6 casilleros (`RIFT_JUMPS`, `RIFT_HOP`) y se cierra. Tocar la grieta la cierra (+2 ideas) y trae al presente lo que tocaba; tocar lo que retrocedió lo trae al presente (+2 ideas, `restore`). Si nadie lo toca, el tiempo se acomoda solo: avanza una época cada 25 s (`RIFT_HEAL`, `riftHeal`). Las anclas temporales (`ERA.defense`, r = 4, con un anillo dorado que gira al derecho en `ERA.deco`) cierran las grietas que se abren cerca y traen al presente lo que retrocedió cerca, una época cada 5 s; la barra del HUD cuenta qué parte de lo que produce cubren (`riftRow`). La grieta es un remolino que gira al revés, con un reloj de agujas que retroceden y un anillo dorado que se llena hasta el próximo salto atrás (`drawRifts`); lo que está por retroceder titila (`pastLv`) y las que están fuera de pantalla se marcan con una flecha roja. Se probó con 3 saltos y 60 s por época: sin tocarlas ni anclas todo quedaba tres épocas atrás y la era tardaba ~35 min. Con el bot (la era sola): tocándolas se termina en ~10,8 min (~10,9 si toca cada 15 s); sin tocarlas pero con 2 anclas, en ~10,8; solo con 2 patrullas del tiempo, en ~12; sin tocarlas ni defensas, en ~15,5 (entre 13,3 y 17,3). Encadenada, ~3,5.

## Arte

Materia oscura (roca negra con un remolino violeta), casa de anillos, cronoteca con libros de todas las épocas y un reloj en el frente, ancla temporal con su anillo dorado que gira (`ERA.deco`), portal intergaláctico con un remolino azul, huerto cuántico con plantas que están en dos lugares a la vez, pozo gravitatorio con una esfera oscura, detector de ondas gravitatorias con dos brazos en ángulo recto, la grieta (`drawRifts`) y lo que retrocedió (con el dibujo de otra época o en sepia, `pastArt`, y un reloj de arena, `pastBadge`).
