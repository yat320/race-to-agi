# Hoja de ruta del mundo abierto

Las eras que siguen a la multiversal. Cada una suma una amenaza con una mecánica que todavía no hay. Ya están tomadas:

| Era | Amenaza | Mecánica |
|---|---|---|
| Prehistoria | lobos | acechan |
| Antigüedad | piratas | roban y vuelven al barco |
| Edad Media | peste | contagia |
| Renacimiento | langostas | tapan un área |
| Industria | ludditas | rompen |
| Electricidad | tormentas | cruzan y queman |
| Computación | polillas | traban máquinas |
| Internet | virus | viajan por la red |
| IA | robots | se desalinean |
| AGI | espías | copian |
| Era estelar | meteoritos | caen |
| Era interestelar | nanobots | crecen |
| Era galáctica | ovnis | se llevan gente |
| Era intergaláctica | grietas | hacen retroceder en el tiempo |
| Era cósmica | agujeros negros | tiran y piden varios toques |
| Era multiversal | dobles | se disfrazan y roban |

Los nombres son piel: lo que importa es que la mecánica sea nueva y que se pueda tocar. Lo que queda fijo para que las eras se puedan hacer en paralelo es:

- **Los ids de los inventos**: la era siguiente los usa para sus bonos.
- **La clave de la partida anterior** (`legacy.key`).
- **Los ids de los edificios**: no se repiten con los de otras eras salvo que cumplan el mismo papel.

Cómo se arma una era: [`nueva-era.md`](nueva-era.md).

**Estado (octubre de 2026):** las eras 17, 18 y 19 ya están hechas, armadas en paralelo por tres agentes. Al balancearlas con el bot cambiaron algunos números de los de abajo (cada cuánto vienen, cuánto duran); los que quedaron están en el doc de cada era. Lo que sigue de acá es la especificación con la que se armaron.

## Era 17: Era de la conciencia

La puerta al multiverso abre el camino a las mentes de todos los universos.

- **Archivos.** `src/mundo/conciencia.js` (`n:17`, `name:'Era de la conciencia'`, `de:'de la era de la conciencia'`, `obra:'la conciencia compartida'`). Doc en `docs/eras/17-conciencia.md`.
- **Recurso.** `recuerdo`, cristales de recuerdo: cristales lilas y nacarados con un brillo adentro.
- **Amenaza: sirenas** (`sirens:true`, `src/mundo/amenazas/sirenas.js`). La mecánica nueva es que **atraen a la gente**.
  - Desde los 2 minutos, cada ~40 s llega flotando una sirena desde 11–14 casilleros, hacia donde trabaja más gente. Viene más seguido con cada invento y con el mercado de sueños.
  - Se queda cerca de la ciudad y canta.
  - La gente que está dentro de su canto deja lo que hace, camina hasta ella y se queda hechizada alrededor sin trabajar (`v.held`). El canto empieza en 2,5 casilleros y crece hasta 6.
  - Tocarla la calla (+2 ideas) y suelta a todos.
  - Si nadie la toca, se va sola a los ~70 s.
  - La armonía hace que el canto crezca más despacio.
- **Defensa.** `silencio`, la cúpula de silencio (r = 4). La gente que trabaja cerca no la oye y calla a las sirenas que se le acercan. La barra del HUD cuenta qué parte de tu gente está cubierta.
- **Guardián.** `director`. El cuartel es el conservatorio; el guardián es un director de orquesta de frac, con batuta, que tapa el canto con su música.
- **Inventos**, en este orden, con estos ids:
  1. `memoria`, cristales de recuerdo: desbloquea el palacio de la memoria; ideas +50%.
  2. `silencio`, cúpulas de silencio.
  3. `suenos`, mercado de sueños: da monedas; vienen 30% más sirenas.
  4. `jardines`, jardines de la mente: el jardín potencia las granjas.
  5. `destilado`: la destilería de recuerdos hace cristales sola.
  6. `armonia`: el canto crece la mitad de rápido.
  7. `colmena`, mente colmena: la de ideas de la era; ideas +50% y de noche ves más lejos.
  8. `empatia`, empatía total: todo produce +50%.
  9. `conciencia`, la conciencia compartida: la obra.
- **Edificios propios:**
  - `casa`, casa nube.
  - `memoria`, palacio de la memoria: ideas.
  - `silencio`: defensa.
  - `suenos`, mercado de sueños: monedas.
  - `jardinmente`, jardín de la mente: `farmBuild`.
  - `destileria`: da recuerdo.
  - `colmena`: `ideaBuild`.
- **Hereda de la multiversal** (`legacy.key:'rtagi-mundo16-v1'`):
  - `puerta`: `ideaMult` 1,25.
  - `semillas`: `agri` 1,25.
  - `destinos`: `speed` 1,2.
- **Antes:** la multiversal queda con `next:null` y sin `winNote`: el build la engancha sola.

## Era 18: Era del génesis

Con todas las mentes juntas, la humanidad aprende a crear universos.

