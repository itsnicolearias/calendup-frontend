"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock, Eye, EyeOff, Loader2, CheckCircle, XCircle } from "lucide-react"
import AuthLayout from "./AuthLayout"
import ConfirmationModal from "./ConfirmationModal"
import { resetPassword } from "@/services/auth"

interface ResetPasswordProps {
  token: string
  onSuccess?: () => void
}

export default function ResetPassword({ token, onSuccess }: ResetPasswordProps) {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})

  const passwordRequirements = [
    { text: "Al menos 8 caracteres", met: formData.password.length >= 8 },
    { text: "Una letra mayúscula", met: /[A-Z]/.test(formData.password) },
    { text: "Una letra minúscula", met: /[a-z]/.test(formData.password) },
    { text: "Un número", met: /\d/.test(formData.password) },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: { password?: string; confirmPassword?: string } = {}

    if (!formData.password) {
      newErrors.password = "La contraseña es requerida"
    } else if (formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres"
    } else if (!passwordRequirements.every((req) => req.met)) {
      newErrors.password = "La contraseña no cumple con todos los requisitos"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña"
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    try {
        const password = formData.password;

        await resetPassword({token, newPassword: password})
        setShowModal(true)


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setErrors({ password: "Error al restablecer la contraseña. Intenta nuevamente." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleModalAction = () => {
    setShowModal(false)
    onSuccess?.()
  }

  return (
    <>
      <AuthLayout
        title="Nueva contraseña"
        subtitle="Ingresa tu nueva contraseña para restablecer el acceso a tu cuenta"
        icon={<Lock className="w-8 h-8 text-white" />}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Nueva contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleInputChange}
                className={`pl-10 pr-10 h-12 border-gray-200 focus:border-[#0388bd] focus:ring-blue-500 ${
                  errors.password ? "border-red-500 focus:border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
          </div>

          {/* Requisitos de contraseña */}
          {formData.password && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-700">Requisitos de contraseña:</p>
              <div className="grid grid-cols-1 gap-2">
                {passwordRequirements.map((req, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    {req.met ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <XCircle className="w-4 h-4 text-gray-300" />
                    )}
                    <span className={`text-sm ${req.met ? "text-green-600" : "text-gray-500"}`}>{req.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirmar contraseña
            </Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`pl-10 pr-10 h-12 border-gray-200 focus:border-[#0388bd] focus:ring-blue-500 ${
                  errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading || !passwordRequirements.every((req) => req.met)}
            className="w-full h-12 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Restableciendo...
              </>
            ) : (
              "Restablecer contraseña"
            )}
          </Button>
        </form>
      </AuthLayout>

      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        type="password-reset"
        onAction={handleModalAction}
      />
    </>
  )
}
