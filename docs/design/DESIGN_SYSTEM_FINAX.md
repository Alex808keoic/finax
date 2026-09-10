# Finax — Design System

**Versión:** Core v1.3  
**Estado:** Oficial para la implementación visual, salvo elementos marcados como PENDIENTE  
**Última actualización:** 2026-08-16 — incorpora las decisiones aprobadas en `docs/product/DECISIONES.md` hasta D-25  
**Especificación visual concreta:** `docs/design/FINAX_VISUAL_SYSTEM_V1_FINAL.md`

---

## 1. Objetivo

Finax es una aplicación privada de finanzas personales desarrollada para Alex y su padre.

El sistema visual debe transmitir:

- simplicidad;
- claridad;
- confianza;
- control;
- calma;
- utilidad;
- foco en las decisiones importantes.

Finax no debe parecer una aplicación bancaria corporativa ni un dashboard financiero complejo.

Debe sentirse como una herramienta personal, clara y moderna para entender el dinero y tomar mejores decisiones.

Cada pantalla debe tener un objetivo claro y una jerarquía visual evidente.

---

## 2. Referencia visual y precedencia

La referencia visual del proyecto es:

`docs/design/FINAX_VISUAL_REFERENCE.png`

Su carácter es **ilustrativo**, no normativo.

### Precedencia (aprobada el 2026-08-14)

| Documento | Rol |
|---|---|
| Documento Maestro | fuente de verdad del producto |
| `AXIS_FINAL` | fuente normativa de AXIS |
| `DECISIONES.md` | decisiones de producto aprobadas posteriormente |
| Este Design System | reglas normativas globales del sistema visual |
| `FINAX_VISUAL_SYSTEM_V1_FINAL.md` | especificación visual concreta de pantallas y componentes |
| `FINAX_VISUAL_REFERENCE.png` | referencia visual ilustrativa |

Reglas:

1. Cuando este Design System define explícitamente algo, **prevalece el Design System**.
2. Cuando el Design System no define algo y no existe conflicto con producto, la PNG puede utilizarse como referencia de **composición, proporciones, densidad y apariencia**.
3. **La PNG nunca puede modificar decisiones de producto.**
4. Un elemento presente en la PNG no es, por sí solo, una funcionalidad aprobada.

El objetivo no es reinterpretar la referencia como un producto diferente, pero tampoco reproducirla cuando contradiga al Design System o al Documento Maestro.

---

## 3. Plataforma

**Mobile-first obligatorio.**

La interfaz base está diseñada para teléfono vertical.

Debe contemplar:

- layouts adaptados al viewport móvil;
- uso cómodo con una mano;
- safe areas;
- controles táctiles claros;
- navegación inferior;
- jerarquía vertical;
- espacios suficientes;
- ausencia de sidebars de escritorio.

No convertir Finax en un dashboard de escritorio.

Las pantallas grandes pueden adaptarse, pero el diseño base siempre debe ser móvil.

---

## 4. Filosofía visual

Finax debe priorizar:

1. información importante antes que decoración;
2. espacios en blanco antes que densidad;
3. jerarquía antes que cantidad de elementos;
4. claridad antes que efectos visuales;
5. consistencia antes que variedad.

No añadir elementos únicamente porque "quedan bien".

Cada componente visual debe tener una función.

---

## 5. Paleta

### Paleta base

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#00CBA0` | acciones principales, acentos, progreso |
| `--color-secondary` | `#2D7FF9` | acento secundario |
| `--color-background` | `#FFFFFF` | fondo principal |
| `--color-surface` | `#F7F7F7` | tarjetas y contenedores |
| `--color-text-primary` | `#111111` | texto principal |
| `--color-text-secondary` | `#6B6B6B` | texto secundario |
| `--color-border` | `#D6D6D6` | bordes y divisores |
| `--color-track` | `#EAEAEA` | pistas de progreso y anillos |
| `--color-muted-nontext` | `#9A9A9A` | iconos inactivos y anotaciones internas |

Primario y secundario fueron aprobados el 2026-08-14 (`docs/product/DECISIONES.md`, D-01). Los valores anteriores `#4F7CFF` y `#DCE8FF` quedan derogados.

