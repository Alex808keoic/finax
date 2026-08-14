/*
 * Placeholder temporal de módulo.
 *
 * Existe únicamente para que el esqueleto de navegación sea verificable.
 * No representa la interfaz final de ningún módulo y debe sustituirse
 * cuando cada módulo se implemente según el Documento Maestro.
 */

type ModulePlaceholderProps = {
  title: string;
};

export function ModulePlaceholder({ title }: ModulePlaceholderProps) {
  return (
    <section className="px-4 py-6">
      <h1 className="text-[32px] font-semibold tracking-tight">{title}</h1>
      <p className="mt-2 text-[13px] text-text-secondary">
        Módulo pendiente de implementación.
      </p>
    </section>
  );
}
