/*
 * Tarjeta.
 *
 * Visual System §9; Design System §13 (D-11).
 *
 * Superficie `--color-surface`, radio 8 px, sin sombra. La separación visual
 * se consigue con superficie, espacio y, si hace falta, un borde sutil.
 * Una función principal por tarjeta.
 */

import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  /** Añade un borde sutil cuando la tarjeta va sobre una superficie del mismo tono. */
  bordered?: boolean;
  className?: string;
};

export function Card({ children, bordered = false, className = "" }: CardProps) {
  const border = bordered ? "border border-border" : "";

  return (
    <div
      className={`rounded-[var(--radius)] bg-surface p-4 ${border} ${className}`}
    >
      {children}
    </div>
  );
}
