# Era 16: Era multiversal

Datos y arte en `src/mundo/multiversal.js`, y los dobles en `src/mundo/amenazas/dobles.js` (la primera amenaza en archivo propio); se juega en `mundo16.html` (lo arma `npm run build`). Partida en `rtagi-mundo16-v1`.

## Qué tiene

La era multiversal, la que sigue a la cósmica y la última por ahora (materia espejo, casa caleidoscopio, ventana a otros universos, espejo de la verdad, casa de canje, semillero de mil mundos, pulidora de espejos, telar de destinos; los dobles; la puerta al multiverso como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de computadora cósmica, soles de bolsillo y fondo cósmico. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La era multiversal (octubre de 2026) suma **dobles** (`ERA.twins`; de otros universos llegan copias de tu gente, y hay que encontrar al impostor): desde los 2 minutos de juego, cada ~40 s (más seguido con cada invento, +10%, y con el comercio entre universos, +30%, `twinEvery`) se abre un portal a 11–14 casilleros de un edificio y sale el doble de alguien de tu gente, con su mismo dibujo (`twins`, no se guardan; lo que llevaban se pierde con ellos). Camina hasta la ciudad y se mezcla: anda de un edificio a otro como uno más y cada 7 s roba el 6% (`TWIN_CUT`, al menos 3; la mitad con la prueba de identidad) de lo que más tengas entre ideas, monedas y mineral, y se le ve el número arriba. Después de 4 robos (`TWIN_TRIPS`) vuelve a su portal y se escapa con todo. Lo delata que titila cada tanto con rayas de colores (`drawGlitch`), más fuerte justo después de robar; el portal es un óvalo violeta que gira (`drawTwinPortals`) y, si está fuera de pantalla, se marca con una flecha roja (al portal, no al doble). Tocarlo lo manda de vuelta (+2 ideas) y devuelve lo robado (`expelTwin`). Los espejos de la verdad (`ERA.defense`, r = 4, con un brillo que los cruza en `ERA.deco`) desenmascaran y echan a los que pasan cerca; la barra del HUD cuenta qué parte de tu gente trabaja cerca de uno (`twinRow`). Con el bot (la era sola): tocándolos se termina en ~9,4 min (~9,2 si toca cada 15 s); sin tocarlos pero con 2 espejos, en ~9,4 (andan entre los edificios y pasan cerca de los espejos); solo con 2 oficinas de detectives, en ~9,2; sin tocarlos ni defensas, en ~13,1 (entre 11,6 y 14). Encadenada, ~4,2.

## Arte

Materia espejo (astillas plateadas), casa caleidoscopio con cúpula de vitrales, ventana a otros universos (un arco con un mundo rosa de dos lunas adentro), espejo de la verdad con marco dorado, casa de canje con un portal entre los mostradores, semillero con plantas de otros mundos, pulidora de espejos, telar de destinos con hilos que se mueven, el doble (el mismo dibujo que el original, con rayas de colores cuando titila, `drawGlitch`) y su portal (`drawTwinPortals`).
