/*
 * Conclusión y siguiente paso.
 *
 * La conclusión SIEMPRE existe, haya recomendación o no. Cuando AXIS concluye
 * que no hace falta actuar, ese mensaje ocupa este mismo lugar y recibe el
 * mismo tratamiento visual: «Debe verse como una conclusión válida, no como un
 * estado vacío» (§22.3), y «la ausencia de una nueva acción también es
 * información útil» (`AXIS_FINAL` Parte XIII §16).
 *
 * El siguiente paso es opcional y NUNCA se ejecuta solo. Cuando apunta a una
 * pantalla de Finax se representa con `NavRow`, el mismo patrón de navegación
 * del resto de la aplicación; cuando la acción es esperar o no hacer nada, no
 * hay control que pulsar. AXIS puede recomendar, no operar (`AXIS_FINAL`
 * Parte XIV §10 y §16).
 */

import { ArrowRight } from "lucide-react";
import { NavRow } from "../../components/ui/NavRow";
import type { NextAction } from "../analysis";

type AXISNextActionProps = {
  conclusion: string;
  nextAction?: NextAction;
};

export function AXISNextAction({ conclusion, nextAction }: AXISNextActionProps) {
  return (
    <section className="rounded-[var(--radius)] bg-surface p-4">
      <p className="text-[13px] font-medium tracking-[0.08em] text-text-secondary uppercase">
        Conclusión
      </p>
      <p className="mt-2 text-[16px]">{conclusion}</p>

      {nextAction ? (
        <div className="mt-4">
          <p className="mb-2 text-[13px] font-medium text-text-secondary">
            Siguiente paso
          </p>

          {nextAction.to ? (
            <NavRow
              to={nextAction.to}
              label={nextAction.label}
              icon={ArrowRight}
              description={nextAction.description}
            />
          ) : (
            /* Esperar o no hacer nada también es un siguiente paso: se explica,
               pero no se convierte en un botón que no lleva a ningún sitio. */
            <div className="rounded-[var(--radius)] border border-border bg-background px-3 py-3">
              <p className="text-[16px] font-medium">{nextAction.label}</p>
              {nextAction.description ? (
                <p className="mt-1 text-[13px] text-text-secondary">
                  {nextAction.description}
                </p>
              ) : null}
            </div>
          )}
        </div>
      ) : null}
    </section>
  );
}
