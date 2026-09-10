import { useLiveQuery } from "dexie-react-hooks";
import { Navigate, Route, Routes } from "react-router-dom";
import { MODULE_ROUTES } from "./app/routes";
import { BottomNavigation } from "./components/ui/BottomNavigation";
import { LoadingState } from "./components/ui/LoadingState";
import { getConfig } from "./db/config";
import { OnboardingScreen } from "./features/onboarding/OnboardingScreen";

export default function App() {
  const config = useLiveQuery(getConfig, []);

  // undefined = cargando; null = Finax todavía no está configurado.
  if (config === undefined) {
    return <LoadingState />;
  }

  // El saldo inicial se establece antes de acceder a la aplicación (D-14).
  // El primer arranque no muestra la navegación: todavía no hay dónde navegar.
  if (config === null) {
    return <OnboardingScreen />;
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex-1">
        <Routes>
          {MODULE_ROUTES.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <BottomNavigation />
    </div>
  );
}
