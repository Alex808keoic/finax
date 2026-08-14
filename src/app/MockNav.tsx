/*
 * NAVEGACIÓN PROVISIONAL — MOCK.
 *
 * El contenido definitivo de la navegación inferior está PENDIENTE
 * (Design System §25 y DECISIONES.md §4): existen seis destinos candidatos
 * y el reparto entre barra inferior y otros accesos no está aprobado.
 *
 * Mientras siga abierto, el Design System exige usar MOCK y no inventar
 * destinos. Este componente es un listado plano de las rutas ya aprobadas,
 * sin iconos, sin barra inferior y sin jerarquía de pestañas.
 *
 * SUSTITUIR por el componente Bottom Navigation cuando la decisión se cierre.
 */

import { NavLink } from "react-router-dom";
import { MODULE_ROUTES } from "./routes";

export function MockNav() {
  return (
    <nav
      aria-label="Navegación provisional"
      className="border-b border-border px-4 py-3"
    >
      <p className="text-[13px] text-muted-nontext">MOCK · navegación pendiente</p>
      <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
        {MODULE_ROUTES.map(({ path, label }) => (
          <li key={path}>
            <NavLink
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                isActive
                  ? "text-[13px] text-primary"
                  : "text-[13px] text-text-secondary"
              }
            >
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
