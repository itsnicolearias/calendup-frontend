"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ProfileFormValues, profileSchema } from "@/types/settings";
import { getProfile, updateProfile } from "@/services/settings";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import AvailabilityEditor from "./AvailabilityEditor";


export default function AvailabilityConfig() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      availability: {},
    },
    mode: "onChange",
  });

  const { register, handleSubmit, reset, } = form;

  // Cargar token y redirigir si no existe
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      router.push("/auth/login");
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
          availability: profile?.profile?.availability ?? {},
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Ha ocurrido un error cargando el perfil. Vuelve a intentarlo luego")
      }
    };
    loadProfile();
  }, [token, reset]);

  

const onSubmit = async (data: ProfileFormValues) => {
  setLoading(true);
  try {
    await updateProfile(token, data);
    toast.success("Perfil actualizado correctamente");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Ha ocurrido un error actualizando el perfil. Vuelve a intentarlo luego")
  } finally {
    setLoading(false);
  }
};

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        <AvailabilityEditor />

        <Button type="submit" disabled={loading} className="bg-[#0388bd]">
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </FormProvider>
  );
}
