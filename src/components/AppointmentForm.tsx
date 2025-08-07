"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"
import { useSearchParams } from "next/navigation"
import { toast } from "sonner"
import { createAppointment } from "@/services/appointments"
import AvailableCalendar from "./AvailableCalendar"

export default function Component() {

  const searchParams = useSearchParams()
  if (searchParams === null ) {
     throw new Error();
  }
  const professionalId = searchParams.get("professionalId") || ""

  const [dateF, setDateF] = useState<Date>()
  const [time, setTime] = useState<string>("")
    
const handleSelect = (date: string, hour: string) => {
    setDateF(new Date(date))
    setTime(hour)
    
    setFormData((prev) => ({
    ...prev,
    date: date,
    time: hour,
  }));
  };
  
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    professionalId: professionalId,
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


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {

      formData.date = dateF ? format(dateF, "yyyy-MM-dd") : "";

      await createAppointment(formData);
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
      
      <AvailableCalendar onSelect={handleSelect} professionalId={formData.professionalId}/>


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