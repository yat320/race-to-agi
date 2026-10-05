# Era 5: Industria

Datos y arte en `src/mundo/industria.js`; se juega en `mundo5.html` (lo arma `npm run build`). Partida en `rtagi-mundo5-v1`.

## Qué tiene

La Industria (carbón, mina, fábrica, sindicato, estación de tren, barco de vapor, laboratorio, palacio de cristal, parque; el humo y los ludditas; la máquina analítica como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de pascalina y botánica. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La Industria tiene **ludditas** (`ERA.luddites`, la lista de edificios con máquinas: fábrica y mina): desde los 2 minutos de juego, cada ~55 s (más seguido con cada invento y con el humo, hasta el triple con el aire todo sucio, `ludditeEvery`; desde 5 inventos salen de a tres, si no de a dos) sale un grupo de una casa y camina hasta la máquina más cercana (`ludds`, no se guardan). Si llega, la golpea 4 s y la deja rota (`o.bug`, se guarda: no produce hasta que la tocás para arreglarla, igual que lo dañado por meteoritos) y vuelven a la casa. Tocarlos los calma (+2 ideas). Los sindicatos (`ERA.defense` con `of:['fabrica','mina']`) calman solos a los que pasan a 4 casilleros. Conviene una zona industrial lejos de las casas: cuanto más caminan, más tiempo hay para tocarlos. Con el bot (la era sola): tocándolos se termina en ~9,6 min (~10,8 si toca cada 15 s; sin ludditas tardaba 10,1); sin tocarlos pero con 2 sindicatos, en ~10,5; sin tocarlos ni sindicatos, en ~13,9. Encadenada, ~6,4. La Industria es la primera era con un recurso que contamina: el **humo** (`st.smog`, 0–100). Lo echan los edificios con `smoke` mientras andan (una fábrica sin carbón se frena y no echa), cada parque limpia 0,05 por segundo y el aire se aclara solo (`smog/400` por segundo). Con humo se junta y se cosecha menos (`smogPen`, hasta la mitad), y la barra aparece en el HUD con la primera chimenea.

## Arte

Carbón, casa de ladrillo, fábrica, mina, sindicato con estandarte, laboratorio, estación con locomotora, barco de vapor, palacio de cristal y parque, más el humo de las chimeneas (`puffs`), una bruma que crece con `st.smog` y los ludditas (gorra y mazo, halo rojo mientras van a romper, chispas al golpear con `drawSmash`; lo roto se ve con `drawDamage`).

## Objetos y fabricación (la prueba, octubre de 2026)

Juani pidió "incluir los objetos y poder craftear o que hagan falta elementos más específicos": la Industria es la primera era con objetos (`ERA.items`). No se juntan, se fabrican:

- **Acero:** la fundición (con la máquina de vapor) gasta 9 de carbón y 6 de piedra por minuto y hace 15.
- **Engranajes:** el taller mecánico (con el telar mecánico) gasta 6 de acero y 6 de madera por minuto y hace 9.

Se frenan si les falta algo o si el depósito de objetos está lleno (40, y 40 más por granero). Los piden el ferrocarril (10 de acero), los barcos (15), las tarjetas perforadas (12 engranajes), la máquina analítica (15 de acero y 20 engranajes), la estación (8 de acero), el puerto (8) y el palacio de cristal (12). La decisión es cuánto carbón, piedra y madera se va a la fabricación.

Se probó con la fábrica pidiendo engranajes y con la mitad de producción: la economía se frenaba y la era sola tardaba 11,8 a 13 min. Con el bot (la era sola, 3 corridas): tocando, 10,6 min (antes 9,6); solo cuarteles, 10,8; solo sindicatos, 12,3; sin nada, 14,9. Encadenada, 5,5 (antes 5,1): la ciudad del Renacimiento trae bancos que pasan a ser fábricas y queman carbón, así que hacen falta 2 minas.

