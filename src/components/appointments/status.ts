import { AppointmentStatus } from "@/types/appointments"

export const STATUS_CONFIG = {
  confirmed: { color: "bg-green-100 text-green-800 border-green-200", label: "Confirmado" },
  pending:   { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pendiente" },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200", label: "Rechazado" }
} as const

export function getStatusColor(status: AppointmentStatus) {
  return STATUS_CONFIG[status]?.color ?? "bg-gray-100 text-gray-800 border-gray-200"
}

export function getStatusText(status: AppointmentStatus) {
  return STATUS_CONFIG[status]?.label ?? status
}
