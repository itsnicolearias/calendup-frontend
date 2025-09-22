"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import {
  Search,

} from "lucide-react"
import ProfessionalCard from "./ProfessionalCard"
import ProfessionalModal from "./ProfessionalModal"
import BookingModal from "./BookingModal"
import ResultsHeader from "./ResultsHeader"
import SearchAndFilters from "./SearchAndFilters"
import { UserWithProfile } from "@/types/settings"
import { getUsers } from "@/services/users"
import { categoryMap, getCategories, UserWithProfileWithAvailability } from "@/types/landing-page"
import { State } from "country-state-city"
import { AvailabilityTag, obtainAvailabilityTags } from "@/utils/availabilityButton"

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedCity, setSelectedCity] = useState("")
  const [selectedAvailability, setSelectedAvailability] = useState<AvailabilityTag[0]>("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedProfessional, setSelectedProfessional] = useState<UserWithProfileWithAvailability | null>()
  const [bookingProfessional, setBookingProfessional] = useState<UserWithProfileWithAvailability | null>(null)
  const [professionals, setProfessionals] = useState<UserWithProfileWithAvailability[] | undefined>([])

  // cargar profesionales
    useEffect(() => {
      const getProfessionals = async () => {
        try {
          const appData = await getUsers()

           const enriched: UserWithProfileWithAvailability[] = await Promise.all(
            (appData?.rows ?? []).map(async (p: UserWithProfile) => {
              const tag = await obtainAvailabilityTags(p.userId)
              return { ...p, availabilityTag: tag }
            })
          )
          setProfessionals(enriched)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          return undefined
        }
      }
  
      getProfessionals()
    }, [])


    const filteredProfessionals = professionals?.filter((professional) => {
      const jobTitle = professional.profile?.jobTitle ?? ""
      const name = professional.profile?.name ?? ""
      const province = State.getStateByCodeAndCountry(professional.profile?.province ?? "", "AR") 

      const matchesSearch =
        name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        jobTitle.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "todos" ||
        categoryMap[selectedCategory]?.includes(jobTitle)

      const matchesState =
        selectedLocation === "" ||
        selectedLocation === "todas" ||
        province?.name.toLowerCase().includes(selectedLocation.toLowerCase())

      const matchesCity =
        selectedCity === "" ||
        selectedCity === "todas" ||
        professional.profile?.city?.toLowerCase().includes(selectedCity.toLowerCase())

      const matchesAvailability =
        selectedAvailability === "" ||
        selectedAvailability === AvailabilityTag.EVERY_MOMENT ||
        professional.availabilityTag === selectedAvailability


      return matchesSearch && matchesCategory && matchesState && matchesCity && matchesAvailability
    })



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-blue-100 text-[#0388bd] border-blue-200 text-lg px-4 py-2 mb-4">
            🔍 Encuentra tu profesional ideal
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Buscar{" "}
            <span className="bg-gradient-to-r from-[#ac043f] to-[#0388bd] bg-clip-text text-transparent">
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
          categories={getCategories(professionals || [])}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedAvailability={selectedAvailability}
          setSelectedAvailability={setSelectedAvailability}
        />

        {/* Results */}
        <ResultsHeader count={Number(filteredProfessionals?.length)} />

        {/* Professional Cards */}
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredProfessionals?.map((professional) => (
            <ProfessionalCard 
            key={professional.userId} 
            professional={professional} 
            isListView={viewMode === "list"}
            onViewProfile={setSelectedProfessional}
            onBook={(p: UserWithProfile) => {
                setBookingProfessional(p)
              }} 
            />
          ))}
        </div>

        {filteredProfessionals?.length === 0 && (
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
      />
    </div>
  )
}
