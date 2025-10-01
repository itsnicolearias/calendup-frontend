import { Login, LoginResponse, Register, ResetPasswordProps } from "@/types/auth";
import { apiFetch } from "./api"

export const loginUser = async (body: Login) => {
    try {
        return await apiFetch<LoginResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
        })

    } catch (error) {
        throw error;
    }
  
}

export const registerUser = async (body: Register) => {
    try {
    return await apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  })
    } catch (error) {
        throw error; 
    }
  
}

export const forgotPassword = async (email: string) => {
    try {
    const res = await  apiFetch("/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({email: email}),
  })

    return res
    } catch (error) {
        throw error;
    }
  
}

export const resetPassword = async (body: ResetPasswordProps) => {
    try {
        const res = await apiFetch(`/auth/reset-password?token=${body.token}`, {
        method: "POST",
        body: JSON.stringify({newPassword: body.newPassword})
        })
        return res;
    } catch (error) {
        throw error;
    }
  
}