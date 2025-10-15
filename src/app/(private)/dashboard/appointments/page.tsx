"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppointmentsBoard } from "@/components/dashboard/AppointmentsBoard"
import { Appointment } from "@/types/appointments"
import { getAppointments } from "@/services/appointments"
import { useUser } from "@/contexts/UserContext"
import { toast } from "sonner"
import { useIsMobile } from "@/hooks/isDeviceMobile"
import { MobileAppointmentsBoard } from "@/components/dashboard/mobile-dashboard/AppointmentsBoard"

export default function AppointmentsPage() {
  const router = useRouter()

  const { user, refreshUser } = useUser()

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [usedAppThisMonth, setUsedAppThisMonth] = useState<number>(0)

  const isMobile = useIsMobile();

  // cargar turnos
  useEffect(() => {
    const getAppointmentsRows = async (): Promise<Appointment[] | undefined> => {
      try {
        const token = localStorage.getItem('token');
        if (!token || token === null){
          router.push("/auth/login")
          return undefined
        }
    
        const appData = await getAppointments(token)

        if (appData){
          setAppointments(appData.appointments.rows)
          setUsedAppThisMonth(appData.createdThisMonth)
        }
        //return appData.rows;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
        return undefined
      }
    }

    getAppointmentsRows()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const openAppointment = (appointment: Appointment) => {
    router.push(`/dashboard/appointments/${appointment.appointmentId}`)
  }


  return (
    <>
    {isMobile ?
    <MobileAppointmentsBoard 
      appointments={appointments}
      onOpen={openAppointment}
      setAppointments={setAppointments}
      professional={user}
      refreshProfessional={refreshUser}

    />
    :
    <AppointmentsBoard 
        appointments={appointments} 
        onOpen={openAppointment} 
        setAppointments={setAppointments} // para drag & drop
        professional={user}
        refreshProfessional={refreshUser}
        usedAppThisMonth={usedAppThisMonth}
      />
    }     
    </>
  )
}
