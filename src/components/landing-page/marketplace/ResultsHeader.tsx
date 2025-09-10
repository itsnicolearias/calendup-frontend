import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select'

interface ResultsHeaderProps {
  count: number;
}

function ResultsHeader({ count }: ResultsHeaderProps) {
  return (
    <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{count} profesionales encontrados</h2>
          <Select defaultValue="relevancia">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevancia">Relevancia</SelectItem>
              <SelectItem value="rating">Mejor valorados</SelectItem>
              <SelectItem value="precio-asc">Precio: menor a mayor</SelectItem>
              <SelectItem value="precio-desc">Precio: mayor a menor</SelectItem>
              <SelectItem value="disponibilidad">Disponibilidad</SelectItem>
            </SelectContent>
          </Select>
        </div>
  )
}

export default ResultsHeader