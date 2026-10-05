# Era 4: Renacimiento

Datos y arte en `src/mundo/renacimiento.js`; se juega en `mundo4.html` (lo arma `npm run build`). Partida en `rtagi-mundo4-v1`.

## Qué tiene

El Renacimiento (plata, taller de artistas, banco que cambia plata por monedas, jardín botánico, palomar, puerto con carabelas, academia; las langostas; la pascalina como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de imprenta y molinos. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

El Renacimiento tiene **langostas** (`ERA.locusts`): desde los 2 minutos de juego, cada ~45 s (más seguido con cada invento, `locustEvery`; desde 5 inventos vienen de a dos) una manga llega volando desde 16 casilleros hacia una granja (`swarms`, no se guardan). Al posarse arrasa con el 20% de la comida guardada y, mientras come, la nube tapa todo lo que está a 2,5 casilleros (`covered()`, `LOCUST_R`): nada de eso produce (`broken()` lo cuenta) y se sigue comiendo 0,5 de comida por segundo. A los 20 s salta a la granja más cercana a 8 casilleros o menos, hasta 3, y después se va. Tocarla la espanta (+2 ideas). Los palomares (`ERA.defense` con `of:['granja']`) espantan solos a las que pasan a 4 casilleros, así que conviene poner las granjas en las afueras, con palomares, lejos de los talleres y bancos. Se probó antes que solo comieran comida, que los talleres comieran y que dejaran las granjas arrasadas: la comida casi no es un cuello de botella (la juntan los aldeanos) y el bot no lo notaba. Con el bot (la era sola): tocándolas se termina en ~9,8 min (~10,7 si toca cada 15 s; sin langostas tardaba 10,3, porque tocarlas da ideas); sin tocarlas pero con 2 palomares, en ~11,9; sin tocarlas ni palomares, en ~14,7. Encadenada, ~6,5.

## Arte

Plata, casa de revoque ocre, taller de artistas, banco, jardín botánico, palomar con palomas que dan vueltas (`ERA.deco`), puerto con carabela y academia con cúpula, y las langostas (`drawLocusts`: una nube oscura de bichos con sombra y halo rojo al volar, y el marco rojo sobre la granja que comen).
