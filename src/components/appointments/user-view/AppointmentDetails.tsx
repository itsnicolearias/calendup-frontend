import React from 'react'
import GetOneAppHeader from './GetOneAppHeader'
import ProfessionalProfileCard from '@/components/shared/ProfessionalProfileCard'
import AppointmentSummary from './AppointmentSummary'
import PatientInformation from './PatientInformation'
import { Appointment } from '@/types/appointments'
import ChangesIndicator from './ChangesIndicator'
import ActionButton from './ActionButton'
import { RatingResponse } from '@/types/review'

interface AppointmentDetailsProps {
  appointment: Appointment
  draft: Partial<Appointment>
  onDraftChange: (patch: Partial<Appointment>) => void
  onEdit: (field: keyof Appointment) => void
  onCancel: () => void
  onSaveChanges: () => void
  handleDiscardChanges: () => void
  rating: RatingResponse
}

function AppointmentDetails({  
  appointment,
  draft,
  onDraftChange,
  onEdit,
  onCancel,
  onSaveChanges,
  handleDiscardChanges,
  rating
 }: AppointmentDetailsProps) {
      const val = <K extends keyof Appointment>(k: K) => (draft[k] ?? appointment[k]) as Appointment[K]

      const hasChanges = Object.keys(draft).length > 0

      const isCancelled = appointment.status === "cancelled";

  return (
    <div>
         <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <GetOneAppHeader val={val} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Professional Profile - Left Column */}
          <ProfessionalProfileCard 
            professional={appointment.professional} 
            rating={rating} 
            />

          {/* Appointment Details - Right Columns */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Appointment Summary Card */}
              <AppointmentSummary 
                appointment={appointment} 
                onEdit={onEdit}
                disableButton={isCancelled} 
                />

              {/* Patient Information */}
              <PatientInformation 
                val={val} 
                onDraftChange={onDraftChange}
                disableInput={isCancelled} 
                />

              {/* Changes Indicator */}
              {hasChanges && (
                <ChangesIndicator 
                    onDraftChange={handleDiscardChanges} 
                    onSaveChanges={onSaveChanges} 
                    />
              )}

              {/* Action Buttons */}
              <ActionButton 
                onSaveChanges={onSaveChanges} 
                hasChanges={hasChanges} 
                onCancel={onCancel}
                disableButton={isCancelled} 
                />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AppointmentDetails