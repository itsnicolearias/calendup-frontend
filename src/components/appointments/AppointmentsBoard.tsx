import { Appointment, AppointmentStatus } from "@/types/appointments"
import { AppointmentCard } from "./AppointmentCard"
import { updateAppointment } from "@/services/appointments"
import { getStatusText } from "./status"

interface Props {
  appointments: Appointment[]
  onOpen: (appointment: Appointment) => void
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>
}

export function AppointmentsBoard({ appointments, onOpen, setAppointments }: Props) {
  const handleDragStart = (e: React.DragEvent, appointment: Appointment) => {
    e.dataTransfer.setData("appointmentId", appointment.appointmentId.toString())
  }

  const handleDrop = async (e: React.DragEvent, status: AppointmentStatus) => {
    const appointmentId = e.dataTransfer.getData("appointmentId")
    setAppointments((prev) =>
      prev.map((a) => (a.appointmentId.toString() === appointmentId ? { ...a, status } : a))
    )
    try {
      const token = localStorage.getItem("token")
      await updateAppointment({ appointmentId, status }, token, false)
    } catch (error) {
      console.error(error)
    }
  }

  const statuses: { key: AppointmentStatus; color: string; dot: string }[] = [
    { key: "pending", color: "text-yellow-700", dot: "bg-yellow-500" },
    { key: "confirmed", color: "text-green-700", dot: "bg-green-500" },
    { key: "cancelled", color: "text-red-700", dot: "bg-red-500" },
  ]

  return (
    <div>
      {/* Header con gradiente */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Mis Turnos
        </h1>
        <p className="text-gray-600 mt-2">Arrastra los turnos entre columnas para cambiar su estado</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statuses.map(({ key, color, dot }) => (
          <div
            key={key}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, key)}
            className="min-h-[400px] transition-colors duration-200"
          >
            <div className="h-full bg-white shadow rounded-xl p-4">
              <h3 className={`font-semibold flex items-center mb-3 ${color}`}>
                <div className={`w-3 h-3 rounded-full mr-2 ${dot}`}></div>
                {getStatusText(key)}
              </h3>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {appointments
                  .filter((a) => a.status === key)
                  .map((a) => (
                    <AppointmentCard
                      key={a.appointmentId}
                      appointment={a}
                      onOpen={onOpen}
                      onDragStart={handleDragStart}
                    />
                  ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
