# Finax — Design System

**Versión:** Core v1.0  
**Estado:** Definitivo para implementación visual, salvo los elementos
marcados como `PENDIENTE`.

---

# 1. Objetivo

Finax es una aplicación privada de finanzas personales diseñada para
Alex y su padre.

El sistema visual debe transmitir:

- simplicidad;
- claridad;
- confianza;
- calma;
- control;
- inteligencia;
- privacidad.

Finax debe sentirse como una herramienta financiera personal inteligente,
no como una aplicación bancaria tradicional, una hoja de cálculo o un
dashboard financiero empresarial.

Cada pantalla debe tener un objetivo claro.

La información financiera importante debe poder entenderse rápidamente,
sin saturar al usuario.

AXIS debe integrarse dentro de este mismo lenguaje visual y no parecer una
aplicación independiente.

---

# 2. Alcance

El sistema visual cubre inicialmente:

1. Inicio
2. Mi Dinero
3. Estadísticas
4. Inversiones
5. Objetivos
6. Centro Estratégico de AXIS
7. Informe Diario de AXIS
8. Conversación con AXIS
9. Ajustes
10. Backup y restauración
11. Estados de carga
12. Estados vacíos
13. Estados de error
14. Estados offline

La navegación principal de Finax está formada por cinco módulos:

- Inicio
- Mi Dinero
- Estadísticas
- Inversiones
- Objetivos

AXIS no es una sexta pestaña.

AXIS es una capa transversal presente dentro de Finax.

---

# 3. Referencia visual definitiva

La referencia visual oficial es:

`docs/design/FINAX_VISUAL_REFERENCE.png`

Esta imagen debe utilizarse como referencia para:

- composición;
- jerarquía visual;
- densidad;
- proporciones;
- tarjetas;
- navegación;
- espaciado;
- gráficos;
- botones;
- colores;
- apariencia general.

Claude Code debe reproducir el lenguaje visual aprobado.

No debe reinterpretar la referencia como un dashboard de escritorio ni
sustituirla por otro estilo de diseño.

La referencia visual representa la dirección estética aprobada, mientras
que este documento define las reglas que deben aplicarse de forma
consistente durante la implementación.

Cuando una regla concreta de este documento contradiga una interpretación
visual de la imagen, debe detectarse y comunicarse antes de tomar una
decisión importante.

---

# 4. Plataforma

**Mobile-first obligatorio.**

Finax está pensado principalmente para utilizarse desde un teléfono.

La interfaz debe priorizar:

- orientación vertical;
- uso con una mano;
- controles táctiles;
- áreas táctiles adecuadas;
- safe areas;
- navegación inferior;
- lectura rápida;
- contenido jerarquizado.

No utilizar:

- sidebars de escritorio como navegación principal;
- tablas densas;
- dashboards empresariales;
- layouts excesivamente anchos.

Las pantallas mayores pueden adaptarse, pero el diseño base siempre debe
ser móvil.

---

# 5. Filosofía visual

Finax debe evitar la sensación de complejidad financiera innecesaria.

La interfaz debe seguir estas reglas:

1. Mostrar primero lo importante.
2. Ocultar complejidad secundaria hasta que sea necesaria.
3. Utilizar espacio en blanco para separar conceptos.
4. Evitar elementos decorativos sin función.
5. Evitar exceso de colores.
6. Evitar exceso de gráficos simultáneos.
7. Mantener patrones consistentes.
8. Priorizar información accionable.
9. Diferenciar claramente datos, análisis y recomendaciones.
10. No utilizar diseño financiero agresivo o alarmista.

La interfaz debe transmitir tranquilidad incluso cuando los datos
financieros sean negativos.

---

# 6. Paleta

La paleta exacta debe seguir la referencia visual definitiva.

Tokens principales:

```css
:root {
  --color-primary: <PENDIENTE>;
  --color-background: <PENDIENTE>;
  --color-surface: <PENDIENTE>;
  --color-surface-secondary: <PENDIENTE>;

  --color-text-primary: <PENDIENTE>;
  --color-text-secondary: <PENDIENTE>;
  --color-text-muted: <PENDIENTE>;

  --color-border: <PENDIENTE>;

  --color-success: <PENDIENTE>;
  --color-warning: <PENDIENTE>;
  --color-danger: <PENDIENTE>;
  --color-info: <PENDIENTE>;
}
