import React from 'react'
import { Card, CardContent } from '../ui/card'
import { CheckCircle } from 'lucide-react'
import { Button } from '../ui/button'
import { UserWithProfile } from '@/types/settings'
import { format } from 'date-fns'
import { parseLocalDate } from '@/utils/date'

interface BookingConfirmed {
    professional: Partial<UserWithProfile>;
    selectedDate: string;
    selectedService: string;
    selectedTime: string;
    resetBooking: () => void;
}
function BookingConfirmed({ professional, selectedDate, selectedService, selectedTime, resetBooking }: BookingConfirmed) {
    const user = professional.profile;

    const name = `${user?.name || ""} ${user?.lastName || ""}`

    const getSelectedServiceDetails = () => { 
        return professional?.AppointmentTypes?.find((type) => type.appointmentTypeId === selectedService) 
    }
  return (
    <div>
         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-2xl mx-auto px-4 py-16">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">¡Turno Confirmado!</h1>
              <p className="text-gray-600 mb-8">
                Tu cita ha sido reservada exitosamente. Recibirás un email de confirmación con todos los detalles.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
                <h3 className="font-semibold text-green-800 mb-4">Detalles de tu cita:</h3>
                <div className="space-y-2 text-sm text-green-700">
                  <p>
                    <strong>Profesional:</strong> {name}
                  </p>
                  { selectedService && (
                    <> 
                    <p>
                        <strong>Servicio:</strong> {getSelectedServiceDetails()?.name}
                    </p>
                    <p>
                        <strong>Descripcion:</strong> {getSelectedServiceDetails()?.description}
                    </p>
                    <p>
                    <strong>Precio:</strong> {getSelectedServiceDetails()?.price}
                  </p>
                    </>
                  )}
                 
                  <p>
                    <strong>Fecha:</strong>{" "}
                    {format(parseLocalDate(selectedDate), "dd-MM-yyyy")}
                  </p>
                  <p>
                    <strong>Hora:</strong> {selectedTime}
                  </p>
                  { user?.address && (
                    <p>
                    <strong>Ubicación:</strong> {user.address}
                  </p>
                  )}
                  
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={resetBooking}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  Reservar Otro Turno
                </Button>
                <Button variant="outline" className="w-full bg-transparent">
                  Agregar al Calendario
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default BookingConfirmed