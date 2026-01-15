"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";
import { RequestSupport } from "@/services/api";

export type SupportFormData = {
  name: string;
  email: string;
  message: string;
};

export default function SupportForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SupportFormData>();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const onSubmit = async (data: SupportFormData) => {
    setStatus("loading");
    try {
      const res = await RequestSupport(data)

      if (res?.success) {
        setStatus("success");
        reset();
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-2xl shadow-md mt-8 sm:mt-12">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#0388bd] text-center mb-4">
        Contactar soporte
      </h2>

      <p className="text-gray-600 text-center text-sm mb-6">
        Si tenés algún problema con tu cuenta o suscripción, escribinos y te responderemos a la brevedad.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <input
            {...register("name", { required: "El nombre es obligatorio" })}
            placeholder="Tu nombre"
            className="w-full border border-gray-200 focus:border-[#0388bd] rounded-lg p-3 text-sm outline-none"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <input
            {...register("email", { required: "El correo es obligatorio" })}
            type="email"
            placeholder="Tu correo"
            className="w-full border border-gray-200 focus:border-[#0388bd] rounded-lg p-3 text-sm outline-none"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <textarea
            {...register("message", { required: "El mensaje es obligatorio" })}
            placeholder="Escribe tu mensaje..."
            className="w-full border border-gray-200 focus:border-[#0388bd] rounded-lg p-3 text-sm outline-none h-32 resize-none"
          />
          {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full bg-[#0388bd] text-white font-medium rounded-lg py-3 text-sm hover:opacity-90 transition-all disabled:opacity-50"
        >
          {status === "loading" ? "Enviando..." : "Enviar mensaje"}
        </button>

        {status === "success" && (
          <p className="text-green-600 text-center text-sm mt-3">
            ¡Mensaje enviado correctamente! Te responderemos pronto.
          </p>
        )}
        {status === "error" && (
          <p className="text-red-600 text-center text-sm mt-3">
            Ocurrió un error al enviar el mensaje. Inténtalo nuevamente.
          </p>
        )}
      </form>
    </div>
  );
}
