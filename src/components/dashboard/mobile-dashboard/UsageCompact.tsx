"use client"

import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

interface MobileUsageCompactProps {
  used?: number
  total: number
}

export default function MobileUsageCompact({ used, total }: MobileUsageCompactProps) {
  const percentage = (used ?? 0 / total) * 100
  const isNearLimit = percentage >= 80

  return (
    <div className="flex-1 px-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs font-medium text-gray-700">Turnos</span>
        <span className={cn("text-xs font-bold", isNearLimit ? "text-orange-600" : "text-gray-900")}>
          {used}/{total}
        </span>
      </div>
      <Progress
        value={percentage}
        className={cn(
          "h-1.5 transition-all duration-500",
          isNearLimit ? "bg-gradient-to-r from-orange-500 to-red-500" : "bg-gradient-to-r from-[#ac043f] to-[#0388bd]",
        )}
      />
    </div>
  )
}
