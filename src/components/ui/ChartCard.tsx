/*
 * Tarjeta de gráfico.
 *
 * Visual System §9 y §30.
 *
 * Estructura: título, contexto temporal, gráfico y lectura principal.
 * La leyenda solo cuando sea necesaria.
 *
 * IMPORTANTE — D-03 SIGUE ABIERTA.
 * Este componente es únicamente el contenedor visual. No define colores de
 * serie ni de categoría, y no debe usarse todavía para gráficos por categoría
 * como el donut de distribución. La paleta categórica no está aprobada y no
 * puede inventarse ni derivarse de los tokens existentes.
 */

import type { ReactNode } from "react";

type ChartCardProps = {
  title: string;
  /** Selector de periodo u otro contexto temporal. */
  period?: ReactNode;
  /** Área del gráfico. */
  children: ReactNode;
  /** Lectura principal: qué debe entender el usuario de un vistazo. */
  reading?: string;
  /** Leyenda, solo cuando el gráfico no se entienda sin ella. */
  legend?: ReactNode;
};

export function ChartCard({
  title,
  period,
  children,
  reading,
  legend,
}: ChartCardProps) {
  return (
    <section className="rounded-[var(--radius)] bg-surface p-4">
      <h2 className="mb-3 text-[16px] font-medium">{title}</h2>

      <div className="min-h-[120px]">{children}</div>

      {period ? <div className="mt-3 flex flex-wrap gap-2">{period}</div> : null}

      {legend ? <div className="mt-3">{legend}</div> : null}

      {reading ? (
        <p className="mt-3 text-[13px] text-text-secondary">{reading}</p>
      ) : null}
    </section>
  );
}
