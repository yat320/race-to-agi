# Era 13: Era galáctica

Datos y arte en `src/mundo/galactica.js`; se juega en `mundo13.html` (lo arma `npm run build`). Partida en `rtagi-mundo13-v1`.

## Qué tiene

La era galáctica, la que sigue a la interestelar (neutronio, casa flotante, archivo galáctico, torre de interferencia, mercado galáctico, jardín alienígena, forja de neutronio, observatorio galáctico; los ovnis; la federación galáctica como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de motor de curvatura, terraformación y naves de colonización. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La era galáctica (octubre de 2026) suma **ovnis** (`ERA.ufos`; la humanidad sale a la galaxia y descubre que no está sola, y como la ciudad sigue en el mismo mapa se descartaron amenazas de otro planeta): desde los 2 minutos de juego, cada ~35 s (más seguido con cada invento, +10%, y con las forjas estelares, +30%, `ufoEvery`; desde 5 inventos vienen de a dos) llega volando un ovni desde 14 casilleros hacia un aldeano o robot que no esté cerca de una torre (`ufos`, no se guardan) y lo sigue. Cuando lo alcanza lo levanta con un rayo (`v.abd`, `v.lift`: lo que estaba haciendo se frena) y a los 6 s (9 con las lenguas alienígenas, `beamT`) se lo lleva: no está, no trabaja ni cuenta para las ideas hasta que lo devuelven, mareado, al lado de su casa a los 3 minutos (`v.away`, `UFO_BACK`; no se guarda: al cargar ya volvió). Tocar el ovni (arriba, o en el rayo mientras levanta) lo espanta (+2 ideas) y suelta al que estaba levantando. Las torres de interferencia (`ERA.defense`, r = 4, con ondas violetas en `ERA.deco`) espantan solas a los ovnis que pasan cerca, y los ovnis no van por los que trabajan cerca de una; la barra del HUD cuenta qué parte de tu gente está cubierta (`ufoRow`). Los que están fuera de pantalla se marcan con una flecha roja y de noche el ovni alumbra. Se probó con 2 minutos fuera y uno cada 45 s y casi no pesaba (con el bot, la era sola, 10,4 min sin tocarlos ni torres contra 9,1); sin devolverlos nunca, tardaba entre 14 y 28. Con el bot (la era sola): tocándolos se termina en ~9,1 min (~9,5 si toca cada 15 s); sin tocarlos pero con 2 torres, en ~10,4; sin tocarlos ni torres, en ~13,2 (entre 11,5 y 15,1). Encadenada, ~4,1.

## Arte

Neutronio (roca azul con vetas que brillan), casa flotante sobre un disco con luz, archivo galáctico (un obelisco con anillos), torre de interferencia reticulada con una esfera violeta y ondas (`ERA.deco`), mercado galáctico con toldo a rayas y frutos que brillan, jardín alienígena, forja de neutronio, observatorio con telescopio y el ovni (`HS.ufo`, `drawUfos`: un plato con luces que se prenden de a una y un extraterrestre en la cúpula, sombra y halo rojo, y el rayo verde que levanta al aldeano).