`#9A9A9A` no debe utilizarse como color de texto normal.

### Colores semánticos

| Token | Valor | Uso |
|---|---|---|
| `--color-success` | `#22C55E` | éxito |
| `--color-danger` | `#EF4444` | peligro y acciones destructivas |
| `--color-warning` | `#F59E0B` | advertencias |
| `--color-info` | `#6B7280` | información neutral |
| `--color-income` | `#22C55E` | ingresos |
| `--color-expense` | `#EF4444` | gastos |
| `--color-secondary-tint` | `#DCE8FF` | fondos y estados secundarios |

Éxito y peligro se aprobaron el 2026-08-14 (D-02). El resto, el 2026-08-15 (D-17), que cierra los PENDIENTES anteriores de advertencia, información, color de ingresos frente a gastos y tinte claro secundario.

`--color-income` comparte valor con `--color-success`, y `--color-expense` con `--color-danger`. Son tokens distintos a propósito: significan cosas distintas y podrían divergir.

### Ingresos y gastos

Los ingresos usan `--color-income` y los gastos `--color-expense`, combinados **siempre** con signo, copy y jerarquía. **Nunca depender únicamente del color** (§31).

### Texto sobre superficies primarias

Aprobado el 2026-08-14 (D-12).

Sobre relleno `#00CBA0`, el texto es **`#111111`** (`--color-text-primary`). Contraste: 9,13:1.

No se crea ningún tono oscuro adicional del primario. Texto blanco sobre `#00CBA0` da 2,07:1 y no cumple el §31, ni siquiera para texto grande, aunque la referencia visual lo muestre así.

Blanco sobre `#2D7FF9` da 3,81:1: válido solo para texto grande. Su uso como superficie de texto normal no está aprobado.

### Paleta categórica de gráficos

**PENDIENTE.** No inventar colores categóricos ni derivarlos del primario, del secundario o de la referencia visual (D-03).

---

## 6. Tipografía

Fuente oficial:

**Inter**

No introducir una segunda familia tipográfica.

| Nivel | Uso | Tamaño |
|---|---|---:|
| `hero` | Cifra financiera protagonista | 48 px |
| Título principal | Título de pantalla y cifra financiera secundaria | 32 px |
| Subtítulo / sección | Títulos de sección | 20 px |
| Texto normal | Contenido | 16 px |
| Texto pequeño | Metadatos y texto auxiliar | 13 px |

La escala tiene cinco niveles y está cerrada. No añadir tamaños intermedios.

La jerarquía tipográfica debe ser clara.

### Nivel `hero` (48 px)

Aprobado el 2026-08-16 (D-25). Formalizado a partir del diseño aprobado de Mi Dinero en la Fase D3, donde ya estaba en uso.

Es el tamaño reservado a **la cifra que da sentido a la pantalla**: aquella que el usuario busca antes que cualquier otra cosa.

Usos permitidos:

- el patrimonio principal;
- el patrimonio invertido cuando sea la cifra protagonista de la pantalla;
- otras cifras financieras de máxima jerarquía **solo cuando el Visual System lo indique expresamente**.

Reglas:

- **una sola cifra `hero` por pantalla.** Dos cifras a 48 px se anulan entre sí y destruyen la jerarquía;
- si la cifra financiera de una pantalla no es su elemento principal, usar 32 px;
- `hero` no se aplica nunca a títulos, etiquetas ni texto no numérico;
- no derivar de este nivel una familia de tamaños grandes (40, 56, 64…).

En el código corresponde a `MoneyFigure size="hero"`, que ya usaba ese nombre antes de esta decisión. Ningún tamaño se escribe suelto: la primitiva es la única que fija la escala de las cifras.

Una cifra financiera se compone de entero y decimales, y cada nivel fija ambos:

| `MoneyFigure` | Entero | Decimales |
|---|---:|---:|
| `hero` | 48 px | 20 px |
| `lg` | 32 px | 16 px |
| `md` | 20 px | 13 px |

Los decimales van siempre un nivel por debajo del entero: la cifra debe leerse de un vistazo por su parte entera.

---

## 7. Espaciado

Unidad base:

**4 px**

Utilizar múltiplos de:

