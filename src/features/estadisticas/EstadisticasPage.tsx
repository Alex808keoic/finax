/*
 * Estadísticas.
 *
 * «El módulo Estadísticas transformará los datos registrados en Mi Dinero en
 * información fácil de interpretar […] Cada gráfico deberá responder una
 * pregunta concreta» (Documento Maestro, Módulo 3 §1 y §2).
 *
 * Reparto con Mi Dinero (D-21): allí la lectura inmediata, aquí el análisis —
 * periodos, comparaciones y evolución detallada.
 *
 * Estructura del Visual System §19.2:
 *   1. cabecera
 *   2. selector de periodo
 *   3. resumen del periodo
 *   4. evolución del patrimonio
 *   5. ingresos vs gastos
 *   6. distribución por categorías, cuando D-03 esté aprobada
 *
 * UNA SOLA FUENTE DE VERDAD: los datos salen de `useFinancialOverview`, el
 * mismo hook que usan Inicio y Mi Dinero. Cambiar un movimiento cambia las
 * tres pantallas a la vez. Aquí solo se recorta por periodo y se agrega.
 *
 * NADA INVENTADO: sin puntos añadidos, sin proyecciones, sin gasto medio
 * (el Documento Maestro lo menciona pero no define su cálculo) y sin
 * distribución por categorías mientras D-03 siga abierta.
 */

import { useState } from "react";
import { BarChart3 } from "lucide-react";
import { AXISPrompt } from "../../components/ui/AXISPrompt";
import { ChartCard } from "../../components/ui/ChartCard";
import { ChartPlaceholder } from "../../components/ui/ChartPlaceholder";
import { DataErrorBoundary } from "../../components/ui/DataErrorBoundary";
import { EmptyState } from "../../components/ui/EmptyState";
import { EvolutionChart } from "../../components/ui/EvolutionChart";
import { FilterChip } from "../../components/ui/FilterChip";
import { LoadingState } from "../../components/ui/LoadingState";
import { MoneyFigure } from "../../components/ui/MoneyFigure";
import { PageHeader } from "../../components/ui/PageHeader";
import { SummaryMetric } from "../../components/ui/SummaryMetric";
import { useFinancialOverview } from "../../hooks/useFinancialOverview";
import { formatFullDate } from "../../lib/dates";
import { formatEUR, formatSignedEUR } from "../../lib/money";
import { ComparisonBars } from "./ComparisonBars";
import {
  availablePeriods,
  filterFrom,
  periodStartISO,
  seriesDeltaCents,
  summarizeRange,
  type Period,
  type PeriodId,
} from "./periods";

export function EstadisticasPage() {
  return (
    <DataErrorBoundary>
      <EstadisticasContent />
    </DataErrorBoundary>
  );
}

/** Fecha corta para los extremos de la curva, sin el año. */
function shortDate(iso: string): string {
  return formatFullDate(iso).replace(/ de \d{4}$/, "");
}

