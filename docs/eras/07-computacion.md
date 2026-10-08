# Era 7: Computación

Datos y arte en `src/mundo/computacion.js`; se juega en `mundo7.html` (lo arma `npm run build`). Partida en `rtagi-mundo7-v1`.

## Qué tiene

La Computación (silicio, computadora, oficina, trampa de luz, galpón de tractores, universidad; usina, poste y represa disponibles de entrada; las polillas que traen los bichos; el microprocesador como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de tabuladora y refrigeración. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La Computación suma los **bichos**, una amenaza que hay que tocar como las de las misiones. A cada máquina con `bug` que anda (computadora, oficina) le sale uno cada ~90 s (`bugRate`; el transistor y la depuración lo bajan). Una máquina con bicho no produce, y si nadie lo aplasta se contagia a otra a 5 casilleros cada 25 s (`bugSpread`, 50 con depuración). Tocar la máquina lo aplasta y da +3 ideas, y el bicho se guarda con la partida. Desde octubre de 2026 los bichos no salen solos: llegan volando como **polillas** (`ERA.moths`, como la polilla que trabó la Mark II en 1947). Desde el minuto de juego, cada ~30 s (el doble de noche, más seguido con cada invento y 40% menos con el transistor y con la depuración, `mothEvery`; desde 5 inventos vienen de a dos) entra una polilla desde 14 casilleros y vuela hacia una máquina con bichos que ande (`moths`, no se guardan). Si llega, la traba como un bicho, pero con polillas el bicho ya no se contagia: si nadie toca la máquina, los programadores la depuran solos en un minuto (30 s con la depuración, `bugFix`). Con el contagio, ignorándolas alcanzaba con una polilla para trabar todas las máquinas para siempre. Tocarla en el aire la atrapa (+2 ideas). Las trampas de luz (`ERA.defense`) atraen a las que pasan a 4 casilleros y las atrapan. Con el bot (la era sola): tocándolas se termina en ~8,6 min (~9,7 si toca cada 15 s; con los bichos de antes tardaba 8,5 tocándolos y sin tocarlos no terminaba); sin tocar pero con 2 trampas, en ~8,9; sin tocar ni trampas, en ~14,8. Encadenada, ~7,9.

## Arte

Cuarzo, casa moderna con antena, centro de cómputos con lucecitas que titilan (`blink`), oficina de vidrio, trampa de luz violeta (`ERA.deco`), galpón con tractor, universidad con antena parabólica y la polilla (`HS.bug`, `drawBug` en la máquina trabada y `drawMoths` volando, con halo rojo).

## Como la Prehistoria: obras, mundo vivo y una era más corta (octubre de 2026)

Juani: "llevá lo mismo a la Computación", después de la Antigüedad, la Edad Media, el Renacimiento, la Industria y la Electricidad (ver sus docs).

- **Obras** (`obras:true`): lo que ubicás queda en obra y lo levantan vos y hasta 2 aldeanos. Los postes se ponen de una (`noObra`).
- **Mundo vivo** (`vida:true`, el mismo `vida.js`):
  - **Cabras sueltas** que se cazan por comida.
  - **Sequía de verano:** las granjas rinden la mitad salvo que tengas un galpón de tractores, el edificio que las potencia.
  - **Mercaderes con dos tratos**, desde el transistor (el invento de la oficina).
  - No hay puerto, así que no llegan barcos.
- **Más corta:** sin los lenguajes de programación, que solo daban +50% de ideas. Quedan 8 inventos y las carreras de computación piden solo el transistor.
  - Circuito integrado: 45 de silicio, 35 monedas y 240 ideas (antes 60, 45 y 320).
  - Microprocesador: 80 de piedra, 60 de silicio, 60 monedas y 450 ideas (antes 110, 90, 100 y 650).

Con el bot (3 corridas): encadenada, 4,5 min (antes 4,8); sola, 10 (antes 10,9).
