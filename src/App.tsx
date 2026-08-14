import { Navigate, Route, Routes } from "react-router-dom";
import { MockNav } from "./app/MockNav";
import { MODULE_ROUTES } from "./app/routes";

export default function App() {
  return (
    <>
      <MockNav />
      <main>
        <Routes>
          {MODULE_ROUTES.map(({ path, Component }) => (
            <Route key={path} path={path} element={<Component />} />
          ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );
}
