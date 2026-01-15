import { apiFetch } from "./api"
import { GetAllApiResponse } from "../types/appointments"
import { IntegrationParams } from "@/types/integrations";

export const getIntegrations = async (token: string | null ) => {
  try {
    if (!token) {
        throw new Error;
    }

    return await apiFetch<GetAllApiResponse<IntegrationParams>>("/settings/integrations?all=true", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })
  } catch (error) {
      throw error;
  }
  
}

export const getOneIntegration = async (token: string | null, integrationId?: string ) => {
  try {

      return await apiFetch<IntegrationParams>("/settings/integrations/" + integrationId, {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })

  } catch (error) {
    throw error;
  }
  
}


export const updateIntegration = async (data: Partial<IntegrationParams>, token: string | null, integrationId: string) => {
  try {
    return await apiFetch<IntegrationParams>(`/settings/integrations/${integrationId}`, {
    method: "PUT",
    headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",

    },
    body: JSON.stringify(data),
  })
  } catch (error) {
    throw error;
  }
  
}

export const deleteIntegration = async (integrationId: string, token: string | null) => {
  try {
    return await apiFetch<IntegrationParams>(`/settings/integrations/${integrationId}`, {
    method: "DELETE",
    headers: {
        "Authorization": `Bearer ${token}`,
    }

  })
  } catch (error) {
    throw error;
  }
  
}

export const integrateGoogle = async (token: string | null ): Promise<string | undefined> => {
  try {
    if (!token) {
        throw new Error;
    }

    return await apiFetch("/settings/integrations/calendar/auth", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })
  } catch (error) {
      throw error;
  }
}
 
export const integrateZoom = async (token: string | null ): Promise<string | undefined> => {
  try {
    if (!token) {
        throw new Error;
    }

    return await apiFetch("/settings/integrations/zoom/auth", {
    method: "GET",
    headers: {
        "Authorization": `Bearer ${token}`
    }
  })
  } catch (error) {
      throw error;
  }
}

