"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, Clock, Mail, Phone, User } from "lucide-react"
import { format } from "date-fns"
import { parseLocalDate } from "@/utils/date"
import { Appointment, AppointmentStatus } from "@/types/appointments"
import { updateAppointment } from "@/services/appointments"
import { StatusDropdown } from "./StatusDropdown"
import { useState } from "react"
import { toast } from "sonner"

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
      <DialogContent className="max-w-md rounded-2xl shadow-lg">
        <DialogHeader>
          <div className="flex justify-between items-center">
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
            Detalles del Turno                 
          </DialogTitle>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
              #{appointment.appointmentCode}
          </h1>
                      
          </div>
          
          <DialogDescription>Información completa del turno seleccionado</DialogDescription>
        </DialogHeader>

        {appointment && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {appointment.name} {appointment.lastName}
              </h3>
              <StatusDropdown
                currentStatus={currentStatus}
                statuses={["cancelled", "completed", "confirmed", "pending"]}
                onChange={handleChangeStatus}
                        />
            </div>

            <div className="space-y-3">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <User className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Nombre completo</p>
                  <p className="text-sm text-gray-600">
                    {appointment.name} {appointment.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Email</p>
                  <p className="text-sm text-gray-600">{appointment.email}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Celular</p>
                  <p className="text-sm text-gray-600">{appointment.phone}</p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <CalendarIcon className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Fecha</p>
                  <p className="text-sm text-gray-600">
                    {format(parseLocalDate(appointment.date), "dd-MM-yyyy")}
                  </p>
                </div>
              </div>

              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Hora</p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                </div>
              </div>

              {appointment.reason && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-900 mb-1">Datos del turno</p>
                  <p className="text-sm text-gray-600">{appointment.reason}</p>
                </div>
              )}
            </div>


          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
