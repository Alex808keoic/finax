# Finax — Visual System v1.0 FINAL

**Estado:** DEFINITIVO — aprobado para implementación visual V1  
**Uso:** referencia normativa para la implementación visual de Finax  
**Referencia visual principal:** `docs/design/FINAX_VISUAL_REFERENCE_V2.png`  
**Relación con `DESIGN_SYSTEM_FINAX.md`:** este documento concreta visualmente el sistema para pantallas, estados y componentes. No modifica decisiones de producto del Documento Maestro ni de `DECISIONES.md`.

> **Objetivo de esta versión:** eliminar la ambigüedad que podría obligar a Claude Code a “interpretar” el diseño. Cada pantalla principal y cada pantalla secundaria debe tener una composición, jerarquía, contenido permitido, acciones y estados definidos.

---

## 1. Objetivo

Finax debe sentirse como una aplicación financiera personal **clara, moderna, privada, ligera y centrada en decisiones**.

La interfaz debe transmitir:

- simplicidad antes que complejidad;
- claridad visual inmediata;
- espacio en blanco generoso;
- jerarquía fuerte de la información importante;
- confianza sin aspecto bancario pesado;
- foco en patrimonio, movimientos, análisis y decisiones;
- lenguaje visual consistente entre módulos;
- interacción rápida con una mano.

La interfaz es **mobile-first**. Las pantallas de escritorio deben adaptarse sin convertirse en un dashboard empresarial.

---

## 2. Fuente visual y precedencia

La referencia visual oficial para este sistema es:

`docs/design/FINAX_VISUAL_REFERENCE_V2.png`

La imagen define principalmente:

- lenguaje visual;
- composición;
- jerarquía;
- densidad;
- proporciones;
- apariencia de tarjetas;
- botones y controles;
- iconografía;
- tratamiento del patrimonio;
- tratamiento de listas;
- tratamiento de gráficos;
- apariencia de AXIS;
- apariencia general de las pantallas.

### Precedencia

| Fuente | Rol |
|---|---|
| `DOCUMENTO_MAESTRO_FINAX.docx` | fuente de verdad del producto |
| `AXIS_FINAL.docx` | fuente normativa de AXIS |
| `DECISIONES.md` | decisiones de producto aprobadas posteriormente |
| `DESIGN_SYSTEM_FINAX.md` | reglas normativas globales del sistema visual |
| `FINAX_VISUAL_SYSTEM_V1_1.md` | especificación visual concreta de pantallas y componentes |
| `FINAX_VISUAL_REFERENCE_V2.png` | referencia estética y compositiva |

Cuando una decisión de producto contradiga una imagen, prevalece el producto.

Cuando `DESIGN_SYSTEM_FINAX.md` o este documento definan una regla visual explícita, prevalece la regla documentada.

La PNG nunca puede crear por sí sola una nueva funcionalidad.

---

## 3. Identidad de marca

### Marca

Nombre visible: **Finax**.

Personalidad visual:

- limpia;
- tecnológica sin parecer una aplicación de criptomonedas;
- financiera sin parecer un banco tradicional;
- cercana;
- profesional;
- minimalista.

### Logo

Usar el logotipo Finax aprobado en la referencia visual.

No recrear el logotipo con texto normal si existe el asset oficial.

### Copy de marca

El tono debe ser:

- claro;
- directo;
- humano;
- sin lenguaje financiero innecesariamente técnico;
- orientado a entender y decidir.

No utilizar slogans nuevos sin aprobación.

---

## 4. Paleta

### Colores aprobados

| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#00CBA0` | acciones principales, progreso, acentos |
| `--color-secondary` | `#2D7FF9` | acentos secundarios y elementos de apoyo |
| `--color-success` | `#22C55E` | éxito |
| `--color-danger` | `#EF4444` | peligro / acciones destructivas |
| `--color-background` | `#FFFFFF` | fondo principal |
| `--color-surface` | `#F7F7F7` | superficies y contenedores |
| `--color-text-primary` | `#111111` | texto principal |
| `--color-text-secondary` | `#6B6B6B` | texto secundario |
| `--color-border` | `#D6D6D6` | bordes y separadores |
| `--color-track` | `#EAEAEA` | pistas de progreso y anillos |
| `--color-muted-nontext` | `#9A9A9A` | iconos inactivos y anotaciones no textuales |

### Reglas

La paleta visual V1 está cerrada.

Tokens definitivos adicionales:

