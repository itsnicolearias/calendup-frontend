"use client";
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const steps = [
  {
    title: "Bienvenido a CalendUp 🎉",
    content: "La forma más fácil de gestionar tus turnos y clientes.",
  },
  {
    title: "Configura tu perfil 📝",
    content: "Completa tu nombre, profesión y horarios para empezar a recibir reservas.",
  },
  {
    title: "Recibe turnos automáticamente 📅",
    content: "Tus clientes pueden agendar sin registrarse y recibirás notificaciones por email.",
  },
  {
    title: "Video Demo ▶️",
    content: (
      <div className="aspect-video w-full rounded-lg overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/VIDEO_ID"
          title="Calendup Demo"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    ),
  },
];

interface WelcomeWizardProps {
    open: boolean
    setOpen: (open: boolean) => void
    isNewUser: boolean | undefined;
    handleFinish: () => void;
    isFromHelp?: boolean
} 

export default function WelcomeWizard({ open, setOpen,isNewUser, handleFinish, isFromHelp }: WelcomeWizardProps) {
  const [step, setStep] = useState(0);

  // Mostrar wizard solo la primera vez
  useEffect(() => {

    if (isNewUser && !isFromHelp) {
      setOpen(true);

    }

  }, [isNewUser, isFromHelp, setOpen]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-lg text-center">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{steps[step].title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">{steps[step].content}</div>

        <div className="flex justify-between mt-6">
          {step > 0 ? (
            <Button variant="outline" onClick={prevStep}>
              Atrás
            </Button>
          ) : (
            <div />
          )}

          {step < steps.length - 1 ? (
            <Button onClick={nextStep} className="bg-gradient-to-r from-blue-600 to-purple-600" >Siguiente</Button>
          ) : (
            <Button onClick={() => handleFinish()} className="bg-gradient-to-r from-blue-600 to-purple-600" >¡Listo!</Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
