# Amenazas en archivo propio

Cada archivo de esta carpeta es la amenaza de una era. `npm run build` los mete todos en el motor, en todas las eras, donde dice `/*@amenazas*/` (después de las mecánicas del motor, antes del arte). Cada archivo se registra con:

```js
amenaza({on:'twins', reset(){…}, tick(step){…}, update(dt){…}, …})
```

`on` es la clave de `ERA` que la prende: la era multiversal tiene `twins:true` en sus datos y por eso tiene dobles. El motor llama solo a las amenazas prendidas (`AM`) y, de cada una, solo a los ganchos que tiene. El ejemplo completo es `dobles.js`.

Como todos los archivos van al mismo script que el motor, las otras amenazas y el arte de la era (que define sus propios colores, como `VIO` o `MIR`), los nombres de arriba de cada archivo (`let`, `const`, `function`) no se pueden repetir con nada de eso, en ninguna era. Por eso conviene empezarlos con el nombre de la amenaza: `twins`, `TWIN_START`, `spawnTwin`, `drawTwinPortals`.

## Ganchos

| Gancho | Cuándo lo llama el motor | Qué tiene que hacer |
|---|---|---|
| `reset()` | partida nueva y al cargar una guardada | vaciar su estado: las amenazas no se guardan |
| `tick(step)` | cada 0,5 s de juego | aparecer (`if(st.time>=X_START&&Math.random()<step/xEvery())spawnX();`) y lo que va por pasos, como curar o arreglar solo |
| `update(dt)` | cada cuadro | moverse, hacer su daño, la defensa (`towersXY()`, `jammed(T,x,y)`) |
| `targets(add)` | los guardianes y el bot | `add(x,y,tx,ty)` por cada amenaza suelta: dónde está y en qué casillero se la toca. Los edificios con `o.bug` o `o.past` ya los agrega el motor. |
| `tap(tx,ty)` | un toque tuyo o de un guardián | resolverla (+2 ideas, `float`, `toast`); devolver `true`, o `'b'` si arregló un edificio, o `false`. Con un guardián, `quiet` está prendido y los `toast` no salen solos. |
| `ents(list)` | dibujo | sumar `{k:y+1,z:1,e,f:sprite,post}` a la lista de gente, que se ordena por profundidad; `post(e)`, si está, dibuja algo encima de `e` |
| `drawUnder()` | dibujo, antes de la gente | lo que va en el suelo: portales, marcas, sombras |
| `drawOver()` | dibujo, después de la gente | lo que vuela o tapa: nubes, naves, rayos |
| `drawBug(px,py,o)` | dibujo, encima de cada edificio roto (`o.bug`) | cómo se ve lo que rompió tu amenaza (escarcha, chamuscado, una marca); si no está, el motor dibuja un bicho con `HS.bug`, que la era tiene que definir |
| `drawTop()` | dibujo, encima de la oscuridad de la noche | lo que tiene que verse siempre igual de noche |
| `lights(L)` | de noche | `L.push([x,y,radio,alfa])`, con x e y en píxeles del mundo (`casillero*T+8`) y el radio en casilleros |
| `arrows()` | siempre | lista de `{x,y}`, en casilleros, para la flecha roja del borde cuando están fuera de pantalla |
| `hint()` | la pista de arriba | `['¡Título!','texto corto']` o `null` |
| `row(p)` | la fila de la defensa en el HUD | llenar `$(p+'Fill')`, `$(p+'Num')` y `$(p+'Meta')` y mostrar u ocultar la fila (ver `twinRow` en `dobles.js`) |
| `prueba()` | la huella | soltar una tanda a propósito (los dobles sueltan tres) |
| `botTaps()` | el bot | lista de `[tx,ty]` para tocar; si no está, usa `targets`. Sirve cuando una amenaza pide más de un toque. |
| `debug` | con `?debug` | funciones que se suman a `window.__rtagiDebug` (`twins`, `spawnTwin`, `twinEvery`) |
| `guardia` | el arte del guardián | `{kind, pal:{c,C,j}, draw(a,K)}`: el guardián que dice `ERA.guard.kind`, con el cuerpo de una persona (`pal`: chaqueta, sombra, pantalón) y lo que lo distingue (`draw`, sobre el lienzo `a` de 64×64; `K` es el color del contorno) |

