# Finax — Technical Stack

**Versión:** Core v1.0  
**Estado:** Oficial para la implementación inicial

---

## 1. Objetivo

Finax es una aplicación privada de finanzas personales desarrollada principalmente para Alex y su padre.

La arquitectura debe priorizar:

- simplicidad;
- fiabilidad;
- privacidad;
- mantenimiento sencillo;
- funcionamiento offline cuando sea posible;
- separación clara entre datos, lógica de negocio e inteligencia de AXIS;
- facilidad para evolucionar el proyecto sin introducir complejidad innecesaria.

Finax no se plantea inicialmente como un producto comercial masivo.

La arquitectura debe ser proporcional al alcance real del proyecto.

---

## 2. Plataforma

### Aplicación principal

**Progressive Web App (PWA)**.

La aplicación debe funcionar principalmente como una aplicación móvil, aunque pueda utilizarse también desde navegador de escritorio.

Prioridad:

1. móvil;
2. tablet;
3. escritorio.

La interfaz será **mobile-first**.

---

## 3. Frontend

### Framework

**React + TypeScript**

React será responsable de:

- interfaz;
- componentes;
- navegación;
- interacción;
- gestión del estado de presentación.

TypeScript será obligatorio para mantener tipado y reducir errores.

---

## 4. Build Tool

### Vite

Vite será utilizado como herramienta principal de desarrollo y build.

Responsabilidades:

- servidor de desarrollo;
- compilación;
- bundling;
- variables de entorno;
- integración con plugins.

---

## 5. Estilos

### Tailwind CSS

Tailwind CSS será utilizado para la construcción de la interfaz.

El sistema visual debe respetar:

`docs/design/DESIGN_SYSTEM_FINAX.md`

y

`docs/design/FINAX_VISUAL_REFERENCE.png`

No crear estilos arbitrarios que contradigan el Design System.

Cuando el Design System y la referencia visual difieran, prevalece el Design System.

---

## 6. Componentes UI

Se utilizará un sistema de componentes reutilizables inspirado en el patrón de shadcn/ui.

Los componentes pueden implementarse manualmente cuando sea necesario.

Principio:

> Los componentes deben ser simples, reutilizables y coherentes con Finax.

Componentes previstos:

- Button
- Card
- Input
- Select
- Dialog
- Bottom Sheet
- Badge
- Tabs
- Label
- Empty State
- Loading State
- Error State

La lista puede crecer cuando exista una necesidad real.

No crear componentes innecesarios.

---

## 7. Iconografía

### Lucide React

Biblioteca oficial de iconos.

No mezclar diferentes familias de iconos salvo aprobación explícita.

---

## 8. Datos locales

### IndexedDB

Los datos principales de Finax deben almacenarse localmente.

### Dexie.js

Dexie será utilizado como capa de abstracción sobre IndexedDB.

Se utilizará para almacenar, entre otros:

- movimientos;
- patrimonio;
- inversiones;
- objetivos;
- preferencias;
- información necesaria para estadísticas;
- memoria estratégica de AXIS cuando corresponda.

La estructura definitiva de datos será determinada durante la implementación después de revisar la especificación funcional.

---

## 9. React Hooks para Dexie

### dexie-react-hooks

Se puede utilizar para sincronizar de forma sencilla los datos de IndexedDB con los componentes React.

La lógica de persistencia debe mantenerse separada de la interfaz.

---

## 10. Arquitectura offline-first

Finax debe seguir una filosofía **offline-first**.

Las funciones que dependen exclusivamente de datos locales deben seguir funcionando sin conexión.

Ejemplos:

- consultar movimientos;
- consultar patrimonio almacenado;
- consultar objetivos;
- consultar estadísticas basadas en datos locales;
- navegar por información ya disponible.

Las funciones que necesitan servicios externos deben detectar la ausencia de conexión y comunicarla correctamente.

---

## 11. PWA

### vite-plugin-pwa

La aplicación se configurará como Progressive Web App.

Debe incluir:

- manifest;
- service worker;
- caching apropiado;
- instalación en dispositivos compatibles.

La estrategia de caché debe diseñarse cuidadosamente.

No almacenar respuestas sensibles de APIs externas en caché de forma insegura.

---

## 12. Routing

### react-router-dom

Se utilizará para la navegación de la aplicación.

Las rutas deben representar las principales áreas funcionales:

- Inicio;
- Mi Dinero;
- Estadísticas — módulo/ruta propio, no una vista interna de Mi Dinero (`docs/product/DECISIONES.md`, D-06);
- Inversiones;
- Objetivos — acceso propio como módulo/ruta en V1 (D-07);
- AXIS, cuya superficie principal es el Centro Estratégico y cuyo chat es una vista secundaria (D-09);
- ajustes y utilidades cuando corresponda.

**Cuentas** y **Presupuesto** no forman parte de V1 (D-08). No crear rutas, modelos de datos ni componentes para ellos.

La navegación principal seguirá el modelo móvil definido en el Design System. El reparto definitivo de la barra inferior está PENDIENTE.

