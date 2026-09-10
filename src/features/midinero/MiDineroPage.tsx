/*
 * Mi Dinero.
 *
 * Estructura del Visual System §17.2:
 *   1. cabecera
 *   2. tarjeta de patrimonio
 *   3. saldo inicial y `Modificar`   → dentro de la tarjeta de patrimonio
 *   4. resumen del periodo
 *   5. evolución del patrimonio      → ver nota sobre D-06
 *   6. últimos movimientos
 *   7. accesos: `Ver todos` y `Ver estadísticas`
 *   8. acción `Nuevo movimiento`
 *
 * SOBRE EL PUNTO 5: la evolución del patrimonio vive DENTRO del bloque de
 * patrimonio, no en una tarjeta aparte (D-21). El análisis detallado y los
 * gráficos por categoría corresponden a Estadísticas. Aquí no hay nada por
 * categoría: D-03 sigue abierta.
 *
 * SOBRE EL PUNTO 6: la lista muestra el historial completo, no solo los
 * últimos. Recortarla antes de que Movimientos exista dejaría parte del
 * historial inaccesible. Se recortará cuando esa superficie esté implementada.
 *
 * Toda modificación recalcula el patrimonio automáticamente porque el
 * patrimonio se deriva de los datos y `useLiveQuery` reacciona a cualquier
 * cambio en Dexie (Documento Maestro, Módulo 2 §7).
 */

import { useState } from "react";
import { ChartPie } from "lucide-react";
import { Plus } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "../../components/ui/icons";
import { Button } from "../../components/ui/Button";
import { BottomSheet } from "../../components/ui/BottomSheet";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { DataErrorBoundary } from "../../components/ui/DataErrorBoundary";
import { LoadingState } from "../../components/ui/LoadingState";
import { NavRow } from "../../components/ui/NavRow";
import { PageHeader } from "../../components/ui/PageHeader";
import { SummaryMetric } from "../../components/ui/SummaryMetric";
import { Link } from "react-router-dom";
import { setInitialBalance } from "../../db/config";
import { addMovement, deleteMovement, updateMovement } from "../../db/movements";
import { useFinancialOverview } from "../../hooks/useFinancialOverview";
import { formatEUR, formatSignedEUR } from "../../lib/money";
import type { Movement, MovementInput } from "../../types/movement";
import { InitialBalanceForm } from "./InitialBalanceForm";
import { MoneySummary } from "./MoneySummary";
import { MovementDetail } from "./MovementDetail";
import { MovementForm } from "./MovementForm";
import { MovementList } from "./MovementList";

type Sheet = "new" | "edit" | "detail" | "balance";
type Confirmation = { kind: "delete" } | { kind: "balance"; cents: number };

export function MiDineroPage() {
  return (
    <DataErrorBoundary>
      <MiDineroContent />
    </DataErrorBoundary>
  );
}

