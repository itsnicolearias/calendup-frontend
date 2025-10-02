"use client"

import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"

interface UpgradeButtonProps {
  //onClick?: () => void
  isCollapsed?: boolean
}

export default function UpgradeButton({ isCollapsed = false }: UpgradeButtonProps) {
  return (
    <Button
      //onClick={onClick}
      disabled={true}
      className={cn(
        "w-full bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f]",
        "text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200",
        "group relative overflow-hidden",
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      <Sparkles className="w-4 h-4 mr-2" />
      {!isCollapsed && "Mejorar Suscripción"}
    </Button>
  )
}
