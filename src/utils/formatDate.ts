/**
 * Formatea una fecha en formato ISO (ej: "2026-10-14T12:00:00Z") a un formato legible en español
 * @param isoString Fecha en formato ISO string
 * @returns Fecha formateada (ej: "14/10/2026 12:00") o texto por defecto si es inválida
 */
export function formatDate(isoString: string): string {
  if (!isoString) {
    return 'Fecha no disponible';
  }

  try {
    const date = new Date(isoString);
    
    // Verificamos si la fecha es válida
    if (isNaN(date.getTime())) {
      return 'Fecha no disponible';
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  } catch {
    return 'Fecha no disponible';
  }
}
