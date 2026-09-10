/*
 * Cálculo del patrimonio.
 *
 * El patrimonio NO se almacena: se calcula a partir del saldo inicial y de los
 * movimientos, de modo que cualquier alta, edición o borrado lo actualiza
 * automáticamente (Documento Maestro, Módulo 2 §7; Módulo 5 §9).
 *
 * En V1 el patrimonio es dinero líquido. Cuando exista el módulo de
 * Inversiones, el patrimonio total será la suma de líquido e invertido
 * (Documento Maestro, Módulo 4 §2 y §7).
 *
 * El resultado puede ser negativo: es un caso soportado (Módulo 2 §8).
 */

import type { Movement } from "../types/movement";
import { signedAmountCents } from "../types/movement";

export function computePatrimonioCents(
  initialBalanceCents: number,
  movements: Movement[],
): number {
  return movements.reduce(
    (total, movement) => total + signedAmountCents(movement),
    initialBalanceCents,
  );
}
