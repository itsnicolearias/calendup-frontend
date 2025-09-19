"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ChangePassword, PasswordSchema } from "@/types/settings";
import { zodResolver } from "@hookform/resolvers/zod";

interface ChangePasswordFormProps {
  onSubmit: (data: { password: string; newPassword: string }) => Promise<void>;
}

export default function ChangePasswordForm({ onSubmit }: ChangePasswordFormProps) {
  const form = useForm({
    resolver: zodResolver(PasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleSubmit = async (data: ChangePassword) => {
    try {
      await onSubmit({
        password: data.password,
        newPassword: data.newPassword,
      });
      toast.success("Contraseña cambiada con éxito");
      form.reset();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      if (err.message === "Invalid password"){
            toast.error("La contraseña ingresada es incorrecta")
          } else {
            toast.error("Error al cambiar la contraseña");
          }
      
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="space-y-6 max-w-md mx-auto"
      >
        {/* Contraseña actual */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña actual</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ingresa tu contraseña actual"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nueva contraseña */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Ingresa tu nueva contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Confirmar contraseña */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repite tu nueva contraseña"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#0388bd]" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Guardando..." : "Cambiar contraseña"}
        </Button>
      </form>
    </Form>
  );
}
