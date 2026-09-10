/*
 * Fila de acceso a otra superficie.
 *
 * Visual System §16.2 (accesos rápidos) y §17.2.
 *
 * Superficie blanca con borde sutil: es un nivel de jerarquía por debajo del
 * bloque de patrimonio, sin recurrir a sombras (§8). Mantiene la misma
 * relación icono/contenedor y el mismo grosor de trazo que el resto del
 * sistema.
 */

import type { ComponentType } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ICON_SIZE, ICON_STROKE } from "./icons";

type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type NavRowProps = {
  to: string;
  label: string;
  icon: IconComponent;
  /** Texto secundario opcional bajo la etiqueta. */
  description?: string;
};

export function NavRow({ to, label, icon: Icon, description }: NavRowProps) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-[var(--radius)] border border-border bg-background px-4 py-3 transition-colors duration-[var(--motion-fast)] hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius)] bg-surface text-text-secondary"
      >
        <Icon size={ICON_SIZE.control} strokeWidth={ICON_STROKE} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[16px] font-medium">{label}</span>
        {description ? (
          <span className="mt-0.5 block truncate text-[13px] text-text-secondary">
            {description}
          </span>
        ) : null}
      </span>

      <ChevronRight
        size={ICON_SIZE.control}
        strokeWidth={ICON_STROKE}
        aria-hidden="true"
        className="shrink-0 text-muted-nontext"
      />
    </Link>
  );
}
