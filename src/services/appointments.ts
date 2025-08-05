import { apiFetch } from "./api"
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

export const updateAppointment = async (data: Partial<Appointment>, token: string | null ) => {
  return apiFetch(`/appointments/${data.appointmentId}`, {
    method: "PUT",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",

    },
    body: JSON.stringify(data),
  })
}
