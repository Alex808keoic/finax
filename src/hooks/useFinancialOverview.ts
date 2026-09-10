/*
 * Panorama financiero compartido.
 *
 * Inicio y Mi Dinero muestran el mismo patrimonio, la misma variación y la
 * misma evolución. Este hook centraliza esa derivación para que las dos
 * pantallas no puedan divergir: «Ningún dato mostrado en Inicio podrá diferir
 * del resto de módulos» (Documento Maestro, Módulo 2 §6 y §7).
 *
 * No calcula nada por su cuenta: compone funciones ya existentes. El
 * patrimonio se deriva, nunca se almacena.
 *
 * DEUDA CONOCIDA: `summary.ts` y `evolution.ts` viven en `features/midinero`
 * pero ya los usan dos pantallas. Su sitio natural es `src/lib/`, que
 * requiere aprobación para tocarse. Pendiente de mover.
 */

import { useLiveQuery } from "dexie-react-hooks";
import { getConfig } from "../db/config";
import { listMovements } from "../db/movements";
import { computePatrimonioCents } from "../lib/patrimonio";
import {
  buildPatrimonioSeries,
  type PatrimonioPoint,
} from "../features/midinero/evolution";
import {
  currentMonthKey,
  patrimonioBeforeMonth,
  summarizeMonth,
  type PeriodSummary,
} from "../features/midinero/summary";
import type { Movement } from "../types/movement";

export type FinancialOverview = {
  movements: Movement[];
  initialBalanceCents: number;
  patrimonioCents: number;
  summary: PeriodSummary;
  /** Variación del mes en céntimos. `null` cuando no hay con qué comparar. */
  variationCents: number | null;
  /** Porcentaje del mes. `null` cuando la base no permite calcularlo. */
  variationPercent: number | null;
  series: PatrimonioPoint[];
  /** Tono del balance según su signo (D-17). */
  balanceTone: "neutral" | "income" | "expense";
  hasPeriodData: boolean;
  isEmpty: boolean;
};

/** `undefined` mientras cargan los datos locales. */
export function useFinancialOverview(): FinancialOverview | undefined {
  const movements = useLiveQuery(listMovements, []);
  const config = useLiveQuery(getConfig, []);

  if (movements === undefined || config === undefined) {
    return undefined;
  }

  const initialBalanceCents = config?.initialBalanceCents ?? 0;
  const patrimonioCents = computePatrimonioCents(initialBalanceCents, movements);

  const monthKey = currentMonthKey();
  const summary = summarizeMonth(movements, monthKey);
  const baseCents = patrimonioBeforeMonth(initialBalanceCents, movements, monthKey);
  const hasPeriodData = summary.movementCount > 0;

  const variationCents = hasPeriodData ? patrimonioCents - baseCents : null;
  const variationPercent =
    variationCents !== null && baseCents > 0
      ? (variationCents / baseCents) * 100
      : null;

  const balanceTone =
    summary.balanceCents > 0
      ? "income"
      : summary.balanceCents < 0
        ? "expense"
        : "neutral";

  return {
    movements,
    initialBalanceCents,
    patrimonioCents,
    summary,
    variationCents,
    variationPercent,
    series: buildPatrimonioSeries(initialBalanceCents, movements),
    balanceTone,
    hasPeriodData,
    isEmpty: movements.length === 0,
  };
}
