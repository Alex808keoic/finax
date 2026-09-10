/*
 * Modelo del análisis de AXIS.
 *
 * ESTADO: el motor de razonamiento de AXIS NO existe todavía. No hay proveedor
 * de IA, ni llamadas HTTP, ni fuentes de mercado. Esta fase construye la
 * interfaz y el contrato de datos que ese motor tendrá que rellenar.
 *
 * Por eso este archivo NO produce ninguna recomendación. Define la forma que
 * tendrá un análisis y decide, con datos reales y lógica determinista, si AXIS
 * dispone siquiera del contexto mínimo para analizar. Nada más.
 *
 * `AXIS_FINAL` Parte XII §5 y §8 exigen precisamente esta separación: las
 * validaciones estructurales y los cálculos viven en el código; el modelo de
 * lenguaje interpreta, razona y comunica. La comprobación de contexto de abajo
 * es una validación estructural, no una recomendación.
 *
 * ORDEN DE LA RESPUESTA (`AXIS_FINAL` Parte IX §14): qué recomienda, cuánto
 * dinero afecta, por qué lo recomienda, qué alternativas consideró, qué
 * riesgos existen y qué podría hacer cambiar la decisión. La Parte X §2 añade
 * el nivel de confianza. Ese es el orden que reproduce la pantalla.
 */

import { useFinancialOverview } from "../hooks/useFinancialOverview";
import { useObjectives } from "../features/objetivos/objectives";
import { useInvestments } from "../features/inversiones/investments";

/**
 * Nivel de confianza de una estrategia (`AXIS_FINAL` Parte IV §5).
 *
 * Cualitativo a propósito: un porcentaje sugeriría una precisión que el
 * razonamiento no tiene, y la Parte III §8 prohíbe presentar predicciones
 * como certezas.
 */
export type Confidence = "alta" | "media" | "baja";

/** Una estrategia alternativa que AXIS consideró y no eligió. */
export type Alternative = {
  name: string;
  /** Explicación breve de en qué consiste. */
  summary: string;
  /** En qué se diferencia de la opción principal. */
  difference: string;
};

/** Algo que AXIS no sabe, no puede confirmar o está asumiendo. */
export type Uncertainty = {
  title: string;
  detail: string;
};

/**
 * Acción sugerida al final del análisis.
 *
 * `to` es una ruta interna de Finax. AXIS nunca ejecuta la acción: solo
 * propone dónde continuar (`AXIS_FINAL` Parte XII §13 y Parte XIV §10, §16).
 */
export type NextAction = {
  label: string;
  description?: string;
  to?: string;
};

export type Recommendation = {
  /** Qué hacer, en una frase. */
  what: string;
  /** Por qué, con los datos que lo motivan. */
  why: string;
  /**
   * Estimación de impacto. Opcional a propósito: solo se muestra cuando
   * existe una estimación real, nunca un número inventado.
   */
  impact?: string;
};

export type AxisAnalysis = {
  /** Lectura general de la situación. Interpretación, no dato. */
  overallState: string;
  /** Estrategia vigente, cuando ya existe uná previa. */
  currentStrategy?: string;
  /** Hallazgos relevantes: riesgos y oportunidades detectados. */
  findings: string[];
  /**
   * Recomendación principal. Ausente cuando la conclusión es que no hace
   * falta actuar: la ausencia de acción también es una respuesta válida
   * (`AXIS_FINAL` Parte VIII §5 y Parte XI §12).
   */
  recommendation?: Recommendation;
  alternatives: Alternative[];
  uncertainties: Uncertainty[];
  confidence: Confidence;
  /** Cierre del análisis. Siempre existe, haya o no recomendación. */
  conclusion: string;
  nextAction?: NextAction;
  /** Momento en que se construyó el análisis. */
  generatedAt: string;
  /** Solo cuando exista una conversación asociada (Visual System §22.2 punto 9). */
  conversationAvailable?: boolean;
};

/**
 * Contexto financiero real que AXIS tiene disponible.
 *
 * Sale íntegramente de los datos locales del usuario. No hay información de
 * mercado: ninguna fuente externa está conectada en esta fase.
 */
export type AxisContext = {
  patrimonioCents: number;
  incomeCents: number;
  expenseCents: number;
  hasPeriodData: boolean;
  movementCount: number;
  objectiveCount: number;
  investmentCount: number;
};

/**
 * Estado de la pantalla.
 *
 * `preparing` es el estado real hoy: la interfaz está construida y el motor
 * todavía no. No dice que haya analizado nada.
 */
export type AxisScreenState =
  | { status: "loading" }
  | { status: "insufficient-context"; context: AxisContext; missing: string[] }
  | { status: "preparing"; context: AxisContext }
  | { status: "ready"; context: AxisContext; analysis: AxisAnalysis };

/**
 * Qué le falta a AXIS para poder razonar.
 *
 * Son comprobaciones de hechos, no incertidumbres inventadas: o hay
 * movimientos registrados o no los hay. `AXIS_FINAL` Parte VII §2 obliga a
 * comunicarlo antes de emitir cualquier recomendación.
 */
export function missingContext(context: AxisContext): string[] {
  const missing: string[] = [];

  if (context.movementCount === 0) {
    missing.push(
      "No hay ingresos ni gastos registrados, así que no se puede analizar tu evolución.",
    );
  }

  if (context.objectiveCount === 0) {
    missing.push(
      "No hay objetivos definidos: sin ellos no se puede saber para qué necesitas tu dinero.",
    );
  }

  if (context.investmentCount === 0) {
    missing.push("No hay inversiones registradas.");
  }

  return missing;
}

/**
 * Contexto mínimo para razonar.
 *
 * El criterio es el histórico de movimientos: sin él no hay situación
 * financiera que interpretar. La ausencia de objetivos o de inversiones limita
 * el análisis y se comunica, pero no lo impide.
 */
export function hasMinimumContext(context: AxisContext): boolean {
  return context.movementCount > 0;
}

/**
 * Estado actual del Centro Estratégico.
 *
 * NO LLAMA A NINGÚN PROVEEDOR DE IA. Mientras el motor no exista, el único
 * resultado posible con contexto suficiente es `preparing`: la interfaz está
 * lista y el análisis no se ha ejecutado. Nunca devuelve `ready`, porque no
 * hay nada que pueda producir un análisis real.
 */
export function useAxisScreenState(): AxisScreenState {
  const overview = useFinancialOverview();
  const objectives = useObjectives();
  const investments = useInvestments();

  if (overview === undefined) {
    return { status: "loading" };
  }

  const context: AxisContext = {
    patrimonioCents: overview.patrimonioCents,
    incomeCents: overview.summary.incomeCents,
    expenseCents: overview.summary.expenseCents,
    hasPeriodData: overview.hasPeriodData,
    movementCount: overview.movements.length,
    objectiveCount: objectives.length,
    investmentCount: investments.length,
  };

  if (!hasMinimumContext(context)) {
    return {
      status: "insufficient-context",
      context,
      missing: missingContext(context),
    };
  }

  return { status: "preparing", context };
}
