/*
 * Tarjeta de AXIS.
 *
 * Visual System §9 y §22; AXIS_FINAL Parte XI §3.
 *
 * Es la superficie de AXIS dentro de otras pantallas, incluido el bloque
 * «¿Qué hacer con mi dinero?» de Inicio (D-10). Lleva iconografía distintiva,
 * un resumen breve y un acceso al análisis completo.
 *
 * Reglas que este componente respeta:
 * - no debe parecer un chat (§22.4);
 * - una recomendación nunca debe parecer una orden (§22.5);
 * - «No hace falta actuar ahora» es una conclusión válida, no un estado
 *   vacío roto (§22.3), así que se representa con el mismo tratamiento
 *   visual que cualquier otra conclusión.
 *
 * Este componente no genera ni interpreta nada: recibe el texto ya elaborado.
 */

import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "./icons";

type AXISCardProps = {
  title: string;
  /** Resumen breve ya redactado. */
  summary: string;
  /** Acceso al análisis completo, normalmente un Button. */
  action?: ReactNode;
  /** Nota de incertidumbre o de contexto insuficiente, cuando exista. */
  footnote?: string;
};

export function AXISCard({ title, summary, action, footnote }: AXISCardProps) {
  return (
    <section className="rounded-[var(--radius)] bg-surface p-4">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-secondary-tint text-secondary"
        >
          <Sparkles size={ICON_SIZE.control} strokeWidth={ICON_STROKE} />
        </span>

        <div className="min-w-0 flex-1">
          <h2 className="text-[16px] font-medium">{title}</h2>
          <p className="mt-1 text-[16px] text-text-secondary">{summary}</p>

          {footnote ? (
            <p className="mt-2 text-[13px] text-muted-nontext">{footnote}</p>
          ) : null}
        </div>
      </div>

      {action ? <div className="mt-4">{action}</div> : null}
    </section>
  );
}
