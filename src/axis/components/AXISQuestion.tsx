/*
 * Presencia de AXIS y pregunta estratégica.
 *
 * Encabeza el Centro Estratégico: la burbuja y, debajo, la pregunta que AXIS
 * va a resolver. No es un mensaje de chat ni un campo de entrada: la pregunta
 * ya está definida y es siempre la misma (§41.8b).
 *
 * Aquí la burbuja es `lg` y no `md` como en Inicio: esta es la pantalla propia
 * de AXIS, y el §22.4b solo limita su tamaño en Inicio, donde no debe competir
 * con el patrimonio.
 *
 * La burbuja es decorativa en esta pantalla —no lleva `onActivate`— porque ya
 * estamos dentro de AXIS: no debe ofrecer una puerta a donde el usuario está.
 */

import type { ReactNode } from "react";
import { AXISBubble, type AXISState } from "../../components/ui/AXISBubble";
import { AXIS_QUESTION } from "../../components/ui/AXISPrompt";

type AXISQuestionProps = {
  state?: AXISState;
  /** Estado del análisis bajo la pregunta, cuando haya algo que decir. */
  children?: ReactNode;
};

export function AXISQuestion({ state = "expanded", children }: AXISQuestionProps) {
  return (
    <section className="flex flex-col items-center px-4 text-center">
      <AXISBubble state={state} size="lg" label="AXIS" />

      <h2 className="mt-6 text-[20px] font-semibold tracking-tight text-balance">
        {AXIS_QUESTION}
      </h2>

      {children ? <div className="mt-3 max-w-[42ch]">{children}</div> : null}
    </section>
  );
}
