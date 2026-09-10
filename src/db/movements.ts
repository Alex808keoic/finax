/*
 * Acceso a datos de movimientos.
 *
 * La interfaz nunca habla directamente con Dexie (TECH_STACK.md §23).
 */

import { db } from "./db";
import type { Movement, MovementInput } from "../types/movement";
import { requiresMotivo } from "../types/movement";

function newId(): string {
  return crypto.randomUUID();
}

/** Limpia campos de texto: una cadena vacía equivale a ausencia de dato. */
function normalize(input: MovementInput): MovementInput {
  const motivo = input.motivo?.trim();
  const nota = input.nota?.trim();

  return {
    ...input,
    motivo: requiresMotivo(input.category) && motivo ? motivo : undefined,
    nota: nota ? nota : undefined,
  };
}

/**
 * Historial completo, del más reciente al más antiguo.
 * Dentro del mismo día ordena por fecha de creación descendente.
 */
export async function listMovements(): Promise<Movement[]> {
  const movements = await db.movements.toArray();
  return movements.sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }
    return b.createdAt - a.createdAt;
  });
}

export function getMovement(id: string): Promise<Movement | undefined> {
  return db.movements.get(id);
}

export async function addMovement(input: MovementInput): Promise<Movement> {
  const now = Date.now();
  const movement: Movement = {
    ...normalize(input),
    id: newId(),
    createdAt: now,
    updatedAt: now,
  };

  await db.movements.add(movement);
  return movement;
}

/**
 * Sustituye los datos editables del movimiento.
 *
 * Se escriben también los campos ausentes para que al cambiar de categoría no
 * sobreviva un motivo antiguo (Documento Maestro, Módulo 2 §8: cambios de
 * categoría).
 */
export async function updateMovement(
  id: string,
  input: MovementInput,
): Promise<void> {
  const normalized = normalize(input);

  await db.movements.update(id, {
    type: normalized.type,
    amountCents: normalized.amountCents,
    date: normalized.date,
    category: normalized.category,
    motivo: normalized.motivo,
    nota: normalized.nota,
    updatedAt: Date.now(),
  });
}

export async function deleteMovement(id: string): Promise<void> {
  await db.movements.delete(id);
}
