/*
 * Configuración de la aplicación.
 *
 * Contiene el saldo inicial (DECISIONES.md D-14): punto de partida del
 * patrimonio, establecido en el primer arranque y modificable después desde
 * Mi Dinero con confirmación explícita. Nunca aparece en el historial.
 */

import { CONFIG_KEY, db, type AppConfig } from "./db";

/**
 * Devuelve `null` cuando Finax todavía no está configurado.
 *
 * Se distingue de `undefined` a propósito: `useLiveQuery` devuelve `undefined`
 * mientras carga, así que «cargando» y «sin configurar» no pueden compartir
 * valor o el primer arranque parpadearía en cada carga.
 */
export async function getConfig(): Promise<AppConfig | null> {
  const config = await db.config.get(CONFIG_KEY);
  return config ?? null;
}

/** Primer arranque: deja la aplicación configurada. */
export async function setInitialBalance(cents: number): Promise<void> {
  const now = Date.now();
  const existing = await db.config.get(CONFIG_KEY);

  await db.config.put({
    key: CONFIG_KEY,
    initialBalanceCents: cents,
    configuredAt: existing?.configuredAt ?? now,
    updatedAt: now,
  });
}
