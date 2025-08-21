"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { JobTitles, ProfileFormValues, profileSchema } from "@/types/settings";
import { getProfile, updateProfile } from "@/services/settings";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch"

export default function ProfileConfig() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: "",
      jobTitle: "",
      appointmentDuration: 30,
      defaultAppConfirmation: true,
    },
    mode: "onChange",
  });

  const { register, setValue, handleSubmit, reset, watch, formState: { errors } } = form;
  //const profilePicture = watch("profilePicture");

  // Cargar token y redirigir si no existe
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/login");
      return;
    }
    setToken(storedToken);
  }, [router]);

  // Cargar datos del perfil
  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
      try {
        const profile = await getProfile(token);
        reset({
          bio: profile?.profile?.bio ?? "",
          jobTitle: profile?.profile?.jobTitle ?? "",
          appointmentDuration: profile?.profile?.appointmentDuration ?? 30,
          defaultAppConfirmation: profile?.profile?.defaultAppConfirmation ?? true,
        });
      } catch (error) {
        console.error("Error cargando perfil:", error);
      }
    };
    loadProfile();
  }, [token, reset]);

  

const onSubmit = async (data: ProfileFormValues) => {
  setLoading(true);
  try {
    await updateProfile(token, data)
    toast.success("Perfil actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">
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
          <Label>Descripcion de profesion</Label>
          <Textarea {...register("bio")} />
        </div>

         <div className="flex items-center justify-between space-x-2">
          <Label htmlFor="defaultAppConfirmation" className="text-sm font-medium">
            Confirmar turnos automáticamente
          </Label>
          <Switch
            id="defaultAppConfirmation"
            checked={watch("defaultAppConfirmation")}
            onCheckedChange={(checked) => setValue("defaultAppConfirmation", checked)}
          />
        </div>


        <div>
          <Label>Duración del turno (minutos)</Label>
          <Input type="number" {...register("appointmentDuration", { valueAsNumber: true })} />
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </FormProvider>
  );
}
