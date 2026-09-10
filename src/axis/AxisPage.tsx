/*
 * AXIS — Centro Estratégico.
 *
 * AXIS vive fuera de `features/` porque es una capa transversal, no un módulo
 * más (TECH_STACK.md §22 y §23).
 *
 * El Centro Estratégico es la SUPERFICIE PRINCIPAL de AXIS y el chat es una
 * vista secundaria (D-09, `AXIS_FINAL` Parte VIII). Por eso esta pantalla no
 * tiene campo de entrada ni hilo de mensajes: la pregunta ya está definida y
 * lo que se presenta es un razonamiento, no una conversación.
 *
 * ORDEN DE LOS BLOQUES
 *
 *   1. presencia de AXIS y pregunta estratégica
 *   2. estado del análisis
 *   3. DATOS          · tu situación
 *   4. INTERPRETACIÓN · estado general, estrategia actual y hallazgos
 *   5. RECOMENDACIÓN  · qué hacer, por qué e impacto
 *   6. alternativas consideradas
 *   7. INCERTIDUMBRE  · qué vigilar y nivel de confianza
 *   8. conclusión y siguiente paso
 *   9. conversación, solo cuando exista
 *
 * ORDEN OFICIAL (D-26, aprobado el 2026-08-16). Las alternativas van DESPUÉS
 * de la recomendación, siguiendo `AXIS_FINAL` Parte IX §14: «qué recomienda
 * hacer, cuánto dinero afecta, por qué lo recomienda, qué alternativas
 * consideró». El Visual System §22.2 decía lo contrario y ha quedado
 * sincronizado. Para todo lo relativo al comportamiento de AXIS prevalece
 * `AXIS_FINAL` (CLAUDE.md §4).
 *
 * QUÉ HAY REAL Y QUÉ HAY PREPARADO
 *
 * Real: el contexto financiero, que sale de los datos locales del usuario, y
 * la comprobación de si ese contexto basta para razonar.
 *
 * Preparado: todo lo demás. No hay proveedor de IA, ni llamadas HTTP, ni
 * fuentes de mercado, ni memoria. El estado `ready` no puede alcanzarse
 * todavía porque nada produce un análisis: los componentes existen y esperan.
 *
 * Esta pantalla no inventa ninguna recomendación financiera.
 */

import { MessageCircle, Wallet } from "lucide-react";
import { DataErrorBoundary } from "../components/ui/DataErrorBoundary";
import { LoadingState } from "../components/ui/LoadingState";
import { NavRow } from "../components/ui/NavRow";
import { PageHeader } from "../components/ui/PageHeader";
import { useAxisScreenState, type AxisAnalysis, type AxisContext } from "./analysis";
import { AXISAlternatives } from "./components/AXISAlternatives";
import { AXISContext as AXISContextBlock } from "./components/AXISContext";
import { AXISLayer } from "./components/AXISLayer";
import { AXISNextAction } from "./components/AXISNextAction";
import { AXISPreparing } from "./components/AXISPreparing";
import { AXISQuestion } from "./components/AXISQuestion";
import { AXISRecommendation } from "./components/AXISRecommendation";
import { AXISUncertainty } from "./components/AXISUncertainty";

export function AxisPage() {
  return (
    <DataErrorBoundary>
      <AxisContent />
    </DataErrorBoundary>
  );
}

/** Qué revisará el análisis, enumerando solo lo que existe de verdad. */
function availableSources(context: AxisContext): string[] {
  const sources: string[] = [`Patrimonio y ${context.movementCount} movimientos`];

  if (context.objectiveCount > 0) {
    sources.push(`${context.objectiveCount} objetivos`);
  }
  if (context.investmentCount > 0) {
    sources.push(`${context.investmentCount} inversiones`);
  }

  return sources;
}

