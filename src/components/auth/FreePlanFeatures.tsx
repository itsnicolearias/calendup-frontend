"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, Users, Link, Clock, Monitor, Settings, RotateCcw, Bell, CheckCircle } from "lucide-react"

const features = [
  {
    icon: CreditCard,
    text: "No necesitas tarjeta de crédito",
    emoji: "🚫",
  },
  {
    icon: Calendar,
    text: "Agenda hasta 50 turnos por mes",
    emoji: "📅",
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

export default function FreePlanFeatures() {
  return (
    <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl h-fit sticky top-8">
      <CardHeader className="text-center pb-4">
        <div className="w-16 h-16 bg-gradient-to-r from-[#ac043f] to-[#0388bd] rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🆓</span>
        </div>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
          Plan Gratuito
        </CardTitle>
        <Badge className="bg-green-100 text-green-800 border-green-200 mx-auto">¡Siempre gratis!</Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        {features.map((feature, index) => {
          const IconComponent = feature.icon
          return (
            <div
              key={index}
              className="flex items-start space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#ac043f]/10 to-[#0388bd]/10 rounded-full flex items-center justify-center">
                <IconComponent className="w-4 h-4 text-[#0388bd]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {feature.text}
                </p>
              </div>
              <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            </div>
          )
        })}


      </CardContent>
    </Card>
  )
}
