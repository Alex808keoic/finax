# Finax — Technical Stack

**Versión:** Core v1.0  
**Estado:** Aprobado para implementación  
**Proyecto:** Finax  
**Plataforma:** Aplicación móvil mediante PWA  
**Alcance:** Aplicación privada para Alex y su padre

---

# 1. Objetivo

Este documento define el stack tecnológico oficial de Finax y las
principales decisiones técnicas aprobadas para su implementación.

Su objetivo es evitar que Claude Code introduzca tecnologías,
arquitecturas o dependencias innecesarias durante el desarrollo.

El stack debe mantenerse simple, mantenible y adecuado para una
aplicación privada de pequeña escala.

Finax no se está construyendo como una plataforma SaaS ni como un
producto comercial multiusuario.

---

# 2. Principios técnicos

Finax debe priorizar:

1. Simplicidad.
2. Fiabilidad.
3. Mantenibilidad.
4. Privacidad.
5. Funcionamiento offline cuando sea posible.
6. Código claro.
7. Componentes reutilizables.
8. Dependencias justificadas.
9. Seguridad de las claves y servicios externos.
10. Evitar sobreingeniería.

La aplicación debe construirse de forma incremental.

No implementar arquitectura futura que todavía no sea necesaria.

---

# 3. Plataforma

## PWA — Progressive Web App

Finax se desarrollará inicialmente como una Progressive Web App.

La PWA debe estar optimizada principalmente para dispositivos móviles.

Características previstas:

- instalación en el dispositivo;
- funcionamiento offline para las funciones locales;
- almacenamiento local;
- Service Worker;
- actualización controlada;
- interfaz mobile-first.

La PWA debe sentirse como una aplicación móvil y no como una página web
de escritorio reducida.

---

# 4. Frontend

## React

Framework principal de interfaz:

**React**

React será responsable de:

- interfaz;
- componentes;
- estados de UI;
- interacción del usuario;
- navegación;
- integración con los servicios internos.

---

## TypeScript

Lenguaje principal:

**TypeScript**

Todo el código de aplicación debe escribirse en TypeScript salvo que
exista una razón técnica justificada para utilizar otra cosa.

Debe utilizarse tipado estricto siempre que sea posible.

Evitar:

- `any` innecesario;
- tipos duplicados;
- interfaces inconsistentes;
- conversiones inseguras.

---

# 5. Build tool

## Vite

Herramienta de desarrollo y build:

**Vite**

Responsabilidades:

- desarrollo local;
- compilación;
- bundling;
- variables de entorno;
- build de producción.

No sustituir Vite por otro sistema de build sin aprobación.

---

# 6. Estilos

## Tailwind CSS

Sistema principal de estilos:

**Tailwind CSS**

Debe utilizarse junto con el Design System oficial de Finax.

El Design System es la fuente de verdad visual.

Claude Code no debe crear arbitrariamente:

- nuevos colores;
- nuevos radios;
- nuevas escalas de espaciado;
- nuevas tipografías;
- nuevos patrones visuales.

Si un componente necesita una decisión visual que no está definida,
debe señalarlo antes de establecer una nueva regla global.

---

# 7. Sistema de componentes

Los componentes visuales deben seguir un patrón reutilizable.

Se pueden utilizar componentes propios inspirados en el patrón de
shadcn/ui cuando sea útil.

No es obligatorio instalar el CLI de shadcn/ui.

Los componentes deben mantenerse bajo control del proyecto.

Ejemplos:

- Button
- Card
- Input
- Dialog
- Select
- Tabs
- Badge
- BottomSheet
- Modal

Además de componentes específicos de Finax:

- FinancialCard
- MovementRow
- InvestmentCard
- GoalCard
- AxisCard
- AxisRecommendation
- AxisAnalysis
- FinancialChart
- BottomNavigation

No crear componentes duplicados para resolver visualmente el mismo
problema.

---

# 8. Navegación

## React Router

Sistema de navegación:

**react-router-dom**

La navegación principal de Finax estará organizada alrededor de los
cinco módulos:

1. Inicio
2. Mi Dinero
3. Estadísticas
4. Inversiones
5. Objetivos

AXIS no es una sexta pestaña.

AXIS funciona como una capa transversal dentro de Finax.

---

# 9. Persistencia local

## IndexedDB

Finax debe utilizar almacenamiento local para los datos financieros
principales.

La aplicación debe poder funcionar sin conexión para las funciones que
no requieren servicios externos.

---

## Dexie.js

Biblioteca oficial para trabajar con IndexedDB:

**Dexie.js**

Dexie será la capa principal de persistencia local.

Debe utilizarse para almacenar, entre otros:

- movimientos;
- patrimonio;
- inversiones;
- objetivos;
- estadísticas derivadas cuando corresponda;
- configuración local;
- memoria estratégica de AXIS cuando corresponda.

---

## dexie-react-hooks

Se puede utilizar:

**dexie-react-hooks**

para conectar los datos de Dexie con React de forma reactiva.

---

# 10. Arquitectura offline-first

Finax sigue una estrategia:

**offline-first**

Las funciones locales deben continuar funcionando sin conexión.

Por ejemplo:

- consultar movimientos;
- registrar movimientos;
- consultar patrimonio;
- consultar objetivos;
- consultar estadísticas basadas en datos locales;
- consultar inversiones almacenadas;
- navegar por la aplicación.

Los servicios externos son una excepción.

---

