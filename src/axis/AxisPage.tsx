/*
 * AXIS vive fuera de features/ porque es una capa transversal, no un módulo
 * más (TECH_STACK.md §22 y §23).
 *
 * Su superficie principal es el Centro Estratégico y el chat es una vista
 * secundaria (DECISIONES.md D-09). Ninguna de las dos está implementada.
 */

import { ModulePlaceholder } from "../components/ModulePlaceholder";

export function AxisPage() {
  return <ModulePlaceholder title="AXIS" />;
}
