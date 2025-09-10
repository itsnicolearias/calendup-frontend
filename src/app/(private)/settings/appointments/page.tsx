"use client"

import ProfileConfig from "@/components/settings/AppointmentsConfig"
import AppointmentTypesList from "@/components/settings/AppointmentTypesList"

export default function AppointmentSettingsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-12">
      {/* Encabezado principal */}
      <div>
        <h1 className="text-2xl font-bold mb-2">Configuración de turnos</h1>
        <p className="text-muted-foreground mb-4">
          Ajusta la duración de tus turnos, confirmación automática y tipos de servicio.
        </p>
      </div>

      {/* Sección Perfil Profesional */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Perfil profesional</h2>
        <ProfileConfig />
      </section>

      {/* Sección Tipos de Turnos */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold mb-2">Servicios</h2>
        <AppointmentTypesList />
      </section>
    </div>
  )
}
