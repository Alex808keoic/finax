/*
 * Objetivos — tipos y origen de datos.
 *
 * ESTADO: el módulo de Objetivos NO tiene todavía modelo de datos ni
 * persistencia. Esta fase construye la pantalla, los componentes y los
 * estados; la implementación funcional es una fase aparte y no aprobada.
 *
 * Por eso `useObjectives` devuelve siempre una lista vacía: la pantalla
 * enseña su estado vacío en lugar de objetivos inventados (§14 del encargo y
 * Visual System §36).
 *
 * Cuando el módulo se apruebe funcionalmente, el tipo debe mudarse a
 * `src/types/` y la lectura a `src/db/`, igual que los movimientos. Se define
 * aquí de forma provisional porque esas dos carpetas no pueden tocarse.
 *
 * REGLAS DE PRODUCTO QUE TENDRÁ QUE RESPETAR LA IMPLEMENTACIÓN FUTURA
 * (Documento Maestro, Módulo 5):
 *   §6  el progreso se actualiza solo con los datos financieros reales;
 *   §9  los objetivos NUNCA modifican el patrimonio: solo lo interpretan;
 *   §11 no existen aportaciones manuales.
 *
 * Es decir: `currentCents` nunca será un importe que el usuario teclee.
 */

export type Objective = {
  id: string;
  name: string;
  /** Importe alcanzado, derivado de los datos financieros reales. */
  currentCents: number;
  /** Meta en céntimos (D-16). */
  targetCents: number;
  /** Fecha objetivo en formato `YYYY-MM-DD`, cuando exista. */
  targetDate?: string;
};

/** Progreso entre 0 y 1. Nunca extrapola por encima de la meta. */
export function objectiveProgress(objective: Objective): number {
  if (objective.targetCents <= 0) {
    return 0;
  }
  return Math.min(1, Math.max(0, objective.currentCents / objective.targetCents));
}

export function isCompleted(objective: Objective): boolean {
  return objective.targetCents > 0 && objective.currentCents >= objective.targetCents;
}

export type ObjectivesTotals = {
  count: number;
  savedCents: number;
  targetCents: number;
  progress: number;
};

export function summarizeObjectives(objectives: Objective[]): ObjectivesTotals {
  const savedCents = objectives.reduce(
    (total, objective) => total + Math.min(objective.currentCents, objective.targetCents),
    0,
  );
  const targetCents = objectives.reduce(
    (total, objective) => total + objective.targetCents,
    0,
  );

  return {
    count: objectives.length,
    savedCents,
    targetCents,
    progress: targetCents > 0 ? Math.min(1, savedCents / targetCents) : 0,
  };
}

/**
 * Origen de datos de objetivos.
 *
 * Hoy no hay persistencia, así que no hay objetivos. No devuelve ejemplos:
 * unos objetivos falsos con importes serían datos financieros inventados.
 */
export function useObjectives(): Objective[] {
  return [];
}
