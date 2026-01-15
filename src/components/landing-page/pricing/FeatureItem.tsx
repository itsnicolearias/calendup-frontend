"use client"

import { CheckCircle, X } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface FeatureItemProps {
  icon?: LucideIcon
  text: string
  emoji?: string
  included?: boolean
  highlight?: boolean
}

export function FeatureItem({
  icon: IconComponent,
  text,
  emoji,
  included = true,
  highlight = false,
}: FeatureItemProps) {
  return (
    <div
      className={`flex items-start space-x-3 p-3 rounded-lg transition-colors duration-200 ${
        highlight ? "bg-gradient-to-r from-[#ac043f]/10 to-[#0388bd]/10" : "hover:bg-gray-50"
      }`}
    >
      {IconComponent && (
        <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-[#ac043f]/10 to-[#0388bd]/10 rounded-full flex items-center justify-center">
          <IconComponent className="w-4 h-4 text-[#0388bd]" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm leading-relaxed ${included ? "text-gray-700" : "text-gray-400"}`}>
          {emoji && <span className="mr-2">{emoji}</span>}
          {text}
        </p>
      </div>
      {included ? (
        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
      ) : (
        <X className="w-4 h-4 text-gray-300 flex-shrink-0 mt-0.5" />
      )}
    </div>
  )
}