function EstadisticasContent() {
  const overview = useFinancialOverview();
  const [periodId, setPeriodId] = useState<PeriodId>("TODO");

  if (overview === undefined) {
    return <LoadingState />;
  }

  const { movements, patrimonioCents, series, isEmpty } = overview;

  // Los movimientos llegan del más reciente al más antiguo.
  const firstMovementDate = movements[movements.length - 1]?.date;
  const periods = availablePeriods(firstMovementDate);

  const selected: Period =
    periods.find((period) => period.id === periodId) ??
    periods[periods.length - 1] ?? { id: "TODO", label: "Todo", months: null };

  const startISO = periodStartISO(selected);
  const periodMovements = filterFrom(movements, startISO);
  const periodSeries = filterFrom(series, startISO);
  const summary = summarizeRange(periodMovements);
  const delta = seriesDeltaCents(periodSeries);

  const balanceTone =
    summary.balanceCents > 0
      ? "income"
      : summary.balanceCents < 0
        ? "expense"
        : "neutral";

  if (isEmpty) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-[560px] flex-col">
        <PageHeader title="Estadísticas" />
        <EmptyState
          icon={BarChart3}
          title="Todavía no hay nada que analizar"
          description="Registra tus primeros ingresos y gastos en Mi Dinero y aquí verás cómo evoluciona tu dinero."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-[560px] flex-col">
      <PageHeader title="Estadísticas" />

      <div className="flex flex-1 flex-col px-4 pb-8">
        {periods.length > 1 ? (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Periodo">
            {periods.map((period) => (
              <FilterChip
                key={period.id}
                label={period.label}
                selected={period.id === selected.id}
                onSelect={() => setPeriodId(period.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-text-secondary">
            Con el historial actual solo se puede analizar el periodo completo.
            Cuando pasen los meses podrás comparar periodos.
          </p>
        )}

        <section className="mt-6 rounded-[var(--radius)] bg-surface px-5 pt-6 pb-5">
          <h2 className="text-[13px] font-medium tracking-[0.08em] text-text-secondary uppercase">
            Patrimonio actual
          </h2>
          <MoneyFigure
            formatted={formatEUR(patrimonioCents)}
            size="lg"
            className="mt-2"
          />

          {summary.movementCount > 0 ? (
            <div className="mt-5 grid grid-cols-2 gap-2 border-t border-border pt-5 sm:grid-cols-3">
              <SummaryMetric
                label="Ingresos"
                value={formatSignedEUR(summary.incomeCents)}
                tone="income"
              />
              <SummaryMetric
                label="Gastos"
                value={formatSignedEUR(
                  summary.expenseCents === 0 ? 0 : -summary.expenseCents,
                )}
                tone="expense"
              />
              <div className="col-span-2 flex sm:col-span-1">
                <SummaryMetric
                  label="Balance"
                  value={formatSignedEUR(summary.balanceCents)}
                  tone={balanceTone}
                />
              </div>
            </div>
          ) : (
            <p className="mt-5 border-t border-border pt-5 text-[13px] text-text-secondary">
              No hay movimientos en este periodo.
            </p>
          )}
        </section>

        <div className="mt-6 flex flex-col gap-4">
          <ChartCard
            title="Evolución del patrimonio"
            reading={
              delta !== null
                ? `En este periodo tu patrimonio ha cambiado ${formatSignedEUR(delta)}.`
                : undefined
            }
          >
            {periodSeries.length >= 2 ? (
              <div>
                <EvolutionChart
                  values={periodSeries.map((point) => point.cents)}
                  size="detailed"
                  ariaLabel={`Evolución del patrimonio del ${formatFullDate(periodSeries[0].date)} al ${formatFullDate(periodSeries[periodSeries.length - 1].date)}`}
                />
                <div className="mt-2 flex items-baseline justify-between text-[13px] text-muted-nontext">
                  <span>{shortDate(periodSeries[0].date)}</span>
                  <span>{shortDate(periodSeries[periodSeries.length - 1].date)}</span>
                </div>
              </div>
            ) : (
              <ChartPlaceholder message="Sin datos suficientes" />
            )}
          </ChartCard>

          <ChartCard
            title="Ingresos y gastos"
            reading={
              summary.movementCount > 0
                ? `Balance del periodo: ${formatSignedEUR(summary.balanceCents)}.`
                : undefined
            }
          >
            {summary.movementCount > 0 ? (
              <ComparisonBars
                rows={[
                  {
                    label: "Ingresos",
                    magnitudeCents: summary.incomeCents,
                    valueLabel: formatSignedEUR(summary.incomeCents),
                    tone: "income",
                  },
                  {
                    label: "Gastos",
                    magnitudeCents: summary.expenseCents,
                    valueLabel: formatSignedEUR(
                      summary.expenseCents === 0 ? 0 : -summary.expenseCents,
                    ),
                    tone: "expense",
                  },
                ]}
              />
            ) : (
              <ChartPlaceholder message="Sin movimientos en este periodo" />
            )}
          </ChartCard>

          {/*
            Distribución por categorías. El Visual System §19.2 punto 5 y §30
            la condicionan a que D-03 esté aprobada, así que aquí solo va el
            contenedor: no se elige una paleta ni se dibuja un reparto con
            colores inventados.
          */}
          <ChartCard title="Gastos por categoría">
            <ChartPlaceholder message="Pendiente de la paleta de categorías" />
            <p className="mt-3 text-[13px] text-text-secondary">
              El desglose por categorías llegará cuando se apruebe la paleta
              categórica.
            </p>
          </ChartCard>
        </div>

        <AXISPrompt className="mt-12" />
      </div>
    </div>
  );
}