`4, 8, 12, 16, 20, 24, 32, 40, 48 px`

No crear otra escala de espaciado.

Cuando un componente necesite más separación, utilizar el siguiente múltiplo disponible antes de inventar un valor arbitrario.

---

## 8. Forma

Radio principal:

`--radius: 8px`

No crear automáticamente una familia de radios como `radius-sm`, `radius-md`, `radius-lg`, etc.

Radio completo:

`--radius-full: 999px`

Utilizarlo únicamente para:

- pills;
- chips;
- badges;
- elementos circulares.

Confirmado el 2026-08-14 (D-11).

---

## 9. Elevación

**Sin sombras por defecto.**

La separación visual debe conseguirse mediante:

- superficies;
- bordes;
- contraste suave;
- espacio en blanco.

No utilizar `box-shadow` como elemento visual habitual.

Confirmado el 2026-08-14 (D-11).

---

## 10. Botones y controles

### Botón principal

Altura:

**52 px**

Color (2026-08-14, D-12):

- relleno `#00CBA0` (`--color-primary`);
- texto `#111111` (`--color-text-primary`);
- contraste 9,13:1.

No utilizar texto blanco sobre el primario, aunque así aparezca en la referencia visual: incumple el §31.

### Área táctil mínima

**44 × 44 px**

Los controles deben ser fáciles de tocar desde móvil.

La acción primaria debe dominar visualmente.

Evitar múltiples botones primarios compitiendo en una misma pantalla.

Los botones secundarios deben tener menor peso visual.

---

## 11. Iconografía

Biblioteca oficial:

**Lucide React**

Estilo:

- lineal;
- limpio;
- simple;
- consistente.

No mezclar familias de iconos.

Los iconos deben apoyar la comprensión, no decorar.

---

## 12. Movimiento

Las animaciones deben ser:

- rápidas;
- suaves;
- funcionales.

Rango general:

**200–300 ms**

No animar por decoración.

Las transiciones deben comunicar:

- cambio de estado;
- confirmación;
- aparición;
- navegación;
- actualización de información.

---

## 13. Tarjetas

Patrón principal:

- fondo `#F7F7F7`;
- radio 8 px;
- sin sombra;
- padding basado en múltiplos de 4;
- jerarquía interna clara;
- suficiente whitespace.

Confirmado el 2026-08-14 (D-11).

Las tarjetas con la misma función deben reutilizar el mismo patrón.

No crear estilos diferentes para tarjetas equivalentes.

---

## 14. Inicio

Inicio es el punto de entrada principal de Finax.

Debe priorizar:

1. situación financiera actual;
2. información relevante;
3. estrategia de AXIS;
4. accesos rápidos a las funciones principales.

### Contenido aprobado (2026-08-14, D-10)

Inicio debe incluir:

- el bloque **«¿Qué hacer con mi dinero?»** de AXIS;
- **objetivos destacados**;
- el resto de la estructura definida por el Documento Maestro, Módulo 1 §4: saludo personalizado, tarjeta de patrimonio actual, resumen de ingresos y gastos del periodo, evolución del patrimonio, accesos rápidos y espacio para recomendaciones de AXIS.

El contenido exacto debe seguir el Documento Maestro.

La pantalla no debe convertirse en una acumulación de estadísticas.

El bloque estratégico de AXIS debe tener una presencia clara, pero no debe dominar visualmente toda la aplicación.

---

## 15. Mi Dinero

Mi Dinero es uno de los módulos centrales.

Debe permitir comprender rápidamente:

- dinero disponible;
- movimientos;
- evolución;
- ingresos;
- gastos;
- patrimonio cuando corresponda.

La interfaz debe priorizar acciones simples.

Registrar un movimiento debe ser rápido y evidente.

No convertir la pantalla en una tabla financiera densa.

---

## 16. Estadísticas

Estadísticas es un **módulo/ruta propio**, no una vista interna de Mi Dinero (2026-08-14, D-06).

No es una pestaña de la barra inferior: se accede desde Mi Dinero y conserva su ruta `/estadisticas` (2026-08-15, D-20).

