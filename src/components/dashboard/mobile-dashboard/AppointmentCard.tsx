import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Appointment, AppointmentStatus } from '@/types/appointments'
import { statusConfig } from '@/types/status'
import { parseLocalDate } from '@/utils/date'
import { DropdownMenuContent } from '@radix-ui/react-dropdown-menu'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Badge, CalendarIcon, CheckCircle, Clock, Eye, Mail, MoreVertical, Phone, XCircle } from 'lucide-react'
import React from 'react'

interface Props {
  appointment: Appointment
  onOpen: (appointment: Appointment) => void
  handleStatusChange: (id: string, status: AppointmentStatus) => void
}

function AppointmentCard({ appointment, onOpen, handleStatusChange }: Props) {
  const statusKey: keyof typeof statusConfig =
    appointment.status === 'cancelledByUser' ? 'cancelled' : (appointment.status as keyof typeof statusConfig)
  const statusInfo = statusConfig[statusKey]
  const StatusIcon = statusInfo.icon

  return (
    <div>
      <Card
        className="mb-3 hover:shadow-md transition-all duration-200 bg-white/80 backdrop-blur-sm border-0 shadow-sm"
        onClick={() => onOpen(appointment)}
      >
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-3 gap-2">
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-base sm:text-lg">
                {appointment.name} {appointment.lastName}
              </h3>
              <div className="flex items-center mt-1">
                <Badge className={`${statusInfo.color} text-xs flex items-center gap-1`}>
                  <StatusIcon className="w-3 h-3" />
                  {statusInfo.label}
                </Badge>
              </div>
            </div>

            <div className="self-end sm:self-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => onOpen(appointment)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Ver detalles
                  </DropdownMenuItem>
                  {appointment.status === 'pending' && (
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(appointment.appointmentId, 'confirmed')}
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                      Confirmar
                    </DropdownMenuItem>
                  )}
                  {appointment.status !== 'completed' && appointment.status !== 'cancelled' && (
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(appointment.appointmentId, 'completed')}
                    >
                      <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                      Marcar completado
                    </DropdownMenuItem>
                  )}
                  {appointment.status !== 'cancelled' && (
                    <DropdownMenuItem
                      onClick={() => handleStatusChange(appointment.appointmentId, 'cancelled')}
                      className="text-red-600"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Cancelar
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-1 sm:space-y-2 text-sm text-gray-600">
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-xs sm:text-sm">
                {format(parseLocalDate(appointment.date), 'dd/MM/yyyy', { locale: es })}
              </span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-blue-600" />
              <span>{appointment.time}</span>
            </div>
            {appointment.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-blue-600" />
                <span>{appointment.phone}</span>
              </div>
            )}
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-blue-600" />
              <div className="truncate max-w-[180px] sm:max-w-none">
                {appointment.email}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AppointmentCard