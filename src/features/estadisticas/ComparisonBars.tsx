/*
 * Comparativa de ingresos y gastos.
 *
 * Documento Maestro, Módulo 3 §4: «Comparativa ingresos vs gastos».
 * Visual System §19.2 punto 4 y §30.
 *
 * Dos barras a la misma escala: se comparan de un vistazo sin necesidad de
 * leer las cifras, y las cifras están igualmente escritas al lado. El color
 * usa `--color-income` y `--color-expense` (D-17) y **nunca es la única
 * señal**: cada barra lleva su etiqueta y su importe con signo (§31).
 *
 * No hay paleta categórica por ninguna parte: D-03 sigue abierta.
 *
 * Recibe importes ya formateados junto a sus magnitudes; no calcula nada.
 */

type Row = {
  label: string;
  /** Magnitud positiva, para escalar la barra. */
  magnitudeCents: number;
  /** Importe ya formateado, con su signo. */
  valueLabel: string;
  tone: "income" | "expense";
};

type ComparisonBarsProps = {
  rows: Row[];
};

const TONES = {
  income: { text: "text-income", bar: "bg-income" },
  expense: { text: "text-expense", bar: "bg-expense" },
} as const;

export function ComparisonBars({ rows }: ComparisonBarsProps) {
  const max = Math.max(...rows.map((row) => row.magnitudeCents), 1);

  return (
    <div className="flex flex-col gap-4">
      {rows.map((row) => {
        const percent = Math.round((row.magnitudeCents / max) * 100);
        const tone = TONES[row.tone];

        return (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-[13px] text-text-secondary">{row.label}</span>
              <span className={`text-[16px] font-semibold tabular-nums ${tone.text}`}>
                {row.valueLabel}
              </span>
            </div>
            <div
              className="mt-2 h-2 w-full overflow-hidden rounded-full bg-track"
              role="presentation"
            >
              <div
                className={`h-full rounded-full transition-[width] duration-[var(--motion-standard)] motion-reduce:transition-none ${tone.bar}`}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
