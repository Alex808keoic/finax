/*
 * Inversiones — tipos y origen de datos.
 *
 * ESTADO: el módulo NO tiene todavía modelo de datos, ni persistencia, ni la
 * API financiera que el Documento Maestro (Módulo 4 §5 y §6) da por supuesta.
 * Esta fase construye la pantalla, los componentes y los estados.
 *
 * Por eso `useInvestments` devuelve siempre una lista vacía: la pantalla
 * enseña su estado vacío en lugar de posiciones inventadas (Visual System §36
 * y §20.3: «no inventar datos de mercado»).
 *
 * Cuando el módulo se apruebe funcionalmente, el tipo debe mudarse a
 * `src/types/` y la lectura a `src/db/`. Se define aquí de forma provisional
 * porque esas dos carpetas no pueden tocarse.
 *
 * LO QUE NO SE CALCULA AQUÍ, A PROPÓSITO
 *
 * La **rentabilidad**. El Documento Maestro §6 dice que Finax «recalculará la
 * rentabilidad obtenida», pero NO define su fórmula: ni si es absoluta o
 * porcentual, ni si pondera el tiempo, ni cómo trata varias compras del mismo
 * activo (§10 lo menciona como caso límite sin resolverlo). Elegir una
 * fórmula sería inventar una regla financiera.
 *
 * El **peso relativo** sí se calcula: es la fracción del valor de una posición
 * sobre el total invertido, y eso no admite interpretación (§20.2 punto 6).
 */

export type Position = {
  id: string;
  /** Nombre del activo. */
  name: string;
  /** Valor actual de la posición en céntimos (D-16). */
  valueCents: number;
  /** Participaciones, cuando el modelo las proporcione. */
  shares?: number;
};

/** Peso de una posición sobre el total invertido, entre 0 y 1. */
export function positionWeight(position: Position, totalCents: number): number {
  if (totalCents <= 0) {
    return 0;
  }
  return Math.min(1, Math.max(0, position.valueCents / totalCents));
}

export function totalInvestedCents(positions: Position[]): number {
  return positions.reduce((total, position) => total + position.valueCents, 0);
}

/**
 * Origen de datos de inversiones.
 *
 * Hoy no hay persistencia, así que no hay posiciones. No devuelve ejemplos:
 * unos activos falsos con valores de mercado serían datos inventados.
 */
export function useInvestments(): Position[] {
  return [];
}
