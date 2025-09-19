import React from 'react'
import { Card, CardContent } from '../ui/card'
import { CheckCircle } from 'lucide-react'
import { UserWithProfile } from '@/types/settings'
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { parseLocalDate } from '@/utils/date';

interface BookingSummaryProps {
    professional: Partial<UserWithProfile>;
    selectedType: string | null;
    selectedDate: string;
    selectedTime: string;
}

function BookingSummary({ professional, selectedType, selectedDate, selectedTime }: BookingSummaryProps) {
  const user = professional.profile;
  
  const getSelectedTypeDetails = () => { 
    return professional?.AppointmentTypes?.find((type) => type.appointmentTypeId === selectedType) }

    return (
    <div>
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                      Resumen de tu cita
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <p>
                          <strong>Profesional:</strong> {user?.name}{" "}
                          {user?.lastName}
                        </p>
                        {selectedType && (
                            <>
                            <p>
                            <strong>Servicio:</strong> {getSelectedTypeDetails()?.name}
                            </p>
                            <p>
                            <strong>Precio:</strong> ${getSelectedTypeDetails()?.price}
                            </p>
                            </>
                        )}
                        
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Fecha:</strong> {format(parseLocalDate(selectedDate), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: es })}
                        </p>
                        <p>
                          <strong>Hora:</strong> {selectedTime}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
    </div>
  )
}

export default BookingSummary