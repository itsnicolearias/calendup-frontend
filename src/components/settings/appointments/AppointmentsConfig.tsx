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
import { updateProfile } from "@/services/settings";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function ProfileConfig() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

   const { user, refreshUser } = useUser()
  

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      bio: "",
      jobTitle: "",
      appointmentDuration: 30,
      defaultAppConfirmation: true,
      markAppAsCompleted: true,
      address: "",
      appMode: "in_person",
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
      try {
        const profile = user;
        reset({
          bio: profile?.profile?.bio ?? "",
          jobTitle: profile?.profile?.jobTitle ?? "",
          appointmentDuration: profile?.profile?.appointmentDuration ?? 30,
          defaultAppConfirmation: profile?.profile?.defaultAppConfirmation ?? true,
          markAppAsCompleted: profile?.profile?.markAppAsCompleted ?? true,
          address: profile?.profile?.address ?? "",
          appMode: profile?.profile?.appMode ?? "in_person",
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
      }
    };
    loadProfile();
  }, [user, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    setLoading(true);
    try {
      await updateProfile(token, data);
      toast.success("Perfil actualizado correctamente");
      await refreshUser()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al actualizar perfil. Vuelve a internarlo luego");
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

          {/* Direccion profesional */}
          <div>
            <Label>Direccion profesional</Label>
            <Input {...register("address")} />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
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

          {/* Tipo de modalidad */}
                <div>
                  <label className="block text-sm font-medium mb-1">Modalidad de turnos</label>
                  <Select
                    defaultValue={form.getValues("appMode") as string}
                    value={watch("appMode") ?? undefined}
                    onValueChange={(value:  string) => form.setValue("appMode", value as "in_person" | "combined" | "online")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar modalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="in_person">Presencial</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="combined">Combinada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

          <Button type="submit" disabled={loading} className="bg-[#0388bd]" >
            {loading ? "Guardando..." : "Guardar cambios"}
          </Button>
        </form>
      </div>
    </FormProvider>
  );
}
