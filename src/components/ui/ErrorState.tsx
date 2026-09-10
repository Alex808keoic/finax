/*
 * Estado de error.
 *
 * Visual System §29; Design System §23.
 *
 * Explica el problema en lenguaje comprensible y ofrece recuperación cuando
 * es posible. No mostrar información técnica innecesaria.
 */

import type { ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "./icons";

type ErrorStateProps = {
  title: string;
  description: string;
  /** Acción de recuperación, cuando exista alguna. */
  action?: ReactNode;
};

export function ErrorState({ title, description, action }: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center px-4 py-12 text-center"
    >
      <span
        aria-hidden="true"
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-warning"
      >
        <AlertTriangle size={ICON_SIZE.control} strokeWidth={ICON_STROKE} />
      </span>
      <p className="text-[16px] font-medium">{title}</p>
      <p className="mt-2 max-w-[36ch] text-[13px] text-text-secondary">
        {description}
      </p>
      {action ? <div className="mt-6 w-full max-w-[280px]">{action}</div> : null}
    </div>
  );
}
