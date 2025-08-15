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
import AvailabilityEditor from "./AvailabilityEditor";
import UploadImage from "./UploadFiles";
import { useS3Upload } from "@/services/s3-upload";

export default function ProfileForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadFile, isUploading } = useS3Upload();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      lastName: "",
      address: "",
      phone: "",
      profilePicture: "",
      bio: "",
      jobTitle: "",
      appointmentDuration: 30,
      availability: {}
    },
    mode: "onChange",
  });

  const { register, setValue, handleSubmit, reset, watch, formState: { errors } } = form;
  const profilePicture = watch("profilePicture");

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
          name: profile?.profile?.name ?? "",
          lastName: profile?.profile?.lastName ?? "",
          address: profile?.profile?.address ?? "",
          phone: profile?.profile?.phone ?? "",
          profilePicture: profile?.profile?.profilePicture ?? "",
          bio: profile?.profile?.bio ?? "",
          jobTitle: profile?.profile?.jobTitle ?? "",
          appointmentDuration: profile?.profile?.appointmentDuration ?? 30,
          availability: profile?.profile?.availability ?? {}
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
    let profilePictureUrl = data.profilePicture;

    // Solo subir a S3 si hay un archivo nuevo
    if (selectedFile) {
      profilePictureUrl = await uploadFile(selectedFile); // función que sube a S3 y devuelve la URL
    }

    await updateProfile(token, { ...data, profilePicture: profilePictureUrl });
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
          <Label>Nombre</Label>
          <Input {...register("name")} />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <Label>Apellido</Label>
          <Input {...register("lastName")} />
          {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
        </div>

        <div>
          <Label>Dirección</Label>
          <Input {...register("address")} />
        </div>

        <div>
          <Label>Teléfono</Label>
          <Input {...register("phone")} />
        </div>

        <div>
          <Label>Foto de perfil</Label>
          <UploadImage
            label="Foto de perfil"
            currentImageUrl={watch("profilePicture")}
            onChange={(file) => setSelectedFile(file)}
          />
        </div>
        
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

        <AvailabilityEditor />

        <Button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </FormProvider>
  );
}
