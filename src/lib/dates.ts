/*
 * Fechas.
 *
 * Las fechas se guardan como YYYY-MM-DD en hora local y sin componente horario:
 * el historial se agrupa por días (Documento Maestro, Módulo 2 §4 y §9) y así se
 * evita que un cambio de zona horaria mueva un movimiento de día.
 */

const longDateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function todayISO(): string {
  return toISODate(new Date());
}

function shiftedTodayISO(days: number): string {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return toISODate(date);
}

export function isValidISODate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false;
  }
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

/** Encabezado del grupo de un día en el historial. */
export function formatDayHeading(iso: string): string {
  if (iso === todayISO()) {
    return "Hoy";
  }
  if (iso === shiftedTodayISO(-1)) {
    return "Ayer";
  }
  const [year, month, day] = iso.split("-").map(Number);
  return longDateFormatter.format(new Date(year, month - 1, day));
}

/** Fecha completa para la ficha de detalle. */
export function formatFullDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  return longDateFormatter.format(new Date(year, month - 1, day));
}

export type DayGroup<T> = {
  date: string;
  items: T[];
};

/**
 * Agrupa por día, de más reciente a más antiguo.
 * Dentro de cada día se respeta el orden recibido.
 */
export function groupByDay<T extends { date: string }>(items: T[]): DayGroup<T>[] {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const group = groups.get(item.date);
    if (group) {
      group.push(item);
    } else {
      groups.set(item.date, [item]);
    }
  }

  return [...groups.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([date, groupItems]) => ({ date, items: groupItems }));
}
