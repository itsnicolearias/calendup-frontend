"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, Users, Link, Clock, Monitor, Settings, RotateCcw, Bell, Zap, Video } from "lucide-react"
import { useState } from "react"
import { FeatureItem } from "./FeatureItem"
import { useRouter } from "next/navigation"

const premiumFeatures = [
  {
    icon: Zap,
    text: "Turnos ilimitados",
    emoji: "🚀",
    highlight: true,
  },
  {
    icon: CreditCard,
    text: "Perfil destacado en el portal de profesionales",
    emoji: "🌟",
    highlight: true,
  },
  {
    icon: Calendar,
    text: "Sincronización automática con Google Calendar",
    emoji: "📅",
    highlight: true,
  },
  {
    icon: Video,
    text: "Links automáticos de Google Meet y Zoom",
    emoji: "🎥",
    highlight: true,
  },
  {
    icon: Bell,
    text: "Recordatorios automáticos por email",
    emoji: "🔔",
    highlight: true,
  },
  {
    icon: Users,
    text: "Tus clientes no necesitan registrarse para reservar",
    emoji: "👥",
  },
  {
    icon: Link,
    text: "Obtén un link único de agendamiento para compartir fácilmente",
    emoji: "🔗",
  },
  {
    icon: Clock,
    text: "Configura tu disponibilidad por días y horarios",
    emoji: "⏰",
  },
  {
    icon: Monitor,
    text: "Acceso desde cualquier dispositivo",
    emoji: "🖥️",
  },
  {
    icon: Settings,
    text: "Administra tu agenda según tus preferencias",
    emoji: "🗓️",
  },
  {
    icon: RotateCcw,
    text: "Cancelación y reprogramación automática por email",
    emoji: "🔄",
  },
]

export default function PremiumPlanCard() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const router = useRouter();

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-2 border-[#0388bd] shadow-2xl h-fit top-8 relative overflow-hidden">
      {/* Badge de recomendado */}
      <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white text-xs font-bold py-1 px-12 shadow-lg">
        RECOMENDADO
      </div>

      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-[#ac043f] to-[#0388bd] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <span className="text-2xl">💼</span>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
          Plan Premium
        </CardTitle>
        <Badge className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white border-0 mx-auto">
          Ahorra tiempo y vende más
        </Badge>

        {/* Toggle de facturación */}
        <div className="mt-4 inline-flex items-center justify-center bg-gray-100 rounded-full p-1">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              billingCycle === "monthly" ? "bg-white text-[#0388bd] shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Mensual
          </button>
          <button
            onClick={() => setBillingCycle("annual")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              billingCycle === "annual" ? "bg-white text-[#0388bd] shadow-sm" : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Anual
          </button>
        </div>

        {/* Precio */}
        <div className="mt-4">
          {billingCycle === "monthly" ? (
            <div>
              <div className="text-4xl font-bold text-gray-900">
                $10.000
                <span className="text-lg text-gray-500 font-normal">/mes</span>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-sm text-gray-500 line-through">$120.000/año</div>
              <div className="text-4xl font-bold text-gray-900">
                $100.000
                <span className="text-lg text-gray-500 font-normal">/año</span>
              </div>
              <Badge className="bg-green-100 text-green-800 border-green-200 mt-2">
                ¡Ahorrá $20.000! (2 meses gratis)
              </Badge>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {premiumFeatures.map((feature, index) => (
          <FeatureItem
            key={index}
            //icon={feature.icon}
            text={feature.text}
            emoji={feature.emoji}
            highlight={feature.highlight}
          />
        ))}

        <div className="mt-6 space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:opacity-90 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
            onClick={() => router.push("/auth/register?plan-name=premium&billing-cycle=" + billingCycle)}
          >
            Comenzar con Pro
          </Button>

          <p className="text-xs text-center text-gray-500">Sin permanencia • Cancelá cuando quieras</p>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-[#ac043f]/5 to-[#0388bd]/5 rounded-lg border border-[#0388bd]/20">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800 mb-2">💡 Perfecto para profesionales que:</p>
            <p className="text-xs text-gray-600">
              Quieren ahorrar tiempo, cobrar por adelantado y hacer crecer su negocio sin límites.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
