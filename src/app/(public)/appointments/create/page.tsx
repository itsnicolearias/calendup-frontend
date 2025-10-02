'use client';
import  AppointmentForm from "@/components/appointments/AppointmentForm";
import { Suspense } from "react";


export default function CreateAppointmentPage() {
  return (
      <Suspense fallback={<div>Cargando...</div>}>
        <AppointmentForm />
      </Suspense>
  );
}
