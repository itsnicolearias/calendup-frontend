
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format} from "date-fns"
import { es } from "date-fns/locale"
import { Appointment, GetAllAppResponse } from "@/types/appointments"
import { useRouter } from "next/navigation"
import { getStatusColor, getStatusText } from "../../types/status"
import { getAppointments } from "@/services/appointments"
import { AppointmentModal } from "../appointments/AppointmentModal"
import { CreateAppointmentModal } from "./CreateAppointmentModal"
import { Button } from "../ui/button"
import { Copy, Plus } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { toast } from "sonner"
import DashboardSidebarMain from "./sidebar/SidebarMain"

export default function AgendaView() {

  const router = useRouter();

  const { user } = useUser()
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [open, setOpen] = useState(false)
  const [openAppModal, setOpenAppModal] = useState(false)
  const [usedAppThisMonth, setUsedAppThisMonth] = useState<number>(0)

  const getAppointmentsRows = async (): Promise<GetAllAppResponse<Appointment> | undefined> => {
  try {
    const token = localStorage.getItem('token');
    if (!token || token === null){
      router.push("/auth/login")
    }

    const appData = await getAppointments(token)
    return appData
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
  }
}

  

useEffect(() => {
  const fetchAppointments = async () => {
    const data = await getAppointmentsRows()
    if (data) {
      setAppointments(data.appointments.rows)
      setUsedAppThisMonth(data.createdThisMonth)
    }
  }

  fetchAppointments()
// eslint-disable-next-line react-hooks/exhaustive-deps
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
  <div className="flex min-h-screen">
    {user?.Subscription && (
      <DashboardSidebarMain
        currentView="agenda"
        onViewChange={(view) => (view === "agenda" ? null : null)}
        usedAppointments={usedAppThisMonth}
        //onUpgrade={() => console.log("Upgrade clicked")}
        subscriptionData={user.Subscription}
      />
    )}

    <div className="flex-1">
        <div className="w-full overflow-x-hidden">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full overflow-x-hidden">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 overflow-x-hidden">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent overflow-x-hidden">
                Mi Agenda
              </h1>

              <div className="flex items-center space-x-2 overflow-x-hidden">
                {/* Botones desktop */}
                <div className="hidden sm:flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 hover:bg-white border-gray-300"
                    onClick={() => navigator.clipboard.writeText(`${appointmentLink}`)}
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Compartir Link
                  </Button>

                  <Button
                    className="sm:ml-4 px-4 py-2 bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white"
                    onClick={() => setOpenAppModal(true)}
                    disabled={!user || !user.profile?.profileCompleted}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Nuevo Turno
                  </Button>
                </div>

                {/* Botones mobile */}
                <div className="flex sm:hidden items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-white/80 hover:bg-white border-gray-300 h-9 w-9 p-0"
                    onClick={() => navigator.clipboard.writeText(`${appointmentLink}`)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>

                  <Button
                    onClick={() => setOpenAppModal(true)}
                    size="sm"
                    disabled={!user || !user.profile?.profileCompleted}
                    className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#8a0336] hover:to-[#0370a3] text-white h-9 w-9 p-0"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <CreateAppointmentModal 
              open={openAppModal} 
              onClose={() => setOpenAppModal(false)} 
              onCreated={(appointment) => setAppointments((prev) => [appointment, ...prev])} 
              />

            <p className="text-gray-600 mt-2">
              Puedes visualizar y abrir el detalle de cada turno haciendo click sobre él.
            </p>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="min-h-[70vh] px-4 sm:px-6 py-6 w-full overflow-x-hidden">
          <Card className="h-full shadow-lg w-full overflow-hidden">
            <CardContent className="h-full w-full overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 h-full w-full">
                {/* Calendario */}
                <div className="lg:col-span-2 flex justify-center items-center w-full">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    locale={es}
                    className="rounded-md border shadow-md w-full max-w-full sm:max-w-md"
                  />
                </div>

                {/* Lista de turnos */}
                <div className="lg:col-span-1 overflow-y-auto p-2">
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

                  {appointments.filter((appointment) => appointment.date === format(selectedDate, "yyyy-MM-dd")).length === 0 && (
                    <p className="text-gray-500 text-sm mt-4">No hay turnos para esta fecha.</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        </div>
    </div>
  </div>  
)
}