| Token | Valor | Uso |
|---|---|---|
| `--color-warning` | `#F59E0B` | advertencias |
| `--color-info` | `#6B7280` | información neutral |
| `--color-income` | `#22C55E` | ingresos |
| `--color-expense` | `#EF4444` | gastos |
| `--color-secondary-tint` | `#DCE8FF` | fondos y estados secundarios |

No crear colores literales nuevos en componentes.

### Texto sobre primario

Sobre `#00CBA0` utilizar `#111111`.

No utilizar texto blanco sobre `#00CBA0`.

### Ingresos y gastos

Ingresos utilizan `--color-income` y gastos `--color-expense`.

La diferencia visual debe combinar siempre:

- signo;
- copy;
- jerarquía;
- color.

Nunca depender únicamente del color.

---

## 5. Tipografía

Fuente oficial: **Inter**.

La fuente debe estar disponible localmente en el proyecto.

### Jerarquía

Prioridad:

1. cifra financiera principal;
2. título de pantalla;
3. título de sección;
4. contenido;
5. metadatos;
6. texto auxiliar.

La jerarquía se crea primero con tamaño, peso y espacio; el color es secundario.

No introducir una segunda familia tipográfica.

---

## 6. Espaciado

Unidad base: **4 px**.

Valores preferidos:

`4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 px`

Reglas:

- evitar compactar por ahorrar espacio;
- mantener márgenes laterales generosos;
- agrupar contenidos relacionados mediante proximidad;
- separar secciones con 24–32 px cuando cambie el objetivo visual.

---

## 7. Forma

Radio principal:

`--radius: 8px`

Radio completo:

`--radius-full: 999px`

`--radius-full` solo para:

- pills;
- chips;
- badges;
- controles completamente redondeados;
- elementos circulares.

No crear automáticamente una familia adicional de radios.

---

## 8. Superficies y elevación

No usar sombras como recurso visual habitual.

Las tarjetas se separan mediante:

- superficie;
- borde sutil cuando sea necesario;
- contraste suave;
- espacio en blanco.

Evitar combinar simultáneamente:

- borde fuerte;
- sombra fuerte;
- fondo contrastado.

---

## 9. Tarjetas

Patrón principal:

- superficie `#F7F7F7`;
- radio 8 px;
- sin sombra habitual;
- padding consistente;
- una función principal por tarjeta;
- jerarquía interna clara.

Las tarjetas equivalentes deben reutilizar el mismo patrón.

### Tipos principales

**Money Summary / Patrimonio**
- cifra protagonista;
- variación;
- gráfico opcional según pantalla;
- rango temporal cuando exista.

**Objective Card**
- nombre;
- progreso;
- cantidad actual;
- cantidad objetivo;
- fecha cuando corresponda.

**AXIS Card**
- iconografía distintiva;
- resumen breve;
- CTA hacia análisis completo;
- no parece un chat convencional.

**Chart Card**
- título;
- contexto temporal;
- gráfico;
- lectura principal;
- leyenda solo cuando sea necesaria.

---

## 10. Botones

### Primario

- altura 52 px;
- área táctil mínima 44 × 44 px;
- fondo `--color-primary`;
- texto `--color-text-primary`;
- una acción primaria dominante por contexto.

### Secundario

- menor peso visual;
- no competir con el primario.

### Destructivo

- usar `--color-danger` únicamente para acciones destructivas;
- requerir confirmación explícita.

### FAB

El FAB solo se utiliza cuando una acción rápida lo justifique claramente.

No añadir FABs por decoración.

---

## 11. Inputs y formularios

Los formularios deben ser:

- claros;
- táctiles;
- ligeros;
- con etiquetas explícitas;
- con estados de foco;
- con errores junto al campo afectado.

### Movimiento

#### Gasto

`Comida · Restaurantes · Salidas · Caprichos · Ropa · Otros`

#### Ingreso

`Trabajo · Regalos · Otros`

Cuando la categoría es `Otros`:

- Motivo → obligatorio;
- Nota → opcional.

La Nota:

- está disponible en todas las categorías;
- solo aparece en detalle;
- no aparece en historial.

El campo Cuenta no existe en V1.

---

## 12. Iconografía

Biblioteca: **Lucide React**.

Características:

- lineal;
- simple;
- consistente;
- reconocible;
- sin mezcla de familias.

Los iconos aportan significado.

---

## 13. Movimiento

Animaciones:

