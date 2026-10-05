# Era 2: Antigüedad

Datos y arte en `src/mundo/antiguedad.js`; se juega en `mundo2.html` (lo arma `npm run build`). Partida en `rtagi-mundo2-v1`.

## Qué tiene

La Antigüedad (cobre, monedas, 13 edificios con la atalaya, piratas; el mecanismo de Anticitera).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas y bonos de ábaco, rueda y agricultura. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La Antigüedad tiene **piratas** (`ERA.pirates`, desde que se inventa la moneda): cada ~90 s (más seguido con cada invento y 30% más con la navegación, `pirateEvery`) un barco desembarca piratas en la costa del mar más cercana a un edificio (el mar es el agua unida al borde del mapa, `ocean()`; los lagos no cuentan). Caminan hasta el edificio, roban monedas (6 más el 10% de las que tenés, `PIRATE_COINS` y `PIRATE_CUT`) y cobre (hasta 5, `PIRATE_ORE`) y vuelven al barco; desde 5 inventos bajan de a dos. Tocarlos los echa (+2 ideas) y devuelve lo robado. Las atalayas (`ERA.defense`, la misma defensa que los escudos de la era estelar) echan solas a los que pasan a 4 casilleros, y la barra del HUD muestra qué parte de los edificios cubren. Los piratas no se guardan. En octubre de 2026 Juani pidió suavizarlos: antes llegaban cada ~75 s y robaban 15 + 20% de las monedas y hasta 10 de cobre, y sin tocarlos ni atalayas la era tardaba más del doble (con el bot, la era sola: 20,2 min contra 9,3). Con el bot (la era sola): tocándolos se termina en ~9,3 min (~10,2 si toca cada 15 s); sin tocarlos pero con 2 atalayas, en ~10,3; sin tocarlos ni atalayas, en ~12,8. Encadenada, ~7,4.

## Arte

La colina (`HILL`) reemplaza al suelo rocoso y hay sprites propios para el cobre, sus edificios, la atalaya con brasero, el barco pirata y los piratas (pañuelo rojo, parche y sable, con un halo rojo).
