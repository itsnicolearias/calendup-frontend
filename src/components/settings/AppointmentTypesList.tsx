"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import AppointmentTypeForm from "./AppointmentTypeForm"
import { createAppointmentType, deleteAppointmentType, getAppointmentsTypes, updateAppointmentType } from "@/services/appointment-types"
import { AppointmentType } from "@/types/appointments"
import { toast } from "sonner"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function AppointmentTypesList() {
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    setToken(storedToken)
  }, [])

  useEffect(() => {
    if (!token) return
    const fetchAppointmentTypes = async () => {
      try {
        const appTypes = await getAppointmentsTypes(token)
        setAppointmentTypes(appTypes.rows)
      } catch (error) {
        console.error(error)
      }
    }
    fetchAppointmentTypes()
  }, [token])

  const handleCreate = async (data: AppointmentType) => {
    try {
      data.price = Number(data.price) || 0.0
      const created = await createAppointmentType(data, token)
      setAppointmentTypes([...appointmentTypes, created])
      setIsCreating(false)
      toast.success("Tipo de turno creado")
    } catch (error) {
      console.error(error)
      toast.error("Error al crear tipo de turno")
    }
  }

  const handleUpdate = async (data: AppointmentType, appointmentTypeId: string) => {
    data.price = Number(data.price) || 0.0
    try {
      const updated = await updateAppointmentType(data, appointmentTypeId, token)
      setAppointmentTypes((prev) =>
        prev.map((type) =>
          type.appointmentTypeId === appointmentTypeId ? updated : type
        )
      )
      setEditingId(null)
      toast.success("Tipo de turno actualizado")
    } catch (error) {
      console.error(error)
      toast.error("Error al actualizar")
    }
  }

  const handleDelete = async (appointmentTypeId: string) => {
    try {
      await deleteAppointmentType(appointmentTypeId, token)
      setAppointmentTypes((prev) =>
        prev.filter((type) => type.appointmentTypeId !== appointmentTypeId)
      )
      toast.success("Tipo de turno eliminado")
    } catch (error) {
      console.error(error)
      toast.error("Error al eliminar")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">

        {/* Modal para crear */}
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>+ Nuevo servicio</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Crear nuevo servicio</DialogTitle>
            </DialogHeader>
            <AppointmentTypeForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {appointmentTypes.map((type) => (
            // Dentro del map de appointmentTypes
            <Card key={type.appointmentTypeId} className="shadow-sm border rounded-lg">
            <CardHeader>
                <CardTitle>{type.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <p>{type.description || "Sin descripción"}</p>
                <p>Precio: {type.price ? `$${type.price}` : "No especificado"}</p>
                <p>Modalidad: {type.sessionType === "in person" ? "Presencial" : "Online"}</p>

                <div className="flex gap-2 mt-2">
                {/* Modal editar */}
                <Dialog open={editingId === type.appointmentTypeId} onOpenChange={(open) => setEditingId(open ? type.appointmentTypeId : null)}>
                    <DialogTrigger asChild>
                    <Button variant="outline" size="sm">Editar</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-lg" aria-describedby={undefined}>
                    <DialogHeader>
                        <DialogTitle>Editar servicio</DialogTitle>
                    </DialogHeader>
                    <AppointmentTypeForm
                        initialData={type}
                        onSubmit={(data) => handleUpdate(data, type.appointmentTypeId)}
                        onCancel={() => setEditingId(null)}
                    />
                    </DialogContent>
                </Dialog>

                <Button variant="destructive" size="sm" onClick={() => handleDelete(type.appointmentTypeId)}>
                    Eliminar
                </Button>
                </div>
            </CardContent>
            </Card>

        ))}
      </div>
    </div>
  )
}
