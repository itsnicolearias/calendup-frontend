"use client"

import { useEffect } from "react"
import * as Sentry from "@sentry/nextjs"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Captura el error en Sentry apenas se renderiza
    if (error) {
      Sentry.captureException(error)
    }
  }, [error])

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">¡Ups! Algo salió mal</h1>
          <p className="mt-2 text-gray-600">
            Estamos trabajando para solucionarlo. Por favor, intenta nuevamente.
          </p>

          <button
            onClick={() => reset()}
            className="mt-6 rounded-lg bg-[#197387] px-4 py-2 text-white shadow hover:opacity-90"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  )
}
