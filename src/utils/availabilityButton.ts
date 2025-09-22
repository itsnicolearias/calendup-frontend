import { getAvailableSlots } from "@/services/appointments"

export const obtainAvailabilityTags = async (professionalId: string) => {
try {
    const date = new Date()
    const currentYear = date.getFullYear()
    const currentMonth = date.getMonth() + 1
    const avaiableSlots = await getAvailableSlots(professionalId, currentYear, currentMonth)

    if (avaiableSlots) {
      const tags = getAvailabilityTag(avaiableSlots);
      return tags;
    }
    return null

} catch (error) {
   throw error;
}
}

function getAvailabilityTag(availability: Record<string, string[]>): string | null {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  // inicio y fin de semana
  const weekStart = new Date(today);
  weekStart.setDate(today.getDate() - today.getDay());
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const availableDates = Object.keys(availability).map(d => new Date(d));

  if (availableDates.some(d => isSameDate(d, today))) {
    return AvailabilityTag.TODAY;
  }

  if (availableDates.some(d => isSameDate(d, tomorrow))) {
    return AvailabilityTag.TOMORROW;
  }

  if (availableDates.some(d => d >= weekStart && d <= weekEnd)) {
    return AvailabilityTag.THIS_WEEK;
  }

  return null; // no hay disponibilidad
}

function isSameDate(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() &&
         a.getMonth() === b.getMonth() &&
         a.getDate() === b.getDate();
}

export enum AvailabilityTag {
  EVERY_MOMENT = "Cualquier momento",
  TODAY = "Disponible hoy",
  TOMORROW = "Disponible mañana",
  THIS_WEEK = "Disponible esta semana",
  THIS_MONTH = "Este mes"
}