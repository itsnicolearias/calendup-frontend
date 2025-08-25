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
  } finally {
    setLoading(false);
  }
};

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-xl mx-auto">

        <AvailabilityEditor />

        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </FormProvider>
  );
}
