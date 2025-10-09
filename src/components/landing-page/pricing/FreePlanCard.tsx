"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CreditCard, Calendar, Users, Link, Clock, Monitor, Settings, RotateCcw, Bell } from "lucide-react"
import { FeatureItem } from "./FeatureItem"
import { useRouter } from "next/navigation"

const freeFeatures = [
  {
    icon: Calendar,
    text: "Hasta 50 turnos por mes",
    emoji: "📅",
  },
  {
    icon: CreditCard,
    text: "No necesitas tarjeta de crédito",
    emoji: "🚫",
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
  {
    icon: Bell,
    text: "Recordatorios automáticos por email",
    emoji: "🕒",
  },
]

export default function FreePlanCard() {
    const router = useRouter();
    
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl h-fit sticky top-8">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-[#ac043f]/20 to-[#0388bd]/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🆓</span>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
          Plan Gratuito
        </CardTitle>
        <Badge className="bg-green-100 text-green-800 border-green-200 mx-auto">¡Siempre gratis!</Badge>

        <div className="mt-4">
          <div className="text-4xl font-bold text-gray-900">
            $0
            <span className="text-lg text-gray-500 font-normal">/mes</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Ideal para profesionales que recién comienzan</p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {freeFeatures.map((feature, index) => (
          <FeatureItem 
            key={index} 
            //icon={feature.icon} 
            text={feature.text} 
            emoji={feature.emoji} />
        ))}

        <div className="mt-6 space-y-3">
          <Button
            className="w-full bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:opacity-90 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
            onClick={() => router.push("/auth/register?plan-name=free")}
          >
            Empezar Gratis
          </Button>

          <p className="text-xs text-center text-gray-500">Sin tarjeta de crédito • Sin compromisos</p>
        </div>

        <div className="mt-6 p-4 bg-gradient-to-r from-[#ac043f]/5 to-[#0388bd]/5 rounded-lg border border-[#0388bd]/20">
          <div className="text-center">
            <p className="text-sm font-semibold text-gray-800 mb-2">💡 Perfecto para:</p>
            <p className="text-xs text-gray-600">Probar CalendUp y comenzar a recibir tus primeros clientes online.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
