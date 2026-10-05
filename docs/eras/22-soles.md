# Era 22: Era de los soles

Datos y arte en `src/mundo/soles.js`, y las estrellas inestables en `src/mundo/amenazas/novas.js`; se juega en `mundo22.html` (lo arma `npm run build`). Partida en `rtagi-mundo22-v1`.

## Qué tiene

La era de los soles, la que sigue a la de la vida y la última por ahora (en la fila de eras, "Soles"): con el universo nuevo lleno de vida, la humanidad aprende a encender estrellas, pero no todas salen estables. Helio (`helio`, burbujas de gas dorado), casa solar, planetario (ideas), blindaje solar (la defensa), subasta de estrellas (monedas), jardín solar (potencia las granjas), destilador de helio (da helio), gran astrolabio (la de ideas de la era) y la brigada de artificieros (el cuartel); las estrellas inestables; la galaxia nueva como obra final; mapa propio.

Inventos, en orden: `helio`, `blindaje`, `subasta` (la subasta de estrellas; caen 30% más estrellas), `jardinsolar`, `extraccion` (el destilador de helio), `enfriado` (las estrellas cuentan el doble de lento), `cartas` (cartas estelares: el gran astrolabio, ideas +50% y de noche ves más lejos), `sinfonia` (sinfonía de las esferas: todo produce +50%) y `galaxia`, la obra. Los papeles para cuando la ciudad pase a otra era los deduce el build: planetario → ideas, subasta → monedas, jardín solar → `farmBuild`, destilador → mineral, astrolabio → `ideaBuild` y blindaje → defensa.

## Qué hereda

De la era de la vida (`rtagi-mundo21-v1`), al terminarla: la ciudad entera, aldeanos, ideas, monedas y los bonos del Edén cósmico (`eden`, ideas +25%), la pradera viva (`pradera`, granjas +25%) y el templo de la simbiosis (`simbiosis`, te movés 20% más rápido). Los bonos están en `ERA.legacy.perks`. Abierta sin la era de la vida terminada, arranca con lo básico (`starterKit`), como las otras.

## Amenaza y balance

La era de los soles (octubre de 2026) suma **estrellas inestables** (`ERA.novas`): la mecánica nueva es una cuenta regresiva que explota en un área. Desde los 2 minutos de juego, cada ~45 s (más seguido con cada invento, +10%, y con la subasta de estrellas, +30%, `novaEvery`) cae del cielo una estrella chica: baja en diagonal en 1,2 s (`NOVA_FALL`) y queda en la tierra libre pegada a donde hay más edificios sanos juntos (`novaSpot`: el casillero libre con más edificios a 2,5 o menos, uno al azar entre los que tienen casi tantos como el mejor, a 3 o más de otra estrella; lo que cubre un blindaje atrae la mitad). Desde 4 inventos caen de a dos y desde 6, de a tres (`NOVA_PAIR`, `NOVA_TRIO`). Se queda en el suelo latiendo, con un número grande que cuenta para atrás desde 20 (`NOVA_FUSE`); el enfriado la hace contar a la mitad (`novaRate`). Si llega a 0, explota y rompe (`o.bug`, se guarda) todo lo que está a 2,5 casilleros (`NOVA_R`): no produce hasta que lo tocás o hasta que se arregla solo a los 42 s (`NOVA_FIX`), así que si nadie hace nada el daño se termina solo. Tocar la estrella la apaga (+2 ideas) y tocar lo roto lo arregla (`tap` devuelve `'b'`). Las estrellas no se guardan.

El blindaje solar (`ERA.defense`, r = 4) cubre lo que tiene a 4 casilleros: las estrellas que caen ahí cuentan a la mitad (con el enfriado, a un cuarto) y su explosión no rompe lo que cubre. Pero los blindajes que tenían cerca una estrella que explotó aguantan el golpe y se recalientan: durante 25 s (`NOVA_HEAT`, `o.heat`, no se guarda) no cubren, brillan rojo con una barrita de lo que les falta, y la barra del HUD los descuenta (`novaShields`). El blindaje mismo nunca se rompe. La barra del HUD cuenta qué parte de los edificios cubre un blindaje que anda, y cuántas estrellas, rotos y recalentados hay (`novaRow`); la flecha roja del borde apunta a cada estrella.

El artificiero (`ERA.guard`, la brigada de artificieros) va solo a las estrellas y a lo roto que esté a 8 casilleros de su brigada. A diferencia de un toque tuyo, no la apaga de una: se queda al lado y la desarma en 10 s (`NOVA_DEFUSE`; cuenta el tiempo, no los artificieros, así que dos juntos no tardan la mitad), con un arco cian que se cierra alrededor de la estrella. Si caen tres juntas, no llega a todas.

Se calibró primero con lo de la hoja de ruta (una cada ~45 s, cuenta de 20, radio 2,5, arreglo a los 45 s, de a dos desde 5 inventos, el artificiero de un toque y el blindaje sin recalentarse). Tocando daba 9,7 min y sin nada 13,7 (1,42 veces), pero los cuarteles y los blindajes daban casi lo mismo que tocando (9,9 y 9,85): la ciudad del bot entra en dos blindajes de 4 casilleros y a 8 de los cuarteles, y las estrellas caen justo donde está más cubierta. Con el recalentado el blindaje pasó a dar ~1,2 veces. Al artificiero se le probó tardar de 3 a 9 s, con tandas de a dos y de a tres desde 7 inventos, y casi no fallaba (de 0,99 a 1,05 veces); con 10 s y tandas de tres desde 6 inventos ya no llega a todas (~1,1).

