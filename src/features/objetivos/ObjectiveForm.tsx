/*
 * Crear objetivo — preparación visual.
 *
 * Visual System §41.1: nombre, cantidad objetivo, fecha objetivo, vista previa
 * del progreso y `Crear objetivo`.
 *
 * IMPORTANTE: NO GUARDA NADA. El módulo de Objetivos no tiene modelo de datos
 * ni persistencia, así que la acción principal está deshabilitada y se explica
 * por qué. Fingir que guarda sería peor que no ofrecerlo (§29: un estado
 * deshabilitado debe tener una causa comprensible).
 *
 * NO hay campo de ahorro mensual ni de aportación: el Documento Maestro
 * (Módulo 5 §6 y §11) establece que el progreso se calcula solo, a partir de
 * los datos financieros reales, y que no existen aportaciones manuales.
 *
 * NO hay imágenes ni iconos decorativos (§21.3).
 */

import { useState } from "react";
import { Button } from "../../components/ui/Button";
import { ObjectiveCard } from "../../components/ui/ObjectiveCard";
import { controlClass, Field } from "../../components/ui/Field";
import { formatFullDate, isValidISODate } from "../../lib/dates";
import { formatEUR, parseAmountToCents } from "../../lib/money";

export function ObjectiveForm() {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("");
  const [date, setDate] = useState("");

  const targetCents = parseAmountToCents(target);
  const previewName = name.trim() || "Tu objetivo";
  const previewTarget = targetCents === null ? "—" : formatEUR(targetCents);
  const previewDate = isValidISODate(date) ? formatFullDate(date) : undefined;

  return (
    <form onSubmit={(event) => event.preventDefault()} noValidate>
      <Field id="objective-name" label="Nombre">
        <input
          id="objective-name"
          className={controlClass()}
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Viaje, coche, fondo de emergencia…"
          autoComplete="off"
        />
      </Field>

      <Field id="objective-target" label="Cantidad objetivo">
        <div className="relative">
          <input
            id="objective-target"
            className={`${controlClass()} pr-10 text-[20px] font-medium tabular-nums`}
            value={target}
            onChange={(event) => setTarget(event.target.value)}
            inputMode="decimal"
            placeholder="0,00"
            autoComplete="off"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[16px] text-text-secondary"
          >
            €
          </span>
        </div>
      </Field>

      <Field id="objective-date" label="Fecha objetivo (opcional)">
        <input
          id="objective-date"
          type="date"
          className={controlClass()}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </Field>

      {/* Vista previa: el progreso arranca en cero porque todavía no hay
          datos que lo alimenten. No se simula avance. */}
      <div className="mb-4">
        <p className="mb-2 text-[13px] text-text-secondary">Vista previa</p>
        <ObjectiveCard
          name={previewName}
          progress={0}
          currentLabel={formatEUR(0)}
          targetLabel={previewTarget}
          dateLabel={previewDate}
        />
      </div>

      <Button type="submit" fullWidth disabled>
        Crear objetivo
      </Button>

      <p className="mt-3 text-center text-[13px] text-text-secondary">
        Guardar objetivos todavía no está disponible: el módulo aún no almacena
        datos.
      </p>
    </form>
  );
}
