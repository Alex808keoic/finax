/*
 * Primer arranque.
 *
 * Aparece antes de acceder a la aplicación y solo sirve para establecer el
 * saldo inicial (D-14). No es un módulo de Ajustes ni añade ninguna otra
 * configuración.
 */

import { setInitialBalance } from "../../db/config";
import { InitialBalanceForm } from "../midinero/InitialBalanceForm";

export function OnboardingScreen() {
  return (
    <main className="mx-auto max-w-[560px] px-4 py-12">
      <h1 className="text-[32px] font-semibold tracking-tight">Bienvenido a Finax</h1>
      <p className="mt-2 mb-8 text-[16px] text-text-secondary">
        Para empezar, indica el dinero con el que partes. Será el punto de partida de
        tu patrimonio y podrás modificarlo más adelante desde Mi Dinero.
      </p>

      <InitialBalanceForm
        submitLabel="Empezar"
        onSubmit={(cents) => setInitialBalance(cents)}
      />
    </main>
  );
}
