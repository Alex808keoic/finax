/*
 * Curva de evolución.
 *
 * Visual System §30: línea principal, área suave cuando ayuda a la lectura,
 * escala mínima necesaria y todo el protagonismo para la tendencia y la
 * cifra. Sin rejilla, sin 3D, sin decoración, sin leyenda.
 *
 * Es la firma visual del movimiento del dinero en Finax y debe reutilizarse
 * allí donde haya que enseñar una evolución compacta.
 *
 * Decisiones técnicas:
 *
 * - SVG en línea en lugar de una librería de gráficos. Para una curva
 *   compacta sin ejes ni interacción, una dependencia como Recharts no se
 *   justifica (TECH_STACK.md §27). Recharts sigue disponible y aprobado para
 *   el análisis completo de Estadísticas (§13, D-21).
 *
 * - Interpolación cúbica monótona. Suaviza la curva SIN sobrepasar nunca los
 *   valores reales: una curva que se pasa de frenada dibujaría una subida o
 *   una caída que no ocurrió, y eso en dinero es mentir.
 *
 * - `vector-effect="non-scaling-stroke"` para que el trazo mantenga su grosor
 *   aunque el SVG se estire a lo ancho.
 *
 * El color es `--color-primary`; el área es ese mismo color a baja opacidad,
 * no un color nuevo.
 */

import { useId } from "react";

type EvolutionChartProps = {
  /** Valores reales en orden cronológico. */
  values: number[];
  /** Descripción para lectores de pantalla. */
  ariaLabel: string;
  /**
   * `compact` para la lectura inmediata de Mi Dinero e Inicio;
   * `detailed` para el análisis de Estadísticas (D-21).
   */
  size?: "compact" | "detailed";
  className?: string;
};

const WIDTH = 100;
const HEIGHT = 32;
/** Aire vertical para que el trazo no se recorte contra los bordes. */
const PADDING = 3;

function normalize(values: number[]): { x: number; y: number }[] {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min;
  const usable = HEIGHT - PADDING * 2;
  const step = values.length > 1 ? WIDTH / (values.length - 1) : 0;

  return values.map((value, index) => ({
    x: index * step,
    // Sin variación, la línea queda centrada: es plana porque el dato es plano.
    y: span === 0 ? HEIGHT / 2 : PADDING + (1 - (value - min) / span) * usable,
  }));
}

/** Tangentes de Fritsch–Carlson: suavizado que respeta la monotonía real. */
function monotoneTangents(points: { x: number; y: number }[]): number[] {
  const n = points.length;
  const slopes: number[] = [];

  for (let i = 0; i < n - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    slopes.push(dx === 0 ? 0 : (points[i + 1].y - points[i].y) / dx);
  }

  const tangents: number[] = new Array(n);
  tangents[0] = slopes[0] ?? 0;
  tangents[n - 1] = slopes[n - 2] ?? 0;

  for (let i = 1; i < n - 1; i++) {
    const previous = slopes[i - 1];
    const next = slopes[i];
    // Un cambio de dirección se marca como extremo: la curva no lo rebasa.
    tangents[i] = previous * next <= 0 ? 0 : (previous + next) / 2;
  }

  return tangents;
}

function buildPath(points: { x: number; y: number }[]): string {
  if (points.length === 1) {
    return `M 0 ${points[0].y} L ${WIDTH} ${points[0].y}`;
  }

  const tangents = monotoneTangents(points);
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
    const third = (next.x - current.x) / 3;

    const c1x = current.x + third;
    const c1y = current.y + tangents[i] * third;
    const c2x = next.x - third;
    const c2y = next.y - tangents[i + 1] * third;

    path += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${next.x} ${next.y}`;
  }

  return path;
}

export function EvolutionChart({
  values,
  ariaLabel,
  size = "compact",
  className = "",
}: EvolutionChartProps) {
  const gradientId = useId();
  const height = size === "detailed" ? "h-[176px]" : "h-[88px]";

  if (values.length === 0) {
    return null;
  }

  const points = normalize(values);
  const line = buildPath(points);
  const area = `${line} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`;
  const last = points[points.length - 1];

  return (
    <div className={`relative ${className}`}>
      <svg
        role="img"
        aria-label={ariaLabel}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        preserveAspectRatio="none"
        className={`block w-full ${height}`}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <path d={area} fill={`url(#${gradientId})`} />
        <path
          d={line}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/*
        El punto final va fuera del SVG: con `preserveAspectRatio="none"` un
        círculo dibujado dentro saldría deformado al estirarse a lo ancho.
      */}
      <span
        aria-hidden="true"
        className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-2 ring-background"
        // Se retranquea su radio para que no lo recorte el borde de la tarjeta.
        style={{ left: "calc(100% - 4px)", top: `${(last.y / HEIGHT) * 100}%` }}
      />
    </div>
  );
}
