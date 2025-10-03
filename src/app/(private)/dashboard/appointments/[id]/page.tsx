"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Appointment } from "@/types/appointments"
import { getAppointments } from "@/services/appointments"
import { AppointmentModal } from "@/components/appointments/AppointmentModal"

export default function AppointmentDetailPage() {
  const  id  = useParams()
  const router = useRouter()
  const [appointment, setAppointment] = useState<Appointment | null>(null)

  if (!id){
    throw new Error;
  }

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token")
      const data = await getAppointments(token!)

      if (data) {
        const found = data.appointments.rows.find((a: Appointment) => a.appointmentId === String(id?.id))

        if (found) setAppointment(found)
      }
   
    }
    fetchData()
  }, [id])

  if (!appointment) return null

  const handleClose = () => {
    router.push(`/dashboard/appointments`)
  }

  return <AppointmentModal appointment={appointment} handleClose={handleClose} />
}