- 200–300 ms;
- suaves;
- funcionales;
- no decorativas.

Aplicaciones:

- aparición;
- apertura/cierre;
- feedback;
- cambios de estado.

Respetar `prefers-reduced-motion`.

---

# 14. Arquitectura visual de navegación

## 14.1 Modelo general

La navegación inferior tendrá **cinco secciones principales**, una vez cerrado el reparto definitivo en `DECISIONES.md`.

Mientras el reparto siga PENDIENTE, no fijar por código una navegación definitiva.

## 14.2 Regla de composición

La barra:

- permanece accesible en las pantallas principales;
- utiliza iconos Lucide de aproximadamente 24 px;
- mantiene área táctil mínima de 44 × 44 px;
- marca claramente la sección activa;
- no utiliza sombras pesadas;
- mantiene labels cortos.

## 14.3 Accesos secundarios

No convertir cada funcionalidad en una pestaña.

AXIS, Estadísticas u otras superficies que no entren en la barra definitiva deben alcanzarse desde el lugar definido por producto.

---

# 15. Relación entre pantallas

Esta jerarquía debe mantenerse:

**Inicio**  
→ resumen global y decisiones prioritarias.

**Mi Dinero**  
→ situación financiera operativa y patrimonio líquido.

**Movimientos**  
→ registro y gestión detallada de ingresos/gastos.

**Estadísticas**  
→ interpretación visual de datos.

**Inversiones**  
→ patrimonio invertido y cartera.

**Objetivos**  
→ metas y progreso.

**AXIS**  
→ análisis estratégico y recomendaciones.

Ninguna pantalla debe duplicar datos como si fuera propietaria de ellos.

---

# 16. Inicio

## 16.1 Objetivo

Inicio debe permitir entender la situación financiera en pocos segundos y ofrecer la decisión o acción más relevante.

## 16.2 Estructura visual exacta

Orden preferente:

1. **Cabecera**
   - saludo personalizado;
   - logo/identidad Finax según la referencia;
   - acciones secundarias mínimas.

2. **Patrimonio principal**
   - etiqueta `Patrimonio`;
   - cifra grande;
   - variación temporal si existe;
   - gráfico de evolución;
   - selector temporal simple.

3. **Resumen**
   - ingresos del periodo;
   - gastos del periodo;
   - balance del periodo.

4. **AXIS — “¿Qué hacer con mi dinero?”**
   - tarjeta diferenciada;
   - resumen breve;
   - recomendación o confirmación de que no hace falta actuar;
   - acceso a `Ver análisis completo`.

5. **Objetivos destacados**
   - pocos objetivos;
   - progreso visible;
   - acceso a ver todos.

6. **Accesos rápidos**
   - Ingreso;
   - Gasto;
   - acceso a las superficies principales que sean relevantes.

## 16.3 Qué NO debe aparecer

- Cuentas;
- Presupuesto;
- Transferencias;
- contenido de login;
- datos bancarios;
- widgets comerciales;
- funciones no aprobadas.

## 16.4 Estados de Inicio

**Sin suficiente información**
- mostrar el patrimonio/situación disponible;
- evitar estadísticas falsas;
- el bloque de AXIS puede indicar que todavía no hay suficiente contexto.

**Sin recomendación de AXIS**
- mostrar una conclusión válida de “No hace falta actuar ahora”;
- nunca tratarlo como error o empty state roto.

---

# 17. Mi Dinero

## 17.1 Objetivo

Mi Dinero es el núcleo operativo.

## 17.2 Estructura visual

Orden:

1. título `Mi Dinero`;
2. tarjeta de patrimonio;
3. saldo inicial y acción `Modificar`;
4. resumen del día/periodo;
5. evolución del patrimonio cuando corresponda al alcance visual aprobado;
6. últimos movimientos;
7. accesos rápidos;
8. acción `Nuevo movimiento`.

## 17.3 Patrimonio

La tarjeta debe mostrar:

- `Patrimonio actual`;
- cifra principal;
- variación;
- gráfico si existe historial;
- selector temporal cuando exista;
- acceso a editar saldo inicial.

La cifra debe dominar visualmente.

## 17.4 Estados

**Sin movimientos**
- mensaje simple;
- explicación breve;
- CTA para crear el primer movimiento.

**Patrimonio negativo**
- cifra visible;
- contexto claro;
- sin lenguaje alarmista automático.

---

# 18. Movimientos

## 18.1 Objetivo