function AxisContent() {
  const state = useAxisScreenState();

  if (state.status === "loading") {
    return <LoadingState />;
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-[560px] flex-col">
      <PageHeader title="AXIS">
        <p className="text-[13px] text-text-secondary">Centro Estratégico</p>
      </PageHeader>

      <div className="flex flex-1 flex-col px-4 pb-8">
        {state.status === "insufficient-context" ? (
          <>
            {/* Sin contexto suficiente la burbuja está `dormant`: AXIS no
                tiene nada que ofrecer y no debe aparentar lo contrario. */}
            <AXISQuestion state="dormant">
              <p className="text-[16px] text-text-secondary">
                Todavía no puedo responder a esta pregunta.
              </p>
            </AXISQuestion>

            <div className="mt-8 flex flex-col gap-4">
              <AXISLayer layer="incertidumbre" title="Qué me falta para analizar">
                <ul className="flex flex-col gap-2">
                  {state.missing.map((item) => (
                    <li key={item} className="text-[16px] text-text-secondary">
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 border-t border-border pt-3 text-[13px] text-text-secondary">
                  Prefiero decirte que no tengo información suficiente antes que
                  darte una recomendación poco fundamentada.
                </p>
              </AXISLayer>

              <NavRow
                to="/mi-dinero"
                label="Registrar movimientos"
                icon={Wallet}
                description="Empieza por tus ingresos y gastos"
              />
            </div>
          </>
        ) : null}

        {state.status === "preparing" ? (
          <>
            <AXISQuestion state="available" />

            <div className="mt-8 flex flex-col gap-4">
              <AXISPreparing sources={availableSources(state.context)} />
              <AXISContextBlock context={state.context} />
            </div>
          </>
        ) : null}

        {state.status === "ready" ? (
          <AxisAnalysisView context={state.context} analysis={state.analysis} />
        ) : null}
      </div>
    </div>
  );
}

/**
 * Análisis completo.
 *
 * Cada bloque aparece solo cuando tiene contenido real: la interfaz se adapta
 * a la respuesta en lugar de imponer una plantilla fija con huecos vacíos.
 *
 * Hoy no es alcanzable: nada construye un `AxisAnalysis`. Queda escrito para
 * que el motor futuro solo tenga que producir el objeto.
 */
function AxisAnalysisView({
  context,
  analysis,
}: {
  context: AxisContext;
  analysis: AxisAnalysis;
}) {
  return (
    <>
      <AXISQuestion state="expanded" />

      <div className="mt-8 flex flex-col gap-4">
        <AXISContextBlock context={context} />

        <AXISLayer layer="interpretacion" title={analysis.overallState}>
          {analysis.currentStrategy ? (
            <p className="text-[16px] text-text-secondary">
              {analysis.currentStrategy}
            </p>
          ) : null}

          {analysis.findings.length > 0 ? (
            <ul
              className={`flex flex-col gap-2 ${analysis.currentStrategy ? "mt-3" : ""}`}
            >
              {analysis.findings.map((finding) => (
                <li key={finding} className="text-[16px] text-text-secondary">
                  {finding}
                </li>
              ))}
            </ul>
          ) : null}
        </AXISLayer>

        {analysis.recommendation ? (
          <AXISRecommendation recommendation={analysis.recommendation} />
        ) : null}

        <AXISAlternatives alternatives={analysis.alternatives} />

        <AXISUncertainty
          uncertainties={analysis.uncertainties}
          confidence={analysis.confidence}
        />

        <AXISNextAction
          conclusion={analysis.conclusion}
          nextAction={analysis.nextAction}
        />

        {/*
          Chat secundario (§22.2 punto 9). Solo aparece «cuando exista»: hoy
          nunca, porque no hay conversación. Un acceso a una pantalla
          inexistente sería peor que no ofrecerlo.
        */}
        {analysis.conversationAvailable ? (
          <NavRow
            to="/axis/conversacion"
            label="Ver conversación"
            icon={MessageCircle}
            description="Profundizar en este análisis"
          />
        ) : null}
      </div>
    </>
  );
}
