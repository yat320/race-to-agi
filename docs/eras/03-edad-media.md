# Era 3: Edad Media

Datos y arte en `src/mundo/edad-media.js`; se juega en `mundo3.html` (lo arma `npm run build`). Partida en `rtagi-mundo3-v1`.

## Qué tiene

La Edad Media (hierro, monasterio, hospital, feria, molino de viento, universidad, granero; la peste; la imprenta como obra final; mapa propio).

## Qué hereda

De la era anterior, al terminarla: aldeanos, ideas, monedas y bonos de Anticitera e irrigación. Los bonos están en `ERA.legacy.perks`.

## Amenaza y balance

La Edad Media tiene **peste** (`ERA.plague`, la lista de edificios donde se junta gente: casa, monasterio, feria, puerto y universidad): desde los 2 minutos de juego, cada ~70 s (más seguido con cada invento y 30% más con las rutas comerciales, `plagueEvery`) se enferma uno (`o.bug`, se guarda). Un edificio enfermo rinde la mitad (`act()` descuenta medio por cada uno), los aldeanos de una casa enferma (`sickHome`, con una nubecita verde arriba) andan y trabajan a la mitad, y si nadie lo cura contagia a otro a 5 casilleros cada 25 s. Tocarlo lo cura (+2 ideas). Los hospitales (`ERA.defense` con `of`: la barra del HUD cuenta solo lo que se puede enfermar) cuidan lo que está a 4 casilleros (`guarded`): no se enferma ni se contagia, y lo que ya estaba se cura solo en 15 s. Con el bot (la era sola): tocándola se termina en ~10,9 min (~11,9 si toca cada 15 s); sin tocarla pero con 2 hospitales, en ~14,4; sin tocarla ni hospitales, en ~16,9.

## Arte

Casa de entramado, granero, monasterio, hospital encalado con espadaña, feria, molino (las aspas `HS.aspas` giran aparte) y universidad, y la peste (`drawPlague`: tinte enfermizo, marco rojo y miasma verde que sube; `drawSick` para los aldeanos).

## Adentro: oficios y niveles (octubre de 2026)

Juani pidió aplicar a la Edad Media lo de entrar a las construcciones, como en la Antigüedad (ver su doc). Se entra a todo lo que se construye. Arriba de la hoja va el adentro dibujado (paredes de piedra, ventanas altas, piso de tablas) y, a la izquierda, lo propio de cada edificio (`HS.in_<id>`, en dos cuadros):

- **Granja:** bolsas de grano, un barril, la horquilla y la guadaña, y una gallina que picotea.
- **Fogata:** la chimenea de piedra con la olla al fuego.
- **Aserradero:** el tronco sobre caballetes con la sierra que sube y baja, y un estante de tablones.
- **Cantera:** la grúa de rueda, que gira y levanta un bloque.
- **Monasterio:** la biblioteca, el atril con el libro abierto y una vela.
- **Hospital:** hierbas colgadas, el armario de frascos, una palangana y la cruz roja.
- **Feria:** el puesto con toldo a rayas, quesos, panes, frutas y un banderín.
- **Molino:** el engranaje que gira y la muela, con bolsas de harina.
- **Puerto:** la coca con su vela y barriles en el muelle.
- **Universidad:** la cátedra, la esfera armilar que gira y un banco.
- **Casa:** el hogar con la olla, la mesa y una repisa con platos.
- **Granero:** bolsas apiladas y barriles.
- **Herrería:** la fragua con el fuelle y el yunque con el martillo.
- **Casa del médico:** el armario de frascos, el mortero y hierbas.

**Oficios** (`ERA.oficios`). Lo que produce tiene 3 puestos. Quien tiene oficio deja de juntar, camina hasta el edificio y trabaja adentro. Lo que hace sube sobre su puesto.

| Oficio | Dónde | Qué suma cada uno |
|---|---|---|
| Campesino | granja | comida +50% |
| Juglar | fogata | ideas +50% |
| Leñador | aserradero | madera +50% |
| Cantero | cantera | piedra +50% |
| Copista | monasterio | ideas +40% |
| Feriante | feria | monedas +50% (con la misma comida) |
| Marinero | puerto | monedas e ideas +50% |

**Niveles** (`ERA.niveles`). Lo que no produce se mejora hasta el nivel 3:

| Edificio | Qué sube | Niveles 1 → 2 → 3 | Qué se ve |
|---|---|---|---|
| Casa | aldeanos | 2 → 3 → 4 | una cama más |
| Granero | lo que guarda | 150 → 225 → 300 de cada cosa | un estante con bolsas y barriles |
| Herrería | cuánto junta tu gente | +30% → +45% → +60% | un yunque más |
| Hospital | alcance contra la peste | 4 → 5 → 6 casilleros | una cama más |
| Molino | potencia a las granjas | +50% → +75% → +100% | una muela más |
| Universidad | potencia a las ideas | +30% → +45% → +60% | un pupitre con libros |
| Casa del médico | médicos | 1 → 2 → 3 | un médico más |

Cada nivel cuesta 1,5 y 2,5 veces lo que costó el edificio, y el 3 pide además 8 de hierro (`ERA.levelExtra`). El alcance del hospital se usa al cuidar de la peste (`guarded`, con `defR`): uno de nivel 3 cura lo que está a 6 casilleros.

**Balance.** Con el bot (la era sola, 10 corridas):

| Con el bot | Minutos |
|---|---|
| Sin oficios ni niveles | 11,1 (10,9 a 11,2) |
| Solo niveles | 11,8 (11,7 a 12) |
| Solo oficios | 10,6 (10,1 a 11,2) |
| Con todo | 10,5 (10,2 a 11,1) |

Pasa lo mismo que en la Antigüedad. Los oficios ayudan donde falta: el bot pone copistas en el monasterio y marineros en el puerto. Los niveles, como los usa el bot (sin mirar qué falta), se gastan el hierro y las monedas de los inventos. Encadenada, la Edad Media da 4,7 min (antes 4,8), y el Renacimiento y la Industria que siguen, 4,2 y 5.
