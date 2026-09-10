/*
 * Inversiones.
 *
 * «El módulo Inversiones permitirá gestionar el patrimonio invertido del
 * usuario desde una única pantalla. Finax no será un broker ni ejecutará
 * operaciones de compra y venta» (Documento Maestro, Módulo 4 §1).
 *
 * Referencia estética: `docs/design/FINAX_INVESTMENTS_VISUAL_REFERENCE.png`.
 * La imagen define acabado, no funcionalidad.
 *
 * Estructura del Visual System §20.2, con los componentes del Módulo 4 §4:
 *   1. cabecera, con acceso a información del módulo
 *   2. patrimonio invertido, con el hueco de su evolución
 *   3. dinero líquido y patrimonio total como métricas secundarias
 *   4. lista de posiciones, o estado vacío
 *   5. presencia contextual de AXIS
 *
 * DATOS REALES Y DATOS AUSENTES
 *
 * El dinero líquido es real: sale del mismo `useFinancialOverview` que Mi
 * Dinero e Inicio, así que las tres pantallas no pueden divergir. El
 * patrimonio invertido es 0,00 € porque no hay ninguna posición registrada.
 *
 * NO hay: curva inventada, escala de importes en el marco del gráfico,
 * distribución por categorías (D-03 sigue abierta), rentabilidad calculada
 * (la documentación no define su fórmula), datos de mercado ni llamadas
 * externas.
 */

import { useState } from "react";
import { HelpCircle, ShieldCheck } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "../../components/ui/icons";
import { AXISPrompt } from "../../components/ui/AXISPrompt";
import { BottomSheet } from "../../components/ui/BottomSheet";
import { Button } from "../../components/ui/Button";
import { ChartPlaceholder } from "../../components/ui/ChartPlaceholder";
import { DataErrorBoundary } from "../../components/ui/DataErrorBoundary";
import { LoadingState } from "../../components/ui/LoadingState";
import { MoneyFigure } from "../../components/ui/MoneyFigure";
import { PageHeader } from "../../components/ui/PageHeader";
import { SummaryMetric } from "../../components/ui/SummaryMetric";
import { useFinancialOverview } from "../../hooks/useFinancialOverview";
import { formatEUR } from "../../lib/money";
import { InvestmentsEmptyArt } from "./InvestmentsEmptyArt";
import { PositionRow } from "./PositionRow";
import { positionWeight, totalInvestedCents, useInvestments } from "./investments";

/** Últimos seis meses reales del calendario, para el eje temporal del hueco. */
function recentMonthLabels(): string[] {
  const formatter = new Intl.DateTimeFormat("es-ES", { month: "short" });
  const now = new Date();
  const labels: string[] = [];

  for (let offset = 5; offset >= 0; offset--) {
    const month = new Date(now.getFullYear(), now.getMonth() - offset, 1);
    const label = formatter.format(month).replace(".", "");
    labels.push(label.charAt(0).toUpperCase() + label.slice(1));
  }

  return labels;
}

export function InversionesPage() {
  return (
    <DataErrorBoundary>
      <InversionesContent />
    </DataErrorBoundary>
  );
}

