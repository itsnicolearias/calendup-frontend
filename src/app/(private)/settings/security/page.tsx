"use client";
import ChangePasswordForm from "@/components/settings/ChangePasswordForm";
import { changePassword } from "@/services/settings";
import { useEffect, useState } from "react";

export default function SecuritySettingsPage() {
  const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        return;
      }
      setToken(storedToken);
    }, []);

    const handleChangePassword = async (data: { password: string; newPassword: string }) => {
      if (!token) {
        return;
      }
      await changePassword(token, data);
    };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Seguridad</h1>
      <p className="text-muted-foreground mb-6">
        Cambia tu contraseña o habilita opciones de seguridad adicionales.
      </p>
      <ChangePasswordForm onSubmit={handleChangePassword} />
    </div>
  );
}
