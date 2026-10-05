# Era 18: Era del génesis

Datos y arte en `src/mundo/genesis.js`, y los devoradores en `src/mundo/amenazas/devoradores.js`; se juega en `mundo18.html` (lo arma `npm run build`). Partida en `rtagi-mundo18-v1`.

## Qué tiene

La era del génesis, la que sigue a la de la conciencia (polvo primordial, casa semilla, incubadora de universos, barrera de vacío, fábrica de estrellas, vivero de galaxias, crisol primordial, taller de leyes físicas; los devoradores del vacío; el universo bebé como obra final; mapa propio). En la fila de eras se llama "Génesis" (`ERA.short`: sin eso, el nombre corto salía "Del génesis").

Inventos, en orden: polvo primordial (`primordial`: la incubadora, el nanotaller y la perforadora láser; ideas +50%), barreras de vacío (`barrera`), inflación cósmica (`inflacion`: la fábrica de estrellas; 30% más grietas), cosecha de galaxias (`cosecha`: el vivero), crisol primordial (`crisol`), cuarentena (`cuarentena`: se dividen la mitad de seguido), leyes físicas a medida (`leyes`: el taller de leyes; ideas +50% y de noche ves más lejos), constantes afinadas (`constantes`: todo produce +50%) y el universo bebé (`genesis`, la obra). Los costos son los de la multiversal.

Los papeles de los edificios para cuando la ciudad pase a la era omega los deduce el build: la incubadora da ideas, la fábrica de estrellas da monedas, el vivero es el `farmBuild`, el crisol da mineral, el taller de leyes es el `ideaBuild` y la barrera es la defensa.

## Qué hereda

De la era de la conciencia (`legacy.key: 'rtagi-mundo17-v1'`), al terminarla: hasta 8 aldeanos, 200 ideas y 80 monedas, y los bonos de la conciencia compartida (`conciencia`: ideas +25%), los jardines de la mente (`jardines`: granjas +25%) y la mente colmena (`colmena`: te movés 20% más rápido). Como desde la Edad Media, la ciudad de la era anterior sigue en el mismo mapa (`prevCity`). La era 17 se armó en paralelo, así que el pase desde ella y los tiempos encadenados todavía no se probaron.

## Amenaza y balance

La era del génesis (octubre de 2026) suma **devoradores del vacío** (`ERA.eaters`). La mecánica nueva es que **se multiplican**.

- **De dónde salen.** Desde los 2 minutos de juego (`EATER_START`), cada ~45 s (más seguido con cada invento, +10%, y con la inflación cósmica, +30%, `eaterEvery`) se abre una grieta del vacío a 9–12 casilleros de un edificio (`EATER_FROM`). Ese edificio es el granero o uno de los que más producen (los de los tres tipos que más dan cada uno), mitad y mitad (`eaterGoal`). De la grieta sale un devorador chico que camina hasta él a 1,3 casilleros por segundo (`EATER_SPD`).
- **Qué hacen.** Allá come, dando vueltas alrededor del edificio. Cada 3 s (`EATER_BITE_T`) la camada se come 1 por devorador (`EATER_BITE`) de lo que más tengas, cualquier recurso. Arriba de la camada sale el número ("−8 ideas") y lo que comen se pierde.
- **Se multiplican.** Cada 20 s (`EATER_SPLIT`; 40 con la cuarentena, `eaterSplit`) cada devorador se divide en dos, hasta 8 por camada (`EATER_MAX`). Al dividirse sale un anillo violeta y arriba "¡2 → 4!".
- **Se van solos.** A los 80 s (`EATER_LIFE`) la camada está llena y vuelve a su grieta. Al llegar se meten y la grieta se cierra (si no hay camino, se meten donde están, y medio minuto después ya no queda ninguno). Así el daño se termina solo. No se guardan.
- **El toque.** Cada toque mata al devorador más cercano a 1,15 casilleros (`EATER_HIT`; +1 idea). El último de la camada da +2 ideas y cierra la grieta. Como sale de a uno, conviene tocarlo antes de que se divida.
- **La defensa.** Las barreras de vacío (`ERA.defense`, r = 4) deshacen a los devoradores que entran. Ahí adentro no se abren grietas, y los devoradores, si pueden, la rodean (`eaterPath`, un bfs que no pisa lo que cubren). Así lo que queda afuera de las barreras sí se lo comen. La barra del HUD cuenta qué parte de los edificios cubren y cuántos devoradores hay sueltos (`eaterRow`).
- **El guardián.** El cuartel es el puesto de cazadores y el guardián, un cazador del vacío con casco de visor y arpón de luz. Va a los devoradores con `targets` y los mata de a uno con `tap`, como un toque. Para el bot, `botTaps` da un toque por devorador.
- **Cómo se ven.** Los devoradores son bolas de vacío con estrellitas adentro, cuernitos, ojos dorados y una boca con dientes que se abre y se cierra mientras comen. Debajo llevan el halo rojo de las amenazas, y de noche los ojos brillan arriba de la oscuridad (`drawEaterEyes`). Cada uno va corrido un poco (`ox`, `oy`), así la camada se ve como un enjambre. La grieta es una raja negra con borde violeta y motas doradas que suben (`drawEaterRifts`), y de noche alumbra un poco. Las camadas fuera de pantalla se marcan con una flecha roja.
- **Cómo se calibró.**
  - Primero comían solo ideas, monedas y mineral, con la vida de la hoja de ruta (90 s). Sin tocarlos ni defensas, la era tardaba ~20 min (entre 16,6 y 25,4).
  - Con 70 s de vida y una grieta cada ~40 s, tardaba ~14,4, pero entre 10,9 y 18,1. Lo que más variaba era cuándo les comían el polvo primordial del crisol al principio.
  - Comiendo de lo que más tengas entre todos los recursos, al principio se comen madera o piedra y la cosa se emparejó un poco.
  - Antes, las barreras las atravesaban derecho y se deshacían todos: el bot no sentía la diferencia con tocarlos.

