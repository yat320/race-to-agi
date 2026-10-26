# Mar del Plata 3D

Un juego aparte de Race to AGI (octubre de 2026, Juani: "juego realista para recorrer Mar del Plata"): la ciudad real en 3D,
para recorrerla a pie, en bici o volando como gaviota y juntar los sellos de un pasaporte. Es `mardelplata.html` (WebGL2, sin
librerías) y los datos de la ciudad están en `public/mdp/ciudad.bin`. El inicio lo abre desde "Aparte: Mar del Plata en 3D".

## Qué tiene

- **La ciudad de verdad**, de La Perla al puerto y del mar a unas 25 cuadras adentro (5,3 × 8,9 km): la costa, las playas,
  las escolleras y espigones, ~87 mil edificios, ~17 mil tramos de calle con su nombre, plazas, el golf y el relieve
  (la Loma Stella Maris, la barranca de Cabo Corrientes, la Rambla más alta que la playa).
- **Hitos dibujados a mano** sobre los datos: la Catedral con su torre y chapitel mirando a Plaza San Martín, el Casino y el
  Hotel Provincial de ladrillo con mansarda de pizarra, el Torreón del Monje con almenas y torre redonda, la Torre Tanque
  (fuste de piedra, tanque de ladrillo y techo verde) y los dos lobos marinos de piedra de la Rambla.
- **Vida**: lanchas amarillas en la Banquina de los Pescadores y barcos pesqueros en las dársenas (se mecen), la colonia de
  lobos marinos de la Escollera Sur, sombrillas y carpas en las playas, árboles en veredas y plazas que se mueven con el viento,
  autos que manejan por la derecha y gente que camina por las veredas.
- **El mar**: olas, reflejos del cielo, brillo del sol, espuma en la orilla y rompiente que llega a la playa; se ve el fondo
  donde es bajo.
- **El sol según la hora**, calculado para fines de octubre a 38° sur (sale sobre el mar, se pone detrás de la ciudad):
  amanecer, mañana, mediodía, tarde, atardecer, noche (ventanas y faroles prendidos, estrellas) o la hora de verdad. Sombras de
  los edificios y los árboles alrededor tuyo.
- **Fachadas calculadas** (sin texturas): ventanas que se reparten parejas en cada pared, balcones y losas en los
  departamentos, vidrieras en planta baja, piedra Mar del Plata en chalets, ladrillo visto, torres de vidrio, chapa en los
  galpones, techos de tejas a dos o cuatro aguas en las casas, carpas a rayas en la playa.
- **El pasaporte**: 17 lugares (los lobos de la Rambla, la Rambla y el Casino, Plaza Colón, Playa Bristol, la Catedral, Plaza
  San Martín, la Peatonal, el monumento a Alfonsina Storni, La Perla, el Torreón, Varese, la Torre Tanque, Cabo Corrientes,
  Villa Victoria, Playa Grande, la Banquina y los lobos marinos del puerto). Llegar sella el lugar y cuenta un dato corto
  (revisados en la web en octubre de 2026). "Guiarme" pone una flecha arriba; a un lugar ya sellado se vuelve en taxi.
- **Controles**: dedo izquierdo, joystick (empujado a fondo, corre); dedo derecho, mirar. En la compu: WASD o flechas y
  arrastrar con el mouse, Shift corre, M el mapa, B cambia cómo andás. A pie y en bici no se atraviesan paredes, árboles ni
  pedestales, y al mar se entra hasta las rodillas; la gaviota vuela por encima de todo.
- Minimapa que gira con vos, mapa grande con lugares (arrastrar, pellizcar, tocar), nombre de la calle donde estás, opciones
  (hora, calidad, autos y gente, sonido) y sonido sintetizado: el mar según lo cerca que estés, viento al volar, la ciudad.

## Cómo se arman los datos

`tools/mdp-datos.py` (Python con `pip install pyarrow shapely numpy scipy pillow requests`) baja las fuentes una vez a
`out/mdp-fuentes/` y escribe `public/mdp/ciudad.bin` y un mapa para mirar en `out/mdp-mapa.png`:

- **Overture Maps** (release `2026-10-21.0`, S3 público; lee solo los row groups que tocan el recuadro): edificios, calles
  (`transportation/segment`), la costa (`base/land` clase `land`), playas, rocas, bosques y árboles (`base/land`), plazas,
  golf y usos del suelo (`base/land_use`), escolleras, muelles y estacionamientos (`base/infrastructure`). Sale de
  OpenStreetMap: licencia ODbL, el juego lo dice en la carga y en Opciones.
- **AWS Terrain Tiles** (terrarium, z14) para el relieve. Se suaviza (~30 m) mirando solo la tierra; las playas bajan suave
  al agua (4,5%) y el resto de la costa es un muro de al menos 2,4 m (muelles, escolleras, barrancas). Bajo el agua el fondo
  baja 2% cerca de las playas y 12% en lo demás.
- **Alturas de los edificios**: casi ningún edificio trae altura (son contornos detectados desde satélite). Se estima con un
  azar fijo por edificio, según la zona (seis manchas donde se juntan las torres: microcentro, La Perla, Bristol, Güemes,
  Stella Maris y Playa Grande), lo construido alrededor, el tamaño y lo cerca del mar: 1 a 3 pisos en los barrios y torres de
  6 a ~23 pisos en el centro y la costa (~1.900 de más de 30 m). Los pocos que traen pisos o altura en los datos la usan. El
  Casino y el Provincial van a 24 m, la Catedral a 20 (más la torre), el Torreón a 11.
