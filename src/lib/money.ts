/*
 * Dinero.
 *
 * Los importes se guardan como enteros en céntimos y solo se convierten a
 * decimal para mostrarlos (DECISIONES.md D-16). Formato EUR/es-ES.
 */

/*
 * SEPARADOR DE MILLARES
 *
 * `useGrouping: true` es deliberado. Por defecto, `Intl` aplica al español
 * la regla CLDR de agrupación mínima: los números de cuatro cifras se escriben
 * SIN separador, de modo que 3486,70 € era correcto y 13.486,70 € también.
 *
 * Finax prefiere el separador siempre, aprobado el 2026-08-16: en una
 * aplicación financiera todos los importes deben leerse igual, y que el mismo
 * patrimonio cambie de formato al cruzar las cinco cifras dificulta comparar
 * de un vistazo.
 *
 * Afecta ÚNICAMENTE a la presentación. Los importes se siguen guardando y
 * calculando como enteros en céntimos (D-16).
 *
 * `true` equivale a `"always"` en ECMA-402; se usa el booleano porque es lo
 * que admiten los tipos de TypeScript en esta configuración.
 */
const formatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  useGrouping: true,
});

/** Formatea céntimos como importe en euros. Admite valores negativos. */
export function formatEUR(cents: number): string {
  return formatter.format(cents / 100);
}

/**
 * Formatea un importe con signo explícito.
 *
 * La distinción entre ingreso y gasto se comunica mediante el signo y nunca
 * mediante el color: el color de ingresos frente a gastos sigue PENDIENTE
 * (D-02) y el §31 del Design System prohíbe depender solo del color.
 */
export function formatSignedEUR(signedCents: number): string {
  if (signedCents > 0) {
    return `+${formatEUR(signedCents)}`;
  }
  return formatEUR(signedCents);
}

/**
 * Convierte lo que escribe el usuario en céntimos.
 *
 * Trabaja sobre la cadena para no introducir errores de coma flotante:
 * "12,5" → 1250, no 1249,9999.
 *
 * Devuelve null si el texto no es un importe válido y mayor que cero.
 */
export function parseAmountToCents(raw: string): number | null {
  const cents = parseDecimalToCents(raw);
  return cents !== null && cents > 0 ? cents : null;
}

/**
 * Igual que `parseAmountToCents`, pero admite cero.
 *
 * El saldo inicial puede ser cero: quien empieza sin nada ahorrado también
 * debe poder configurar Finax (D-14).
 */
export function parseBalanceToCents(raw: string): number | null {
  return parseDecimalToCents(raw);
}

function parseDecimalToCents(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, "").replace(",", ".");

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const [whole, fraction = ""] = normalized.split(".");
  const cents = Number(whole) * 100 + Number(fraction.padEnd(2, "0"));

  return Number.isSafeInteger(cents) ? cents : null;
}

/** Representación editable de un importe, para rellenar un formulario. */
export function centsToInputValue(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);
  const whole = Math.trunc(abs / 100);
  const fraction = String(abs % 100).padStart(2, "0");
  return `${sign}${whole},${fraction}`;
}
