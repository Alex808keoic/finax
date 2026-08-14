# Finax — Registro de Decisiones Aprobadas

**Estado:** Oficial
**Última actualización:** 2026-08-14

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
| `docs/design/DESIGN_SYSTEM_FINAX.md` | Fuente normativa del sistema visual |
| `docs/design/FINAX_VISUAL_REFERENCE.png` | Referencia visual ilustrativa |
| `docs/product/DECISIONES.md` | Decisiones aprobadas posteriormente |

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

**PENDIENTE asociado:** el token `--color-secondary` anterior (`#DCE8FF`) se utilizaba como tinte
claro de fondo para estados. `#2D7FF9` es un acento saturado y no cumple esa función. Si la
implementación necesita un tinte claro, debe solicitarse aprobación antes de crearlo.

**PENDIENTE asociado:** color de texto sobre superficies primarias. Texto blanco sobre `#00CBA0`
ofrece un contraste aproximado de 2,1:1 (insuficiente según §31 del Design System); texto oscuro
sobre `#00CBA0` ofrece aproximadamente 10:1. Blanco sobre `#2D7FF9` ofrece aproximadamente 3,8:1.
La regla definitiva debe aprobarse antes de construir el botón primario.

---

### D-02 · Colores semánticos

Aprobado el 2026-08-14.

| Estado | Valor |
|---|---|
| Éxito | `#22C55E` |
| Peligro | `#EF4444` |

- **Advertencia** e **Información** **no** se aprueban todavía como tokens definitivos.
- No crear tokens de advertencia/información ni valores provisionales equivalentes.

**PENDIENTE asociado:** relación entre el primario `#00CBA0` y el verde de éxito `#22C55E`. No está
decidido qué color representa los importes de ingreso frente a gasto.

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

Aprobado el 2026-08-14. Ampliación del Documento Maestro.

- Existe un campo **Nota**, **opcional**, **separado del Motivo**.
- **Motivo:** obligatorio únicamente cuando la categoría sea «Otros».
- **Nota:** opcional y **no sustituye al motivo**.
- La Nota no cumple ninguna función de clasificación.

**PENDIENTE asociado:** disponibilidad de la Nota por categoría, su presencia en el historial frente
a la ficha de detalle, y si su contenido forma parte del contexto que se envía a AXIS. La Nota es
texto libre y afecta a la regla de minimización de datos enviados al proveedor de IA
(`TECH_STACK.md` §18.7).

---

### D-06 · Estadísticas como módulo propio

Aprobado el 2026-08-14.

- **Estadísticas** es una **ruta/módulo propio**, no una vista interna de Mi Dinero.
- Coherente con el Documento Maestro, Módulo 3, y con `TECH_STACK.md` §12.

**PENDIENTE asociado:** el Documento Maestro (Módulo 2 §4) lista «Estadísticas», «Gráfico de
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

## 4. Decisiones abiertas

| Ref | Decisión | Estado |
|---|---|---|
| D-01 | Tinte claro secundario | PENDIENTE |
| D-01 | Color de texto sobre superficies primarias | PENDIENTE |
| D-02 | Advertencia e Información como tokens | PENDIENTE |
| D-02 | Color de ingresos frente a gastos | PENDIENTE |
| D-03 | Paleta categórica de gráficos | PENDIENTE |
| D-05 | Alcance del campo Nota y su uso por AXIS | PENDIENTE |
| D-06 | Reparto de gráficos entre Mi Dinero y Estadísticas | PENDIENTE |
| — | Contenido definitivo de la navegación inferior | PENDIENTE |

Sobre la navegación inferior: tras D-06, D-07 y D-08 existen seis destinos candidatos
(Inicio, Mi Dinero, Estadísticas, Inversiones, Objetivos, AXIS). El reparto entre barra inferior y
otros accesos no está aprobado. Mientras siga abierto, aplicar el Design System §25.
