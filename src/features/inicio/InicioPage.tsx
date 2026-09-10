/*
 * Inicio.
 *
 * «El módulo Inicio será el centro de Finax. No pretende mostrar todos los
 * datos disponibles, sino responder de un vistazo a la pregunta: ¿Cómo está
 * mi situación financiera hoy?» (Documento Maestro, Módulo 1 §1).
 *
 * Estructura del Visual System §16.2 y de D-10:
 *   1. cabecera con saludo
 *   2. patrimonio, con su evolución integrada (D-21)
 *   3. resumen del periodo
 *   4. bloque de AXIS «¿Qué hacer con mi dinero?»
 *   5. objetivos destacados
 *   6. accesos rápidos
 *
 * Los datos son EXACTAMENTE los mismos que los de Mi Dinero: ambos usan
 * `useFinancialOverview`, porque «ningún dato mostrado en Inicio podrá diferir
 * del resto de módulos» (Módulo 1 §6).
 *
 * Prohibido por §16.3: Cuentas, Presupuesto, Transferencias, login, datos
 * bancarios y cualquier función no aprobada.
 *
 * Esta pantalla no registra ni modifica nada: solo lee y enlaza.
 */

import { ChartPie, ListOrdered, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { AXISPrompt } from "../../components/ui/AXISPrompt";
import { DataErrorBoundary } from "../../components/ui/DataErrorBoundary";
import { EmptyState } from "../../components/ui/EmptyState";
import { LoadingState } from "../../components/ui/LoadingState";
import { NavRow } from "../../components/ui/NavRow";
import { PageHeader } from "../../components/ui/PageHeader";
import { SummaryMetric } from "../../components/ui/SummaryMetric";
import { useFinancialOverview } from "../../hooks/useFinancialOverview";
import { formatSignedEUR } from "../../lib/money";
import { MoneySummary } from "../midinero/MoneySummary";
import { greeting } from "./greeting";

export function InicioPage() {
  return (
    <DataErrorBoundary>
      <InicioContent />
    </DataErrorBoundary>
  );
}

function SectionHeader({
  title,
  to,
  linkLabel,
}: {
  title: string;
  to?: string;
  linkLabel?: string;
}) {
  return (
    <div className="mb-3 flex items-baseline justify-between gap-4 px-2">
      <h2 className="text-[20px] font-semibold tracking-tight">{title}</h2>
      {to && linkLabel ? (
        <Link
          to={to}
          className="rounded-[var(--radius)] text-[13px] font-medium text-primary transition-colors duration-[var(--motion-fast)] hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          {linkLabel}
        </Link>
      ) : null}
    </div>
  );
}

function InicioContent() {
  const overview = useFinancialOverview();

  if (overview === undefined) {
    return <LoadingState />;
  }

  const {
    initialBalanceCents,
    patrimonioCents,
    summary,
    variationCents,
    variationPercent,
    series,
    balanceTone,
    hasPeriodData,
  } = overview;

  return (
    <div className="mx-auto flex min-h-dvh max-w-[560px] flex-col">
      <PageHeader title={greeting()} />

      <div className="flex flex-1 flex-col px-4 pb-8">
        {/* El bloque de patrimonio se reutiliza tal cual, sin la acción de
            modificar el saldo inicial: eso pertenece a Mi Dinero (D-14). */}
        <MoneySummary
          patrimonioCents={patrimonioCents}
          initialBalanceCents={initialBalanceCents}
          variationCents={variationCents}
          variationPercent={variationPercent}
          series={series}
        />

        {hasPeriodData ? (
          <section className="mt-6">
            <h2 className="mb-2 px-1 text-[13px] font-medium text-text-secondary">
              Este mes
            </h2>
            {/* Mismo patrón responsive que el resto de pantallas. */}
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              <SummaryMetric
                label="Ingresos"
                value={formatSignedEUR(summary.incomeCents)}
                tone="income"
              />
              <SummaryMetric
                label="Gastos"
                value={formatSignedEUR(
                  summary.expenseCents === 0 ? 0 : -summary.expenseCents,
                )}
                tone="expense"
              />
              <div className="col-span-2 flex sm:col-span-1">
                <SummaryMetric
                  label="Balance"
                  value={formatSignedEUR(summary.balanceCents)}
                  tone={balanceTone}
                />
              </div>
            </div>
          </section>
        ) : null}

        {/*
          Objetivos destacados. El módulo de Objetivos aún no existe y no hay
          ningún objetivo guardado, así que se muestra el estado vacío del
          Visual System §41.8. No se pintan tarjetas de ejemplo: serían datos
          financieros inventados en la pantalla principal (§36).
        */}
        <section className="mt-10">
          <SectionHeader title="Objetivos" to="/objetivos" linkLabel="Ver todos" />
          <EmptyState
            title="Todavía no tienes objetivos"
            description="Crea una meta para empezar a seguir tu progreso."
          />
        </section>

        {/*
          Presencia de AXIS: va después de Objetivos y antes de los accesos,
          disponible sin competir con el patrimonio. La composición vive en
          `AXISPrompt` porque Inversiones usa exactamente la misma.
        */}
        <AXISPrompt className="mt-12" />

        <section className="mt-6">
          <SectionHeader title="Accesos rápidos" />
          <div className="flex flex-col gap-2">
            <NavRow
              to="/mi-dinero"
              label="Mi Dinero"
              icon={Wallet}
              description="Registrar movimientos y ver tu patrimonio"
            />
            <NavRow
              to="/movimientos"
              label="Movimientos"
              icon={ListOrdered}
              description="Todo tu historial"
            />
            <NavRow
              to="/estadisticas"
              label="Estadísticas"
              icon={ChartPie}
              description="Analiza tu evolución"
            />
          </div>
        </section>
      </div>
    </div>
  );
}
