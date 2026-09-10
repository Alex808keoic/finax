/*
 * Búsqueda y filtros del historial.
 *
 * Visual System §18.2 (búsqueda y «filtros simples») y §26, que limita los
 * controles posibles a tipo, categoría, fecha/periodo y orden, «únicamente
 * cuando el contexto los necesite».
 *
 * ALCANCE DELIBERADAMENTE CORTO. El Documento Maestro (Módulo 2 §10) sitúa los
 * «filtros avanzados» y las «etiquetas personalizadas» en mejoras futuras, no
 * en V1, y el §26 prohíbe convertir los filtros simples en una pantalla de
 * configuración. Por eso aquí solo hay tipo y categoría: ni rangos de fechas,
 * ni rangos de importe, ni orden configurable, ni cuentas (D-08).
 *
 * QUÉ SE BUSCA: categoría y Motivo, es decir, exactamente el texto que el
 * historial muestra. La Nota NO se busca: solo existe en la ficha de detalle
 * (D-05, §18.3), y buscar dentro de ella devolvería resultados que el usuario
 * no puede ver en la lista.
 *
 * Lógica pura, sin React y sin Dexie: se puede probar aisladamente.
 */

import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  type Category,
  type Movement,
  type MovementType,
} from "../../types/movement";

export type TypeFilter = "todos" | MovementType;

export type MovementFilters = {
  query: string;
  type: TypeFilter;
  /** `null` = todas las categorías. */
  category: Category | null;
};

export const NO_FILTERS: MovementFilters = {
  query: "",
  type: "todos",
  category: null,
};

/** El orden es el mismo que el del formulario (§23.1) y el de los resúmenes. */
export const TYPE_FILTERS: { value: TypeFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "ingreso", label: "Ingresos" },
  { value: "gasto", label: "Gastos" },
];

/**
 * Minúsculas y sin acentos, para que «cafe» encuentre «Café».
 * Escribir con acentos en un móvil es más lento que escribir sin ellos.
 */
export function normalizeText(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
}

/** Coincide si el texto aparece en la categoría o en el Motivo. */
export function matchesQuery(movement: Movement, query: string): boolean {
  const needle = normalizeText(query.trim());

  if (needle === "") {
    return true;
  }

  return [movement.category, movement.motivo]
    .filter((field): field is string => Boolean(field))
    .some((field) => normalizeText(field).includes(needle));
}

/**
 * Aplica los tres filtros. Conserva el orden recibido, que ya viene del más
 * reciente al más antiguo desde la capa de datos.
 */
export function filterMovements(
  movements: Movement[],
  filters: MovementFilters,
): Movement[] {
  return movements.filter((movement) => {
    if (filters.type !== "todos" && movement.type !== filters.type) {
      return false;
    }
    if (filters.category !== null && movement.category !== filters.category) {
      return false;
    }
    return matchesQuery(movement, filters.query);
  });
}

/**
 * Categorías que existen de verdad en el historial, en el orden canónico.
 *
 * Mismo criterio que el selector de periodos de Estadísticas (D-23): no se
 * ofrece una opción que no puede cambiar nada. Filtrar por «Ropa» sin ningún
 * movimiento de Ropa sería fingir una elección.
 *
 * «Otros» aparece en las dos listas de categorías y aquí una sola vez: es la
 * misma categoría, y filtrar por ella incluye ingresos y gastos.
 */
export function availableCategories(movements: Movement[]): Category[] {
  const present = new Set<string>(movements.map((movement) => movement.category));
  const canonical: readonly Category[] = [
    ...EXPENSE_CATEGORIES,
    ...INCOME_CATEGORIES,
  ];

  const seen = new Set<string>();

  return canonical.filter((category) => {
    if (!present.has(category) || seen.has(category)) {
      return false;
    }
    seen.add(category);
    return true;
  });
}
