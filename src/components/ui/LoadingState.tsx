/*
 * Estado de carga.
 *
 * Visual System §29; Design System §23.
 *
 * Discreto y sin saltos bruscos de layout. No inventar datos mientras carga.
 */

type LoadingStateProps = {
  label?: string;
};

export function LoadingState({ label = "Cargando…" }: LoadingStateProps) {
  return (
    <p
      role="status"
      aria-live="polite"
      className="px-4 py-12 text-center text-[13px] text-text-secondary"
    >
      {label}
    </p>
  );
}
