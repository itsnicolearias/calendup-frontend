export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        },
        ...options,
    })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}))
            throw new Error(errorData.message || "Error en la solicitud")
        }

        const data = await response.json()

        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error)
        throw error
    }
}