Con el bot, la era sola (3 corridas, `node tools/bot-mundo.mjs 3 18 solo …`, y 10 corridas entre paréntesis):

| Cómo juega el bot | mín | prom | máx |
|---|---|---|---|
| Tocando | 10 | 10,0 | 10 (10 corridas: 10–10,3, ~10,1) |
| Tocando cada 15 s (`ritmo=5`) | 9,9 | 10,1 | 10,3 |
| Sin tocar, con todo (`ignora`) | 10 | 10,1 | 10,1 |
| Sin tocar, solo con 2 puestos de cazadores (`ignora sintorres`) | 9,5 | 9,8 | 10 (10 corridas: ~9,9) |
| Sin tocar, solo con 2 barreras (`ignora singuardias`) | 10 | 10,1 | 10,2 (10 corridas: ~10,2) |
| Sin tocar ni defensas (`ignora sindefensa`) | 13,4 | 14,4 | 15 (10 corridas: 9,8–15, ~13,1) |
| Sin tocar ni defensas, decidiendo cada 5 s | 13,2 | 13,5 | 13,8 |

Lo flojo: el cazador llega a cada devorador antes de que se divida (salen de a uno y caminan ~8 s), así que solo con cuarteles se termina igual que tocando, como pasaba con el detective de la multiversal y el astronauta de la cósmica. Las barreras dejan pasar poco, porque el bot pone las dos en el centro y cubren casi todo. Sin defensas la variación es grande: una mala racha de grietas al principio atrasa la cadena de inventos, y con más tiempo vienen más camadas.

## Arte

- **Recurso.** Polvo primordial: una nube de polvo oscuro con dos brazos dorados en espiral y un núcleo que brilla, sobre una roca violeta. El ícono es un remolino dorado.
- **Edificios.**
  - Casa semilla: una semilla gigante parada, con puerta redonda, dos ventanas y un brote.
  - Incubadora de universos: una esfera de vidrio sobre un pedestal con caños y un universo chiquito adentro, que gira (`ERA.deco`).
  - Barrera de vacío: una columna oscura con tres anillos dorados y un cristal violeta, con un hexágono violeta que gira y late (`ERA.deco`).
  - Fábrica de estrellas: un galpón de chapa con un horno redondo donde nace una estrella, una chimenea con chispas y estrellitas en la cinta.
  - Vivero de galaxias: un cantero con tres galaxias de colores que crecen en tallos.
  - Crisol primordial: una olla de hierro sobre patas y un fuego, llena de polvo dorado, de donde suben chispas (`ERA.deco`).
  - Taller de leyes físicas: una casa con un pizarrón lleno de fórmulas, un engranaje y una órbita en el techo.
- **El cazador del vacío.** Va de traje azul oscuro con cinturón dorado, casco plateado con visor cian y antena, y un arpón con la punta de luz dorada (`guardia` en `devoradores.js`).
- **El devorador.** Dos cuadros, boca cerrada y abierta (`eaterArt`, se arma la primera vez que hace falta). Con `?debug`, `eaterArt(f)` lo devuelve para mirarlo.

## Motor

No se tocó. Todo va por los ganchos de `amenaza()`: `reset`, `tick`, `update`, `targets`, `botTaps`, `tap`, `ents` (con `post` para el anillo al dividirse), `drawUnder` (grietas y halos), `drawTop` (ojos de noche), `lights`, `arrows`, `hint`, `row`, `prueba` (dos camadas hacia lo que no cubre una barrera), `debug` (`eaters`, `eaterBroods`, `spawnEaters`, `eaterEvery`, `eaterArt`) y `guardia`.
