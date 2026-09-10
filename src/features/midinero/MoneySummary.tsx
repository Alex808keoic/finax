/*
 * Patrimonio y su evolución.
 *
 * Visual System §17.3 y D-21: el patrimonio y su curva forman UN SOLO bloque,
 * no dos tarjetas independientes. La cifra es el dato y la curva es su
 * historia; separarlas rompería la lectura.
 *
 * «El patrimonio aparece en la parte superior porque es el indicador
 * financiero principal» (Documento Maestro, Módulo 2 §9).
 *
 * Jerarquía interna:
 *   etiqueta → cifra → variación → curva → saldo inicial y `Modificar`
 *
 * La curva sangra hasta los bordes de la tarjeta para que se lea como parte
 * del bloque y no como un elemento incrustado.
 *
 * Todo lo que se muestra procede de datos reales. La variación solo aparece
 * cuando hay movimientos en el periodo, y la curva solo cuando hay historial
 * suficiente; en caso contrario se explica qué falta, sin inventar nada.
 *
 * Un patrimonio negativo se muestra en el color de texto normal, nunca en
 * rojo: el color de gasto describe un movimiento, no un juicio sobre la
 * situación del usuario.
 */

import { TrendingDown, TrendingUp } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "../../components/ui/icons";
import { EvolutionChart } from "../../components/ui/EvolutionChart";
import { MoneyFigure } from "../../components/ui/MoneyFigure";
import { formatFullDate } from "../../lib/dates";
import { formatEUR, formatSignedEUR } from "../../lib/money";
import { hasEnoughHistory, type PatrimonioPoint } from "./evolution";

type MoneySummaryProps = {
  patrimonioCents: number;
  initialBalanceCents: number;
  /** Variación del mes en céntimos. `null` cuando no hay con qué comparar. */
  variationCents: number | null;
  /** Porcentaje del mes. `null` cuando la base no permite calcularlo. */
  variationPercent: number | null;
  /** Patrimonio real al cierre de cada día con movimientos. */
  series: PatrimonioPoint[];
  /**
   * Cuando falta, no se muestra el pie con el saldo inicial.
   *
   * Modificar el saldo inicial es una acción de Mi Dinero (D-14): en Inicio
   * el bloque se reutiliza tal cual, pero sin esa acción.
   */
  onEditInitialBalance?: () => void;
};

function formatPercent(percent: number): string {
  return Math.abs(percent).toFixed(2).replace(".", ",");
}

/** Fecha corta para los extremos de la curva, sin el año. */
function shortDate(iso: string): string {
  return formatFullDate(iso).replace(/ de \d{4}$/, "");
}

export function MoneySummary({
  patrimonioCents,
  initialBalanceCents,
  variationCents,
  variationPercent,
  series,
  onEditInitialBalance,
}: MoneySummaryProps) {
  const hasVariation = variationCents !== null && variationCents !== 0;
  const positive = (variationCents ?? 0) > 0;
  const VariationIcon = positive ? TrendingUp : TrendingDown;

  const showChart = hasEnoughHistory(series);
  const first = series[0];
  const last = series[series.length - 1];

  return (
    <section className="overflow-hidden rounded-[var(--radius)] bg-surface">
      <div className="px-5 pt-6">
        <h2 className="text-[13px] font-medium tracking-[0.08em] text-text-secondary uppercase">
          Patrimonio actual
        </h2>

        <MoneyFigure
          formatted={formatEUR(patrimonioCents)}
          size="hero"
          className="mt-3"
        />

        <div className="mt-3 min-h-5">
          {hasVariation ? (
            <p
              className={`flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[13px] ${
                positive ? "text-income" : "text-expense"
              }`}
            >
              <VariationIcon size={ICON_SIZE.inline} strokeWidth={ICON_STROKE} aria-hidden="true" />
              <span className="font-medium tabular-nums">
                {formatSignedEUR(variationCents)}
                {variationPercent !== null
                  ? ` (${positive ? "+" : "−"}${formatPercent(variationPercent)} %)`
                  : ""}
              </span>
              <span className="text-text-secondary">este mes</span>
            </p>
          ) : null}
        </div>
      </div>

      {showChart ? (
        <div className={onEditInitialBalance ? "mt-5" : "mt-5 pb-4"}>
          <EvolutionChart
            values={series.map((point) => point.cents)}
            ariaLabel={`Evolución del patrimonio del ${formatFullDate(first.date)} al ${formatFullDate(last.date)}`}
          />
          <div className="mt-2 flex items-baseline justify-between px-5 text-[13px] text-muted-nontext">
            <span>{shortDate(first.date)}</span>
            <span>{shortDate(last.date)}</span>
          </div>
        </div>
      ) : (
        <p
          className={`px-5 text-[13px] text-text-secondary ${
            onEditInitialBalance ? "mt-5" : "mt-5 pb-6"
          }`}
        >
          Todavía no hay suficiente historial para dibujar tu evolución. Registra
          movimientos en más días y aparecerá aquí.
        </p>
      )}

      {onEditInitialBalance ? (
        <div className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border px-5 py-3">
          <span className="text-[13px] text-text-secondary">
            Saldo inicial{" "}
            <span className="text-text-primary tabular-nums">
              {formatEUR(initialBalanceCents)}
            </span>
          </span>
          <button
            type="button"
            onClick={onEditInitialBalance}
            className="-my-1 rounded-[var(--radius)] px-2 py-2 text-[13px] font-medium text-primary transition-colors duration-[var(--motion-fast)] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Modificar
          </button>
        </div>
      ) : null}
    </section>
  );
}
