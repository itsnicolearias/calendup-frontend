"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Circle } from "lucide-react";
import { Profile } from "@/types/settings";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useEffect, useState } from "react";


interface OnboardingChecklistProps {
  profile: Partial<Profile>;
}

export function OnboardingChecklist({ profile }: OnboardingChecklistProps) {
  const router = useRouter();
   const [open, setOpen] = useState(false);

  const steps = [
    { key: "name", label: "Nombre", path: "personal" },
    { key: "lastName", label: "Apellido", path: "personal" },
    { key: "jobTitle", label: "Profesión", path: "appointments" },
    { key: "appMode", label: "Modalidad de turnos", path: "appointments" },
    { key: "availability", label: "Disponibilidad", path: "availability" },
    { key: "country", label: "País", path: "personal" },
    { key: "province", label: "Provincia", path: "personal" },
    { key: "city", label: "Ciudad", path: "personal" },   
  ];

  const completedSteps = steps.filter((step) => profile[step.key as keyof Profile]);
  const progress = Math.round((completedSteps.length / steps.length) * 100);

  const profileCompleted = profile?.profileCompleted;

  // Abrir modal automáticamente si el perfil no está completo
  useEffect(() => {
    if (!profileCompleted) {
      setOpen(true);
    }
  }, [profileCompleted]);

  return (
      <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
             {profileCompleted ? "Perfil completo ✅" : "Completa tu perfil"}
          </DialogTitle>
          <DialogDescription>
            {profileCompleted
              ? "¡Listo para comenzar a recibir turnos!"
              : "Por favor, completa todos los campos para comenzar a recibir turnos."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-500">{progress}% completado</p>

          <ul className="space-y-2">
            {steps.map((step) => {
              const isDone = !!profile[step.key as keyof Profile];
              return (
                <li key={step.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {isDone ? (
                      <CheckCircle2 className="text-green-600 h-5 w-5" />
                    ) : (
                      <Circle className="text-gray-400 h-5 w-5" />
                    )}
                    <span className={isDone ? "line-through text-gray-500" : ""}>
                      {step.label}
                    </span>
                  </div>
                  {!isDone && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setOpen(false);
                        router.push(`/settings/${step.path}`); // 🔹 ajusta la ruta
                      }}
                    >
                      Completar
                    </Button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}
