"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Appointment } from "@/types/appointments"
import { AppointmentForm } from "./CreateAppointmentForm"
import { UserWithProfile } from "@/types/settings"

interface Props {
  open: boolean
  onClose: () => void
  onCreated?: (appointment: Appointment) => void
  professional: UserWithProfile;
}

export function CreateAppointmentModal({ open, onClose, onCreated, professional }: Props) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Crear nuevo turno</DialogTitle>
        </DialogHeader>
                                  
        <AppointmentForm 
          onCreated={onCreated} 
          onClose={onClose} 
          professional={professional}
          />
      </DialogContent>
    </Dialog>
  )
}
