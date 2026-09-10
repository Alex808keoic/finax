/*
 * Evolución del patrimonio.
 *
 * Visual System §17.2 punto 5 y §30; DECISIONES.md D-21.
 *
 * Cada punto es el patrimonio REAL al cierre de un día con movimientos:
 *
 *     saldo inicial + suma de los movimientos hasta esa fecha
 *
 * No se crean puntos falsos, no se inventa histórico y no se interpola para
 * aparentar más datos. Si el usuario solo ha registrado movimientos en dos
 * días, la serie tiene exactamente dos puntos.
 *
 * Tampoco se añade un punto inicial con el saldo de partida: no existe una
 * fecha financiera para él, y ponerle una sería inventarla.
 *
 * Vive en el módulo y no en `lib/` porque es lógica específica de esta
 * pantalla (TECH_STACK.md §23). Todo en céntimos enteros (D-16).
 */

import { signedAmountCents, type Movement } from "../../types/movement";

export type PatrimonioPoint = {
  /** Fecha del punto en formato `YYYY-MM-DD`. */
  date: string;
  /** Patrimonio al cierre de ese día, en céntimos. */
  cents: number;
};

/**
 * Puntos mínimos para que una evolución signifique algo.
 *
 * Con uno no hay evolución, y con dos solo hay una recta entre dos días, que
 * sugiere una tendencia que no se ha observado. A partir de tres días con
 * movimientos la curva ya describe un comportamiento real.
 */
export const MIN_EVOLUTION_POINTS = 3;

export function buildPatrimonioSeries(
  initialBalanceCents: number,
  movements: Movement[],
): PatrimonioPoint[] {
  const deltaByDate = new Map<string, number>();

  for (const movement of movements) {
    const previous = deltaByDate.get(movement.date) ?? 0;
    deltaByDate.set(movement.date, previous + signedAmountCents(movement));
  }

  const dates = [...deltaByDate.keys()].sort();

  let running = initialBalanceCents;
  return dates.map((date) => {
    running += deltaByDate.get(date) ?? 0;
    return { date, cents: running };
  });
}

export function hasEnoughHistory(series: PatrimonioPoint[]): boolean {
  return series.length >= MIN_EVOLUTION_POINTS;
}
