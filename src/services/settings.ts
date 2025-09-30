import { apiFetch } from "@/services/api"
import { ProfileFormValues, UserWithProfile } from "@/types/settings"

export const getProfile = async (token: string) => {
    try {
        if (!token){
            return null;
        } 

        const user =  await apiFetch<UserWithProfile>("/settings/profile", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

  return user;  
    } catch (error) {
        throw error;
    }
  
}

export const updateProfile = async (token: string | null, body: ProfileFormValues ) => {
    try {
    if (!token) {
        throw new Error;
    }
    return await apiFetch("/settings/profile", {
    method: "PUT",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })      
    } catch (error) {
       throw error;
    }
  
}

export const changePassword = async (token: string, body: { password: string; newPassword: string }) => {
    try {
        if (!token){
            return null;
        } 

        return await apiFetch("/settings/change-password", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        })
    } catch (error) {
        throw error;
    }
}