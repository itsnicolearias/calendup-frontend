"use client"

import type React from "react"
import { CalendarIcon, ChevronDown, Home, LogOut, Menu, Palette, Search, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { Input } from "./ui/input"
import { useState } from "react"
import { useUser } from "@/contexts/UserContext"
import { useRouter } from "next/navigation"

export default function Component() {

      const router = useRouter();

      const VIEWS = { TURNS: "turnos", AGENDA: "agenda" } as const;
      const [currentView, setCurrentView] = useState<typeof VIEWS[keyof typeof VIEWS]>(VIEWS.TURNS);

      const [searchTerm, setSearchTerm] = useState("")
      const { user } = useUser()

      const avatarUrl = user?.profile?.profilePicture 
    || `https://ui-avatars.com/api/?name=${encodeURIComponent(`${user?.profile?.name || ""} ${user?.profile?.lastName || ""}`)}&background=197387&color=fff`;

    const name = `${user?.profile?.name} ${user?.profile?.lastName}` || "Usuario"

    return (
        <div>
            {/* Top Navigation */}
        <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
                {/* Left side - Logo and Navigation */}
                <div className="flex items-center space-x-8">
                <div className="flex items-center">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <Home className="w-5 h-5 text-white" />
                    </div>
                    <span className="ml-2 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    CalendUp
                    </span>
                </div>
                <Button variant="ghost" className="text-gray-700 hover:text-blue-600" onClick={() => router.push("/dashboard")}>
                    <Home className="w-4 h-4 mr-2" />
                    Inicio
                </Button>
                </div>

                {/* Center - Search */}
                <div className="flex-1 max-w-md mx-8">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                    type="text"
                    placeholder="Buscar turnos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-50 border-gray-200 focus:bg-white focus:border-blue-500"
                    />
                </div>
                </div>

                {/* Right side - Menu and Profile */}
                <div className="flex items-center space-x-4">
                {/* View Selector Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                        <Menu className="w-4 h-4" />
                        <span>{currentView === "turnos" ? "Mis Turnos" : "Agenda"}</span>
                        <ChevronDown className="w-4 h-4" />
                    </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => setCurrentView("turnos")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Mis Turnos
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setCurrentView("agenda")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        Agenda
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Profile Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                        <Avatar className="h-10 w-10">
                        <AvatarImage src={avatarUrl} alt="Perfil" />
                        <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                            U
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
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span >Configuración</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Palette className="mr-2 h-4 w-4" />
                        <span>Tema</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Cerrar sesión</span>
                    </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                </div>
            </div>
            </div>
        </nav>
        </div>
    )
}