/*
 * Movimientos.
 *
 * Superficie SECUNDARIA de Mi Dinero, accesible mediante «Ver todos» (D-20).
 * No es una pestaña de la barra inferior y no debe parecer una sección
 * principal: por eso la cabecera es de tipo `bar` y con vuelta atrás.
 *
 * Estructura del Visual System §18.2:
 *   1. título `Movimientos`
 *   2. búsqueda
 *   3. filtros simples
 *   4. grupos por día
 *   5. filas de movimientos
 *   6. acción `Nuevo movimiento`
 *
 * MISMO HISTORIAL QUE MI DINERO, no una copia: los datos salen de
 * `useFinancialOverview`, y la lista, la fila y la ficha de detalle son los
 * mismos componentes. Aquí solo se añade la capa de búsqueda y filtrado, que
 * es lo único que esta superficie aporta.
 *
 * Estados del §18.4: sin movimientos (copy oficial §41.6) y sin resultados,
 * que es un estado propio y no el estado vacío general.
 *
 * Sin AXIS: Movimientos es una herramienta de consulta.
 */

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, SearchX } from "lucide-react";
import { BottomSheet } from "../../components/ui/BottomSheet";
import { Button } from "../../components/ui/Button";
import { ConfirmDialog } from "../../components/ui/ConfirmDialog";
import { DataErrorBoundary } from "../../components/ui/DataErrorBoundary";
import { EmptyState } from "../../components/ui/EmptyState";
import { controlClass } from "../../components/ui/Field";
import { FilterChip } from "../../components/ui/FilterChip";
import { ICON_SIZE, ICON_STROKE } from "../../components/ui/icons";
import { LoadingState } from "../../components/ui/LoadingState";
import { PageHeader } from "../../components/ui/PageHeader";
import { SearchField } from "../../components/ui/SearchField";
import { addMovement, deleteMovement, updateMovement } from "../../db/movements";
import { useFinancialOverview } from "../../hooks/useFinancialOverview";
import { MovementDetail } from "../midinero/MovementDetail";
import { MovementForm } from "../midinero/MovementForm";
import { MovementList } from "../midinero/MovementList";
import type { Category, Movement, MovementInput } from "../../types/movement";
import {
  availableCategories,
  filterMovements,
  NO_FILTERS,
  TYPE_FILTERS,
  type MovementFilters,
  type TypeFilter,
} from "./filters";

type Sheet = "new" | "edit" | "detail";

export function MovimientosPage() {
  return (
    <DataErrorBoundary>
      <MovimientosContent />
    </DataErrorBoundary>
  );
}

function MovimientosContent() {
  const navigate = useNavigate();
  const overview = useFinancialOverview();

  const [filters, setFilters] = useState<MovementFilters>(NO_FILTERS);
  const [sheet, setSheet] = useState<Sheet | null>(null);
  const [selected, setSelected] = useState<Movement | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const movements = overview?.movements;

  const categories = useMemo(
    () => availableCategories(movements ?? []),
    [movements],
  );

  const visible = useMemo(
    () => filterMovements(movements ?? [], filters),
    [movements, filters],
  );

  if (overview === undefined) {
    return <LoadingState />;
  }

  const { isEmpty } = overview;

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
    setConfirmingDelete(false);
    closeSheet();
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-[560px] flex-col">
      <PageHeader
        title="Movimientos"
        size="bar"
        onBack={() => navigate("/mi-dinero")}
      />

      <div className="flex flex-1 flex-col px-4 pb-8">
        {isEmpty ? (
          /*
           * Sin un solo movimiento no se muestran búsqueda ni filtros: serían
           * controles que no pueden hacer nada. La lista se encarga del estado
           * vacío oficial (§41.6) y aquí solo se le pasa su CTA.
           */
          <MovementList
            movements={[]}
            onSelect={openDetail}
            emptyAction={
              <Button fullWidth onClick={openNewMovement}>
                <Plus size={ICON_SIZE.control} strokeWidth={ICON_STROKE} aria-hidden="true" />
                Nuevo movimiento
              </Button>
            }
          />
        ) : (
          <>
            <SearchField
              id="buscar-movimientos"
              label="Buscar movimientos"
              placeholder="Buscar por categoría o motivo"
              value={filters.query}
              onChange={(query) => setFilters({ ...filters, query })}
            />

            <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Tipo">
              {TYPE_FILTERS.map(({ value, label }) => (
                <FilterChip
                  key={value}
                  label={label}
                  selected={filters.type === value}
                  onSelect={() =>
                    setFilters({ ...filters, type: value as TypeFilter })
                  }
                />
              ))}
            </div>

            {/*
              El selector de categoría solo aparece cuando hay más de una
              categoría en el historial: con una sola, elegir no cambia nada.
              Mismo criterio que los periodos de Estadísticas (D-23).
            */}
            {categories.length > 1 ? (
              <div className="mt-2">
                <label htmlFor="filtro-categoria" className="sr-only">
                  Categoría
                </label>
                <select
                  id="filtro-categoria"
                  value={filters.category ?? ""}
                  onChange={(event) =>
                    setFilters({
                      ...filters,
                      category: (event.target.value || null) as Category | null,
                    })
                  }
                  className={controlClass()}
                >
                  <option value="">Todas las categorías</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {/* Resultado anunciado a los lectores de pantalla, que no ven la lista cambiar. */}
            <p className="sr-only" role="status" aria-live="polite">
              {visible.length === 1
                ? "1 movimiento"
                : `${visible.length} movimientos`}
            </p>

            <div className="mt-6">
              {visible.length > 0 ? (
                <MovementList movements={visible} onSelect={openDetail} />
              ) : (
                /*
                 * Estado propio del §18.4: no reutiliza el estado vacío
                 * general, dice que ningún movimiento coincide y permite
                 * limpiar lo aplicado.
                 */
                <EmptyState
                  icon={SearchX}
                  title="No se encontraron movimientos"
                  description="Ningún movimiento coincide con la búsqueda o los filtros aplicados."
                  action={
                    <Button
                      variant="secondary"
                      fullWidth
                      onClick={() => setFilters(NO_FILTERS)}
                    >
                      Limpiar filtros
                    </Button>
                  }
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* Acción principal del §18.2, con la misma posición que en Mi Dinero. */}
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
            onDelete={() => setConfirmingDelete(true)}
          />
        ) : null}
      </BottomSheet>

      <ConfirmDialog
        open={confirmingDelete}
        title="Eliminar movimiento"
        description="Esta acción no se puede deshacer. El patrimonio se recalculará automáticamente."
        confirmLabel="Eliminar"
        destructive
        onConfirm={handleConfirmedDelete}
        onCancel={() => setConfirmingDelete(false)}
      />
    </div>
  );
}
