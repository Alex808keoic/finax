/*
 * Icono por categoría.
 *
 * Visual System §12 y §18.3: la fila de movimiento lleva un icono/marcador y
 * los iconos deben aportar significado.
 *
 * Todos los iconos comparten la misma lógica: familia Lucide, trazo outline,
 * misma escala y el mismo grosor del sistema (`ICON_STROKE`). Ninguno
 * es macizo ni de otra familia, para que la lista lea como un único sistema.
 *
 * IMPORTANTE — D-03 SIGUE ABIERTA.
 * Este mapa asigna únicamente una FORMA a cada categoría, nunca un color. La
 * paleta categórica no está aprobada, así que el marcador de la fila usa
 * colores neutros del sistema. No añadir aquí colores por categoría.
 *
 * Las categorías son exactamente las aprobadas en D-04 (gasto) y D-13
 * (ingreso). Si alguna vez llega una categoría desconocida, se usa el icono
 * genérico en lugar de fallar.
 */

import { Briefcase, Candy, Gift, Shirt, ShoppingCart, Tag, Ticket, Utensils } from "lucide-react";
import type { ComponentType } from "react";
import type { Category } from "../../types/movement";

export type IconComponent = ComponentType<{
  size?: number;
  strokeWidth?: number;
  className?: string;
}>;


const ICONS: Record<Category, IconComponent> = {
  // Gasto (D-04)
  Comida: ShoppingCart,
  Restaurantes: Utensils,
  Salidas: Ticket,
  Caprichos: Candy,
  Ropa: Shirt,
  // Ingreso (D-13)
  Trabajo: Briefcase,
  Regalos: Gift,
  // Presente en ambas listas
  Otros: Tag,
};

export function categoryIcon(category: Category): IconComponent {
  return ICONS[category] ?? Tag;
}
