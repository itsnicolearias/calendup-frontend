import { UserWithProfile } from "@/types/settings"
import { apiFetch } from "./api"
import { GetAllApiResponse } from "@/types/appointments"
import { GetProfessionalResponse } from "@/types/review"

export const getUsers = async () => {
    try {
    return await apiFetch<GetAllApiResponse<UserWithProfile>>("/professionals?all=true", {
    method: "GET",
  })  
    } catch (error) {
        throw error;
    }
}

export const getOneUser = async (professionalId: string): Promise<GetProfessionalResponse | undefined> => {
    try {
    const data = await apiFetch<GetProfessionalResponse>("/professionals/" + professionalId, {
    method: "GET",
  })
  
  return data;
    } catch (error) {
        throw error;
    }
}