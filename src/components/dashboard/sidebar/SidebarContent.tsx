import React from 'react'
import SidebarMenuItem from './MenuItem'
import { Separator } from '@radix-ui/react-separator'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import UsageStats from './UsageStats'
import UpgradeButton from '@/components/shared/UpgradeButton'
import { Button } from '@/components/ui/button'

import type { LucideIcon } from "lucide-react"

function SidebarContent({ handleMenuClick, menuItems, currentView, usedAppointments = 0, totalAppointments = 50, isCollapsed, setIsCollapsed }: {
  handleMenuClick: (id: "turnos" | "agenda") => void
  menuItems: { id: "turnos" | "agenda"; icon: LucideIcon; label: string }[]
  currentView: "turnos" | "agenda"
  usedAppointments: number
  totalAppointments: number
  onUpgrade?: () => void
  isCollapsed?: boolean
  setIsCollapsed: (collapsed: boolean) => void
}) {
  return (
    <div>
      <div className="flex flex-col h-full">

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.id}
            icon={item.icon}
            label={isCollapsed ? "" : item.label}
            isActive={currentView === item.id}
            onClick={() => handleMenuClick(item.id)}
          />
        ))}
      </nav>

      <Separator className="my-4" />

      {/* Usage Stats */}
      {!isCollapsed && (
        <div className="px-4 pb-4">
          <UsageStats used={usedAppointments} total={totalAppointments} />
        </div>
      )}

      {/* Upgrade Button */}
      <div className="p-4">
        <UpgradeButton isCollapsed={isCollapsed} />
      </div>

      {/* Collapse Toggle - Desktop Only */}
      <div className="hidden lg:block p-4 border-t border-gray-200">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full justify-center hover:bg-gray-100"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Contraer
            </>
          )}
        </Button>
      </div>
    </div>
    </div>
  )
}

export default SidebarContent