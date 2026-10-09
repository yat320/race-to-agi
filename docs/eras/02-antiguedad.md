# Era 2: Antigüedad

Datos y arte en `src/mundo/antiguedad.js`; se juega en `mundo2.html` (lo arma `npm run build`). Partida en `rtagi-mundo2-v1`.

## Qué tiene

La Antigüedad (cobre, monedas, 13 edificios con la atalaya, piratas; el mecanismo de Anticitera).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas y bonos de ábaco, rueda y agricultura. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La Antigüedad tiene **piratas** (`ERA.pirates`, desde que se inventa la moneda): cada ~90 s (más seguido con cada invento y 30% más con la navegación, `pirateEvery`) un barco desembarca piratas en la costa del mar más cercana a un edificio (el mar es el agua unida al borde del mapa, `ocean()`; los lagos no cuentan). Caminan hasta el edificio, roban monedas (6 más el 10% de las que tenés, `PIRATE_COINS` y `PIRATE_CUT`) y cobre (hasta 5, `PIRATE_ORE`) y vuelven al barco; desde 5 inventos bajan de a dos. Tocarlos los echa (+2 ideas) y devuelve lo robado. Las atalayas (`ERA.defense`, la misma defensa que los escudos de la era estelar) echan solas a los que pasan a 4 casilleros, y la barra del HUD muestra qué parte de los edificios cubren. Los piratas no se guardan. En octubre de 2026 Juani pidió suavizarlos: antes llegaban cada ~75 s y robaban 15 + 20% de las monedas y hasta 10 de cobre, y sin tocarlos ni atalayas la era tardaba más del doble (con el bot, la era sola: 20,2 min contra 9,3). Con el bot (la era sola): tocándolos se termina en ~9,3 min (~10,2 si toca cada 15 s); sin tocarlos pero con 2 atalayas, en ~10,3; sin tocarlos ni atalayas, en ~12,8. Encadenada, ~7,4.

## Arte

La colina (`HILL`) reemplaza al suelo rocoso y hay sprites propios para el cobre, sus edificios, la atalaya con brasero, el barco pirata y los piratas (pañuelo rojo, parche y sable, con un halo rojo).

## Adentro: oficios y niveles (octubre de 2026)

Juani probó lo de entrar a las construcciones en la Prehistoria ("se siente bastante bien") y pidió llevarlo a la era siguiente. En la Antigüedad se entra a todo lo que se construye. Arriba de la hoja va el adentro dibujado: paredes de piedra con ventanas altas (el cielo cambia con la hora), piso de tablas y, a la izquierda, lo propio de cada edificio (`HS.in_<id>`, en dos cuadros):

- **Granja:** ánforas, gavillas y una hoz.
- **Fogata:** el fuego entre piedras.
- **Aserradero:** la sierra de dos que corta un tronco.
- **Cantera:** la pared escalonada y un bloque sobre rodillos.
- **Templo:** el altar con fuego entre columnas.
- **Mercado:** el puesto con toldo y la balanza.
- **Puerto:** el barco en el muelle y las ánforas.
- **Casa:** el telar y el fogón.
- **Depósito:** ánforas apiladas.
- **Herrería:** el horno y el yunque.
- **Atalaya:** la escalera y el cuerno.
- **Acueducto:** los arcos con el agua que corre.
- **Biblioteca:** la estantería de rollos.
- **Cuartel:** las lanzas y los escudos.

**Oficios** (`ERA.oficios`, en el motor, para cualquier era que los quiera). Lo que produce tiene 3 puestos para aldeanos. Uno con oficio deja de juntar, camina hasta el edificio (dice "¡voy!") y trabaja adentro: no se ve en el mapa y sigue comiendo. Adentro se lo ve en su puesto, con lo que usa, y lo que hace sube sobre su cabeza (en la época antigua no hay cinta).

| Oficio | Dónde | Qué suma cada uno |
|---|---|---|
| Labrador | granja | comida +50% |
| Cuentacuentos | fogata | ideas +50% |
| Leñador | aserradero | madera +50% |
| Picapedrero | cantera | piedra +50% |
| Escriba | templo | ideas +40% |
| Mercader | mercado | monedas +50% (con la misma comida) |
| Marinero | puerto | monedas e ideas +50% |

En la hoja: "Escribas · 1 de 3", "Produce +40% → +80%", Sumar y Sacar uno. El edificio guarda cuántos quiere (`of`, décimo dato) y la persona su puesto (`post`, décimo dato, después del de obrero); se acomodan solos cada segundo (`syncPosts`). Al pasar a una era sin ese oficio, la gente vuelve a juntar.

**Niveles** (`ERA.niveles`). Lo que no produce se mejora hasta el nivel 3; cada nivel suma algo que se ve adentro:

| Edificio | Qué sube | Niveles 1 → 2 → 3 | Qué se ve |
|---|---|---|---|
| Casa | aldeanos | 2 → 3 → 4 | una cama más |
| Depósito | lo que guarda | 150 → 225 → 300 de cada cosa | un estante con ánforas |
| Herrería | cuánto junta tu gente | +30% → +45% → +60% | un yunque más |
| Atalaya | alcance | 4 → 5 → 6 casilleros | un brasero más |
| Acueducto | potencia a las granjas | +50% → +75% → +100% | una fuente más |
| Biblioteca | potencia a las ideas | +30% → +45% → +60% | una estantería más |
| Cuartel | soldados | 1 → 2 → 3 | un soldado más |

Cada nivel cuesta 1,5 y 2,5 veces lo que costó el edificio, y el 3 pide además 8 de cobre (`ERA.levelExtra`). Hasta que se hizo lo mismo en la Edad Media, la hoja de la atalaya mostraba el alcance mejorado pero los piratas se espantaban siempre a 4 casilleros; ahora las defensas que miden desde el edificio usan `defR`.

**Balance.** Con el bot (la era sola, 10 corridas), lo que más falta son ideas y monedas, y algo de cobre:

| Con el bot | Minutos |
|---|---|
| Sin oficios ni niveles | 9,3 (9,3 a 9,5) |
| Solo niveles | 9,8 (9,4 a 10,3) |
| Solo oficios | 8,7 (8,6 a 9,1) |
| Con todo | 8,7 (8,3 a 9,4) |

- **Los oficios ayudan si van donde falta.** El bot pone uno donde suma al menos 0,12 por segundo de lo que le falta al próximo invento, con una persona de cada 4 como mucho: escribas en el templo y marineros en el puerto. Un labrador hace menos que el aldeano que se lleva.
- **Los niveles, como los usa el bot, atrasan un poco.** Mejora la herrería, el acueducto y las casas sin mirar qué falta, y se gasta el cobre de los inventos. Sacando las casas, la herrería o el acueducto de a uno da lo mismo (9,7 a 9,9): pesa el total. Son una decisión, no un atajo.
- **Encadenada,** la Antigüedad da 7,5 (antes 7,4), y la Edad Media y el Renacimiento que siguen, 4,8 y 4,5.

## Capítulos: metas con reloj (octubre de 2026)

Juani: "es un embole el juego". Marcó todo lo que aburría (esperar sin hacer nada, que las eras sean iguales, que nada apure, que sea largo y repetitivo) y eligió metas con reloj, lo que funcionó en las misiones. Se prueba primero acá.

La era se juega de a un **capítulo**: 2 a 4 metas y un reloj que arranca cuando empieza el capítulo. La fila dorada del HUD muestra las estrellas que te darían ahora, la primera meta que falta (con cuántas van) y cuánto queda para perder una estrella; en rojo los últimos 20 s. Tocarla abre la hoja de capítulos: el que está en curso con sus metas (✓ u ○) y sus tiempos, los cumplidos con sus estrellas y los que vienen. Al cumplir todas las metas sale un cartel con las estrellas y el premio, y arranca el siguiente. El final muestra las estrellas de cada capítulo.

| Capítulo | Metas | ★★★ | ★★ | Premio con ★★★ |
|---|---|---|---|---|
| La aldea | 2 granjas, 2 casas, metalurgia | 2:45 | 4:15 | 15 ideas |
| El cobre | herrería, atalaya, escritura | 2:00 | 3:00 | 25 |
| Templos y monedas | moneda, templo, mercado | 1:15 | 2:00 | 35 |
| El agua | irrigación, acueducto, echar un pirata | 3:00 | 4:30 | 50 |
| El mar | navegación, puerto, alguien en un oficio, mejorar un edificio | 1:15 | 2:00 | 70 |
| Los sabios | matemática, biblioteca | 2:30 | 3:45 | 100 |
| La máquina | engranajes, mecanismo de Anticitera | 3:00 | 4:30 | — |

- **Estrellas:** ★★★ hasta el tiempo de oro, ★★ hasta el de plata y ★ después. El premio es por estrella (con ★★ da dos tercios).
- **Las metas son de "tener":** un edificio cuenta si está al día con la era, así que lo que adelantaste en un capítulo te sirve en el siguiente. Si llegás a un capítulo con todo hecho, se cumple al toque con ★★★. "Echar un pirata" cuenta desde que empieza el capítulo y vale tocarlo, el soldado o la atalaya.
- **Calibración:** como en las misiones, oro ≈ 2 veces lo que tarda el bot y plata ≈ 3 veces. El bot (sin perseguir las metas, con la ciudad de la Prehistoria) tarda por capítulo 45 a 69 s, 13 a 55, 0 a 57, 46 a 241 (espera la irrigación), 0 a 44, 0 a 125 y 100 a 185, y saca las 21 estrellas.
- **Partidas de antes:** lo que ya estaba hecho cuando llegaron los capítulos cuenta como cumplido, sin estrellas ni premio, también si está más adelante. El reloj del primero que falta arranca al cargar.
- **Dónde se guarda:** la partida guarda el capítulo (`cap`: en cuál vas, cuándo empezó, estrellas y tiempos de cada uno) y las amenazas echadas (`threats`). La mejor marca de cada capítulo va aparte, en `rtagi-estrellas-v1`, así sobrevive a "Reiniciar era".

