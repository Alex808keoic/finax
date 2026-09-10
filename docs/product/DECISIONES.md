# Finax — Registro de Decisiones Aprobadas

**Estado:** Oficial
**Última actualización:** 2026-08-16

---

## 1. Propósito

Este documento recoge las decisiones aprobadas por el Product Owner que no estaban cerradas en el
Documento Maestro ni en `AXIS_FINAL`.

Corresponde al punto 4 de la jerarquía de fuente de verdad definida en `CLAUDE.md` §4:
*decisiones aprobadas posteriormente por el Product Owner y documentadas*.

Reglas de uso:

- Una decisión registrada aquí es vinculante para la implementación.
- Lo marcado como **PENDIENTE** no puede cerrarse por iniciativa de Claude Code.
- Este documento no puede contradecir al Documento Maestro. Si aparece una contradicción:
  **detectar → informar → esperar decisión.**

---

## 2. Precedencia entre documentos

Aprobado el 2026-08-14.

| Documento | Rol |
|---|---|
| `docs/product/DOCUMENTO_MAESTRO_FINAX.docx` | Fuente de verdad del producto |
| `docs/product/AXIS_FINAL.docx` | Fuente normativa de AXIS |
| `docs/product/DECISIONES.md` | Decisiones aprobadas posteriormente |
| `docs/design/DESIGN_SYSTEM_FINAX.md` | Reglas normativas globales del sistema visual |
| `docs/design/FINAX_VISUAL_SYSTEM_V1_FINAL.md` | Especificación visual concreta de pantallas y componentes |
| `docs/design/FINAX_VISUAL_REFERENCE.png` | Referencia visual ilustrativa |

Reglas:

1. Cuando el Design System define explícitamente algo, **prevalece el Design System**.
2. Cuando el Design System no define algo y no existe conflicto con producto, la PNG puede
   utilizarse como referencia de **composición, proporciones, densidad y apariencia**.
3. **La PNG nunca puede modificar decisiones de producto.**
4. Un elemento presente en la PNG no es, por sí solo, una funcionalidad aprobada.

---

## 3. Decisiones

### D-01 · Color primario y secundario

Aprobado el 2026-08-14. Sustituye a los valores anteriores del Design System.

- Primario: `#00CBA0`
- Secundario: `#2D7FF9`

Los valores anteriores (`#4F7CFF` y `#DCE8FF`) quedan derogados.

El tinte claro de fondo que antes cubría `#DCE8FF` quedó cerrado en **D-17** como
`--color-secondary-tint`.

El color de texto sobre el primario quedó cerrado en **D-12**.

---

### D-02 · Colores semánticos

Aprobado el 2026-08-14.

| Estado | Valor |
|---|---|
| Éxito | `#22C55E` |
| Peligro | `#EF4444` |

**Advertencia**, **Información**, y el color de ingresos frente a gastos quedaron cerrados el
2026-08-15 en **D-17**, que amplía esta decisión sin derogarla.

---

### D-03 · Paleta categórica de gráficos

**PENDIENTE.** Decisión no cerrada el 2026-08-14 por decisión expresa del Product Owner.

- No inventar colores categóricos.
- No derivar una paleta a partir del primario, del secundario ni de la PNG.
- Los gráficos por categoría no pueden considerarse terminados hasta que esta decisión se cierre.

---

### D-04 · Categorías de movimientos

Confirmado el 2026-08-14. Coincide con el Documento Maestro, Módulo 2 §5.

Categorías iniciales, exactamente:

**Comida · Restaurantes · Salidas · Caprichos · Ropa · Otros**

- No añadir, renombrar ni reordenar categorías.
- Cuando se seleccione **Otros**, el **motivo es obligatorio**.
- El texto del motivo sustituye a la palabra «Otros» en el historial (Documento Maestro, Módulo 2 §5).

---

### D-05 · Campo «Nota»

Aprobado el 2026-08-14. Ampliación del Documento Maestro. **Decisión cerrada por completo.**

- Existe un campo **Nota**, **opcional**, **separado del Motivo**.
- **Motivo:** obligatorio únicamente cuando la categoría sea «Otros».
- **Nota:** opcional y **no sustituye al motivo**.
- La Nota no cumple ninguna función de clasificación.

**Disponibilidad:** la Nota está disponible en **todas las categorías, incluida «Otros»**. En un
movimiento de categoría «Otros» conviven ambos campos: Motivo obligatorio y Nota opcional.

