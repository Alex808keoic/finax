/*
 * Placeholder temporal de módulo.
 *
 * Existe únicamente para que el esqueleto de navegación sea verificable.
 * No representa la interfaz final de ningún módulo y debe sustituirse
 * cuando cada módulo se implemente según el Documento Maestro y el
 * Visual System.
 */

import { PageHeader } from "./ui/PageHeader";

type ModulePlaceholderProps = {
  title: string;
};

export function ModulePlaceholder({ title }: ModulePlaceholderProps) {
  return (
    <section className="mx-auto max-w-[560px]">
      <PageHeader title={title} />
      <p className="px-4 text-[13px] text-text-secondary">
        Módulo pendiente de implementación.
      </p>
    </section>
  );
}
