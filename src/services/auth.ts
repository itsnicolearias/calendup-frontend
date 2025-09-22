import { Login, LoginResponse, Register } from "@/types/auth";
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