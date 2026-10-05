# Era 11: Era estelar

Datos y arte en `src/mundo/post-agi.js`; se juega en `mundo11.html` (lo arma `npm run build`). Partida en `rtagi-mundo11-v1`.

## Qué tiene

La era estelar, la que sigue a la AGI (se llamaba post-AGI; los datos siguen en `src/mundo/post-agi.js`; iridio, hábitat, centro de la AGI, escudo, puerto espacial con cohetes, sintetizador, mina de asteroides, instituto del espacio; la esfera de Dyson como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de AGI, automatización y escalado. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La era estelar deja atrás al rival y suma **meteoritos** (`ERA.meteors`): cada ~40 s uno apunta a la ciudad (6 de cada 10 a un edificio) y cae en 10 s (15 con el radar); caen más seguido con cada invento (+10%) y con la minería de asteroides (+30%), `meteorEvery`. Una marca roja en el suelo se cierra a medida que cae y los que están fuera de pantalla se marcan con una flecha. Tocarlo lo desvía (+2 ideas). Si cae sobre un edificio lo daña (`o.bug`, se guarda): un edificio dañado no produce (`broken()` lo descuenta en `act()`) hasta que lo tocás para repararlo o hasta que los drones de reparación lo arreglan solos a los 3 minutos (`METEOR_FIX`). Hasta octubre de 2026 no había drones y, sin tocar los meteoritos ni poner escudos, se terminaba rompiendo todo y la era no se terminaba (el bot llegaba a los 120 min sin la esfera); se probaron drones a 1 y 2 minutos y los meteoritos casi no pesaban. Si cae en tierra libre deja un cráter con iridio, así que a veces conviene dejarlo caer. Cada escudo desvía solo los que apuntan a 5 casilleros o menos (`SHIELD_R`); la barra del HUD muestra qué parte de la ciudad está cubierta. Los meteoritos no se guardan. Con el bot (la era sola): tocándolos se termina en ~9,9 min (~10,7 si toca cada 15 s); sin tocarlos pero con 2 escudos, en ~11,3; sin tocarlos ni escudos, en ~13,8.

## Arte

Iridio (un meteorito con brillos), hábitat con terrazas, centro de la AGI con un anillo, escudo con su cúpula, puerto espacial con un cohete que despega cada 24 s (`ERA.deco`), sintetizador, mina de asteroides, instituto con antena, el meteorito con su estela (`drawMeteors`) y el humo y las chispas de lo dañado (`drawDamage`).
