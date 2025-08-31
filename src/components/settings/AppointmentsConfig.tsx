"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { JobTitles, ProfileFormValues, profileSchema } from "@/types/settings";
import { getProfile, updateProfile } from "@/services/settings";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      markAppAsCompleted: true
    },
    mode: "onChange",
  });

  const { register, setValue, handleSubmit, reset, watch, formState: { errors } } = form;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/auth/login");
      return;
    }
    setToken(storedToken);
  }, [router]);

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
          markAppAsCompleted: profile?.profile?.markAppAsCompleted ?? true,
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
      await updateProfile(token, data);
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar", error);
      toast.error("Error al actualizar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormProvider {...form}>
      <div className="border rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Profesión */}
          <div>
            <Label>Profesión</Label>
            <select
              {...register("jobTitle")}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Seleccionar profesión</option>
              {JobTitles.map((title) => (
                <option key={title} value={title}>
                  {title}
                </option>
              ))}
            </select>
            {errors.jobTitle && (
              <p className="text-sm text-red-500">{errors.jobTitle.message}</p>
            )}
          </div>

          {/* Descripción */}
          <div>
            <Label>Descripción de profesión</Label>
            <Textarea {...register("bio")} />
            {errors.bio && (
              <p className="text-sm text-red-500">{errors.bio.message}</p>
            )}
          </div>

          {/* Confirmación automática */}
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

          {/* marcar turno como completado */}
          <div className="flex items-center justify-between space-x-2">
            <Label htmlFor="markAppAsCompleted" className="text-sm font-medium">
              Marcar turnos como completados automaticamente
            </Label>
            <Switch
              id="markAppAsCompleted"
              checked={watch("markAppAsCompleted")}
              onCheckedChange={(checked) => setValue("markAppAsCompleted", checked)}
            />
          </div>

          {/* Duración del turno */}
          <div>
            <Label>Duración del turno (minutos)</Label>
            <Input
              type="number"
              {...register("appointmentDuration", { valueAsNumber: true })}
            />
            {errors.appointmentDuration && (
              <p className="text-sm text-red-500">{errors.appointmentDuration.message}</p>
            )}
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
