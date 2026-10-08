# Era 6: Electricidad

Datos y arte en `src/mundo/electricidad.js`; se juega en `mundo6.html` (lo arma `npm run build`). Partida en `rtagi-mundo6-v1`.

## Qué tiene

La Electricidad (cobre, usina, poste, pararrayos, represa, fábrica eléctrica, laboratorio, frigorífico, escuela; las tormentas; la tabuladora eléctrica como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de máquina analítica y ferrocarril. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La Electricidad suma la **red eléctrica** (`grid()`, se recalcula cuando cambian los edificios). Usinas y represas son fuentes de 6 de luz cada una. Un poste se engancha a la red si hay otra parte a `LINK` = 4,5 casilleros, y un edificio con ⚡ (`elec`) tiene luz si queda a `REACH` = 3 de la red. Sin luz no produce; si piden más luz de la que hay, todos rinden `supply/demand` (`act()` cuenta cuántos andan). Las usinas echan humo y las represas no (van pegadas al agua). La Electricidad tiene además **tormentas** (`ERA.storms`): desde los 2 minutos de juego, cada ~60 s (más seguido con cada invento, `stormEvery`) una nube cruza la ciudad con el viento a 0,8 casilleros por segundo (`storms`, no se guardan). Cada 5 s (3,5 desde 5 inventos) tira un rayo a algo eléctrico (usina, represa, poste o edificio con ⚡) a 3 casilleros o menos: lo quema (`o.bug`, se guarda). Lo quemado no da luz, no la lleva ni produce (`powerGrid()` saltea las fuentes y postes quemados), así que un rayo en la única usina apaga toda la red. Tocar la nube la disipa (+2 ideas) y tocar lo quemado lo arregla; si nadie lo toca, lo arreglan solos los electricistas a los 40 s (`STORM_FIX`; sin eso, ignorando las tormentas la red quedaba apagada para siempre y la era no se terminaba). Los pararrayos (`ERA.defense`) se llevan los rayos que caen a 4 casilleros o menos. La fila del HUD sigue siendo la de luz (dice "tormenta" o cuántos quemados). Con el bot (la era sola): tocando se termina en ~10,1 min (~11 si toca cada 15 s; sin tormentas tardaba 10,6); sin tocar pero con 2 pararrayos, en ~11,5; sin tocar ni pararrayos, en ~14,6. Encadenada, ~7,2.

## Arte

Cobre, casa italianizante, usina, poste con farol, pararrayos, represa, fábrica eléctrica, laboratorio con lamparita, frigorífico y escuela, más los cables (`drawWires`), un rayo tachado que titila sobre lo que no tiene luz (`noPower`) y las tormentas (`drawStorms`: la nube con lluvia, su sombra con el halo rojo y los rayos en zigzag; lo quemado se ve con `drawDamage`).

## Como la Prehistoria: obras, mundo vivo y una era más corta (octubre de 2026)

Juani: "llevá lo mismo a la Electricidad", después de la Antigüedad, la Edad Media, el Renacimiento y la Industria (ver sus docs).

- **Obras** (`obras:true`): lo que ubicás queda en obra y lo levantan vos y hasta 2 aldeanos. Los **postes** se ponen de una (`noObra`, en el motor: lo que solo estira la red, sin dar luz ni producir). Con el bot, como obras llegaban a juntarse 6 a la vez, ocupaban a los aldeanos y una corrida encadenada pasó de 4,7 a 9,8 min.
- **Mundo vivo** (`vida:true`, el mismo `vida.js`):
  - **Cabras sueltas** que se cazan por comida.
  - **Sequía de verano:** las granjas rinden la mitad salvo que tengas un frigorífico con luz, el edificio que las potencia.
  - **Mercaderes con dos tratos**, desde el motor eléctrico (el invento de la fábrica).
  - No hay puerto, así que no llegan barcos.
- **Más corta:** sin el teléfono, que solo daba +50% de ideas. Quedan 8 inventos y la tabuladora pide hidroelectricidad y válvulas.
  - Válvulas de vacío: 45 de cobre, 35 monedas y 240 ideas (antes 60, 45 y 320).
  - Tabuladora: 80 de piedra, 60 de cobre, 60 monedas y 450 ideas (antes 110, 90, 100 y 650).

Con el bot (3 corridas): encadenada, 4,2 min (antes 5); sola, 9 (antes 10,6). El reporte del bot ahora cuenta las obras (`obra` en el JSON: segundos con alguna obra esperando, cuántas a la vez y de qué edificios).
