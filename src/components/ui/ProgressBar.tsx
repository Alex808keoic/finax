/*
 * Barra de progreso.
 *
 * Visual System §9 y §33; Design System §5.
 *
 * Pista `--color-track`, relleno `--color-primary`, extremos redondeados.
 * El progreso lo calcula quien la usa: este componente solo lo representa.
 *
 * El porcentaje siempre debe ir acompañado de texto legible cerca, para no
 * depender únicamente de la barra (§31).
 */

type ProgressBarProps = {
  /** Progreso entre 0 y 1. Los valores fuera de rango se recortan. */
  value: number;
  /** Descripción para lectores de pantalla. */
  label: string;
};

export function ProgressBar({ value, label }: ProgressBarProps) {
  const clamped = Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
  const percent = Math.round(clamped * 100);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="h-2 w-full overflow-hidden rounded-full bg-track"
    >
      <div
        className="h-full rounded-full bg-primary transition-[width] duration-[var(--motion-standard)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
