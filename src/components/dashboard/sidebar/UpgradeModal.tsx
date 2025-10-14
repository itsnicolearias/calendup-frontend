"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Check, X, Sparkles, Calendar, Video, Zap, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

interface UpgradeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function UpgradeModal({ open, onOpenChange }: UpgradeModalProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const router = useRouter()

  const premiumHighlights = [
    {
      icon: Zap,
      text: "Turnos ilimitados",
      color: "text-purple-600",
    },
    {
      icon: Star,
      text: "Destacá en el portal de profesionales",
      color: "text-blue-600",
    },
    {
      icon: Calendar,
      text: "Sincronización con Google Calendar",
      color: "text-green-600",
    },
    {
      icon: Video,
      text: "Links de Google Meet y Zoom",
      color: "text-red-600",
    }
  ]

  const handleUpgrade = () => {
    if (billingCycle === "monthly") {
      router.push(`${process.env.NEXT_PUBLIC_BASE_MP_SUBSCRIPTION_URL}?preapproval_plan_id=${process.env.NEXT_PUBLIC_MP_PLAN_MENSUAL_ID}`);
    }

    if (billingCycle === "annual") {
      router.push(`${process.env.NEXT_PUBLIC_BASE_MP_SUBSCRIPTION_URL}?preapproval_plan_id=${process.env.NEXT_PUBLIC_MP_PLAN_ANNUAL_ID}`);
    }
    onOpenChange(false)
  }

  const handleStayFree = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header con gradiente */}
        <div className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] p-6 text-white">
          <DialogHeader>
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8" />
              </div>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center text-white">
              Potenciá tu negocio con CalendUp Pro
            </DialogTitle>
            <DialogDescription className="text-white/90 text-center mt-2">
              Ahorrá tiempo, cobrá por adelantado y hacé crecer tu agenda sin límites
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* Contenido del modal */}
        <div className="p-6 space-y-6">
          {/* Toggle de facturación */}
          <div className="flex flex-col items-center space-y-3">
            <p className="text-sm font-medium text-gray-700">Elegí tu plan de pago</p>
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1 w-full max-w-md">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={cn(
                  "flex-1 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200",
                  billingCycle === "monthly"
                    ? "bg-white text-[#0388bd] shadow-md"
                    : "text-gray-600 hover:text-gray-900",
                )}
              >
                Mensual
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={cn(
                  "flex-1 px-4 py-3 rounded-full text-sm font-medium transition-all duration-200 relative",
                  billingCycle === "annual" ? "bg-white text-[#0388bd] shadow-md" : "text-gray-600 hover:text-gray-900",
                )}
              >
                Anual
                <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5">-17%</Badge>
              </button>
            </div>
          </div>

          {/* Precio */}
          <Card className="border-2 border-[#0388bd]/20 bg-gradient-to-br from-blue-50/50 to-purple-50/50 p-6">
            <div className="text-center space-y-2">
              {billingCycle === "monthly" ? (
                <>
                  <div className="text-5xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                    $10.000
                  </div>
                  <p className="text-gray-600">por mes</p>
                  <p className="text-sm text-gray-500">Facturado mensualmente • Cancelá cuando quieras</p>
                </>
              ) : (
                <>
                  <div className="space-y-1">
                    <div className="text-lg text-gray-500 line-through">$120.000/año</div>
                    <div className="text-5xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                      $100.000
                    </div>
                  </div>
                  <p className="text-gray-600">por año</p>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    ¡Ahorrá $20.000! (2 meses gratis)
                  </Badge>
                  <p className="text-sm text-gray-500 pt-2">Facturado anualmente • Cancelá cuando quieras</p>
                </>
              )}
            </div>
          </Card>

          {/* Características principales */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">✨ Lo que obtenés con CalendUp Pro</h3>
            <div className="space-y-3">
              {premiumHighlights.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-white border border-gray-200 hover:border-[#0388bd]/30 transition-colors duration-200"
                >
                  <div
                    className={cn("w-10 h-10 rounded-full flex items-center justify-center bg-gray-50", feature.color)}
                  >
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <span className="text-gray-700 font-medium flex-1">{feature.text}</span>
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>

          {/* Comparación rápida */}
          <Card className="p-4 bg-gray-50 border-0">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <p className="font-semibold text-gray-900 mb-3">Plan Gratis</p>
                <div className="flex items-center space-x-2 text-gray-600">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>50 turnos/mes</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Sin cobros online</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <X className="w-4 h-4 text-red-500 flex-shrink-0" />
                  <span>Sin integraciones</span>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-semibold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent mb-3">
                  Plan Pro
                </p>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Turnos ilimitados</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Perfil destacado en el portal</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-700">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>Todas las integraciones</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Botones de acción */}
          <div className="space-y-3 pt-4">
            <Button
              onClick={handleUpgrade}
              className="w-full bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200 group relative overflow-hidden"
              size="lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Sparkles className="w-5 h-5 mr-2" />
              Mejorar a CalendUp Premium
            </Button>

            <Button
              onClick={handleStayFree}
              variant="ghost"
              className="w-full hover:bg-gray-100 text-gray-700 font-medium"
              size="lg"
            >
              Seguir con el Plan Gratis
            </Button>
          </div>

          {/* Garantía */}
          <div className="text-center">
            <p className="text-xs text-gray-500">🔒 Pago seguro • Sin permanencia • Cancelá cuando quieras</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
