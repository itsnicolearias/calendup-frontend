import AvailabilityConfig from "@/components/settings/AvaiabilityConfig";

export default function AvailabilitySettingsPage() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Disponibilidad horaria</h1>
      <p className="text-muted-foreground mb-6">
        Define los días y horarios en los que estarás disponible para turnos.
      </p>

      {/* Aquí luego podés integrar el componente de availability editor que ya hablamos */}
      <div className="border rounded-md p-4">
        <AvailabilityConfig />
      </div>
    </div>
  );
}
