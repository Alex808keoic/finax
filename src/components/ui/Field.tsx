/*
 * Campo de formulario.
 *
 * Visual System §11; Design System §27.
 *
 * Etiqueta explícita, campo táctil, estado de foco visible y error junto al
 * campo afectado. El error se identifica por texto y por borde, nunca solo por
 * color (§31).
 */

import type { ReactNode } from "react";

const CONTROL_BASE =
  "w-full min-h-[var(--touch-target-min)] rounded-[var(--radius)] bg-background " +
  "px-3 py-3 text-[16px] text-text-primary " +
  "transition-[border-color,outline-color] duration-[var(--motion-fast)] " +
  "placeholder:text-muted-nontext " +
  "focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary";

/** Clase base de los controles. Se mantiene por compatibilidad con los formularios existentes. */
export const CONTROL_CLASS = `${CONTROL_BASE} border border-border`;

/** Clase de control con estado de validez explícito. */
export function controlClass(invalid = false): string {
  return `${CONTROL_BASE} border ${invalid ? "border-danger" : "border-border"}`;
}

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
};

export function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="mb-1 block text-[13px] text-text-secondary">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p className="mt-1 text-[13px] text-text-secondary">{hint}</p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-[13px] text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
