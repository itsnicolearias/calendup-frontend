"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Plus,
  Copy,
} from "lucide-react"
import StatusTabs from "./StatusTabs"
import { UserWithProfile } from "@/types/settings"
import { Appointment } from "@/types/appointments"
import { updateAppointment } from "@/services/appointments"
import { toast } from "sonner"
import { CreateAppointmentModal } from "../CreateAppointmentModal"
import { OnboardingChecklist } from "../OnboardingChecklist"
import WelcomeWizard from "../WelcomeWizard"
import { updateProfile } from "@/services/settings"
import ProfileCompletedModal from "../ProfileCompletedModal"
import MobileBottomBar from "./BottomBar"


interface Props {
  appointments: Appointment[]
  onOpen: (appointment: Appointment) => void
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>
  professional: UserWithProfile | null;
  refreshProfessional: () => Promise<void>
  usedAppThisMonth: number;
}


export function MobileAppointmentsBoard({ appointments, onOpen, setAppointments, professional, refreshProfessional, usedAppThisMonth }: Props) {
  const [activeTab, setActiveTab] = useState("all")
  const [open, setOpen] = useState(false)
  const [openPCModal, setopenPCModal] = useState(false);
  const [openWizard, setOpenWizard] = useState(false);

  const profile = professional?.profile;

  // Calculate counts for each status
  const statusCounts = appointments.reduce(
    (acc, appointment) => {
      acc[appointment.status] = (acc[appointment.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Filter appointments based on active tab and search
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesTab = activeTab === "all" || appointment.status === activeTab

    return matchesTab 
  })

  const handleStatusChange = async (appointmentId: string, newStatus: Appointment["status"]) => {
    setAppointments((prev) => prev.map((a) => (a.appointmentId === appointmentId ? { ...a, status: newStatus } : a)))
    try {
          const token = localStorage.getItem("token")
          await updateAppointment({ appointmentId, status: newStatus }, token, false)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
        }
    }

    const handleFinishWizard = async () => {
        setOpenWizard(false);
         
        try {
          const token = localStorage.getItem("token")
          await updateProfile(token, { isNewUser: false })
          await refreshProfessional()
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
        }
    
      }
      
    const handleClosePCModal = async () => {
    setopenPCModal(false);
     
    try {
      const token = localStorage.getItem("token")
      await updateProfile(token, { pcModalShowed : true })
      await refreshProfessional()    
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
    }

  }


    useEffect(() => {
        const openPcModal = () => {
        if (profile && profile?.profileCompleted && !profile?.pcModalShowed) {
          setopenPCModal(true)
    
        } 
      }
      openPcModal()
      
        }, [profile]);

    const appointmentLink = professional ? `${process.env.NEXT_PUBLIC_FRONT_URL}/appointments/create?professionalId=${professional.userId}` : '';

  return (
    <>
    { profile && !profile?.profileCompleted && (
            <OnboardingChecklist profile={professional?.profile || {}} />
    )}
    
    { profile && profile?.isNewUser && (
      <WelcomeWizard open={openWizard} setOpen={setOpenWizard} isNewUser={profile?.isNewUser} handleFinish={handleFinishWizard} />
    )}

    { profile && profile?.profileCompleted && !profile?.pcModalShowed && (
            <ProfileCompletedModal open={openPCModal} onClose={handleClosePCModal} schedulingLink={appointmentLink} />
    )}

    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">

              <h1 className="ml-3 text-xl sm:text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                Mis Turnos
              </h1>

            <div className="flex items-center space-x-2">


              {/* Mobile buttons - only icons */}
              <div className="flex sm:hidden items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 hover:bg-white border-gray-300 h-9 w-9 p-0"
                  onClick={() => navigator.clipboard.writeText(`${appointmentLink}`)}
                  aria-label="Copiar link de agendamiento"
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <Button
                  onClick={() => setOpen(true)}
                  size="sm"
                  disabled={!professional || !professional.profile?.profileCompleted}
                  aria-label="crear nuevo turno"
                  className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#8a0336] hover:to-[#0370a3] text-white h-9 w-9 p-0"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateAppointmentModal 
        open={open} 
        onClose={() => setOpen(false)} 
        onCreated={(appointment) => setAppointments((prev) => [appointment, ...prev])} 
        professional={professional!}
        />

      <StatusTabs 
        appointments={appointments}  
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        filteredAppointments={filteredAppointments}
        onOpen={onOpen}
        handleStatusChange={handleStatusChange}
        statusCounts={statusCounts}
         />

        {professional?.Subscription?.plan && (
          <MobileBottomBar 
            currentPlan={professional.Subscription.plan}
            usedAppointments={usedAppThisMonth} 
            totalAppointments={professional?.Subscription?.plan?.features?.maxAppointmentsPerMonth}
          />
        )}
    </div>
    </>
  )
}
