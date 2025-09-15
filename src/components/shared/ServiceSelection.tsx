import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Sparkles } from 'lucide-react'
import { AppointmentType } from '@/types/appointments'

interface ServiceSelectionProps {
  appointmentTypes: AppointmentType[] | undefined;
  selectedTypeId: string | null;
  setSelectedType: (typeId: string) => void;
  isModal: boolean
}

function ServiceSelection({ appointmentTypes, selectedTypeId, setSelectedType, isModal }: ServiceSelectionProps) {
  return (
    <div>
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-[#0388bd]" />
                    Selecciona un servicio
                  </CardTitle>
                </CardHeader>
                <CardContent className={isModal ? "p-1" : "p-6"}>
                  <div className={isModal ? "grid gap-1" : "grid gap-3"}>
                    {appointmentTypes?.map((type) => (
                      <Card
                        key={type.appointmentTypeId}
                        className={`cursor-pointer transition-all duration-200 ${
                          selectedTypeId === type.appointmentTypeId
                            ? "ring-2 ring-blue-500 bg-blue-50 shadow-md"
                            : "hover:shadow-md hover:scale-[1.02]"
                        }`}
                        onClick={() => setSelectedType(type.appointmentTypeId)}
                      >
                        <CardContent className={isModal ? "" : "p-4"}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <input
                                type="radio"
                                checked={selectedTypeId === type.appointmentTypeId}
                                onChange={() => setSelectedType(type.appointmentTypeId)}
                                className="w-4 h-4 text-[#0388bd] border-gray-300 focus:ring-blue-500"
                              />
                              <div>
                                <p className="font-semibold text-gray-900">{type.name}</p>
                                <p className="text-sm text-gray-600">{type.description}</p>
                              </div>
                            </div>
                            <div className="text-right">
                                <p className="text-xl font-bold text-gray-900">${type.price}</p>                              
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
    </div>
  )
}

export default ServiceSelection