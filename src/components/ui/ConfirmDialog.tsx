/*
 * Confirmación explícita.
 *
 * Visual System §10 y §24.2; Design System §28; D-16.
 *
 * Las operaciones destructivas y los cambios sensibles requieren una
 * confirmación separada de la acción que la dispara.
 */

import { useEffect } from "react";
import { Button } from "./Button";

type ConfirmDialogProps = {
  open: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  destructive?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel,
  destructive = false,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onCancel();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="motion-fade absolute inset-0 bg-text-primary/30"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-label={title}
        className="motion-fade relative w-full max-w-[400px] rounded-[var(--radius)] bg-background p-5"
      >
        <h2 className="text-[20px] font-semibold">{title}</h2>
        <p className="mt-2 text-[16px] text-text-secondary">{description}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Button
            variant={destructive ? "danger" : "primary"}
            fullWidth
            onClick={onConfirm}
          >
            {confirmLabel}
          </Button>
          <Button variant="ghost" fullWidth onClick={onCancel}>
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
