"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"
import MobileUsageCompact from "./UsageCompact"
import { PlanAttributes } from "@/types/subscriptions"
import UpgradeModal from "../sidebar/UpgradeModal"

interface MobileBottomBarProps {
  currentPlan: PlanAttributes;
  usedAppointments?: number
  totalAppointments?: number
}

export default function MobileBottomBar({
  currentPlan,
  usedAppointments,
  totalAppointments = 50,
}: MobileBottomBarProps) {
  const [showUpgradeModal, setShowUpgradeModal] = useState(false)

  const planName = currentPlan.name

  const isFree = currentPlan?.planId === process.env.NEXT_PUBLIC_FREE_PLAN_ID

  return (
    <>
      {/* Barra inferior fija - Solo visible en móvil */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          {/* Sección izquierda - Plan actual */}
          <div className="flex flex-col items-start min-w-0">
            <span className="text-xs text-gray-500 mb-0.5">Plan actual</span>
            <Badge
              variant={isFree ? "secondary" : "default"}
              className={cn(
                "text-xs font-semibold",
                !isFree && "bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f]",
              )}
            >
              {planName}
            </Badge>
          </div>

          {/* Sección central - Uso del plan (solo para plan gratuito) */}
          {isFree && <MobileUsageCompact used={usedAppointments} total={totalAppointments} />}

          {/* Sección derecha - Botón de upgrade (solo para plan gratuito) */}
          {isFree && (
            <Button
              size="sm"
              onClick={() => setShowUpgradeModal(true)}
              className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white font-semibold shadow-md group relative overflow-hidden flex-shrink-0"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <Sparkles className="w-4 h-4 mr-1" />
              <span className="hidden xs:inline">Mejorar</span>
            </Button>
          )}

          {/* Si es premium, mostrar mensaje de agradecimiento compacto */}
          {!isFree && (
            <div className="flex items-center gap-2 flex-1 justify-end">
              <span className="text-xs text-gray-600">✨ Gracias por ser Premium</span>
            </div>
          )}
        </div>
      </div>

      {/* Espaciador para evitar que el contenido quede detrás de la barra */}
      <div className="lg:hidden h-16" />

      {/* Modal de upgrade */}
      <UpgradeModal open={showUpgradeModal} onOpenChange={setShowUpgradeModal} />
    </>
  )
}