Gestionar el historial de movimientos de forma rápida y limpia.

## 18.2 Estructura

1. título `Movimientos`;
2. búsqueda;
3. filtros simples;
4. grupos por día;
5. filas de movimientos;
6. acción `Nuevo movimiento`.

## 18.3 Fila

Cada fila puede mostrar:

- icono/marcador;
- nombre o Motivo que corresponda;
- categoría;
- hora/fecha cuando corresponda;
- importe con signo.

No mostrar Nota.

## 18.4 Estados

**Sin movimientos**
- explicar que todavía no se ha registrado ningún movimiento;
- CTA `Nuevo movimiento`.

**Filtro sin resultados**
- no reutilizar el empty state general;
- indicar que ningún movimiento coincide;
- permitir limpiar filtros.

---

# 19. Estadísticas

## 19.1 Objetivo

Convertir datos en comprensión.

## 19.2 Estructura

1. título `Estadísticas`;
2. selector de periodo;
3. evolución del patrimonio;
4. ingresos vs gastos;
5. distribución por categorías cuando D-03 esté aprobada;
6. lectura/resumen principal.

## 19.3 Relación con Mi Dinero

Mi Dinero es la fuente de datos.

Estadísticas no crea ni mantiene una copia independiente de movimientos o patrimonio.

## 19.4 Regla

No introducir gráficos solo por variedad visual.

Los gráficos deben responder a una pregunta útil.

## 19.5 Estados

**Sin datos**
- explicar por qué no se puede mostrar todavía;
- indicar qué puede hacer el usuario para generar datos.

**Paleta categórica pendiente**
- no finalizar gráficos por categoría hasta cerrar D-03.

---

# 20. Inversiones

## 20.1 Objetivo

Mostrar la cartera de forma clara y tranquila.

## 20.2 Estructura

1. `Inversiones`;
2. patrimonio invertido;
3. variación;
4. evolución;
5. lista de posiciones;
6. peso relativo;
7. rendimiento;
8. acceso a detalle.

## 20.3 Detalle de inversión

Debe permitir entender:

- activo;
- cantidad/participaciones;
- valor actual;
- precio medio cuando corresponda;
- rendimiento;
- evolución;
- última actualización.

No inventar datos de mercado.

No usar fotografías como requisito visual principal.

## 20.4 Estados

**Sin inversiones**
- mensaje simple;
- explicar que todavía no hay posiciones registradas;
- CTA para añadir una inversión, si esa acción está aprobada en la fase funcional correspondiente.

**Datos no disponibles**
- diferenciar ausencia de datos de error;
- mostrar última información conocida cuando proceda.

---

# 21. Objetivos

## 21.1 Objetivo

Mostrar metas financieras sin gamificación.

## 21.2 Estructura

1. título `Objetivos`;
2. lista de objetivos;
3. cada objetivo muestra:
   - nombre;
   - progreso;
   - cantidad actual;
   - cantidad objetivo;
   - fecha si corresponde;
4. acción `Nuevo objetivo`.

## 21.3 Nuevo objetivo

Campos visuales:

- nombre;
- objetivo monetario;
- fecha objetivo;
- información necesaria para calcular el progreso.

No usar imágenes.

No añadir medallas, niveles ni recompensas.

## 21.4 Estados

**Sin objetivos**
- explicación breve;
- CTA `Nuevo objetivo`.

---

# 22. AXIS

## 22.1 Objetivo

AXIS convierte contexto financiero en análisis y recomendaciones explicables.

## 22.2 Centro Estratégico

El Centro Estratégico es la superficie principal.

Orden visual:

1. cabecera `AXIS`;
2. estado general;
3. estrategia actual;
4. hallazgos relevantes;
5. alternativas;
6. recomendación;
7. nivel de confianza/incertidumbre;
8. conclusión;
9. acción `Ver conversación` cuando exista.

## 22.3 Cuando no hay recomendación

La interfaz debe poder mostrar:

> **No hace falta actuar ahora.**

Debe verse como una conclusión válida, no como un estado vacío.

## 22.4 Chat secundario

El chat es secundario.

Debe:

- mantener identidad Finax;
- usar mensajes claros;
- diferenciar datos, interpretación y recomendación;
- no parecer una aplicación de chat genérica.

## 22.5 Elementos prohibidos

No incluir:

- grabación de voz;
- micrófono como acción principal;
- análisis por imágenes;
- avatar humano;
- interfaz de asistente genérico.

