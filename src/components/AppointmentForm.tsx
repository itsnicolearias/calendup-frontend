"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function Component() {
  const [date, setDate] = useState<Date>()
  const [time, setTime] = useState<string>("")

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Formulario enviado")
  }

  return (
    <div className="flex items-start justify-center min-h-screen bg-gray-50 p-4">
      {/* Formulario */}
      <Card className="w-full max-w-md mr-6">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Solicitar Turno</CardTitle>
          <CardDescription className="text-center">Complete el formulario para reservar su cita</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre</Label>
                <Input id="nombre" placeholder="Ingrese su nombre" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input id="apellido" placeholder="Ingrese su apellido" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <Input id="celular" type="tel" placeholder="Ingrese su número de celular" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Ingrese su email" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivo">Motivo de consulta</Label>
              <Input
                id="motivo"
                type="text"
                placeholder="Ingrese el motivo de consulta"
                required
                className="placeholder:text-blue-600 placeholder:font-semibold border-2 border-black-400 focus:border-blue-600"
              />
            </div>

            <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
              Solicitar Turno
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Calendario y hora */}
      <div className="flex flex-col gap-4">
        <div>
          <Label className="mb-2 block">Seleccione una fecha</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={(date) => date < new Date()}
            locale={es}
            initialFocus
          />
          {date && <p className="mt-2 text-sm text-gray-600">Fecha seleccionada: {format(date, "PPP", { locale: es })}</p>}
        </div>

        <div>
          <Label className="mb-2 block">Seleccione una hora</Label>
          <Select value={time} onValueChange={setTime} required>
            <SelectTrigger className="w-[220px]">
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Seleccione una hora" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {timeSlots.map((slot) => (
                <SelectItem key={slot} value={slot}>
                  {slot}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}