- **Archivos.** `src/mundo/genesis.js` (`n:18`, `name:'Era del génesis'`, `de:'de la era del génesis'`, `obra:'el universo bebé'`). Doc en `docs/eras/18-genesis.md`.
- **Recurso.** `primordial`, polvo primordial: polvo dorado y oscuro que gira.
- **Amenaza: devoradores del vacío** (`eaters:true`, `src/mundo/amenazas/devoradores.js`). La mecánica nueva es que **se multiplican**.
  - Desde los 2 minutos, cada ~45 s se abre una grieta del vacío a 9–12 casilleros de un edificio. Viene más seguido con cada invento y con la inflación cósmica.
  - De la grieta sale un devorador chico que camina al granero o a lo que más produce.
  - Allá come: cada 3 s, 1 de lo que más tenés, y se le ve el número.
  - Cada 20 s, cada devorador que nadie tocó se divide en dos, hasta 8 por camada. Con la cuarentena, cada 40 s.
  - Cada toque mata uno (+1 idea; el último de la camada, +2).
  - Si nadie los toca, a los 90 s la camada se llena y vuelve a su grieta.
  - Lo que comen se pierde. La presión es que, si los dejás, se duplican.
- **Defensa.** `barrera`, la barrera de vacío (r = 4). Deshace a los devoradores que entran. La barra del HUD cuenta qué parte de los edificios cubre.
- **Guardián.** `cazador`. El cuartel es el puesto de cazadores; el guardián es un cazador del vacío con casco de visor y un arpón de luz.
- **Inventos**, en este orden, con estos ids:
  1. `primordial`, polvo primordial: desbloquea la incubadora de universos; ideas +50%.
  2. `barrera`, barreras de vacío.
  3. `inflacion`, inflación cósmica: la fábrica de estrellas da monedas; vienen 30% más grietas.
  4. `cosecha`, cosecha de galaxias: el vivero potencia las granjas.
  5. `crisol`, crisol primordial: hace polvo solo.
  6. `cuarentena`: se dividen la mitad de seguido.
  7. `leyes`, leyes físicas a medida: la de ideas de la era; ideas +50% y de noche ves más lejos.
  8. `constantes`, constantes afinadas: todo produce +50%.
  9. `genesis`, el universo bebé: la obra.
- **Edificios propios:**
  - `casa`, casa semilla.
  - `incubadora`, incubadora de universos: ideas.
  - `barrera`: defensa.
  - `estrellero`, fábrica de estrellas: monedas.
  - `vivero`, vivero de galaxias: `farmBuild`.
  - `crisol`: da primordial.
  - `leyes`, taller de leyes físicas: `ideaBuild`.
- **Hereda de la conciencia** (`legacy.key:'rtagi-mundo17-v1'`):
  - `conciencia`: `ideaMult` 1,25.
  - `jardines`: `agri` 1,25.
  - `colmena`: `speed` 1,2.

## Era 19: Era omega

Los universos se enfrían. La última era: juntar el calor que queda para llegar al punto omega.

- **Archivos.** `src/mundo/omega.js` (`n:19`, `name:'Era omega'`, `de:'de la era omega'`, `obra:'el punto omega'`). Doc en `docs/eras/19-omega.md`.
- **Recurso.** `chispa`, chispas: las últimas brasas del universo, naranjas y titilantes.
- **Amenaza: olas de frío** (`frost:true`, `src/mundo/amenazas/frio.js`). La mecánica nueva es **un frente que cruza el mapa**.
  - Desde los 2 minutos, cada ~50 s entra por un borde una ola de frío. Viene más seguido con cada invento y con la lonja del calor.
  - Es una línea de escarcha de ~9 casilleros, perpendicular a su marcha, que avanza a ~0,5 casilleros por segundo hacia la ciudad.
  - En el medio lleva un corazón de hielo que brilla.
  - Lo que el frente pisa se congela (`o.bug`, con escarcha encima): no produce hasta que lo tocás o hasta que se descongela solo a los 60 s.
  - La gente que pisa anda a la mitad un rato.
  - Tocar el corazón rompe la ola entera (+2 ideas).
  - El abrigo cuántico hace que lo congelado se descongele en la mitad.
- **Defensa.** `estufa`, la estufa estelar (r = 4). El frente se derrite donde toca su calor (le abre un hueco) y lo congelado cerca se descongela en 10 s. La barra del HUD cuenta qué parte de los edificios cubre.
- **Guardián.** `fogonero`. El cuartel es la sala de fogoneros; el guardián es un fogonero con gorra, pala y una brasa (un guiño al fuego de la Prehistoria).
- **Inventos**, en este orden, con estos ids:
  1. `chispa`, chispas: desbloquea el faro de la última luz; ideas +50%.
  2. `estufas`, estufas estelares.
  3. `calor`, lonja del calor: da monedas; vienen 30% más olas.
  4. `invernadero`, invernadero eterno: potencia las granjas.
  5. `recolector`, recolector de chispas: hace chispas solo.
  6. `abrigo`, abrigo cuántico: se descongela en la mitad.
  7. `cronica`, crónica del universo: la de ideas de la era; ideas +50% y de noche ves más lejos.
  8. `eternidad`: todo produce +50%.
  9. `omega`, el punto omega: la obra.
- **Edificios propios:**
  - `casa`, casa hoguera.
  - `faro`, faro de la última luz: ideas.
  - `estufa`: defensa.
  - `lonja`, lonja del calor: monedas.
  - `invernadero`: `farmBuild`.
  - `recolector`: da chispa.
  - `cronica`: `ideaBuild`.
- **Hereda del génesis** (`legacy.key:'rtagi-mundo18-v1'`):
  - `genesis`: `ideaMult` 1,25.
  - `cosecha`: `agri` 1,25.
  - `leyes`: `speed` 1,2.
- Es la última por ahora (`next:null`).
