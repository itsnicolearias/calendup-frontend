import React from 'react'
import SidebarMenuItem from './MenuItem'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import UsageStats from './UsageStats'
import UpgradeButton from '@/components/shared/UpgradeButton'
import { Button } from '@/components/ui/button'

import type { LucideIcon } from "lucide-react"
import { SubscriptionAttributes } from '@/types/subscriptions'

function SidebarContent({ handleMenuClick, menuItems, currentView, usedAppointments = 0, subscriptionData, isCollapsed, setIsCollapsed, onUpgrade }: {
  handleMenuClick: (id: string) => void
  menuItems: { id: string; icon: LucideIcon; label: string }[]
  currentView: string
  usedAppointments: number
  subscriptionData: SubscriptionAttributes
  onUpgrade?: () => void
  isCollapsed?: boolean
  setIsCollapsed: (collapsed: boolean) => void
}) {
  return (
  <div className="flex flex-col h-screen">
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

    {/* Bloque inferior: Usage + Upgrade */}
    <div className="px-4 pb-4 space-y-4">
      {!isCollapsed && (
        <UsageStats 
          used={usedAppointments} 
          plan={subscriptionData.plan} 
        />
      )}
      <UpgradeButton onClick={onUpgrade} isCollapsed={isCollapsed} />
    </div>

    {/* Collapse Toggle - Desktop Only */}
    <div className="hidden lg:block p-4 border-t border-gray-200 mt-auto">
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
)

}

export default SidebarContent