"use client";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { languageOptions, ProfileFormValues, profileSchema } from "@/types/settings";
import { getProfile, updateProfile } from "@/services/settings";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import UploadImage from "../shared/UploadFiles";
import { useS3Upload } from "@/services/s3-upload";
import { MultiValue } from "react-select";
import { useFieldArray } from "react-hook-form";
import dynamic from "next/dynamic";
import LocationSelect from "../shared/LocationSelect";
const Select = dynamic(() => import("react-select"), { ssr: false });


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
      phone: "",
      profilePicture: "",
      country:  "",
      province:  "",
      city: "",
      education:  [{ title: "", institution: "" }],
      languages: [],
    },
    mode: "onChange",
  });

  const { register, handleSubmit, reset, watch, formState: { errors } } = form;

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "education",
  });

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
          name: profile?.profile?.name ?? "",
          lastName: profile?.profile?.lastName ?? "",
          phone: profile?.profile?.phone ?? "",
          profilePicture: profile?.profile?.profilePicture ?? "",
          country: profile?.profile?.country ?? "",
          province: profile?.profile?.province ?? "",
          city: profile?.profile?.city ?? "",
          education: profile?.profile?.education ?? [],
          languages: profile?.profile?.languages ?? [],
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Ha ocurrido un error. Vuelve a intentarlo luego")
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    toast.error("Ha ocurrido un error actualizando el perfil. Vuelve a intentarlo luego")
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

        <LocationSelect />
        

        <div>
          <Label>Idiomas</Label>
          <Select
            isMulti
            options={languageOptions}
            value={languageOptions.filter(opt => watch("languages")?.includes(opt.value))}
            onChange={(newValue) => {
              const selected = newValue as MultiValue<{ value: string; label: string }>;
              form.setValue("languages", selected.map((opt) => opt.value), { shouldValidate: true });
            }}
          />
        </div>

        <div>
          <Label>Educación</Label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <Input
                placeholder="Título"
                {...register(`education.${index}.title` as const)}
              />
              <Input
                placeholder="Institución"
                {...register(`education.${index}.institution` as const)}
              />
              <Button type="button" variant="destructive" onClick={() => remove(index)}>
                Eliminar
              </Button>
            </div>
          ))}

          <Button type="button" onClick={() => append({ title: "", institution: "" })}>
            + Agregar educación
          </Button>
        </div>


        <Button type="submit" disabled={loading} className="bg-[#0388bd]">
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </form>
    </FormProvider>
  );
}