Reparto de gráficos (2026-08-15, D-21): **Mi Dinero** lleva la curva compacta de evolución del patrimonio, integrada en el bloque de patrimonio. **Estadísticas** lleva el análisis completo: periodos, comparaciones, métricas, gráficos detallados y categorías. No duplicar la misma gráfica completa en las dos pantallas.

Las estadísticas deben priorizar comprensión sobre cantidad.

Los gráficos deben:

- ser legibles en móvil;
- utilizar jerarquía visual clara;
- mostrar información útil;
- evitar decoración innecesaria.

Cuando sea posible, el usuario debe poder entender una tendencia sin estudiar el gráfico durante mucho tiempo.

La representación debe seguir la referencia visual.

---

## 17. Inversiones

La interfaz de inversiones debe distinguir claramente:

- dinero líquido;
- dinero invertido;
- valor actual;
- evolución;
- información externa cuando exista.

Finax no es un broker.

La interfaz nunca debe sugerir que una operación real ha sido ejecutada desde Finax.

Los datos que dependan de una API externa deben indicar correctamente su estado cuando no estén actualizados.

---

## 18. Objetivos

Objetivos tiene **acceso propio como módulo/ruta en V1** (2026-08-14, D-07).

Los objetivos deben visualizarse de forma clara y comprensible.

La interfaz debe mostrar el progreso utilizando datos financieros reales definidos por producto.

No introducir "aportaciones manuales" o métricas que contradigan el Documento Maestro.

La presentación debe mantener el lenguaje visual general de Finax.

---

## 19. AXIS

AXIS es una capa transversal de inteligencia integrada dentro de Finax.

No debe parecer una aplicación independiente.

### Superficie principal (2026-08-14, D-09)

- El módulo se llama **AXIS**.
- El **Centro Estratégico** es la **superficie principal** de AXIS.
- El **chat** es una **vista secundaria dentro de AXIS**.
- AXIS **no** debe presentarse como una «IA Financiera» chat-first.

Debe compartir:

- paleta;
- tipografía;
- tarjetas;
- radios;
- iconografía;
- espaciado.

AXIS puede diferenciarse mediante:

- jerarquía;
- composición;
- iconografía;
- estructura de información.

No crear una segunda identidad visual completa.

### Principio visual de AXIS

AXIS debe comunicar:

- contexto;
- razonamiento;
- alternativas;
- recomendación;
- incertidumbre cuando exista.

Una recomendación debe poder explicar visualmente por qué se presenta.

El diseño no debe hacer que una recomendación parezca una orden.

---

## 20. Centro Estratégico / Informe Diario

El Centro Estratégico es la superficie principal de AXIS (D-09) y la entrada natural desde el bloque «¿Qué hacer con mi dinero?» de Inicio (D-10).

Cuando se muestre el análisis estratégico de AXIS, la estructura visual debe facilitar la lectura progresiva.

Jerarquía prevista:

1. resumen;
2. situación financiera;
3. contexto externo;
4. riesgos;
5. oportunidades;
6. recomendaciones;
7. próximos pasos.

La estructura exacta debe seguir el Documento Maestro y la especificación funcional aprobada.

Una salida válida puede ser:

**No hay nada importante que hacer ahora.**

No forzar recomendaciones solo para llenar espacio.

---

## 21. Lenguaje visual de recomendaciones

Las recomendaciones deben diferenciar claramente:

- dato;
- interpretación;
- recomendación;
- incertidumbre.

No utilizar colores o tamaños que hagan parecer una recomendación más segura de lo que realmente es.

No utilizar visualmente conceptos como "garantizado" o equivalentes.

---

## 22. Recovery / información contextual de AXIS

Cuando AXIS necesite mostrar información contextual sobre la situación financiera, debe hacerlo mediante componentes claros y compactos.

No utilizar grandes bloques de texto sin jerarquía.

Cuando no existan datos suficientes:

- mostrar estado vacío;
- explicar qué falta si es relevante;
- no inventar información.

---

## 23. Estados

Los componentes importantes deben contemplar:

- loading;
- empty;
- error;
- disabled;
- pressed;
- success cuando corresponda.

Todos deben mantener el mismo lenguaje visual.

### Empty

Un estado vacío debe explicar qué ocurre y, cuando corresponda, qué puede hacer el usuario.