**Visibilidad:** la Nota se muestra **únicamente en la ficha de detalle**. **No debe aparecer en el
historial**, que se mantiene limpio. En el historial, quien sustituye a la palabra «Otros» sigue
siendo el **Motivo** (Documento Maestro, Módulo 2 §5), nunca la Nota.

**Relación con AXIS:** la Nota **no forma parte del contexto financiero que se envía
automáticamente**. Solo podrá enviarse **bajo demanda**, cuando AXIS necesite analizar ese
movimiento concreto. Esta separación debe existir en el modelo de datos desde el principio
(`AXIS_FINAL` Parte XIV §2, §3 y §6; `TECH_STACK.md` §18.7).

---

### D-06 · Estadísticas como módulo propio

Aprobado el 2026-08-14.

- **Estadísticas** es una **ruta/módulo propio**, no una vista interna de Mi Dinero.
- Coherente con el Documento Maestro, Módulo 3, y con `TECH_STACK.md` §12.

El reparto de gráficos entre Mi Dinero y Estadísticas quedó cerrado el 2026-08-15 en **D-21**.

**Contexto del PENDIENTE que resolvió D-21:** el Documento Maestro (Módulo 2 §4) lista «Estadísticas», «Gráfico de
evolución del patrimonio» y «Distribución por categorías» entre los componentes de Mi Dinero. Falta
decidir qué gráficos permanecen dentro de Mi Dinero para evitar duplicar la misma información en dos
módulos.

---

### D-07 · Objetivos como módulo propio

Aprobado el 2026-08-14.

- **Objetivos** tiene **acceso propio como módulo/ruta en V1**.
- Coherente con el Documento Maestro, Módulo 5.

---

### D-08 · Cuentas y Presupuesto fuera de V1

Aprobado el 2026-08-14.

- **Cuentas** y **Presupuesto** **no entran en V1**.
- Son elementos del mock/referencia visual y **no deben implementarse**.
- No crear rutas, modelos de datos, componentes ni entradas de navegación para ellos.

---

### D-09 · AXIS: nombre y superficie principal

Confirmado el 2026-08-14.

- El módulo se llama **AXIS**.
- El **Centro Estratégico** es la **superficie principal** de AXIS
  (`AXIS_FINAL`, Parte VIII).
- El **chat** es una **vista secundaria dentro de AXIS**.
- **AXIS no debe convertirse en una «IA Financiera» chat-first.**

Coherente con el Documento Maestro, Módulo 6, y con `AXIS_FINAL` §21 y Parte XI.

---

### D-10 · Contenido de Inicio

Confirmado el 2026-08-14.

Inicio debe incluir:

- el bloque **«¿Qué hacer con mi dinero?»** de AXIS (`AXIS_FINAL`, Parte XI §3);
- **objetivos destacados**;
- el resto de la estructura definida por el Documento Maestro, Módulo 1 §4:
  saludo personalizado, tarjeta de patrimonio actual, resumen de ingresos y gastos del periodo,
  evolución del patrimonio, accesos rápidos y espacio para recomendaciones de AXIS.

---

### D-11 · Radios, sombras y superficie

Aprobado el 2026-08-14. Confirma lo ya definido en el Design System §8, §9 y §13.

- Radio base: **8 px**.
- **999 px únicamente** para pills, chips, badges y elementos circulares.
- **Sin sombras** como elemento visual habitual.
- Tarjetas con superficie **`#F7F7F7`**.

---

### D-12 · Color de texto sobre el primario

Aprobado el 2026-08-14. Cierra el PENDIENTE asociado a D-01.

- Sobre relleno `#00CBA0`, el texto es **`#111111`** (`--color-text-primary`).
- **No se crea** ningún tono oscuro adicional del primario.

Motivo: texto blanco sobre `#00CBA0` ofrece un contraste de 2,07:1, insuficiente incluso para texto
grande según el §31 del Design System. `#111111` sobre `#00CBA0` ofrece 9,13:1.

La referencia visual muestra texto blanco sobre el primario. **Prevalece esta decisión y el §31 del
Design System**, conforme a la regla de precedencia de §2 de este documento.

`#2D7FF9` con texto blanco ofrece 3,81:1: válido solo para texto grande. Su uso como superficie de
texto normal no está aprobado.

---

### D-13 · Categorías de ingresos

Aprobado el 2026-08-14. Ampliación del Documento Maestro.

Los ingresos **tienen categoría**, con una **lista independiente** de la de gastos:

**Trabajo · Regalos · Otros**

- **No mezclar** las categorías de gasto (D-04) con las de ingreso.
- Las categorías de gasto siguen siendo exactamente las seis de D-04.

