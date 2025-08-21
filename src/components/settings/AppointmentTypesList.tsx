"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AppointmentTypeForm from "./AppointmentTypeForm";
import { createAppointmentType, deleteAppointmentType, getAppointmentsTypes, updateAppointmentType } from "@/services/appointment-types";
import { AppointmentType } from "@/types/appointments";
import { toast } from "sonner";




export default function AppointmentTypesList() {
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [token, setToken] = useState<string | null>(null);

    
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    setToken(storedToken);
  }, []);

  

  useEffect(() => {
    if (!token) return;

    const fetchAppointmentTypes = async () => {
    try {
        const appTypes = await getAppointmentsTypes(token)
        console.log(appTypes)
        setAppointmentTypes(appTypes.rows);
    } catch (error) {
        throw error;
    }
  }
  fetchAppointmentTypes()
  }, [token]);

  const handleCreate = async (data: AppointmentType) => {
    try {
        data.price = Number(data.price) || 0.0
        const created = await createAppointmentType(data, token);
        setAppointmentTypes([...appointmentTypes, created]);
        setIsCreating(false);

        toast.success("creado con exito")

    } catch (error) {
        throw error;
    }
    
  };

  const handleUpdate = async (data: AppointmentType, appointmentTypeId: string) => {
    data.price = Number(data.price) || 0.0
    const updated = await updateAppointmentType(data, appointmentTypeId, token)
    setAppointmentTypes((prev) =>
        prev.map((type) =>
          type.appointmentTypeId === appointmentTypeId ? updated : type
        )
      )
      setEditingId(null)

      toast.success("creado con exito")
  };

  const handleDelete = async (appointmentTypeId: string) => {
    await deleteAppointmentType(appointmentTypeId, token)

    setAppointmentTypes((prev) =>
      prev.filter((type) => type.appointmentTypeId !== appointmentTypeId)
    )
    toast.success("creado con exito")
  };

  
  return (
      <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Tipos de turnos</h1>
        {!isCreating && (
          <Button onClick={() => setIsCreating(true)}>+ Nuevo tipo</Button>
        )}
      </div>

      {isCreating && (
        <Card>
          <CardHeader>
            <CardTitle>Crear nuevo tipo de turno</CardTitle>
          </CardHeader>
          <CardContent>
            {/* El form invoca a handleCreate al enviar */}
            <AppointmentTypeForm onSubmit={handleCreate} onCancel={() => setIsCreating(false)} />
          </CardContent>
        </Card>
      )}



    <div className="grid gap-4">
      {appointmentTypes.map((type) => (
        <Card key={type.appointmentTypeId}>
          <CardHeader>
            <CardTitle>{type.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {editingId === type.appointmentTypeId ? (
              <AppointmentTypeForm
                initialData={type}
                onSubmit={(data) => handleUpdate(data, type.appointmentTypeId)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div>
                <p>{type.description}</p>
                <p>Precio: {type.price ? `$${type.price}` : "No especificado"}</p>
                <p>Modalidad: {type.sessionType}</p>
                <div className="flex gap-2 mt-2">
                  <Button onClick={() => setEditingId(type.appointmentTypeId)}>Editar</Button>
                  <Button variant="destructive" onClick={() => handleDelete(type.appointmentTypeId)}>
                    Eliminar
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
  )
}
