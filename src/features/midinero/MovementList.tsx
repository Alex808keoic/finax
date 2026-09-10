/*
 * Historial agrupado por días.
 *
 * «El historial se agrupa por días porque así recuerdan las personas sus
 * gastos» (Documento Maestro, Módulo 2 §9).
 *
 * El estado vacío usa el copy literal del Visual System §41.6.
 */

import type { ReactNode } from "react";
import { Wallet } from "lucide-react";
import { formatDayHeading, groupByDay } from "../../lib/dates";
import { EmptyState } from "../../components/ui/EmptyState";
import { MovementRow } from "./MovementRow";
import type { Movement } from "../../types/movement";

type MovementListProps = {
  movements: Movement[];
  onSelect: (movement: Movement) => void;
  /** Acción principal del estado vacío. */
  emptyAction?: ReactNode;
};

export function MovementList({
  movements,
  onSelect,
  emptyAction,
}: MovementListProps) {
  if (movements.length === 0) {
    return (
      <EmptyState
        icon={Wallet}
        title="Todavía no tienes movimientos"
        description="Añade tu primer ingreso o gasto para empezar a ver tu patrimonio."
        action={emptyAction}
      />
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {groupByDay(movements).map((group) => (
        <section key={group.date}>
          <h3 className="mb-1.5 px-2 text-[13px] font-medium text-text-secondary">
            {formatDayHeading(group.date)}
          </h3>
          <div className="flex flex-col gap-0.5">
            {group.items.map((movement) => (
              <MovementRow
                key={movement.id}
                movement={movement}
                onSelect={onSelect}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
