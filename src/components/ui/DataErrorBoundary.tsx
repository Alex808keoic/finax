/*
 * Frontera de error de las pantallas con datos.
 *
 * Visual System §29: cada pantalla importante debe tener un estado de error
 * previsible, con explicación y recuperación cuando sea posible.
 *
 * El origen de fallo de estas pantallas es el almacenamiento local: si
 * IndexedDB no está disponible, `useLiveQuery` lanza durante el render. Sin
 * esta frontera el usuario vería una pantalla en blanco.
 *
 * No registra el error con datos financieros: `AXIS_FINAL` Parte XIV §14 pide
 * que los registros técnicos no almacenen patrimonio ni movimientos.
 */

import { Component, type ErrorInfo, type ReactNode } from "react";
import { Button } from "./Button";
import { ErrorState } from "./ErrorState";

type Props = {
  children: ReactNode;
};

type State = {
  failed: boolean;
};

export class DataErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error("Finax no ha podido cargar los datos", error.message, info.componentStack);
  }

  render(): ReactNode {
    if (this.state.failed) {
      return (
        <ErrorState
          title="No hemos podido cargar tus datos"
          description="Finax guarda tu información en este dispositivo y ahora mismo no puede acceder a ella. Tus movimientos no se han perdido."
          action={
            <Button fullWidth onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          }
        />
      );
    }

    return this.props.children;
  }
}
