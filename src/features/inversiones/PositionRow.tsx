/*
 * Posición de la cartera.
 *
 * Visual System §20.2: lista de posiciones, peso relativo, rendimiento y
 * acceso al detalle.
 *
 * Muestra el peso relativo con una barra fina y su porcentaje en texto: el
 * peso nunca se comunica solo con la barra (§31). La barra usa el color
 * primario, no un color por activo: **D-03 sigue abierta** y no puede haber
 * paleta categórica.
 *
 * El rendimiento llega **ya formateado** desde fuera. Este componente no lo
 * calcula porque la documentación no define su fórmula.
 *
 * Sin fotografías ni logotipos de activos: el §20.3 los descarta como
 * requisito visual.
 */

import { ProgressBar } from "../../components/ui/ProgressBar";

type PositionRowProps = {
  name: string;
  /** Valor actual ya formateado. */
  valueLabel: string;
  /** Peso sobre el total invertido, entre 0 y 1. */
  weight: number;
  /** Participaciones ya formateadas, cuando el modelo las proporcione. */
  sharesLabel?: string;
  /** Rendimiento ya formateado. Nunca se calcula aquí. */
  returnLabel?: string;
  /** Tono del rendimiento, cuando quien lo pasa sepa su signo (D-17). */
  returnTone?: "neutral" | "income" | "expense";
  onSelect?: () => void;
};

const TONES = {
  neutral: "text-text-secondary",
  income: "text-income",
  expense: "text-expense",
} as const;

export function PositionRow({
  name,
  valueLabel,
  weight,
  sharesLabel,
  returnLabel,
  returnTone = "neutral",
  onSelect,
}: PositionRowProps) {
  const percent = Math.round(Math.min(1, Math.max(0, weight)) * 100);

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        {/* Hasta dos líneas, igual que en las tarjetas de objetivo: el nombre
            de un activo se lee mejor partido que cortado a la mitad. */}
        <h3 className="min-w-0 flex-1 text-[16px] font-medium line-clamp-2">
          {name}
        </h3>
        <span className="shrink-0 text-[16px] font-semibold tabular-nums">
          {valueLabel}
        </span>
      </div>

      <div className="mt-1 flex items-baseline justify-between gap-4 text-[13px] text-text-secondary">
        <span className="min-w-0 truncate">
          {sharesLabel ? sharesLabel : `${percent} % de la cartera`}
        </span>
        {returnLabel ? (
          <span className={`shrink-0 tabular-nums ${TONES[returnTone]}`}>
            {returnLabel}
          </span>
        ) : null}
      </div>

      <div className="mt-3">
        <ProgressBar value={weight} label={`Peso de ${name} en la cartera`} />
      </div>

      {sharesLabel ? (
        <p className="mt-2 text-[13px] text-text-secondary tabular-nums">
          {percent} % de la cartera
        </p>
      ) : null}
    </>
  );

  const surface = "rounded-[var(--radius)] bg-surface p-4 text-left";

  if (!onSelect) {
    return <article className={surface}>{content}</article>;
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`${surface} block w-full transition-colors duration-[var(--motion-fast)] hover:brightness-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
    >
      {content}
    </button>
  );
}
