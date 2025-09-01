"use client"

import type React from "react"

import { useState } from "react"

import { Badge } from "@/components/ui/badge"
import {
  Search,

} from "lucide-react"
import ProfessionalCard from "./ProfessionalCard"
import ProfessionalModal from "./ProfessionalModal"
import BookingModal from "./BookingModal"
import { professionals, categories, timeSlots } from "@/lib/mock-data" 
import ResultsHeader from "./ResultsHeader"
import SearchAndFilters from "./SearchAndFilters"




export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProfessional, setSelectedProfessional] = useState<typeof professionals[number] | null>()

  const [bookingProfessional, setBookingProfessional] = useState<typeof professionals[number] | null>(null)



  const filteredProfessionals = professionals.filter((professional) => {
    const matchesSearch =
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "todos" || professional.category === selectedCategory
    const matchesLocation =
      selectedLocation === "" || selectedLocation === "todas" || professional.location.includes(selectedLocation)

    return matchesSearch && matchesCategory && matchesLocation
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-blue-800 border-blue-200 text-lg px-4 py-2 mb-4">
            🔍 Encuentra tu profesional ideal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Buscar{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profesionales
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra y reserva turnos con los mejores profesionales de tu zona de manera rápida y sencilla.
          </p>
        </div>

        {/* Search and Filters */}
         <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          viewMode={viewMode}
          setViewMode={setViewMode}
          categories={categories}
        />

        {/* Results */}
        <ResultsHeader count={filteredProfessionals.length} />

        {/* Professional Cards */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredProfessionals.map((professional) => (
            <ProfessionalCard 
            key={professional.id} 
            professional={professional} 
            isListView={viewMode === "list"}
            onViewProfile={setSelectedProfessional}
            onBook={(p: typeof professionals[number]) => {
                setBookingProfessional(p)
              }} 
            />
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron profesionales</h3>
            <p className="text-gray-600">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </div>

      {/* Professional Detail Modal */}
      <ProfessionalModal 
          professional={selectedProfessional}
          open={!!selectedProfessional}
          onOpenChange={(open) => !open && setSelectedProfessional(null)}
      />

      {/* Booking Modal */}
      <BookingModal 
          open={!!bookingProfessional}
          onOpenChange={(open) => !open && setBookingProfessional(null)}
          professional={bookingProfessional}
          timeSlots={timeSlots}
      />
    </div>
  )
}
