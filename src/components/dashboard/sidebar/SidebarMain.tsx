"use client"

import { useState } from "react"
import { Calendar, CalendarDays, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import SidebarContent from "./SidebarContent"
import { useRouter } from "next/navigation"
import { SubscriptionAttributes } from "@/types/subscriptions"

interface DashboardSidebarMainProps {
  currentView: "turnos" | "agenda"
  onViewChange: (view: string) => void
  usedAppointments?: number
  //onUpgrade?: () => void
  subscriptionData: SubscriptionAttributes
}

export default function DashboardSidebarMain({
  currentView,
  onViewChange,
  usedAppointments = 0,
  //onUpgrade,
  subscriptionData
}: DashboardSidebarMainProps) {
  const router = useRouter()

  const [isCollapsed, setIsCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const menuItems = [
    {
      id: "turnos" as const,
      icon: CalendarDays,
      label: "Mis Turnos",
      path: "/dashboard/appointments"
    },
    {
      id: "agenda" as const,
      icon: Calendar,
      label: "Agenda",
      path: "/dashboard/agenda"
    }
  ]

  const handleMenuClick = (id: string) => {
    onViewChange(id)
    setMobileOpen(false)
    router.push(menuItems.find(item => item.id === id)?.path || "/dashboard/appointments")
  }



  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0 bg-white">
            <SidebarContent
              handleMenuClick={handleMenuClick}
              menuItems={menuItems}
              currentView={currentView}
              usedAppointments={usedAppointments}
              subscriptionData={subscriptionData}
              //onUpgrade={onUpgrade}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col bg-white border-r border-gray-200 transition-all duration-300 h-screen sticky top-0",
          isCollapsed ? "w-20" : "w-80",
        )}
      >
        <SidebarContent
              handleMenuClick={handleMenuClick}
              menuItems={menuItems}
              currentView={currentView}
              usedAppointments={usedAppointments}
              subscriptionData={subscriptionData}
              //onUpgrade={onUpgrade}
              isCollapsed={isCollapsed}
              setIsCollapsed={setIsCollapsed}
            />
      </aside>
    </>
  )
}
