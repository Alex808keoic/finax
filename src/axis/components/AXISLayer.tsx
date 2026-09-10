/*
 * Capa de razonamiento de AXIS.
 *
 * Visual System §22.6: «separar dato / interpretación / recomendación /
 * incertidumbre». Este componente existe para que esa separación sea
 * imposible de perder: todo bloque del análisis se envuelve en una capa y
 * declara a cuál pertenece.
 *
 * Las tres capas se distinguen por TRES señales, no por color:
 *   1. una etiqueta de texto explícita («DATOS», «INTERPRETACIÓN»…);
 *   2. un tratamiento de superficie distinto;
 *   3. un peso tipográfico distinto en el contenido.
 *
 * El §31 exige que el color nunca sea la única señal, y aquí además sería
 * insuficiente: el primario sobre fondo claro no alcanza el contraste mínimo
 * para texto, así que las etiquetas no lo usan como color de texto.
 *
 * La capa `recomendacion` es la única con una barra de acento, porque es la
 * que el usuario debe poder encontrar de un vistazo (§12 del encargo).
 */

import type { ReactNode } from "react";

export type Layer = "datos" | "interpretacion" | "recomendacion" | "incertidumbre";

type AXISLayerProps = {
  layer: Layer;
  /** Título del bloque. La etiqueta de capa se añade sola. */
  title: string;
  children: ReactNode;
};

const LABELS: Record<Layer, string> = {
  datos: "Datos",
  interpretacion: "Interpretación",
  recomendacion: "Recomendación",
  incertidumbre: "Incertidumbre",
};

const SURFACES: Record<Layer, string> = {
  // Dato: superficie neutra, sin adorno. Es información en bruto.
  datos: "bg-surface",
  // Interpretación: superficie neutra con borde, un escalón por encima.
  interpretacion: "bg-surface border border-border",
  // Recomendación: acento lateral. Es el bloque que debe encontrarse solo.
  recomendacion: "bg-surface border-l-2 border-primary",
  // Incertidumbre: superficie neutra; el aviso lo da la etiqueta, no el color.
  incertidumbre: "bg-surface",
};

const TITLES: Record<Layer, string> = {
  datos: "text-[16px] font-medium",
  interpretacion: "text-[16px] font-medium",
  recomendacion: "text-[20px] font-semibold tracking-tight",
  incertidumbre: "text-[16px] font-medium",
};

export function AXISLayer({ layer, title, children }: AXISLayerProps) {
  return (
    <section className={`rounded-[var(--radius)] p-4 ${SURFACES[layer]}`}>
      <p className="text-[13px] font-medium tracking-[0.08em] text-text-secondary uppercase">
        {LABELS[layer]}
      </p>
      <h2 className={`mt-2 ${TITLES[layer]}`}>{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
