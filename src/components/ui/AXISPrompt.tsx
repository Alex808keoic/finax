/*
 * Presencia contextual de AXIS.
 *
 * Visual System §16.2 punto 4, §22.4b y §41.8b.
 *
 * Es la puerta a AXIS dentro de otras pantallas: etiqueta, burbuja, la
 * pregunta estratégica y el acceso al análisis. No es un chat ni una tarjeta
 * de recomendación.
 *
 * Lo que muestra es UNA PREGUNTA, nunca una conclusión. Mientras el motor de
 * AXIS no exista, no puede aparecer aquí ningún insight: lo prohíben el
 * Documento Maestro (Parte IV, ampliación §2) y `AXIS_FINAL` (Parte XIV §11).
 *
 * El copy de la pregunta es oficial y no debe cambiarse (§41.8b).
 */

import { ArrowRight, Sparkles } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "./icons";
import { Link, useNavigate } from "react-router-dom";
import { AXISBubble } from "./AXISBubble";

/** Pregunta estratégica oficial. No modificar (§41.8b). */
export const AXIS_QUESTION = "¿Cómo puedes mejorar tu situación financiera?";

type AXISPromptProps = {
  className?: string;
};

export function AXISPrompt({ className = "" }: AXISPromptProps) {
  const navigate = useNavigate();

  return (
    <section className={`flex flex-col items-center px-4 text-center ${className}`}>
      <p className="flex items-center gap-1.5 text-[13px] font-medium tracking-[0.08em] text-secondary uppercase">
        <Sparkles size={ICON_SIZE.label} strokeWidth={ICON_STROKE} aria-hidden="true" />
        AXIS
      </p>

      <div className="mt-3">
        <AXISBubble
          state="available"
          size="md"
          label={`Abrir AXIS: ${AXIS_QUESTION.toLowerCase()}`}
          onActivate={() => navigate("/axis")}
        />
      </div>

      <p className="mt-4 text-[20px] font-semibold tracking-tight text-balance">
        {AXIS_QUESTION}
      </p>

      <Link
        to="/axis"
        className="mt-4 inline-flex items-center gap-1 rounded-[var(--radius)] px-2 py-2 text-[13px] font-medium text-primary transition-colors duration-[var(--motion-fast)] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        Ver análisis
        <ArrowRight size={ICON_SIZE.inline} strokeWidth={ICON_STROKE} aria-hidden="true" />
      </Link>
    </section>
  );
}
