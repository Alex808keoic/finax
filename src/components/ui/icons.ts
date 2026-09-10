/*
 * Iconografía del sistema.
 *
 * Visual System §12 y Design System §11: familia Lucide, trazo lineal y
 * consistente. Un único grosor para toda la aplicación, para que la interfaz
 * lea como un solo sistema y no como pantallas de orígenes distintos.
 *
 * El valor por defecto de Lucide es 2, que resulta pesado junto a Inter en los
 * tamaños que usa Finax. **Todo icono debe pasar `strokeWidth={ICON_STROKE}`**;
 * si se omite, ese icono se verá más grueso que el resto.
 *
 * Tamaños en uso, y solo estos:
 *   14  etiquetas
 *   16  texto acompañante
 *   20  controles, filas y navegación de contenido
 *   24  navegación inferior y marcadores grandes
 */

export const ICON_STROKE = 1.75;

export const ICON_SIZE = {
  label: 14,
  inline: 16,
  control: 20,
  large: 24,
} as const;
