"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import AvailableCalendar from "../shared/AvailableCalendar"
import { toast } from "sonner"
import { createAppointment } from "@/services/appointments"
import { Appointment } from "@/types/appointments"
import { useUser } from "@/contexts/UserContext"
import AppointmentTypesSelect from "../appointments/AppointmentTypesSelect"

interface Props {
  onCreated?: (appointment: Appointment) => void
  onClose?: () => void
}

export function AppointmentForm({ onCreated, onClose }: Props) {
  const [dateF, setDateF] = useState<string>()
  const [time, setTime] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    professionalId: "",
    email: "",
    reason: "",
    date: "",
    time: "",
    phone: "",
    appointmentTypeId: "",
  })

  const userContext = useUser();
  const user = userContext?.user;


  const handleSelect = (date: string, hour: string) => {
    setDateF(date)
    setTime(hour)
    setFormData((prev) => ({ ...prev, date, time: hour }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      formData.date = dateF || ""
      if (selectedType) formData.appointmentTypeId = selectedType
      if (user?.userId) formData.professionalId = user.userId

      const created = await createAppointment({
        ...formData,
        appointmentTypeId: formData.appointmentTypeId === "" ? null : formData.appointmentTypeId,
      })
      toast.success("Turno solicitado con éxito", {
        description: "Te enviaremos un email con los detalles.",
        duration: 5000,
      })

      if (onCreated) onCreated(created)
      if (onClose) onClose()
    } catch (err) {
      console.error("Error:", err)
      toast.error("Error al crear turno")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Datos del cliente */}
      <Card className="w-full">
        <CardContent className="space-y-4 pt-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido</Label>
              <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Celular</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Motivo</Label>
            <Input id="reason" name="reason" value={formData.reason} onChange={handleInputChange} />
          </div>

          <AppointmentTypesSelect
            types={user?.AppointmentTypes || []}
            selected={selectedType}
            onSelect={(appointmentTypeId) => setSelectedType(appointmentTypeId)}
          />
        </CardContent>
      </Card>

      {/* Calendario abajo */}
      <Card className="w-full">
        <CardContent>
          <AvailableCalendar onSelect={handleSelect} professionalId={user?.userId ?? ""} isModal={true} />
        </CardContent>
      </Card>

      {/* Botón */}
      <div>
        <Button type="submit" className="w-full mt-6 bg-gradient-to-r from-[#ac043f] to-[#0388bd] hover:from-[#79022b] hover:to-[#02455f] text-white">
          Solicitar Turno
        </Button>
      </div>
    </form>
  )
}