**Motivo en «Otros»:** cerrado el 2026-08-14. Un ingreso de categoría «Otros» **también exige Motivo
obligatorio**. La regla es **idéntica para ingresos y gastos**: seleccionar «Otros» obliga siempre a
introducir un motivo, y ese texto sustituye a la palabra «Otros» en el historial.

---

### D-14 · Saldo inicial

Aprobado el 2026-08-14. Ampliación del Documento Maestro.

- Finax debe permitir **establecer un saldo inicial**.
- Ese saldo es el **punto de partida del patrimonio**.
- **No se registra como un movimiento normal del historial.**

**Dónde se introduce:** cerrado el 2026-08-14. En el **primer arranque / configuración de Finax**,
**antes de entrar en la aplicación**. No requiere un módulo de Ajustes: es una pantalla de
configuración inicial, no un módulo del Documento Maestro.

**Modificación posterior:** cerrado el 2026-08-14. El saldo inicial **puede modificarse después
desde Mi Dinero**, con **confirmación explícita** para evitar cambios accidentales (coherente con
D-16 y con el §28 del Design System).

Al modificarse, el patrimonio se recalcula automáticamente, como cualquier otro cambio de datos
(Documento Maestro, Módulo 2 §7). El saldo inicial sigue sin aparecer en el historial.

---

### D-15 · Alcance del Paso 2 (Mi Dinero)

Aprobado el 2026-08-14.

El Paso 2 implementa los componentes 1 a 4 del Documento Maestro, Módulo 2 §4:

1. Patrimonio actual
2. Botón «Nuevo movimiento»
3. Historial agrupado por días
4. Ficha de detalle

Quedan **temporalmente fuera**, hasta cerrar D-03 y D-06:

- Estadísticas dentro de Mi Dinero;
- gráfico de evolución del patrimonio;
- distribución por categorías.

No es una reducción del producto: son componentes definidos por el Documento Maestro cuya
implementación depende de decisiones abiertas.

---

### D-16 · Decisiones técnicas del Paso 2

Aprobado el 2026-08-14.

- **Importes:** se almacenan como **enteros en céntimos**, para evitar errores de coma flotante en
  los cálculos financieros.
- **Formato monetario:** **EUR** con formato **es-ES**.
- **Borrado:** requiere **confirmación explícita** del usuario (Design System §28; Documento Maestro,
  Módulo 2 §3).

---

### D-17 · Paleta semántica completa

Aprobado el 2026-08-15. Cierra los PENDIENTES asociados a D-01 y D-02.

| Token | Valor | Uso |
|---|---|---|
| `--color-success` | `#22C55E` | éxito |
| `--color-danger` | `#EF4444` | peligro y acciones destructivas |
| `--color-warning` | `#F59E0B` | advertencias |
| `--color-info` | `#6B7280` | información neutral |
| `--color-income` | `#22C55E` | ingresos |
| `--color-expense` | `#EF4444` | gastos |
| `--color-secondary-tint` | `#DCE8FF` | fondos y estados secundarios |

**Ingresos y gastos:** los ingresos utilizan `--color-income` y los gastos `--color-expense`. La
distinción debe combinar **siempre** signo, copy, jerarquía y color. **Nunca depender únicamente del
color** (Design System §31).

`--color-income` y `--color-success` comparten valor, igual que `--color-expense` y
`--color-danger`. Son tokens distintos a propósito: expresan significados distintos y podrían
divergir sin romper el código que los consume.

**Sigue PENDIENTE:** la paleta categórica de gráficos (D-03). Esta decisión **no** la cierra.

---

### D-18 · Sin hora en los movimientos

Aprobado el 2026-08-15.

- El modelo de movimientos conserva **únicamente la fecha**, en formato `YYYY-MM-DD`.
- **No se añade hora** al modelo de datos en esta fase.
- La referencia visual puede mostrar horas: son **MOCK** y no deben reproducirse introduciendo un
  cambio de modelo de datos.
- La especificación visual no puede exigir hora mientras esta decisión siga vigente.

---

### D-19 · Ajustes como superficie secundaria

Aprobado el 2026-08-15.

- **Ajustes existe**, pero **no es una sección de la navegación principal**.
- Es una **superficie secundaria accesible desde la cabecera**.

Contenido visual de V1:

- Exportar datos;
- Importar / restaurar datos;
- privacidad;
- información básica.

**Prohibido:** login, registro, cuentas bancarias, sincronización bancaria, planes de pago,
suscripciones, anuncios y funciones sociales.

