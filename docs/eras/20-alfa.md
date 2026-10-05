# Era 20: Era alfa

Datos y arte en `src/mundo/alfa.js`, y los torbellinos de luz en `src/mundo/amenazas/torbellinos.js`; se juega en `mundo20.html` (lo arma `npm run build`). Partida en `rtagi-mundo20-v1`.

## Qué tiene

La era alfa, la que sigue a la omega y la última por ahora: del punto omega nace un universo nuevo, y tu ciudad es lo primero que hay en él. En la fila de eras se llama "Alfa" (`ERA.short`). Tiene:

- **Recurso.** Fotones (`foton`): luz condensada en cristales dorados.
- **Edificios propios.**
  - Casa de luz (`casa`).
  - Prisma de ideas (`prisma`): da ideas.
  - Estabilizador de campo (`estabilizador`): la defensa.
  - Mercado del espectro (`espectro`): da monedas.
  - Huerto de luz (`huertoluz`): potencia las granjas.
  - Condensador de fotones (`condensador`): da fotones.
  - Catedral de luz (`catedral`): la de ideas de la era.
  - Puesto de cazavientos: el cuartel.
- **Amenaza.** Los torbellinos de luz.
- **Obra final.** La primera luz.
- **Mapa.** Propio.

Inventos, en orden: `fotones` (el prisma, el nanotaller y la perforadora láser; ideas +50%), `estabilizador`, `espectro` (el mercado; 30% más torbellinos), `cultivoluz` (el huerto), `condensador`, `calma` (chupan la mitad), `catedral` (ideas +50% y de noche ves más lejos), `resonancia` (todo produce +50%) y `primeraluz`, la obra. Los costos son los de la omega, con fotones en vez de chispas.

Los papeles para cuando la ciudad pase a la era de la vida los deduce el build: prisma → ideas, mercado → monedas, huerto → `farmBuild`, condensador → mineral, catedral → `ideaBuild` y estabilizador → defensa.

## Qué hereda

De la era omega (`rtagi-mundo19-v1`), al terminarla: la ciudad entera, aldeanos, ideas, monedas y tres bonos (están en `ERA.legacy.perks`):

- el punto omega (`omega`): ideas +25%;
- el invernadero eterno (`invernadero`): granjas +25%;
- la crónica del universo (`cronica`): te movés 20% más rápido.

Abierta sin la omega terminada, arranca con lo básico (`starterKit`), como las otras.

## Amenaza y balance

La era alfa (octubre de 2026) suma **torbellinos de luz** (`ERA.whirls`). La mecánica nueva es que **desparraman lo guardado**.

- **De dónde salen.** Desde los 2 minutos de juego (`WHIRL_START`), cada ~25 s se forma uno (`whirlEvery`). Viene más seguido con cada invento (+10%) y con el mercado del espectro (+30%). Se forma a 10–13 casilleros (`WHIRL_FROM`) del granero o de uno de los edificios que más producen, mitad y mitad (`whirlGoal`).
- **Cómo se mueve.** Llega volando derecho, como una ráfaga, a 4 casilleros por segundo (`WHIRL_SPD`): vuela, así que cruza el agua. En la ciudad salta de un edificio a otro cercano (a 5 casilleros o menos, `WHIRL_NEAR`) a 2 casilleros por segundo (`WHIRL_ZIP`) y se queda 0,8 s en cada uno (`WHIRL_STAY`).
- **Qué hace.** Mientras está encima de un edificio, apenas lo toca y después cada 3 s (`WHIRL_SUCK`), chupa el 17% de lo que más tenés entre ideas, monedas y fotones (`WHIRL_CUT`; al menos 3 y como mucho 25, `WHIRL_MIN` y `WHIRL_MAX`). Arriba sale el número ("−25 ideas").
- **Las motas.** Lo que chupa lo tira alrededor, a 1–4 casilleros (`WHIRL_TOSS`), en 1 a 3 motas de luz con su número (`whirlMotes`). Una mota se recupera:
  - si la tocás (un toque junta las que están a un casillero, `WHIRL_MOTE_HIT`);
  - o si alguien de tu gente (vos, un aldeano o un robot) pasa por encima (`WHIRL_PICK`).

  Si nadie la junta, a los 30 s se apaga (`WHIRL_MOTE_LIFE`) y lo que tenía se pierde. En los últimos 10 s titila cada vez más rápido. Las que se apagan se avisan juntas, como mucho cada 20 s.
