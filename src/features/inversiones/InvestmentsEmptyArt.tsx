/*
 * Ilustración del estado vacío de Inversiones.
 *
 * Referencia estética: `docs/design/FINAX_INVESTMENTS_VISUAL_REFERENCE.png`
 * (forma financiera abstracta: área, barras, puntos, insignia de crecimiento y
 * destellos).
 *
 * Construida con SVG y tokens del sistema, sin ningún asset externo, sin
 * fotografías y sin ilustraciones importadas (§6 del encargo).
 *
 * NO REPRESENTA DATOS. Es una forma decorativa del estado vacío, no una
 * gráfica: por eso va marcada como `aria-hidden` y no lleva ejes, escala ni
 * etiquetas que puedan confundirse con información real.
 */

import { TrendingUp } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "../../components/ui/icons";

export function InvestmentsEmptyArt() {
  return (
    <div className="relative mx-auto w-full max-w-[280px]" aria-hidden="true">
      <svg viewBox="0 0 280 110" className="block w-full" role="presentation">
        {/* Barras de fondo */}
        {[
          { x: 48, h: 26 },
          { x: 96, h: 40 },
          { x: 144, h: 32 },
          { x: 192, h: 52 },
        ].map((bar) => (
          <rect
            key={bar.x}
            x={bar.x}
            y={92 - bar.h}
            width="12"
            height={bar.h}
            rx="3"
            className="fill-primary/15"
          />
        ))}

        {/* Área y línea de crecimiento */}
        <path
          d="M 8 84 L 62 70 L 116 76 L 170 52 L 224 60 L 272 30 L 272 92 L 8 92 Z"
          className="fill-primary/10"
        />
        <path
          d="M 8 84 L 62 70 L 116 76 L 170 52 L 224 60 L 272 30"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="stroke-primary/45"
        />

        {/* Puntos sobre la línea */}
        {[
          [62, 70],
          [116, 76],
          [170, 52],
          [224, 60],
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="3.5" className="fill-primary/70" />
        ))}

        {/* Destellos discretos */}
        {[
          [24, 30, 4],
          [252, 76, 3],
          [140, 18, 3],
        ].map(([cx, cy, r]) => (
          <path
            key={`${cx}-${cy}`}
            d={`M ${cx} ${cy - r} L ${cx + r * 0.35} ${cy - r * 0.35} L ${cx + r} ${cy} L ${cx + r * 0.35} ${cy + r * 0.35} L ${cx} ${cy + r} L ${cx - r * 0.35} ${cy + r * 0.35} L ${cx - r} ${cy} L ${cx - r * 0.35} ${cy - r * 0.35} Z`}
            className="fill-primary/35"
          />
        ))}
      </svg>

      {/* Insignia de crecimiento */}
      <span className="absolute top-0 left-[18%] flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
        <TrendingUp size={ICON_SIZE.large} strokeWidth={ICON_STROKE} />
      </span>
    </div>
  );
}
