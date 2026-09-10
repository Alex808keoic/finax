/*
 * Objetivos.
 *
 * «El módulo Objetivos permitirá transformar metas financieras en planes
 * medibles» (Documento Maestro, Módulo 5 §1). Responde de un vistazo a: ¿qué
 * intento conseguir con mi dinero y cuánto me falta?
 *
 * Estructura del Visual System §21.2:
 *   1. cabecera con la acción de crear
 *   2. resumen del progreso, solo cuando existan objetivos
 *   3. lista de objetivos
 *   4. acción para crear objetivo
 *
 * ESTADO ACTUAL: no hay modelo de datos ni persistencia de objetivos, así que
 * la pantalla muestra su estado vacío. No se pintan objetivos de ejemplo:
 * serían datos financieros inventados (§36).
 *
 * Sin AXIS: el §11 del encargo y el Visual System §21 no piden presencia de
 * AXIS aquí, y sin datos no tendría ninguna función estratégica que cumplir.
 *
 * Prohibido por §21.3 y §35: imágenes, fotografías, medallas, trofeos,
 * niveles, rachas y cualquier gamificación.
 */

import { useState } from "react";
import { Plus, Target } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "../../components/ui/icons";
import { BottomSheet } from "../../components/ui/BottomSheet";
import { Button } from "../../components/ui/Button";
import { DataErrorBoundary } from "../../components/ui/DataErrorBoundary";
import { EmptyState } from "../../components/ui/EmptyState";
import { ObjectiveCard } from "../../components/ui/ObjectiveCard";
import { PageHeader } from "../../components/ui/PageHeader";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { SummaryMetric } from "../../components/ui/SummaryMetric";
import { formatFullDate } from "../../lib/dates";
import { formatEUR } from "../../lib/money";
import { ObjectiveForm } from "./ObjectiveForm";
import {
  isCompleted,
  objectiveProgress,
  summarizeObjectives,
  useObjectives,
} from "./objectives";

export function ObjetivosPage() {
  return (
    <DataErrorBoundary>
      <ObjetivosContent />
    </DataErrorBoundary>
  );
}

function ObjetivosContent() {
  const objectives = useObjectives();
  const [creating, setCreating] = useState(false);

  const totals = summarizeObjectives(objectives);
  const isEmpty = objectives.length === 0;

  return (
    <div className="mx-auto flex min-h-dvh max-w-[560px] flex-col">
      <PageHeader
        title="Objetivos"
        action={
          <button
            type="button"
            onClick={() => setCreating(true)}
            aria-label="Crear objetivo"
            className="-mr-2 flex h-[var(--touch-target-min)] w-[var(--touch-target-min)] items-center justify-center rounded-[var(--radius)] text-text-primary transition-colors duration-[var(--motion-fast)] hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <Plus size={ICON_SIZE.control} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </button>
        }
      />

      <div className="flex flex-1 flex-col px-4 pb-8">
        {/* Resumen general. Solo aparece cuando hay objetivos reales que
            resumir: sin datos no se enseñan porcentajes. */}
        {!isEmpty ? (
          <section className="rounded-[var(--radius)] bg-surface px-5 pt-6 pb-5">
            <h2 className="text-[13px] font-medium tracking-[0.08em] text-text-secondary uppercase">
              Progreso total
            </h2>

            <p className="mt-2 text-[32px] leading-none font-semibold tracking-tight tabular-nums">
              {Math.round(totals.progress * 100)} %
            </p>

            <div className="mt-4">
              <ProgressBar
                value={totals.progress}
                label="Progreso conjunto de tus objetivos"
              />
            </div>

            {/* Dos columnas en móvil: con tres, un importe como
                «14.550,00 €» no cabe a 360 px y se cortaría. */}
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
              <div className="col-span-2 flex sm:col-span-1">
                <SummaryMetric label="Objetivos" value={String(totals.count)} />
              </div>
              <SummaryMetric label="Ahorrado" value={formatEUR(totals.savedCents)} />
              <SummaryMetric label="Meta" value={formatEUR(totals.targetCents)} />
            </div>
          </section>
        ) : null}

        <section className={isEmpty ? "" : "mt-10"}>
          {isEmpty ? (
            <EmptyState
              icon={Target}
              title="Todavía no tienes objetivos"
              description="Crea una meta para empezar a seguir tu progreso."
              action={
                <Button fullWidth onClick={() => setCreating(true)}>
                  <Plus size={ICON_SIZE.control} strokeWidth={ICON_STROKE} aria-hidden="true" />
                  Crear objetivo
                </Button>
              }
            />
          ) : (
            <div className="flex flex-col gap-3">
              {objectives.map((objective) => (
                <ObjectiveCard
                  key={objective.id}
                  name={objective.name}
                  progress={objectiveProgress(objective)}
                  currentLabel={formatEUR(objective.currentCents)}
                  targetLabel={formatEUR(objective.targetCents)}
                  dateLabel={
                    objective.targetDate
                      ? formatFullDate(objective.targetDate)
                      : undefined
                  }
                  completed={isCompleted(objective)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {!isEmpty ? (
        <div className="sticky bottom-[calc(4rem+env(safe-area-inset-bottom))] border-t border-border bg-background px-4 pt-3 pb-3">
          <Button fullWidth onClick={() => setCreating(true)}>
            <Plus size={ICON_SIZE.control} strokeWidth={ICON_STROKE} aria-hidden="true" />
            Crear objetivo
          </Button>
        </div>
      ) : null}

      <BottomSheet
        open={creating}
        title="Nuevo objetivo"
        onClose={() => setCreating(false)}
      >
        <ObjectiveForm />
      </BottomSheet>
    </div>
  );
}