- **El toque.** Tocar el torbellino lo deshace (+2 ideas). Se lo toca donde se lo ve: es alto, así que también un casillero más arriba (`WHIRL_HIT`). Si nadie lo toca, se deshace solo a los 14 s (`WHIRL_LIFE`), así que el daño se termina solo. Con los campos en calma chupa la mitad (`whirlCut`).
- **La defensa.** El estabilizador de campo (`ERA.defense`, r = 4) deshace los torbellinos que entran a su zona. Las motas que caen cerca (o que quedaron cerca de uno nuevo) vuelan solas hasta él y vuelven. La luz se escapa de los campos en calma:
  - el 40% de las veces (`WHIRL_FREE`) el torbellino va a lo que no cubre un estabilizador;
  - en la ciudad, salta primero a eso;
  - no se forma adentro de una zona.

  La barra del HUD cuenta qué parte de los edificios cubren, y cuántos torbellinos o motas sueltas hay (`whirlRow`).
- **El guardián.** El cuartel es el puesto de cazavientos. El guardián es un cazatormentas de impermeable amarillo, con antiparras y un frasco para atrapar la luz. Va a los torbellinos con `targets` y los deshace con `tap`, como un toque. Las motas no las junta, ni pisándolas (ver abajo).
- **Para el bot.** `botTaps` da un toque por torbellino y uno por cada grupo de motas.
- **No se guardan.** Ni los torbellinos ni las motas: como con los dobles, lo que había en las motas se pierde si cerrás el juego.
- **Con `?debug`.** `whirls`, `whirlMotes`, `spawnWhirl`, `whirlEvery` y `whirlStats`. `whirlStats` cuenta cuántos se formaron, cuánto chuparon, cuánto volvió (pisando, tocando o por un estabilizador) y cuánto se apagó.

### Cómo se calibró

- **Con lo de la hoja de ruta** (cada ~40 s, 60 s de vida, chupando el 5% cada 3 s, motas de 45 s): tocando, 9,7 min; sin tocar ni defensas, 14 (1,44 veces); con 2 estabilizadores, 10,1; con 2 cuarteles, 9,6.
- **El cazavientos lo frenaba todo.** Sale a 8 casilleros de su cuartel y en la ciudad compacta del bot los deshacía en ~3 s, antes de que tocaran un edificio. Como dice `LEEME.md`, se probó que durara poco en un lugar o que llegara de lejos:
  - que llegara más rápido (3 casilleros por segundo): 9,8;
  - más seguido y con menos vida (cada ~25 s, 30 s): 9,7;
  - que saltara de un edificio a otro sin quedarse: 10;
  - que se le escapara al cazavientos cuando se le acercaba: entre 9,7 y 9,9.

  Lo que anduvo es que sea una ráfaga corta e intensa: llega a 4 casilleros por segundo, chupa apenas toca un edificio, más por chupada y dura 14 s. Así, el cazavientos llega cuando ya desparramó algo: solo con cuarteles, ~10,3.
- **Las motas y el cazavientos.** Al principio el cazavientos también iba a las motas. Casi no cambiaba el tiempo (llegaba a los torbellinos antes de que chuparan), pero se sacó: las motas son lo nuevo de la era y le tocan a la persona y a su gente. Que tampoco las junte al pisarlas subió solo con cuarteles de 10,3 a 10,4, con la corrida más rápida en 10,2 en vez de 9,9 (10 corridas).
- **El tope de 25 por chupada.** Sin tope (y chupando el 14%), al juntar las 1000 ideas de la obra cada chupada se llevaba más de 100 y el final se disparaba: sin defensas, 15,9 min (entre 13,2 y 18,1). Con tope, 13,9 (entre 11,8 y 16,2).
- **El estabilizador.** Primero los deshacía a todos, porque iban derecho a lo que cubría: 10,1. Con la mitad yendo a lo que no cubre, entre 11,1 y 11,9 según el resto de los números; con el 40%, 11,2.

Con el bot (la era sola, `node tools/bot-mundo.mjs N 20 solo …`):

| Cómo juega el bot | 3 corridas: mín | prom | máx | 10 corridas: mín | prom | máx |
|---|---|---|---|---|---|---|
| Tocando | 9,6 | 9,7 | 9,8 | 9,6 | 9,8 | 10 |
| Tocando cada 15 s (`ritmo=5`) | 9,8 | 9,9 | 10 | 9,7 | 9,9 | 10 |
| Sin tocar, con todo (`ignora`) | 10,4 | 10,5 | 10,7 | 10,1 | 10,4 | 10,7 |
| Sin tocar, solo con 2 puestos de cazavientos (`ignora sintorres`) | 10,3 | 10,4 | 10,4 | 10,2 | 10,4 | 11 |
| Sin tocar, solo con 2 estabilizadores (`ignora singuardias`) | 10,8 | 11,4 | 12 | 10,6 | 11,2 | 12 |
| Sin tocar ni defensas (`ignora sindefensa`) | 13 | 14,6 | 16,2 | 11,8 | 13,9 | 16,2 |
| Sin tocar ni defensas, decidiendo cada 5 s | 15,3 | 15,8 | 16,1 | 11,8 | 14,3 | 16,1 |

