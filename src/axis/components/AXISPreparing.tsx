/*
 * Estado previo al motor de AXIS.
 *
 * AXIS no está ejecutando nada. Su motor de razonamiento todavía no existe: no
 * hay proveedor de IA, ni llamadas, ni fuentes de mercado. Este bloque dice
 * exactamente eso —está listo, no está conectado— y describe qué revisará
 * cuando lo esté.
 *
 * POR QUÉ NO HAY ANIMACIÓN DE PROCESO. Un pulso, un giro o una barra de
 * progreso comunican «estoy trabajando en ello», y sería falso. `AXIS_FINAL`
 * Parte III §8 prohíbe crear falsas expectativas y la Parte II §3 sitúa la
 * transparencia como primer valor. El estado es completamente estático: la
 * única señal es un punto que indica disponibilidad, no actividad.
 *
 * El componente no analiza ni interpreta nada: enumera las fuentes que existen
 * de verdad en los datos del usuario.
 */

type AXISPreparingProps = {
  /** Contexto que el análisis revisará. Solo lo que existe de verdad. */
  sources: string[];
};

export function AXISPreparing({ sources }: AXISPreparingProps) {
  return (
    <section className="rounded-[var(--radius)] bg-surface p-4">
      <div className="flex items-center gap-3">
        {/* Disponibilidad, no actividad: sin animación de ningún tipo. */}
        <span
          aria-hidden="true"
          className="h-2 w-2 shrink-0 rounded-full bg-primary"
        />
        <h2 className="text-[16px] font-medium">
          AXIS está listo para analizar tu situación
        </h2>
      </div>

      <p className="mt-2 text-[16px] text-text-secondary">
        Cuando su motor de análisis esté conectado, revisará el contexto
        financiero disponible en Finax para construir una estrategia.
      </p>

      {sources.length > 0 ? (
        <>
          <p className="mt-4 text-[13px] font-medium text-text-secondary">
            Contexto disponible
          </p>
          <ul className="mt-1 flex flex-col gap-1">
            {sources.map((source) => (
              <li key={source} className="text-[13px] text-text-secondary">
                {source}
              </li>
            ))}
          </ul>
        </>
      ) : null}

      <p className="mt-4 border-t border-border pt-3 text-[13px] text-muted-nontext">
        Todavía no se ha ejecutado ningún análisis. Esta pantalla muestra cómo
        se presentará cuando exista.
      </p>
    </section>
  );
}