Ajustes no es un módulo del Documento Maestro: es una superficie de utilidades, coherente con el
mecanismo de backup y exportación previsto en `TECH_STACK.md` §21.

---

### D-20 · Movimientos y navegación inferior definitiva

Aprobado el 2026-08-15. Cierra el PENDIENTE de la navegación inferior.

**Movimientos no es una sección de la navegación principal.** Es una **superficie secundaria
accesible desde Mi Dinero** mediante «Ver todos» o un acceso equivalente.

**Navegación inferior definitiva — cinco secciones:**

1. Inicio
2. Mi Dinero
3. Inversiones
4. Objetivos
5. AXIS

**Estadísticas** mantiene su ruta propia (D-06) y se accede desde Mi Dinero, pero **no es una
pestaña principal**. Que no esté en la barra no la degrada a vista interna: sigue siendo un módulo
con ruta propia.

**Ajustes** tampoco está en la barra: se accede desde la cabecera (D-19).

---

### D-21 · Reparto de gráficos entre Mi Dinero y Estadísticas

Aprobado el 2026-08-15. Cierra el PENDIENTE de D-06.

**Mi Dinero** incluye una **gráfica compacta de evolución del patrimonio**, **integrada
visualmente con el bloque de patrimonio**: la cifra y su curva forman un único bloque, no dos
tarjetas independientes.

**Estadísticas** queda reservada al **análisis completo**: periodos, comparaciones, métricas,
gráficos detallados y categorías.

**No duplicar la misma gráfica completa en ambas pantallas.** La de Mi Dinero es una lectura
inmediata; la de Estadísticas es una herramienta de análisis.

**Los datos son siempre reales.** Cada punto de la evolución es el patrimonio al cierre de un día
con movimientos: saldo inicial más los movimientos acumulados hasta esa fecha. No se crean puntos
falsos, no se inventa histórico y no se interpola para aparentar más datos.

**Historial insuficiente:** cuando no hay datos suficientes para que la curva signifique algo, se
muestra el estado de datos insuficientes del Visual System §29, explicando qué falta. Nunca se
dibuja una gráfica inventada. El umbral de implementación es de **tres días con movimientos**: con
uno no hay evolución y con dos solo hay una recta entre dos puntos, que sugiere una tendencia no
observada.

**Sigue PENDIENTE:** la paleta categórica de gráficos (D-03). Esta decisión **no** la cierra, y
ningún gráfico por categoría puede implementarse todavía.

---

### D-22 · Formulario de nueva inversión

Aprobado el 2026-08-16. Resuelve una contradicción entre fuentes.

**Prevalece el Documento Maestro.**

Cuando llegue la fase funcional de Inversiones, el usuario introducirá
**únicamente**:

- **Activo**
- **Importe invertido**
- **Fecha**

Finax calculará u obtendrá las participaciones y el resto de datos derivados
mediante la fuente de datos o API correspondiente, cuando esa integración
exista.

**El usuario NO introducirá manualmente participaciones ni precio de compra**,
salvo que una decisión de producto explícita y posterior cambie esta regla.

**Contradicción que resuelve:** el Documento Maestro (Módulo 4 §3 y §5) dice
que el usuario solo indica el activo, el importe y la fecha, «evitando que el
usuario tenga que introducir precios manualmente». El Visual System §41.3
pedía en cambio tipo, participaciones y precio de compra, es decir justo lo que
el Documento Maestro dice que no debe teclear. El Visual System queda
sincronizado con esta decisión.

Esta decisión **no** implementa el formulario, ni la API, ni el modelo de
datos: fija la regla para cuando se aprueben.

---

### D-23 · Filtros de periodo de Estadísticas

Aprobado el 2026-08-16.

El selector principal de periodos de Estadísticas es:

**1M · 3M · 6M · 1A · Todo**

**No se utilizan** semana, año ni periodo personalizado. El periodo
personalizado podrá estudiarse en una versión futura, pero **no forma parte de
V1**.

**Documento Maestro sincronizado.** El Módulo 3 §4 decía «Filtros por semana,
mes, año y periodo personalizado». Se ha corregido para que no quede ninguna
contradicción; es el único cambio hecho en ese documento.

**Regla de implementación ya vigente:** solo se ofrecen los periodos que
recortan el historial de verdad. Un periodo cuyo inicio sea anterior al primer
movimiento mostraría lo mismo que «Todo» y no se ofrece, para no fingir una
elección que no existe.

---

### D-24 · Gasto medio

**PENDIENTE.** Decisión no cerrada el 2026-08-16 por decisión expresa del
Product Owner.

