"use client"
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function AccountActivated() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <CheckCircle className="mx-auto text-black w-16 h-16 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          ¡Felicidades!
        </h1>
        <p className="text-gray-600 mb-6">
          Tu cuenta ha sido activada con éxito.  
          Ya puedes iniciar sesión.
        </p>
        <Button
          className="w-full bg-[#197387] hover:bg-[#155d6d]"
          onClick={() => router.push("/auth/login")}
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
}
