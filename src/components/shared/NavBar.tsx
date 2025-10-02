"use client"

import { Calendar, Home, Info, LogOut, Palette, Search, Settings, Menu, X, CalendarIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Input } from "../ui/input"
import { useState } from "react"
import { useUser } from "@/contexts/UserContext"
import { useRouter } from "next/navigation"
import WelcomeWizard from "../dashboard/WelcomeWizard"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [openWizard, setOpenWizard] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const userContext = useUser()
  const user = userContext?.user

  const handleAgenda = () => {
    router.push("/dashboard/agenda")
    setMobileMenuOpen(false)
  }
  const handleAppointments = () => {
    router.push("/dashboard/appointments")
    setMobileMenuOpen(false)
  }
  const handleLogout = () => {
    userContext?.logout()
    router.push("/auth/login")
  }

  const avatarUrl = user?.profile?.profilePicture || "placeholder.svg"
  const name = `${user?.profile?.name} ${user?.profile?.lastName || ""}` || "Usuario"

  return (
    <div className="relative">
      {/* Top Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-[#ac043f] to-[#0388bd] rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
                CalendUp
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden sm:flex items-center space-x-4">
              <Button variant="ghost" className="text-gray-700 hover:text-[#0388bd]" onClick={handleAppointments}>
                <Home className="w-4 h-4 mr-2" /> Inicio
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar turnos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 w-64"
                />
              </div>
            </div>

            {/* Profile / Mobile Menu Button */}
            <div className="flex items-center space-x-2">
              {/* Mobile menu button */}
              <Button variant="ghost" className="sm:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>

              {/* Profile Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={avatarUrl} alt="Perfil" />
                      <AvatarFallback className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] text-white">
                        {name
                            .split(" ")
                            .filter(n => n.length > 0)
                            .map(n => n[0]
                            .toUpperCase())
                            .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { router.push("/settings/personal"); setMobileMenuOpen(false) }}>
                    <Settings className="mr-2 h-4 w-4" /> Configuración
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Palette className="mr-2 h-4 w-4" /> Tema
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => { setOpenWizard(true); setMobileMenuOpen(false) }}>
                    <Info className="mr-2 h-4 w-4" /> Ayuda
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="sm:hidden bg-white border-t border-gray-200 w-full shadow-md"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex flex-col p-4 space-y-2">
                <Button variant="ghost" className="w-full text-left" onClick={handleAppointments}>
                  <Home className="w-4 h-4 mr-2 inline-block" /> Inicio
                </Button>
                <Button variant="ghost" className="w-full text-left" onClick={handleAgenda}>
                  <CalendarIcon className="w-4 h-4 mr-2 inline-block" /> Agenda
                </Button>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar turnos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500 w-full"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Wizard */}
      <WelcomeWizard 
        open={openWizard} 
        setOpen={setOpenWizard} 
        isNewUser={user?.profile?.isNewUser} 
        handleFinish={() => setOpenWizard(false)} 
        isFromHelp={true} 
      />
    </div>
  )
}