Con el bot (la era sola, 20 corridas por variante; las de `ritmo=5` y "con todo", 6):

| Cómo juega el bot | mín | prom | máx | Lo roto |
|---|---|---|---|---|
| Tocando | 9,2 | 9,5 | 9,7 | — |
| Tocando cada 15 s (`ritmo=5`) | 9,4 | 9,6 | 9,8 | — |
| Sin tocar, con blindajes y brigadas (`ignora`) | 9,5 | 10 | 10,5 | — |
| Sin tocar, solo con 2 brigadas (`ignora sintorres`) | 9,7 | 10,35 | 11,8 | 4–21% |
| Sin tocar, solo con 2 blindajes (`ignora singuardias`) | 10 | 11,4 | 12,8 | 11–27% |
| Sin tocar ni defensas (`ignora sindefensa`) | 12 | 13,6 | 15,5 | 34–43% |
| Sin tocar ni defensas, decidiendo cada 5 s | 12,3 | 13,3 | 14,7 | — |

"Lo roto" es la parte del tiempo de los edificios que pasaron rotos (6 corridas). Los artificieros desarman entre la mitad y cuatro de cada cinco estrellas. Sin nada, la era tarda 1,43 veces lo de tocando. Con los comandos de `docs/nueva-era.md` (3 corridas cada uno): tocando 9,3–9,5; solo cuarteles 10,4–11,8 (11); solo blindajes 10,8–11,7 (11,3); sin nada 12,8–14,8 (13,9). Encadenada no se pudo medir: cuando se armó no estaban las eras 20 ni 21.

### Lo del motor

- **El gancho `drawBug`.** Lo roto por la explosión lo dibuja la amenaza (`novaScorch`: hollín, tres llamitas que bailan, humo y el marco rojo que late), con el gancho `drawBug(px,py,o)` que el motor llama encima de cada edificio roto si alguna amenaza de la era lo tiene. Es el mismo cambio chico que se estaba sumando al motor para las eras 20 a 22; la huella de las eras 2 a 19 da igual con y sin él. Por si la era corre en un motor sin el gancho, `HS.bug` es una llamita (el motor la dibuja con el marco rojo, como un bicho). La fogata y el taller el motor los dibuja aparte, sin `drawBug` ni `ERA.deco`: su hollín va en `drawOver`.
- **Un guardián que se queda corto.** El motor para a un guardián cuando su casillero (redondeado) ya es vecino del de la amenaza, aunque esté corrido del centro y le quede a más de 1,6 para tocarla: con una amenaza quieta, como la estrella, se quedaba ahí parado mientras explotaba (en las primeras corridas, buena parte de las estrellas que se les escapaban a los cuarteles). La amenaza, en `update`, lleva al centro de su casillero al artificiero que va a una estrella y quedó así. Convendría arreglarlo en `updateGuards` para todas las eras.

## Arte

Helio (burbujas doradas de varios tamaños con su brillo, que salen de una grieta en una roca oscura), casa solar (blanca, con un techo dorado redondo como un sol que sale, con rayos, y las ventanas tibias), planetario (cúpula azul de noche con estrellitas, un anillo dorado con un planeta adelante y columnas en la entrada; dos planetas le giran alrededor), blindaje solar (una cúpula baja de placas doradas como escamas, con una franja cian abajo y un emisor arriba; lo cruza un brillo), subasta de estrellas (frontón dorado, tres arcos, el del medio con el atril y el martillo, y arriba la estrella que se remata adentro de un frasco, que titila), jardín solar (tres girasoles grandes con un sol chiquito en la flor, que laten), destilador de helio (olla de cobre sobre el fuego, caño en espiral y un tanque con gas dorado; le suben burbujas) y gran astrolabio (un aro de bronce con las marcas de las horas y un cielo adentro, sobre un pie de piedra; la regla gira). Los árboles son robles con bellotas doradas.

La estrella (`novaArt`, tres colores: amarilla, naranja con 10 o menos y roja y rajada con 5 o menos, cada uno en dos cuadros) cae con una estela dorada y, en el suelo, salta y late más rápido cuanto menos le queda, con un halo que pasa de dorado a rojo (`drawNovas`). Debajo, el área que va a romper: un círculo rojo que late, con el borde punteado que gira y un anillo cian si la cubre un blindaje (`drawNovaUnder`). Arriba, encima de la oscuridad de la noche, el número de la cuenta (10 px, 11 con 5 o menos, con contorno, que se agranda en cada segundo y pasa de crema a naranja y a rojo que titila), un escudito cian al lado si la cubre un blindaje, el arco del artificiero y la explosión: destello blanco, anillo de fuego y chispas (`drawNovaTop`). Donde explotó queda un quemado con brasas que se apaga en 10 s. El artificiero tiene traje acolchado verde oliva con costuras y hombreras, cuello grueso, casco redondo con visor celeste y una pinza larga con mango rojo.
