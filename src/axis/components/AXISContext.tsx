/*
 * «Tu situación» — contexto financiero que AXIS tiene disponible.
 *
 * Es la capa de DATOS del análisis: lo que el sistema sabe, sin interpretar.
 *
 * Resumen compacto a propósito. AXIS no debe duplicar Estadísticas (§11 del
 * encargo y Visual System §19.3): aquí solo aparece lo que hace falta para
 * entender sobre qué está razonando, y cada métrica solo cuando existe de
 * verdad.
 *
 * Los importes llegan ya formateados desde `lib/money`, igual que en el resto
 * de la aplicación: aquí no se calcula ni se formatea nada.
 */

import { SummaryMetric } from "../../components/ui/SummaryMetric";
import { formatEUR, formatSignedEUR } from "../../lib/money";
import type { AxisContext as Context } from "../analysis";
import { AXISLayer } from "./AXISLayer";

type AXISContextProps = {
  context: Context;
};

export function AXISContext({ context }: AXISContextProps) {
  return (
    <AXISLayer layer="datos" title="Tu situación">
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-2">
          <SummaryMetric
            label="Patrimonio"
            value={formatEUR(context.patrimonioCents)}
          />
        </div>

        {/* Ingresos y gastos solo cuando hay movimientos en el periodo. */}
        {context.hasPeriodData ? (
          <>
            <SummaryMetric
              label="Ingresos"
              value={formatSignedEUR(context.incomeCents)}
              tone="income"
            />
            <SummaryMetric
              label="Gastos"
              value={formatSignedEUR(
                context.expenseCents === 0 ? 0 : -context.expenseCents,
              )}
              tone="expense"
            />
          </>
        ) : null}

        {/*
          Objetivos e inversiones solo aparecen cuando existen. Su ausencia no
          se dibuja como un cero: se explica en el bloque de contexto
          insuficiente, que es donde aporta algo.
        */}
        {context.objectiveCount > 0 ? (
          <SummaryMetric
            label="Objetivos"
            value={String(context.objectiveCount)}
          />
        ) : null}

        {context.investmentCount > 0 ? (
          <SummaryMetric
            label="Inversiones"
            value={String(context.investmentCount)}
          />
        ) : null}
      </div>

      <p className="mt-3 text-[13px] text-text-secondary">
        Datos registrados en Finax. AXIS no dispone todavía de información de
        mercado.
      </p>
    </AXISLayer>
  );
}
