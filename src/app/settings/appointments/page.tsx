import AppointmentTypesList from "@/components/settings/AppointmentTypesList";
import ProfileConfig from "@/components/settings/ProfileConfig";

export default function AppointmentSettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Configuración de turnos</h1>
      <p className="text-muted-foreground mb-6">
        Ajusta la duración de tus turnos, confirmación automática y tipos de servicio.
      </p>
      <ProfileConfig />
      <AppointmentTypesList />
    </div>
  );
}
