# Finax — Design System

**Versión:** Core v1.0  
**Estado:** Oficial para la implementación visual, salvo elementos marcados como PENDIENTE

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

## 2. Referencia visual definitiva

La referencia visual oficial es:

`docs/design/FINAX_VISUAL_REFERENCE.png`

Debe utilizarse como referencia principal para:

- composición;
- jerarquía;
- densidad;
- proporciones;
- tarjetas;
- botones;
- navegación;
- espaciado;
- estilo de gráficos;
- apariencia general.

El objetivo no es reinterpretar la referencia como un producto diferente.

La implementación debe reproducir su lenguaje visual y adaptarlo únicamente cuando el Documento Maestro o este Design System lo exijan.

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

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#4F7CFF` | acciones principales, acentos, progreso |
| `--color-background` | `#FFFFFF` | fondo principal |
| `--color-surface` | `#F7F7F7` | tarjetas y contenedores |
| `--color-text-primary` | `#111111` | texto principal |
| `--color-text-secondary` | `#6B6B6B` | texto secundario |
| `--color-secondary` | `#DCE8FF` | estados y detalles secundarios |
| `--color-border` | `#D6D6D6` | bordes y divisores |
| `--color-track` | `#EAEAEA` | pistas de progreso y anillos |
| `--color-muted-nontext` | `#9A9A9A` | iconos inactivos y anotaciones internas |

`#9A9A9A` no debe utilizarse como color de texto normal.

Los colores semánticos independientes de éxito/error/advertencia no están cerrados como decisión de producto.

**PENDIENTE:** no inventar una paleta semántica definitiva sin aprobación.

---

## 6. Tipografía

Fuente oficial:

**Inter**

No introducir una segunda familia tipográfica.

| Uso | Tamaño |
|---|---:|
| Título principal | 32 px |
| Subtítulo / sección | 20 px |
| Texto normal | 16 px |
| Texto pequeño | 13 px |

La jerarquía tipográfica debe ser clara.

Evitar utilizar demasiados tamaños diferentes.

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

---

## 9. Elevación

**Sin sombras por defecto.**

La separación visual debe conseguirse mediante:

- superficies;
- bordes;
- contraste suave;
- espacio en blanco.

No utilizar `box-shadow` como elemento visual habitual.

---

## 10. Botones y controles

### Botón principal

Altura:

**52 px**

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

Los objetivos deben visualizarse de forma clara y comprensible.

La interfaz debe mostrar el progreso utilizando datos financieros reales definidos por producto.

No introducir "aportaciones manuales" o métricas que contradigan el Documento Maestro.

La presentación debe mantener el lenguaje visual general de Finax.

---

## 19. AXIS

AXIS es una capa transversal de inteligencia integrada dentro de Finax.

No debe parecer una aplicación independiente.

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

El contenido exacto de las pestañas debe seguir la especificación final.

**PENDIENTE:** si el contenido definitivo no está cerrado, utilizar `MOCK` y no inventar destinos.

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
  --color-primary: #4F7CFF;
  --color-background: #FFFFFF;
  --color-surface: #F7F7F7;
  --color-text-primary: #111111;
  --color-text-secondary: #6B6B6B;
  --color-secondary: #DCE8FF;
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

---

## 33. No inventar

Las decisiones siguientes requieren aprobación si todavía no están cerradas:

- detalles visuales que contradigan el Documento Maestro;
- colores semánticos definitivos;
- comportamientos de componentes no especificados;
- copy definitivo de AXIS cuando falte contexto;
- destinos definitivos de navegación si no están cerrados;
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
5. `docs/design/DESIGN_SYSTEM_FINAX.md`
6. `docs/design/FINAX_VISUAL_REFERENCE.png`

Debe:

- respetar mobile-first;
- reutilizar componentes;
- respetar tokens;
- respetar la referencia visual;
- no inventar decisiones de producto;
- no introducir funcionalidades no solicitadas.

---

## 36. Regla de oro

**Finax debe verse como la referencia visual definitiva y comportarse como el Documento Maestro.**

La tecnología debe respetar el producto.

El diseño debe servir a la comprensión.

La interfaz debe sentirse:

**simple → clara → fiable → personal → útil.**

Cuando exista una duda:

**detectar → informar → proponer → esperar aprobación.**

No inventar decisiones importantes.
