/*
 * Periodos de análisis de Estadísticas.
 *
 * Visual System §19.2 punto 2 y D-21: Estadísticas es la pantalla de análisis,
 * y el periodo es su control principal.
 *
 * Todo lo de aquí es derivación de presentación específica de esta pantalla y
 * vive en su módulo. Los cálculos financieros de base siguen en `lib/` y se
 * consumen a través de `useFinancialOverview`, para que Inicio, Mi Dinero y
 * Estadísticas no puedan divergir.
 *
 * REGLA IMPORTANTE: solo se ofrecen los periodos que de verdad cambian lo que
 * se ve. Enseñar 1M, 3M, 6M y 1A cuando todo el historial cabe en dos semanas
 * sería fingir una elección que no existe.
 */

import { signedAmountCents, type Movement } from "../../types/movement";

export type PeriodId = "1M" | "3M" | "6M" | "1A" | "TODO";

export type Period = {
  id: PeriodId;
  label: string;
  /** Meses hacia atrás. `null` para todo el historial. */
  months: number | null;
};

export const PERIODS: Period[] = [
  { id: "1M", label: "1M", months: 1 },
  { id: "3M", label: "3M", months: 3 },
  { id: "6M", label: "6M", months: 6 },
  { id: "1A", label: "1A", months: 12 },
  { id: "TODO", label: "Todo", months: null },
];

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

/** Fecha de inicio del periodo. `null` cuando abarca todo el historial. */
export function periodStartISO(period: Period, today: Date = new Date()): string | null {
  if (period.months === null) {
    return null;
  }

  const start = new Date(today.getFullYear(), today.getMonth() - period.months, today.getDate());
  return toISODate(start);
}

/**
 * Periodos que merece la pena ofrecer.
 *
 * «Todo» siempre que haya datos, y además cada periodo cuyo inicio recorte el
 * historial de verdad. Si un periodo empieza antes del primer movimiento,
 * enseñaría exactamente lo mismo que «Todo» y no se ofrece.
 */
export function availablePeriods(
  firstMovementDate: string | undefined,
  today: Date = new Date(),
): Period[] {
  if (!firstMovementDate) {
    return [];
  }

  const cropping = PERIODS.filter((period) => {
    const start = periodStartISO(period, today);
    return start !== null && start > firstMovementDate;
  });

  const all = PERIODS.find((period) => period.months === null);
  return all ? [...cropping, all] : cropping;
}

export function filterFrom<T extends { date: string }>(
  items: T[],
  startISO: string | null,
): T[] {
  if (startISO === null) {
    return items;
  }
  return items.filter((item) => item.date >= startISO);
}

export type RangeSummary = {
  incomeCents: number;
  /** Magnitud positiva del gasto. El signo lo pone la presentación. */
  expenseCents: number;
  balanceCents: number;
  movementCount: number;
};

export function summarizeRange(movements: Movement[]): RangeSummary {
  let incomeCents = 0;
  let expenseCents = 0;

  for (const movement of movements) {
    if (movement.type === "ingreso") {
      incomeCents += movement.amountCents;
    } else {
      expenseCents += movement.amountCents;
    }
  }

  return {
    incomeCents,
    expenseCents,
    balanceCents: incomeCents - expenseCents,
    movementCount: movements.length,
  };
}

/** Variación real del patrimonio dentro de la serie recortada al periodo. */
export function seriesDeltaCents(series: { cents: number }[]): number | null {
  if (series.length < 2) {
    return null;
  }
  return series[series.length - 1].cents - series[0].cents;
}

/** Aportación con signo, reexportada para no duplicar la regla. */
export { signedAmountCents };
