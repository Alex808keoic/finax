/*
 * Base de datos local (IndexedDB vía Dexie).
 *
 * Todos los datos de Finax viven en el dispositivo: la aplicación es
 * offline-first (Documento Maestro, Parte III §3; TECH_STACK.md §10).
 *
 * Índices declarados: solo los que se consultan. `id` es la clave primaria.
 */

import Dexie, { type EntityTable } from "dexie";
import type { Movement } from "../types/movement";

/**
 * Configuración de la aplicación. Registro único con clave "config".
 *
 * El saldo inicial es el punto de partida del patrimonio y NO es un movimiento
 * del historial (DECISIONES.md D-14). Por eso vive aquí y no en `movements`.
 */
export type AppConfig = {
  key: "config";
  initialBalanceCents: number;
  configuredAt: number;
  updatedAt: number;
};

export const CONFIG_KEY = "config" as const;

const db = new Dexie("finax") as Dexie & {
  movements: EntityTable<Movement, "id">;
  config: EntityTable<AppConfig, "key">;
};

db.version(1).stores({
  movements: "id, date, type, category",
  config: "key",
});

export { db };
