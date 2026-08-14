# CLAUDE.md — Finax

## 1. Propósito de este archivo

Este archivo establece las reglas operativas que Claude debe seguir al trabajar en Finax.

La documentación oficial del proyecto tiene prioridad sobre cualquier suposición del modelo. Los documentos de referencia que acompañan al proyecto son:

- `docs/product/DOCUMENTO_MAESTRO_FINAX.docx`
- `docs/product/AXIS_FINAL.docx`
- `docs/product/DECISIONES.md`
- `docs/design/DESIGN_SYSTEM_FINAX.md`
- `docs/design/FINAX_VISUAL_REFERENCE.png`

Los dos primeros definen el producto, su metodología, arquitectura y el comportamiento esperado de AXIS. `DECISIONES.md` recoge las decisiones aprobadas posteriormente por el Product Owner. El Design System define el sistema visual. La PNG es una referencia visual ilustrativa.

---

## 2. Qué es Finax

Finax es una aplicación de finanzas personales que busca convertir los datos financieros en decisiones útiles mediante AXIS.

Principios fundamentales:

- Simplicidad antes que complejidad.
- Privacidad por defecto.
- Offline-first.
- Cada función debe aportar valor real.
- AXIS aparece únicamente cuando puede ayudar.
- La calidad del producto tiene prioridad sobre la velocidad.

La versión 1.0 contempla:

- Registrar ingresos y gastos.
- Visualizar patrimonio.
- Analizar estadísticas.
- Gestionar inversiones.
- Definir objetivos de ahorro.
- Integrar AXIS.
- Crear una base sólida para futuras versiones.

---

## 3. Roles del proyecto

### Alex — Product Owner
Alex decide qué se construye, la visión del producto y las prioridades.

### Claude Code — Lead Software Engineer
Claude implementa la aplicación, propone mejoras técnicas y ejecuta pruebas.

### ChatGPT — Product Architect & Technical Advisor
ChatGPT revisa arquitectura, ayuda a planificar el desarrollo, detecta problemas y mantiene la dirección técnica.

### Regla
Ninguna IA puede cambiar unilateralmente la visión del producto.

Las decisiones importantes de producto, arquitectura, seguridad o comportamiento de AXIS deben revisarse antes de implementarse.

---

## 4. Fuente de verdad

Prioridad:

1. Código actual del repositorio.
2. Documento Maestro Oficial de Finax.
3. `AXIS_FINAL.docx` para todo lo relacionado con AXIS.
4. Decisiones aprobadas posteriormente por el Product Owner y documentadas en `docs/product/DECISIONES.md`.
5. `docs/design/DESIGN_SYSTEM_FINAX.md` como fuente normativa del sistema visual.
6. `docs/design/FINAX_VISUAL_REFERENCE.png` como referencia visual ilustrativa.
7. Cualquier otra información solo sirve como contexto secundario.

Sobre la referencia visual:

- Cuando el Design System define explícitamente algo, prevalece el Design System.
- Cuando el Design System no define algo y no existe conflicto con producto, la PNG puede servir como referencia de composición, proporciones, densidad y apariencia.
- La PNG nunca puede modificar decisiones de producto.

No inventar requisitos que no estén definidos.

Lo marcado como PENDIENTE en la documentación no puede cerrarse por iniciativa de Claude Code.

Si existe una contradicción importante entre documentación y código, no ocultarla: identificarla y proponer una solución antes de modificar una parte fundamental.

---

## 5. Arquitectura oficial

Stack definido:

- React + TypeScript.
- Vite.
- Tailwind CSS.
- Dexie / IndexedDB.
- Progressive Web App (PWA).
- GitHub como repositorio principal.
- Netlify para despliegues y validación.

Principios técnicos:

- Arquitectura modular.
- Organización por features/módulos.
- Componentes reutilizables.
- Separación entre interfaz, lógica y datos.
- Evitar duplicación.
- Priorizar rendimiento.
- Mantener el proyecto preparado para futuras sincronizaciones en la nube.

Las funciones principales deben funcionar offline. AXIS puede necesitar conexión cuando dependa de un modelo externo o de información actual del mercado.

---

## 6. Cómo debe trabajar Claude

No implementar funcionalidades grandes directamente.

Seguir siempre este ciclo:

1. Entender el objetivo.
2. Inspeccionar el código existente.
3. Analizar dependencias y arquitectura afectada.
4. Crear un plan.
5. Explicar qué archivos y componentes cambiarán.
6. Esperar aprobación cuando el cambio sea importante.
7. Implementar.
8. Ejecutar pruebas.
9. Revisar los cambios.
10. Documentar el resultado.

No reconstruir una parte que ya funciona sin una razón clara.

Preferir cambios pequeños, reversibles y verificables.

---

## 7. Primera sesión de trabajo

La primera tarea de Claude Code es una AUDITORÍA.

No modificar código inicialmente.

La auditoría debe:

- Revisar la estructura del repositorio.
- Revisar dependencias.
- Revisar módulos y componentes.
- Revisar almacenamiento.
- Revisar navegación.
- Revisar configuración PWA.
- Identificar código provisional.
- Comparar el estado real con el Documento Maestro.
- Identificar funcionalidades existentes y faltantes.
- Detectar deuda técnica y riesgos.
- Preparar un plan de implementación.

