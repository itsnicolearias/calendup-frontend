"use client"

import { useEffect, useMemo, useState } from "react"
import AppointmentDetails from "@/components/appointments/user-view/AppointmentDetails"
import { Appointment, GetOneAppointment } from "@/types/appointments"
import { useParams, useSearchParams } from "next/navigation";
import { getOneAppFromUser, updateAppointment } from "@/services/appointments";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AvailableCalendar from "@/components/shared/AvailableCalendar";
import { toast } from "sonner";
import { RatingResponse } from "@/types/review";


export default function Component() {
  const params = useParams();
  const searchParams = useSearchParams();

  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [ratingData, setRatingData] = useState<RatingResponse | null>(null);
  const [draft, setDraft] = useState<Partial<Appointment>>({});
  const [showCalendar, setShowCalendar] = useState(false);

  if (!params || searchParams === null) {
    throw new Error();
  }

  const token = searchParams.get("authorization") || "";

  useEffect(() => {
    async function fetchAppointment() {
      try {
        const res: GetOneAppointment = await getOneAppFromUser(token);
        setAppointment(res.appointment);
        setRatingData(res.rating)
      } catch (error) {
        console.error(error);
      }
    }
    fetchAppointment();
  }, [params.id, token]);
  

  const handleDraftChange = (patch: Partial<Appointment>) => {
    setDraft((prev) => ({ ...prev, ...patch }))
  }

  const handleEdit = (field: keyof Appointment) => {
    if (field === "date" || field === "time") {
      setShowCalendar(true);
    }
  }

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
  }

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
    
    
  }

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
    <>
     <AppointmentDetails
      appointment={appointment!}
      draft={draft}
      onDraftChange={handleDraftChange}
      onEdit={handleEdit}
      onCancel={handleCancel}
      onSaveChanges={handleSaveChanges}
      rating={ratingData!}
    />

    {/* Modal con calendario de disponibilidad */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">

          <AvailableCalendar
            onSelect={handleDateTimeSelect}
            professionalId={professionalId}
            isModal={true}
          />
        </DialogContent>
      </Dialog>
    </>
   
  )
}
