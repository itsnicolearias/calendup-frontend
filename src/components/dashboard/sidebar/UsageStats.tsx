"use client"

import { cn } from "@/lib/utils"

import { Progress } from "@/components/ui/progress"
import { Card } from "@/components/ui/card"
import { CalendarDays } from "lucide-react"
import { PlanAttributes } from "@/types/subscriptions"

interface UsageStatsProps {
  used: number
  plan: PlanAttributes
}

export default function UsageStats({ used, plan }: UsageStatsProps) {
  const total = plan.features?.maxAppointmentsPerMonth || 50;
  const percentage = (used / total) * 100
  const isNearLimit = percentage >= 80

  const freePlanId = process.env.NEXT_PUBLIC_FREE_PLAN_ID;  

  return (
    <Card className="border-0 bg-gradient-to-br from-gray-50 to-gray-100 shadow-sm">
      <div className="p-4 space-y-3 bg-white/90 backdrop-blur-sm border-2 border-[#0388bd] rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 ">
            <div className="w-8 h-8 bg-gradient-to-r from-[#ac043f]/10 to-[#0388bd]/10 rounded-lg flex items-center justify-center">
              <CalendarDays className="w-4 h-4 text-[#0388bd]" />
            </div>
            <span className="text-sm font-medium text-gray-700">{plan.name}</span>
          </div>
        </div>
      
      {plan && plan.planId === freePlanId && (
        <>
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-gray-600">Turnos utilizados</span>
              <span className={cn("text-sm font-bold", isNearLimit ? "text-orange-600" : "text-gray-900")}>
                {used} / {total}
              </span>
            </div>
            <Progress
              value={percentage}
              className={cn(
                "h-2 transition-all duration-500",
                isNearLimit
                  ? "bg-gradient-to-r from-orange-500 to-red-500"
                  : "bg-gradient-to-r from-[#ac043f] to-[#0388bd]",
              )}
            />
          </div>

          {isNearLimit && (
            <div className="p-2 bg-orange-50 border border-orange-200 rounded-lg">
              <p className="text-xs text-orange-800">⚠️ Estás cerca del límite de tu plan</p>
            </div>
          )}

          <div className="text-xs text-gray-500 text-center pt-1">Se reinicia el 1 de cada mes</div>
        </>
      )}
        
      </div>
    </Card>
  )
}
