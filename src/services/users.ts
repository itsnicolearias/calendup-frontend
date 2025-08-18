import { UserWithProfile } from "@/types/settings"
import { apiFetch } from "./api"
import { GetAllApiResponse } from "@/types/appointments"

export const getUsers = async () => {
    try {
    return await apiFetch<GetAllApiResponse<UserWithProfile>>("/professionals", {
    method: "GET",
  })  
    } catch (error) {
        console.log(error)
    }
}

export const getOneUser = async (professionalId: string): Promise<UserWithProfile | undefined> => {
    try {
    const data = await apiFetch<UserWithProfile>("/professionals/" + professionalId, {
    method: "GET",
  })  
  return data;
    } catch (error) {
        console.log(error)
    }
}