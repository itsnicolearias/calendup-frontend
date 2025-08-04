import { Login, LoginResponse, Register } from "@/types/auth";
import { apiFetch } from "../app/api"

export const loginUser = async (body: Login) => {
    try {
        return apiFetch<LoginResponse>("/auth/login", {
            method: "POST",
            body: JSON.stringify(body),
        })

    } catch (error) {
        throw error;
    }
  
}

export const registerUser = async (body: Register) => {
    try {
    return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify(body),
  })
    } catch (error) {
        throw error;
    }
  
}