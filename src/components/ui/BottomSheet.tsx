/*
 * Bottom Sheet.
 *
 * Visual System §23.1; Design System §28.
 *
 * Apropiado para formularios breves y superficies secundarias en móvil.
 * Se cierra con Escape o pulsando fuera. Respeta las safe areas.
 */

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";
import { ICON_SIZE, ICON_STROKE } from "./icons";

type BottomSheetProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function BottomSheet({ open, title, onClose, children }: BottomSheetProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div
        className="motion-fade absolute inset-0 bg-text-primary/30"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="motion-slide-up relative flex max-h-[92dvh] w-full max-w-[560px] flex-col rounded-t-[var(--radius)] bg-background"
      >
        <div className="flex justify-center pt-2" aria-hidden="true">
          <span className="h-1 w-9 rounded-full bg-border" />
        </div>

        <header className="flex items-center justify-between gap-4 px-4 pt-3 pb-4">
          <h2 className="text-[20px] font-semibold">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="-mr-2 flex w-[var(--touch-target-min)] shrink-0 items-center justify-center rounded-[var(--radius)] text-text-secondary transition-colors duration-[var(--motion-fast)] hover:text-text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            <X size={ICON_SIZE.control} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </button>
        </header>

        <div className="overflow-y-auto px-4 pb-[max(16px,env(safe-area-inset-bottom))]">
          {children}
        </div>
      </div>
    </div>
  );
}
