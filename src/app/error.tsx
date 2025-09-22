"use client"

import { useEffect } from "react"
import * as Sentry from "@sentry/nextjs"
import { AlertCircle } from "lucide-react"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    if (error) {
      Sentry.captureException(error)
    }
  }, [error])

  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center max-w-md">
          <div className="flex justify-center mb-4">
            <AlertCircle className="w-12 h-12 text-[#ac043f] animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
            ¡Ups! Algo salió mal
          </h1>
          <p className="mt-3 text-gray-600">
            Estamos trabajando para solucionarlo. Por favor, intenta nuevamente.
          </p>

          <button
            onClick={() => reset()}
            className="mt-6 w-full rounded-2xl bg-[#197387] px-6 py-3 text-white font-semibold shadow-lg transition hover:opacity-90 hover:shadow-xl"
          >
            Reintentar
          </button>
        </div>
      </body>
    </html>
  )
}
