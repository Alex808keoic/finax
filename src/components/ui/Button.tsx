/*
 * Botón.
 *
 * Visual System §10; Design System §10.
 *
 * - Primario: relleno `--color-primary` con texto `--color-text-primary` (D-12).
 *   Nunca texto blanco sobre el primario: incumpliría el §31.
 * - Destructivo: `--color-danger` solo para acciones destructivas, y siempre
 *   con confirmación explícita (D-16).
 * - Altura del botón principal 52 px; área táctil mínima 44 × 44 px.
 * - Una sola acción primaria dominante por contexto.
 */

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "sm";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  children: ReactNode;
};

const VARIANTS: Record<Variant, string> = {
  primary: "bg-primary text-text-primary",
  secondary: "bg-surface text-text-primary border border-border",
  ghost: "bg-transparent text-text-secondary",
  danger: "bg-surface text-danger border border-border",
};

const SIZES: Record<Size, string> = {
  md: "h-[var(--control-height-primary)] px-4 text-[16px]",
  sm: "h-[var(--touch-target-min)] px-3 text-[13px]",
};

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-[var(--radius)] font-medium " +
  "transition-[background-color,color,filter] duration-[var(--motion-fast)] " +
  "hover:brightness-[0.97] active:brightness-95 " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary " +
  "disabled:pointer-events-none disabled:opacity-50";

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const width = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${width} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
