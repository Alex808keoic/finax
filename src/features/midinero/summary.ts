/*
 * Resumen del periodo de Mi Dinero.
 *
 * Visual System §17.2 punto 4: «resumen del día/periodo».
 *
 * Deriva ingresos, gastos y balance del mes en curso a partir de los
 * movimientos ya guardados. No inventa nada: si no hay movimientos en el
 * periodo, no hay resumen.
 *
 * Vive en el módulo y no en `lib/` porque es lógica específica de esta
 * pantalla (TECH_STACK.md §23). Todo en céntimos enteros (D-16).
 */

import { todayISO } from "../../lib/dates";
import { signedAmountCents, type Movement } from "../../types/movement";

export type PeriodSummary = {
  incomeCents: number;
  /** Magnitud positiva del gasto. El signo lo pone la presentación. */
  expenseCents: number;
  balanceCents: number;
  movementCount: number;
};

/** Mes en curso en formato `YYYY-MM`. */
export function currentMonthKey(): string {
  return todayISO().slice(0, 7);
}

function isInMonth(movement: Movement, monthKey: string): boolean {
  return movement.date.startsWith(monthKey);
}

export function summarizeMonth(
  movements: Movement[],
  monthKey: string,
): PeriodSummary {
  let incomeCents = 0;
  let expenseCents = 0;
  let movementCount = 0;

  for (const movement of movements) {
    if (!isInMonth(movement, monthKey)) {
      continue;
    }
    movementCount++;
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
    movementCount,
  };
}

/**
 * Patrimonio al empezar el mes: saldo inicial más todo lo anterior al periodo.
 *
 * Sirve para expresar la variación con datos reales. No es una estimación.
 */
export function patrimonioBeforeMonth(
  initialBalanceCents: number,
  movements: Movement[],
  monthKey: string,
): number {
  return movements.reduce(
    (total, movement) =>
      movement.date < monthKey ? total + signedAmountCents(movement) : total,
    initialBalanceCents,
  );
}