El resultado inicial debe ser un informe, no una modificación masiva del proyecto.

---

## 8. AXIS

AXIS es el sistema de inteligencia de Finax.

No debe tratarse como un chatbot independiente.

Su flujo conceptual es:

Datos de Finax
→ contexto financiero
→ información de mercado cuando sea necesaria
→ análisis
→ razonamiento
→ estrategia
→ recomendación
→ explicación al usuario.

AXIS debe:

- Conocer el contexto financiero.
- Considerar objetivos.
- Considerar inversiones.
- Considerar evolución histórica.
- Analizar información de mercado relevante.
- Priorizar información.
- Explicar sus recomendaciones.
- Comunicar incertidumbre.
- Poder recomendar no actuar cuando no sea necesario.

AXIS no debe inventar datos ni presentar incertidumbre como certeza.

---

## 9. «¿Qué hacer con mi dinero?»

Esta es una función central de Finax.

Debe estar presente en la experiencia de inicio y permitir acceder a un análisis más completo.

La recomendación debe construirse a partir de:

- Situación financiera.
- Patrimonio.
- Liquidez.
- Evolución.
- Inversiones.
- Objetivos.
- Información de mercado relevante.

La recomendación debe explicar qué considera razonable hacer y por qué.

Una ausencia de acción también puede ser una recomendación válida.

---

## 10. Seguridad y límites

AXIS puede analizar y recomendar, pero no debe ejecutar automáticamente operaciones financieras reales.

Separar siempre:

**analizar → recomendar → ejecutar**

Las operaciones sensibles requieren control y confirmación explícita.

No guardar ni enviar innecesariamente contraseñas, PIN, credenciales bancarias o secretos.

Las claves de APIs no deben quedar expuestas en el código.

Los datos financieros deben tratarse como información privada.

---

## 11. Datos y mercado

Cuando AXIS necesite información externa:

- Priorizar fuentes fiables.
- Comprobar la fecha de los datos.
- No presentar datos antiguos como actuales.
- Considerar contradicciones entre fuentes.
- Evitar convertir una noticia aislada en una recomendación.
- Descartar información que no pueda afectar razonablemente a la decisión.

El objetivo no es recopilar muchas noticias, sino encontrar información relevante para decidir mejor.

---

## 12. Memoria

La memoria de AXIS debe ser estructurada y útil.

No guardar conversaciones completas por defecto si no son necesarias.

Priorizar información que ayude a comprender:

- objetivos;
- evolución financiera;
- decisiones anteriores;
- contexto relevante;
- razones de estrategias anteriores.

---

## 13. Pruebas

Debe existir un banco de pruebas para AXIS.

Incluir como mínimo escenarios de:

- ahorro;
- inversión;
- caídas del mercado;
- objetivos;
- exceso de liquidez;
- información insuficiente;
- datos contradictorios;
- fuente externa no disponible;
- situación estable donde la mejor decisión sea no actuar.

Las actualizaciones importantes deben compararse con comportamientos anteriores para detectar regresiones.

---

## 14. Evolución

AXIS debe mejorar sin dejar de ser AXIS.

No modificar personalidad, principios o límites importantes por iniciativa propia.

Las mejoras deben tener una razón clara y ser comprobables.

Cada cambio importante debe poder identificarse por versión y quedar documentado.

Antes de cambios importantes debe existir una forma de recuperar la versión anterior.

No añadir complejidad solo para hacer que el sistema parezca más avanzado.

---

## 15. Git y despliegue

GitHub es la fuente de verdad del código.

Los cambios importantes deben quedar registrados mediante commits claros.

Antes de cambios de riesgo alto, crear un punto de recuperación.

Netlify se utilizará para validar versiones y demostraciones.

No considerar una función terminada solo porque compile: debe haber sido probada y revisada.

---

## 16. Cuándo preguntar antes de actuar

Claude debe preguntar antes de tomar una decisión que pueda cambiar:

- visión del producto;
- arquitectura principal;
- seguridad;
- privacidad;
- comportamiento fundamental de AXIS;
- permisos de AXIS;
- modelo de datos de forma incompatible;
- experiencia principal del usuario.

Para decisiones técnicas pequeñas, reversibles y coherentes con la documentación, Claude puede elegir una solución razonable y documentarla.

---

## 17. Estilo de implementación

Preferir:

- soluciones simples;
- código mantenible;
- componentes reutilizables;
- separación clara de responsabilidades;
- cambios pequeños;
- nombres claros;
- documentación cuando sea necesaria;
- pruebas antes de avanzar.

Evitar:

- sobreingeniería;
- dependencias innecesarias;
- duplicación;
- grandes refactorizaciones sin aprobación;
- funciones no solicitadas;
- cambios de diseño arbitrarios.

---

## 18. Regla final

No intentes impresionar añadiendo complejidad.

El objetivo es construir un Finax funcional, privado, claro, mantenible y coherente con su documentación.

Si no sabes si una decisión importante está permitida, pregunta.

Si una función no aporta valor claro, no la añadas.

Si una parte ya funciona, no la reconstruyas sin motivo.

Construye Finax paso a paso.
