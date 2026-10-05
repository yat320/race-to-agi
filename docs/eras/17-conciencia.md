# Era 17: Era de la conciencia

Datos y arte en `src/mundo/conciencia.js`, y las sirenas en `src/mundo/amenazas/sirenas.js`; se juega en `mundo17.html` (lo arma `npm run build`). Partida en `rtagi-mundo17-v1`.

## Qué tiene

La era de la conciencia, la que sigue a la multiversal y la última por ahora. La puerta al multiverso abre el camino a las mentes de todos los universos:

- **Recurso:** cristales de recuerdo (`recuerdo`).
- **Edificios propios:** casa nube, palacio de la memoria (ideas), cúpula de silencio (la defensa), mercado de sueños (monedas), jardín de la mente (potencia las granjas), destilería de recuerdos (hace cristales) y colmena (la de ideas de la era).
- **Guardián:** el conservatorio, con su director de orquesta.
- **Amenaza:** las sirenas.
- **Obra final:** la conciencia compartida.
- **Mapa:** el propio.

Los inventos, en orden: cristales de recuerdo (`memoria`, ideas +50%), cúpulas de silencio (`silencio`), mercado de sueños (`suenos`, 30% más sirenas), jardines de la mente (`jardines`), destilado de recuerdos (`destilado`), armonía (`armonia`, el canto crece la mitad de rápido), mente colmena (`colmena`, ideas +50% y de noche ves más lejos), empatía total (`empatia`, todo produce +50%) y la conciencia compartida (`conciencia`).

En la fila de eras se llama "Conciencia" (`ERA.short`; si no, diría "De la conciencia").

## Qué hereda

De la era multiversal, al terminarla: la ciudad entera en su mapa (si no, hasta 8 aldeanos), hasta 200 ideas, hasta 80 monedas y estos bonos (`ERA.legacy.perks`):

- puerta al multiverso: ideas +25%;
- semillas de mil mundos: granjas +25%;
- mapa de destinos: te movés 20% más rápido.

Los papeles de sus edificios para la era siguiente los deduce el build:

- palacio de la memoria: ideas;
- cúpula de silencio: defensa;
- mercado de sueños: monedas;
- jardín de la mente: granjas;
- destilería: mineral;
- colmena: la de ideas de la era.

## Amenaza y balance

La era de la conciencia (octubre de 2026) suma **sirenas** (`ERA.sirens`). La mecánica nueva es que **atraen a la gente**.

**Cómo llegan.** Desde los 2 minutos (`SIREN_START`), cada ~25 s llega flotando una sirena desde 11–14 casilleros (`SIREN_FROM`). Viene más seguido con cada invento (+10%) y con el mercado de sueños (+30%) (`sirenEvery`). Va hacia donde trabaja más gente: al lado del que tiene más gente a 5 casilleros (`SIREN_CROWD`), aunque esté cerca de una cúpula. Se queda ahí, flotando, y canta (`sirens`, no se guardan).

**El canto.** Empieza en 2,5 casilleros (`SIREN_R0`) y crece 0,2 por segundo (`SIREN_GROW`, `sirenGrow`) hasta 6 (`SIREN_R1`). Llega a 6 en 17,5 s, o en 35 con la armonía. El que queda adentro (`sirenEar`):

- deja lo que hace (lo que llevaba lo sigue llevando);
- camina despacio (`SIREN_WALK`) hasta su lugar en la ronda (`SIREN_RING`, `sirenSpot`: a los costados y adelante, no atrás de ella, que flota ahí);
- se queda mirándola, meciéndose, sin trabajar (`v.held`).

El motor no lo mueve ni lo manda a juntar. El que estaba con otra amenaza no la oye (`sirenBusy`). Los hechizados no se guardan: al cargar ya volvieron a trabajar.

**Cómo se termina.** Tocar la sirena la calla (+2 ideas) y suelta a todos (`sirenEnd`, `sirenFree`). Se la toca donde se la ve o en la ronda de alrededor. Si nadie la toca, se va sola a los 90 s de cantar (`SIREN_LIFE`). El que llevaba algo, al soltarse, primero lo deja en su casa.

**La defensa.** Las cúpulas de silencio (`ERA.defense`, r = 4) hacen dos cosas:

- la gente que trabaja a 4 casilleros o menos no oye a las sirenas;
- la sirena se calla cuando se acerca a una cúpula o cuando su canto llega hasta la zona de silencio (`sirenHushed`: distancia ≤ 4 + el radio del canto).

La barra del HUD ("Cúpulas") cuenta qué parte de tu gente trabaja cerca de una cúpula y cuántos hay hechizados (`sirenRow`).

**El guardián.** El conservatorio (el cuartel de la era) trae un director de orquesta de frac, con batuta, que tapa el canto con su música. Sale solo a callar las sirenas que están a 8 casilleros o menos. Las alcanza desde un casillero vecino, como a un edificio (`targets` con `b`).