# 11. Servicios externos

Algunas funciones necesitan conexión.

Principalmente:

- AXIS;
- datos de mercado;
- datos financieros externos.

La ausencia de conexión no debe romper toda la aplicación.

Debe mostrarse un estado adecuado.

Ejemplos:

> Sin conexión. Tus datos siguen disponibles.

o:

> No se ha podido actualizar el valor de mercado.

---

# 12. PWA

## vite-plugin-pwa

La PWA utilizará:

**vite-plugin-pwa**

Responsabilidades:

- manifest;
- Service Worker;
- instalación;
- caché;
- comportamiento offline.

El Service Worker debe diferenciar entre recursos locales y servicios
externos.

Las peticiones a servicios externos de AXIS no deben almacenarse como
si fueran datos locales permanentes.

---

# 13. Gráficos

## Recharts

Biblioteca principal para gráficos:

**Recharts**

Se utilizará para:

- evolución del patrimonio;
- ingresos;
- gastos;
- evolución de inversiones;
- progreso;
- otros gráficos definidos por producto.

Los gráficos deben respetar el Design System de Finax.

No introducir estilos de gráficos incompatibles con la referencia visual.

---

# 14. Iconografía

## Lucide React

Biblioteca oficial de iconos:

**lucide-react**

Debe utilizarse una única familia de iconos.

No mezclar bibliotecas de iconos sin aprobación.

---

# 15. AXIS

AXIS es una parte fundamental de Finax.

No debe implementarse como un chatbot independiente sin acceso al
contexto financiero de la aplicación.

Su arquitectura debe separar:

### Datos deterministas

Calculados por Finax mediante código.

Ejemplos:

- patrimonio;
- porcentajes;
- evolución;
- cantidades;
- rentabilidades;
- progreso;
- comparaciones;
- datos derivados.

### Inteligencia generativa

Utilizada para:

- razonamiento;
- interpretación;
- generación de explicaciones;
- comparación de estrategias;
- comunicación natural.

El modelo de IA no debe convertirse en la fuente de verdad de los
datos financieros.

---

# 16. Proveedor de IA

El proveedor concreto de IA puede cambiar.

AXIS debe diseñarse de forma que su identidad no dependa de un único
modelo.

La aplicación debe interactuar conceptualmente con:

**AXIS**

y no directamente con la identidad del proveedor.

El proveedor/modelo utilizado por debajo puede evolucionar.

---

# 17. Seguridad de API

Las claves privadas de:

- IA;
- APIs financieras;
- mercado;

**NO deben exponerse en el frontend ni almacenarse en el repositorio
público.**

No incluir claves reales en:

- código;
- `.tsx`;
- `.ts`;
- `.env` versionados;
- GitHub;
- archivos públicos.

Las llamadas que requieran secretos deben pasar por una capa segura
apropiada.

---

# 18. Backend / funciones server-side

El frontend por sí solo no debe contener secretos.

La implementación podrá utilizar funciones server-side/serverless o
una capa equivalente para proteger las claves de los servicios externos.

La arquitectura exacta de esta capa debe ser definida antes de
implementarla.

Claude Code no debe introducir un backend complejo simplemente por
precaución.

Debe utilizarse la solución más sencilla que cumpla los requisitos de
seguridad.

---

# 19. Datos de mercado

Las APIs financieras externas se utilizarán para obtener información
de mercado cuando corresponda.

Finax no es un broker.

Las APIs de mercado sirven para:

- precios;
- datos históricos;
- valoración;
- información necesaria para análisis.

No sirven para ejecutar:

- compras;
- ventas;
- órdenes;
- operaciones financieras.

---

# 20. Inversiones

El módulo de inversiones almacenará las posiciones necesarias para
calcular su evolución.

Finax debe distinguir claramente:

- dinero líquido;
- dinero invertido;
- patrimonio total.

Los cálculos derivados deben realizarse mediante código determinista.

La IA no debe calcular por sí sola cantidades críticas que Finax pueda
calcular directamente.

---

# 21. Backup y exportación

Finax debe incluir un sistema de:

- backup;
- exportación;
- restauración.

El sistema debe proteger los datos locales del usuario.

La implementación exacta del formato de backup debe definirse durante
la fase técnica correspondiente.

No utilizar un sistema de backup remoto por defecto si no está aprobado.

---

# 22. Gestión de estado

No introducir una biblioteca global de estado innecesaria.

Preferencia inicial:

- React state;
- hooks;
- contexto cuando realmente sea necesario;
- Dexie como fuente de persistencia.

Si el proyecto demuestra una necesidad real de una solución adicional de
estado global, debe justificarse antes de introducirla.

---

# 23. Estructura del código

La estructura debe organizarse por funcionalidades cuando resulte
adecuado.

Ejemplo conceptual:

src/
├── app/
├── components/
├── features/
│   ├── inicio/
│   ├── midinero/
│   ├── estadisticas/
│   ├── inversiones/
│   ├── objetivos/
│   └── axis/
├── db/
├── services/
├── lib/
├── hooks/
└── styles/

La estructura final puede ajustarse durante la Fase 0 si existe una
razón técnica clara.

No crear una arquitectura excesivamente compleja.

---

# 24. Variables de entorno

Las variables sensibles deben gestionarse mediante variables de entorno
y nunca mediante valores hardcodeados.

Ejemplo conceptual:

```env
AI_API_KEY=
MARKET_API_KEY=
