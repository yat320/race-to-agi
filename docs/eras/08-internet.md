# Era 8: Internet

Datos y arte en `src/mundo/internet.js`; se juega en `mundo8.html` (lo arma `npm run build`). Partida en `rtagi-mundo8-v1`.

## Qué tiene

Internet (litio, servidor, antena, cibercafé, tienda online, soporte técnico, laboratorio de semillas, buscador; cuatro ciudades lejanas en el mapa; virus que se meten en las compus; el teléfono inteligente como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de microprocesador y tractores. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

Internet deja atrás la luz y el humo (ya no hay usinas ni chimeneas; ese código quedó pero no se activa) y suma **ciudades y virus**. En el mapa hay 4 ciudades lejanas (`genObjects`, a ~18–20 casilleros). La red de datos (`grid()`) sale de los servidores y se estira con antenas que se enganchan a `LINK` = 5. Cada ciudad conectada da monedas e ideas, y rinde más cuantas más hay (`cityRate`). Cada ciudad conectada larga un virus cada ~30 s (más seguido con cada invento, `virusEvery`), que viaja por las antenas hasta el servidor (`viruses`, no se guardan) y sigue de largo hasta una compu al azar (`ERA.infect`: servidor, cibercafé, tienda o buscador). Tocarlo lo borra (+2 ideas). Si llega, se mete (`o.bug`, se guarda) y borra el 15% de las ideas guardadas (`VIRUS_LOSS`): esa compu no produce y, si es el servidor, la red se corta. Se limpia tocándola o sola a los 90 s (`VIRUS_FIX`, los técnicos). Hasta octubre de 2026 los virus iban solo al servidor y lo dejaban caído hasta tocarlo; como sin red no salen más virus, ignorándolos la amenaza se apagaba sola (con el bot, 8,3 min contra 7,1 tocándolos). El soporte técnico (`ERA.defense` con `of`) cuida las compus a 4 casilleros: los virus que llegan rebotan y lo infectado se limpia en 15 s. Su barra va en la fila del humo, porque la de la red la usan las ciudades (`defenseRow`). Los virus fuera de pantalla se marcan con una flecha roja en el borde. El cortafuegos los hace más lentos y con antivirus cada antena frena 1 de cada 4. Con el bot (la era sola): tocándolos se termina en ~7,2 min (~8,5 si toca cada 15 s); sin tocarlos pero con 2 soportes, en ~8,6; sin tocarlos ni soportes, en ~10,8. Encadenada, ~6,5.

## Arte

Litio, servidor con racks que titilan, antena reticulada, cibercafé, tienda online, invernadero, buscador con lupa, soporte técnico con auriculares en el cartel, ciudades con nombre arriba, fibra cian con paquetes que viajan (`drawWires`) y el virus (`HS.bug`, `drawViruses` en la red y `drawBug` en la compu infectada).

## Como la Prehistoria: obras, mundo vivo y una era más corta (octubre de 2026)

Juani: "llevá lo mismo a Internet", después de las eras de la Antigüedad a la Computación (ver sus docs).

- **Obras** (`obras:true`): lo que ubicás queda en obra y lo levantan vos y hasta 2 aldeanos. Las antenas se ponen de una (`noObra`: solo estiran la red); el servidor sí es obra.
- **Mundo vivo** (`vida:true`, el mismo `vida.js`):
  - **Cabras sueltas** que se cazan por comida.
  - **Sequía de verano:** las granjas rinden la mitad salvo que tengas un laboratorio de semillas, el edificio que las potencia.
  - **Mercaderes con dos tratos**, desde el comercio electrónico (el invento de la tienda online).
  - No hay puerto, así que no llegan barcos.
- **Más corta:** sin el correo electrónico, que solo daba +50% de ideas. Quedan 8 inventos y los buscadores piden solo el comercio electrónico.
  - Antivirus: 35 monedas y 200 ideas (antes 45 y 270).
  - Banda ancha: 45 de litio, 35 monedas y 240 ideas (antes 60, 45 y 320).
  - Teléfono inteligente: 80 de piedra, 60 de litio, 60 monedas y 450 ideas (antes 110, 90, 100 y 650).

Con el bot (3 corridas): encadenada, 3,1 min (antes 4,2); sola, 8,3 (igual que antes: sin abaratar el antivirus daba 8,5, porque levantar las obras lleva su tiempo).