Sin nada, la era tarda 1,42 veces lo de tocando (10 corridas). Encadenada desde la Antigüedad, 4,3 (entre 4,2 y 4,5, 2 corridas).

Adónde va lo que chupan, en promedio por partida (10 corridas, con `whirlStats`):

| Cómo juega el bot | Torbellinos | Chupado | Vuelve pisando | Vuelve por un estabilizador | Se apaga |
|---|---|---|---|---|---|
| Tocando | 34 | 111 | 6% | 20% | 0 (el resto, tocando) |
| Solo cuarteles | 37 | 617 | 52% | — | 38% |
| Solo estabilizadores (30 calmados, 16 solos) | 46 | 1381 | 34% | 31% | 31% |
| Sin defensas | 61 | 4834 | 59% | — | 38% |

### Lo flojo

- Sin defensas varía mucho (de 11,8 a 16,2). Perder ideas atrasa los inventos, y con más tiempo y más inventos vienen más torbellinos. Pasaba igual en la omega y el génesis.
- Solo con cuarteles queda justo arriba de 10 (entre 10,2 y 11). Que el cazavientos no junte motas es de diseño (las motas le tocan a la persona y a su gente) y le da algo de margen.
- Los números de la hoja de ruta cambiaron: cada ~25 s en vez de ~40, 14 s de vida en vez de ~60 y motas de 30 s en vez de ~45. Son ráfagas: para una persona, el torbellino llega antes de que lo toque y casi siempre deja alguna mota para juntar, que es la mecánica nueva.

### El motor

No se tocó. Lo que necesita la amenaza lo hace en su archivo:

- **Las motas en el suelo.** Van en `drawUnder`, así la gente las pisa al pasar.
- **Lo que vuela y los números.** Los torbellinos, las motas que vuelan y los números van en `drawTop`, arriba de la oscuridad (son luz). De noche, las motas suman un brillo.

## Arte

- **Recurso.** Fotones: cristales dorados de luz que salen de una roca oscura, con chispitas alrededor. El ícono es un cristal.
- **Edificios.**
  - Casa de luz: paredes de nácar, una cúpula de vidrio dorado, puerta y ventanas redondas con luz y un cristal en la punta.
  - Prisma de ideas: un prisma de vidrio sobre un pedestal; le entra un rayo blanco y sale un arcoíris. Por el rayo corre un destello y el arcoíris titila (`ERA.deco`).
  - Estabilizador de campo: una columna de nácar sobre una base azul, con un núcleo de luz quieta adentro de dos anillos dorados. Los anillos giran y en el suelo salen ondas de calma (`ERA.deco`).
  - Mercado del espectro: un puesto con toldo de los colores del arcoíris, frascos de luz de cada color y un cartel con una moneda.
  - Huerto de luz: un cantero con plantas cuyas flores son lamparitas doradas, rosadas y celestes, de donde suben chispitas (`ERA.deco`).
  - Condensador de fotones: un tanque de vidrio con cristales dorados entre dos brazos curvos. Por las puntas de los brazos le entran motitas de luz (`ERA.deco`).
  - Catedral de luz: una fachada de nácar con dos torres de aguja, un portal en punta y un rosetón de vidrios de colores. El rosetón y una estrella arriba laten (`ERA.deco`).
- **El torbellino** (`drawWhirl`). Un embudo de luz, angosto abajo y ancho arriba, que se mece. Atrás tiene un brillo y adelante, bandas en espiral blancas, doradas y de colores, con un borde oscuro para que se lea sobre el pasto. Motitas de colores suben dando vueltas. Abajo tiene el halo rojo de las amenazas y un remolino de polvo de luz. Al deshacerse, las bandas se abren y se apagan; al irse solo, se achica.
- **Las motas.** Bolitas del color del recurso que tienen (celeste las ideas, doradas las monedas y los fotones), con su número arriba. Al caer vuelan en arco y, al volver a un estabilizador, dejan una estela.
- **El cazavientos.** Impermeable y sombrero amarillos, antiparras con vidrios celestes y un frasco de vidrio con tapón de corcho y una mota de luz atrapada (`guardia` en `torbellinos.js`).
