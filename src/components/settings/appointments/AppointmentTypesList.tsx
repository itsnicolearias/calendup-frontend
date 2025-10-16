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

        if (appTypes){
          setAppointmentTypes(appTypes.rows)
        }      
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
      }
    }
    fetchAppointmentTypes()
  }, [token])

  const handleCreate = async (data: AppointmentType) => {
    try {
      data.price = Number(data.price) || 0.0
      const created = await createAppointmentType(data, token)
      if (created) {
        setAppointmentTypes([...appointmentTypes, created ])
        setIsCreating(false)
        toast.success("Servicio creado correctamente")
      }
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al crear servicio. Vuelve a intentarlo luego")
    }
  }

  const handleUpdate = async (data: AppointmentType, appointmentTypeId: string) => {
    data.price = Number(data.price) || 0.0
    try {
      const updated = await updateAppointmentType(data, appointmentTypeId, token)

      if (updated){
        setAppointmentTypes((prev) =>
          prev.map((type) =>
            type.appointmentTypeId === appointmentTypeId ? updated : type
          )
        )
        setEditingId(null)
        toast.success("Servicio actualizado correctamente")
      }
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al actualizar servicio. Vuelve a intentarlo luego")
    }
  }

  const handleDelete = async (appointmentTypeId: string) => {
    try {
      await deleteAppointmentType(appointmentTypeId, token)
      setAppointmentTypes((prev) =>
        prev.filter((type) => type.appointmentTypeId !== appointmentTypeId)
      )
      toast.success("Servicio eliminado correctamente")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al eliminar servicio. Vuelve a intentarlo luego")
    }
  }

  return (
    <div className="space-y-6">
      {/* Botón para crear nuevo servicio */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button className="bg-[#0388bd] w-full sm:w-auto">+ Nuevo servicio</Button>
          </DialogTrigger>
          <DialogContent className="w-full sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Crear nuevo servicio</DialogTitle>
            </DialogHeader>
            <AppointmentTypeForm
              onSubmit={handleCreate}
              onCancel={() => setIsCreating(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {/* Lista de servicios */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {appointmentTypes.map((type) => (
          <Card key={type.appointmentTypeId} className="shadow-sm border rounded-lg">
            <CardHeader>
              <CardTitle>{type.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p>{type.description || "Sin descripción"}</p>
              <p>Precio: {type.price ? `$${type.price}` : "No especificado"}</p>

              <div className="flex flex-col sm:flex-row gap-2 mt-2">
                {/* Modal para editar */}
                <Dialog
                  open={editingId === type.appointmentTypeId}
                  onOpenChange={(open) =>
                    setEditingId(open ? type.appointmentTypeId : null)
                  }
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full sm:w-auto">
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="w-full sm:max-w-lg">
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

                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => handleDelete(type.appointmentTypeId)}
                >
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
