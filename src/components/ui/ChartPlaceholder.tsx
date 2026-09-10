/*
 * Marco de gráfico sin datos suficientes.
 *
 * Visual System §29 («datos insuficientes: indicar que faltan datos») y §30
 * («escala mínima necesaria, sin rejilla pesada»).
 *
 * Dibuja el hueco que ocupará la curva cuando exista historial, con unas
 * líneas guía muy tenues y un mensaje centrado. Sirve para que la pantalla se
 * lea como terminada en vez de como un espacio en blanco.
 *
 * NO PINTA NINGÚN DATO. En concreto, no lleva escala de importes: unos
 * valores en el eje implicarían un rango que no existe. Las etiquetas
 * temporales, cuando se pasan, deben ser fechas reales del calendario.
 */

type ChartPlaceholderProps = {
  /** Mensaje del centro, por ejemplo «Sin datos suficientes». */
  message: string;
  /** Etiquetas temporales reales. Opcionales. */
  labels?: string[];
};

const GUIDES = [0, 50, 100];

export function ChartPlaceholder({ message, labels }: ChartPlaceholderProps) {
  return (
    <div>
      <div className="relative h-[132px]">
        {GUIDES.map((position) => (
          <span
            key={position}
            aria-hidden="true"
            className="absolute right-0 left-0 border-t border-dashed border-border"
            style={{ top: `${position}%` }}
          />
        ))}

        <div className="absolute inset-0 flex items-center justify-center">
          <p className="rounded-full border border-border bg-background px-3 py-1.5 text-[13px] text-text-secondary">
            {message}
          </p>
        </div>
      </div>

      {labels && labels.length > 0 ? (
        <div className="mt-2 flex justify-between text-[13px] text-muted-nontext">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
      ) : null}
    </div>
  );
}
