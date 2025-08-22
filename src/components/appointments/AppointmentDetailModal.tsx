import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Appointment } from "@/types/appointments"
import { getStatusColor, getStatusText } from "./status"
import { parseLocalDate } from "@/utils/date"
import { Badge, CalendarIcon, Clock, Phone } from "lucide-react"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { updateAppointment } from "@/services/appointments"
import { toast } from "sonner"

interface Props {
  appointment: Appointment | null
  onClose: () => void
}

export function AppointmentDetailModal({ appointment, onClose }: Props) {
  return (
    <Dialog open={!!appointment} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalles del Turno</DialogTitle>
        </DialogHeader>
        {appointment && (
          <div>
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
        <div className="flex space-x-2 pt-4">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={async () => {
                          try {
                            const token = localStorage.getItem('token')
        
                            await updateAppointment({ appointmentId: appointment.appointmentId, status: "confirmed" }, token, false)
                            toast.success("Turno confirmado correctamente")
                            //appointment.status = "confirmed";
                        } catch (error) {
                            console.error(error)
                            toast.error("Ha ocurrido un error confirmando el turno")
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
        
                            await updateAppointment({ appointmentId: appointment.appointmentId, status: "cancelled" }, token, false)
                            toast.success("Turno cancelado correctamente")
                          } catch (error) {
                            console.error(error)
                            toast.error("Ha ocurrido un error cancelando el turno")
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
}
