import { AppointmentType, GetAllApiResponse } from "@/types/appointments";
import { apiFetch } from "./api";
import * as Sentry from "@sentry/nextjs";

export const getAppointmentsTypes = async (token: string | null ) => {
  try {
    if (!token) {
        throw new Error;
    }

    return await apiFetch<GetAllApiResponse<AppointmentType>>("/appointments/appointment-types", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })
  } catch (error) {
    Sentry.captureException(error);
  }
  
}

export const getOneAppType = async (id: string, token: string | null) => {
  try {
    if (!token) {
        throw new Error;
    }

    return await apiFetch<AppointmentType>(`/appointments/appointment-types/${id}`, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })
  } catch (error) {
    Sentry.captureException(error);
  }
  
}

export const createAppointmentType = async (data: Partial<AppointmentType>, token: string | null) => {
    try {

       return await apiFetch<AppointmentType>("/appointments/appointment-types", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",

    },
  }) 
        
    } catch (error) {
        Sentry.captureException(error);
    }
  
}

export const updateAppointmentType = async (data: Partial<AppointmentType>, id: string, token: string | null) => {
  try {
    if (!token) {
        throw new Error;
    }

      return await apiFetch<AppointmentType>(`/appointments/appointment-types/${id}`, {
    method: "PUT",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",

    },
    body: JSON.stringify(data),
  })

  } catch (error) {
    Sentry.captureException(error);
  }
  
}

export const deleteAppointmentType = async (id: string, token: string | null) => {
  try {
    if (!token) {
        throw new Error;
    }
      return await apiFetch(`/appointments/appointment-types/${id}`, {
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${token}`,
    },

  })

  } catch (error) {
    Sentry.captureException(error);
  }
  
}