Las recomendaciones nunca deben parecer órdenes.

## 22.6 Estados AXIS

**Sin suficiente contexto**
- explicar qué información falta;
- no crear una recomendación artificial.

**Con análisis**
- separar dato / interpretación / recomendación / incertidumbre.

**Sin cambio recomendado**
- mostrar explícitamente la conclusión de no actuar.

---

# 23. Nuevo movimiento

## 23.1 Estructura

Puede presentarse como bottom sheet o pantalla secundaria según el contexto.

Orden:

1. cabecera;
2. selector `Ingreso / Gasto`;
3. cantidad;
4. categoría;
5. Motivo cuando `Otros`;
6. Nota opcional;
7. fecha;
8. botón `Guardar`.

## 23.2 Comportamiento visual

- cambios de tipo actualizan la lista de categorías;
- errores aparecen junto al campo;
- al corregir un campo, su error desaparece;
- guardar utiliza acción primaria.

No incluir Cuenta.

---

# 24. Detalle de movimiento

## 24.1 Contenido

- tipo;
- nombre;
- importe;
- fecha/hora;
- categoría;
- Motivo;
- Nota.

## 24.2 Acciones

- Editar;
- Eliminar.

Eliminar requiere confirmación explícita.

## 24.3 Regla de Nota

La Nota es visible aquí y solo aquí dentro del flujo de movimientos.

---

# 25. Patrimonio — detalle visual

Esta superficie solo aparece cuando una acción o contexto lo requiera.

Debe priorizar:

1. patrimonio total;
2. liquidez;
3. patrimonio invertido;
4. variación;
5. evolución;
6. explicación breve.

No añadir métricas por decoración.

---

# 26. Filtros

Los filtros deben ser simples.

Controles posibles, únicamente cuando el contexto los necesite:

- tipo;
- categoría;
- fecha/periodo;
- orden.

No convertir filtros simples en una pantalla de configuración avanzada.

---

# 27. Ajustes

Ajustes **no es una de las cinco secciones principales**.

Es una superficie secundaria de configuración y utilidades.

## 27.1 Contenido V1

Solo mostrar opciones que formen parte real de V1:

- preferencias de apariencia cuando exista una decisión aprobada;
- notificaciones dentro de la aplicación cuando corresponda;
- copia de seguridad;
- exportar/restaurar datos;
- ayuda básica;
- información de Finax.

## 27.2 Prohibido

No añadir:

- perfiles de usuarios;
- registro;
- inicio de sesión;
- cuentas bancarias;
- sincronización bancaria;
- planes de pago;
- suscripciones;
- anuncios;
- funciones sociales.

El sistema de copia de seguridad/exportación/restauración forma parte de V1 Core según la especificación de producto vigente.

---

# 28. Primer arranque

Antes de acceder a Finax por primera vez:

1. explicación mínima;
2. entrada del saldo inicial;
3. confirmación;
4. acceso a Inicio.

No mostrar login.

No mostrar registro.

No pedir información innecesaria.

---

# 29. Estados globales

Cada pantalla importante debe tener estados previsibles:

### Loading
- contenido estable;
- sin saltos;
- no inventar datos.

### Empty
- explicar qué falta;
- acción principal visible.

### Error
- explicar el problema;
- acción de recuperación cuando sea posible.

### Disabled
- contraste suficiente;
- causa comprensible.

### Pressed / Active
- feedback rápido;
- sin animación exagerada.

### Success
- feedback breve;
- no bloquear la navegación.

### Datos insuficientes

Particularmente importante para AXIS e Inversiones:

- indicar que faltan datos;
- explicar qué falta;
- evitar recomendaciones con falsa certeza.

---

# 30. Gráficos

Los gráficos deben ser:

- simples;
- legibles;
- útiles;
- mobile-first;
- sin 3D;
- sin decoración.

### Patrón de evolución

- línea principal;
- área suave cuando ayude a la lectura;
- periodo;
- escala mínima necesaria;
- máximo protagonismo a tendencia y cifra.

### Ingresos vs gastos

Mientras D-02 siga PENDIENTE:

- priorizar separación mediante labels, signo, jerarquía y estructura;
- no fijar una paleta semántica nueva.

### Donut / distribución

Solo cuando exista una paleta categórica aprobada.

No inventar colores categóricos mientras D-03 siga PENDIENTE.

---

# 31. Accesibilidad

