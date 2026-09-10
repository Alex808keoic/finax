/*
 * Navegación inferior.
 *
 * Visual System §14; Design System §25; D-20.
 *
 * Cinco secciones: Inicio, Mi Dinero, Inversiones, Objetivos y AXIS.
 * No añadir una sexta pestaña.
 *
 * Estadísticas y Movimientos NO son pestañas: se accede a ellas desde
 * Mi Dinero. Ajustes se accede desde la cabecera (D-19).
 *
 * Características exigidas: 64 px más safe area, iconos de 24 px, área táctil
 * mínima de 44 px, sección activa claramente marcada y sin sombras pesadas.
 * El estado activo se distingue por color y por `aria-current`, nunca solo
 * por color (§31).
 *
 * Va en el flujo del documento, no superpuesta: ocupa su espacio y queda
 * fijada al borde inferior mientras se hace scroll, de modo que nunca tapa
 * contenido ni acciones.
 *
 * El contenido se limita al mismo ancho que las pantallas para que en
 * escritorio siga leyéndose como una aplicación móvil (§32).
 */

import type { ComponentType } from "react";
import { NavLink } from "react-router-dom";
import { Home, Sparkles, Target, TrendingUp, Wallet } from "lucide-react";
import { BOTTOM_NAV_PATHS, MODULE_ROUTES } from "../../app/routes";
import { ICON_SIZE, ICON_STROKE } from "./icons";

type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

const ICONS: Record<string, IconComponent> = {
  "/": Home,
  "/mi-dinero": Wallet,
  "/inversiones": TrendingUp,
  "/objetivos": Target,
  "/axis": Sparkles,
};

export function BottomNavigation() {
  const items = BOTTOM_NAV_PATHS.map((path) => {
    const route = MODULE_ROUTES.find((candidate) => candidate.path === path);
    return { path, label: route?.label ?? path, Icon: ICONS[path] };
  });

  return (
    <nav
      aria-label="Navegación principal"
      className="sticky bottom-0 z-40 border-t border-border bg-background pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex max-w-[560px]">
        {items.map(({ path, label, Icon }) => (
          <li key={path} className="flex-1">
            <NavLink
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `flex h-16 min-w-[var(--touch-target-min)] flex-col items-center justify-center gap-1 text-[13px] transition-colors duration-[var(--motion-fast)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
                  isActive ? "text-primary" : "text-muted-nontext"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {Icon ? <Icon size={ICON_SIZE.large} strokeWidth={ICON_STROKE} aria-hidden="true" /> : null}
                  <span className={isActive ? "font-medium" : undefined}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
