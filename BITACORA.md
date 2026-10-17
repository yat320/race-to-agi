# Bitácora

Registro del trabajo autónomo: qué estoy haciendo, qué terminé, qué decidí y por qué, y qué sigue. Lo de fondo (reglas del juego, cómo probar) está en `CLAUDE.md`; lo que espera una respuesta de Juani, en `PENDIENTES.md`.

## 15 de octubre de 2026

### Plan del día (decidido por mí)

Los criterios de Juani: lo que haga el juego más divertido en el celular y lo acerque a poder publicarse. Hoy el foco es La carrera de la IA.

1. **El juego como app en el celular (PWA).** Hoy se juega en el navegador: no se instala ni anda sin conexión.
   - Con un manifiesto, íconos y un service worker, se agrega a la pantalla de inicio, abre a pantalla completa y anda offline.
   - Es el paso más barato hacia Android: una PWA se puede empaquetar para Play Store (TWA) sin reescribir nada.
2. **La carrera de la IA, etapa 2: los espías del rival entran a las supercomputadoras.** Es un problema adentro, ligado a la amenaza de la etapa, que hay que ir a resolver caminando. Hoy los espías solo se ven afuera.
3. **Revisar el balance de lo de adentro.** Los racks pueden sumar hasta +500% de un centro de datos más los escritorios: probablemente demasiado. Lo mido con el bot, o con cuentas si el bot no anda en `ia1.html`.
4. **Un segundo edificio para recorrer:** el laboratorio de IA. Si da el tiempo.

### Hecho

1. **PWA (app instalable y sin conexión).**
   - `public/manifest.webmanifest`, íconos en `public/icons/` (un chip en pixel art que dibuja `tools/iconos.mjs`) y `src/sw.js`. El build mete en el `<head>` de cada página el manifiesto, los meta de app y el registro del service worker, copia `public/` a `dist/` y escribe `dist/sw.js` con una versión que es el hash de las páginas.
   - El service worker busca primero en la red las páginas (así cada versión publicada llega sola) y, sin conexión, usa la copia guardada. El resto (íconos, fuentes) sale de la copia.
   - Probado con Playwright y el servidor apagado: el inicio, la Edad Media y la carrera de la IA abren sin conexión. Una era que nunca se abrió lleva al inicio. Sin errores de página.
   - La huella del mundo abierto da igual: solo cambian los campos de `save`, el ruido de siempre entre corridas, y se ganan las 21 eras.
   - No lo pude probar en un celular de verdad (instalar en la pantalla de inicio). Queda para Juani.
   - Publicado: https://github.com/yat320/race-to-agi/pull/78.
2. **Etapa 2: los espías se meten en las supercomputadoras.**
   - Antes el espía copiaba en 4 segundos parado al lado del edificio. Ahora entra, camina hasta un rack y copia 20 segundos.
   - Hay que ir, entrar y tocarlo. Si termina, sale con los planos y se lo puede atrapar en el camino, como antes.
   - En el motor: gancho `spyIn` y `s.inside`. En `interior.js`, el resto.
   - Probado con Playwright: entra, lo atrapé tocándolo con el dedo, y otro que dejé terminar salió con +2% para el rival. Sin errores.
3. **Balance de lo de adentro:** con cuentas, porque el bot no juega la carrera de la IA. Un rack al máximo cuesta como el tercer o cuarto centro de datos y suma lo mismo. Lo dejo: premia jugar adentro. Detalle en `docs/ia.md`.
4. **El laboratorio de IA por dentro (etapa 1; en la etapa 2 es el instituto).**
   - Tiene mesas de experimentos: prudente (60 s, casi seguro) o ambicioso (30 s, da más, 40% de que salga mal).
   - Al terminar hay que ir a ver qué salió. Si sale mal, se escapa un modelo desalineado que hay que tocar.
   - Los escritorios aceleran los experimentos, porque el laboratorio no produce ideas por sí solo y si no, no servían.
   - Probado con Playwright:
     - experimentos que siguen al recargar la partida;
     - uno que sale mal y el modelo atrapado con el dedo;
     - el escritorio que acelera;
     - el pase a la etapa 2 como instituto, con sus experimentos.
   - Sin errores. La huella del mundo abierto da igual y las partidas viejas cargan.
   - PR abierta, sin mergear: toca el motor (gancho `spyIn`) y agrega datos al guardado de la carrera de la IA. Está anotada en PENDIENTES.

### Qué sigue
- Que Juani pruebe la PR abierta en el celular. Si le gusta, se mergea.
- La etapa 2 todavía es la era AGI con interiores: falta algo propio, como una decisión de seguridad contra velocidad que se juegue adentro.

## 17 de octubre de 2026

Juani mergeó la PR #79 para probarla en el celular y pidió seguir en modo autónomo.

### Hecho
1. **Etapa 2: la pizarra elige seguridad o velocidad.**
   - En la supercomputadora, la pizarra tiene una tercera opción: lo de adentro deja de dar ideas y sube la seguridad (1,2% por minuto por rack al máximo).
   - Es la decisión propia que le faltaba a la etapa: la AGI pide seguridad 100% y el rival apura.
   - Probado con Playwright: con 2,6 racks pasa de unas 31 mil ideas por minuto a 3,1% de seguridad por minuto, se guarda y vuelve igual al recargar. Sin errores.
   - No toca el motor. El guardado suma un valor posible a un dato que ya existía: una partida vieja carga igual. Por eso se publica directo.
2. **Etapa 1: capítulos con reloj.**
   - Cinco capítulos, cada uno con una meta de adentro: instalar un rack, sentar a alguien, mejorar un rack o sacar un experimento bueno.
   - Calibrados con el bot en la era IA sola (3 corridas), más un poco para lo de adentro.
   - En el motor: un gancho `goal` para metas nuevas, y las marcas de un juego aparte se guardan con su nombre (`ia1`).
   - Probado con Playwright:
     - el primer capítulo se completa al instalar el rack con el dedo y da 3 estrellas;
     - la marca queda como `ia1`;
     - una partida vieja sin capítulos cuenta lo hecho sin estrellas.
   - Sin errores.
3. **Etapa 2: capítulos con reloj.**
   - Cinco capítulos, con metas de seguridad (20%, 50%, 100%) y un espía atrapado adentro.
   - Calibrados con el bot en la era AGI sola (3 corridas, 11,5 min).
   - La huella del mundo abierto da igual (solo los `save`, el ruido de siempre), se ganan las 21 eras y las partidas viejas cargan.
   - Repetí todas las pruebas de adentro: espías, laboratorio, seguridad y capítulos. Sin errores.
   - El motor suma un gancho `goal` y la meta `seg`: solo se usan con metas nuevas, así que lo publico directo.
4. **El inicio muestra la carrera de la IA arriba.**
   - Recorriendo el juego como Juani: la tarjeta de la carrera estaba al fondo, debajo de las 22 eras, y había que bajar mucho para encontrarla.
   - Ahora va arriba de la barra de progreso, con la etapa en la que vas y tus mejores estrellas ("Etapa 1 · ★ 8 de 15").
   - Probado con Playwright: sin partida no muestra el renglón, el botón abre la etapa que toca y no hay errores.