- no depender solo del color;
- controles con área táctil mínima de 44 × 44 px;
- labels legibles;
- estados de error identificables de más de una forma;
- respeto a `prefers-reduced-motion`;
- contraste según las reglas aprobadas del Design System.

---

# 32. Responsive

Mobile-first obligatorio.

### Mobile

- una columna;
- uso con una mano;
- navegación inferior;
- sheets/modales adaptados a pantalla pequeña;
- gráficos legibles sin zoom.

### Tablet / desktop

- conservar jerarquía;
- ampliar espacios;
- permitir columnas cuando ayuden;
- nunca convertir Finax en un dashboard empresarial.

---

# 33. Componentes visuales base

Componentes reutilizables:

- Button
- Card
- Field
- BottomSheet
- ConfirmDialog
- EmptyState
- LoadingState
- ErrorState
- MovementRow
- MoneySummary
- ProgressBar
- ChartCard
- ObjectiveCard
- AXISCard
- BottomNavigation
- PageHeader
- FilterChip
- SummaryMetric

No crear variantes aisladas sin una razón real.

---

# 34. Regla de reutilización

Cuando el mismo patrón aparece en varias pantallas:

**un componente reutilizable > múltiples implementaciones visuales separadas.**

Las diferencias deben expresarse mediante datos y props, no mediante copias de componentes.

---

# 35. Elementos expresamente fuera de V1

No crear por inspiración visual:

- login;
- registro;
- cuentas bancarias;
- transferencias;
- sincronización bancaria;
- presupuesto como módulo;
- fondos de emergencia como funcionalidad independiente;
- imágenes en objetivos;
- grabación de voz en AXIS;
- análisis de imágenes en AXIS;
- gamificación;
- funciones premium;
- anuncios;
- funcionalidades sociales;
- marketplace;
- multiusuario dentro de una instalación.

No añadir ninguna funcionalidad nueva solo porque aparezca en una imagen de referencia.

---

# 36. Datos visuales y mocks

Las referencias visuales pueden mostrar datos de ejemplo.

Esos datos deben tratarse como:

**MOCK**

Nunca utilizar una cifra de la imagen como dato funcional real.

En una implementación visual:

- se puede usar contenido de ejemplo;
- debe ser coherente;
- no debe confundirse con datos persistentes;
- no debe crear modelos de datos no aprobados.

---

# 37. Checklist pantalla por pantalla

Antes de considerar una pantalla terminada:

- [ ] objetivo principal evidente;
- [ ] estructura en el orden definido en esta especificación;
- [ ] jerarquía visual correcta;
- [ ] uso de tokens aprobados;
- [ ] tipografía consistente;
- [ ] spacing basado en 4 px;
- [ ] radio y superficie coherentes;
- [ ] botones con jerarquía;
- [ ] estados loading/empty/error cuando correspondan;
- [ ] accesibilidad;
- [ ] responsive móvil;
- [ ] no aparecen funcionalidades fuera de V1;
- [ ] datos mock claramente tratados como mock;
- [ ] navegación coherente;
- [ ] no hay componentes duplicados sin razón.

---

# 38. Reglas para Claude Code

Antes de modificar UI, Claude Code debe leer:

1. `CLAUDE.md`;
2. `docs/product/DOCUMENTO_MAESTRO_FINAX.docx`;
3. `docs/product/AXIS_FINAL.docx`;
4. `docs/product/DECISIONES.md`;
5. `docs/design/DESIGN_SYSTEM_FINAX.md`;
6. `docs/design/FINAX_VISUAL_SYSTEM_V1_1.md`;
7. `docs/design/FINAX_VISUAL_REFERENCE_V2.png`;
8. `TECH_STACK.md`.

### Cuando encuentre una duda

**detectar → informar → proponer → esperar aprobación → implementar**

No inventar decisiones de producto.

No modificar fuentes normativas para justificar una implementación que ya se haya realizado.

---

# 39. Estado de aprobación

### Aprobado

- identidad Finax;
- lenguaje minimalista y aireado;
- paleta base;
- tipografía Inter;
- superficies claras;
- radio base 8 px;
- ausencia de sombras habituales;
- botones móviles;
- iconografía Lucide;
- tratamiento principal del patrimonio;
- listas;
- formularios de movimientos;
- visual general de AXIS;
- exclusión de voz e imágenes en AXIS;
- exclusión de imágenes en Objetivos;
- ausencia de login/registro;
- ausencia de Cuentas y Presupuesto.

