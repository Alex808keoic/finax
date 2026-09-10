/*
 * Estado vacío.
 *
 * Visual System §29 y §41.6–41.8; Design System §23.
 *
 * Debe explicar qué falta y ofrecer la acción principal cuando exista.
 * Nunca inventar datos para rellenar el hueco (§24).
 */

import type { ComponentType, ReactNode } from "react";
import { ICON_SIZE, ICON_STROKE } from "./icons";

type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;

type EmptyStateProps = {
  title: string;
  description: string;
  /** Acción principal, normalmente un Button. */
  action?: ReactNode;
  icon?: IconComponent;
};

export function EmptyState({
  title,
  description,
  action,
  icon: Icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center px-4 py-12 text-center">
      {Icon ? (
        <span
          aria-hidden="true"
          className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-muted-nontext"
        >
          <Icon size={ICON_SIZE.control} strokeWidth={ICON_STROKE} />
        </span>
      ) : null}
      <p className="text-[16px] font-medium">{title}</p>
      <p className="mt-2 max-w-[36ch] text-[13px] text-text-secondary">
        {description}
      </p>
      {action ? <div className="mt-6 w-full max-w-[280px]">{action}</div> : null}
    </div>
  );
}
