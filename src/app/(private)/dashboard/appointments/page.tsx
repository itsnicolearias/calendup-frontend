"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { AppointmentsBoard } from "@/components/appointments/AppointmentsBoard"
import { Appointment } from "@/types/appointments"
import { getAppointments } from "@/services/appointments"
import { useUser } from "@/contexts/UserContext"

export default function AppointmentsPage() {
  const router = useRouter()

  const { user } = useUser()

  const [appointments, setAppointments] = useState<Appointment[]>([])

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
        setAppointments(appData.rows)
        //return appData.rows;
      } catch (error) {
        console.error(error)
        return undefined
      }
    }

    getAppointmentsRows()
  }, [])

  const openAppointment = (appointment: Appointment) => {
    router.push(`/dashboard/appointments/${appointment.appointmentId}`)
  }


  return (
    <>
      <AppointmentsBoard 
        appointments={appointments} 
        onOpen={openAppointment} 
        setAppointments={setAppointments} // para drag & drop
        professional={user}
      />
    </>
  )
}
