/*
 * Burbuja de AXIS.
 *
 * Es la presencia visual del gestor financiero de Finax dentro de la
 * aplicación: la puerta contextual a AXIS, no un chat ni un adorno.
 *
 * Referencia estética: `docs/design/FINAX_AXIS_VISUAL_REFERENCE.png`
 * (núcleo circular con dos puntos, halo suave, profundidad, expansión al
 * pulsar). La referencia usa violeta; aquí se adapta a la paleta aprobada:
 * halo de `--color-primary` con un apoyo de `--color-secondary`, y los dos
 * puntos en secundario. Sin colores nuevos, sin neón, sin partículas.
 *
 * Sobre el halo: el Design System §9 prohíbe la sombra como recurso de
 * elevación. Esto no es elevación, es luminosidad, y se construye con capas
 * difuminadas de color en lugar de `box-shadow`. Es el único elemento del
 * sistema que la lleva, y solo porque la identidad de AXIS lo pide.
 *
 * ESTADOS (Visual System y referencia de AXIS):
 *   - `dormant`   no hay nada relevante: presencia mínima y discreta;
 *   - `available` AXIS está listo: algo más de presencia;
 *   - `pressed`   feedback inmediato al pulsar;
 *   - `expanded`  actúa como puerta: transición previa a abrir AXIS.
 *
 * El componente NO decide qué estado le toca ni produce contenido: solo lo
 * representa. El razonamiento de AXIS no vive aquí.
 */

import { useState } from "react";

export type AXISState = "dormant" | "available" | "pressed" | "expanded";
type Size = "sm" | "md" | "lg";

type AXISBubbleProps = {
  /** Estado visual. El de pulsación se gestiona solo mientras se mantiene. */
  state?: AXISState;
  size?: Size;
  /** Etiqueta accesible: describe a dónde lleva, no cómo se ve. */
  label: string;
  /** Cuando existe, la burbuja es un control. Si falta, es decorativa. */
  onActivate?: () => void;
};

/** Diámetro del núcleo en píxeles. */
const CORE: Record<Size, number> = { sm: 36, md: 48, lg: 72 };

/** Cuánto ocupa el halo respecto al núcleo. */
const HALO_RATIO = 2.4;

const STATE_STYLES: Record<AXISState, { core: string; halo: string; ring: string }> = {
  dormant: { core: "scale-90", halo: "opacity-40", ring: "opacity-0" },
  available: { core: "scale-100", halo: "opacity-100", ring: "opacity-0" },
  pressed: { core: "scale-95", halo: "opacity-100", ring: "opacity-100" },
  expanded: { core: "scale-110", halo: "opacity-100", ring: "opacity-60" },
};

export function AXISBubble({
  state = "available",
  size = "md",
  label,
  onActivate,
}: AXISBubbleProps) {
  const [held, setHeld] = useState(false);

  const effective: AXISState = held && state !== "expanded" ? "pressed" : state;
  const styles = STATE_STYLES[effective];

  const core = CORE[size];
  const halo = Math.round(core * HALO_RATIO);
  const dot = Math.max(5, Math.round(core * 0.13));

  const visual = (
    <span
      className="pointer-events-none relative flex items-center justify-center"
      style={{ width: halo, height: halo }}
    >
      {/* Halo: dos capas difuminadas, no una sombra. */}
      <span
        aria-hidden="true"
        className={`absolute rounded-full bg-primary/25 blur-xl transition-opacity duration-[var(--motion-standard)] motion-reduce:transition-none ${styles.halo}`}
        style={{ width: halo, height: halo }}
      />
      <span
        aria-hidden="true"
        className={`absolute rounded-full bg-secondary/15 blur-lg transition-opacity duration-[var(--motion-standard)] motion-reduce:transition-none ${styles.halo}`}
        style={{ width: Math.round(halo * 0.7), height: Math.round(halo * 0.7) }}
      />

      {/* Anillo de expansión: solo al pulsar o al abrir. */}
      <span
        aria-hidden="true"
        className={`absolute rounded-full ring-1 ring-primary/30 transition-opacity duration-[var(--motion-fast)] motion-reduce:transition-none ${styles.ring}`}
        style={{ width: Math.round(core * 1.6), height: Math.round(core * 1.6) }}
      />

      {/* Núcleo. */}
      <span
        aria-hidden="true"
        className={`relative flex items-center justify-center rounded-full border border-border/60 bg-background transition-transform duration-[var(--motion-standard)] ease-out motion-reduce:transition-none ${styles.core}`}
        // La separación es proporcional al núcleo para que la mirada de AXIS
        // se mantenga idéntica en todos los tamaños.
        style={{ width: core, height: core, gap: Math.round(dot * 1.1) }}
      >
        <span
          className="rounded-full bg-secondary"
          style={{ width: dot, height: dot }}
        />
        <span
          className="rounded-full bg-secondary"
          style={{ width: dot, height: dot }}
        />
      </span>
    </span>
  );

  if (!onActivate) {
    return (
      <span role="img" aria-label={label} className="inline-flex">
        {visual}
      </span>
    );
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onActivate}
      onPointerDown={() => setHeld(true)}
      onPointerUp={() => setHeld(false)}
      onPointerLeave={() => setHeld(false)}
      onBlur={() => setHeld(false)}
      className="inline-flex min-h-[var(--touch-target-min)] min-w-[var(--touch-target-min)] items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
    >
      {visual}
    </button>
  );
}
