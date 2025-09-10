"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
      sessionType: "in person",
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

      {/* Tipo de sesión */}
      <div>
        <label className="block text-sm font-medium mb-1">Tipo de sesión</label>
        <Select
          defaultValue={form.getValues("sessionType")}
          onValueChange={(value) => form.setValue("sessionType", value as "in person" | "online")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleccionar tipo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="in person">Presencial</SelectItem>
            <SelectItem value="online">Online</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Botones */}
      <div className="flex gap-2">
        <Button type="submit">{initialData ? "Guardar cambios" : "Crear servicio"}</Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
}
