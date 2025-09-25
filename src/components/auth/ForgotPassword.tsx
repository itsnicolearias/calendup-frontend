"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Loader2 } from "lucide-react"
import { forgotPassword } from "@/services/auth"
import ConfirmationModal from "./ConfirmationModal"
import AuthLayout from "./AuthLayout"
import { toast } from "sonner"

interface ForgotPasswordEmailProps {
  onBack?: () => void
}

export default function ForgotPassword({ onBack }: ForgotPasswordEmailProps) {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [errors, setErrors] = useState<{ email?: string }>({})

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validación
    if (!email) {
      setErrors({ email: "El email es requerido" })
      return
    }

    if (!validateEmail(email)) {
      setErrors({ email: "Ingresa un email válido" })
      return
    }

    setIsLoading(true)

    try {
      await forgotPassword(email)

      setShowModal(true)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al enviar el email. Intenta nuevamente.")
      setErrors({ email: "Error al enviar el email. Intenta nuevamente." })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <AuthLayout
        title="¿Olvidaste tu contraseña?"
        subtitle="Ingresa tu email y te enviaremos un enlace para restablecerla"
        icon={<Mail className="w-8 h-8 text-white" />}
        showBackButton
        onBack={onBack}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`pl-10 h-12 border-gray-200 focus:border-[#0388bd] focus:ring-blue-500 ${
                  errors.email ? "border-red-500 focus:border-red-500" : ""
                }`}
                disabled={isLoading}
              />
            </div>
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Enviando...
              </>
            ) : (
              "Enviar enlace de recuperación"
            )}
          </Button>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Recordaste tu contraseña?{" "}
              <button type="button" onClick={onBack} className="text-[#0388bd] hover:text-gray-900 font-medium">
                Volver al inicio de sesión
              </button>
            </p>
          </div>
        </form>
      </AuthLayout>

      <ConfirmationModal isOpen={showModal} onClose={() => setShowModal(false)} type="email-sent" email={email} />
    </>
  )
}
