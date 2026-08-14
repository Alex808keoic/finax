/*
 * Rutas de V1.
 *
 * Las áreas funcionales están aprobadas en TECH_STACK.md §12:
 * Inicio, Mi Dinero, Estadísticas (módulo propio, D-06), Inversiones,
 * Objetivos (módulo propio, D-07) y AXIS (D-09).
 *
 * Cuentas y Presupuesto NO forman parte de V1 (D-08): no deben añadirse
 * rutas para ellos.
 *
 * El reparto de estas rutas en la navegación inferior está PENDIENTE
 * (Design System §25). Esta lista define destinos, no la barra final.
 */

import type { ComponentType } from "react";
import { InicioPage } from "../features/inicio/InicioPage";
import { MiDineroPage } from "../features/midinero/MiDineroPage";
import { EstadisticasPage } from "../features/estadisticas/EstadisticasPage";
import { InversionesPage } from "../features/inversiones/InversionesPage";
import { ObjetivosPage } from "../features/objetivos/ObjetivosPage";
import { AxisPage } from "../axis/AxisPage";

export type ModuleRoute = {
  path: string;
  label: string;
  Component: ComponentType;
};

export const MODULE_ROUTES: ModuleRoute[] = [
  { path: "/", label: "Inicio", Component: InicioPage },
  { path: "/mi-dinero", label: "Mi Dinero", Component: MiDineroPage },
  { path: "/estadisticas", label: "Estadísticas", Component: EstadisticasPage },
  { path: "/inversiones", label: "Inversiones", Component: InversionesPage },
  { path: "/objetivos", label: "Objetivos", Component: ObjetivosPage },
  { path: "/axis", label: "AXIS", Component: AxisPage },
];
