import { Appointment, AppointmentStatus } from "@/types/appointments"
import { AppointmentCard } from "./AppointmentCard"
import { updateAppointment } from "@/services/appointments"
import { getStatusText } from "../../types/status"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { CreateAppointmentModal } from "./CreateAppointmentModal"
import { Copy, Plus } from "lucide-react"
import { UserWithProfile } from "@/types/settings"
import { OnboardingChecklist } from "./OnboardingChecklist"
import WelcomeWizard from "./WelcomeWizard"
import { updateProfile } from "@/services/settings"
import { toast } from "sonner"
import ProfileCompletedModal from "./ProfileCompletedModal"
import DashboardSidebarMain from "./sidebar/SidebarMain"

interface Props {
  appointments: Appointment[]
  onOpen: (appointment: Appointment) => void
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>
  professional: UserWithProfile | null;
  refreshProfessional: () => Promise<void>
  usedAppThisMonth: number;
}

export function AppointmentsBoard({ appointments, onOpen, setAppointments, professional, refreshProfessional, usedAppThisMonth }: Props) {
   const [open, setOpen] = useState(false)
   const [openWizard, setOpenWizard] = useState(false);
   const [openPCModal, setopenPCModal] = useState(false);

   const profile = professional?.profile;

  const handleDragStart = (e: React.DragEvent, appointment: Appointment) => {
    e.dataTransfer.setData("appointmentId", appointment.appointmentId.toString())
  }

  const appointmentLink = professional ? `${process.env.NEXT_PUBLIC_FRONT_URL}/appointments/create?professionalId=${professional?.userId}` : '';

  const handleDrop = async (e: React.DragEvent, status: AppointmentStatus) => {
    const appointmentId = e.dataTransfer.getData("appointmentId")
    setAppointments((prev) =>
      prev.map((a) => (a.appointmentId.toString() === appointmentId ? { ...a, status } : a))
    )
    try {
      const token = localStorage.getItem("token")
      await updateAppointment({ appointmentId, status }, token, false)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
    }
  }


  const statuses: { key: AppointmentStatus; color: string; dot: string }[] = [
    { key: "pending", color: "text-yellow-700", dot: "bg-yellow-500" },
    { key: "confirmed", color: "text-green-700", dot: "bg-green-500" },
    //{ key: "completed", color: "text-blue-700", dot: "bg-blue-500" },
    { key: "cancelled", color: "text-red-700", dot: "bg-red-500" },
  ]

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

  

 
  return (
     <div className="flex min-h-screen">
      {professional?.Subscription && (
        <DashboardSidebarMain
          currentView="turnos"
          onViewChange={(view) => (view === "turnos" ? null : null)}
          usedAppointments={usedAppThisMonth}
          subscriptionData={professional?.Subscription}
          //onUpgrade={() => console.log("Upgrade clicked")}
        />
      )}

      <div className="flex-1">
      
      { profile && !profile?.profileCompleted && (
        <OnboardingChecklist profile={profile || {}} />
      )}

      { profile && profile?.isNewUser && (
        <WelcomeWizard open={openWizard} setOpen={setOpenWizard} isNewUser={profile?.isNewUser} handleFinish={handleFinishWizard} />
      )}

      { profile && profile?.profileCompleted && !profile?.pcModalShowed && (
        <ProfileCompletedModal open={openPCModal} onClose={handleClosePCModal} schedulingLink={appointmentLink} />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contenedor flex para título y botón */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
            Mis Turnos
          </h1>

          <div className="flex items-center space-x-2">
           <div className="hidden sm:flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white/80 hover:bg-white border-gray-300"
                  onClick={() => navigator.clipboard.writeText(`${appointmentLink}`)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Compartir Link
                </Button>

                
                {/* Botón para abrir modal */}
                <Button 
                  className="sm:ml-4 px-4 py-2 bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white" 
                  onClick={() => setOpen(true)} 
                  disabled={!profile || !profile?.profileCompleted}>
                   <Plus className="w-4 h-4 mr-2" />
                  Nuevo Turno
                </Button>
            </div>

          </div>
          
          
        </div>

        <CreateAppointmentModal 
        open={open} 
        onClose={() => setOpen(false)}
        onCreated={(appointment) => setAppointments((prev) => [appointment, ...prev])} 
        />

        <p className="text-gray-600 mt-2">
          Arrastra los turnos entre columnas para cambiar su estado
        </p>
      </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
          {statuses.map(({ key, color, dot }) => (
            <div
              key={key}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, key)}
              className="min-h-[400px] transition-colors duration-200"
            >
              <div className="h-full bg-white shadow rounded-xl p-4">
                <h3 className={`font-semibold flex items-center mb-3 ${color}`}>
                  <div className={`w-3 h-3 rounded-full mr-2 ${dot}`}></div>
                  {getStatusText(key)}
                </h3>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {appointments
                    .filter((a) => a.status === key)
                    .map((a) => (
                      <AppointmentCard
                        key={a.appointmentId}
                        appointment={a}
                        onOpen={onOpen}
                        onDragStart={handleDragStart}
                      />
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div> 
        </div>       
    </div>    
  )
}
