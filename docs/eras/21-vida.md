# Era 21: Era de la vida

Datos y arte en `src/mundo/vida.js`, y los polizones en `src/mundo/amenazas/polizones.js`; se juega en `mundo21.html` (lo arma `npm run build`). Partida en `rtagi-mundo21-v1`.

## Qué tiene

La era de la vida, la que sigue a la alfa: el universo nuevo se llena de vida, y no toda es amiga. Esporas (`espora`, bolitas verdes y celestes que brillan sobre un montículo de musgo), casa árbol, árbol sabio (ideas), arco de limpieza (la defensa), feria de especies (monedas), pradera viva (potencia las granjas), hongar de esporas (da esporas), templo de la simbiosis (la de ideas de la era) y el refugio de cuidadores (el cuartel); los polizones; el Edén cósmico como obra final; mapa propio. En la fila de eras se llama "Vida" (`short`).

Inventos, en orden: `esporas`, `limpieza` (el arco), `trueque` (la feria de especies; 30% más polizones), `pradera`, `hongar`, `repelente` (los polizones comen la mitad), `simbiosis` (ideas +50% y de noche ves más lejos), `ecosistema` (todo produce +50%) y `eden`, la obra. Los costos son los de la omega con las esporas en lugar de las chispas. Los papeles para cuando la ciudad pase a otra era los deduce el build: árbol sabio → ideas, feria de especies → monedas, pradera → `farmBuild`, hongar → mineral, templo → `ideaBuild` y arco → defensa.

## Qué hereda

De la era alfa (`rtagi-mundo20-v1`), al terminarla: la ciudad entera, aldeanos, ideas, monedas y los bonos de la primera luz (`primeraluz`, ideas +25%), el cultivo de luz (`cultivoluz`, granjas +25%) y la catedral de luz (`catedral`, te movés 20% más rápido). Los bonos están en `ERA.legacy.perks`. Abierta sin la alfa terminada, arranca con lo básico (`starterKit`), como las otras. Cuando se armó, la era 20 todavía no existía en el repo: el pase desde la alfa y los bonos no se pudieron probar encadenados.

## Amenaza y balance

La era de la vida (octubre de 2026) suma **polizones** (`ERA.riders`). La mecánica nueva es que **se suben a tu gente**.

- **De dónde salen.** Desde los 2 minutos de juego (`RIDER_START`), cada ~16 s (más seguido con cada invento, +10%, y con la feria de especies, +30%, `riderEvery`) sale del bosque un polizón: de un casillero libre pegado a un árbol, a 9–13 casilleros de alguien de tu gente (`RIDER_FROM`) y lejos de los arcos (si por ahí no hay bosque, de cualquier lugar libre a esa distancia). Es un bichito que corre a 3,2 casilleros por segundo (`RIDER_SPD`) hacia la persona libre más cercana, aldeano o robot; la que viene cargada cuenta como si estuviera 3 casilleros más cerca (`RIDER_LOAD`). Si no queda nadie libre, igual sale y espera su turno, pero nunca hay más de 1,25 polizones por persona (`RIDER_SHARE`). Los polizones no se guardan.
- **Qué hacen.** Al alcanzarla se le sube a la cabeza (`v.rider`). Mientras la lleva, cada entrega de esa persona se la come: apenas junta su carga y sale para su casa, el polizón se la come entera (`RIDER_EAT`; la mitad con el repelente, y el resto llega a la casa, `riderEat`). Arriba sale el número ("−5,2 madera") y lo comido se pierde.
- **Saltan.** Cuando comió 4 o más (`RIDER_FULL`, o sea, después de cada carga), salta en 0,7 s (`RIDER_HOP_T`) a otra persona que tenga a 3 casilleros o menos (`RIDER_HOP`), mejor si viene cargada, y así recorre la ciudad.
- **Se van solos.** A los 75 s de salir (`RIDER_LIFE`) se baja y vuelve caminando, despacio, a su lugar del bosque, lleno ("se fue lleno" y un aviso con lo que se comió). Así el daño se termina solo.
- **El toque.** Tocar a la persona que lo lleva, o al bichito arriba de su cabeza (a 1,3 casilleros, `RIDER_HIT`), lo baja y lo espanta (+2 ideas): huye corriendo hacia el bosque mientras se desvanece. También se lo toca mientras corre. Lo que comió no vuelve.
- **La defensa.** Los arcos de limpieza (`ERA.defense`, r = 4) limpian a la gente que trabaja (o se queda quieta) cerca y espantan a los polizones que corren cerca. Al que pasa caminando, el polizón se le agarra fuerte. La barra del HUD ("Arcos") cuenta qué parte de tu gente anda cerca de uno y cuántos llevan polizón (`riderRow`).
- **El guardián.** El refugio de cuidadores trae un cuidador con salacot de safari y una red chica. Va solo a bajarle el polizón a quien lo lleva, a 8 casilleros o menos de su refugio: no persigue a los que corren por el bosque (`targets` da solo los que van en una cabeza). El bot, como alguien atento, también toca a los que vienen corriendo (`botTaps`).
- **Cómo se ven.** El polizón es un bichito peludo y redondo, fucsia, con dos ojos grandes amarillos, antenas y patitas (`riderArt`). En el suelo corre con el halo rojo de las amenazas. En una cabeza se agarra con las patas a los costados, va más gordo a medida que come y, al comer, abre la boca; lo que la persona trae no va arriba de la cabeza, donde lo taparía, sino agarrado por el bichito a un costado. Abajo de quien lo lleva van el halo rojo y un anillo fucsia de puntos que gira. El que salta deja una estela de puntos y su sombra en el suelo. De noche alumbra un poco y sus ojos brillan arriba de la oscuridad (`drawRiderEyes`). Fuera de pantalla se marca con una flecha roja.

