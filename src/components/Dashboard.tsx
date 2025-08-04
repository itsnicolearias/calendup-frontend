/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Home,
  CalendarIcon,
  Clock,
  Mail,
  Phone,
  Settings,
  LogOut,
  Palette,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Menu,
  User,
} from "lucide-react"
import { format, addDays } from "date-fns"
import { es } from "date-fns/locale"
import { Appointment, AppointmentStatus } from "@/types/appointments"
import { useRouter } from "next/navigation"
import { getAppointments } from "@/services/appointments"

export default function Component() {

  const router = useRouter();

  const getAppointmentsRows = async (): Promise<Appointment[]> => {
  try {
    const token = localStorage.getItem('token');
    if (!token || token === null){
      router.push("/login")
    }

    const appData = await getAppointments(token)
    console.log("Turnos obtenidos:", appData)
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

  const handleDrop = (e: React.DragEvent, newStatus: AppointmentStatus) => {
    e.preventDefault()
    if (draggedItem) {
      setAppointments((prev) =>
        prev.map((appointment) =>
          appointment.appointmentId === draggedItem.appointmentId ? { ...appointment, status: newStatus } : appointment,
        ),
      )
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
            {format(new Date(appointment.date), "dd/MM/yyyy", { locale: es })}
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
                      {format(new Date(selectedAppointment.date), "dd 'de' MMMM, yyyy", { locale: es })}
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
                onClick={() => {
                  setAppointments((prev) =>
                    prev.map((apt) => (apt.appointmentId === selectedAppointment.appointmentId ? { ...apt, status: "confirmed" } : apt)),
                  )
                  setSelectedAppointment(null)
                }}
              >
                Confirmar
              </Button>
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => {
                  setAppointments((prev) =>
                    prev.map((apt) => (apt.appointmentId === selectedAppointment.appointmentId ? { ...apt, status: "cancelled" } : apt)),
                  )
                  setSelectedAppointment(null)
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
      {/* Top Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Home className="w-5 h-5 text-white" />
                </div>
                <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dashboard
                </span>
              </div>
              <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
                <Home className="w-4 h-4 mr-2" />
                Inicio
              </Button>
            </div>

            {/* Center - Search */}
            <div className="flex-1 max-w-md mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar turnos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right side - Menu and Profile */}
            <div className="flex items-center space-x-4">
              {/* View Selector Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <Menu className="w-4 h-4" />
                    <span>{currentView === "turnos" ? "Mis Turnos" : "Agenda"}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setCurrentView("turnos")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Mis Turnos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setCurrentView("agenda")}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Agenda
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Perfil" />
                      <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                        U
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Usuario</p>
                      <p className="text-xs leading-none text-muted-foreground">usuario@email.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Palette className="mr-2 h-4 w-4" />
                    <span>Tema</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

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
