
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format} from "date-fns"
import { es } from "date-fns/locale"
import { Appointment } from "@/types/appointments"
import { useRouter } from "next/navigation"
import { getStatusColor, getStatusText } from "../../types/status"
import { getAppointments } from "@/services/appointments"
import { AppointmentModal } from "../appointments/AppointmentModal"

export default function AgendaView() {

  const router = useRouter();

  const getAppointmentsRows = async (): Promise<Appointment[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token || token === null){
      router.push("/auth/login")
    }

    const appData = await getAppointments(token)
    return appData.rows;
  } catch (error) {
    console.error(error)
    return []
  }
}

  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [open, setOpen] = useState(false)

useEffect(() => {
  const fetchAppointments = async () => {
    const data = await getAppointmentsRows()
    if (data) {
      setAppointments(data)
    }
  }

  fetchAppointments()
}, [])

  const selectApp = (app: Appointment) => {
    setSelectedAppointment(app)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (open){
    return (
      <AppointmentModal appointment={selectedAppointment!} handleClose={handleClose} />
    )
  }

  return (
  <div className="h-screen p-6">
  <Card className="h-full">
    <CardContent className="h-full">
      <div className="grid grid-cols-2 gap-6 h-full">
        {/* Calendario */}
        <div className="flex justify-center items-start">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            locale={es}
            className="w-100 h-100 rounded-md border shadow-md"
          />
        </div>

        {/* Lista de turnos */}
        <div className="overflow-y-auto">
          <h3 className="text-lg font-semibold mb-4">
            Turnos para {format(selectedDate, "dd 'de' MMMM, yyyy", { locale: es })}
          </h3>
          <div className="space-y-3">
            {appointments
              .filter((appointment) => appointment.date === format(selectedDate, "yyyy-MM-dd"))
              .map((appointment) => (
                <Card
                  key={appointment.appointmentId}
                  className="p-4 cursor-pointer hover:shadow-md transition-shadow duration-200"
                  onClick={() => selectApp(appointment)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">
                        {appointment.name} {appointment.lastName}
                      </h4>
                      <p className="text-sm text-gray-600">{appointment.time}</p>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>
                      {getStatusText(appointment.status)}
                    </Badge>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</div>

  )
}
