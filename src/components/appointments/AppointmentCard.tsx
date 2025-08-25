"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Clock, Phone } from "lucide-react"
import { format } from "date-fns"
import { parseLocalDate } from "@/utils/date"
import { Appointment } from "@/types/appointments"
import { getStatusColor, getStatusText } from "./status"

interface Props {
  appointment: Appointment
  onOpen: (appointment: Appointment) => void
  onDragStart: (e: React.DragEvent, appointment: Appointment) => void
}

export function AppointmentCard({ appointment, onOpen, onDragStart }: Props) {

  return (
    <Card
      className="mb-2 p-3 cursor-pointer hover:shadow"
      draggable
      onDragStart={(e) => onDragStart(e, appointment)}
      onClick={() => onOpen(appointment)}
    >
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-semibold text-gray-900">
            {appointment.name} {appointment.lastName}
          </h4>
          <Badge className={`${getStatusColor(appointment.status)} text-xs`}>
            {getStatusText(appointment.status)}
          </Badge>
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
}
