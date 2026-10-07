# Cómo se arma una era nueva

Una era nueva del mundo abierto lleva tres archivos y nada más:

1. `src/mundo/<era>.js`: sus datos y su arte.
2. `src/mundo/amenazas/<amenaza>.js`: su amenaza.
3. `docs/eras/NN-<era>.md`: su doc.

El build la engancha sola en el inicio, en la fila de eras del motor y de la Prehistoria, y en el pase desde la era anterior. También deduce el papel de sus edificios para cuando la ciudad pasa a la era siguiente. El bot y la huella la juegan sin anotarla.

**No se tocan:**

- `src/mundo/motor.html`
- `index.html` ni `mundo.html`
- `tools/`
- `CLAUDE.md` ni `README.md`
- los archivos de otras eras

Si de verdad hace falta algo nuevo en el motor, que sea chico y genérico (que sirva a cualquier amenaza, como `v.held`, `v.slow` o el gancho `drawBug`), que no cambie nada en las otras eras (la huella de la 2 a la 16 tiene que dar igual) y que quede anotado en el doc de la era.

## 1. El archivo de la era

Copiá la estructura de `src/mundo/multiversal.js`, que es la más nueva.

- **Arriba, `const ERA={...}`:**
  - `n`, `name`, `de`, `obra` y `short` (el nombre corto de la fila de eras: "Conciencia", "Génesis"; si no está, sale de `name` sacándole "Era ").
  - En `text`, `when` con la fecha de la intro (las anteriores: año 1.000.000 la multiversal, 1.000.000.000 el génesis).
  - `next:null` y sin `winNote`: el build pone el pase a la siguiente cuando exista.
  - `ore` (recurso con su ícono), `storage`, `ideaBuild`, `ideaTechs`, `boostTech`, `farmBuild` y `nightTech`.
  - `lights`.
  - La clave de su amenaza (`sirens:true`), `defense` y `guard`.
  - `legacy`: la clave de la era anterior y los tres bonos.
  - `techs`: 9; el último es la obra. Las ideas de sus costos (y lo que dan de ideas los edificios) van en la unidad de la Antigüedad, como en las otras eras: el motor las multiplica ×2 por cada era (`IX`).
  - `builds`: los básicos con sus ids de siempre, más los propios.
  - `info`, `tips1` y `tips2`, `deco` y `text`.
- **Abajo de la marca `/* ---------- arte de la era ---------- */`:** las funciones que dibujan el recurso y cada edificio con `mkA`, y al final dónde va cada sprite. Mirá cómo lo hace la multiversal. Los básicos (granja, fogata, aserradero, cantera, granero, taller) ya tienen dibujo por época en el motor.
- **Ids de edificios nuevos:** que no se repitan con los de otras eras, salvo que cumplan el mismo papel (mirá `ROLE` en el motor).
- **Papeles:** el build los deduce de `ideaBuild`, `farmBuild`, `defense`, `storage` y de lo que produce cada uno. Si querés otro, poné `role:'ideas'` (o `'monedas'`, `'ideaBuild'`, `'farmBuild'`, `'defense'`, `'storage'`, `'ore'`, `'drop'`) en el edificio.
- **Capítulos (opcional):** `capitulos`, metas con reloj y estrellas, como en la Antigüedad (ver su doc). Se calibran con el bot: oro ≈ 2 veces lo que tarda en cada capítulo y plata ≈ 3.
- **Objetos (opcional):** una era puede tener objetos que se fabrican (`ERA.items` y edificios con `craft:true`, `use` y `prod`), como el acero y los engranajes de la Industria. Ver CLAUDE.md.
- **Adentro (opcional):** un edificio con `puestos:true` se abre al tocarlo y lleva máquinas (rápida, limpia, ahorradora) con un obrero, como las industrias de la Industria. La era dice cuánto cuesta cada nivel (`machine`) y dibuja el corazón de cada uno en `HS['in_'+id]` (176×200, dos cuadros). Lo que no produce puede ir en `niveles` (lista de ids) y se mejora hasta el nivel 3 con su efecto según su papel (casa, depósito, parque, herrería, defensa, cuartel, el que potencia granjas o ideas); lo que suma cada nivel se dibuja en `HS['inp_'+id]`. En vez de máquinas, lo que produce puede llevar `oficios` (`{id:{n:'Escriba',ns:'Escribas',v:0.4}}`): hasta 3 personas que trabajan adentro, cada una suma `v` a lo que produce; `HS['inp_'+id]` es lo que usa cada una. Ver los docs de la Industria (máquinas) y de la Antigüedad (oficios).
- **Edificios rotos:** si tu amenaza los rompe (`o.bug`), dibujalos con el gancho `drawBug` de la amenaza (si no, el motor dibuja un bicho con `HS.bug`).

## 2. El archivo de la amenaza

Seguí `src/mundo/amenazas/LEEME.md` y el ejemplo `dobles.js`.

- Todos los nombres de arriba del archivo empiezan con el nombre de la amenaza. Comparten el script con el motor, con las otras amenazas y con el arte de cada era.
- Tiene que tener:
  - `reset`, `tick`, `update`, `targets` y `tap`.
  - Algo que la dibuje: `ents` y/o `drawUnder`, `drawOver` o `drawTop`.
  - `arrows` para la flecha roja fuera de pantalla.
  - `hint`, `row`, `prueba` y `debug`.
  - `guardia`, con el arte del guardián.

## 3. Probar y ajustar

Con `PW_CHROMIUM=/opt/pw-browsers/chromium` si no hay navegador:

```bash
npm run build
node tools/bot-mundo.mjs 3 N solo                          # tocando: 9–11 min
node tools/bot-mundo.mjs 3 N solo ignora sintorres         # solo cuarteles: 10–12
node tools/bot-mundo.mjs 3 N solo ignora singuardias       # solo defensa: 10–12
node tools/bot-mundo.mjs 3 N solo ignora sindefensa        # nada: 13–15, ~1,4 veces lo de tocando
node tools/huella-mundo.mjs out/hN N                       # sin errores y "ganada true"
```

- **Mirala.** Sacá capturas en el celular (400×850, `isMobile:true`) de la era de día, de noche y con la amenaza encima, y miralas. Los sprites se leen de un vistazo y la amenaza se distingue de tu gente.
- **Si tocaste el motor:** `node tools/huella-mundo.mjs out/antes 2,3,4,5,6,7,8,9,10,11,12,13,14,15,16` antes del cambio y `comparar` después.
- **Escribí el doc** `docs/eras/NN-<era>.md` con las mismas partes que los otros:
  - qué tiene;
  - qué hereda;
  - la amenaza y el balance, con los números del bot;
  - el arte.

## Reglas de diseño que valen para todo

Están en `CLAUDE.md`:

- Español rioplatense con voseo.
- Pistas cortas, una sola vez.
- Todo se toca con el dedo (≥ 32 px).
- La amenaza presiona, pero si nadie la toca su daño se termina solo.
- Una partida guardada nunca se rompe.
