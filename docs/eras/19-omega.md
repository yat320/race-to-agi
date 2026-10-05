# Era 19: Era omega

Datos y arte en `src/mundo/omega.js`, y las olas de frío en `src/mundo/amenazas/frio.js`; se juega en `mundo19.html` (lo arma `npm run build`). Partida en `rtagi-mundo19-v1`.

## Qué tiene

La era omega, la que sigue al génesis y la última por ahora: los universos se enfrían y hay que juntar el calor que queda. Chispas (`chispa`, las últimas brasas del universo), casa hoguera, faro de la última luz (ideas), estufa estelar (la defensa), lonja del calor (monedas), invernadero eterno (potencia las granjas), recolector de chispas (da chispas), crónica del universo (la de ideas de la era) y la sala de fogoneros (el cuartel); las olas de frío; el punto omega como obra final; mapa propio.

Inventos, en orden: `chispa`, `estufas`, `calor` (la lonja; 30% más olas), `invernadero`, `recolector`, `abrigo` (lo congelado se descongela en la mitad), `cronica` (ideas +50% y de noche ves más lejos), `eternidad` (todo produce +50%) y `omega`, la obra. Los papeles para cuando la ciudad pase a otra era los deduce el build: faro → ideas, lonja → monedas, invernadero → `farmBuild`, recolector → mineral, crónica → `ideaBuild` y estufa → defensa.

## Qué hereda

De la era del génesis (`rtagi-mundo18-v1`), al terminarla: la ciudad entera, aldeanos, ideas, monedas y los bonos del universo bebé (`genesis`, ideas +25%), la cosecha de galaxias (`cosecha`, granjas +25%) y las leyes físicas a medida (`leyes`, te movés 20% más rápido). Los bonos están en `ERA.legacy.perks`. Abierta sin el génesis terminado, arranca con lo básico (`starterKit`), como las otras.

## Amenaza y balance

La era omega (octubre de 2026) suma **olas de frío** (`ERA.frost`): la mecánica nueva es un frente que cruza el mapa en línea. Desde los 2 minutos de juego, cada ~50 s (más seguido con cada invento, +10%, y con la lonja del calor, +30%, `frostEvery`) entra una ola desde fuera de la pantalla, por uno de los cuatro lados, a 16 casilleros de un edificio (`FROST_FROM`), y marcha derecho hacia él a 1 casillero por segundo (`FROST_SPD`); desde 5 inventos vienen de a dos, por lados distintos (`FROST_PAIR`). Es una línea de escarcha de 9 casilleros (`FROST_W` = 4 a cada lado), perpendicular a su marcha, con un corazón de hielo que brilla en el medio (`frosts`, no se guardan). Lo que el frente pisa se congela (`o.bug`, se guarda; cada ola congela cada casillero una sola vez, `w.seen`): no produce (`broken()`) hasta que lo tocás o hasta que se descongela solo a los 40 s (`FROST_THAW`; 20 con el abrigo cuántico, `frostThaw`). La gente que pisa (aldeanos y robots) anda y trabaja a la mitad durante 15 s (`FROST_CHILL`, `v.chill`, no se guarda). Después de 30 casilleros (`FROST_RUN`) la ola se disipa sola, así que si nadie hace nada el daño se termina solo. Tocar el corazón rompe la ola entera (+2 ideas; lo que ya congeló sigue congelado) y tocar lo congelado lo descongela (`tap` devuelve `'b'`). Las estufas estelares (`ERA.defense`, r = 4, con calor que sube y la panza que late en `ERA.deco`) derriten el frente donde lo toca su calor: ese pedazo de la línea se apaga para siempre (sube vapor) y la ola sigue con un hueco. El corazón no se derrite, pero lo que congela cerca de una estufa se descongela en 10 s (`FROST_NEAR`) y la estufa misma no se congela. La barra del HUD cuenta qué parte de los edificios está cerca de una estufa y cuántas olas y congelados hay (`frostRow`); la flecha roja del borde apunta al corazón. El fogonero (`ERA.guard`, la sala de fogoneros) va solo al corazón y a lo congelado que esté a 8 casilleros de su sala.

Se calibró primero con lo de la hoja de ruta (de a una, medio casillero por segundo, 60 s congelado): tocando, 9,6 min; sin tocar ni defensas, 14,8 (entre 11,4 y 17,8, con hasta la mitad de la ciudad congelada, porque el frente de 9 casilleros tapa casi toda la ciudad del bot); y con 2 salas de fogoneros, 9,5: la ciudad del bot cabe en 4,5 casilleros alrededor de los cuarteles y el fogonero, que sale a los 8, rompía casi todas las olas (79 de 82, en 4 corridas) antes de que tocaran un edificio. De a dos (desde 5 inventos), más rápido y 40 s congelado, los fogoneros no llegan a todo (rompen ~8 de cada 10) y el daño baja.

Con el bot (la era sola, 20 corridas por variante):

| Cómo juega el bot | mín | prom | máx | Lo congelado |
|---|---|---|---|---|
| Tocando | 9,2 | 9,6 | 9,8 | — |
| Tocando cada 15 s (`ritmo=5`) | 9,1 | 9,6 | 9,9 | — |
| Sin tocar, con estufas y salas de fogoneros | 9,8 | 10,1 | 10,8 | — |
| Sin tocar, solo con 2 salas de fogoneros | 9 | 10,2 | 12,1 | 7–24% |
| Sin tocar, solo con 2 estufas | 10,1 | 11,3 | 13,4 | 10–19% |
| Sin tocar ni defensas | 11,3 | 13,5 | 15,7 | 34–47% |

"Lo congelado" es la parte del tiempo de los edificios que pasaron congelados (6 corridas). Sin nada, la era tarda 1,4 veces lo de tocando.

### Lo que no toca el motor

- **Escarcha.** La dibuja `ERA.deco` con `frostCrust` (un bloque de hielo con brillo, nieve arriba y carámbanos). Encima, el motor dibuja `drawBug` (el marco rojo y `HS.bug`) en lo roto de las eras sin un daño propio, así que la era pone en `HS.bug` un copo de escarcha que tiembla. La fogata y el taller el motor los dibuja aparte, sin `ERA.deco`: su escarcha y su marco van en `drawOver`.
- **Gente entumecida.** El motor mueve a la gente después de las amenazas, así que `update` les devuelve la mitad de lo que caminaron en el cuadro anterior y les estira el trabajo a la mitad.

## Arte

Chispas (roca oscura rajada con brasas adentro y chispas que saltan), casa hoguera (de piedra, con techo de pizarra nevado, chimenea con brasas y la luz del fuego en la puerta), faro de la última luz (torre blanca y roja con la linterna encendida y un haz que gira), estufa estelar (de hierro sobre patas, con una estrella chiquita en la panza y calor que sube del caño), lonja del calor (toldo a rayas, tres arcos y braseros), invernadero eterno (cúpula de vidrio nevada con plantas y un brasero), recolector de chispas (un embudo de cobre al que le caen chispas y un frasco de brasas), crónica del universo (un libro enorme abierto sobre un atril, donde se escribe una línea nueva). Los árboles están nevados. La ola (`drawFrosts`): una pared de escarcha con cristales hacia adelante, copos que vuelan y escarcha que queda en el suelo detrás (`drawFrostUnder`); el corazón es un cristal azul que late, con su halo rojo de amenaza, y al romperse los pedazos saltan. Los entumecidos llevan un copito arriba y hielo bajo los pies. El fogonero tiene gorra de maquinista con chapa, hollín en la cara y una pala con una brasa encendida.
