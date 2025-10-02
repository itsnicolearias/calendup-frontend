import { AppointmentStatus } from "@/types/appointments"
import { AlertCircle, CalendarCheck, CheckCircle, Clock, X, XCircle } from "lucide-react"

export const STATUS_CONFIG = {
  confirmed: { color: "bg-green-100 text-green-800 border-green-200", label: "Confirmados", icon: <CheckCircle className="w-4 h-4" /> },
  completed: { color: "bg-blue-100 text-blue-800 border-blue-200", label: "Completados", icon: <CalendarCheck className="w-4 h-4" /> },
  pending:   { color: "bg-yellow-100 text-yellow-800 border-yellow-200", label: "Pendientes", icon: <Clock className="w-4 h-4" />  },
  cancelled: { color: "bg-red-100 text-red-800 border-red-200", label: "Rechazados", icon: <X className="w-4 h-4" /> }
} as const

export function getStatusColor(status: AppointmentStatus) {
  return STATUS_CONFIG[status]?.color ?? "bg-gray-100 text-gray-800 border-gray-200"
}

export function getStatusText(status: AppointmentStatus) {
  return STATUS_CONFIG[status]?.label ?? status
}

export function getStatusIcon(status: AppointmentStatus) {
  return STATUS_CONFIG[status]?.icon ?? status
}

export const statusConfig = {
  pending: {
    label: "Pendientes",
    color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    icon: AlertCircle,
    iconColor: "text-yellow-600",
    count: 0,
  },
  confirmed: {
    label: "Confirmados",
    color: "bg-green-100 text-green-800 border-green-200",
    icon: CheckCircle,
    iconColor: "text-green-600",
    count: 0,
  },
  completed: {
    label: "Completados",
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: CheckCircle,
    iconColor: "text-blue-600",
    count: 0,
  },
  cancelled: {
    label: "Cancelados",
    color: "bg-red-100 text-red-800 border-red-200",
    icon: XCircle,
    iconColor: "text-red-600",
    count: 0,
  },
}