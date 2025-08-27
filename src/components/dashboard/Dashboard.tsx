/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  CalendarIcon,
  Clock,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  User,
} from "lucide-react"
import { format, addDays } from "date-fns"
import { es } from "date-fns/locale"
import { Appointment, AppointmentStatus } from "@/types/appointments"
import { useRouter } from "next/navigation"
import { getAppointments, updateAppointment } from "@/services/appointments"
import { parseLocalDate } from "@/utils/date"

export default function Component() {

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

  const [searchTerm, setSearchTerm] = useState("")
  const [calendarView, setCalendarView] = useState("monthly")
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [currentView, setCurrentView] = useState("turnos")
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [draggedItem, setDraggedItem] = useState<Appointment | null>(null)

useEffect(() => {
  const fetchAppointments = async () => {
    const data = await getAppointmentsRows()
    if (data) {
      setAppointments(data)
    }
  }

  fetchAppointments()
}, [])


  const getStatusColor = (status: AppointmentStatus) => {
    switch (status) {
      case status = "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case status = "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case status = "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      case status = "completed":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case "confirmed":
        return "Confirmado"
      case "pending":
        return "Pendiente"
      case "cancelled":
        return "Rechazado"
      case "completed":
        return "Completado"
      default:
        return status
    }
  }

  const filteredAppointments = appointments.filter((appointment) =>
    `${appointment.name} ${appointment.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDragStart = (e: React.DragEvent, appointment: any) => {
    setDraggedItem(appointment)
    e.dataTransfer.effectAllowed = "move"
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = "move"
  }

  const handleDrop = async (e: React.DragEvent, newStatus: AppointmentStatus) => {
    e.preventDefault()
    if (draggedItem) {
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.appointmentId === draggedItem.appointmentId ? { ...appointment, status: newStatus } : appointment,
        ),
      )

      try {
        const token = localStorage.getItem('token');
        await updateAppointment({ appointmentId: draggedItem.appointmentId, status: newStatus }, token, false)
      } catch (error) {
        console.error(error);

        // revertir si falló
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.appointmentId === draggedItem.appointmentId
            ? { ...appointment, status: draggedItem.status }
            : appointment,
        ),
      )
      }
      setDraggedItem(null)
    }
  }

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card
      className="mb-3 hover:shadow-md transition-all duration-200 cursor-pointer hover:scale-[1.02] select-none"
      draggable
      onDragStart={(e) => handleDragStart(e, appointment)}
      onClick={() => setSelectedAppointment(appointment)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-gray-900">
            {appointment.name} {appointment.lastName}
          </h4>
          <Badge className={`${getStatusColor(appointment.status)} text-xs`}>{getStatusText(appointment.status)}</Badge>
        </div>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center">
            <CalendarIcon className="w-4 h-4 mr-2" />
            {format(parseLocalDate(appointment.date), "dd-MM-yyyy")}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {appointment.time}
          </div>
          <div className="flex items-center">
            <Phone className="w-4 h-4 mr-2" />
            {appointment.phone}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const AppointmentDetailModal = () => (
    <Dialog open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Detalles del Turno</DialogTitle>
          <DialogDescription>Información completa del turno seleccionado</DialogDescription>
        </DialogHeader>
        {selectedAppointment && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {selectedAppointment.name} {selectedAppointment.lastName}
              </h3>
              <Badge className={getStatusColor(selectedAppointment.status)}>
                {getStatusText(selectedAppointment.status)}
              </Badge>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <User className="w-5 h-5 mr-3 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Nombre completo</p>
                    <p className="text-sm text-gray-600">
                      {selectedAppointment.name} {selectedAppointment.lastName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Mail className="w-5 h-5 mr-3 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Email</p>
                    <p className="text-sm text-gray-600">{selectedAppointment.email}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Phone className="w-5 h-5 mr-3 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Celular</p>
                    <p className="text-sm text-gray-600">{selectedAppointment.phone}</p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <CalendarIcon className="w-5 h-5 mr-3 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fecha</p>
                    <p className="text-sm text-gray-600">
                      {format(parseLocalDate(selectedAppointment.date), "dd-MM-yyyy")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Clock className="w-5 h-5 mr-3 text-gray-600" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Hora</p>
                    <p className="text-sm text-gray-600">{selectedAppointment.time}</p>
                  </div>
                </div>

                {selectedAppointment.reason && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900 mb-1">Datos del turno</p>
                    <p className="text-sm text-gray-600">{selectedAppointment.reason}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-2 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token')

                    await updateAppointment({ appointmentId: selectedAppointment.appointmentId, status: "confirmed" }, token, false)

                    setAppointments((prev) =>
                    prev.map((apt) => (apt.appointmentId === selectedAppointment.appointmentId ? { ...apt, status: "confirmed" } : apt)),
                  )
                  setSelectedAppointment(null)

                  } catch (error) {
                    console.error(error)
                  }
                  
                }}
              >
                Confirmar
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem('token')

                    await updateAppointment({ appointmentId: selectedAppointment.appointmentId, status: "cancelled" }, token, false)

                    setAppointments((prev) =>
                    prev.map((apt) => (apt.appointmentId === selectedAppointment.appointmentId ? { ...apt, status: "cancelled" } : apt)),
                  )
                  setSelectedAppointment(null)
                    
                  } catch (error) {
                    console.error(error)
                  }                       
                }}
              >
                Rechazar
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === "turnos" ? (
          /* Mis Turnos View */
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mis Turnos
              </h1>
              <p className="text-gray-600 mt-2">Arrastra los turnos entre columnas para cambiar su estado</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Pendientes */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "pending")}
                className="min-h-[400px] transition-colors duration-200"
              >
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-yellow-700 flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                      Pendientes
                    </CardTitle>
                    <CardDescription>
                      {filteredAppointments.filter((a) => a.status === "pending").length} turnos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-96 overflow-y-auto">
                    {filteredAppointments
                      .filter((appointment) => appointment.status === "pending")
                      .map((appointment) => (
                        <AppointmentCard key={appointment.appointmentId} appointment={appointment} />
                      ))}
                  </CardContent>
                </Card>
              </div>

              {/* Confirmados */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "confirmed")}
                className="min-h-[400px] transition-colors duration-200"
              >
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-green-700 flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                      Confirmados
                    </CardTitle>
                    <CardDescription>
                      {filteredAppointments.filter((a) => a.status === "confirmed").length} turnos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-96 overflow-y-auto">
                    {filteredAppointments
                      .filter((appointment) => appointment.status === "confirmed")
                      .map((appointment) => (
                        <AppointmentCard key={appointment.appointmentId} appointment={appointment} />
                      ))}
                  </CardContent>
                </Card>
              </div>

              

              {/* Rechazados */}
              <div
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, "cancelled")}
                className="min-h-[400px] transition-colors duration-200"
              >
                <Card className="h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-red-700 flex items-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                      Rechazados
                    </CardTitle>
                    <CardDescription>
                      {filteredAppointments.filter((a) => a.status === "cancelled").length} turnos
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="max-h-96 overflow-y-auto">
                    {filteredAppointments
                      .filter((appointment) => appointment.status === "cancelled")
                      .map((appointment) => (
                        <AppointmentCard key={appointment.appointmentId} appointment={appointment} />
                      ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          /* Agenda View */
          <div>
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl">Agenda</CardTitle>
                  <div className="flex items-center space-x-4">
                    <Select value={calendarView} onValueChange={setCalendarView}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Diaria</SelectItem>
                        <SelectItem value="weekly">Semanal</SelectItem>
                        <SelectItem value="monthly">Mensual</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <CardDescription>
                  Vista {calendarView === "daily" ? "diaria" : calendarView === "weekly" ? "semanal" : "mensual"} -{" "}
                  {format(selectedDate, "MMMM yyyy", { locale: es })}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    locale={es}
                    className="rounded-md border"
                  />
                </div>

                {/* Appointments for selected date */}
                <div className="mt-6">
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
                          onClick={() => setSelectedAppointment(appointment)}
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
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Appointment Detail Modal */}
      <AppointmentDetailModal />
    </div>
  )
}
