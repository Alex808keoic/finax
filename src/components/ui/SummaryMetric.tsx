/*
 * Métrica de resumen.
 *
 * Visual System §16.2 (resumen del periodo) y §33.
 *
 * Muestra una etiqueta y un importe ya formateado. No formatea ni calcula
 * nada: el importe llega hecho desde `lib/money` (TECH_STACK §23).
 *
 * Superficie blanca con borde sutil, no gris: crea un segundo nivel de
 * jerarquía por debajo de la tarjeta de patrimonio sin recurrir a sombras
 * (§8). No combinar borde y fondo contrastado a la vez.
 *
 * El tono aplica `--color-income` o `--color-expense` (D-17) y solo debe
 * usarse cuando la métrica representa realmente un ingreso o un gasto. El
 * balance usa el tono que corresponda a su signo, y neutro cuando es cero.
 * El color nunca es la única señal: la etiqueta y el signo del importe
 * acompañan siempre (§31).
 */

type Tone = "neutral" | "income" | "expense";

type SummaryMetricProps = {
  label: string;
  /** Importe ya formateado, con su signo cuando corresponda. */
  value: string;
  tone?: Tone;
};

const TONES: Record<Tone, string> = {
  neutral: "text-text-primary",
  income: "text-income",
  expense: "text-expense",
};

export function SummaryMetric({ label, value, tone = "neutral" }: SummaryMetricProps) {
  return (
    <div className="min-w-0 flex-1 rounded-[var(--radius)] border border-border bg-background px-3 py-3">
      <p className="truncate text-[13px] text-text-secondary">{label}</p>
      {/*
        13 px en móvil y 16 px a partir de tablet: con tres métricas en fila,
        a 360 px un importe como «+1.700,50 €» no cabe a 16 px y se cortaría.
        Ambos tamaños son de la escala aprobada (Design System §6).
      */}
      <p
        className={`mt-1 truncate text-[13px] font-semibold tabular-nums sm:text-[16px] ${TONES[tone]}`}
      >
        {value}
      </p>
    </div>
  );
}