El Documento Maestro (Módulo 3 §4) menciona «indicadores de ahorro y gasto
medio», pero **no define una fórmula suficientemente precisa**.

**No implementar el gasto medio** ni inventar su cálculo. En concreto, no
asumir media diaria, media mensual, media del periodo ni media por categoría.

Hasta que producto defina la fórmula, Estadísticas no muestra este indicador.

---

### D-25 · Nivel tipográfico `hero` (48 px)

Aprobado el 2026-08-16.

La escala tipográfica oficial de Finax pasa a tener **cinco** niveles:

**48 / 32 / 20 / 16 / 13 px**

El nivel de 48 px se llama `hero` y queda reservado a la cifra financiera
protagonista de una pantalla:

- el patrimonio principal;
- el patrimonio invertido cuando sea la cifra protagonista;
- otras cifras financieras de máxima jerarquía **solo cuando el Visual System lo
  indique expresamente**.

**Origen.** No es un tamaño nuevo: se aprobó de hecho en el diseño de Mi Dinero
(Fase D3) y la revisión visual global detectó que estaba en uso sin figurar en la
escala documentada. Esta decisión formaliza lo que ya existía; **no cambia ningún
tamaño visual**, ninguna pantalla y ningún componente.

**Límite.** Una sola cifra `hero` por pantalla, y nunca sobre texto no numérico.
No se deriva de aquí una familia de tamaños grandes.

Detalle en `docs/design/DESIGN_SYSTEM_FINAX.md` §6.

---

### D-26 · Orden del análisis de AXIS

Aprobado el 2026-08-16.

El orden oficial de los bloques del Centro Estratégico es:

**DATOS → INTERPRETACIÓN → RECOMENDACIÓN → ALTERNATIVAS → INCERTIDUMBRE →
CONCLUSIÓN / SIGUIENTE PASO**

**Contradicción resuelta.** El Visual System §22.2 colocaba las alternativas
*antes* de la recomendación; `AXIS_FINAL` Parte IX §14 y Parte X §2 las colocan
*después*. Prevalece `AXIS_FINAL`: para todo lo relativo al comportamiento de
AXIS tiene precedencia sobre el Visual System (CLAUDE.md §4). El §22.2 ha
quedado sincronizado.

Las cuatro capas se distinguen siempre por una etiqueta de texto explícita,
nunca solo por color (§31).

---

### D-27 · Separador de millares en los importes

Aprobado el 2026-08-16.

Todos los importes se muestran **con separador de millares**, también los de
cuatro cifras: `3.486,70 €`.

**No era un fallo.** Por defecto `Intl` aplica al español la regla CLDR de
agrupación mínima, que omite el separador en números de cuatro cifras, de modo
que `3486,70 €` era tipográficamente correcto. Finax prefiere el separador
siempre: en una aplicación financiera todos los importes deben leerse igual, y
que el formato cambie al cruzar las cinco cifras dificulta comparar de un
vistazo.

Afecta **solo a la presentación**, en `src/lib/money.ts`. No cambia el modelo
financiero, ni los céntimos (D-16), ni los cálculos, ni los signos.

---

## 4. Decisiones abiertas

| Ref | Decisión | Estado |
|---|---|---|
| D-03 | Paleta categórica de gráficos | PENDIENTE |
| D-24 | Fórmula del gasto medio | PENDIENTE |

**D-03** bloquea cualquier gráfico por categoría, como el donut de distribución o el desglose de
gastos. No afecta a la evolución del patrimonio, que usa únicamente el color primario.

**D-24** bloquea el indicador de gasto medio hasta que producto defina su fórmula.

**Cerradas el 2026-08-14:** D-05 (campo Nota), D-01 (color de texto sobre el primario, mediante
D-12), D-13 (Motivo obligatorio en «Otros» de ingresos) y D-14 (saldo inicial).

**Cerradas el 2026-08-15:** D-01 (tinte claro secundario, mediante D-17), D-02 (advertencia,
información y color de ingresos frente a gastos, mediante D-17), la hora en movimientos (D-18), el
alcance de Ajustes (D-19), el contenido definitivo de la navegación inferior (D-20) y el reparto de
gráficos entre Mi Dinero y Estadísticas (D-21).

**Cerradas el 2026-08-16:** los campos del formulario de nueva inversión (D-22), los filtros de
periodo de Estadísticas (D-23), el nivel tipográfico `hero` de 48 px (D-25), el orden del análisis
de AXIS (D-26) y el separador de millares (D-27).
