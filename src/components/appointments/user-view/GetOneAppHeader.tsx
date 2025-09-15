import { Badge } from '@/components/ui/badge'
import { Appointment } from '@/types/appointments'
import { getStatusColor, getStatusIcon, getStatusText } from '@/types/status'
import { CalendarIcon } from 'lucide-react'
import React from 'react'

function GetOneAppHeader({val}: {val: <K extends keyof Appointment>(k: K) => Appointment[K]}) {
  return (
    <div>
        <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <CalendarIcon className="w-5 h-5 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Detalles del Turno
              </span>
            </div>
            <Badge className={`${getStatusColor(val("status"))} flex items-center gap-1`}>
              {getStatusIcon(val("status"))}
              {getStatusText(val("status"))}
            </Badge>
          </div>
        </div>
      </div>

    </div>
  )
}

export default GetOneAppHeader