/*
 * Saludo de Inicio.
 *
 * Visual System §16.2 punto 1: «saludo personalizado».
 *
 * Se personaliza por el momento del día, que sale del reloj del dispositivo.
 * NO se personaliza con el nombre del usuario: Finax no guarda ningún nombre,
 * y escribirlo aquí sería inventar un dato que no existe. La referencia
 * visual muestra «Hola, Alex», pero ese nombre es MOCK (§36).
 */

export function greeting(now: Date = new Date()): string {
  const hour = now.getHours();

  if (hour < 6) {
    return "Buenas noches";
  }
  if (hour < 13) {
    return "Buenos días";
  }
  if (hour < 21) {
    return "Buenas tardes";
  }
  return "Buenas noches";
}
