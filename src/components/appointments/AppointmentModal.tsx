"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, Clock, Link2, LocateIcon, Mail, Phone, User } from "lucide-react"
import { format } from "date-fns"
import { parseLocalDate } from "@/utils/date"
import { Appointment, AppointmentStatus } from "@/types/appointments"
import { updateAppointment } from "@/services/appointments"
import { StatusDropdown } from "./StatusDropdown"
import { useState } from "react"
import { toast } from "sonner"
import Link from "next/link"

export function AppointmentModal({ appointment, handleClose }: { appointment: Appointment, handleClose: () => void }) {

   const [currentStatus, setCurrentStatus] = useState(appointment.status)

   const handleChangeStatus = async (newStatus: AppointmentStatus) => {
    try {
      const token = localStorage.getItem("token")
      await updateAppointment({ appointmentId: appointment.appointmentId, status: newStatus }, token, false)
      setCurrentStatus(newStatus)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
    }
  }

  return (
  <Dialog open={!!appointment} onOpenChange={handleClose}>
    <DialogContent
      className="
        w-[95%] max-w-lg sm:max-w-md md:max-w-lg 
        max-h-[90vh] overflow-y-auto
        rounded-2xl shadow-xl p-6 
        scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
      "
    >
      <DialogHeader>
        {/* Header adaptativo */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <DialogTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
            Detalles del Turno
          </DialogTitle>
          <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
            #{appointment?.appointmentCode}
          </h1>
        </div>
        <DialogDescription>
          Información completa del turno seleccionado
        </DialogDescription>
      </DialogHeader>

      {appointment && (
        <div className="mt-4 space-y-4">
          {/* Nombre y estado */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <h3 className="text-lg font-semibold break-words">
              {appointment.name} {appointment.lastName}
            </h3>
            <div className="w-full sm:w-auto">
              <StatusDropdown
                currentStatus={currentStatus}
                statuses={["cancelled", "completed", "confirmed", "pending"]}
                onChange={handleChangeStatus}
              />
            </div>
          </div>

          {/* Datos del turno */}
          <div className="space-y-3">
            {[
              {
                icon: <User className="w-5 h-5 mr-3 text-gray-600" />,
                label: "Nombre completo",
                value: `${appointment.name} ${appointment.lastName}`,
              },
              {
                icon: <Mail className="w-5 h-5 mr-3 text-gray-600" />,
                label: "Email",
                value: appointment.email,
              },
              {
                icon: <Phone className="w-5 h-5 mr-3 text-gray-600" />,
                label: "Celular",
                value: appointment.phone,
              },
              {
                icon: <CalendarIcon className="w-5 h-5 mr-3 text-gray-600" />,
                label: "Fecha",
                value: format(parseLocalDate(appointment.date), "dd-MM-yyyy"),
              },
              {
                icon: <Clock className="w-5 h-5 mr-3 text-gray-600" />,
                label: "Hora",
                value: appointment.time,
              },
              {
                icon: <LocateIcon className="w-5 h-5 mr-3 text-gray-600" />,
                label: "Modalidad",
                value:
                  appointment.selectedAppMode === "in_person"
                    ? "Presencial"
                    : "Online",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center p-3 bg-gray-50 rounded-lg">
                {item.icon}
                <div className="flex-1 break-words">
                  <p className="text-sm font-medium text-gray-900">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-600">{item.value}</p>
                </div>
              </div>
            ))}

            {/* Link para reuniones online */}
            {appointment.selectedAppMode === "online" && appointment.meetingLink && (
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Link2 className="w-5 h-5 mr-3 text-gray-600" />
                  <div className="flex-1 break-words"> 
<p className="text-sm font-medium text-gray-900">
                  Ingresar a reunión online
                </p>
                <p className="text-sm text-blue-600 break-words">
                  <Link href={  appointment.meetingLink  } rel="noopener noreferrer" > {appointment.meetingLink}</Link>
                </p>
                  </div>
                
              </div>
            )}

            {/* Motivo del turno */}
            {appointment.reason && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-gray-900 mb-1">
                  Datos del turno
                </p>
                <p className="text-sm text-gray-600 break-words">
                  {appointment.reason}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </DialogContent>
  </Dialog>
);

}
