import { apiFetch } from "./api";

export const cancelSubscription = async (userId: string, token: string) => {
    try {
        if (!token){
            return null;
        } 

        const response = await apiFetch(`/subscriptions/cancel/${userId}`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
        })

        return response;  
    } catch (error) {
        throw error;
    }
  
}