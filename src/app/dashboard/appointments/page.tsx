"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { AppointmentsBoard } from "@/components/appointments/AppointmentsBoard"
import { AppointmentDetailModal } from "@/components/appointments/AppointmentDetailModal"
import { Appointment } from "@/types/appointments"
import { getAppointments } from "@/services/appointments"

export default function AppointmentsPage() {
  const router = useRouter()
  const params = useParams()

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

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

  // abrir modal si hay id en la url
  useEffect(() => {
    if (params?.id && appointments.length > 0) {
      const found = appointments.find((a) => a.appointmentId.toString() === params.id)
      setSelectedAppointment(found || null)
    } else {
      setSelectedAppointment(null)
    }
  }, [params, appointments])

  const openAppointment = (appointment: Appointment) => {
    router.push(`/dashboard/appointments/${appointment.appointmentId}`)
  }

  const closeAppointment = () => {
    router.push("/dashboard/appointments")
  }

  return (
    <>
      <AppointmentsBoard 
        appointments={appointments} 
        onOpen={openAppointment} 
        setAppointments={setAppointments} // para drag & drop
      />
      <AppointmentDetailModal 
        appointment={selectedAppointment} 
        onClose={closeAppointment} 
      />
    </>
  )
}