## Lo que ya hace el motor

- **Defensa y guardianes.** El edificio de defensa sale de `ERA.defense` (`{id, r, label}`). `towersXY()` da dónde están los que andan y `jammed(T,x,y)` dice si un punto queda a `r` o menos de alguno. Los guardianes (`ERA.guard`) usan `targets` y `tap` sin que haya que hacer nada más.
- **Edificios rotos.** Uno con `o.bug` no produce (`broken()`), se guarda con la partida y lo buscan los guardianes y el bot. Arreglarlo con un toque va en tu `tap`: mirar `obj[ty*MW+tx]`, sacarle el `bug`, poner `BROKEN=null` y devolver `'b'`. Para que se vea roto, usá el gancho `drawBug` (por ejemplo, `drawDamage(px,py)`, el marco rojo con humo que usan los meteoritos).
- **Gente agarrada.** Si la amenaza se lleva o retiene a alguien de tu gente, poné `v.held` en algo que no sea falso (la amenaza misma, por ejemplo) y `v.state='idle';v.path=[];v.target=null`: el motor deja de moverlo y de mandarlo a trabajar, y ahí lo movés vos. Para soltarlo, `v.held=null` y otra vez `v.state='idle'`. No se guarda: en `reset()` soltá a todos.
- **Radio de los guardianes.** Salen a 8 casilleros de su cuartel (`GUARD_R`) y en la ciudad compacta del bot llegan a casi todo: si solo con cuarteles la era da menos de 10 min, que la amenaza dure poco en un lugar o aparezca lejos.
- **Gente lenta.** `v.slow` en algo que no sea falso hace que ande y trabaje a la mitad, como la de una casa con peste; la amenaza lo prende y lo apaga (el frío de la era omega lo usa mientras dura el entumecimiento).
- **Caminar.** `stepEnt(e,dt,vel)` mueve algo por su `path`; `pathAdj(x,y,tx,ty)` y `bfs(x,y,meta)` arman caminos; `tileOf(e)` y `passable(x,y)` sirven para ubicarse.
- **Mostrar.** `float(x,y,texto,color)` (números que suben), `toast(texto)` (aviso abajo) y `zaps.push({x,y,t:0.5})` (destello).
- **Recursos.** `st.res`, `add(k,n)`, `RN` (nombres), `RCOL` (colores) y `ORE` (el mineral de la era).

## Ritmo de referencia

Las amenazas del motor siguen el mismo molde, y conviene repetirlo:

- Empiezan a los 2 minutos (`X_START=120`).
- Aparecen cada ~40 s y más seguido con cada invento: `xEvery=()=>40/((1+0.1*Object.keys(st.techs).length)*(st.techs.<invento que las atrae>?1.3:1))`.
- Tocarlas da +2 ideas.
- Si nadie las toca, su daño se termina solo en algún momento: se arreglan, se van o se apagan.
- La defensa trabaja a 4 casilleros.
- Un invento las suaviza (roban la mitad, crecen más despacio).

Con el bot, la era sola tiene que dar:

| Cómo juega el bot | Minutos |
|---|---|
| Tocando | 9–11 |
| Sin tocar y solo con la defensa | 10–12 |
| Sin tocar y solo con los cuarteles | 10–12 |
| Sin tocar y sin defensas | 13–15, más o menos 1,4 veces lo de tocando |

Las corridas:

```bash
node tools/bot-mundo.mjs 3 N solo
node tools/bot-mundo.mjs 3 N solo ignora
node tools/bot-mundo.mjs 3 N solo ignora sintorres
node tools/bot-mundo.mjs 3 N solo ignora singuardias
node tools/bot-mundo.mjs 3 N solo ignora sindefensa
```
