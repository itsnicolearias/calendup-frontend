"use client"

import type React from "react"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
  icon: React.ReactNode
  showBackButton?: boolean
  onBack?: () => void
}

export default function AuthLayout({
  children,
  title,
  subtitle,
  icon,
  showBackButton = false,
  onBack,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {showBackButton && (
          <div className="mb-6">
            <Button variant="ghost" onClick={onBack} className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver
            </Button>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-r from-[#ac043f] to-[#0388bd] rounded-full flex items-center justify-center mx-auto mb-4">
                {icon}
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent mb-2">
                {title}
              </h1>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
