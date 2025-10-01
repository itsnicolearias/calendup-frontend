
export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T | undefined> {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
        headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        },
        ...options,
    })

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw { status: response.status, ...data };
        }

        const data = await response.json()

        return data;
    } catch (error) {
        throw error
       // Sentry.captureException(error);
    }
}