- Árboles: los de los datos, los de las filas de árboles, bosques y plazas al azar, y de vereda a los dos lados de las
  calles (menos en el centro). Sombrillas en la arena, lanchas cerca de la Banquina, barcos en las dársenas, lobos en la
  reserva y faroles en las avenidas.

## Formato de `ciudad.bin`

gzip de un binario (little endian). Cabecera: `MDP1`, versión (u32), `lon0 lat0 mlon mlat` (f64: el origen, frente al Casino, y
metros por grado), `gx0 gz0 G` (f32) y `gw gh` (u32: la grilla de 5 m), `C` (f32) y `cw ch` (u32: pedazos de 200 m).
Coordenadas en metros: x al este, z al sur. Después, secciones `tag(4) largo(u32) datos` alineadas a 4:

- `HGT `: alturas en decímetros (i16), guardadas como diferencia con la predicción plana (izquierda + arriba − diagonal).
- `CLS `: clase de suelo de cada casillero (u8): 0 ciudad, 1 pasto, 2 arena, 3 roca, 4 baldosa, 5 bosque, 6 golf,
  7 cemento, 8 fondo del mar, 9 tierra.
- `BLD `: n, dónde empieza cada pedazo (u32 × pedazos+1), y por edificio: vértices (u8), tipo (u8: 1 casa, 2 departamentos,
  3 comercio, 4 galpón, 5 iglesia, 6 carpa), techo (u8: 0 plano, 1 tejas, 3 mansarda), hito (u8: 1 Catedral, 2 Casino,
  3 Provincial, 4 Torreón), altura en dm (u16) y el contorno (i16 en cuartos de metro: el primer punto y después diferencias).
- `ROAD`: igual por tramo (≤ 40 m): clase (u8: 1 troncal … 6 calle residencial, 7 servicio, 8 peatonal, 9 vereda, 10
  bicisenda, 11 sendero, 12 escalera), puntos, ancho en cuartos de metro, puntas que son esquina (u8, para no pintar líneas
  en los cruces), nombre (u16, índice en `NAME`) y la línea.
- `TREE`: tipo (0 plátano, 1 pino, 2 de plaza, 3 tamarisco) y posición. `PROP`: tipo (1 sombrilla, 2 lancha, 3 barco,
  4 lobo marino, 5 farol), giro (u8) y posición. `NAME`: los nombres de las calles separados por `\n`.

Si cambia `ciudad.bin`, subir `DATA_V` en `mardelplata.html` (el service worker guarda los archivos que no son páginas).

## Cómo se dibuja

- La ciudad se arma de a pedazos de 200 m alrededor tuyo (1,35 km en calidad media; más lejos volando), los más cercanos
  primero y con 7 ms por cuadro. El suelo tiene tres niveles de detalle (5, 10 y 20 m) con faldones contra las rajaduras;
  afuera del recuadro sigue un suelo liso para que no se vea el borde.
- Un programa por cosa: suelo, edificios (fachadas en el sombreador, con promedio de lejos para que no tiemblen), calles
  (líneas, sendas peatonales, cordón, baldosas), instancias (árboles, cosas, autos y gente: dos niveles de detalle para los
  árboles), mar (anillos alrededor de la cámara; la profundidad sale de una textura con las alturas), cielo (degradé, sol,
  nubes, estrellas) y los resplandores de los faroles. Niebla que casi no se nota cerca y tapa el borde de lo cargado, y
  tonos ACES.
- Sombras: un mapa de 2048 desde el sol sobre ~170 m alrededor, que se rehace solo al moverte 24 m o cambiar la hora.
- Calidad baja/media/alta (distancia, árboles, sombras, resolución). La resolución baja sola si anda lento y, si ni así
  alcanza, la calidad baja un nivel y lo avisa.

## Partida

`localStorage['rtagi-mdp-v1']` (entra en la copia del progreso del inicio): `sellos` (`{id: fecha}`), `dest` (a dónde te
guía), `pos` (`[x, z, giro]`), `modo`, `hora`, `horaReal`, `calidad`, `vida`, `sonido`, `visto` (ya vio la pista) y `total`
(cuántos lugares hay, para el inicio).

## Probar

- `npm run prueba:mdp`: arma `dist/` y en un celular simulado (400×850, táctil, WebGL por software) carga el juego, camina
  con el teclado y con el joystick, va a la Rambla, la Catedral, el Torreón, la Banquina, los lobos, Playa Grande al
  atardecer, vuela como gaviota, la noche y la Torre Tanque, abre el pasaporte, el mapa y las opciones y prueba que el botón
  atrás cierre la hoja. Deja capturas en `out/mdp/` y sale con código 1 si hay errores de página. Con WebGL por software
  anda a ~12 cuadros por segundo; en un celular de verdad tiene que andar mucho mejor, pero eso no se pudo medir acá.
- Con `?debug`, `window.__mdp` tiene `cam`, `teleport(x, z, giro)`, `toXZ(lon, lat)`, `setHora(h)`, `setMode(m)`, `stats()`
  (cuadros por segundo, triángulos, pedazos, autos y gente) y más.

## Pendiente / ideas

- Las alturas son estimadas: un edificio puntual puede tener más o menos pisos que el de verdad.
- Lo que no está: el Faro de Punta Mogotes y el estadio (quedan afuera del recuadro); la terminal de ómnibus y la estación
  de tren están, pero sin dibujo propio ni sello; no se entra a los edificios ni se sube a la Torre Tanque.
- Medir los cuadros por segundo en un celular de verdad y ajustar las calidades.
