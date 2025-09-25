import { Login, LoginResponse, Register, ResetPasswordProps } from "@/types/auth";
import { apiFetch } from "./api"
import * as Sentry from "@sentry/nextjs";

export const loginUser = async (body: Login) => {
    try {
        return apiFetch<LoginResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
        })

    } catch (error) {
        Sentry.captureException(error);
    }
  
}

export const registerUser = async (body: Register) => {
    try {
    return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  })
    } catch (error) {
        Sentry.captureException(error);
    }
  
}

export const forgotPassword = async (email: string) => {
    try {
    return apiFetch("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({email: email}),
  })
    } catch (error) {
        Sentry.captureException(error);
    }
  
}

export const resetPassword = async (body: ResetPasswordProps) => {
    try {
    return apiFetch(`/auth/reset-password?token=${body.token}`, {
    method: "POST",
    body: JSON.stringify({newPassword: body.newPassword})
  })
    } catch (error) {
        Sentry.captureException(error);
    }
  
}