---

## 13. Gráficos

### Recharts

Se utilizará para gráficos financieros y de evolución cuando sea apropiado.

Ejemplos:

- evolución del patrimonio;
- evolución de ingresos/gastos;
- distribución de inversiones;
- evolución de objetivos;
- otros gráficos definidos por producto.

Los gráficos deben seguir el Design System.

No utilizar gráficos simplemente porque sea técnicamente posible.

La paleta categórica de gráficos está **PENDIENTE** (`docs/product/DECISIONES.md`, D-03). No inventar colores de categoría.

---

## 14. Backend y servicios externos

Finax necesita una capa segura para las peticiones que utilicen secretos.

**Las claves privadas nunca deben estar dentro del frontend ni en el repositorio público.**

Esto afecta especialmente a:

- proveedores de IA;
- APIs financieras;
- servicios externos que requieran claves secretas.

La implementación concreta del backend/proxy queda pendiente de la decisión técnica final.

Posibles opciones:

- funciones serverless;
- edge functions;
- backend ligero;
- otra solución equivalente.

La solución elegida debe ser proporcional al proyecto.

---

## 15. AXIS

AXIS es una capa de inteligencia integrada dentro de Finax.

No es un chatbot independiente.

Su arquitectura debe separar claramente:

### Datos deterministas

Calculados mediante código:

- patrimonio;
- porcentajes;
- evolución;
- rentabilidad;
- objetivos;
- métricas financieras;
- cualquier cálculo que pueda determinarse de forma exacta.

### Inteligencia artificial

Utilizada para:

- razonamiento;
- interpretación;
- comparación de alternativas;
- generación de lenguaje natural;
- construcción de estrategias.

El modelo de IA no debe ser considerado la fuente de verdad de los datos financieros.

Los datos y reglas de Finax tienen prioridad.

---

## 16. Proveedor de IA

El proveedor concreto de IA no debe quedar acoplado a la interfaz.

AXIS debe utilizar una capa de abstracción para que el proveedor pueda cambiarse posteriormente sin rediseñar Finax.

El proveedor puede ser, según la decisión final:

- OpenAI;
- Anthropic;
- Google;
- otro proveedor compatible.

La identidad de AXIS debe mantenerse independiente del modelo utilizado.

---

## 17. Mercado y datos financieros externos

Las APIs externas pueden utilizarse para obtener información de mercado cuando esté definida por producto.

Ejemplos:

- precios actuales;
- precios históricos;
- información necesaria para valorar inversiones.

Los datos externos deben distinguirse de los datos almacenados localmente.

Si una API externa no está disponible:

- Finax debe seguir mostrando los datos locales disponibles;
- debe indicar cuándo un dato externo no está actualizado;
- no debe inventar valores.

---

## 18. Seguridad

Principios obligatorios:

1. No incluir claves secretas en el frontend.
2. No subir secretos a GitHub.
3. Utilizar variables de entorno cuando corresponda.
4. Separar datos públicos de secretos.
5. No registrar información financiera sensible innecesariamente.
6. No enviar datos a servicios externos si no es necesario.
7. Minimizar la información enviada a proveedores de IA.
8. No ejecutar operaciones financieras reales desde Finax.

---

## 19. Modelo de responsabilidad de AXIS

AXIS debe mantener una separación clara:

**Analizar → Recomendar → Ejecutar**

AXIS puede:

- analizar;
- comparar;
- explicar;
- recomendar;
- plantear alternativas.

AXIS no puede:

- ejecutar compras;
- ejecutar ventas;
- mover dinero;
- modificar inversiones reales;
- modificar datos del usuario por iniciativa propia.

---

## 20. Estado local y sincronización futura

La primera versión puede funcionar principalmente con almacenamiento local.

La arquitectura debe evitar bloquear una futura posibilidad de sincronización en la nube.

Sin embargo:

**no implementar cloud sync hasta que sea necesario y aprobado.**

No introducir infraestructura cloud simplemente por previsión.

---

## 21. Backup y exportación

Finax debe contemplar mecanismos de backup/exportación porque los datos locales están ligados al almacenamiento del dispositivo/navegador.

La solución concreta y el punto exacto de implementación deben seguir la planificación aprobada del producto.

Principios:

- el usuario debe poder conservar sus datos;
- la restauración debe ser comprensible;
- no perder datos silenciosamente;
- las operaciones destructivas deben requerir confirmación.

---

## 22. Arquitectura de código

La estructura debe separar:

- UI;
- lógica de negocio;
- acceso a datos;
- servicios externos;
- lógica de AXIS.

Una organización orientativa:

```text
src/
├── app/
├── components/
├── features/
│   ├── inicio/
│   ├── midinero/
│   ├── estadisticas/
│   ├── inversiones/
│   └── objetivos/
├── axis/
├── db/
├── services/
├── lib/
├── hooks/
└── types/
```

La estructura final puede adaptarse si existe una razón técnica clara.

---

## 23. Separación de responsabilidades

### Components

Componentes visuales reutilizables.

