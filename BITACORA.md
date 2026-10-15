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
