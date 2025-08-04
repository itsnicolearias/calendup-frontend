import { apiFetch } from "../app/api"
import { Appointment, AppointmentsResponse } from "../types/appointments"

export const getAppointments = async (token: string | null ) => {
  return apiFetch<AppointmentsResponse>("/appointments", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })
}

export const createAppointment = async (data: Partial<Appointment>) => {
  return apiFetch<Appointment>("/appointments", {
    method: "POST",
    body: JSON.stringify(data),
  })
}


