# Era 15: Era cósmica

Datos y arte en `src/mundo/cosmica.js`; se juega en `mundo15.html` (lo arma `npm run build`). Partida en `rtagi-mundo15-v1`.

## Qué tiene

La era cósmica, la que sigue a la intergaláctica (quarks, casa esfera, biblioteca de Babel, repulsor gravitatorio, bolsa de estrellas, sol de bolsillo, colisionador, radiotelescopio; los agujeros negros; la computadora cósmica como obra final, la de "La última pregunta" de Asimov; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de red de agujeros de gusano, cosecha cuántica y mapa del universo. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La era cósmica (octubre de 2026) suma **agujeros negros** (`ERA.holes`): desde los 2 minutos de juego, cada ~45 s (más seguido con cada invento, +10%, y con los colisionadores, +30%, `holeEvery`) aparece uno chico a 12 casilleros de un edificio y flota hacia él a medio casillero por segundo (`holes`, no se guardan). Tira de todo lo que tiene cerca (`holeR`, que crece con su masa `h.m`): la gente que pasa queda atrapada en órbita (`v.orb`: da vueltas cada vez más cerca y no trabaja hasta que el agujero se va; si se guarda en ese momento, queda en la tierra libre más cercana, `landTile`), lo que se puede juntar a la mitad de esa distancia se lo traga y el edificio que pisa se estira y se rompe (`o.bug`, se guarda; se arregla tocándolo o solo al minuto, `HOLE_FIX`, o en 15 s cerca de un repulsor). Cuando rompe al que iba, se queda encima. Cada cosa que se traga lo hace crecer (+0,15 por recurso, +0,5 por edificio, +0,2 por persona, hasta 5; la mitad con la radiación de Hawking), y cuanto más grande, de más lejos tira y más toques pide: cada toque le saca un punto de masa (+1 idea) y el último lo evapora (+2 ideas) y suelta a los que tenía en órbita (arriba tiene un punto por cada toque que le falta). Si nadie lo toca, se evapora solo a los 75 s (`HOLE_LIFE`, la radiación de Hawking). Los repulsores gravitatorios (`ERA.defense`, r = 4, con anillos cian que se alejan en `ERA.deco`) no lo dejan entrar: lo empujan hasta el borde, y lo de adentro no se rompe ni queda en órbita; la barra del HUD cuenta qué parte de los edificios cubren y cuánta gente hay en órbita (`holeRow`). Se dibuja arriba de la oscuridad de la noche, con el centro negro, el disco de acreción que gira (la mitad de atrás antes del centro y la de adelante después, y un arco que se dobla por arriba) y un halo oscuro (`drawHoles`); los que están fuera de pantalla se marcan con una flecha roja. Se probó primero que, al romper un edificio, siguiera al de al lado, que viviera 100 s y que desde 5 inventos vinieran de a dos: sin tocarlos ni defensas la era tardaba ~60 min. Con el bot (la era sola): tocándolos se termina en ~9,9 min (~10,1 si toca cada 15 s); sin tocarlos pero con 2 repulsores, en ~11,6; solo con 2 bases de astronautas, en ~9,8 (vuelan y llegan a todo); sin tocarlos ni defensas, en ~14,5 (entre 12,5 y 16,5). Encadenada, ~4.

## Arte

Quarks (tres bolitas roja, verde y azul unidas por gluones), casa esfera sobre patas, biblioteca de Babel (una torre de piedra con galerías de libros), repulsor gravitatorio con su bobina de cobre, bolsa de estrellas con una pantalla donde sube la curva, sol de bolsillo sobre un campo, colisionador con su anillo, radiotelescopio y el agujero negro (`drawHoles`, arriba de la oscuridad).
