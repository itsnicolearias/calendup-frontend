"use client"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { JobTitles, ProfileFormValues, profileSchema } from "@/types/settings"
import { getProfile, updateProfile } from "@/services/settings"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import AvailabilityEditor from "./AvailabilityEditor"
import UploadImage from "./UploadFiles"

export default function ProfileForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
  const storedToken = localStorage.getItem('token');
    setToken(storedToken);
  if (!storedToken) {
    router.push("/login");
  }
}, []);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {},
    mode: "onChange",
  })

  const { register, handleSubmit, reset, formState: { errors } } = form

  // Cargar datos del perfil al iniciar
  useEffect(() => {
  const loadProfile = async () => {
    if (!token) return;

    try {
      const profile = await getProfile(token);
      reset(profile); // Carga los datos al formulario
    } catch (error) {
      console.error("Error cargando perfil:", error);
    }
  };

  loadProfile();
}, [token, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true)
    try {
        console.log(data)
      await updateProfile(token, data)
      toast.success("Perfil actualizado correctamente")
    } catch (error) {
      console.error("Error al actualizar", error)
    } finally {
      setLoading(false)
    }
  }

  return (
  <FormProvider {...form}>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
      <div>
        <Label>Nombre</Label>
        <Input {...register("name")} />
      </div>

      <div>
        <Label>Apellido</Label>
        <Input {...register("lastName")} />
      </div>

      <div>
        <Label>Dirección</Label>
        <Input {...register("address")} />
      </div>

      <div>
        <Label>Teléfono</Label>
        <Input {...register("phone")} />
      </div>

      <UploadImage
        label="Foto de perfil"
        onUploadComplete={(url) => console.log("Imagen subida:", url)}
      />

      <div>
        <Label>Biografía</Label>
        <Textarea {...register("bio")} />
      </div>

      <div>
        <Label>Profesión</Label>
        <select {...register("jobTitle")} className="w-full border rounded px-3 py-2">
          <option value="">Seleccionar profesión</option>
          {JobTitles.map((title) => (
            <option key={title} value={title}>
              {title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <Label>Duración del turno (minutos)</Label>
        <Input type="number" {...register("appointmentDuration", { valueAsNumber: true })} />
      </div>

      {/* Podés insertar aquí un componente visual para editar disponibilidad */}
      {/* Esto requiere un UI específico que trabajaremos si querés */}
      <AvailabilityEditor />

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Guardar cambios"}
      </Button>
    </form>
  </FormProvider>  
  )
}
