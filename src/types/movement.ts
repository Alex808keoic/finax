/*
 * Modelo de movimiento.
 *
 * Categorías: Documento Maestro Módulo 2 §5, DECISIONES.md D-04 (gasto) y D-13 (ingreso).
 * Las dos listas son independientes y no deben mezclarse.
 *
 * Importes: enteros en céntimos (D-16). Nunca usar coma flotante para dinero.
 */

export type MovementType = "ingreso" | "gasto";

export const EXPENSE_CATEGORIES = [
  "Comida",
  "Restaurantes",
  "Salidas",
  "Caprichos",
  "Ropa",
  "Otros",
] as const;

export const INCOME_CATEGORIES = ["Trabajo", "Regalos", "Otros"] as const;

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number];
export type IncomeCategory = (typeof INCOME_CATEGORIES)[number];
export type Category = ExpenseCategory | IncomeCategory;

/** Categoría que obliga a introducir un motivo, en ingresos y en gastos (D-04, D-13). */
export const CATEGORY_OTROS = "Otros";

export function categoriesFor(type: MovementType): readonly Category[] {
  return type === "gasto" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
}

export function requiresMotivo(category: string): boolean {
  return category === CATEGORY_OTROS;
}

export type Movement = {
  id: string;
  type: MovementType;
  /** Magnitud en céntimos, siempre positiva. El signo lo determina `type`. */
  amountCents: number;
  /** Fecha local en formato YYYY-MM-DD. Sin hora: el historial se agrupa por días. */
  date: string;
  category: Category;
  /** Obligatorio cuando la categoría es «Otros». Sustituye a «Otros» en el historial. */
  motivo?: string;
  /**
   * Opcional, disponible en todas las categorías (D-05).
   * Solo se muestra en la ficha de detalle y nunca en el historial.
   * No forma parte del contexto que se envía automáticamente a AXIS.
   */
  nota?: string;
  createdAt: number;
  updatedAt: number;
};

/** Datos que el usuario introduce; el resto los genera la capa de datos. */
export type MovementInput = Omit<Movement, "id" | "createdAt" | "updatedAt">;

/**
 * Etiqueta del movimiento en el historial.
 * Cuando la categoría es «Otros», el motivo la sustituye
 * (Documento Maestro, Módulo 2 §5).
 */
export function movementLabel(movement: Movement): string {
  if (requiresMotivo(movement.category) && movement.motivo) {
    return movement.motivo;
  }
  return movement.category;
}

/** Aportación del movimiento al patrimonio, con signo, en céntimos. */
export function signedAmountCents(movement: Movement): number {
  return movement.type === "ingreso" ? movement.amountCents : -movement.amountCents;
}