**Cómo se ve.**

- La sirena tiene pelo largo y cola de pez, y es un poco más grande que tu gente (`SIREN_PX`). Flota un casillero arriba del suyo, con un brillo rosado, y suelta notas mientras canta.
- En el suelo:
  - el canto es una mancha lila con ondas que se abren y un borde de puntos rosados hasta donde llega;
  - abajo de la sirena van su sombra y el halo rojo de las amenazas.
- Cada hechizado:
  - lleva una nota arriba de la cabeza;
  - está unido a la sirena por un hilo de puntos que ondea.
- De noche la sirena alumbra.
- Fuera de pantalla se marca con una flecha roja.

**Balance.** Con el bot (la era sola, 10 corridas por variante), en minutos de juego hasta la obra:

| Cómo juega el bot | Mín | Prom | Máx | Tiempo de la gente hechizada |
|---|---|---|---|---|
| Tocando (~31 sirenas tocadas) | 9,2 | 9,4 | 9,8 | 0% |
| Tocando cada 15 s (`ritmo=5`) | 9,4 | 9,8 | 10,1 | — |
| Sin tocar, con cúpulas y conservatorios | 9,3 | 10,3 | 12,1 | 23% |
| Sin tocar, solo con 2 conservatorios (~23 calladas por los directores) | 8,8 | 10,2 | 12,1 | 32% |
| Sin tocar, solo con 2 cúpulas | 9,1 | 10,0 | 11,5 | 29% |
| Sin tocar ni defensas | 10,9 | 13,0 | 15,6 | 70% |

Sin tocar ni defensas tarda 1,38 veces lo de tocando. Encadenada (eras 2 a 17, 3 corridas): 3,5 / 3,8 / 4,3.

**Cómo se calibró.** La hoja de ruta pedía:

- una sirena cada 40 s;
- 70 s cantando;
- el canto hasta 6 casilleros en 30 s;
- la cúpula callando solo a las que entraban a 4 casilleros;
- la sirena yendo a gente que no estuviera cerca de una cúpula.

Con eso, las cuentas daban:

- tocando, 9,5;
- sin tocar ni defensas, 11,2 (entre 9,1 y 12,7);
- con 2 cúpulas, 12,7: las cúpulas costaban y no servían, porque las sirenas iban justo adonde no había.

Lo que se pierde es lo que junta la gente, y pesa poco hasta que falta casi toda, porque el final de la era lo frenan las ideas de los edificios:

- con el 60% del tiempo de la gente hechizado, la era tardaba 1,2 veces;
- con todos hechizados desde el minuto 4, 18,7 min;
- con todos desde el minuto 2, no se terminaba.

Se probó también que los hechizados no contaran para las ideas (un cambio chico en el motor). Casi no cambiaba nada (11,3 contra 11,2), así que no se hizo.

Lo que quedó:

- más seguido (25 s) y más largo (90 s);
- el canto crece más rápido;
- las sirenas van adonde está la gente aunque haya cúpulas;
- la cúpula también calla a la que canta hasta tocar su zona.

Que nunca quede trabado: cada sirena se va sola a los 90 s y suelta a todos.

## Arte

- **Cristales de recuerdo:** prismas lilas y nacarados sobre la roca, con un brillo rosado adentro del más grande.
- **Casa nube:** una casita lila con una ventana redonda que brilla, sentada sobre una nube.
- **Palacio de la memoria:** nacarado, con ventanitas de colores (cada una, un recuerdo) y una cúpula con un cristal.
- **Cúpula de silencio:** una burbuja de vidrio lila con un parlante tachado adentro y un brillo que la recorre (`ERA.deco`).
- **Mercado de sueños:** toldo a rayas lilas, frascos de sueños de colores y burbujas que suben.
- **Jardín de la mente:** un cantero con flores que brillan y un arbusto podado con forma de cerebro, del que suben pensamientos.
- **Destilería de recuerdos:** un alambique de cobre sobre un fuego lila, con el caño en espiral que gotea en un frasco de cristales.
- **Colmena:** celdas hexagonales apiladas como un panal, que se prenden de a una.
- **Conservatorio:** una sala de conciertos nacarada con un ventanal en arco y una lira dorada. Reemplaza al hangar de las eras del futuro solo en esta era: el arte de la era cambia `EP_ART.cuartel` antes de que el motor lo use.
- **Director de orquesta:** pelo blanco, frac negro con pechera blanca y moño, batuta levantada y una nota dorada (`guardia` en `sirenas.js`).
- **Sirena:** pelo violeta, cola de pez turquesa, un brazo levantado y la boca abierta, cantando, en dos cuadros (el pelo y la cola se mecen). La dibuja `sirenArt` en `sirenas.js`, la primera vez que hace falta.

## Motor

No se tocó `src/mundo/motor.html`.
