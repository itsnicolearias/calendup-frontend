import React from 'react'
import { Card, CardContent } from '../../ui/card'
import { Clock, Grid, List, MapPin, Search } from 'lucide-react'
import { Input } from '../../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'
import { Button } from '../../ui/button'
import { CategoryType } from '@/types/landing-page'
import { City, State } from 'country-state-city'
import { AvailabilityTag } from '@/utils/availabilityButton'

interface SearchAndFiltersProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    selectedLocation: string
    setSelectedLocation: (location: string) => void
    selectedCity: string
    setSelectedCity: (location: string) => void
    viewMode: "grid" | "list"
    setViewMode: (mode: "grid" | "list") => void
    categories: CategoryType[]
    selectedAvailability: string
    setSelectedAvailability: (availabilityTag: string) => void
}


function SearchAndFilters({
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    selectedLocation,
    setSelectedLocation,
    viewMode,
    setViewMode,
    categories,
    selectedCity,
    setSelectedCity,
    selectedAvailability,
    setSelectedAvailability
}: SearchAndFiltersProps) {
  const states = State.getStatesOfCountry("AR");

  const cities = selectedLocation ? City.getCitiesOfState("AR", selectedLocation) : [];

  const tags = Object.values(AvailabilityTag)

  return (
    <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Buscar por nombre o especialidad..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500"
                    />
                  </div>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger className="h-12">
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                        <SelectValue placeholder="Provincia" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las ubicaciones</SelectItem>
                      {states.map((prov) => (
                        <SelectItem key={prov.isoCode} value={prov.isoCode}>{prov.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  
                  { selectedLocation && (
                      <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="h-12">
                        <div className="flex items-center">
                          <MapPin className="w-5 h-5 mr-2 text-gray-400" />
                          <SelectValue placeholder="Ciudad" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="todas">Todas las ubicaciones</SelectItem>
                        {cities.map((city) => (
                          <SelectItem key={city.name} value={city.name}>{city.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                   


                  <Select value={selectedAvailability} onValueChange={setSelectedAvailability}>
                    <SelectTrigger className="h-12">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-400" />
                        <SelectValue placeholder="Disponibilidad" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      { tags.map((tag) => (
                         <SelectItem key={tag} value={tag}>{tag}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex space-x-2">
                    <Button
                      variant={viewMode === "grid" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="flex-1"
                    >
                      <Grid className="w-4 h-4 mr-2" />
                      Grilla
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="flex-1"
                    >
                      <List className="w-4 h-4 mr-2" />
                      Lista
                    </Button>
                  </div>
                </div>
    
                {/* Categories */}
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => {
                    const Icon = cat.icon
                    return (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                        selectedCategory === cat.id ? "bg-blue-500 text-white" : "bg-white text-gray-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.name}</span>
                      <span className="ml-1 text-sm text-gray-500">({cat.count})</span>
                    </button>
                    )
                    })}

                </div>
              </CardContent>
            </Card>
  )
}


export default SearchAndFilters