## Como la Prehistoria: obras, mundo vivo y una era más corta (octubre de 2026)

Juani: "Prehistoria se siente bien, las que siguen meh". Le gusta de la Prehistoria hacer cosas con las manos, que cada invento cambie algo, que el mundo esté vivo y que sea más corta y simple, y eligió llevarlo a las demás eras empezando por esta.

- **Obras** (`ERA.obras`, en el motor). Ubicar un edificio deja una obra con andamio y barra de avance (`{t:'obra', b, need, work}`). Vos vas solo a trabajarla, cada golpe suma 1 y gasta energía, y hasta 2 aldeanos libres van a ayudar antes que a juntar. Lleva un cuarto de lo que suma su costo base: la casa, 8 golpes. Mientras es obra no cuenta para nada, salvo para el precio del siguiente (`OBRAN`); al terminarla aparece el edificio con lo que trae (los 2 aldeanos de la casa, el soldado del cuartel). Se guarda: lo hecho en el tercer dato, lo que falta en el cuarto y el edificio en el undécimo. Si la ciudad pasa a otra era con una obra a medias, llega terminada.
- **Mundo vivo** (`vida:true`, `src/mundo/amenazas/vida.js`, con los ganchos de las amenazas aunque no lo sea):
  - **Cabras sueltas** (4) por el pasto. Tocás una y vas a buscarla; si la alcanzás, +8 de comida. Vuelve otra a los 20 s.
  - **Sequía de verano:** desde los 2:30, cada 3:30 hay 50 s en que las granjas rinden la mitad y el mapa se pone amarillo, salvo que tengas un acueducto (el que potencia las granjas), que las riega.
  - **Mercaderes**, desde la moneda. Cada ~75 s llega uno caminando, espera 35 s y, si lo tocás, te ofrece dos tratos (por ejemplo, 20 comida por 12 monedas o 10 cobre por 30 comida). Elegís uno o lo dejás ir. El juego se pausa mientras decidís.
  - **Barcos de comercio**, desde que tenés un puerto. Cada ~55 s atraca uno al lado. Si lo tocás antes de 22 s, deja 15 monedas y 8 ideas.
  - Tocar cabras, mercaderes o barcos no cuenta como amenaza echada. Nada de esto se guarda.
- **Más corta:** sin la astronomía (solo daba +50% de ideas; la noche ahora la da la navegación), 8 inventos, y menos ideas y materiales en los últimos: matemática 100 ideas; engranajes 200 ideas, 35 de cobre y 30 monedas; Anticitera 400 ideas, 80 de piedra, 50 de cobre y 50 monedas.

Con el bot (5 corridas): encadenada, 6,9 a 7,7 min (7,2 de promedio, casi lo mismo que antes de las obras); sola, 8,3. Por capítulo tarda 64 a 113 s, 0 a 102, 0 a 37, 74 a 121, 0 a 34, 52 a 85 y 84 a 97, y los relojes se recalibraron con eso (tabla de arriba). Una persona, con la regla de las misiones, 15 a 20 min.

## Explorar: niebla y hallazgos (octubre de 2026)

Juani: "antiguedad sigue siendo aburrida". Marcó todo: que se espera, que nada amenaza, que no hay qué descubrir y que es siempre lo mismo. Eligió probar primero explorar el mapa. Va en `src/mundo/amenazas/explora.js`, prendido con `explora:true`.

- **Niebla:** el mapa arranca tapado salvo 7 casilleros alrededor del pueblo. Se destapa:
  - por donde caminás vos (4,5 casilleros);
  - por donde anda tu gente (2,5);
  - alrededor de lo construido (3);
  - alrededor de la atalaya, que mira lejos (7).

  Los aldeanos solo juntan lo que se ve y no se puede construir en la niebla (el motor mira `FOG` con `fogged`). Tocar la niebla es ir a explorar hasta ahí.
- **Hallazgos:** seis, escondidos a 12–24 casilleros del pueblo y cada uno para otro lado. Se ven al destaparlos (con un "?" que flota) y se toman tocándolos de cerca.
  - Dos **ruinas**: 25 ideas y 15 de piedra.
  - Una **aldea perdida**: 2 aldeanos más.
  - Un **campamento pirata**: hay que echarlo con 3 golpes; deja 40 monedas y 15 de cobre.
  - Un **oráculo**: destapa 11 casilleros alrededor y da 15 ideas.
  - Un **yacimiento**: deja hasta 5 vetas de cobre nuevas.
- **Se guarda** con la partida, en `explora`: lo descubierto en tramos (`s`) y los hallazgos (`f`: x, y, tipo, tomado, golpes). Una partida de antes, sin `explora`, arranca con la niebla destapada alrededor de todo lo que ya tenía.
- **El bot** va al hallazgo más cercano que le falta (`botTaps`).

Con el bot (3 corridas):
- Sola: 7,2 min (antes 8,3).
- Encadenada: 6 min (antes 7,4).

Los hallazgos dan más de lo que cuesta caminar hasta ellos.
