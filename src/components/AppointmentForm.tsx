"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"

export default function Component() {

  const searchParams = useSearchParams()

  if (searchParams === null ) {
     throw new Error();
  }

  const [dateF, setDateF] = useState<Date>()
  const [time, setTime] = useState<string>("")

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    professionalId: "",
    email: "",
    reason: "",
    date: "",
    time: "",
    phone: "",
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

      useEffect(() => {
    setFormData(prev => ({
      ...prev,
      time: time,
    }));
  }, [time]);

  const timeSlots = [
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30", "18:00", "18:30",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      formData.date = dateF ? format(dateF, "yyyy-MM-dd") : "";

      formData.professionalId = searchParams.get("professionalId") || ""

      console.log("Datos del formulario:", formData);

    const response = await fetch('http://localhost:4000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      toast.error("Error al solicitar el turno")
      throw new Error(errorData.message || 'Error en el registro');
    }

    const data = await response.json();
    console.log('Creacion exitosa:', data);
    // Podés redirigir o mostrar un mensaje de éxito
    toast.success("Turno solicitado con éxito", {
    description: "Te enviaremos un email con los detalles.",
    duration: 5000,
})
  } catch (err) {
    console.error('Error:', err);
  }
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
            {/* Calendario y hora */}
      <div className="flex flex-col gap-4">
        <div>
          <Label className="mb-2 block">Seleccione una fecha</Label>
          <Calendar
            mode="single"
            selected={dateF}
            onSelect={setDateF}
            disabled={(date) => date < new Date()}
            locale={es}
            initialFocus
          />
          {dateF && <p className="mt-2 text-sm text-gray-600">Fecha seleccionada: {format(dateF, "PPP", { locale: es })}</p>}
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
      <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input 
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Ingrese su nombre" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apellido">Apellido</Label>
                <Input 
                id="apellido"
                name="lastName"
                type="text"
                placeholder="Ingrese su apellido" 
                value={formData.lastName}
                onChange={handleInputChange} 
                required 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="celular">Celular</Label>
              <Input 
                id="celular"
                name="phone"
                type="tel"
                placeholder="Ingrese su número de celular"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                name="email"
                type="email"
                placeholder="Ingrese su email"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivo">Motivo de consulta</Label>
              <Input
                id="motivo"
                name="reason"
                type="text"
                placeholder="Ingrese el motivo de consulta"
                required
                value={formData.reason}
                onChange={handleInputChange}
                className="placeholder:text-blue-600 placeholder:font-semibold border-2 border-black-400 focus:border-blue-600"
              />
            </div>

            
            
            
            <Button type="submit" className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white">
              Solicitar Turno
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}