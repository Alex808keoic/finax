/*
 * Chip de filtro / selector de periodo.
 *
 * Visual System §26 y §33; Design System §8.
 *
 * `--radius-full` es correcto aquí: los chips son uno de los pocos casos
 * donde el radio completo está permitido.
 *
 * El estado seleccionado se distingue por relleno y por `aria-pressed`,
 * no solo por color (§31).
 */

type FilterChipProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function FilterChip({ label, selected, onSelect }: FilterChipProps) {
  const tone = selected
    ? "bg-primary text-text-primary"
    : "bg-surface text-text-secondary border border-border";

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`inline-flex items-center justify-center rounded-full px-4 text-[13px] font-medium transition-colors duration-[var(--motion-fast)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${tone}`}
    >
      {label}
    </button>
  );
}
