/*
 * Cifra financiera.
 *
 * Visual System §5: la cifra financiera principal encabeza la jerarquía
 * tipográfica. §17.3: en Mi Dinero debe dominar visualmente.
 *
 * Es la firma visual del dinero en Finax y debe reutilizarse allí donde
 * aparezca un importe protagonista: patrimonio, detalle de movimiento y,
 * más adelante, Inicio e Inversiones. Enteros dominantes, decimales
 * secundarios, cifras tabulares para que no bailen al actualizarse.
 *
 * Recibe SIEMPRE una cadena ya formateada por `lib/money`, para que exista
 * una única fuente de formato. Aquí no se formatea ni se calcula nada.
 *
 * El tono nunca es la única señal: los importes llegan con su signo y con
 * una etiqueta que los describe (§31, D-17).
 */

type Tone = "neutral" | "income" | "expense";
type Size = "hero" | "lg" | "md";

type MoneyFigureProps = {
  /** Importe ya formateado, por ejemplo `-1.234,56 €`. */
  formatted: string;
  tone?: Tone;
  size?: Size;
  className?: string;
};

const TONES: Record<Tone, string> = {
  neutral: "text-text-primary",
  income: "text-income",
  expense: "text-expense",
};

const SIZES: Record<Size, { integer: string; decimals: string }> = {
  hero: { integer: "text-[48px]", decimals: "text-[20px]" },
  lg: { integer: "text-[32px]", decimals: "text-[16px]" },
  md: { integer: "text-[20px]", decimals: "text-[13px]" },
};

/**
 * Corta la cadena por el separador decimal.
 *
 * El formato es EUR/es-ES por D-16, es decir `1.234,56 €`: la coma es
 * siempre el separador decimal.
 */
function split(formatted: string): { integer: string; decimals: string } {
  const separator = formatted.lastIndexOf(",");

  if (separator === -1) {
    return { integer: formatted, decimals: "" };
  }

  return {
    integer: formatted.slice(0, separator),
    decimals: formatted.slice(separator),
  };
}

export function MoneyFigure({
  formatted,
  tone = "neutral",
  size = "lg",
  className = "",
}: MoneyFigureProps) {
  const { integer, decimals } = split(formatted);
  const scale = SIZES[size];

  // En los importes con tono, los decimales conservan el color para no
  // rebajar el contraste de una cifra que ya comunica ingreso o gasto.
  const decimalsTone = tone === "neutral" ? "text-text-secondary" : "";

  return (
    <p className={`tabular-nums ${TONES[tone]} ${className}`}>
      <span className={`${scale.integer} leading-none font-semibold tracking-tight`}>
        {integer}
      </span>
      <span className={`${scale.decimals} leading-none font-medium ${decimalsTone}`}>
        {decimals}
      </span>
    </p>
  );
}
