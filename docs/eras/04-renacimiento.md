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

## Como la Prehistoria: obras, mundo vivo y una era más corta (octubre de 2026)

Juani: "llevá lo mismo al Renacimiento", después de la Antigüedad y la Edad Media (ver sus docs).

- **Obras** (`obras:true`): lo que ubicás queda en obra y lo levantan vos y hasta 2 aldeanos.
- **Mundo vivo** (`vida:true`, el mismo `vida.js`):
  - **Cabras sueltas** que se cazan por comida.
  - **Sequía de verano:** las granjas rinden la mitad salvo que tengas un jardín botánico, el edificio que las potencia. Se suma a las langostas, que también van contra las granjas.
  - **Mercaderes con dos tratos**, desde la banca (el invento del banco).
  - **Barcos de comercio** que atracan en el puerto.
- **Más corta:** sin el telescopio, que solo daba +50% de ideas. La noche ahora la dan las carabelas, así que quedan 8 inventos y la pascalina pide carabelas y mecánica.
  - Mecánica de precisión: 45 de plata, 35 monedas y 240 ideas (antes 60, 45 y 320).
  - Pascalina: 80 de piedra, 60 de plata, 60 monedas y 450 ideas (antes 110, 90, 100 y 650).

Con el bot (3 corridas): encadenada, 3,7 min (antes 4,3); sola, 9,5 (antes 9,8).
