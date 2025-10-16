"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AppointmentType } from "@/types/appointments";



interface AppointmentTypeFormProps {
  initialData?: AppointmentType;
  onSubmit: (data: AppointmentType) => void;
  onCancel?: () => void;
}



export default function AppointmentTypeForm({ initialData, onSubmit, onCancel }: AppointmentTypeFormProps) {
  const form = useForm<AppointmentType>({
    defaultValues: initialData || {
      name: "",
      description: "",
      price: undefined,
    },


  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      {/* Nombre */}
      <div>
        <label className="block text-sm font-medium mb-1">Nombre *</label>
        <Input placeholder="Ej: Consulta inicial" {...form.register("name")} />
        {form.formState.errors.name && (
          <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div>
        <label className="block text-sm font-medium mb-1">Descripción</label>
        <Textarea placeholder="Opcional" {...form.register("description")} />
      </div>

      {/* Precio */}
      <div>
        <label className="block text-sm font-medium mb-1">Precio</label>
        <Input type="number" step="0.01" placeholder="Opcional" {...form.register("price")} />
        {form.formState.errors.price && (
          <p className="text-sm text-red-500">{form.formState.errors.price.message}</p>
        )}
      </div>


      {/* Botones */}
      <div className="flex gap-2">
        <Button type="submit" className="bg-[#0388bd]">{initialData ? "Guardar cambios" : "Crear servicio"}</Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
