/*
 * Fila del historial.
 *
 * Visual System §18.3.
 *
 * Marcador, nombre o Motivo, categoría cuando aporta información, e importe
 * con signo. El marcador mantiene siempre la misma relación entre icono y
 * contenedor: 20 px dentro de 44 px, con el grosor único de trazo.
 *
 * Reglas que respeta:
 * - la Nota NO aparece aquí: solo en la ficha de detalle (D-05);
 * - NO se muestra hora: el modelo guarda solo fecha (D-18);
 * - la fecha solo se muestra cuando la lista no está agrupada por día, para
 *   no repetir lo que ya dice el encabezado del grupo;
 * - el marcador es neutro, sin color por categoría, porque D-03 sigue abierta;
 * - ingresos y gastos se distinguen por signo Y color (D-17), nunca solo por
 *   color (§31);
 * - no aparece información de cuentas: Cuentas queda fuera de V1 (D-08).
 */

import { formatFullDate } from "../../lib/dates";
import { formatSignedEUR } from "../../lib/money";
import {
  movementLabel,
  requiresMotivo,
  signedAmountCents,
  type Movement,
} from "../../types/movement";
import { categoryIcon } from "./categoryIcons";
import { ICON_SIZE, ICON_STROKE } from "../../components/ui/icons";

type MovementRowProps = {
  movement: Movement;
  onSelect: (movement: Movement) => void;
  /** Solo para listas sin agrupación por día. */
  showDate?: boolean;
};

export function MovementRow({
  movement,
  onSelect,
  showDate = false,
}: MovementRowProps) {
  const Icon = categoryIcon(movement.category);
  const signed = signedAmountCents(movement);
  const isIncome = movement.type === "ingreso";

  // La categoría solo se repite bajo la etiqueta cuando el Motivo la ha
  // sustituido; en el resto de casos la etiqueta ya es la categoría.
  const category = requiresMotivo(movement.category) ? movement.category : null;
  const subtitle = [category, showDate ? formatFullDate(movement.date) : null]
    .filter(Boolean)
    .join(" · ");

  return (
    <button
      type="button"
      onClick={() => onSelect(movement)}
      className="group flex w-full items-center gap-3 rounded-[var(--radius)] px-2 py-2.5 text-left transition-colors duration-[var(--motion-fast)] hover:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
    >
      <span
        aria-hidden="true"
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius)] bg-surface text-text-secondary transition-colors duration-[var(--motion-fast)] group-hover:bg-background"
      >
        <Icon size={ICON_SIZE.control} strokeWidth={ICON_STROKE} />
      </span>

      <span className="min-w-0 flex-1">
        <span className="block truncate text-[16px] font-medium">
          {movementLabel(movement)}
        </span>
        {subtitle ? (
          <span className="mt-0.5 block truncate text-[13px] text-text-secondary">
            {subtitle}
          </span>
        ) : null}
      </span>

      <span
        className={`shrink-0 text-[16px] font-semibold tabular-nums ${
          isIncome ? "text-income" : "text-expense"
        }`}
      >
        {formatSignedEUR(signed)}
      </span>
    </button>
  );
}