**Cómo se calibró.** La hoja de ruta pedía uno cada ~40 s que se fuera a los ~90 s. Con eso, y comiendo la carga al llegar a la casa:

- tocándolos, 9,8 min; sin tocarlos ni defensas, ~10,3. Lo que se pierde es lo que junta la gente y, como con las sirenas de la conciencia, pesa poco hasta que falta casi todo: al final de la era lo que frena son las ideas de los edificios.
- Comiendo además de lo guardado (una vez y media o el doble de la carga), sin nada tardaba en promedio lo pedido o más, pero con colas de hasta 22 min: cuando los polizones se comían todas las esporas que juntaba la gente, la cadena de inventos se trababa.
- Más seguido y más largo, sin comer de lo guardado, sin nada se acercaba a lo pedido, pero el arco y el cuidador los bajaban antes de que comieran nada: con 2 refugios, 9,6.

Lo que quedó:

- vienen cada 16 s y duran 75 s;
- comen apenas la persona sale con su carga, no al llegar a la casa (el cuidador cubre la ciudad, pero la gente junta en las afueras);
- buscan al que viene cargado y saltan después de cada carga;
- el arco no limpia al que pasa caminando y el cuidador no persigue a los que corren.

Se probó también que el polizón saltara a otra cabeza al ver venir al cuidador: casi no cambiaba el tiempo con los refugios, así que no quedó.

Con el bot (la era sola, `node tools/bot-mundo.mjs N 21 solo …`), en minutos de juego hasta la obra:

| Cómo juega el bot | Corridas | mín | prom | máx | Gente con polizón |
|---|---|---|---|---|---|
| Tocando | 10 | 9,4 | 9,6 | 9,8 | 0% |
| Tocando cada 15 s (`ritmo=5`) | 10 | 9,6 | 9,9 | 10,3 | 2% |
| Sin tocar, con arcos y refugios (`ignora`) | 10 | 10 | 10,6 | 12,9 | 4–27% |
| Sin tocar, solo con 2 refugios de cuidadores (`ignora sintorres`) | 10 | 9,7 | 10,1 | 12,4 | 4–32% |
| Sin tocar, solo con 2 arcos (`ignora singuardias`) | 10 | 10,2 | 10,8 | 12,9 | 9–42% |
| Sin tocar ni defensas (`ignora sindefensa`) | 20 | 9,5 | 13,9 | 16,5 | 62–76% |

"Gente con polizón" es la parte del tiempo de tu gente que pasó con uno en la cabeza. Sin nada, la era tarda 1,45 veces lo de tocando. Las 3 primeras corridas de cada variante (las que pide `nueva-era.md`) dieron: tocando, 9,7 (9,6–9,8); solo refugios, 10,8 (9,8–12,4); solo arcos, 11,6 (10,5–12,9); sin nada, 14,2 (10–16,5).

Lo flojo:

- Sin nada, el resultado va en dos grupos: en 6 de los 20 mapas la era se termina en 9,5–11,6 min aunque se coman de 700 a 1300 cosas, porque ahí lo que falta son ideas y no lo que junta la gente; en el resto, 14–16,5.
- Con 2 refugios, el cuidador baja casi todos los polizones al toque (la ciudad del bot entra en sus 8 casilleros) y se termina apenas por arriba de tocando, como pasaba con el cazador del génesis.
- Vienen seguido: más tarde en la era, con los inventos, sale uno cada ~7 s. Se tocan rápido, pero hay que estar atento.

### Lo que no toca el motor

- **Comerse la entrega.** No hizo falta un gancho: las amenazas se actualizan antes que los aldeanos, así que el polizón ve al que salió para su casa con algo (`state` `'return'` y `v.carry`) y le vacía la carga (una vez por viaje, `r.bit`). Al llegar, `deposit` no suma nada (y tampoco cuenta para la idea que dan las entregas).
- **Dibujarlo en la cabeza.** En `ents`, la entrada de la persona que lo lleva se cambia por una copia sin la carga (si no, el motor dibujaría lo que trae arriba de la cabeza, debajo del bichito) y se le pone `post`, que dibuja el polizón justo después de ella: así respeta quién está adelante.

## Arte

Esporas (un montículo de musgo con bolitas verdes y celestes de varios tamaños que brillan, y motas que flotan), casa árbol (una cabaña de tablas con techo de hojas sobre un tronco, metida entre las ramas, con ventanas redondas encendidas y una escalera), árbol sabio (un árbol viejísimo de tronco retorcido, con cara de dormido, barba de musgo y frutas que brillan; le suben ideas), arco de limpieza (dos pilares de piedra clara con enredaderas, un arco con una flor en la clave y una cortina de bruma celeste por la que suben burbujas y pasa un brillo), feria de especies (un puesto con toldo a rayas verdes, dos terrarios con plantas y bichos de otros mundos, uno que salta, y un cartel con una moneda), pradera viva (un cantero cercado de pasto alto y flores grandes, con mariposas), hongar de esporas (tres hongos gigantes de sombrero verde y celeste con lunares sobre un tronco caído; les suben esporas) y templo de la simbiosis (piedra clara con escalones y columnas con enredaderas, una cúpula de hojas y arriba dos anillos entrelazados, uno verde y uno celeste, con un brillo que late). Los árboles del bosque son más verdes y tienen flores. La gente se viste de verde, naranja y celeste (nada fucsia, para que el polizón se distinga). El cuidador tiene salacot de safari con una cinta verde, camisa caqui y una red chica.