function MiDineroContent() {
  const overview = useFinancialOverview();

  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [selected, setSelected] = useState<Movement | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);

  if (overview === undefined) {
    return <LoadingState />;
  }

  const {
    movements,
    initialBalanceCents,
    patrimonioCents,
    summary,
    variationCents,
    variationPercent,
    series,
    balanceTone,
    hasPeriodData,
    isEmpty,
  } = overview;

  function closeSheet() {
    setSheet(null);
    setSelected(null);
  }

  function openDetail(movement: Movement) {
    setSelected(movement);
    setSheet("detail");
  }

  function openNewMovement() {
    setSelected(null);
    setSheet("new");
  }

  async function handleCreate(input: MovementInput) {
    await addMovement(input);
    closeSheet();
  }

  async function handleUpdate(input: MovementInput) {
    if (!selected) {
      return;
    }
    await updateMovement(selected.id, input);
    closeSheet();
  }

  async function handleConfirmedDelete() {
    if (!selected) {
      return;
    }
    await deleteMovement(selected.id);
    setConfirmation(null);
    closeSheet();
  }

  async function handleConfirmedBalance(cents: number) {
    await setInitialBalance(cents);
    setConfirmation(null);
    closeSheet();
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-[560px] flex-col">
      <PageHeader title="Mi Dinero" />

      <div className="flex flex-1 flex-col px-4 pb-8">
        <MoneySummary
          patrimonioCents={patrimonioCents}
          initialBalanceCents={initialBalanceCents}
          variationCents={variationCents}
          variationPercent={variationPercent}
          series={series}
          onEditInitialBalance={() => setSheet("balance")}
        />

        {hasPeriodData ? (
          <section className="mt-6">
            <h2 className="mb-2 px-1 text-[13px] font-medium text-text-secondary">
              Este mes
            </h2>
            {/*
              Dos columnas en móvil y tres desde tablet, igual que en el resto
              de pantallas: con tres columnas a 360 px un importe de cinco
              cifras se cortaría.
            */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <SummaryMetric
                label="Ingresos"
                value={formatSignedEUR(summary.incomeCents)}
                tone="income"
              />
              <SummaryMetric
                label="Gastos"
                // Sin gastos el importe es cero, no «menos cero».
                value={formatSignedEUR(
                  summary.expenseCents === 0 ? 0 : -summary.expenseCents,
                )}
                tone="expense"
              />
              <div className="col-span-2 flex sm:col-span-1">
                <SummaryMetric
                  label="Balance"
                  value={formatSignedEUR(summary.balanceCents)}
                  // El balance toma el tono de su signo; neutro cuando es cero.
                  tone={balanceTone}
                />
              </div>
            </div>
          </section>
        ) : null}

        <section className="mt-10">
          <div className="mb-3 flex items-baseline justify-between gap-4 px-2">
            <h2 className="text-[20px] font-semibold tracking-tight">Movimientos</h2>
            {!isEmpty ? (
              <Link
                to="/movimientos"
                className="rounded-[var(--radius)] text-[13px] font-medium text-primary transition-colors duration-[var(--motion-fast)] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Ver todos
              </Link>
            ) : null}
          </div>

          <MovementList
            movements={movements}
            onSelect={openDetail}
            emptyAction={
              <Button fullWidth onClick={openNewMovement}>
                <Plus size={ICON_SIZE.control} strokeWidth={ICON_STROKE} aria-hidden="true" />
                Nuevo movimiento
              </Button>
            }
          />
        </section>

        <div className="mt-10">
          <NavRow to="/estadisticas" label="Ver estadísticas" icon={ChartPie} />
        </div>
      </div>

      {/*
        La acción principal queda fijada justo por encima de la navegación
        inferior, que mide 64 px más la safe area. Así ninguna de las dos
        barras tapa a la otra ni al contenido.
      */}
      {!isEmpty ? (
        <div className="sticky bottom-[calc(4rem+env(safe-area-inset-bottom))] border-t border-border bg-background px-4 pt-3 pb-3">
          <Button fullWidth onClick={openNewMovement}>
            <Plus size={ICON_SIZE.control} strokeWidth={ICON_STROKE} aria-hidden="true" />
            Nuevo movimiento
          </Button>
        </div>
      ) : null}

      <BottomSheet
        open={sheet === "new"}
        title="Nuevo movimiento"
        onClose={closeSheet}
      >
        <MovementForm submitLabel="Guardar movimiento" onSubmit={handleCreate} />
      </BottomSheet>

      <BottomSheet
        open={sheet === "edit" && selected !== null}
        title="Editar movimiento"
        onClose={closeSheet}
      >
        {selected ? (
          <MovementForm
            initial={selected}
            submitLabel="Guardar cambios"
            onSubmit={handleUpdate}
          />
        ) : null}
      </BottomSheet>

      <BottomSheet
        open={sheet === "detail" && selected !== null}
        title="Detalle"
        onClose={closeSheet}
      >
        {selected ? (
          <MovementDetail
            movement={selected}
            onEdit={() => setSheet("edit")}
            onDelete={() => setConfirmation({ kind: "delete" })}
          />
        ) : null}
      </BottomSheet>

      <BottomSheet
        open={sheet === "balance"}
        title="Modificar saldo inicial"
        onClose={closeSheet}
      >
        <InitialBalanceForm
          initialCents={initialBalanceCents}
          submitLabel="Guardar"
          onSubmit={async (cents) => setConfirmation({ kind: "balance", cents })}
        />
      </BottomSheet>

      <ConfirmDialog
        open={confirmation?.kind === "delete"}
        title="Eliminar movimiento"
        description="Esta acción no se puede deshacer. El patrimonio se recalculará automáticamente."
        confirmLabel="Eliminar"
        destructive
        onConfirm={handleConfirmedDelete}
        onCancel={() => setConfirmation(null)}
      />

      <ConfirmDialog
        open={confirmation?.kind === "balance"}
        title="Modificar saldo inicial"
        description={
          confirmation?.kind === "balance"
            ? `El saldo inicial pasará a ser ${formatEUR(confirmation.cents)} y el patrimonio se recalculará automáticamente.`
            : ""
        }
        confirmLabel="Modificar"
        onConfirm={() => {
          if (confirmation?.kind === "balance") {
            void handleConfirmedBalance(confirmation.cents);
          }
        }}
        onCancel={() => setConfirmation(null)}
      />
    </div>
  );
}
