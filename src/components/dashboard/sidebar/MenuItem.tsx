"use client"

import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarMenuItemProps {
  icon: LucideIcon
  label: string
  isActive?: boolean
  onClick?: () => void
  badge?: string | number
}

export default function SidebarMenuItem({ icon: Icon, label, isActive = false, onClick, badge }: SidebarMenuItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
        "hover:bg-gradient-to-r hover:from-[#ac043f]/10 hover:to-[#0388bd]/10",
        isActive && "bg-gradient-to-r from-[#ac043f]/10 to-[#0388bd]/10 border-l-4 border-[#0388bd]",
      )}
    >
      <Icon className={cn("w-5 h-5", isActive ? "text-[#0388bd]" : "text-gray-600")} />
      <span className={cn("flex-1 text-left font-medium", isActive ? "text-[#0388bd]" : "text-gray-700")}>{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-xs font-semibold bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white rounded-full">
          {badge}
        </span>
      )}
    </button>
  )
}
