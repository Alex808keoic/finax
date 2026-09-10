/*
 * Recomendación principal.
 *
 * Es el bloque de mayor protagonismo después de la pregunta. El usuario debe
 * poder entender en segundos QUÉ hacer y, justo después, POR QUÉ.
 *
 * Reglas que respeta:
 * - toda recomendación va acompañada de su justificación: `why` es
 *   obligatorio en el tipo, no opcional (`AXIS_FINAL` Parte III §2);
 * - el impacto solo aparece cuando existe una estimación real; nunca se
 *   inventa una cifra (Parte III §8);
 * - una recomendación nunca debe parecer una orden (§22.5);
 * - sin tonos alarmistas ni tecnicismos innecesarios (Parte II §2).
 *
 * El componente no redacta nada: recibe el texto ya elaborado por AXIS.
 */

import type { Recommendation } from "../analysis";
import { AXISLayer } from "./AXISLayer";

type AXISRecommendationProps = {
  recommendation: Recommendation;
};

export function AXISRecommendation({ recommendation }: AXISRecommendationProps) {
  return (
    <AXISLayer layer="recomendacion" title={recommendation.what}>
      <div className="flex flex-col gap-4">
        <div>
          <h3 className="text-[13px] font-medium text-text-secondary">Por qué</h3>
          <p className="mt-1 text-[16px]">{recommendation.why}</p>
        </div>

        {recommendation.impact ? (
          <div>
            <h3 className="text-[13px] font-medium text-text-secondary">
              Impacto esperado
            </h3>
            <p className="mt-1 text-[16px]">{recommendation.impact}</p>
          </div>
        ) : null}
      </div>
    </AXISLayer>
  );
}
