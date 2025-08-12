import { apiFetch } from "@/services/api"
import { ProfileFormValues, UserWithProfile } from "@/types/settings"

export const getProfile = async (token: string | null ): Promise<ProfileFormValues | undefined> => {
    try {
    if (!token) {
        throw new Error;
    }
    const user =  await apiFetch<UserWithProfile>("/settings/profile", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })

  return user.profile;    
    } catch (error) {
        console.log(error)
    }
  
}

export const updateProfile = async (token: string | null, body: ProfileFormValues ) => {
    try {
    if (!token) {
        throw new Error;
    }
    return apiFetch("/settings/profile", {
    method: "PUT",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  })      
    } catch (error) {
        console.log(error)
        throw error;
    }
  
}