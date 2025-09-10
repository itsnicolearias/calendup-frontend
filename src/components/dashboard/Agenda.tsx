
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
import { CreateAppointmentModal } from "./CreateAppointmentModal"
import { Button } from "../ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip"
import { CopyCheck } from "lucide-react"
import { useUser } from "@/contexts/UserContext"

export default function AgendaView() {

  const router = useRouter();

  const { user } = useUser()

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
  const [openAppModal, setOpenAppModal] = useState(false)

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

  const appointmentLink = user ? `${process.env.NEXT_PUBLIC_FRONT_URL}/appointments/create?professionalId=${user.userId}` : '';

  return (
  <div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contenedor flex para título y botón */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Mi Agenda
          </h1>

          <div className="flex items-center gap-2">
                <Tooltip>
                <TooltipTrigger asChild>
                  <button 
                    className="p-2 rounded-full  hover:bg-gray-100" 
                    onClick={() => navigator.clipboard.writeText(`${appointmentLink}`)} 
                    disabled={!user || !user.profile?.profileCompleted} 
                    >
                    <CopyCheck className="w-5 h-5 text-black"  />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Comparte tu link de agendamiento</p>
                </TooltipContent>
              </Tooltip>

          
          {/* Botón para abrir modal */}
          <Button 
            className="sm:ml-4 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 " 
            onClick={() => setOpenAppModal(true)} 
            disabled={!user || !user.profile?.profileCompleted}>
            Nuevo Turno
          </Button>
          </div>
          
        </div>

        <CreateAppointmentModal open={openAppModal} onClose={() => setOpenAppModal(false)} />

        <p className="text-gray-600 mt-2">
          Puedes visualizar y abrir el detalle de cada turno haciendo click sobre él.
        </p>
    </div>

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
  
</div>

  )
}
