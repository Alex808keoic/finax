/*
 * Campo de búsqueda.
 *
 * Visual System §18.2: la búsqueda es el segundo elemento de Movimientos.
 *
 * No inventa un lenguaje visual nuevo: usa el mismo control que el resto de
 * formularios (`controlClass`, Design System §27), con el icono a la izquierda
 * y el borrado a la derecha. El texto es de 16 px a propósito: en iOS, un
 * campo con menos de 16 px hace que el navegador amplíe la página al enfocarlo.
 *
 * La etiqueta existe siempre para los lectores de pantalla, aunque
 * visualmente el placeholder sea suficiente.
 */

import { Search, X } from "lucide-react";
import { controlClass } from "./Field";
import { ICON_SIZE, ICON_STROKE } from "./icons";

type SearchFieldProps = {
  id: string;
  /** Etiqueta accesible; no se muestra. */
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
};

export function SearchField({
  id,
  label,
  placeholder,
  value,
  onChange,
}: SearchFieldProps) {
  return (
    <div className="relative">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-muted-nontext"
      >
        <Search size={ICON_SIZE.inline} strokeWidth={ICON_STROKE} />
      </span>

      <input
        id={id}
        type="search"
        inputMode="search"
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={`${controlClass()} pl-10 pr-11 [&::-webkit-search-cancel-button]:hidden`}
      />

      {value !== "" ? (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Borrar búsqueda"
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-[var(--radius)] text-text-secondary transition-colors duration-[var(--motion-fast)] hover:text-text-primary focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
        >
          <X size={ICON_SIZE.inline} strokeWidth={ICON_STROKE} aria-hidden="true" />
        </button>
      ) : null}
    </div>
  );
}
