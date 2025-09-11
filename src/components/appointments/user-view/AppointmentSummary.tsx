import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Appointment } from '@/types/appointments'
import { parseLocalDate } from '@/utils/date'
import { format } from 'date-fns'
import { CalendarIcon, CircleChevronRight, Clock, Edit3 } from 'lucide-react'
import React from 'react'

function AppointmentSummary({appointment, onEdit, disableButton}: {appointment: Appointment, onEdit: (field: keyof Appointment) => void, disableButton: boolean}) {
  return (
    <div>
        {/* Card fecha y hora */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <CalendarIcon className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Fecha</p>
                          <p className="font-semibold text-lg">
                            {format(parseLocalDate(appointment.date), "dd-MM-yyyy")}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-blue-600 mr-3" />
                        <div>
                          <p className="text-sm text-gray-600">Hora</p>
                          <p className="font-semibold text-lg">{appointment.time}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <Button
                        variant="outline"
                        onClick={() => onEdit("date")}
                        disabled={disableButton}
                        className="bg-white/80 hover:bg-white border-blue-300 text-blue-600 hover:text-blue-700"
                      >
                        <Edit3 className="w-4 h-4 mr-2" />
                        Cambiar Fecha/Hora
                      </Button>
                    </div>


                    
                  </div>
                </CardContent>
        </Card>

          {/* Card servicio */}
       {appointment?.AppointmentType && (  
        <>
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                {/* Columna izquierda */}
                <div className="space-y-2">
                      <div className="flex items-center">
                        <CircleChevronRight className="w-5 h-5 text-blue-600 mr-3" />
                        <p className="font-semibold text-lg">
                          {appointment.AppointmentType?.name}
                        </p>
                      </div>

                      {appointment.AppointmentType?.description && (
                        <p className="text-sm text-gray-500 ml-8">
                          {appointment.AppointmentType.description}
                        </p>
                      )}
                    
                </div>

                {/* Columna derecha */}
                <div className="flex justify-end">
                  {appointment?.AppointmentType?.price && (
                    <p className="font-semibold text-xl text-blue-600">
                      ${appointment.AppointmentType.price}
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
      </>
      )}
    </div>
  )
}

export default AppointmentSummary