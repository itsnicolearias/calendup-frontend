"use client"

import UpgradeModal from "@/components/dashboard/sidebar/UpgradeModal"
import FreePlanSubscription from "@/components/settings/subscriptions/FreeSubscriptions"
import PremiumPlanSubscription from "@/components/settings/subscriptions/PremiumSubscriptions"
import { useUser } from "@/contexts/UserContext"
import { getAppointments } from "@/services/appointments"
import { Appointment } from "@/types/appointments"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function SubscriptionPage() {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)
  const [usedAppThisMonth, setUsedAppThisMonth] = useState<number>(0)

  const { user } = useUser()
  
  const totalAppointments = user?.Subscription.plan.features.maxAppointmentsPerMonth || 50;
  const planType = user?.Subscription?.type;
  const hasFreePlan = user?.Subscription.planId === process.env.NEXT_PUBLIC_FREE_PLAN_ID;
  const startDate = user?.Subscription.startDate
  const renewalDate = user?.Subscription.endDate

  const handleUpgrade = () => {
    setShowUpgradeModal(true)
  }

  const handleManageSubscription = () => {
    // Aquí iría la redirección a MercadoPago o un modal de gestión
    window.open("https://www.mercadopago.com.ar/subscriptions", "_blank")
  }

   // cargar turnos
    useEffect(() => {
      const getAppointmentsRows = async (): Promise<Appointment[] | undefined> => {
        try {
          const token = localStorage.getItem('token');
      
          const appData = await getAppointments(token)
  
          if (appData){
            setUsedAppThisMonth(appData.createdThisMonth)
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
          return undefined
        }
      }
  
      getAppointmentsRows()
    }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Mi suscripción</h1>
        <p className="text-gray-600 mt-1">Gestioná tu plan actual y accedé a los beneficios de CalendUp Premium</p>
      </div>

      {/* Contenido según el plan */}
      {hasFreePlan  ? (
        <FreePlanSubscription
          usedAppointments={usedAppThisMonth}
          totalAppointments={totalAppointments}
          onUpgrade={handleUpgrade}
        />
      ) : (
        <PremiumPlanSubscription
          planType={planType!}
          startDate={startDate!}
          endDate={renewalDate!}
          onManageSubscription={handleManageSubscription}
        />
      )}

      {/* Modal de upgrade */}
      <UpgradeModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />
    </div>
  )
}
