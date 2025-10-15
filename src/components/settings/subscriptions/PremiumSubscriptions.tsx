"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Crown, Zap } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { premiumBenefits } from "@/types/subscriptions"
import { CancelSubscriptionModal } from "./ConfirmCancellationModal"
import { SubscriptionCancelledModal } from "./CancelledModal"
import { useState } from "react"
import { UserWithProfile } from "@/types/settings"

interface PremiumPlanSubscriptionProps {
  user: UserWithProfile;
  token: string;
  refreshUser: () => Promise<void>;
}

export default function PremiumPlanSubscription({ user, token, refreshUser }: PremiumPlanSubscriptionProps) {
   const [showCancelModal, setShowCancelModal] = useState(false);
   const [showSuccessModal, setShowSuccessModal] = useState(false);

  const planType = user?.Subscription?.type;
  const startDate = user?.Subscription.startDate
  const endDate = user?.Subscription.endDate

  const planPrice = planType === "monthly" ? "$10.000/mes" : "$100.000/año"
  const planLabel = planType === "monthly" ? "Mensual" : "Anual"

  const closeConfirmationModal = async () => {
    setShowSuccessModal(false)
    await refreshUser()
  }

  return (

    <div className="space-y-6">
      {/* Plan actual con borde gradiente */}
      <div className="relative">
        <div className="p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-xl">
          <Card className="border-0 bg-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Crown className="w-6 h-6 text-yellow-500" />
                    Plan Premium
                    <Badge className="bg-[#0388bd] text-white border-0">{planLabel}</Badge>
                  </CardTitle>
                  <CardDescription>Tu suscripción está activa</CardDescription>
                </div>
                <div className="text-4xl">💎</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Información de la suscripción */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg space-y-1">
                  <p className="text-sm text-gray-600">Tipo de plan</p>
                  <p className="text-lg font-semibold text-gray-900">{planLabel}</p>
                  <p className="text-sm font-medium text-[#0388bd]">{planPrice}</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg space-y-1">
                  <p className="text-sm text-gray-600">Fecha de inicio</p>
                  <p className="text-lg font-semibold text-gray-900">
                     {format(new Date(startDate), "dd 'de' MMMM, yyyy", { locale: es })} 
                  </p>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg space-y-1 md:col-span-2">
                  <p className="text-sm text-gray-600">Próxima renovación</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {format(new Date(endDate!), "dd 'de' MMMM, yyyy", { locale: es })} 
                  </p>
                  <p className="text-xs text-gray-500">Se renovará automáticamente</p>
                </div>
              </div>

              {/* Beneficios */}
              <div className="pt-4 border-t">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-500" />
                  Tus beneficios Premium
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {premiumBenefits.map((benefit, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 text-sm ${
                        benefit.highlight ? "text-gray-900 font-medium" : "text-gray-600"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center ${
                          benefit.highlight ? "bg-[#0388bd]" : "bg-green-100"
                        }`}
                      >
                        <benefit.icon
                          className={`w-3.5 h-3.5 ${benefit.highlight ? "text-white" : "text-green-600"}`}
                        />
                      </div>
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Botón de gestión */}
              <Button
                onClick={() => setShowCancelModal(true)}
                variant="outline"
                className="w-full border-gray-300 hover:bg-gray-50 bg-transparent"
                size="lg"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Cancelar suscripción
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Podrás cambiar o cancelar tu plan en cualquier momento
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Información adicional */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-0">
        <CardContent className="p-6">
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <Crown className="w-5 h-5 text-yellow-500" />
              Gracias por ser Premium
            </h3>
            <p className="text-sm text-gray-600">
              Estás aprovechando al máximo CalendUp. Si tenés alguna consulta o necesitás ayuda, nuestro equipo de
              soporte prioritario está disponible para vos.
            </p>
            <Button
              variant="outline"
              className="border-[#0388bd] text-[#0388bd] hover:bg-[#0388bd] hover:text-white bg-transparent"
            >
              Contactar soporte
            </Button>
          </div>
        </CardContent>
      </Card>

      <CancelSubscriptionModal
        open={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        userId={user.userId}
        token={token}
        onCancelled={() => setShowSuccessModal(true)}
      />

      <SubscriptionCancelledModal
        open={showSuccessModal}
        onClose={() => closeConfirmationModal()}
      />
    </div>
  )
}
