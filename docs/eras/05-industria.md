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
