"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import { freeBenefits } from "@/types/subscriptions"

interface FreePlanSubscriptionProps {
  usedAppointments: number
  totalAppointments: number
  onUpgrade: () => void
}

export default function FreePlanSubscription({
  usedAppointments,
  totalAppointments,
  onUpgrade,
}: FreePlanSubscriptionProps) {
  const percentage = (usedAppointments / totalAppointments) * 100
  const isNearLimit = percentage >= 80


  return (
    <div className="space-y-6">
      {/* Plan actual */}
      <Card className="border-2 border-gray-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl flex items-center gap-2">
                Plan Gratuito
                <Badge variant="outline" className="bg-[#0388bd] text-white">
                  Actual
                </Badge>
              </CardTitle>
              <CardDescription>Ideal para comenzar</CardDescription>
            </div>
            <div className="text-4xl">🆓</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Uso de turnos */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Turnos utilizados este mes</span>
              <span className={cn("text-lg font-bold", isNearLimit ? "text-orange-600" : "text-gray-900")}>
                {usedAppointments} de {totalAppointments}
              </span>
            </div>
            <Progress value={percentage} className={cn(
                "h-3 transition-all duration-500",
                isNearLimit
                  ? "bg-gradient-to-r from-orange-500 to-red-500"
                  : "bg-gradient-to-r from-[#ac043f] to-[#0388bd]",
              )} />
            {isNearLimit && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <span className="text-orange-800 text-sm">⚠️ Estás cerca del límite mensual</span>
              </div>
            )}
            <p className="text-xs text-gray-500">Se reinicia el 1 de cada mes</p>
          </div>

          {/* Beneficios incluidos */}
          <div className="pt-4 border-t">
            <h4 className="font-semibold text-gray-900 mb-3">✨ Incluye:</h4>
            <div className="space-y-2">
              {freeBenefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={onUpgrade}
            className="w-full bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white font-semibold py-6 shadow-lg hover:shadow-xl transition-all duration-200"
            size="lg"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Actualizar a Premium
          </Button>
        </CardContent>
      </Card>

      {/* Card de comparación */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
        <CardContent className="p-6">
          <div className="text-center space-y-3">
            <div className="text-4xl mb-2">💎</div>
            <h3 className="text-xl font-bold text-[#0388bd]">¿Necesitás más?</h3>
            <p className="text-gray-600">
              Con Premium obtenés turnos ilimitados, cobros anticipados, sincronización con Google Calendar y mucho más.
            </p>
            <Button
              onClick={onUpgrade}
              variant="outline"
              className="border-[#0388bd] text-[#0388bd] hover:bg-[#0388bd] hover:text-white bg-transparent"
            >
              Ver beneficios de Premium
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