### Pendiente

- reparto definitivo de las cinco secciones de navegación;
- paleta categórica de gráficos;
- color específico para distinguir ingresos/gastos;
- tinte claro secundario;
- cualquier decisión todavía marcada como PENDIENTE en `DECISIONES.md`.

---

# 40. Regla de oro

**Finax debe verse como este sistema visual y comportarse como el Documento Maestro.**

El diseño debe hacer que la gestión financiera resulte:

**clara → sencilla → comprensible → útil para decidir.**

La referencia visual muestra el objetivo estético.

Este documento convierte ese objetivo en reglas implementables.

---

# 41. Pantallas secundarias y estados exactos

## 41.1 Nuevo objetivo
Bottom Sheet en móvil; modal/pantalla secundaria en tamaños mayores.

Orden:
1. `Nuevo objetivo`
2. Nombre
3. Cantidad objetivo
4. Fecha objetivo
5. Vista previa del progreso
6. `Crear objetivo`

No imágenes, fotografías, trofeos ni gamificación.

## 41.2 Detalle de objetivo
Orden:
1. Nombre
2. Progreso
3. Cantidad actual
4. Cantidad objetivo
5. Fecha
6. Ritmo necesario cuando esté disponible
7. `Editar`
8. `Eliminar`

Eliminar siempre requiere confirmación.

## 41.3 Nueva inversión
Orden:
1. `Nueva inversión`
2. Activo/nombre
3. Tipo
4. Participaciones
5. Precio de compra
6. Fecha
7. `Guardar`

No conexión bancaria ni sincronización con broker.

## 41.4 Detalle de inversión
Mostrar:
- activo;
- valor actual;
- participaciones;
- coste;
- rendimiento;
- evolución;
- última actualización;
- editar/eliminar cuando corresponda.

## 41.5 Ajustes
Cabecera `Ajustes`.

Bloques:
- Datos y respaldo
- Apariencia
- Información
- Privacidad

V1:
- `Exportar datos`
- `Importar / restaurar datos`
- información sobre almacenamiento local
- información básica de privacidad

No:
- login;
- registro;
- cuentas bancarias;
- facturación;
- suscripciones;
- anuncios;
- funciones sociales.

## 41.6 Estado vacío — Mi Dinero
Título: `Todavía no tienes movimientos`
Texto: `Añade tu primer ingreso o gasto para empezar a ver tu patrimonio.`
CTA: `Nuevo movimiento`

## 41.7 Estado vacío — Inversiones
Título: `Todavía no tienes inversiones`
Texto: `Registra tu primera posición para empezar a seguir tu patrimonio invertido.`
CTA: `Añadir inversión`

## 41.8 Estado vacío — Objetivos
Título: `Todavía no tienes objetivos`
Texto: `Crea una meta para empezar a seguir tu progreso.`
CTA: `Nuevo objetivo`

## 41.9 AXIS — sin recomendación
Título: `No hace falta actuar ahora`
Texto: `Tu estrategia actual sigue siendo adecuada con la información disponible.`

No mostrarlo como error o vacío.

## 41.10 AXIS — contexto insuficiente
Título: `Necesito más contexto`
Texto breve que explique qué dato falta.
No recomendar con certeza insuficiente.

---

# 42. Contrato visual de contenido

Cada pantalla sigue:

**Contexto → dato principal → interpretación → acción**

Evitar:

**acción → ruido visual → decoración**

---

# 43. Mapa definitivo de pantallas

### Inicio
- `/`
- estado normal
- estado sin recomendaciones
- estados con datos insuficientes

### Mi Dinero
- `/mi-dinero`
- estado normal
- estado vacío
- modificar saldo inicial

### Movimientos
- superficie secundaria desde Mi Dinero
- lista
- nuevo movimiento
- detalle
- editar

### Estadísticas
- `/estadisticas`
- estado normal
- estado vacío

### Inversiones
- `/inversiones`
- estado normal
- nueva inversión
- detalle
- edición

### Objetivos
- `/objetivos`
- estado normal
- nuevo objetivo
- detalle
- edición

### AXIS
- `/axis`
- Centro Estratégico
- chat secundario
- contexto insuficiente
- sin recomendación

### Ajustes
- acceso secundario desde cabecera
- backup/exportación/restauración
- privacidad/información

### Primer arranque
- pantalla previa a Inicio
- saldo inicial
- confirmación