### Features

Lógica específica de cada módulo.

### DB

Persistencia local y acceso a Dexie.

### Services

Comunicación con servicios externos.

### AXIS

Lógica relacionada con:

- contexto;
- razonamiento;
- recomendaciones;
- memoria estratégica;
- comunicación con el proveedor de IA.

### Types

Tipos compartidos.

La lógica financiera crítica no debe vivir dentro de componentes React.

---

## 24. Estado de aplicación

No introducir una librería global de estado adicional sin necesidad.

Priorizar:

- estado local de React;
- hooks;
- Dexie/observables para datos persistentes;
- contexto únicamente cuando aporte valor real.

Si posteriormente aparece una necesidad real de estado global complejo, se evaluará antes de incorporar una dependencia.

---

## 25. Testing

La aplicación debe probarse progresivamente.

Prioridades:

1. lógica financiera;
2. cálculos;
3. persistencia;
4. componentes críticos;
5. flujos principales;
6. integración con servicios externos;
7. comportamiento offline.

Los cálculos financieros importantes no deben depender únicamente de tests visuales.

---

## 26. Calidad

Antes de considerar una fase terminada, Claude Code debe:

- comprobar TypeScript;
- ejecutar build;
- revisar errores;
- probar los flujos afectados;
- comprobar estados vacíos;
- comprobar estados de error;
- comprobar comportamiento responsive;
- revisar que no se hayan introducido funcionalidades no solicitadas.

---

## 27. Dependencias

No instalar dependencias porque "podrían ser útiles".

Cada dependencia debe justificar:

- qué problema resuelve;
- por qué no puede resolverse razonablemente con las herramientas existentes;
- impacto en mantenimiento.

Priorizar una aplicación pequeña y mantenible.

---

## 28. GitHub

El repositorio oficial será GitHub.

Debe mantenerse:

- código fuente;
- documentación;
- configuración;
- historial de cambios.

Nunca subir:

- API keys;
- tokens;
- secretos;
- datos financieros personales reales.

---

## 29. Deployment

La plataforma prevista inicialmente es:

**Netlify**

La configuración definitiva de deployment se realizará cuando exista una versión funcional que deba publicarse.

No introducir infraestructura adicional sin necesidad.

---

## 30. Entorno de desarrollo

La implementación debe poder desarrollarse y probarse con:

- Node.js;
- npm;
- Git;
- navegador moderno.

El proyecto debe evitar depender de herramientas pesadas que no sean necesarias para la arquitectura aprobada.

---

## 31. Compatibilidad

Prioridad:

1. navegadores móviles modernos;
2. Chrome/Chromium;
3. Safari móvil;
4. navegadores de escritorio modernos.

Las funcionalidades críticas no deben depender de APIs experimentales sin necesidad.

---

## 32. Regla de no sobreingeniería

Finax es un proyecto privado.

La arquitectura debe ser suficientemente sólida para evitar problemas, pero no debe construirse una infraestructura propia de una empresa financiera internacional.

No crear:

- microservicios innecesarios;
- sistemas distribuidos complejos;
- infraestructura cloud excesiva;
- capas de abstracción sin necesidad;
- sistemas de autenticación complejos si no son necesarios;
- bases de datos remotas solo por "escalabilidad futura".

---

## 33. Fuente de verdad

Antes de implementar, Claude Code debe consultar:

1. `CLAUDE.md`
2. `README.md`
3. `TECH_STACK.md`
4. `docs/product/DOCUMENTO_MAESTRO_FINAX.docx`
5. `docs/product/AXIS_FINAL.docx`
6. `docs/product/DECISIONES.md`
7. `docs/design/DESIGN_SYSTEM_FINAX.md`
8. `docs/design/FINAX_VISUAL_REFERENCE.png`

Cada documento tiene una responsabilidad diferente:

- `CLAUDE.md` → reglas de trabajo.
- `README.md` → visión y orientación del proyecto.
- `TECH_STACK.md` → decisiones técnicas.
- Documento Maestro → producto y funcionalidades.
- `AXIS_FINAL` → comportamiento e inteligencia de AXIS.
- `DECISIONES.md` → decisiones aprobadas posteriormente y decisiones abiertas.
- Design System → reglas visuales; prevalece cuando define algo explícitamente.
- Visual Reference → referencia visual ilustrativa; nunca modifica decisiones de producto.

---

## 34. Regla de cambios

Claude Code no debe realizar cambios arquitectónicos importantes sin informar previamente.

Proceso:

**detectar → analizar → informar → proponer → aprobar → implementar**

Si una decisión técnica es claramente necesaria para continuar, debe explicarse antes de aplicarla.

---

## 35. Regla de oro

La tecnología debe servir al producto.

Finax debe mantenerse:

- simple;
- privado;
- fiable;
- mantenible;
- offline-first cuando corresponda;
- preparado para evolucionar;
- sin sobreingeniería.

La implementación debe respetar el producto definido y el Design System.

Si existe una contradicción entre documentos:

**detectar → informar → no asumir silenciosamente.**
