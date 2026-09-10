/*
 * Formulario del saldo inicial.
 *
 * Se usa en el primer arranque y también al modificarlo desde Mi Dinero
 * (D-14). La confirmación explícita de la modificación la gestiona quien
 * utiliza este formulario, no el formulario en sí.
 */

import { useState, type FormEvent } from "react";
import { Button } from "../../components/ui/Button";
import { controlClass, Field } from "../../components/ui/Field";
import { centsToInputValue, parseBalanceToCents } from "../../lib/money";

type InitialBalanceFormProps = {
  initialCents?: number;
  submitLabel: string;
  onSubmit: (cents: number) => Promise<void>;
};

export function InitialBalanceForm({
  initialCents,
  submitLabel,
  onSubmit,
}: InitialBalanceFormProps) {
  const [value, setValue] = useState(
    initialCents === undefined ? "" : centsToInputValue(initialCents),
  );
  const [error, setError] = useState<string>();
  const [saving, setSaving] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const cents = parseBalanceToCents(value);
    if (cents === null) {
      setError("Introduce un importe válido. Puede ser 0.");
      return;
    }

    setError(undefined);
    setSaving(true);
    try {
      await onSubmit(cents);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field
        id="initial-balance"
        label="Saldo inicial"
        error={error}
        hint="Punto de partida de tu patrimonio. No aparecerá en el historial."
      >
        <div className="relative">
          <input
            id="initial-balance"
            className={`${controlClass(Boolean(error))} pr-10 text-[20px] font-medium tabular-nums`}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              setError(undefined);
            }}
            inputMode="decimal"
            placeholder="0,00"
            autoComplete="off"
            aria-invalid={Boolean(error)}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-[16px] text-text-secondary"
          >
            €
          </span>
        </div>
      </Field>

      <Button type="submit" fullWidth disabled={saving} className="mt-2">
        {saving ? "Guardando…" : submitLabel}
      </Button>
    </form>
  );
}