function InversionesContent() {
  const overview = useFinancialOverview();
  const positions = useInvestments();
  const [infoOpen, setInfoOpen] = useState(false);

  if (overview === undefined) {
    return <LoadingState />;
  }

  const investedCents = totalInvestedCents(positions);
  const liquidCents = overview.patrimonioCents;
  const totalCents = liquidCents + investedCents;
  const isEmpty = positions.length === 0;

  return (
    <div className="mx-auto flex min-h-dvh max-w-[560px] flex-col">
      <PageHeader
        title="Inversiones"
        action={
          <button
            type="button"
            onClick={() => setInfoOpen(true)}
            aria-label="Qué es Inversiones"
            className="-mr-2 flex h-[var(--touch-target-min)] w-[var(--touch-target-min)] items-center justify-center rounded-full text-text-secondary transition-colors duration-[var(--motion-fast)] hover:bg-surface hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <HelpCircle size={ICON_SIZE.control} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </button>
        }
      />

      <div className="flex flex-1 flex-col px-4 pb-8">
        <section className="rounded-[var(--radius)] bg-surface px-5 pt-6 pb-5">
          <h2 className="text-[13px] font-medium tracking-[0.08em] text-text-secondary uppercase">
            Patrimonio invertido
          </h2>

          <MoneyFigure
            formatted={formatEUR(investedCents)}
            size="hero"
            className="mt-3"
          />

          {isEmpty ? (
            <p className="mt-3 max-w-[42ch] text-[13px] text-text-secondary">
              Todavía no hay posiciones registradas, así que no hay evolución que
              mostrar.
            </p>
          ) : null}

          {/*
            Hueco de la evolución. La curva de la cartera necesita histórico de
            precios, que hoy no existe; se enseña el marco vacío en lugar de
            una línea inventada. Sin escala de importes: sería un rango falso.
          */}
          <div className="mt-5">
            <ChartPlaceholder
              message="Sin datos suficientes"
              labels={recentMonthLabels()}
            />
          </div>
        </section>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <SummaryMetric label="Dinero líquido" value={formatEUR(liquidCents)} />
          <SummaryMetric label="Patrimonio total" value={formatEUR(totalCents)} />
        </div>

        <section className="mt-10">
          {isEmpty ? (
            <div className="flex flex-col items-center text-center">
              <InvestmentsEmptyArt />

              <h2 className="mt-6 text-[20px] font-semibold tracking-tight">
                Todavía no tienes inversiones
              </h2>
              <p className="mt-2 max-w-[38ch] text-[16px] text-text-secondary">
                Registra tu primera posición para empezar a seguir tu patrimonio
                invertido.
              </p>

              <div className="mt-6 w-full max-w-[320px]">
                <Button fullWidth disabled>
                  Añadir inversión
                </Button>
                <p className="mt-3 text-[13px] text-text-secondary">
                  Registrar inversiones todavía no está disponible: el módulo aún
                  no almacena datos.
                </p>
              </div>

              <p className="mt-6 flex items-center gap-2 text-[13px] text-text-secondary">
                <ShieldCheck
                  size={ICON_SIZE.inline}
                  strokeWidth={ICON_STROKE}
                  aria-hidden="true"
                  className="text-primary"
                />
                Finax no compra ni vende: solo registra y explica.
              </p>
            </div>
          ) : (
            <>
              <h2 className="mb-3 px-2 text-[20px] font-semibold tracking-tight">
                Posiciones
              </h2>
              <div className="flex flex-col gap-3">
                {positions.map((position) => (
                  <PositionRow
                    key={position.id}
                    name={position.name}
                    valueLabel={formatEUR(position.valueCents)}
                    weight={positionWeight(position, investedCents)}
                  />
                ))}
              </div>
            </>
          )}
        </section>

        <AXISPrompt className="mt-12" />
      </div>

      <BottomSheet
        open={infoOpen}
        title="Qué es Inversiones"
        onClose={() => setInfoOpen(false)}
      >
        {/* Texto tomado del Documento Maestro, Módulo 4 §1, §2 y §8. */}
        <div className="flex flex-col gap-4 pb-2 text-[16px] text-text-secondary">
          <p>
            Inversiones reúne tu patrimonio invertido en una sola pantalla:
            registra tus posiciones, mantiene su valor al día y te ayuda a
            entender cómo afectan a tu patrimonio total.
          </p>
          <p>
            <span className="text-text-primary">Finax no es un broker.</span> No
            ejecuta compras ni ventas, y nunca recomienda comprar o vender un
            activo concreto.
          </p>
          <p>
            El dinero invertido no desaparece: cambia de sitio. Tu patrimonio
            total es siempre la suma del dinero líquido y del invertido.
          </p>
        </div>
      </BottomSheet>
    </div>
  );
}
