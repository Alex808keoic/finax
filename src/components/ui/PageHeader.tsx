/*
 * Cabecera de pantalla.
 *
 * Visual System §16.2, §17.2 y §33.
 *
 * Dos tamaños, ambos de la escala aprobada (Design System §6):
 *   - `page` (32 px): pantallas principales.
 *   - `bar`  (20 px): superficies secundarias, normalmente con vuelta atrás.
 *
 * La acción de la derecha es el lugar previsto para el acceso a Ajustes,
 * que no está en la barra inferior (D-19).
 */

import type { ReactNode } from "react";
import { ArrowLeft } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "./icons";

type PageHeaderProps = {
  title: string;
  size?: "page" | "bar";
  /** Cuando existe, se muestra la vuelta atrás. */
  onBack?: () => void;
  /** Acción secundaria a la derecha. */
  action?: ReactNode;
  /** Contenido opcional bajo el título, como un saludo o un subtítulo. */
  children?: ReactNode;
};

export function PageHeader({
  title,
  size = "page",
  onBack,
  action,
  children,
}: PageHeaderProps) {
  const titleClass =
    size === "page"
      ? "text-[32px] font-semibold tracking-tight"
      : "text-[20px] font-semibold";

  return (
    <header className="px-4 pt-6 pb-4">
      <div className="flex items-center gap-2">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Volver"
            className="-ml-2 flex w-[var(--touch-target-min)] shrink-0 items-center justify-center rounded-[var(--radius)] text-text-primary transition-colors duration-[var(--motion-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <ArrowLeft size={ICON_SIZE.control} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </button>
        ) : null}

        <h1 className={`flex-1 ${titleClass}`}>{title}</h1>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>

      {children ? <div className="mt-1">{children}</div> : null}
    </header>
  );
}
