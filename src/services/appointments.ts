import { apiFetch } from "./api"
import * as Sentry from "@sentry/nextjs";
import { Appointment, AvailabilityResponse, GetAllApiResponse, GetOneAppointment } from "../types/appointments"

export const getAppointments = async (token: string | null ) => {
  try {
    if (!token) {
        throw new Error;
    }

    return apiFetch<GetAllApiResponse<Appointment>>("/appointments?all=true", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })
  } catch (error) {
    Sentry.captureException(error);
  }
  
}

export const createAppointment = async (data: Partial<Appointment>) => {
  return apiFetch<Appointment>("/appointments", {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateAppointment = async (data: Partial<Appointment>, token: string | null, isFromUser: boolean ) => {
  try {
    if (!token) {
        throw new Error;
    }
    if (isFromUser) {
      return apiFetch<Appointment>(`/appointments/from-user?token=${token}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",

    },
    body: JSON.stringify(data),
  })
    } else {
      return apiFetch<Appointment>(`/appointments/${data.appointmentId}`, {
    method: "PUT",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",

    },
    body: JSON.stringify(data),
  })
    }  
  } catch (error) {
    Sentry.captureException(error);
  }
  
}

export const getAvailableSlots = async (professionaId: string, year: number, month: number): Promise<AvailabilityResponse | undefined> => {
  try {
    if (!year || !month || !professionaId){
      throw new Error('Missing parameters');
    }
    
    return await apiFetch(`/professionals/${professionaId}/available-dates?year=${year}&month=${month}`, {
    method: "GET"
  })
  } catch (error) {
    Sentry.captureException(error);
  }
  
}

export const getOneAppointment = async (token: string | null, appointmentId?: string ) => {
  try {
    if (!token) {
        throw new Error;
    }
      return apiFetch<Appointment>("/appointments/" + appointmentId, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })

  } catch (error) {
    Sentry.captureException(error);
  }
  
}

export const getOneAppFromUser = async (token: string | null) => {
  try {
    if (!token) {
        throw new Error;
    }

      return apiFetch<GetOneAppointment>(`/appointments/from-user?token=${token}`, {
    method: "GET"
  })

  } catch (error) {
    Sentry.captureException(error);
  }
  
}