/*
 * Alternativas consideradas.
 *
 * «AXIS no genera una única solución. Siempre que sea posible construye varias
 * alternativas» (`AXIS_FINAL` Parte VII §4), y al comunicar la estrategia
 * explica «qué alternativas consideró» (Parte IX §14).
 *
 * Cada alternativa dice tres cosas: cómo se llama, en qué consiste y en qué se
 * diferencia de la opción principal. La diferencia es lo que convierte una
 * lista de opciones en una comparación útil.
 *
 * Van DESPUÉS de la recomendación, no antes: primero qué conviene hacer y por
 * qué, después qué otras opciones existían (D-26).
 */

import type { Alternative } from "../analysis";
import { AXISLayer } from "./AXISLayer";

type AXISAlternativesProps = {
  alternatives: Alternative[];
};

export function AXISAlternatives({ alternatives }: AXISAlternativesProps) {
  if (alternatives.length === 0) {
    return null;
  }

  return (
    <AXISLayer layer="interpretacion" title="Alternativas">
      <ul className="flex flex-col gap-4">
        {alternatives.map((alternative) => (
          <li key={alternative.name}>
            <h3 className="text-[16px] font-medium">{alternative.name}</h3>
            <p className="mt-1 text-[16px] text-text-secondary">
              {alternative.summary}
            </p>
            <p className="mt-1 text-[13px] text-text-secondary">
              <span className="font-medium">Diferencia: </span>
              {alternative.difference}
            </p>
          </li>
        ))}
      </ul>
    </AXISLayer>
  );
}
