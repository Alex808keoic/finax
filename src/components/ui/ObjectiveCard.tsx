/*
 * Tarjeta de objetivo.
 *
 * Visual System §9 y §21.
 *
 * Jerarquía: nombre → progreso → importe actual/objetivo → fecha.
 * El progreso es el elemento visual más importante y se comunica de DOS
 * formas: barra y porcentaje en texto. Nunca solo la barra (§31).
 *
 * Prohibido por §21.3 y §35: imágenes, fotografías, ilustraciones, medallas,
 * trofeos, niveles, estrellas, puntos, rachas, rankings y cualquier otra
 * forma de gamificación. Un objetivo es una decisión financiera, no un premio.
 *
 * La finalización se comunica de forma sobria: una etiqueta discreta, sin
 * celebración.
 *
 * Los importes llegan ya formateados y el progreso ya calculado: este
 * componente no hace cuentas.
 */

import type { ReactNode } from "react";
import { ProgressBar } from "./ProgressBar";

type ObjectiveCardProps = {
  name: string;
  /** Progreso entre 0 y 1, calculado por quien usa el componente. */
  progress: number;
  /** Importe actual ya formateado. */
  currentLabel: string;
  /** Importe objetivo ya formateado. */
  targetLabel: string;
  /** Fecha objetivo ya formateada, cuando exista. */
  dateLabel?: string;
  /** Marca el objetivo como alcanzado, sin celebración. */
  completed?: boolean;
  /** Cuando existe, la tarjeta es pulsable y lleva al detalle. */
  onSelect?: () => void;
  /** Contenido opcional al pie, por ejemplo el ritmo necesario. */
  footer?: ReactNode;
};

export function ObjectiveCard({
  name,
  progress,
  currentLabel,
  targetLabel,
  dateLabel,
  completed = false,
  onSelect,
  footer,
}: ObjectiveCardProps) {
  const percent = Math.round(Math.min(1, Math.max(0, progress)) * 100);

  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        {/* Hasta dos líneas: el nombre de una meta se lee mejor partido que
            cortado a la mitad. */}
        <h3 className="min-w-0 flex-1 text-[16px] font-medium text-balance line-clamp-2">
          {name}
        </h3>
        {completed ? (
          <span className="shrink-0 rounded-full bg-background px-2 py-0.5 text-[13px] text-text-secondary">
            Completado
          </span>
        ) : null}
      </div>

      <p className="mt-2 text-[20px] font-semibold tabular-nums">{percent} %</p>

      <div className="mt-2">
        <ProgressBar value={progress} label={`Progreso de ${name}`} />
      </div>

      <div className="mt-3 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-[13px] text-text-secondary">
        <span className="tabular-nums">
          <span className="text-text-primary">{currentLabel}</span> de {targetLabel}
        </span>
        {dateLabel ? <span className="shrink-0">{dateLabel}</span> : null}
      </div>

      {footer ? <div className="mt-3 text-[13px] text-text-secondary">{footer}</div> : null}
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
