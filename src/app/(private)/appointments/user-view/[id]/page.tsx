"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Appointment } from "@/types/appointments";
import { AppointmentDetails } from "@/components/appointments/AppointmentDetails";
import { getOneAppointment, updateAppointment } from "@/services/appointments";
import { toast } from "sonner";
import ProfessionalCard from "@/components/shared/ProfessionalCard";
import AvailableCalendar from "@/components/shared/AvailableCalendar";
import { Dialog, DialogContent } from "@/components/ui/dialog";

export default function AppointmentDetailsContainer() {
  const params = useParams();
  const searchParams = useSearchParams();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [draft, setDraft] = useState<Partial<Appointment>>({});
  const [showCalendar, setShowCalendar] = useState(false);

  if (!params || searchParams === null) {
    throw new Error();
  }

  const token = searchParams.get("authorization") || "";

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const res = await getOneAppointment(token, true);
        setAppointment(res);
      } catch (error) {
        console.error(error);
      }
    }
    fetchAppointment();
  }, [params.id, token]);

  const handleEdit = (field: keyof Appointment) => {
    // Solo abrimos el calendario si es fecha u hora
    if (field === "date" || field === "time") {
      setShowCalendar(true);
    }
  };

  const handleCancel = async () => {
    try {
      await updateAppointment({ status: "cancelled" }, token, true);
      toast.success("El turno ha sido cancelado con éxito", {
        description: "Te enviaremos un email con los detalles.",
        duration: 5000,
      });
      // Opcional: podés actualizar el estado local
      setAppointment((prev) => (prev ? { ...prev, status: "cancelled" } : prev));
    } catch (error) {
      console.error(error);
    }
  };

  // Se llama desde AppointmentDetails (un solo llamado al guardar)
  const handleSaveChanges = async () => {
    try {
      if (!Object.keys(draft).length) {
        toast.info("No hay cambios para guardar");
        return;
      }
      await updateAppointment(draft, token, true);
      setAppointment((prev) => (prev ? { ...prev, ...draft } : prev));
      setDraft({});
      toast.success("Cambios guardados", { duration: 3000 });
    } catch (error) {
      console.error(error);
      toast.error("No se pudieron guardar los cambios");
    }
  };

  // Cuando el usuario elige fecha/hora en el calendario (no llamamos API acá)
  const handleDateTimeSelect = (date: string, time: string) => {
    setDraft((prev) => ({ ...prev, date, time }));
    setShowCalendar(false);
    toast.info("Fecha y hora seleccionadas. Recordá guardar cambios.", { duration: 3000 });
  };

  const professionalId = useMemo(
    () => appointment?.professionalId ?? "",
    [appointment]
  );

  if (!appointment) {
    return <p className="text-center py-10">Cargando turno...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Columna principal: detalles */}
      <div className="md:col-span-2">
        <AppointmentDetails
          appointment={appointment}
          draft={draft}
          onDraftChange={(patch) => setDraft((prev) => ({ ...prev, ...patch }))}
          onEdit={handleEdit}
          onCancel={handleCancel}
          onSaveChanges={handleSaveChanges}   
        />
      </div>

      {/* Columna lateral: profesional */}
      <div>
        <ProfessionalCard profile={appointment.professional.profile} />
      </div>

      {/* Modal con calendario de disponibilidad */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="sm:max-w-md">
          <AvailableCalendar
            onSelect={handleDateTimeSelect}
            professionalId={professionalId}
            isModal={true}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
