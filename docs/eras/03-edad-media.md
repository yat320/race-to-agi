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
