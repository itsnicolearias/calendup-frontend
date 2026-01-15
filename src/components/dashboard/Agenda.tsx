/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { format, parseISO } from "date-fns"
import { es } from "date-fns/locale"
import { Appointment, Holidays, GetAllAppResponse } from "@/types/appointments"
import { useRouter } from "next/navigation"
import { getStatusColor, getStatusText } from "../../types/status"
import { getAppointments, getAvailableSlots } from "@/services/appointments"
import { AppointmentModal } from "../appointments/AppointmentModal"
import { CreateAppointmentModal } from "./CreateAppointmentModal"
import { Button } from "../ui/button"
import { Copy, Plus, CalendarDays, Video } from "lucide-react"
import { useUser } from "@/contexts/UserContext"
import { toast } from "sonner"
import DashboardSidebarMain from "./sidebar/SidebarMain"

export default function AgendaView() {
  const router = useRouter()
  const { user } = useUser()
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [googleEvents, setGoogleEvents] = useState<any[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [open, setOpen] = useState(false)
  const [openAppModal, setOpenAppModal] = useState(false)
  const [usedAppThisMonth, setUsedAppThisMonth] = useState<number>(0)
  const [holidays, setHolidays] = useState<Holidays>([])
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date()) 

  const getAppointmentsRows = async (): Promise<GetAllAppResponse<Appointment> | undefined> => {
    try {
      const token = localStorage.getItem("token")
      if (!token || token === null) {
        router.push("/auth/login")
      }

      const appData = await getAppointments(token)
      return appData
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
        if (data.googleEvents) setGoogleEvents(data.googleEvents)
      }
    }
    fetchAppointments()
  }, [])

  useEffect(() => {
    const fetchHolidays = async () => {
      if (appointments.length === 0) return
      try {
        const year = currentMonth.getFullYear()
        const month = currentMonth.getMonth() + 1
        const data = await getAvailableSlots(
          appointments[0].professionalId,
          year,
          month
        )
        if (data?.holidays) setHolidays(data.holidays)
      } catch (error) {
        toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
      }
    }
    fetchHolidays()
  }, [appointments, currentMonth])

  const selectApp = (app: Appointment) => {
    setSelectedAppointment(app)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (open) {
    return (
      <AppointmentModal
        appointment={selectedAppointment!}
        handleClose={handleClose}
      />
    )
  }

  const appointmentLink = user
    ? `${process.env.NEXT_PUBLIC_FRONT_URL}/appointments/create?professionalId=${user.userId}`
    : ""

  // Fecha seleccionada
  const selectedDateStr = format(selectedDate, "yyyy-MM-dd")
  const dayAppointments = appointments.filter(a => a.date === selectedDateStr)
  const dayGoogleEvents = googleEvents.filter(e => {
    const eventDate = format(parseISO(e.start.dateTime), "yyyy-MM-dd")
    return eventDate === selectedDateStr
  })

  // Dots en el calendario
  const daysWithAppointments = new Set(appointments.map(a => a.date))
  const daysWithGoogleEvents = new Set(
    googleEvents.map(e => format(parseISO(e.start.dateTime), "yyyy-MM-dd"))
  )

  const renderDay = (props: { date: Date }) => {
    const dateStr = format(props.date, "yyyy-MM-dd")
    const hasAppointment = daysWithAppointments.has(dateStr)
    const hasGoogleEvent = daysWithGoogleEvents.has(dateStr)

    return (
      <div className="relative flex flex-col items-center">
        <span>{format(props.date, "d")}</span>
        {(hasAppointment || hasGoogleEvent) && (
          <div className="flex gap-0.5 absolute bottom-1">
            {hasAppointment && <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />}
            {hasGoogleEvent && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex min-h-screen">
      {user?.Subscription && (
        <DashboardSidebarMain
          currentView="agenda"
          onViewChange={(view) => (view === "agenda" ? null : null)}
          usedAppointments={usedAppThisMonth}
          subscriptionData={user.Subscription}
        />
      )}

      <div className="flex-1">
        <div className="w-full overflow-x-hidden">
          {/* Header */}
          <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                  Mi Agenda
                </h1>

                <div className="flex items-center space-x-2">
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
              </div>

              <CreateAppointmentModal
                open={openAppModal}
                onClose={() => setOpenAppModal(false)}
                onCreated={(appointment) =>
                  setAppointments((prev) => [appointment, ...prev])
                }
                professional={user!}
              />

              <p className="text-gray-600 mt-2">
                Puedes visualizar los turnos y eventos directamente desde el calendario.
              </p>
            </div>
          </div>

          {/* Contenido principal */}
          <div className="min-h-[70vh] px-4 sm:px-6 py-6">
            <Card className="h-full shadow-lg">
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
                  {/* Calendario */}
                  <div className="lg:col-span-2 flex flex-col items-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(date) => date && setSelectedDate(date)}
                      locale={es}
                      className="rounded-md border shadow-md w-full max-w-full sm:max-w-md"
                      onMonthChange={(date) => setCurrentMonth(date)}
                      components={{ DayContent: renderDay } as any}
                    />

                    {/* Feriados */}
                    <div className="mt-4 p-3 bg-red-50 rounded-md border border-red-200 w-full max-w-md mx-auto">
                      <p className="text-sm font-semibold text-black mb-2">Feriados del mes:</p>
                      {holidays.length > 0 ? (
                        <ul className="text-sm text-red-600 space-y-1">
                          {holidays.map((h) => (
                            <li key={h.date}>
                              {format(new Date(h.date), "dd/MM/yyyy", { locale: es })} - {h.name}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-xs text-gray-500">Este mes no tiene feriados.</p>
                      )}
                    </div>
                  </div>

                  {/* Turnos y eventos */}
                  <div className="lg:col-span-1 overflow-y-auto p-2">
                    <h3 className="text-lg font-semibold mb-4">
                      Actividades para {format(selectedDate, "dd 'de' MMMM, yyyy", { locale: es })}
                    </h3>

                    <div className="space-y-3">
                      {/* Turnos */}
                      {dayAppointments.map((appointment) => (
                        <Card
                          key={appointment.appointmentId}
                          className="p-4 cursor-pointer hover:shadow-md transition-shadow"
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

                      {/* Google Calendar */}
                      {dayGoogleEvents.map((event) => (
                        <Card
                          key={event.id}
                          className="p-4 border-blue-300 bg-blue-50 cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => window.open(event.htmlLink, "_blank")}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-semibold text-blue-900">{event.summary}</h4>
                              <p className="text-sm text-gray-600">
                                {format(parseISO(event.start.dateTime), "HH:mm")} -{" "}
                                {format(parseISO(event.end.dateTime), "HH:mm")}
                              </p>
                              {event.hangoutLink && (
                                <a
                                  href={event.hangoutLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 flex items-center gap-1 mt-1 text-sm hover:underline"
                                >
                                  <Video className="w-4 h-4" /> Meet
                                </a>
                              )}
                            </div>
                            <Badge className="bg-blue-500 text-white flex items-center gap-1">
                              <CalendarDays className="w-3 h-3" /> Google
                            </Badge>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {dayAppointments.length === 0 && dayGoogleEvents.length === 0 && (
                      <p className="text-gray-500 text-sm mt-4">No hay actividades para esta fecha.</p>
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
