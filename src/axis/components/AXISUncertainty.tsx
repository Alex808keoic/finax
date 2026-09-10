/*
 * Qué vigilar: incertidumbre y nivel de confianza.
 *
 * «AXIS nunca ocultará la incertidumbre. Explicará qué información conoce, qué
 * aspectos son impredecibles y cuál considera la estrategia más coherente»
 * (`AXIS_FINAL` Parte II §10 y Parte VII §6).
 *
 * El nivel de confianza es cualitativo (alta / media / baja) y va acompañado
 * siempre de una explicación. Un porcentaje daría una falsa sensación de
 * precisión, y la Parte III §8 prohíbe presentar predicciones como certezas.
 *
 * El bloque solo se muestra cuando hay algo que explicar: ni se inventan
 * incertidumbres para parecer prudente, ni se ocultan cuando existen.
 */

import type { Confidence, Uncertainty } from "../analysis";
import { AXISLayer } from "./AXISLayer";

type AXISUncertaintyProps = {
  uncertainties: Uncertainty[];
  confidence: Confidence;
};

/** El nivel se comunica con palabra y con posición, nunca solo con color. */
const CONFIDENCE_TEXT: Record<Confidence, string> = {
  alta: "Confianza alta",
  media: "Confianza media",
  baja: "Confianza baja",
};

export function AXISUncertainty({
  uncertainties,
  confidence,
}: AXISUncertaintyProps) {
  if (uncertainties.length === 0) {
    return null;
  }

  return (
    <AXISLayer layer="incertidumbre" title="Qué vigilar">
      <ul className="flex flex-col gap-3">
        {uncertainties.map((uncertainty) => (
          <li key={uncertainty.title}>
            <h3 className="text-[16px] font-medium">{uncertainty.title}</h3>
            <p className="mt-1 text-[16px] text-text-secondary">
              {uncertainty.detail}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-4 border-t border-border pt-3 text-[13px] text-text-secondary">
        {CONFIDENCE_TEXT[confidence]}
      </p>
    </AXISLayer>
  );
}
