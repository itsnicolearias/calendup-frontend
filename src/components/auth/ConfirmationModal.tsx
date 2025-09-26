"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, ArrowRight } from "lucide-react"

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  type: "email-sent" | "password-reset"
  email?: string
  onAction?: () => void
}

export default function ConfirmationModal({ isOpen, onClose, type, email, onAction }: ConfirmationModalProps) {
  const getModalContent = () => {
    switch (type) {
      case "email-sent":
        return {
          icon: <Mail className="w-12 h-12 text-[#0388bd]" />,
          title: "¡Email enviado!",
          description: `Hemos enviado un enlace de recuperación a ${email}. Revisa tu bandeja de entrada y sigue las instrucciones para restablecer tu contraseña.`,
          actionText: "Entendido",
          additionalInfo: "Si no recibes el email en unos minutos, revisa tu carpeta de spam.",
        }
      case "password-reset":
        return {
          icon: <CheckCircle className="w-12 h-12 text-green-600" />,
          title: "¡Contraseña actualizada!",
          description:
            "Tu contraseña ha sido restablecida exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.",
          actionText: "Ir a Iniciar Sesión",
          //additionalInfo: "Por seguridad, hemos cerrado todas las sesiones activas en otros dispositivos.",
        }
      default:
        return {
          icon: <CheckCircle className="w-12 h-12 text-[#0388bd]" />,
          title: "Confirmación",
          description: "Operación completada exitosamente.",
          actionText: "Continuar",
        }
    }
  }

  const content = getModalContent()

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
        <DialogHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-[#ac043f]/10 to-[#0388bd]/10 rounded-full flex items-center justify-center">
              {content.icon}
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900">{content.title}</DialogTitle>
          <DialogDescription className="text-gray-600 leading-relaxed">{content.description}</DialogDescription>
          {content.additionalInfo && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">{content.additionalInfo}</p>
            </div>
          )}
        </DialogHeader>
        <div className="flex flex-col space-y-3 mt-6">
          <Button
            onClick={onAction || onClose}
            className="w-full h-12 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white font-semibold rounded-lg transition-all duration-200"
          >
            {content.actionText}
            {type === "password-reset" && <ArrowRight className="ml-2 w-4 h-4" />}
          </Button>
          {type === "email-sent" && (
            <Button variant="outline" onClick={onClose} className="w-full bg-transparent">
              Cerrar
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