### Error

Debe explicar el problema de forma clara sin mostrar información técnica innecesaria.

### Loading

Debe ser discreto y evitar saltos bruscos de layout.

---

## 24. Datos ausentes

Nunca inventar:

- cantidades;
- precios;
- porcentajes;
- rentabilidades;
- recomendaciones;
- valores de mercado;
- resultados de AXIS.

Cuando falte información, el diseño debe tener un estado explícito.

---

## 25. Navegación inferior

La navegación principal es móvil.

Características:

- aproximadamente 64 px + safe area;
- iconos Lucide de aproximadamente 24 px;
- área táctil mínima de 44 px;
- estados activo/inactivo claramente diferenciados;
- sin sombras pesadas.

### Contenido definitivo (2026-08-15, D-20)

La barra inferior tiene **cinco secciones**:

1. Inicio
2. Mi Dinero
3. Inversiones
4. Objetivos
5. AXIS

No añadir una sexta pestaña.

Superficies fuera de la barra:

| Superficie | Acceso |
|---|---|
| Movimientos | desde Mi Dinero, mediante «Ver todos» |
| Estadísticas | desde Mi Dinero. Conserva su ruta propia (D-06) |
| Ajustes | desde la cabecera (D-19) |

**Cuentas** y **Presupuesto** aparecen en la referencia visual pero **no forman parte de V1** (D-08). No deben aparecer en la navegación ni implementarse.

---

## 26. Gráficos

Los gráficos deben respetar:

- el sistema de color;
- el espaciado;
- la tipografía;
- la jerarquía visual;
- la referencia visual.

Evitar:

- dashboards excesivamente densos;
- demasiadas líneas simultáneas;
- colores sin significado;
- elementos 3D;
- decoración innecesaria.

**PENDIENTE:** la paleta categórica de gráficos no está aprobada (D-03). Ningún gráfico por categoría puede considerarse terminado hasta que se cierre esa decisión.

---

## 27. Formularios

Los formularios deben ser simples.

Prioridad:

1. etiqueta clara;
2. campo evidente;
3. valor actual;
4. acción principal.

Los campos deben tener un área táctil cómoda.

Los errores deben mostrarse cerca del campo afectado.

No pedir información que Finax no necesite realmente.

### Formulario de movimiento (2026-08-14, D-04, D-05 y D-13)

Las listas de categorías son **independientes** y no deben mezclarse:

| Tipo | Categorías |
|---|---|
| Gasto | **Comida · Restaurantes · Salidas · Caprichos · Ropa · Otros** |
| Ingreso | **Trabajo · Regalos · Otros** |

No añadir, renombrar ni reordenar ninguna de las dos listas.

- **Motivo:** obligatorio **siempre que la categoría sea «Otros»**, tanto en gastos como en ingresos. Su texto sustituye a la palabra «Otros» en el historial.
- **Nota:** campo opcional, separado del Motivo, que **no** lo sustituye. Disponible en **todas** las categorías, incluida «Otros», donde ambos campos conviven.

La Nota se muestra **únicamente en la ficha de detalle**. No debe aparecer en el historial.

### Saldo inicial (2026-08-14, D-14)

Se introduce en el primer arranque de Finax, antes de entrar en la aplicación, y puede modificarse después desde Mi Dinero con confirmación explícita. Nunca aparece como movimiento en el historial.

### Borrado (2026-08-14, D-16)

Cualquier borrado requiere confirmación explícita del usuario (§28).

### Formato monetario (2026-08-14, D-16)

EUR con formato es-ES, en toda la aplicación y no solo en los formularios.

---

## 28. Bottom Sheets y modales

Los Bottom Sheets son apropiados para acciones secundarias o formularios breves en móvil.

Los modales deben utilizarse cuando la acción requiera atención o confirmación.

No utilizar modales para navegación normal.

No encadenar modales innecesariamente.

---

## 29. Reutilización

Cuando un patrón aparezca en varias pantallas, debe ser un componente reutilizable.

Componentes previstos:

- Button;
- Card;
- AXIS Card;
- Money Summary;
- Movement Row;
- Investment Card;
- Objective Card;
- Chart Card;
- Bottom Navigation;
- Modal;
- Bottom Sheet;
- Empty State;
- Loading State;
- Error State.

La lista puede crecer cuando exista una necesidad real.

No crear variantes aisladas sin una razón funcional o visual.

---

## 30. Responsividad

La interfaz debe funcionar correctamente en:

- móviles pequeños;
- móviles grandes;
- tablets;
- escritorio.

Pero la prioridad siempre será móvil.

No utilizar layouts que dependan de un ancho de escritorio.

---

## 31. Accesibilidad visual

Debe existir suficiente contraste para:

- texto principal;
- texto secundario;
- controles;
- estados activos;
- estados deshabilitados.

No depender únicamente del color para comunicar un estado importante.

Los iconos interactivos deben tener área táctil suficiente.

---

## 32. Tokens oficiales

```css
:root {
  --color-primary: #00CBA0;
  --color-secondary: #2D7FF9;
  --color-secondary-tint: #DCE8FF;

  --color-success: #22C55E;
  --color-danger: #EF4444;
  --color-warning: #F59E0B;
  --color-info: #6B7280;

  --color-income: #22C55E;
  --color-expense: #EF4444;

  --color-background: #FFFFFF;
  --color-surface: #F7F7F7;
  --color-text-primary: #111111;
  --color-text-secondary: #6B6B6B;
  --color-border: #D6D6D6;
  --color-track: #EAEAEA;
  --color-muted-nontext: #9A9A9A;

  --font-family: "Inter", sans-serif;

  --space-unit: 4px;

  --radius: 8px;
  --radius-full: 999px;

  --control-height-primary: 52px;
  --touch-target-min: 44px;

  --motion-fast: 200ms;
  --motion-standard: 250ms;
  --motion-slow: 300ms;
}
```

La paleta semántica está completa y cerrada (D-17).

No existe paleta categórica de gráficos: no está aprobada (D-03).

---

## 33. No inventar

El estado actualizado de las decisiones abiertas está en `docs/product/DECISIONES.md` §4.

Las decisiones siguientes requieren aprobación si todavía no están cerradas:

- detalles visuales que contradigan el Documento Maestro;
- paleta categórica de gráficos (D-03);
- comportamientos de componentes no especificados;
- copy definitivo de AXIS cuando falte contexto;
- estados financieros que dependan de datos no disponibles;
- cualquier funcionalidad fuera de la especificación aprobada.

Si una decisión no está definida:

**detectar → informar → proponer → esperar aprobación.**

---

## 34. Relación con el Documento Maestro

El Design System define **cómo debe verse Finax**.

El Documento Maestro define **qué debe hacer Finax**.

No utilizar el Design System para inventar funcionalidades.

No utilizar la referencia visual para modificar decisiones de producto.

Cuando exista una diferencia:

1. detectar;
2. informar;
3. comparar con la especificación;
4. esperar decisión cuando sea una decisión de producto.

---

## 35. Regla para Claude Code

Antes de modificar la interfaz, Claude Code debe leer:

1. `CLAUDE.md`
2. `README.md`
3. `TECH_STACK.md`
4. `docs/product/DOCUMENTO_MAESTRO_FINAX.docx`
5. `docs/product/AXIS_FINAL.docx`
6. `docs/product/DECISIONES.md`
7. `docs/design/DESIGN_SYSTEM_FINAX.md`
8. `docs/design/FINAX_VISUAL_SYSTEM_V1_FINAL.md`
9. `docs/design/FINAX_VISUAL_REFERENCE.png`

Debe:

- respetar mobile-first;
- reutilizar componentes;
- respetar tokens;
- respetar la referencia visual;
- no inventar decisiones de producto;
- no introducir funcionalidades no solicitadas.

---

## 36. Regla de oro

**Finax debe verse como define este Design System y comportarse como el Documento Maestro.**

La referencia visual acompaña, pero no decide.

La tecnología debe respetar el producto.

El diseño debe servir a la comprensión.

La interfaz debe sentirse:

**simple → clara → fiable → personal → útil.**

Cuando exista una duda:

**detectar → informar → proponer → esperar aprobación.**

No inventar decisiones importantes.
