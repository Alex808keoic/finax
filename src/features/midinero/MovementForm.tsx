/*
 * Formulario de movimiento (alta y edición).
 *
 * Visual System §23: cabecera, selector Ingreso/Gasto, cantidad, categoría,
 * Motivo cuando la categoría es «Otros», Nota opcional, fecha y Guardar.
 *
 * Reglas de producto aplicadas, sin cambios respecto a la implementación
 * anterior:
 * - listas de categorías independientes por tipo (D-04 gasto, D-13 ingreso);
 * - Motivo obligatorio siempre que la categoría sea «Otros» (D-13), y su
 *   texto sustituye a «Otros» en el historial;
 * - Nota opcional, disponible en todas las categorías, incluida «Otros» (D-05);
 * - sin campo «Cuenta»: Cuentas queda fuera de V1 (D-08);
 * - fecha sin hora (D-18);
 * - importes en céntimos (D-16);
 * - al corregir un campo, su error desaparece (§23.2).
 */

import { useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { controlClass, Field } from "../../components/ui/Field";
import { centsToInputValue, parseAmountToCents } from "../../lib/money";
import { isValidISODate, todayISO } from "../../lib/dates";
import {
  categoriesFor,
  requiresMotivo,
  type Category,
  type Movement,
  type MovementInput,
  type MovementType,
} from "../../types/movement";

type MovementFormProps = {
  initial?: Movement;
  submitLabel: string;
  onSubmit: (input: MovementInput) => Promise<void>;
};

type Errors = {
  amount?: string;
  category?: string;
  date?: string;
  motivo?: string;
};

/** El orden del selector sigue el §23.1; el valor por defecto sigue siendo gasto. */
const TYPE_OPTIONS: { value: MovementType; label: string }[] = [
  { value: "ingreso", label: "Ingreso" },
  { value: "gasto", label: "Gasto" },
];

export function MovementForm({ initial, submitLabel, onSubmit }: MovementFormProps) {
  const [type, setType] = useState<MovementType>(initial?.type ?? "gasto");
  const [amount, setAmount] = useState(
    initial ? centsToInputValue(initial.amountCents) : "",
  );
  const [category, setCategory] = useState<Category | "">(initial?.category ?? "");
  const [date, setDate] = useState(initial?.date ?? todayISO());
  const [motivo, setMotivo] = useState(initial?.motivo ?? "");
  const [nota, setNota] = useState(initial?.nota ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [saving, setSaving] = useState(false);

  const categories = categoriesFor(type);
  const motivoRequired = category !== "" && requiresMotivo(category);

  /** El error desaparece en cuanto el usuario corrige el campo. */
  function clearError(field: keyof Errors) {
    setErrors((previous) =>
      previous[field] ? { ...previous, [field]: undefined } : previous,
    );
  }

  function changeType(next: MovementType) {
    setType(next);
    // Las listas son independientes: una categoría de gasto no vale para un
    // ingreso, así que se limpia salvo que exista en ambas listas.
    if (category !== "" && !categoriesFor(next).includes(category)) {
      setCategory("");
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const amountCents = parseAmountToCents(amount);
    const nextErrors: Errors = {};

    if (amountCents === null) {
      nextErrors.amount = "Introduce un importe mayor que cero.";
    }
    if (category === "") {
      nextErrors.category = "Selecciona una categoría.";
    }
    if (!isValidISODate(date)) {
      nextErrors.date = "Introduce una fecha válida.";
    }
    if (motivoRequired && motivo.trim() === "") {
      nextErrors.motivo = "El motivo es obligatorio cuando la categoría es «Otros».";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0 || amountCents === null || category === "") {
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        type,
        amountCents,
        date,
        category,
        motivo: motivoRequired ? motivo.trim() : undefined,
        nota: nota.trim() || undefined,
      });
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset className="mb-5">
        <legend className="mb-2 block text-[13px] text-text-secondary">Tipo</legend>
        <div className="flex gap-2 rounded-[var(--radius)] bg-surface p-1">
          {TYPE_OPTIONS.map((option) => {
            const selected = type === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => changeType(option.value)}
                aria-pressed={selected}
                className={`h-11 flex-1 rounded-[var(--radius)] text-[16px] transition-colors duration-[var(--motion-fast)] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary ${
                  selected
                    ? "bg-primary font-medium text-text-primary"
                    : "text-text-secondary"
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <Field id="amount" label="Cantidad" error={errors.amount}>
        <div className="relative">
          <input
            id="amount"
            className={`${controlClass(Boolean(errors.amount))} pr-10 text-[20px] font-medium tabular-nums`}
            value={amount}
            onChange={(event) => {
              setAmount(event.target.value);
              clearError("amount");
            }}
            inputMode="decimal"
            placeholder="0,00"
            autoComplete="off"
            aria-invalid={Boolean(errors.amount)}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[16px] text-text-secondary"
          >
            €
          </span>
        </div>
      </Field>

      <Field id="category" label="Categoría" error={errors.category}>
        <select
          id="category"
          className={controlClass(Boolean(errors.category))}
          value={category}
          onChange={(event) => {
            setCategory(event.target.value as Category);
            clearError("category");
            clearError("motivo");
          }}
          aria-invalid={Boolean(errors.category)}
        >
          <option value="">Seleccionar</option>
          {categories.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </Field>

      {motivoRequired ? (
        <Field
          id="motivo"
          label="Motivo"
          error={errors.motivo}
          hint="Sustituirá a «Otros» en el historial."
        >
          <input
            id="motivo"
            className={controlClass(Boolean(errors.motivo))}
            value={motivo}
            onChange={(event) => {
              setMotivo(event.target.value);
              clearError("motivo");
            }}
            autoComplete="off"
            aria-invalid={Boolean(errors.motivo)}
          />
        </Field>
      ) : null}

      <Field id="nota" label="Nota (opcional)">
        <input
          id="nota"
          className={controlClass()}
          value={nota}
          onChange={(event) => setNota(event.target.value)}
          placeholder="Añade una nota…"
          autoComplete="off"
        />
      </Field>

      <Field id="date" label="Fecha" error={errors.date}>
        <input
          id="date"
          type="date"
          className={controlClass(Boolean(errors.date))}
          value={date}
          onChange={(event) => {
            setDate(event.target.value);
            clearError("date");
          }}
          aria-invalid={Boolean(errors.date)}
        />
      </Field>

      <Button type="submit" fullWidth disabled={saving} className="mt-2">
        {saving ? "Guardando…" : submitLabel}
      </Button>
    </form>
  );
}
