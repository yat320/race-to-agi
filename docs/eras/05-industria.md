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


## Adentro de las industrias (la prueba, octubre de 2026)

Juani: "que se pueda entrar en cada industria". Eligió puestos y máquinas, y probarlo primero en la Industria. Tocar una mina, la fundición, el taller mecánico, la fábrica o el laboratorio (`puestos:true`) abre su interior (la hoja `in`):

- Un dibujo del adentro, que se mueve. A la izquierda, el corazón de cada industria (`HS.in_<id>`, en dos cuadros): la boca del túnel con la vagoneta, el horno con la cuchara que vuelca acero, el torno con su correa, los telares y la mesa de matraces. A la derecha, una cinta lleva lo que hace hacia la puerta.
- Tres puestos. En cada uno va una máquina, de las que le sirven a ese edificio:
  - **Rápida:** produce +100% con lo mismo que gasta, pero echa humo en proporción.
  - **Limpia:** humo −50%, solo en lo que echa humo.
  - **Ahorradora:** gasta −40%, solo en lo que consume.
- Cada máquina sube hasta el nivel 3 (rápida +150% y +200%; limpia −70% y −90%; ahorradora −60% y −80%).
- Cuestan (`ERA.machine`):
  - nivel 1: 20 de madera y 20 de piedra;
  - nivel 2: 8 de acero y 20 de piedra;
  - nivel 3: 12 de acero, 8 engranajes y 30 monedas.
- Las máquinas de una industria las maneja **un obrero**. El aldeano libre más cercano deja de juntar, camina hasta el edificio y trabaja adentro: no se ve en el mapa, va de máquina en máquina en el dibujo y sigue comiendo. Sin obrero, o con la industria rota por los ludditas, las máquinas no hacen nada.
- Sobre el edificio, en el mapa, gira un engranaje cuando las máquinas andan.
- La pista "Entrá:" sale una vez, hasta poner la primera máquina, si alcanza para una.

La decisión es qué industria potenciar, con qué máquina y cuántos aldeanos dejan de juntar.

Lo que se probó con el bot antes de llegar a esto. El cuello de botella de la era es lo que juntan los aldeanos (uno junta ~21 por minuto, más que una mina entera) y, a la vez, ideas y monedas.

- **Un obrero por máquina:** la era tardaba entre 11,4 y 14,8 min, contra 10,6 sin máquinas. Una máquina de nivel 1 sumaba menos de lo que juntaba el aldeano que se llevaba.
- **La rápida gastando en proporción:** la fundición se comía el carbón.
- **Máquinas sin obrero:** tampoco fue más rápido, porque el acero y los engranajes que pedían competían con los inventos.

Con lo de arriba, el bot pone rápidas (o limpias, con mucho humo) en la industria que hace lo que le falta al próximo invento, con una persona de cada 3 como mucho de obrero, y las mejora. Termina la era sola en 9,5 a 10,3 min (10 en promedio, contra 10,6 sin máquinas; `sinmaquinas` lo compara) y encadenada en 5,3 (5,7 sin), con humo hasta ~30%. No es obligatorio: bien elegidas ayudan y mal elegidas atrasan. Cuando el bot las ponía en la fábrica y el laboratorio aunque no faltaran monedas ni ideas, tardaba más que sin máquinas.

De paso, el bot junta primero para el edificio que fabrica lo que pide el próximo invento. Si no, la fundición se comía la piedra y el taller mecánico no se hacía nunca: una corrida encadenada tardó 11,7 min.

Se guardan con el edificio (`m`, el octavo dato, como `["r2","l1",""]`) y el obrero con la persona (`job`, el octavo dato). Una partida anterior se lee igual. A otra era pasan si el edificio sigue igual y ahí también tiene puestos (por ahora, solo la Industria tiene).
