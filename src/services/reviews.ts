import { apiFetch } from "./api"
import { GetAllApiResponse, ReviewBody } from "../types/appointments"
import * as Sentry from "@sentry/nextjs";

export const getAppointments = async (token: string | null ) => {
  try {
    if (!token) {
        throw new Error;
    }

    return await apiFetch<GetAllApiResponse<ReviewBody>>("/appointments/reviews?all=true", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })
  } catch (error) {
    Sentry.captureException(error);
  }
  
}

export const getOneReview = async (token: string | null, reviewId?: string ) => {
  try {

      return await apiFetch<ReviewBody>("/appointments/reviews/" + reviewId, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })

  } catch (error) {
    Sentry.captureException(error);
  }
  
}

export const createReview = async (data: Partial<ReviewBody>, token: string) => {
  return await apiFetch<ReviewBody>(`/appointments/reviews?token=${token}`, {
    method: "POST",
    body: JSON.stringify(data),
  })
}

export const updateReview = async (data: Partial<ReviewBody>, token: string | null) => {
  try {

      return await apiFetch<ReviewBody>(`/appointments/reviews/${data.reviewId}`, {
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

export const deleteReview = async (reviewId: string, token: string | null) => {
  try {
      return await apiFetch<ReviewBody>(`/appointments/reviews/${reviewId}`, {
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${token}`,
    }

  })
  } catch (error) {
    Sentry.captureException(error);
  }
  
}



