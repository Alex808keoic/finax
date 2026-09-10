/*
 * Ficha de detalle del movimiento.
 *
 * Visual System §24.
 *
 * Contenido: tipo, nombre, importe, fecha (sin hora, D-18), categoría, Motivo
 * y Nota. Es el único lugar donde se muestra la Nota (D-05).
 *
 * El marcador mantiene la misma relación icono/contenedor y el mismo grosor
 * de trazo que la fila del historial, a mayor escala.
 *
 * Acciones: Editar y Eliminar. Eliminar exige confirmación (D-16).
 */

import { Button } from "../../components/ui/Button";
import { MoneyFigure } from "../../components/ui/MoneyFigure";
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

type MovementDetailProps = {
  movement: Movement;
  onEdit: () => void;
  onDelete: () => void;
};

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-3">
      <span className="shrink-0 text-[13px] text-text-secondary">{label}</span>
      <span className="text-right text-[16px] break-words">{value}</span>
    </div>
  );
}

export function MovementDetail({ movement, onEdit, onDelete }: MovementDetailProps) {
  const Icon = categoryIcon(movement.category);
  const isIncome = movement.type === "ingreso";

  return (
    <div>
      <div className="flex flex-col items-center pb-6 text-center">
        <span
          aria-hidden="true"
          className="mb-4 flex h-14 w-14 items-center justify-center rounded-[var(--radius)] bg-surface text-text-secondary"
        >
          <Icon size={ICON_SIZE.large} strokeWidth={ICON_STROKE} />
        </span>

        <p className="text-[13px] font-medium tracking-[0.08em] text-text-secondary uppercase">
          {isIncome ? "Ingreso" : "Gasto"}
        </p>

        <MoneyFigure
          formatted={formatSignedEUR(signedAmountCents(movement))}
          tone={isIncome ? "income" : "expense"}
          size="lg"
          className="mt-2"
        />

        <p className="mt-2 text-[16px] font-medium">{movementLabel(movement)}</p>
      </div>

      <div className="divide-y divide-border border-t border-border">
        <DetailRow label="Categoría" value={movement.category} />
        {requiresMotivo(movement.category) && movement.motivo ? (
          <DetailRow label="Motivo" value={movement.motivo} />
        ) : null}
        <DetailRow label="Fecha" value={formatFullDate(movement.date)} />
        {movement.nota ? <DetailRow label="Nota" value={movement.nota} /> : null}
      </div>

      <div className="mt-6 flex flex-col gap-2">
        <Button fullWidth onClick={onEdit}>
          Editar
        </Button>
        <Button variant="danger" fullWidth onClick={onDelete}>
          Eliminar
        </Button>
      </div>
    </div>
  );
}
