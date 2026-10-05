# Era 12: Era interestelar

Datos y arte en `src/mundo/interestelar.js`; se juega en `mundo12.html` (lo arma `npm run build`). Partida en `rtagi-mundo12-v1`.

## Qué tiene

La era interestelar, la que sigue a la estelar (materia exótica, arcología, núcleo cuántico, campo de contención, astillero estelar con naves, terraformador, colector exótico, academia galáctica; los nanobots grises; el motor de curvatura como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de esfera de Dyson, síntesis de alimentos y cohetes. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La era interestelar (octubre de 2026) suma **nanobots grises** (`ERA.goo`): desde los 2 minutos de juego, cada ~50 s (más seguido con cada invento, +10%, y con la antimateria, +30%, `gooEvery`) se escapa una nube a 9–13 casilleros de un edificio (`goos`, no se guardan). Crece un casillero cada 3 s (4,5 con los sensores cuánticos, `gooGrow`) hacia el edificio más cercano que todavía no tapó, hasta 14 casilleros (`GOO_MAX`). Lo que tapa no produce (`broken()` lo cuenta, como la nube de langostas) y lo que se puede juntar se lo come (queda agotado y no rebrota mientras la nube esté encima). Tocar cualquier casillero de la nube la apaga entera (+2 ideas); si nadie la toca, se queda sin energía a los 100 s (`GOO_LIFE`) y en los últimos 10 se va apagando. Los campos de contención (`ERA.defense`, r = 4) no la dejan crecer cerca, y lo que quedó adentro de un campo nuevo se apaga. Los que están fuera de pantalla se marcan con una flecha roja. Con el bot (la era sola): tocándolos se termina en ~9,8 min (~10,7 si toca cada 15 s); sin tocarlos pero con 2 campos, en ~11,1; sin tocarlos ni campos, en ~14,5 (entre 12,7 y 16,9). Encadenada, ~7.

## Arte

Materia exótica (cristales violetas), arcología escalonada, núcleo cuántico, campo de contención con su anillo, astillero estelar con una nave que despega cada 30 s (`ERA.deco`), terraformador, colector exótico, academia galáctica con una galaxia y los nanobots (`drawGoo`: casilleros grises con brillitos y un borde rojo que late, con un remolino en el núcleo).
