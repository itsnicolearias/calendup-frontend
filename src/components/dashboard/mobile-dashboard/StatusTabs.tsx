import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Appointment, AppointmentStatus } from '@/types/appointments'
import { statusConfig } from '@/types/status'
import { CalendarIcon } from 'lucide-react'
import React from 'react'
import AppointmentCard from './AppointmentCard'

interface Props {
    appointments: Appointment[]
    activeTab: string
    setActiveTab: (tab: string) => void
    filteredAppointments: Appointment[]
    onOpen: (appointment: Appointment) => void
    handleStatusChange: (id: string, status: AppointmentStatus) => void
    statusCounts: Record<string, number>
}

function StatusTabs({ appointments, activeTab, setActiveTab, filteredAppointments, onOpen, handleStatusChange, statusCounts}: Props) {
  return (
     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">


        {/* Tabs for Status */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full flex overflow-x-auto flex-nowrap no-scrollbar bg-white/80 backdrop-blur-sm border-0 shadow-lg h-auto p-1">
            <TabsTrigger
                value="all"
                className="flex-shrink-0 flex flex-col items-center py-2 px-3 min-w-[70px] 
                        data-[state=active]:bg-gradient-to-r 
                        data-[state=active]:from-[#ac043f] 
                        data-[state=active]:to-[#0388bd] 
                        data-[state=active]:text-white"
            >
                <span className="text-xs font-medium">Todos</span>
                <span className="text-sm font-bold">{appointments.length}</span>
            </TabsTrigger>

            {Object.entries(statusConfig).map(([status, config]) => {
                const count = statusCounts[status] || 0
                const StatusIcon = config.icon
                return (
                <TabsTrigger
                    key={status}
                    value={status}
                    className="flex-shrink-0 flex flex-col items-center py-2 px-2 min-w-[70px] 
                            data-[state=active]:bg-gradient-to-r 
                            data-[state=active]:from-[#ac043f] 
                            data-[state=active]:to-[#0388bd] 
                            data-[state=active]:text-white"
                >
                    <StatusIcon className={`w-3 h-3 mb-1 ${config.iconColor}`} />
                    <span className="text-xs font-medium truncate">{config.label}</span>
                    <span className="text-sm font-bold">{count}</span>
                </TabsTrigger>
                )
            })}
            </TabsList>


          <div className="mt-6">
            <TabsContent value="all" className="mt-0">
              <div className="space-y-3">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((appointment) => (
                    <AppointmentCard 
                        key={appointment.appointmentId} 
                        appointment={appointment}  
                        onOpen={onOpen} 
                        handleStatusChange={handleStatusChange}/>
                  ))
                ) : (
                  <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                    <CardContent className="p-8 text-center">
                      <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay turnos</h3>
                      <p className="text-gray-600">No se encontraron turnos que coincidan con tu búsqueda.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            {Object.keys(statusConfig).map((status) => (
              <TabsContent key={status} value={status} className="mt-0">
                <div className="space-y-3">
                  {filteredAppointments.length > 0 ? (
                    filteredAppointments.map((appointment) => (
                      <AppointmentCard 
                        key={appointment.appointmentId} 
                        appointment={appointment} 
                        onOpen={onOpen} 
                        handleStatusChange={handleStatusChange}/>
                    ))
                  ) : (
                    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
                      <CardContent className="p-8 text-center">
                        <CalendarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          No hay turnos {statusConfig[status as keyof typeof statusConfig].label.toLowerCase()}
                        </h3>
                        <p className="text-gray-600">No tienes turnos con este estado en este momento.</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
  )
}

export default StatusTabs