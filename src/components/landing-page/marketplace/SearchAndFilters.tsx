import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Clock, Grid, List, MapPin, Search } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { Button } from '../ui/button'
import { categories } from '@/lib/mock-data'
import { Badge } from '../ui/badge'

interface SearchAndFiltersProps {
    searchTerm: string
    setSearchTerm: (term: string) => void
    selectedCategory: string
    setSelectedCategory: (category: string) => void
    selectedLocation: string
    setSelectedLocation: (location: string) => void
    viewMode: "grid" | "list"
    setViewMode: (mode: "grid" | "list") => void
    categories: typeof categories
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
    categories
}: SearchAndFiltersProps) {
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
                        <SelectValue placeholder="Ubicación" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las ubicaciones</SelectItem>
                      <SelectItem value="Palermo">Palermo</SelectItem>
                      <SelectItem value="Recoleta">Recoleta</SelectItem>
                      <SelectItem value="Villa Crespo">Villa Crespo</SelectItem>
                      <SelectItem value="Microcentro">Microcentro</SelectItem>
                      <SelectItem value="Belgrano">Belgrano</SelectItem>
                      <SelectItem value="San Telmo">San Telmo</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value="disponibilidad" onValueChange={() => {}}>
                    <SelectTrigger className="h-12">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 mr-2 text-gray-400" />
                        <SelectValue placeholder="Disponibilidad" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cualquier">Cualquier momento</SelectItem>
                      <SelectItem value="hoy">Disponible hoy</SelectItem>
                      <SelectItem value="semana">Esta semana</SelectItem>
                      <SelectItem value="mes">Este mes</SelectItem>
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
                  {categories.map((category) => (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category.id)}
                      className={`flex items-center space-x-2 ${
                        selectedCategory === category.id
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                          : "border-gray-300 hover:border-blue-500"
                      }`}
                    >
                      <category.icon className="w-4 h-4" />
                      <span>{category.name}</span>
                      <Badge
                        className={`ml-1 ${
                          selectedCategory === category.id ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {category.count}
                      </Badge>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
  )
}


export default SearchAndFilters
